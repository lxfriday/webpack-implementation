---
id: webpack-entry
title: entry 输入项配置
sidebar_label: entry 输入项配置
---

entry 表示 webpack 打包的入口文件，配置比较灵活，可以使用字符串、数组、对象。

代码见 [https://github.com/lxfriday/webpack-implementation/tree/master/demo-code/webpack-entry](https://github.com/lxfriday/webpack-implementation/tree/master/demo-code/webpack-entry)

建议配置 `context` 属性，它表示当前的上下文，使用相对路径时会有影响，如果都是使用绝对路径则可以忽略。

```js
const path = require('path')

module.exports = {
  // ...
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
}
```

## 用法

```js
// 字符串入口
entry: './index.js'

// 数组入口
entry: ['./index.js', './name.js']

// 对象入口
entry: { index: './index.js', app: './app.js', name: './name.js' }

// 输出命名
output: {
  filename: '[name].js',
},
```

打包结果的命名：

**字符串和数组打包的结果默认命名为 `main.js`，对象的打包命名是对象的 [key].js，文件内容和 key 对应**

字符串入口

```
Asset      Size       Chunks         Chunk Names
main.js  3.59 KiB       0  [emitted]  main
Entrypoint main = main.js
[0] ./index.js 21 bytes {0} [built]
```

数组入口

```
Asset      Size       Chunks        Chunk Names
main.js  3.87 KiB       0  [emitted]  main
Entrypoint main = main.js
[0] multi ./index.js ./app.js ./name.js 52 bytes {0} [built]
[1] ./index.js 21 bytes {0} [built]
[2] ./app.js 0 bytes {0} [built]
[3] ./name.js 0 bytes {0} [built]
```

对象入口

```
Asset      Size       Chunks         Chunk Names
  app.js  3.58 KiB       1  [emitted]  app
index.js  3.59 KiB       0  [emitted]  index
 name.js  3.58 KiB       2  [emitted]  name
Entrypoint index = index.js
Entrypoint app = app.js
Entrypoint name = name.js
[0] ./index.js 21 bytes {0} [built]
[1] ./app.js 0 bytes {1} [built]
[2] ./name.js 0 bytes {2} [built]
```
