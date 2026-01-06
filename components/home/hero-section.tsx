"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { QuoteForm, type CityOption, type ServiceOption } from "@/components/lead/quote-form";

interface HeroSectionProps {
  cities: CityOption[];
  services: ServiceOption[];
  phone?: string;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection({ cities, services, phone }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.22),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-500"
            >
              Trusted Since 2010
            </motion.p>
            <motion.h1
              variants={item}
              className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl"
            >
              Move Safe, Move
              <span className="text-accent-500"> Smart</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300"
            >
              Verified packers &amp; movers across Madhya Pradesh &amp; Maharashtra.
              Household shifting, office relocation, vehicle transport — handled with care.
            </motion.p>
            <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
              {[
                "GST Registered",
                "Fully Insured Transit",
                "100% Damage-Free",
                "Verified Reviews",
                "Doorstep Service",
                "24/7 Support",
              ].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/90"
                >
                  <Check className="h-3 w-3 text-accent-400" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-white p-6 shadow-xl"
          >
            <h3 className="mb-4 font-display text-xl font-bold text-brand-950">
              Get a Free Quote
            </h3>
            <QuoteForm cities={cities} services={services} variant="hero" />
            {phone && (
              <p className="mt-4 text-center text-sm text-muted">
                Or call us directly at{" "}
                <a href={`tel:${phone.replace(/[^\d]/g, "")}`} className="font-semibold text-accent-700">
                  {phone}
                </a>
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}