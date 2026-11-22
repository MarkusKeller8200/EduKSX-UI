import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppHeader, BrandWordmark, HistoryList, formatDateTime } from '../src';

describe('BrandWordmark', () => {
    it('schreibt EduKSX-Glossary exakt mit den Segmentfarben', () => {
        render(<BrandWordmark suffix="Glossary" />);
        const mark = screen.getByRole('img', { name: 'EduKSX-Glossary' });
        const tones = [...mark.querySelectorAll('[data-tone]')].map((s) => `${s.textContent}:${s.getAttribute('data-tone')}`);
        expect(tones).toEqual(['E:violet', 'du:neutral', 'K:orange', 'SX:blue', '-Glossary:neutral']);
    });
});

describe('AppHeader und Modulwechsel', () => {
    const modules = [
        { key: 'glossary', name: 'EduKSX-Glossary', url: 'https://glossary.example' },
        { key: 'codex', name: 'EduKSX-Codex', url: 'https://codex.example' },
    ];

    it('öffnet per Tastatur, markiert das aktuelle Modul und schliesst mit Escape', async () => {
        const user = userEvent.setup();
        render(<AppHeader product="Glossary" modules={modules} currentModule="glossary" />);
        const button = screen.getByRole('button', { name: 'Module' });
        button.focus();
        await user.keyboard('{Enter}');
        expect(button).toHaveAttribute('aria-expanded', 'true');
        expect(within(screen.getByRole('list')).getByRole('link', { name: 'EduKSX-Glossary' })).toHaveAttribute('aria-current', 'page');
        await user.keyboard('{Escape}');
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveFocus();
    });

    it('schliesst, wenn der Fokus mit Tab oder Shift+Tab Knopf und Liste verlässt (#12)', async () => {
        const user = userEvent.setup();
        render(
            <>
                <button type="button">davor</button>
                <AppHeader product="Glossary" modules={modules} currentModule="glossary" />
                <button type="button">danach</button>
            </>,
        );
        const button = screen.getByRole('button', { name: 'Module' });
        button.focus();
        await user.keyboard('{Enter}');
        expect(button).toHaveAttribute('aria-expanded', 'true');
        await user.tab();
        expect(screen.getByRole('link', { name: 'EduKSX-Codex' })).toHaveFocus();
        expect(button).toHaveAttribute('aria-expanded', 'true');
        await user.tab();
        expect(screen.getByRole('button', { name: 'danach' })).toHaveFocus();
        expect(button).toHaveAttribute('aria-expanded', 'false');

        button.focus();
        await user.keyboard('{Enter}');
        button.focus();
        await user.tab({ shift: true });
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('zeigt ohne Module keinen Modulwechsel', () => {
        render(<AppHeader product="Glossary" />);
        expect(screen.queryByRole('button', { name: 'Module' })).toBeNull();
    });
});

describe('Verlauf', () => {
    it('zeigt Aktionen deutsch, Datum schweizerisch und keine personenbezogenen Werte', () => {
        render(
            <HistoryList
                fieldLabels={{ short_description: 'Kurzbeschreibung', display_name: 'Anzeigename' }}
                entries={[
                    {
                        event_id: '1',
                        action: 'updated',
                        occurred_at: '2026-11-22T02:05:09Z',
                        actor_label: 'Redaktion',
                        source: 'web',
                        changes: { short_description: { old: 'alt', new: 'neu' }, display_name: 'changed' },
                    },
                    { event_id: '2', action: 'restored', occurred_at: '2026-11-21T10:00:00Z', source: 'restore' },
                ]}
            />,
        );
        expect(screen.getByText(/22\.11\.2026 03:05:09/)).toBeInTheDocument();
        expect(screen.getByText(/geändert · Redaktion/)).toBeInTheDocument();
        expect(screen.getByText('Kurzbeschreibung')).toBeInTheDocument();
        expect(screen.getByText('geändert (Wert wird nicht angezeigt)')).toBeInTheDocument();
        expect(screen.getByText(/wiederhergestellt/)).toBeInTheDocument();
        expect(screen.getByText(/Wiederherstellung/)).toBeInTheDocument();
    });

    it('sagt alte und neue Werte für Bildschirmleser mit «vorher»/«nachher» an (#13)', () => {
        render(
            <HistoryList
                entries={[{ event_id: '1', action: 'updated', occurred_at: '2026-11-22T10:00:00Z', changes: { titel: { old: 'alt', new: 'neu' } } }]}
            />,
        );
        const dd = screen.getByText('titel').nextElementSibling as HTMLElement;
        expect(dd.textContent).toBe('vorher: alt → nachher: neu');
        expect(dd.querySelector('del .sr-only')?.textContent).toBe('vorher: ');
        expect(dd.querySelector('ins .sr-only')?.textContent).toBe('nachher: ');
        expect(dd.querySelector('[aria-hidden="true"]')?.textContent).toBe('→');
    });

    it('beschriftet alle vier Aktionen deutsch', () => {
        const actions = ['created', 'updated', 'deleted', 'restored'] as const;
        render(<HistoryList entries={actions.map((action, i) => ({ event_id: String(i), action, occurred_at: '2026-11-22T10:00:00Z' }))} />);
        const texts = screen.getAllByRole('listitem').map((li) => li.textContent);
        expect(texts).toEqual([
            '22.11.2026 11:00:00 · angelegt',
            '22.11.2026 11:00:00 · geändert',
            '22.11.2026 11:00:00 · gelöscht',
            '22.11.2026 11:00:00 · wiederhergestellt',
        ]);
    });

    it('formatiert Datum und Zeit nach DB D2', () => {
        expect(formatDateTime('2026-01-05T23:30:00Z')).toBe('06.01.2026 00:30:00');
    });
});
