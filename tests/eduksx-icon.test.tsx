/// <reference types="vite/client" />
// Übernommen aus markussxch src/test/eduksx-icons.test.tsx.
import { render, screen } from '@testing-library/react';
import { EDUKSX_ICON_BUNDLES, EDUKSX_ICON_NAMES, EDUKSX_ICON_VORRAT, EduksxIcon, bundlesOfIcon, eduksxIcons, type EduksxIconName } from '../src';

// Dateien über Vite einlesen (ohne @types/node)
const svgFiles = import.meta.glob('../icons/svg/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const pngFiles = Object.keys(import.meta.glob('../icons/png/*/*.png', { query: '?url', eager: true }));
const icoFiles = Object.keys(import.meta.glob('../icons/ico/*.ico', { query: '?url', eager: true }));
const svgFile = (file: string) => svgFiles[`../icons/svg/${file}`];
const fileSlug = (n: EduksxIconName) => (n === 'eduksx' ? 'eduksx' : `eduksx-${n}`);

describe('EduKSX-Icon-Set', () => {
    it('enthält die 28 freigegebenen Icons', () => {
        expect(EDUKSX_ICON_NAMES).toEqual([
            'eduksx', 'glossary', 'codex', 'core', 'ident', 'shop', 'licence', 'portal',
            'connect', 'services', 'sign', 'time', 'intranet', 'timetable', 'staffing', 'ops', 'flow',
            'planner', 'websnapshot', 'api', 'aiconverter', 'mcp', 'bill', 'ticket', 'booking', 'checklist',
            'absence', 'ai',
        ]);
    });

    it('stimmt mit den eingecheckten SVG-Dateien überein', () => {
        for (const n of EDUKSX_ICON_NAMES) {
            const svg = svgFile(`${fileSlug(n)}.svg`);
            expect(svg, n).toBeDefined();
            for (const el of eduksxIcons[n].elements) {
                for (const [key, value] of Object.entries(el.attrs)) {
                    expect(svg, `${n}: ${key}`).toContain(`${key}="${value}"`);
                }
            }
        }
    });

    it('hat je Icon vier SVG-Varianten und PNG-Kacheln in vier Grössen', () => {
        for (const n of EDUKSX_ICON_NAMES) {
            for (const v of ['', '-color', '-tile-dark', '-tile-light']) {
                expect(svgFile(`${fileSlug(n)}${v}.svg`), `${n}${v}`).toBeDefined();
            }
            for (const size of ['512', '192', '64', '32']) {
                expect(pngFiles).toContain(`../icons/png/${size}/${fileSlug(n)}-tile-dark.png`);
                expect(pngFiles).toContain(`../icons/png/${size}/${fileSlug(n)}-tile-light.png`);
            }
        }
    });

    it('hat je Icon Maskable-Varianten (SVG, PNG 192 und 512) und ein favicon.ico (#55)', () => {
        for (const n of EDUKSX_ICON_NAMES) {
            for (const v of ['dark', 'light']) {
                const svg = svgFile(`${fileSlug(n)}-maskable-${v}.svg`);
                expect(svg, `${n} maskable-${v}`).toBeDefined();
                expect(svg, 'Fläche randlos').toMatch(/<rect width="48" height="48" fill="#[0-9A-F]{6}"\/>/);
                for (const size of ['512', '192']) {
                    expect(pngFiles).toContain(`../icons/png/${size}/${fileSlug(n)}-maskable-${v}.png`);
                }
            }
            expect(icoFiles).toContain(`../icons/ico/${fileSlug(n)}.ico`);
        }
    });

    it('nutzt die Markentokens, einfarbig die Textfarbe und als Kachel icon-tile', () => {
        const { container: color } = render(<EduksxIcon name="eduksx" />);
        for (const token of ['--brand-violet', '--brand-orange', '--brand-blue', '--brand-neutral']) {
            expect(color.innerHTML).toContain(token);
        }
        const { container: mono } = render(<EduksxIcon name="eduksx" variant="mono" />);
        expect(mono.innerHTML).not.toContain('--brand-');
        expect(mono.innerHTML).toContain('currentColor');
        const { container: tile } = render(<EduksxIcon name="time" variant="tile" />);
        expect(tile.innerHTML).toContain('--icon-tile');
    });

    it('ist ohne Titel dekorativ und mit Titel beschriftet', () => {
        const { container } = render(<EduksxIcon name="codex" />);
        expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
        render(<EduksxIcon name="codex" title="EduKSX-Codex" />);
        expect(screen.getByRole('img', { name: 'EduKSX-Codex' })).toBeInTheDocument();
    });
});

describe('Icon-Bundles je Modul (KONZEPT-MARKE §6.3)', () => {
    it('nennen nur Icons, die es im Set gibt', () => {
        for (const [bundle, b] of Object.entries(EDUKSX_ICON_BUNDLES)) {
            for (const n of b.icons) expect(EDUKSX_ICON_NAMES, `${bundle}: ${n}`).toContain(n);
        }
        for (const n of EDUKSX_ICON_VORRAT) expect(EDUKSX_ICON_NAMES).toContain(n);
    });

    it('ordnen jedes Icon mindestens einem Bundle oder dem Vorrat zu, Vorrat ohne Bundle', () => {
        for (const n of EDUKSX_ICON_NAMES) {
            const inBundle = bundlesOfIcon(n).length > 0;
            const imVorrat = EDUKSX_ICON_VORRAT.includes(n);
            expect(inBundle || imVorrat, n).toBe(true);
            expect(inBundle && imVorrat, n).toBe(false);
        }
    });
});

