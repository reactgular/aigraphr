import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import ts_eslint from 'typescript-eslint';
import rootConfig from '../eslint.config.mjs';

export default ts_eslint.config({ignores: ['dist', '**/*.d.ts']}, rootConfig, {
    plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh
    },
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true}
        ]
    }
});
