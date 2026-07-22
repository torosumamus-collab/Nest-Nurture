# Nest & Nurture

A premium, editorial motherhood and parenting publication built with **Next.js 15** and **React 19** — designed to grow from a handful of articles into a thousands-of-posts content authority site without a redesign.

Visual direction: the calm, warm editorial feel of Motherly, The Everymom, Cup of Jo, and Kinfolk — cream backgrounds, soft sage/rose/beige accents, Fraunces + Inter typography, generous whitespace, Pinterest-style masonry cards.

---

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

Requires Node.js 18.18+ (Node 20 LTS recommended).

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | ISR, static generation, image optimization, file-based routing that scales cleanly |
| UI | React 19 | Server Components by default, smaller client bundles |
| Styling | Tailwind CSS + design tokens in `tailwind.config.ts` | One source of truth for the brand palette/type scale, no CSS drift as pages grow |
| Content | Markdown files in `/content/posts` + `gray-matter`/`remark` | No database required to start; trivially swappable for a headless CMS later (see below) |
| Fonts | `next/font/google` — Fraunces (display) + Inter (body) | Self-hosted automatically by Next, zero layout shift, no external font requests at runtime |

---

## Content architecture (the part that lets this scale)

Every article is a single Markdown file:

```
content/posts/gentle-newborn-sleep-first-weeks.md
```

with frontmatter matching `lib/types.ts#PostFrontmatter`:

```yaml
---
title: "..."
slug: "..."
excerpt: "..."
date: "2026-06-02"
category: "newborn"       # must match a slug in lib/constants.ts#CATEGORIES
tags: ["sleep", "newborn"]
cover: "/images/covers/....svg"
coverAlt: "..."
author: "claire-whitfield" # must match a slug in lib/constants.ts#AUTHORS
featured: true
---

Markdown body here.
```

All reading/parsing/caching logic lives in **`lib/posts.ts`** — this is the only file that knows where content physically lives. Every page and component consumes plain TypeScript types (`Post`, `PostSummary`), never the filesystem directly.

**Adding post #4,000 is "add one file."** No schema migration, no template changes, no rebuild of navigation.

### Scaling beyond the filesystem

At a few thousand posts, build-time filesystem reads are still fine (Next.js and similar sites routinely ship 10k+ statically generated pages). When/if you outgrow it:

1. Point a headless CMS (Sanity, Contentful, WordPress-as-API, Payload, etc.) or a database at the same shape returned by `getPostBySlug` / `getAllPostSummaries` in `lib/posts.ts`.
2. Leave every page/component untouched — they only import from `lib/posts.ts`.
3. Pages already use `export const revalidate = 3600` (ISR), so new/edited posts propagate without a full redeploy once a real data source is wired in.

### Adding a new post quickly

```bash
npm run new-post -- "Your Post Title" toddler-kids priya-anand
```

Scaffolds a correctly-shaped Markdown file in `content/posts/`.

### Adding a new category

Add one entry to `CATEGORIES` in `lib/constants.ts` — the nav, homepage spotlight, category archive page (`/blog/category/[slug]`), and sitemap all pick it up automatically.

### Adding a new author

Add one entry to `AUTHORS` in `lib/constants.ts`, plus an avatar in `public/images/authors/`.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, category rail, editor's picks, latest posts, category spotlight, newsletter |
| `/blog`, `/blog/page/[n]` | Full paginated article archive |
| `/blog/category/[slug]`, `.../page/[n]` | Per-category paginated archive |
| `/blog/[slug]` | Article template — Article + Breadcrumb JSON-LD, author bio, related posts |
| `/about` | Editorial mission, values, team |
| `/contact` | Contact form (client-validated; posts to `/api/contact`) |
| `/privacy-policy`, `/terms`, `/affiliate-disclosure` | Legal templates — **have counsel review before publishing** |
| `/sitemap.xml`, `/robots.txt` | Generated from live content (`app/sitemap.ts`, `app/robots.ts`) |

---

## SEO & performance built in

- Per-page `generateMetadata` (title templates, canonical URLs, Open Graph, Twitter Cards)
- `Organization`, `Article`, and `BreadcrumbList` JSON-LD structured data
- Auto-generated `sitemap.xml` including every post and category
- `next/image` throughout (AVIF/WebP, responsive `sizes`, lazy-loaded off-screen images, `priority` on above-the-fold hero images)
- Self-hosted Google Fonts via `next/font` — no runtime font requests, no CLS
- ISR (`revalidate`) so content updates don't require a full rebuild
- Semantic HTML, visible focus states, `aria-*` labeling on nav/forms/pagination, skip-to-content link, `prefers-reduced-motion` respected

## Before going live

- [ ] Replace the placeholder SVG cover art in `public/images/covers/` with real photography (WebP/AVIF, ~1600px wide is plenty for the current layout)
- [ ] Wire `/app/api/subscribe/route.ts` to a real ESP (Mailchimp, ConvertKit, Klaviyo, Beehiiv…)
- [ ] Wire `/app/api/contact/route.ts` to a transactional email provider (Resend, Postmark…) or CRM
- [ ] Update `SITE.url` and social handles in `lib/constants.ts`
- [ ] Have Privacy Policy / Terms / Affiliate Disclosure reviewed by a lawyer for your jurisdiction
- [ ] Add real Google Search Console / analytics
- [ ] Add an RSS feed route if desired (the layout already links to `/rss.xml`)

---

## Project structure

```
app/                  # Routes (App Router)
  blog/[slug]/         Article template
  blog/category/[c]/   Category archive (+ /page/[n])
  api/                 Route handlers (subscribe, contact)
  ...                  about, contact, legal pages, sitemap, robots
components/            Reusable UI (Header, Footer, PostGrid, PostCard, forms…)
lib/                   posts.ts (content engine), constants.ts, types.ts, format.ts
content/posts/         Markdown articles — one file per post
public/images/         Covers, author avatars, favicon
scripts/               new-post.mjs (content scaffolding), gen-covers.mjs (placeholder art)
```
