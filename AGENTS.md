# Portfolio development workflow

The user wants this portfolio maintained through terminal Git commits and pushes to `suryaaketi/suryaaketi.github.io`, with `main` as the publishing branch.

- Check the working tree before edits and preserve unrelated user changes.
- Make each commit represent a coherent, real improvement. Use descriptive messages and preserve the existing history.
- Review the diff, stage the intended files, and run checks appropriate to the change before committing.
- For portfolio changes, use `npm run build:github`; check TypeScript for TypeScript changes and `node scripts/check-reliability.mjs` for caching, fallback, or error-handling changes.
- Push authorized portfolio changes with normal terminal Git commands. The GitHub Pages workflow publishes pushes to `main`.
- Keep credentials out of source and never create filler or empty commits to inflate activity.
- The existing `.openai/hosting.json` belongs to the separate private Sites deployment. Preserve its project ID and audience. Its source helper pushes to a direct URL and does not replace the GitHub `origin` remote.

## GitHub access boundary

The user explicitly does not want organization access or organization files read. Restrict GitHub operations to `suryaaketi/suryaaketi.github.io`. Do not list, open, fetch, or read organization repositories.

Terminal Git authentication uses a dedicated write-enabled SSH deploy key registered only on this personal portfolio repository. Its private key remains outside this checkout and the repo-local `core.sshCommand` selects that identity exclusively. Do not start standard GitHub CLI OAuth login: its minimum organization-reading scope conflicts with the user's requested boundary.

## Public research content

The user wants the research internship explained through high-level contributions and purposes only. Do not publish internship source code, submitted notebooks, team artifacts, or implementation recipes. Expand the résumé-backed case study in `data/portfolio.ts`; keep the six-image scope and exact meaning of the reported 8.32% result.

## Appearance

The user wants only the charcoal and gold version. Do not reintroduce a light theme, system color switching, or theme selector. Print styles may use a white paper background. Preserve dashboard and disclosure preferences.
