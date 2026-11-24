import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "bcryptjs"],
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
