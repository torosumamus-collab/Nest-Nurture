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
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/blog/category/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const posts = getPostsByCategory(cat.slug);
  const { items, totalPages, currentPage } = paginate(posts, 1);

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: cat.name }]} />

      <header className="mt-6 mb-12 max-w-2xl">
        <h1 className="font-display text-display-lg text-ink">{cat.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-brown-500">{cat.description}</p>
        <p className="mt-2 text-sm text-brown-300">{posts.length} {posts.length === 1 ? "story" : "stories"}</p>
      </header>

      <PostGrid posts={items} priorityCount={3} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/blog/category/${cat.slug}`} />
    </Container>
  );
}
