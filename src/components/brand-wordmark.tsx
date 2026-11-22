// Übernommen aus EduKSX-Glossary resources/js/components/brand-wordmark.tsx (Autor: Markus Keller; hier unter MIT).
import { cn } from '../lib/cn';

/**
 * Wortmarke nach CI MarKusSXCH (CI-Manual v1.0, Abschnitte 3, 4 und 10; Markenfortschreibung v1.1).
 * Segmente in fester Reihenfolge, Farben nur über Tokens, Gesamtname für Bildschirmleser, Segmente dekorativ.
 */
type Tone = 'violet' | 'orange' | 'blue' | 'neutral';
type Segment = { text: string; tone: Tone };

const WORDMARKS = {
    developer: [
        { text: 'M', tone: 'violet' },
        { text: 'ar', tone: 'neutral' },
        { text: 'K', tone: 'orange' },
        { text: 'us', tone: 'neutral' },
        { text: 'SXCH', tone: 'blue' },
    ],
    education: [
        { text: 'E', tone: 'violet' },
        { text: 'du', tone: 'neutral' },
        { text: 'K', tone: 'orange' },
        { text: 'SX', tone: 'blue' },
    ],
} satisfies Record<string, Segment[]>;

const COLOR: Record<Tone, string> = {
    violet: 'text-brand-violet',
    orange: 'text-brand-orange',
    blue: 'text-brand-blue',
    neutral: 'text-brand-neutral',
};

export type BrandKey = keyof typeof WORDMARKS;

export type BrandWordmarkProps = {
    brand?: BrandKey;
    /** Produktzusatz, neutral nach Bindestrich, z. B. «Glossary» → «EduKSX-Glossary» */
    suffix?: string;
    className?: string;
};

export function BrandWordmark({ brand = 'education', suffix, className }: BrandWordmarkProps) {
    const segments: Segment[] = [
        ...WORDMARKS[brand],
        ...(suffix ? [{ text: `-${suffix}`, tone: 'neutral' as const }] : []),
    ];
    const name = segments.map((s) => s.text).join('');
    return (
        <span role="img" aria-label={name} translate="no" className={cn('font-semibold whitespace-nowrap', className)}>
            {segments.map((s, i) => (
                <span key={i} aria-hidden="true" data-tone={s.tone} className={COLOR[s.tone]}>
                    {s.text}
                </span>
            ))}
        </span>
    );
}
