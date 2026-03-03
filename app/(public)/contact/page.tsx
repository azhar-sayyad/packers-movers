import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/lead/quote-form";
import { getSiteSettings, getActiveCities, getActiveServices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Packers & Movers for free moving quotes, packing materials, and relocation advice across Madhya Pradesh and Maharashtra.",
};
import { telLink, whatsappLink, phoneDigits } from "@/lib/phone";

export default async function ContactPage() {
  const [settings, cities, services] = await Promise.all([
    getSiteSettings(),
    getActiveCities(),
    getActiveServices(),
  ]);

  const cityOptions = cities.map((c) => ({ value: c.slug, label: c.name }));
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));
  const phone = settings.phone;
  const whatsapp = settings.whatsapp ?? settings.phone;

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Reach out for instant estimates, scheduling, or any question about your move.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Head Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {settings.address && (
                  <p className="text-muted flex items-start gap-3">
                    <MapPin className="text-accent-600 mt-0.5 h-4 w-4 shrink-0" />
                    {settings.address}
                  </p>
                )}
                {settings.workingHours && (
                  <p className="text-muted flex items-center gap-3">
                    <Clock className="text-accent-600 h-4 w-4 shrink-0" />
                    {settings.workingHours}
                  </p>
                )}
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-muted hover:text-accent-700 flex items-center gap-3"
                  >
                    <Mail className="text-accent-600 h-4 w-4 shrink-0" />
                    {settings.email}
                  </a>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {phone && (
                <Button asChild variant="brand" size="lg" className="h-auto flex-col gap-1 py-4">
                  <a href={telLink(phone)}>
                    <Phone className="h-5 w-5" />
                    <span className="font-display text-lg">{phone}</span>
                    <span className="text-xs font-normal text-slate-300">Call Now</span>
                  </a>
                </Button>
              )}
              {whatsapp && phoneDigits(whatsapp) && (
                <Button asChild variant="success" size="lg" className="h-auto flex-col gap-1 py-4">
                  <a
                    href={whatsappLink(whatsapp, "Hi, I'd like a quote for my relocation.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-display text-lg">WhatsApp</span>
                    <span className="text-xs font-normal text-emerald-50">Chat with us</span>
                  </a>
                </Button>
              )}
            </div>
          </div>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <QuoteForm cities={cityOptions} services={serviceOptions} />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}