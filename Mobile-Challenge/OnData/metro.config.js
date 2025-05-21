const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('cjs');

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    extraNodeModules: {
      '@swc/helpers': require.resolve('@swc/helpers'),
    },
  },
};