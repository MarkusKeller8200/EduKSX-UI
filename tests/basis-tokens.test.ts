import tokensJson from '../tokens/tokens.json';
import { EDUKSX_CSS as eduksxCss, THEME_CSS as themeCss, TOKENS_CSS as tokensCss } from '../src/generated/css';

// Basis-Tokens (#25, #26): Werte in tokens.json und Ausgabe im Build (npm test erzeugt dist/*.css vorher).
const tokens: any = tokensJson;
const files: Record<string, string> = { 'tokens.css': tokensCss, 'theme.css': themeCss, 'eduksx.css': eduksxCss };
const css = (file: string) => files[file];
const rem = (v: string) => {
    expect(v).toMatch(/^\d+(\.\d+)?rem$/);
    return parseFloat(v);
};

describe('Typografie-Tokens (#25)', () => {
    it('Schriftgrössen in rem, aufsteigend, mind. 12 px', () => {
        const sizes = Object.values(tokens.font.size).map((t: any) => rem(t.$value));
        expect(Math.min(...sizes)).toBeGreaterThanOrEqual(0.75);
        expect(sizes).toEqual([...sizes].sort((a, b) => a - b));
    });

    it('Grundgrössen: Bedienung 14 px, Fliesstext 16 px mit Zeilenhöhe mind. 1,5', () => {
        const role = (name: string) => tokens.typography[name].$value;
        expect(role('ui').fontSize).toBe('{font.size.sm}');
        expect(tokens.font.size.sm.$value).toBe('0.875rem');
        expect(role('body').fontSize).toBe('{font.size.base}');
        expect(tokens.font.size.base.$value).toBe('1rem');
        expect(tokens.font.leading.relaxed.$value).toBeGreaterThanOrEqual(1.5);
    });

    it('nur die Gewichte 400, 500, 600, 700 (M7)', () => {
        const weights = Object.values(tokens.font.weight).map((t: any) => t.$value);
        expect(weights).toEqual([400, 500, 600, 700]);
    });

    it('Titel H1–H4 wie Intranet: 24→30, 20, 18, 16 px', () => {
        const out = css('tokens.css');
        expect(out).toContain('--typo-h1-size: 1.5rem;');
        expect(out).toMatch(/@media \(min-width: 48rem\) \{\s*:root \{\s*--typo-h1-size: 1.875rem;/);
        expect(out).toContain('--typo-h2-size: 1.25rem;');
        expect(out).toContain('--typo-h3-size: 1.125rem;');
        expect(out).toContain('--typo-h4-size: 1rem;');
    });

    it('Tailwind-Theme und Textrollen', () => {
        const theme = css('theme.css');
        expect(theme).toContain('--text-sm: var(--text-sm);');
        expect(theme).toContain('--font-weight-medium: var(--font-weight-medium);');
        for (const name of Object.keys(tokens.typography)) {
            expect(theme).toContain(`@utility typo-${name} {`);
        }
    });
});

describe('Weitere Basis-Tokens (#26)', () => {
    it('Abstandsraster 4 px', () => {
        expect(tokens.size.spacing.$value).toBe('0.25rem');
        expect(css('tokens.css')).toContain('--spacing: 0.25rem;');
    });

    it('Radien-Stufen sm < md < lg < xl, lg = --radius', () => {
        const r = ['sm', 'md', 'lg', 'xl'].map((k) => rem(tokens.radius[k].$value));
        expect(r).toEqual([...r].sort((a, b) => a - b));
        expect(tokens.radius.lg.$value).toBe(tokens.size.radius.$value);
        expect(css('theme.css')).toContain('--radius-md: var(--radius-md);');
    });

    it('Schatten hell und dunkel, dunkel kräftiger', () => {
        const out = css('tokens.css');
        const dark = out.slice(out.indexOf('.dark {'));
        for (const k of Object.keys(tokens.shadow)) {
            expect(out).toMatch(new RegExp(`:root \\{[^}]*--shadow-${k}: [^;]+;`));
            expect(dark).toMatch(new RegExp(`--shadow-${k}: [^;]+;`));
        }
        expect(dark).toContain('rgb(0 0 0 / 0.5)');
    });

    it('Breakpoints in rem, aufsteigend, fest im Theme; Variante desk', () => {
        const bp = Object.values(tokens.breakpoint).map((t: any) => rem(t.$value));
        expect(bp).toEqual([...bp].sort((a, b) => a - b));
        const theme = css('theme.css');
        expect(theme).toContain('--breakpoint-md: 48rem;');
        expect(theme).toContain('@custom-variant desk');
        expect(theme).toContain('(min-width: 40rem) and (min-height: 501px)');
    });

    it('Seitenbreiten der Ansichten (Glossary DEC-023)', () => {
        expect(tokens.container['page-mobile'].$value).toBe('24rem');
        expect(tokens.container['page-optimized'].$value).toBe('72rem');
        expect(tokens.container['page-wide'].$value).toBe('96rem');
    });

    it('Animationen respektieren prefers-reduced-motion', () => {
        const out = css('tokens.css');
        const reduced = out.slice(out.indexOf('@media (prefers-reduced-motion: reduce)'));
        for (const k of Object.keys(tokens.duration)) {
            expect(out).toMatch(new RegExp(`--duration-${k}: \\d+ms;`));
            expect(reduced).toContain(`--duration-${k}: 0ms;`);
        }
        expect(css('theme.css')).toContain('--default-transition-duration: var(--duration-fast);');
    });

    it('Plugins erhalten die Basis-Werte als --eduksx-*', () => {
        const out = css('eduksx.css');
        expect(out).toContain('--eduksx-text-sm: var(--text-sm, 0.875rem);');
        expect(out).toContain('--eduksx-radius-md: var(--radius-md, 0.5rem);');
        expect(out).toContain('--eduksx-duration-fast: var(--duration-fast, 150ms);');
    });
});
