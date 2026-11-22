/** Datum und Zeit für Menschen: DD.MM.YYYY HH:MM:SS in Europe/Zurich (DB-Standard D2). */
export function formatDateTime(iso: string, timeZone = 'Europe/Zurich'): string {
    const parts = new Intl.DateTimeFormat('de-CH', {
        timeZone,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(new Date(iso));
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    return `${get('day')}.${get('month')}.${get('year')} ${get('hour')}:${get('minute')}:${get('second')}`;
}
