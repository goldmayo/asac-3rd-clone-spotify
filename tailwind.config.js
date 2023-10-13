// import type { Config } from 'tailwindcss'

// const config: Config = {
const config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // screens: {
    //   xs: { min: '0px', max: '639px' },
    //   // => @media (min-width: 640px and max-width: 767px) { ... }

    //   sm: { min: '640px', max: '767px' },
    //   // => @media (min-width: 640px and max-width: 767px) { ... }

    //   md: { min: '768px', max: '1023px' },
    //   // => @media (min-width: 768px and max-width: 1023px) { ... }

    //   lg: { min: '1024px', max: '1279px' },
    //   // => @media (min-width: 1024px and max-width: 1279px) { ... }

    //   xl: { min: '1280px', max: '1535px' },
    //   // => @media (min-width: 1280px and max-width: 1535px) { ... }

    //   '2xl': { min: '1536px' },
    //   // => @media (min-width: 1536px) { ... }
    // },
    extend: {
      colors: {
        'color-accent-primary': '#1db954',
        'color-background-primary': '#000',
        'color-background-base-primary': '#121212',
        'color-box-primary': '#181818',
        'color-hover-primary': '#535353',
        'color-active-primary': '#b3b3b3',
        'color-card-primary': '#FFFFFF14',
        'color-text-primary': '#fff',
        'color-text-secondary': '#b3b3b3',
      },

      gridTemplateAreas: {
        mobile: [],
        tablet: [],
        desktop: ['left-sidebar main', 'player player'],
      },
      gridTemplateColumns: {
        layout: 'auto 1fr',
      },
      gridTemplateRows: {
        layout: '1fr auto',
      },
    },
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
  variants: {
    gridTemplateAreas: ['responsive'],
  },
}
export default config
