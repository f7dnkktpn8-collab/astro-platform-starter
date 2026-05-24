import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://artificialigknorance.com';

// Per-page screenshot inventory — mirrors the MobileApplication JSON-LD in
// Layout.astro. Used to emit <image:image> entries in the sitemap so Google
// Image search can surface these screenshots.
const PAGE_IMAGES = {
    '/': [SITE + '/images/robot-mascot-transparent.png'],
    '/escalator-field-command/': [
        SITE + '/images/screenshots/escalator/dashboard-overview.jpg',
        SITE + '/images/screenshots/escalator/cat1-progress.jpg',
        SITE + '/images/screenshots/escalator/sspi-brake-tests.jpg',
        SITE + '/images/screenshots/escalator/unit-shutdown.jpg'
    ],
    '/healthtrail-medical/': [
        SITE + '/images/screenshots/healthtrail/timeline.jpg',
        SITE + '/images/screenshots/healthtrail/vaccines.jpg',
        SITE + '/images/screenshots/healthtrail/medications.jpg',
        SITE + '/images/screenshots/healthtrail/medication-details.jpg',
        SITE + '/images/screenshots/healthtrail/metrics.jpg',
        SITE + '/images/screenshots/healthtrail/insurance.jpg'
    ],
    '/snapledger/': [
        SITE + '/images/screenshots/snapledger/bills-overview.jpg',
        SITE + '/images/screenshots/snapledger/trends.jpg',
        SITE + '/images/screenshots/snapledger/bills-list.jpg',
        SITE + '/images/screenshots/snapledger/subscriptions.jpg',
        SITE + '/images/screenshots/snapledger/bill-detail.jpg'
    ],
    '/copper-watcher/': [
        SITE + '/images/screenshots/copper-watcher/spot-price.jpg',
        SITE + '/images/screenshots/copper-watcher/what-if.jpg',
        SITE + '/images/screenshots/copper-watcher/compare-returns.jpg',
        SITE + '/images/screenshots/copper-watcher/portfolio.jpg',
        SITE + '/images/screenshots/copper-watcher/scrap-calc.jpg',
        SITE + '/images/screenshots/copper-watcher/currencies.jpg'
    ],
    '/gold-watcher/': [
        SITE + '/images/screenshots/gold-watcher/spot-price.jpg',
        SITE + '/images/screenshots/gold-watcher/etf-detail.jpg',
        SITE + '/images/screenshots/gold-watcher/what-if.jpg',
        SITE + '/images/screenshots/gold-watcher/portfolio.jpg'
    ],
    '/silver-watcher/': [
        SITE + '/images/screenshots/silver-watcher/spot-price.jpg',
        SITE + '/images/screenshots/silver-watcher/what-if.jpg',
        SITE + '/images/screenshots/silver-watcher/returns.jpg',
        SITE + '/images/screenshots/silver-watcher/portfolio.jpg',
        SITE + '/images/screenshots/silver-watcher/purity-calc.jpg'
    ],
    '/lithium-watcher/': [
        SITE + '/images/screenshots/lithium-watcher/markets-overview.jpg',
        SITE + '/images/screenshots/lithium-watcher/mining-stocks.jpg',
        SITE + '/images/screenshots/lithium-watcher/ev-market.jpg'
    ],
    '/ridgepacker/': [
        SITE + '/images/screenshots/ridgepacker/trips.jpg',
        SITE + '/images/screenshots/ridgepacker/trip-detail.jpg',
        SITE + '/images/screenshots/ridgepacker/gear-detail.jpg',
        SITE + '/images/screenshots/ridgepacker/gear-catalog.jpg',
        SITE + '/images/screenshots/ridgepacker/edc.jpg'
    ]
};

const BUILD_DATE = new Date();

// https://astro.build/config
export default defineConfig({
    site: SITE,
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        react(),
        sitemap({
            // Keep only real public pages out of the Netlify starter template demos.
            filter: (page) =>
                !page.includes('/blobs/') &&
                !page.includes('/edge/') &&
                !page.includes('/image-cdn/') &&
                !page.includes('/revalidation/'),
            serialize: (item) => {
                // Extract path component from the full URL.
                const path = new URL(item.url).pathname;
                const images = PAGE_IMAGES[path];
                return {
                    ...item,
                    lastmod: BUILD_DATE.toISOString(),
                    ...(images && images.length > 0 ? { img: images.map((url) => ({ url })) } : {})
                };
            }
        })
    ],
    adapter: netlify({
        devFeatures: {
            environmentVariables: true
        }
    })
});
