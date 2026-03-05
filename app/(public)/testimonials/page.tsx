import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials",
  description:
    "Read real reviews from families and businesses who moved with Packers & Movers across Madhya Pradesh and Maharashtra.",
};

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Customer Reviews
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Honest feedback from families and businesses we&apos;ve proudly relocated.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {testimonials.length === 0 ? (
          <p className="text-muted rounded-xl border border-black/10 bg-white p-10 text-center text-sm">
            No reviews yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 0.06}>
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star
                          key={k}
                          className={`h-4 w-4 ${k < t.rating ? "fill-amber-400 text-amber-400" : "text-black/20"}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted mb-4 text-sm leading-relaxed">“{t.reviewText}”</p>
                    <div>
                      <p className="text-brand-950 text-sm font-semibold">{t.customerName}</p>
                      {t.citySlug && <p className="text-faint text-xs capitalize">{t.citySlug}</p>}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
