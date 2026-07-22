import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPostSummaries, paginate } from "@/lib/posts";
import { SITE } from "@/lib/constants";

export const revalidate = 3600;

export async function generateStaticParams() {
  const all = getAllPostSummaries();
  const { totalPages } = paginate(all, 1);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `The Blog — Page ${page}`,
    description: `Browse page ${page} of every story from ${SITE.name}.`,
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const all = getAllPostSummaries();
  const { items, totalPages, currentPage } = paginate(all, pageNum);
  if (pageNum > totalPages) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: `Page ${pageNum}` }]} />
      <header className="mt-6 mb-12 max-w-2xl">
        <h1 className="font-display text-display-lg text-ink">The Blog</h1>
        <p className="mt-4 text-lg leading-relaxed text-brown-500">Page {pageNum} of {totalPages}.</p>
      </header>
      <PostGrid posts={items} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
    </Container>
  );
}
