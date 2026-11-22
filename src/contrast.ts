import { CONTRAST_PAIRS, TOKENS } from './generated/tokens';

/** Relative Leuchtdichte nach WCAG 2.1 für eine Farbe #rrggbb. */
export function luminance(hex: string): number {
    const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
    if (!m) throw new Error(`Keine Farbe #rrggbb: ${hex}`);
    const [r, g, b] = m.slice(1).map((h) => {
        const c = parseInt(h, 16) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Kontrastverhältnis zweier Farben, z. B. 4.5 für 4,5 : 1. */
export function contrastRatio(a: string, b: string): number {
    const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
}

export type Mode = 'light' | 'dark';
export type ThemeColors = Record<string, string>;
export type ContrastFinding = { mode: Mode; foreground: string; background: string; ratio: number; min: number };

/** Standardwerte «EduKSX» je Modus. */
export function defaultColors(mode: Mode): ThemeColors {
    return Object.fromEntries(TOKENS.map((t) => [t.name, t[mode]]));
}

/** Namen aller bekannten Farb-Tokens; Themes dürfen nur diese setzen (KONZEPT-DESIGN 5). */
export const KNOWN_TOKENS: readonly string[] = TOKENS.map((t) => t.name);

/**
 * Prüft ein Theme (nur Abweichungen) gegen die Paare der Kontrastprüfung, hell und dunkel.
 * Leere Liste = bestanden. Unbekannte Tokens oder Werte ausser #rrggbb sind Fehler.
 */
export function checkTheme(theme: { light?: ThemeColors; dark?: ThemeColors } = {}): ContrastFinding[] {
    const findings: ContrastFinding[] = [];
    for (const mode of ['light', 'dark'] as const) {
        const own = theme[mode] ?? {};
        for (const [name, value] of Object.entries(own)) {
            if (!KNOWN_TOKENS.includes(name)) throw new Error(`Unbekanntes Token: ${name}`);
            if (!/^#[0-9a-f]{6}$/i.test(value)) throw new Error(`Token ${name}: nur #rrggbb erlaubt`);
        }
        const colors = { ...defaultColors(mode), ...own };
        for (const p of CONTRAST_PAIRS) {
            const ratio = contrastRatio(colors[p.foreground], colors[p.background]);
            if (ratio < p.min) findings.push({ mode, foreground: p.foreground, background: p.background, ratio, min: p.min });
        }
    }
    return findings;
}
