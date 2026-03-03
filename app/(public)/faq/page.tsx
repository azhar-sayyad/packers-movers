import type { Metadata } from "next";
import { FaqSearch } from "@/components/faq/faq-search";
import { getPublishedFAQs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about packing and moving charges, booking, transit insurance, and packing materials.",
};

export default async function FaqPage() {
  const faqs = await getPublishedFAQs();

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Common questions about pricing, packing materials, insurance, and booking.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <FaqSearch faqs={faqs} />
      </section>
    </>
  );
}
