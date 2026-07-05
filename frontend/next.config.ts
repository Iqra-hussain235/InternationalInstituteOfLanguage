import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/enquiry",
        destination: "http://localhost:5000/api/enquiry",
      },
    ];
  },
};

export default nextConfig;
