import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import html from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
   html({
      inject: {
        injectData: {
          css: ['//at.alicdn.com/t/font_584725_0nyjbeaxjw2ep14i.css'],
        }
      },
      minify: true
    })]
})
