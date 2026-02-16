import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220 16% 6%)',
        foreground: 'hsl(220 8% 98%)',
        card: 'hsl(220 14% 10%)',
        'card-foreground': 'hsl(220 8% 98%)',
        muted: 'hsl(220 12% 14%)',
        'muted-foreground': 'hsl(220 8% 65%)',
        border: 'hsl(220 10% 20%)',
        primary: 'hsl(160 84% 44%)',
        'primary-foreground': 'hsl(220 16% 6%)',
        accent: 'hsl(188 92% 58%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        gradient: 'gradient 4s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
