# Canva Callback Bridge

Minimal Vercel serverless endpoint that completes the Canva Connect OAuth flow and forwards the authorization code to Jarvis.

## Deploy

1. Push this folder to a GitHub repo (e.g. `jarvis-canva-callback`).
2. In Vercel, **Import Project** → select the repo → framework preset “Other”.
3. Set the environment variable `JARVIS_CANVA_WEBHOOK` to the URL where Jarvis expects Canva codes.
   - While we’re still wiring Jarvis, leave it unset; the function will simply log the code.
4. Deploy – you’ll get a URL like `https://jarvis-canva.vercel.app/api/canva-callback`.

## Canva setup

Use the deployed URL for both:
- **Authorized Redirects** (Authentication)
- **Return Navigation**

You can keep `https://127.0.0.1:3000/canva/callback` as a secondary redirect for local testing, but Canva requires at least one non-local default URL.
