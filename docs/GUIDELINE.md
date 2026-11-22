# GUI-Guideline EduKSX (#28, #43)

Stand: 22.11.2026 · Verantwortlich: Markus Keller · Status: **BESCHLOSSEN** in den Teilen, die auf beschlossene
Konzepte verweisen; Punkte mit **EMPFOHLEN** sind Vorgaben ohne eigenen Entscheid, **ZU PRÜFEN** wird vor der
Umsetzung geklärt (Stufen nach `KONZEPT-VORLAGE.md`).

Diese Guideline sagt, **wann** was eingesetzt wird. Die Werte (Farben, Grössen, Abstände) stehen in
`tokens/tokens.json`, die Regeln dahinter in `KONZEPT-MARKE.md`, `KONZEPT-TOKENS.md` und `KONZEPT-BAUSTEINE.md`,
übergeordnet in KONZEPT-DESIGN (EduKSX-Architektur, DS1–DS13). Bei Widerspruch gelten die Konzepte; ein Widerspruch
wird dort entschieden und hier nachgeführt. Alle Regeln sind auf der Testseite (Seite «Guideline») mit Beispielen
prüfbar.

**Verbindlichkeit:** Alle EduKSX-Module folgen dieser Guideline. Vor einer Abweichung zuerst prüfen, ob die Regel
besser hier für alle Module geändert wird; bleibt sie, wird sie im Modul begründet und im Abweichungsregister
(`KONZEPT-MARKE.md` §8) eingetragen.

## 1. Grundsätze

1. **Barrierefreiheit geht vor** (WCAG 2.1 AA, eCH-0059): alles mit Tastatur bedienbar, sichtbarer Fokus, Kontrast
   geprüft, nichts nur über Farbe.
2. **Eine Quelle:** Farben, Schrift, Abstände nur über Tokens (`bg-primary`, `text-muted-foreground`, `gap-4` …), nie
   feste Werte im Modul. Sonst wirken Themes und Dunkelmodus dort nicht.
3. **Bausteine vor Eigenbau:** Gibt es einen Baustein in `@eduksx/ui`, wird er verwendet. Fehlt einer, wird er hier
   ergänzt, nicht im Modul nachgebaut.
4. **Gleiches sieht gleich aus:** gleiche Funktion, gleiches Symbol, gleicher Text, gleiche Stelle – in allen Modulen.
5. **Hell, dunkel und alle Pflicht-Ansichten** (Handy und Tablet hoch/quer, Darstellungsoptimiert, Breit, Voll) sind
   gleichwertig und werden geprüft.

## 2. Farben: wann welche (BESCHLOSSEN, KONZEPT-MARKE §5)

| Zweck | Token / Tailwind | Regel |
| --- | --- | --- |
| Grundfläche, Text | `bg-background`, `text-foreground` | Standard für Seiten |
| Karten, Dialoge, Menüs | `bg-card` / `bg-popover` mit `*-foreground` | heben sich durch Rahmen `border` und Schatten ab, nicht durch Farbe |
| Nebentext (Hinweise, Metadaten, Datum) | `text-muted-foreground` | nie für Pflichtangaben oder Fehler |
| **Hauptaktion** | `bg-primary` + `text-primary-foreground` (Knopf `default`) | **eine je Bereich** (Formular, Dialog, Seitenkopf) |
| Weitere Aktion mit Gewicht | `secondary` | sparsam, höchstens eine neben der Hauptaktion |
| Hervorhebung beim Darüberfahren, gewählter Eintrag | `accent` | immer zusammen mit Form (Fläche, Rahmen, Fettschrift) |
| Links, Fokus | `text-link`, `ring` | Links immer unterstrichen; Fokusrahmen 2 px |
| Status | `success`, `warning`, `destructive`, `info` (+ `*-soft`) | **immer mit Symbol und Text**, nie durch Markenfarben ersetzt |
| Gefahr (Löschen) | Knopf `destructive` | nur für unumkehrbare Schritte, immer mit Rückfrage |
| Feldrahmen | `border-input` | mind. 3 : 1 zur Fläche |
| Markenfarben | `brand-violet`, `brand-orange`, `brand-blue`, `brand-neutral` | **nur** Wortmarke, Icons, Signets, Diagrammreihen; nie für Text oder Zustände |
| Diagramme | `chart-1` … `chart-5` | Reihenfolge einhalten; Werte zusätzlich beschriften |

- **Orange ist nie Schrift** auf heller Fläche (2,36 : 1) und **nie der einzige Hinweis** auf einen Zustand.
- **Keine Farbe je Modul** (DS6): Module unterscheiden sich über ihr Icon.
- **Themes** (DS11): Mitgeliefert sind EduKSX, Hoher Kontrast und Violett; ein Modul setzt nur `data-theme`, nie
  eigene Farben. Wortmarke und Icons bleiben in jedem Theme in den CI-Farben.

## 3. Bausteine: wann welcher (BESCHLOSSEN, KONZEPT-BAUSTEINE)

| Situation | Baustein | Nicht |
| --- | --- | --- |
| Aktion auslösen (speichern, senden) | `Button` | Link mit `onClick` |
| Zu einer anderen Seite wechseln | Link (`<a>`, bei Bedarf `buttonClasses()`) | `Button` mit Navigation |
| Aktion nur mit Symbol (Werkzeugleiste, Kopfzeile) | `IconButton` (Name + Tooltip Pflicht) | Symbol ohne Namen |
| Zusatzinfo zu einem Bedienelement | `Tooltip` | wichtige Angaben nur im Tooltip |
| Eingabe | `Field` mit `Input`, `Textarea`, `NativeSelect`, `Checkbox` | Platzhalter als Beschriftung |
| Hinweis auf der Seite (bleibt stehen) | `Alert` | Dialog für reine Information |
| Eingabe oder Inhalt im Vordergrund | `Dialog` | Dialog im Dialog |
| Löschen, Unumkehrbares bestätigen | `AlertDialog` (Rückfrage) | Browser-`confirm()` |
| Kurze Rückmeldung nach einer Aktion | `Alert` mit `announce` (Toast folgt später) | Meldung, die nach Sekunden verschwindet, ohne Alternative |
| Daten in Zeilen und Spalten | `Table` | Tabelle für Layout |
| Änderungen eines Eintrags | `HistoryList` (Verlauf) | eigene Verlaufsansicht |
| Kopfzeile | `AppHeader` mit `ModuleSwitcher` | eigene Kopfzeile je Modul |
| Hell / Dunkel / Wie System | `ColorSchemeToggle` (Pflicht, DS8) | Umschalter nur in den Einstellungen |
| Seitenbreite, Vollbild | `ViewWidthToggle`, `FullscreenButton` (Pflicht auf dem Desktop, DS9) | feste Seitenbreite |

- **Knopf-Reihenfolge:** Hauptaktion zuletzt (rechts), «Abbrechen» davor als `outline`. Auf dem Handy untereinander,
  Hauptaktion oben.
- **Symbole:** Lucide für Bedienung, EduKSX-Icons für Module; feste Zuordnungen in `KONZEPT-MARKE.md` §6.2 (DS10).
  Jede Option eines Umschalters hat ein eigenes Symbol.
- **Grössen:** Knöpfe `default` (36 px), in dichten Ansichten `sm` (32 px); Touch-Ziele nie unter 24 × 24 px.

## 4. Seitenaufbau und Layout (BESCHLOSSEN, KONZEPT-DESIGN 6, KONZEPT-TOKENS §3–4)

- **Kopfzeile** auf allen Seiten gleich, von links: Wortmarke des Moduls (oder Logo der Instanz, M3), danach rechts
  Suche, Ansicht, Farbschema, Modulwechsel, Person. Auf dem Handy bricht sie um; die Ansicht entfällt dort.
- **Seitenbreite:** Inhalt zentriert in der gewählten Ansicht (`VIEW_WIDTH_CLASSES`): Darstellungsoptimiert 1152 px
  (Vorgabe), Breit 1536 px, Voll. Detailseiten, Konto, Anmeldung und Formulare bleiben immer bei 1152 px.
- **Lesebreite:** Fliesstext höchstens `max-w-prose` (65 Zeichen); Tabellen, Listen und Kacheln dürfen breiter sein.
- **Raster 4 px.** Abstände: innerhalb eines Bausteins `gap-1`/`gap-2`, zwischen Bausteinen `gap-4`, in Karten
  `p-4`/`p-6`, **zwischen Abschnitten** `gap-6`/`gap-8` (bzw. `space-y-8`). Seitenrand auf dem Handy `p-4`, ab
  Tablet `p-6`, Desktop `p-8`.
- **Seitenkopf:** Titel `typo-h1` (eine `h1` je Seite), darunter ein Satz in `text-muted-foreground`, rechts die
  Hauptaktion der Seite. Überschriften ohne Sprung (h1 → h2 → h3).
- **Seitenleiste** und Desktop-Navigation über die Variante `desk:` (nicht Handy), nicht über `sm:`.
- **Leere Zustände** sagen, warum nichts da ist, und bieten den nächsten Schritt an («Noch keine Begriffe.
  Begriff anlegen»).

## 5. GUI-Profile nach Modul- und Ansichtsart (DS12, Idee #23)

Nicht jede Oberfläche braucht dasselbe. Das Profil ergibt sich aus der **Modulart** und der **Art der Ansicht**; es
ist eine Regel für die Gestaltung, keine Technik (kein Attribut, keine eigenen Tokens).

**Modulart**

| Modulart | Beispiele | Schwerpunkt |
| --- | --- | --- |
| **Intern** (eine Organisation) | Intranet, Stundenplan, Einsatzplanung | angemeldete Personen, häufige Nutzung: Effizienz, Tastenkürzel, Tabellen erlaubt |
| **Öffentlich** | Glossary, Codex | ohne Anmeldung, seltene Nutzung: Lesbarkeit, Suche zuerst, wenig Bedienelemente |
| **Mobil** | Stempeluhr | Handy zuerst, Daumenbedienung: grosse Ziele, eine Aufgabe je Bildschirm |

**Art der Ansicht**

| Ansicht | Zweck | Dichte und Bausteine |
| --- | --- | --- |
| **Webseite** | Inhalte lesen und finden | luftig, Lesebreite, Ansicht Darstellungsoptimiert; Tabellen nur für echte Tabellendaten |
| **Anwendung** | Aufgaben erledigen | normale Dichte, Breit erlaubt; Formulare, Tabellen, Dialoge |
| **Administration** | Einstellungen, Listen, Rechte pflegen | **dichter und komplexer erlaubt**: Knöpfe `sm`, Tabellen mit Filtern, Seitenleiste, Ansicht Breit oder Voll |

**Regeln je Kombination**

| | Webseite | Anwendung | Administration |
| --- | --- | --- | --- |
| **Intern** | Startseite, Mitteilungen: Kacheln und Listen | Kern des Moduls: Tabellen, Formulare | volle Werkzeuge |
| **Öffentlich** | Kern des Moduls: Suche, Lesebreite, kaum Knöpfe | nur für angemeldete Beitragende (z. B. Vorschläge) | nur für Redaktion und Admin |
| **Mobil** | entfällt oder nur Info | eine Aufgabe je Bildschirm, Hauptaktion unten erreichbar, Knöpfe `lg` | auf dem Desktop, nicht mobil optimiert |

Für alle Profile gleich: Kopfzeile, Farben, Bausteine, Texte, Barrierefreiheit und Pflicht-Ansichten. Ein Profil
erlaubt nur, die Dichte und die Auswahl der Bausteine anzupassen.

## 6. Texte und Tonalität (BESCHLOSSEN, KONZEPT-MARKE §10; EMPFOHLEN wo vermerkt)

- **Sprache:** Deutsch für die Schweiz (`de-CH`): «ss» statt «ß», Datum `TT.MM.JJJJ`, Zeit `HH:MM:SS`, Zahlen mit
  Apostroph als Tausendertrennzeichen und Dezimalpunkt (1’250.50, wie `Intl.NumberFormat("de-CH")`).
- **Ton:** sachlich, freundlich, kurz; nicht belehrend, nicht werblich. Fachbegriffe nur, wo sie helfen, sonst
  Alltagssprache.
- **Anrede (EMPFOHLEN):** möglichst ohne direkte Anrede formulieren («Eintrag gespeichert», «Passwort vergessen?»).
  Wo eine Anrede nötig ist, gilt die des Moduls; sie wird im Modul einheitlich gehalten.
- **Knöpfe:** Verb im Infinitiv, möglichst ein Wort («Speichern», «Löschen», «Begriff anlegen»); nie «OK» oder
  «Ja/Nein».
- **Rückfragen:** Titel als Frage mit dem Gegenstand («Begriff löschen?»), Text mit der Folge («Der Begriff und sein
  Verlauf werden gelöscht.»), Knopf mit dem Verb («Löschen»).
- **Fehlermeldungen:** was passiert ist und was zu tun ist, ohne Schuldzuweisung und ohne Technik («Die E-Mail-Adresse
  fehlt ein @. Bitte prüfen.»); Feldfehler direkt beim Feld.
- **Erfolg:** kurz, im Perfekt bzw. Partizip («Gespeichert.»).
- **Leere Zustände und Hinweise:** ein Satz, dann der nächste Schritt.
- **Keine Entscheidnummern, Issue-Nummern oder internen Begriffe** in Anzeigetexten.
- **Status eines Moduls** nur wie freigegeben («In Entwicklung», «Öffentliche Beta» mit Datum); keine erfundenen
  Termine oder Funktionsversprechen.
- **Übersetzung:** Im Code stehen deutsche Texte; übersetzt werden auch Tooltips, Platzhalter, `aria-label` und `alt`.
  Daten (Namen, Titel, Inhalte) werden nicht übersetzt und mit `translate="no"` geschützt.

## 7. Prüfen vor dem Merge

- Testseite bzw. Modul in allen Pflicht-Ansichten, hell und dunkel, in jedem mitgelieferten Theme angeschaut.
- Nur mit Tastatur bedienbar, Fokus immer sichtbar, Zoom 200 % ohne waagrechtes Scrollen (ausser Tabellen).
- `npm run check`: Kontrastprüfung und axe-core («serious»/«critical» lassen die CI scheitern, DS7).
- Texte nach §6, Knöpfe nach §3, Farben nach §2.

## 8. Verlauf

- 22.11.2026: Angelegt (#28) mit GUI-Profilen (#43, DS12).
