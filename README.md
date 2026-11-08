# Surya Aketi — Portfolio

A responsive portfolio for Surya Aketi's projects, research, experience, skills, and résumé. Its black and gold theme pairs the supplied Surya Aketi emblem with muted angular gold lines, warm gold accents, and neutral charcoal glass panels. The glass treatment preserves the existing layout, typography, content, and interactions; browsers without backdrop blur keep opaque panels. The artwork edges blend into the page, and reduced-motion preferences are respected. Profile content is based on the supplied résumé and can be expanded with additional project context and achievements.

The same page supports two deployment targets:

- **Sites:** the Vinext application, with its existing hosting configuration and private access settings.
- **GitHub Pages:** a static React build for a public portfolio, including an automated deployment workflow.

Publishing to one target does not publish to the other or change its access settings.

## Run locally

Install Node.js 22.13 or newer, then open this project directory in a terminal:

```sh
npm run install:ci
npm run dev
```

Open the local URL printed by the development server. Stop it with Ctrl+C. The lockfile is included for reproducible installation; use `npm run install:ci` after changing computers or downloading a fresh copy.

To preview the exact static GitHub Pages version:

```sh
npm run build:github
npm run preview:github
```

## Update the portfolio

Edit `data/portfolio.ts` to update the profile, experience, project details, skills, and links. The starting content includes Penn State education, research and Wyntek experience, and the LocalScribe and TaskBridge projects. Keep any unconfigured links empty until the real destination is available. A GitHub account URL has not been assumed.

Expand each experience entry with responsibilities and achievements. Expand each project with the problem, personal contribution, outcome, and source or demo links that can be shared. Add numbers only when they can be substantiated.

| File | Purpose |
| --- | --- |
| `data/portfolio.ts` | Editable profile and portfolio content |
| `app/page.tsx` | Sections, expandable content, and interactions |
| `app/globals.css` | Typography, spacing, colors, and mobile layouts |
| `components/research-case-study.tsx` | Public overview of research work and its purpose; no research source code |
| `components/portfolio-dashboard.tsx` | Interactive Overview/Toolkit dashboard in the hero |
| `components/portfolio-dashboard.css` | Scoped dashboard styling and workflow animation |
| `components/project-timeline.tsx` | Circular build-duration charts and scroll animation |
| `components/project-timeline.css` | Gold ring styling, readable labels, and responsive layout |
| `components/coursework.tsx` | Relevant coursework grouped by academic area |
| `components/coursework.css` | Coursework cards and responsive course lists |
| `app/layout.tsx` | Sites page title and description |
| `github/index.html` | GitHub Pages title, description, and browser theme color |
| `public/favicon.svg` | Browser icon |
| `public/Surya_Aketi_Resume.pdf` | Downloadable résumé |
| `public/` | Images and other public files |

Use relative public-asset paths such as `./Surya_Aketi_Resume.pdf` so files work under a GitHub repository URL as well as the site root. The GitHub build rewrites its favicon and generated script/style links to relative paths automatically.

Project cards and detail views include circular build timelines when `buildTimeline` is present in `data/portfolio.ts`. LocalScribe shows 2 months out of 12 (16.67%); TaskBridge shows 1 month out of 24 (4.17%), using the supplied durations. These measure time spent building, not completion or calendar dates. Add `{ months, referenceMonths }` for future projects with confirmed timing. Rings fill when scrolled into view and replay on re-entry; reduced motion, unsupported animation, and the no-JavaScript version show the final values immediately.

`courseworkGroups` in the same data file holds public course codes, titles, and optional current/planned labels. Keep entries deduplicated and update those labels as terms change. The coursework section appears below education and is also present without JavaScript. Titles are expanded using the official [CMPSC](https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpsc/), [MATH](https://bulletins.psu.edu/university-course-descriptions/undergraduate/math/), [STAT](https://bulletins.psu.edu/university-course-descriptions/undergraduate/stat/), and [CMPEN](https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpen/) catalogs. Do not add grades, GPA, student identifiers, academic-record files, or transcript downloads to this public repository.

Update the title and description in both `app/layout.tsx` and `github/index.html` when they change. Review the résumé PDF and all public content before publication.

## Publish on GitHub Pages

This setup is ready to place in a GitHub repository. It does not create a GitHub repository or publish to GitHub by itself.

1. Create a repository and upload the contents of this project directory, including the hidden `.github/` directory and `package-lock.json`. Keep `node_modules/`, generated build directories, and local runtime files out of Git.
2. Use `main` as the deployment branch, or change `.github/workflows/deploy.yml` to match your branch name.
3. In the repository, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source.
4. Push a commit to `main`, or open **Actions → Publish portfolio to GitHub Pages → Run workflow**.
5. Open the URL shown by the completed deployment. GitHub also shows it in **Settings → Pages**.

The workflow installs the locked dependencies, runs `npm run build:github`, uploads `dist-github/`, and deploys that output with the official Pages actions. It uses GitHub's built-in workflow token; no personal access token or Sites credential is required. Repository and organization rules may require approval of the `github-pages` environment.

The static build uses relative URLs and works for both a repository site and an account site without hardcoding a username or repository name. This is a single-page portfolio with in-page section links. Future server routes, private data, authentication, or form processing will require separate hosting; GitHub Pages serves static files only.

Treat a GitHub Pages publication as public: include only information and files intended for visitors. GitHub repository visibility and Pages visibility are separate settings.

Official setup reference: [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Sites build and hosting

`npm run build` preserves the Vinext/Sites build. `npm start` previews its built Worker locally; it does not deploy to production. The GitHub build uses `vite.github.config.ts` and writes to `dist-github/`, leaving the Sites `dist/` output separate.

When editing or publishing through the Sites plugin, follow its maintained workflow. The existing `.openai/hosting.json` binds this checkout to its Site: preserve the project ID when updating that Site. Publishing an update preserves its audience; a private Site remains private until its access settings are explicitly changed.

Keep `vite.config.ts`, `worker/`, and `scripts/` intact for the Sites target. A fresh checkout defaults to the portable execution profile. Local `.sites-runtime/` and `.wrangler/` state is disposable and must not be committed.

## Commands

| Command | Result |
| --- | --- |
| `npm run install:ci` | Install the versions in the lockfile |
| `npm run dev` | Start the local Vinext development server |
| `npm run build` | Build the Sites/Vinext application |
| `npm start` | Preview the built Sites Worker locally |
| `npm run build:github` | Create the static site in `dist-github/` |
| `npm run preview:github` | Preview the static GitHub Pages build locally |

No API keys are required for the portfolio. Do not commit `.env*`, `.dev.vars*`, keys, access tokens, or local tool state.


## Usability and reliability

The portfolio uses 16px body copy and a 14px minimum for labels at the browser’s default text size, with rem units for text scaling. Controls have at least 44px touch targets. Layouts reflow on small screens and with larger text. The portfolio uses a fixed black and gold palette; icons are SVG. The transparent name artwork is in `public/surya-aketi-lettering.png`, displayed as an accessible heading with intrinsic dimensions to avoid layout shifts. The original artwork is retained as `public/surya-aketi-emblem.png`. `public/site-background.css` supplies one shared black surface for both publishing targets; transparent space around the letters shows that same surface without an image boundary or edge mask. Its local `public/gold-geometry.svg` supplies static polygon lines scaled to cover the viewport at a muted opacity for text readability. Decorative backgrounds are hidden for print and forced colors.

The website always uses its charcoal and gold appearance, regardless of old color preferences or the device’s color setting. Job descriptions and their highlights are always visible. The dashboard view and certification disclosures are saved locally on the visitor’s device. If local storage is unavailable, the page remains usable. Reduced-motion settings are respected and touch controls provide press feedback.

The static build includes complete résumé-based initial content before JavaScript loads. It also remains readable if JavaScript is blocked. Client and server failures provide friendly retry, résumé, and contact options. The portfolio has no contact form, text inputs, submit actions, or loading spinners.

Content-fingerprinted assets use immutable browser caching on Sites; private HTML and React navigation responses remain uncached. The résumé revalidates so a replaced file is current. GitHub Pages response caching is controlled by GitHub. No service worker or offline cache of private pages is installed.

Run `node scripts/check-reliability.mjs` for focused caching, fallback-content, and failure-response checks. `npm run build:github` and the normal Sites build validate both targets.

## Terminal development workflow

This portfolio is intended to be maintained at `suryaaketi/suryaaketi.github.io`, with `main` as its publishing branch. Work in this checkout, keep changes focused, and use a descriptive commit for each real improvement.

Before editing, check for local changes and synchronize with the remote:

```sh
git status
git pull --ff-only origin main
```

After editing, review the diff, run the checks appropriate to the change, stage the intended files, and commit. Then upload the commit:

```sh
git diff
npm run build:github
git add <files-you-changed>
git commit -m "Describe the improvement"
git push origin main
```

The included GitHub Actions workflow builds and publishes the website after pushes to `main`. GitHub associates commits with the email in the repository's local Git configuration; use an address linked to the intended GitHub account or that account's GitHub-provided noreply address.

### Repository-only authentication

Terminal Git access uses a dedicated SSH deploy key attached only to the personal `suryaaketi.github.io` repository. The private key is stored outside the checkout and selected by this checkout's local Git configuration. No organization OAuth permissions are required. Repository creation and Pages settings can be managed in the personal repository's browser interface.

### Research content

The `researchStudy` object in `data/portfolio.ts` supplies the detailed Penn State case study and its no-script fallback. Each workstream explains the contribution and its purpose. Keep this section at a public overview level: do not add internship source code, submitted notebooks, team artifacts, or implementation instructions. Preserve the scope of the reported six-image comparison when editing the 8.32% finding.
