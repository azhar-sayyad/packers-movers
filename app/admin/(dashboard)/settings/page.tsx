import { SettingsClient } from "@/components/admin/settings-client";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-brand-950 mb-2 text-2xl font-bold">Site Settings</h1>
      <p className="text-muted mb-8 text-sm">Global contact details and business information.</p>
      <SettingsClient />
    </div>
  );
}
