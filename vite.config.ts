import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('./src/'),
}

// https://vitejs.dev/config/
const viteConfig = defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  return {
    resolve: { alias },
    plugins: [
      uni(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
        logger: true,
      }),
    ],
    server: {
      port: 3000,
      open: env.VITE_OPEN,
      proxy: {
        [env.VITE_BASE]: {
          target: env.VITE_API_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(env.VITE_BASE, 'g'), '/'),
        },
      },
    },
  }
})

export default viteConfig
