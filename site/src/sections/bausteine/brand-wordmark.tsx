import { BrandWordmark } from '../../../../src/components/brand-wordmark';
import { Example } from '../../ui';
import { BausteinSeite } from './vorlage';

export function BrandWordmarkSeite() {
    return (
        <BausteinSeite
            beispiele={
                <Example label="BrandWordmark" className="flex flex-wrap items-baseline gap-x-8 gap-y-3 text-2xl">
                    <BrandWordmark />
                    <BrandWordmark suffix="Codex" />
                    <BrandWordmark brand="developer" />
                </Example>
            }
            code={`
import { BrandWordmark } from '@eduksx/ui';

<BrandWordmark />                         // EduKSX
<BrandWordmark suffix="Glossary" />       // EduKSX-Glossary
<BrandWordmark brand="developer" />       // MarKusSXCH
`}
            pruefen={['Bildschirmleser liest den ganzen Namen einmal (role="img", aria-label)', 'Browser-Übersetzer ändert den Namen nicht (translate="no")', 'Bricht nie um, auch nicht auf dem Handy']}
        />
    );
}
