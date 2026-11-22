import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';
import { IconButton } from './button';
import { ErrorSymbol, InfoSymbol, SuccessSymbol, WarningSymbol, XSymbol } from './symbols';

/*
 * Baustein 4.1 «Meldungen», Teil «Hinweisbox». Status immer mit Symbol und Text, nie nur Farbe
 * (KONZEPT-MARKE 5.2, 6.2); Statusfarben werden nie durch Markenfarben ersetzt.
 */

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive';

const VARIANTS: Record<AlertVariant, { box: string; title: string; Symbol: typeof InfoSymbol; label: string }> = {
    info: { box: 'border-info bg-info-soft', title: 'text-info', Symbol: InfoSymbol, label: 'Hinweis' },
    success: { box: 'border-success bg-success-soft', title: 'text-success', Symbol: SuccessSymbol, label: 'Erfolg' },
    warning: { box: 'border-warning bg-warning-soft', title: 'text-warning', Symbol: WarningSymbol, label: 'Warnung' },
    destructive: { box: 'border-destructive-foreground bg-destructive-soft', title: 'text-destructive-foreground', Symbol: ErrorSymbol, label: 'Fehler' },
};

export const ALERT_LABELS: Record<AlertVariant, string> = {
    info: VARIANTS.info.label,
    success: VARIANTS.success.label,
    warning: VARIANTS.warning.label,
    destructive: VARIANTS.destructive.label,
};

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    variant?: AlertVariant;
    title?: ReactNode;
    /**
     * Für Hinweise, die erst nach einer Aktion erscheinen: `true` sagt sie an (Fehler und Warnung sofort als
     * `alert`, sonst höflich als `status`). Hinweise, die mit der Seite geladen werden, nicht ansagen.
     */
    announce?: boolean;
    /** Knopf oder Link zur Behebung, z. B. «Erneut versuchen» */
    action?: ReactNode;
    /** Mit `onDismiss` erscheint «Schliessen» (Symbol-Knopf) */
    onDismiss?: () => void;
    dismissLabel?: string;
};

/** Hinweisbox (Info, Erfolg, Warnung, Fehler). Für Bildschirmleser beginnt sie mit der Art («Warnung:»). */
export function Alert({ variant = 'info', title, announce = false, action, onDismiss, dismissLabel = 'Hinweis schliessen', className, children, ...rest }: AlertProps) {
    const v = VARIANTS[variant];
    const role = announce ? (variant === 'destructive' || variant === 'warning' ? 'alert' : 'status') : undefined;
    return (
        <div
            data-slot="alert"
            data-variant={variant}
            role={role}
            className={cn('flex items-start gap-3 rounded-lg border border-l-4 p-4 text-sm text-foreground', v.box, className)}
            {...rest}
        >
            <v.Symbol className={cn('mt-0.5 size-5 shrink-0', v.title)} />
            <div className="grid min-w-0 flex-1 gap-1">
                {title ? (
                    <p className={cn('font-semibold', v.title)}>
                        <span className="sr-only">{v.label}:</span> {title}
                    </p>
                ) : null}
                {(children || !title) && (
                    <div className="leading-normal">
                        {!title && <span className="sr-only">{v.label}:</span>} {children}
                    </div>
                )}
                {action && <div className="mt-2 flex flex-wrap gap-2">{action}</div>}
            </div>
            {onDismiss && <IconButton label={dismissLabel} icon={<XSymbol />} size="icon-sm" className="-m-1.5" onClick={onDismiss} />}
        </div>
    );
}
