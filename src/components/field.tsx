import {
    createContext,
    useContext,
    useId,
    useLayoutEffect,
    useRef,
    type InputHTMLAttributes,
    type LabelHTMLAttributes,
    type ReactNode,
    type SelectHTMLAttributes,
    type TextareaHTMLAttributes,
} from 'react';
import { cn } from '../lib/cn';
import { ChevronDownSymbol, ErrorSymbol } from './symbols';

/*
 * Baustein 2.3 «Formularfelder» und 2.5 «Dropdown» (einfaches Auswahlfeld des Browsers).
 * `Field` verbindet Beschriftung, Hinweis und Fehler mit dem Feld (id, aria-describedby, aria-invalid),
 * damit Bildschirmleser alles zusammen vorlesen. Felder lassen sich auch ohne `Field` nutzen.
 */

type FieldContextValue = { id: string; hintId?: string; errorId?: string; invalid: boolean; required: boolean; disabled: boolean };
const FieldContext = createContext<FieldContextValue | null>(null);

/** Rahmen 3:1 zum Hintergrund (`input`, WCAG 1.4.11); Zustände Normal, Hover, Fokus, Fehler, Gesperrt, Nur lesen. */
const CONTROL =
    'w-full min-w-0 rounded-md border border-input bg-background text-base text-foreground shadow-xs transition-colors ' +
    'placeholder:text-muted-foreground hover:border-muted-foreground ' +
    'focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring ' +
    'aria-invalid:border-destructive aria-invalid:hover:border-destructive ' +
    'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 read-only:bg-muted md:text-sm';

export const FIELD_CONTROL_CLASSES = CONTROL;

export type FieldProps = {
    label: ReactNode;
    /** Hinweis unter der Beschriftung, z. B. Format oder Zweck */
    hint?: ReactNode;
    /** Fehlermeldung; macht das Feld `aria-invalid`. Sagt, was falsch ist und wie es richtig geht. */
    error?: ReactNode;
    required?: boolean;
    disabled?: boolean;
    /** eigene id des Felds (sonst automatisch) */
    id?: string;
    className?: string;
    children: ReactNode;
};

/** Feld mit Beschriftung, Hinweis und Fehler (Field). Pflichtfelder: `*` sichtbar, `required` am Feld. */
export function Field({ label, hint, error, required = false, disabled = false, id, className, children }: FieldProps) {
    const auto = useId();
    const fieldId = id ?? auto;
    const ctx: FieldContextValue = {
        id: fieldId,
        hintId: hint ? `${fieldId}-hint` : undefined,
        errorId: error ? `${fieldId}-error` : undefined,
        invalid: Boolean(error),
        required,
        disabled,
    };
    return (
        <FieldContext.Provider value={ctx}>
            <div data-slot="field" data-invalid={ctx.invalid || undefined} data-disabled={disabled || undefined} className={cn('grid gap-1.5', className)}>
                <Label htmlFor={fieldId} required={required}>
                    {label}
                </Label>
                {hint && <FieldHint id={ctx.hintId}>{hint}</FieldHint>}
                {children}
                {error && <FieldError id={ctx.errorId}>{error}</FieldError>}
            </div>
        </FieldContext.Provider>
    );
}

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean };

/** Beschriftung; `required` zeigt `*` (für Bildschirmleser genügt `required` am Feld). */
export function Label({ required, className, children, ...rest }: LabelProps) {
    return (
        <label data-slot="label" className={cn('text-sm font-medium leading-normal text-foreground', className)} {...rest}>
            {children}
            {required && (
                <span aria-hidden="true" className="ml-0.5 text-destructive-foreground">
                    *
                </span>
            )}
        </label>
    );
}

export function FieldHint({ className, ...rest }: { id?: string; className?: string; children: ReactNode }) {
    return <p data-slot="field-hint" className={cn('text-sm text-muted-foreground', className)} {...rest} />;
}

/** Fehlermeldung immer mit Symbol und Text (KONZEPT-MARKE 6.2), nie nur rote Farbe. */
export function FieldError({ className, children, ...rest }: { id?: string; className?: string; children: ReactNode }) {
    return (
        <p data-slot="field-error" className={cn('flex items-start gap-1.5 text-sm font-medium text-destructive-foreground', className)} {...rest}>
            <ErrorSymbol className="mt-0.5 size-4 shrink-0" />
            <span>
                <span className="sr-only">Fehler:</span> {children}
            </span>
        </p>
    );
}

/** Verbindet ein Feld mit `Field` (falls vorhanden); eigene Angaben haben Vorrang. */
function useFieldControl<P extends { id?: string; required?: boolean; disabled?: boolean; 'aria-describedby'?: string; 'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling' }>(props: P): P {
    const ctx = useContext(FieldContext);
    if (!ctx) return props;
    const describedBy = [props['aria-describedby'], ctx.hintId, ctx.errorId].filter(Boolean).join(' ') || undefined;
    return {
        ...props,
        id: props.id ?? ctx.id,
        required: props.required ?? (ctx.required || undefined),
        disabled: props.disabled ?? (ctx.disabled || undefined),
        'aria-describedby': describedBy,
        'aria-invalid': props['aria-invalid'] ?? (ctx.invalid || undefined),
        ...(ctx.errorId ? { 'aria-errormessage': ctx.errorId } : {}),
    };
}

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/** Textfeld, Zahl, E-Mail, Datum … (natives `input`). */
export function Input({ className, type = 'text', ...props }: InputProps) {
    const p = useFieldControl(props);
    return <input type={type} data-slot="input" className={cn(CONTROL, 'h-9 px-3 py-1', className)} {...p} />;
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Textbereich, in der Höhe verstellbar. */
export function Textarea({ className, rows = 3, ...props }: TextareaProps) {
    const p = useFieldControl(props);
    return <textarea rows={rows} data-slot="textarea" className={cn(CONTROL, 'min-h-16 resize-y px-3 py-2', className)} {...p} />;
}

export type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    /** Erste, leere Wahl ohne Vorauswahl, z. B. «Bitte wählen» */
    placeholder?: string;
};

/** Auswahlfeld des Browsers (Native Select): auf Handy und mit Bildschirmlesern am zuverlässigsten. */
export function NativeSelect({ className, placeholder, children, ...props }: NativeSelectProps) {
    const p = useFieldControl(props);
    return (
        <span data-slot="native-select" className="relative block">
            <select className={cn(CONTROL, 'h-9 cursor-pointer appearance-none py-1 pr-9 pl-3', className)} {...p}>
                {placeholder !== undefined && (
                    <option value="" disabled={p.required ? true : undefined}>
                        {placeholder}
                    </option>
                )}
                {children}
            </select>
            <ChevronDownSymbol className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
        </span>
    );
}

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    /** Teilweise gewählt (z. B. «Alle» in einer Tabelle) */
    indeterminate?: boolean;
};

/** Kontrollkästchen mit Beschriftung rechts; ganze Zeile anklickbar. Für sofort wirksame Einstellungen den Schalter verwenden. */
export function Checkbox({ label, hint, error, indeterminate = false, id, className, disabled, 'aria-describedby': describedBy, 'aria-invalid': ariaInvalid, ...rest }: CheckboxProps) {
    const auto = useId();
    const boxId = id ?? auto;
    const ref = useRef<HTMLInputElement>(null);
    useLayoutEffect(() => {
        if (ref.current) ref.current.indeterminate = indeterminate;
    }, [indeterminate]);
    const hintId = hint ? `${boxId}-hint` : undefined;
    const errorId = error ? `${boxId}-error` : undefined;
    return (
        <div data-slot="checkbox" data-disabled={disabled || undefined} className={cn('grid grid-cols-[auto_1fr] gap-x-2 gap-y-1', className)}>
            <input
                ref={ref}
                type="checkbox"
                id={boxId}
                disabled={disabled}
                aria-describedby={[describedBy, hintId, errorId].filter(Boolean).join(' ') || undefined}
                aria-invalid={error ? true : ariaInvalid}
                className="peer mt-0.5 size-4 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60"
                {...rest}
            />
            <label htmlFor={boxId} className="cursor-pointer text-sm leading-normal text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
                {label}
            </label>
            {hint && (
                <FieldHint id={hintId} className="col-start-2">
                    {hint}
                </FieldHint>
            )}
            {error && (
                <FieldError id={errorId} className="col-start-2">
                    {error}
                </FieldError>
            )}
        </div>
    );
}
