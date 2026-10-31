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
- GitHub Pages has not been enabled yet. Workflow run `41173101316` failed at `Configure Pages` with `Resource not accessible by integration`; the workflow token cannot create the initial Pages site.
- Required fix: repository Settings -> Pages -> Build and deployment -> Source = GitHub Actions, then rerun the workflow. No code change is needed.
- Verified locally: `npm run check` passes, production build succeeds, and all routes/assets work under `http://127.0.0.1:4321/index/`.

## External resources

- Theme source: `https://github.com/JustGoodUI/dante-astro-theme`
- Theme license: GPL-3.0, preserved in `LICENSE`
