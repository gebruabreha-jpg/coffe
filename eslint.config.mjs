import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextConfig from 'eslint-config-next'

const config = [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextConfig,
]

export default config
