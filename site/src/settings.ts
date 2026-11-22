import { useCallback, useEffect, useSyncExternalStore } from 'react';

/**
 * Einstellungen der Vorschau-Leiste (#17, #19, #21). Gespeichert je Browser in localStorage; die eingebettete Seite
 * (Geräte-Ansichten im iframe) hört über das storage-Ereignis mit. Nur Anzeige, ändert nichts für andere.
 */
export type Schema = 'hell' | 'dunkel' | 'system';
export type Ansicht = 'handy' | 'tablet' | 'optimiert' | 'breit' | 'voll';
export type Ausrichtung = 'hoch' | 'quer';
/** Theme der Vorschau (DS11): Standard EduKSX oder ein mitgeliefertes Theme. */
export type Theme = 'eduksx' | 'hoher-kontrast' | 'violett';

type Settings = { schema: Schema; theme: Theme; vergleich: boolean; ansicht: Ansicht; ausrichtung: Ausrichtung };

const PREFIX = 'eduksx-testseite:';
const DEFAULTS: Settings = { schema: 'system', theme: 'eduksx', vergleich: false, ansicht: 'optimiert', ausrichtung: 'hoch' };
const ALLOWED = {
    schema: ['hell', 'dunkel', 'system'],
    theme: ['eduksx', 'hoher-kontrast', 'violett'],
    ansicht: ['handy', 'tablet', 'optimiert', 'breit', 'voll'],
    ausrichtung: ['hoch', 'quer'],
} as const;

/** In der eingebetteten Seite (iframe der Geräte-Ansicht) läuft nur der Inhalt, ohne Vorschau-Leiste. */
export const EMBEDDED = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === '1';

function read<K extends keyof Settings>(key: K): Settings[K] {
    let raw: string | null = null;
    try {
        raw = new URLSearchParams(window.location.search).get(key) ?? window.localStorage.getItem(PREFIX + key);
    } catch {
        raw = null;
    }
    if (key === 'vergleich') return (raw === '1') as Settings[K];
    const allowed = ALLOWED[key as keyof typeof ALLOWED] as readonly string[];
    return (raw && allowed.includes(raw) ? raw : DEFAULTS[key]) as Settings[K];
}

const listeners = new Set<() => void>();
let cache: Settings | null = null;
function snapshot(): Settings {
    if (!cache) cache = { schema: read('schema'), theme: read('theme'), vergleich: read('vergleich'), ansicht: read('ansicht'), ausrichtung: read('ausrichtung') };
    return cache;
}
function emit() {
    cache = null;
    listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => e.key?.startsWith(PREFIX) && emit();
    window.addEventListener('storage', onStorage);
    return () => {
        listeners.delete(listener);
        window.removeEventListener('storage', onStorage);
    };
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    try {
        window.localStorage.setItem(PREFIX + key, key === 'vergleich' ? (value ? '1' : '0') : String(value));
    } catch {
        /* privater Modus: gilt nur bis zum Neuladen */
    }
    // URL-Vorgaben (z. B. ?schema=dunkel) gelten nur beim Öffnen; danach zählt die Wahl in der Leiste.
    const url = new URL(window.location.href);
    if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        window.history.replaceState(null, '', url);
    }
    emit();
}

export function useSettings(): Settings {
    return useSyncExternalStore(subscribe, snapshot, () => DEFAULTS);
}

function prefersDark(): boolean {
    return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** Setzt `.dark` am Wurzelelement. Im Vergleich «Hell und Dunkel» bleibt die Seite hell, die Beispiele zeigen beides. */
export function useApplyScheme() {
    const { schema, vergleich, theme } = useSettings();
    useEffect(() => {
        if (theme === 'eduksx') document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    useEffect(() => {
        const apply = () => {
            const dark = !vergleich && (schema === 'dunkel' || (schema === 'system' && prefersDark()));
            document.documentElement.classList.toggle('dark', dark);
        };
        apply();
        if (schema !== 'system' || typeof window.matchMedia !== 'function') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, [schema, vergleich]);
}

/** Aktuelle Seite aus dem Hash (#/farben). Hash-Routing, weil GitHub Pages keine Umleitungen kennt. */
export function useRoute(fallback: string): [string, (id: string) => void] {
    const get = useCallback(() => window.location.hash.replace(/^#\/?/, '').split('?')[0] || fallback, [fallback]);
    const route = useSyncExternalStore(
        (l) => {
            window.addEventListener('hashchange', l);
            return () => window.removeEventListener('hashchange', l);
        },
        get,
        () => fallback,
    );
    const go = useCallback((id: string) => {
        window.location.hash = `/${id}`;
    }, []);
    return [route, go];
}
