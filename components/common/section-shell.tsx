import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: "default" | "tinted";
}

export function SectionShell({
  children,
  className,
  innerClassName,
  variant = "default",
}: SectionShellProps) {
  return (
    <section className={cn(variant === "tinted" && "bg-surface", className)}>
      <div className={cn("mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
