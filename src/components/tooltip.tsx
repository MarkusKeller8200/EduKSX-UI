import { cloneElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export type TooltipProps = {
    /** Text des Tooltips (kurz, ohne Bedienelemente darin) */
    content: ReactNode;
    /** Genau ein fokussierbares Element, z. B. ein Knopf */
    children: ReactElement<{ 'aria-describedby'?: string }>;
    side?: 'top' | 'bottom';
    /** Verzögerung beim Darüberfahren in ms; beim Fokussieren erscheint der Tooltip sofort */
    delay?: number;
    /**
     * `true` (Vorgabe): Text ergänzt den Namen und wird per `aria-describedby` vorgelesen.
     * `false`: Text wiederholt nur den Namen (Symbol-Knopf mit `aria-label`) und bleibt für Bildschirmleser stumm.
     */
    describe?: boolean;
    className?: string;
};

/**
 * Tooltip nach WCAG 1.4.13: erscheint bei Darüberfahren und Fokus, bleibt, solange die Maus darauf liegt,
 * und schliesst mit Esc, ohne dass der Fokus wandert. Nur Zusatzinformation – nie der einzige Ort einer Angabe.
 */
export function Tooltip({ content, children, side = 'top', delay = 300, describe = true, className }: TooltipProps) {
    const [open, setOpen] = useState(false);
    const id = useId();
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const clear = () => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = undefined;
    };
    const show = (wait: number) => {
        clear();
        if (wait <= 0) setOpen(true);
        else timer.current = setTimeout(() => setOpen(true), wait);
    };
    const hide = () => {
        clear();
        setOpen(false);
    };

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') hide();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);
    useEffect(() => clear, []);

    const describedBy = [children.props['aria-describedby'], describe && open ? id : undefined].filter(Boolean).join(' ');

    return (
        <span
            className="relative inline-flex"
            onMouseEnter={() => show(delay)}
            onMouseLeave={hide}
            onFocus={() => show(0)}
            onBlur={hide}
            data-slot="tooltip-trigger"
        >
            {cloneElement(children, { 'aria-describedby': describedBy || undefined })}
            {open && (
                <span
                    id={id}
                    role={describe ? 'tooltip' : undefined}
                    aria-hidden={describe ? undefined : true}
                    data-slot="tooltip"
                    data-side={side}
                    className={cn(
                        'absolute left-1/2 z-50 w-max max-w-xs -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md',
                        side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
                        className,
                    )}
                >
                    {content}
                </span>
            )}
        </span>
    );
}
