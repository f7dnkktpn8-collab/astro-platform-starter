# artificialigknorance.com — website

Marketing site for Mike's iOS apps under the **Artificial Igknorance**
brand. Mike's role here is **website manager** — engagement, SEO, copy.
Live at https://artificialigknorance.com.

## Stack

- **Astro** + Tailwind (via `src/styles/globals.css`), Inter Variable font
- Deployed to **Netlify** on push to `main`
  (repo: `github.com/f7dnkktpn8-collab/astro-platform-starter`)
- **Domain `artificialigknorance.com`:** registered at **GoDaddy**, but
  DNS is delegated to **Netlify** (NS1 nameservers `DNS{1-4}.P06.NSONE.NET`).
  So the domain bill is at GoDaddy; the DNS records that point the site
  live in the Netlify dashboard.
- Single layout: `src/layouts/Layout.astro`. Props: `title`,
  `description`, `ogImage`, `twitterCard`, `smartAppId`, `datePublished`,
  `mainEntityId`. Emits OG/Twitter cards, canonical URL, iOS Smart App
  Banner, JSON-LD `@graph` (Person + Organization + WebSite + WebPage +
  every MobileApplication + VideoObject for the Escalator demo).
- Pages: `index.astro`, `escalator-field-command.astro`,
  `healthtrail-medical.astro`, `snapledger.astro`, `gold-watcher.astro`,
  `silver-watcher.astro`, `copper-watcher.astro`, `lithium-watcher.astro`,
  `ridgepacker.astro`, `about.astro`, `privacy.astro`, `terms.astro`. The
  Astro starter demo pages (`blobs/`, `edge/`, `image-cdn/`,
  `revalidation/`, `api/`) are inherited and `Disallow`-ed in robots.txt.
- Site background: `#355c7d` (dark blue, defined as `--color-complementary`).
  Always use the **WHITE** Apple App Store badge at
  `public/images/appstore-badge.svg` — never the black one.

## App IDs

| App | Store ID | Country | Color theme | Status |
| --- | --- | --- | --- | --- |
| Escalator Field Command | 6756789866 | us | blue/cyan | **SEO priority — first in homepage list** |
| HealthTrail Medical | 6758072258 | us | emerald/teal | shipping |
| SnapLedger ø | 6759497982 | **ca** | green | shipping |
| Copper Watcher (Cu) | 6757655923 | us | amber | shipping |
| Gold Watcher (Au) | 6758283387 | us | yellow | shipping |
| Silver Watcher (Ag) | 6760270695 | us | slate | shipping |
| Lithium Watcher (Li) | 6761344726 | us | teal | shipping |
| RidgePacker | 6766699306 | us | sky | shipping |

Hero copy: "8 apps on the App Store". Update this AND the "Eight apps"
/ "eight apps" strings on `/about/` whenever the catalog changes.

## Conventions (don't drift from these)

- **App Store buttons use Apple's official badge SVG**, never styled
  gradient buttons.
- **Mobile homepage app cards** use `<details><summary>` accordion with:
  - icon `w-16 h-16` (Mike wants this size kept)
  - title `text-sm sm:text-xl font-bold truncate`
  - flex parent `flex-1 min-w-0 text-left` (needed for truncate)
  - gap `gap-2 sm:gap-4`
  - First card (Escalator) auto-expanded with `<details ... open>` so
    visitors learn the others are tappable.
- **Mobile-first**: site has a hamburger menu in header (Header.astro,
  `<details>` pattern, no JS). Footer has 3-column cross-link panel
  (stacks vertically on mobile). Every page reachable from every page.
- **All FAQ accordions use the unified pattern**: `<details
  class="bg-white/5 rounded-xl p-5 group hover:bg-white/10
  transition-all">` with `<summary class="flex items-center
  justify-between cursor-pointer list-none font-semibold text-lg">` and
  a gray chevron (`text-gray-400`). Question span first, chevron at
  right. Never blue chevrons.
- **JSON-LD MobileApplication entries** live in `Layout.astro`
  `@graph` — one per app, each with its own `screenshot` array.
- **Subscription pricing + free-trial copy lives in `src/data/pricing.ts`** —
  one source of truth. Each app page imports `PRICING` and `trialSentence()`
  and interpolates the values into its FAQ. To change a price or trial
  length, edit ONLY this file. Do not put price strings inline in any
  `*.astro` page. Build at the end to verify the rendered HTML.
- **VideoObject `uploadDate` must include time AND timezone.** Google
  Search Console flagged a date-only value (`"2026-04-29"`) as a
  non-critical structured-data issue. Always use full ISO 8601 with
  offset: `"2026-04-29T00:00:00+00:00"` (or `...Z` for UTC). Applies
  to every `VideoObject` added to any page — currently the Escalator
  demo in `index.astro`, plus any future demo videos for HealthTrail,
  SnapLedger, the metals apps, etc.
- **No star-rating widgets** while apps have 0 ratings (would hurt
  conversions).
- **SEO is Escalator-led.** Don't dilute the focus by adding parallel
  category landing pages unless explicitly approved. Escalator is the
  first card on the homepage and auto-expands on mobile.

## App Store scraping (works — keep this recipe)

Scrape `apps.apple.com/<country>/app/<slug>/id<id>` for embedded
`*.mzstatic.com/image/thumb/PurpleSource{211,221}/...` URLs. Filename
patterns vary by app:

- Older apps: `Apple_iPhone_Xs_Screenshot_N.png`
- Most apps: `Apple_iPhone_16_Pro_Max_Screenshot_N.png`
- Lithium Watcher style: `0N_iphone.png`

Use a regex that covers all three. Append `/1290x2796bb.png` to the
base URL to fetch at full resolution. The iTunes Search API's
`screenshotUrls` array is empty for these apps — DON'T use that.

## Image pipeline

- Screenshots: stored as JPG + WebP variants in
  `public/images/screenshots/<app-slug>/`. Wrap `<img>` in `<picture>`
  with WebP source first, JPG fallback. Use `cwebp -q 80` to generate.
- App icons: `public/images/<app-slug>-icon.webp`. Source from App
  Store artwork or marketing assets, convert with `cwebp -q 85`.

## Build / deploy

- `npm run dev` (port 4321) or via `.claude/launch.json` for the
  preview MCP.
- `npm run build` → `dist/` (full SSR build with sitemap).
- Deploy: `git push origin main` → Netlify auto-builds.
- **Never push without explicit "ship it" from Mike.**

## Current Session State

Last updated: 2026-06-29 — Refreshed the 4 metals pages for the
v2.6.9 App Store update, then made the Escalift forum + Counterweight
newsletter links more visible across the whole site (new header
"Other Projects" dropdown, logo'd footer + cards). All shipped.

**Current focus:** repositioning the site as a company umbrella — apps
stay primary, but Escalift (forum) and Counterweight (newsletter) now
have real, branded presence sitewide instead of buried text links. No
active work in flight.

**Last shipped:** website is a static site — "shipped" = pushed to
`main`, Netlify auto-deploys. `main` is in sync with origin. Latest
commits:
- `97718dd` — Apple universal-link verification for EFC (hosts
  apple-app-site-association so the in-app Field Guide deep link works)
- `41ea288` — Renamed project links to "Escalift Forum" /
  "Counterweight Newsletter"; sub-label "Elevator & escalator community"
- `d99406c` — Metals v2.6.9 screenshot + content refresh AND
  Escalift/Counterweight visibility upgrade (header dropdown with logos,
  footer logos, About-page logo cards, EFC two-card row). New assets:
  `escalift-logo.svg`, `counterweight-logo.png/.webp`

**Uncommitted work queued for next ship:** none — working tree is clean.

**Waiting on Mike / open decisions:** none.

**Parked for later:**
- **App Store affiliate enrollment** — not enrolled; small per-install
  revenue with no effort once Mike signs up. Parked, no urgency.
- **Homepage mention of Escalift/Counterweight** — deliberately NOT added
  this session. Homepage stays app-focused; revisit if the umbrella
  push grows. (Parked 2026-06-29.)

**Known issues / TODO:**
- **Counterweight is still on `counterweight.ghost.io`.** When it moves
  to a custom domain, update the link in FOUR places: footer, header
  dropdown, About-page card, and the EFC-page card.
- Privacy + Terms pages still read "Last updated: March 15, 2026" but
  Cloudflare Web Analytics was added after that — may want a refresh.
- The "Smart App Banner default" is Escalator Field Command. If a
  different app becomes priority, change the default in `Layout.astro`.

**Recent key decisions:**
1. **Project links get logos + descriptive names** ("Escalift Forum",
   "Counterweight Newsletter") sitewide — goal was "slightly more
   noticeable, not invisible, but not a big feature yet." Avoid jargon:
   "VT" was replaced with "elevator & escalator" in plain English.
2. **Counterweight added to the EFC page** (wasn't there before) — that
   page's audience is exactly the elevator/escalator trade.
3. **Cloudflare Web Analytics is live** (token in `Layout.astro` beacon)
   — the old "analytics not installed" gap is closed.
4. **Centralized pricing** lives in `src/data/pricing.ts` — change a
   price or trial length there only, never inline in a page.

## Session-end protocol

Lives in `~/CLAUDE.md` (cross-project). When Mike says "run the
session-end protocol", update this file's `Current Session State`
section, replace stale items in the stable sections only if they've
genuinely changed, and generate a continuation prompt.
