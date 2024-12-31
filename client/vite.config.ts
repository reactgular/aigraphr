import {reactRouter} from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import path from 'path';
import tailwindcss from 'tailwindcss';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer]
        }
    },
    plugins: isStorybook ? [tsconfigPaths()] : [reactRouter(), tsconfigPaths()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
