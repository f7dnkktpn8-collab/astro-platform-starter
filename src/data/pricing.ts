// Source of truth for subscription pricing and free-trial copy across every
// app page on the site. When a price or trial length changes in App
// Store Connect, update the entry here and every page that imports it picks
// up the new value on the next build.
//
// One file to edit. Do not put prices inline on individual page files.
//
// Checked 2026-10-12 against the public US App Store pages and the metals apps'
// own notes: Gold, Silver, Copper and Lithium Watcher are all $1.99 a month or
// $9.99 a year in US dollars. A Lifetime plan ($24.99) is listed here only when
// people can really buy it inside the live app. Today that is Gold Watcher.
// Free trials checked in App Store Connect 2026-10-12: Gold and Silver 3 days,
// Copper and Lithium 7 days, each on both the monthly and the yearly plan.

export type TrialScope = 'monthly' | 'yearly' | 'both' | null;

export interface AppPricing {
    /** US-dollar price string for the monthly subscription, e.g. "$2.99". null = no monthly plan. */
    monthly: string | null;
    /** US-dollar price string for the yearly subscription, e.g. "$12.99". null = no yearly plan. */
    yearly: string | null;
    /** Length of the free trial in days, or null if no trial is offered. */
    trialDays: number | null;
    /** Which plan(s) the trial applies to. Use null + trialText for apps with a single
     * subscription tier that doesn't split into monthly/yearly plans. */
    trialScope: TrialScope;
    /** Optional full override sentence for the trial, used when the app's plan structure
     * doesn't fit the auto-generated monthly/yearly phrasing (e.g. a single "Pro" tier).
     * When set, this is returned as-is instead of the generated sentence. */
    trialText?: string;
    /** US-dollar price string for a one-time Lifetime plan. Leave unset until the plan can really be bought in the live app. */
    lifetime?: string;
}

export const PRICING: Record<string, AppPricing> = {
    'gold-watcher':    { monthly: '$1.99', yearly: '$9.99', lifetime: '$24.99', trialDays: 3, trialScope: 'both' },
    'silver-watcher':  { monthly: '$1.99', yearly: '$9.99', trialDays: 3, trialScope: 'both' },
    'copper-watcher':  { monthly: '$1.99', yearly: '$9.99', trialDays: 7, trialScope: 'both' },
    'lithium-watcher': { monthly: '$1.99', yearly: '$9.99', trialDays: 7, trialScope: 'both' },
    'ridgepacker':     { monthly: null,    yearly: null,     trialDays: 3, trialScope: 'both' },
    'escalator-field-command': {
        monthly: null,
        yearly: null,
        trialDays: 30,
        trialScope: null,
        trialText: 'Pro includes a one-month free trial.'
    },
    'clock-in-everyday': { monthly: '$1.99', yearly: '$9.99', trialDays: 7, trialScope: 'both' }
};

/** Human-readable trial sentence for use in FAQ copy. Returns "" when no trial. */
export function trialSentence(slug: string): string {
    const p = PRICING[slug];
    if (!p || !p.trialDays) return '';
    if (p.trialText) return p.trialText;
    if (!p.trialScope) return '';
    if (p.trialScope === 'both')    return `Both plans come with a ${p.trialDays}-day free trial.`;
    if (p.trialScope === 'yearly')  return `The yearly plan comes with a ${p.trialDays}-day free trial.`;
    if (p.trialScope === 'monthly') return `The monthly plan comes with a ${p.trialDays}-day free trial.`;
    return '';
}

/** Sentence about the one-time Lifetime plan for FAQ copy. Returns "" when the app has none yet. */
export function lifetimeSentence(slug: string): string {
    const p = PRICING[slug];
    if (!p || !p.lifetime) return '';
    return `There is also a one-time Lifetime plan at ${p.lifetime}, paid once with no renewal.`;
}
