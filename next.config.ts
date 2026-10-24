import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AVIF first: roughly half the size of JPEG for the same photo, which matters on mobile data.
  images: { formats: ["image/avif", "image/webp"], qualities: [60, 75] },
  // The Journal became Trends — keep old links working.
  async redirects() {
    return [
      { source: "/blog", destination: "/trends", permanent: true },
      { source: "/blog/:slug", destination: "/trends/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
