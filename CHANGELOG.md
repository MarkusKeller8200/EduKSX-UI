# Changelog – EduKSX-UI

Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/), Versionen nach
[Semantic Versioning](https://semver.org/lang/de/) (MAJOR.MINOR.PATCH). Neue Einträge kommen laufend unter
**Unveröffentlicht**; `python3 .github/blueprint/release.py set X.Y.Z --commit` macht daraus eine Version.

## [Unveröffentlicht]

### Neu

- **EduKSX-Icons (#31):** freigegebenes Icon-Set (16 Icons, SVG einfarbig/farbig/Kachel, PNG 512–32) und Generator
  `icons/build.py` aus markussxch übernommen – EduKSX-UI ist jetzt die Quelle; Baustein `EduksxIcon` (`color`, `mono`,
  `tile`), Token `icon-tile`, im Paket unter `icons/`.
- **Schrift für Code und IDs (#31, M6):** Token `font.mono` (JetBrains Mono, Rückfall `ui-monospace, monospace`) → `--font-mono`,
  Tailwind `font-mono`; Regel «keine plattformabhängigen Schriften», kein Aptos.
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
