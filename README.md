# Liesha Raaga Designers

Premium informational website for Liesha Raaga Designers, styled around the supplied pastel watercolor, floral and calligraphy visual reference.

## Stack
- Next.js + React + TypeScript
- Supabase only for enquiry submissions
- No e-commerce functionality

## Supabase
Run `supabase/migrations/001_enquiries.sql` in the Supabase SQL Editor, then set:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

The `enquiries` table has RLS enabled. Anonymous/authenticated visitors can INSERT valid enquiries, but there is intentionally no public SELECT policy.

## Content
Address:
9/61/2B, One Town,
Vijayawada,
Andhra Pradesh, India

Phone: 9849506512 / 9246464621
Instagram: @liesha_raaga_designer

The gallery uses clearly labelled generic fashion inspiration imagery as placeholders, not claimed store products.

## Run locally
```bash
npm install
npm run dev
```

\n## Business-card reference\nThe supplied Liesha Raaga Designers card is used as the primary visual reference. Its floral corner artwork and location QR are included as brand-reference assets.\n
WhatsApp links are provided for both store numbers: 9849506512 and 9246464621.
