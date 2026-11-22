# EduKSX-Icon-Set

18 Icons der Produktfamilie EduKSX in den Farben des CI MarKusSXCH (CI-Manual v1.0, Markenfortschreibung v1.1).
**Status: freigegeben** am 09.11.2026 (12 Icons) und 13.11.2026 (Intranet, Timetable, Staffing, Ops) und 22.11.2026 (Flow, Planner) durch Markus
Keller. Änderungen an Motiven oder Farben brauchen eine neue Freigabe.

Übernommen aus dem Repo markussxch am 22.11.2026 (#31). **Massgeblich ist diese Kopie**; markussxch behält eine Kopie
für die Website. Regeln: `docs/KONZEPT-MARKE.md` Abschnitt 6.

## Varianten je Icon

| Datei | Verwendung |
| --- | --- |
| `svg/<name>.svg` | einfarbig (`currentColor`), 24 × 24 – Oberfläche, übernimmt die Textfarbe |
| `svg/<name>-color.svg` | farbig ohne Kachel, für helle Flächen |
| `svg/<name>-tile-dark.svg` | App-Icon, dunkle Kachel |
| `svg/<name>-tile-light.svg` | App-Icon, helle Kachel |
| `png/<grösse>/<name>-tile-*.png` | App-Icons als PNG in 512, 192, 64 und 32 px |

Namen: `eduksx` (Familie) und `eduksx-<schlüssel>` für glossary, codex, core, ident, shop, licence, portal, connect,
services, sign, time, intranet, timetable, staffing, ops, flow, planner.

## Gestaltung

- 24er-Raster, Strichstärke 1,75, runde Enden und Ecken
- Orange `#FF8A00` = EduKSX-Hauptakzent; Blau `#007EBB` / `#32B8F2` und Violett `#7952B3` / `#B59AFF` für Details
- Neutral `#222222` (hell) bzw. `#F2F5F8` (dunkel)
- Kachel 48 × 48, Eckenradius 11; Fläche hell `#F2F5F8` mit feinem Rand, dunkel `#222222`

| Icon | Motiv |
| --- | --- |
| EduKSX | Vier Bausteine in den Wortmarkenfarben E · du · K · SX |
| Glossary | Offenes Buch mit A–Z |
| Codex | Waage |
| Core | Sechseck mit Kern |
| Ident | Ausweis |
| Shop | Tasche mit Häkchen |
| Licence | Schlüssel |
| Portal | Torbogen mit Pfeil |
| Connect | Drei verbundene Knoten |
| Services | Zahnrad |
| Sign | Feder mit Unterschrift |
| Time | Uhr |
| Intranet | Haus mit vier Bausteinen |
| Timetable (Stundenplan) | Raster mit Kalenderkopf, eine Lektion markiert |
| Staffing (Einsatzplanung) | Person mit Kalender |
| Ops (Leitstand) | Bildschirm mit Puls |
| Flow (Abläufe) | Flussdiagramm: Startkasten, Entscheidungs-Raute, zwei Ziele |
| Planner (Jahresplanung) | Zeitbalken: drei versetzte Balken auf einer Zeitachse |

## Im Code

```tsx
import { EduksxIcon } from '@eduksx/ui';

<EduksxIcon name="glossary" />                         // farbig, 24 px
<EduksxIcon name="codex" variant="mono" />             // einfarbig in Textfarbe
<EduksxIcon name="eduksx" variant="tile" size={64} />  // App-Kachel
```

Dateien direkt: `@eduksx/ui/icons/svg/eduksx-glossary.svg`, `@eduksx/ui/icons/png/192/eduksx-glossary-tile-dark.png`.

## Anpassen

Quelle für alles ist `build.py` (nur Python-Standardbibliothek):

```sh
python3 icons/build.py                                              # SVG neu erzeugen
python3 icons/build.py --ts src/components/eduksx-icons.data.ts     # Daten für EduksxIcon
rsvg-convert -w 512 icons/svg/eduksx-tile-dark.svg -o icons/png/512/eduksx-tile-dark.png   # PNG (oder Playwright-Screenshot mit transparentem Hintergrund)
```

Nach einer Änderung alle drei Schritte ausführen; der Test `tests/eduksx-icon.test.tsx` prüft, dass Dateien und
Baustein übereinstimmen.
