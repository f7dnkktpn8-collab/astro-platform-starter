import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://artificialigknorance.com',
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
                !page.includes('/revalidation/')
        })
    ],
    adapter: netlify({
        devFeatures: {
            environmentVariables: true
        }
    })
});
