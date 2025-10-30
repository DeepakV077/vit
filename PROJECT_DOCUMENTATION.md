# OceanIQ — Project Documentation

This document provides a compact developer-facing guide to the "Build OceanIQ Web App" project in this repository. It covers architecture, how to run and test locally, environment variables and secrets, important files and components, troubleshooting notes, and recommended next steps.

---

## Quick summary

- Framework: Vite + React + TypeScript (plugin-react-swc)
- Styling: Tailwind CSS + shadcn UI primitives
- Animations: Framer Motion
- Map: Leaflet + react-leaflet (heat plugin loaded at runtime)
- Charts: Recharts
- Auth: Firebase (Google + email/password)
- PDF export: jsPDF
- LLM/Chatbot: Gemini (Generative API) via a local server dev-proxy (server/dev-proxy.js). Keep keys server-side.

---

## Goals / Intent

OceanIQ is an experimental interface combining ocean data sources and ML to produce actionable insights (species predictions, maps, dashboards). The codebase includes a map-driven `SpeciesPredict` UI, a Chatbot that forwards to a dev proxy for LLM calls, Firebase authentication scaffolding, and utilities for exporting reports.

---

## Getting started (developer)

1. Clone the repository and open it in your editor.
2. Install dependencies:

```bash
npm install
```

3. Prepare environment variables (server-side proxy)

Create a `.env` at the project root (do NOT commit). Example values:

```
# server side (used by server/dev-proxy.js)
GEMINI_API_KEY=YOUR_GEMINI_KEY_HERE
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
PROXY_PORT=5174
GEMINI_MODEL=gemini-1.5-flash
```

Security: never commit `.env` or paste secrets into public places. Add `.env` to `.gitignore` if not already present.

4. (Optional) Frontend dev-only env

If you run the dev proxy on a non-default location, set this in a Vite env file used by your local dev server (not for secrets):

```
VITE_DEV_PROXY_URL=http://localhost:5174/make-server-86c3a706/gemini
```

Do NOT put `VITE_GEMINI_API_KEY` in a committed env file for production; that would expose the key to the browser.

5. Start the dev proxy (in a separate terminal):

```bash
npm run dev:proxy
```

6. Start the frontend dev server:

```bash
npm run dev
```

Or run both concurrently:

```bash
npm run dev:all
```

7. Open the Vite URL printed by the dev server (usually `http://localhost:3000` or a nearby port). Navigate to the app and test features (Map, SpeciesPredict, Chatbot, Dashboard).

---

## Dev proxy (LLM safety)

- File: `server/dev-proxy.js`
- Purpose: keep the Gemini API key server-side in your local dev environment and translate requests from the front-end to the Generative API.
- Endpoint used by client: `/make-server-86c3a706/gemini`.

Health check:

```bash
curl http://localhost:5174/make-server-86c3a706/health
```

Expected JSON includes `geminiConfigured: true` when `GEMINI_API_KEY` and `GEMINI_API_URL` are set.

---

## Important scripts

- `npm run dev` — start Vite dev server.
- `npm run dev:proxy` — start the local dev proxy (server/dev-proxy.js).
- `npm run dev:all` — run both frontend and proxy concurrently.
- `npm run build` — Vite production build.

---

## Important files and components

- `src/App.tsx` — root app; routing between pages, footer, global UI. Contains footer with Framer Motion animations.
- `src/main.tsx` — app bootstrap (Vite entry)
- `src/components/SpeciesPredict.tsx` — re-export file (forwards to `SpeciesPredictClean`). Avoid editing if corrupted.
- `src/components/SpeciesPredictClean.tsx` — cleaned, complete SpeciesPredict implementation (map-driven predictions, export CSV/JSON, scenarios/history).
- `src/components/Chatbot.tsx` — Chatbot UI and client-side network code; calls dev-proxy endpoint by default and falls back to direct call only if `VITE_GEMINI_API_KEY` is set (development fallback).
- `server/dev-proxy.js` — local Express-based proxy that forwards to Generative API.
- `src/components/MapView.tsx` — Map and leaflet integration (runtime plugin loading for optional heat layers).
- `src/components/Dashboard.tsx` — Charts (Recharts) and chart rendering.
- `src/components/ReportExport.tsx` — PDF/JS export using jsPDF.
- `src/components/AuthDialog.tsx`, `src/components/Login.tsx`, `src/components/Register.tsx`, `src/components/Profile.tsx` — Firebase auth components.
- `src/styles/globals.css`, `src/index.css` — global styles; Poppins font added.
- `package.json` — dependencies and scripts.

---

## Known issues & troubleshooting

- Vite overlay parse errors ("Expression expected")
  - Cause: corrupted files (example: `src/components/SpeciesPredict.tsx` previously had stray trailing tokens). Solution: open the file and revert or replace with the cleaned `SpeciesPredictClean.tsx` and re-export from the original module. HMR will update.

- Chatbot returns service unavailable
  - Ensure the dev proxy is running (`npm run dev:proxy`) and `.env` has `GEMINI_API_KEY` and `GEMINI_API_URL` set.
  - Confirm health endpoint returns `geminiConfigured: true`.

- Large build chunks warning
  - Observed on `vite build` (some bundles > 500KB). Consider code-splitting or dynamic imports for large modules (charts, map, or heavy libraries like html2canvas).

- Tailwind utility naming
  - The project uses some custom utilities (for example `bg-linear-to-r` instead of `bg-gradient-to-br`); follow existing conventions to avoid lint warnings.

---

## Testing chat end-to-end

1. Start `dev:proxy` and `dev` as described above.
2. Open the Chatbot page and submit a prompt.
3. If the reply is slow or empty, check the proxy logs (the proxy prints errors when upstream fails).

Optional: enable more advanced streaming behavior by extending `server/dev-proxy.js` to provide chunked or SSE output and updating `Chatbot.tsx` to read streaming chunks. This is a larger change but greatly improves UX.

---

## Contributing and local changes

- Keep secrets out of the repository. Use `.env` and ensure it is listed in `.gitignore`.
- Follow existing TypeScript and Tailwind patterns.
- If you add new features that need large libs (e.g., Lottie), prefer installing minimal bundles and adding to `package.json`.

Suggested PR checklist:
- run `npm run build` locally
- run basic interactions (Map, Chatbot, Predictions)
- ensure no new secrets are committed

---

## Next recommended improvements

- Remove the client-side direct Gemini fallback from `Chatbot.tsx` so only the proxy is used (reduces risk of accidental key exposure).
- Add an integration test that starts the proxy in CI with a mocked upstream and verifies the `/health` and `/gemini` endpoints.
- Add lightweight SVG icons for social links in the footer.
- Add a `docs/` folder and split docs (architecture, developer setup, deployment) into separate markdown pages.

---

## Contact / Help

If you need a change applied to the codebase (fixes, tests, streaming support), tell me which area you want next (Chatbot streaming, remove client fallback, improve SpeciesPredict testing) and I will implement it.


*Generated as developer documentation for the workspace currently in the editor.*
