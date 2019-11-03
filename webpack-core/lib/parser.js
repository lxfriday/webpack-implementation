const fs = require('fs')
const babylon = require('babylon')
const { transformFromAst } = require('@babel/core')
const traverse = require('babel-traverse').default

module.exports = {
  getAST(path) {
    const content = fs.readFileSync(path, 'utf-8')

    return babylon.parse(content, {
      sourceType: 'module',
    })
  },
  getDependencies(ast) {
    const dependencies = []
    traverse(ast, {
      ImportDeclaration({ node }) {
        dependencies.push(node.source.value)
      },
    })

    return dependencies
  },
  transform(ast) {
    return new Promise(resolve => {
      transformFromAst(
        ast,
        null,
        {
          presets: ['env'],
        },
        (err, res) => {
          resolve(res.code)
        }
      )
    })
  },
}
