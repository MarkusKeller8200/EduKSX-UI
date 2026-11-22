# Übergabe an einen neuen Chat – EduKSX-UI

Stand: **22.11.2026 (03:50)** – Grundgerüst `@eduksx/ui` 0.1 im PR (Meilenstein «0.1.0 – Grundgerüst»), noch kein Release.
[PROJEKTSTAND.md](PROJEKTSTAND.md) (aktuell), Konzepte: EduKSX-Architektur `docs/KONZEPT-DESIGN.md`. Bei jeder Übergabe
nachführen.

## Start nächster Chat (Übergabe 22.11.2026, 03:50)

**Zuerst lesen:** CLAUDE.md → AGENTS.md → dieser Abschnitt → PROJEKTSTAND.md → KONZEPT-DESIGN in EduKSX-Architektur.

**Stand Code und CI**
- `main`: Blueprint angewendet; Grundgerüst im PR «Grundgerüst @eduksx/ui 0.1».
- Kein Release; `package.json` 0.1.0. Release nur auf ausdrückliche Freigabe.
- Prüfen: `npm ci && npm run check` (Tokens, Typen, 10 Tests, Build).

**Offene Issues und ihr Status**

| Issue | Meilenstein | Status | Inhalt |
|---|---|---|---|
| #3 | 0.1.0 – Grundgerüst | `_3 Beta-Test` | Design-Tokens und Build |
| #4 | 0.1.0 – Grundgerüst | `_3 Beta-Test` | Kontrastprüfung |
| #5 | 0.1.0 – Grundgerüst | `_3 Beta-Test` | BrandWordmark |
| #6 | 0.1.0 – Grundgerüst | `_3 Beta-Test` | Kopfzeile mit Modulwechsel |
| #7 | 0.1.0 – Grundgerüst | `_3 Beta-Test` | Verlauf |

**Hinweise für die Arbeit**
- Tokens nur in `tokens/tokens.json` ändern; `dist/` und `src/generated/` erzeugt `npm run tokens` bzw. der Build.
- Standardwerte stammen aus EduKSX-Glossary `resources/css/app.css`; Änderungen dort und hier gleich halten, bis das
  Glossary `@eduksx/ui` nutzt.
- Module installieren über Git (`github:MarkusKeller8200/EduKSX-UI#v0.1.0`, `prepare` baut); npm später.
- Repository-Einstellungen, Rulesets, Actions-Rechte und Dependabot-Sicherheitsupdates liessen sich aus der
  Cloud-Sitzung nicht setzen: lokal `python3 .github/blueprint/apply.py --ziel ../EduKSX-UI --nur-github` im Blueprint.
- Offen in KONZEPT-DESIGN: DS7 (axe-core als Warnung oder Fehler, Musterseite).

**Arbeitsregeln** (siehe AGENTS.md)
- Jedes Thema aus dem Chat → Issue mit Testliste; Status `_1 bereit` → `_2 in Arbeit` → `_3 Beta-Test`.
- Verbesserungen aus dem Test nur als Issue anlegen; umsetzen erst nach Freigabe.

## Sitzungen

### Sitzung 22.11.2026 (03:40) – Repo eingerichtet, Grundgerüst 0.1

- Auftrag im Chat: Arbeiten im neuen Repo EduKSX-UI nach KONZEPT-DESIGN (EduKSX-Architektur #75).
- Blueprint angewendet (Steckbrief bestätigt, Verteilung zuerst über Git), Labels und Meilensteine angelegt.
- Grundgerüst: Tokens (DTCG) mit Build, Kontrastprüfung, BrandWordmark, AppHeader/ModuleSwitcher, HistoryList; Tests.
