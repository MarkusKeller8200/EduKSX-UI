import { useCallback, useEffect, useState } from 'react';
import { cn } from '../lib/cn';
import { IconButton } from './button';
import { MoonSymbol, SunMoonSymbol, SunSymbol } from './symbols';

/** Farbschema der Person: hell, dunkel oder wie das Betriebssystem (Vorgabe). */
export type ColorScheme = 'light' | 'dark' | 'system';

export const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark', 'system'];

export const COLOR_SCHEME_LABELS: Record<ColorScheme, string> = {
    light: 'Hell',
    dark: 'Dunkel',
    system: 'Wie System',
};

/** Schlüssel in localStorage; gleich in allen Modulen, damit die Wahl je Browser und Adresse erhalten bleibt. */
export const COLOR_SCHEME_STORAGE_KEY = 'eduksx:farbschema';

function prefersDark(): boolean {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** Löst «Wie System» auf: `true`, wenn dunkel gezeichnet wird. */
export function resolveDark(scheme: ColorScheme): boolean {
    return scheme === 'dark' || (scheme === 'system' && prefersDark());
}

function readStored(key: string): ColorScheme {
    try {
        const raw = window.localStorage.getItem(key);
        return raw && (COLOR_SCHEMES as string[]).includes(raw) ? (raw as ColorScheme) : 'system';
    } catch {
        return 'system';
    }
}

/**
 * Farbschema lesen, speichern und anwenden (#17): setzt bzw. entfernt die Klasse `.dark` am Wurzelelement und
 * `color-scheme`, folgt bei «Wie System» Änderungen des Betriebssystems. Vorgabe «Wie System».
 */
export function useColorScheme(storageKey: string = COLOR_SCHEME_STORAGE_KEY): [ColorScheme, (s: ColorScheme) => void] {
    const [scheme, setState] = useState<ColorScheme>(() => (typeof window === 'undefined' ? 'system' : readStored(storageKey)));

    useEffect(() => {
        const root = document.documentElement;
        const apply = () => {
            const dark = resolveDark(scheme);
            root.classList.toggle('dark', dark);
            root.style.colorScheme = dark ? 'dark' : 'light';
        };
        apply();
        if (scheme !== 'system' || typeof window.matchMedia !== 'function') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, [scheme]);

    const set = useCallback(
        (s: ColorScheme) => {
            try {
                window.localStorage.setItem(storageKey, s);
            } catch {
                /* privater Modus: gilt bis zum Neuladen */
            }
            setState(s);
        },
        [storageKey],
    );
    return [scheme, set];
}

export type ColorSchemeToggleProps = {
    value: ColorScheme;
    onChange: (scheme: ColorScheme) => void;
    /** Name der Gruppe für Bildschirmleser */
    label?: string;
    tooltipSide?: 'top' | 'bottom';
    className?: string;
};

const ICONS: Record<ColorScheme, typeof SunSymbol> = { light: SunSymbol, dark: MoonSymbol, system: SunMoonSymbol };

/**
 * Umschalter Hell / Dunkel / Wie System mit Symbolen Sonne, Mond und Sonne-Mond (#17, Vorbild Glossary
 * `appearance-tabs`). Drei Symbol-Knöpfe mit `aria-pressed`, `aria-label` und Tooltip; Platz in der Kopfzeile rechts.
 */
export function ColorSchemeToggle({ value, onChange, label = 'Farbschema', tooltipSide = 'bottom', className }: ColorSchemeToggleProps) {
    return (
        <div role="group" aria-label={label} className={cn('inline-flex gap-0.5 rounded-md border border-border bg-background p-0.5', className)}>
            {COLOR_SCHEMES.map((s) => {
                const Icon = ICONS[s];
                const active = s === value;
                return (
                    <IconButton
                        key={s}
                        label={COLOR_SCHEME_LABELS[s]}
                        icon={<Icon />}
                        pressed={active}
                        size="icon-sm"
                        variant={active ? 'default' : 'ghost'}
                        tooltipSide={tooltipSide}
                        onClick={() => onChange(s)}
                    />
                );
            })}
        </div>
    );
}
