import { Reveal } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";

const stats = [
  { target: 5000, suffix: "+", label: "Successful Moves" },
  { target: 100, suffix: "%", label: "Damage-Free Guarantee" },
  { target: 8, suffix: "+", label: "Active Service Cities" },
  { target: 24, suffix: "/7", label: "Customer Support" },
];

export function StatsSection() {
  return (
    <section className="bg-surface border-y border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-black/10 md:grid-cols-4 md:divide-y-0">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="flex">
              <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-4 py-8 text-center sm:px-6 sm:py-10">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  delay={i * 0.2}
                  className="font-editorial text-brand-700 text-3xl tracking-tight sm:text-4xl"
                />
                <p className="text-faint font-mono text-[10px] font-semibold tracking-[0.2em] uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
