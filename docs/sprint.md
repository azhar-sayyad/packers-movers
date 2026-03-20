# Sprint Roadmap & Execution Plan

This document defines the 5-sprint agile roadmap for building the **Packers & Movers Local-Service, SEO & Lead Generation Platform**.

---

## 🚀 Overview of Sprints

| Sprint       | Focus Area                            | Key Deliverables                                                                                                                 |
| ------------ | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint 1** | **Foundation, Database & Admin Auth** | Next.js setup, Tailwind CSS, Prisma Schema, SQLite, Seed Data script, Auth Helper & `/admin/login`                               |
| **Sprint 2** | **Admin CMS & Inquiry Management**    | Dashboard, Inquiry Pipeline, City CMS, Service CMS, Portfolio CMS, Testimonials & FAQ CMS                                        |
| **Sprint 3** | **Public Core & Lead System**         | Design System, Header/Footer/Mobile CTAs, Homepage, Lead API (`/api/inquiries`) with Attribution & Anti-Spam                     |
| **Sprint 4** | **Dynamic SEO Engine & Public Pages** | Dynamic City Pages (`/packers-movers/[city]`), Service Pages (`/services/[slug]`), Locations Directory, Dynamic Sitemap & Robots |
| **Sprint 5** | **Verification, Polish & QA**         | E2E build check, manual workflow verification, responsiveness polish, performance optimization                                   |

---

## Sprint 1: Foundation, Database & Admin Auth

**Goal**: Establish the core repository structure, database models, seed data engine, helper utilities, and secure admin authentication.

### Deliverables:

- Initialize Next.js 16 project with TypeScript, Tailwind CSS, Lucide Icons.
- Setup Prisma ORM with SQLite database configuration (`prisma/schema.prisma`).
- Create Prisma seed script (`prisma/seed.ts`) populating MP & MH cities, services, FAQs, testimonials, portfolio items, site settings, and initial admin account.
- Build authentication helpers (`lib/auth.ts`, `lib/session.ts`, `middleware.ts`) for password hashing, token validation, and HttpOnly session cookies.
- Build `/admin/login` page and login/logout API endpoints (`/api/admin/login`, `/api/admin/logout`).

### Definition of Done:
- `npx prisma db seed` runs cleanly and populates database.
- Admin user can log in at `/admin/login` and receive secure HttpOnly cookie.
- Unauthenticated access to `/admin` routes redirects to `/admin/login`.

---

## Sprint 2: Admin CMS & Inquiry Management
**Goal**: Build a complete, functional backend administration panel (`/admin`) for lead management and content editing.

### Deliverables:
- Admin layout with persistent sidebar navigation and quick logout.
- **Dashboard (`/admin`)**: Total leads count, today's leads count, active cities count, conversion percentage metric cards, and recent lead feed.
- **Inquiry Management (`/admin/inquiries`)**: Lead table with status pipeline filter (`NEW`, `CONTACTED`, `QUOTATION_SENT`, `CONVERTED`, `CLOSED`), status update modal, internal note editing, and lead attribution metadata view.
- **City CMS (`/admin/cities`)**: CRUD list, city creation/editing modal, active toggle, local areas tag editor, SEO meta editor, phone/WhatsApp overrides.
- **Service CMS (`/admin/services`)**: CRUD list, feature list editor, SEO settings.
- **Content CMS (`/admin/portfolio`, `/admin/testimonials`, `/admin/faqs`, `/admin/settings`)**: Full CRUD managers.

### Definition of Done:
- Admin can update lead statuses and save internal notes.
- Admin can create a new city (e.g. `Khandwa`) and edit local area tags & SEO fields without code changes.

---

## Sprint 3: Public Core & Lead System
**Goal**: Build the public layout, high-converting homepage, quote widgets, sticky mobile CTAs, and lead attribution API.

### Deliverables:
- Responsive Header/Navbar, Footer, Quick Phone/WhatsApp links, and sticky mobile CTAs (`Call`, `WhatsApp`, `Get Quote`).
- Homepage (`/`) with Hero Quick Quote widget, Trust statistics, Core services cards, Top active cities grid, Portfolio preview slider, Reviews carousel, and General FAQs.
- Lead Capture API (`/api/inquiries`) with Zod schema validation, honeypot spam shield, IP rate limiting, and lead attribution capturing (`landingPage`, `referrer`, `utm_*`).
- General pages: About Us (`/about`), Contact Us (`/contact`), Request Quote (`/request-quote`).

### Definition of Done:
- Lead submission from public hero form successfully saves to database with attribution metadata and appears live in `/admin/inquiries`.
- Anti-spam honeypot field discards spam submissions silently.

---

## Sprint 4: Dynamic SEO Engine & Public Pages
**Goal**: Create dynamic SSR city pages (`/packers-movers/[city]`), service pages (`/services/[slug]`), locations directory, dynamic sitemap, and structured JSON-LD data.

### Deliverables:
- **Dynamic City Location Page (`/packers-movers/[city]`)**:
  - Dynamic `generateMetadata` (Meta Title, Description, Canonical URL, OpenGraph).
  - Localized hero and **localized content text block**.
  - Local Areas Served chips/tags list.
  - Tailored city services, city portfolio photos, city customer reviews, city FAQs.
  - `LocalBusiness` JSON-LD schema injection for Google Search.
- **Dynamic Service Page (`/services/[slug]`)**: Service details, workflow steps, related cities grid.
- **Locations Directory (`/locations`)**: State & District filterable directory with instant search input.
- Public Portfolio (`/portfolio`), Testimonials (`/testimonials`), FAQ (`/faq`) pages.
- Dynamic `sitemap.ts` (`/sitemap.xml`) and `robots.ts` (`/robots.txt`).

### Definition of Done:
- Navigating to `/packers-movers/indore` or `/packers-movers/burhanpur` renders localized content, area lists, and valid JSON-LD schema.
- `/sitemap.xml` dynamically outputs all active city and service URLs.

---

## Sprint 5: Verification, Polish & QA
**Goal**: Execute comprehensive build checks, end-to-end user & admin flow tests, visual responsiveness polish, and final documentation.

### Deliverables:
- Clean build verification: `npm run build` with 0 TypeScript or Next.js compilation errors.
- Visual polish across desktop, tablet, and mobile breakpoints.
- Walkthrough documentation and summary.

### Definition of Done:
- Application builds cleanly and passes all manual and automated checks.
