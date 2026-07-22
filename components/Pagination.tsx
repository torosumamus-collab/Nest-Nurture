import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g. "/blog" or "/blog/category/pregnancy"
}) {
  if (totalPages <= 1) return null;

  const pageHref = (p: number) => (p === 1 ? basePath : `${basePath}/page/${p}`);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`rounded-full border border-beige-400 px-4 py-2 text-sm transition-colors ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "text-brown-500 hover:border-sage-400 hover:text-sage-600"
        }`}
      >
        ← Newer
      </Link>

      <ul className="flex items-center gap-1">
        {pages.map((p, idx) => {
          const prev = pages[idx - 1];
          const showEllipsis = prev && p - prev > 1;
          return (
            <li key={p} className="flex items-center">
              {showEllipsis && <span className="px-2 text-brown-300">…</span>}
              <Link
                href={pageHref(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                  p === currentPage
                    ? "bg-brown text-warm-white"
                    : "text-brown-500 hover:bg-beige-200"
                }`}
              >
                {p}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`rounded-full border border-beige-400 px-4 py-2 text-sm transition-colors ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "text-brown-500 hover:border-sage-400 hover:text-sage-600"
        }`}
      >
        Older →
      </Link>
    </nav>
  );
}
