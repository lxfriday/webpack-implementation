const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/in'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
}
