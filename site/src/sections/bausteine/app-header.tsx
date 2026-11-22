import { AppHeader } from '../../../../src/components/app-header';
import { Example } from '../../ui';
import { MODULES } from './beispieldaten';
import { BausteinSeite } from './vorlage';

export function AppHeaderSeite() {
    return (
        <BausteinSeite
            beispiele={
                <div className="space-y-4">
                    <Example label="AppHeader" className="p-0">
                        <AppHeader product="Glossary" homeUrl="#/app-header" modules={MODULES} currentModule="glossary" />
                    </Example>
                    <Example label="AppHeader ohne Modulwechsel" className="p-0">
                        <AppHeader homeUrl="#/app-header" />
                    </Example>
                </div>
            }
            code={`
import { AppHeader } from '@eduksx/ui';

<AppHeader product="Glossary" modules={modules} currentModule="glossary">
    {/* rechts: Suche, Ansicht, Farbschema, Person */}
</AppHeader>
`}
            pruefen={['Wortmarke ist Link zur Startseite, Fokus sichtbar', 'Module öffnen, mit Tab hinter das letzte Modul oder Shift+Tab vor den Knopf: Liste schliesst (#12)', 'Handy hoch: Wortmarke bleibt ganz sichtbar (EduKSX-Glossary nicht abgeschnitten)']}
        />
    );
}
