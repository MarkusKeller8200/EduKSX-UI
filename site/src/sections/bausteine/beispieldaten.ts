import { EDUKSX_ICON_NAMES } from '../../../../src/components/eduksx-icon';
import { eduksxIcons } from '../../../../src/components/eduksx-icons.data';
import type { HistoryEntry } from '../../../../src/components/history-list';
import type { ModuleLink } from '../../../../src/components/module-switcher';

// Nur erfundene Beispieldaten, keine echten Personen (AGENTS.md).
const svg = import.meta.glob('../../../../icons/svg/*-color.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const iconUrl = (key: string) => Object.entries(svg).find(([k]) => k.endsWith(`/${key === 'eduksx' ? 'eduksx' : `eduksx-${key}`}-color.svg`))?.[1];

export const MODULES: ModuleLink[] = EDUKSX_ICON_NAMES.filter((n) => ['intranet', 'glossary', 'codex', 'timetable', 'staffing', 'ident'].includes(n)).map((n) => ({
    key: n,
    name: eduksxIcons[n].name,
    url: '#/module-switcher',
    icon: iconUrl(n),
}));

export const HISTORY: HistoryEntry[] = [
    {
        event_id: 'e3',
        action: 'updated',
        occurred_at: '2026-11-22T14:05:00Z',
        actor_label: 'Beispiel Person',
        source: 'web',
        changes: { short_description: { old: 'Absenz', new: 'Absenz (entschuldigt)' }, email: 'changed' },
    },
    { event_id: 'e2', action: 'restored', occurred_at: '2026-11-20T08:30:00Z', actor_label: 'System', source: 'restore' },
    { event_id: 'e1', action: 'created', occurred_at: '2026-11-18T10:00:00Z', actor_label: 'Import Schuljahr', source: 'import', changes: { title: { old: null, new: 'Absenz' } } },
];
