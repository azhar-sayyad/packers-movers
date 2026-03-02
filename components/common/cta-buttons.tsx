import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { telLink } from "@/lib/phone";
import { QUOTE_CTA_LABEL } from "@/lib/constants";

export function PhoneCtaButton({
  phone,
  variant = "outline",
}: {
  phone: string;
  variant?: "outline" | "solid";
}) {
  return (
    <Button
      asChild
      size="lg"
      variant={variant === "solid" ? "default" : "outline"}
      className={
        variant === "solid"
          ? "w-full sm:w-auto"
          : "w-full border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
      }
    >
      <a href={telLink(phone)}>
        <Phone className="h-4 w-4" />
        {phone}
      </a>
    </Button>
  );
}

export function QuoteCtaLink({
  href = "/request-quote",
  label = QUOTE_CTA_LABEL,
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Button asChild size="lg" className="w-full sm:w-auto">
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export function PhoneTextLink({ phone }: { phone: string }) {
  return (
    <a href={telLink(phone)} className="text-accent-700 font-semibold">
      {phone}
    </a>
  );
}
