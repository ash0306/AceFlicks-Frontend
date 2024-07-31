import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: { port: 3000, https: true },
  define:{
    'process.env':process.env
  }
});