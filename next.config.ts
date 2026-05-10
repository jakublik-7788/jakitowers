import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CDN_URL: "https://pub-b2781b8a05a44b3393c01cdc4f2b449a.r2.dev",
  },
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/stats",
        headers: [
          {
            key: "Cache-Control", 
            value: "public, s-maxage=300, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;