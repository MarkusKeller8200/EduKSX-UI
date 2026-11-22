# Projektstart – EduKSX-UI

Stand: 2026-11-22 · Status: **BESTÄTIGT** am 22.11.2026 durch Projektverantwortliche:r (Chat); Verteilung zuerst über Git (Tag), später npm

Steckbrief aus der Start-Checkliste (`start.py --ziel …` im GitHub-Blueprint). Er ist die Grundlage für das Grundgerüst
und für die Konfiguration in `.github/blueprint.toml`. Änderungen hier festhalten und `start.py` erneut ausführen.

## Ziel

Design-System der EduKSX-Plattform: Design-Tokens (tokens.json, DTCG), Kontrastprüfung und React-Bausteine als npm-Paket @eduksx/ui für alle EduKSX-Module.

**Nichtziele:**

- keine Fachlogik der Module
- keine Gestaltung am Code vorbei (Entwürfe nur als Vorschlag)
- kein Branding, keine Texte oder Pfade einzelner Schulen im Paket

## Datenschutz

- Zielgruppe: öffentliche Organe
- Anwendbares Recht: IDG (Kanton Zürich)
- Daten: keine Personendaten · Schutzbedarf: **öffentlich**

Die Zuordnung ist eine Arbeitshilfe, keine Rechtsberatung; bei öffentlichen Organen die zuständige
Datenschutzstelle einbeziehen (z. B. Vorabkontrolle bzw. Datenschutz-Folgenabschätzung).

## Antworten

| Frage | Antwort |
|---|---|
| Wie heisst das Projekt (voller Name)? | EduKSX-UI |
| Was soll das Projekt leisten, und für wen? (ein bis zwei Sätze) | Design-System der EduKSX-Plattform: Design-Tokens (tokens.json, DTCG), Kontrastprüfung und React-Bausteine als npm-Paket @eduksx/ui für alle EduKSX-Module. |
| Was gehört ausdrücklich nicht dazu (Nichtziele)? | keine Fachlogik der Module, keine Gestaltung am Code vorbei (Entwürfe nur als Vorschlag), kein Branding, keine Texte oder Pfade einzelner Schulen im Paket |
| Welcher Kurzname soll in den Release-Titeln stehen? | EduKSX-UI |
| Ist es eine Web-Anwendung, eine Desktop-Anwendung oder beides? | web |
| Wer nutzt die Anwendung? | öffentliche Organe |
| Welche öffentlichen Organe? | Kanton Zürich |
| Ist das Repository neu oder gibt es es schon? | neu |
| Wer gibt Issues und Releases frei (Rolle genügt)? | Projektverantwortliche:r |
| Arbeitest du allein oder im Team? | allein |
| Ist das Repository öffentlich oder privat? | öffentlich |
| Unter welcher Lizenz steht der Code? | MIT |
| Auf wen lautet die Lizenz? | Markus Keller |
| In welchen Programmiersprachen wird entwickelt? | JavaScript / TypeScript |
| Welcher Grundsatz gilt für Abhängigkeiten? | geprüfte Pakete |
| Wo läuft die Web-Anwendung? | – |
| Wie kommt die Anwendung zu den Nutzer:innen? | nur Quellcode |
| Welches Framework bzw. welche Grundlage? | React 19 + TypeScript, Tailwind 4, Vite (Bibliothek) |
| Welche Daten verarbeitet die Anwendung? | keine Personendaten |
| Welcher Schutzbedarf gilt für die Daten (Klassifizierung)? | öffentlich |
| Welche Anmeldungen und Zugänge braucht es? | keine |
| In welchen Sprachen wird die Oberfläche ausgeliefert? | de-CH |
| Gibt es Plugins oder Module mit eigener Version? | nein |
| Mit welchem Befehl laufen alle Prüfungen? | npm run check |
| In welcher Datei steht die Versionsnummer? | package.json |
| Mit welcher Version startet das Projekt? | 0.1.0 |
| Mit welchen KI-Agenten wird gearbeitet? | Claude |
| Wie heisst der erste Meilenstein? | 0.1.0 – Grundgerüst |
| Übergabe und Projektstand auch als Kopie im Claude-Projekt führen? | nein |
| Welche ersten Funktionen gehören in diesen Meilenstein? | Design-Tokens tokens.json (DTCG) mit Build: CSS-Variablen hell/dunkel, Tailwind-Theme, --eduksx-*, Kontrastprüfung der Tokens in der CI (Text 4,5:1, Linien/Fokus 3:1), BrandWordmark nach CI-Komponentenkontrakt, Kopfzeile mit Modulwechsel (Plattform S7), Verlauf (Anzeige von data_changes bzw. Revisionen) |

## Grundgerüst

Vorschlag für Aufbau, Ordner und erste Dateien – wird vor dem Anlegen mit Projektverantwortliche:r
abgestimmt (Status je Punkt: BESCHLOSSEN, EMPFOHLEN, OFFEN, ZU PRÜFEN):

| Punkt | Vorschlag | Status |
|---|---|---|
| Technik | JavaScript / TypeScript · React 19 + TypeScript, Tailwind 4, Vite (Bibliothek) | BESCHLOSSEN |
| Ordner | Quellcode, `tests/`, `docs/` | BESCHLOSSEN |
| Prüfungen | `npm run check` (Workflow «pruefungen») | BESCHLOSSEN |
| Version | `package.json` mit 0.1.0 | BESCHLOSSEN |
| Auslieferung | Quellcode; Module installieren über Git (Tag), später npmjs.com | BESCHLOSSEN |

## Erster Meilenstein: 0.1.0 – Grundgerüst

- [ ] Design-Tokens tokens.json (DTCG) mit Build: CSS-Variablen hell/dunkel, Tailwind-Theme, --eduksx-*
- [ ] Kontrastprüfung der Tokens in der CI (Text 4,5:1, Linien/Fokus 3:1)
- [ ] BrandWordmark nach CI-Komponentenkontrakt
- [ ] Kopfzeile mit Modulwechsel (Plattform S7)
- [ ] Verlauf (Anzeige von data_changes bzw. Revisionen)

Diese Punkte werden nach Bestätigung als Issues mit Testliste angelegt.
