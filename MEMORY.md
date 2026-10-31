# Project Memory

## Decisions

- The project is a personal blog derived from the Dante Astro theme, not a theme demo.
- Public URL: `https://othinusg.github.io/index/`.
- Astro `site` is the origin (`https://othinusg.github.io`); `base` is `/index/`.
- Internal links must go through `withBase()` so dev, preview, and GitHub Pages agree on the base path.
- Theme demo posts, projects, images, and fictional personal details were removed. Starter content is intentionally minimal and may be replaced by the owner.
- The newsletter form is disabled until a real provider endpoint exists.
- The favicon is a local monogram, not a remote asset.

## Deployment

- Package manager: npm; commit `package-lock.json`.
- GitHub Actions builds with Node 24, runs `astro check`, builds, and deploys the `dist/` artifact.
- GitHub Pages source must be `GitHub Actions`.
- Remote repository: `https://github.com/OthinusG/index.git`.

## External resources

- Theme source: `https://github.com/JustGoodUI/dante-astro-theme`
- Theme license: GPL-3.0, preserved in `LICENSE`
