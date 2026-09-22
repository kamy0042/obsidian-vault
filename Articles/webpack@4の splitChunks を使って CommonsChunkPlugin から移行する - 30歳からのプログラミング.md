---
URL: https://numb86-tech.hatenablog.com/entry/2018/03/15/202252
Updated: 2021-11-06T22:49:00
Created: 2021-09-03T20:53:00
Tags: [topic/技術/ビルドツール]
---
![[1552392850810796 1.bin]]

この記事では、webpackのv4で追加された`splitChunks`を使って、v4で削除された`CommonsChunkPlugin`から移行する方法を書いていく。

使っているパッケージのバージョンは以下の通り。

## CommonsChunkPlugin とは

`CommonsChunkPlugin`の説明やそれを使うメリットは、以下の記事が分かりやすい。

[webpackのCommonsChunkPluginの使い方、使い所 （webpack 4で廃止） - Qiita](https://qiita.com/soarflat/items/f8212434c4c3cb8ee00d)

簡単に言ってしまうと、複数のエントリポイントで共通のライブラリを使っている場合、それぞれのファイルに個別にバンドルするのではなく、そのライブラリだけ別のファイルとして出力する。
 そうすることで、全体のファイルサイズが小さくなる、キャッシュを活用しやすい、といったメリットを得られる。

例えば、以下のような場合。

```plain text
entry: {
  home: './src/home.js',
  about: './src/about.js',
  error: './src/error.js',
},
output: {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dest'),
},

```

この設定でビルドすると、`dest/home.js`、`dest/about.js`、`dest/error.js`の3つのファイルが出力される。
 このうち、`home`でも`about`でもReactを使っていた場合、`dest/home.js`と`dest/about.js`の両方にReactがバンドルされ、重複が発生してしまう。
 共通して使っているライブラリが増えたり、エントリポイントが増えたりしていくほど、重複によるムダも大きくなっていく。

`CommonsChunkPlugin`を使うことで、この状態を回避できる。
 例えば、共通して使っているReactは`dest/vendor.js`というファイルにバンドルしてしまうことで、`dest/home.js`と`dest/about.js`にReactがバンドルされることを防げる。

しかしwebpackのv4で`CommonsChunkPlugin`は削除されてしまった。
 v4で同じことをするためには、`splitChunks`を使う。

## ライブラリの重複

具体的な使い方を示すために、まずは`splitChunks`を使わずにビルドしてみる。

エントリポイントは先程の例と同じで、それ以外に何も設定しない。

**webpack.config.js**

```plain text
const path = require('path');

module.exports = {
  entry: {
    home: './src/home.js',
    about: './src/about.js',
    error: './src/error.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
  },
};

```

エントリポイントのファイルの内容は、それぞれ以下の通り。
 JSXを使っていないのは、BabelやらLoaderやらを使って設定項目が増えて分かりづらくなるのを避けるためで、深い意味はない。

**src/home.js**

```plain text
import React from 'react';
import ReactDOM from 'react-dom';

console.log('This is Home.');

function Home() {
  return React.createElement(
    'div',
    null,
    'home'
  );
}

ReactDOM.render(React.createElement(Home, null), document.querySelector('#app'));

```

**src/about.js**

```plain text
import React from 'react';
import ReactDOM from 'react-dom';

console.log('This is About.');

function About() {
  return React.createElement(
    'div',
    null,
    'about'
  );
}

ReactDOM.render(React.createElement(About, null), document.querySelector('#app'));

```

**src/error.js**

```plain text
console.log('This is Error.');

```

`home`と`about`の両方で、ReactとReactDOMを使っている。

この状態でビルドし、出力されたファイルをそれぞれ、以下のようなhtmlファイルで読み込む。

```plain text
<body>
    <div id="app"></div>
    <script src="./home.js"></script>
</body>

```

```plain text
├── dest
│   ├── about.html
│   ├── about.js
│   ├── error.html
│   ├── error.js
│   ├── home.html
│   └── home.js
├── package-lock.json
├── package.json
├── src
│   ├── about.js
│   ├── error.js
│   └── home.js
└── webpack.config.js
```

それぞれのhtmlファイルをブラウザで開くと、きちんと動いていることが分かる。
 だが、`dest/homs.js`と`dest/about.js`の両方にReactとReactDOMがバンドルされてしまい、ファイルサイズが大きくなってしまっている。

```plain text
   Asset       Size  Chunks             Chunk Names
error.js  578 bytes       0  [emitted]  error
about.js   96.9 KiB       1  [emitted]  about
 home.js   96.9 KiB       2  [emitted]  home
```

## splitChunks を使って重複を解消する

`splitChunks`を使うには、`webpack.config.js`に`optimization.splitChunks`を追加する。

```plain text
const path = require('path');

module.exports = {
  entry: {
    home: './src/home.js',
    about: './src/about.js',
    error: './src/error.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /react|react-dom/,
          name: "vendor",
          chunks: "initial",
          enforce: true,
        },
      },
    },
  },
};

```

[上記](http://d.hatena.ne.jp/keyword/%BE%E5%B5%AD)の設定だと、`react`と`react-dom`は`dest/vendor.js`にバンドルされて出力され、`dest/home.js`と`dest/about.js`には含まれなくなる。

その結果、全体のファイルサイズが小さくなっていることが分かる。

```plain text
    Asset       Size  Chunks             Chunk Names
vendor.js   93.1 KiB       0  [emitted]  vendor
 error.js  578 bytes       1  [emitted]  error
 about.js   4.46 KiB       2  [emitted]  about
  home.js   4.46 KiB       3  [emitted]  home
```

それぞれのhtmlで`dest/vendor.js`も読み込むようにすることを忘れずに行う。

```plain text
<body>
    <div id="app"></div>
    <script src="./vendor.js"></script>
    <script src="./home.js"></script>
</body>

```

```plain text
<body>
    <div id="app"></div>
    <script src="./vendor.js"></script>
    <script src="./about.js"></script>
</body>

```

どちらのページでも同じ`dest/vendor.js`を読み込んでいるからキャッシュが効くし、ライブラリをまとめた`vendor.js`の更新頻度は`home.js`や`about.js`よりも多くないはずなので、そういった意味でもキャッシュの恩恵を受けやすい。

## 参考資料