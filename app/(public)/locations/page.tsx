import type { Metadata } from "next";
import { LocationDirectory } from "@/components/locations/location-directory";
import { getActiveCities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations We Serve",
  description:
    "Find trusted packers and movers in Indore, Bhopal, Burhanpur, Khandwa, Jalgaon, Bhusawal, Buldhana and Dhule.",
};

export default async function LocationsPage() {
  const cities = await getActiveCities();

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Locations We Serve
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Find trusted packers and movers in your city across Madhya Pradesh and Maharashtra.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <LocationDirectory cities={cities} />
      </section>
    </>
  );
}
