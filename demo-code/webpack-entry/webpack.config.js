const path = require('path')

module.exports = {
  // ...
  mode: 'none',
  // entry: path.resolve(__dirname, 'index'),
  context: path.resolve(__dirname, 'src'),
  // entry: () => {
  //   console.log('compile')
  //   return './func-entry.js'
  // },
  entry: () => {
    console.log('compile')
    return new Promise(res => res(['./func-entry.js']))
  },
  watch: true,
  // entry: './index.js',
  // entry: ['./index.js', './app.js', './name.js'],
  // entry: { index: './index.js', app: './app.js', name: './name.js' },
  output: {
    filename: '[name].js',
  },
}
