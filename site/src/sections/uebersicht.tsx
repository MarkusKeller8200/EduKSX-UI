import { ENTRIES, GROUPS } from '../registry';
import { Block, Code, docUrl, IssueLinks, StatusBadge, Table } from '../ui';

export function Uebersicht() {
    return (
        <div className="space-y-10">
            <header className="space-y-3 border-b border-border pb-6">
                <h1 className="typo-h1">Testseite des EduKSX-Designsystems</h1>
                <p className="typo-lead max-w-prose text-muted-foreground">
                    Alle grafischen und UI-Entscheide zum Anschauen und Abnehmen: Tokens, Marke und Bausteine, hell und dunkel,
                    auf Handy, Tablet und Desktop.
                </p>
            </header>
            <Block title="So prüfen">
                <ol className="max-w-prose list-decimal space-y-2 pl-5">
                    <li>
                        <strong className="font-semibold">Farbschema</strong> oben: Hell, Dunkel oder wie System (Idee #17). Mit dem
                        Knopf daneben erscheinen alle Beispiele hell und dunkel nebeneinander.
                    </li>
                    <li>
                        <strong className="font-semibold">Ansicht</strong>: Handy und Tablet (je hoch und quer) zeigen die Seite in
                        Gerätegrösse, Darstellungsoptimiert, Breit und Voll die Desktop-Breiten (Idee #19). Vollbild mit dem Knopf
                        rechts.
                    </li>
                    <li>Jede Seite nennt Status, massgebliches Konzept und Issues. Abweichungen oder Wünsche als Issue erfassen.</li>
                    <li>Die Einstellungen gelten nur in diesem Browser und ändern nichts für andere.</li>
                </ol>
            </Block>
            {GROUPS.map((g) => (
                <Block key={g} title={g}>
                    <Table head={['Seite', 'Status', 'Inhalt', 'Issues']} caption={`Inhalt: ${g}`}>
                        {ENTRIES.filter((e) => e.group === g).map((e) => (
                            <tr key={e.id}>
                                <td className="whitespace-nowrap">
                                    <a href={`#/${e.id}`} className="font-medium text-link underline-offset-2 hover:underline">
                                        {e.title}
                                    </a>
                                </td>
                                <td><StatusBadge status={e.status} /></td>
                                <td className="min-w-56">{e.summary}</td>
                                <td><IssueLinks issues={e.issues} /></td>
                            </tr>
                        ))}
                    </Table>
                </Block>
            ))}
            <Block title="Später">
                <p className="max-w-prose">
                    Grundbausteine wie Button, Formularfelder, Tabelle, Dialog und Meldungen (#27) kommen als eigene Seiten unter
                    «Bausteine» dazu. Ausbau zum GUI-Tester mit Versionen, Überarbeitung und Wünschen je Baustein und Themes: Idee
                    #21, Regeln in <a href={docUrl('docs/UEBERNAHME-INTRANET-GUI.md')} className="text-link underline-offset-2 hover:underline"><Code>UEBERNAHME-INTRANET-GUI.md</Code></a>.
                    Barrierefreiheitsprüfung mit axe-core auf dieser Seite: #14.
                </p>
            </Block>
        </div>
    );
}
