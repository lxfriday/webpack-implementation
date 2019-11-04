module.exports = {
  title: 'webpack 完全入门',
  description: '完全学会 webpack',
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/docs',
      },
    },
  },
  themeConfig: {
    // sidebar: [['/guide', '总览'], ['/webpack-fix-what', 'webpack 解决的痛点']],
    sidebar: [['/posts/guide', '总览'], ['/posts/webpack-config-file', 'webpack 配置文件'], ['/posts/webpack-mode', 'webpack mode']],
    base: '/webpack-implementation/',
  },
}
