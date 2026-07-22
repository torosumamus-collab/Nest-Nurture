import Image from "next/image";
import Link from "next/link";
import { PostSummary } from "@/lib/types";
import { getAuthorBySlug, getCategoryBySlug } from "@/lib/constants";
import { formatDate } from "@/lib/format";

const badgeColors: Record<string, string> = {
  sage: "bg-sage-100 text-sage-700",
  rose: "bg-rose-100 text-rose-600",
  beige: "bg-beige-300 text-brown-700",
  brown: "bg-brown-100 text-brown-700",
};

export default function PostCard({
  post,
  priority = false,
  size = "default",
}: {
  post: PostSummary;
  priority?: boolean;
  size?: "default" | "large";
}) {
  const category = getCategoryBySlug(post.category);
  const author = getAuthorBySlug(post.author);

  return (
    <article className="group break-inside-avoid mb-6 lg:mb-8">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl2 bg-beige-200 shadow-card transition-shadow duration-300 group-hover:shadow-lift">
          <div className={`relative w-full ${size === "large" ? "aspect-[4/5]" : "aspect-[4/5]"}`}>
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 28vw"
              className="object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {category && (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${badgeColors[category.color]}`}
            >
              {category.name}
            </span>
          )}
        </div>

        <div className="pt-4">
          <h3 className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-rose-500">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brown-500">{post.excerpt}</p>

          <div className="mt-3 flex items-center gap-2 text-xs text-brown-300">
            <span className="relative h-6 w-6 overflow-hidden rounded-full bg-sage-100">
              <Image src={author.avatar} alt="" fill className="object-cover" aria-hidden="true" />
            </span>
            <span>{author.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
