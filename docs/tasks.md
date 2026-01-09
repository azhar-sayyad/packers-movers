# Master Task Board

This task board tracks the execution status of all tasks across Sprint 1 through Sprint 5.

---

## 🎯 Sprint 1: Foundation, Database & Admin Auth
- [ ] Initialize Next.js 14/15 project with TypeScript, Tailwind CSS, and Lucide Icons
- [ ] Configure Prisma ORM with SQLite database (`prisma/schema.prisma`)
- [ ] Define DB Models (`AdminUser`, `AdminSession`, `City`, `Service`, `CityService`, `Inquiry`, `Portfolio`, `Testimonial`, `FAQ`, `SiteSetting`)
- [ ] Write DB Seed script (`prisma/seed.ts`) with sample MP & MH cities, services, reviews, FAQs, site settings, and admin credentials
- [ ] Implement Password Hashing (`bcryptjs`) & Session Token utilities (`lib/auth.ts`, `lib/session.ts`)
- [ ] Implement Zod validation schemas (`lib/validations.ts`) & Rate Limiter (`lib/rate-limit.ts`)
- [ ] Create `/admin/login` page UI & API endpoints (`/api/admin/login`, `/api/admin/logout`, `/api/admin/me`)
- [ ] Implement Next.js Auth Middleware (`middleware.ts`) protecting `/admin/*` routes

---

## 🎯 Sprint 2: Admin CMS & Inquiry Management
- [ ] Create Admin Layout (`app/admin/layout.tsx`) with persistent sidebar and user context
- [ ] Build Admin Dashboard (`app/admin/page.tsx`) with key metric cards & recent lead list
- [ ] Build Inquiry Management Page (`app/admin/inquiries/page.tsx`) & API (`/api/admin/inquiries/[id]`)
- [ ] Implement Inquiry status pipeline updater (`NEW` → `CONTACTED` → `QUOTATION_SENT` → `CONVERTED` → `CLOSED`), internal notes, and lead attribution inspection drawer
- [ ] Build City CMS Page (`app/admin/cities/page.tsx`) & API (`/api/admin/cities`) with local area tag manager & SEO meta editor
- [ ] Build Service CMS Page (`app/admin/services/page.tsx`) & API (`/api/admin/services`)
- [ ] Build Portfolio CMS Page (`app/admin/portfolio/page.tsx`) & API (`/api/admin/portfolio`)
- [ ] Build Testimonials CMS Page (`app/admin/testimonials/page.tsx`) & API (`/api/admin/testimonials`)
- [ ] Build FAQ CMS Page (`app/admin/faqs/page.tsx`) & API (`/api/admin/faqs`)
- [ ] Build Site Settings Page (`app/admin/settings/page.tsx`) & API (`/api/admin/settings`)

---

## 🎯 Sprint 3: Public UI Core & Lead Capture System
- [ ] Build Design System tokens, Header/Navbar, Footer, and Sticky Mobile CTAs (`Call`, `WhatsApp`, `Get Quote`)
- [ ] Build Lead Capture API (`/api/inquiries`) with Zod validation, anti-spam honeypot, IP rate limiting, and lead attribution tracking
- [ ] Build Homepage (`app/page.tsx`) with Hero quick quote form, trust stats, core services grid, top locations grid, portfolio preview, reviews slider, and general FAQs
- [ ] Build About Us Page (`app/about/page.tsx`)
- [ ] Build Contact Us Page (`app/contact/page.tsx`) with office details, Google Map embed, and lead form
- [ ] Build Request Quote Modal & Page (`app/request-quote/page.tsx`)

---

## 🎯 Sprint 4: Dynamic SEO Engine & Dynamic Pages
- [ ] Build Dynamic City Location Page (`app/packers-movers/[city]/page.tsx`) with localized hero, custom localized text block, local area tags, city services, city portfolio, city reviews, city FAQs, and LocalBusiness JSON-LD schema
- [ ] Implement `generateMetadata` for dynamic city location pages
- [ ] Build Dynamic Service Page (`app/services/[slug]/page.tsx`) with service details, step-by-step workflow, and related locations grid
- [ ] Implement `generateMetadata` for dynamic service pages
- [ ] Build Locations Hub Page (`app/locations/page.tsx`) with State & District filtering and live search
- [ ] Build Public Portfolio Page (`app/portfolio/page.tsx`) with city/service filter chips
- [ ] Build Public Testimonials Page (`app/testimonials/page.tsx`)
- [ ] Build Public FAQ Page (`app/faq/page.tsx`) with search accordion
- [ ] Build Dynamic Sitemap (`app/sitemap.ts`) for `/sitemap.xml`
- [ ] Build Dynamic Robots (`app/robots.ts`) for `/robots.txt`

---

## 🎯 Sprint 5: Verification, Polish & QA
- [ ] Run full build test: `npm run build` with zero TypeScript or Next.js errors
- [ ] Perform End-to-End manual testing of lead capture, admin login, CMS management, and city page rendering
- [ ] Optimize mobile responsiveness, image loading, and micro-animations
- [ ] Create Walkthrough artifact summarizing completed deliverables
