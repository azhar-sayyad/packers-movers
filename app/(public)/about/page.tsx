import type { Metadata } from "next";
import { Shield, Users, Target, HeartHandshake } from "lucide-react";
import { CtaSection } from "@/app/(public)/_components/home/cta-section";
import { getSiteSettings } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Packers & Movers, a trusted relocation company serving Madhya Pradesh and Maharashtra with 5,000+ successful moves since 2010.",
};

const values = [
  {
    icon: Shield,
    title: "Safety First",
    text: "Multi-layer packing with premium materials and damage-free transit guarantees on every move.",
  },
  {
    icon: Users,
    title: "Trained Crew",
    text: "Background-verified staff trained in careful handling, disassembly, and re-assembly of furniture.",
  },
  {
    icon: Target,
    title: "On-Time Delivery",
    text: "Punctual loading schedules, GPS-tracked vehicles, and transparent communication at every step.",
  },
  {
    icon: HeartHandshake,
    title: "Honest Pricing",
    text: "Clear, upfront estimates with no hidden charges — the price we quote is the price you pay.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            About Our Company
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            We&apos;re a locally rooted, nationally experienced relocation company serving Madhya
            Pradesh and Maharashtra with pride and precision.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-accent-600 mb-3 text-sm font-semibold tracking-wider uppercase">
              Our Story
            </p>
            <h2 className="font-display text-brand-950 mb-4 text-3xl font-bold">
              15+ Years of Moving Families &amp; Businesses
            </h2>
            <p className="text-muted mb-4 leading-relaxed">
              Founded with a single truck and a promise to treat every box like our own, we have
              grown into a multi-city relocation trusted by thousands of families, offices, and
              industrial clients across Indore, Bhopal, Burhanpur, Khandwa, Jalgaon, Bhusawal,
              Buldhana and Dhule.
            </p>
            <p className="text-muted leading-relaxed">
              Today our modern fleet, dedicated crews, and state-of-the-art warehousing facilities
              move household goods, office equipment, vehicles, and entire industrial setups with
              military-level precision — all while keeping our rates transparent and fair.
            </p>
          </div>
          <div className="bg-surface rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-accent-600 text-4xl font-extrabold">15+</p>
                <p className="text-muted text-sm">Years of Experience</p>
              </div>
              <div>
                <p className="font-display text-accent-600 text-4xl font-extrabold">5,000+</p>
                <p className="text-muted text-sm">Moves Completed</p>
              </div>
              <div>
                <p className="font-display text-4xl font-extrabold text-accent-600">40+</p>
                <p className="text-sm text-muted">Trained Team Members</p>
              </div>
              <div>
                <p className="font-display text-4xl font-extrabold text-accent-600">8+</p>
                <p className="text-sm text-muted">Active Service Cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-brand-950">
            What We Stand For
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-xl border border-black/10 bg-white p-6 shadow-card">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50">
                    <Icon className="h-5 w-5 text-accent-600" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-brand-950">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection phone={settings.phone} />
    </>
  );
}