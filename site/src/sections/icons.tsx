import { EduksxIcon, EDUKSX_ICON_NAMES } from '../../../src/components/eduksx-icon';
import { eduksxIcons } from '../../../src/components/eduksx-icons.data';
import { Block, Code, Example } from '../ui';

// Die ausgelieferten Dateien aus icons/ (nicht nachgezeichnet), damit Datei und Baustein verglichen werden können.
const FILES = import.meta.glob('../../../icons/svg/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const PNG = import.meta.glob('../../../icons/png/192/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const file = (glob: Record<string, string>, name: string) => Object.entries(glob).find(([k]) => k.endsWith(`/${name}`))?.[1];
const base = (n: string) => (n === 'eduksx' ? 'eduksx' : `eduksx-${n}`);

export function Icons() {
    return (
        <div className="space-y-8">
            <p className="max-w-prose">
                17 freigegebene Icons, 24er-Raster, Strich 1,75. Orange ist der Hauptakzent, Blau und Violett für Details.
                Neue Motive oder Farben brauchen eine eigene Freigabe. Neu seit 22.11.2026: EduKSX-Flow (#30).
            </p>
            <Block title="Baustein EduksxIcon" note="Farbig, einfarbig (Textfarbe) und als Kachel. Wechselt mit hell und dunkel.">
                <Example label="Icons">
                    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {EDUKSX_ICON_NAMES.map((n) => (
                            <li key={n} className="space-y-2 rounded-md border border-border p-3">
                                <div className="flex items-center gap-3">
                                    <EduksxIcon name={n} size={32} title={`${eduksxIcons[n].name} farbig`} />
                                    <EduksxIcon name={n} variant="mono" size={24} title={`${eduksxIcons[n].name} einfarbig`} />
                                    <EduksxIcon name={n} variant="tile" size={40} title={`${eduksxIcons[n].name} Kachel`} />
                                </div>
                                <p className="text-sm font-medium">{eduksxIcons[n].name}</p>
                                <p className="text-xs text-muted-foreground">{eduksxIcons[n].meaning}</p>
                            </li>
                        ))}
                    </ul>
                </Example>
            </Block>
            <Block title="Dateien im Paket" note={<>Wie ausgeliefert unter <Code>@eduksx/ui/icons/</Code>: farbig, Kachel hell, Kachel dunkel (SVG) und PNG 192.</>}>
                <div className="overflow-x-auto rounded-lg border border-border bg-card p-4" tabIndex={0} role="region" aria-label="Icon-Dateien">
                    <ul className="grid min-w-max grid-cols-[repeat(4,auto)] items-center gap-x-6 gap-y-3 text-xs sm:grid-cols-[repeat(8,auto)]">
                        {EDUKSX_ICON_NAMES.map((n) => (
                            <li key={n} className="contents">
                                {[`${base(n)}-color.svg`, `${base(n)}-tile-light.svg`, `${base(n)}-tile-dark.svg`].map((f) => (
                                    <img key={f} src={file(FILES, f)} alt={f} width={40} height={40} />
                                ))}
                                <img src={file(PNG, `${base(n)}-tile-light.png`)} alt={`${base(n)}-tile-light.png (192 px)`} width={40} height={40} />
                            </li>
                        ))}
                    </ul>
                </div>
            </Block>
        </div>
    );
}
