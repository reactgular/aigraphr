import js from '@eslint/js';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import json from 'eslint-plugin-json';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import ts_eslint from 'typescript-eslint';

export default ts_eslint.config(
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/coverage/**'
        ]
    },
    prettierRecommended,
    js.configs.recommended,
    ts_eslint.configs.recommended,
    {
        files: ['**/*.json'],
        ...json.configs['recommended']
    },
    {
        plugins: {
            'eslint-plugin': eslintPlugin
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn'
        }
    }
);
