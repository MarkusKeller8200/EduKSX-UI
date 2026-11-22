import type { ComponentType, ReactNode } from 'react';
import { CircleCheck, FlaskConical, Hammer, CircleHelp } from 'lucide-react';
import { cn } from '../../src/lib/cn';
import { useSettings } from './settings';

export const REPO = 'https://github.com/MarkusKeller8200/EduKSX-UI';
export const issueUrl = (n: number) => `${REPO}/issues/${n}`;
export const docUrl = (path: string) => `${REPO}/blob/main/${path}`;

/** Status nach dem GUI-Tester des INTRANET (Entwicklung → Prüfung → Freigegeben), ergänzt um «offen». */
export type Status = 'freigegeben' | 'beta' | 'entwicklung' | 'offen';
const STATUS: Record<Status, { label: string; icon: ComponentType<{ className?: string }>; className: string }> = {
    freigegeben: { label: 'Beschlossen', icon: CircleCheck, className: 'bg-success-soft text-foreground' },
    beta: { label: 'Beta-Test', icon: FlaskConical, className: 'bg-info-soft text-foreground' },
    entwicklung: { label: 'In Entwicklung', icon: Hammer, className: 'bg-warning-soft text-foreground' },
    offen: { label: 'Offen', icon: CircleHelp, className: 'bg-muted text-foreground' },
};

/** Status immer mit Symbol und Text, nie nur mit Farbe (KONZEPT-MARKE 6.2). */
export function StatusBadge({ status }: { status: Status }) {
    const s = STATUS[status];
    const Icon = s.icon;
    return (
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap', s.className)}>
            <Icon className="size-3.5" aria-hidden="true" />
            {s.label}
        </span>
    );
}

export function IssueLinks({ issues }: { issues: number[] }) {
    if (issues.length === 0) return null;
    return (
        <span className="inline-flex flex-wrap gap-x-2">
            {issues.map((n) => (
                <a key={n} href={issueUrl(n)} className="text-link underline-offset-2 hover:underline">
                    #{n}
                </a>
            ))}
        </span>
    );
}

/** Abschnitt innerhalb einer Seite. */
export function Block({ title, children, note }: { title: string; children: ReactNode; note?: ReactNode }) {
    return (
        <section className="space-y-3">
            <h2 className="typo-h2">{title}</h2>
            {note && <p className="max-w-prose text-sm text-muted-foreground">{note}</p>}
            {children}
        </section>
    );
}

function Pane({ dark, children, className }: { dark: boolean; children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'min-w-0 rounded-lg border border-border bg-background p-4 text-foreground',
                dark && 'dark',
                className,
            )}
        >
            {children}
        </div>
    );
}

/**
 * Beispielfläche. Im Vergleich «Hell und Dunkel» (Vorschau-Leiste) erscheint der Inhalt zweimal nebeneinander,
 * links im hellen, rechts im dunklen Farbsatz. Neue Bausteine zeigen ihre Beispiele immer in <Example>.
 */
export function Example({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
    const { vergleich } = useSettings();
    if (!vergleich) return <Pane dark={false} className={cn('bg-card', className)}>{children}</Pane>;
    return (
        <div className="grid gap-3 lg:grid-cols-2" role="group" aria-label={label ? `${label}, hell und dunkel` : undefined}>
            {[false, true].map((dark) => (
                <div key={String(dark)} className="min-w-0 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">{dark ? 'Dunkel' : 'Hell'}</p>
                    <Pane dark={dark} className={className}>
                        {children}
                    </Pane>
                </div>
            ))}
        </div>
    );
}

export function Code({ children }: { children: ReactNode }) {
    return <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.85em]">{children}</code>;
}

/** Tabelle in eigenem Scrollbereich (WCAG 1.4.10: nur Tabellen dürfen waagrecht scrollen). */
export function Table({ head, children, caption }: { head: ReactNode[]; children: ReactNode; caption?: string }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-border" tabIndex={0} role="region" aria-label={caption}>
            <table className="w-full border-collapse text-sm">
                {caption && <caption className="sr-only">{caption}</caption>}
                <thead className="bg-muted text-left">
                    <tr>
                        {head.map((h, i) => (
                            <th key={i} scope="col" className="px-3 py-2 font-medium whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="[&>tr]:border-t [&>tr]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top">{children}</tbody>
            </table>
        </div>
    );
}

export function Swatch({ color, label }: { color: string; label?: string }) {
    return (
        <span className="inline-flex items-center gap-2">
            <span className="inline-block size-6 shrink-0 rounded-sm border border-border" style={{ background: color }} aria-hidden="true" />
            {label && <span className="font-mono text-xs">{label}</span>}
        </span>
    );
}
