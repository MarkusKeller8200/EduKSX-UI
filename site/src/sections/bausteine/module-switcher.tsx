import { ModuleSwitcher } from '../../../../src/components/module-switcher';
import { Example } from '../../ui';
import { MODULES } from './beispieldaten';
import { BausteinSeite } from './vorlage';

export function ModuleSwitcherSeite() {
    return (
        <BausteinSeite
            beispiele={
                <Example label="ModuleSwitcher" className="flex min-h-80 justify-end">
                    <ModuleSwitcher modules={MODULES} current="codex" />
                </Example>
            }
            code={`
import { ModuleSwitcher } from '@eduksx/ui';

<ModuleSwitcher modules={modules} current="codex" />   // modules aus GET /api/v1/me/modules
`}
            pruefen={['Enter/Leertaste öffnet, Escape schliesst und setzt den Fokus zurück', 'Aktuelles Modul ist hervorgehoben und als aria-current markiert', 'Bekannt: Liste bleibt bei Fokusverlust offen (#12)']}
        />
    );
}
