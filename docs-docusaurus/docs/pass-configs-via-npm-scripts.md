---
id: pass-configs-via-npm-scripts
title: 通过 npm scripts 传递配置项
sidebar_label: 通过 npm scripts 传递配置项
---

项目一般将 webpack 配置放到单独的文件中，以便进行比较复杂的定制。对于比较简单的配置，可以放到 npm scripts 中，也可以结合命令行和配置文件进行构建。

代码见 [https://github.com/lxfriday/webpack-implementation/tree/master/demo-code/pass-configs-via-npm-scripts](https://github.com/lxfriday/webpack-implementation/tree/master/demo-code/pass-configs-via-npm-scripts)

我们一般是这么用的。

```bash
webpack --config=./webpack.config.js
webpack --config=./webpack.config.js --mode=production --devtool=cheap-source-map
webpack --mode=production --color --profile
webpack src/index.js -o dist/bundle.js
```

**注意**：通过命令行传递的参数优先级比 `webpack.config.js` 配置文件的优先级高。

## --mode

`string`

设定打包模式，具体不同的模式会走不同的内部优化方式，详见[webpack-mode](webpack-mode)。

```bash
webpack --mode=production
webpack --mode=development
webpack --mode=none
```

## --devtool

`string`

指定 devtool，控制源映射文件的生成方式，常见的有 `eval`、`source-map`、`cheap-source-map`等。

## --progress

`boolean`

显示打包进度。

## --hot

`boolean`

开启 [`Hot Module Replacement`](https://webpack.js.org/concepts/hot-module-replacement)(HRM)。

## --bail

`boolean`

在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。

## --json

执行构建的时候在最后加上 `--json > stats.json` ，会在构建完成之后将构建信息输出到 `stats.json`。这个文件可以提供给分析工具进行分析，常用的有如下几个：

- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 直接作为插件使用即可进行分析
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/)
- [analyse tool](https://webpack.github.io/analyse/)

```bash
webpack --mode=production --config=./webpack.config.js --json > stats.json
```

## --watch

`boolean`

默认是 `false`，当为 `true` 时 webpack 会监听文件变更，并重新构建。在 `webpack-dev-server` `watch` 中是默认开启的。

```js
// webpack.config.js 用法
module.exports = {
  //...
  watch: true,
}
```

监听的配置项：

```js
module.exports = {
  //...
  watchOptions: {
    // 合并变更触发构建，在 300 ms 内有其他变更的时候一起执行构建（防抖）
    aggregateTimeout: 300,
    poll: 1000, // 开启轮询单位是ms（false 表示不开启）
    ignored: /node_modules/, // 忽略监听的目录
    // ['files/**/*.js', 'node_modules'], // 忽略监听的目录
  },
}
```

## --env

当 webpack 配置文件导出一个函数的时候，可以传递 `--env` 给这个函数的第一个参数。

```bash
webpack --env.production --env.platform=web    # sets env.production == true env.platform == "web"
```

```js
// webpack.config.js

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
  }
}
```

打印结果如下，函数的第二个参数就是通过命令行传递的配置，会覆盖配置文件中的对应配置项。

```
{ production: true, platform: 'web' }
{ _: [],
  cache: null,
  bail: null,
  profile: null,
  color: { level: 3, hasBasic: true, has256: true, has16m: true },
  colors: { level: 3, hasBasic: true, has256: true, has16m: true },
  env: { production: true, platform: 'web' },
  'info-verbosity': 'info',
  infoVerbosity: 'info',
  '$0': 'node_modules\\webpack\\bin\\webpack.js' }
```

`--env` 支持的语法如下

| 使用方式                                | 产生的结果 env              |
| :-------------------------------------- | :-------------------------- |
| `webpack --env prod`                    | `"prod"`                    |
| `webpack --env.prod`                    | `{ prod: true }`            |
| `webpack --env.prod=1`                  | `{ prod: 1 }`               |
| `webpack --env.prod=foo`                | `{ prod: "foo" }`           |
| `webpack --env.prod --env.min`          | `{ prod: true, min: true }` |
| `webpack --env.prod --env min`          | `[{ prod: true }, "min"]`   |
| `webpack --env.prod=foo --env.prod=bar` | `{prod: [ "foo", "bar" ]}`  |

更多的命令行参数传递见 [Command Line Interface](https://webpack.js.org/api/cli/)。
