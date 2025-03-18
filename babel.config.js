const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            'ts',
            'tsx',
            'js',
            'jsx',
            'json',
            'node',
            '.ios.js',
            '.ios.ts',
            '.android.js',
            '.android.ts',
          ],
          alias: {
            '@': path.resolve(__dirname, 'src/'),
          },
        },
      ],
    ],
  };
};
