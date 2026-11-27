# Site content maintenance

Use this guide to update [OthinusG/index](https://github.com/OthinusG/index). The site is built with Astro and Navfolio and published at <https://othinusg.github.io/index/>. Routine updates are local changes to Markdown, MDX, and TOML. The site renders this content without fetching GitHub, ORCID, or Bangumi at runtime.

## Give the agent a brief

Send this guide with the changes you want. Use this template for a full refresh or a smaller update.

```text
Update OthinusG/index using docs/site-content-maintenance.md.
Update: [Projects | Research | Media | Blog | Vibe | About | Home]
Changes or inputs: [items to add, revise, or remove, with source URLs or text]
Selection: [specific entries, a curated refresh, or every public repository]
Content language: [keep the site's current language unless specified]
Delivery: [local diff | commit on a work branch | open a PR | publish]
```

When the brief says “refresh,” check the relevant sources below and update confirmed changes in the requested sections. Continue with verified items when some inputs are missing. Report any item that needs the owner's decision, such as a new personal affiliation, an unconfirmed profile, or a change to first-person opinions.

## Start from the right checkout

1. Confirm the Git root and branch with `git rev-parse --show-toplevel`, `git status --short --branch`, and `git remote -v`. The target is the standalone `OthinusG/index` repository. Use a branch based on current `origin/main`, or follow the branch specified in the brief. If the current checkout has unrelated work or is on a Dependabot branch, use a separate worktree.
2. Read [AGENTS.md](../AGENTS.md), [README.md](../README.md), and [MEMORY.md](../MEMORY.md). Read the target content, its nearest working example, and the relevant section of [the content schema](../src/content.config.ts).
3. Update the existing entry when the subject already has one. Preserve its filename and URL, existing editorial text outside the requested change, and user changes in the checkout. Use lowercase hyphenated slugs for new entries. Update `MEMORY.md` when source, route, or maintenance decisions change.

## Where to edit

| Section                                  | Content                                                                                                 | Route under `/index/`           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Home, profile, navigation, site settings | [`src/config/site.toml`](../src/config/site.toml)                                                       | Home and shared navigation      |
| About                                    | [`src/content/about.mdx`](../src/content/about.mdx)                                                     | `about/`                        |
| Projects                                 | [`src/content/projects/`](../src/content/projects/), including `index.mdx` for the listing introduction | `projects/`, `projects/<slug>/` |
| Research                                 | [`src/content/pages/research.mdx`](../src/content/pages/research.mdx)                                   | `research/`                     |
| Media                                    | [`src/content/pages/media.mdx`](../src/content/pages/media.mdx)                                         | `media/`                        |
| Blog                                     | [`src/content/blog/`](../src/content/blog/)                                                             | `blog/`, `blog/<slug>/`         |
| Vibe                                     | [`src/content/vibe/`](../src/content/vibe/)                                                             | `vibe/`, linked from About      |

For new entries, use the corresponding scaffold:

```sh
bun run project:new my-project
bun run post:new my-post
bun run vibe:new my-note
```

Replace the scaffold title, description, date, and placeholder body with the intended content. Follow existing frontmatter for tags, drafts, and images. The public UI is English. Retain official publication and project names and recognizable titles for media works. Use relative image paths for content assets when the collection schema resolves them, and follow nearby examples for files in `public/`. Give meaningful images alt text.

### Projects

- Verify ownership, purpose, and status from the [public GitHub repository list](https://github.com/OthinusG?tab=repositories) and each repository's README and metadata. Check that a listed homepage opens and belongs to the project. An upstream homepage or demo needs an upstream label. If a project has no verified site, use its repository as the primary link.
- Add or update the project entry with a plain-language description of what it does, who it helps, and any platform constraints supported by the source. Follow the [Warpai card](../src/content/projects/warpai.md) for frontmatter. Put `Website` (`kind: website`) first when available, then `Source` (`kind: github`). Label forks and link the upstream. Describe the owner's changes only when supported by the fork's history or README. Mark archived or experimental work as such.
- Keep related items grouped where it helps navigation. The current site groups localization and desktop tools and links the full GitHub list. For an exhaustive request, check all pages of the public repository listing, account for each matching public repository, and provide direct links on the site. Preserve the existing featured order unless the brief changes it.

### Research

- Start from [ORCID 0000-0003-4153-9232](https://orcid.org/0000-0003-4153-9232) or its [public works endpoint](https://pub.orcid.org/v3.0/0000-0003-4153-9232/works). If the brief supplies a new DOI, cross-check identity and bibliographic metadata against the publisher or Crossref before adding it.
- Use the exact publication title, journal, formal publication year, and a canonical `https://doi.org/...` link. Use the online publication year only when a formal issue date is unavailable. Compare DOI values case-insensitively to prevent duplicate records. Keep groups and ordering consistent with the existing page.
- Keep research summaries within the evidence and publication record. Verify any code, dataset, or project association before adding it. Link the ORCID profile as a source for publications.

### Media

- Use the public [Bangumi profile](https://bgm.tv/user/othinus), its four linked collection indexes, and the [public API](https://bangumi.github.io/api/). Match items by subject ID and link to `https://bgm.tv/subject/<id>`. The site's Media page is a static selection in `src/content/pages/media.mdx`.
- For a snapshot refresh, use `GET /v0/users/othinus/collections` with `subject_type` set to 4 for games, 2 for anime, 6 for live action, and 1 for books. Read the response's `total` without a `type` filter for overall counts, then with `type=2` for completed and `type=3` for in progress. Refresh all four groups and the snapshot date together from the same source. If the API is unavailable, retain the previous dated counts and report the gap. An individual selection edit only requires verification of the items changed.
- Preserve the collection status and the source's distinction between a series, season, volume, or adaptation. Use the log as evidence of collection status. Collection updates may be backfilled, and the source records are insufficient to infer completion dates, rankings, or personal opinions. Link existing reviews, marking spoilers where appropriate. Use a Douban archive only if the owner provides a verifiable profile.

### Home, About, Blog, and Vibe

- Update Home copy and shared navigation in the TOML file. Follow its existing keys. Configuration links such as `/research` are normalized by the site's components. In MDX, use a relative URL that resolves from the rendered route, or follow the existing `import.meta.env.BASE_URL` pattern in About. Public links must resolve under `/index/`.
- Update About from verified or owner-supplied biography and profile links. Update existing articles in place. Keep long-form work in Blog and short updates in Vibe. Check metadata and images as well as the body.
- Keep site-wide descriptions consistent with meaningful content changes. Use the existing layout and content schema for ordinary updates. Route, theme, dependency, and workflow changes belong in separate work when required by the brief.

## Verify the update

Set up Python as described in the [README](../README.md). Run `bun install --frozen-lockfile` in a fresh checkout or after switching to a branch with a different lockfile. Use a Node.js version compatible with `package.json`. The GitHub Pages build uses Node 22 and `.venv` with `fonttools` and `brotli`.

```sh
bun run format:check
bun test
SITE_URL=https://othinusg.github.io/index/ SITE_BASE=/index/ bun run build
SITE_URL=https://othinusg.github.io/index/ SITE_BASE=/index/ bun run preview
```

- In the preview, start at `/index/` and navigate to the changed pages. Confirm the expected entries, link labels and destinations, images, status labels, and absence of placeholder text. Test changed external links and record access restrictions separately from broken targets. Use desktop and mobile widths for changes that affect navigation or layout, and check a distinctive new term in site search.
- Review the diff. Verify that old slugs still work, unrelated content remains intact, and no generated `dist/` files or lockfile changes were added for a content-only update. If a check fails, fix issues introduced by the update and rerun it. Report any pre-existing failure or unavailable check with the observed error.

## Deliver and verify publication

- Follow the requested delivery scope. A push to `main` triggers [Deploy to GitHub Pages](../.github/workflows/deploy-pages.yml). Use a local diff or work branch when publication has not been requested.
- For an authorized publication, verify that the successful GitHub Actions run built the intended commit. Then request the exact public URL and check for a distinctive updated title or entry in its HTML. A successful run and a previous page response can coexist until a cached copy expires. If the page looks stale, compare a normal request with the explicit `index.html` URL for that route, such as [/index/projects/index.html](https://othinusg.github.io/index/projects/index.html). Compare response dates, `Age`, or `ETag` when available. Report a browser or CDN cache issue separately from missing content in the deployed build.
- Report the sections and paths changed, source checks, build and preview results, and whether `MEMORY.md` changed. Include the branch, commit or PR and live verification when applicable. List any unresolved items explicitly.
