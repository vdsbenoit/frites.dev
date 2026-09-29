export default defineAppConfig({
  ui: {
    colors: {
      primary: 'frite',
      neutral: 'neutral',
    },
    icons: {
      arrowLeft: 'i-heroicons-arrow-left',
      arrowRight: 'i-heroicons-arrow-right',
      chevronDown: 'i-heroicons-chevron-down',
      close: 'i-heroicons-x-mark',
      menu: 'i-heroicons-bars-3',
    },
    container: {
      base: 'lg:px-6',
    },
    button: {
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class:
            'text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:bg-frite-300 active:bg-frite-300',
        },
      ],
    },
  },
  friesDensity: 1.0,
})
