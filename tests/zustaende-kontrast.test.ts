import { contrastRatio, defaultColors, type Mode } from '../src/contrast';
import { BUTTON_VARIANTS } from '../src/components/button';
import alertSrc from '../src/components/alert.tsx?raw';
import buttonSrc from '../src/components/button.tsx?raw';
import dialogSrc from '../src/components/dialog.tsx?raw';
import fieldSrc from '../src/components/field.tsx?raw';
import tableSrc from '../src/components/table.tsx?raw';
import tooltipSrc from '../src/components/tooltip.tsx?raw';

// Zustände der Bedienelemente (KONZEPT-MARKE 5.4): Hover und Gedrückt mischen die Fläche mit color-mix(in srgb).
// Hier wird dieselbe Mischung nachgerechnet, damit die Schrift in jedem Zustand 4,5 : 1 behält.
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, p: number) =>
    '#' + hex(a).map((v, i) => Math.round(v * p + hex(b)[i] * (1 - p)).toString(16).padStart(2, '0')).join('');

const MODES: Mode[] = ['light', 'dark'];
const color = (c: Record<string, string>, v: string) => (v === 'white' ? '#ffffff' : v === 'black' ? '#000000' : c[v.replace(/^var\(--|\)$/g, '')]);

/** liest `hover:bg-[color-mix(in_srgb,var(--x)_85%,white)]` aus den Klassen des Knopfs */
function states(variant: keyof typeof BUTTON_VARIANTS) {
    return [...BUTTON_VARIANTS[variant].matchAll(/(hover|active):bg-\[color-mix\(in_srgb,(var\(--[a-z-]+\))_(\d+)%,([a-z()-]+)\)\]/g)].map((m) => ({
        state: m[1],
        base: m[2],
        percent: Number(m[3]) / 100,
        other: m[4],
    }));
}

const TEXT: Record<string, string> = { default: 'primary-foreground', secondary: 'secondary-foreground', outline: 'accent-foreground', ghost: 'accent-foreground', destructive: 'destructive-contrast' };

describe('Kontrast der Knopf-Zustände', () => {
    for (const variant of Object.keys(TEXT) as Array<keyof typeof TEXT>) {
        it(`${variant}: Schrift in Hover und Gedrückt mind. 4,5 : 1, hell und dunkel`, () => {
            const found = states(variant as keyof typeof BUTTON_VARIANTS);
            expect(found.length).toBeGreaterThan(0);
            for (const mode of MODES) {
                const c = defaultColors(mode);
                for (const s of found) {
                    const bg = mix(color(c, s.base), color(c, s.other), s.percent);
                    const ratio = contrastRatio(c[TEXT[variant]], bg);
                    expect({ variant, mode, state: s.state, ok: ratio >= 4.5, ratio: Math.round(ratio * 100) / 100 }).toMatchObject({ ok: true });
                }
            }
        });
    }

    it('Hauptknopf: Orange als Fläche mit dunkler Schrift, nie weiss', () => {
        for (const mode of MODES) expect(defaultColors(mode)['primary-foreground']).not.toBe('#ffffff');
        expect(BUTTON_VARIANTS.default).toContain('text-primary-foreground');
    });

    it('Rahmen beim Darüberfahren (muted-foreground) bleibt mind. 3 : 1', () => {
        for (const mode of MODES) {
            const c = defaultColors(mode);
            expect(contrastRatio(c['muted-foreground'], c.background)).toBeGreaterThanOrEqual(3);
        }
    });

    it('Bausteine verwenden keine festen Farben', () => {
        const sources = { alert: alertSrc, button: buttonSrc, dialog: dialogSrc, field: fieldSrc, table: tableSrc, tooltip: tooltipSrc };
        for (const [f, src] of Object.entries(sources)) {
            expect(src.length).toBeGreaterThan(100);
            expect({ f, hex: src.match(/#[0-9a-f]{3,8}\b/i)?.[0] }).toEqual({ f, hex: undefined });
            expect({ f, fixed: src.match(/\b(?:bg|text|border)-(?:white|black|red|blue|gray|slate|orange)-?\d*/)?.[0] }).toEqual({ f, fixed: undefined });
        }
    });
});
