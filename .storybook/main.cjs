const path = require('path')
const { mergeConfig } = require('vite')
const tsconfigPaths = require('vite-tsconfig-paths').default
const svgr = require('vite-plugin-svgr')

module.exports = {
 stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
 addons: [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  'storybook-addon-react-router-v6',
  'storybook-addon-jotai',
 ],
 framework: '@storybook/react',
 core: {
  builder: '@storybook/builder-vite',
 },
 features: {
  storyStoreV7: true,
 },
 viteFinal: async (config) => {
  config.plugins.push(
   tsconfigPaths({
    projects: [path.resolve(path.dirname(__dirname), 'tsconfig.json')],
   }),
  )

  return mergeConfig(config, {
   plugins: [svgr()],
  })
 },
}
