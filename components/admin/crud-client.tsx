"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface CrudField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: unknown;
  colSpan?: number;
}

export interface CrudColumn<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
}

export type OptionsMap = Record<string, { value: string; label: string }[]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CrudClientProps<T extends Record<string, any>> {
  apiPath: string;
  title: string;
  description: string;
  columns: CrudColumn<T>[];
  fields: CrudField[];
  loadOptions?: () => Promise<OptionsMap>;
  onLoadData?: (data: Record<string, T[]>) => T[];
  idKey?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CrudClient<T extends Record<string, any>>({
  apiPath,
  title,
  description,
  columns,
  fields,
  loadOptions,
  onLoadData,
  idKey = "id",
}: CrudClientProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<Record<string, { value: string; label: string }[]>>({});
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(apiPath);
    const data = await res.json();
    const items = onLoadData ? onLoadData(data) : ((data.items as T[] | undefined) ?? []);
    setItems(items);
    setLoading(false);
  }, [apiPath, onLoadData]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  useEffect(() => {
    if (loadOptions) {
      loadOptions().then(setOptions);
    }
  }, [loadOptions]);

  function openCreate() {
    setEditing(null);
    const initial: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === "boolean") initial[f.name] = f.defaultValue ?? true;
      else initial[f.name] = f.defaultValue ?? "";
    }
    setForm(initial);
    setOpen(true);
  }

  function openEdit(item: T) {
    setEditing(item);
    const initial: Record<string, unknown> = {};
    for (const f of fields) {
      initial[f.name] =
        f.type === "number"
          ? Number(item[f.name]) || 0
          : f.type === "boolean"
            ? Boolean(item[f.name])
            : (item[f.name] ?? "");
    }
    setForm(initial);
    setOpen(true);
  }

  function setField(name: string, value: unknown) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function save() {
    setSaving(true);
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      let value = form[f.name];
      if (f.type === "text" || f.type === "textarea") value = String(value ?? "").trim();
      payload[f.name] = value;
    }

    const res = await fetch(editing ? `${apiPath}/${editing[idKey]}` : apiPath, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      setOpen(false);
      setLoading(true);
      load();
    }
  }

  async function remove(item: T) {
    if (!confirm(`Delete this record?`)) return;
    await fetch(`${apiPath}/${item[idKey]}`, { method: "DELETE" });
    setLoading(true);
    load();
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-display text-brand-950 text-lg font-semibold">{title}</h2>
          <p className="text-muted text-sm">{description}</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="shadow-card rounded-xl border border-black/10 bg-white">
        {loading && items.length === 0 ? (
          <p className="text-muted p-8 text-center text-sm">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-muted p-8 text-center text-sm">No records yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item[idKey] as string}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>{col.render(item)}</TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(item)}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(item)}
                        aria-label="Delete"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit" : "Add"} {title}
            </DialogTitle>
            <DialogDescription>Fill in the details below.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const fieldOptions = field.options ?? options[field.name];
              return (
                <div key={field.name} className={cn(field.colSpan === 2 && "sm:col-span-2", "space-y-2")}>
                  <Label>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      value={(form[field.name] as string) ?? ""}
                      onChange={(e) => setField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "number" ? (
                    <Input
                      type="number"
                      value={(form[field.name] as number) ?? 0}
                      onChange={(e) => setField(field.name, Number(e.target.value))}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "boolean" ? (
                    <div className="flex h-11 items-center">
                      <Switch
                        checked={Boolean(form[field.name])}
                        onCheckedChange={(v) => setField(field.name, v)}
                      />
                    </div>
                  ) : field.type === "select" ? (
                    <Select
                      value={String(form[field.name] ?? "")}
                      onValueChange={(v) => setField(field.name, v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldOptions?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={(form[field.name] as string) ?? ""}
                      onChange={(e) => setField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function BoolBadge({ value, trueLabel = "Active", falseLabel = "Inactive" }: { value: boolean; trueLabel?: string; falseLabel?: string }) {
  return value ? (
    <Badge variant="success">{trueLabel}</Badge>
  ) : (
    <Badge variant="outline" className="border-black/15 text-muted">
      {falseLabel}
    </Badge>
  );
}