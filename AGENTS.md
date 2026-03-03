<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Packers-web agent playbook

- Stack: Next.js 16 (App Router), React 19, Tailwind 4, Prisma 7 + better-sqlite3, Zod.
- Commands: `npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run db:migrate`, `npm run db:seed` (admin `admin@packers.local` / change-me).
- Auth: route guard lives in `proxy.ts` (not `middleware.ts` — Next 16 convention) + `lib/session.ts` + `lib/admin-auth.ts`. Cookie `admin_session_token`.
- Data: Prisma models in `prisma/schema.prisma`; server queries in `lib/site.ts`; validation in `lib/validations.ts` + shared enums in `lib/constants.ts`.
- UI: shared primitives in `components/ui/`, shared blocks in `components/common/` (`section-shell`, `cards`, `cta-buttons`, `status-badge`, `form-field`); page-specific homepage sections live in `app/(public)/_components/home/`.
- SEO: `app/sitemap.ts` + `app/robots.ts`, `NEXT_PUBLIC_SITE_URL` for canonicals.
- Docs: update `docs/tasks.md` checkboxes when finishing sprints; keep `README.md` setup steps accurate.
