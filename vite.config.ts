import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { execSync } from 'child_process'

// Get version: APP_VERSION env var (Docker build) > git tag > "dev"
function getAppVersion(): string {
  if (process.env.APP_VERSION && process.env.APP_VERSION !== 'dev') {
    return process.env.APP_VERSION
  }
  try {
    // Try to get the latest git tag
    const tag = execSync('git describe --tags --abbrev=0', { 
      encoding: 'utf-8',
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim()
    return tag || 'dev'
  } catch {
    return 'dev'
  }
}

const APP_VERSION = getAppVersion()
console.log(`[vite] App version: ${APP_VERSION}`)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
