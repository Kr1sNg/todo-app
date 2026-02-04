import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      '@stylistic/js': stylistic,
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'no-console': 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'no-unused-vars': 'off',
    },
  },
];
