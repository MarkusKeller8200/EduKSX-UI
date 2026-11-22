import { Info } from 'lucide-react';
import { Button } from '../../../../src/components/button';
import { Tooltip } from '../../../../src/components/tooltip';
import { Example } from '../../ui';
import { BausteinSeite } from './vorlage';

export function TooltipSeite() {
    return (
        <BausteinSeite
            beispiele={
                <Example label="Tooltip" className="flex flex-wrap items-center gap-6 py-10">
                    <Tooltip content="Speichert den Entwurf, ohne ihn zu veröffentlichen.">
                        <Button variant="secondary">Entwurf speichern</Button>
                    </Tooltip>
                    <Tooltip content="Unten angezeigt" side="bottom">
                        <Button variant="outline" icon={<Info aria-hidden="true" />}>
                            Tooltip unten
                        </Button>
                    </Tooltip>
                </Example>
            }
            code={`
import { Tooltip } from '@eduksx/ui';

<Tooltip content="Speichert den Entwurf, ohne ihn zu veröffentlichen.">
    <Button variant="secondary">Entwurf speichern</Button>
</Tooltip>
`}
            pruefen={['Erscheint beim Darüberfahren nach 300 ms und sofort beim Fokus', 'Bleibt, solange die Maus darauf liegt; Esc schliesst ihn (WCAG 1.4.13)', 'Nur Zusatzinfo: auf dem Handy (ohne Hover) fehlt nichts Nötiges']}
        />
    );
}
