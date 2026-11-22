import { HistoryList } from '../../../../src/components/history-list';
import { Example } from '../../ui';
import { HISTORY } from './beispieldaten';
import { BausteinSeite } from './vorlage';

export function HistoryListSeite() {
    return (
        <BausteinSeite
            beispiele={
                <div className="space-y-4">
                    <Example label="HistoryList">
                        <HistoryList entries={HISTORY} fieldLabels={{ short_description: 'Kurzbeschreibung', email: 'E-Mail', title: 'Titel' }} timeZone="Europe/Zurich" />
                    </Example>
                    <Example label="HistoryList leer">
                        <HistoryList entries={[]} />
                    </Example>
                </div>
            }
            code={`
import { HistoryList } from '@eduksx/ui';

<HistoryList entries={entries} fieldLabels={{ short_description: 'Kurzbeschreibung' }} timeZone="Europe/Zurich" />
`}
            pruefen={['Personenbezogene Felder zeigen nur «geändert», nie den Wert', 'Datum TT.MM.JJJJ in Schweizer Zeit', 'Bekannt: Ansage für Bildschirmleser verbessern (#13)']}
        />
    );
}
