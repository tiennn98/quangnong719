module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',{
        envName:'QUANGNONG_ENV',
        moduleName:'@env',
        path: '.env',
        safe: true,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
