# Project Instructions

## Purpose

Personal site for OthinusG, deployed as a GitHub Pages project site at `https://othinusg.github.io/index/`.

## Stack

- Astro 7 with content collections (Markdown / MDX)
- Navfolio site framework (`@navfolio/*` packages from GitHub)
- Tailwind CSS 4
- Bun with `bun.lock`
- Pagefind for static search
- Python 3 + FontTools + Brotli for font subsetting
- GitHub Actions for build and Pages deployment

## Commands

- `bun install` — install dependencies from `bun.lock`
- `bun run dev` — start the local dev server
- `bun run build` — subset fonts, build with Astro, and index with Pagefind
- `bun run preview` — preview the production build
- `bun run lint` — run ESLint
- `bun run format:check` — run lint and Prettier checks

## Rules

- Site-wide settings, profile, navigation, and homepage content belong in `src/config/site.toml`; the schema is defined in `src/content.config.ts`.
- Content lives in `src/content/` (blog, projects, vibe, about). Use the `bun run <type>:new` scripts for scaffolds.
- Keep internal links base-path safe. `astro.config.mjs` sets `base` to `/index` on GitHub Actions; prefer relative or config-driven links over hardcoded root paths.
- Do not edit installed `@navfolio/*` packages in `node_modules`; put overrides in this repository.
- Do not commit secrets or environment-specific credentials.
- Font subsetting requires `fonttools` and `brotli` in `.venv`; `bun run build` fails without them.

## Deployment

The `Deploy to GitHub Pages` workflow runs on pushes to `main`. It installs Bun and Python font tools, runs `bun run build`, and deploys `dist/` through GitHub Pages. The repository Pages source must be `GitHub Actions`.
