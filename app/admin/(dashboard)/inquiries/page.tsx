import { InquiriesClient } from "@/components/admin/inquiries-client";

export default function AdminInquiriesPage() {
  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-brand-950">Inquiries</h1>
      <p className="mb-8 text-sm text-muted">
        Search, filter, and manage your inbound leads.
      </p>
      <InquiriesClient />
    </div>
  );
}