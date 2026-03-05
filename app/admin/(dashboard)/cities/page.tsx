"use client";

import { CrudClient, BoolBadge } from "@/components/admin/crud-client";

export default function AdminCitiesPage() {
  return (
    <div>
      <h1 className="font-display text-brand-950 mb-2 text-2xl font-bold">Cities</h1>
      <p className="text-muted mb-8 text-sm">
        Manage service cities, local areas, SEO metadata, and phone overrides.
      </p>
      <CrudClient
        apiPath="/api/admin/cities"
        onLoadData={(data) => data.cities}
        title="Service Cities"
        description="Add or edit cities where you offer relocation services."
        columns={[
          {
            key: "name",
            label: "City",
            render: (c) => (
              <div>
                <p className="text-foreground font-medium">{c.name}</p>
                <p className="text-muted text-xs">/{c.slug}</p>
              </div>
            ),
          },
          {
            key: "state",
            label: "State",
            render: (c) => <span className="text-sm">{c.state}</span>,
          },
          {
            key: "district",
            label: "District",
            render: (c) => <span className="text-sm">{c.district}</span>,
          },
          {
            key: "localAreas",
            label: "Local Areas",
            render: (c) => (
              <span className="max-w-56 truncate text-xs text-muted" title={c.localAreas}>
                {c.localAreas}
              </span>
            ),
          },
          {
            key: "isActive",
            label: "Status",
            render: (c) => <BoolBadge value={c.isActive} />,
          },
        ]}
        fields={[
          { name: "name", label: "City Name", type: "text", colSpan: 2 },
          { name: "slug", label: "Slug (URL)", type: "text", placeholder: "e.g. indore" },
          { name: "state", label: "State", type: "text", placeholder: "e.g. Madhya Pradesh" },
          { name: "district", label: "District", type: "text", placeholder: "e.g. Indore" },
          { name: "description", label: "Short Description", type: "textarea", colSpan: 2 },
          { name: "contentText", label: "Detailed Localized Content", type: "textarea", colSpan: 2 },
          { name: "localAreas", label: "Local Areas (comma separated)", type: "textarea", colSpan: 2 },
          { name: "phoneOverride", label: "Phone Override", type: "text" },
          { name: "whatsappOverride", label: "WhatsApp Override", type: "text" },
          { name: "metaTitle", label: "SEO Meta Title", type: "text", colSpan: 2 },
          { name: "metaDescription", label: "SEO Meta Description", type: "textarea", colSpan: 2 },
          { name: "isActive", label: "Active", type: "boolean" },
        ]}
      />
    </div>
  );
}