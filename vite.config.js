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
                process: resolve(__dirname, 'process/index.html'),
                economics: resolve(__dirname, 'economics/index.html'),
                environment: resolve(__dirname, 'environment/index.html'),
                conclusion: resolve(__dirname, 'conclusion/index.html'),
            }
        }
    },
    define: {
        _global: ({})
    }
});