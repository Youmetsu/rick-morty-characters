import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {defineConfig, globalIgnores} from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importX from 'eslint-plugin-import-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            react.configs.flat.recommended,
            jsxA11y.flatConfigs.recommended,
            importX.flatConfigs.recommended,
            importX.flatConfigs.typescript,
            eslintConfigPrettier,
        ],
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        languageOptions: {
            globals: globals.browser,
        },
        settings: {
            react: {
                version: '19.2.6', // версия указана чтобы убрать несовместимость eslint-plugin-react с ESLint 10
            },
            'import-x/resolver': {
                typescript: {
                    project: ['./tsconfig.app.json', './tsconfig.node.json'],
                },
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'import-x/order': 'off',
            'import-x/no-unresolved': 'error',
            'import-x/no-cycle': 'warn',
            'import-x/no-duplicates': 'warn',

            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        [
                            // React packages first.
                            '^react(/.*)?$',
                            '^react-dom(/.*)?$',
                            '^react-router(/.*)?$',
                            // Обычные npm-пакеты и scoped-пакеты (@vitejs/..., @testing-library/...)
                            '^@[^/]',
                            '^\\w',
                            // Side effect imports (non-CSS)
                            '^\\u0000(?!.*\\.s?css$)',
                            // Свои алиасы проекта
                            '^@/',
                            // Parent imports
                            '^\\.\\.(?!/?$)',
                            '^\\.\\./?$',
                            // Other relative imports
                            '^\\./(?=.*/)(?!/?$)',
                            '^\\.(?!/?$)',
                            '^\\./?$',
                            // Style imports last
                            '^.+\\.s?css$',
                        ],
                    ],
                },
            ],
            'simple-import-sort/exports': 'warn',
        },
    },
])
