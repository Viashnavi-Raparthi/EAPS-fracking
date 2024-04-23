import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: true,
        port: process.env.PORT || 8000,
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                overview: resolve(__dirname, 'overview/index.html'),
                history: resolve(__dirname, 'history/index.html'),
                process: resolve(__dirname, 'process/index.html')
            }
        }
    },
    define: {
        _global: ({})
    }
});