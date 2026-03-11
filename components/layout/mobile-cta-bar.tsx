"use client";

import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { whatsappLink, telLink, phoneDigits } from "@/lib/phone";

export function MobileCtaBar({ phone, whatsapp }: { phone?: string; whatsapp?: string }) {
  if (!phone && !whatsapp) return null;
  const waLink = whatsappLink(whatsapp ?? phone ?? "");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-black/10 bg-white shadow-[0_-4px_16px_rgba(2,44,34,0.08)] sm:hidden">
      <Link
        href={phone ? telLink(phone) : "#"}
        className="text-brand-950 flex flex-col items-center gap-0.5 py-2.5"
      >
        <Phone className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Call</span>
      </Link>
      <Link
        href={phoneDigits(whatsapp ?? phone ?? "") ? waLink : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 bg-emerald-600 py-2.5 text-white"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-[11px] font-semibold">WhatsApp</span>
      </Link>
      <Link
        href="/request-quote"
        className="bg-cta text-proof-ink flex flex-col items-center gap-0.5 py-2.5"
      >
        <FileText className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Get Quote</span>
      </Link>
    </div>
  );
}
