# Changelog – EduKSX-UI

Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/), Versionen nach
[Semantic Versioning](https://semver.org/lang/de/) (MAJOR.MINOR.PATCH). Neue Einträge kommen laufend unter
**Unveröffentlicht**; `python3 .github/blueprint/release.py set X.Y.Z --commit` macht daraus eine Version.

## [Unveröffentlicht]

### Neu

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
