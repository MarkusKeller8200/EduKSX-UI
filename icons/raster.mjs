// EduKSX Icon-Set – Rasterdateien aus den SVG erzeugen (#55).
// Aufruf: node icons/raster.mjs          Maskable-PNG (192, 512) und ico/<name>.ico (16, 32, 48, 64 aus der hellen Kachel)
//         node icons/raster.mjs --alle   zusätzlich alle Kachel-PNG (512, 192, 64, 32) neu rendern
// Braucht Playwright mit Chromium (nicht Teil der Paket-Abhängigkeiten): npx playwright install chromium
import { createRequire } from 'node:module';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// require statt import, damit auch ein global installiertes Playwright (NODE_PATH) gefunden wird
const { chromium } = createRequire(import.meta.url)('playwright');

const ordner = dirname(fileURLToPath(import.meta.url));
const alle = process.argv.includes('--alle');
const svgs = readdirSync(join(ordner, 'svg')).filter((d) => d.endsWith('.svg'));
const namen = svgs.filter((d) => d.endsWith('-tile-light.svg')).map((d) => d.replace('-tile-light.svg', ''));

const browser = await chromium.launch();
const seite = await browser.newPage();

async function rendern(datei, groesse) {
    const svg = readFileSync(join(ordner, 'svg', datei), 'utf8');
    await seite.setViewportSize({ width: groesse, height: groesse });
    await seite.setContent(
        `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${groesse}" height="${groesse}" `)}</body></html>`,
    );
    return seite.screenshot({
        omitBackground: true,
        clip: { x: 0, y: 0, width: groesse, height: groesse },
    });
}

function speichern(pfad, daten) {
    mkdirSync(dirname(pfad), { recursive: true });
    writeFileSync(pfad, daten);
}

// ICO mit eingebetteten PNG (Windows Vista und alle aktuellen Browser)
function ico(bilder) {
    const kopf = Buffer.alloc(6 + 16 * bilder.length);
    kopf.writeUInt16LE(0, 0);
    kopf.writeUInt16LE(1, 2);
    kopf.writeUInt16LE(bilder.length, 4);
    let versatz = kopf.length;
    bilder.forEach(({ groesse, png }, i) => {
        const o = 6 + 16 * i;
        kopf.writeUInt8(groesse >= 256 ? 0 : groesse, o);
        kopf.writeUInt8(groesse >= 256 ? 0 : groesse, o + 1);
        kopf.writeUInt16LE(1, o + 4);
        kopf.writeUInt16LE(32, o + 6);
        kopf.writeUInt32LE(png.length, o + 8);
        kopf.writeUInt32LE(versatz, o + 12);
        versatz += png.length;
    });
    return Buffer.concat([kopf, ...bilder.map((b) => b.png)]);
}

let anzahl = 0;
for (const datei of svgs) {
    const basis = datei.replace('.svg', '');
    const maskable = datei.includes('-maskable-');
    const kachel = datei.includes('-tile-');
    if (!maskable && !(alle && kachel)) continue;
    for (const groesse of maskable ? [192, 512] : [512, 192, 64, 32]) {
        speichern(join(ordner, 'png', String(groesse), `${basis}.png`), await rendern(datei, groesse));
        anzahl++;
    }
}
for (const name of namen) {
    const bilder = [];
    for (const groesse of [16, 32, 48, 64])
        bilder.push({
            groesse,
            png: await rendern(`${name}-tile-light.svg`, groesse),
        });
    speichern(join(ordner, 'ico', `${name}.ico`), ico(bilder));
}
await browser.close();
console.log(`${anzahl} PNG und ${namen.length} ICO → ${ordner}`);
