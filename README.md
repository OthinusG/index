# OthinusG

Personal blog and project notebook for [OthinusG](https://github.com/OthinusG), built with Astro and the Dante theme.

Live site: <https://othinusg.github.io/index/>

## Stack

- Astro 7
- Tailwind CSS 4
- Markdown/MDX content collections
- GitHub Pages via GitHub Actions

## Local development

```sh
npm ci
npm run dev
```

The site is served under `/index/` locally because `base` is configured for the GitHub Pages project URL.

## Content

- Site metadata, navigation, and hero content: `src/data/site-config.ts`
- Blog posts: `src/content/blog/`
- Projects: `src/content/projects/`
- Static pages: `src/content/pages/`
- Shared internal URL handling: `src/utils/path-utils.ts`

## Verification

```sh
npm run check
npm run build
npm run preview
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. In the repository settings, GitHub Pages must use `GitHub Actions` as its source.

## Theme

Based on [Dante](https://github.com/JustGoodUI/dante-astro-theme) by [Just Good UI](https://justgoodui.com/), licensed under GPL-3.0. The original license is preserved in `LICENSE`.
