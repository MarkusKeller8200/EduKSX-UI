import type { ReactNode } from 'react';
import { BrandWordmark, type BrandKey } from './brand-wordmark';
import { ModuleSwitcher, type ModuleLink } from './module-switcher';

export type AppHeaderProps = {
    /** Produktzusatz der Wortmarke, z. B. «Glossary». */
    product?: string;
    brand?: BrandKey;
    homeUrl?: string;
    /** Logo der Organisation (zusätzlich zur Wortmarke, KONZEPT-DESIGN 5). */
    organizationLogo?: { src: string; alt: string };
    modules?: ModuleLink[];
    currentModule?: string;
    /** Rechter Bereich: Suche, Ansicht, Farbschema, Person … */
    children?: ReactNode;
};

/** Gemeinsame Kopfzeile aller Module (Plattform S7, KONZEPT-DESIGN 6). */
export function AppHeader({
    product,
    brand = 'education',
    homeUrl = '/',
    organizationLogo,
    modules = [],
    currentModule,
    children,
}: AppHeaderProps) {
    return (
        <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border bg-background px-4 py-2 text-foreground">
            <a href={homeUrl} className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-ring">
                <BrandWordmark brand={brand} suffix={product} className="text-lg" />
            </a>
            {organizationLogo && <img src={organizationLogo.src} alt={organizationLogo.alt} className="h-8 w-auto" />}
            <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
                {children}
                <ModuleSwitcher modules={modules} current={currentModule} />
            </div>
        </header>
    );
}
