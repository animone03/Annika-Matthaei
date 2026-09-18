# ARCHITECTURE.md

## Purpose

This document defines the high-level technical architecture for this repository.

It is intended primarily for coding agents and engineers. It preserves the important architectural decisions, boundaries, and design intent while leaving room for sensible implementation-level iteration.

When implementing a feature:

1. Follow the architectural invariants in this document.
2. Prefer the simplest solution that fits the existing design.
3. Do not introduce infrastructure or abstractions for hypothetical future requirements.
4. If a requested change conflicts with an invariant, surface the conflict before implementing it.
5. Treat items marked **Open / implementation choice** as areas where a concrete implementation decision may still be made.

---

# 1. Product context

This is a **single-owner personal / professional website** built with Next.js.

The site should be:

- easy to maintain;
- pleasant for a non-developer to edit;
- visually flexible;
- accessible;
- SEO-friendly;
- fast;
- simple to deploy;
- suitable for a portfolio and blog;
- primarily German / DACH-focused.

Sanity CMS is used so ordinary editorial changes do not require Git, a terminal, or a deployment.

The project is **not** a multi-tenant platform and should not inherit architecture from one.

There is:

- one website;
- one Sanity project;
- one primary production dataset;
- one Vercel deployment;
- one design system;
- one codebase.

---

# 2. Core architectural principle

The most important separation in the system is:

```text
Sanity answers:
"What should the website say/show?"

Git answers:
"How should the website work/look?"
```

## Sanity owns editorial content

Examples:

- homepage copy;
- profile/about content;
- portfolio projects;
- blog posts;
- editorial images and galleries;
- contact-page copy;
- selected featured projects/posts;
- SEO titles/descriptions/social images;
- social/contact details where useful for the owner to edit them;
- legal-page copy if we intentionally choose to make it CMS-editable.

## Git owns application behavior

Examples:

- Next.js routes;
- React components;
- application logic;
- layout;
- navigation behavior;
- Tailwind classes;
- semantic design tokens;
- theme implementation;
- responsive behavior;
- accessibility behavior;
- structured-data implementation;
- caching strategy;
- Sanity schemas and queries;
- environment configuration;
- secrets;
- integrations.

## Important invariant

Do **not** create parallel authoritative copies of the same content in both Git and Sanity.

If Sanity is enabled for a content type, Sanity is the source of truth for that content.

Do not implement MDX-to-Sanity runtime merging, fallback precedence, synchronization, or CMS overrides unless a future explicit requirement justifies that complexity.

---

# 3. Recommended stack

The intended stack is:

- **Next.js 16.x App Router**;
- **React 19.x**;
- **TypeScript**;
- **Node.js current LTS**;
- **pnpm**;
- **Sanity Studio 6.x**;
- **next-sanity 13.x or compatible current stable**;
- **Sanity Content Lake**;
- **Sanity Portable Text**;
- **Sanity TypeGen**;
- **Tailwind CSS 4.x**;
- **shadcn/ui-derived owned components**;
- **Zod only where application/runtime validation materially benefits from it**;
- **Vercel**;
- **Playwright**;
- **Vitest**;
- **ESLint**;
- **Prettier**.

Exact dependency versions should be pinned and updated deliberately.

Do not automatically switch to preview/canary/beta framework features without a clear reason and stable fallback.

---

# 4. What should NOT be built

Unless a future requirement explicitly changes the product scope, do not introduce:

- a monorepo;
- Turborepo;
- PostgreSQL;
- Redis / KV for application state;
- a control plane;
- a worker fleet;
- tenant concepts;
- provisioning infrastructure;
- multi-project Sanity orchestration;
- a generic page-builder framework;
- theme version registries;
- customer-specific deployment logic;
- a custom CMS;
- a runtime plugin system;
- arbitrary CMS-provided JavaScript;
- arbitrary CMS-provided React;
- arbitrary CMS-provided HTML;
- arbitrary CMS-provided CSS;
- arbitrary Tailwind class strings from Sanity;
- a general-purpose workflow engine;
- Effect across the application;
- GraphQL unless a concrete consumer requires it;
- search infrastructure before there is enough content to justify it;
- comments, accounts, reactions, or newsletters by default.

Prefer deletion of unused abstraction over preserving hypothetical flexibility.

---

# 5. Repository shape

This should remain a normal single Next.js repository.

Representative structure:

```text
/
├── src/
│   ├── app/
│   │   ├── (website)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── ueber-mich/
│   │   │   ├── projekte/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── kontakt/
│   │   │   ├── impressum/
│   │   │   └── datenschutz/
│   │   ├── api/
│   │   │   └── draft-mode/
│   │   │       ├── enable/
│   │   │       └── disable/
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   └── error.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── portable-text/
│   ├── sanity/
│   │   ├── schemaTypes/
│   │   │   ├── documents/
│   │   │   └── objects/
│   │   ├── queries/
│   │   ├── lib/
│   │   ├── presentation/
│   │   └── structure.ts
│   ├── config/
│   ├── lib/
│   └── styles/
├── public/
├── tests/
├── sanity.config.ts
├── sanity.cli.ts
├── sanity.types.ts
├── next.config.ts
├── package.json
└── pnpm-lock.yaml
```

This tree is guidance, not a rigid API. Keep related files close together when that improves readability.

Do not extract internal packages unless a real independent boundary emerges.

---

# 6. Sanity topology

Use:

```text
Sanity project:
one project for this site

Dataset:
production

Studio:
one Studio configured for that project
```

For a public portfolio/blog, a public dataset is normally appropriate because published content is intentionally public.

Draft documents remain authenticated.

If genuinely confidential unpublished files become a requirement, revisit the media/storage model instead of assuming ordinary Sanity assets are private.

## Studio hosting

**Default recommendation:** deploy the Studio separately using Sanity-hosted Studio.

This keeps the editor deployment independent from the Next.js application and keeps the website build smaller.

An embedded `/studio` route is supported and can be reconsidered if the UX benefit is clearly worth coupling Studio and frontend deployments.

This is an **Open / implementation choice**, not an architectural invariant.

---

# 7. Sanity content model

Prefer a small semantic content model over a general page builder.

Recommended top-level documents:

```text
siteSettings   singleton
homePage       singleton
aboutPage      singleton
contactPage    singleton
project        collection
post           collection
legalPage      optional collection or fixed documents
```

## Singleton documents

Singletons should have fixed document IDs and appear as direct navigation items in Studio.

Editors should see something like:

```text
Website
────────────────
Startseite
Über mich
Kontakt

Projekte
Blog

Rechtliches
────────────────
Website-Einstellungen
```

Do not expose “Create another homepage” or similar confusing generic CMS behavior.

## Fixed page structure

Important website pages should normally have **fixed React composition**.

Example:

```text
Homepage

Hero
↓
Intro
↓
Featured projects
↓
Latest posts
↓
Contact CTA
```

Sanity controls the content inside these sections.

React controls:

- order;
- layout;
- responsive behavior;
- animation;
- accessibility;
- styling.

Do not turn the homepage into a reorderable arbitrary page-builder array unless a real editorial need appears.

---

# 8. Long-form content

Use **Portable Text** for:

- blog article bodies;
- project/case-study narratives;
- longer profile/editorial text.

Allow a small controlled vocabulary.

Example:

```text
paragraph
heading 2
heading 3
bold
italic
link
blockquote
image
gallery
callout
```

Custom Portable Text objects map to code-owned React components.

Example:

```text
Sanity gallery object
    ↓
<ImageGallery />
```

Content authors should not control:

- component implementation;
- CSS classes;
- raw HTML;
- arbitrary embeds;
- JavaScript;
- React props that expose styling internals.

---

# 9. Project model

A project should remain structurally predictable.

Representative shape:

```text
project
├── title
├── slug
├── summary
├── publishedAt
├── featured
├── coverImage
├── role
├── disciplines[]
├── projectUrl?
├── body
├── gallery[]
└── seo
```

The project page layout remains React-owned.

Example:

```text
Project header
↓
Cover
↓
Project facts
↓
Case-study body
↓
Gallery
↓
Related projects
↓
Contact CTA
```

A redesign should generally require changing React/Tailwind, not migrating arbitrary layout configuration in Sanity.

---

# 10. Blog model

The blog should remain useful but deliberately small.

Representative post:

```text
post
├── title
├── slug
├── description
├── publishedAt
├── updatedAt?
├── featured
├── coverImage?
├── topics[]
├── body
├── related[]
└── seo
```

Do not introduce a separate Author collection while the site has one author.

Author identity should come from `siteSettings`.

Use one simple `topics` taxonomy initially.

Do not introduce categories + tags + series + taxonomies simultaneously.

## Essential blog features

Support:

- blog index;
- post route;
- published date;
- optional updated date;
- featured posts;
- cover image;
- topics;
- previous/next navigation;
- optional manually related posts;
- RSS;
- sitemap;
- canonical metadata;
- Open Graph metadata;
- `BlogPosting` structured data;
- draft preview through Sanity Presentation.

## Deferred blog features

Defer until needed:

- search;
- comments;
- reactions;
- views;
- newsletters;
- scheduled publishing;
- automatic recommendations;
- complex taxonomy pages;
- dynamic social-image generation.

---

# 11. Routing

Next.js owns route namespaces.

Initial routes:

```text
/
/ueber-mich
/projekte
/projekte/[slug]
/blog
/blog/[slug]
/kontakt
/impressum
/datenschutz
```

Fixed pages do not need editable slugs.

Sanity `slug` fields are appropriate for dynamic collections such as `project` and `post`.

Because projects and posts occupy different route namespaces, both may safely use the same slug:

```text
/projekte/example
/blog/example
```

## Important Next.js behavior

Do not set:

```ts
export const dynamicParams = false
```

for Sanity-backed collections if new posts/projects should work without a Vercel rebuild.

Newly published Sanity documents must be able to render at runtime and then participate in the selected cache strategy.

---

# 12. Next.js rendering model

Use:

- App Router;
- React Server Components by default;
- Client Components only where browser interaction requires them;
- server-side Sanity queries;
- current supported Next.js Cache Components integration;
- normal Vercel Next.js deployment rather than static export.

Good Server Component candidates:

- page layouts;
- homepage sections;
- project/blog lists;
- project/blog detail;
- Portable Text rendering;
- metadata;
- sitemap;
- RSS.

Client Components should remain narrow leaves:

- mobile menu;
- optional theme toggle;
- gallery/lightbox interaction;
- small interactive widgets.

Do not add `"use client"` high in the tree without necessity.

---

# 13. Sanity data access

Use `next-sanity` and `defineQuery`.

Queries should live in source control and return only the data needed by the relevant page/component.

Example flow:

```text
Server Component
    ↓
sanityFetch / cached Sanity helper
    ↓
GROQ query
    ↓
TypeGen result type
    ↓
React component
```

Use Sanity TypeGen rather than maintaining duplicate handwritten TypeScript interfaces for every query.

Avoid the triple-maintenance pattern:

```text
Sanity schema
+ handwritten TS interface
+ identical Zod schema
```

Use runtime validation only for places where data crosses an untrusted application boundary or where it adds material safety.

---

# 14. Type generation and validation

Sanity schemas are code-owned.

Recommended commands:

```text
sanity schema extract
sanity typegen generate
sanity documents validate
```

CI should fail when generated types are out of date.

Schema validation primarily improves authoring and consistency.

Remember that Sanity Studio validation is not equivalent to database-level server enforcement. This site should avoid programmatic content writes unless a future feature requires them.

---

# 15. Published content caching

Use the current officially supported `next-sanity` + Next.js Cache Components integration.

The objective is:

```text
published Sanity content
    ↓
server fetch
    ↓
cached output/data
    ↓
fast public page
```

Content changes should not require a Vercel deployment.

Avoid rebuilding the complex tenant-specific cache/tag machinery from the earlier platform architecture.

This is one site and one content source.

Keep the invalidation model broad and understandable unless measurements demonstrate a need for more granular tags.

---

# 16. Public revalidation strategy

There are two valid approaches.

## Preferred privacy-minimal approach

For the public website:

```text
Sanity publish
    ↓
signed Sanity webhook
    ↓
Next.js revalidation route
    ↓
broad site/content invalidation
```

For a small portfolio/blog, broad invalidation is acceptable and easier to reason about.

Example scope could be:

```text
revalidatePath("/", "layout")
```

or an equivalent current stable broad cache invalidation strategy.

This avoids keeping a Sanity live-content browser connection open for normal public visitors.

## Alternative

Use Sanity Live for published content as documented by the current official integration.

This reduces manual invalidation wiring and may be preferable if its runtime/privacy characteristics are acceptable.

## Open / implementation choice

Before implementation, explicitly choose one:

```text
A. public webhook invalidation + live preview only
B. Sanity Live for public + preview
```

For a Germany/DACH-focused personal site, default to **A** unless there is a strong reason otherwise.

---

# 17. Draft preview and Visual Editing

Sanity Presentation is a first-class feature of this architecture.

The editing workflow should ideally be:

```text
Open Studio
↓
Open Presentation
↓
See website
↓
Click visible text/image
↓
Edit corresponding field
↓
See draft update
↓
Publish
```

Use:

- Presentation Tool;
- Next.js Draft Mode;
- current `next-sanity` preview enable/disable helpers;
- draft perspective;
- Content Source Maps;
- stega encoding for visible draft content;
- `<VisualEditing />`;
- Viewer-level read token.

The public website must never expose draft content.

## SEO warning

Do not allow stega/source-map encoding into:

- metadata;
- canonical URLs;
- slugs;
- sitemap values;
- robots values;
- structured IDs.

Fetch metadata and machine-readable values with stega disabled.

---

# 18. Token and secret policy

Normal public published content should not require an elevated Sanity token when using a public dataset.

Recommended model:

```text
Public published reads
→ no token where possible

Draft server reads
→ Viewer token

Browser live preview
→ Viewer-level browser token only if required by selected live-preview implementation

Studio editing
→ Sanity user authentication
```

Never expose:

- Administrator API tokens;
- Editor/write tokens;
- project-management tokens;
- Vercel secrets;
- arbitrary environment secrets.

Secrets live in deployment environment variables or secret storage, never in Sanity documents.

---

# 19. Images

For editor-managed media, use Sanity image fields.

Benefits:

- drag/drop upload;
- crop;
- hotspot;
- automatic CDN delivery;
- image transformations;
- no manual repository commit required.

Every editorial image should have an alt-text field.

Representative object:

```text
editorialImage
├── image asset
├── alt
└── caption?
```

For rendering, prefer the stable combination:

```text
Sanity image field
+ @sanity/image-url
+ next/image
```

Do not make an alpha image integration critical to the initial production implementation.

## Confidential-media rule

Ordinary Sanity image/file assets should be treated as public website media.

Do not upload confidential contracts, private IDs, HR files, or other sensitive material into the normal website asset pipeline.

---

# 20. SEO

SEO implementation remains Next.js-owned.

Sanity supplies editable values:

```text
title
description
social image
published date
updated date
optional noIndex
```

Code owns:

- canonical URL construction;
- fallback metadata;
- Open Graph shape;
- Twitter metadata;
- sitemap;
- robots;
- RSS;
- JSON-LD structure;
- locale handling.

Recommended structured data:

- `Person` on the main/profile context;
- `BlogPosting` for posts;
- an appropriate `CreativeWork`-style schema for portfolio projects where useful.

All JSON-LD generation stays code-owned.

---

# 21. Language strategy

Phase 1 is German-first.

Use:

```html
<html lang="de">
```

German remains at the root:

```text
/
/ueber-mich
/projekte
/blog
```

Do not add `/de`.

Do not install a full i18n routing framework before English content exists.

## Future English path

When English becomes a real requirement:

```text
German:
/blog/typografie-im-web

English:
/en/blog/web-typography
```

Add:

- English content fields/documents or a localized-document strategy;
- `next-intl` or another appropriate UI translation layer;
- locale-aware navigation;
- canonical/hreflang logic;
- localized sitemap entries.

Do not silently fall back from a missing English article to German at an `/en/...` URL.

The exact Sanity localization model is **deferred until English is real**.

---

# 22. Design system

The visual system remains entirely code-owned.

Layering:

```text
primitive values
↓
semantic CSS variables
↓
Tailwind theme mapping
↓
owned UI primitives
↓
sections/layout components
↓
Sanity content
```

## Semantic tokens

Use CSS variables for concepts such as:

```text
background
foreground
surface
muted
border
accent
accent-foreground
focus-ring
radius
font roles
```

Do not over-tokenize every margin or padding value.

Use ordinary Tailwind spacing utilities where they are clearer.

## Dark mode

Dark mode is optional and product-driven.

Do not ship a low-quality automatic dark theme merely because the token system can support one.

---

# 23. shadcn/ui

Treat shadcn/ui as a source-code generator / reference implementation.

Selected components are copied into:

```text
src/components/ui/
```

Then they become owned repository code.

Use shadcn only for components where it materially saves work, for example:

- Button;
- Sheet / mobile navigation;
- Accordion;
- Dialog when actually required.

Sanity content must never directly select arbitrary shadcn variants or CSS classes.

A CMS field may expose a semantic choice only when it has editorial meaning.

Example:

```text
callout tone:
note | important
```

rather than styling implementation details.

---

# 24. Navigation

Default recommendation: keep primary route destinations in code.

Example:

```ts
[
  { label: "Start", href: "/" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Projekte", href: "/projekte" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
]
```

This keeps fundamental application information architecture stable.

If later the owner genuinely needs to reorder or rename navigation without code changes, moving labels/order into Sanity is reasonable.

Do not make navigation CMS-driven simply because it can be.

---

# 25. Legal / privacy posture

This site targets Germany/DACH.

At minimum, plan for:

```text
/impressum
/datenschutz
```

The actual legal obligations and copy depend on the real owner, services, analytics, forms, cookies, and processing.

Architecture should minimize the privacy surface:

- self-host fonts through Next.js;
- no analytics initially unless deliberately chosen;
- no unnecessary cookies;
- no custom form backend initially unless useful;
- avoid third-party browser scripts by default;
- document Sanity/Vercel processing in legal review when applicable.

This document is an architecture guide, not legal advice.

---

# 26. Contact

Default Phase 1 contact experience:

- visible email;
- selected social links;
- optionally CV/vCard.

Do not add a form backend simply because portfolio sites often have one.

If a form is added later, it requires deliberate decisions about:

- spam protection;
- validation;
- email delivery;
- PII;
- retention;
- privacy policy;
- monitoring.

---

# 27. Quality baseline

## TypeScript

- strict mode;
- avoid `any`;
- generated Sanity query types;
- small explicit component contracts.

## Linting and formatting

- ESLint;
- Next.js core-web-vitals rules;
- Prettier;
- Tailwind Prettier plugin if useful.

## Accessibility

Target WCAG 2.2 AA.

At minimum verify:

- keyboard navigation;
- visible focus;
- heading hierarchy;
- landmarks;
- image alt text;
- link purpose;
- color contrast;
- zoom;
- reduced-motion behavior;
- mobile navigation;
- automated accessibility checks on representative pages.

Automated testing does not replace manual accessibility review.

## Tests

Use Vitest for real logic, such as:

- metadata helpers;
- date formatting;
- URL helpers;
- content transformations;
- related-post behavior;
- sitemap/RSS utilities.

Use Playwright for high-value flows:

- homepage/navigation;
- project listing/detail;
- blog listing/detail;
- unknown slug 404;
- mobile navigation;
- accessibility smoke checks;
- draft/public separation where practical;
- RSS and sitemap availability.

## Visual regression

A small screenshot suite is justified for a design-led site.

Good candidates:

- homepage mobile/desktop;
- project page mobile/desktop;
- blog page mobile/desktop;
- mobile nav open state.

Do not snapshot every CMS document.

---

# 28. CI

A pull request should generally run:

```text
pnpm install --frozen-lockfile
↓
Sanity schema extract / TypeGen
↓
generated type drift check
↓
format check
↓
lint
↓
typecheck
↓
unit tests
↓
Next.js build
↓
Playwright smoke tests
```

Do not automatically deploy dependency updates without review.

Framework upgrades should be tested through Vercel Preview before production.

---

# 29. Deployment workflow

## Code/design change

```text
Git branch
↓
Vercel Preview
↓
review
↓
merge
↓
production deployment
```

## Content change

```text
Sanity Studio
↓
Presentation preview
↓
Publish
↓
cache/live revalidation
↓
production content visible
```

This separation is intentional.

A content editor should not need:

- Git;
- VS Code;
- terminal access;
- repository knowledge;
- Vercel access.

---

# 30. Sanity Studio deployment workflow

Studio source and schemas live in the same Git repository.

Typical commands:

```text
pnpm studio:dev
pnpm studio:deploy
pnpm sanity:typegen
pnpm sanity:validate
pnpm sanity:export
```

A Studio schema change is a code change and should go through normal Git review.

Ordinary content changes happen inside Studio and do not require repository changes.

---

# 31. Backup / recovery

Git is the backup for application code.

Sanity content should be exported:

- before major schema/content migrations;
- before bulk operations;
- before project/account handover;
- periodically if the site's content becomes important enough to justify scheduled exports.

Do not build a backup service in Phase 1.

A documented manual export command is sufficient initially.

---

# 32. Migration strategy

Sanity Content Lake is schemaless, so schema evolution should generally use additive changes first.

Preferred pattern:

```text
add new field/schema support
↓
frontend supports old + new shape
↓
migrate content
↓
validate
↓
switch writers/readers fully
↓
remove old field later
```

Do not destructively rename/remove fields in the same release that first requires the new representation.

For a personal site, migrations can remain simple scripts under source control.

---

# 33. Editor roles

The owner should receive the least complicated role that still allows normal publishing.

Current plan capabilities may influence this.

If the site owner is trusted to administer the whole Sanity project, an Administrator role may be acceptable on the Free plan.

If we specifically want:

```text
can edit/publish content
cannot manage API tokens/CORS/project administration
```

then use a plan/role that supports an Editor-style permission model.

This is a commercial/project-governance decision, not a frontend architecture issue.

---

# 34. Architectural invariants for coding agents

Agents should treat these as hard defaults.

## Content

- Sanity is authoritative for editor-managed content.
- Do not introduce parallel MDX versions of Sanity content.
- Keep schemas semantic rather than presentation-driven.
- Prefer fixed page layouts over generic page-builder arrays.
- Portable Text custom blocks map to code-owned components.

## Application

- App Router.
- Server Components by default.
- Keep Client Component boundaries small.
- Routes are code-owned.
- Design system is code-owned.
- Secrets never live in Sanity.
- Avoid new infrastructure unless a concrete requirement needs it.

## Styling

- Tailwind + semantic CSS variables.
- No arbitrary Tailwind classes from Sanity.
- No raw CSS from Sanity.
- No raw HTML/JS from Sanity.
- shadcn-derived components are owned source.

## Sanity

- one project;
- one production dataset;
- one Studio;
- TypeGen for query types;
- Visual Editing for editor preview;
- minimal permissions;
- public published content where appropriate.

## Operations

- code deploys through Git/Vercel;
- content publishes through Sanity;
- no control plane;
- no database beyond Sanity;
- no worker infrastructure unless a real feature needs it.

---

# 35. Areas intentionally left open

The following decisions should be made during implementation or when product needs clarify.

## Studio hosting

Default:

```text
Sanity-hosted Studio
```

Alternative:

```text
embedded /studio
```

Choose based on editor UX versus deployment/build separation.

## Public revalidation

Default:

```text
signed webhook revalidation for public content
Sanity Live only for editor preview
```

Alternative:

```text
Sanity Live for both public content and preview
```

Choose after evaluating simplicity, freshness, browser connections, and privacy preferences.

## Legal content location

Could remain Git-owned or be Sanity-editable.

Choose based on who will maintain the text.

## Navigation editing

Default: code-owned.

Move to Sanity only if the owner genuinely needs to reorder/rename navigation frequently.

## Dark mode

Add only if it is part of the actual design.

## English

Do not solve until real English content exists.

## Contact form

Do not build until useful.

## Analytics

Do not add until there is a concrete measurement need and privacy implications have been reviewed.

---

# 36. Decision heuristic for future changes

When adding a feature, ask in this order:

### 1. Is this editorial content?

If yes:

```text
Sanity
```

Examples:

- text;
- images;
- post;
- project;
- SEO copy.

### 2. Is this application behavior or presentation?

If yes:

```text
Git / React / Tailwind
```

Examples:

- page layout;
- animation;
- routing;
- responsive behavior;
- component implementation.

### 3. Is this configuration or a secret?

If yes:

```text
code or environment
```

Not Sanity.

### 4. Is the requested flexibility likely to be used by the owner?

If no:

```text
do not build the abstraction
```

### 5. Can a small explicit solution work?

Prefer:

```text
small explicit solution
```

over:

```text
generic framework
```

---

# 37. Definition of architectural success

The architecture is working when:

- the owner can update text, projects, posts, and images through Sanity without touching code;
- a developer can substantially redesign the site without migrating arbitrary CMS layout configuration;
- content updates do not require a Vercel deployment;
- code changes remain reviewable through Git/Vercel Preview;
- public visitors cannot access drafts;
- the site remains mostly Server Components;
- the design system remains consistent;
- SEO metadata is correct and free from draft/Visual Editing artifacts;
- content models remain understandable;
- the repository remains understandable to a new engineer or coding agent;
- the project still feels like one website rather than an internal platform.

---

# 38. Final architecture summary

```text
                         ┌──────────────────────┐
                         │        Git           │
                         │                      │
                         │ Next.js              │
                         │ React                │
                         │ Tailwind             │
                         │ Design system        │
                         │ Routes               │
                         │ Sanity schemas       │
                         │ GROQ queries         │
                         │ Studio config        │
                         └──────────┬───────────┘
                                    │
                                    │ deploy
                                    ▼
                           ┌─────────────────┐
                           │ Vercel / Next.js│
                           └────────┬────────┘
                                    │
                   published query │
                                    ▼
                          ┌──────────────────┐
                          │ Sanity Content   │
                          │ Lake             │
                          └────────▲─────────┘
                                   │
                              edit │
                                   │
                          ┌────────┴─────────┐
                          │ Sanity Studio    │
                          │ + Presentation   │
                          └──────────────────┘
```

In one sentence:

> **Sanity manages the words and media; Next.js manages the product.**

That is the primary design constraint future implementation decisions should preserve.
