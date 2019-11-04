const path = require('path')

module.exports = (...args) => {
  console.log(args)

  return new Promise(res => {
    res({
      entry: path.resolve(__dirname, 'src/index'),
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
    })
  })
}
