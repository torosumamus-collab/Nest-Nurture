import type { Metadata } from "next";
import Container from "@/components/Container";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPostSummaries, paginate } from "@/lib/posts";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Blog",
  description: `Every story from ${SITE.name} — pregnancy, newborn life, toddlerhood, motherhood, and self-care, all in one place.`,
  alternates: { canonical: "/blog" },
};

export const revalidate = 3600;

export default function BlogIndexPage() {
  const all = getAllPostSummaries();
  const { items, totalPages, currentPage } = paginate(all, 1);

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <header className="mt-6 mb-12 max-w-2xl">
        <h1 className="font-display text-display-lg text-ink">The Blog</h1>
        <p className="mt-4 text-lg leading-relaxed text-brown-500">
          Every story we've published, newest first — {all.length} and counting.
        </p>
      </header>

      <PostGrid posts={items} priorityCount={3} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
    </Container>
  );
}
