"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Setting {
  id: string;
  key: string;
  value: string;
  description?: string | null;
}

export function SettingsClient() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        const s: Setting[] = data.settings ?? [];
        setSettings(s);
        const f: Record<string, string> = {};
        for (const item of s) f[item.key] = item.value;
        setForm(f);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    const payload = settings.map((s) => ({
      key: s.key,
      value: form[s.key] ?? "",
      description: s.description,
    }));
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: payload }),
    });
    if (res.ok) {
      const data = await res.json();
      setSettings(data.settings);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <p className="text-muted text-sm">Loading settings...</p>;

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {settings.map((s) => (
          <div key={s.key} className="space-y-2">
            <Label className="text-muted">{s.description ?? s.key}</Label>
            {s.key.includes("address") ? (
              <Textarea
                value={form[s.key] ?? ""}
                onChange={(e) => setForm((prev) => ({ ...prev, [s.key]: e.target.value }))}
              />
            ) : (
              <Input
                value={form[s.key] ?? ""}
                onChange={(e) => setForm((prev) => ({ ...prev, [s.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
