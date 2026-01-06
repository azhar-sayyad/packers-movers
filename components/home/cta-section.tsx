import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { telLink } from "@/lib/phone";
import { Reveal } from "@/components/motion/reveal";

export function CtaSection({ phone }: { phone?: string }) {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-brand-950 to-brand-800 px-6 py-12 text-center sm:px-12" y={32}>
        <h2 className="mx-auto mb-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-white">
          Ready to Move? Get Your Free Estimate Today
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-slate-300">
          Share your moving details and receive a competitive, no-obligation quote within minutes.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/request-quote">Request a Quote</Link>
          </Button>
          {phone && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
            >
              <a href={telLink(phone)}>
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  );
}