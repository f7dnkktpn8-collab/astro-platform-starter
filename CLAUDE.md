# artificialigknorance.com | website

Marketing site for Mike's iOS apps under the **Artificial Igknorance**
brand. Mike's role here is **website manager**: engagement, SEO, copy.
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
| Escalator Field Command | 6756789866 | us | blue/cyan | **SEO priority, first in homepage list** |
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
  `@graph`, one per app, each with its own `screenshot` array.
- **Subscription pricing + free-trial copy lives in `src/data/pricing.ts`**:
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
- **Privacy claims must match what the apps really do** (checked 2026-10-12
  against the apps' relay servers). HealthTrail Medical and SnapLedger send a
  photo or file you choose to scan to a Cloudflare Worker, which passes it to
  OpenAI (the Worker stores nothing). The Clock-In Everyday coach sends context
  to Anthropic. HealthTrail also sends a hashed device ID, app ID and trial
  start date to a database to stop repeat free trials. So never write
  "100% on-device", "never leaves your phone" or "nothing leaves the device"
  for those apps. Say records are stored on the device, and name the scan.
  Before changing any privacy claim, read the app's relay code
  (`~/Dev/ArtificialIgknorance/<app>/ai-worker` or `cloudflare-worker`). Also,
  OpenAI's own words: API data is not used for training, and may be kept up to
  30 days for abuse checks. Recheck https://developers.openai.com/api/docs/guides/your-data
  now and then.
- **Android.** Escalator Field Command is the only app with a Google Play
  listing (`com.vibecode.escalatorfieldcommand`). Everywhere its App Store
  badge appears (app page, Elevator Code Answers page, homepage featured band,
  About page) the Google Play badge (`public/images/google-play-badge.png`)
  sits beside it. Its page says iPhone, iPad and Android, and its JSON-LD
  lists both platforms. Every other app is iOS-only, so their "iOS native"
  tags stay true. Don't claim a free trial on Android until the ledger agrees.
  If Mike confirms another app on Google Play, add its badge the same way.
- **Every screen size and text size must work** (Mike, 2026-10-05: a link
  spilled out of its card with big text on an iPhone). Rules: font sizes in
  `rem`, never `px`; grids use `minmax(0, 1fr)`; flex and grid children that
  hold text get `min-width: 0`; rows that can run out of room use
  `flex-wrap`; no fixed heights on anything holding text (the header uses
  `min-height`); long words and addresses wrap (`overflow-wrap`). The app page
  hero rows wrap the icon above the title when there is no room beside it.
  Before shipping layout work, check phone widths (320, 360, 390), a tablet
  (768) and a laptop with the text scaled to 1.5x and 2x. Build, serve `dist`,
  and run a check that looks for anything sticking out of its card or off the
  page. Don't test through the dev server, it falls over under rapid loads.
- **No star-rating widgets** while apps have 0 ratings (would hurt
  conversions).
- **SEO is Escalator-led.** Don't dilute the focus by adding parallel
  category landing pages unless explicitly approved. Escalator is the
  featured band at the top of the homepage app list.
  `elevator-code-answers.astro` is the one standing exception: Mike
  explicitly approved it (it came out of an ad-ops session) as a
  free/organic counterpart to a paid Google Ads test on the same
  keywords. Its FAQ content was supplied directly by Mike (real code
  citations like buggy switch, safety zone clearance, comb impact
  force). Don't invent or edit those answers without him.

## App Store scraping (works, keep this recipe)

Scrape `apps.apple.com/<country>/app/<slug>/id<id>` for embedded
`*.mzstatic.com/image/thumb/PurpleSource{211,221}/...` URLs. Filename
patterns vary by app:

- Older apps: `Apple_iPhone_Xs_Screenshot_N.png`
- Most apps: `Apple_iPhone_16_Pro_Max_Screenshot_N.png`
- Lithium Watcher style: `0N_iphone.png`

Use a regex that covers all three. Append `/1290x2796bb.png` to the
base URL to fetch at full resolution. The iTunes Search API's
`screenshotUrls` array is empty for these apps, so DON'T use that.

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
- **Never push without explicit "ship it" from Mike**, EXCEPT the
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
  runs it, updates the matching page, refreshes the snapshot, and,
  per Mike's standing authorization (2026-08-31-ish), **pushes
  straight to `main` for plain, literal, low-risk syncs** (a feature
  line changed, a trial length changed). It only holds back for review
  on a separate branch when a change looks ambiguous or structural
  (new pricing tier, renamed app, anything beyond feature/trial copy).
  Trial-length changes route through `src/data/pricing.ts`, never
  hardcoded into a page. If you see a commit titled "Sync website to
  App Store description changes" in `git log` that you don't recognize
  authoring, that's this job, not a mistake.

## Current Session State

Last updated: 2026-10-12: Screen-size fixes, Google Play links, the privacy
wording fixes, the Clock-In picture fix and a Copper Watcher line are all live
(`1bf736f`). The Brazil (LGPD) privacy section is drafted and held for Mike's
read.

**Current focus:** None in flight. Waiting on Mike's answers below.

**Last shipped:** the website is static, so "shipped" = pushed to `main` and
Netlify auto-deploys. `origin/main` is `1bf736f`, verified live 2026-10-12
(pages 200, no em dashes, new privacy text and date serving, SnapLedger and
HealthTrail "on-device" claims gone, Copper export line and SnapLedger price
card live, new workout picture serving). Use `https://artificialigknorance.com`
with `curl -L` when checking live, because `www.` redirects.

**Uncommitted work queued for next ship:**
- Branch `healthtrail-privacy` (one commit on top of main, NOT pushed): adds
  "If you are in Brazil (LGPD)" under "9. Your Rights" in `privacy.astro`,
  requested by the HealthTrail session because the app now offers Brazil.
  Legal text, so Mike must read it first. To ship: `git merge --ff-only
  healthtrail-privacy` on `main` (rebase it first if main moved), push, delete
  the branch, then tell the HealthTrail session the live URL
  (`https://artificialigknorance.com/privacy/`).

- Branch `pricing-fix` (one commit on top of main, NOT pushed, in worktree
  `../artificialigknorance-website-pricing`): `src/data/pricing.ts` had the
  wrong plan prices for the four metals apps ($2.99/$12.99 for Gold and Silver,
  $4.99 a year for Copper and Lithium). Now all four are $1.99 a month and $9.99
  a year, matching the public App Store pages and the apps' own notes. Adds
  Gold Watcher's one-time Lifetime plan ($24.99) to its FAQ through a new
  `lifetime` field and `lifetimeSentence()`. Copper, Silver and Lithium get no
  Lifetime line yet: Copper's live build does not show it in the app, and
  Silver's and Lithium's Lifetime purchases are not approved by Apple yet (per
  the metals notes, 2026-10-04). Add `lifetime` to each when it really can be
  bought. Trial wording was left as is (Copper's App Store page says "either
  subscription" has a 7-day trial, the site says yearly only; unverified).

**Waiting on Mike / open decisions:**
- **Say ship it** for the pricing fix (`pricing-fix`) and the Brazil (LGPD)
  text (`healthtrail-privacy`, needed before the next HealthTrail release; Mike
  was asked to read it). Merge each with `git merge --ff-only`, rebase the
  second after the first. One call is his: the privacy contact (encarregado) is
  info@artificialigknorance.com, with no personal name per his rule.
- **HealthTrail now uses this site's policy as its only privacy policy**
  (Mike's decision 2026-10-12, relayed by the HealthTrail session). The app's
  links are changed; the App Store listing link switches at the next HealthTrail
  release. So the Brazil (LGPD) text must be live before that release ships.
  SnapLedger's App Store text still links to a TermsFeed policy.
- **App Store "App Privacy" answers** for HealthTrail and SnapLedger should
  list photos sent for scanning and (HealthTrail) the device code. Not checked,
  outside the website.
- **SnapLedger's privacy links** (in the app's paywall and in its App Store
  text and Privacy Policy URL field) still point at the old TermsFeed policy.
  Mike said fix it on 2026-10-12. That belongs to the SnapLedger project, so a
  task for a SnapLedger session was created. Nothing to do here unless the
  website policy needs another change.

(The eleven old held-back `appstore-sync/*` branches were deleted on
2026-10-12 with Mike's OK, after checking nothing in them was missing from
`main`. The Monday job will make new ones if it is unsure about a change.)

**Parked for later:**
- Real Escalator Field Command walkthrough video and a Portuguese privacy
  policy: Mike said skip both (2026-10-12). Ask again only if he raises them.
- **App Store affiliate enrollment**: not enrolled; small per-install
  revenue with no effort once Mike signs up. Parked, no urgency.

**Known issues / TODO:**
- The "Smart App Banner default" is Escalator Field Command. If a different
  app becomes priority, change the default in `Layout.astro`.
- Inner pages were re-skinned (colors and cards), not re-laid-out.
- App Store developer-page links contain Mike's name in the web address
  (`.../developer/mike-dangerfield/...`). Visible text is clean; the link
  addresses cannot be changed.
- The other eight apps have no Android version on the site. If any is on
  Google Play, add its badge (see Conventions).
- The Clock-In Workout picture was edited in one line ("Hi Mike" became "Hi
  there!"). The rest of the coach note in the pictures still has the app's own
  em dashes.
- Local-only leftovers in `mockups/` (git-ignored). Safe to delete.

**Recent key decisions:**
1. **Daylight redesign** shipped site-wide (Mike picked option A).
2. **No author name and no "one person" framing** on the public site.
3. **No em dashes anywhere, ever**, enforced by a build check.
4. **Wherever there is an App Store link there should be a Google Play link**,
   but only for apps really on Google Play (Escalator Field Command only).
5. **Privacy wording follows the real data flows** (see Conventions), including
   HealthTrail and SnapLedger scanning through OpenAI.

## Session-end protocol

Lives in `~/CLAUDE.md` (cross-project). When Mike says "run the
session-end protocol", update this file's `Current Session State`
section, replace stale items in the stable sections only if they've
genuinely changed, and generate a continuation prompt.
