# Single-owner website boilerplate

A deliberately small starting point for German-first personal and professional websites built with Next.js and Sanity. Clone it for one owner and one website; do not turn it into a runtime site generator or multi-tenant platform.

The architectural contract lives in [`ARCHITECTURE.md`](./ARCHITECTURE.md). In short: Sanity owns editorial words and media; Git owns routes, components, behavior, layout, and design tokens.

## What is included

- Next.js 16 App Router, React Server Components, strict TypeScript, and Tailwind CSS 4
- A standalone Sanity Studio with fixed singleton documents, projects, posts, legal pages, and controlled Portable Text
- Sanity TypeGen-generated query types
- Fixed German route namespaces for home, about, projects, blog, contact, imprint, and privacy
- Published-only public reads with signed broad webhook revalidation
- authenticated Draft Mode, Presentation, Visual Editing, and preview-only live draft updates
- canonical metadata, Open Graph/X metadata, JSON-LD, sitemap, robots, and RSS
- responsive semantic UI, visible focus treatment, reduced-motion handling, Vitest, Playwright, and accessibility smoke checks

There is intentionally no seed content, page builder, author collection, theme registry, i18n framework, contact backend, analytics, database, queue, or tenant abstraction.

## First setup

Requirements: Node.js 24 or newer and pnpm 11.25.0.

1. Create one Sanity project with one `production` dataset in [Sanity Manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env.local` and fill the project ID in both the Next.js and Studio-prefixed variables.
3. Create a Sanity Viewer token for server-side draft reads. Put it only in `SANITY_API_READ_TOKEN`.
4. Set `NEXT_PUBLIC_SITE_URL` to the website origin and `NEXT_PUBLIC_SANITY_STUDIO_URL` to the standalone Studio origin.
5. Install and start the application:

   ```bash
   pnpm install
   pnpm dev
   ```

6. In another terminal, start the Studio:

   ```bash
   pnpm studio:dev
   ```

The public website builds without Sanity credentials and shows legitimate empty states. It never falls back to Git-owned copies of editorial content.

## Preview and publishing

Add the local and deployed website origins to the Sanity project's CORS origins with credentials enabled. In Studio Presentation, the configured preview URL calls `/api/draft-mode/enable`; only this authenticated flow reads drafts, exposes the Viewer token to the preview browser, enables source maps, or mounts live editing.

For public freshness, create a signed Sanity webhook for create, update, and delete events:

- URL: `https://your-site.example/api/revalidate`
- secret: the same value as `SANITY_REVALIDATE_SECRET`
- drafts and versions: excluded

Public visitors use the published perspective without a token or browser live-content connection.

## Content ownership

The Studio exposes direct entries for Startseite, Über mich, Kontakt, Impressum, Datenschutz, and Website-Einstellungen, plus the Projekte and Blog collections. Singleton creation, duplication, and deletion are constrained in the Studio UI.

When adapting the boilerplate:

- edit branding, tokens, layout, components, routes, and behavior in Git;
- edit owner details, page copy, projects, posts, images, and SEO values in Sanity;
- replace the neutral visual styling directly—do not add a theme/configuration engine;
- keep new dynamic Sanity slugs runtime-capable; do not set `dynamicParams = false`.

## Commands

| Command                | Purpose                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| `pnpm dev`             | Start the Next.js app                                                |
| `pnpm studio:dev`      | Start the standalone Studio                                          |
| `pnpm sanity:typegen`  | Extract the schema and regenerate `sanity.types.ts`                  |
| `pnpm sanity:validate` | Validate documents in the configured dataset (requires Sanity login) |
| `pnpm studio:deploy`   | Deploy the Studio to Sanity hosting                                  |
| `pnpm format:check`    | Check formatting                                                     |
| `pnpm lint`            | Run ESLint                                                           |
| `pnpm typecheck`       | Run strict TypeScript checking                                       |
| `pnpm test`            | Run unit tests                                                       |
| `pnpm test:e2e`        | Run responsive browser and accessibility smoke tests                 |
| `pnpm build`           | Create a production build                                            |
| `pnpm check`           | Run the local non-browser verification suite                         |

Commit `schema.json` and `sanity.types.ts`. CI regenerates both and fails when they drift.

## Deployment

Deploy the Next.js application as one normal Vercel project. Deploy the Studio separately with `pnpm studio:deploy`. Configure the same environment values in each host, keeping `SANITY_API_READ_TOKEN` and `SANITY_REVALIDATE_SECRET` server-only.
