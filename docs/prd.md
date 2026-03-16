# Product Requirements Document (PRD)

## Project Title: Packers & Movers Local-Service, SEO & Lead Generation Platform

**Target Domains & Markets**: Relocation Services across Madhya Pradesh (Indore, Bhopal, Burhanpur, Khandwa, etc.) & Maharashtra (Jalgaon, Bhusawal, Buldhana, Dhule, etc.).

---

## 1. Executive Summary & Goals

The objective of this project is to build a modern, high-converting, local-service web platform and CMS for a Packers & Movers business. Unlike generic corporate brochure websites or AI-boilerplate pages, this platform is designed with a **human-crafted, premium Indian logistics design system** and functions as a **programmatic, CMS-driven SEO engine and lead capture system**.

### Primary Business Objectives:

1. **Dominant Local SEO**: Automatically generate and render high-ranking location-specific landing pages (e.g. `/packers-movers/indore`, `/packers-movers/burhanpur`, `/packers-movers/jalgaon`) with unique localized content, neighborhood lists, and structured JSON-LD schema.
2. **Maximum Lead Conversion**: Provide frictionless contact mechanisms (Quick Quote Hero Widget, Modal Quote Form, Mobile Sticky `Call` & `WhatsApp` CTAs) with zero unnecessary steps.
3. **Full Lead Source Attribution**: Track precisely which SEO page, referrer, and UTM parameters generated each customer lead.
4. **Zero-Code Administration**: Empower non-technical admins to manage cities, local areas served, services, customer reviews, photo portfolios, FAQs, and lead statuses from an intuitive `/admin` panel.
5. **Human-Grade Design Excellence**: Strictly avoid generic "AI-generated" looks. Build with a professional logistics palette (Deep Navy `#0F172A`, Vivid Amber `#F97316`, Emerald Green `#10B981`), clean typographic hierarchy, custom Shadcn/Radix-style reusable UI components, and intuitive micro-interactions.

---

## 2. Target Audience & User Personas

1. **Homeowner / Tenant Shifting**: Needs household relocation from one city/neighborhood to another. Seeks pricing estimates, safety guarantees, customer reviews, and immediate contact via WhatsApp or Phone.
2. **Office / Commercial Manager**: Seeks corporate relocation, office furniture packing, IT equipment handling, and vehicle transport. Requires business trust, invoice options, and quick quotes.
3. **Business Admin / Operator**: Internal business manager handling inbound inquiries, assigning follow-ups, managing pricing, and adding new service locations via `/admin`.

---

## 3. Detailed Feature Requirements

### 3.1 Design System & UI Architecture (No AI-Boilerplate Look)

- **Component Library**: Custom Shadcn/UI-style modular primitives (`Button`, `Card`, `Input`, `Select`, `Modal`/`Dialog`, `Badge`, `Tabs`, `Table`, `Accordion`).
- **Color Palette**:
  - Primary Slate Navy (`slate-900` / `#0F172A`) for header, typography, and authority components.
  - Conversion Accent (`orange-600` / `#EA580C`) for primary CTAs, quote buttons, and active highlights.
  - Trust Emerald (`emerald-600` / `#059669`) for verified badges, pricing tags, and success states.
  - Neutral Soft Canvas (`slate-50` / `#F8FAFC`) for body background readability.
- **Typography & Details**: Inter / Plus Jakarta Sans font, crisp micro-animations (subtle card hover translation, smooth accordion slide), high contrast readability.

---

### 3.2 Public SEO & Customer Facing Site

- **Dynamic City Location Pages (`/packers-movers/[city]`)**:
  - URL format: `/packers-movers/indore`, `/packers-movers/bhopal`, `/packers-movers/burhanpur`, etc.
  - Dynamic `generateMetadata` (SEO title, meta description, canonical URL, OpenGraph).
  - Localized Hero title & description.
  - **Localized content section**: Custom paragraph highlighting localized service coverage.
  - **Local Areas Served chips/tags**: Detailed neighborhood list (e.g., Vijay Nagar, Rau, Palasia for Indore; Bus Stand Area, Lalbagh for Burhanpur).
  - City-tailored services grid, city portfolio photos, city customer testimonials, and city FAQ accordion.
  - Structured Data: `LocalBusiness` JSON-LD schema injection for rich Google search snippets.
  - Lead form pre-populated with `movingFrom = city.name`.

- **Dynamic Service Pages (`/services/[slug]`)**:
  - URL format: `/services/household-shifting`, `/services/office-shifting`, `/services/car-transportation`, `/services/warehousing`, etc.
  - Detailed service breakdown, key features, step-by-step relocation workflow, and quick quote trigger.
  - Cross-link grid to popular active location pages.

- **Locations Directory (`/locations`)**:
  - State & District hierarchy view (Madhya Pradesh → Indore, Bhopal, Burhanpur; Maharashtra → Jalgaon, Buldhana).
  - Live search input to filter cities instantly.

- **Lead Capture & Attribution Engine**:
  - Quick Quote Widget on Hero (`From City`, `To City`, `Phone`, `Get Quote`).
  - Comprehensive Quote Form (`Name`, `Phone`, `Email`, `From`, `To`, `Service Type`, `Move Date`, `Property Type`, `Message`).
  - Automatic background lead attribution tracking (`landingPage`, `document.referrer`, `utm_source`, `utm_medium`, `utm_campaign`).
  - Anti-Spam protection: Honeypot field + Zod validation + API rate limiting.

- **Content & Trust Pages**:
  - **Homepage (`/`)**: High-converting hero, trust stats, core services, location grid, portfolio preview, reviews slider, general FAQ.
  - **About Us (`/about`)**: Company background, experience, team, safety standards, values.
  - **Portfolio (`/portfolio`)**: Gallery of completed packing/loading projects with city and service filters.
  - **Testimonials (`/testimonials`)**: Customer reviews with star ratings and city badges.
  - **FAQ (`/faq`)**: Searchable global FAQ accordion.
  - **Contact Us (`/contact`)**: Office details, direct phone/WhatsApp links, map embed, inquiry form.

- **Automated SEO Infrastructure**:
  - Dynamic `sitemap.xml`: Generates links for all static pages + active city pages + active service pages.
  - Dynamic `robots.txt`: Allows public indexing while disallowing `/admin`.

---

### 3.3 Admin CMS (`/admin`)

- **Authentication & Security**:
  - `/admin/login` page with secure password hashing (`bcryptjs`) & HttpOnly cookie sessions.
  - Auth Middleware protecting all `/admin/*` pages and API routes.
- **Admin Dashboard (`/admin`)**:
  - Metric cards: Total Inquiries, Today's Inquiries, Active Cities, Conversion Rate.
  - Recent Inquiries feed with status badges (`NEW`, `CONTACTED`, `QUOTATION_SENT`, `CONVERTED`, `CLOSED`).
  - Lead distribution by city.
- **Inquiry Management (`/admin/inquiries`)**:
  - Searchable & filterable lead table.
  - Status pipeline drawer/modal (`NEW` → `CONTACTED` → `QUOTATION_SENT` → `CONVERTED` → `CLOSED`).
  - Admin internal notes log per inquiry.
  - Full lead attribution detail view (`landingPage`, `referrer`, `UTM tags`).
- **City CMS (`/admin/cities`)**:
  - City CRUD operations.
  - Local Areas Served list editor (add/remove tags).
  - Custom SEO meta title & description editor per city.
  - Custom Phone & WhatsApp override per city.
  - Toggle Active/Draft status.
- **Service CMS (`/admin/services`)**:
  - Service CRUD operations, feature list editor, long description, SEO fields.
- **Content CMS (`/admin/portfolio`, `/admin/testimonials`, `/admin/faqs`, `/admin/settings`)**:
  - Portfolio item CRUD (images, title, city, service).
  - Testimonial CRUD (customer name, city, rating, review text, published toggle).
  - FAQ CRUD (question, answer, category, city tag).
  - Site Settings (global phone, WhatsApp, email, default address, social links).

---

## 4. Non-Functional Requirements

- **Performance**: High Core Web Vitals score, under 1.5s initial load, responsive dynamic image rendering.
- **Security**: No cleartext admin passwords (`bcryptjs`), HttpOnly secure cookies, SQL parameterization via Prisma ORM, Zod input sanitization, API rate limiting.
- **Mobile First**: Fixed sticky mobile CTA bar for one-tap calling and WhatsApp messaging.

---

## 5. Technology Stack Summary

- **Frontend & Server Framework**: Next.js 16 (App Router, TypeScript)
- **Styling & UI**: Tailwind CSS, Lucide React Icons, Shadcn/UI Component Primitives
- **Database & ORM**: SQLite via Prisma ORM (`prisma/schema.prisma`)
- **State & Form Handling**: React Hook Form / Server Actions, Zod validation
- **Auth**: HttpOnly cookie-based session management with DB session store
