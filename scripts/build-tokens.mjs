// Erzeugt aus tokens/tokens.json (DTCG) die CSS-Dateien und die Liste der bekannten Tokens (KONZEPT-DESIGN 3).
// Ohne Fremdpaket, damit der Build schlank bleibt und die Zuordnung nachvollziehbar ist.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const pairs = JSON.parse(readFileSync(join(root, 'tokens/contrast-pairs.json'), 'utf8')).pairs;

const HEX = /^#[0-9a-f]{6}$/;
const colors = Object.entries(tokens.color).map(([name, t]) => {
    const light = t.$value;
    const dark = t.$extensions?.['ch.eduksx']?.dark;
    if (!HEX.test(light) || !HEX.test(dark ?? '')) {
        throw new Error(`Token ${name}: hell und dunkel müssen #rrggbb sein`);
    }
    return { name, light, dark, description: t.$description ?? '' };
});
const sizes = Object.entries(tokens.size ?? {}).map(([name, t]) => ({ name, value: t.$value }));
const fontStack = (font) => font.$value.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
const fontSans = fontStack(tokens.font.sans);
const fontMono = fontStack(tokens.font.mono);

const header = '/* Erzeugt aus tokens/tokens.json – nicht von Hand ändern (npm run tokens). */\n';
const decl = (mode) => colors.map((c) => `    --${c.name}: ${c[mode]};`).join('\n');

const tokensCss =
    header +
    `:root {\n${decl('light')}\n${sizes.map((s) => `    --${s.name}: ${s.value};`).join('\n')}\n    --font-sans: ${fontSans};\n    --font-mono: ${fontMono};\n}\n\n` +
    `.dark {\n${decl('dark')}\n}\n`;

// Tailwind 4: Farben und Radius als Theme, damit bg-primary, text-muted-foreground usw. die Tokens nutzen.
const themeCss =
    header +
    '@theme inline {\n' +
    colors.map((c) => `    --color-${c.name}: var(--${c.name});`).join('\n') +
    '\n    --font-sans: var(--font-sans);\n    --font-mono: var(--font-mono);\n    --radius-lg: var(--radius);\n    --radius-md: calc(var(--radius) - 2px);\n    --radius-sm: calc(var(--radius) - 4px);\n}\n';

// Web-Komponenten der Plugins (Plugins P5): gleiche Werte mit Präfix --eduksx-*.
const eduksxCss =
    header +
    ':root, :host {\n' +
    colors.map((c) => `    --eduksx-${c.name}: var(--${c.name}, ${c.light});`).join('\n') +
    '\n}\n';

const generated =
    '// Erzeugt aus tokens/tokens.json – nicht von Hand ändern (npm run tokens).\n' +
    `export const TOKENS = ${JSON.stringify(colors, null, 4)} as const;\n\n` +
    `export const CONTRAST_PAIRS = ${JSON.stringify(pairs, null, 4)} as const;\n`;

mkdirSync(join(root, 'dist'), { recursive: true });
mkdirSync(join(root, 'src/generated'), { recursive: true });
writeFileSync(join(root, 'dist/tokens.css'), tokensCss);
writeFileSync(join(root, 'dist/theme.css'), themeCss);
writeFileSync(join(root, 'dist/eduksx.css'), eduksxCss);
writeFileSync(join(root, 'src/generated/tokens.ts'), generated);
console.log(`Tokens: ${colors.length} Farben, ${sizes.length} Grössen → dist/tokens.css, dist/theme.css, dist/eduksx.css`);
