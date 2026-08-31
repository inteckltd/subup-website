# SubUp marketing site

Public website for [SubUp](https://pitchin.app) — private sports groups for friends in the UK. Built with Next.js, Tailwind CSS, and shadcn/ui.

## Local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Store badges stay **Coming soon** until you set the App Store and Play Store URLs.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (also used for sitemap, robots, JSON-LD) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 (`G-…`). Empty = not loaded |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Optional Google Ads (`AW-…`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (Facebook + Instagram) |
| `NEXT_PUBLIC_META_DOMAIN_VERIFY` | Meta domain verification meta tag |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Pixel |
| `NEXT_PUBLIC_APP_STORE_URL` | iOS download link |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Android download link |
| `NEXT_PUBLIC_APP_STORE_ID` | Numeric App Store ID for the smart banner |
| `RESEND_API_KEY` | Contact form |
| `RESEND_FROM_EMAIL` | Verified Resend sender |
| `CONTACT_TO_EMAIL` | Inbox (defaults to `info@inteckltd.co.uk`) |

Analytics and ad pixels load only after the cookie banner is accepted.

## Contact form

Create a free [Resend](https://resend.com) account, verify a sender domain, and set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Until those are set, the form returns a message to email Inteck directly.

## Deploy

Vercel is the usual host for this stack. Paste the same env vars in the project settings. Keep the existing Netlify legal site live until DNS points here.
