/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [react(), viteTsconfigPaths()
    ],
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3000, 
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@stores": path.resolve(__dirname, "./src/stores"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
      },
    },
})