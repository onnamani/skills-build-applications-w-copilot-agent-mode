# Frontend API Configuration

For Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Use the Codespace name without a port suffix, then restart the Vite dev server. When valid, the frontend requests `https://<name>-8000.app.github.dev/api/[component]/`. If the variable is unset or invalid, requests safely fall back to `http://localhost:8000/api/[component]/` for local development.

Copy `.env.example` to `.env.local` and set the value for your environment. Vite exposes only variables prefixed with `VITE_` to frontend code.