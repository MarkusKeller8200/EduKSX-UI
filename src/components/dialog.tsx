import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react';
import { cn } from '../lib/cn';
import { Button, IconButton } from './button';
import { XSymbol } from './symbols';

/*
 * Baustein 4.1 «Dialog» und 4.2 «Rückfrage» auf dem nativen <dialog> mit showModal(): der Browser sperrt die
 * Seite dahinter (inert), hält den Fokus im Dialog und schliesst mit Esc. Der Baustein ergänzt Titel und
 * Beschreibung für Bildschirmleser, Schliessen bei Klick daneben (nur Dialog) und gibt den Fokus zurück.
 */

type DialogBaseProps = {
    open: boolean;
    /** Wird mit `false` aufgerufen, wenn der Dialog schliessen will (Esc, Klick daneben, Schliessen). */
    onOpenChange: (open: boolean) => void;
    title: ReactNode;
    description?: ReactNode;
    className?: string;
};

function useModal(open: boolean) {
    const ref = useRef<HTMLDialogElement>(null);
    const returnTo = useRef<HTMLElement | null>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (open && !el.open) {
            returnTo.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            el.showModal();
            // Fokus auf das markierte Element (Rückfrage: «Abbrechen»), sonst wählt der Browser das erste.
            el.querySelector<HTMLElement>('[data-autofocus]')?.focus();
        } else if (!open && el.open) {
            el.close();
        }
    }, [open]);
    // Fokus an den auslösenden Knopf zurückgeben – auch wenn der Dialog geschlossen und entfernt wird.
    useEffect(() => {
        if (open) return;
        const target = returnTo.current;
        returnTo.current = null;
        if (target?.isConnected) target.focus();
    }, [open]);
    return ref;
}

const PANEL =
    'm-auto w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] overflow-y-auto rounded-lg border border-border bg-popover p-0 text-popover-foreground shadow-lg ' +
    'backdrop:bg-[color-mix(in_srgb,black_50%,transparent)]';

export type DialogProps = DialogBaseProps & {
    children?: ReactNode;
    /** Knöpfe unten rechts (Hauptaktion zuletzt) */
    footer?: ReactNode;
    /** Breite: `sm` 384 px, `md` 512 px (Vorgabe), `lg` 672 px */
    size?: 'sm' | 'md' | 'lg';
    closeLabel?: string;
};

const SIZE = { sm: 'sm:max-w-sm', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl' } as const;

/** Dialog für Details oder ein kurzes Formular. Schliesst mit Esc, Klick daneben und «Schliessen». */
export function Dialog({ open, onOpenChange, title, description, children, footer, size = 'md', closeLabel = 'Schliessen', className }: DialogProps) {
    const ref = useModal(open);
    const titleId = useId();
    const descId = useId();
    const onCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        onOpenChange(false);
    };
    // Klick auf den abgedunkelten Rand trifft das <dialog> selbst, nicht seinen Inhalt.
    const onClick = (e: MouseEvent<HTMLDialogElement>) => {
        if (e.target === e.currentTarget) onOpenChange(false);
    };
    return (
        <dialog
            ref={ref}
            data-slot="dialog"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            onCancel={onCancel}
            onClose={() => open && onOpenChange(false)}
            onClick={onClick}
            className={cn(PANEL, SIZE[size], className)}
        >
            {open && (
                <div className="grid gap-4 p-6">
                    <header className="grid gap-1.5 pr-8">
                        <h2 id={titleId} className="typo-h3 text-foreground">
                            {title}
                        </h2>
                        {description && (
                            <p id={descId} className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </header>
                    {children}
                    {footer && <footer className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{footer}</footer>}
                    <div className="absolute top-3 right-3">
                        <IconButton label={closeLabel} icon={<XSymbol />} size="icon-sm" tooltipSide="bottom" onClick={() => onOpenChange(false)} />
                    </div>
                </div>
            )}
        </dialog>
    );
}

export type AlertDialogProps = DialogBaseProps & {
    /** Text des bestätigenden Knopfs, als Verb: «Löschen», «Freigeben» */
    confirmLabel: string;
    cancelLabel?: string;
    /** `destructive` für Löschen und Unumkehrbares (roter Knopf), sonst Hauptknopf */
    tone?: 'destructive' | 'default';
    /** Darf ein Promise liefern: Knopf zeigt «lädt», Dialog schliesst nach Erfolg; bei Fehler bleibt er offen. */
    onConfirm: () => void | Promise<unknown>;
    children?: ReactNode;
};

/**
 * Rückfrage (Alert Dialog) für Löschen und unumkehrbare Schritte: muss bewusst beantwortet werden, schliesst
 * nicht mit Klick daneben, Fokus zuerst auf «Abbrechen». Esc gilt als Abbrechen.
 */
export function AlertDialog({ open, onOpenChange, title, description, confirmLabel, cancelLabel = 'Abbrechen', tone = 'destructive', onConfirm, children, className }: AlertDialogProps) {
    const ref = useModal(open);
    const titleId = useId();
    const descId = useId();
    const [busy, setBusy] = useState(false);
    useEffect(() => {
        if (!open) setBusy(false);
    }, [open]);
    const onCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!busy) onOpenChange(false);
    };
    const confirm = async () => {
        const result = onConfirm();
        if (!(result instanceof Promise)) {
            onOpenChange(false);
            return;
        }
        setBusy(true);
        try {
            await result;
            onOpenChange(false);
        } catch {
            setBusy(false);
        }
    };
    return (
        <dialog
            ref={ref}
            role="alertdialog"
            aria-modal="true"
            data-slot="alert-dialog"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            onCancel={onCancel}
            onClose={() => open && onOpenChange(false)}
            className={cn(PANEL, 'sm:max-w-md', className)}
        >
            {open && (
                <div className="grid gap-4 p-6">
                    <header className="grid gap-1.5">
                        <h2 id={titleId} className="typo-h3 text-foreground">
                            {title}
                        </h2>
                        {description && (
                            <p id={descId} className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </header>
                    {children}
                    <footer className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <Button variant="outline" data-autofocus="" disabled={busy} onClick={() => onOpenChange(false)}>
                            {cancelLabel}
                        </Button>
                        <Button variant={tone === 'destructive' ? 'destructive' : 'default'} loading={busy} onClick={confirm}>
                            {confirmLabel}
                        </Button>
                    </footer>
                </div>
            )}
        </dialog>
    );
}
