import { useState } from 'react';
import { Button } from '../../../../src/components/button';
import { AlertDialog, Dialog } from '../../../../src/components/dialog';
import { Field, Input } from '../../../../src/components/field';
import { Example } from '../../ui';
import { BausteinSeite } from './vorlage';

export function DialogSeite() {
    const [open, setOpen] = useState(false);
    const [ask, setAsk] = useState(false);
    const [done, setDone] = useState('');
    return (
        <BausteinSeite
            beispiele={
                <Example label="Dialog und Rückfrage" className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" onClick={() => setOpen(true)}>
                        Dialog öffnen
                    </Button>
                    <Button variant="destructive" onClick={() => setAsk(true)}>
                        Begriff löschen …
                    </Button>
                    {done && <p className="w-full text-sm text-muted-foreground" role="status">{done}</p>}
                    <Dialog
                        open={open}
                        onOpenChange={setOpen}
                        title="Begriff umbenennen"
                        description="Der neue Name gilt in allen Modulen."
                        footer={
                            <>
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Abbrechen
                                </Button>
                                <Button onClick={() => { setOpen(false); setDone('Umbenannt (nur Beispiel).'); }}>Speichern</Button>
                            </>
                        }
                    >
                        <Field label="Neuer Name">
                            <Input defaultValue="Absenz" />
                        </Field>
                    </Dialog>
                    <AlertDialog
                        open={ask}
                        onOpenChange={setAsk}
                        title="Begriff «Absenz» löschen?"
                        description="Der Begriff verschwindet aus allen Modulen. Das lässt sich nicht rückgängig machen."
                        confirmLabel="Löschen"
                        onConfirm={() => setDone('Gelöscht (nur Beispiel).')}
                    />
                </Example>
            }
            code={`
import { Dialog, AlertDialog } from '@eduksx/ui';

<Dialog open={open} onOpenChange={setOpen} title="Begriff umbenennen" footer={…}>…</Dialog>
<AlertDialog open={ask} onOpenChange={setAsk} title="Begriff löschen?" confirmLabel="Löschen" onConfirm={remove} />
`}
            pruefen={[
                'Fokus springt in den Dialog und nach dem Schliessen zurück auf den Knopf',
                'Esc schliesst; Tab bleibt im Dialog',
                'Rückfrage: Fokus startet auf «Abbrechen», nicht auf der gefährlichen Aktion',
                'Handy quer: Dialog passt in die Höhe oder scrollt in sich',
            ]}
        />
    );
}
