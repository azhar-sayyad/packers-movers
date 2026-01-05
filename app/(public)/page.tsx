import { getSiteSettings, getActiveCities, getActiveServices, getPublishedFAQs, getPublishedTestimonials, getPortfolioItems } from "@/lib/site";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { WhyUsSection } from "@/components/home/why-us-section";
import { ServicesSection } from "@/components/home/services-section";
import { CitiesSection } from "@/components/home/cities-section";
import { PortfolioPreview } from "@/components/home/portfolio-preview";
import { ReviewsSection } from "@/components/home/reviews-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";

export default async function HomePage() {
  const [settings, cities, services, faqs, testimonials, portfolio] = await Promise.all([
    getSiteSettings(),
    getActiveCities(),
    getActiveServices(),
    getPublishedFAQs(),
    getPublishedTestimonials(),
    getPortfolioItems(),
  ]);

  const cityOptions = cities.map((c) => ({ value: c.slug, label: c.name }));
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));

  return (
    <>
      <HeroSection cities={cityOptions} services={serviceOptions} phone={settings.phone} />
      <StatsSection />
      <WhyUsSection />
      <ServicesSection services={services} />
      <CitiesSection cities={cities} />
      <PortfolioPreview
        items={portfolio.map((p) => ({
          id: p.id,
          title: p.title,
          imageUrl: p.imageUrl,
          tag: p.tag,
          citySlug: p.citySlug,
        }))}
      />
      <ReviewsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
      <CtaSection phone={settings.phone} />
    </>
  );
}