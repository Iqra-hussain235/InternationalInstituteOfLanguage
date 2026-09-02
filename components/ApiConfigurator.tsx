"use client";

import axios from "axios";

const backendApiUrl = (process.env.NEXT_PUBLIC_API_URL || "https://internationalinstituteoflanguage-1.onrender.com/api")
  .trim()
  .replace(/\/+$/, "");

if (typeof window !== "undefined") {
  // Axios Request Interceptor
  axios.interceptors.request.use((config) => {
    if (config.url) {
      if (config.url.startsWith("/api/")) {
        config.url = config.url.replace(/^\/api/, backendApiUrl);
      } else if (config.url.startsWith("http://localhost:5000/api/")) {
        config.url = config.url.replace(/^http:\/\/localhost:5000\/api/, backendApiUrl);
      }
    }
    return config;
  });

  // Fetch Interceptor
  if (!(window as any).__fetch_intercepted__) {
    (window as any).__fetch_intercepted__ = true;
    const originalFetch = window.fetch;
    window.fetch = async function (input, init) {
      if (typeof input === "string") {
        if (input.startsWith("/api/")) {
          const targetUrl = input.replace(/^\/api/, backendApiUrl);
          return originalFetch(targetUrl, init);
        } else if (input.startsWith("http://localhost:5000/api/")) {
          const targetUrl = input.replace(/^http:\/\/localhost:5000\/api/, backendApiUrl);
          return originalFetch(targetUrl, init);
        }
      }
      return originalFetch(input, init);
    };
  }
}

export default function ApiConfigurator() {
  return null;
}
