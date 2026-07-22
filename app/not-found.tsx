import Link from "next/link";
import Container from "@/components/Container";
import PostGrid from "@/components/PostGrid";
import { getFeaturedPosts } from "@/lib/posts";

export default function NotFound() {
  const posts = getFeaturedPosts(3);

  return (
    <Container className="py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">404</p>
      <h1 className="mt-4 font-display text-display-lg text-ink">We couldn't find that page.</h1>
      <p className="mx-auto mt-4 max-w-md text-brown-500">
        The page may have moved, or the link might be outdated. Let's get you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-brown px-7 py-3.5 text-sm font-medium text-warm-white hover:bg-brown-700"
      >
        Back to Home
      </Link>

      {posts.length > 0 && (
        <div className="mt-20 text-left">
          <h2 className="mb-6 text-center font-display text-display-sm text-ink">
            In the meantime, a few favorites
          </h2>
          <PostGrid posts={posts} />
        </div>
      )}
    </Container>
  );
}
