# Testseite des Designsystems (#15, Ideen #17, #19, #21)

Stand: 2026-11-22 · Status: **IN ARBEIT**

Einstiegspunkt auf GitHub Pages: **https://markuskeller8200.github.io/EduKSX-UI/** (sobald Pages aktiviert ist).
Lokal: `npm run site` (Entwicklung mit Neuladen), `npm run site:build` und `npm run site:preview` (gebaute Seite).

## 1. Regel (BESCHLOSSEN 22.11.2026, Auftrag Markus)

Alle grafischen und UI-Entscheide müssen **visuell prüfbar** sein. Wer einen Token, eine Markenregel oder einen
Baustein ändert oder neu einführt, macht ihn im selben PR auf der Testseite sichtbar. Ein Entscheid gilt erst als
abnahmebereit, wenn er dort hell und dunkel und in allen Pflicht-Ansichten (§3) angeschaut werden kann.

## 2. Aufbau

| Teil | Datei | Inhalt |
| --- | --- | --- |
| Inhaltsverzeichnis | `site/src/registry.ts` | eine Zeile je Seite: Gruppe, Status, Konzept, Issues, Komponente |
| Vorschau-Leiste und Rahmen | `site/src/app.tsx` | Farbschema, Vergleich, Ansicht, Ausrichtung, Vollbild; Navigation |
| Einstellungen | `site/src/settings.ts` | je Browser in `localStorage`, nur Anzeige, ändert nichts für andere |
| Hilfsbausteine | `site/src/ui.tsx` | `Example`, `Block`, `Table`, `StatusBadge`, `Swatch` |
| Seiten | `site/src/sections/` | Grundlagen, Marke; Bausteine unter `sections/bausteine/` |
| Schriften | `site/public/fonts/` | Inter und JetBrains Mono, selbst gehostet (M6), OFL-Lizenztexte daneben |
| Statische Prüfseiten | `docs/pruefseiten/*.html` | beim Bau nach `pruefseiten/` übernommen (`site/vite.config.ts`) |
| Prüfung | `scripts/check-site.mjs`, `tests/testseite.test.tsx` | keine fremden Schriftabrufe; jede Seite zeichnet sich |
| Ausrollen | `.github/workflows/testseite.yml` | PR: bauen; `main`: bauen und auf GitHub Pages ausrollen |

Werkzeug (BESCHLOSSEN 22.11.2026): eigene Vite-Seite mit React statt Storybook – keine neue Pflicht-Abhängigkeit,
zeigt die echten Bausteine im EduKSX-Look und lässt sich zum GUI-Tester nach Intranet-Vorbild ausbauen (#21).
Tailwind 4 und Lucide sind nur Entwicklungsabhängigkeiten der Testseite, nicht des Pakets.

## 3. Vorschau-Leiste

| Gruppe | Optionen (Lucide-Symbol) | Herkunft |
| --- | --- | --- |
| Farbschema | Hell (`Sun`), Dunkel (`Moon`), Wie System (`SunMoon`) | Idee #17, KONZEPT-MARKE 6.2 |
| Vergleich | Beispiele hell und dunkel nebeneinander (`Columns2`); die Seite bleibt dabei hell | #15 |
| Ansicht | Handy (`Smartphone`), Tablet (`Tablet`), Darstellungsoptimiert (`Laptop`), Breit (`MoveHorizontal`), Voll (`Maximize2`) | Idee #19, KONZEPT-TOKENS 4.3 |
| Ausrichtung (Handy, Tablet) | Hochformat (`RectangleVertical`), Querformat (`RectangleHorizontal`) | Idee #19 |
| Vollbild (Desktop) | `Expand`, Escape beendet | Idee #19 |

Handy und Tablet zeigen dieselbe Seite in einem `iframe` in Gerätegrösse, damit Breakpoints und `desk:` wirklich
greifen; passt das Gerät nicht ins Fenster, wird es verkleinert (Angabe in Prozent). Gerätegrössen (EMPFOHLEN):
Handy 390 × 844, Tablet 820 × 1180 CSS-Pixel (`site/src/devices.ts`).

**Pflicht-Ansichten** (aus Idee #19, für jede Oberfläche): Handy hoch und quer, Tablet hoch und quer,
Darstellungsoptimiert, Breit, Voll – jeweils hell und dunkel.

## 4. Neuen Baustein ergänzen (z. B. aus #27)

1. Seite `site/src/sections/bausteine/<name>.tsx` mit dem Gerüst `BausteinSeite` (Beispiele, Verwendung, Zum Prüfen).
   Beispiele immer in `<Example>`, damit Farbschema und Vergleich greifen; nur erfundene Beispieldaten.
2. Eintrag in `ENTRIES` (`site/src/registry.ts`), Gruppe `Bausteine`, Status (`entwicklung` → `beta` →
   `freigegeben`), Konzept und Issues.
3. `npm run check` – der Test zeichnet jede Seite und prüft die Überschrift.

Neue Grundlagen (Tokens) oder Prüfseiten genauso; statische HTML-Prüfseiten zusätzlich in `PRUEFSEITEN`
(`site/vite.config.ts`) eintragen und Schriften über `../../site/public/fonts/fonts.css` laden.

## 5. Entscheide

| Nr. | Frage | Entscheid | Status |
| --- | --- | --- | --- |
| TS1 | Werkzeug der Testseite | eigene Vite-Seite (React), kein Storybook | BESCHLOSSEN 22.11.2026 |
| TS2 | Gerätegrössen der Pflicht-Ansichten | Handy 390 × 844, Tablet 820 × 1180 | EMPFOHLEN |
| TS3 | GitHub Pages aktivieren (Source «GitHub Actions») | aktiviert durch Markus | BESCHLOSSEN 22.11.2026 |

## 5a. Automatische Prüfung mit axe-core (DS7, #14)

`tests/barrierefreiheit.test.tsx` zeichnet jede Seite der Testseite in jsdom und prüft sie mit axe-core
(`tests/a11y.ts`). Verstösse «serious» und «critical» lassen `npm run check` und damit die CI scheitern,
«moderate» und «minor» erscheinen nur als Warnung im Protokoll. Nicht geprüft werden dort Kontrast (jsdom rechnet
keine Farben, dafür gibt es die Kontrastprüfung) und eingebettete Iframes (Prüfseiten, im Browser prüfen). Neue
Bausteine sind automatisch dabei, sobald ihre Seite in `site/src/registry.ts` steht.

## 6. Später

- Ausbau zum GUI-Tester (#21): je Baustein Reiter Beispiele, Versionen & Status, Überarbeitung, Wünsche; Themes in
  der Vorschau-Leiste (#18).
- Sprachwahl und Prüfseite der Übersetzungen (UEBERNAHME-INTRANET-GUI §4).
