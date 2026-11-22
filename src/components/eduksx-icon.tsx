// Übernommen aus markussxch src/components/site/EduksxIcon.tsx (Autor: Markus Keller; hier unter MIT).
import { createElement, type SVGProps } from 'react';
import { cn } from '../lib/cn';
import { eduksxIcons, type EduksxIconName, type EduksxIconRole } from './eduksx-icons.data';

/**
 * Freigegebenes EduKSX-Icon-Set (icons/, freigegeben 09.11. und 13.11.2026). Farben nur über die Markentokens,
 * damit die Icons mit hell und dunkel wechseln. Motive und Farben nicht von Hand ändern (neue Freigabe nötig).
 */
const ROLE_COLOR: Record<EduksxIconRole, string> = {
    base: 'var(--brand-neutral)',
    e: 'var(--brand-violet)',
    k: 'var(--brand-orange)',
    sx: 'var(--brand-blue)',
};

const STROKE = 1.75;

export type EduksxIconVariant = 'color' | 'mono' | 'tile';

export type EduksxIconProps = {
    name: EduksxIconName;
    /** `color` (Vorgabe) farbig, `mono` in Textfarbe (Menü, Knöpfe), `tile` App-Kachel */
    variant?: EduksxIconVariant;
    size?: number | string;
    /** Beschriftung für Bildschirmleser; ohne `title` ist das Icon dekorativ */
    title?: string;
} & Omit<SVGProps<SVGSVGElement>, 'children' | 'name'>;

export function EduksxIcon({ name, variant = 'color', size = 24, title, className, ...rest }: EduksxIconProps) {
    const icon = eduksxIcons[name];
    const color = (role: EduksxIconRole) => (variant === 'mono' ? 'currentColor' : ROLE_COLOR[role]);

    const shapes = icon.elements.map((el, i) =>
        createElement(el.tag, {
            key: i,
            ...el.attrs,
            ...(el.fill
                ? { fill: color(el.role) }
                : {
                      fill: 'none',
                      stroke: color(el.role),
                      strokeWidth: STROKE,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                  }),
        }),
    );

    const a11y = title
        ? { role: 'img', 'aria-label': title }
        : { 'aria-hidden': true as const, focusable: 'false' as const };

    if (variant === 'tile') {
        return (
            <svg viewBox="0 0 48 48" width={size} height={size} className={cn('shrink-0', className)} {...a11y} {...rest}>
                <rect width="48" height="48" rx="11" fill="var(--icon-tile)" />
                <rect
                    x="0.25"
                    y="0.25"
                    width="47.5"
                    height="47.5"
                    rx="10.75"
                    fill="none"
                    stroke="var(--brand-neutral)"
                    strokeOpacity="0.1"
                    strokeWidth="0.5"
                />
                <g transform="translate(9 9) scale(1.25)">{shapes}</g>
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={cn('shrink-0', className)} {...a11y} {...rest}>
            {shapes}
        </svg>
    );
}

/** Namen aller freigegebenen Icons, in der Reihenfolge des Icon-Sets */
export const EDUKSX_ICON_NAMES = Object.keys(eduksxIcons) as EduksxIconName[];
