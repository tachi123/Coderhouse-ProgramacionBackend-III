// eslint.config.js (o .eslintrc.js)
import globals from 'globals';


export default  {
  ignorePatterns: ['eslint.config.js'], // ignora el archivo de config
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended', // prettier siempre al final
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname, //  __dirname en lugar de import.meta.dirname
    sourceType: 'module', // module en lugar de commonjs, a menos que uses commonjs.

  },

  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    'prettier/prettier': ['error', {
      // Configura las opciones de prettier aquí, como:
      'singleQuote': true,
      'trailingComma': 'all',
      'printWidth': 80,
      // ... etc.
    }],
  },
  env: {
    node: true,
    jest: true, // Si usas jest
    // ... otros entornos
  },
};