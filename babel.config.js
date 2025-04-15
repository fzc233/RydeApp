module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./src'], // 设置 src 作为根目录
          alias: {
            '@': './src', // 将 @ 映射到 src 目录
          },
        },
      ],
    ],
  };
};
