import { BUILTIN_THEMES, checkTheme } from '../src';
import { TOKENS_CSS } from '../src/generated/css';

// Mitgelieferte Themes (DS11, #42): EduKSX plus Hoher Kontrast und Violett, jedes besteht die Kontrastprüfung.
describe('Mitgelieferte Themes', () => {
    it('sind Hoher Kontrast und Violett', () => {
        expect(BUILTIN_THEMES.map((t) => t.key)).toEqual(['hoher-kontrast', 'violett']);
    });

    it.each(BUILTIN_THEMES.map((t) => [t.name, t] as const))('%s besteht die Kontrastprüfung hell und dunkel', (_name, theme) => {
        expect(checkTheme({ light: { ...theme.light }, dark: { ...theme.dark } })).toEqual([]);
    });

    it.each(BUILTIN_THEMES.map((t) => [t.key] as const))('%s steht in tokens.css für hell und dunkel', (key) => {
        expect(TOKENS_CSS).toContain(`[data-theme="${key}"] {`);
        expect(TOKENS_CSS).toContain(`.dark[data-theme="${key}"],`);
    });
});
