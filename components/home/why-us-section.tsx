import { ShieldCheck, IndianRupee, Truck, Clock, FileText, Zap, PackageCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified & Fully Insured",
    desc: "GST-registered, vetted crew and transit insurance on every move for complete peace of mind.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    desc: "Upfront, all-inclusive quotes with zero hidden charges — what we quote is what you pay.",
  },
  {
    icon: Truck,
    title: "Door-to-Door Care",
    desc: "Professional packing, loading, transport and setup at both ends — handled by trained movers.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    desc: "GPS-tracked vehicles and schedule commitments, so your move lands exactly when promised.",
  },
];

const steps = [
  {
    icon: FileText,
    title: "Tell Us Your Move",
    desc: "Share your cities, move date and home size. It takes under 30 seconds.",
  },
  {
    icon: Zap,
    title: "Get an Instant Quote",
    desc: "Receive a transparent, no-obligation price estimate for your move.",
  },
  {
    icon: PackageCheck,
    title: "We Move You Safely",
    desc: "Our team packs, transports and set-ups your belongings damage-free.",
  },
];

export function WhyUsSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Why Choose Us"
          title="Packers & Movers You Can Trust"
          description="From transparent pricing to insured, damage-free shifts — here's what makes 5000+ customers choose us."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} y={24} delay={i * 0.08} className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cta-soft text-brand-600">
                <r.icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 font-display text-lg font-bold text-brand-950">{r.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{r.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-brand-950 px-6 py-10 sm:px-12">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center" y={20}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-400">Simple Process</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Move in 3 Easy Steps
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} y={24} delay={i * 0.1} className="relative flex flex-col items-center text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-400 ring-1 ring-white/15">
                  <s.icon className="h-7 w-7" />
                </span>
                <span className="absolute -top-2 right-2 font-display text-5xl font-extrabold text-white/10 sm:right-4">
                  0{i + 1}
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-slate-300">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}