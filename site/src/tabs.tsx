import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../src/lib/cn';

/**
 * Reiter nach dem ARIA-Muster «Tabs» (manuelle Aktivierung nicht nötig: Pfeiltasten wählen sofort).
 * Nur für die Testseite; ein Baustein «Reiter» für die Module folgt eigens (UEBERNAHME-INTRANET-GUI 1.3).
 */
export function Tabs({ label, tabs }: { label: string; tabs: { id: string; title: string; content: ReactNode }[] }) {
    const [active, setActive] = useState(tabs[0]?.id);
    const base = useId();
    const refs = useRef<(HTMLButtonElement | null)[]>([]);
    const onKey = (e: KeyboardEvent, i: number) => {
        const last = tabs.length - 1;
        const next = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1) : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1;
        if (next < 0) return;
        e.preventDefault();
        setActive(tabs[next].id);
        refs.current[next]?.focus();
    };
    return (
        <div className="space-y-6">
            <div role="tablist" aria-label={label} className="flex flex-wrap gap-1 border-b border-border">
                {tabs.map((t, i) => {
                    const on = t.id === active;
                    return (
                        <button
                            key={t.id}
                            ref={(el) => {
                                refs.current[i] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`${base}-tab-${t.id}`}
                            aria-selected={on}
                            aria-controls={`${base}-panel-${t.id}`}
                            tabIndex={on ? 0 : -1}
                            onClick={() => setActive(t.id)}
                            onKeyDown={(e) => onKey(e, i)}
                            className={cn(
                                '-mb-px rounded-t-md border-b-2 px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring',
                                on ? 'border-primary font-semibold text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                            )}
                        >
                            {t.title}
                        </button>
                    );
                })}
            </div>
            {tabs.map((t) => (
                <div
                    key={t.id}
                    role="tabpanel"
                    id={`${base}-panel-${t.id}`}
                    aria-labelledby={`${base}-tab-${t.id}`}
                    hidden={t.id !== active}
                    tabIndex={0}
                    className="outline-none focus-visible:outline-2 focus-visible:outline-ring"
                >
                    {t.content}
                </div>
            ))}
        </div>
    );
}
