import type { Ansicht, Ausrichtung } from './settings';

/** Gerätegrössen der Pflicht-Ansichten (Idee #19), CSS-Pixel. Handy: gängige Mittelklasse, Tablet: 10-Zoll-Tablet. */
export const DEVICE_SIZE: Record<'handy' | 'tablet', { w: number; h: number }> = {
    handy: { w: 390, h: 844 },
    tablet: { w: 820, h: 1180 },
};

export function deviceFrame(ansicht: Ansicht, ausrichtung: Ausrichtung): { w: number; h: number } | null {
    if (ansicht !== 'handy' && ansicht !== 'tablet') return null;
    const s = DEVICE_SIZE[ansicht];
    return ausrichtung === 'hoch' ? s : { w: s.h, h: s.w };
}

export const DEVICES = [
    { label: 'Handy hoch', size: '390 × 844', check: 'Navigation als Menü, nichts läuft waagrecht über, Touch-Ziele mind. 24 × 24 px' },
    { label: 'Handy quer', size: '844 × 390', check: 'Bleibt Handy-Bedienung (desk nicht aktiv), Kopfzeile frisst nicht die Höhe' },
    { label: 'Tablet hoch', size: '820 × 1180', check: 'Breakpoint md aktiv, H1 30 px' },
    { label: 'Tablet quer', size: '1180 × 820', check: 'Breakpoint lg aktiv, Seitenleiste sichtbar' },
    { label: 'Darstellungsoptimiert', size: 'höchstens 1152 px', check: 'Standard: Inhalt zentriert, Lesebreite eingehalten' },
    { label: 'Breit', size: 'höchstens 1536 px', check: 'Listen und Tabellen nutzen die Breite, Formulare bleiben schmal' },
    { label: 'Voll', size: 'ganze Fensterbreite, optional Vollbild', check: 'Nichts dehnt sich unlesbar breit, Fliesstext bleibt auf Lesebreite' },
];
