# Gemini (Google Generative AI) Local Setup

This project supports a server-side proxy for the Gemini (Google Generative) API. For local development we provide `server/dev-proxy.js` which forwards requests to the real endpoint using a local `.env` file.

Important: NEVER commit real API keys. Use `.env` (ignored) and keep `.env.example` in the repo.

## Steps to test the real Gemini chatbot locally

1. Copy and edit `.env.example`:

   cp .env.example .env
   # then open .env and fill GEMINI_API_KEY and GEMINI_API_URL

2. Install dev dependencies (if not already installed):

   npm install

   # If you prefer only the proxy deps:
   npm install express dotenv

3. Start the local proxy in one terminal:

   npm run dev:proxy

   The proxy will listen on `http://localhost:5174` by default and exposes the path
   `/make-server-86c3a706/gemini`, mirroring the server function route used by the app.

4. Start the app dev server in another terminal:

   npm run dev

5. In the app use the Chatbot and enable the "Use Gemini" toggle. Requests will go to the proxy which forwards them to the `GEMINI_API_URL` you provided.

## Health-check endpoint

The local dev proxy exposes a lightweight health endpoint at:

```
/make-server-86c3a706/health
```

This endpoint returns JSON with the following keys:
- `ok`: true when the proxy is running.
- `source`: `dev-proxy`.
- `geminiConfigured`: boolean — true when both `GEMINI_API_KEY` and `GEMINI_API_URL` are present in the environment.
- `timestamp`: ISO timestamp of the check.
- `healthCheck` (optional): if you set `GEMINI_HEALTH_CHECK_URL` in your `.env`, the proxy will attempt a lightweight HEAD request to that URL using the configured API key and return a small status object (it will never include the API key itself).

Use this endpoint to verify the proxy is running and that your key is present and (optionally) valid without exposing the key.

## Deploying to a hosted function (Supabase / Deno)

- In production you should set the following environment variables in your function host (Supabase, Cloud Run, etc):
  - `GEMINI_API_KEY` (your real key)
  - `GEMINI_API_URL` (the full endpoint URL your function uses)
  - `GEMINI_MODEL` (optional model id)

### Rotating your Gemini API key

Rotate keys regularly and store them in a secure secret manager (your host's secret manager, not source control). A safe rotation procedure:

1. Create the new key in the provider console (Gemini / Google Cloud).
2. Add the new key to your secret manager or update your host env var (for local dev, update `.env`).
3. Restart the proxy / function host so the new key is picked up.
4. Verify with the health endpoint (`/make-server-86c3a706/health`) that `geminiConfigured: true` and, if using `GEMINI_HEALTH_CHECK_URL`, that the `healthCheck.ok` is true.
5. Revoke the old key in the provider console when you have confirmed the new key works.

Notes:
- Never check keys into source control or paste them into public logs or issues.
- In hosted environments prefer the provider's secret manager (e.g., Supabase secrets, Cloud Run secrets, etc.) and avoid storing keys in plain `.env` files on shared systems.

- The repo contains a server-side function at `src/supabase/functions/server/index.tsx` that already reads `Deno.env` (for Supabase). Keep your key in the host's secret manager — do NOT include it in source code.

## Security notes

- Do not paste API keys into issue trackers, public commits, or chat logs. Remove/rotate keys if you accidentally publish them.
- Production requests should always go through the server-side function to keep the API key secret.

If you'd like, I can:
- Add a small UI helper to show whether the app is using the local proxy vs the deployed function.
- Wire streaming responses for a more natural chat typing effect.
