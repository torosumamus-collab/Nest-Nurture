#!/usr/bin/env node
/**
 * Scaffold a new post: npm run new-post -- "My Post Title" category-slug author-slug
 *
 * Creates content/posts/<slug>.md pre-filled with valid frontmatter matching
 * lib/types.ts#PostFrontmatter, plus a matching placeholder cover in
 * public/images/covers/. This is the fast path for adding article #1 or
 * article #4,000 — no other files need to change.
 */
import fs from "fs";
import path from "path";

const [, , titleArg, categoryArg, authorArg] = process.argv;

if (!titleArg) {
  console.error('Usage: npm run new-post -- "Post Title" category-slug author-slug');
  process.exit(1);
}

const slug = titleArg
  .toLowerCase()
  .replace(/['"]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const category = categoryArg || "motherhood";
const author = authorArg || "claire-whitfield";
const date = new Date().toISOString().slice(0, 10);

const postsDir = path.join(process.cwd(), "content", "posts");
fs.mkdirSync(postsDir, { recursive: true });

const filePath = path.join(postsDir, `${slug}.md`);
if (fs.existsSync(filePath)) {
  console.error(`A post already exists at ${filePath}`);
  process.exit(1);
}

const frontmatter = `---
title: "${titleArg}"
slug: "${slug}"
excerpt: "Write a one-sentence hook for this piece — it appears on cards and in search results."
date: "${date}"
category: "${category}"
tags: []
cover: "/images/covers/${slug}.svg"
coverAlt: "Describe the cover image for accessibility"
author: "${author}"
featured: false
---

Start writing here.
`;

fs.writeFileSync(filePath, frontmatter);
console.log(`✓ Created content/posts/${slug}.md`);
console.log(`  Remember to add a real cover image at public/images/covers/${slug}.(jpg|png|svg)`);
console.log(`  or update the frontmatter to point to your CMS/CDN asset.`);
