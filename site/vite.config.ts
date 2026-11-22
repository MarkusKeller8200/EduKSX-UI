import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

// Testseite (#15, #17, #19, #21): eigene Vite-Seite, als statische Seite für GitHub Pages gebaut (dist-site/).
const root = fileURLToPath(new URL('.', import.meta.url));
const repo = fileURLToPath(new URL('..', import.meta.url));

/** Statische Prüfseiten aus docs/pruefseiten/ übernehmen; der Schriftpfad zeigt dort auf site/public/fonts/. */
const PRUEFSEITEN = ['schriftgewichte.html'];
function pruefseite(name: string): string {
    return readFileSync(`${repo}docs/pruefseiten/${name}`, 'utf8').replaceAll('../../site/public/fonts/', '../fonts/');
}
function pruefseiten(): Plugin {
    return {
        name: 'eduksx-pruefseiten',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const m = /\/pruefseiten\/([\w-]+\.html)$/.exec(req.url?.split('?')[0] ?? '');
                if (!m || !PRUEFSEITEN.includes(m[1])) return next();
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(pruefseite(m[1]));
            });
        },
        generateBundle() {
            for (const name of PRUEFSEITEN) this.emitFile({ type: 'asset', fileName: `pruefseiten/${name}`, source: pruefseite(name) });
        },
    };
}

export default defineConfig({
    root,
    base: './',
    plugins: [react(), tailwindcss(), pruefseiten()],
    server: { fs: { allow: [repo] } },
    build: { outDir: `${repo}dist-site`, emptyOutDir: true, assetsInlineLimit: 0 },
});
