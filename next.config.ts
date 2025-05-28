import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    domains: [
      "s3.sellerpintar.com",
      "res.cloudinary.com"
    ],
  }
};

export default nextConfig;
