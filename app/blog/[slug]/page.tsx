import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostGrid from "@/components/PostGrid";
import Newsletter from "@/components/Newsletter";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { getAuthorBySlug, getCategoryBySlug, SITE } from "@/lib/constants";
import { formatDate } from "@/lib/format";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [{ url: post.cover, width: 1200, height: 800, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthorBySlug(post.author);
  const category = getCategoryBySlug(post.category);
  const related = getRelatedPosts(post, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [`${SITE.url}${post.cover}`],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: author.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${post.slug}` },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Container className="py-10 sm:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            ...(category ? [{ label: category.name, href: `/blog/category/${category.slug}` }] : []),
            { label: post.title },
          ]}
        />

        <header className="mx-auto mt-8 max-w-content">
          {category && (
            <Link
              href={`/blog/category/${category.slug}`}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 hover:text-rose-600"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-4 font-display text-display-lg text-ink">{post.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-brown-500">{post.excerpt}</p>

          <div className="mt-8 flex items-center gap-3 border-y border-beige py-5">
            <span className="relative h-12 w-12 overflow-hidden rounded-full bg-sage-100">
              <Image src={author.avatar} alt="" fill className="object-cover" />
            </span>
            <div>
              <p className="text-sm font-medium text-ink">{author.name}</p>
              <p className="text-xs text-brown-300">
                {formatDate(post.date)} · {post.readingTime}
              </p>
            </div>
          </div>
        </header>

        <div className="relative mx-auto mt-10 aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-xl2 shadow-card">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>

        <div
          className="article-content mx-auto mt-12 max-w-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Author bio */}
        <div className="mx-auto mt-16 max-w-content rounded-xl2 bg-beige-100 p-8">
          <div className="flex items-start gap-4">
            <span className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-sage-100">
              <Image src={author.avatar} alt="" fill className="object-cover" />
            </span>
            <div>
              <p className="font-display text-lg text-ink">{author.name}</p>
              <p className="text-xs uppercase tracking-wide text-rose-500">{author.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-brown-500">{author.bio}</p>
            </div>
          </div>
        </div>

        {/* Share / affiliate note */}
        <div className="mx-auto mt-8 max-w-content text-xs leading-relaxed text-brown-300">
          Some links in this article may be affiliate links. Read our{" "}
          <Link href="/affiliate-disclosure" className="underline hover:text-rose-500">
            affiliate disclosure
          </Link>{" "}
          for details.
        </div>
      </Container>
      {related.length > 0 && (
        <section className="border-t border-beige bg-beige-100 py-16">
          <Container>
            <h2 className="mb-8 font-display text-display-sm text-ink">You Might Also Like</h2>
            <PostGrid posts={related} />
          </Container>
        </section>
      )}


      
