(function(modules) {
      function require (id){
        var fn = modules[id]
        var module = { exports: {} }

        fn(module, module.exports, require)
        return module.exports
      }

      require('C:\Users\liu32\code\test\webpack-20191103\webpack-core\src\index.js')
    })({'C:\Users\liu32\code\test\webpack-20191103\webpack-core\src\index.js': function (module, exports, require) { "use strict";

var _greeting = require("./greeting.js");

(0, _greeting.greeting)(); },
'./greeting.js': function (module, exports, require) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

var _name = require("./name.js");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function greeting() {
  console.log('hello', _name2.default);
} },
'./name.js': function (module, exports, require) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '云影'; },
})