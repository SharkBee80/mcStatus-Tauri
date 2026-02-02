import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'
import { join } from "node:path";

// @ ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// 检测是否为移动端构建
const isMobile = process.env.TAURI_ENV_PLATFORM === 'android' ||
  process.env.TAURI_ENV_PLATFORM === 'ios';

// https://vite.dev/config/
export default defineConfig(async () => ({
  base: isMobile ? './' : '/',
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src")
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  build: {
    target: isMobile ? 'esnext' : 'es2022',
    // 确保静态资源完整复制（通常默认 public 目录会被直接复制）
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 1. 用于从入口点创建的块的文件名（如 index.js）
        entryFileNames: `js/[name]-[hash].js`,
        // 2. 显式拆分第三方库 (Manual Chunks)
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            // 进一步细化：将巨大的库单独拆出，其他的合并为 vendor
            if (id.includes('vue') || id.includes('react')) {
              return 'framework';
            } else if (id.includes('primevue') || id.includes('primeuix')) {
              return 'primevue';
            }
            let name = id.split("node_modules/")[1].split("/");
            if (name[0] == ".pnpm") {
              return name[1];
            } else {
              return name[0]
            }
            return 'vendor';
          }
        },
        // 3. 区分业务分包与第三方库分包
        chunkFileNames: (chunkInfo: { facadeModuleId: string; }) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          const isVendor = facadeModuleId.includes('node_modules');
          // 第三方库放在 js/vendor/，业务分包放在 js/chunks/
          return isVendor ? 'js/vendor/[name]-[hash].js' : 'js/chunks/[name]-[hash].js';
        },

        // 4. 用于自定义静态资源（CSS、图片、字体等）的文件名
        assetFileNames: (assetInfo: { name: string; }) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          // 区分图片、字体等类型
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media';
          } else if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'img';
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts';
          } else if (/\.(css)$/i.test(assetInfo.name)) {
            extType = 'css';
          }
          return `${extType}/[name]-[hash][extname]`;
        },
      },
    },
  },
}));
