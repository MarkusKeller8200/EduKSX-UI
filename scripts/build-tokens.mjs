// Erzeugt aus tokens/tokens.json (DTCG) die CSS-Dateien und die Liste der bekannten Tokens (KONZEPT-DESIGN 3).
// Ohne Fremdpaket, damit der Build schlank bleibt und die Zuordnung nachvollziehbar ist.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const pairs = JSON.parse(readFileSync(join(root, 'tokens/contrast-pairs.json'), 'utf8')).pairs;
const themeFile = JSON.parse(readFileSync(join(root, 'tokens/themes.json'), 'utf8')).themes;

const HEX = /^#[0-9a-f]{6}$/;
const colors = Object.entries(tokens.color).map(([name, t]) => {
    const light = t.$value;
    const dark = t.$extensions?.['ch.eduksx']?.dark;
    if (!HEX.test(light) || !HEX.test(dark ?? '')) {
        throw new Error(`Token ${name}: hell und dunkel müssen #rrggbb sein`);
    }
    return { name, light, dark, description: t.$description ?? '' };
});
// Mitgelieferte Themes (DS11): nur Abweichungen, nur bekannte Tokens, nur #rrggbb.
const known = new Set(colors.map((c) => c.name));
const themes = Object.entries(themeFile).map(([key, t]) => {
    if (!/^[a-z0-9-]+$/.test(key)) throw new Error(`Theme ${key}: Schlüssel nur a-z, 0-9, -`);
    for (const mode of ['light', 'dark']) {
        for (const [name, value] of Object.entries(t[mode] ?? {})) {
            if (!known.has(name)) throw new Error(`Theme ${key}: unbekanntes Token ${name}`);
            if (!HEX.test(value)) throw new Error(`Theme ${key}: ${name} muss #rrggbb sein`);
        }
    }
    return { key, name: t.name, description: t.description, light: t.light ?? {}, dark: t.dark ?? {} };
});
const fontStack = (font) => font.$value.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
const fontSans = fontStack(tokens.font.sans);
const fontMono = fontStack(tokens.font.mono);

// Verweise wie {font.size.sm} auflösen (DTCG-Alias).
const resolve = (v) => {
    if (typeof v !== 'string' || !/^\{[^}]+\}$/.test(v)) return v;
    const t = v.slice(1, -1).split('.').reduce((o, k) => o?.[k], tokens);
    if (!t) throw new Error(`Unbekannter Verweis ${v}`);
    return resolve(t.$value);
};
const entries = (group) => Object.entries(group ?? {});
const REM = /^-?\d+(\.\d+)?rem$/;

// Basis-Tokens (#25, #26): Grössen in rem, damit 200 % Zoom und Browser-Schriftgrösse greifen (WCAG 1.4.4).
const fontSizes = entries(tokens.font.size).map(([name, t]) => {
    if (!REM.test(t.$value)) throw new Error(`font.size.${name}: Wert muss in rem sein`);
    return { name, value: t.$value, lineHeight: t.$extensions?.['ch.eduksx']?.lineHeight };
});
const weights = entries(tokens.font.weight).map(([name, t]) => ({ name, value: t.$value }));
const leadings = entries(tokens.font.leading).map(([name, t]) => ({ name, value: t.$value }));
const trackings = entries(tokens.font.tracking).map(([name, t]) => ({ name, value: t.$value }));
const radii = entries(tokens.radius).map(([name, t]) => ({ name, value: t.$value }));
const breakpoints = entries(tokens.breakpoint).map(([name, t]) => {
    if (!REM.test(t.$value)) throw new Error(`breakpoint.${name}: Wert muss in rem sein`);
    return { name, value: t.$value };
});
const containers = entries(tokens.container).map(([name, t]) => ({ name, value: t.$value }));
const durations = entries(tokens.duration).map(([name, t]) => ({ name, value: t.$value }));
const easings = entries(tokens.easing).map(([name, t]) => ({ name, value: `cubic-bezier(${t.$value.join(', ')})` }));
const rgba = (hex) => {
    if (!/^#[0-9a-f]{8}$/.test(hex)) throw new Error(`Schattenfarbe ${hex}: #rrggbbaa erwartet`);
    const [r, g, b, a] = [1, 3, 5, 7].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return `rgb(${r} ${g} ${b} / ${Math.round((a / 255) * 100) / 100})`;
};
const shadowCss = (layers) => layers.map((l) => `${l.offsetX} ${l.offsetY} ${l.blur} ${l.spread} ${rgba(l.color)}`).join(', ');
const shadows = entries(tokens.shadow).map(([name, t]) => ({
    name,
    light: shadowCss(t.$value),
    dark: shadowCss(t.$extensions?.['ch.eduksx']?.dark ?? t.$value),
}));
const roles = entries(tokens.typography).map(([name, t]) => ({
    name,
    size: resolve(t.$value.fontSize),
    weight: resolve(t.$value.fontWeight),
    leading: resolve(t.$value.lineHeight),
    tracking: t.$value.letterSpacing ? resolve(t.$value.letterSpacing) : 'normal',
    deskSize: t.$extensions?.['ch.eduksx']?.desk ? resolve(t.$extensions['ch.eduksx'].desk.fontSize) : undefined,
}));
const spacing = tokens.size.spacing.$value;
const mdBreakpoint = tokens.breakpoint.md.$value;

const header = '/* Erzeugt aus tokens/tokens.json – nicht von Hand ändern (npm run tokens). */\n';
const decl = (mode) => colors.map((c) => `    --${c.name}: ${c[mode]};`).join('\n');
const lines = (list) => list.join('\n');

// Alle Basis-Variablen (Name, Wert hell) – auch Grundlage für --eduksx-* der Plugins.
const baseVars = [
    ['radius', tokens.size.radius.$value],
    ['spacing', spacing],
    ['font-sans', fontSans],
    ['font-mono', fontMono],
    ...fontSizes.flatMap((f) => [[`text-${f.name}`, f.value], [`text-${f.name}--line-height`, String(f.lineHeight)]]),
    ...weights.map((w) => [`font-weight-${w.name}`, String(w.value)]),
    ...leadings.map((l) => [`leading-${l.name}`, String(l.value)]),
    ...trackings.map((t) => [`tracking-${t.name}`, t.value]),
    ...roles.flatMap((r) => [
        [`typo-${r.name}-size`, r.size],
        [`typo-${r.name}-weight`, String(r.weight)],
        [`typo-${r.name}-leading`, String(r.leading)],
        [`typo-${r.name}-tracking`, r.tracking],
    ]),
    ...radii.map((r) => [`radius-${r.name}`, r.value]),
    ...shadows.map((s) => [`shadow-${s.name}`, s.light]),
    ...containers.map((c) => [`container-${c.name}`, c.value]),
    ...durations.map((d) => [`duration-${d.name}`, d.value]),
    ...easings.map((e) => [`ease-${e.name}`, e.value]),
];

const tokensCss =
    header +
    `:root {\n${decl('light')}\n${lines(baseVars.map(([n, v]) => `    --${n}: ${v};`))}\n}\n\n` +
    `.dark {\n${decl('dark')}\n${lines(shadows.map((s) => `    --shadow-${s.name}: ${s.dark};`))}\n}\n\n` +
    `/* Titel wachsen ab md (${mdBreakpoint}) auf die volle Grösse. */\n` +
    `@media (min-width: ${mdBreakpoint}) {\n    :root {\n${lines(
        roles.filter((r) => r.deskSize).map((r) => `        --typo-${r.name}-size: ${r.deskSize};`),
    )}\n    }\n}\n\n` +
    '/* Weniger Bewegung (WCAG 2.3.3): Übergänge und Animationen ohne Dauer. */\n' +
    `@media (prefers-reduced-motion: reduce) {\n    :root {\n${lines(
        durations.map((d) => `        --duration-${d.name}: 0ms;`),
    )}\n    }\n}\n` +
    '\n/* Standard «EduKSX» ausdrücklich, z. B. für einen Bereich in einer Seite mit anderem Theme. */\n' +
    `[data-theme="eduksx"] {\n${decl('light')}\n}\n\n` +
    `.dark[data-theme="eduksx"],\n.dark [data-theme="eduksx"],\n[data-theme="eduksx"] .dark {\n${decl('dark')}\n}\n` +
    themes
        .map((t) => {
            // Volles Farbset (Standard + Abweichungen), damit ein Bereich nie Farben eines äusseren Themes erbt.
            const vars = (mode) => lines(colors.map((c) => `    --${c.name}: ${t[mode][c.name] ?? c[mode]};`));
            const sel = `[data-theme="${t.key}"]`;
            return (
                `\n/* Theme «${t.name}» (DS11): data-theme="${t.key}" am Wurzelelement oder an einem Bereich. */\n` +
                `${sel} {\n${vars('light')}\n}\n\n` +
                `.dark${sel},\n.dark ${sel},\n${sel} .dark {\n${vars('dark')}\n}\n`
            );
        })
        .join('');

// Tailwind 4: Farben als Theme (bg-primary, text-muted-foreground …). Basis-Tokens als «reference»: Tailwind
// erzeugt die Klassen (text-sm, rounded-md, shadow-sm, max-w-page-optimized, ease-out …), die Werte kommen aus
// tokens.css. Breakpoints müssen fest stehen, weil Media Queries keine Variablen kennen.
const themeCss =
    header +
    '@theme inline {\n' +
    colors.map((c) => `    --color-${c.name}: var(--${c.name});`).join('\n') +
    '\n}\n\n' +
    '@theme inline reference {\n' +
    lines(
        [
            '--font-sans',
            '--font-mono',
            '--spacing',
            ...fontSizes.flatMap((f) => [`--text-${f.name}`, `--text-${f.name}--line-height`]),
            ...weights.map((w) => `--font-weight-${w.name}`),
            ...leadings.map((l) => `--leading-${l.name}`),
            ...trackings.map((t) => `--tracking-${t.name}`),
            ...radii.map((r) => `--radius-${r.name}`),
            ...shadows.map((s) => `--shadow-${s.name}`),
            ...containers.map((c) => `--container-${c.name}`),
            ...easings.map((e) => `--ease-${e.name}`),
        ].map((n) => `    ${n}: var(${n});`),
    ) +
    '\n    --default-transition-duration: var(--duration-fast);\n    --default-transition-timing-function: var(--ease-standard);\n}\n\n' +
    '@theme {\n' +
    lines(breakpoints.map((b) => `    --breakpoint-${b.name}: ${b.value};`)) +
    '\n}\n\n' +
    `/* desk: nicht Handy – ab ${tokens.breakpoint.sm.$value} Breite, ausser Handy quer (grobe Bedienung und höchstens 500 px hoch).\n` +
    '   Übernommen aus EduKSX-Glossary (#253). */\n' +
    '@custom-variant desk {\n' +
    `    @media (min-width: ${tokens.breakpoint.sm.$value}) and (pointer: fine), (min-width: ${tokens.breakpoint.sm.$value}) and (min-height: 501px) {\n        @slot;\n    }\n}\n\n` +
    '/* Textrollen: typo-h1 … typo-small (Schrift, Grösse, Gewicht, Zeilenhöhe in einem). */\n' +
    roles
        .map(
            (r) =>
                `@utility typo-${r.name} {\n    font-family: var(--font-sans);\n    font-size: var(--typo-${r.name}-size);\n` +
                `    font-weight: var(--typo-${r.name}-weight);\n    line-height: var(--typo-${r.name}-leading);\n` +
                `    letter-spacing: var(--typo-${r.name}-tracking);\n}\n`,
        )
        .join('\n');

// Web-Komponenten der Plugins (Plugins P5): gleiche Werte mit Präfix --eduksx-*.
const eduksxCss =
    header +
    ':root, :host {\n' +
    colors.map((c) => `    --eduksx-${c.name}: var(--${c.name}, ${c.light});`).join('\n') +
    '\n' +
    lines(baseVars.map(([n, v]) => `    --eduksx-${n}: var(--${n}, ${v});`)) +
    '\n}\n';

const generated =
    '// Erzeugt aus tokens/tokens.json – nicht von Hand ändern (npm run tokens).\n' +
    `export const TOKENS = ${JSON.stringify(colors, null, 4)} as const;\n\n` +
    `export const CONTRAST_PAIRS = ${JSON.stringify(pairs, null, 4)} as const;\n\n` +
    `export const BUILTIN_THEMES = ${JSON.stringify(themes, null, 4)} as const;\n`;

mkdirSync(join(root, 'dist'), { recursive: true });
mkdirSync(join(root, 'src/generated'), { recursive: true });
writeFileSync(join(root, 'dist/tokens.css'), tokensCss);
writeFileSync(join(root, 'dist/theme.css'), themeCss);
writeFileSync(join(root, 'dist/eduksx.css'), eduksxCss);
writeFileSync(join(root, 'src/generated/tokens.ts'), generated);
// Nur für die Tests: erzeugte CSS als Text (wird nicht aus src/index.ts exportiert).
writeFileSync(
    join(root, 'src/generated/css.ts'),
    '// Erzeugt aus tokens/tokens.json – nicht von Hand ändern (npm run tokens).\n' +
        `export const TOKENS_CSS = ${JSON.stringify(tokensCss)};\n` +
        `export const THEME_CSS = ${JSON.stringify(themeCss)};\n` +
        `export const EDUKSX_CSS = ${JSON.stringify(eduksxCss)};\n`,
);
console.log(`Tokens: ${colors.length} Farben, ${themes.length} Themes, ${baseVars.length} Basis-Werte, ${roles.length} Textrollen → dist/tokens.css, dist/theme.css, dist/eduksx.css`);
