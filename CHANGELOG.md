# Changelog – EduKSX-UI

Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/), Versionen nach
[Semantic Versioning](https://semver.org/lang/de/) (MAJOR.MINOR.PATCH). Neue Einträge kommen laufend unter
**Unveröffentlicht**; `python3 .github/blueprint/release.py set X.Y.Z --commit` macht daraus eine Version.

## [Unveröffentlicht]

### Neu

- **GUI-Tester auf der Testseite (#44, DS13):** Baustein-Seiten mit Reitern Beispiele, Versionen & Status,
  Überarbeitung und Wünsche; Übersicht «Freigaben & Status». Versionen, Verlauf und Überarbeitungen in
  `site/src/versionen.ts` (Regeln aus dem INTRANET: Status Entwicklung → Prüfung → Freigegeben, SemVer je Baustein),
  Wünsche als GitHub-Ideen je Baustein. Alle Bausteine starten mit v1.0.0 in Prüfung.
- **Flow-Icon (#30):** EduKSX-Flow erhält sein Icon (Flussdiagramm mit Entscheidungs-Raute) aus dem
  Prototyp-Entwurf, freigegeben 22.11.2026; alle Varianten als SVG und PNG, Baustein `EduksxIcon name="flow"`.
- **Grundbausteine auf der Testseite (#27, #15):** eigene Seiten für Button, Tooltip, Formularfelder, Tabelle,
  Dialog und Rückfrage sowie Hinweisbox, mit allen Varianten und Zuständen, hell und dunkel und in allen Ansichten.
- **Testseite auf GitHub Pages (#15, Ideen #17, #19, #21):** eigene Vite-Seite unter `site/` (Entscheid 22.11.2026:
  keine Storybook-Abhängigkeit) als Einstieg zum visuellen Prüfen aller Entscheide: Farben mit Werten hell/dunkel,
  Kontrast nachgerechnet, Typografie, Abstände/Radien/Schatten, Breakpoints und Ansichten, Animation, Wortmarken, Icons,
  die Bausteine `BrandWordmark`, `EduksxIcon`, `AppHeader`, `ModuleSwitcher`, `HistoryList` und die Prüfseite
  Schriftgewichte. Vorschau-Leiste mit Farbschema Hell/Dunkel/System, Vergleich hell und dunkel nebeneinander und den
  Pflicht-Ansichten Handy und Tablet (hoch/quer, in Gerätegrösse), Darstellungsoptimiert, Breit, Voll und Vollbild.
  Schriften selbst gehostet (`site/public/fonts/`, auch für `docs/pruefseiten/schriftgewichte.html`, kein Google
  Fonts mehr). `npm run site` (lokal), `npm run site:build` (prüft auch auf fremde Schriftabrufe), Workflow
  `testseite.yml` baut bei PRs und rollt `main` auf GitHub Pages aus. Neue Bausteine ergänzen: `docs/TESTSEITE.md`.
- **Grundbausteine (#27, `docs/KONZEPT-BAUSTEINE.md`):** `Button` (Haupt-, Neben-, Umriss-, Text-, Gefahr-Knopf,
  Link; Grössen, mit Symbol, lädt, gesperrt), `IconButton` mit `aria-label` und Tooltip, `Tooltip` (WCAG 1.4.13),
  Formularfelder `Field`, `Input`, `Textarea`, `NativeSelect`, `Checkbox` mit Hinweis und Fehler, einfache `Table`
  mit Sortierknopf und `aria-sort`, `Dialog` und Rückfrage `AlertDialog` auf dem nativen `<dialog>`, Hinweisbox
  `Alert` (Info, Erfolg, Warnung, Fehler). Ohne neue Abhängigkeit; 10 Symbolpfade aus Lucide (ISC). Zustände Normal,
  Hover, Fokus, Gedrückt, Deaktiviert mit Kontrasttest hell/dunkel.
- **Tokens `destructive-contrast` und `destructive-soft` (#11, #27):** Schrift auf der roten Fläche und Fläche der
  Fehler-Hinweisbox, mit Prüfpaaren; `destructive-foreground` bleibt «Fehlertext auf Hintergrund».
- **Typografie- und Basis-Tokens (#25, #26, `docs/KONZEPT-TOKENS.md`):** Schriftgrössen 12–30 px in rem mit
  Zeilenhöhen, Gewichte 400/500/600/700, Textrollen `typo-h1` … `typo-small` (H1 30/mobil 24, H2 20, H3 18, H4 16;
  Bedienung 14 px, Fliesstext 16 px – T1, T2), Abstandsraster 4 px, Radien sm–full, Schatten xs–lg hell/dunkel,
  Breakpoints 640–1536 px mit Variante `desk:` aus dem Glossary (T3), Seitenbreiten der Ansichten, Dauern und Kurven
  mit `prefers-reduced-motion`. Ausgabe in `tokens.css`, `theme.css` und `eduksx.css`; `radius-lg/md/sm` jetzt
  feste Stufen statt `calc()`.
- **EduKSX-Icons (#31):** freigegebenes Icon-Set (16 Icons, SVG einfarbig/farbig/Kachel, PNG 512–32) und Generator
  `icons/build.py` aus markussxch übernommen – EduKSX-UI ist jetzt die Quelle; Baustein `EduksxIcon` (`color`, `mono`,
  `tile`), Token `icon-tile`, im Paket unter `icons/`.
- **Schrift für Code und IDs (#31, M6):** Token `font.mono` (JetBrains Mono, Rückfall `ui-monospace, monospace`) → `--font-mono`,
  Tailwind `font-mono`; Regel «keine plattformabhängigen Schriften», kein Aptos; Gewichte 400/500/600/700 ohne
  Zwischengewichte (M7).
- **KONZEPT-MARKE ergänzt (#31):** Schrift (3.4, M6), Zustände der Bedienelemente (5.4), Dateien
  und Baustein (6.1), Bediensymbole mit Lucide-Zuordnungen (6.2, Idee #20), Ton und Statusangaben (10.), Pflege und
  Abnahme-Checkliste (11.); Flow-Icon-Vermerk korrigiert. `UEBERNAHME-INTRANET-GUI.md` §1 an M3 angepasst.
- **Marke, Namen und Farben (`docs/KONZEPT-MARKE.md`):** Regeln aus CI MarKusSXCH, Produktfamilie, Icon-Set und allen
  EduKSX-Repos zusammengeführt; Gegenüberstellung je Repo, Abweichungsregister, offene Entscheide M1–M5; Regel
  «Module folgen dem UI-Konzept, Abweichungen nur mit Begründung» (auch in AGENTS.md).
- **Design-Tokens (#3):** `tokens/tokens.json` (DTCG) mit den Standardwerten «EduKSX» aus dem Glossary; Build erzeugt
  `tokens.css` (hell/dunkel), `theme.css` (Tailwind 4) und `eduksx.css` (`--eduksx-*` für Plugins).
- **Kontrastprüfung (#4):** `contrastRatio()`, `checkTheme()` mit den Paaren des Glossary (Text 4,5 : 1, Linien und
  Fokus 3 : 1); nur bekannte Tokens und `#rrggbb`.
- **BrandWordmark (#5):** Wortmarke nach CI-Komponentenkontrakt, übernommen aus dem Glossary.
- **Kopfzeile mit Modulwechsel (#6):** `AppHeader`, `ModuleSwitcher` (Plattform S7), Tastatur und `aria-current`.
- **Verlauf (#7):** `HistoryList` für `data_changes` (DB-Standard A7), Datum DD.MM.YYYY HH:MM:SS, keine Werte bei
  «changed».
- **Rahmen von Eingabefeldern (#4):** `input` dunkler (hell #8a94a6, dunkel #6b7a90), neues Prüfpaar
  `input`/`background` 3 : 1 (WCAG 1.4.11).
- **Markentokens (#3):** nur noch `brand-orange`, `brand-blue`, `brand-neutral` (und `brand-violet`); die doppelten
  `brand`, `brand-accent`, `brand-ink` entfallen – im Glossary nachziehen.
- README: Dunkelmodus über `.dark`, Rückfall von `eduksx.css` auf helle Werte, Inter selbst hosten.
- Grundgerüst: GitHub-Blueprint, Lizenz MIT, `npm run check`, Steckbrief bestätigt.
- **Ideen-Erfassung (#9):** Label `idee` und Issue-Vorlage «Idee festhalten» für lose Ideen ohne Meilenstein.
- **Übernahme aus dem INTRANET (#21):** `docs/UEBERNAHME-INTRANET-GUI.md` hält Erscheinungsbild, Themes,
  GUI-Prototypen mit allen 41 Bausteinen und den GUI-Teil des Sprachkonzepts fest (Entwurf, ohne Links ins INTRANET).
