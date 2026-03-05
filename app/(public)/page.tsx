import {
  getSiteSettings,
  getActiveCities,
  getActiveServices,
  getPublishedFAQs,
  getPublishedTestimonials,
  getPortfolioItems,
} from "@/lib/site";
import { HeroSection } from "@/app/(public)/_components/home/hero-section";
import { StatsSection } from "@/app/(public)/_components/home/stats-section";
import { WhyUsSection } from "@/app/(public)/_components/home/why-us-section";
import { ServicesSection } from "@/app/(public)/_components/home/services-section";
import { CitiesSection } from "@/app/(public)/_components/home/cities-section";
import { PortfolioPreview } from "@/app/(public)/_components/home/portfolio-preview";
import { ReviewsSection } from "@/app/(public)/_components/home/reviews-section";
import { FaqSection } from "@/app/(public)/_components/home/faq-section";
import { CtaSection } from "@/app/(public)/_components/home/cta-section";

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
