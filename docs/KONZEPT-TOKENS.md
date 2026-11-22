# Konzept: Typografie- und Basis-Tokens (#25, #26)

Stand: 2026-11-22 (0.1.0 – Grundgerüst) · Status: **IN ARBEIT**

Gilt für alle EduKSX-Module (Verbindlichkeit siehe `AGENTS.md` und `KONZEPT-MARKE.md` §1). Werte stehen nur in
`tokens/tokens.json` (DTCG); der Build erzeugt daraus `tokens.css` (Variablen hell/dunkel), `theme.css`
(Tailwind 4) und `eduksx.css` (`--eduksx-*` für Plugins). Farben, Marke und Schriftfamilien: `KONZEPT-MARKE.md`.

## 1. Ziel

Bisher gab es ausser Farben nur einen Radius und die Schriftfamilien. Damit alle Module gleich aussehen, braucht es
gemeinsame Skalen für Schrift, Abstände, Radien, Schatten, Breakpoints und Animation (Auftrag Markus 22.11.2026).

**Quelle der Werte (BESCHLOSSEN 22.11.2026):** Intranet und Glossary nutzen heute die Tailwind-Standardskalen
(Auszählung 22.11.2026: `text-sm` über 700-mal, `gap-2`, `rounded-md`, `shadow-xs`). Die Tokens übernehmen diese
Werte, damit bestehende Seiten unverändert bleiben und der Umstieg auf `@eduksx/ui` nichts verschiebt.

**Nichtziele:** Schriftdateien (Module hosten Inter und JetBrains Mono selbst, M6); eine dichtere Variante für die
Administration (gehört zu den GUI-Profilen, Idee #23); der Umschalter der Ansichten (Idee #19).

## 2. Schrift (#25)

### 2.1 Grössen (BESCHLOSSEN 22.11.2026, T1)

| Token | Wert | Zeilenhöhe | Verwendung |
| --- | --- | --- | --- |
| `font.size.xs` | 0,75 rem (12 px) | 1,33 | Zusatzinfo, Zeitstempel, Badges – **kleinste erlaubte Grösse** |
| `font.size.sm` | 0,875 rem (14 px) | 1,43 | **Bedienelemente, Tabellen, Formulare, Menüs** |
| `font.size.base` | 1 rem (16 px) | 1,5 | **Fliesstext** |
| `font.size.lg` | 1,125 rem (18 px) | 1,56 | Einleitung, H3 |
| `font.size.xl` | 1,25 rem (20 px) | 1,4 | H2 |
| `font.size.2xl` | 1,5 rem (24 px) | 1,33 | H1 auf dem Handy |
| `font.size.3xl` | 1,875 rem (30 px) | 1,2 | H1 |

Tailwind: `text-xs` … `text-3xl` (gleiche Namen wie bisher).

### 2.2 Textrollen (BESCHLOSSEN 22.11.2026, T2)

| Rolle | Grösse | Gewicht | Zeilenhöhe | Klasse |
| --- | --- | --- | --- | --- |
| H1 Seitentitel | 24 px, ab `md` 30 px | 600 | 1,25, Laufweite −0,025 em | `typo-h1` |
| H2 Abschnitt | 20 px | 600 | 1,25, Laufweite −0,025 em | `typo-h2` |
| H3 | 18 px | 600 | 1,25 | `typo-h3` |
| H4 | 16 px | 600 | 1,5 | `typo-h4` |
| Einleitung | 18 px | 400 | 1,75 | `typo-lead` |
| Fliesstext | 16 px | 400 | 1,75 | `typo-body` |
| Bedienung | 14 px | 400 | 1,5 | `typo-ui` |
| Beschriftung, Knopf | 14 px | 500 | 1,5 | `typo-label` |
| Zusatzinfo | 12 px | 500 | 1,5 | `typo-small` |

Übernommen aus dem Intranet (`ui/typography.tsx`: H1 `text-2xl md:text-3xl`, H2 `text-xl`, H3 `text-lg`,
H4 `text-base`, Text `leading-7`); das Glossary (Markdown 30/20/17 px) passt H3 auf 18 px an.
Gewichte nach M7: 400 Text, 500 Beschriftungen, 600 Titel und Wortmarke, 700 stark (`font.weight.*`,
Tailwind `font-regular`, `font-medium`, `font-semibold`, `font-bold`).

### 2.3 Regeln (BESCHLOSSEN 22.11.2026)

- Alle Grössen in **rem**, nie in px: so greifen Browser-Schriftgrösse und **200 % Zoom** (WCAG 1.4.4). Der Build
  bricht ab, wenn eine Schriftgrösse oder ein Breakpoint nicht in rem steht.
- Kleiner als 12 px nur für Wortmarke und Grafiken, nie für lesbaren Text.
- Fliesstext auf Lesebreite begrenzen (`max-w-prose`, 65 Zeichen, Richtwert 60–75); Listen, Tabellen und kurze
  Hinweise nutzen die volle Breite (Glossary DEC-023).
- Zeilenhöhe im Fliesstext mind. 1,5 (WCAG 1.4.12); Seiten dürfen nicht brechen, wenn Nutzer:innen Zeilen-, Wort-
  und Buchstabenabstand erhöhen – also keine festen Höhen für Textbehälter.
- Bei 200 % Zoom bleibt alles ohne waagrechtes Scrollen lesbar (WCAG 1.4.10 bei 320 px Breite), ausser Tabellen,
  die in ihrem Scrollbereich bleiben.

## 3. Abstände, Radien, Schatten (#26, BESCHLOSSEN 22.11.2026)

- **Abstände:** Raster 4 px (`size.spacing` = 0,25 rem → `p-1` = 4 px, `gap-2` = 8 px, `p-4` = 16 px). Üblich:
  `gap-1`/`gap-2` innerhalb eines Bausteins, `gap-4` zwischen Bausteinen, `p-4`/`p-6` in Karten, `gap-6`/`gap-8`
  zwischen Abschnitten. Halbe Stufen (`gap-0.5`, `gap-1.5`) nur für Feinausrichtung.
- **Radien:** `radius.sm` 6 px (Badge, Kbd, Code), `radius.md` 8 px (Knöpfe, Felder), `radius.lg` 10 px (Karten,
  Dialoge, Menüs; gleich `--radius`), `radius.xl` 14 px (grosse Flächen), `radius.full` (Pillen, Avatare,
  Schalter). Tailwind `rounded-sm` … `rounded-full`.
- **Schatten:** `shadow.xs` (Felder, Umriss-Knöpfe), `sm` (Karten), `md` (Menüs, Popover), `lg` (Dialoge,
  Meldungen). Im Dunkelmodus kräftiger (Deckkraft 40–50 % statt 5–10 %), weil Schatten auf dunklem Grund sonst
  verschwinden; Flächen trennt dort zusätzlich der Rahmen `border`. Die Wortmarke hat nie Schatten (KONZEPT-MARKE).

## 4. Breakpoints und Seitenbreiten (#26)

### 4.1 Breakpoints (BESCHLOSSEN 22.11.2026)

| Token | Wert | Bedeutung |
| --- | --- | --- |
| `breakpoint.sm` | 40 rem (640 px) | kein Handy hochkant |
| `breakpoint.md` | 48 rem (768 px) | Tablet hochkant; H1 wird 30 px |
| `breakpoint.lg` | 64 rem (1024 px) | Tablet quer, kleiner Laptop |
| `breakpoint.xl` | 80 rem (1280 px) | Desktop |
| `breakpoint.2xl` | 96 rem (1536 px) | grosser Bildschirm |

### 4.2 Variante `desk` (BESCHLOSSEN 22.11.2026, T3)

`desk:` gilt für «nicht Handy»: ab 640 px Breite, **ausser Handy quer** (grobe Bedienung und höchstens 500 px hoch).
Übernommen aus dem Glossary (#253, Gegenstück in JS `use-handy.tsx`). Für Umschaltungen zwischen Handy- und
Desktop-Bedienung (Navigation, Seitenleiste) `desk:` statt `sm:` verwenden; `sm:` … `2xl:` nur für Rasterbreiten.

```css
@custom-variant desk {
    @media (min-width: 40rem) and (pointer: fine), (min-width: 40rem) and (min-height: 501px) { @slot; }
}
```

### 4.3 Seitenbreiten (EMPFOHLEN, aus Glossary DEC-023; Pflicht-Ansichten folgen mit Idee #19)

| Ansicht | Token | Breite | Tailwind |
| --- | --- | --- | --- |
| Mobil | `container.page-mobile` | 384 px | `max-w-page-mobile` |
| Darstellungsoptimiert (Standard) | `container.page-optimized` | 1152 px | `max-w-page-optimized` |
| Breit | `container.page-wide` | 1536 px | `max-w-page-wide` |
| Voll | – | ganze Fensterbreite | `max-w-none` |
| Lesebreite | `container.prose` | 65 Zeichen | `max-w-prose` |

Darstellungsoptimierte Seiten (Detailseite, Konto, Anmeldung, Formulare) bleiben auch bei «Breit» und «Voll» auf
1152 px und zentriert.

## 5. Animation (#26, BESCHLOSSEN 22.11.2026)

| Token | Wert | Verwendung |
| --- | --- | --- |
| `duration.fast` | 150 ms | Hover, Farbwechsel (Standard aller `transition-*`) |
| `duration.normal` | 200 ms | Aufklappen, Menüs, Popover |
| `duration.slow` | 300 ms | Dialoge, Seitenpanel |
| `easing.standard` | cubic-bezier(0.4, 0, 0.2, 1) | Bewegung innerhalb der Seite (Standard) |
| `easing.out` | cubic-bezier(0, 0, 0.2, 1) | Einblenden |
| `easing.in` | cubic-bezier(0.4, 0, 1, 1) | Ausblenden |

- Bei `prefers-reduced-motion: reduce` setzt `tokens.css` alle Dauern auf 0 ms (WCAG 2.3.3). Darum Dauern nur über
  die Tokens angeben: `transition-colors` (nimmt `duration.fast`), sonst `duration-(--duration-normal)`;
  keine festen `duration-300`.
- Nichts blinkt oder bewegt sich länger als 5 Sekunden von selbst (WCAG 2.2.2); Ladeanzeigen ausgenommen.

## 6. Ausgabe im Build

| Datei | Inhalt |
| --- | --- |
| `tokens.css` | `--text-*`, `--font-weight-*`, `--leading-*`, `--typo-<rolle>-*`, `--spacing`, `--radius-*`, `--shadow-*` (hell, `.dark`), `--container-*`, `--duration-*`, `--ease-*`; Media Queries für H1 ab `md` und für weniger Bewegung |
| `theme.css` | Tailwind-Namen zeigen auf diese Variablen (`@theme inline reference`), Breakpoints fest, Variante `desk`, Klassen `typo-*` |
| `eduksx.css` | dieselben Werte als `--eduksx-*` mit hellem Rückfallwert für Plugins |

Geprüft mit Tailwind 4.3 (22.11.2026): `text-sm`, `p-4`, `rounded-md`, `shadow-sm`, `max-w-page-optimized`,
`desk:flex`, `typo-h1`, `ease-out`, `transition-colors` greifen auf die Tokens. Tests: `tests/basis-tokens.test.ts`.

## 7. Entscheide

| Nr. | Frage | Optionen | Entscheid | Status |
| --- | --- | --- | --- | --- |
| T1 | Grundgrösse Bedienung und Tabellen | 14 px, Fliesstext 16 px / 16 px überall | 14 px Bedienung, 16 px Fliesstext, 12 px nur Zusatzinfo | BESCHLOSSEN 22.11.2026 |
| T2 | Titelstufen H1–H4 | wie Intranet 30/20/18/16 / gleichmässig 36/30/24/20 | wie Intranet: H1 30 (mobil 24), H2 20, H3 18, H4 16 | BESCHLOSSEN 22.11.2026 |
| T3 | Variante `desk` für alle Module | ins Paket übernehmen / nur Standard-Breakpoints | übernehmen | BESCHLOSSEN 22.11.2026 |
| T4 | Dichtere Darstellung für die Administration | – | mit den GUI-Profilen (Idee #23) | OFFEN |

## 8. Abstimmung mit dem Glossary

Die Werte entsprechen den Tailwind-Standards, die Glossary und Intranet heute nutzen; `desk` und die Seitenbreiten
stammen aus dem Glossary. Abweichend im Glossary: H3 im Markdown 1,05 rem (≈ 17 px) statt 18 px – beim Umstieg auf
`@eduksx/ui` angleichen (#16).
