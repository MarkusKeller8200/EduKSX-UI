import { CircleCheck, TriangleAlert } from 'lucide-react';
import { CONTRAST_PAIRS } from '../../../src/generated/tokens';
import { contrastRatio, defaultColors, type Mode } from '../../../src/contrast';
import { Block, Code, Example, Table } from '../ui';

const fmt = (r: number) => r.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Result({ mode, fg, bg, min }: { mode: Mode; fg: string; bg: string; min: number }) {
    const c = defaultColors(mode);
    const ratio = contrastRatio(c[fg], c[bg]);
    const ok = ratio >= min;
    const Icon = ok ? CircleCheck : TriangleAlert;
    return (
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span
                className="inline-flex h-7 min-w-12 items-center justify-center rounded-sm border border-border px-2 text-sm font-medium"
                style={{ background: c[bg], color: c[fg] }}
                aria-hidden="true"
            >
                Aa
            </span>
            <span className="tabular-nums">{fmt(ratio)} : 1</span>
            <span className={ok ? 'inline-flex items-center gap-1 text-foreground' : 'inline-flex items-center gap-1 font-medium text-destructive'}>
                <Icon className="size-4" aria-hidden="true" />
                {ok ? 'bestanden' : 'zu schwach'}
            </span>
        </span>
    );
}

export function Kontrast() {
    const failing = (['light', 'dark'] as const).flatMap((m) =>
        CONTRAST_PAIRS.filter((p) => contrastRatio(defaultColors(m)[p.foreground], defaultColors(m)[p.background]) < p.min),
    ).length;
    return (
        <div className="space-y-8">
            <p className="max-w-prose">
                Dieselben Paare prüft <Code>checkTheme()</Code> im Paket und der Test <Code>tests/contrast.test.ts</Code>.
                Schrift auf Fläche braucht mindestens 4,5 : 1 (WCAG 1.4.3), Linien, Rahmen von Feldern und Fokus 3 : 1
                (WCAG 1.4.11). Die Werte hier sind aus den Tokens nachgerechnet, nicht abgeschrieben.
            </p>
            <Example label="Ergebnis">
                <p className="flex items-center gap-2 font-medium">
                    {failing === 0 ? <CircleCheck className="size-5" aria-hidden="true" /> : <TriangleAlert className="size-5 text-destructive" aria-hidden="true" />}
                    {failing === 0 ? `Alle ${CONTRAST_PAIRS.length} Paare bestehen hell und dunkel.` : `${failing} Prüfungen sind zu schwach.`}
                </p>
            </Example>
            <Block title="Prüfpaare">
                <Table head={['Schrift bzw. Linie', 'Fläche', 'Mindestens', 'Hell', 'Dunkel']} caption="Kontrast der Prüfpaare">
                    {CONTRAST_PAIRS.map((p) => (
                        <tr key={`${p.foreground}/${p.background}`}>
                            <td className="font-mono text-xs">{p.foreground}</td>
                            <td className="font-mono text-xs">{p.background}</td>
                            <td className="tabular-nums whitespace-nowrap">{fmt(p.min)} : 1</td>
                            <td><Result mode="light" fg={p.foreground} bg={p.background} min={p.min} /></td>
                            <td><Result mode="dark" fg={p.foreground} bg={p.background} min={p.min} /></td>
                        </tr>
                    ))}
                </Table>
            </Block>
        </div>
    );
}
