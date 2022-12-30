/* eslint-disable no-undef */
const paths = {
  health: './src/health',
  utils: './src/utils',
  hooks: './src/hooks',
  app: './src/app',
  ui: './src/ui',
};

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.ios.js', '.web.js'],
          alias: paths,
        },
      ],
    ],
  };
};
