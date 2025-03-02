import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/*.d.ts'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': 'off',
    },
  },
  {
    files: [
      // include all react projects here
      'packages/editor/**/*.{js,mjs,cjs,ts,jsx,tsx}',
      'packages/form/**/*.{js,mjs,cjs,ts,jsx,tsx}',
      'packages/react/**/*.{js,mjs,cjs,ts,jsx,tsx}',
      'demo/react/**/*.{js,mjs,cjs,ts,jsx,tsx}',
    ],
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
