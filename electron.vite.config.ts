import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist-electron/main'
    }
  },
  preload: {
    build: {
      outDir: 'dist-electron/preload'
    }
  },
  renderer: {
    root: 'src/renderer',
    build: {
      outDir: path.resolve(__dirname, 'dist')
    },
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/renderer')
      }
    },
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: '../../public/assets/**/*',
            dest: 'assets'
          },
          {
            src: '../../public/icons/*',
            dest: 'icons'
          }
        ],
        silent: false
      })
    ]
  }
}) 