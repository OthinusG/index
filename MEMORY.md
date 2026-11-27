# Project Memory

## Decisions

- On 2026-11-27 the site template was replaced: the Dante theme and its npm-based setup were removed in favor of astro-navfolio (v1 branch), MIT licensed.
- Public URL: `https://othinusg.github.io/index/`.
- `astro.config.mjs` auto-detects the GitHub Pages project path: on Actions it sets `site=https://othinusg.github.io/index` and `base=/index`.
- Package manager: Bun. `bun.lock` is tied to the npmmirror registry via `.npmrc`; keep them together.
- Build pipeline: `scripts/fonts/subset-ui-font.ts` (Python + FontTools + Brotli), `astro build`, then Pagefind indexing.
- The Projects and Vibe modules are enabled. The Media module was disabled because there is no content yet; re-enable it in `navfolio.config.ts` and add the nav link in `src/config/site.toml` if needed.
- Comments are disabled (`[config.comments]`); search is enabled.
- The site UI language is English (`config.theme.lang = "en"`).
- Profile email is a GitHub noreply placeholder (`26951345+OthinusG@users.noreply.github.com`); replace it with a real address in `src/config/site.toml` before relying on it.
- The old Dante content was migrated to the Navfolio content model; slugs were kept where possible (`welcome`, `personal-site`). The old `/contact` page was dropped; contact links live on the homepage.
- The upstream docs submodule (`src/docs`) is intentionally not used; content builds from `src/content`.

## Deployment

- Workflow: `.github/workflows/deploy-pages.yml` on pushes to `main` and manual dispatch.
- Node 22, Bun, and `python -m pip install --user fonttools brotli` are required in CI.
- GitHub Pages source is `GitHub Actions`; the site is a project page under `/index/`.
- Remote repository: `https://github.com/OthinusG/index.git`.
- Dependabot is configured for Bun packages and GitHub Actions (weekly).

## External resources

- Theme source: `https://github.com/dodolalorc/astro-navfolio`
- Theme license: MIT, preserved in `LICENSE`
- Online docs/demo: `https://astro.navfolio.site/`
