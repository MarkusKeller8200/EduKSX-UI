# Übergabe an einen neuen Chat – EduKSX-UI

Stand: **22.11.2026 (03:50)** – Grundgerüst `@eduksx/ui` 0.1 im PR (Meilenstein «0.1.0 – Grundgerüst»), noch kein Release.
[PROJEKTSTAND.md](PROJEKTSTAND.md) (aktuell), Konzepte: EduKSX-Architektur `docs/KONZEPT-DESIGN.md`. Bei jeder Übergabe
nachführen.

## Start nächster Chat (Übergabe 22.11.2026, 03:50)

**Zuerst lesen:** CLAUDE.md → AGENTS.md → dieser Abschnitt → PROJEKTSTAND.md → KONZEPT-DESIGN in EduKSX-Architektur.

**Stand Code und CI**
- `main`: Blueprint angewendet; Grundgerüst im PR «Grundgerüst @eduksx/ui 0.1».
- Kein Release; `package.json` 0.1.0. Release nur auf ausdrückliche Freigabe.
- Prüfen: `npm ci && npm run check` (Tokens, Typen, 12 Tests, Build).

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
- DS7 entschieden (22.11.2026): axe-core «serious»/«critical» lassen die CI scheitern, Rest Warnung (#14);
  Musterseite für 0.2 (#15). In KONZEPT-DESIGN (EduKSX-Architektur) noch nachführen.
- Glossary an `input` und Markentokens anpassen (#16).
- Marke, Namen, Farben: `docs/KONZEPT-MARKE.md` (22.11.2026). M0, M2–M5 entschieden (M3: DS4 in Architektur anpassen), M1 offen; Abweichungsregister §8.
  Neue Regel: Module folgen dem UI-Konzept, Abweichungen nur mit Begründung im Modul.
- Icons (22.11.2026, #31): EduKSX-UI ist Quelle des Icon-Sets (`icons/`, `EduksxIcon`); in markussxch bleibt eine
  Kopie mit Vermerk «Quelle EduKSX-UI», nichts gelöscht. Flow-Icon (#30) am 22.11.2026 aus dem Prototyp-Entwurf übernommen. M6 entschieden: Inter + JetBrains Mono, keine plattformabhängigen Schriften. Idee #20 ist mit
  KONZEPT-MARKE 6.2 inhaltlich erledigt; Überführung nach Ideen-Ablauf (DS-Entscheid in Architektur) noch offen.
- Grundbausteine (#27, #11 im Beta-Test): `docs/KONZEPT-BAUSTEINE.md`, PR #34 gemergt 22.11.2026. B1–B4 BESCHLOSSEN
  (HTML-Basis ohne Abhängigkeit, shadcn-Namen, Toast später, Token
  `destructive-contrast` löst #11). Musterseite (#15) baut ein anderer Thread; Bausteine tragen `data-slot`.
- Typografie- und Basis-Tokens (#25, #26): `docs/KONZEPT-TOKENS.md`, T1–T3 entschieden 22.11.2026, PR offen
  (Merge nach Freigabe). Glossary H3 17 → 18 px beim Umstieg angleichen (#16).

**Arbeitsregeln** (siehe AGENTS.md)
- Jedes Thema aus dem Chat → Issue mit Testliste; Status `_1 bereit` → `_2 in Arbeit` → `_3 Beta-Test`.
- Verbesserungen aus dem Test nur als Issue anlegen; umsetzen erst nach Freigabe.

## Sitzungen

### Sitzung 22.11.2026 (15:45) – Testseite auf GitHub Pages (#15, Ideen #17, #19, #21)

- Auftrag Markus: Testseite als Einstieg auf GitHub Pages, alle grafischen/UI-Entscheide visuell prüfbar (Regel in
  AGENTS.md und `docs/TESTSEITE.md`). TS1 entschieden: eigene Vite-Seite statt Storybook.
- `site/` mit Vorschau-Leiste (Hell/Dunkel/System, Vergleich, Handy/Tablet hoch/quer, Darstellungsoptimiert/Breit/Voll,
  Vollbild), Seiten zu Tokens, Marke, Bausteinen und Prüfseite Schriftgewichte; Schriften selbst gehostet.
- Workflow `testseite.yml`; offen: Merge und Aktivierung von Pages (TS3) nach Freigabe. Neue Bausteine aus #27 nach
  `docs/TESTSEITE.md` §4 ergänzen.

### Sitzung 22.11.2026 (15:15) – Typografie- und Basis-Tokens (#25, #26)

- Skalen aus Intranet/Glossary (Tailwind-Standards) als Tokens übernommen, `docs/KONZEPT-TOKENS.md` angelegt.
- Entschieden mit Markus: T1 Bedienung 14 px / Fliesstext 16 px, T2 Titel wie Intranet 30/20/18/16, T3 Variante
  `desk` ins Paket. Offen: T4 dichtere Administration (Idee #23).
- Build erweitert (`tokens.css`, `theme.css`, `eduksx.css`), Tests `tests/basis-tokens.test.ts`; Merge erst nach Freigabe.

### Sitzung 22.11.2026 (14:00) – Review PR #8 mit Fragekatalog

- 16 Fragen mit Markus entschieden (Fragekatalog in den Projektdateien `pr8-review/fragekatalog.md`).
- In PR #8: `input` dunkler + Prüfpaar 3:1 (WCAG 1.4.11), Markentokens `brand`/`brand-accent`/`brand-ink` entfernt,
  README (Dunkelmodus, `eduksx.css`, Inter), Tests für alle vier Verlaufsaktionen und das neue Prüfpaar.
- Neue Issues (triage): #11 Schrift auf Fehlerfläche (0.2), #12 ModuleSwitcher Fokusverlust, #13 Verlauf für
  Bildschirmleser, #14 axe-core (DS7), #15 Musterseite (0.2), #16 Glossary nachziehen.
- Merge von PR #8 (Squash) erst nach eigener Freigabe.

### Sitzung 22.11.2026 (03:40) – Repo eingerichtet, Grundgerüst 0.1

- Auftrag im Chat: Arbeiten im neuen Repo EduKSX-UI nach KONZEPT-DESIGN (EduKSX-Architektur #75).
- Blueprint angewendet (Steckbrief bestätigt, Verteilung zuerst über Git), Labels und Meilensteine angelegt.
- Grundgerüst: Tokens (DTCG) mit Build, Kontrastprüfung, BrandWordmark, AppHeader/ModuleSwitcher, HistoryList; Tests.
