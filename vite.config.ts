import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'index.js' },
        emptyOutDir: false,
        rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
    },
    test: { environment: 'jsdom', globals: true, include: ['tests/**/*.test.{ts,tsx}'], setupFiles: ['tests/setup.ts'] },
});
