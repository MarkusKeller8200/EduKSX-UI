import { CircleCheck, TriangleAlert } from 'lucide-react';
import { BUILTIN_THEMES } from '../../../src/generated/tokens';
import { checkTheme, defaultColors } from '../../../src/contrast';
import { Button } from '../../../src/components/button';
import { Alert } from '../../../src/components/alert';
import { Block, Code, Example, Swatch, Table } from '../ui';

/** Kleine Musterfläche in den Farben eines Themes (data-theme am Bereich). */
function Muster({ theme }: { theme?: string }) {
    return (
        <div data-theme={theme} className="space-y-3 rounded-md border border-border bg-background p-4 text-foreground">
            <p className="text-sm">
                Fliesstext mit <a href="#/themes" className="text-link underline">Link</a> und <span className="text-muted-foreground">Nebentext</span>.
            </p>
            <div className="flex flex-wrap gap-2">
                <Button>Speichern</Button>
                <Button variant="secondary">Abbrechen</Button>
                <Button variant="outline">Mehr</Button>
            </div>
            <Alert variant="info" title="Hinweis">
                Statusfarben bleiben in jedem Theme gleich.
            </Alert>
        </div>
    );
}

export function Themes() {
    return (
        <div className="space-y-8">
            <p className="max-w-prose">
                Mitgeliefert werden immer <strong>EduKSX</strong> (Standard) und die zwei Alternativen <strong>Hoher Kontrast</strong> und{' '}
                <strong>Violett</strong> (DS11). Ein Theme enthält nur Abweichungen vom Standard und gilt über{' '}
                <Code>data-theme</Code> am Wurzelelement oder an einem Bereich. Weitere Themes legt eine Organisation an; die Person
                wählt aus den Themes, die der Admin der Organisation freigegeben hat. In der Vorschau-Leiste oben lässt sich die ganze
                Testseite in einem Theme anschauen.
            </p>
            <Block title="Nebeneinander" note="Jede Fläche setzt ihr Theme selbst; hell oder dunkel kommt aus der Vorschau-Leiste.">
                <div className="grid gap-4 md:grid-cols-3">
                    <Example label="EduKSX (Standard)">
                        <Muster theme="eduksx" />
                    </Example>
                    {BUILTIN_THEMES.map((t) => (
                        <Example key={t.key} label={t.name}>
                            <Muster theme={t.key} />
                        </Example>
                    ))}
                </div>
            </Block>
            {BUILTIN_THEMES.map((t) => {
                const findings = checkTheme({ light: { ...t.light }, dark: { ...t.dark } });
                const names = [...new Set([...Object.keys(t.light), ...Object.keys(t.dark)])];
                return (
                    <Block key={t.key} title={t.name} note={t.description}>
                        <p className="mb-3 inline-flex items-center gap-2 text-sm">
                            {findings.length === 0 ? <CircleCheck className="size-4" aria-hidden="true" /> : <TriangleAlert className="size-4 text-destructive" aria-hidden="true" />}
                            Kontrastprüfung {findings.length === 0 ? 'bestanden (hell und dunkel)' : `${findings.length} Paare zu schwach`} · <Code>data-theme="{t.key}"</Code>
                        </p>
                        <Table head={['Token', 'Standard hell', 'Theme hell', 'Standard dunkel', 'Theme dunkel']} caption={`Abweichungen ${t.name}`}>
                            {names.map((n) => {
                                const light = (t.light as Record<string, string>)[n];
                                const dark = (t.dark as Record<string, string>)[n];
                                return (
                                    <tr key={n}>
                                        <td className="font-mono text-xs">{n}</td>
                                        <td><Swatch color={defaultColors('light')[n]} label={defaultColors('light')[n]} /></td>
                                        <td>{light ? <Swatch color={light} label={light} /> : '–'}</td>
                                        <td><Swatch color={defaultColors('dark')[n]} label={defaultColors('dark')[n]} /></td>
                                        <td>{dark ? <Swatch color={dark} label={dark} /> : '–'}</td>
                                    </tr>
                                );
                            })}
                        </Table>
                    </Block>
                );
            })}
        </div>
    );
}
