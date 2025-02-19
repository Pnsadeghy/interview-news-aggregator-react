import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,scss}',
  ],
} satisfies Config;
