import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig(
  {
    parserOptions: {
      project: [
        './tsconfig.json',
        './tsconfig.app.json',
        './tsconfig.node.json',
      ],
    },
    presets: {
      prettier: true,
      tailwindcss: true,
    },
  },
  [
    {
      ignores: ['eslint.config.mjs', 'postcss.config.mjs'],
    },
  ],
)
