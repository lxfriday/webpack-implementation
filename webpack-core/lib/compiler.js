const path = require('path')
const fs = require('fs')
const { getAST, getDependencies, transform } = require('./parser')

module.exports = class Complier {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }

  async run() {
    const entryModule = await this.buildModule(this.entry, true)

    this.modules.push(entryModule)

    for (const mod of this.modules) {
      for (const dep of mod.dependencies) {
        const buildRes = await this.buildModule(dep)
        this.modules.push(buildRes)
      }
    }
    this.emitFiles()
  }

  async buildModule(filename, isEntry) {
    let ast
    if (isEntry) {
      ast = getAST(filename)
    } else {
      const filepath = path.resolve(__dirname, '../src', filename)
      ast = getAST(filepath)
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      source: await transform(ast),
    }
  }

  async emitFiles() {
    const outputPath = path.resolve(this.output.path, this.output.filename)
    let modules = ''

    this.modules.forEach(_module => {
      modules += `'${_module.filename}': function (module, exports, require) { ${_module.source} },\n`
    })

    const bundle = `(function(modules) {
      function require (id){
        var fn = modules[id]
        var module = { exports: {} }

        fn(module, module.exports, require)
        return module.exports
      }

      require('${this.entry}')
    })({${modules}})`

    console.log(bundle)

    fs.writeFileSync(outputPath, bundle, 'utf-8')
  }
}
