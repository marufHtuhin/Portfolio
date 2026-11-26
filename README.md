# Maruf Hasan — Personal Portfolio

Personal portfolio site for Md. Maruf Hasan Tuhin: CSE student at BUBT and backend
developer. Styled after dev.ittahad.site — sage dotted paper, deep navy ink, yellow
highlighter, blue handwriting annotations, tilted cream cards, and a full-bleed blue
open-source band. Light + dark themes (toggle, persisted), fully responsive.

Built with **React + TypeScript + Vite** and plain custom CSS. Fully static — no
backend, no environment variables.

## Projects

| Project | Live | Repo |
|---|---|---|
| FarmMarket — fair-price agricultural marketplace | [Live](https://farmmarket-gdcm.onrender.com) | [Repo](https://github.com/marufHtuhin/FarmMarket) |
| PulseWatch AI — API monitoring with AI incident explanations | [Live](https://pulsewatchai.vercel.app) | [Repo](https://github.com/marufHtuhin/PulseWatch-AI) |
| AmaderKrishi AI — Bengali agriculture assistant | — | [Repo](https://github.com/marufHtuhin/AmaderKrishi_AI) |
| E-commerce Sales & Inventory System — POS + inventory | — | [Repo](https://github.com/marufHtuhin/Ecommerce-Sales-Inventory-System) |
| Snake Game AI — A* pathfinding snake | [Live](https://marufhtuhin.github.io/Snake-Game-AI/) | [Repo](https://github.com/marufHtuhin/Snake-Game-AI) |

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
