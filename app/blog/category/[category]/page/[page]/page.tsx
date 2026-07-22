import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPostsByCategory, paginate } from "@/lib/posts";
import { CATEGORIES, getCategoryBySlug } from "@/lib/constants";

export const revalidate = 3600;

export async function generateStaticParams() {
  return CATEGORIES.flatMap((c) => {
    const { totalPages } = paginate(getPostsByCategory(c.slug), 1);
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      category: c.slug,
      page: String(i + 2),
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; page: string }>;
}): Promise<Metadata> {
  const { category, page } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} — Page ${page}`,
    alternates: { canonical: `/blog/category/${cat.slug}/page/${page}` },
  };
}

export default async function CategoryPaginatedPage({
  params,
}: {
  params: Promise<{ category: string; page: string }>;
}) {
  const { category, page } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const posts = getPostsByCategory(cat.slug);
  const { items, totalPages, currentPage } = paginate(posts, pageNum);
  if (pageNum > totalPages) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: cat.name, href: `/blog/category/${cat.slug}` },
          { label: `Page ${pageNum}` },
        ]}
      />
      <header className="mt-6 mb-12 max-w-2xl">
        <h1 className="font-display text-display-lg text-ink">{cat.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-brown-500">Page {pageNum} of {totalPages}.</p>
      </header>
      <PostGrid posts={items} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/blog/category/${cat.slug}`} />
    </Container>
  );
}
