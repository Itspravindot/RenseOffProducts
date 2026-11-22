import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  // Local SVG artwork is served unoptimised by the ProductImage component.
  // Real PNG/WebP product photography is optimised by next/image as usual.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
