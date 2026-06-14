# SCDC — Bilingual Website (EN / 日本語)

Production-ready Next.js 14 website for **SCDC (Steel Construction Drawing Consultancy / S.C.D.C エンジニアリングファーム)** — steel shop drawings (JASS 6 compliant), structural drawing support, and BIM modeling services from Nepal for clients in Japan, Australia, Europe, and the USA.

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with the SCDC brand design system
- **next-intl** — full EN/JA i18n with `/en/...` ↔ `/ja/...` URL prefixes
- **Framer Motion** — fade-in on scroll, respects `prefers-reduced-motion`
- **react-hook-form + zod** — validated, localized contact form
- **lucide-react** icons, shadcn-style UI primitives
- Fonts: Barlow Condensed (headings), Inter + Noto Sans JP (body) via `next/font`

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
npm run build      # production build
```

## Deploying to Vercel

1. Push this folder to a Git repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected, no config needed.
3. Set the production domain to `www.scdc.com.np`.

## Pages

| Route | Purpose |
|---|---|
| `/[locale]` | Home — hero, stats, why-SCDC preview, services, industries, portfolio, workflow CTA |
| `/[locale]/services` | Services overview |
| `/[locale]/services/shop-drawings` | Steel shop drawings (JASS 6 badge, 5 deliverables) |
| `/[locale]/services/structural-drawings` | Structural drawing support (5 deliverables) |
| `/[locale]/services/bim-support` | BIM modeling (Tekla / Revit / AutoCAD / Navisworks) |
| `/[locale]/why-scdc` | 4 reasons, client voices, FAQ (FAQPage schema) |
| `/[locale]/portfolio` | 12 projects with S造/RC造/木造/SRC造 filter tabs |
| `/[locale]/service-plan` | Basic / Standard / Premium plans |
| `/[locale]/service-flowchart` | 9-step workflow |
| `/[locale]/about` | Story, values, regions served |
| `/[locale]/contact` | Validated contact form + details |

## SEO

- Per-page localized `<title>` / meta description / Open Graph / Twitter cards
- `hreflang` alternates (`en`, `ja`, `x-default`) on every page
- JSON-LD: Organization (all pages), Service (service pages), BreadcrumbList (all pages), FAQPage (`/why-scdc`)
- Auto-generated `sitemap.xml` (both locales) and `robots.txt`
- Semantic HTML and bilingual alt text throughout

## Things to customize

- **Logo:** drop `scdc-logo.png` into `public/` and swap the placeholder mark in `components/header.tsx` (marked with a comment).
- **OG image:** add `public/og-image.png` (1200×630).
- **Contact delivery:** `app/api/contact/route.ts` validates and accepts submissions; wire in Resend/SendGrid/SMTP where marked to actually email enquiries to `info.scdcnepal@gmail.com`.
- **Copy:** all text lives in `messages/en.json` and `messages/ja.json`.
- **Portfolio data:** structure types and durations in `lib/projects.ts`; titles/scopes in the message files.

© 2025 SCDC. All Rights Reserved.
