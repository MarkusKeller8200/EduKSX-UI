import { TOKENS } from '../../../src/generated/tokens';
import { Block, Code, Example, Swatch, Table } from '../ui';

const GROUPS: { title: string; match: (n: string) => boolean }[] = [
    { title: 'Marke', match: (n) => n.startsWith('brand-') || n === 'icon-tile' },
    { title: 'Flächen und Text', match: (n) => /^(background|foreground|card|popover|muted|border|input|ring|link)/.test(n) },
    { title: 'Hauptfarbe, Akzent und Neben', match: (n) => /^(primary|secondary|accent)/.test(n) },
    { title: 'Status', match: (n) => /^(destructive|success|warning|info)/.test(n) },
    { title: 'Seitenleiste', match: (n) => n.startsWith('sidebar') },
    { title: 'Diagramme', match: (n) => n.startsWith('chart-') },
    { title: 'Glossar-Begriffe', match: (n) => n.startsWith('term-') },
];

export function Farben() {
    return (
        <div className="space-y-8">
            <p className="max-w-prose">
                Farben stehen nur in <Code>tokens/tokens.json</Code> und werden in Seiten nur über ihre Namen verwendet
                (<Code>bg-primary</Code>, <Code>text-muted-foreground</Code>), nie als fester Wert. Die Spalte «Aktuell» zeigt
                die Farbe im gewählten Farbschema der Vorschau-Leiste.
            </p>
            <Example label="Farbflächen">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {['background', 'card', 'muted', 'primary', 'secondary', 'accent', 'destructive', 'success'].map((n) => (
                        <div key={n} className="overflow-hidden rounded-md border border-border">
                            <div className="h-12" style={{ background: `var(--${n})` }} />
                            <p className="px-2 py-1 font-mono text-xs">{n}</p>
                        </div>
                    ))}
                </div>
            </Example>
            {GROUPS.map((g) => {
                const tokens = TOKENS.filter((t) => g.match(t.name));
                return (
                    <Block key={g.title} title={g.title}>
                        <Table head={['Token', 'Aktuell', 'Hell', 'Dunkel', 'Verwendung']} caption={`Farben: ${g.title}`}>
                            {tokens.map((t) => (
                                <tr key={t.name}>
                                    <td className="font-mono text-xs whitespace-nowrap">{t.name}</td>
                                    <td><Swatch color={`var(--${t.name})`} /></td>
                                    <td><Swatch color={t.light} label={t.light} /></td>
                                    <td><Swatch color={t.dark} label={t.dark} /></td>
                                    <td className="min-w-48">{t.description}</td>
                                </tr>
                            ))}
                        </Table>
                    </Block>
                );
            })}
        </div>
    );
}
