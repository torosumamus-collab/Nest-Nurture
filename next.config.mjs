/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization — remote patterns can be extended as the media
  // library grows (e.g. a CMS or asset CDN). Local /public assets always work.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // { protocol: "https", hostname: "images.nestandnurture.com" },
    ],
  },

  // Long-term caching for static assets; HTML revalidates via ISR (see lib/posts.ts).
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/blog/category/:category/page/1", destination: "/blog/category/:category", permanent: true },
    ];
  },

  experimental: {
    optimizePackageImports: ["date-fns"],
  },
};

export default nextConfig;
