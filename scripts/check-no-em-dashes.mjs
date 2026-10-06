// Mike's rule: no em dashes anywhere on the site, ever. This check runs during
// every build (it is wired into astro.config.mjs), so a push that contains one
// fails to build and the live site stays on its previous version. It also looks
// for the HTML and JavaScript spellings of the same character.
//
// Run it by hand with:  node scripts/check-no-em-dashes.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SCAN = ['src', 'public', 'netlify', 'astro.config.mjs'];
const SKIP_DIRS = new Set(['node_modules', 'dist', '.astro', '.git']);
const TEXT_EXTS = new Set(['', '.astro', '.ts', '.tsx', '.js', '.mjs', '.css', '.md', '.mdx', '.json', '.txt', '.xml', '.html', '.webmanifest', '.svg', '.toml']);

// Written as escapes so this file never contains the character itself.
const PATTERNS = [/—/, /&mdash;/i, /&#8212;/, /&#x2014;/i, /\\u2014/i];

function* walk(path) {
    const st = statSync(path);
    if (st.isDirectory()) {
        for (const name of readdirSync(path)) {
            if (SKIP_DIRS.has(name)) continue;
            yield* walk(join(path, name));
        }
    } else if (TEXT_EXTS.has(extname(path))) {
        yield path;
    }
}

export function findEmDashes() {
    const hits = [];
    for (const entry of SCAN) {
        let full;
        try {
            full = join(ROOT, entry);
            statSync(full);
        } catch {
            continue;
        }
        for (const file of walk(full)) {
            const lines = readFileSync(file, 'utf8').split('\n');
            lines.forEach((line, i) => {
                if (PATTERNS.some((p) => p.test(line))) {
                    hits.push(`${relative(ROOT, file)}:${i + 1}: ${line.trim().slice(0, 110)}`);
                }
            });
        }
    }
    return hits;
}

export function noEmDashes() {
    return {
        name: 'no-em-dashes',
        hooks: {
            'astro:build:start': () => {
                const hits = findEmDashes();
                if (hits.length) {
                    throw new Error(
                        `Em dashes found (Mike's rule: none on the site, ever). Rewrite with a comma, colon, period or parentheses:\n  ` +
                            hits.join('\n  ')
                    );
                }
            }
        }
    };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const hits = findEmDashes();
    if (hits.length) {
        console.error(`Found ${hits.length} em dash line(s):\n  ` + hits.join('\n  '));
        process.exit(1);
    }
    console.log('No em dashes found.');
}
