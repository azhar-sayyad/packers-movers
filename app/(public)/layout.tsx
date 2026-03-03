import { getActiveCities, getActiveServices, getSiteSettings } from "@/lib/site";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { FloatingContact } from "@/components/layout/floating-contact";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, cities, services] = await Promise.all([
    getSiteSettings(),
    getActiveCities(),
    getActiveServices(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader phone={settings.phone} services={services} cities={cities} />
      <main className="flex-1 pb-16 sm:pb-0">{children}</main>
      <PublicFooter settings={settings} cities={cities} services={services} />
      <MobileCtaBar phone={settings.phone} whatsapp={settings.whatsapp} />
      <FloatingContact phone={settings.phone} whatsapp={settings.whatsapp} />
    </div>
  );
}
