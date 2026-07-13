import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署於子路徑（/atc-edelrid-groupbuy/）；
  // 由 CI 的 VITE_BASE 設定，本機及 Cloudflare（根網域）預設為 '/'。
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
