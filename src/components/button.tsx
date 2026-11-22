import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cn } from '../lib/cn';
import { SpinnerSymbol } from './symbols';
import { Tooltip } from './tooltip';

/**
 * Varianten (Namen wie shadcn/ui, damit der Umstieg aus INTRANET und Glossary nur den Import ändert):
 * `default` Hauptknopf · `secondary` Nebenknopf · `outline` Umriss · `ghost` Text · `destructive` Gefahr · `link`.
 */
export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon' | 'icon-sm';

/**
 * Zustände Normal, Hover, Fokus, Gedrückt, Deaktiviert (KONZEPT-MARKE 5.4) – nur über Tokens.
 * Hover/Gedrückt mischen die Fläche so, dass der Schriftkontrast steigt oder gleich bleibt (Test `buttons.test`).
 */
const BASE =
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ' +
    'transition-colors select-none ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ' +
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ' +
    'aria-disabled:cursor-not-allowed aria-disabled:opacity-60 ' +
    '[&_svg]:pointer-events-none [&_svg]:shrink-0';

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
    default:
        'bg-primary text-primary-foreground shadow-xs hover:bg-[color-mix(in_srgb,var(--primary)_85%,white)] active:bg-[color-mix(in_srgb,var(--primary)_90%,black)] aria-pressed:ring-2 aria-pressed:ring-foreground',
    secondary:
        'bg-secondary text-secondary-foreground shadow-xs hover:bg-[color-mix(in_srgb,var(--secondary)_92%,var(--secondary-foreground))] active:bg-[color-mix(in_srgb,var(--secondary)_85%,var(--secondary-foreground))]',
    outline:
        'border border-input bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground active:bg-[color-mix(in_srgb,var(--accent)_85%,var(--accent-foreground))] aria-pressed:border-ring aria-pressed:bg-accent aria-pressed:text-accent-foreground',
    ghost:
        'text-foreground hover:bg-accent hover:text-accent-foreground active:bg-[color-mix(in_srgb,var(--accent)_85%,var(--accent-foreground))] aria-pressed:bg-accent aria-pressed:text-accent-foreground',
    destructive:
        'bg-destructive text-destructive-contrast shadow-xs hover:bg-[color-mix(in_srgb,var(--destructive)_85%,black)] active:bg-[color-mix(in_srgb,var(--destructive)_75%,black)]',
    link: 'h-auto px-0 text-link underline underline-offset-4 hover:decoration-2 active:opacity-80',
};

export const BUTTON_SIZES: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 [&_svg:not([class*=size-])]:size-4',
    default: 'h-9 px-4 [&_svg:not([class*=size-])]:size-4',
    lg: 'h-10 px-6 text-base [&_svg:not([class*=size-])]:size-5',
    icon: 'size-9 [&_svg:not([class*=size-])]:size-4',
    'icon-sm': 'size-8 [&_svg:not([class*=size-])]:size-4',
};

/** Klassen eines Knopfs, z. B. für einen Link, der wie ein Knopf aussieht (`<a className={buttonClasses()}>`). */
export function buttonClasses({ variant = 'default', size = 'default', className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
    return cn(BASE, BUTTON_VARIANTS[variant], variant === 'link' ? undefined : BUTTON_SIZES[size], className);
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Lädt: Knopf bleibt fokussierbar, ist aber gesperrt (`aria-disabled`, `aria-busy`), mit Ladeanzeige. */
    loading?: boolean;
    /** Symbol vor dem Text (z. B. ein Lucide-Symbol, 16 px) */
    icon?: ReactNode;
};

/** Baustein 2.1 «Button». `type="button"` ist Vorgabe, damit kein Formular versehentlich gesendet wird. */
export function Button({ variant = 'default', size = 'default', loading = false, icon, className, children, onClick, type = 'button', ...rest }: ButtonProps) {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (loading) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };
    return (
        <button
            type={type}
            data-slot="button"
            data-variant={variant}
            className={buttonClasses({ variant, size, className })}
            aria-disabled={loading || undefined}
            aria-busy={loading || undefined}
            onClick={handleClick}
            {...rest}
        >
            {loading ? <SpinnerSymbol className="size-4 animate-spin" /> : icon}
            {children}
        </button>
    );
}

export type IconButtonProps = Omit<ButtonProps, 'children' | 'icon' | 'aria-label'> & {
    /** Aktion als Text – wird `aria-label` und Tooltip (KONZEPT-MARKE 6.2) */
    label: string;
    /** Das Symbol (wird `aria-hidden`) */
    icon: ReactNode;
    /** Umschalter: `aria-pressed` */
    pressed?: boolean;
    tooltipSide?: 'top' | 'bottom';
};

/** Knopf nur mit Symbol: immer mit `aria-label` und Tooltip mit demselben Text. Vorgabe Variante `ghost`. */
export function IconButton({ label, icon, pressed, variant = 'ghost', size = 'icon', tooltipSide = 'top', loading, ...rest }: IconButtonProps) {
    return (
        <Tooltip content={label} side={tooltipSide} describe={false}>
            <Button variant={variant} size={size} aria-label={label} aria-pressed={pressed} loading={loading} {...rest}>
                {!loading && (
                    <span aria-hidden="true" className="contents">
                        {icon}
                    </span>
                )}
            </Button>
        </Tooltip>
    );
}
