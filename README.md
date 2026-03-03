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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
