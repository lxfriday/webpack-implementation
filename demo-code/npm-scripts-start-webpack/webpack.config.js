const path = require('path')

const getPath = p => path.resolve(__dirname, p)

module.exports = function() {
  return {
    mode: 'development',
    entry: getPath('index.js'),
    output: {
      filename: 'bundle.js',
      path: getPath('build'),
    },
  }
}
