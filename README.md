# EduKSX-UI

Design-System der EduKSX-Plattform: Design-Tokens (tokens.json, DTCG), Kontrastprüfung und React-Bausteine als npm-Paket @eduksx/ui für alle EduKSX-Module.

Grundlage: [KONZEPT-DESIGN.md](https://github.com/MarkusKeller8200/EduKSX-Architektur/blob/main/docs/KONZEPT-DESIGN.md)
Marke, Namen und Farben aller Module: [docs/KONZEPT-MARKE.md](docs/KONZEPT-MARKE.md) – verbindlich für alle EduKSX-Module.
in EduKSX-Architektur. Das CI von MarKusSXCH bestimmt das Aussehen, dieses Paket die Bausteine; Barrierefreiheit geht
vor (WCAG 2.1 AA, eCH-0059).

## Inhalt (0.1)

| Teil | Datei / Export |
| --- | --- |
| Design-Tokens «EduKSX» (DTCG) | `tokens/tokens.json` – einzige Quelle für Farben, Radius, Schrift |
| CSS-Variablen hell/dunkel | `@eduksx/ui/tokens.css` (`:root`, `.dark`) |
| Tailwind-4-Theme | `@eduksx/ui/theme.css` (`bg-primary`, `text-muted-foreground` …) |
| Variablen für Plugins | `@eduksx/ui/eduksx.css` (`--eduksx-*`) |
| Kontrastprüfung | `contrastRatio()`, `checkTheme()`, `KNOWN_TOKENS` – auch für die Aktivierung von Themes |
| Wortmarke | `<BrandWordmark suffix="Glossary" />` nach CI-Komponentenkontrakt |
| Kopfzeile mit Modulwechsel | `<AppHeader product="Glossary" modules={…} currentModule="glossary" />` (Plattform S7) |
| Verlauf | `<HistoryList entries={…} fieldLabels={…} />` für `data_changes` (DB-Standard A7) |

## Verwenden

Bis zur Veröffentlichung auf npm über Git (Tag):

```bash
npm install github:MarkusKeller8200/EduKSX-UI#v0.1.0
```

```css
/* app.css des Moduls (Tailwind 4) */
@import "tailwindcss";
@import "@eduksx/ui/tokens.css";
@import "@eduksx/ui/theme.css";
@source "../../node_modules/@eduksx/ui/dist";
```

- **Dunkelmodus:** nur über die Klasse `.dark` (z. B. auf `<html>`), kein automatisches `prefers-color-scheme`.
  Das Modul setzt die Klasse selbst, etwa über einen Umschalter System/Hell/Dunkel.
- **Plugins (`eduksx.css`):** `--eduksx-*` verweist auf die Variablen aus `tokens.css`; fehlt diese, gelten die
  hellen Standardwerte.
- **Schrift:** Das Paket liefert keine Schriftdatei. Module hosten Inter selbst (kein Abruf bei Google Fonts);
  `--font-sans` ist gesetzt, ohne Inter greift `system-ui`.

## Entwickeln

```bash
npm ci
npm run check   # Tokens erzeugen, Typen, Tests, Build
```

Tokens nur in `tokens/tokens.json` ändern; `dist/` und `src/generated/` entstehen beim Build.

## Mitmachen

Fehler, Verbesserungen und Ideen bitte über die Issue-Formulare melden. Wie Meldungen freigegeben und umgesetzt
werden, steht in [CONTRIBUTING.md](CONTRIBUTING.md) und [docs/GITHUB-ABLAUF.md](docs/GITHUB-ABLAUF.md).
Sicherheitslücken bitte nicht öffentlich melden, sondern wie in [SECURITY.md](SECURITY.md) beschrieben.

## Versionen

Änderungen stehen im [CHANGELOG.md](CHANGELOG.md). Releases entstehen nach Freigabe automatisch (`package.json`,
Workflow `release.yml`).
