import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableEmpty, TableHead, TableHeader, TableRow, type SortDirection } from '../../../../src/components/table';
import { Example } from '../../ui';
import { BausteinSeite } from './vorlage';

const ROWS = [
    { begriff: 'Absenz', bereich: 'Schule', eintraege: 42 },
    { begriff: 'Dispensation', bereich: 'Schule', eintraege: 7 },
    { begriff: 'Lehrplan 21', bereich: 'Unterricht', eintraege: 128 },
    { begriff: 'Pensum', bereich: 'Verwaltung', eintraege: 15 },
];

export function TableSeite() {
    const [sort, setSort] = useState<SortDirection>('asc');
    const rows = [...ROWS].sort((a, b) => (sort === 'desc' ? -1 : 1) * a.begriff.localeCompare(b.begriff, 'de-CH'));
    return (
        <BausteinSeite
            beispiele={
                <div className="space-y-4">
                    <Example label="Tabelle">
                        <Table scrollLabel="Begriffe">
                            <TableCaption>Begriffe (erfundene Beispieldaten)</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead sort={sort} onSort={() => setSort((s) => (s === 'asc' ? 'desc' : 'asc'))}>
                                        Begriff
                                    </TableHead>
                                    <TableHead>Bereich</TableHead>
                                    <TableHead numeric>Einträge</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((r, i) => (
                                    <TableRow key={r.begriff} selected={i === 0}>
                                        <TableCell>{r.begriff}</TableCell>
                                        <TableCell>{r.bereich}</TableCell>
                                        <TableCell numeric>{r.eintraege}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Example>
                    <Example label="Leere Tabelle">
                        <Table scrollLabel="Leere Liste">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Begriff</TableHead>
                                    <TableHead>Bereich</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableEmpty colSpan={2} />
                            </TableBody>
                        </Table>
                    </Example>
                </div>
            }
            code={`
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@eduksx/ui';

<Table scrollLabel="Begriffe">
    <TableHeader><TableRow>
        <TableHead sort="asc" onSort={…}>Begriff</TableHead>
        <TableHead numeric>Einträge</TableHead>
    </TableRow></TableHeader>
    <TableBody>…</TableBody>
</Table>
`}
            pruefen={['Sortierknopf per Tastatur, Richtung als aria-sort', 'Handy hoch: Tabelle scrollt in ihrem eigenen Bereich, die Seite nicht', 'Zahlen rechtsbündig mit gleich breiten Ziffern']}
        />
    );
}
