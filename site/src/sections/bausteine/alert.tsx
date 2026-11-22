import { useState } from 'react';
import { Alert, ALERT_LABELS, type AlertVariant } from '../../../../src/components/alert';
import { Button } from '../../../../src/components/button';
import { Example } from '../../ui';
import { BausteinSeite } from './vorlage';

const TEXT: Record<AlertVariant, string> = {
    info: 'Das Schuljahr beginnt am 17. August.',
    success: 'Der Begriff wurde gespeichert.',
    warning: 'Zwei Begriffe haben dieselbe Abkürzung.',
    destructive: 'Speichern fehlgeschlagen. Bitte später nochmals versuchen.',
};

export function AlertSeite() {
    const [shown, setShown] = useState(true);
    return (
        <BausteinSeite
            beispiele={
                <Example label="Hinweisboxen" className="space-y-3">
                    {(Object.keys(TEXT) as AlertVariant[]).map((v) => (
                        <Alert key={v} variant={v} title={ALERT_LABELS[v]}>
                            {TEXT[v]}
                        </Alert>
                    ))}
                    {shown ? (
                        <Alert variant="info" title="Neu" action={<Button size="sm" variant="outline">Ansehen</Button>} onDismiss={() => setShown(false)}>
                            Mit Aktion und Schliessen-Knopf.
                        </Alert>
                    ) : (
                        <Button variant="link" onClick={() => setShown(true)}>
                            Hinweis wieder zeigen
                        </Button>
                    )}
                </Example>
            }
            code={`
import { Alert } from '@eduksx/ui';

<Alert variant="success" title="Erfolg">Der Begriff wurde gespeichert.</Alert>
<Alert variant="destructive" title="Fehler" announce>…</Alert>   // announce: sofort vorlesen
`}
            pruefen={['Jede Art mit Symbol und Text, nie nur Farbe', 'Text auf der getönten Fläche mind. 4,5 : 1', 'Schliessen-Knopf hat einen Namen für Bildschirmleser']}
        />
    );
}
