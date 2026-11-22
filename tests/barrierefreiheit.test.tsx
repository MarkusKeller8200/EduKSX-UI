import { render } from '@testing-library/react';
import { App } from '../site/src/app';
import { ENTRIES } from '../site/src/registry';
import { checkA11y, expectAccessible } from './a11y';

// axe-core (DS7, #14): jede Seite der Testseite – und damit jeder Baustein in allen Varianten – ohne «serious»/«critical».
describe('Barrierefreiheit (axe-core)', () => {
    beforeAll(() => {
        window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
    });

    it.each(ENTRIES.map((e) => [e.id] as const))('Testseite %s ohne schwere Verstösse', async (id) => {
        window.location.hash = `/${id}`;
        const { container } = render(<App />);
        await expectAccessible(container, id);
    });

    it('Übersicht ohne schwere Verstösse', async () => {
        window.location.hash = '';
        const { container } = render(<App />);
        await expectAccessible(container, 'uebersicht');
    });

    it('lässt die Prüfung bei einem Knopf ohne Namen scheitern (critical)', async () => {
        const { container } = render(<button type="button" />);
        const { blocking } = await checkA11y(container);
        expect(blocking.map((v) => v.id)).toContain('button-name');
        await expect(expectAccessible(container, 'Probe')).rejects.toThrow(/button-name/);
    });

    it('meldet «moderate» nur als Warnung', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        // Überschriften-Sprung h1 → h3 ist «moderate» (heading-order).
        const { container } = render(
            <main>
                <h1>Titel</h1>
                <h3>Zu tief</h3>
            </main>,
        );
        const { blocking, warnings } = await checkA11y(container);
        expect(blocking).toEqual([]);
        expect(warnings.map((v) => v.impact)).toContain('moderate');
        await expect(expectAccessible(container, 'Probe')).resolves.toBeUndefined();
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('heading-order'));
        warn.mockRestore();
    });
});
