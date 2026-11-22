import tokens from '../../../tokens/tokens.json';
import { Block, Code, Example } from '../ui';

const STEPS = [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16];
const RADII = Object.entries(tokens.radius) as [string, { $value: string; $description?: string }][];
const SHADOWS = Object.entries(tokens.shadow) as [string, { $description?: string }][];

export function Abstaende() {
    return (
        <div className="space-y-8">
            <Block title="Abstände" note="Raster 4 px (--spacing = 0,25 rem). gap-1/gap-2 innerhalb eines Bausteins, gap-4 zwischen Bausteinen, p-4/p-6 in Karten, gap-6/gap-8 zwischen Abschnitten.">
                <Example label="Abstände" className="space-y-2">
                    {STEPS.map((n) => (
                        <div key={n} className="flex items-center gap-3 text-sm">
                            <span className="w-24 font-mono text-xs">p-{n}</span>
                            <span className="h-4 rounded-sm bg-primary" style={{ width: `calc(var(--spacing) * ${n})` }} aria-hidden="true" />
                            <span className="text-muted-foreground tabular-nums">{n * 4} px</span>
                        </div>
                    ))}
                </Example>
            </Block>
            <Block title="Radien">
                <Example label="Radien">
                    <div className="flex flex-wrap gap-4">
                        {RADII.map(([name, r]) => (
                            <figure key={name} className="w-32 space-y-2">
                                <div className="h-20 border-2 border-primary bg-secondary" style={{ borderRadius: `var(--radius-${name})` }} />
                                <figcaption className="text-xs">
                                    <span className="font-mono">rounded-{name}</span> · {r.$value}
                                    <br />
                                    <span className="text-muted-foreground">{r.$description}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </Example>
            </Block>
            <Block title="Schatten" note={<>Im Dunkelmodus kräftiger (40–50 % statt 5–10 %); Flächen trennt dort zusätzlich der Rahmen <Code>border</Code>. Die Wortmarke hat nie Schatten.</>}>
                <Example label="Schatten">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                        {SHADOWS.map(([name, s]) => (
                            <figure key={name} className="space-y-2">
                                <div className="h-20 rounded-lg border border-border bg-card" style={{ boxShadow: `var(--shadow-${name})` }} />
                                <figcaption className="text-xs">
                                    <span className="font-mono">shadow-{name}</span>
                                    <br />
                                    <span className="text-muted-foreground">{s.$description}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </Example>
            </Block>
        </div>
    );
}
