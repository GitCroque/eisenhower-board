import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    ignores: ['dist/**', 'dist-server/**', 'coverage/**', 'node_modules/**'],
  },
  // server/ and shared/ belong to other workstreams: parse them without rules
  // so the lint script keeps covering them syntactically.
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['src/**/*.{ts,tsx}'],
  })),
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // Classic recommended rules. The extra compiler-driven rules shipped in
      // eslint-plugin-react-hooks v7 are left out to avoid churn on patterns
      // that predate this config (fetch-in-effect with setState, etc.).
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
);
