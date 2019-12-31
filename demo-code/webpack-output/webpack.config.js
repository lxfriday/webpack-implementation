const path = require('path')

const getPath = p => path.resolve(__dirname, p)

module.exports = {
  mode: 'none',
  context: getPath('src'),
  entry: getPath('index.js'),
  output: {
    publicPath: '/',
    path: getPath('build'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[id].chunk.[ext]',
  },
}
