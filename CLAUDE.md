# artificialigknorance.com — website

Marketing site for Mike's iOS apps under the **Artificial Igknorance**
brand. Mike's role here is **website manager** — engagement, SEO, copy.
Live at https://artificialigknorance.com.

## Stack

- **Astro** + Tailwind (via `src/styles/globals.css`), Inter Variable font
- Deployed to **Netlify** on push to `main`
  (repo: `github.com/f7dnkktpn8-collab/astro-platform-starter`)
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
| Life in Focus | 6759227437 | us | purple | **hidden** (HTML-commented in index.astro) |

Hero copy: "9 apps on the App Store" (counts Life in Focus even though
hidden). Update this AND the "Nine apps" / "nine apps" strings on
`/about/` whenever the catalog changes.

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

Last updated: 2026-05-14 — Refreshed metals apps content for v2.5.9 /
Lithium v1.2.8 features, then swapped Gold/Silver/Copper icons to the
new chart-style art that already shipped for Lithium.

**Current focus:** website is fully up to date with the live App Store
catalog. No active work.

**Last shipped:**
- `af6a1c8` — Gold/Silver/Copper icons updated to new chart style
- `5ad8898` — Metals apps content refresh (added Prediction Markets,
  Smarter Sentiment, realized P&L, Dr Copper signal, karat/purity-aware
  portfolios, 3 lithium price sources, KARS ETF; removed Price Alerts
  and Lithium What-If; added Premium pricing)
- `f88045a` — Lithium Watcher added (eighth app)

**Uncommitted work queued for next ship:** none — working tree is
clean and `main` is in sync with origin.

**Known issues / TODO:**
- App Store CDN still serves older screenshot UUIDs for Gold, Silver,
  Copper, Lithium (Apple hasn't refreshed them yet despite the new app
  versions). When Mike re-uploads marketing screenshots in App Store
  Connect, run the scraper again to refresh `public/images/screenshots/`.
- **Analytics still not installed.** Cloudflare Web Analytics is the
  blessed path — needs Mike to add the site in his Cloudflare dashboard
  and hand over the beacon snippet.
- App Store affiliate links — Mike has not enrolled in Apple's
  affiliate program yet. Would add a small per-install revenue stream
  with no effort once enrolled.
- The "Smart App Banner default" is Escalator Field Command. If a
  different app becomes priority, change the default in `Layout.astro`.

**Recent key decisions:**
1. **Escalator Field Command is first** in the homepage apps list
   (commit 34e61f0). Reinforces the Escalator-led SEO focus and matches
   the auto-expanded card pattern on mobile.
2. **Mobile card icons stay at `w-16`** even when titles need to shrink
   to fit on one line. Achieved with `text-sm sm:text-xl + truncate`
   plus tighter section padding (`p-2 sm:p-6`) rather than shrinking
   the icons.
3. **Price alerts removed** from Gold/Silver/Copper/Lithium content
   (commit 5ad8898) — feature dropped from the apps themselves in
   v2.5.9 / v1.2.8.
4. **Lithium What-If calculator removed** from the website (same
   commit) — feature no longer exists in v1.2.8 of the app.

## Session-end protocol

Lives in `~/CLAUDE.md` (cross-project). When Mike says "run the
session-end protocol", update this file's `Current Session State`
section, replace stale items in the stable sections only if they've
genuinely changed, and generate a continuation prompt.
