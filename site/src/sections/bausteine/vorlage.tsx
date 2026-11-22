import type { ReactNode } from 'react';
import { buttonClasses } from '../../../../src/components/button';
import { useEntry } from '../../entry-context';
import { Tabs } from '../../tabs';
import { Block, IssueLinks, REPO, Table } from '../../ui';
import { stand, VERSION_STATUS_LABELS, type VersionStatus } from '../../versionen';

/** Status einer Version mit Text (nie nur Farbe). */
export function VersionBadge({ status }: { status: VersionStatus }) {
    return <span className="inline-flex rounded-full border border-border px-2 py-0.5 text-xs font-medium whitespace-nowrap">{VERSION_STATUS_LABELS[status]}</span>;
}

/** Adresse für einen neuen Wunsch zum Baustein: Ideen-Vorlage, Titel mit dem Baustein. */
export const wunschUrl = (title: string) => `${REPO}/issues/new?template=idee.yml&title=${encodeURIComponent(`Idee: Wunsch ${title} – `)}`;
export const wuenscheUrl = (title: string) => `${REPO}/issues?q=${encodeURIComponent(`is:issue label:idee "Wunsch ${title}"`)}`;

function Versionen({ id }: { id: string }) {
    const s = stand(id);
    if (s.versionen.length === 0) return <p>Noch keine Versionen erfasst.</p>;
    return (
        <div className="space-y-6">
            <dl className="grid max-w-prose grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
                <dt className="text-muted-foreground">Verbindlich</dt>
                <dd>{s.verbindlich ? `v${s.verbindlich.version}` : 'noch keine freigegebene Version'}</dd>
                <dt className="text-muted-foreground">Offen</dt>
                <dd>{s.offen ? `v${s.offen.version} (${VERSION_STATUS_LABELS[s.offen.status]})` : '–'}</dd>
            </dl>
            {s.versionen.map((v) => (
                <div key={v.version} className="space-y-2">
                    <p className="flex flex-wrap items-center gap-2 font-semibold">
                        v{v.version} <VersionBadge status={v.status} /> <IssueLinks issues={v.issues} />
                    </p>
                    <Table head={['Datum', 'Person', 'Status', 'Bemerkung']} caption={`Verlauf v${v.version}`}>
                        {v.verlauf.map((st, i) => (
                            <tr key={i}>
                                <td className="whitespace-nowrap tabular-nums">{st.datum}</td>
                                <td className="whitespace-nowrap">{st.person}</td>
                                <td><VersionBadge status={st.status} /></td>
                                <td className="min-w-48">{st.bemerkung}</td>
                            </tr>
                        ))}
                    </Table>
                </div>
            ))}
            <p className="max-w-prose text-sm text-muted-foreground">
                Status Entwicklung → Prüfung → Freigegeben; SemVer je Baustein (Korrektur x.x.+1, Erweiterung x.+1.0, grundlegend neu
                +1.0.0). Höchstens eine Version ist offen; bis zu ihrer Freigabe bleibt die zuletzt freigegebene verbindlich.
            </p>
        </div>
    );
}

function Ueberarbeitung({ id }: { id: string }) {
    const { ueberarbeiten, verbindlich } = stand(id);
    return (
        <div className="space-y-4">
            <p className="max-w-prose">
                Nach einer Freigabe werden alle Seiten der Module, die den Baustein verwenden, als «zu überarbeiten» vorgemerkt,
                einzeln angepasst und abgehakt. Eine neue Freigabe ersetzt die Liste.
            </p>
            {ueberarbeiten.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    {verbindlich ? 'Keine offenen Überarbeitungen.' : 'Noch keine Freigabe – nichts vorgemerkt.'}
                </p>
            ) : (
                <Table head={['Modul', 'Seite', 'Stand']} caption="Zu überarbeiten">
                    {ueberarbeiten.map((u) => (
                        <tr key={`${u.modul}-${u.seite}`}>
                            <td>{u.modul}</td>
                            <td>{u.seite}</td>
                            <td>{u.erledigt ? 'erledigt' : 'offen'}</td>
                        </tr>
                    ))}
                </Table>
            )}
        </div>
    );
}

function Wuensche({ title }: { title: string }) {
    return (
        <div className="space-y-4">
            <p className="max-w-prose">
                Wünsche zum Baustein werden als Idee in GitHub erfasst (Text, Person und Datum hält GitHub fest) und beim Anlegen der
                nächsten Version übernommen («in v1.1.0»). Eine Idee ist kein Entwicklungsauftrag.
            </p>
            <div className="flex flex-wrap gap-2">
                <a className={buttonClasses()} href={wunschUrl(title)}>
                    Wunsch erfassen
                </a>
                <a className="inline-flex items-center px-2 text-sm text-link underline" href={wuenscheUrl(title)}>
                    Wünsche zu {title} anzeigen
                </a>
            </div>
        </div>
    );
}

/**
 * Gerüst einer Baustein-Seite nach dem GUI-Tester des INTRANET (DS13, #44): Reiter Beispiele, Versionen & Status,
 * Überarbeitung, Wünsche. Beispiele immer in <Example>, damit hell/dunkel, Theme und Vergleich greifen.
 */
export function BausteinSeite({ beispiele, code, pruefen }: { beispiele: ReactNode; code: string; pruefen: string[] }) {
    const entry = useEntry();
    const id = entry?.id ?? '';
    const title = entry?.title ?? 'Baustein';
    const beispielTeil = (
        <div className="space-y-8">
            <Block title="Beispiele">{beispiele}</Block>
            <Block title="Verwendung">
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm">
                    <code>{code.trim()}</code>
                </pre>
            </Block>
            <Block title="Zum Prüfen" note="In allen Ansichten der Vorschau-Leiste, hell und dunkel, in jedem Theme, nur mit Tastatur.">
                <ul className="max-w-prose list-disc space-y-1 pl-5">
                    {[...pruefen, 'Hell und dunkel lesbar, Farben nur über Tokens', 'Handy und Tablet hoch/quer: nichts läuft über'].map((p) => (
                        <li key={p}>{p}</li>
                    ))}
                </ul>
            </Block>
        </div>
    );
    return (
        <Tabs
            label={`${title}: Bereiche`}
            tabs={[
                { id: 'beispiele', title: 'Beispiele', content: beispielTeil },
                { id: 'versionen', title: 'Versionen & Status', content: <Versionen id={id} /> },
                { id: 'ueberarbeitung', title: 'Überarbeitung', content: <Ueberarbeitung id={id} /> },
                { id: 'wuensche', title: 'Wünsche', content: <Wuensche title={title} /> },
            ]}
        />
    );
}
