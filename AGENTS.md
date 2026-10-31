# Project Instructions

## Purpose

Personal blog and project notebook for OthinusG, deployed as a GitHub Pages project site at `https://othinusg.github.io/index/`.

## Stack

- Astro 7 with content collections
- Tailwind CSS 4
- npm with `package-lock.json`
- GitHub Actions for build and Pages deployment

## Commands

- `npm ci` — install dependencies from the lockfile
- `npm run dev` — start the local dev server
- `npm run check` — run Astro/TypeScript checks
- `npm run build` — build the production site into `dist/`
- `npm run preview` — preview the production build

## Rules

- Keep all internal URLs compatible with the `/index/` base path. Use `withBase()` from `src/utils/path-utils.ts`; do not add new root-relative internal links.
- Site-wide metadata and navigation belong in `src/data/site-config.ts`.
- Blog posts, pages, and projects belong in `src/content/`.
- Preserve `LICENSE`; the Dante theme is GPL-3.0 licensed.
- Do not commit secrets or environment-specific credentials.

## Deployment

The `Deploy to GitHub Pages` workflow runs on pushes to `main`. It checks, builds, uploads `dist/`, and deploys through GitHub Pages. The repository Pages source must be `GitHub Actions`.
