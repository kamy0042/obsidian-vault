---
Created: 2021-01-15T18:10:00
URL: https://techblog.lclco.com/entry/2017/01/25/090921
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
フロントエンドエンジニアの岡田です。
昨年末に、弊社のサービス：夜行バス比較なびの一部分をReactで書き換えました。

[www.bushikaku.net](http://www.bushikaku.net/)

夜行バス比較なびのJavaScriptは、構築から3年以上たつこともあり、コードの見通しが悪くなってきています。
リグレッションテストなども導入しながら、不具合が起きないように努めてはいますが、テストに時間がかかりすぎるなどの問題がありました。

[techblog.lclco.com](http://techblog.lclco.com/entry/2017/01/02/204804)

そこで今回、Reactを導入して、リファクタリングをしました。
いろいろつまずくところもあったので、この記事では、夜行バス比較なびでどうやってReactを使っているかをご紹介します。
SPAサイトの事例はけっこうありますが、運用中のサイトの一部にだけReactを導入、という事例はあまりなさそうなので参考になれば幸いです。

# 環境

以下の組み合わせで使っています。
Webpack + babel + ESLint（Airbnb）+ imagemin（画像圧縮）+ browser-sync

webpackの環境は、各自の開発PC（Mac）につくります。
もともとRailsのsprocketsを使っていたため、React化（ES2015化）完了までは今まで通りsprockets を使うことにしました。
つまり、Webpackで書き出したファイルを、sprocketsで管理しているディレクトリ以下へコミットしてしまいます。
（良い方法ではないと思いますが、サーバーにnode.jsの環境を作るまでのつなぎです。）

## Webpackの設定

### webpack.config.js（開発中に使用）

```plain text
// 画像圧縮
const imagemin = require('imagemin');
const imageminOptipng = require('imagemin-optipng');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');

imagemin(['images/**/*.{gif,jpg,png}'], '../public/images', {
    plugins: [
        imageminGifsicle(),
        imageminMozjpeg(),
        imageminOptipng(),
    ]
}).then(files => {
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});

// エントリーポイントの設定
module.exports = {
  entry: {
    // PC用エントリーポイント
    'es/pc/es2015': './src/scripts/entry/navi/pc.jsx',
    // SP用エントリーポイント
    'es/sp/es2015': './src/scripts/entry/navi/sp.jsx',
  },
  output: {
    // 出力ファイルのベースとなる階層
    // 例：PCは/app/assets/javascripts/es/pc/es2015.js に出力される
    // 出力された /app/assets/javascripts/es/pc/es2015.js はsprocketsへ任せる
    path: '../app/assets/javascripts',
    filename: '[name].js',
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    },],
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: ['/node_modules/'],
    }
  ],
  },
  eslint: {
    configFile: './.eslintrc',
  },
};
```

### webpack-production.config.js（production buildで使用）

```plain text
const webpack = require('webpack');

module.exports = {
  entry: {
    'es/pc/es2015': './src/scripts/entry/navi/pc.jsx',
    'es/sp/es2015': './src/scripts/entry/navi/sp.jsx',
  },
  output: {
    path: '../app/assets/javascripts',
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: ['/node_modules/'],
    },],
  },
  // 以下の部分でproduction用で書き出し
  plugins: [
    new webpack.DefinePlugin({
      // process.env.NODE_ENVを'production'に置き換える
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // UglifyJsPluginの実行
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // 圧縮する時に警告を除去する
        warnings: false,
      },
    }),
  ],
};
```

最初は圧縮＆難読化もsprocketsへ任せていましたが、本番環境でJSエラーが出るため、webpackで行うことにしました。

## package.json（scripts部分のみ）

```plain text
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack --watch & browser-sync start --config ./bs-config.js",
    "build": "webpack --config webpack-production.config.js --progress"
  },
}
```

## ディレクトリ構成

```plain text
frontend
├── images
├── src
│   └── scripts
│       ├── entry       // エントリーポイントのファイルを設置
│       │   └── navi
│       │       ├── pc.jsx
│       │       └── sp.jsx
│       ├── component     // ページをまたいで使うパーツを設置（js, jsx）
│       │   ├── common
│       │   │   └── xxxxxxxx.js
│       │   └── pc
│       │       └── { コンポーネント名 }
│       │           ├── xxxxxxxx.jsx
│       │           └── xxxxxxxx.jsx
│       ├── page       // ページごとにディレクトリを分けて設置（js, jsx）
│       │   └──  { ページ名 }
│       │       └── sp
│       │           ├── xxxxxxxx.jsx
│       │           ├── xxxxxxxx.jsx
│       │           └── xxxxxxxx.jsx
│       ├── model       // ビジネスロジック
│       │   ├── xxxxxxxx.js
│       │   └── xxxxxxxx.js
│       └── util        // 便利関数
│           ├── xxxxxxxx.js
│           └── xxxxxxxx.js
├── bs-config.js
├── package.json
├── webpack-production.config.js
└── webpack.config.js
```

- classは1ファイル1クラス
- 関数は1ファイルに複数可

## エントリーポイントの書き方

Reactを導入しているのは一部のページなので、エントリーポイントで必要な場所にrenderしたり、関数を呼び出すよう指定をします。

```plain text
// 必要なモジュールをインポート
import React from 'react';
import ReactDOM from 'react-dom';
import History from '../../component/pc/history/History.jsx';

// ページごとに実行する関数や読み込むコンポーネントを指定

if (document.getElementById('history-result')) {
  ReactDOM.render(
    <History />, document.getElementById('history-result'));
}

```

ちなみにスマホサイトについては、jsのファイルの容量が増えることによりパフォーマンスに影響を与える可能性があるため、現時点では対象ページのみReact & ES2015ファイルを読み込んでいます。

# 今後の課題

まだ手探りで進めていて、今後も順次置き換え・リリース予定です。
今のところ課題は以下のとおりです。

- メインとなる検索結果ページは、Ajaxでできていることもありjsのコード量が特に多いので、どのようにReact化を進めるか（分割して進められるのか？）
- リリースフローの見直し（production buildはサーバーへ任せたい）

これらもまた解決したらご報告したいと思います。