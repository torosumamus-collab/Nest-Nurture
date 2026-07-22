import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";
import { Post, PostFrontmatter, PostSummary } from "./types";
import { SITE } from "./constants";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/**
 * Content architecture notes
 * ---------------------------------------------------------------------------
 * Posts live as individual Markdown files in /content/posts, one file per
 * article, keyed by filename (slug). This is intentional for scale:
 *
 *  - Adding article #4,000 is "add one file" — no schema migration, no
 *    database, no CMS lock-in.
 *  - Each read is cached in-memory per build/request (see `postCache` below),
 *    so listing pages don't re-parse the whole catalog on every call.
 *  - When the catalog grows large enough that filesystem reads at build time
 *    become slow, this module is the *only* place that needs to change:
 *    swap `getAllSlugs`/`getPostBySlug` to fetch from a headless CMS or DB
 *    while keeping the same return shape, and every page/component above it
 *    keeps working unmodified.
 *  - Pages use ISR (`revalidate`) rather than pure SSG so new posts can go
 *    live without a full redeploy once a real content source is wired in.
 */

let slugCache: string[] | null = null;
const postCache = new Map<string, Post>();
let summaryCache: PostSummary[] | null = null;

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
}

export function getAllSlugs(): string[] {
  if (slugCache) return slugCache;
  ensureDir();
  slugCache = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
  return slugCache;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (postCache.has(slug)) return postCache.get(slug)!;

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);

  const post: Post = {
    ...(data as PostFrontmatter),
    slug: data.slug ?? slug,
    contentHtml: processed.toString(),
    readingTime: readingTime(content).text,
  };

  postCache.set(slug, post);
  return post;
}

export function getAllPostSummaries(): PostSummary[] {
  if (summaryCache) return summaryCache;
  ensureDir();

  const slugs = getAllSlugs();
  const summaries = slugs.map((slug) => {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      ...(data as PostFrontmatter),
      slug: data.slug ?? slug,
      readingTime: readingTime(content).text,
    } as PostSummary;
  });

  summaryCache = summaries.sort((a, b) => (a.date < b.date ? 1 : -1));
  return summaryCache;
}

export function getPostsByCategory(categorySlug: string): PostSummary[] {
  return getAllPostSummaries().filter((p) => p.category === categorySlug);
}

export function getFeaturedPosts(limit = 5): PostSummary[] {
  const all = getAllPostSummaries();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getRelatedPosts(post: Post | PostSummary, limit = 3): PostSummary[] {
  const all = getAllPostSummaries().filter((p) => p.slug !== post.slug);
  const sameCategory = all.filter((p) => p.category === post.category);
  const shareTag = all.filter(
    (p) => p.category !== post.category && p.tags?.some((t) => post.tags?.includes(t))
  );
  return [...sameCategory, ...shareTag].slice(0, limit);
}

export function paginate<T>(items: T[], page: number, perPage = SITE.postsPerPage) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
    currentPage: current,
    totalItems: items.length,
  };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPostSummaries().forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
