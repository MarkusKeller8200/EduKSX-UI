import { Checkbox, Field, Input, NativeSelect, Textarea } from '../../../../src/components/field';
import { Example } from '../../ui';
import { BausteinSeite } from './vorlage';

export function FieldSeite() {
    return (
        <BausteinSeite
            beispiele={
                <div className="space-y-4">
                    <Example label="Formularfelder" className="grid max-w-xl gap-4">
                        <Field label="Begriff" hint="So, wie er im Alltag verwendet wird." required>
                            <Input placeholder="z. B. Absenz" />
                        </Field>
                        <Field label="Kurzbeschreibung" error="Bitte höchstens 200 Zeichen.">
                            <Textarea defaultValue="Eine Absenz ist das Fernbleiben vom Unterricht, entschuldigt oder unentschuldigt, mit oder ohne Gesuch." />
                        </Field>
                        <Field label="Bereich">
                            <NativeSelect placeholder="Bitte wählen" defaultValue="">
                                <option value="schule">Schule</option>
                                <option value="verwaltung">Verwaltung</option>
                            </NativeSelect>
                        </Field>
                        <Field label="Gesperrt" disabled>
                            <Input defaultValue="Nur lesbar" />
                        </Field>
                    </Example>
                    <Example label="Checkboxen" className="grid max-w-xl gap-3">
                        <Checkbox label="Im Glossar veröffentlichen" defaultChecked />
                        <Checkbox label="Alle Bereiche" indeterminate hint="Einige Bereiche sind gewählt." />
                        <Checkbox label="Bedingungen gelesen" error="Bitte bestätigen." />
                        <Checkbox label="Gesperrt" disabled />
                    </Example>
                </div>
            }
            code={`
import { Field, Input, Textarea, NativeSelect, Checkbox } from '@eduksx/ui';

<Field label="Begriff" hint="So, wie er im Alltag verwendet wird." required>
    <Input />                                  // id, aria-describedby und aria-invalid setzt Field
</Field>
<Field label="Kurzbeschreibung" error="Bitte höchstens 200 Zeichen."><Textarea /></Field>
<Checkbox label="Im Glossar veröffentlichen" />
`}
            pruefen={[
                'Beschriftung über dem Feld, Klick darauf setzt den Fokus ins Feld',
                'Fehler mit Symbol und Text, vom Bildschirmleser zum Feld vorgelesen',
                'Rahmen der Felder mind. 3 : 1 (WCAG 1.4.11)',
            ]}
        />
    );
}
