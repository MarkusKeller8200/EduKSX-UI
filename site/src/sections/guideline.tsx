import { CircleCheck, CircleX } from 'lucide-react';
import type { ReactNode } from 'react';
import { Alert } from '../../../src/components/alert';
import { Button } from '../../../src/components/button';
import { Field, Input } from '../../../src/components/field';
import { cn } from '../../../src/lib/cn';
import { Block, Code, docUrl, Example, Table } from '../ui';

/** Gegenüberstellung «So» / «Nicht so» – Urteil mit Symbol und Text, nie nur Farbe. */
function Vergleich({ gut, schlecht, gutText, schlechtText }: { gut: ReactNode; schlecht: ReactNode; gutText: string; schlechtText: string }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Example label="So">
                <div className="space-y-3">
                    {gut}
                    <p className="inline-flex items-start gap-2 text-sm">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                        <span>
                            <span className="sr-only">Richtig: </span>
                            {gutText}
                        </span>
                    </p>
                </div>
            </Example>
            <Example label="Nicht so">
                <div className="space-y-3">
                    {schlecht}
                    <p className="inline-flex items-start gap-2 text-sm">
                        <CircleX className="mt-0.5 size-4 shrink-0 text-destructive-foreground" aria-hidden="true" />
                        <span>
                            <span className="sr-only">Falsch: </span>
                            {schlechtText}
                        </span>
                    </p>
                </div>
            </Example>
        </div>
    );
}

const PROFILE: [string, string, string, string][] = [
    ['Intern', 'Startseite, Mitteilungen: Kacheln und Listen', 'Kern des Moduls: Tabellen, Formulare', 'volle Werkzeuge'],
    ['Öffentlich', 'Kern des Moduls: Suche, Lesebreite, kaum Knöpfe', 'nur für angemeldete Beitragende', 'nur für Redaktion und Admin'],
    ['Mobil', 'entfällt oder nur Info', 'eine Aufgabe je Bildschirm, Hauptaktion unten, Knöpfe lg', 'auf dem Desktop, nicht mobil optimiert'],
];

const DICHTE = [
    { name: 'Webseite', note: 'luftig, Lesebreite', gap: 'space-y-6', size: 'default' as const },
    { name: 'Anwendung', note: 'normale Dichte', gap: 'space-y-4', size: 'default' as const },
    { name: 'Administration', note: 'dichter erlaubt, Knöpfe sm', gap: 'space-y-2', size: 'sm' as const },
];

export function Guideline() {
    return (
        <div className="space-y-8">
            <p className="max-w-prose">
                Wann was eingesetzt wird – Farben, Bausteine, Seitenaufbau, GUI-Profile und Texte. Der ganze Text steht in{' '}
                <a className="text-link underline" href={docUrl('docs/GUIDELINE.md')}>
                    docs/GUIDELINE.md
                </a>
                ; hier die Regeln mit Beispielen.
            </p>

            <Block title="Farben: eine Hauptaktion je Bereich" note="Guideline §2. Orange ist Fläche, nie Schrift, und nie der einzige Hinweis.">
                <Vergleich
                    gut={
                        <div className="flex flex-wrap justify-end gap-2">
                            <Button variant="outline">Abbrechen</Button>
                            <Button>Speichern</Button>
                        </div>
                    }
                    gutText="Eine Hauptaktion, rechts; Abbrechen als Umriss davor."
                    schlecht={
                        <div className="flex flex-wrap justify-end gap-2">
                            <Button>Abbrechen</Button>
                            <Button>Vorschau</Button>
                            <Button>Speichern</Button>
                        </div>
                    }
                    schlechtText="Drei gleich starke Knöpfe: Die Hauptaktion ist nicht erkennbar."
                />
                <Vergleich
                    gut={
                        <Alert variant="warning" title="Frist läuft ab">
                            Die Eingabe schliesst am 30.11.2026.
                        </Alert>
                    }
                    gutText="Status mit Symbol, Text und Statusfarbe."
                    schlecht={<p className="font-semibold text-brand-orange">Frist läuft ab</p>}
                    schlechtText="Markenorange als Schrift (2,36 : 1) und nur Farbe als Hinweis."
                />
            </Block>

            <Block title="Bausteine: Beschriftung und Rückmeldung" note="Guideline §3 und §6.">
                <Vergleich
                    gut={
                        <Field label="E-Mail" hint="Für die Anmeldung." error="Die E-Mail-Adresse braucht ein @. Bitte prüfen.">
                            <Input type="email" defaultValue="name.beispiel.ch" />
                        </Field>
                    }
                    gutText="Beschriftung sichtbar, Hinweis darunter, Fehler beim Feld: was ist falsch, was tun."
                    schlecht={
                        <div className="space-y-2">
                            <Input type="email" placeholder="E-Mail" aria-label="E-Mail" />
                            <p className="text-sm text-destructive-foreground">Ungültige Eingabe (Code 422)</p>
                        </div>
                    }
                    schlechtText="Platzhalter statt Beschriftung, Fehler ohne Hilfe und mit Technik."
                />
            </Block>

            <Block title="Texte: Rückfrage" note="Titel als Frage, Text mit der Folge, Knopf mit dem Verb.">
                <Vergleich
                    gut={
                        <div className="space-y-2 rounded-lg border border-border bg-popover p-4 shadow-lg">
                            <p className="typo-h4">Begriff löschen?</p>
                            <p className="text-sm text-muted-foreground">Der Begriff und sein Verlauf werden gelöscht.</p>
                            <div className="flex flex-wrap justify-end gap-2">
                                <Button variant="outline">Abbrechen</Button>
                                <Button variant="destructive">Löschen</Button>
                            </div>
                        </div>
                    }
                    gutText="Gegenstand und Folge sind klar, der Knopf sagt, was passiert."
                    schlecht={
                        <div className="space-y-2 rounded-lg border border-border bg-popover p-4 shadow-lg">
                            <p className="typo-h4">Sind Sie sicher?</p>
                            <div className="flex flex-wrap justify-end gap-2">
                                <Button variant="outline">Nein</Button>
                                <Button>Ja</Button>
                            </div>
                        </div>
                    }
                    schlechtText="Unklar, was gelöscht wird; «Ja/Nein» statt Verb; Gefahr nicht erkennbar."
                />
            </Block>

            <Block title="Seitenaufbau" note="Guideline §4: Kopfzeile, Seitenkopf mit einer h1 und Hauptaktion, Abstände im 4-px-Raster.">
                <Example label="Seitenkopf und Abschnitte">
                    <div className="space-y-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
                            <div className="space-y-1">
                                <p className="typo-h2">Begriffe</p>
                                <p className="text-sm text-muted-foreground">Alle Begriffe der Sammlung, neueste zuerst.</p>
                            </div>
                            <Button>Begriff anlegen</Button>
                        </div>
                        <div className="space-y-4">
                            <p className="typo-h3">Abschnitt</p>
                            <p className="max-w-prose text-sm">
                                Zwischen Abschnitten <Code>space-y-8</Code>, zwischen Bausteinen <Code>gap-4</Code>, in Bausteinen{' '}
                                <Code>gap-2</Code>. Fliesstext höchstens <Code>max-w-prose</Code>.
                            </p>
                        </div>
                    </div>
                </Example>
            </Block>

            <Block title="GUI-Profile (DS12)" note="Profil = Modulart × Ansicht. Regel für die Gestaltung, keine Technik.">
                <Table head={['Modulart', 'Webseite', 'Anwendung', 'Administration']} caption="GUI-Profile">
                    {PROFILE.map(([art, ...rest]) => (
                        <tr key={art}>
                            <td className="font-medium whitespace-nowrap">{art}</td>
                            {rest.map((c) => (
                                <td key={c} className="min-w-40">
                                    {c}
                                </td>
                            ))}
                        </tr>
                    ))}
                </Table>
                <div className="grid gap-4 md:grid-cols-3">
                    {DICHTE.map((d) => (
                        <Example key={d.name} label={`${d.name}: ${d.note}`}>
                            <div className={cn(d.gap)}>
                                <p className="text-sm font-semibold">
                                    {d.name} <span className="font-normal text-muted-foreground">· {d.note}</span>
                                </p>
                                <Field label="Name">
                                    <Input defaultValue="Beispiel" />
                                </Field>
                                <div className="flex flex-wrap justify-end gap-2">
                                    <Button variant="outline" size={d.size}>
                                        Abbrechen
                                    </Button>
                                    <Button size={d.size}>Speichern</Button>
                                </div>
                            </div>
                        </Example>
                    ))}
                </div>
            </Block>
        </div>
    );
}
