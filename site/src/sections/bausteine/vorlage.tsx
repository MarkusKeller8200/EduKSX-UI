import type { ReactNode } from 'react';
import { Block } from '../../ui';

/**
 * Gerüst einer Baustein-Seite (nach dem GUI-Tester des INTRANET): Beispiele, Verwendung im Code, Prüfliste.
 * Neue Bausteine (#27) nutzen dieses Gerüst; Beispiele immer in <Example>, damit hell/dunkel und Vergleich greifen.
 */
export function BausteinSeite({ beispiele, code, pruefen }: { beispiele: ReactNode; code: string; pruefen: string[] }) {
    return (
        <div className="space-y-8">
            <Block title="Beispiele">{beispiele}</Block>
            <Block title="Verwendung">
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm">
                    <code>{code.trim()}</code>
                </pre>
            </Block>
            <Block title="Zum Prüfen" note="In allen Ansichten der Vorschau-Leiste, hell und dunkel, nur mit Tastatur.">
                <ul className="max-w-prose list-disc space-y-1 pl-5">
                    {[...pruefen, 'Hell und dunkel lesbar, Farben nur über Tokens', 'Handy und Tablet hoch/quer: nichts läuft über'].map((p) => (
                        <li key={p}>{p}</li>
                    ))}
                </ul>
            </Block>
        </div>
    );
}
