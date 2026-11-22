// Icon-Bundles je Modul (Regel KONZEPT-MARKE §6.3, Markus 22.11.2026): Module erstellen keine eigenen Icons, alle
// Icons kommen aus diesem Set. Jedes Icon liegt nur einmal im Set; das Bundle eines Moduls listet, welche Icons das
// Modul benutzt. Gemeinsam genutzte Icons stehen in mehreren Bundles und sind vorzuziehen.
// Neues Icon für ein Modul: Motiv in icons/build.py (mit Freigabe), dann hier im Bundle eintragen.
import type { EduksxIconName } from './eduksx-icons.data';

export type EduksxIconBundle = {
    /** Anzeigename */
    title: string;
    /** Repo, in dem das Bundle benutzt wird (leer: Modul noch ohne Repo) */
    repo?: string;
    icons: readonly EduksxIconName[];
};

/** Bundles nach Modulschlüssel (Modulregister) sowie Website und Prototypen als weitere Nutzer. */
export const EDUKSX_ICON_BUNDLES = {
    core: { title: 'EduKSX-Core', repo: 'EduKSX-Core', icons: ['core'] },
    ident: { title: 'EduKSX-Ident', repo: 'EduKSX-Ident', icons: ['ident'] },
    ops: { title: 'EduKSX-Ops', icons: ['ops'] },
    glossary: { title: 'EduKSX-Glossary', repo: 'EduKSX-Glossary', icons: ['glossary'] },
    codex: { title: 'EduKSX-Codex', repo: 'EduKSX-Codex', icons: ['codex'] },
    intranet: {
        title: 'EduKSX-Intranet',
        repo: 'sek-intranet',
        icons: ['intranet', 'eduksx', 'portal', 'glossary', 'ident', 'staffing', 'timetable', 'licence', 'shop', 'sign', 'services', 'connect'],
    },
    timetable: { title: 'EduKSX-Timetable', icons: ['timetable'] },
    connect: { title: 'EduKSX-Connect', repo: 'EduKSX-Connect', icons: ['connect'] },
    licence: { title: 'EduKSX-Licence', icons: ['licence'] },
    portal: { title: 'EduKSX-Portal', icons: ['portal'] },
    shop: { title: 'EduKSX-Shop', repo: 'EduKSX-Shop', icons: ['shop'] },
    sign: { title: 'EduKSX-Sign', icons: ['sign'] },
    time: { title: 'EduKSX-Time', repo: 'EduKSX-Time', icons: ['time'] },
    staffing: { title: 'EduKSX-Staffing', icons: ['staffing'] },
    flow: { title: 'EduKSX-Flow', repo: 'EduKSX-Flow', icons: ['flow'] },
    planner: { title: 'EduKSX-Planner', icons: ['planner'] },
    services: { title: 'EduKSX-Services', icons: ['services'] },
    website: {
        title: 'Website markussxch',
        repo: 'markussxch',
        icons: ['eduksx', 'glossary', 'codex', 'portal', 'licence', 'connect', 'shop', 'services'],
    },
    prototyp: { title: 'Prototypen', repo: 'EduKSX-Prototyp', icons: ['eduksx', 'flow', 'staffing', 'codex', 'sign', 'time'] },
} satisfies Record<string, EduksxIconBundle>;

/** Freigegebene Icons, die noch keinem Modul zugeordnet sind (Vorrat für künftige Module). */
export const EDUKSX_ICON_VORRAT: readonly EduksxIconName[] = [
    'websnapshot',
    'api',
    'aiconverter',
    'mcp',
    'bill',
    'ticket',
    'booking',
    'checklist',
    'absence',
];

export type EduksxIconBundleName = keyof typeof EDUKSX_ICON_BUNDLES;

/** Module bzw. Nutzer, deren Bundle das Icon enthält. */
export function bundlesOfIcon(name: EduksxIconName): EduksxIconBundleName[] {
    return (Object.keys(EDUKSX_ICON_BUNDLES) as EduksxIconBundleName[]).filter((b) =>
        (EDUKSX_ICON_BUNDLES[b].icons as readonly EduksxIconName[]).includes(name),
    );
}
