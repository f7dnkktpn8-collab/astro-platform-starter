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
  Banner, JSON-LD `@graph` (Organization + WebSite + WebPage + every
  MobileApplication; the Escalator page adds the Field Guide VideoObject).
  There is deliberately no Person entry (no author name on the site).
- Pages: `index.astro`, `escalator-field-command.astro`,
  `healthtrail-medical.astro`, `clock-in-everyday.astro`,
  `snapledger.astro`, `gold-watcher.astro`, `silver-watcher.astro`,
  `copper-watcher.astro`, `lithium-watcher.astro`, `ridgepacker.astro`,
  `elevator-code-answers.astro` (SEO landing page targeting A17.1/A17.2/
  A17.3/B44 search terms, funnels to Escalator Field Command), `about.astro`,
  `privacy.astro`, `terms.astro`, and `family-lists/delete-account.astro`
  (account-deletion page for the Family Lists app). The Astro starter demo pages (`blobs/`,
  `edge/`, `image-cdn/`, `revalidation/`, `api/`) are inherited and
  `Disallow`-ed in robots.txt.
- **Look: "Daylight"** (light, Apple-style, redesigned Oct 2026 from the old
  dark-blue `#355c7d` glass look). Tokens live in the `@theme` block of
  `src/styles/globals.css`: page `bg-paper` `#fbfbfd`, text `text-ink`
  `#1d1d1f` / `text-body` / `text-muted`, hairlines `border-line`, accent
  teal `text-accent` `#0a7c96` (hover `accent-deep`), dark bands
  `navy` `#0b1f33`. Homepage styles are in `src/styles/home.css`, every
  rule scoped under `.home` so nothing leaks to other pages. Inner pages
  keep their original markup and Tailwind classes, re-skinned to the light
  tokens (white cards with `border-line`, per-app colors darkened to
  `-700`, gradient headings replaced by `text-ink`). `Layout.astro` takes
  `contained={false}` for full-bleed pages (only the homepage).
  Always use the **WHITE** Apple App Store badge at
  `public/images/appstore-badge.svg`, never the plain black one (the
  "white" badge is black with a white outline, so it reads fine on light
  and dark backgrounds).
- **Brand mark:** `public/images/hero-ai-handshake-transparent.png/.webp`
  (human + AI hand shaking, transparent background, cropped from a source
  image Mike generated and dropped on his Desktop). Used as: the small logo
  beside the "Artificial Igknorance" wordmark in the header and footer, the
  logo on the About page and the homepage maker card, the Organization
  JSON-LD `logo` in `Layout.astro`, and the source for
  `apple-touch-icon.png` / `favicon-32x32.png` / `favicon.ico` (a tighter,
  text-free crop of the same art, composited opaque since favicons don't
  need transparency). The old `robot-mascot-transparent.png` file is still
  in `public/images` but no longer referenced anywhere. The logo stays
  SMALL everywhere: the homepage hero is a headline plus a row of real app
  screenshots in phone frames (its LCP preload is the main phone
  screenshot). Don't make the logo a big hero image without checking with
  Mike first, he explicitly downsized it twice.

## App IDs

| App | Store ID | Country | Color theme | Status |
| --- | --- | --- | --- | --- |
| Escalator Field Command | 6756789866 | us | blue/cyan | **SEO priority — first in homepage list** |
| HealthTrail Medical | 6758072258 | us | emerald/teal | shipping |
| Clock-In Everyday | 6791800212 | us | orange/teal | shipping |
| SnapLedger ø | 6759497982 | **ca** | green | shipping |
| Copper Watcher (Cu) | 6757655923 | us | amber | shipping |
| Gold Watcher (Au) | 6758283387 | us | yellow | shipping |
| Silver Watcher (Ag) | 6760270695 | us | slate | shipping |
| Lithium Watcher (Li) | 6761344726 | us | teal | shipping |
| RidgePacker | 6766699306 | us | sky | shipping |

Currently 9 apps. The count appears on the homepage proof strip ("9 apps,
all free to download") and on the `/about/` page ("Nine apps live on the
App Store today, across seven areas" and "All nine apps are free to
download"). Update those whenever the catalog changes.

Homepage layout (Daylight): hero + proof strip, then a dark featured band
for Escalator Field Command (always first, SEO priority), then "For
everyday life" (HealthTrail Medical, Clock-In Everyday, RidgePacker,
SnapLedger as a 2x2 grid of tiles), then "The Watchers" (Gold, Silver,
Copper, Lithium as a row of four). The tiles are driven by the `everyday`
and `watchers` arrays at the top of `index.astro`: adding an app means
adding an entry there (plus its screenshots in `public/images/home/`).
Old anchors still exist: `#apps`, `#industry`, `#health`, `#financial`,
`#faq`, `#contact`, and one id per app.

## Conventions (don't drift from these)

- **No em dashes anywhere on the site, ever** (Mike, 2026-10-05: "no more
  em dashes ever", "an ugly AI giveaway"). Use a comma, colon, period,
  parentheses, or " | " in titles. This is enforced: `scripts/check-no-em-dashes.mjs`
  runs on every build (wired in through `astro.config.mjs`) and fails the
  build, so nothing with an em dash can deploy. It also catches `&mdash;`
  and `\u2014`. The weekly App Store sync must rewrite App Store wording
  that contains one. Run by hand: `node scripts/check-no-em-dashes.mjs`.
- **No author name and no "one person" framing on the public site** (Mike,
  2026-10-05: "it does more harm than good", "keep my name off the site
  too"). Don't write "one person", "solo", "indie", "independent
  developer", "no growth team/investors", or his name, in page copy,
  titles, meta descriptions or JSON-LD. Use "Artificial Igknorance" as the
  maker everywhere. The only place his name survives is inside the App
  Store developer-page link addresses (`.../developer/mike-dangerfield/...`),
  which can't be changed.
- **Demo videos must be real screen recordings of the app.** The old
  "10-second demo" was an AI-made promo clip (Sora watermark, an actress at
  an escalator) and Mike pulled it on 2026-10-05. The homepage button now
  plays the real Field Guide recording
  (`public/videos/escalator-field-guide-demo.mp4`). If Mike supplies a real
  Escalator Field Command walkthrough, swap it in there.
- **App Store buttons use Apple's official badge SVG**, never styled
  gradient buttons.
- **Homepage app tiles** show the official App Store badge (`h-10`) plus a
  "Details" link, same badge as the app pages. Screenshots on the homepage
  come from `public/images/home/` via `components/Shot.astro` (WebP first,
  JPG fallback, real width/height).
- **Header and footer** (`Header.astro`, `Footer.astro`) are shared by every
  page. The header has an "Apps" dropdown listing all nine apps (hover or
  keyboard focus) and a hamburger `<details>` panel on mobile, no JS.
  Every page stays reachable from every page.
- **All FAQ accordions use the unified pattern**: `<details
  class="p-5 transition-all bg-white border border-line rounded-2xl group
  hover:shadow-md">` with `<summary class="flex items-center
  justify-between gap-4 cursor-pointer list-none font-semibold text-lg">`,
  the question span first, and a gray circle chevron at the right:
  `class="flex-shrink-0 w-8 h-8 p-1.5 transition-transform duration-300
  rounded-full bg-[#efeff2] text-muted group-open:rotate-180"`.
  Never blue chevrons.
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
  to every `VideoObject` added to any page: currently the Field Guide
  demo on `escalator-field-command.astro`, plus any future demo videos for HealthTrail,
  SnapLedger, the metals apps, etc.
- **No star-rating widgets** while apps have 0 ratings (would hurt
  conversions).
- **SEO is Escalator-led.** Don't dilute the focus by adding parallel
  category landing pages unless explicitly approved. Escalator is the
  featured band at the top of the homepage app list.
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
- **Never leave unfinished work in this main folder.** The weekly sync
  runs `git add -A` and pushes to `main`, so anything uncommitted here
  would go live by accident. Do big or risky work in a separate git
  worktree (`git worktree add ../artificialigknorance-website-<name> -b
  <branch> main`) and merge only on "ship it".
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

Last updated: 2026-10-05: The Daylight redesign and every follow-up shipped
and verified live (name and "one person" claims removed, em dashes banned
with a build check, hero tweaks, real Field Guide demo video, new Clock-In
pictures, Field Guide shown as included). Nothing in flight.

**Current focus:** None. Waiting on Mike's answers below.

**Last shipped:** website is a static site, so "shipped" = pushed to `main`
and Netlify auto-deploys. All of today's work is on `main` and live
(verified 2026-10-05: pages return 200, no em dashes, new video and pictures
serving). `origin/main` is in sync at `7e5bf49` ("Use a real app recording,
fix the Clock-In pictures, say the Field Guide is included"). Today's commits,
oldest first: `96db1aa` redesign + name removal, `b608653` em dash clean-up and
build guard, `3e4b87d` hero pill removed + Gold Watcher phone, `7e5bf49`
real demo video + Clock-In pictures + Field Guide wording. Working tree clean,
no extra worktrees.

**Uncommitted work queued for next ship:** none.

**Waiting on Mike / open decisions:**
- **Lifetime Access plan (flagged by the 2026-09-28 weekly sync).** The
  App Store text for Gold, Silver and Lithium Watcher now says "Monthly,
  yearly, and one-time Lifetime Access plans available." The site's
  Premium FAQs and `src/data/pricing.ts` only know about monthly/yearly.
  Once he confirms the lifetime price, add a `lifetime` field to
  `pricing.ts` and mention it in those three FAQs.
- **Ten held-back sync branches.** `appstore-sync/2026-07-06` through
  `appstore-sync/2026-10-05` (local and remote) each hold 1 or 2 commits the
  weekly job set aside for review. The 2026-10-05 one is a 4-line SnapLedger
  change. Most older ones are probably superseded by later syncs on `main`.
  Needs one review pass, then merge or discard. Do not delete without his OK.
  They were written against the old page markup, so re-apply by hand.
- **"Hi Mike" in a screenshot.** The Clock-In workout screenshot
  (`public/images/screenshots/clock-in-everyday/workout.*`, shown on
  `/clock-in-everyday/`) has the AI coach greeting "Hi Mike". He wants his name
  off the site; ask whether to replace the picture. The new homepage Clock-In
  pictures deliberately avoid that screen.
- **Real Escalator Field Command walkthrough video.** The homepage demo
  button plays the Field Guide recording because no real full-app recording
  exists. If Mike supplies one, swap it in.

**Parked for later:**
- **App Store affiliate enrollment**: not enrolled; small per-install
  revenue with no effort once Mike signs up. Parked, no urgency.

**Known issues / TODO:**
- The "Smart App Banner default" is Escalator Field Command. If a
  different app becomes priority, change the default in `Layout.astro`.
- Inner pages were re-skinned (colors and cards), not re-laid-out. Each app
  page could get a Daylight-native layout later.
- App Store developer-page links contain Mike's name in the web address
  (`.../developer/mike-dangerfield/...`). Visible text is clean; the link
  addresses cannot be changed.
- Local-only leftovers in `mockups/` (git-ignored through `.git/info/exclude`):
  the three mockups, `skin_pages.py` and `emdash_sweep.py` (re-run on a fresh
  checkout if needed), and font/image helpers. Safe to delete.

**Recent key decisions:**
1. **Daylight redesign** (Mike picked option A of three mockups) shipped
   site-wide: light Apple-style look, tokens in `globals.css`, homepage styles
   in `home.css`. Inner pages keep their markup; only class lists changed.
2. **No author name and no "one person" framing on the public site**
   (Mike, 2026-10-05). See Conventions.
3. **No em dashes anywhere, ever** (Mike, 2026-10-05), including Privacy,
   Terms and his Elevator Code Answers FAQ. Enforced by a check on every
   build (`scripts/check-no-em-dashes.mjs`).
4. **Demo videos must be real screen recordings.** The old "10-second demo"
   was an AI promo clip (Sora watermark) and was removed.
5. **Clock-In Everyday is NOT "100% on-device"**: its AI coach sends
   readiness/goals/injury context to a backend. The site carries an honest
   named exception instead of overclaiming (plus optional photo scanning in
   HealthTrail Medical).

## Session-end protocol

Lives in `~/CLAUDE.md` (cross-project). When Mike says "run the
session-end protocol", update this file's `Current Session State`
section, replace stale items in the stable sections only if they've
genuinely changed, and generate a continuation prompt.
