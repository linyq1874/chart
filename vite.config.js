import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 各个服务的启动端口
const portData = {
    client: 5566,
    server: 3300
}

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: portData.client,
        origin: `https://localhost:${portData.client}`,
        proxy: {
            '/api': `http://localhost:${portData.server}/`
        },
        hmr: {
            overlay: false
        }
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
