import { Phone, MessageCircle } from "lucide-react";
import { whatsappLink, telLink } from "@/lib/phone";

export function FloatingContact({ phone, whatsapp }: { phone?: string; whatsapp?: string }) {
  if (!phone && !whatsapp) return null;
  const waLink = whatsappLink(whatsapp ?? phone ?? "");

  return (
    <div className="fixed right-6 bottom-6 z-40 hidden flex-col gap-3 md:flex">
      {waLink && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="flex h-13 w-13 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      )}
      {phone && (
        <a
          href={telLink(phone)}
          title="Call us"
          className="bg-cta text-proof-ink shadow-cta/30 hover:bg-cta-dark flex h-13 w-13 items-center justify-center rounded-full shadow-lg transition-all hover:-translate-y-0.5"
        >
          <Phone className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}
