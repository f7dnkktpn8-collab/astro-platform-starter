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
  `healthtrail-medical.astro`, `clock-in-everyday.astro`,
  `snapledger.astro`, `gold-watcher.astro`, `silver-watcher.astro`,
  `copper-watcher.astro`, `lithium-watcher.astro`, `ridgepacker.astro`,
  `elevator-code-answers.astro` (SEO landing page targeting A17.1/A17.2/
  A17.3/B44 search terms, funnels to Escalator Field Command), `about.astro`,
  `privacy.astro`, `terms.astro`. The Astro starter demo pages (`blobs/`,
  `edge/`, `image-cdn/`, `revalidation/`, `api/`) are inherited and
  `Disallow`-ed in robots.txt.
- Site background: `#355c7d` (dark blue, defined as `--color-complementary`).
  Always use the **WHITE** Apple App Store badge at
  `public/images/appstore-badge.svg` — never the black one.
- **Brand mark:** `public/images/hero-ai-handshake-transparent.png/.webp`
  (human + AI hand shaking, transparent background, cropped from a source
  image Mike generated and dropped on his Desktop). Used as: the homepage
  hero logo (small lockup beside the "Artificial Igknorance" wordmark, NOT
  a large illustration), the Organization JSON-LD `logo` in `Layout.astro`,
  the homepage LCP `<link rel="preload">`, and the source for
  `apple-touch-icon.png` / `favicon-32x32.png` / `favicon.ico` (a tighter,
  text-free crop of the same art, composited opaque since favicons don't
  need transparency). The About page still shows the OLDER
  `robot-mascot-transparent.png` mascot — that was deliberately left alone
  when the homepage hero was redesigned (Mike scoped the change to the
  homepage only). Don't reintroduce a large hero image on the homepage
  without checking with Mike first — he explicitly downsized it twice.

## App IDs

| App | Store ID | Country | Color theme | Status |
| --- | --- | --- | --- | --- |
| Escalator Field Command | 6756789866 | us | blue/cyan | **SEO priority — first in homepage list** |
| HealthTrail Medical | 6758072258 | us | emerald/teal | shipping |
| Clock-In Everyday | 6791800212 | us | orange/teal | shipping (Health & Fitness section) |
| SnapLedger ø | 6759497982 | **ca** | green | shipping |
| Copper Watcher (Cu) | 6757655923 | us | amber | shipping |
| Gold Watcher (Au) | 6758283387 | us | yellow | shipping |
| Silver Watcher (Ag) | 6760270695 | us | slate | shipping |
| Lithium Watcher (Li) | 6761344726 | us | teal | shipping |
| RidgePacker | 6766699306 | us | sky | shipping |

Currently 9 apps. The homepage's hero subheading states the count in
prose ("Nine privacy-first iOS apps...") — update that sentence, the
`/about/` app list intro ("Nine apps live on the App Store today,
across seven areas"), and the About-page bullet count whenever the
catalog changes. There is no standalone "N apps on the App Store" line
anymore; it was folded into the subheading during the hero redesign
(see Current Session State).

Homepage app-card grouping convention: apps are either inside a named,
bordered category section (`<h3>` + subtitle, e.g. "Escalator
Industry", "Health & Fitness", "Financial" — see `index.astro`) or
standalone/ungrouped (currently just RidgePacker). A grouped app's own
heading is `<h4>`, not `<h3>`, since the category owns the `<h3>`.
When adding a new app, decide whether it joins an existing category,
starts a new one, or stays standalone — don't leave a category with
only one remaining app if you move something out of it.

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
  `elevator-code-answers.astro` is the one standing exception — Mike
  explicitly approved it (it came out of an ad-ops session) as a
  free/organic counterpart to a paid Google Ads test on the same
  keywords. Its FAQ content was supplied directly by Mike (real code
  citations like buggy switch, safety zone clearance, comb impact
  force) — don't invent or edit those answers without him.

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
- **Never push without explicit "ship it" from Mike** — EXCEPT the
  automated weekly App Store sync below, which has its own standing
  authorization to push straight to `main`.
- **Weekly App Store description sync (automated).** `scripts/appstore/check.mjs`
  compares each app's live App Store description against a saved
  snapshot (`scripts/appstore/descriptions.json`) and reports what
  changed. A scheduled task (`weekly-appstore-website-sync`, Mondays)
  runs it, updates the matching page, refreshes the snapshot, and —
  per Mike's standing authorization (2026-08-31-ish) — **pushes
  straight to `main` for plain, literal, low-risk syncs** (a feature
  line changed, a trial length changed). It only holds back for review
  on a separate branch when a change looks ambiguous or structural
  (new pricing tier, renamed app, anything beyond feature/trial copy).
  Trial-length changes route through `src/data/pricing.ts`, never
  hardcoded into a page. If you see a commit titled "Sync website to
  App Store description changes" in `git log` that you don't recognize
  authoring, that's this job, not a mistake.

## Current Session State

Last updated: 2026-09-01 — Redesigned the homepage hero (typography-led,
small logo lockup, single CTA) and iterated it live per Mike's feedback
over several rounds; added Clock-In Everyday as the 9th app; finished
the Escalift -> Counterweight Dispatch rebrand; shipped a new SEO
landing page. All pushed to `main` and deployed.

**Current focus:** No active work in flight. The homepage hero redesign
looks settled (Mike stopped requesting changes after the last icon-size
bump), but it was an explicitly subjective "try something new, I may
revert" request — don't be surprised if a future session gets asked to
adjust it again.

**Last shipped:** website is a static site — "shipped" = pushed to
`main`, Netlify auto-deploys. `main` is in sync with origin at
`435969f` ("Size up the hero icon another 5%"). Working tree is clean
(verified via `git status`). Recent commits, newest first:
- `435969f`, `a86bf1c`, `38c0bd1`, `042a976`, `9320cc7`, `e29c856` —
  the homepage hero redesign, in order: swap in the new handshake logo
  as hero image + favicon -> make it transparent instead of a boxed
  card -> full typography-led redesign (logo lockup, one-sentence
  subhead, single CTA button, trust-badge row) -> drop the trust row
  entirely -> drop the redundant "What We've Built" heading -> icon
  sized up twice (+10%, +5%) after Mike said it read too small live.
- `8644de8` — grouped HealthTrail Medical + Clock-In Everyday under a
  new "Health & Fitness" section, matching the Financial pattern.
- `34e1e61` — added Clock-In Everyday (app id `6791800212`) as the 9th
  app: dedicated page, homepage card, pricing.ts entry, JSON-LD.
- `e0ab295`, `329e550`, `c35fb48` — Escalift -> Counterweight Dispatch
  rebrand (new domains/links), logo fix (was showing a mislabeled
  escalator-steps icon instead of the real "C" mark), then collapsed
  the Projects nav from two links to one ("Counterweight Dispatch").
- `b777b00` — new SEO page `/elevator-code-answers/` (Mike-approved
  exception to the Escalator-led SEO rule).
- `7d5ba77` — privacy policy updated to disclose Clock-In's AI-coaching
  data flow (not by this session, but relevant — see App IDs section).

**Uncommitted work queued for next ship:** none — working tree is clean.

**Waiting on Mike / open decisions:** none.

**Parked for later:**
- **App Store affiliate enrollment** — not enrolled; small per-install
  revenue with no effort once Mike signs up. Parked, no urgency.

**Known issues / TODO:**
- The "Smart App Banner default" is Escalator Field Command. If a
  different app becomes priority, change the default in `Layout.astro`.
- The About page still uses the older `robot-mascot-transparent.png`
  mascot in its own hero-ish intro — intentionally left alone when the
  homepage hero was redesigned. Revisit only if Mike asks.

**Recent key decisions:**
1. **Homepage hero fully redesigned**, inspired by clean SaaS landing
   pages (Linear/Stripe/Vercel style) at Mike's request ("try something
   new... I may revert"). Small logo lockup replaced a large floating
   image; three stacked bold statements collapsed into one sentence;
   added a real primary CTA button; the four colored trust pills and
   the "What We've Built" heading were both removed entirely after
   live feedback. The new brand mark (`hero-ai-handshake-transparent.*`)
   is also the site's favicon and Organization JSON-LD logo now.
2. **Clock-In Everyday is NOT "100% on-device"** like every other app —
   its AI coach sends readiness/goals/injury context to a Cloudflare
   Worker -> Claude backend. Corrected the site's blanket "100%
   on-device" claims (About page, Organization JSON-LD description) to
   carry an honest named exception instead of overclaiming.
3. **Escalift -> Counterweight Dispatch rebrand complete.** Two
   properties (Forum + Newsletter) now live under one umbrella domain;
   the site's "Projects" nav (footer + header) shows a single
   "Counterweight Dispatch" link, while About/EFC pages keep the
   fuller two-card Forum/Newsletter treatment (Mike's explicit call to
   keep those two separate there).
4. **Weekly App Store sync can now publish straight to `main`** for
   plain, literal changes (a feature line or trial length changed),
   only holding back for review when a change looks ambiguous or
   structural. Standing authorization from Mike, not a one-off.
5. **Centralized pricing** lives in `src/data/pricing.ts` — change a
   price or trial length there only, never inline in a page.

## Session-end protocol

Lives in `~/CLAUDE.md` (cross-project). When Mike says "run the
session-end protocol", update this file's `Current Session State`
section, replace stale items in the stable sections only if they've
genuinely changed, and generate a continuation prompt.
