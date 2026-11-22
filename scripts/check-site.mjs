// Prüft die gebaute Testseite (dist-site/): keine Fremdabrufe von Schriften (M6), alle Seiten und Schriften vorhanden.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const out = new URL('../dist-site/', import.meta.url).pathname;
const errors = [];
const files = [];
const walk = (dir) => {
    for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        statSync(p).isDirectory() ? walk(p) : files.push(p);
    }
};
walk(out);

const FORBIDDEN = /fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net/;
for (const f of files.filter((f) => /\.(html|css|js)$/.test(f))) {
    if (FORBIDDEN.test(readFileSync(f, 'utf8'))) errors.push(`${f.slice(out.length)}: lädt Schriften von einem fremden Dienst (M6: selbst hosten)`);
}
for (const need of ['index.html', 'fonts/fonts.css', 'fonts/inter-latin-opsz-normal.woff2', 'fonts/jetbrains-mono-latin-wght-normal.woff2', 'pruefseiten/schriftgewichte.html']) {
    if (!existsSync(join(out, need))) errors.push(`${need} fehlt`);
}
if (errors.length) {
    console.error(`Testseite fehlerhaft:\n- ${errors.join('\n- ')}`);
    process.exit(1);
}
console.log(`Testseite: ${files.length} Dateien in dist-site/, keine fremden Schriftabrufe.`);
