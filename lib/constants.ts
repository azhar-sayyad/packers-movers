export const QUOTE_CTA_LABEL = "Get a Free Quote";
export const QUOTE_SUBMIT_LABEL = "Get Free Quote";
export const QUOTE_SUBMITTING_LABEL = "Submitting...";

export const PROPERTY_SIZES = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK / Villa",
  "Office",
  "Shop",
] as const;

export const INQUIRY_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUOTATION_SENT",
  "CONVERTED",
  "CLOSED",
] as const;

export const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-sky-100 text-sky-800",
  CONTACTED: "bg-blue-100 text-blue-800",
  QUOTATION_SENT: "bg-amber-100 text-amber-800",
  CONVERTED: "bg-emerald-100 text-emerald-800",
  CLOSED: "bg-surface-secondary text-muted",
};

export const EMPTY_STATE_COPY = {
  loading: "Loading...",
  empty: "No records yet.",
} as const;
