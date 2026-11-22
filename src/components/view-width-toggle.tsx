import { useCallback, useEffect, useState } from 'react';
import { cn } from '../lib/cn';
import { IconButton } from './button';
import { ExpandSymbol, LaptopSymbol, Maximize2Symbol, MoveHorizontalSymbol, ShrinkSymbol, SmartphoneSymbol } from './symbols';

/** Seitenbreite der Ansicht (KONZEPT-TOKENS 4.3, #19): Mobil, Darstellungsoptimiert (Vorgabe), Breit, Voll. */
export type ViewWidth = 'mobile' | 'optimized' | 'wide' | 'full';

export const VIEW_WIDTHS: ViewWidth[] = ['mobile', 'optimized', 'wide', 'full'];

export const VIEW_WIDTH_LABELS: Record<ViewWidth, string> = {
    mobile: 'Mobil',
    optimized: 'Darstellungsoptimiert',
    wide: 'Breit',
    full: 'Voll (ganze Breite)',
};

/**
 * Tailwind-Klasse der Seitenbreite je Ansicht. Darstellungsoptimierte Seiten (Detailseite, Konto, Anmeldung,
 * Formulare) nutzen immer `optimized`, auch wenn die Person «Breit» oder «Voll» gewählt hat.
 */
export const VIEW_WIDTH_CLASSES: Record<ViewWidth, string> = {
    mobile: 'max-w-page-mobile',
    optimized: 'max-w-page-optimized',
    wide: 'max-w-page-wide',
    full: 'max-w-none',
};

export const VIEW_WIDTH_STORAGE_KEY = 'eduksx:ansicht';

function readStored(key: string): ViewWidth {
    try {
        const raw = window.localStorage.getItem(key);
        return raw && (VIEW_WIDTHS as string[]).includes(raw) ? (raw as ViewWidth) : 'optimized';
    } catch {
        return 'optimized';
    }
}

/** Gewählte Ansicht lesen und je Browser speichern (Vorgabe «Darstellungsoptimiert»). */
export function useViewWidth(storageKey: string = VIEW_WIDTH_STORAGE_KEY): [ViewWidth, (v: ViewWidth) => void] {
    const [view, setState] = useState<ViewWidth>(() => (typeof window === 'undefined' ? 'optimized' : readStored(storageKey)));
    const set = useCallback(
        (v: ViewWidth) => {
            try {
                window.localStorage.setItem(storageKey, v);
            } catch {
                /* privater Modus: gilt bis zum Neuladen */
            }
            setState(v);
        },
        [storageKey],
    );
    return [view, set];
}

export type ViewWidthToggleProps = {
    value: ViewWidth;
    onChange: (view: ViewWidth) => void;
    label?: string;
    /** Welche Ansichten angeboten werden; «Mobil» lässt sich weglassen, wenn das Modul keine eigene Mobilansicht hat */
    options?: ViewWidth[];
    tooltipSide?: 'top' | 'bottom';
    className?: string;
};

const ICONS: Record<ViewWidth, typeof LaptopSymbol> = {
    mobile: SmartphoneSymbol,
    optimized: LaptopSymbol,
    wide: MoveHorizontalSymbol,
    full: Maximize2Symbol,
};

/**
 * Umschalter der Ansicht (#19, Vorbild Glossary `view-width-tabs`, DEC-023): Symbol-Knöpfe mit `aria-pressed`,
 * `aria-label` und Tooltip. Eigene Symbole, nicht verwechselbar mit «Wie System» beim Farbschema.
 */
export function ViewWidthToggle({ value, onChange, label = 'Ansicht', options = VIEW_WIDTHS, tooltipSide = 'bottom', className }: ViewWidthToggleProps) {
    return (
        <div role="group" aria-label={label} className={cn('inline-flex gap-0.5 rounded-md border border-border bg-background p-0.5', className)}>
            {options.map((v) => {
                const Icon = ICONS[v];
                const active = v === value;
                return (
                    <IconButton
                        key={v}
                        label={VIEW_WIDTH_LABELS[v]}
                        icon={<Icon />}
                        pressed={active}
                        size="icon-sm"
                        variant={active ? 'default' : 'ghost'}
                        tooltipSide={tooltipSide}
                        onClick={() => onChange(v)}
                    />
                );
            })}
        </div>
    );
}

export type FullscreenButtonProps = { tooltipSide?: 'top' | 'bottom'; className?: string };

/**
 * Vollbild ein und aus (#19, Pflicht auf dem Desktop). Escape beendet das Vollbild (Browser). Kann der Browser kein
 * Vollbild (z. B. iPhone), erscheint der Knopf nicht.
 */
export function FullscreenButton({ tooltipSide = 'bottom', className }: FullscreenButtonProps) {
    const [active, setActive] = useState(false);
    const [supported, setSupported] = useState(false);
    useEffect(() => {
        setSupported(typeof document !== 'undefined' && typeof document.documentElement.requestFullscreen === 'function');
        const on = () => setActive(document.fullscreenElement != null);
        document.addEventListener('fullscreenchange', on);
        return () => document.removeEventListener('fullscreenchange', on);
    }, []);
    if (!supported) return null;
    return (
        <IconButton
            label={active ? 'Vollbild beenden' : 'Vollbild'}
            icon={active ? <ShrinkSymbol /> : <ExpandSymbol />}
            size="icon-sm"
            variant="outline"
            tooltipSide={tooltipSide}
            className={className}
            onClick={() => (active ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.())}
        />
    );
}
