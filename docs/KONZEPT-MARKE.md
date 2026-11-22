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
- Entwicklersignatur im Fuss bzw. unter dem Logo: **«Developed by MarKusSXCH»** mit Wortmarke `developer`.

## 4. Produkt- und Modulnamen

Modulschlüssel sind intern, englisch und unveränderlich (Modulregister, EduKSX-Architektur). Der sichtbare Name
folgt der CI-Regel **EduKSX-\<englischer Funktionsbegriff\>** (Produktfamilie 1.0). Wie Module mit deutschen
Bezeichnungen sichtbar heissen, ist **OFFEN** (M1); die Spalte «Sichtbarer Name» zeigt den Vorschlag.

| Schlüssel | Sichtbarer Name (EMPFOHLEN) | Deutsche Bezeichnung | Bisher in den Repos | Icon | Repo |
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
| `flow` | EduKSX-Flow | Abläufe und Termine | EduKSX-Flow; Prototyp «Ablaufplanung / Termine und ToDo» | **fehlt** im Icon-Set | EduKSX-Flow (leer) |
| `time` | EduKSX-Time | Zeiterfassung | EduKSX-Time; Prototyp «Zeiterfassung / Stempeln» | Time | EduKSX-Time (leer) |
| `shop` | EduKSX-Shop | Bestellungen | EduKSX-Shop | Shop | EduKSX-Shop (leer) |
| `sign` | EduKSX-Sign | Unterschriften | EduKSX-Sign; Prototyp «Signatur / Persönliche Ablage» | Sign | – |
| `portal` | EduKSX-Portal | Portal für Externe | EduKSX-Portal | Portal | – |
| `intranet` | EduKSX-Intranet | Intranet | Register «Intranet»; Intranet selbst «EduKSX-Intranet» | Intranet | sek-intranet |
| `services` | EduKSX-Services (reserviert) | – | – | Services | – |

**Ohne Modulschlüssel, keine Produktoberfläche:** EduKSX-Architektur, EduKSX-UI (`@eduksx/ui`), EduKSX-Suite
(Verteilpaket Selbst-Hosting), EduKSX-Connectors (Anbindungen), EduKSX-Prototyp (Prototypen). Ihr Name folgt der
Schreibweise, Wortmarke und Icon brauchen sie nicht.

**Regeln (EMPFOHLEN, bis M1 entschieden ist):**
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

### 5.3 Themes

Standard «EduKSX» nur aus `tokens.json`; «Hoher Kontrast» als Vorlage; Theme der Organisation mit allen bekannten
Tokens, aktivierbar erst nach bestandener Kontrastprüfung (DS4). **Wortmarke, Icons und Signets bleiben in jedem
Theme in den CI-Farben.** Wie weit eine Instanz die Marke ersetzen darf, ist **OFFEN** (M3).

## 6. Icons und Signets (BESCHLOSSEN, Icon-Set EduKSX, freigegeben 09.11. und 13.11.2026)

- 16 freigegebene Icons: EduKSX, Glossary, Codex, Core, Ident, Shop, Licence, Portal, Connect, Services, Sign, Time,
  Intranet, Timetable, Staffing, Ops. Motive: vier Bausteine (EduKSX), offenes Buch mit A–Z (Glossary), Waage (Codex),
  Sechseck mit Kern (Core), Ausweis (Ident), Tasche mit Häkchen (Shop), Schlüssel (Licence), Torbogen mit Pfeil
  (Portal), drei verbundene Knoten (Connect), Zahnrad (Services), Feder mit Unterschrift (Sign), Uhr (Time), Haus mit
  vier Bausteinen (Intranet), Raster mit Kalenderkopf (Timetable), Person mit Kalender (Staffing), Bildschirm mit Puls
  (Ops).
- Gestaltung: 24er-Raster, Strich 1,75, runde Enden und Ecken; Orange = Hauptakzent, Blau und Violett für Details,
  Neutral `#222222` / `#F2F5F8`; Kachel 48 × 48, Eckenradius 11.
- Varianten: einfarbig (`currentColor`) für die Oberfläche, farbig für helle Flächen, Kachel hell/dunkel als App-Icon
  (PNG 512, 192, 64, 32).
- Neue Motive oder Farben brauchen eine eigene Freigabe durch Markus. **EduKSX-Flow hat noch kein freigegebenes Icon**
  (ZU PRÜFEN: Entwurf aus dem Prototyp vorlegen).
- Für EduKSX gibt es kein separates Signet; das Icon «EduKSX» bzw. das Modul-Icon dient als Favicon und App-Icon.
- Eine eigene Symbolwahl «Standard-Symbole (Lucide)» statt EduKSX-Icons ist nur für Menüsymbole erlaubt, nie für
  Modul-Icons in Kopfzeile und Modulwechsel (EMPFOHLEN, aus dem Intranet).

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
| A5 | sek-intranet | Marke wählbar: EduKSX, MarKusSXCH oder eigenes Logo (ersetzt die Wortmarke) | **Ja** – betrifft alle Module | Entscheid M3 | OFFEN (M3) |
| A6 | sek-intranet | Signatur «Developed by MarKusSXCH» abschaltbar | **Ja** | Entscheid M4 | OFFEN (M4) |
| A7 | sek-intranet | Titel «MarKusSXCH Intranet» (ohne Bindestrich) | Folgt aus M3 | entfällt, falls MarKusSXCH keine Produktmarke ist | OFFEN (M3) |
| A8 | sek-intranet | eigene Kopie von `BrandWordmark` | Nein | `@eduksx/ui` verwenden | OFFEN im Modul |
| A9 | EduKSX-Glossary | `input` `#CBD5E1` / `#3A4556`; `--brand`, `--brand-accent`, `--brand-ink`; eigene Kopie `BrandWordmark` | Nein (in EduKSX-UI entschieden, PR 8) | anpassen (#16) | OFFEN im Modul |
| A10 | EduKSX-Architektur `poc/ident-zitadel` | dunkle Fläche `#1B1F24`, Warnung dunkel `#FF6B6B` | Nein | `#151B24` und Status aus `tokens.json` | OFFEN im Modul |
| A11 | EduKSX-Prototyp | Prototypen mit deutschen Namen | folgt aus M1 | Untertitel-Regel (Abschnitt 4) | OFFEN (M1) |
| A12 | EduKSX-Architektur | Register: Marketingnamen «Intranet», «Stundenplan», «Teil von EduKSX-Core»; Übersicht «Einsatzplanung»; Schreibweise «MarKusSX» | folgt aus M1; M2 entschieden | Register: ident/ops «EduKSX-Ident», «EduKSX-Ops» (M2); Rest nach M1 | OFFEN (M1) |
| A13 | alle Repos (Blueprint) | GitHub-Vorschaubild `#0B3D63` / `#F2B705` | **Ja** | Entscheid M5 | OFFEN (M5) |

## 9. Entscheide

| Nr. | Frage | Optionen | Entscheid | Status |
| --- | --- | --- | --- | --- |
| M0 | Verbindlichkeit für Module | – | Module folgen dem UI-Konzept; Abweichung nur nach globaler Prüfung, mit Begründung im Modul, regelmässig überprüft | BESCHLOSSEN 22.11.2026 |
| M1 | Sichtbare Modulnamen | EduKSX-Englisch + deutscher Untertitel / deutsch für Schulmodule / frei je Modul | – | OFFEN |
| M2 | Ident und Ops nach aussen | eigene Namen / Teil von EduKSX-Core | eigene sichtbare Namen EduKSX-Ident und EduKSX-Ops | BESCHLOSSEN 22.11.2026 |
| M3 | Marke links oben in einer Instanz | EduKSX + Logo zusätzlich (DS4) / EduKSX oder eigenes Logo / EduKSX, MarKusSXCH oder eigenes Logo | – | OFFEN |
| M4 | Signatur «Developed by MarKusSXCH» | abschaltbar (Vorgabe ein) / immer sichtbar | – | OFFEN |
| M5 | GitHub-Vorschaubilder | CI-Farben im Blueprint / bleibt neutral | – | OFFEN |

Nach dem Entscheid: M3 ändert ggf. DS4 in `KONZEPT-DESIGN.md` (EduKSX-Architektur); M1/M2 das Modulregister.
Änderungen in anderen Repos als EduKSX-UI erst nach Rückfrage.

## 10. Verlauf

- 22.11.2026: Angelegt. Quellen zusammengetragen aus markussxch (CI-Manual v1.0, Markenfortschreibungen v1.1 und v1.2,
  Produktfamilie 1.0, Icon-Set), EduKSX-Architektur (KONZEPT-DESIGN, Modulregister, Modulübersicht, PoC Zitadel),
  EduKSX-Glossary (`app.css`, `BrandWordmark`, DEC-015), sek-intranet (Erscheinungsbild, eingebaute Themes,
  `app.css`), EduKSX-Prototyp (`eduksx.css`, Prototypen), EduKSX-Core, -Ident, -Codex, -Connectors, -Suite,
  MarKusSX-Operation; EduKSX-Connect, -Flow, -Shop, -Time sind leer. Regel M0 beschlossen.
- 22.11.2026: M2 entschieden – Ident und Ops mit eigenen sichtbaren Namen.
