import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Deno types may not be available in all editors/build setups; keep a loose
// declaration so this file still type-checks in environments without Deno types.
declare const Deno: any;

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-86c3a706/health", (c: any) => {
  return c.json({ status: "ok" });
});

// Gemini proxy endpoint
app.post("/make-server-86c3a706/gemini", async (c: any) => {
  try {
    const body = await c.req.json();
    const prompt = body?.prompt;

    if (!prompt) {
      return c.json({ error: 'Missing prompt in request body' }, 400);
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const GEMINI_MODEL = Deno.env.get('GEMINI_MODEL') ?? 'gemini-1.0';

    if (!GEMINI_API_KEY) {
      return c.json({ error: 'GEMINI_API_KEY not configured on server' }, 500);
    }

    // Build a best-effort request to the Generative AI endpoint. Different
    // Google/GenAI versions expect slightly different payloads; this wrapper
    // attempts a conservative payload and extracts text from common response
    // shapes. If your deployment uses a different endpoint or model name,
    // set GEMINI_API_URL / GEMINI_MODEL in the function environment.

    const apiUrl = Deno.env.get('GEMINI_API_URL') ?? `https://generativeai.googleapis.com/v1/models/${GEMINI_MODEL}:generateMessage?key=${GEMINI_API_KEY}`;

    const payload = {
      // Common fields used by several GenAI REST APIs
      messages: [
        {
          author: 'user',
          content: { type: 'text', text: prompt }
        }
      ],
      temperature: 0.2,
      maxOutputTokens: 512
    };

    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();

    // Try to extract the reply text from a few common response shapes.
    const reply =
      data?.candidates?.[0]?.content ||
      data?.candidates?.[0]?.message?.content?.text ||
      data?.output?.[0]?.content?.text ||
      data?.messages?.[0]?.content?.text ||
      data?.text ||
      (typeof data === 'string' ? data : JSON.stringify(data));

    return c.json({ reply });
  } catch (err) {
    console.error('Gemini proxy error:', err);
    return c.json({ error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);