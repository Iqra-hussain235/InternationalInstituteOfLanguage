const VISA_QUERY_MAP = {
  StudyVisa: "Study Visa",
  WorkVisa: "Work Visa",
  VisitorVisa: "Visitor Visa",
  PermanentVisa: "Permanent Visa",
  SpouseVisa: "Spouse Visa",
};

export function toQueryService(title) {
  return title.replace(/\s+/g, "");
}

export function fromQueryService(queryService) {
  if (!queryService) return "";
  if (VISA_QUERY_MAP[queryService]) return VISA_QUERY_MAP[queryService];
  return queryService;
}

export function buildCourseEnquiryUrl({ service, level, category }) {
  const params = new URLSearchParams();
  if (service) params.set("service", toQueryService(service));
  if (level) params.set("level", level);
  if (category) params.set("category", category);
  return `/academy/course?${params.toString()}`;
}

export function buildEnquiryUrl({ service, level, category }) {
  const params = new URLSearchParams();
  if (service) params.set("service", toQueryService(service));
  if (level) params.set("level", level);
  if (category) params.set("category", category);
  return `/enquiry?${params.toString()}`;
}

export function getEnquiryDisplayTitle(service, level) {
  const displayService = fromQueryService(service);
  if (level) return `${displayService} ${level}`;
  return displayService;
}

export function getEnquiryCourseValue(service, level, category) {
  const title = getEnquiryDisplayTitle(service, level);
  if (category) return `${category} — ${title}`;
  return title;
}
