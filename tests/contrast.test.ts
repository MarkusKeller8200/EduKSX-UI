import { checkTheme, contrastRatio, defaultColors, KNOWN_TOKENS } from '../src/contrast';

describe('Kontrast', () => {
    it('berechnet WCAG-Werte', () => {
        expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
        // Befund aus dem Glossary: Orange auf Weiss ist als Schrift zu schwach
        expect(contrastRatio('#ff8a00', '#ffffff')).toBeLessThan(3);
    });

    it('Standard «EduKSX» besteht hell und dunkel', () => {
        expect(checkTheme()).toEqual([]);
    });

    it('meldet zu schwache Paare eines Themes', () => {
        const findings = checkTheme({ light: { link: '#7fb3d5' } });
        expect(findings.some((f) => f.foreground === 'link' && f.mode === 'light')).toBe(true);
    });

    it('lässt nur bekannte Tokens und #rrggbb zu', () => {
        expect(() => checkTheme({ light: { erfunden: '#000000' } })).toThrow(/Unbekanntes Token/);
        expect(() => checkTheme({ dark: { link: 'blue' } })).toThrow(/#rrggbb/);
    });

    it('kennt die Standardwerte aus dem Glossary', () => {
        expect(KNOWN_TOKENS).toContain('primary');
        expect(defaultColors('light').primary).toBe('#ff8a00');
        expect(defaultColors('dark').background).toBe('#151b24');
    });
});
