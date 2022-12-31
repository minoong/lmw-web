module.exports = {
 env: {
  browser: true,
  es2021: true,
 },
 extends: [
  'airbnb',
  'airbnb/hooks',
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended',
  'plugin:storybook/recommended',
 ],
 overrides: [],
 parser: '@typescript-eslint/parser',
 parserOptions: {
  ecmaVersion: 'latest',
  sourceType: 'module',
 },
 plugins: ['react', '@typescript-eslint'],
 rules: {
  'react/jsx-filename-extension': [
   'error',
   {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
   },
  ],
  'import/extensions': [
   'error',
   'ignorePackages',
   {
    js: 'never',
    jsx: 'never',
    ts: 'never',
    tsx: 'never',
    json: 'never',
    'd.ts': 'never',
   },
  ],
  'no-shadow': 'off',
  'import/prefer-default-export': 'off',
  'react/function-component-definition': [
   0,
   {
    namedcomponents: 'arrow-function',
   },
  ],
  'import/no-extraneous-dependencies': [
   'error',
   {
    devDependencies: true,
   },
  ],
  'react/prop-types': 'off',
  'react/require-default-props': 'off',
  'react/no-unused-prop-types': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/button-has-type': 'off',
  'no-bitwise': 'off',
  'no-plusplus': 'off',
  'no-nested-ternary': 'off',
  'react-hooks/exhaustive-deps': 'off',
  'no-param-reassign': [
   'error',
   {
    props: true,
    ignorePropertyModificationsFor: ['state'],
   },
  ],
  'no-use-before-define': ['error', { functions: false }],
 },
 settings: {
  react: {
   version: 'detect',
  },
  'import/parsers': {
   '@typescript-eslint/parser': ['.ts', '.tsx'],
  },
  'import/resolver': {
   node: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'd.ts'],
   },
   typescript: './tsconfig.json',
  },
 },
}
