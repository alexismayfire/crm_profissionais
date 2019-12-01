// https://github.com/tleunen/babel-plugin-module-resolver/issues/341
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
    plugins: [
      [
        'module-resolver', {
          root: ['./src'],
          alias: {
            '~actions': './actions',
            '~assets': './assets',
            '~components': './components',
            '~constants': './constants',
            '~navigation': './navigation',
            '~reducers': './reducers',
            '~screens': './screens'
          }
        }
      ]
    ]
  }
};
