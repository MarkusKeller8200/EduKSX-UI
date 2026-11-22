# Konzept: Marke, Namen und Farben aller EduKSX-Module

Stand: 22.11.2026 (0.1.0 – Grundgerüst) · Verantwortlich: Markus Keller · Status: **IN ARBEIT**

Auftrag von Markus (Chat 22.11.2026): Das Markennamen-Konzept inklusive Farben aus allen EduKSX-Repos zusammentragen
und hier verbindlich festhalten. Die Regeln sind **ausformuliert übernommen**, nicht verlinkt, weil einzelne Quellen
(z. B. das INTRANET) später wegfallen. Herkunft steht jeweils in Klammern als Text.

Stufen nach [KONZEPT-VORLAGE.md](KONZEPT-VORLAGE.md): **BESCHLOSSEN** (mit Datum), **EMPFOHLEN**, **OFFEN**,
**ZU PRÜFEN**.

## 1. Verbindlichkeit für alle Module (BESCHLOSSEN 22.11.2026)

1. **Alle EduKSX-Module folgen diesem UI-Konzept** (dieses Dokument, `tokens/tokens.json` und die Bausteine von
   `@eduksx/ui`).
2. **Erst global prüfen:** Braucht ein Modul etwas anderes, wird zuerst geprüft, ob die Regel besser hier für alle
   Module definiert wird. Wenn ja: Änderung hier (Issue in EduKSX-UI, bei Bedarf DS-Entscheid in `KONZEPT-DESIGN.md`
   von EduKSX-Architektur).
3. **Abweichung nur mit Begründung:** Bleibt eine Abweichung, wird sie **im Modul** vermerkt – in dessen
   `docs/KONZEPT-DESIGN.md` (oder, wo es das nicht gibt, in `docs/UI-ABWEICHUNGEN.md`) als Tabelle:

   | Nr. | Regel im UI-Konzept | Abweichung im Modul | Begründung | seit | Überprüfen bis |
   | --- | --- | --- | --- | --- | --- |

4. **Regelmässige Überprüfung:** Vor jedem neuen Meilenstein von EduKSX-UI werden die Abweichungen aller Module
   durchgegangen (zusammen mit den Ideen, siehe AGENTS.md). Ergebnis je Abweichung: **übernehmen** (Regel kommt ins
   UI-Konzept, die Abweichung im Modul wird obsolet und gestrichen), **beibehalten** (neues Prüfdatum) oder
   **aufheben** (Modul passt sich an, Issue im Modul).
5. Das **Abweichungsregister** in Abschnitt 8 hält den Überblick über alle Module. Es ersetzt den Vermerk im Modul
   nicht.

## 2. Markenarchitektur (BESCHLOSSEN, CI MarKusSXCH v1.0 und Produktfamilie 1.0)

```text
MarKusSXCH                Entwicklermarke (Dachmarke), Markus Keller
└── EduKSX                Produktfamilie für Bildungssoftware und digitale Dienstleistungen
    ├── EduKSX-Glossary   Produkt bzw. Modul
    ├── EduKSX-Codex
    └── …                 weitere Module (Abschnitt 4)
```

- **MarKusSXCH** ist die unabhängige Entwicklermarke. Der öffentliche Auftritt nennt den Arbeitgeber des Entwicklers
  nicht.
- **EduKSX** ist die Produktfamilie; die Angebote können auch für Gemeinden und andere öffentliche Institutionen
  geeignet sein. Claim, nur wenn zutreffend: «Open Source for Education».
- Die Produktfamilie ist visuell einheitlich; die Module bleiben technisch unabhängig.
- Weitere Marken derselben CI (AI MusiCX, TagStudioSX) gehören nicht zu EduKSX und werden in EduKSX-Modulen nicht
  verwendet.

## 3. Wortmarken und Schreibweisen (BESCHLOSSEN, CI v1.0 §3–4, §11; Fortschreibung v1.1)

### 3.1 Exakte Schreibweisen

| Marke | Schreibweise | Nicht |
| --- | --- | --- |
| Produktfamilie | **EduKSX** | Eduksx, EdukSX, EDUKSX, EduKsx, Edu-KSX |
| Produkt/Modul | **EduKSX-\<Begriff\>** mit Bindestrich, z. B. EduKSX-Glossary | EduKSX Glossary, EduKSXGlossary |
| Entwicklermarke | **MarKusSXCH** | MarkusSXCH, MarKusSX (ohne CH), MarKusSxCH |
| Domain-Wortmarke | **MarKusSX.CH** | – |
| Person | **Markus Keller** (Klartext in Impressum, Daten, rechtlichen Texten) | – |

- Technische Bezeichner bleiben, wie sie sind: Repo-Namen (`MarKusSX-Operation`, `sek-intranet`), Paketnamen
  (`@eduksx/ui`, `eduksx/core`), Namensräume (`EduKSX\Core`), HTTP-Header (`EduKSX-Signature`), Modulschlüssel
  (`glossary`), Domains. Die Schreibregeln gelten für **sichtbare Texte**. Umbenennungen technischer Namen nur mit
  eigener Migrationsentscheidung.
- Im Fliesstext wird der Name **nicht** farbig gesetzt; Farbsegmente gibt es nur an Markenplätzen (Kopfzeile,
  Anmeldeseite, Fuss).
- Domains (z. B. `eduksx.ch`, `systematische-rechtssammlungen.ch`) nicht als registriert oder online bezeichnen, ohne
  dass es nachgewiesen ist.

### 3.2 Farbsegmente

| Marke (Schlüssel) | Segmente |
| --- | --- |
| EduKSX (`education`) | `E` violett · `du` neutral · `K` orange · `SX` blau |
| EduKSX-\<Begriff\> | wie EduKSX, dazu `-<Begriff>` neutral |
| MarKusSXCH (`developer`) | `M` violett · `ar` neutral · `K` orange · `us` neutral · `SXCH` blau |
| MarKusSX.CH (`developer_domain`) | `M` violett · `ar` neutral · `K` orange · `us` neutral · `SX.CH` blau |
| Markus Keller (`person`) | `M` violett · `arkus ` neutral · `K` orange · `eller` neutral (nur dekorativ, z. B. Über-mich-Seite) |

### 3.3 Darstellung (CI §6–9)

- Komponente `BrandWordmark` (dieses Paket): stabiler Markenschlüssel, Segmente in fester Reihenfolge, ein lesbarer
  Gesamtname für Bildschirmleser (`aria-label`), Segment-Spans dekorativ, `translate="no"`, Farben nur über Tokens.
- Schrift wie die Oberfläche (Inter), Gewicht 600–700. Keine Verläufe, Transparenz, Schatten, Outlines, Neonschein; nie
  strecken, stauchen, drehen; Freiraum etwa die Versalhöhe des ersten farbigen Buchstabens.
- Nicht auf unruhige Hintergründe; Theme-Wechsel darf die Wortmarke nicht zerlegen, umfärben oder umbrechen
  (`whitespace-nowrap`).
- Unter einer lesbaren Grösse Klartext oder ein freigegebenes Icon (Abschnitt 6) statt Wortmarke.
- Entwicklersignatur im Fuss bzw. unter dem Logo: **«Developed by MarKusSXCH»** mit Wortmarke `developer`. Sie ist
  standardmässig eingeschaltet; der Admin einer Instanz darf sie abschalten (M4, BESCHLOSSEN 22.11.2026). Im Impressum
  und in rechtlichen Texten steht der Klartext «Markus Keller».
- **Responsive:** Desktop, Tablet und Smartphone prüfen; keine überlaufenden Wortmarken und keine abgeschnittenen
  Endungen (`-Glossary`, `SXCH`). Reicht der Platz nicht, Icon plus Klartext statt verkleinerter Wortmarke (CI §9).

### 3.4 Schrift (BESCHLOSSEN, CI v1.0 §6; M6 BESCHLOSSEN 22.11.2026)

- Eine sachliche, zeitgemässe Sans Serif für **alle** Module und die Wortmarken. Keine eigene Schrift je Modul;
  Eigenständigkeit entsteht über Name, Icon und Inhalt, nicht über die Schrift.
- Schrift **Inter**, selbst gehostet (kein Abruf bei Google Fonts); Rückfall `system-ui, sans-serif`
  (`tokens.json` › `font.sans`).
- Gewichte (M7): **Fliesstext 400**, Labels und Zwischentitel **500**, Titel und Wortmarke **600**, starke
  Hervorhebung **700** (Wortmarke darf 700). Nur diese vier Stufen, keine Zwischengewichte wie 450 oder 550: sie
  gehen nur mit Inter Variable und sähen im Rückfall anders aus. Inter Variable ist erlaubt, aber keine Pflicht.
  Klare Hierarchie, keine verspielten Schnitte. Tokens `font.weight.*`, Grössen und Textrollen: `KONZEPT-TOKENS.md` §2.
- **Keine plattformabhängigen Schriften** (M6): nur frei lizenzierte Schriften, die das Modul selbst ausliefert;
  als Rückfall nur generische System-Stacks (`system-ui`, `ui-monospace`, `sans-serif`, `monospace`), keine
  benannten Betriebssystem- oder Office-Schriften. Darum entfällt **Aptos** aus dem CI-Vorschlag
  (`Inter, Aptos, system-ui, sans-serif`): Microsoft-Schrift, nicht frei fürs Web, nur auf Geräten mit Office.
- **Code und IDs** (Codeblock, technische Schlüssel, Prüfsummen): **JetBrains Mono** (SIL OFL 1.1), selbst gehostet;
  Rückfall `ui-monospace, monospace` (`tokens.json` › `font.mono`, CSS `--font-mono`, Tailwind `font-mono`).
  Gewicht 400, für Hervorhebung 600.

## 4. Produkt- und Modulnamen

Modulschlüssel sind intern, englisch und unveränderlich (Modulregister, EduKSX-Architektur). Der sichtbare Name
folgt der CI-Regel **EduKSX-\<englischer Funktionsbegriff\>** (Produktfamilie 1.0). Wie Module mit deutschen
Bezeichnungen sichtbar heissen, ist **BESCHLOSSEN** (M1, 22.11.2026): alle Module heissen `EduKSX-<Begriff>`, die
deutsche Bezeichnung steht als Untertitel – auch Intranet, Stundenplan und Einsatzplanung.

| Schlüssel | Sichtbarer Name (BESCHLOSSEN, M1) | Deutsche Bezeichnung | Bisher in den Repos | Icon | Repo |
| --- | --- | --- | --- | --- | --- |
| `core` | EduKSX-Core | Plattform-Bausteine | EduKSX-Core | Core (freigegeben) | EduKSX-Core |
| `ident` | EduKSX-Ident (BESCHLOSSEN, M2) | Anmeldung | EduKSX-Ident; Register: «Teil von EduKSX-Core» | Ident | EduKSX-Ident |
| `ops` | EduKSX-Ops (BESCHLOSSEN, M2) | Leitstand | «EduKSX-Ops (Leitstand)»; Register: «Teil von EduKSX-Core» | Ops | – |
| `glossary` | EduKSX-Glossary | Begriffe & Abkürzungen | EduKSX-Glossary | Glossary | EduKSX-Glossary |
| `codex` | EduKSX-Codex | Systematische Rechtssammlungen | EduKSX-Codex; Prototyp «Rechtssammlung» | Codex | EduKSX-Codex |
| `connect` | EduKSX-Connect | Stammdaten und Abgleich | EduKSX-Connect | Connect | EduKSX-Connect (leer) |
| `licence` | EduKSX-Licence | Lizenzen und Zugänge | EduKSX-Licence | Licence | – |
| `timetable` | EduKSX-Timetable | Stundenplan | Register/Übersicht «Stundenplan»; Icon «Timetable» | Timetable | – |
| `staffing` | EduKSX-Staffing | Einsatzplanung | Register «EduKSX-Staffing», Übersicht und Prototyp «Einsatzplanung» | Staffing | – |
| `flow` | EduKSX-Flow | Abläufe und Termine | EduKSX-Flow; Prototyp «Ablaufplanung / Termine und ToDo» | Flow | EduKSX-Flow (leer) |
| `time` | EduKSX-Time | Zeiterfassung | EduKSX-Time; Prototyp «Zeiterfassung / Stempeln» | Time | EduKSX-Time (leer) |
| `shop` | EduKSX-Shop | Bestellungen | EduKSX-Shop | Shop | EduKSX-Shop (leer) |
| `sign` | EduKSX-Sign | Unterschriften | EduKSX-Sign; Prototyp «Signatur / Persönliche Ablage» | Sign | – |
| `portal` | EduKSX-Portal | Portal für Externe | EduKSX-Portal | Portal | – |
| `intranet` | EduKSX-Intranet | Intranet | Register «Intranet»; Intranet selbst «EduKSX-Intranet» | Intranet | sek-intranet |
| `planner` | EduKSX-Planner | Jahresplanung | neu (22.11.2026) | Planner | – |
| `services` | EduKSX-Services (reserviert) | – | – | Services | – |

**Ohne Modulschlüssel, keine Produktoberfläche:** EduKSX-Architektur, EduKSX-UI (`@eduksx/ui`), EduKSX-Suite
(Verteilpaket Selbst-Hosting), EduKSX-Connectors (Anbindungen), EduKSX-Prototyp (Prototypen). Ihr Name folgt der
Schreibweise, Wortmarke und Icon brauchen sie nicht.

**Regeln (BESCHLOSSEN, M1):**
- Kopfzeile: Wortmarke `EduKSX-<Begriff>`; im Modulwechsel Icon, Name und die deutsche Bezeichnung als Untertitel.
- Fenstertitel: `<Seite> · EduKSX-<Begriff>`; eigener Titel der Instanz ersetzt nur den Produktnamen.
- Prototypen tragen den Zielnamen (`EduKSX-<Begriff>`), die Funktionsbezeichnung als Untertitel.

## 5. Farben

### 5.1 Markenfarben (BESCHLOSSEN, CI v1.0 §2, §8, §10)

Nur für Wortmarke, Icons, Signets und Akzente. Die Werte sind fest und werden **nie** zugunsten des Kontrasts
verändert; bei Kontrastproblemen helfen Grösse, Gewicht, Hintergrund oder eine funktionale Farbe (5.2).

| Token | Hell | Dunkel | Verwendung | Kontrast hell auf Weiss |
| --- | --- | --- | --- | --- |
| `brand-violet` | `#7952B3` | `#B59AFF` | erster hervorgehobener Buchstabe | 5,72 : 1 |
| `brand-orange` | `#FF8A00` | `#FF8A00` | zweiter Akzent, EduKSX-Hauptakzent | 2,36 : 1 (nie als Text) |
| `brand-blue` | `#007EBB` | `#32B8F2` | Markenabschluss | 4,47 : 1 (nur grosse Schrift) |
| `brand-neutral` | `#222222` | `#F2F5F8` | übrige Buchstaben | – |
| Fläche (`background`) | `#FFFFFF` | `#151B24` | Grundfläche | – |

Im dunklen Modus erreichen alle Markenfarben auf `#151B24` mehr als 7 : 1.

### 5.2 Funktionale Farben des Standards «EduKSX» (BESCHLOSSEN 22.11.2026, KONZEPT-DESIGN §3, Glossary DEC-015)

«UI-Farben sind nicht identisch mit den Logo-Farben» (CI §5). Die Werte stehen in `tokens/tokens.json`; hier die
markenrelevanten:

| Rolle | Token | Hell | Dunkel | Regel |
| --- | --- | --- | --- | --- |
| Hauptknopf | `primary` / `primary-foreground` | `#FF8A00` / `#222222` | `#FF8A00` / `#151B24` | Orange als **Fläche** mit dunkler Schrift (6,73 : 1), nie weisse Schrift |
| Link, Fokus, Info | `link`, `ring`, `info` | `#0272AD` | `#32B8F2` | funktionales Blau statt Markenblau (5,23 : 1) |
| Sekundärtext | `muted-foreground` | `#5A6678` | `#AAB6C7` | ersetzt CI `text.muted` `#64748B` («ggf. prüfen») |
| Begriff unterstrichen | `term-underline` | `#7952B3` | `#B59AFF` | Violett als Akzent |
| Diagramme 1–3 | `chart-1…3` | Orange, Blau, Violett | dunkle Markenwerte | Reihenfolge der Wortmarke |
| Status | `success`, `warning`, `destructive` | eigene Werte | eigene Werte | **nie** durch Markenfarben ersetzen; immer mit Symbol und Text |

- **Eine Produktfarbe für alle Module:** EduKSX-Akzent ist Orange, ergänzt durch Blau und Violett (CI §5). Keine
  eigene Farbe je Modul; Module unterscheiden sich über ihr Icon (DS6, BESCHLOSSEN 22.11.2026).
- **Token-Namen:** nur `--brand-violet`, `--brand-orange`, `--brand-blue`, `--brand-neutral` für Markenwerte. Die
  Kurzformen `--brand`, `--brand-accent`, `--brand-ink` sowie eigene Präfixe (z. B. `--ci-*`) entfallen.
- Aktive Navigation, Links und Fokus sind auch ohne Farbe erkennbar (Form, Unterstreichung, Position).

### 5.4 Bedienelemente und Zustände (BESCHLOSSEN, CI v1.0 §9)

- Für jedes Bedienelement sind die Zustände **Normal, Hover, Fokus, Gedrückt (Pressed) und Deaktiviert**
  systematisch festgelegt – über Tokens, nicht je Seite. Fehlt ein Zustand im Baustein, wird er hier ergänzt, nicht
  im Modul.
- Orange ist **nie der einzige Hinweis** auf einen Zustand (z. B. aktiv, ausgewählt, Fehler); dazu kommen Form,
  Rahmen, Unterstreichung, Symbol oder Text.
- Links bleiben **ohne Farbe** als interaktiv erkennbar (Unterstreichung oder eindeutige Form).
- Produktkarten nutzen den Akzent sparsam; Statusfarben (Erfolg, Warnung, Fehler) werden nie durch Markenfarben
  ersetzt (5.2).
- Prüfen: Kontrast, Name für Bildschirmleser, Tastaturbedienung, sichtbarer Fokusrahmen, Zoom bis 200 %.

### 5.3 Themes

Standard «EduKSX» nur aus `tokens.json`; «Hoher Kontrast» als Vorlage; Theme der Organisation mit allen bekannten
Tokens, aktivierbar erst nach bestandener Kontrastprüfung (DS4). **Wortmarke, Icons und Signets bleiben in jedem
Theme in den CI-Farben.** **Marke links oben (M3, BESCHLOSSEN 22.11.2026):** entweder die EduKSX-Wortmarke des Moduls oder ein **eigenes Logo der
Instanz** (Logo hell, optional dunkel, quadratisches Signet; SVG ohne Skripte, PNG, JPEG, WebP, höchstens 1 MB), das die
Wortmarke ersetzt. Ohne eigenes Logo gilt EduKSX. MarKusSXCH ist keine wählbare Produktmarke; sie erscheint nur in der
Signatur.

## 6. Icons und Signets (BESCHLOSSEN, Icon-Set EduKSX, freigegeben 09.11., 13.11. und 22.11.2026)

- 27 freigegebene Icons: EduKSX, Glossary, Codex, Core, Ident, Shop, Licence, Portal, Connect, Services, Sign, Time,
  Intranet, Timetable, Staffing, Ops, Flow, Planner, WebSnapshot, API, AIConverter, MCP, Bill, Ticket, Booking,
  Checklist, Absence. Motive: vier Bausteine (EduKSX), offenes Buch mit A–Z (Glossary), Waage (Codex),
  Sechseck mit Kern (Core), Ausweis (Ident), Einkaufswagen mit Häkchen (Shop), Schlüssel (Licence), Elternteil und
  Kind (Portal = Elternportal), drei verbundene Knoten (Connect), Zahnrad (Services), Feder mit Unterschrift (Sign), Uhr (Time), Haus mit
  vier Bausteinen (Intranet), Raster mit Kalenderkopf (Timetable), Person mit Kalender (Staffing), Bildschirm mit Puls
  (Ops), Flussdiagramm mit Entscheidungs-Raute (Flow),
  Zeitbalken auf einer Achse (Planner, freigegeben 22.11.2026, #49).
- 22.11.2026 (#52): Shop zeigt den Einkaufswagen statt der Tasche, Portal (Elternportal) Elternteil und Kind statt des
  Torbogens. Neu, im UI-Stil nach den Motiven des Entwurfs «Icon-Set v2 (Umriss-Stil)»: Browserfenster mit Objektiv
  (WebSnapshot), Klammern mit Datenpunkten (API), gegenläufige Pfeile mit Funken (AIConverter), Stecker (MCP), Beleg
  (Bill), Ticket mit Abriss (Ticket), Kalender mit Häkchen (Booking), Liste mit Häkchen (Checklist), Person mit Minus
  (Absence). Der Entwurf «Workflow» ist nicht übernommen, weil er `flow` entspricht. Alle Icons folgen **einem** Stil:
  dem des freigegebenen Sets (Umriss 1,75 mit gefüllten Akzenten), nicht dem reinen Umriss-Stil des Entwurfs. Die
  neun neuen Schlüssel sind Icons, noch keine Einträge im Modulregister (Abschnitt 3).
- Gestaltung: 24er-Raster, Strich 1,75, runde Enden und Ecken; Orange = Hauptakzent, Blau und Violett für Details,
  Neutral `#222222` / `#F2F5F8`; Kachel 48 × 48, Eckenradius 11, Kachelfläche hell `#F2F5F8` mit feinem Rand,
  dunkel `#222222` (Token `icon-tile`; bewusst nicht die Seitenfläche `#151B24`, so wie freigegeben).
- Varianten: einfarbig (`currentColor`) für die Oberfläche, farbig für helle Flächen, Kachel hell/dunkel als App-Icon
  (PNG 512, 192, 64, 32).
- Neue Motive oder Farben brauchen eine eigene Freigabe durch Markus. Das Flow-Icon (#30) stammt aus dem vorläufigen
  Entwurf in EduKSX-Prototyp (`tools/seite_bauen.py`, Prototyp «Ablaufplanung») und ist am 22.11.2026 freigegeben:
  oranger Startkasten, violette Entscheidungs-Raute, zwei Ziel-Kästen, blauer Punkt. Das INTRANET ersetzt das
  behelfsmässige Lucide-Symbol «Workflow» durch `flow`.
- Für EduKSX gibt es kein separates Signet; das Icon «EduKSX» bzw. das Modul-Icon dient als Favicon und App-Icon.
- Eine eigene Symbolwahl «Standard-Symbole (Lucide)» statt EduKSX-Icons ist nur für Menüsymbole erlaubt, nie für
  Modul-Icons in Kopfzeile und Modulwechsel (EMPFOHLEN, aus dem Intranet).

### 6.1 Dateien und Baustein (BESCHLOSSEN 22.11.2026)

EduKSX-UI ist seit 22.11.2026 die **einzige Quelle** des Icon-Sets (übernommen aus markussxch; dort und in allen
anderen Repos gibt es keine Kopien mehr, §6.3). Module beziehen die Icons aus `@eduksx/ui`.

| Datei | Verwendung |
| --- | --- |
| `icons/svg/<name>.svg` | einfarbig (`currentColor`), 24 × 24 – Oberfläche, übernimmt die Textfarbe |
| `icons/svg/<name>-color.svg` | farbig ohne Kachel, für helle Flächen (Doku, Übersichten) |
| `icons/svg/<name>-tile-dark.svg`, `-tile-light.svg` | App-Icon, Kachel dunkel bzw. hell |
| `icons/png/<512\|192\|64\|32>/<name>-tile-*.png` | App-Icon, Favicon, Manifest |
| `icons/svg/<name>-maskable-*.svg`, `icons/png/<192\|512>/<name>-maskable-*.png` | Manifest `purpose: maskable` (randlos, Motiv in der sicheren Zone von 80 %) |
| `icons/ico/<name>.ico` | `favicon.ico` (16, 32, 48, 64 px aus der hellen Kachel) |
| `icons/build.py` | Generator (nur Python-Standardbibliothek); einzige Stelle, an der Motive stehen |

Dateinamen: `eduksx` für die Familie, sonst `eduksx-<schlüssel>` (z. B. `eduksx-glossary`). Im Paket unter
`@eduksx/ui/icons/svg/…`, `@eduksx/ui/icons/png/…` und `@eduksx/ui/icons/ico/…`. Rasterdateien erzeugt
`node icons/raster.mjs` aus den SVG.

Baustein **`EduksxIcon`** zeichnet dieselben Icons im Code, Farben nur über `--brand-*` und `--icon-tile`, wechselt
mit hell/dunkel:

```tsx
<EduksxIcon name="glossary" />                         // farbig, 24 px, dekorativ
<EduksxIcon name="codex" variant="mono" />             // einfarbig in Textfarbe (Menü, Knopf)
<EduksxIcon name="eduksx" variant="tile" size={64} />  // App-Kachel
<EduksxIcon name="ident" title="EduKSX-Ident" />       // beschriftet für Bildschirmleser
```

Ändern: Motiv in `icons/build.py`, dann `python3 icons/build.py` (SVG), `python3 icons/build.py --ts
src/components/eduksx-icons.data.ts` (Baustein) und die Rasterdateien neu erzeugen
(`node icons/raster.mjs --alle`). Ein Test prüft, dass Dateien und Baustein übereinstimmen. Jede Änderung braucht eine neue Freigabe.

### 6.2 Bediensymbole (BESCHLOSSEN 22.11.2026; aus Glossary und INTRANET, Idee #20)

Für Bedienung, Menü und Zustände – nicht für Modul-Icons – gilt:

- **Bibliothek: Lucide** (`lucide-react`, Lizenz ISC; Copyright- und Erlaubnishinweis mitliefern). Keine zweite
  Symbolbibliothek daneben. Strich und Raster passen zum EduKSX-Set (24er-Raster, runde Enden). Lucide ist eine
  Abhängigkeit des Moduls, nicht von `@eduksx/ui`.
- **Grösse:** in Knöpfen und Menüs 16 px (`h-4 w-4`), in Kopfzeile und Modulwechsel die EduKSX-Icons mit 20–24 px.
- **Symbol-Knöpfe** (nur Symbol, ohne sichtbaren Text) haben immer: `aria-label` mit der Aktion, einen **Tooltip** mit
  demselben Text, bei Umschaltern `aria-pressed` bzw. in Gruppen `role="group"` mit Gruppenname. Das Symbol selbst
  ist `aria-hidden`.
- **Jede Option eines Umschalters hat ein eigenes Symbol** – kein Symbol doppelt in derselben Gruppe und keines aus
  einer anderen Gruppe wiederverwendet (Glossary #142).
- **Warnungen, Fehler und Erfolg immer mit Symbol und Text**, nie nur mit Farbe oder nur mit Symbol.
- **Modul-Einträge** im Menü: EduKSX-Icon des Moduls (Variante `mono`); bei der Symbolwahl «Standard-Symbole» das
  Lucide-Symbol aus der Tabelle unten. Ein Menüpunkt ohne Zuordnung bekommt keinen leeren Platzhalter-Kreis, sondern
  wird hier nachgetragen.

**Feste Zuordnungen** (übernommen, damit gleiche Funktionen in allen Modulen gleich aussehen):

| Zweck | Lucide-Symbol |
| --- | --- |
| Farbschema hell / dunkel / wie System | `Sun` / `Moon` / `SunMoon` |
| Ansicht Mobil / Darstellungsoptimiert / Breit / Voll | `Smartphone` / `Laptop` / `MoveHorizontal` / `Maximize2` |
| Startseite (Modul Intranet) | `LayoutGrid` (EduKSX: `intranet`) |
| Portal | `AppWindow` (EduKSX: `portal`) |
| Glossar, Begriff | `BookA` (EduKSX: `glossary`) |
| Personen, Konten | `Users` (EduKSX: `ident`) |
| Stundenplan | `CalendarClock` (EduKSX: `timetable`) |
| Abwesenheiten, Einsatzplanung | `CalendarOff` (EduKSX: `staffing`) |
| Abläufe (Flow) | `Workflow` (EduKSX: `flow`) |
| Mitteilungen | `Megaphone` |
| Termine, Datumsauswahl | `CalendarDays` |
| Dokumente | `FileText` |
| Einstellungen | `Settings` |
| Verlauf, Zeitleiste | `History` |

Symbole der **GUI-Bausteine** (Prüfseite und Dokumentation, Gruppen aus `UEBERNAHME-INTRANET-GUI.md`):

| Gruppe | Bausteine → Lucide-Symbol |
| --- | --- |
| Navigation & Aufbau (`Compass`) | Menü `Menu`, Seitenpanel `PanelRight`, Reiter `Folders`, Seitenweise Anzeige `ListOrdered`, Schrittanzeige `Footprints`, Befehlspalette `Command`, Umschalter & Aufklappen `ToggleRight`, Kontextmenü `SquareMousePointer`, Geteilte Ansicht `Columns2` |
| Eingabe (`TextCursorInput`) | Button `MousePointerClick`, Knopfgruppe `Group`, Formularfelder `TextCursorInput`, Eingabegruppe `RectangleEllipsis`, Dropdown `ChevronsUpDown`, Optionsfelder `CircleDot`, Schalter `ToggleLeft`, Auswahl mit Suche `SearchCheck`, Mehrfachauswahl `ListChecks`, Datumsauswahl `CalendarDays`, Datei hochladen `FileUp`, Schieberegler `SlidersHorizontal`, Drag & Drop `Move`, Fragebogen `ClipboardList` |
| Daten anzeigen (`Table2`) | Tabellen `Table2`, Typografie `Type`, Eintrag `Rows3`, Karten & Seitenkopf `PanelsTopLeft`, Badges & Status `Tag`, Akkordeon `ListCollapse`, Fortschritt `Gauge`, Diagramme `ChartColumn`, Zeitleiste `History`, Scrollbereich `ScrollText`, Codeblock `Code`, Begriff `BookA` |
| Rückmeldung (`MessageSquareWarning`) | Meldungen & Dialoge `MessageSquareWarning`, Rückfrage `ShieldAlert`, Popover `MessageSquareMore`, Vorschaukarte `IdCard`, Banner `Flag`, Ladezustände `Loader` |

### 6.3 Nur Icons aus EduKSX-UI, Bundles je Modul (BESCHLOSSEN 22.11.2026, Markus)

- **Module erstellen keine eigenen Icons** – auch nicht für Zwecke, die nur ein Modul braucht. Jedes Icon entsteht in
  EduKSX-UI (`icons/build.py`, mit Freigabe) und wird über `@eduksx/ui` bezogen (Baustein `EduksxIcon`, Dateien unter
  `@eduksx/ui/icons/…`). Kopien in anderen Repos sind nicht erlaubt; Dateien, die als fester Pfad gebraucht werden
  (Favicon, App-Icons), erzeugt das Modul beim Bauen aus dem Paket. Dokumentation verweist direkt auf
  `EduKSX-UI/icons/svg` (öffentliches Repo).
- **Bundle je Modul:** `src/components/eduksx-icon-bundles.ts` (`EDUKSX_ICON_BUNDLES`) listet je Modul, welche Icons es
  benutzt; dazu Website (markussxch) und Prototypen als weitere Nutzer. Jedes Icon liegt nur einmal im Set
  (Zuordnung, keine Ordner je Modul). **Gemeinsam genutzte Icons sind vorzuziehen** und stehen in mehreren Bundles.
- Freigegebene Icons ohne Modul stehen im **Vorrat** (`EDUKSX_ICON_VORRAT`). Ein Test prüft, dass jedes Icon in einem
  Bundle oder im Vorrat steht und Bundles nur bestehende Icons nennen. Die Testseite zeigt die Bundles.
- Lucide-Bediensymbole nach §6.2 sind keine eigenen Icons und bleiben im Modul erlaubt.
- Umgesetzt 22.11.2026: Kopien entfernt in markussxch (#23), EduKSX-Architektur (#92), EduKSX-Glossary (#500),
  sek-intranet (#223), EduKSX-Prototyp (#73). Offen: Varianten für `favicon.ico` und Maskable-App-Icons (Intranet).

## 7. Gegenüberstellung je Repo (Stand 22.11.2026)

| Repo | Namen sichtbar | Wortmarke | Markenfarben | Funktionale Farben | Befund |
| --- | --- | --- | --- | --- | --- |
| markussxch (CI) | MarKusSXCH, EduKSX-\<Begriff\> | Spezifikation | Quelle | `text.muted` `#64748B` | Quelle der Marke |
| EduKSX-UI | EduKSX | `BrandWordmark` (education, developer) | CI | `tokens.json` = Glossary, `input` dunkler | Massstab |
| EduKSX-Architektur | EduKSX-…, «MarKusSX» (24 ×), «EdukSX» in Verlauf | – | – | KONZEPT-DESIGN §3 | Schreibweise «MarKusSX» ohne CH |
| EduKSX-Glossary | EduKSX-Glossary, Developed by MarKusSXCH | eigene Kopie | CI | Standard; `input` `#CBD5E1` / `#3A4556`; `--brand`, `--brand-accent`, `--brand-ink` | Tokens nachziehen (#16) |
| sek-intranet | EduKSX-Intranet, «MarKusSXCH Intranet» | eigene Kopie mit `--ci-*` | CI als `--ci-*` | Theme «EduKSX» mit Primär `#A85400` + weiss, Info `#00699E`, Sekundärtext `#64748B`; Grund-CSS = Theme SekBülach (`#0272AD`, `#0299D7`); Theme «MarKusSXCH» (Violett) | mehrere Abweichungen |
| EduKSX-Prototyp | Prototypnamen deutsch | – | CI | = Glossary | Namen |
| EduKSX-Architektur `poc/ident-zitadel` | «Anmelden bei EduKSX» | – | Orange, Neutral | dunkle Fläche `#1B1F24`, Warnung `#FF6B6B` | dunkle Fläche ≠ `#151B24` |
| EduKSX-Core, -Ident, -Codex, -Connectors, -Suite | EduKSX-… | – | – | nur Blueprint-Vorschaubild `#0B3D63` / `#F2B705` | Vorschaubild ausserhalb CI (M5) |
| EduKSX-Ident | – | – | – | Laravel-Startseite unverändert | später `@eduksx/ui` |
| EduKSX-Connect, -Flow, -Shop, -Time | – | – | – | – | leer |
| MarKusSX-Operation | MarKusSX | – | – | eigenes Grün/Grau im Operation-Center | internes Werkzeug, kein EduKSX-Modul; nur Schreibweise |

## 8. Abweichungsregister

Abweichungen, die heute in Modulen bestehen. «Prüfen global» = Abschnitt 1 Punkt 2.

| Nr. | Modul | Abweichung | Prüfen global | Vorschlag | Status |
| --- | --- | --- | --- | --- | --- |
| A1 | sek-intranet | Theme «EduKSX» hell: Primär `#A85400` mit weisser Schrift statt `#FF8A00` mit `#222222` | Nein: Standard ist beschlossen (DS1, DEC-015), beide Varianten bestehen den Kontrast | anpassen beim Umstieg auf `@eduksx/ui` (Intranet #83) | OFFEN im Modul |
| A2 | sek-intranet | Info `#00699E`, Sekundärtext `#64748B`, Fläche dunkel Karten `#1B2230` statt `#0272AD`, `#5A6678`, `#1B2330` | Nein | anpassen mit A1 | OFFEN im Modul |
| A3 | sek-intranet | Markenvariablen `--ci-*` und `--brand` (Blau der Schule) | Nein: Namen sind festgelegt (5.2) | auf `--brand-*` umstellen; Blau der Schule nur im Theme der Instanz | OFFEN im Modul |
| A4 | sek-intranet | Grundaussehen = Farben der Sekundarschule Bülach, Open Sans | Nein | bleibt als **Theme der Instanz** (DS5, BESCHLOSSEN) | begründet |
| A5 | sek-intranet | Marke wählbar: EduKSX, MarKusSXCH oder eigenes Logo (ersetzt die Wortmarke) | **Ja** – übernommen als M3 (eigenes Logo für alle Module) | Option «MarKusSXCH» samt Theme «MarKusSXCH» entfernen | OFFEN im Modul |
| A6 | sek-intranet | Signatur «Developed by MarKusSXCH» abschaltbar | **Ja** – übernommen als M4 | keine Änderung nötig | obsolet |
| A7 | sek-intranet | Titel «MarKusSXCH Intranet» (ohne Bindestrich) | Nein (M3) | entfällt mit A5 | OFFEN im Modul |
| A8 | sek-intranet | eigene Kopie von `BrandWordmark` | Nein | `@eduksx/ui` verwenden | OFFEN im Modul |
| A9 | EduKSX-Glossary | `input` `#CBD5E1` / `#3A4556`; `--brand`, `--brand-accent`, `--brand-ink`; eigene Kopie `BrandWordmark` | Nein (in EduKSX-UI entschieden, PR 8) | anpassen (#16) | OFFEN im Modul |
| A10 | EduKSX-Architektur `poc/ident-zitadel` | dunkle Fläche `#1B1F24`, Warnung dunkel `#FF6B6B` | Nein | `#151B24` und Status aus `tokens.json` | OFFEN im Modul |
| A11 | EduKSX-Prototyp | Prototypen mit deutschen Namen | folgt aus M1 | Untertitel-Regel (Abschnitt 4) | OFFEN im Modul (M1 entschieden) |
| A12 | EduKSX-Architektur | Register: Marketingnamen «Intranet», «Stundenplan», «Teil von EduKSX-Core»; Übersicht «Einsatzplanung»; Schreibweise «MarKusSX» | folgt aus M1; M2 entschieden | Register und Übersicht auf `EduKSX-<Begriff>` (M1, M2) | in Arbeit (Architektur-PR) |
| A13 | alle Repos (Blueprint) | GitHub-Vorschaubild `#0B3D63` / `#F2B705` | **Ja** – M5 | EduKSX-UI umgestellt (22.11.2026); Core, Ident, Codex, Connectors, Suite, Glossary, Architektur nachziehen und Bild neu hochladen; Vorgabe im Blueprint | OFFEN im Modul |

**Issues in den Modulen (22.11.2026):** sek-intranet #222 (A1–A8), EduKSX-Glossary #498 (A9, A13),
EduKSX-Architektur #89 (A10, A12, A13, DS4 nach M3), EduKSX-Prototyp #72 (A11 nach M1, A13). Vorschaubild für alle Repos
(A13): my-github-blueprint #30 (CI-Farben als Vorgabe, danach `apply.py --aktualisieren` in allen EduKSX-Repos).

## 9. Entscheide

| Nr. | Frage | Optionen | Entscheid | Status |
| --- | --- | --- | --- | --- |
| M0 | Verbindlichkeit für Module | – | Module folgen dem UI-Konzept; Abweichung nur nach globaler Prüfung, mit Begründung im Modul, regelmässig überprüft | BESCHLOSSEN 22.11.2026 |
| M1 | Sichtbare Modulnamen | EduKSX-Englisch + deutscher Untertitel / deutsch für Schulmodule / frei je Modul | EduKSX-Englisch + deutscher Untertitel für alle Module, auch Intranet, Stundenplan und Einsatzplanung | BESCHLOSSEN 22.11.2026 |
| M2 | Ident und Ops nach aussen | eigene Namen / Teil von EduKSX-Core | eigene sichtbare Namen EduKSX-Ident und EduKSX-Ops | BESCHLOSSEN 22.11.2026 |
| M3 | Marke links oben in einer Instanz | EduKSX + Logo zusätzlich (DS4) / EduKSX oder eigenes Logo / EduKSX, MarKusSXCH oder eigenes Logo | EduKSX-Wortmarke oder eigenes Logo der Instanz (White-Label) in allen Modulen; MarKusSXCH nicht als Produktmarke, nur in der Signatur. DS4 in KONZEPT-DESIGN ist anzupassen | BESCHLOSSEN 22.11.2026 |
| M4 | Signatur «Developed by MarKusSXCH» | abschaltbar (Vorgabe ein) / immer sichtbar | abschaltbar durch Admin der Instanz, Vorgabe eingeschaltet | BESCHLOSSEN 22.11.2026 |
| M5 | GitHub-Vorschaubilder | CI-Farben im Blueprint / bleibt neutral | CI-Farben: `[social_preview]` mit `farbe = "#151b24"`, `akzent = "#ff8a00"` in jedem EduKSX-Repo; Vorschlag als Vorgabe im Blueprint | BESCHLOSSEN 22.11.2026 |
| M6 | Schriften (3.4) | Aptos als Rückfall wie CI / nur freie, selbst gehostete Schriften | keine plattformabhängigen Schriften; Inter für Oberfläche, JetBrains Mono für Code und IDs, Rückfall nur generische System-Stacks; kein Aptos | BESCHLOSSEN 22.11.2026 |
| M7 | Schriftgewichte (3.4) | 450/550 mit Inter Variable / 400/500/600/700 statisch | statisch 400, 500, 600, 700; keine Zwischengewichte, Inter Variable nicht Pflicht (geprüft mit `docs/pruefseiten/schriftgewichte.html`) | BESCHLOSSEN 22.11.2026 |

Nach dem Entscheid: M3 ändert ggf. DS4 in `KONZEPT-DESIGN.md` (EduKSX-Architektur); M1/M2 das Modulregister.
Änderungen in anderen Repos als EduKSX-UI erst nach Rückfrage.

## 10. Ton, Texte und Statusangaben (BESCHLOSSEN, Markenkonzept v1.0 §7, Produktfamilie 1.0)

- **Grundton:** sachlich, persönlich, zugänglich und kompetent; nicht belehrend und nicht übertrieben werblich.
  Fachbegriffe dort, wo sie den Nutzenden helfen, sonst Alltagssprache (unklare Begriffe über den Baustein «Begriff»
  erklären).
- **Schweizer Rechtschreibung** (`ss` statt `ß`), Datum TT.MM.JJJJ; Details im Sprachteil von
  `UEBERNAHME-INTRANET-GUI.md`.
- **Statusangaben** eines Moduls nur wie freigegeben: «In Entwicklung» oder «Öffentliche Beta» (mit Datum der
  Freigabe). Solange ein Modul 0.x ist, zeigt es den Hinweis «In Entwicklung» bzw. «Beta». Keine erfundenen Releases,
  Termine, Demo-Links oder Funktionsversprechen; geplante Funktionen als Ziel bezeichnen, nicht als vorhanden.
- Claims nur, wenn sie zutreffen («Open Source for Education» nur bei passender Lizenz, 2.).
- Der Arbeitgeber des Entwicklers wird im öffentlichen Auftritt nicht genannt.

## 11. Pflege und Abnahme (BESCHLOSSEN, CI v1.0 §12–13)

- **Änderungssperre:** Farben der Marke, Farbsegmente, Schreibweisen und Icon-Motive ändern sich nur nach
  ausdrücklicher Freigabe durch Markus; jede Änderung bekommt einen Eintrag im Verlauf (12.) und im CHANGELOG.
- **Freiraum:** Grafiken, Fotos, Illustrationen und Oberflächen dürfen eigene Akzente nutzen, solange Wortmarken,
  Icons und Markenfarben unverändert bleiben.
- Rein gestalterische Arbeit benennt keine technischen Namen um (Repos, Pakete, APIs, URLs, Datenmodelle).

**Abnahme-Checkliste für KI-Werkzeuge und Reviews** (bei jeder Änderung an Oberfläche oder Marke abhaken):

- [ ] EduKSX, EduKSX-\<Begriff\>, MarKusSXCH, MarKusSX.CH und Markus Keller exakt geschrieben (3.1).
- [ ] Farbsegmente richtig: EduKSX **E violett, K orange, SX blau**; MarKusSXCH **M violett, K orange, SXCH blau**.
- [ ] Wortmarke über `BrandWordmark`, Icons über `EduksxIcon` bzw. `icons/`; keine eigenen Kopien, keine Hexwerte in
      Seiten.
- [ ] Nur Inter und JetBrains Mono, selbst gehostet, keine plattformabhängigen Schriften (3.4).
- [ ] Hell und dunkel, Schriftgrössen, Desktop/Tablet/Smartphone und WCAG-Kontrast (axe-core, `checkTheme()`) geprüft.
- [ ] Zustände der Bedienelemente vollständig (5.4); Symbol-Knöpfe mit `aria-label` und Tooltip (6.2).
- [ ] Technische Bezeichner, Repos, APIs und Links nicht durch Gestaltungsarbeit umbenannt.
- [ ] Keine unbestätigte Marken- oder Domainverfügbarkeit und keine erfundenen Releases behauptet (10.).
- [ ] Abweichungen im Modul vermerkt und im Abweichungsregister (8.) eingetragen.

## 12. Verlauf

- 22.11.2026: Angelegt. Quellen zusammengetragen aus markussxch (CI-Manual v1.0, Markenfortschreibungen v1.1 und v1.2,
  Produktfamilie 1.0, Icon-Set), EduKSX-Architektur (KONZEPT-DESIGN, Modulregister, Modulübersicht, PoC Zitadel),
  EduKSX-Glossary (`app.css`, `BrandWordmark`, DEC-015), sek-intranet (Erscheinungsbild, eingebaute Themes,
  `app.css`), EduKSX-Prototyp (`eduksx.css`, Prototypen), EduKSX-Core, -Ident, -Codex, -Connectors, -Suite,
  MarKusSX-Operation; EduKSX-Connect, -Flow, -Shop, -Time sind leer. Regel M0 beschlossen.
- 22.11.2026: M2 entschieden – Ident und Ops mit eigenen sichtbaren Namen.
- 22.11.2026: M3 entschieden – EduKSX oder eigenes Logo; MarKusSXCH nur Signatur.
- 22.11.2026: M4 (Signatur abschaltbar) und M5 (Vorschaubilder in CI-Farben) entschieden; EduKSX-UI umgestellt.
- 22.11.2026: Nachlese Icons und CI (#31): Icon-Set samt Generator nach `icons/`, Baustein `EduksxIcon`, Token
  `icon-tile`; neu 3.4 Schrift, 5.4 Zustände, 6.1 Dateien, 6.2 Bediensymbole (Idee #20), 10. Ton und Texte, 11. Pflege
  und Abnahme; Flow-Icon-Vermerk korrigiert; M6 entschieden: keine plattformabhängigen Schriften, Inter und JetBrains
  Mono (`font.mono`), kein Aptos. M7: Gewichte 400/500/600/700, keine Zwischengewichte. Geprüft zusätzlich: markussxch-tagstudio, edu-shop,
  agent-skills, WebApplicationProgrammingGuide – ohne weitere EduKSX-Inhalte. In markussxch wird nichts gelöscht,
  dort nur «Quelle EduKSX-UI» vermerkt (Entscheid Markus).
- 22.11.2026: Flow-Icon (#30) aus dem Prototyp-Entwurf ins Icon-Set übernommen und freigegeben (17 Icons); der
  frühere Vermerk «auch nicht im Prototyp» war falsch.
- 22.11.2026: M1 entschieden – alle Module `EduKSX-<Begriff>` mit deutschem Untertitel. Neues Modul `planner`
  EduKSX-Planner «Jahresplanung» (Icon und Abgrenzung zu `flow` offen).
- 22.11.2026: Planner-Icon (#49) Entwurf A «Zeitbalken» freigegeben und ins Icon-Set übernommen (18 Icons).
