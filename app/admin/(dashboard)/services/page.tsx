"use client";

import { CrudClient, BoolBadge } from "@/components/admin/crud-client";

export default function AdminServicesPage() {
  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-brand-950">Services</h1>
      <p className="mb-8 text-sm text-muted">
        Manage service offerings, features, and SEO fields.
      </p>
      <CrudClient
        apiPath="/api/admin/services"
        onLoadData={(data) => data.services}
        title="Service Offerings"
        description="Add or edit relocation services."
        columns={[
          {
            key: "name",
            label: "Service",
            render: (s) => (
              <div>
                <p className="font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted">
                  /services/{s.slug} · <span className="capitalize">{s.icon}</span>
                </p>
              </div>
            ),
          },
          { key: "shortDesc", label: "Short Summary", render: (s) => <span className="max-w-72 truncate text-xs text-muted" title={s.shortDesc}>{s.shortDesc}</span> },
          {
            key: "isActive",
            label: "Status",
            render: (s) => <BoolBadge value={s.isActive} />,
          },
        ]}
        fields={[
          { name: "name", label: "Service Name", type: "text", colSpan: 2 },
          { name: "slug", label: "Slug (URL)", type: "text", placeholder: "e.g. household-shifting" },
          { name: "icon", label: "Icon (lucide name)", type: "text", placeholder: "e.g. Home, Truck, Warehouse" },
          { name: "shortDesc", label: "Short Description", type: "textarea", colSpan: 2 },
          { name: "fullDesc", label: "Full Description", type: "textarea", colSpan: 2 },
          { name: "features", label: "Features (comma separated)", type: "textarea", colSpan: 2 },
          { name: "metaTitle", label: "SEO Meta Title", type: "text", colSpan: 2 },
          { name: "metaDescription", label: "SEO Meta Description", type: "textarea", colSpan: 2 },
          { name: "isActive", label: "Active", type: "boolean" },
        ]}
      />
    </div>
  );
}