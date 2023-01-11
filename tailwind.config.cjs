/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
 theme: {
  extend: {
   colors: {
    'trade-rise': '#c84a31',
    'trade-fall': '#1261c4',
    'trade-even': '#333333',
   },
  },
 },
 plugins: [require('flowbite/plugin')],
}
