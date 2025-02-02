module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    sourceMaps: true,
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/transform-react-jsx-source',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@components': './components',
            '@utils': './utils',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
