# OthinusG

Personal site of [OthinusG](https://github.com/OthinusG): notes on materials chemistry, machine learning, and software projects.

Live site: <https://othinusg.github.io/index/>

## Stack

- [Astro](https://astro.build/) with content collections (Markdown / MDX)
- [Navfolio](https://github.com/dodolalorc/astro-navfolio) as the site framework and theme
- Bun for dependency management and scripts
- Pagefind for static full-text search
- Python 3 with FontTools and Brotli for CJK font subsetting during builds
- GitHub Actions for build and GitHub Pages deployment

## Local development

```sh
python3 -m venv .venv
.venv/bin/python -m pip install --upgrade pip fonttools brotli
bun install
bun run dev
```

Build and preview:

```sh
bun run build
bun run preview
```

## Content

- Site configuration: `src/config/site.toml`
- About page: `src/content/about.mdx`
- Blog posts: `src/content/blog/`
- Projects: `src/content/projects/`
- Short notes (Vibe): `src/content/vibe/`

Create new entries with:

```sh
bun run post:new my-post
bun run project:new my-project
bun run vibe:new my-note
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`, which builds with Bun and deploys `dist/` to GitHub Pages. The repository Pages source must stay on `GitHub Actions`.

The site is served from the `/index/` subpath; `astro.config.mjs` detects the GitHub Pages project path automatically.

## Credits

Based on [astro-navfolio](https://github.com/dodolalorc/astro-navfolio) by [dodolalorc](https://github.com/dodolalorc), licensed under the MIT License. See `LICENSE`.
