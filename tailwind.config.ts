import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "color-accent-primary ": "#1db954",
        "color-background-primary": "#000",
        "color-background-base-primary": "#121212",
        "color-box-primary": "#181818",
        "color-hover-primary": "#535353",
        "color-active-primary": "#b3b3b3",
        "color-text-primary": "#fff",
        "color-text-secondary": "#b3b3b3",
      }
    },
  },
  plugins: [],
}
export default config
