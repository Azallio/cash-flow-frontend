import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  plugins: {
    react,
    reactHooks,
    reactRefresh,
    import: importPlugin,
  },

  extends: [
    globalIgnores(['**/.react-router/**', '**/+types/**', '**/*.d.ts', 'vite.config.ts', '*.config.js']),
    js.configs.recommended,
    react.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    reactRefresh.configs.vite,
    tseslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
  ],
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    ecmaVersion: 2022,
    parserOptions: {
      projectService: true,
    },
    globals: {
      ...globals.es2022,
      ...globals.browser,
    },
  },
  settings: {
    react: {
      version: 'detect',
      defaultVersion: '^19.0.0',
    },
  },
  rules: {
    // Legacy
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',

    // Imports
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-cycle': 'warn',
    'import/first': 'error',
    'import/newline-after-import': 'error',

    // React
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

    // Disabled
    'import/prefer-default-export': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-refresh/only-export-components': 'off',

    // Warning
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',

    // Error
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
})
