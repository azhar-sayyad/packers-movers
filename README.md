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

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
