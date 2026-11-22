# EduKSX-UI – Projektstand

> Stand 22.11.2026 (03:50): Grundgerüst `@eduksx/ui` 0.1 im PR – Tokens, Kontrastprüfung, Wortmarke, Kopfzeile mit
> Modulwechsel und Verlauf; Issues #3–#7 im Beta-Test. Als Nächstes: Übernahme in Glossary und Intranet (EduKSX-Architektur #83).

## Umgesetzt

| Bereich | Stand | Seit Version | Konzept |
|---|---|---|---|
| Design-Tokens `tokens/tokens.json` und Build | im Beta-Test | 0.1.0 | KONZEPT-DESIGN 3 |
| Kontrastprüfung `checkTheme()` | im Beta-Test | 0.1.0 | KONZEPT-DESIGN 3, 5 |
| `BrandWordmark` | im Beta-Test | 0.1.0 | KONZEPT-DESIGN 4, CI-Manual §10 |
| `AppHeader`, `ModuleSwitcher` | im Beta-Test | 0.1.0 | KONZEPT-DESIGN 4, Plattform S7 |
| `HistoryList` | im Beta-Test | 0.1.0 | KONZEPT-DESIGN 4, DB A7 |
| `EduksxIcon` und Icon-Dateien `icons/` (#31) | im PR | 0.1.0 | KONZEPT-MARKE 6, 6.1 |
| Typografie- und Basis-Tokens (#25, #26) | im Beta-Test | 0.1.0 | KONZEPT-TOKENS |
| Testseite `site/` mit Vorschau-Leiste, GitHub-Pages-Workflow (#15) | im PR | 0.1.0 | TESTSEITE |

## Offen bzw. geplant

- Übernahme der Bausteine aus dem Intranet (`ui/*`, Data-Grid, Begriff, Layouts), sobald ein zweites Modul sie braucht
- axe-core in der CI auf der Testseite (#14, DS7 entschieden: serious/critical scheitern, Rest Warnung); GitHub Pages aktivieren (TS3)
- Token für Schrift auf Fehlerfläche (#11, 0.2); ModuleSwitcher bei Fokusverlust (#12); Verlauf für Bildschirmleser (#13)
- Glossary an geänderte Tokens anpassen (#16)
- Flow-Icon entwerfen und freigeben (#30)
- Veröffentlichung auf npmjs.com (Organisation «eduksx» anlegen)

## Technik

- TypeScript, React 19 (peer), Vite im Bibliotheksmodus, Vitest mit jsdom; Build der Tokens ohne Fremdpaket
  (`scripts/build-tokens.mjs`).
- Ausgaben: `dist/index.js` + Typen, `dist/tokens.css`, `dist/theme.css`, `dist/eduksx.css`.
- Prüfen: `npm run check`
