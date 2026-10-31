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
- The workflow also runs daily at 01:17 UTC (09:17 Asia/Shanghai) to rebuild and redeploy the site.
- GitHub Pages source must be `GitHub Actions`.
- Remote repository: `https://github.com/OthinusG/index.git`.
- GitHub Pages is enabled with source `GitHub Actions`; deployment run #2 succeeded.
- The first run failed because the workflow token cannot create the initial Pages site; Pages must be enabled manually in Settings before the first deploy.
- Public verification: homepage, blog, projects, tags, about, contact, RSS, sitemap, and favicon all return 200; canonical URL is `https://othinusg.github.io/index/`.
- Local verification: `npm run check` passes, production build succeeds, and all routes/assets work under `http://127.0.0.1:4321/index/`.

## External resources

- Theme source: `https://github.com/JustGoodUI/dante-astro-theme`
- Theme license: GPL-3.0, preserved in `LICENSE`
