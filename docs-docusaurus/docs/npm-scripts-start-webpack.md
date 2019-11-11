---
id: npm-scripts-start-webpack
title: 通过 npm scripts 启动 webpack
sidebar_label: 通过 npm scripts 启动 webpack
---

这篇介绍怎么通过 npm scripts 启动 webpack 进行构建。

代码见 [https://github.com/lxfriday/webpack-implementation/tree/master/demo-code/npm-scripts-start-webpack](https://github.com/lxfriday/webpack-implementation/tree/master/demo-code/npm-scripts-start-webpack)

首先在项目中安装 `webpack` `webpack-cli`，这两者缺一不可。

```bash
yarn add webpack webpack-cli -D
```

or

```bash
npm i webpack webpack-cli -D
```

然后编写一个入口文件。

```js
// index.js
console.log('hello world')
```

建立一个文件夹 `build`，作为构建产物的存放文件夹，再创建一个 html 文件来加载生成的 js 文件。

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>HELLO</title>
  </head>
  <body>
    npm-scripts-start-webpack
    <script src="bundle.js"></script>
  </body>
</html>
```

下面开始编写 webpack 配置文件， 在项目目录下创建 `webpack.config.js`，webpack 默认会加载 `package.json` 同级目录下的这个文件。

```js
// webpack.config.js
const path = require('path')

// 方便获取项目目录下的文件夹和文件
const getPath = p => path.resolve(__dirname, p)

module.exports = function() {
  return {
    mode: 'development', // mode 为 development 可以查看打包出来的代码, production 打包出来的代码经过压缩优化
    entry: getPath('index.js'), // 入口文件
    output: {
      filename: 'bundle.js', // 打包出来的文件
      path: getPath('build'), // 打包的代码存放的目录
    },
  }
}
```

然后修改 `package.json`，在 scripts 下新增 `"compile": "webpack"`。

```diff
{
  "scripts": {
+    "compile": "webpack"
  }
}
```

最后执行 `yarn compile`，打包结果如下。

```
Hash: af012f9402c6b3156cee
Version: webpack 4.41.2
Time: 111ms
Built at: 2019-11-11 1:16:09 PM
    Asset      Size  Chunks             Chunk Names
bundle.js  3.79 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./index.js] 39 bytes {main} [built]
Done in 1.44s.
```

这时候，打开 `build/bundle.js` 即可查看打包出来的代码。在浏览器中打开 `index.html` 在控制台中看到打印出来的 `hello world` 时表示构建成功了。

构建出来的代码（部分）

```js
// 最后面

  /******/ {
    /***/ './index.js':
      /*!******************!*\
  !*** ./index.js ***!
  \******************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval("// index.js\nconsole.log('hello world')\n\n\n//# sourceURL=webpack:///./index.js?")

        /***/
      },

    /******/
  }
```
