import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
    Alert,
    AlertDialog,
    Button,
    Checkbox,
    Dialog,
    Field,
    IconButton,
    Input,
    NativeSelect,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableEmpty,
    TableHead,
    TableHeader,
    TableRow,
    Textarea,
    Tooltip,
    buttonClasses,
    type SortDirection,
} from '../src';

describe('Button', () => {
    it('ist ein Knopf vom Typ «button» mit Variante und Tastaturbedienung', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Speichern</Button>);
        const button = screen.getByRole('button', { name: 'Speichern' });
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('data-variant', 'default');
        expect(button.className).toContain('bg-primary');
        expect(button.className).toContain('focus-visible:outline-ring');
        await user.tab();
        expect(button).toHaveFocus();
        await user.keyboard('{Enter}');
        await user.keyboard(' ');
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('bleibt beim Laden fokussierbar, meldet «beschäftigt» und löst nichts aus', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <Button loading onClick={onClick}>
                Senden
            </Button>,
        );
        const button = screen.getByRole('button', { name: 'Senden' });
        expect(button).toHaveAttribute('aria-busy', 'true');
        expect(button).toHaveAttribute('aria-disabled', 'true');
        expect(button).not.toBeDisabled();
        await user.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('ist gesperrt nicht bedienbar', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <Button disabled onClick={onClick}>
                Löschen
            </Button>,
        );
        await user.click(screen.getByRole('button', { name: 'Löschen' }));
        expect(onClick).not.toHaveBeenCalled();
    });

    it('liefert dieselben Klassen für Links, die wie ein Knopf aussehen', () => {
        expect(buttonClasses({ variant: 'outline', size: 'sm' })).toContain('border-input');
        expect(buttonClasses({ variant: 'link' })).toContain('underline');
        expect(buttonClasses({ variant: 'destructive' })).toContain('text-destructive-contrast');
    });
});

describe('IconButton und Tooltip', () => {
    it('hat aria-label, versteckt das Symbol und zeigt den Tooltip bei Fokus; Esc schliesst ihn', async () => {
        const user = userEvent.setup();
        render(<IconButton label="Kopieren" icon={<svg data-testid="sym" />} />);
        const button = screen.getByRole('button', { name: 'Kopieren' });
        expect(screen.getByTestId('sym').closest('[aria-hidden="true"]')).not.toBeNull();
        await user.tab();
        expect(button).toHaveFocus();
        expect(screen.getByText('Kopieren', { selector: '[data-slot="tooltip"]' })).toBeVisible();
        await user.keyboard('{Escape}');
        expect(screen.queryByText('Kopieren', { selector: '[data-slot="tooltip"]' })).toBeNull();
        expect(button).toHaveFocus();
    });

    it('meldet Umschalter mit aria-pressed', () => {
        render(<IconButton label="Fett" icon={<svg />} pressed />);
        expect(screen.getByRole('button', { name: 'Fett' })).toHaveAttribute('aria-pressed', 'true');
    });

    it('verbindet einen ergänzenden Tooltip per aria-describedby', async () => {
        const user = userEvent.setup();
        render(
            <Tooltip content="Speichert ohne Rückfrage">
                <button type="button">Speichern</button>
            </Tooltip>,
        );
        await user.tab();
        expect(screen.getByRole('button', { name: 'Speichern' })).toHaveAccessibleDescription('Speichert ohne Rückfrage');
        expect(screen.getByRole('tooltip')).toHaveTextContent('Speichert ohne Rückfrage');
    });

    it('erscheint beim Darüberfahren erst nach der Verzögerung', async () => {
        vi.useFakeTimers();
        try {
            render(
                <Tooltip content="Mehr">
                    <button type="button">Info</button>
                </Tooltip>,
            );
            fireEvent.mouseEnter(screen.getByRole('button').parentElement!);
            expect(screen.queryByRole('tooltip')).toBeNull();
            act(() => vi.advanceTimersByTime(300));
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
        } finally {
            vi.useRealTimers();
        }
    });
});

describe('Formularfelder', () => {
    it('verbindet Beschriftung, Hinweis und Fehler mit dem Feld', () => {
        render(
            <Field label="E-Mail" hint="Adresse der Schule" error="Bitte eine gültige E-Mail-Adresse eingeben, z. B. name@schule.ch." required>
                <Input type="email" />
            </Field>,
        );
        const input = screen.getByRole('textbox', { name: 'E-Mail' });
        expect(input).toBeRequired();
        expect(input).toBeInvalid();
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAccessibleDescription(/Adresse der Schule.*Fehler: Bitte eine gültige E-Mail-Adresse/);
        expect(input).toHaveAttribute('aria-errormessage', expect.stringContaining('-error'));
        // Fehler mit Symbol und Text, nicht nur Farbe
        expect(screen.getByText(/Bitte eine gültige/).closest('[data-slot="field-error"]')?.querySelector('svg')).not.toBeNull();
    });

    it('Textbereich und Auswahl ohne Vorauswahl', async () => {
        const user = userEvent.setup();
        render(
            <>
                <Field label="Bemerkung">
                    <Textarea />
                </Field>
                <Field label="Klasse" required>
                    <NativeSelect placeholder="Bitte wählen" defaultValue="">
                        <option value="1a">1a</option>
                        <option value="1b">1b</option>
                    </NativeSelect>
                </Field>
            </>,
        );
        expect(screen.getByRole('textbox', { name: 'Bemerkung' }).tagName).toBe('TEXTAREA');
        const select = screen.getByRole('combobox', { name: 'Klasse' });
        expect(select).toHaveValue('');
        expect(screen.getByRole('option', { name: 'Bitte wählen' })).toBeDisabled();
        await user.selectOptions(select, '1b');
        expect(select).toHaveValue('1b');
    });

    it('gesperrtes Feld über Field', () => {
        render(
            <Field label="Kürzel" disabled>
                <Input defaultValue="AB" />
            </Field>,
        );
        expect(screen.getByRole('textbox', { name: 'Kürzel' })).toBeDisabled();
    });

    it('Kontrollkästchen: ganze Beschriftung klickbar, Leertaste, teilweise gewählt', async () => {
        const user = userEvent.setup();
        render(
            <>
                <Checkbox label="Benachrichtigen" hint="per E-Mail" />
                <Checkbox label="Alle" indeterminate />
            </>,
        );
        const box = screen.getByRole('checkbox', { name: 'Benachrichtigen' });
        expect(box).toHaveAccessibleDescription('per E-Mail');
        await user.click(screen.getByText('Benachrichtigen'));
        expect(box).toBeChecked();
        box.focus();
        await user.keyboard(' ');
        expect(box).not.toBeChecked();
        expect(screen.getByRole('checkbox', { name: 'Alle' })).toBePartiallyChecked();
    });
});

describe('Tabelle', () => {
    function Sortierbar() {
        const [sort, setSort] = useState<SortDirection>('none');
        const rows = [
            { name: 'Bern', n: 3 },
            { name: 'Aarau', n: 12 },
        ].sort((a, b) => (sort === 'none' ? 0 : (sort === 'asc' ? 1 : -1) * a.name.localeCompare(b.name)));
        return (
            <Table scrollLabel="Standorte">
                <TableCaption>Standorte</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead sort={sort} onSort={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>
                            Name
                        </TableHead>
                        <TableHead numeric>Geräte</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((r) => (
                        <TableRow key={r.name} selected={r.name === 'Aarau'}>
                            <TableCell>{r.name}</TableCell>
                            <TableCell numeric>{r.n}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    it('ist eine echte Tabelle mit Titel, Spaltenköpfen und sortierbarer Spalte', async () => {
        const user = userEvent.setup();
        render(<Sortierbar />);
        const table = screen.getByRole('table', { name: 'Standorte' });
        expect(screen.getAllByRole('columnheader')).toHaveLength(2);
        const head = screen.getByRole('columnheader', { name: 'Name' });
        expect(head).toHaveAttribute('aria-sort', 'none');
        await user.click(screen.getByRole('button', { name: 'Name' }));
        expect(head).toHaveAttribute('aria-sort', 'ascending');
        expect(screen.getAllByRole('cell').map((c) => c.textContent)).toEqual(['Aarau', '12', 'Bern', '3']);
        await user.keyboard('{Enter}');
        expect(head).toHaveAttribute('aria-sort', 'descending');
        expect(table.closest('[role="region"]')).toHaveAttribute('tabindex', '0');
        expect(screen.getByRole('row', { selected: true })).toHaveTextContent('Aarau');
    });

    it('zeigt einen leeren Zustand über alle Spalten', () => {
        render(
            <Table>
                <TableBody>
                    <TableEmpty colSpan={3} />
                </TableBody>
            </Table>,
        );
        expect(screen.getByRole('cell', { name: 'Keine Einträge.' })).toHaveAttribute('colspan', '3');
    });
});

describe('Dialog', () => {
    function Beispiel({ onClose = () => {} }: { onClose?: () => void }) {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Details</Button>
                <Dialog
                    open={open}
                    onOpenChange={(o) => {
                        setOpen(o);
                        if (!o) onClose();
                    }}
                    title="Gerät"
                    description="Angaben zum Gerät"
                    footer={<Button onClick={() => setOpen(false)}>Fertig</Button>}
                >
                    <p>Inhalt</p>
                </Dialog>
            </>
        );
    }

    it('öffnet modal mit Titel und Beschreibung, schliesst mit «Schliessen» und gibt den Fokus zurück', async () => {
        const user = userEvent.setup();
        render(<Beispiel />);
        const trigger = screen.getByRole('button', { name: 'Details' });
        await user.click(trigger);
        const dialog = screen.getByRole('dialog', { name: 'Gerät' });
        expect(dialog).toHaveAttribute('open');
        expect(dialog).toHaveAccessibleDescription('Angaben zum Gerät');
        await user.click(screen.getByRole('button', { name: 'Schliessen' }));
        expect(dialog).not.toHaveAttribute('open');
        expect(screen.queryByText('Inhalt')).toBeNull();
        expect(trigger).toHaveFocus();
    });

    it('schliesst mit Esc (cancel) und Klick daneben, nicht mit Klick in den Inhalt', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        render(<Beispiel onClose={onClose} />);
        await user.click(screen.getByRole('button', { name: 'Details' }));
        const dialog = screen.getByRole('dialog');
        await user.click(screen.getByText('Inhalt'));
        expect(dialog).toHaveAttribute('open');
        fireEvent(dialog, new Event('cancel', { cancelable: true }));
        expect(dialog).not.toHaveAttribute('open');
        await user.click(screen.getByRole('button', { name: 'Details' }));
        fireEvent.click(dialog);
        expect(dialog).not.toHaveAttribute('open');
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});

describe('Rückfrage', () => {
    function Loeschen({ onConfirm }: { onConfirm: () => void | Promise<unknown> }) {
        const [open, setOpen] = useState(true);
        return (
            <AlertDialog
                open={open}
                onOpenChange={setOpen}
                title="Eintrag löschen?"
                description="Das kann nicht rückgängig gemacht werden."
                confirmLabel="Löschen"
                onConfirm={onConfirm}
            />
        );
    }

    it('setzt den Fokus auf «Abbrechen», hat role alertdialog und schliesst nicht mit Klick daneben', () => {
        render(<Loeschen onConfirm={() => {}} />);
        const dialog = screen.getByRole('alertdialog', { name: 'Eintrag löschen?' });
        expect(dialog).toHaveAccessibleDescription('Das kann nicht rückgängig gemacht werden.');
        expect(screen.getByRole('button', { name: 'Abbrechen' })).toHaveFocus();
        expect(screen.getByRole('button', { name: 'Löschen' }).className).toContain('bg-destructive');
        fireEvent.click(dialog);
        expect(dialog).toHaveAttribute('open');
        fireEvent(dialog, new Event('cancel', { cancelable: true }));
        expect(dialog).not.toHaveAttribute('open');
    });

    it('wartet auf ein Promise und bleibt bei Fehler offen', async () => {
        const user = userEvent.setup();
        let reject: (e: Error) => void = () => {};
        render(<Loeschen onConfirm={() => new Promise((_, r) => (reject = r))} />);
        const confirm = screen.getByRole('button', { name: 'Löschen' });
        await user.click(confirm);
        expect(confirm).toHaveAttribute('aria-busy', 'true');
        await act(async () => reject(new Error('Netz')));
        expect(screen.getByRole('alertdialog')).toHaveAttribute('open');
        expect(confirm).not.toHaveAttribute('aria-busy');
    });

    it('schliesst nach Bestätigung', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        render(<Loeschen onConfirm={onConfirm} />);
        await user.click(screen.getByRole('button', { name: 'Löschen' }));
        expect(onConfirm).toHaveBeenCalledOnce();
        expect(screen.getByRole('alertdialog', { hidden: true })).not.toHaveAttribute('open');
    });
});

describe('Hinweisbox', () => {
    it('beginnt für Bildschirmleser mit der Art und hat immer ein Symbol', () => {
        render(
            <Alert variant="warning" title="Wartung heute Abend">
                Ab 18 Uhr nicht erreichbar.
            </Alert>,
        );
        const box = screen.getByText('Wartung heute Abend').closest('[data-slot="alert"]')!;
        expect(box).toHaveTextContent('Warnung: Wartung heute Abend');
        expect(box.querySelector('svg')).not.toBeNull();
        expect(box).not.toHaveAttribute('role');
    });

    it('sagt nachträgliche Fehler sofort an, Erfolg höflich', () => {
        render(
            <>
                <Alert variant="destructive" announce>
                    Speichern fehlgeschlagen.
                </Alert>
                <Alert variant="success" announce>
                    Gespeichert.
                </Alert>
            </>,
        );
        expect(screen.getByRole('alert')).toHaveTextContent('Fehler: Speichern fehlgeschlagen.');
        expect(screen.getByRole('status')).toHaveTextContent('Erfolg: Gespeichert.');
    });

    it('lässt sich schliessen', async () => {
        const user = userEvent.setup();
        const onDismiss = vi.fn();
        render(
            <Alert title="Neu" onDismiss={onDismiss}>
                Version 0.2
            </Alert>,
        );
        await user.click(screen.getByRole('button', { name: 'Hinweis schliessen' }));
        expect(onDismiss).toHaveBeenCalledOnce();
    });
});
