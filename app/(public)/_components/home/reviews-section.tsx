"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/motion/reveal";

interface Testimonial {
  customerName: string;
  rating: number;
  reviewText: string;
  citySlug?: string | null;
}

export function ReviewsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const visible = index;
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="bg-brand-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          tag="Customer Reviews"
          title="What Our Customers Say"
          description="Real experiences from people who trusted us with their belongings."
        />
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${visible * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full shrink-0 px-1">
                    <div className="mx-auto max-w-3xl rounded-2xl bg-white/5 p-8 text-center backdrop-blur">
                      <Quote className="text-accent-500 mx-auto mb-4 h-8 w-8" />
                      <p className="mb-6 text-lg leading-relaxed text-slate-200">
                        “{t.reviewText}”
                      </p>
                      <div className="mb-2 flex justify-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={`h-4 w-4 ${s < t.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="font-display font-semibold text-white">{t.customerName}</p>
                      {t.citySlug && <p className="text-faint text-sm capitalize">{t.citySlug}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="bg-accent-600 absolute top-1/2 left-0 -translate-y-1/2 rounded-full p-2 text-white shadow-lg transition-transform hover:scale-110"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="bg-accent-600 absolute top-1/2 right-0 -translate-y-1/2 rounded-full p-2 text-white shadow-lg transition-transform hover:scale-110"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
