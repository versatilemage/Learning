// @ts-check
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import globals from 'globals'
import ts from 'typescript-eslint'
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default [
  // ignore build + node_modules
  { ignores: ['**/dist/**', '**/node_modules/**'] },

  // Base JS rules everywhere
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node }
    },
    rules: {
      ...js.configs.recommended.rules
    }
  },

  // ---- API: Type-checked TS on apps/api/**/*.ts ----
  {
    files: ['apps/api/**/*.{spec,test}.ts', 'apps/api/**/*.ts'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: './apps/api/tsconfig.eslint.json',
        tsconfigRootDir: __dirname
      },
      sourceType: 'commonjs',
      globals: { ...globals.node, ...globals.jest }
    },
    plugins: { '@typescript-eslint': ts.plugin },
    rules: {
      // minimal typed rules; expand later
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-misused-promises': ['warn', { checksVoidReturn: false }]
    }
  },

  // ---- Web: Untyped TS/TSX on apps/web ----
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        // fast: no per-project typing needed
        projectService: true,
        tsconfigRootDir: __dirname
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser
    },
    plugins: { '@typescript-eslint': ts.plugin, 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      // light rules to start
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': 'warn'
    }
  }
]
