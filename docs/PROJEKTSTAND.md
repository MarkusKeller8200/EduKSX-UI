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

## Offen bzw. geplant

- Übernahme der Bausteine aus dem Intranet (`ui/*`, Data-Grid, Begriff, Layouts), sobald ein zweites Modul sie braucht
- axe-core in der CI (#14, DS7 entschieden: serious/critical scheitern, Rest Warnung) und Musterseite (#15, 0.2)
- Token für Schrift auf Fehlerfläche (#11, 0.2); ModuleSwitcher bei Fokusverlust (#12); Verlauf für Bildschirmleser (#13)
- Glossary an geänderte Tokens anpassen (#16)
- Veröffentlichung auf npmjs.com (Organisation «eduksx» anlegen)

## Technik

- TypeScript, React 19 (peer), Vite im Bibliotheksmodus, Vitest mit jsdom; Build der Tokens ohne Fremdpaket
  (`scripts/build-tokens.mjs`).
- Ausgaben: `dist/index.js` + Typen, `dist/tokens.css`, `dist/theme.css`, `dist/eduksx.css`.
- Prüfen: `npm run check`
