import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../lib/cn';

/** Eintrag aus GET /api/v1/me/modules (Plattform S7). */
export type ModuleLink = { key: string; name: string; url: string; icon?: string };

export type ModuleSwitcherProps = {
    modules: ModuleLink[];
    /** Modulschlüssel des aktuellen Moduls (Modulregister). */
    current?: string;
    label?: string;
};

/** Modulwechsel als Schaltfläche mit Liste; Tastatur: Enter/Leertaste öffnet, Escape schliesst. */
export function ModuleSwitcher({ modules, current, label = 'Module' }: ModuleSwitcherProps) {
    const [open, setOpen] = useState(false);
    const listId = useId();
    const button = useRef<HTMLButtonElement>(null);
    const panel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                button.current?.focus();
            }
        };
        const onClick = (e: MouseEvent) => {
            if (!panel.current?.contains(e.target as Node) && !button.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, [open]);

    if (modules.length === 0) return null;

    return (
        <div className="relative">
            <button
                ref={button}
                type="button"
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpen((o) => !o)}
                className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
            >
                {label}
            </button>
            {open && (
                <div
                    ref={panel}
                    id={listId}
                    className="absolute right-0 z-50 mt-2 min-w-56 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
                >
                    <ul>
                        {modules.map((m) => (
                            <li key={m.key}>
                                <a
                                    href={m.url}
                                    aria-current={m.key === current ? 'page' : undefined}
                                    className={cn(
                                        'flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring',
                                        m.key === current && 'font-semibold',
                                    )}
                                >
                                    {m.icon && <img src={m.icon} alt="" width={20} height={20} />}
                                    {m.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
