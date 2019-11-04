# webpack 配置项一览

方式 1：导出一个对象

```js
module.exports = {
  mode,
  entry,
  output,
  module,
  devtool,
  resolve,
  plugins,
  target,
  stats,
  devServer,
  context,
  performance,
}
```

方式 2：导出一个函数

```js
module.exports = (env, webpackcfg) => {
  return {
    mode,
    entry,
    output,
    module,
    devtool,
    resolve,
    plugins,
    target,
    stats,
    devServer,
    context,
    performance,
  }
}
```
