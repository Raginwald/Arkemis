import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";

/* if you're using React */
// import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        /* react(), // if you're using React */
        symfonyPlugin({
            stimulus: true,
        }),
    ],
    css: {
        devSourcemap: true,
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                app: "./assets/app.js",
                styles: "./assets/app.scss"
            },
        }
    },
});
