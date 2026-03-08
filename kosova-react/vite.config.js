import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    esbuild: {
        drop: ['console', 'debugger'],
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost',
                changeOrigin: true,
                rewrite: (path) => `/turizmi-kosove${path}`
            },
            '/uploads': {
                target: 'http://localhost',
                changeOrigin: true,
                rewrite: (path) => `/turizmi-kosove${path}`
            }
        }
    }
})
