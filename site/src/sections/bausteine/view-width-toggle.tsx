import { useState } from 'react';
import { AppHeader } from '../../../../src/components/app-header';
import { ColorSchemeToggle, type ColorScheme } from '../../../../src/components/color-scheme-toggle';
import { FullscreenButton, VIEW_WIDTH_CLASSES, VIEW_WIDTH_LABELS, ViewWidthToggle, type ViewWidth } from '../../../../src/components/view-width-toggle';
import { cn } from '../../../../src/lib/cn';
import { Example } from '../../ui';
import { MODULES } from './beispieldaten';
import { BausteinSeite } from './vorlage';

export function ViewWidthToggleSeite() {
    // Nur Anzeige: Das Beispiel ändert die Testseite nicht (dafür ist die Vorschau-Leiste da).
    const [view, setView] = useState<ViewWidth>('optimized');
    const [scheme, setScheme] = useState<ColorScheme>('system');
    return (
        <BausteinSeite
            beispiele={
                <div className="space-y-4">
                    <Example label="ViewWidthToggle und FullscreenButton">
                        <div className="flex flex-wrap items-center gap-2">
                            <ViewWidthToggle value={view} onChange={setView} />
                            <FullscreenButton />
                        </div>
                        <div className="mt-4 rounded-md border border-dashed border-border p-2">
                            <div className={cn('mx-auto rounded-sm bg-muted p-3 text-center text-sm', VIEW_WIDTH_CLASSES[view])} aria-live="polite">
                                Seitenbereich: {VIEW_WIDTH_LABELS[view]} (<code>{VIEW_WIDTH_CLASSES[view]}</code>)
                            </div>
                        </div>
                    </Example>
                    <Example label="Kopfzeile rechts: Ansicht, Farbschema, Modulwechsel" className="p-0">
                        <AppHeader product="Glossary" homeUrl="#/ansicht" modules={MODULES} currentModule="glossary">
                            <div className="hidden desk:block">
                                <ViewWidthToggle value={view} onChange={setView} options={['optimized', 'wide', 'full']} />
                            </div>
                            <ColorSchemeToggle value={scheme} onChange={setScheme} />
                        </AppHeader>
                    </Example>
                </div>
            }
            code={`
import { FullscreenButton, VIEW_WIDTH_CLASSES, ViewWidthToggle, useViewWidth } from '@eduksx/ui';

const [view, setView] = useViewWidth();   // speichert «eduksx:ansicht», Vorgabe «Darstellungsoptimiert»

<ViewWidthToggle value={view} onChange={setView} />
<FullscreenButton />
<main className={cn('mx-auto', VIEW_WIDTH_CLASSES[view])}>…</main>
`}
            pruefen={[
                'Vier Symbol-Knöpfe Handy, Laptop, Pfeil, Maximieren; Tooltip und Bildschirmleser sagen die Ansicht',
                'Seitenbereich wird 384 px, 1152 px, 1536 px bzw. ganz breit',
                'Vollbild startet, Knopf heisst danach «Vollbild beenden», Escape beendet',
                'In der Kopfzeile: auf dem Handy ist die Ansicht ausgeblendet (desk:), Farbschema bleibt',
            ]}
        />
    );
}
