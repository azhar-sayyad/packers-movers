import { SettingsClient } from "@/components/admin/settings-client";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-brand-950">Site Settings</h1>
      <p className="mb-8 text-sm text-muted">
        Global contact details and business information.
      </p>
      <SettingsClient />
    </div>
  );
}