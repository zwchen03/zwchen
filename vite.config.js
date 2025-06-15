import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // 根据环境变量设置base路径，用于GitHub Pages部署
  base: process.env.NODE_ENV === 'production' ? '/zwchen03/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 构建配置
  build: {
    // 输出目录
    outDir: 'dist',
    // 资源目录
    assetsDir: 'assets',
    // 是否生成sourcemap
    sourcemap: false,
    // 构建后的文件大小警告阈值
    chunkSizeWarningLimit: 1500,
    // 构建优化
    rollupOptions: {
      output: {
        // 代码分割配置
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
        },
        // 确保资源路径正确
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'assets/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
})
