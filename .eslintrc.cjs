module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'react', 'react-hooks', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'no-unused-vars': 'error',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': [
            'error',
            {
                arrowParens: 'always',
                semi: true,
                trailingComma: 'all',
                tabWidth: 2,
                endOfLine: 'auto',
                useTabs: false,
                singleQuote: false,
                printWidth: 120,
                jsxSingleQuote: false,
                proseWrap: "always",
            },
        ],
    },
}