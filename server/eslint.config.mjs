import ts_eslint from 'typescript-eslint';
import config from '../eslint.config.mjs';

export default ts_eslint.config(
  { ignores: ['dist'] },
  config,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
);
