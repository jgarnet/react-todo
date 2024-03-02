import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    base: '',
    plugins: [react()],
    server: {
        open: false,
        port: 3000,
        host: '0.0.0.0'
    },
    resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    }
})
