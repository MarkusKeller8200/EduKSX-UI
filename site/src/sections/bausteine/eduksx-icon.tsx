import { EduksxIcon } from '../../../../src/components/eduksx-icon';
import { Example } from '../../ui';
import { BausteinSeite } from './vorlage';

export function EduksxIconSeite() {
    return (
        <BausteinSeite
            beispiele={
                <Example label="EduksxIcon" className="flex flex-wrap items-center gap-6">
                    <EduksxIcon name="glossary" title="Glossary, farbig" />
                    <EduksxIcon name="codex" variant="mono" title="Codex, einfarbig" />
                    <span className="inline-flex items-center gap-2 text-sm">
                        <EduksxIcon name="timetable" variant="mono" size={16} />
                        Stundenplan (Menüeintrag, 16 px)
                    </span>
                    <EduksxIcon name="eduksx" variant="tile" size={64} title="EduKSX, App-Kachel" />
                </Example>
            }
            code={`
import { EduksxIcon } from '@eduksx/ui';

<EduksxIcon name="glossary" />                          // farbig, 24 px, dekorativ
<EduksxIcon name="codex" variant="mono" />              // einfarbig in Textfarbe
<EduksxIcon name="eduksx" variant="tile" size={64} />   // App-Kachel
<EduksxIcon name="ident" title="EduKSX-Ident" />        // beschriftet
`}
            pruefen={['Ohne title dekorativ (aria-hidden), mit title vorgelesen', 'Variante mono übernimmt die Textfarbe']}
        />
    );
}
