# LD-TM — Logic Driven · Technology Masters

**Tagline:** Turning Ideas into Intelligence.

A responsive agency website for AI-powered web apps, custom web development, AI assistants, workflow automation, SaaS MVPs and website development.

## Files
- `index.html` — agency website and enquiry form
- `styles.css` — responsive visual system
- `script.js` — navigation and secure enquiry submission
- `admin.html`, `admin.css`, `admin.js` — private admin sign-in and enquiry dashboard
- `supabase-config.js` — public Supabase project URL and publishable key

## Enquiry system
Website enquiries are stored in the Supabase `public.inquiries` table. Row Level Security allows anonymous visitors to submit enquiries but does not allow them to read enquiry records. Only the allowlisted administrator email can read enquiries and update their status.

## Admin setup
1. In the Supabase project **LD-TM**, open **Authentication → Users**.
2. Add the administrator user `manipulator0009@gmail.com` and set a strong password privately. Do not put the password in this repository.
3. Open **Authentication → URL Configuration** and set the Site URL to `https://rishuyadav009.github.io/LD-TM-/`.
4. Sign in at `https://rishuyadav009.github.io/LD-TM-/admin.html`.

The dashboard is restricted by database Row Level Security to the allowlisted email. Keep email verification enabled. Never expose a Supabase secret/service-role key in frontend files.

## Run locally
Open `index.html` in a browser. Supabase requires internet access.

## Brand
- Deep navy: `#0B1F44`
- Tech blue: `#3B82F6`
- Silver gray: `#E5E7EB`
- White: `#FFFFFF`
- Typography: Manrope + DM Sans
