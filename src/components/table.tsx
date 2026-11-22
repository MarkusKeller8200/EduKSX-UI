import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { ArrowDownSymbol, ArrowUpSymbol, ChevronsUpDownSymbol } from './symbols';

/*
 * Baustein 3.1 «Tabellen», Teil «Einfache Tabelle für kurze Listen». Die bearbeitbare Tabelle (Filter, Spaltenwahl,
 * Excel-Bedienung) folgt später als eigener Baustein. Echte Tabellen-Elemente, damit Bildschirmleser Zeilen und
 * Spalten ansagen; zu breite Tabellen scrollen in ihrem Bereich (WCAG 1.4.10), nicht die ganze Seite.
 */

export type TableProps = HTMLAttributes<HTMLTableElement> & {
    /**
     * Name des Scrollbereichs. Gesetzt, wird der Bereich mit Tab erreichbar (Pfeiltasten scrollen) und als Region
     * angesagt – nötig, wenn die Tabelle breiter als der Bildschirm werden kann.
     */
    scrollLabel?: string;
};

export function Table({ className, scrollLabel, ...rest }: TableProps) {
    return (
        <div
            data-slot="table-container"
            className="relative w-full overflow-x-auto rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            {...(scrollLabel ? { role: 'region', 'aria-label': scrollLabel, tabIndex: 0 } : {})}
        >
            <table data-slot="table" className={cn('w-full caption-bottom border-collapse text-sm', className)} {...rest} />
        </div>
    );
}

/** Titel der Tabelle; Vorgabe oben und sichtbar (für Bildschirmleser der Name der Tabelle). */
export function TableCaption({ className, ...rest }: HTMLAttributes<HTMLTableCaptionElement>) {
    return <caption data-slot="table-caption" className={cn('caption-top pb-2 text-left text-sm font-medium text-foreground', className)} {...rest} />;
}

export function TableHeader({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
    return <thead data-slot="table-header" className={cn('[&_tr]:border-b [&_tr]:border-border [&_tr]:hover:bg-transparent', className)} {...rest} />;
}

export function TableBody({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
    return <tbody data-slot="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...rest} />;
}

export function TableFooter({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
    return <tfoot data-slot="table-footer" className={cn('border-t border-border bg-muted font-medium', className)} {...rest} />;
}

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
    /** Gewählte Zeile: Fläche und Balken links (nicht nur Farbe), `aria-selected` */
    selected?: boolean;
};

export function TableRow({ className, selected, ...rest }: TableRowProps) {
    return (
        <tr
            data-slot="table-row"
            data-state={selected ? 'selected' : undefined}
            aria-selected={selected}
            className={cn(
                'border-b border-border transition-colors hover:bg-muted',
                selected && 'bg-accent text-accent-foreground shadow-[inset_3px_0_0_var(--ring)] hover:bg-accent',
                className,
            )}
            {...rest}
        />
    );
}

export type SortDirection = 'asc' | 'desc' | 'none';

export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement> & {
    /** Zahlen rechtsbündig mit gleich breiten Ziffern */
    numeric?: boolean;
    /** Sortierbare Spalte: aktuelle Richtung; mit `onSort` wird der Kopf ein Knopf und setzt `aria-sort`. */
    sort?: SortDirection;
    onSort?: () => void;
};

const SORT_ARIA = { asc: 'ascending', desc: 'descending', none: 'none' } as const;

export function TableHead({ className, numeric, sort, onSort, children, scope = 'col', ...rest }: TableHeadProps) {
    const sortable = sort !== undefined && onSort !== undefined;
    const SortIcon = sort === 'asc' ? ArrowUpSymbol : sort === 'desc' ? ArrowDownSymbol : ChevronsUpDownSymbol;
    return (
        <th
            data-slot="table-head"
            scope={scope}
            aria-sort={sortable ? SORT_ARIA[sort] : undefined}
            className={cn('h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground', numeric && 'text-right', className)}
            {...rest}
        >
            {sortable ? (
                <button
                    type="button"
                    onClick={onSort}
                    className={cn(
                        '-mx-1 inline-flex cursor-pointer items-center gap-1 rounded-sm px-1 py-0.5 hover:bg-accent hover:text-accent-foreground',
                        'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring',
                        numeric && 'flex-row-reverse',
                    )}
                >
                    {children}
                    <SortIcon className={cn('size-4', sort === 'none' ? 'text-muted-foreground' : 'text-foreground')} />
                </button>
            ) : (
                children
            )}
        </th>
    );
}

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean };

export function TableCell({ className, numeric, ...rest }: TableCellProps) {
    return <td data-slot="table-cell" className={cn('p-2 align-middle', numeric && 'text-right tabular-nums', className)} {...rest} />;
}

/** Leere Tabelle: eine Zeile über alle Spalten mit Hinweis. */
export function TableEmpty({ colSpan, children = 'Keine Einträge.' }: { colSpan: number; children?: ReactNode }) {
    return (
        <tr data-slot="table-empty">
            <td colSpan={colSpan} className="p-6 text-center text-sm text-muted-foreground">
                {children}
            </td>
        </tr>
    );
}
