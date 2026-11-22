import { useState } from 'react';
import { AppHeader } from '../../../../src/components/app-header';
import { COLOR_SCHEME_LABELS, ColorSchemeToggle, resolveDark, type ColorScheme } from '../../../../src/components/color-scheme-toggle';
import { Example } from '../../ui';
import { MODULES } from './beispieldaten';
import { BausteinSeite } from './vorlage';

export function ColorSchemeToggleSeite() {
    // Nur Anzeige: Das Beispiel ändert die Testseite nicht (dafür ist die Vorschau-Leiste da).
    const [scheme, setScheme] = useState<ColorScheme>('system');
    const [inHeader, setInHeader] = useState<ColorScheme>('light');
    return (
        <BausteinSeite
            beispiele={
                <div className="space-y-4">
                    <Example label="ColorSchemeToggle">
                        <div className="flex flex-wrap items-center gap-4">
                            <ColorSchemeToggle value={scheme} onChange={setScheme} />
                            <p className="text-sm text-muted-foreground" aria-live="polite">
                                Gewählt: {COLOR_SCHEME_LABELS[scheme]}
                                {scheme === 'system' && ` (System ist gerade ${resolveDark('system') ? 'dunkel' : 'hell'})`}
                            </p>
                        </div>
                    </Example>
                    <Example label="In der Kopfzeile rechts" className="p-0">
                        <AppHeader product="Glossary" homeUrl="#/farbschema" modules={MODULES} currentModule="glossary">
                            <ColorSchemeToggle value={inHeader} onChange={setInHeader} />
                        </AppHeader>
                    </Example>
                </div>
            }
            code={`
import { ColorSchemeToggle, useColorScheme } from '@eduksx/ui';

const [scheme, setScheme] = useColorScheme();   // speichert «eduksx:farbschema», setzt .dark, Vorgabe «Wie System»

<AppHeader product="Glossary" modules={modules}>
    <ColorSchemeToggle value={scheme} onChange={setScheme} />
</AppHeader>
`}
            pruefen={[
                'Drei Symbol-Knöpfe Sonne, Mond, Sonne-Mond; Tooltip und Bildschirmleser sagen «Hell», «Dunkel», «Wie System»',
                'Gewählter Knopf ist deutlich hervorgehoben und als «gedrückt» angesagt (aria-pressed)',
                'Mit Tab erreichbar, Enter/Leertaste wählt, Fokus sichtbar',
                'Handy hoch: Umschalter passt neben Wortmarke und Modulwechsel',
            ]}
        />
    );
}
