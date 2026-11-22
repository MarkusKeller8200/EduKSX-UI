import { Bold, Download, Italic, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button, IconButton, BUTTON_VARIANTS, buttonClasses, type ButtonVariant } from '../../../../src/components/button';
import { Example } from '../../ui';
import { BausteinSeite } from './vorlage';

const LABELS: Record<ButtonVariant, string> = {
    default: 'Speichern',
    secondary: 'Entwurf',
    outline: 'Abbrechen',
    ghost: 'Bearbeiten',
    destructive: 'Löschen',
    link: 'Mehr erfahren',
};

export function ButtonSeite() {
    const [bold, setBold] = useState(true);
    const [italic, setItalic] = useState(false);
    return (
        <BausteinSeite
            beispiele={
                <div className="space-y-4">
                    <Example label="Varianten" className="flex flex-wrap items-center gap-3">
                        {(Object.keys(BUTTON_VARIANTS) as ButtonVariant[]).map((v) => (
                            <Button key={v} variant={v}>
                                {LABELS[v]}
                            </Button>
                        ))}
                    </Example>
                    <Example label="Grössen und Zustände" className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <Button size="sm">Klein</Button>
                            <Button>Normal</Button>
                            <Button size="lg">Gross</Button>
                            <Button icon={<Plus aria-hidden="true" />}>Neuer Begriff</Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button disabled>Gesperrt</Button>
                            <Button loading>Speichert</Button>
                            <Button variant="destructive" icon={<Trash2 aria-hidden="true" />}>
                                Endgültig löschen
                            </Button>
                            <a href="#/button" className={buttonClasses({ variant: 'outline' })}>
                                Link als Knopf
                            </a>
                        </div>
                    </Example>
                    <Example label="Symbol-Knöpfe" className="flex flex-wrap items-center gap-2">
                        <IconButton label="Herunterladen" icon={<Download aria-hidden="true" />} />
                        <IconButton label="Fett" icon={<Bold aria-hidden="true" />} pressed={bold} onClick={() => setBold((b) => !b)} />
                        <IconButton label="Kursiv" icon={<Italic aria-hidden="true" />} pressed={italic} onClick={() => setItalic((b) => !b)} />
                        <IconButton label="Löschen" variant="destructive" icon={<Trash2 aria-hidden="true" />} />
                    </Example>
                </div>
            }
            code={`
import { Button, IconButton, buttonClasses } from '@eduksx/ui';

<Button>Speichern</Button>                                   // Hauptknopf, eine Hauptaktion je Bereich
<Button variant="outline">Abbrechen</Button>
<Button variant="destructive" icon={<Trash2 />}>Löschen</Button>
<Button loading>Speichert</Button>                           // bleibt fokussierbar, löst nichts aus
<IconButton label="Herunterladen" icon={<Download />} />     // label = aria-label und Tooltip
<a className={buttonClasses({ variant: 'outline' })}>…</a>   // Link, der wie ein Knopf aussieht
`}
            pruefen={[
                'Hover, Fokusring, Gedrückt, Gesperrt und Lädt unterscheidbar, Schrift bleibt lesbar',
                'Symbol-Knopf: Tooltip beim Darüberfahren und beim Fokus, Esc schliesst ihn',
                'Umschalter (Fett, Kursiv) zeigen den Zustand nicht nur über Farbe',
            ]}
        />
    );
}
