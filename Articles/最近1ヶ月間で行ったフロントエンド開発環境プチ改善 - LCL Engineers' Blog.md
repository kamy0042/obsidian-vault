---
URL: https://techblog.lclco.com/entry/2019/02/14/134057
Updated: 2021-01-15T19:57:00
Created: 2021-01-15T18:10:00
Tags: [topic/技術/ビルドツール]
---
フロントエンドエンジニアの岡田です。
今日は、最近1ヶ月間に行った、フロントエンド開発環境のプチ改善についてお伝えします。
すべてLCLが運営する[バス比較なび](https://www.bushikaku.net/)の改善です。

## webpack-mergeパッケージ導入

以前はWebpackの設定ファイルを2つに分けていました。

- webpack.config.js → ローカル開発環境用
- webpack-production.config.js → 開発・本番サーバー用

この2つのファイルは重複する部分が多かったため、以下の問題がありました。

- 片方の更新を忘れる（特に開発・本番サーバー用）
- ファイル内に以下のようなコメントがあってイマイチ

```plain text
  // ★★★★★ 重要 ★★★★★   
  // 以下の部分は、webpack-production.config.jsと同一にしておくこと   
  entry: {
    ・
    ・
    省略
    ・
    ・
  },
  // ★★★★★ 重要 ★★★★★    
  // webpack-production.config.jsと同一にしておく部分ここまで

```

そこで、webpack-mergeパッケージを導入しました。
このパッケージを使うと、重複部分を別のファイルにしてそれぞれのファイルから呼び出せます。

設定については以下の記事を参考にさせていただきました。

[webpackで開発用/本番用の設定を分ける - Qiita](https://qiita.com/teinen_qiita/items/4e828ac30221efb624e1#webpack%E3%81%AE%E3%83%99%E3%82%B9%E3%83%88%E3%83%97%E3%83%A9%E3%82%AF%E3%83%86%E3%82%A3%E3%82%B9)

分割後のコードは以下のとおりです。

webpack.common.js

```plain text
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // エントリーポイントのファイルの設定
  },
  output: {
    // 出力ファイルの設定
  },
};

```

webpack.dev.js

```plain text
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

 module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      // 省略
    ],
  },

   plugins: [
      // 省略
    ]
});

```

webpack.prod.js

```plain text
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

 module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      // 省略
    ],
  },
  plugins: [
      // 省略
  ],
}); 

```

スッキリ書けるようになって満足です☺

## package.jsonをプロジェクトルート直下へ移動

以前はルート直下にfrontendというディレクトリを作って、その下でNode.jsを使っていました。

```plain text
/frontend
├── node_modules
├── images
├── src
│   └── scripts       // React & ES2015ファイル
├── bs-config.js
├── package.json
├── webpack-production.config.js
└── webpack.config.js
```

2年ほどこの構成で続けてきましたが、以下の問題がありました。

- frontendディレクトリ以外のファイルを触るときに、相対指定が面倒
- 開発環境を起動するときにfrontendディレクトリへ移動するのが面倒
- 他のサービスではルート直下でNode.jsが使えるので、バス比較なびだけルールが違ってややこしい

そのため、package.jsonをルート直下に移動しました。
また、Webpackやその他設定ファイル（.babelrc, .stylelintrc, .prettierrc等）もについても同様に移動しました。

基本的にはパスを書き換えるだけでしたが、意外と更新するファイルが多かったです。

- package.json
- webpack.config.js
- .gitignore
- 開発環境起動のためのシェルスクリプト
- [webpackビルドのRakeタスク](https://techblog.lclco.com/entry/2017/04/11/080000#Precompile%E3%81%B8webpack%E3%83%93%E3%83%AB%E3%83%89%E3%81%AE%E3%83%95%E3%83%83%E3%82%AF%E3%82%92%E8%BF%BD%E5%8A%A0)
- /node_modules 以下のファイルの直接参照箇所の書き換え[react-calendar](https://www.npmjs.com/package/react-calendar)をレガシーブラウザ（Android4.x系）で使うために、intl.jsを入れる必要がありました。そこで、/node_modules/intl/locale-data/jsonp/ja.js というファイルを直接参照していました。こういうときに書き換えが発生するので、直接参照ではなく、別の方法で書いたほうが良さそうですね。

## npm audit対応

先日、[Node.js（npmも）をアップデート](https://techblog.lclco.com/entry/2019/01/10/180000)したため、npm auditが使えるようになりました。
npm auditは、npm 6から使えるようです。

npm auditについては、以下のブログを参考にさせていただきました。[【node.js】npm@6にしたらnpm auditでpackageの脆弱性をチェックできるようになったメモ - tweeeetyのぶろぐ的めも](http://tweeeety.hateblo.jp/entry/2018/06/15/191121)

ローカルで`npm audit`を実行したところ、highが1件あったため、アップデートしました。
アップデートのコマンドも出してくれて、親切ですね。

```plain text
# Run  npm install react-scripts@2.1.3  to resolve 1 vulnerability
SEMVER WARNING: Recommended action is a potentially breaking change
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ High          │ Missing Origin Validation                                    │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ webpack-dev-server                                           │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ react-scripts                                                │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ react-scripts > webpack-dev-server                           │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://nodesecurity.io/advisories/725                       │
└───────────────┴──────────────────────────────────────────────────────────────┘
```

react-scriptsは、[react-google-maps](https://github.com/tomchentw/react-google-maps)を使うために必要だったので入れています。
引き続き使うため、表示されたコマンドでアップデートしました。

`npm install react-scripts@2.1.3`

その後、`npm run build`したところ以下のエラーが出ました。

```plain text
ERROR in ./node_modules/react-google-maps/lib/index.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: Couldn't find preset "env" relative to directory "/プロジェクトパス/node_modules/react-google-maps"
    at /プロジェクトパス/node_modules/babel-core/lib/transformation/file/options/option-manager.js:293:19
    at Array.map (<anonymous>)
以下省略
```

/node_modules/react-google-maps/package.json 中に以下のような記述がありましたが、babel-preset-envを入れていなかったのでエラーになっているようでした。

```plain text
  "babel": {
    "plugins": [
      "lodash",
      "transform-class-properties",
      "transform-object-rest-spread",
      "transform-runtime"
    ],
    "presets": [
      [
        "env",
        {
          "targets": {
            "ie": 9
          }
        }
      ],
      "react"
    ]
  },
  "bugs": {
    "url": "https://github.com/tomchentw/react-google-maps/issues"
  },

```

そこで、`babel-preset-env`をインストールしたところ、エラーも消えて画面も正常に動作するようになりました。

## 感想

ずっと気になっていたプチ改善ができてスッキリしました。
開発環境周りは、なるべくストレスなく使える環境にしておきたいので、今後も定期的に見直していこうと思います。