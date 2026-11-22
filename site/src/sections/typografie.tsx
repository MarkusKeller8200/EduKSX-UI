import tokens from '../../../tokens/tokens.json';
import { Block, Code, Example, Table } from '../ui';

const ROLES: { cls: string; name: string; text: string }[] = [
    { cls: 'typo-h1', name: 'H1 Seitentitel', text: 'Begriffe der Schule verwalten' },
    { cls: 'typo-h2', name: 'H2 Abschnitt', text: 'Zuständigkeiten und Abläufe' },
    { cls: 'typo-h3', name: 'H3', text: 'Absenzen im Semester' },
    { cls: 'typo-h4', name: 'H4', text: 'Hinweise für Lehrpersonen' },
    { cls: 'typo-lead', name: 'Einleitung', text: 'Diese Seite fasst die Regeln für das laufende Schuljahr zusammen.' },
    { cls: 'typo-body', name: 'Fliesstext', text: 'Fliesstext steht in 16 px mit Zeilenhöhe 1,75 und bleibt auf die Lesebreite von etwa 65 Zeichen begrenzt, damit Zeilen gut zu verfolgen sind.' },
    { cls: 'typo-ui', name: 'Bedienung', text: 'Bedienelemente, Tabellen, Formulare und Menüs in 14 px' },
    { cls: 'typo-label', name: 'Beschriftung, Knopf', text: 'Speichern · Kurzbeschreibung' },
    { cls: 'typo-small', name: 'Zusatzinfo', text: 'Geändert am 22.11.2026, 15:20' },
];

const SIZES = Object.entries(tokens.font.size) as [string, { $value: string; $description?: string }][];
const WEIGHTS = Object.entries(tokens.font.weight) as [string, { $value: number; $description?: string }][];
const SAMPLE = 'Schülerinnen prüfen Übersetzungen – 0123456789';

export function Typografie() {
    return (
        <div className="space-y-8">
            <p className="max-w-prose">
                Alle Module nutzen <strong className="font-semibold">Inter</strong> und für Code und IDs{' '}
                <strong className="font-semibold">JetBrains Mono</strong>, beide selbst gehostet (M6). Diese Seite lädt die
                Schriften aus <Code>fonts/</Code>, nicht von Google Fonts. Grössen in rem, damit Browser-Schriftgrösse und
                200 % Zoom greifen.
            </p>
            <Block title="Textrollen (T2)" note="Klassen typo-* aus theme.css. H1 wird ab md (768 px) 30 px gross – in der Ansicht Handy prüfen.">
                <Example label="Textrollen" className="space-y-4">
                    {ROLES.map((r) => (
                        <div key={r.cls} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                            <p className="text-xs text-muted-foreground">
                                {r.name}
                                <br />
                                <span className="font-mono">{r.cls}</span>
                            </p>
                            <p className={`${r.cls} max-w-prose`}>{r.text}</p>
                        </div>
                    ))}
                </Example>
            </Block>
            <Block title="Gewichte (M7)" note="Nur vier Stufen: 400 Text, 500 Beschriftungen, 600 Titel und Wortmarke, 700 stark. Keine Zwischengewichte.">
                <Example label="Gewichte" className="space-y-2">
                    {WEIGHTS.map(([name, w]) => (
                        <p key={name} className="flex flex-wrap items-baseline gap-x-4 text-lg" style={{ fontWeight: w.$value }}>
                            <span className="w-24 font-mono text-xs font-normal text-muted-foreground">
                                {w.$value} {name}
                            </span>
                            {SAMPLE}
                        </p>
                    ))}
                </Example>
            </Block>
            <Block title="Grössen (T1)" note="12 px ist die kleinste Grösse für lesbaren Text, 14 px für Bedienung, 16 px für Fliesstext.">
                <Table head={['Token', 'Wert', 'Beispiel', 'Verwendung']} caption="Schriftgrössen">
                    {SIZES.map(([name, s]) => (
                        <tr key={name}>
                            <td className="font-mono text-xs">text-{name}</td>
                            <td className="whitespace-nowrap tabular-nums">
                                {s.$value} ({parseFloat(s.$value) * 16} px)
                            </td>
                            <td className="whitespace-nowrap" style={{ fontSize: `var(--text-${name})`, lineHeight: `var(--text-${name}--line-height)` }}>
                                Begriff
                            </td>
                            <td className="min-w-48">{s.$description}</td>
                        </tr>
                    ))}
                </Table>
            </Block>
            <Block title="Code und IDs">
                <Example label="Monospace">
                    <pre className="overflow-x-auto rounded-md bg-muted p-3 text-sm">
                        <code>{`import { BrandWordmark } from '@eduksx/ui';\n// Modulschlüssel: glossary · Prüfsumme 9f86d081 · 0O 1lI`}</code>
                    </pre>
                    <p className="mt-2 text-sm">
                        <span className="font-mono">400</span> normal, <span className="font-mono font-semibold">600 hervorgehoben</span>
                    </p>
                </Example>
            </Block>
        </div>
    );
}
