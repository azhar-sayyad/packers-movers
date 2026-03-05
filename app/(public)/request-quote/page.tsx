import type { Metadata } from "next";
import { QuoteForm } from "@/components/lead/quote-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getActiveCities, getActiveServices, getSiteSettings } from "@/lib/site";
import { Phone } from "lucide-react";
import { telLink } from "@/lib/phone";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description:
    "Get a free, no-obligation moving quote online. We respond within minutes with competitive packers and movers pricing.",
};

export default async function RequestQuotePage() {
  const [cities, services, settings] = await Promise.all([
    getActiveCities(),
    getActiveServices(),
    getSiteSettings(),
  ]);

  const cityOptions = cities.map((c) => ({ value: c.slug, label: c.name }));
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Request a Quote
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Tell us about your move and get a free, no-obligation estimate within minutes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Free Moving Estimate</CardTitle>
            <CardDescription>
              Fill in the details below. Fields marked required are mandatory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuoteForm cities={cityOptions} services={serviceOptions} />
            {settings.phone && (
              <p className="text-muted mt-6 text-center text-sm">
                Prefer to talk? Call us directly at{" "}
                <a
                  href={telLink(settings.phone)}
                  className="text-accent-700 inline-flex items-center gap-1 font-semibold"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {settings.phone}
                </a>
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
