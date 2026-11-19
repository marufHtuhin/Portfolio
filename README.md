# Maruf Hasan — Personal Portfolio

Personal portfolio site for Md. Maruf Hasan Tuhin: CSE student at BUBT and backend
developer. Styled after dev.ittahad.site — sage dotted paper, deep navy ink, yellow
highlighter, blue handwriting annotations, tilted cream cards, and a full-bleed blue
open-source band. Light + dark themes (toggle, persisted), fully responsive.

Built with **React + TypeScript + Vite** and plain custom CSS. Fully static — no
backend, no environment variables.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To check the production build:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New → Project** and import the repo.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build`. Output directory: `dist`.
5. Click **Deploy**.

No environment variables are needed — the site is fully static.

## Contents

- `src/App.tsx` — all page content (projects, about, skills, education, contact)
- `src/index.css` — all styling
- `public/cv.pdf` — the CV linked from the "Download CV" button
