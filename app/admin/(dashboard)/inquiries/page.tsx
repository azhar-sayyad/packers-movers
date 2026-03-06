import { InquiriesClient } from "@/components/admin/inquiries-client";

export default function AdminInquiriesPage() {
  return (
    <div>
      <h1 className="font-display text-brand-950 mb-2 text-2xl font-bold">Inquiries</h1>
      <p className="text-muted mb-8 text-sm">Search, filter, and manage your inbound leads.</p>
      <InquiriesClient />
    </div>
  );
}
