import { PhoneCtaButton, QuoteCtaLink } from "@/components/common/cta-buttons";
import { QUOTE_CTA_LABEL } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

export function CtaSection({ phone }: { phone?: string }) {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <Reveal
        className="from-brand-950 to-brand-800 mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r px-6 py-12 text-center sm:px-12"
        y={32}
      >
        <h2 className="font-display mx-auto mb-3 max-w-2xl text-3xl font-bold tracking-tight text-white">
          Ready to Move? {QUOTE_CTA_LABEL} Today
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-slate-300">
          Share your moving details and receive a competitive, no-obligation quote within minutes.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <QuoteCtaLink label={QUOTE_CTA_LABEL} />
          {phone && <PhoneCtaButton phone={phone} />}
        </div>
      </Reveal>
    </section>
  );
}
