import type { ComponentType } from 'react';
import type { Status } from './ui';
import { Farben } from './sections/farben';
import { Kontrast } from './sections/kontrast';
import { Typografie } from './sections/typografie';
import { Abstaende } from './sections/abstaende';
import { Ansichten } from './sections/ansichten';
import { Animation } from './sections/animation';
import { Wortmarken } from './sections/wortmarken';
import { Icons } from './sections/icons';
import { BrandWordmarkSeite } from './sections/bausteine/brand-wordmark';
import { EduksxIconSeite } from './sections/bausteine/eduksx-icon';
import { AppHeaderSeite } from './sections/bausteine/app-header';
import { ModuleSwitcherSeite } from './sections/bausteine/module-switcher';
import { HistoryListSeite } from './sections/bausteine/history-list';
import { ColorSchemeToggleSeite } from './sections/bausteine/color-scheme-toggle';
import { ViewWidthToggleSeite } from './sections/bausteine/view-width-toggle';
import { ButtonSeite } from './sections/bausteine/button';
import { TooltipSeite } from './sections/bausteine/tooltip';
import { FieldSeite } from './sections/bausteine/field';
import { TableSeite } from './sections/bausteine/table';
import { DialogSeite } from './sections/bausteine/dialog';
import { AlertSeite } from './sections/bausteine/alert';
import { Schriftgewichte } from './sections/pruefseiten';

export type Group = 'Grundlagen' | 'Marke' | 'Bausteine' | 'Prüfseiten';
export const GROUPS: Group[] = ['Grundlagen', 'Marke', 'Bausteine', 'Prüfseiten'];

/**
 * Inhaltsverzeichnis der Testseite. Eine Zeile je Seite; neue Bausteine (#27) bekommen eine Datei unter
 * site/src/sections/bausteine/ und hier einen Eintrag in der Gruppe «Bausteine» (Anleitung: docs/TESTSEITE.md).
 */
export type Entry = {
    /** Pfad in der Adresse (#/<id>), klein, mit Bindestrich */
    id: string;
    title: string;
    group: Group;
    status: Status;
    /** Ein Satz: was die Seite zeigt bzw. wofür der Baustein da ist */
    summary: string;
    /** Massgebliches Konzept: Pfad in diesem Repo oder volle Adresse (anderes Repo), dazu Abschnitt */
    concept: { path: string; label: string };
    issues: number[];
    Page: ComponentType;
};

export const ENTRIES: Entry[] = [
    { id: 'farben', title: 'Farben', group: 'Grundlagen', status: 'freigegeben', summary: 'Alle Farb-Tokens hell und dunkel mit Wert und Verwendung.', concept: { path: 'docs/KONZEPT-MARKE.md', label: 'KONZEPT-MARKE §5' }, issues: [3], Page: Farben },
    { id: 'kontrast', title: 'Kontrast', group: 'Grundlagen', status: 'freigegeben', summary: 'Prüfpaare Schrift/Fläche 4,5 : 1 und Linien/Fokus 3 : 1, hell und dunkel nachgerechnet.', concept: { path: 'docs/KONZEPT-MARKE.md', label: 'KONZEPT-MARKE §5.2' }, issues: [4, 11], Page: Kontrast },
    { id: 'typografie', title: 'Typografie', group: 'Grundlagen', status: 'freigegeben', summary: 'Schriften Inter und JetBrains Mono (M6), Gewichte (M7), Grössen und Textrollen (T1, T2).', concept: { path: 'docs/KONZEPT-TOKENS.md', label: 'KONZEPT-TOKENS §2' }, issues: [25], Page: Typografie },
    { id: 'abstaende', title: 'Abstände, Radien, Schatten', group: 'Grundlagen', status: 'freigegeben', summary: '4-px-Raster, fünf Radien und vier Schatten (im Dunkelmodus kräftiger).', concept: { path: 'docs/KONZEPT-TOKENS.md', label: 'KONZEPT-TOKENS §3' }, issues: [26], Page: Abstaende },
    { id: 'ansichten', title: 'Breakpoints und Ansichten', group: 'Grundlagen', status: 'entwicklung', summary: 'Breakpoints, Variante desk, Seitenbreiten und die Pflicht-Ansichten Handy, Tablet und Desktop.', concept: { path: 'docs/KONZEPT-TOKENS.md', label: 'KONZEPT-TOKENS §4' }, issues: [26, 19], Page: Ansichten },
    { id: 'animation', title: 'Animation', group: 'Grundlagen', status: 'freigegeben', summary: 'Dauern und Kurven, weniger Bewegung auf Wunsch (WCAG 2.3.3).', concept: { path: 'docs/KONZEPT-TOKENS.md', label: 'KONZEPT-TOKENS §5' }, issues: [26], Page: Animation },
    { id: 'wortmarken', title: 'Wortmarken und Schreibweisen', group: 'Marke', status: 'freigegeben', summary: 'EduKSX, EduKSX-<Begriff> und MarKusSXCH mit Farbsegmenten, Grössen und Signatur.', concept: { path: 'docs/KONZEPT-MARKE.md', label: 'KONZEPT-MARKE §3' }, issues: [5], Page: Wortmarken },
    { id: 'icons', title: 'Icons', group: 'Marke', status: 'freigegeben', summary: 'Freigegebenes Icon-Set: farbig, einfarbig, Kachel hell und dunkel, Dateien im Paket.', concept: { path: 'docs/KONZEPT-MARKE.md', label: 'KONZEPT-MARKE §6' }, issues: [31, 30], Page: Icons },
    { id: 'brand-wordmark', title: 'BrandWordmark', group: 'Bausteine', status: 'beta', summary: 'Wortmarke als Text mit Farbsegmenten, ein Name für Bildschirmleser.', concept: { path: 'docs/KONZEPT-MARKE.md', label: 'KONZEPT-MARKE §3.3' }, issues: [5], Page: BrandWordmarkSeite },
    { id: 'eduksx-icon', title: 'EduksxIcon', group: 'Bausteine', status: 'beta', summary: 'Icons im Code, Farben über die Markentokens.', concept: { path: 'docs/KONZEPT-MARKE.md', label: 'KONZEPT-MARKE §6.1' }, issues: [31], Page: EduksxIconSeite },
    { id: 'app-header', title: 'AppHeader', group: 'Bausteine', status: 'beta', summary: 'Gemeinsame Kopfzeile aller Module mit Wortmarke und Modulwechsel.', concept: { path: 'https://github.com/MarkusKeller8200/EduKSX-Architektur/blob/main/docs/KONZEPT-DESIGN.md', label: 'KONZEPT-DESIGN 6, Plattform S7' }, issues: [6], Page: AppHeaderSeite },
    { id: 'module-switcher', title: 'ModuleSwitcher', group: 'Bausteine', status: 'beta', summary: 'Modulwechsel als Knopf mit Liste, per Tastatur bedienbar.', concept: { path: 'https://github.com/MarkusKeller8200/EduKSX-Architektur/blob/main/docs/KONZEPT-DESIGN.md', label: 'KONZEPT-DESIGN 6, Plattform S7' }, issues: [6, 12], Page: ModuleSwitcherSeite },
    { id: 'history-list', title: 'HistoryList', group: 'Bausteine', status: 'beta', summary: 'Ansicht «Verlauf», gleich in allen Modulen (DB A7).', concept: { path: 'https://github.com/MarkusKeller8200/EduKSX-Architektur/blob/main/docs/KONZEPT-DESIGN.md', label: 'KONZEPT-DESIGN 4, DB A7' }, issues: [7, 13], Page: HistoryListSeite },
    { id: 'farbschema', title: 'ColorSchemeToggle', group: 'Bausteine', status: 'beta', summary: 'Umschalter Hell / Dunkel / Wie System mit Symbolen, Pflicht in allen Modulen.', concept: { path: 'https://github.com/MarkusKeller8200/EduKSX-Architektur/blob/main/docs/KONZEPT-DESIGN.md', label: 'KONZEPT-DESIGN 5, 6' }, issues: [17], Page: ColorSchemeToggleSeite },
    { id: 'ansicht', title: 'ViewWidthToggle', group: 'Bausteine', status: 'beta', summary: 'Umschalter der Ansicht Mobil / Darstellungsoptimiert / Breit / Voll und Vollbild.', concept: { path: 'docs/KONZEPT-TOKENS.md', label: 'KONZEPT-TOKENS 4.3' }, issues: [19], Page: ViewWidthToggleSeite },
    { id: 'button', title: 'Button', group: 'Bausteine', status: 'beta', summary: 'Haupt-, Neben-, Umriss-, Text-, Gefahr-Knopf und Link, Symbol-Knöpfe mit Tooltip.', concept: { path: 'docs/KONZEPT-BAUSTEINE.md', label: 'KONZEPT-BAUSTEINE §2.1' }, issues: [27], Page: ButtonSeite },
    { id: 'tooltip', title: 'Tooltip', group: 'Bausteine', status: 'beta', summary: 'Zusatzinfo beim Darüberfahren und beim Fokus (WCAG 1.4.13).', concept: { path: 'docs/KONZEPT-BAUSTEINE.md', label: 'KONZEPT-BAUSTEINE §2.2' }, issues: [27], Page: TooltipSeite },
    { id: 'formularfelder', title: 'Formularfelder', group: 'Bausteine', status: 'beta', summary: 'Field mit Beschriftung, Hinweis und Fehler; Input, Textarea, NativeSelect, Checkbox.', concept: { path: 'docs/KONZEPT-BAUSTEINE.md', label: 'KONZEPT-BAUSTEINE §2.3' }, issues: [27], Page: FieldSeite },
    { id: 'tabelle', title: 'Tabelle', group: 'Bausteine', status: 'beta', summary: 'Einfache Tabelle mit Sortierknopf, Auswahl, Zahlenspalten und leerem Zustand.', concept: { path: 'docs/KONZEPT-BAUSTEINE.md', label: 'KONZEPT-BAUSTEINE §2.4' }, issues: [27], Page: TableSeite },
    { id: 'dialog', title: 'Dialog und Rückfrage', group: 'Bausteine', status: 'beta', summary: 'Dialog und Rückfrage (AlertDialog) auf dem nativen <dialog>.', concept: { path: 'docs/KONZEPT-BAUSTEINE.md', label: 'KONZEPT-BAUSTEINE §2.5' }, issues: [27], Page: DialogSeite },
    { id: 'hinweisbox', title: 'Hinweisbox', group: 'Bausteine', status: 'beta', summary: 'Info, Erfolg, Warnung und Fehler, immer mit Symbol und Text.', concept: { path: 'docs/KONZEPT-BAUSTEINE.md', label: 'KONZEPT-BAUSTEINE §2.7' }, issues: [27, 11], Page: AlertSeite },
    { id: 'schriftgewichte', title: 'Schriftgewichte (M7)', group: 'Prüfseiten', status: 'freigegeben', summary: 'Vergleich der Inter-Gewichte, Grundlage von Entscheid M7.', concept: { path: 'docs/KONZEPT-MARKE.md', label: 'KONZEPT-MARKE §3.4' }, issues: [], Page: Schriftgewichte },
];
