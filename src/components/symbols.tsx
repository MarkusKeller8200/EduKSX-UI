// Bediensymbole, die die Bausteine selbst brauchen. Pfade kopiert aus Lucide (https://lucide.dev); Hinweis auch in
// docs/third-party.json. Keine Abhängigkeit von lucide-react: Module nutzen für eigene Symbole weiterhin Lucide
// (KONZEPT-MARKE 6.2), hier stehen nur die wenigen festen Symbole der Bausteine.
/*!
 * ISC License – Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
 * All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby
 * granted, provided that the above copyright notice and this permission notice appear in all copies.
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN
 * AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
import type { ReactNode, SVGProps } from 'react';

type SymbolProps = Omit<SVGProps<SVGSVGElement>, 'children'>;

function make(paths: ReactNode) {
    return function Symbol({ className, ...rest }: SymbolProps) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
                className={className ?? 'size-4'}
                {...rest}
            >
                {paths}
            </svg>
        );
    };
}

/** Lucide `X` – Schliessen */
export const XSymbol = make(
    <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </>,
);
/** Lucide `ChevronDown` – Auswahlfeld */
export const ChevronDownSymbol = make(<path d="m6 9 6 6 6-6" />);
/** Lucide `ChevronsUpDown` – Spalte nicht sortiert */
export const ChevronsUpDownSymbol = make(
    <>
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </>,
);
/** Lucide `ArrowUp` – aufsteigend sortiert */
export const ArrowUpSymbol = make(
    <>
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
    </>,
);
/** Lucide `ArrowDown` – absteigend sortiert */
export const ArrowDownSymbol = make(
    <>
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
    </>,
);
/** Lucide `Info` – Hinweis */
export const InfoSymbol = make(
    <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
    </>,
);
/** Lucide `CircleCheck` – Erfolg */
export const SuccessSymbol = make(
    <>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
    </>,
);
/** Lucide `TriangleAlert` – Warnung */
export const WarningSymbol = make(
    <>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
    </>,
);
/** Lucide `CircleAlert` – Fehler */
export const ErrorSymbol = make(
    <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
    </>,
);
/** Lucide `LoaderCircle` – lädt (dreht sich; Ladeanzeigen sind von WCAG 2.2.2 ausgenommen) */
export const SpinnerSymbol = make(<path d="M21 12a9 9 0 1 1-6.219-8.56" />);

export const SunSymbol = make(
    <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </>,
);

export const MoonSymbol = make(
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />,
);

export const SunMoonSymbol = make(
    <>
        <path d="M12 2v2" />
        <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" />
        <path d="M16 12a4 4 0 0 0-4-4" />
        <path d="m19 5-1.256 1.256" />
        <path d="M20 12h2" />
    </>,
);
