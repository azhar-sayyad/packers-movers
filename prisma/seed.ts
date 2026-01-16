import { PrismaClient } from '../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Admin User
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@packers.com' },
    update: {
      passwordHash: adminPasswordHash,
      name: 'Operations Manager',
    },
    create: {
      email: 'admin@packers.com',
      passwordHash: adminPasswordHash,
      name: 'Operations Manager',
    },
  });
  console.log('✅ Admin User seeded:', admin.email);

  // 2. Seed Cities (MP & MH focus)
  const cities = [
    {
      name: 'Indore',
      slug: 'indore',
      state: 'Madhya Pradesh',
      district: 'Indore',
      description: 'Top-rated packers and movers in Indore offering home shifting, office relocation, vehicle transport, and storage.',
      contentText: 'Indore is Madhya Pradesh\'s commercial capital and fastest-growing hub. Whether you are moving from Vijay Nagar to Super Corridor or relocating interstate to Mumbai or Delhi, our professional moving crew provides multi-layer bubble wrapping, enclosed container trucks, and 100% damage-free delivery across all major Indori neighborhoods.',
      localAreas: 'Vijay Nagar, Palasia, Rau, M G Road, Super Corridor, Dewas Naka, Nipania, Annapurna, Mahalaxmi Nagar, Scheme 54, Bengani Area',
      metaTitle: 'Best Packers and Movers in Indore | Safe & Affordable Shifting',
      metaDescription: 'Verified packers and movers in Indore MP. Get free instant price estimates for household shifting, office relocation, and car transport in Indore.',
    },
    {
      name: 'Bhopal',
      slug: 'bhopal',
      state: 'Madhya Pradesh',
      district: 'Bhopal',
      description: 'Trusted local & domestic shifting services across Bhopal city and surrounding areas.',
      contentText: 'Relocating in the City of Lakes? Our experienced movers in Bhopal specialize in household packing, heavy furniture disassembling, electronics wrapping, and door-to-door transit. We serve all prime localities including MP Nagar, Arera Colony, and Kolar Road.',
      localAreas: 'MP Nagar, Arera Colony, Kolar Road, Hoshangabad Road, Ayodhya Bypass, Bairagarh, Govindpura, Shahpura, Chunabhatti',
      metaTitle: 'Professional Packers and Movers in Bhopal | 100% Damage Free',
      metaDescription: 'Book reliable packers and movers in Bhopal for home shifting, furniture transport, and warehouse storage at standard rates.',
    },
    {
      name: 'Burhanpur',
      slug: 'burhanpur',
      state: 'Madhya Pradesh',
      district: 'Burhanpur',
      description: 'Top local moving company in Burhanpur for seamless domestic home & shop shifting.',
      contentText: 'Providing fast, reliable, and secure packing and moving solutions in Burhanpur. From Lalbagh to the main Bus Stand area, our team handles household goods, textile machinery, and commercial items with extreme care and zero delays.',
      localAreas: 'Bus Stand Area, Lalbagh, Shanwara, Rajora, Rastipura, Jainabad, Shahpur, Railway Station Road, Emadpur',
      metaTitle: 'Top Packers and Movers in Burhanpur MP | Relocation Services',
      metaDescription: 'Trusted Burhanpur packers & movers for household goods transport, bike packing, and local shifting across Burhanpur district.',
    },
    {
      name: 'Khandwa',
      slug: 'khandwa',
      state: 'Madhya Pradesh',
      district: 'Khandwa',
      description: 'Express packing and transport services in Khandwa city & nearby towns.',
      contentText: 'Moving home or shop in Khandwa? Count on our expert crew for sturdy corrugated box packaging, waterproof plastic wrapping, and swift container transit across Anand Nagar, Civil Lines, and Jaswadi Road.',
      localAreas: 'Anand Nagar, Jaswadi Road, Civil Lines, Railway Colony, Padawa, Rameshwar, Bombay Bazar, Snawad Road',
      metaTitle: 'Packers and Movers Khandwa | Household & Commercial Shifting',
      metaDescription: 'Get instant quotes for home shifting in Khandwa MP. Safe loading, unloading, and transit insurance options available.',
    },
    {
      name: 'Jalgaon',
      slug: 'jalgaon',
      state: 'Maharashtra',
      district: 'Jalgaon',
      description: 'Leading relocation service provider in Jalgaon city and MIDC industrial area.',
      contentText: 'As a prime commercial center in Northern Maharashtra, Jalgaon requires fast and reliable logistics. We offer customized home shifting, industrial goods transport, and vehicle carrier services across Ring Road, MIDC, and Mahabal.',
      localAreas: 'GS Ground, Ring Road, MIDC, Mahabal, Mehrun, Shivam Colony, Premier City, Koliwada, Ajanta Road',
      metaTitle: 'Best Packers and Movers in Jalgaon Maharashtra | Safe Transport',
      metaDescription: 'Premier packing and moving company in Jalgaon MH. Doorstep packing, safe unloading, and vehicle shipping at transparent rates.',
    },
    {
      name: 'Bhusawal',
      slug: 'bhusawal',
      state: 'Maharashtra',
      district: 'Jalgaon',
      description: 'Dedicated shifting & parcel transport services in Bhusawal railway junction & residential hubs.',
      contentText: 'Serving Bhusawal\'s vibrant community with high-grade packing materials, covered container trucks, and punctual delivery. Perfect for railway personnel, defense staff, and local residents moving locally or interstate.',
      localAreas: 'Khadka Road, Ordnance Factory Colony, Jamner Road, Station Road, Pandurang Nagar, Nahata Chowk, Varangaon Road',
      metaTitle: 'Packers and Movers Bhusawal | Fast & Secure Shifting Services',
      metaDescription: 'Reliable household packing and moving services in Bhusawal. Affordable rates, trained staff, and complete transit protection.',
    },
    {
      name: 'Buldhana',
      slug: 'buldhana',
      state: 'Maharashtra',
      district: 'Buldhana',
      description: 'Safe and hassle-free domestic packers and movers in Buldhana district.',
      contentText: 'Whether you are transferring to Chikhali, Khamgaon, or out of Maharashtra, our Buldhana moving crew ensures smooth disassembly, bubble packing, zero-scratch transportation, and doorstep re-assembly.',
      localAreas: 'Sundar Khed, Chikhali Road, Circular Road, Trisharan Chowk, Sahakar Nagar, Malkapur Road',
      metaTitle: 'Packers and Movers in Buldhana MH | Professional Relocation',
      metaDescription: 'Hassle-free packing, loading, and transit in Buldhana. Contact us today for quick pricing estimates and instant booking.',
    },
    {
      name: 'Dhule',
      slug: 'dhule',
      state: 'Maharashtra',
      district: 'Dhule',
      description: 'Expert home and commercial shifting services across Dhule city and MIDC.',
      contentText: 'Dhule sits at the crossroads of major national highways. We leverage top-quality container vehicles and experienced labor for seamless house shifting, office moves, and bike/car shipping from Deopur to MIDC.',
      localAreas: 'Deopur, MIDC, Sakri Road, Chittod Road, Wadibhokar Road, Mohadi, Mumbai-Agra Highway Hub',
      metaTitle: 'Best Packers and Movers in Dhule | Local & Interstate Shifting',
      metaDescription: 'Reliable packers and movers in Dhule Maharashtra. Experienced moving team for home, office, and vehicle transport.',
    },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: city,
      create: city,
    });
  }
  console.log(`✅ ${cities.length} Cities seeded.`);

  // 3. Seed Services
  const services = [
    {
      name: 'Household Shifting',
      slug: 'household-shifting',
      icon: 'Home',
      shortDesc: 'Complete residential packing, loading, transportation, and setup for stress-free home moving.',
      fullDesc: 'Our Household Shifting service handles everything from fragile kitchen glassware and heavy wooden beds to sensitive LED TVs and appliances. We use 3-layer protective wrapping including bubble wrap, corrugated sheets, and stretch film.',
      features: JSON.stringify([
        '3-Layer Protective Bubble & Foam Packaging',
        'Expert Furniture Disassembly & Re-assembly',
        'Enclosed Weatherproof Container Trucks',
        'Door-to-Door Loading & Unloading',
        'Transit Insurance Coverage Available',
      ]),
      metaTitle: 'Household Shifting Services | Safe Home Packing & Moving',
      metaDescription: 'Professional house shifting services with multi-layer wrapping, trained handlers, and weatherproof vehicles.',
    },
    {
      name: 'Office & Commercial Relocation',
      slug: 'office-shifting',
      icon: 'Building2',
      shortDesc: 'Zero-downtime office relocation, IT equipment handling, and workstation shifting.',
      fullDesc: 'Minimize business interruption with our planned weekend and overnight office shifting solutions. We specialize in computer server packing, modular desk dismantling, file archiving, and office furniture transport.',
      features: JSON.stringify([
        'Minimal Operations Downtime Strategy',
        'Antistatic Server & IT Equipment Packing',
        'Modular Workstation Disassembly',
        'Systematic Box Tagging & Inventory Control',
        'Dedicated Commercial Moving Supervisor',
      ]),
      metaTitle: 'Office Relocation & Commercial Shifting Services',
      metaDescription: 'Fast, secure commercial office moving services with anti-static packaging and minimal operational downtime.',
    },
    {
      name: 'Car & Bike Transportation',
      slug: 'car-transportation',
      icon: 'Truck',
      shortDesc: 'Scratch-free vehicle carrier service in enclosed specialized car & bike transporters.',
      fullDesc: 'Transport your car or motorcycle anywhere across India safely. We use specialized car carrier trucks with safety wheel chocks, tie-down straps, and protective car covers to ensure damage-free delivery.',
      features: JSON.stringify([
        'Enclosed Dedicated Vehicle Carriers',
        'Wheel Chocks & Heavy-Duty Tie Down Straps',
        'Pre-Transport Physical Inspection Checklist',
        'GPS Tracked Transit Vehicle',
        'Doorstep Pick-up & Delivery',
      ]),
      metaTitle: 'Car & Bike Transport Services | Safe Vehicle Shipping',
      metaDescription: 'Enclosed vehicle carrier transport for cars and bikes. Scratch-free delivery with doorstep pickup.',
    },
    {
      name: 'Warehousing & Storage',
      slug: 'warehousing',
      icon: 'Warehouse',
      shortDesc: 'Clean, secure, 24/7 monitored household & commercial storage spaces.',
      fullDesc: 'Need short-term or long-term storage while renovating or waiting for your new home key? Our modern warehouse facilities offer pest-controlled, CCTV-monitored, palletized storage with flexible monthly plans.',
      features: JSON.stringify([
        '24/7 CCTV Camera Monitoring & Security',
        'Pest-Controlled & Moisture-Proof Environment',
        'Flexible Short-Term & Long-Term Leases',
        'Palletized Stacking & Sealed Wooden Crates',
        'Individual Access & Inventory Records',
      ]),
      metaTitle: 'Warehousing & Household Storage Services',
      metaDescription: 'Secure, CCTV-monitored household goods storage and commercial warehousing with flexible monthly plans.',
    },
    {
      name: 'Local Relocation',
      slug: 'local-relocation',
      icon: 'MapPin',
      shortDesc: 'Same-day local moving within your city with dedicated small & medium vehicles.',
      fullDesc: 'Moving just a few kilometers away? Our express local shifting service provides rapid same-day packing, loading, transit, and unloading at affordable hourly or flat rates.',
      features: JSON.stringify([
        'Same-Day Swift Relocation',
        'Dedicated Mini Trucks & Pickup Containers',
        'Affordable Fixed Local Rates',
        'Trained Local Moving Crews',
        'No Hidden Charges Guarantee',
      ]),
      metaTitle: 'Local City Shifting Services | Same Day Relocation',
      metaDescription: 'Fast same-day local shifting services for houses, flats, and shops within the city.',
    },
    {
      name: 'Packing & Unpacking Only',
      slug: 'packing-unpacking',
      icon: 'Package',
      shortDesc: 'Hire professional packers to securely box your belongings with premium materials.',
      fullDesc: 'Already have your own vehicle? Hire our expert packers to carefully wrap, box, label, and organize your valuable items using top-quality cardboard boxes, tape, and protective rolls.',
      features: JSON.stringify([
        'Premium Quality Packing Material Provided',
        'Professional Fragile Item Handling',
        'Color-Coded Box Labeling',
        'Unpacking & Furniture Placement Help',
      ]),
      metaTitle: 'Professional Packing & Unpacking Services',
      metaDescription: 'Expert packing and unpacking crew for hire. High quality materials, fragile items protection, and quick turnaround.',
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✅ ${services.length} Services seeded.`);

  // 4. Seed FAQs
  const faqs = [
    {
      question: 'How are packing and moving charges calculated?',
      answer: 'Charges depend on the volume of goods (truck size required), total distance between cities, property floor level, presence of an elevator, and any add-on services like vehicle transport or storage.',
      category: 'Pricing & Estimates',
      order: 1,
    },
    {
      question: 'How far in advance should I book my relocation?',
      answer: 'We recommend booking 3 to 7 days before your planned move date for local shifting, and 7 to 10 days prior for interstate moves to ensure vehicle availability.',
      category: 'Booking',
      order: 2,
    },
    {
      question: 'Do you provide transit insurance for household goods?',
      answer: 'Yes! We offer optional full transit insurance that covers your goods against unforeseen accidents or severe natural events during transit.',
      category: 'Safety & Insurance',
      order: 3,
    },
    {
      question: 'What materials do you use for packing fragile items?',
      answer: 'We use heavy-duty double-walled corrugated boxes, air bubble wrapping rolls, corrugated sheets, foam sheets, stretch film, and heavy adhesive tape.',
      category: 'Packing Quality',
      order: 4,
    },
    {
      question: 'Do you disassemble and re-assemble beds and wardrobes?',
      answer: 'Yes, our team includes skilled carpenters who disassemble wooden beds, modular wardrobes, and dining tables prior to packing and re-assemble them at your new location.',
      category: 'Services',
      order: 5,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    });
  }
  console.log(`✅ ${faqs.length} FAQs seeded.`);

  // 5. Seed Testimonials
  const testimonials = [
    {
      customerName: 'Rajesh Sharma',
      citySlug: 'indore',
      rating: 5,
      reviewText: 'Shifted my 3BHK flat from Vijay Nagar Indore to Bhopal. The crew reached on time, wrapped my sofa and fridge meticulously with heavy bubble sheet, and delivered without a single scratch. Highly recommended!',
    },
    {
      customerName: 'Priya Kulkarni',
      citySlug: 'jalgaon',
      rating: 5,
      reviewText: 'Excellent service for my office relocation in Jalgaon MIDC! They completed the computer and furniture packing overnight without disrupting our regular working hours.',
    },
    {
      customerName: 'Sheikh Murtaza',
      citySlug: 'burhanpur',
      rating: 5,
      reviewText: 'Very honest pricing and clean work in Burhanpur. Moving household goods from Lalbagh to Indore was seamless. The truck driver was polite and punctual.',
    },
    {
      customerName: 'Vikram Singh',
      citySlug: 'bhopal',
      rating: 5,
      reviewText: 'Transported my Hyundai Creta car along with household stuff from Bhopal to Pune. Got real-time updates and my car arrived in perfect condition.',
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log(`✅ ${testimonials.length} Testimonials seeded.`);

  // 6. Seed Site Settings
  const settings = [
    { key: 'siteName', value: 'Packers & Movers Logistics', description: 'Brand Name' },
    { key: 'phone', value: '+91 98765 43210', description: 'Primary Hotline' },
    { key: 'whatsapp', value: '+91 98765 43210', description: 'WhatsApp Business Number' },
    { key: 'email', value: 'support@packersmovers.com', description: 'Support Email' },
    { key: 'address', value: '102, Logistics Tower, AB Road, Vijay Nagar, Indore, MP 452001', description: 'Head Office Address' },
    { key: 'workingHours', value: '24 Hours / 7 Days Available', description: 'Working Hours' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log(`✅ ${settings.length} Site Settings seeded.`);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
