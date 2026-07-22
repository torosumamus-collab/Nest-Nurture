import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import PostGrid from "@/components/PostGrid";
import { getAllPostSummaries, getFeaturedPosts, getPostsByCategory } from "@/lib/posts";
import { CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { getAuthorBySlug } from "@/lib/constants";

export default function HomePage() {
  const featured = getFeaturedPosts(5);
  const [hero, ...rest] = featured;
  const latest = getAllPostSummaries().slice(0, 9);
  const author = hero ? getAuthorBySlug(hero.author) : null;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-beige">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sage-100 opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-rose-100 opacity-50 blur-3xl" />

        <Container className="relative py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="animate-fadeUp">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
                A calmer way to raise a family
              </p>
              <h1 className="mt-5 font-display text-display-xl text-ink">
                Motherhood, <span className="italic text-brown">unhurried</span>.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-brown-500">
                {"Motherhood was never meant to be a race. Thoughtful writing on pregnancy, newborns, and raising kids."}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="rounded-full bg-brown px-7 py-3.5 text-sm font-medium text-warm-white shadow-soft transition-colors hover:bg-brown-700"
                >
                  Start Reading
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-brown-300 px-7 py-3.5 text-sm font-medium text-brown transition-colors hover:border-brown hover:bg-beige-100"
                >
                  Our Story
                </Link>
              </div>
            </div>

            {hero && (
              <Link href={`/blog/${hero.slug}`} className="group block">
                <div className="relative aspect-[4/5] w-full max-w-md justify-self-end overflow-hidden rounded-xl2 shadow-lift sm:aspect-[5/6]">
                  <Image
                    src={hero.cover}
                    alt={hero.coverAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-warm-white">
                    <span className="text-xs font-semibold uppercase tracking-widest text-rose-100">
                      Editor's Pick
                    </span>
                    <h2 className="mt-2 font-display text-2xl leading-snug">{hero.title}</h2>
                    {author && (
                      <p className="mt-2 text-xs text-warm-white/80">
                        {author.name} · {formatDate(hero.date)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Category rail */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-14">
        <Container>
          <div className="flex snap-x gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="group flex-shrink-0 snap-start rounded-full border border-beige-400 bg-warm-white px-5 py-2.5 text-sm text-brown-500 transition-colors hover:border-sage-400 hover:bg-sage-50 hover:text-sage-700"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Editor's picks strip */}
      {/* ---------------------------------------------------------------- */}
      {rest.length > 0 && (
        <section className="pb-8">
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-display-md text-ink">Editor's Picks</h2>
              <Link href="/blog" className="hidden text-sm font-medium text-brown hover:text-rose-500 sm:block">
                View all →
              </Link>
            </div>
            <PostGrid posts={rest.slice(0, 4)} priorityCount={2} />
          </Container>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Latest posts */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">Fresh on the blog</p>
              <h2 className="mt-2 font-display text-display-md text-ink">Latest Stories</h2>
            </div>
            <Link href="/blog" className="hidden text-sm font-medium text-brown hover:text-rose-500 sm:block">
              View all →
            </Link>
          </div>
          <PostGrid posts={latest} />
          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-block rounded-full border border-brown-300 px-6 py-3 text-sm font-medium text-brown"
            >
              View all stories
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Category spotlight — Motherhood */}
      {/* ---------------------------------------------------------------- */}
      <CategorySpotlight slug="motherhood" />

    </>
  );
}

function CategorySpotlight({ slug }: { slug: string }) {
  const posts = getPostsByCategory(slug).slice(0, 3);
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category || posts.length === 0) return null;

  return (
    <section className="bg-beige-100 py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Category Spotlight</p>
            <h2 className="mt-2 font-display text-display-md text-ink">{category.name}</h2>
            <p className="mt-2 max-w-md text-sm text-brown-500">{category.description}</p>
          </div>
          <Link
            href={`/blog/category/${slug}`}
            className="hidden text-sm font-medium text-brown hover:text-rose-500 sm:block"
          >
            Explore {category.name} →
          </Link>
        </div>
        <PostGrid posts={posts} />
      </Container>
    </section>
  );
}

