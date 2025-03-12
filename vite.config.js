import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import UnoCSS from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      shortcuts: [
        // 自定义快捷方式
        { 'flex-center': 'flex items-center justify-center' },
        { 'flex-between': 'flex items-center justify-between' },
        { 'flex-center-col': 'flex flex-col justify-center items-center' },
        { 'flex-between-center': 'flex justify-between items-center' },
        { 'flex-start-center': 'flex justify-start items-center' },
        { 'flex-end-center': 'flex justify-end items-center' },
        { 'flex-center-y': 'flex items-center' },
      ],
      theme: {
        colors: {
          // 自定义颜色变量，与CSS变量结合使用
          primary: 'var(--primary-color)',
          secondary: 'var(--secondary-color)',
          accent: 'var(--accent-color)',
          background: 'var(--background-color)',
          text: 'var(--text-color)',
        },
      },
    }),
    electron({
      entry: 'electron/main.cjs',
      preload: {
        input: 'electron/preload.cjs'
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "@/styles/variables.less";`,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ant-design-vue': ['ant-design-vue'],
        },
      },
    },
  },
});
