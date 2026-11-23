// EduKSX-Logo – PNG aus den SVG erzeugen (#59): 240 × 56 (1×) und 480 × 112 (2×).
// Aufruf: node icons/logo/raster.mjs   (braucht Playwright mit Chromium, nicht Teil der Paket-Abhängigkeiten)
import { createRequire } from 'node:module';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = createRequire(import.meta.url)('playwright');
const ordner = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();

for (const faktor of [1, 2]) {
    const seite = await browser.newPage({ viewport: { width: 240, height: 56 }, deviceScaleFactor: faktor });
    for (const datei of readdirSync(ordner).filter((d) => d.endsWith('.svg'))) {
        await seite.setContent(`<html><body style="margin:0;background:transparent">${readFileSync(join(ordner, datei), 'utf8')}</body></html>`);
        const png = await seite.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: 240, height: 56 } });
        const ziel = datei.replace('.svg', faktor === 1 ? '.png' : '@2x.png');
        writeFileSync(join(ordner, ziel), png);
        console.log(ziel);
    }
    await seite.close();
}
await browser.close();
