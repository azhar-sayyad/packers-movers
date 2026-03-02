import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
}

export function FormField({ id, label, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
