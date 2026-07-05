const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").trim();

function getEnquiryEndpoint() {
  const normalizedBase = API_BASE_URL.replace(/\/$/, "");

  if (!normalizedBase) return "/api/enquiry";

  if (normalizedBase.endsWith("/api")) {
    return `${normalizedBase}/enquiry`;
  }

  return `${normalizedBase}/api/enquiry`;
}

export async function submitVisaEnquiry(payload) {
  try {
    const requestFn = typeof window !== "undefined" && typeof window.__visaEnquiryNativeFetch === "function"
      ? window.__visaEnquiryNativeFetch
      : fetch;

    const response = await requestFn(getEnquiryEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    const message = data.message || (response.ok ? "Your enquiry was submitted successfully." : "Unable to submit your enquiry right now.");

    return {
      ok: response.ok,
      success: response.ok,
      status: response.status,
      message,
      data,
      json: async () => data,
      text: async () => JSON.stringify(data),
    };
  } catch (error) {
    console.error("Visa enquiry submit error:", error);
    return {
      ok: false,
      success: false,
      status: 500,
      message: "Network error. Please try again or contact us on WhatsApp.",
      data: {},
      json: async () => ({}),
      text: async () => "",
      error,
    };
  }
}
