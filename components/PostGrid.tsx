import { PostSummary } from "@/lib/types";
import PostCard from "./PostCard";

export default function PostGrid({
  posts,
  priorityCount = 0,
}: {
  posts: PostSummary[];
  priorityCount?: number;
}) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl2 border border-dashed border-beige-400 py-20 text-center">
        <p className="font-display text-xl text-brown-500">No stories here yet.</p>
        <p className="mt-2 text-sm text-brown-300">Check back soon — we're always writing.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} priority={i < priorityCount} />
      ))}
    </div>
  );
}
