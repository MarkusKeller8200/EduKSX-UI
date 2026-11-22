import { useEffect, useState } from 'react';
import tokens from '../../../tokens/tokens.json';
import { Block, Code, Example, Table } from '../ui';
import { DEVICES } from '../devices';

const BREAKPOINTS = Object.entries(tokens.breakpoint) as [string, { $value: string; $description?: string }][];
const CONTAINERS = Object.entries(tokens.container) as [string, { $value: string; $description?: string }][];

function useViewport() {
    const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
    useEffect(() => {
        const on = () => setSize({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', on);
        return () => window.removeEventListener('resize', on);
    }, []);
    return size;
}

export function Ansichten() {
    const { w, h } = useViewport();
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return (
        <div className="space-y-8">
            <Block title="Diese Ansicht jetzt" note="Die Werte gelten für das Fenster bzw. das Gerät, das in der Vorschau-Leiste gewählt ist.">
                <Example label="Aktuelle Ansicht" className="space-y-3">
                    <p className="text-lg font-semibold tabular-nums">
                        {w} × {h} px
                    </p>
                    <ul className="flex flex-wrap gap-2 text-sm">
                        {BREAKPOINTS.map(([name, b]) => {
                            const on = w >= parseFloat(b.$value) * rem;
                            return (
                                <li key={name} className={on ? 'rounded-full bg-primary px-3 py-1 text-primary-foreground' : 'rounded-full border border-border px-3 py-1 text-muted-foreground'}>
                                    {name}: {on ? 'aktiv' : 'nicht aktiv'}
                                </li>
                            );
                        })}
                    </ul>
                    <p className="text-sm">
                        Variante <Code>desk</Code>: <span className="font-medium desk:hidden">Handy-Bedienung (desk nicht aktiv)</span>
                        <span className="hidden font-medium desk:inline">Desktop-Bedienung (desk aktiv)</span>
                    </p>
                </Example>
            </Block>
            <Block title="Pflicht-Ansichten (Idee #19)" note="Jede Oberfläche wird in allen Ansichten geprüft. In der Vorschau-Leiste oben umschalten; Handy und Tablet erscheinen in einem Rahmen in Gerätegrösse, damit die Breakpoints wirklich greifen.">
                <Table head={['Ansicht', 'Grösse', 'Prüfen']} caption="Pflicht-Ansichten">
                    {DEVICES.map((d) => (
                        <tr key={d.label}>
                            <td className="font-medium whitespace-nowrap">{d.label}</td>
                            <td className="tabular-nums whitespace-nowrap">{d.size}</td>
                            <td className="min-w-48">{d.check}</td>
                        </tr>
                    ))}
                </Table>
            </Block>
            <Block title="Breakpoints">
                <Table head={['Token', 'Wert', 'Bedeutung']} caption="Breakpoints">
                    {BREAKPOINTS.map(([name, b]) => (
                        <tr key={name}>
                            <td className="font-mono text-xs">{name}:</td>
                            <td className="tabular-nums whitespace-nowrap">
                                {b.$value} ({parseFloat(b.$value) * 16} px)
                            </td>
                            <td>{b.$description}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="font-mono text-xs">desk:</td>
                        <td>ab 40 rem, ausser Handy quer</td>
                        <td>Umschaltung Handy- und Desktop-Bedienung (Navigation, Seitenleiste)</td>
                    </tr>
                </Table>
            </Block>
            <Block title="Seitenbreiten" note="Darstellungsoptimierte Seiten (Detailseite, Konto, Formulare) bleiben auch bei «Breit» und «Voll» auf 1152 px und zentriert.">
                <Table head={['Token', 'Wert', 'Ansicht']} caption="Seitenbreiten">
                    {CONTAINERS.map(([name, c]) => (
                        <tr key={name}>
                            <td className="font-mono text-xs">max-w-{name}</td>
                            <td className="tabular-nums">{c.$value}</td>
                            <td>{c.$description}</td>
                        </tr>
                    ))}
                </Table>
                <Example label="Lesebreite">
                    <p className="max-w-prose border-r-2 border-dashed border-primary pr-2">
                        Dieser Absatz ist auf die Lesebreite (65 Zeichen) begrenzt. Die gestrichelte Linie zeigt das Ende. Listen,
                        Tabellen und kurze Hinweise dürfen die volle Breite nutzen.
                    </p>
                </Example>
            </Block>
        </div>
    );
}
