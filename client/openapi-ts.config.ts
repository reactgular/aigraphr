import {defaultPlugins, defineConfig} from '@hey-api/openapi-ts';

export default defineConfig({
    client: '@hey-api/client-fetch',
    experimentalParser: true,
    input: 'openapi.json',
    output: {
        lint: 'eslint',
        path: 'src/api'
    },
    plugins: [...defaultPlugins, '@tanstack/react-query']
});
