# Packers & Movers — Website + Admin CMS

Lead-generation website and admin CMS for a packers-and-movers business serving Madhya Pradesh and Maharashtra (Indore, Bhopal, Burhanpur, Khandwa, Jalgaon, Bhusawal, Buldhana, Dhule).

Public site: SEO location/service pages, quote capture with attribution, FAQs, reviews, portfolio. Admin: login-gated CMS for cities, services, inquiries, portfolio, testimonials, FAQs, and site settings.

## Stack

- Next.js 16 (App Router), React 19, Tailwind CSS 4
- Prisma 7 + better-sqlite3 (SQLite file DB)
- Zod validation, bcryptjs sessions (HttpOnly cookie `admin_session_token`)
- Radix UI primitives, lucide-react icons, framer-motion

## Quickstart

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed   # creates admin admin@packers.local / change-me-in-production
npm run dev       # http://localhost:3000
```

Admin: `http://localhost:3000/admin/login`.

## Environment

| Var                              | Required      | Purpose                                             |
| -------------------------------- | ------------- | --------------------------------------------------- |
| `DATABASE_URL`                   | Yes           | SQLite file, e.g. `file:./dev.db`                   |
| `NEXT_PUBLIC_SITE_URL`           | Yes for SEO   | Canonical base URL for `sitemap.xml` / `robots.txt` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Dev seed only | Seeded admin login, change in production            |

See `.env.example` for defaults.

## Scripts

| Command                                                        | Purpose                  |
| -------------------------------------------------------------- | ------------------------ |
| `npm run dev`                                                  | Local dev server         |
| `npm run build` / `npm start`                                  | Production build / serve |
| `npm run lint`                                                 | ESLint                   |
| `npm run format` / `format:check`                              | Prettier write / check   |
| `npm run typecheck`                                            | `tsc --noEmit`           |
| `npm run db:migrate` / `db:seed` / `db:studio` / `db:generate` | Prisma helpers           |

## Project structure

```text
app/
  layout.tsx              # fonts, metadata, MotionProvider
  sitemap.ts / robots.ts  # SEO
  (public)/               # public routes + _components/home/ (homepage sections)
  admin/                  # login + (dashboard)/ CMS pages
  api/                    # /api/inquiries + /api/admin/*
components/
  ui/                     # Radix wrappers (button, dialog, table, ...)
  common/                 # shared blocks: section-shell, cards, cta-buttons, status-badge, form-field
  admin/                  # use-admin-resource hook + CRUD clients
  lead/                   # quote-form
  layout/ motion/ ...     # header/footer, animation helpers
lib/
  site.ts                 # cached server queries (server-only)
  validations.ts          # Zod schemas
  constants.ts            # CTA copy, property sizes, inquiry statuses
  session.ts / auth.ts / admin-auth.ts / phone.ts / format.ts / utils.ts
prisma/
  schema.prisma / seed.ts / migrations/
proxy.ts                  # Next 16 route guard for /admin/* (not middleware.ts)
```

## Admin CMS

Routes under `/admin` (guarded by `proxy.ts` + server `requireAdmin()`):

- Dashboard, Inquiries (`NEW → CONTACTED → QUOTATION_SENT → CONVERTED → CLOSED`), Cities, Services, Portfolio, Testimonials, FAQs, Settings.
- Lead attribution (landing page, referrer, UTM) is captured by `quote-form` and stored on `Inquiry`.

## SEO

- Dynamic city pages: `/packers-movers/[city]`, service pages: `/services/[slug]`, with `generateMetadata` + `LocalBusiness` JSON-LD.
- `app/sitemap.ts` builds static + city + service URLs from `NEXT_PUBLIC_SITE_URL`; `app/robots.ts` serves `/robots.txt`.

## Deploy notes

- Set `DATABASE_URL` to a persistent volume (SQLite) or migrate to Postgres by changing the Prisma datasource + adapter.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain before building so sitemap canonicals are correct.
- Change the seeded admin password immediately after first login.
