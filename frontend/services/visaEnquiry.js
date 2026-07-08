export async function submitVisaEnquiry(payload, fetchImpl = fetch) {
  const response = await fetchImpl("/api/visa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    message: data.message,
    data: data.data,
    json: async () => data,
    text: async () => JSON.stringify(data),
  };
}
