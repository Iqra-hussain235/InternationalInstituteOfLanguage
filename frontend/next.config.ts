import type { NextConfig } from "next";

const configuredBackend = "https://internationalinstituteoflanguage-1.onrender.com";

console.log(process.env.BACKEND_URL,
  process.env.NEXT_PUBLIC_BACKEND_URL ,
  process.env.NEXT_PUBLIC_API_URL ,
  "http://localhost:5000")
const backendBaseUrl = configuredBackend
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/enquiry",
        destination: `${backendBaseUrl}/api/enquiry`,
      },
      {
        source: "/api/visa",
        destination: `${backendBaseUrl}/api/visa`,
      },
      {
        source: "/api/academy/:path*",
        destination: `${backendBaseUrl}/api/academy/:path*`,
      },
      {
        source: "/api/contact",
        destination: `${backendBaseUrl}/api/contact`,
      },
    ];
  },
};

export default nextConfig;
