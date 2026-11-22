# Konzept: Grundbausteine (#27)

Stand: 2026-11-22 (0.2) · Status: **UMGESETZT** (im Beta-Test)

Gilt für alle EduKSX-Module (Verbindlichkeit: `AGENTS.md`, `KONZEPT-MARKE.md` §1). Vorbild sind die Bausteine aus dem
INTRANET (`UEBERNAHME-INTRANET-GUI.md` §5, Nummern in Klammern); Farben und Zustände nach `KONZEPT-MARKE.md` 5.2–5.4
und 6.2, Grössen nach `KONZEPT-TOKENS.md`.

Stufen nach `KONZEPT-VORLAGE.md`: **BESCHLOSSEN** (mit Datum), **EMPFOHLEN**, **OFFEN**, **ZU PRÜFEN**.

## 1. Ziel

Die ersten Grundbausteine in `@eduksx/ui`, damit Module Knöpfe, Formulare, Tabellen, Dialoge und Hinweise nicht mehr
selbst bauen (Auftrag Markus 22.11.2026, Issue #27).

**Nichtziele:** bearbeitbare Tabelle mit Filtern und Excel-Bedienung (später eigener Baustein), Auswahl mit Suche,
Mehrfachauswahl, Datumsauswahl, Optionsfelder, Schalter, Toast (eigene Issues); Musterseite (#15, eigener Thread);
axe-core in der CI (#14).

## 2. Bausteine

Jeder Baustein: Farben nur über Tokens, hell und dunkel, ganz mit Tastatur bedienbar, sichtbarer Fokusrahmen
(`outline` 2 px in `ring`), Texte auf Deutsch als Vorgabe und per Eigenschaft übersteuerbar (Übersetzung im Modul).
Jedes Element trägt `data-slot` (z. B. `data-slot="button"`), damit Musterseite und Tests es finden.

### 2.1 Button (2.1) – `Button`, `IconButton`, `buttonClasses()`

| Variante (`variant`) | Deutsch | Aussehen | Verwendung |
| --- | --- | --- | --- |
| `default` | Hauptknopf | Orange als Fläche, dunkle Schrift (nie weiss) | eine Hauptaktion je Bereich |
| `secondary` | Nebenknopf | helles Orange, braune Schrift | weitere Aktion mit Gewicht |
| `outline` | Umriss | Rahmen `input`, Fläche `background` | Abbrechen, neutrale Aktionen |
| `ghost` | Text | nur Schrift, Fläche beim Darüberfahren | Werkzeugleisten, Symbol-Knöpfe |
| `destructive` | Gefahr | Rot als Fläche, Schrift `destructive-contrast` | Löschen, Unumkehrbares |
| `link` | Link | funktionales Blau, **immer unterstrichen** | Navigation im Text |

- **Grössen** (`size`): `sm` 32 px, `default` 36 px, `lg` 40 px (16 px Schrift), `icon` 36 × 36, `icon-sm` 32 × 32.
  Alle über dem Mindestziel 24 × 24 px (WCAG 2.5.8).
- **Zustände** (KONZEPT-MARKE 5.4): Normal · Hover (Fläche heller bzw. dunkler gemischt) · Fokus (Ring) · Gedrückt
  (Fläche stärker gemischt) · Deaktiviert (`disabled`, 50 % Deckkraft) · Lädt (`loading`: Ladeanzeige, bleibt
  fokussierbar, `aria-busy` und `aria-disabled`, löst nichts aus) · Umschalter (`aria-pressed`, Rahmen/Ring, nicht
  nur Farbe). Die Mischung `color-mix(in srgb, …)` ist so gewählt, dass die Schrift in jedem Zustand mind. 4,5 : 1
  behält; der Test rechnet das hell und dunkel nach.
- `type="button"` ist Vorgabe (kein ungewolltes Absenden). Symbol vor dem Text mit `icon={…}` (Lucide, 16 px).
- **`IconButton`** (nur Symbol): `label` ist Pflicht und wird `aria-label` **und** Tooltip (KONZEPT-MARKE 6.2); das
  Symbol ist `aria-hidden`; `pressed` für Umschalter.
- **Links, die wie Knöpfe aussehen:** `<a className={buttonClasses({ variant: 'outline' })}>`.

### 2.2 Tooltip (4.1) – `Tooltip`

- Erscheint beim Darüberfahren (nach 300 ms) und sofort beim Fokussieren; bleibt, solange die Maus darauf liegt;
  Esc schliesst ihn, ohne den Fokus zu verschieben (WCAG 1.4.13).
- Ergänzender Text wird per `aria-describedby` vorgelesen; wiederholt er nur den Namen (Symbol-Knopf), bleibt er
  stumm (`describe={false}`).
- Nur Zusatzinformation: nichts, was man zum Bedienen zwingend braucht, keine Links darin. Auf Touch-Geräten gibt es
  keinen Hover – darum hat jeder Symbol-Knopf zusätzlich sein `aria-label`.

### 2.3 Formularfelder (2.3, 2.5) – `Field`, `Input`, `Textarea`, `NativeSelect`, `Checkbox`, `Label`, `FieldHint`, `FieldError`

```tsx
<Field label="E-Mail" hint="Adresse der Schule" error={fehler} required>
    <Input type="email" />
</Field>
```

- `Field` verbindet Beschriftung (`for`/`id`), Hinweis und Fehler (`aria-describedby`, `aria-invalid`,
  `aria-errormessage`) automatisch; `required` und `disabled` gehen an das Feld.
- **Reihenfolge:** Beschriftung, Hinweis, Feld, Fehler. Beschriftung immer sichtbar – der Platzhalter ersetzt sie nie.
- **Pflicht:** `*` hinter der Beschriftung (für Bildschirmleser `required` am Feld). Formulare mit Pflichtfeldern
  erklären `*` einmal oben («* Pflichtfeld»).
- **Fehler** immer mit Symbol und Text, beginnt für Bildschirmleser mit «Fehler:»; der Text sagt, was falsch ist und
  wie es richtig geht. Feldrahmen dann rot (`destructive`).
- **Rahmen** `input` mit mind. 3 : 1 zum Hintergrund (WCAG 1.4.11), beim Darüberfahren `muted-foreground`, beim
  Fokus `ring`; gesperrt und nur lesen mit Fläche `muted`.
- **Schrift im Feld:** 16 px auf dem Handy, ab `md` 14 px – übernommen aus dem INTRANET, weil iOS bei Feldern unter
  16 px beim Antippen hineinzoomt (Ergänzung zu T1).
- **Auswahl:** vorerst das Auswahlfeld des Browsers (`NativeSelect`), mit `placeholder="Bitte wählen"` als leere erste
  Wahl (bei Pflichtfeldern nicht wählbar). Auswahl mit Suche folgt als eigener Baustein.
- **Kontrollkästchen** (`Checkbox`): natives Kästchen in Akzentfarbe, Beschriftung rechts und anklickbar,
  `indeterminate` für «teilweise gewählt». Für sofort wirksame Einstellungen später den Schalter verwenden.

### 2.4 Tabelle (3.1, einfache Tabelle) – `Table`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableEmpty`

- Echte Tabellen-Elemente; `TableCaption` benennt die Tabelle (oben, sichtbar). Spaltenköpfe `scope="col"`.
- **Breite Tabellen** scrollen in ihrem Bereich, nicht die Seite (WCAG 1.4.10). Mit `scrollLabel` wird der Bereich
  per Tab erreichbar und als Region angesagt – setzen, sobald die Tabelle breiter als 320 px werden kann.
- **Sortieren:** `TableHead sort="asc|desc|none" onSort={…}` macht den Kopf zum Knopf mit Pfeil und setzt `aria-sort`;
  das Sortieren selbst macht das Modul.
- **Zahlen** mit `numeric` rechtsbündig und gleich breiten Ziffern. **Gewählte Zeile** (`selected`): Fläche `accent`
  plus Balken links (nicht nur Farbe). **Leer:** `TableEmpty` mit «Keine Einträge.».
- Schrift 14 px (T1), Zeilen ohne feste Höhe (Text darf umbrechen).

### 2.5 Dialog (4.1) – `Dialog`

- Natives `<dialog>` mit `showModal()`: Seite dahinter gesperrt, Fokus bleibt im Dialog, Esc schliesst; der Baustein
  ergänzt Titel (`aria-labelledby`), Beschreibung (`aria-describedby`), Klick daneben schliesst, «Schliessen» oben
  rechts als Symbol-Knopf, Fokus zurück auf den auslösenden Knopf.
- Gesteuert (`open`, `onOpenChange`); Knöpfe im `footer`, Hauptaktion zuletzt (rechts), auf dem Handy untereinander
  mit der Hauptaktion oben. Breiten `sm` 384, `md` 512 (Vorgabe), `lg` 672 px; auf dem Handy volle Breite mit Rand.

### 2.6 Rückfrage (4.2) – `AlertDialog`

- Für Löschen und unumkehrbare Schritte: `role="alertdialog"`, **schliesst nicht mit Klick daneben**, Fokus zuerst
  auf «Abbrechen», Esc gilt als Abbrechen.
- Titel als Frage («Eintrag löschen?»), Beschreibung mit der Folge, Bestätigungsknopf als Verb («Löschen»);
  `tone="destructive"` (Vorgabe, roter Knopf) oder `default` (z. B. «Freigeben»).
- `onConfirm` darf ein Promise liefern: Knopf zeigt «lädt», Dialog schliesst nach Erfolg und bleibt bei Fehler offen.

### 2.7 Hinweisbox (4.1) – `Alert`

- Varianten `info`, `success`, `warning`, `destructive` mit festem Symbol (Lucide `Info`, `CircleCheck`,
  `TriangleAlert`, `CircleAlert`), Titel in der Statusfarbe auf der hellen Statusfläche, Text in `foreground`,
  Balken links. Für Bildschirmleser beginnt die Box mit der Art («Warnung: …»).
- `announce` nur für Hinweise, die nach einer Aktion erscheinen: Fehler und Warnung als `alert` (sofort), Erfolg und
  Info als `status` (höflich). Mit der Seite geladene Hinweise werden nicht angesagt.
- Optional `action` (Knopf zur Behebung) und `onDismiss` (Symbol-Knopf «Hinweis schliessen»).

## 3. Technik und Tokens

- **Keine neue Abhängigkeit:** Die Bausteine bauen auf HTML (`<dialog>`, `<select>`, `<input type="checkbox">`) und
  React auf. Die zehn festen Symbole (Schliessen, Pfeile, Hinweis, Erfolg, Warnung, Fehler, Laden) sind als Pfade aus
  Lucide kopiert (`src/components/symbols.tsx`, ISC-Hinweis bleibt im Build erhalten, `docs/third-party.json`).
- **Neue Farb-Tokens** (mit Prüfpaaren 4,5 : 1):
  - `destructive-contrast` – Schrift auf der roten Fläche `destructive` (weiss, 5,6 : 1 hell, 6,6 : 1 dunkel). Löst
    #11; `destructive-foreground` bleibt «Fehlertext auf Hintergrund».
  - `destructive-soft` – Fläche der Fehler-Hinweisbox (`#fdecea` / `#3a1616`), passend zu `info-soft`,
    `success-soft`, `warning-soft`.
  - Prüfpaare `foreground` auf allen `*-soft`-Flächen.
- **Glossary:** nutzt für den Gefahr-Knopf heute `text-white`; beim Umstieg (#16) auf `text-destructive-contrast`.
- **Tests:** `tests/bausteine.test.tsx` (Rollen, Namen, Tastatur, Fokus, Esc, Ansagen) und
  `tests/zustaende-kontrast.test.ts` (Kontrast der Knopf-Zustände hell/dunkel, keine festen Farben in den
  Bausteinen). jsdom kennt `showModal()` nicht; das Verhalten im echten Browser wurde am 22.11.2026 in Chromium
  geprüft (Fokus im Dialog gefangen, Esc, Klick daneben, Fokus zurück, Rückfrage bleibt bei Klick daneben offen,
  keine waagrechte Scrollleiste bei 320 px). Automatisch mit axe-core folgt mit #14.

## 4. Entscheide

| Nr. | Frage | Optionen | Entscheid | Status |
| --- | --- | --- | --- | --- |
| B1 | Technische Grundlage | Eigenbau auf HTML-Basis / Radix UI wie INTRANET | Eigenbau auf HTML-Basis, keine neue Abhängigkeit | BESCHLOSSEN 22.11.2026 |
| B2 | Namen und Varianten im Code | wie shadcn/ui / eigene deutsche Namen | wie shadcn/ui, deutsche Begriffe in der Doku | BESCHLOSSEN 22.11.2026 |
| B3 | Umfang Meldungen | Hinweisbox, Rückfrage, Tooltip / zusätzlich Toast | Hinweisbox, Rückfrage, Tooltip; Toast als eigenes Issue | BESCHLOSSEN 22.11.2026 |
| B4 | Token für Schrift auf `destructive` (#11) | `destructive-contrast` / `on-destructive` / vorerst `text-white` | `destructive-contrast` | BESCHLOSSEN 22.11.2026 |

## 5. Issues

| Issue | Inhalt | Status |
| --- | --- | --- |
| #27 | Grundbausteine Button, Formularfelder, Tabelle, Dialog, Meldungen | `_3 Beta-Test` (PR #34) |
| #11 | Token für Schrift auf Fehlerfläche | `_3 Beta-Test` (B4, PR #34) |
| #14 | axe-core in der CI | offen |
| #15 | Musterseite der Bausteine | eigener Thread |

## 6. Verlauf

- 2026-11-22: Konzept angelegt, Bausteine umgesetzt (PR #34 gemergt); B1–B4 von Markus mit dem Merge bestätigt.
