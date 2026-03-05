import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/ui/jsonld";
import { QuoteForm } from "@/components/lead/quote-form";
import { ServiceIcon } from "@/components/common/service-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getCityBySlug,
  getActiveCities,
  getActiveServices,
  getPublishedFAQs,
  getPublishedTestimonials,
  getPortfolioItems,
  getSiteSettings,
} from "@/lib/site";
import { telLink, whatsappLink } from "@/lib/phone";
import { Star } from "lucide-react";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const cities = await getActiveCities();
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = await getCityBySlug(city);
  if (!cityData) return { title: "City Not Found" };

  const title =
    cityData.metaTitle ?? `Best Packers & Movers in ${cityData.name} | ${cityData.state}`;
  const description = cityData.metaDescription ?? cityData.description;

  return {
    title,
    description,
    alternates: { canonical: `/packers-movers/${cityData.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/packers-movers/${cityData.slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const [cityData, cities, services, faqs, testimonials, portfolio, settings] = await Promise.all([
    getCityBySlug(city),
    getActiveCities(),
    getActiveServices(),
    getPublishedFAQs(city),
    getPublishedTestimonials(city),
    getPortfolioItems(city),
    getSiteSettings(),
  ]);

  if (!cityData) notFound();

  const cityOptions = cities.map((c) => ({ value: c.slug, label: c.name }));
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));
  const localAreas = cityData.localAreas
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const phone = cityData.phoneOverride ?? settings.phone;
  const whatsapp = cityData.whatsappOverride ?? settings.whatsapp ?? settings.phone;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: `Packers & Movers in ${cityData.name}`,
    telephone: phone ? phone.replace(/[^\d+ ]/g, "") : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityData.name,
      addressRegion: cityData.state,
      addressCountry: "IN",
    },
    areaServed: [{ "@type": "City", name: cityData.name }],
    description: cityData.metaDescription ?? cityData.description,
    openingHours: settings.workingHours ? "Mo-Su 00:00-24:00" : undefined,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-accent-500 mb-3 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
            <MapPin className="h-4 w-4" />
            Packers &amp; Movers in {cityData.state}
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {cityData.description}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{cityData.contentText}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="font-display text-brand-950 mb-4 text-2xl font-bold">
                Areas We Serve in {cityData.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {localAreas.map((area) => (
                  <Badge
                    key={area}
                    variant="outline"
                    className="text-muted border-black/15 bg-white px-3 py-1 text-sm font-medium"
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-brand-950 mb-4 text-2xl font-bold">
                Our Services in {cityData.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <a
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group shadow-card hover:shadow-card-hover flex items-start gap-3 rounded-xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-0.5"
                  >
                    <span className="bg-brand-950 group-hover:bg-accent-600 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
                      <ServiceIcon name={service.icon} className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="font-display text-brand-950 text-sm font-bold">
                        {service.name}
                      </h3>
                      <p className="text-muted text-xs">{service.shortDesc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {portfolio.length > 0 && (
              <div>
                <h2 className="font-display text-brand-950 mb-4 text-2xl font-bold">
                  Recent Work in {cityData.name}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {portfolio.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="shadow-card overflow-hidden rounded-xl border border-black/10 bg-white"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4">
                        <p className="text-accent-600 text-xs font-semibold uppercase">
                          {item.tag}
                        </p>
                        <h3 className="text-brand-950 mt-1 text-sm font-bold">{item.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {faqs.length > 0 && (
              <div>
                <h2 className="font-display text-brand-950 mb-4 text-2xl font-bold">
                  {cityData.name} Relocation FAQs
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={faq.id} value={faq.id ?? `faq-${i}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h2 className="font-display text-brand-950 mb-4 text-lg font-bold">
                  Get a Quick Quote in {cityData.name}
                </h2>
                <QuoteForm
                  cities={cityOptions}
                  services={serviceOptions}
                  variant="hero"
                  prefillFromCity={cityData.name}
                />
              </CardContent>
            </Card>

            {(phone || whatsapp) && (
              <Card className="shadow-card border-emerald-200 bg-emerald-50">
                <CardContent className="space-y-3 p-6">
                  <p className="text-sm font-semibold text-emerald-900">Prefer to talk?</p>
                  {phone && (
                    <a
                      href={telLink(phone)}
                      className="bg-brand-950 hover:bg-brand-900 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      Call {phone}
                    </a>
                  )}
                  {whatsapp && (
                    <a
                      href={whatsappLink(whatsapp, `Hi, I need a quote for moving in ${cityData.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Us
                    </a>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-brand-950">
            What Customers Say in {cityData.name}
          </h2>
          {testimonials.length === 0 ? (
            <p className="text-sm text-muted">No reviews yet for {cityData.name}.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((t) => (
                <Card key={t.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-black/20"}`}
                        />
                      ))}
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted">“{t.reviewText}”</p>
                    <p className="text-sm font-semibold text-brand-950">{t.customerName}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}