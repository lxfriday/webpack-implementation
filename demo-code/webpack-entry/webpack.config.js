const path = require('path')

module.exports = {
  // ...
  mode: 'none',
  // entry: path.resolve(__dirname, 'index'),
  context: path.resolve(__dirname, 'src'),
  // entry: './index.js',
  // entry: ['./index.js', './app.js', './name.js'],
  entry: { index: './index.js', app: './app.js', name: './name.js' },
  output: {
    filename: '[name].js',
  },
}
