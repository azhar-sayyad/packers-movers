import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { Reveal } from "@/components/motion/reveal";

interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  tag: string;
  citySlug?: string | null;
}

export function PortfolioPreview({ items }: { items: PortfolioItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        tag="Our Work"
        title="Recently Completed Moves"
        description="A glimpse of our recent packing, loading, and relocation projects across the cities we serve."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((item, i) => (
          <Reveal key={item.id} delay={(i % 4) * 0.08}>
            <div className="group overflow-hidden rounded-xl border border-black/10 bg-white shadow-card">
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">{item.tag}</p>
                <h3 className="mt-1 font-display text-sm font-bold text-brand-950">{item.title}</h3>
                {item.citySlug && <p className="text-xs capitalize text-faint">{item.citySlug}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-semibold text-accent-700 hover:text-accent-800"
        >
          View full portfolio
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}