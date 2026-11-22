/**
 * GUI-Tester (DS13, #44): Versionen, Status, Überarbeitungen und Wünsche je Baustein. Regeln aus dem INTRANET
 * (docs/UEBERNAHME-INTRANET-GUI.md §3): Status Entwicklung → Prüfung → Freigegeben, SemVer je Baustein (Korrektur
 * x.x.+1, Erweiterung x.+1.0, grundlegend neu +1.0.0), höchstens eine offene Version; bis zur nächsten Freigabe bleibt die
 * zuletzt freigegebene verbindlich, ältere gelten als «abgelöst». Jeder Schritt mit Datum, Person und Bemerkung.
 *
 * Gepflegt wird hier im Code (Pull Request = Nachweis). Wünsche sind GitHub-Issues mit Label «idee» und dem
 * Baustein im Titel; nach einer Freigabe stehen die Seiten der Module, die nachgezogen werden müssen, unter
 * `ueberarbeiten`.
 */
export type VersionStatus = 'entwicklung' | 'pruefung' | 'freigegeben' | 'abgeloest';

export const VERSION_STATUS_LABELS: Record<VersionStatus, string> = {
    entwicklung: 'Entwicklung',
    pruefung: 'Prüfung',
    freigegeben: 'Freigegeben',
    abgeloest: 'Abgelöst',
};

export type Schritt = { datum: string; person: string; status: VersionStatus; bemerkung: string };
export type Version = { version: string; status: VersionStatus; issues: number[]; verlauf: Schritt[]; wuensche?: number[] };
export type Ueberarbeitung = { modul: string; seite: string; erledigt: boolean };
export type BausteinStand = { versionen: Version[]; ueberarbeiten?: Ueberarbeitung[] };

const start = (issues: number[], bemerkung: string): BausteinStand => ({
    versionen: [
        {
            version: '1.0.0',
            status: 'pruefung',
            issues,
            verlauf: [
                { datum: '22.11.2026', person: 'Markus Keller', status: 'entwicklung', bemerkung },
                { datum: '22.11.2026', person: 'Markus Keller', status: 'pruefung', bemerkung: 'Zur Prüfung auf der Testseite (Beta-Test).' },
            ],
        },
    ],
});

/** Stand je Baustein-Seite (Schlüssel = id im Inhaltsverzeichnis). */
export const BAUSTEIN_STAND: Record<string, BausteinStand> = {
    'brand-wordmark': start([5], 'Wortmarke als Text mit Farbsegmenten nach CI.'),
    'eduksx-icon': start([31, 30], 'Icon-Set im Code, Farben über Markentokens.'),
    'app-header': start([6], 'Gemeinsame Kopfzeile mit Modulwechsel.'),
    'module-switcher': start([6, 12], 'Modulwechsel als Disclosure; schliesst bei Fokusverlust.'),
    'history-list': start([7, 13], 'Ansicht «Verlauf» nach DB A7, mit vorher/nachher für Bildschirmleser.'),
    button: start([27], 'Varianten und Grössen wie shadcn/ui, Zustände über Tokens.'),
    tooltip: start([27], 'Tooltip nach WCAG 1.4.13.'),
    formularfelder: start([27], 'Field mit Beschriftung, Hinweis und Fehler.'),
    tabelle: start([27], 'Einfache Tabelle mit Sortierknopf.'),
    dialog: start([27], 'Dialog und Rückfrage auf dem nativen <dialog>.'),
    hinweisbox: start([27, 11], 'Hinweisbox Info, Erfolg, Warnung, Fehler.'),
};

/** Verbindliche Version (zuletzt freigegeben) und offene Version (in Entwicklung oder Prüfung). */
export function stand(id: string): { verbindlich?: Version; offen?: Version; versionen: Version[]; ueberarbeiten: Ueberarbeitung[] } {
    const s = BAUSTEIN_STAND[id];
    if (!s) return { versionen: [], ueberarbeiten: [] };
    return {
        verbindlich: s.versionen.find((v) => v.status === 'freigegeben'),
        offen: s.versionen.find((v) => v.status === 'entwicklung' || v.status === 'pruefung'),
        versionen: s.versionen,
        ueberarbeiten: s.ueberarbeiten ?? [],
    };
}
