"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  citySlug?: string | null;
}

export function FaqSearch({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [faqs, query]);

  return (
    <div>
      <div className="relative mb-8 max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-black/10 bg-white p-10 text-center text-sm text-muted">
          No answers match your search.
        </p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filtered.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>
                <span className="text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent-600">
                  {faq.category}
                </div>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}