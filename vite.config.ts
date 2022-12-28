import { mergeConfig, defineConfig as viteDefineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'

export default mergeConfig(
 viteDefineConfig({
  plugins: [
   react(),
   svgr(),
   tsconfigPaths(),
   checker({
    typescript: true,
   }),
  ],
 }),
 defineConfig({
  test: {
   globals: true,
   environment: 'jsdom',
   setupFiles: './src/setup.ts',
  },
 }),
)
