// vite.config.ts
// Viteの設定ファイル。プロジェクトルート直下に置くと自動的に読み込まれる
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // Tailwind公式のViteプラグイン

export default defineConfig({
  plugins: [
    tailwindcss(), // Viteのビルド処理にTailwindを組み込む
  ],
})