import axe from 'axe-core';

/**
 * Barrierefreiheitsprüfung mit axe-core (DS7, #14).
 * «serious» und «critical» lassen den Test (und damit `npm run check` und die CI) scheitern,
 * «moderate» und «minor» erscheinen nur als Warnung im Protokoll.
 * Kontrast rechnet jsdom nicht; den prüft die eigene Kontrastprüfung (tests/contrast.test.ts).
 */
export const BLOCKING_IMPACTS = ['serious', 'critical'] as const;

export type A11yResult = { blocking: axe.Result[]; warnings: axe.Result[] };

export async function checkA11y(context: Element = document.body): Promise<A11yResult> {
    const results = await axe.run(context, {
        rules: { 'color-contrast': { enabled: false } },
        resultTypes: ['violations'],
        // Iframes (z. B. Prüfseite Schriftgewichte) lädt jsdom nicht; sie werden im Browser geprüft.
        iframes: false,
    });
    const blocking = results.violations.filter((v) => (BLOCKING_IMPACTS as readonly string[]).includes(v.impact ?? ''));
    const warnings = results.violations.filter((v) => !blocking.includes(v));
    return { blocking, warnings };
}

function describe(v: axe.Result): string {
    const targets = v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ');
    return `[${v.impact}] ${v.id}: ${v.help} (${targets})`;
}

/** Scheitert bei «serious»/«critical», warnt bei «moderate»/«minor». */
export async function expectAccessible(context: Element = document.body, label = 'Prüfung'): Promise<void> {
    const { blocking, warnings } = await checkA11y(context);
    for (const w of warnings) console.warn(`axe-Warnung ${label}: ${describe(w)}`);
    if (blocking.length > 0) {
        throw new Error(`axe ${label}: ${blocking.length} Verstoss/Verstösse «serious»/«critical»:\n` + blocking.map(describe).join('\n'));
    }
}
