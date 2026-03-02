import { Badge } from "@/components/ui/badge";
import { INQUIRY_STATUSES, STATUS_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge className={cn(STATUS_STYLES[status] ?? "bg-surface-secondary text-muted", className)}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
