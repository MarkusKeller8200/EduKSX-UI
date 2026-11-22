import { ExternalLink } from 'lucide-react';
import { Code } from '../ui';

/** Statische Prüfseiten aus docs/pruefseiten/, beim Bau mit den selbst gehosteten Schriften übernommen. */
export function Schriftgewichte() {
    const url = './pruefseiten/schriftgewichte.html';
    return (
        <div className="space-y-4">
            <p className="max-w-prose">
                Vergleich der Inter-Gewichte für Fliesstext, Titel und Rückfall, hell und dunkel. Quelle:{' '}
                <Code>docs/pruefseiten/schriftgewichte.html</Code>. Die Seite hat eine eigene Steuerleiste; die Vorschau-Leiste
                wirkt hier nicht.
            </p>
            <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-link underline-offset-2 hover:underline">
                In eigenem Fenster öffnen
                <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <iframe src={url} title="Prüfseite Schriftgewichte" className="h-[80vh] w-full rounded-lg border border-border bg-background" />
        </div>
    );
}
