#!/usr/bin/env node
// Local development proxy to forward chatbot requests to a real Gemini / Generative AI endpoint.
// Usage: copy .env.example -> .env and fill GEMINI_API_KEY and GEMINI_API_URL

const express = require('express');
const fetch = globalThis.fetch || require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

// Simple CORS for local development so the Vite server (default port 3000)
// can call this proxy at a different port (5174). Restricting to local
// origins is safer, but during dev we allow localhost origins.
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  // allow localhost dev origins and the proxy itself
  if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const PORT = process.env.PROXY_PORT || 5174;
const API_URL = process.env.GEMINI_API_URL;
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_URL || !API_KEY) {
  console.warn('\n[dev-proxy] Warning: GEMINI_API_URL or GEMINI_API_KEY is not set.');
  console.warn('Copy .env.example to .env and set GEMINI_API_KEY and GEMINI_API_URL to test the real Gemini chatbot.');
}

// Keep the same route your app expects for the Supabase function proxy
app.post('/make-server-86c3a706/gemini', async (req, res) => {
  if (!API_URL || !API_KEY) {
    return res.status(400).json({ error: 'GEMINI_API_URL or GEMINI_API_KEY not configured in .env' });
  }

  try {
    // Build an upstream body that is compatible with Google Generative API
    // if the configured API_URL looks like a generativelanguage endpoint or
    // if a GEMINI_MODEL is supplied. Otherwise forward the body as-is.
    let upstreamBody = req.body;
    let contentType = 'application/json';

    const looksLikeGoogleGenerative = API_URL && API_URL.includes('generativelanguage');
    if (looksLikeGoogleGenerative || process.env.GEMINI_MODEL) {
      // The frontend sends { prompt, systemPrompt, stream }
      const promptText = `${req.body.systemPrompt || ''}\n\n${req.body.prompt || ''}`.trim();
      upstreamBody = {
        prompt: { text: promptText },
        model: process.env.GEMINI_MODEL || undefined,
        temperature: 0.2,
        maxOutputTokens: 512,
      };
    }

    const upstreamResp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    const data = await upstreamResp.json();

    // Try to extract a human-friendly reply from a few common shapes
    let reply = null;
    if (data?.candidates && Array.isArray(data.candidates) && data.candidates[0]) {
      reply = data.candidates[0].content?.[0]?.text || data.candidates[0].content || JSON.stringify(data.candidates[0]);
    } else if (data?.output?.[0]?.content?.[0]?.text) {
      reply = data.output[0].content[0].text;
    } else if (data?.reply) {
      reply = data.reply;
    }

    return res.json({ ok: true, raw: data, reply });
  } catch (err) {
    console.error('[dev-proxy] error', err);
    return res.status(500).json({ error: String(err) });
  }
});

app.get('/make-server-86c3a706/health', async (req, res) => {
  // Do not expose secrets. Provide a simple health response that indicates
  // whether the proxy is configured with a Gemini API key & URL. Optionally
  // perform a light external check if GEMINI_HEALTH_CHECK_URL is provided.
  const geminiConfigured = Boolean(API_KEY && API_URL);
  const health = {
    ok: true,
    source: 'dev-proxy',
    geminiConfigured,
    timestamp: new Date().toISOString(),
  };

  // Optional deeper check: if an admin set GEMINI_HEALTH_CHECK_URL in .env,
  // the proxy will attempt a lightweight HEAD request to that URL using the
  // configured API key. This helps detect misconfigured keys without
  // returning the key itself.
  const healthCheckUrl = process.env.GEMINI_HEALTH_CHECK_URL;
  if (healthCheckUrl && geminiConfigured) {
    try {
      const resp = await fetch(healthCheckUrl, {
        method: 'HEAD',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        // small timeout would be ideal here, but node-fetch/global fetch
        // timeouts require AbortController; keep simple for dev proxy.
      });
      health.healthCheck = {
        url: healthCheckUrl,
        ok: resp.ok,
        status: resp.status,
      };
    } catch (err) {
      health.healthCheck = {
        url: healthCheckUrl,
        ok: false,
        error: String(err),
      };
    }
  }

  return res.json(health);
});

app.listen(PORT, () => {
  console.log(`[dev-proxy] listening on http://localhost:${PORT}`);
});
