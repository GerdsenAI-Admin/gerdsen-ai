# GerdsenAI Website

Corporate website for Gerdsen AI, built with Vite, React, and Tailwind CSS.

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Framer Motion, shadcn/ui
- **Server:** Express (production static file server)
- **Build:** Vite 7, esbuild
- **Routing:** Wouter (client-side SPA)
- **Package Manager:** pnpm

## Development

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:3000`.

## Build & Preview

```bash
pnpm build
pnpm preview
```

## Production

```bash
pnpm build
pnpm start
```

Runs the Express server serving the built static files.

## Deployment

Deployed to GitHub Pages via the workflow in `.github/workflows/deploy-vite.yml`. Pushes to `main` trigger automatic deployment to [gerdsen.ai](https://gerdsen.ai).

## Project Structure

```
client/           # Frontend application
  src/
    components/   # React components (sections, UI)
    contexts/     # Theme context provider
    hooks/        # Custom React hooks
    lib/          # Utility functions
    pages/        # Page components (Home, NotFound)
server/           # Express production server
shared/           # Shared constants
```
