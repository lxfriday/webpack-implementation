const path = require('path')

const { getAST, getDependencies, transform } = require('./parser')

const ast = getAST(path.resolve(__dirname, '../src/index.js'))
// console.log(getDependencies(ast))

;(async () => {
  const code = await transform(ast)
  console.log(code)
})()
