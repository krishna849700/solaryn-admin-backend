# Solaryn — Admin Panel + Backend

Drop-in backend and admin panel for your Solaryn Next.js site: form submissions
get saved to a database, trigger a WhatsApp alert to your phone, and show up
in a password-protected `/admin` dashboard.

## What's included

```
prisma/schema.prisma          → Lead database model
lib/prisma.ts                 → DB client
lib/whatsapp.ts                → WhatsApp alert sender (CallMeBot)
lib/auth.ts                    → Admin login/session helpers
middleware.ts                  → Protects /admin and /api/admin routes
app/api/enquiry/route.ts       → Public endpoint your forms submit to
app/api/admin/login/route.ts   → Admin login
app/api/admin/logout/route.ts  → Admin logout
app/api/admin/leads/route.ts   → List/search leads (admin only)
app/api/admin/leads/[id]/route.ts → Get/update/delete one lead (admin only)
app/admin/login/page.tsx       → Login screen
app/admin/page.tsx             → Dashboard (table, filters, search)
app/admin/leads/[id]/page.tsx  → Lead detail (status, notes, delete)
components/admin/StatusBadge.tsx
examples/SiteAuditForm.example.tsx → How to wire your existing form
.env.example                   → All env vars you need to set
```

## 1. Copy files into your project

Copy everything above (except `examples/`, which is just a reference) into
the matching paths in your existing Next.js project. If you already have a
`middleware.ts`, merge the logic instead of overwriting.

## 2. Install dependencies

```bash
npm install @prisma/client jose
npm install -D prisma
```

## 3. Set up the database

Free options that work great with Vercel:
- **Neon** — https://neon.tech (recommended, generous free tier)
- **Vercel Postgres** — from your Vercel project's Storage tab

Copy the connection string into `.env` as `DATABASE_URL`, then run:

```bash
npx prisma generate
npx prisma db push
```

This creates the `Lead` table. `npx prisma studio` gives you a quick GUI to
poke at the data directly if you ever need to.

## 4. Set up WhatsApp alerts (2 minutes, free)

1. On the phone that should receive alerts, save this contact:
   **+34 644 51 95 23** (name it "CallMeBot")
2. Send that contact the message: `I allow callmebot to send me messages`
3. You'll get a reply with your personal API key (a number)
4. Fill in `.env`:
   ```
   WHATSAPP_ALERT_PHONE=91XXXXXXXXXX   # your number, country code, digits only
   WHATSAPP_CALLMEBOT_APIKEY=123456
   ```

This is the fastest way to get every new enquiry pinged straight to your
WhatsApp. It's meant for personal alerts (i.e., notifying *you*), not for
messaging customers — that's a different, heavier setup (Meta's official
WhatsApp Business API) if you ever need it later. Everything that calls
`sendWhatsAppAlert()` stays the same if you swap the implementation.

## 5. Set up admin login

In `.env`:

```
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_JWT_SECRET=<run: openssl rand -base64 32>
```

## 6. Wire your forms

Your "Request Free Site Audit & Quote" form (and any other lead form) should
POST to `/api/enquiry`:

```js
await fetch("/api/enquiry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name, phone, email, city, monthlyBill, roofType, message,
    source: "SITE_AUDIT", // or "CONTACT" / "NEWSLETTER" / "OTHER"
  }),
});
```

See `examples/SiteAuditForm.example.tsx` for a full working pattern —
copy the `handleSubmit` logic into your real form component and keep your
existing styling/animations.

Only `name` and `phone` are required; everything else is optional.

## 7. Deploy

Push to Vercel as usual. Add all the `.env` variables in your Vercel
project's Environment Variables settings (Production + Preview).
`app/api/enquiry`, `app/api/admin/*` all run as serverless functions
automatically — no extra config needed.

## Using it day-to-day

- New enquiry comes in → saved to DB → you get a WhatsApp message → the lead
  appears in `/admin` with status **New**.
- Open the lead, tap **WhatsApp** or **Email** to reach out directly.
- Move it through **Contacted → Quoted → Won/Lost** as you work it, and jot
  notes (call attempts, quote amount, follow-up date) in the notes box —
  it autosaves when you click away.
- Search/filter the dashboard by name, phone, email, or city.

## Security notes

- `/admin/*` and `/api/admin/*` are protected by `middleware.ts` — you can't
  view leads without logging in first.
- The session cookie is `httpOnly` and signed (JWT), so it can't be read or
  forged from the browser.
- `/api/enquiry` has a light per-IP rate limit (1 submission/minute) to
  blunt casual spam. For a public production site, consider adding a
  CAPTCHA (e.g. Cloudflare Turnstile) to the form too.
