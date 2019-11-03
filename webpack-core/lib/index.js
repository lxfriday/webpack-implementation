const Compiler = require('./compiler')
const simplepack = require('../minipack.config')

new Compiler(simplepack).run()
