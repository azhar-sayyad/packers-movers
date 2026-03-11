"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatDistanceToNow } from "@/lib/format";
import { INQUIRY_STATUSES } from "@/lib/constants";
import { StatusBadge } from "@/components/common/status-badge";

const STATUSES = INQUIRY_STATUSES;

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  moveFrom: string;
  moveTo: string;
  serviceType: string;
  moveDate?: string | null;
  propertyType?: string | null;
  message?: string | null;
  status: string;
  internalNotes?: string | null;
  landingPage?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export function InquiriesClient() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [newStatus, setNewStatus] = useState("NEW");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
    const data = await res.json();
    setInquiries(data.inquiries ?? []);
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
  }, [load]);

  function openInquiry(inquiry: Inquiry) {
    setSelected(inquiry);
    setNewStatus(inquiry.status);
    setNotes(inquiry.internalNotes ?? "");
  }

  async function saveChanges() {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/admin/inquiries/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, internalNotes: notes }),
    });
    setSaving(false);
    setSelected(null);
    load();
  }

  async function deleteInquiry(inquiry: Inquiry) {
    if (!confirm(`Delete inquiry from ${inquiry.name}?`)) return;
    await fetch(`/api/admin/inquiries/${inquiry.id}`, { method: "DELETE" });
    load();
  }

  const counts = useMemoStatusCounts(inquiries);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={`cursor-pointer ${statusFilter === "ALL" ? "bg-brand-950 text-white" : "hover:bg-black/[0.04]"} border-black/15`}
            onClick={() => setStatusFilter("ALL")}
          >
            All ({counts.all})
          </Badge>
          {STATUSES.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className={`cursor-pointer ${statusFilter === s ? "bg-brand-950 text-white" : "hover:bg-black/[0.04]"} border-black/15`}
              onClick={() => setStatusFilter(s)}
            >
              {s.replace("_", " ")} ({counts[s]})
            </Badge>
          ))}
        </div>
        <div className="relative">
          <Search className="text-faint absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search name, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 sm:w-64"
          />
        </div>
      </div>

      <div className="shadow-card rounded-xl border border-black/10 bg-white">
        {loading && inquiries.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">Loading inquiries...</p>
        ) : inquiries.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">No inquiries found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Move</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{inquiry.name}</p>
                    <p className="text-xs text-muted">{inquiry.phone}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{inquiry.moveFrom}</p>
                    <p className="text-xs text-muted">→ {inquiry.moveTo}</p>
                  </TableCell>
                  <TableCell className="text-sm">{inquiry.serviceType}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[inquiry.status]}>
                      {inquiry.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted">
                    {formatDistanceToNow(new Date(inquiry.createdAt))}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openInquiry(inquiry)} aria-label="View details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteInquiry(inquiry)}
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

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selected.name} · {selected.moveFrom} → {selected.moveTo}
                </DialogTitle>
                <DialogDescription>
                  Received {formatDistanceToNow(new Date(selected.createdAt))}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-faint">Contact</p>
                  <p className="text-sm font-medium text-foreground">{selected.phone}</p>
                  {selected.email && <p className="text-sm text-muted">{selected.email}</p>}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-faint">Details</p>
                  <p className="text-sm">
                    Service: <span className="font-medium">{selected.serviceType}</span>
                  </p>
                  {selected.moveDate && (
                    <p className="text-sm text-muted">Move date: {selected.moveDate}</p>
                  )}
                  {selected.propertyType && (
                    <p className="text-sm text-muted">Property: {selected.propertyType}</p>
                  )}
                </div>
                {selected.message && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-faint">Message</p>
                    <p className="text-sm text-muted">{selected.message}</p>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-surface p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Attribution</p>
                <div className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
                  <p className="text-muted">
                    <span className="text-faint">Landing:</span> {selected.landingPage || "—"}
                  </p>
                  <p className="text-muted">
                    <span className="text-faint">Referrer:</span> {selected.referrer || "Direct"}
                  </p>
                  <p className="text-muted">
                    <span className="text-faint">UTM:</span>{" "}
                    {[selected.utmSource, selected.utmMedium, selected.utmCampaign].filter(Boolean).join(" / ") || "—"}
                  </p>
                  <p className="text-muted">
                    <span className="text-faint">IP:</span> {selected.ipAddress || "—"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Internal Notes</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add follow-up notes for your team..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Cancel
                </Button>
                <Button onClick={saveChanges} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function useMemoStatusCounts(inquiries: Inquiry[]) {
  const counts: Record<string, number> = { all: inquiries.length };
  for (const s of STATUSES) {
    counts[s] = inquiries.filter((i) => i.status === s).length;
  }
  return counts;
}