# Übernahme aus dem INTRANET: GUI-Regeln und Bausteine (#21)

Stand: 2026-11-22 · Status: **ENTWURF**

Festgehalten aus dem Projekt INTRANET (Stand Version 0.30/0.31), weil das INTRANET später nicht mehr zur Verfügung
steht. Darum gibt es hier **keine Links** dorthin; die Regeln sind ausformuliert. Dieses Dokument ist eine
**Quelle für das GUI-Konzept, kein Beschluss**: Alle Aussagen haben die Stufe **EMPFOHLEN**, bis sie beim Sichten von
#21 als DS-Entscheid in `KONZEPT-DESIGN.md` (EduKSX-Architektur) übernommen sind.

Verwandte Ideen: #15 (Musterseite der Bausteine, DS7), #17 (Hell / Dunkel / System), #18 (Built-in-Themes),
#19 (Testumgebung mit Pflicht-Ansichten), #20 (Icon-Konzept).

**Übernommen:** Einstellungen › Erscheinungsbild, unter «Prototyp» das Farbkonzept mit Themes und die GUI-relevanten
Teile des Sprachkonzepts (Entscheid Markus, 22.11.2026), die GUI-Prototypen mit allen Bausteinen.
**Nicht übernommen:** Technik und Dateipfade des INTRANET (Laravel, Sammlungen, Controller); Namen und Beispiele der
Schule sind neutralisiert.

## 1. Erscheinungsbild (White-Labeling, pro Instanz)

- **Marke** links oben und auf der Anmeldeseite, eine von zwei (M3 in `KONZEPT-MARKE.md`, BESCHLOSSEN 22.11.2026):
  - **EduKSX** (Vorgabe): Produkt-Wortmarke und das freigegebene Produkt-Icon.
  - **Eigenes Logo** der Instanz, ersetzt die Wortmarke.
  - Die dritte Wahl des INTRANET, **MarKusSXCH** als Produktmarke, wird **nicht** übernommen: MarKusSXCH erscheint nur
    in der Signatur «Developed by MarKusSXCH» (abschaltbar, M4).
- Eigenes Logo: drei Dateien, **Logo für hellen Hintergrund**, optional **Logo für dunklen Hintergrund** und
  **Signet (quadratisch)**. Erlaubt SVG, PNG, JPEG, WebP, höchstens 1 MB je Datei. Ohne eigenes Logo gilt EduKSX.
- **Name der Instanz** ist einstellbar.
- **Symbolsatz** wählbar: EduKSX-Symbole (Vorgabe) oder Standard-Symbole (Lucide).
- Wortmarken werden als **Text mit Farbsegmenten** gezeichnet (CI), nicht als Bild.
- Logo und Signet sind auch **ohne Anmeldung** abrufbar (Anmeldeseite, App-Manifest).
- Das Theme wird nicht hier gewählt, sondern im Farbkonzept (Abschnitt 2); die Seite zeigt nur, welches aktiv ist.

## 2. Farbkonzept und Themes

Ein Theme ist ein **Farbsatz für hell und dunkel**. So lassen sich Varianten (z. B. Hoher Kontrast, Farben eines
Standorts) ausprobieren, ohne den Code zu ändern.

### Bedienung (nur Administration)

- **Liste der Themes** mit Farbmustern hell/dunkel und den Kennzeichen «aktiv» und «Vorgabe».
  - **Vorschau:** färbt nur die Seite Farbkonzept und nur für mich, nichts wird gespeichert; unten eine Musterseite
    hell und dunkel.
  - **Für alle aktivieren:** gilt sofort in der ganzen Anwendung, für alle Personen, hell und dunkel.
  - **Bearbeiten**, **Kopieren**, **Löschen** (mit Rückfrage). Wird das aktive Theme gelöscht, gilt wieder der
    Standard.
  - **Neues Theme:** leer oder aus einer Vorlage (im INTRANET: Hoher Kontrast, Petrol, Violett).
- **Theme bearbeiten:** Name, Beschreibung, Farben in Gruppen (Marke & Hauptfarbe, Flächen & Text, Akzent & Neben,
  Status, Seitenleiste, Diagramme, Glossar-Begriffe), je hell und dunkel, mit Farbwähler oder `#rrggbb`.
  Leer = Vorgabe. **Kontrastprüfung** und **Live-Vorschau** hell und dunkel.

### Regeln

- Der **Standard** steht im Code (CSS-Variablen `:root` und `.dark`) und lässt sich in der Oberfläche nicht ändern oder
  löschen. Gespeicherte Themes enthalten **nur Abweichungen** vom Standard.
- Nur **bekannte Farbwerte** und nur `#rrggbb` werden gespeichert und ausgegeben.
- **Kontrastprüfung:** WCAG AA 4,5 : 1 für die wichtigen Paare Schrift/Fläche; Linien (z. B. Unterstreichung von
  Glossar-Begriffen) 3 : 1 gegen den Hintergrund. Die Prüfung warnt, sperrt aber nicht; ein Theme gilt erst nach
  bestandener Prüfung als brauchbar.
- **Farben in Seiten nur über die Farbwerte** (Tokens wie `bg-primary`, `text-muted-foreground`), nie fest im Code,
  sonst wirkt ein Theme dort nicht.
- Das aktive Theme übersteuert den Standard global. Die Vorschau gilt nur für einen Teilbereich der Seite (setzt die
  Variablen dort und für dunkel die Klasse `dark`).

## 3. GUI-Prototypen (GUI-Tester)

**Ziel:** Die Anwendung sieht am Ende einheitlich aus. Jeder Baustein der Oberfläche (Menü, Tabelle, Dropdown,
Button …) hat **eine verbindliche Vorlage**. Verbesserungen werden am Baustein entwickelt, geprüft und freigegeben;
danach werden alle Seiten angepasst, die ihn verwenden.

### Aufbau

Eigenes Hauptmenü «GUI-Prototypen» (letzter Menüpunkt, eigenes Recht zum Benutzen):

- **Inhaltsverzeichnis:** alle Bausteine nach Bereich nummeriert, je mit Erklärung, Bestandteilen, Status und Link
  zum Prototyp, dazu die Regeln «Für alle Bausteine» und der Abschnitt «Später» (Inhalt wie Abschnitt 5).
- **Freigaben & Status:** Tabelle mit verbindlicher Version, Version in Arbeit, offener Überarbeitung und Wünschen.
- Untermenüs **Navigation & Aufbau**, **Eingabe**, **Daten anzeigen**, **Rückmeldung** mit **je einer Seite pro
  Baustein** und den Reitern **Beispiele**, **Versionen & Status**, **Überarbeitung**, **Wünsche**.
- **Vorschau-Leiste** über den Beispielen mit **Hell / Dunkel** und **Theme**: nur Anzeige, ändert nichts für
  andere. Dialoge, Popover und Menüs erscheinen in den gewählten Farben.
- Neue Bausteine werden mit Bereich, Titel, Symbol, Beschreibung, Bestandteilen und den verwendenden Seiten
  erfasst; ein Test prüft Bereich, Symbol, Beispiele und Verwendung.

### Status und Versionen

| Status      | Bedeutung                                                    |
| ----------- | ------------------------------------------------------------ |
| Entwicklung | Baustein wird gebaut bzw. geändert                           |
| Prüfung     | Beispiele, Barrierefreiheit, Farbkonzept werden kontrolliert |
| Freigegeben | verbindliches Template                                       |

- Versionsnummer **SemVer je Baustein:** Korrektur (x.x.+1), Erweiterung (x.+1.0), grundlegend neu (+1.0.0).
- Es ist immer höchstens **eine Version offen**. Die Prüfung kann mit Bemerkung an die Entwicklung zurückgehen.
- Jeder Schritt wird mit Datum, Person und Bemerkung im Verlauf festgehalten.
- Bis zur Freigabe einer neuen Version bleibt die zuletzt freigegebene verbindlich; ältere gelten als «abgelöst».
- Ausgangslage: Version 1.0.0 in Entwicklung (der bestehende Baustein).

### Nach einer Freigabe

Alle Seiten, die den Baustein verwenden, werden als **«zu überarbeiten»** vorgemerkt. Jede Seite wird geprüft, an
die Vorlage angepasst und abgehakt. Die Übersicht zeigt offene Überarbeitungen je Baustein. Eine neue Freigabe
ersetzt die Liste der vorherigen.

### Verbesserungswünsche

Wünsche werden beim Baustein erfasst (Text, Person, Datum) und beim Anlegen der nächsten Version übernommen
(«in v1.1.0»). So bleibt nachvollziehbar, woher eine Änderung kommt.

### Wer darf was, und wer erfährt es

| Schritt               | Wer darf                     | Was passiert                                                           | Benachrichtigt                            |
| --------------------- | ---------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| Neue Version anlegen  | Entwicklung (Administration) | Version x.y.z in «Entwicklung»; gewählte Wünsche werden ihr zugeordnet | Autor:innen der übernommenen Wünsche      |
| Zur Prüfung geben     | Entwicklung                  | Status «Prüfung», Datum und Person, optional Bemerkung                 | alle Prüfenden                            |
| Zurück an Entwicklung | Prüfende                     | Status «Entwicklung», Bemerkung im Verlauf                             | wer die Version angelegt hat, Entwicklung |
| Freigeben             | Prüfende                     | Version verbindlich, verwendende Seiten zur Überarbeitung vorgemerkt   | alle Nutzenden der GUI-Prototypen         |
| Wunsch erfassen       | alle Nutzenden               | Wunsch beim Baustein, «offen»                                          | Entwicklung                               |
| Überarbeitung abhaken | Entwicklung                  | Seite mit Datum und Person erledigt                                    | –                                         |

Die auslösende Person erhält keine Meldung. Ein Klick auf die Benachrichtigung öffnet den Baustein direkt im
passenden Reiter. Neue Meldungen erscheinen ohne Neuladen zusätzlich als kurze Meldung mit «Öffnen».

## 4. Sprachkonzept, soweit es die GUI betrifft

- **Sprachwahl** in den Einstellungen › Darstellung, mit Flaggen und den Sprachnamen in der eigenen Sprache;
  zusätzlich eine kompakte Auswahl unten in der Seitenleiste. Die Sprache gilt je Browser.
- Sprachen im INTRANET: Deutsch (`de-CH`, Standard, «ss» statt «ß», Datum TT.MM.JJJJ), Englisch (britisch,
  schulnahe Begriffe), Züritüütsch (`gsw-CH`, Dieth-Schreibung, Fachbegriffe bleiben). HTML-`lang` passend setzen.
- Im Code stehen nur deutsche Texte. Übersetzt werden auch **Tooltips, Platzhalter, `aria-label` und `alt`**; der
  Wechsel zurück auf Deutsch geht ohne Neuladen.
- Fehlt eine Übersetzung, bleibt der deutsche Text (Fallback). Zahlen werden beim Übersetzen als Platzhalter
  behandelt («12 Einträge» → «{n} Einträge»); zusammengesetzte Texte («Teil · Teil», «Titel: Rest») werden auch in
  Teilen übersetzt.
- **Daten werden nicht übersetzt** (Namen, Tabellenzellen ausser Auswahlwerten und Ja/Nein, Detailwerte, Titel und
  Texte von Mitteilungen und Terminen, Changelog-Einträge) und mit `translate="no"` geschützt, auch gegen
  Browser-Übersetzer.
- **Kein Aufblitzen** der Ausgangssprache: Ist die Sprache nicht Deutsch, bleibt die Seite bis zur ersten
  Übersetzung verborgen (höchstens 1,5 s).
- **Kurzformen bei Platzmangel** (z. B. Spaltentitel in Tabellen): Kurzform je Sprache; die volle Bezeichnung bleibt
  Tooltip und für Screenreader. Eine Prüfung meldet fehlende oder zu lange Kurzformen.
- **Prüfseite** (unter «Prototyp»): Abdeckung je Sprache, Beispiele und die in diesem Browser fehlenden Texte.
- Pflege: neuer Text auf Deutsch im Code und im selben Commit in den Katalog (alle Sprachen); ein Werkzeug meldet
  fehlende Einträge, ein Test prüft die Kataloge.

## 5. Bausteine

41 Bausteine, abgeglichen mit der Komponentenliste von shadcn/ui. Je Baustein: Zweck und Bestandteile, die auf der
Prototyp-Seite als Beispiele gezeigt werden.

### 1. Navigation & Aufbau

Wie man sich in einem Modul bewegt und wie eine Seite aufgebaut ist.

#### 1.1 Menü

Seitenleiste mit Hauptmenüs und Untermenüs, Aktionsmenü (Dropdown-Menü) und Breadcrumbs.

- Seitenleiste: Hauptmenüs mit Farbe, Untermenüs, aktiver Eintrag
- Aktionsmenü: Aktionen zu einer Zeile oder Seite, Gefährliches zuletzt
- Breadcrumbs: wo bin ich; der erste Eintrag öffnet das Menü wieder
- Navigationsmenü oben (Navigation Menu)

#### 1.2 Seitenpanel

Fährt von der Seite oder von unten ein (Sheet, Drawer): Details, Filter oder Bearbeiten, ohne die Seite zu verlassen; auf dem Handy auch Menü und Aktionen.

- Von rechts: Details und Bearbeiten
- Von links: Menü auf dem Handy
- Von unten (Drawer): Aktionen auf dem Handy
- Schliesst mit Esc, Klick daneben oder «Schliessen»

#### 1.3 Reiter (Tabs)

Teilt eine Seite in Bereiche, von denen immer einer sichtbar ist. Pfeiltasten wechseln den Reiter.

- Reiter mit und ohne Symbol
- Gesperrter Reiter
- Tastatur: Pfeiltasten, Anfang und Ende

#### 1.4 Seitenweise Anzeige

Blättern in langen Listen ausserhalb der Tabelle (z. B. Mitteilungen, Verlauf).

- Zurück / Weiter
- Seitenzahlen mit «…»
- Aktuelle Seite für Bildschirmleser markiert

#### 1.5 Schrittanzeige

Zeigt Abläufe in Schritten (Geräteausgabe, Import, Versand): erledigt, aktuell, offen.

- Schritte mit Titel und Beschreibung
- Zurück / Weiter
- Auf dem Handy untereinander

#### 1.6 Befehlspalette

Mit Ctrl+K schnell zu Seiten, Personen und Aktionen springen – ohne Maus.

- Öffnen mit Ctrl+K (Mac: Cmd+K) oder Knopf
- Tippen filtert, Gruppen nach Art
- Pfeiltasten und Enter

#### 1.7 Umschalter & Aufklappen

Umschaltgruppe für Ansichten, Ein/Aus-Knopf und ein aufklappbarer Bereich.

- Umschaltgruppe (z. B. Ansicht wählen)
- Ein/Aus-Knopf (Toggle)
- Aufklappbarer Bereich (Collapsible)

#### 1.8 Kontextmenü

Aktionen mit Rechtsklick, langem Drücken (Tablet) oder Shift+F10 – immer zusätzlich als sichtbarer Knopf «…».

- Rechtsklick, langes Drücken, Shift+F10, Menütaste
- Pfeiltasten, Esc
- Gleiche Aktionen im Knopf «…»

#### 1.9 Geteilte Ansicht

Zwei Bereiche nebeneinander mit verschiebbarer Trennlinie, z. B. Liste links und Details rechts.

- Ziehen mit Maus und Touch
- Pfeiltasten, Pos1/Ende, Doppelklick zurück
- Grenzen für kleinste und grösste Breite

### 2. Eingabe

Wie Angaben erfasst, gewählt und Dateien übergeben werden.

#### 2.1 Button

Varianten (Haupt-, Neben-, Umriss-, Text-, Gefahr-Button), Grössen, mit Symbol, nur Symbol, lädt, gesperrt.

- Varianten und Grössen
- Mit Symbol, nur Symbol (mit Titel)
- Lädt, gesperrt

#### 2.2 Knopfgruppe

Zusammengehörende Knöpfe ohne Abstand, z. B. Export CSV / Excel, Ansicht Liste / Kacheln, Textformat.

- Aktionen mit Menü «Weitere»
- Auswahl der Ansicht (aria-pressed)
- Ein/Aus-Knöpfe (Fett, Kursiv)

#### 2.3 Formularfelder

Textfeld, Textbereich, Zahl, Datum, Kontrollkästchen, Beschriftung, Hinweis und Fehlermeldung.

- Text, Zahl, Textbereich
- Beschriftung, Hinweis, Fehler
- Kontrollkästchen, gesperrtes Feld
- Feldgruppen mit Überschrift, Einstellung als Zeile (Field)

#### 2.4 Eingabegruppe

Feld mit Symbol, Text davor/danach oder Knopf in einem Rahmen: Suche, «@schule.ch», «CHF», Kopieren.

- Suche mit Symbol und Leeren
- Text davor und danach
- Knopf im Feld (Kopieren)

#### 2.5 Dropdown

Auswahlfeld ohne und mit Vorauswahl, gesperrt, mit Fehler sowie Mehrfachauswahl.

- Ohne Vorauswahl («Bitte wählen»)
- Mit Vorauswahl
- Mit Fehler, kurze Mehrfachauswahl
- Einfaches Auswahlfeld des Browsers (Native Select)

#### 2.6 Optionsfelder

Genau eine Wahl aus wenigen (2–5) sichtbaren Möglichkeiten, z. B. Zielgruppe oder Art der Abgabe.

- Untereinander und nebeneinander
- Mit Hinweis je Möglichkeit
- Gesperrte Möglichkeit, Fehler

#### 2.7 Schalter

Ein/Aus für Einstellungen, die sofort gelten (z. B. Benachrichtigungen). In Formularen mit «Speichern» Kontrollkästchen verwenden.

- Schalter mit Beschriftung und Hinweis
- Gesperrt
- Wann Schalter, wann Kontrollkästchen

#### 2.8 Auswahl mit Suche

Auswahl aus langen Listen mit Suchfeld (Combobox), z. B. eine Person aus 500 oder ein Gerät.

- Tippen filtert (ohne Akzente, Gross/Klein)
- Zusatzangabe je Eintrag
- Pfeiltasten, Enter, Esc

#### 2.9 Mehrfachauswahl

Mehrere Werte wählen, z. B. Klassen oder Zielgruppen – mit Suche, «Alle» / «Keine» und entfernbaren Kennzeichen.

- Suche in der Liste
- Alle / Keine
- Gewählte Werte als Kennzeichen, einzeln entfernbar

#### 2.10 Datumsauswahl

Datum eintippen (TT.MM.JJJJ) oder im Kalender wählen; Woche beginnt am Montag, Bereich einschränkbar.

- Eintippen oder Kalender
- Frühestes / spätestes Datum
- Tastatur: Pfeile, Bild auf/ab

#### 2.11 Datei hochladen

Ablagefläche zum Hineinziehen oder Anklicken (z. B. Listen, Exporte, Dokumente, PDF) mit Prüfung von Typ und Grösse.

- Eine oder mehrere Dateien
- Erlaubte Dateitypen, Höchstgrösse
- Liste mit Entfernen; Dateien bleiben im Browser bis zum Senden
- Anhang mit Vorschaubild, Fortschritt und Fehler (Attachment)

#### 2.12 Schieberegler

Wert in einem Bereich einstellen (z. B. Anzahl Geräte, Prozent); der Wert steht immer daneben.

- Mit Einheit
- Schritte
- Tastatur: Pfeile

#### 2.13 Drag & Drop

Ziehen und Ablegen mit dnd-kit: Liste umsortieren, Zuordnen (z. B. Personen → Gruppen) und Kanban-Tafel. Alles geht auch ohne Ziehen (Tastatur, Knöpfe, «Nach …»).

- Liste umsortieren: Griff, Tastatur (Leertaste, Pfeile), Nach oben/unten
- Zuordnen: Karten in Spalten ziehen oder «Nach …» wählen
- Kanban: Status von Tickets/Bestellungen
- Dateien: siehe «Datei hochladen»
- Tabelle: Spalten ziehen oder im Spaltenmenü verschieben

#### 2.14 Fragebogen

Umfrage in Schritten mit Einfach-, Mehrfachauswahl und Freitext, überspringbaren Fragen und Übersicht vor dem Absenden (Modul «Umfragen»).

- Eine Frage pro Schritt mit Fortschritt
- Pflichtfragen und Überspringen
- Übersicht mit «Ändern»

### 3. Daten anzeigen

Wie Listen, Kennzahlen und Verläufe dargestellt werden.

#### 3.1 Tabellen

Bearbeitbare Tabelle (Grundlage: Personen) mit Suche, Filtern, Sortierung, Spaltenwahl, Auswahl, Export und einfache Tabelle.

- Bearbeitbare Tabelle wie in Excel
- Filter je Spalte, Sortierung, Spalten, Ansichten
- Einfache Tabelle für kurze Listen
- Optional: «Neue Zeile» (`onAddRow`), eigene Knöpfe in der Werkzeugleiste (`toolbar`), weitere Exporte
  (`extraExports`, z. B. PDF/Markdown im Glossar), Gruppieren nach Mehrfachwerten (`separator` je Spalte)
- Spaltentyp `multi` (Mehrfachauswahl, z. B. Kategorie im Glossar): Filter «enthält eine/keine von», Bearbeiten in
  der Zelle mit Häkchen-Liste (Pfeile, Leertaste, Enter übernimmt, Esc bricht ab); Wert als Text «A; B»
- Farbige Werte (`colors` je Spalte) auch in Auswahlliste und Filter; Datumszellen mit Kalender (Leeren, Heute);
  Sortieren in bis zu drei Stufen (Knopf «Sortieren» oder Umschalt+Klick im Spaltenkopf)
- Spalten ziehen mit farbigem Einrastpunkt; Dropdowns und Kalender erscheinen oberhalb, wenn unten kein Platz ist;
  Auswahllisten mit Ziehecke rechts unten; Kalender mit Monatsauswahl (Klick auf den Monat) und Jahres-Spinner
- Kontextmenü (Rechtsklick, Menütaste, Umschalt+F10) für Zelle, Zeile, Tabelle und Spaltenkopf; eigene
  Zeilen-Einträge mit `rowMenu` (z. B. Öffnen, Löschen)
- `@/components/fit-label`: Bezeichnung, die bei zu wenig Platz auf die Abkürzung umschaltet (z. B. Sprachen)

#### 3.2 Typografie

Einheitliche Überschriften, Absätze, Listen, Zitate, Code im Text, Tasten (Kbd) und Trennlinien – Grundlage für Mitteilungen und Handbuch.

- Überschriften H1–H4, Einleitung, Text
- Listen, Zitat, leiser und kleiner Text
- Code im Text, Tasten, Trennlinie

#### 3.3 Eintrag

Zeile mit Symbol oder Bild, Titel, Beschreibung, Zusatzangabe und Aktionen – für Listen von Personen, Dokumenten, Plugins.

- Liste mit Trennlinien
- Mit Kennzeichen und Aktionen
- Gedämpfte Variante

#### 3.4 Karten & Seitenkopf

Seitenkopf mit Titel und Beschreibung, Karten mit Kopf, Inhalt und Fuss, Kennzahlen, leerer Zustand.

- Seitenkopf mit Aktion
- Karte, Kennzahl
- Leerer Zustand

#### 3.5 Badges, Status & Avatar

Kennzeichen für Status, Auswahlwerte in den Farben des Farbkonzepts, Zähler und Avatar (Initialen).

- Grundformen und Zähler
- Auswahlwerte im Farbkonzept
- Avatar mit Initialen

#### 3.6 Akkordeon

Mehrere aufklappbare Abschnitte, z. B. Fragen & Antworten im Handbuch; einer oder mehrere offen.

- Nur einer offen
- Mehrere offen
- Überschrift als Knopf (Bildschirmleser)

#### 3.7 Fortschritt

Fortschrittsbalken für Import, Versand oder Abgabe; bestimmt (Prozent) oder unbestimmt.

- Mit Prozent
- Unbestimmt (Dauer unbekannt)
- Kennzahl mit Balken (z. B. Lizenzen)

#### 3.8 Diagramme

Balken-, Linien- und Ringdiagramme für Kennzahlen (Lizenzen, Geräte, Tickets) in den Farben des Farbkonzepts, immer auch als Tabelle.

- Einfache Balken
- Zwei Werte je Zeile (z. B. gekauft / zugewiesen)
- Verlauf als Linien
- Anteile als Ring
- Umschalter «Als Tabelle»

#### 3.9 Zeitleiste

Verlauf mit Datum, z. B. Versionen, Änderungen, Status einer Bestellung (neueste oben).

- Eintrag mit Datum, Titel, Beschreibung
- Farbe nach Art (Erfolg, Warnung, Hinweis)

#### 3.10 Scrollbereich

Bereich mit fester Höhe oder Breite und schmaler, einheitlicher Bildlaufleiste; mit Tastatur erreichbar.

- Senkrecht (lange Liste)
- Waagrecht (Klassen, Kacheln)
- Fokus und Pfeiltasten

#### 3.11 Codeblock

Code, Konsolenausgabe und Vergleiche mit Kopfzeile, Zeilennummern und Kopieren – für API-Tester, Plugins und das Skript der Geräteausgabe.

- Mit Zeilennummern
- Konsolenausgabe
- Vergleich (+/−), Kopieren

#### 3.12 Begriff

Begriff aus dem Glossar, fein gepunktet unterstrichen: beim Darüberfahren, Fokussieren oder Antippen ein Tooltip mit Abkürzung, Bezeichnung und Kurzbeschreibung; Klick öffnet den Eintrag. Im Code als Baustein, im Freitext automatisch.

- Begriff im Code
- Mehrdeutige Abkürzung (alle Bedeutungen)
- Begriffe im Freitext
- Farbe der Punkte im Theme, abschaltbar je Person

### 4. Rückmeldung

Wie die Anwendung antwortet: Meldungen, Rückfragen, Laden, Hinweise.

#### 4.1 Meldungen & Dialoge

Hinweisboxen, Rückfrage-Dialog, kurze Meldungen (Toast) und Tooltips.

- Hinweisbox (Info, Fehler)
- Rückfrage vor Löschen
- Toast und Tooltip

#### 4.2 Rückfrage

Dialog, der bewusst beantwortet werden muss (Alert Dialog): schliesst nicht mit Klick daneben, Fokus zuerst auf «Abbrechen». Für Löschen und unumkehrbare Schritte.

- Gefährlich (Löschen)
- Wichtig (Freigeben)
- Fokus auf «Abbrechen», kein Schliessen daneben

#### 4.3 Popover

Kleines Fenster an einem Knopf für Hilfe, Filter oder eine kurze Auswahl; schliesst mit Esc oder Klick daneben.

- Hilfe zu einem Feld
- Kleiner Filter mit Übernehmen
- Fokus zurück zum Knopf

#### 4.4 Vorschaukarte

Kleine Vorschau beim Überfahren oder Fokussieren eines Links (Hover Card), z. B. einer Person – nur Zusatzinformation.

- Öffnet mit Maus und Tastatur (Fokus)
- Kurze Verzögerung, Esc schliesst
- Link führt immer zur ganzen Seite

#### 4.5 Banner

Hinweis über die ganze Breite oben auf der Seite, z. B. Wartung, Prototyp, neue Version.

- Info, Warnung, Erfolg
- Mit Aktion
- Schliessbar

#### 4.6 Ladezustände

Ladeanzeige (Spinner) und Platzhalter (Skeleton), solange Daten geladen werden.

- Spinner
- Platzhalter in der Form des Inhalts

### Für alle Bausteine

- **Hell- und Dunkelmodus, Farben:** Farben nur über die Farbwerte (Tokens); jeder Baustein funktioniert hell und
  dunkel.
- **Tastatur und Bildschirmleser:** Alles ohne Maus bedienbar, sichtbarer Fokus, Beschriftungen für Knöpfe mit
  Symbol; Ziehen immer mit Alternative (WCAG 2.2, 2.5.7).
- **Handy und Tablet:** Jeder Baustein passt sich der Breite an; Touch-Ziele mindestens 24 × 24 Pixel; Ziehen auf
  dem Tablet mit kurzem Halten.
- **Mehrsprachigkeit:** Texte im Code auf Deutsch, Übersetzungen in den Katalogen; Namen und Daten mit
  `translate="no"` schützen (Abschnitt 4).

### Später

Bausteine aus shadcn/ui, die bewusst noch nicht umgesetzt werden.

| Baustein                              | Wofür                                                            | Warum später                    |
| ------------------------------------- | ---------------------------------------------------------------- | ------------------------------- |
| Seitenverhältnis (Aspect Ratio)       | Bilder und Videos in festem Format.                              | niedrige Priorität              |
| Karussell (Carousel)                  | Bilder zum Durchblättern, z. B. Pinnwand oder Startseite.        | niedrige Priorität              |
| Menüleiste (Menubar)                  | Menüleiste wie in Programmen.                                    | niedrige Priorität              |
| Einmal-Code (Input OTP)               | Eingabe von Codes in Feldern pro Ziffer.                         | niedrige Priorität (SSO)        |
| Schreibrichtung (Direction)           | Schrift von rechts nach links.                                   | nicht nötig (Deutsch, Englisch) |
| Chat-Blase (Bubble)                   | Nachricht in einer Unterhaltung mit Reaktionen.                  | Chat / KI – später              |
| Nachricht (Message)                   | Nachricht mit Avatar, Kopf und Fuss.                             | Chat / KI – später              |
| Nachrichtenverlauf (Message Scroller) | Scrollbereich für Unterhaltungen.                                | Chat / KI – später              |
| Markierung (Marker)                   | Status oder Trenner in einer Unterhaltung.                       | Chat / KI – später              |
| Ablauf (Trace)                        | Schritte eines KI-Assistenten: Überlegungen, Werkzeuge, Quellen. | Chat / KI – später              |

### Drag & Drop

**Bibliothek im INTRANET:** dnd-kit (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, MIT) für Listen,
Zuordnen und Kanban, weil es Maus, Touch (Tablet) **und Tastatur** unterstützt und Bildschirmlesern meldet, was
verschoben wird. Für Dateien genügt das Drag & Drop des Browsers (Baustein «Datei hochladen»). Für EduKSX-UI ist die
Bibliothek **ZU PRÜFEN** (neue Abhängigkeit, `docs/third-party.json`).

| Baustein                     | Wofür                                                |
| ---------------------------- | ---------------------------------------------------- |
| Sortierbare Liste            | Reihenfolge ändern (Links, Menüpunkte, Checklisten)  |
| Tafel                        | Zuordnen (z. B. Personen → Gruppen), Kanban (Status) |
| Dateiablage                  | Dateien ablegen (Listen, Dokumente, PDF)             |
| Tabelle: Spalten verschieben | Spaltenkopf ziehen oder Spaltenmenü                  |

**Regeln**

1. **Alles geht auch ohne Ziehen** (WCAG 2.2, Kriterium 2.5.7 «Ziehbewegungen»):
   - Liste: Griff fokussieren, Leertaste, Pfeiltasten, Leertaste (Esc bricht ab) – und Knöpfe «Nach oben / Nach
     unten»
   - Tafel: je Karte die Auswahl «Nach …»
   - Dateien: Ablagefläche ist anklickbar und mit Tab/Enter erreichbar
   - Tabelle: im Spaltenmenü «Nach links / Nach rechts»
2. **Ziehen nur am Griff** (Symbol ⋮⋮), damit Klicken, Markieren und Scrollen normal funktionieren. Auf dem Tablet
   startet das Ziehen nach kurzem Halten (150 ms), damit Wischen die Seite scrollt.
3. **Ansagen auf Deutsch** für Bildschirmleser («… aufgenommen», «… abgelegt bei Platz 3», «abgebrochen»).
4. **Sichtbare Rückmeldung:** gezogene Karte hervorgehoben, Ziel-Spalte eingefärbt (Farben aus dem Farbkonzept).
5. **Speichern erst nach dem Ablegen** und mit Rückmeldung (Toast); bei Fehlern zurück an den alten Platz.
6. **Dateien bleiben im Browser**, bis die Seite sie bewusst sendet; Typ und Grösse werden vorher geprüft.
