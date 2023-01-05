module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'i18next-extract',
        {
          locales: ['en', 'zh'],
          outputPath: 'i18n/{{locale}}/{{ns}}.json',
          // discardOldKeys: true,
          compatibilityJSON: 'v4',
          useI18nextDefaultValue: 'zh',
          customUseTranslationHooks: [
            'src/hooks/useTranslation',
            'useTranslation',
          ],
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@hooks': 'mommy-watch/src/hooks',
            '@permissions': './src/permissions',
            '@i18n': './src/i18n',
            '@component': './src/component',
            '@utils': './src/utils',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.ts', '.android.ts'],
        },
      ],
    ],
  };
};
