import { formatDateTime } from '../lib/format';

/** Eintrag der Historie nach DB-Standard A7 (`data_changes`). */
export type HistoryEntry = {
    event_id: string;
    action: 'created' | 'updated' | 'deleted' | 'restored';
    occurred_at: string;
    actor_label?: string | null;
    source?: string;
    /** Feld → alter/neuer Wert; bei personenbezogenen und geheimen Feldern nur «changed» (DB B2). */
    changes?: Record<string, { old: unknown; new: unknown } | 'changed'>;
};

export type HistoryListProps = {
    entries: HistoryEntry[];
    /** Deutsche Begriffe der Felder (DB A8), z. B. { short_description: 'Kurzbeschreibung' }. */
    fieldLabels?: Record<string, string>;
    timeZone?: string;
};

export const ACTION_LABELS: Record<HistoryEntry['action'], string> = {
    created: 'angelegt',
    updated: 'geändert',
    deleted: 'gelöscht',
    restored: 'wiederhergestellt',
};

const SOURCE_LABELS: Record<string, string> = {
    web: 'Website',
    api: 'API',
    import: 'Import',
    mcp: 'KI-Assistent',
    job: 'Hintergrundauftrag',
    system: 'System',
    migration: 'Migration',
    restore: 'Wiederherstellung',
};

function show(value: unknown): string {
    if (value === null || value === undefined || value === '') return '–';
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
}

/** Ansicht «Verlauf» – gleich in allen Modulen (KONZEPT-DESIGN 4, DB A7). */
export function HistoryList({ entries, fieldLabels = {}, timeZone }: HistoryListProps) {
    if (entries.length === 0) return <p className="text-sm text-muted-foreground">Noch keine Änderungen.</p>;
    return (
        <ol className="space-y-3">
            {entries.map((e) => (
                <li key={e.event_id} className="rounded-md border border-border p-3">
                    <p className="text-sm">
                        <time dateTime={e.occurred_at} className="font-medium">
                            {formatDateTime(e.occurred_at, timeZone)}
                        </time>{' '}
                        · {ACTION_LABELS[e.action]}
                        {e.actor_label && <> · {e.actor_label}</>}
                        {e.source && <span className="text-muted-foreground"> · {SOURCE_LABELS[e.source] ?? e.source}</span>}
                    </p>
                    {e.changes && Object.keys(e.changes).length > 0 && (
                        <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-sm">
                            {Object.entries(e.changes).map(([field, change]) => (
                                <div key={field} className="contents">
                                    <dt className="text-muted-foreground">{fieldLabels[field] ?? field}</dt>
                                    <dd>
                                        {change === 'changed' ? (
                                            'geändert (Wert wird nicht angezeigt)'
                                        ) : (
                                            <>
                                                <del className="text-muted-foreground">
                                                    <span className="sr-only">vorher: </span>
                                                    {show(change.old)}
                                                </del>{' '}
                                                <span aria-hidden="true">→</span>{' '}
                                                <ins className="no-underline">
                                                    <span className="sr-only">nachher: </span>
                                                    {show(change.new)}
                                                </ins>
                                            </>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </li>
            ))}
        </ol>
    );
}
