import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    build: {
        chunkSizeWarningLimit: 1000, // Increase limit to 1000kb
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separate large libraries into their own chunks
                    vendor: ['react', 'react-dom'],
                    excel: ['exceljs'], // Only if you keep static import
                    icons: ['lucide-react'],
                }
            }
        }
    }
});
