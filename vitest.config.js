import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './Vite.config.js'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
}))