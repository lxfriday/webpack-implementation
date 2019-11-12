const path = require('path')

const getPath = p => path.resolve(__dirname, p)

module.exports = function(env, cfgs) {
  console.log(env)
  console.log(cfgs)

  return {
    mode: 'development',
    entry: getPath('index.js'),
    output: {
      filename: 'bundle.js',
      path: getPath('build'),
    },
    watchOptions: {
      aggregateTimeout: 2000,
    },
  }
}
