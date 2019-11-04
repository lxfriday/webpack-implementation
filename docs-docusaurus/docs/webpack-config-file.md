# webpack 配置文件

webpack 配置文件可以导出一个对象、函数或者数组，比较常用的是导出一个对象或者函数。

## 导出一个对象

```js
module.exports = {
  mode,
  entry,
  output,
}
```

## 导出一个函数

函数的返回值可以是一个对象，也可以是一个 Promise。

```js
module.exports = (env, webpackCfg) => {
  return {
    mode,
    entry,
    output,
  }
}
```

函数有两个参数，第一个参数是 `env`，表示**环境**，第二个参数是通过命令行传递的参数配置。

指定环境的内容可以通过 `--env.name=lxfriday` 或者 `--env.prod` 的形式来指定，两者同时使用形成的结果如下。

```js
{ prod: true, name: 'lxfriday' }
```

我们运行 `webpack --mode=development --devtool=source-map --env.prod`，打印函数的 `arguments` 如下。`--env.prod` 会在 `env` 添加对应的字段。

```js
;[
  { prod: true },
  {
    _: [],
    cache: null,
    bail: null,
    color: { level: 3, hasBasic: true, has256: true, has16m: true },
    colors: { level: 3, hasBasic: true, has256: true, has16m: true },
    mode: 'development',
    devtool: 'source-map',
    env: { prod: true },
    'info-verbosity': 'info',
    infoVerbosity: 'info',
    $0: 'node_modules\\webpack\\bin\\webpack.js',
  },
]
```

## 导出一个数组

当需要执行多个构建任务的时候，可以将配置写在数组中，webpack 会依次构建。

```js
module.exports = [
  {
    mode,
    entry,
    output,
  },
  {
    mode,
    entry,
    output,
  },
]
```
