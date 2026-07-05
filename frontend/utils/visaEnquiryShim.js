import { submitVisaEnquiry } from "@/services/visaEnquiry";

export function installVisaEnquiryShim() {
  if (typeof window === "undefined") return;

  if (window.__visaEnquiryShimInstalled) return;

  const nativeFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : fetch;
  window.__visaEnquiryNativeFetch = nativeFetch;

  window.submitVisaEnquiry = async (payload) => submitVisaEnquiry(payload);

  window.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input?.url || "";
    const isVisaEnquiryRequest = url.includes("/api/enquiry") || url.includes("/api/visa");
    const method = init?.method?.toUpperCase() || "GET";

    if (isVisaEnquiryRequest && method === "POST") {
      const payload = init?.body ? JSON.parse(init.body) : {};
      return submitVisaEnquiry(payload);
    }

    return nativeFetch(input, init);
  };

  window.__visaEnquiryShimInstalled = true;
}
