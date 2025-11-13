# Advanced Web – Upload 1 (Week 9)

This repository contains the required deliverables for Upload 1 focusing on semantic HTML, accessible navigation, responsive layout, and evidence artifacts.

How to run locally
- Node: `npm ci` then `npm run dev` and open http://localhost:5173
- Docker: `docker compose up --build` and open http://localhost:5173

Linting
- Run all linters: `npm run lint`
- HTML only: `npm run lint:html`
- CSS only: `npm run lint:css`

Evidence generation (Lighthouse Accessibility)
1) Start the server:
   - Node: `npm run dev`
   - Docker: `docker compose up`
2) Run Lighthouse accessibility report:
   - `npm run evidence:lighthouse`
   - This writes `evidence/lighthouse-accessibility.html`.
3) Take a screenshot of the score and save it to `evidence/lighthouse-screenshot.png`.

Wireframes
- We’ve included low-fidelity wireframes in `/wireframes/` as SVGs with annotated landmarks and tab order.
- Export each to PNG from any browser or design tool (File > Export as PNG).
- Produce: `/wireframes/home.png`, `/wireframes/data.png`, `/wireframes/form.png`.

Project structure
advanced-web/
├─ .github/
│  └─ workflows/
│     └─ lint.yml
├─ evidence/
│  ├─ lighthouse-accessibility.html
│  ├─ lighthouse-screenshot.png
│  └─ html-snippets.md
├─ wireframes/
│  ├─ home.svg
│  ├─ data.svg
│  └─ form.svg
├─ public/
│  ├─ index.html
│  ├─ views/
│  │  ├─ data.html
│  │  └─ form.html
│  ├─ css/
│  │  ├─ tokens.css
│  │  └─ base.css
│  ├─ js/
│  │  └─ a11y.js
│  └─ img/
│     └─ placeholders.svg
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ .htmlhintrc
├─ .stylelintrc.json
├─ .editorconfig
└─ README.md

Acceptance criteria checklist (pass/fail)
- Pages load without CSS/JS errors; one `<h1>` per page.
- Skip link appears on focus and places focus on `<main>`.
- All interactive elements reachable with Tab; activatable via Enter/Space.
- Default focus outline is not removed; custom focus has ≥ 3:1 contrast.
- Contrast tokens validated (attach checker screenshots).
- Lighthouse Accessibility ≥ 95; any < 100 justified in notes.
- No ARIA where native semantics suffice; any ARIA is documented.
- Layout adapts at 480/768/1024px with no horizontal scroll.
- No color-only meaning; icons or text provide state cues.

Known a11y debt and plan (Upload 2)
- Evidence pack currently requires final screenshots (contrast checks, Lighthouse score PNG). These must be captured during testing and committed.
- Form validation is HTML-native. In Upload 2, we’ll add non-color validation cues (icons/aria-live) and server/error state handling with progressive enhancement.