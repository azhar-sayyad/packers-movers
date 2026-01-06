import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/home/section-heading";
import { Reveal } from "@/components/motion/reveal";

interface Faq {
  id?: string;
  question: string;
  answer: string;
  category: string;
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        tag="FAQ"
        title="Frequently Asked Questions"
        description="Answers to the questions our customers ask most."
      />
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <Reveal key={faq.id ?? faq.question} delay={i * 0.04}>
            <AccordionItem value={faq.id ?? `faq-${i}`}>
              <AccordionTrigger>
                <span className="text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Reveal>
        ))}
      </Accordion>
    </section>
  );
}