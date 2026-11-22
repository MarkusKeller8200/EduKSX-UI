import { render, screen } from '@testing-library/react';
import { ENTRIES, GROUPS } from '../site/src/registry';
import { App } from '../site/src/app';

// Testseite (#15): jede Seite des Inhaltsverzeichnisses lässt sich zeichnen, Ids sind eindeutig.
describe('Testseite', () => {
    beforeAll(() => {
        window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
    });

    it('hat eindeutige Seiten in bekannten Gruppen', () => {
        const ids = ENTRIES.map((e) => e.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const e of ENTRIES) {
            expect(GROUPS).toContain(e.group);
            expect(e.id).toMatch(/^[a-z0-9-]+$/);
        }
    });

    it.each(ENTRIES.map((e) => [e.id, e] as const))('zeichnet die Seite %s', (_id, entry) => {
        window.location.hash = `/${entry.id}`;
        render(<App />);
        expect(screen.getByRole('heading', { level: 1, name: entry.title })).toBeInTheDocument();
    });

    it('zeigt die Übersicht mit allen Seiten und die Vorschau-Leiste', () => {
        window.location.hash = '';
        render(<App />);
        expect(screen.getByRole('heading', { level: 1, name: 'Testseite des EduKSX-Designsystems' })).toBeInTheDocument();
        for (const name of ['Hell', 'Dunkel', 'Wie System', 'Handy', 'Tablet', 'Darstellungsoptimiert', 'Breit', 'Voll']) {
            expect(screen.getByRole('button', { name })).toBeInTheDocument();
        }
    });
});
