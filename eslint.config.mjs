import antfu from '@antfu/eslint-config'
import pluginTailwind from 'eslint-plugin-better-tailwindcss'
import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults'
import { SelectorKind } from 'eslint-plugin-better-tailwindcss/types'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu(
    // antfu config
    {
      rules: {
        'antfu/if-newline': 'off',
      },
      stylistic: {
        indent: 2,
        semi: false,
      },
      formatters: {
        css: true,
        html: true,
        markdown: 'prettier',
        prettierOptions: {
          printWidth: 100,
        },
      },
      ignores: ['.vscode/extensions.json'],
      jsonc: true,
      yaml: true,
    },
    // antfu overrides
    {
      files: ['**/*.ts', '**/*.js', '**/*.mjs', '**/*.vue'],
      rules: {
        'style/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'node/prefer-global/process': 'off',
        'unicorn/prefer-node-protocol': 'off',
        'style/quote-props': ['error', 'consistent-as-needed'],
        'style/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'style/max-len': [
          'error',
          {
            code: 100,
            ignoreComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            // Imports, class-only string lines (e.g. `:ui` slots) and single unbreakable classes
            ignorePattern: '^import\\s.+\\sfrom\\s.+$|^\\s*([\\w-]+:\\s*)?[\'"`][^\'"`]*[\'"`],?$|^\\s*\\S+$',
          },
        ],
      },
    },
    // Accessibility config
    ...pluginVueA11y.configs['flat/recommended'],
    // Tailwind config
    {
      files: ['**/*.ts', '**/*.vue'],
      plugins: { 'better-tailwindcss': pluginTailwind },
      settings: {
        'better-tailwindcss': {
          entryPoint: 'app/assets/css/main.css',
          selectors: [
            ...getDefaultSelectors(),
            // Nuxt UI `:ui` props: { slot: 'classes' }
            { kind: SelectorKind.Attribute, name: '^v-bind:ui$', match: [{ type: 'objectValues' }] },
            // Class strings stored in constants, e.g. `const BADGE_CLASS = '…'`
            {
              kind: SelectorKind.Variable,
              name: '^[A-Z_]*CLASS$',
              match: [{ type: 'strings' }, { type: 'objectValues' }],
            },
          ],
        },
      },
      rules: {
        ...Object.fromEntries(
          Object.keys(pluginTailwind.configs.recommended.rules).map(rule => [rule, 'error']),
        ),
        'better-tailwindcss/enforce-consistent-line-wrapping': ['error', { printWidth: 100 }],
        // Class required by Google reCAPTCHA
        'better-tailwindcss/no-unknown-classes': ['error', { ignore: ['^g-recaptcha$'] }],
      },
    },
  ),
)
