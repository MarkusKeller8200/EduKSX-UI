import { BrandWordmark } from '../../../src/components/brand-wordmark';
import { Block, Example, Table } from '../ui';

const SPELLINGS = [
    ['Produktfamilie', 'EduKSX', 'Eduksx, EdukSX, EDUKSX, Edu-KSX'],
    ['Produkt/Modul', 'EduKSX-Glossary (mit Bindestrich)', 'EduKSX Glossary, EduKSXGlossary'],
    ['Entwicklermarke', 'MarKusSXCH', 'MarkusSXCH, MarKusSX, MarKusSxCH'],
    ['Person', 'Markus Keller (Klartext in Impressum und rechtlichen Texten)', '–'],
];

export function Wortmarken() {
    return (
        <div className="space-y-8">
            <Block title="Marken" note="Text mit Farbsegmenten, kein Bild. Farben nur über die Markentokens; im Fliesstext wird der Name nicht farbig gesetzt.">
                <Example label="Wortmarken" className="space-y-4">
                    <p className="text-3xl"><BrandWordmark /></p>
                    <p className="text-3xl"><BrandWordmark suffix="Glossary" /></p>
                    <p className="text-3xl"><BrandWordmark brand="developer" /></p>
                </Example>
            </Block>
            <Block title="Grössen" note="Gewicht 600, nie strecken, nie umbrechen. Reicht der Platz nicht, Icon plus Klartext statt verkleinerter Wortmarke.">
                <Example label="Grössen" className="space-y-2">
                    {['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'].map((c) => (
                        <p key={c} className="flex items-baseline gap-4">
                            <span className="w-20 font-mono text-xs text-muted-foreground">{c}</span>
                            <BrandWordmark suffix="Timetable" className={c} />
                        </p>
                    ))}
                </Example>
            </Block>
            <Block title="Signatur" note="Im Fuss bzw. unter dem Logo, standardmässig eingeschaltet, abschaltbar durch den Admin einer Instanz (M4).">
                <Example label="Signatur">
                    <p className="text-sm text-muted-foreground">
                        Developed by <BrandWordmark brand="developer" />
                    </p>
                </Example>
            </Block>
            <Block title="Schreibweisen">
                <Table head={['Marke', 'So', 'Nicht']} caption="Schreibweisen">
                    {SPELLINGS.map(([a, b, c]) => (
                        <tr key={a}>
                            <td className="font-medium">{a}</td>
                            <td>{b}</td>
                            <td className="text-muted-foreground">{c}</td>
                        </tr>
                    ))}
                </Table>
            </Block>
        </div>
    );
}
