# EduKSX-UI

Design-System der EduKSX-Plattform: Design-Tokens (tokens.json, DTCG), Kontrastprüfung und React-Bausteine als npm-Paket @eduksx/ui für alle EduKSX-Module.

Grundlage: [KONZEPT-DESIGN.md](https://github.com/MarkusKeller8200/EduKSX-Architektur/blob/main/docs/KONZEPT-DESIGN.md)
Marke, Namen und Farben aller Module: [docs/KONZEPT-MARKE.md](docs/KONZEPT-MARKE.md) – verbindlich für alle EduKSX-Module.
Wann was eingesetzt wird (Farben, Bausteine, Layout, GUI-Profile, Texte): [docs/GUIDELINE.md](docs/GUIDELINE.md).
in EduKSX-Architektur. Das CI von MarKusSXCH bestimmt das Aussehen, dieses Paket die Bausteine; Barrierefreiheit geht
vor (WCAG 2.1 AA, eCH-0059).

## Inhalt (0.1)

| Teil | Datei / Export |
| --- | --- |
| Design-Tokens «EduKSX» (DTCG) | `tokens/tokens.json` – einzige Quelle für Farben, Schrift (Grössen, Gewichte, Textrollen), Abstände, Radien, Schatten, Breakpoints, Seitenbreiten und Animation (`docs/KONZEPT-TOKENS.md`) |
| CSS-Variablen hell/dunkel | `@eduksx/ui/tokens.css` (`:root`, `.dark`) |
| Tailwind-4-Theme | `@eduksx/ui/theme.css` (`bg-primary`, `text-sm`, `rounded-md`, `shadow-sm`, `max-w-page-optimized`, Variante `desk:`, Textrollen `typo-h1` … `typo-small`) |
| Variablen für Plugins | `@eduksx/ui/eduksx.css` (`--eduksx-*`) |
| Kontrastprüfung | `contrastRatio()`, `checkTheme()`, `KNOWN_TOKENS` – auch für die Aktivierung von Themes |
| Wortmarke | `<BrandWordmark suffix="Glossary" />` nach CI-Komponentenkontrakt |
| Icons | `<EduksxIcon name="glossary" variant="color\|mono\|tile" />`; Dateien (SVG, PNG) unter `@eduksx/ui/icons/…`, siehe `icons/README.md` |
| Kopfzeile mit Modulwechsel | `<AppHeader product="Glossary" modules={…} currentModule="glossary" />` (Plattform S7) |
| Verlauf | `<HistoryList entries={…} fieldLabels={…} />` für `data_changes` (DB-Standard A7) |
| Grundbausteine (#27) | `Button`, `IconButton`, `Tooltip`, `Field` mit `Input`/`Textarea`/`NativeSelect`, `Checkbox`, `Table…`, `Dialog`, `AlertDialog` (Rückfrage), `Alert` (Hinweisbox) – Varianten wie shadcn/ui, siehe `docs/KONZEPT-BAUSTEINE.md` |

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
- **Schrift:** Das Paket liefert keine Schriftdatei. Module hosten Inter und für Code/IDs JetBrains Mono selbst (kein
  Abruf bei Google Fonts); `--font-sans` und `--font-mono` sind gesetzt, Rückfall nur `system-ui` bzw. `ui-monospace`.
  Keine plattformabhängigen Schriften (KONZEPT-MARKE 3.4, M6).
- **Weniger Bewegung:** Dauern nur über die Tokens (`transition-colors`, `duration-(--duration-normal)`); bei
  `prefers-reduced-motion` setzt `tokens.css` sie auf 0 ms.

## Testseite

Alle grafischen und UI-Entscheide sind auf der Testseite sichtbar und prüfbar – hell, dunkel und in den
Pflicht-Ansichten Handy, Tablet und Desktop: **https://markuskeller8200.github.io/EduKSX-UI/** (nach Aktivierung von
GitHub Pages). Lokal: `npm run site`. Aufbau und neue Bausteine ergänzen: [docs/TESTSEITE.md](docs/TESTSEITE.md).

## Entwickeln

```bash
npm ci
npm run check   # Tokens erzeugen, Typen, Tests, Build, Testseite
npm run site    # Testseite lokal mit Neuladen bei Änderungen
```

Tokens nur in `tokens/tokens.json` ändern; `dist/` und `src/generated/` entstehen beim Build.

## Mitmachen

Fehler, Verbesserungen und Ideen bitte über die Issue-Formulare melden. Wie Meldungen freigegeben und umgesetzt
werden, steht in [CONTRIBUTING.md](CONTRIBUTING.md) und [docs/GITHUB-ABLAUF.md](docs/GITHUB-ABLAUF.md).
Sicherheitslücken bitte nicht öffentlich melden, sondern wie in [SECURITY.md](SECURITY.md) beschrieben.

## Versionen

Änderungen stehen im [CHANGELOG.md](CHANGELOG.md). Releases entstehen nach Freigabe automatisch (`package.json`,
Workflow `release.yml`).
