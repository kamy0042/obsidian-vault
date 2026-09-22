---
URL: https://www.hypertextcandy.com/modularize-javascript-codes-with-webpack
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
この記事では、[Webpack](https://webpack.js.org/) を使ってレガシーな構成の JavaScript 環境にモジュールシステムを導入しリファクタリングする方法を紹介します。

実際の案件でこれからやろうとしていることです。すでに本番稼働しているアプリですので、なるべくアプリケーションコードに手を加えない方針でいこうと思います。

## Webpack とは？

[Webpack](https://webpack.js.org/) は「バンドラー」と呼ばれるツールです。日本語で「まとめてひとつにする」という意味ですが、主に **JavaScript のモジュールシステムを解決**してひとつのファイルを出力するツールです。「主に」と書いたのは他にも用途があるからですが、今回は JavaScript のモジュール解決のために利用します。

もともと JavaScript にはモジュールシステムがありませんでした。これはプログラミング言語としては欠陥と言われても仕方のない特徴でしょう。別ファイルの内容を読み取る仕組み、たとえば Java でいう import のような仕組みがなかったのです。

これでは不便なので、Node.js において[独自のモジュールシステム](https://nodejs.org/docs/latest-v10.x/api/modules.html)が実装されました。また ES2015 においても標準仕様として ES Modules（[import](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import) / [export](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export)）が策定されています。

Webpack はブラウザ側でもこれらのモジュールシステムを有効に機能させるために、あらかじめモジュール解決してブラウザから読み込むための単一のファイルを出力するツールです。

どういうことかというと…



`function Button() {
  
}

module.exports = Button;`



`const button = require('./button');`

たとえば上記2つのファイルをそれぞれ `<script>` タグで読み込まなくてもいいように1ファイルにまとめてくれるのです。HTML 側で読み込み順などを管理しなくていいのと、リクエスト回数が減るという利点がありますね。

そもそもモジュール仕様に対応できていないブラウザがあったというのも1ファイルにまとめる理由のひとつでしょう。

## リファクタリング前の構成

さて、とある案件で JavaScript 構成を引き継いでビルド方法の改善を依頼されました。

既存の構成ではモーダルやカルーセルなどのコンポーネントがそれぞれクラス（オブジェクト）に分けられてはいたのですが、モジュールシステムが導入されていませんでした。お手製のビルドツールですべてのコンポーネントファイルや外部パッケージの内容がひとつのファイルに結合され、すべてのページで読み込まれていました。

### ディレクトリ構成とコード

ディレクトリ構成はこんな感じです。



`├─ src
|  └─ js
│     ├─ modules
│     │  ├─ bootstrap.js
│     │  ├─ Carousel.js
│     │  ├─ Modal.js
│     │  └─ etc...
│     └─ main.js
├─ page-1.html
├─ page-2.html
└─ ...`

コードはあくまでイメージですが…

それぞれの UI 部品はオブジェクトに分割されています。

Carousel.js
      

`myapp.Carousel = function() {
  
};

myapp.Carousel.prototype.start = function() {
  
};`

初期化処理。

bootstrap.js
      

`myapp = {};`

すべてのオブジェクトをインスタンス化するファイル。

main.js
      

`new myapp.Carousel();
new myapp.Modal();`

これらのファイル群に加え jQuery などの外部ライブラリがぜんぶ結合されたファイルを HTML 側で読み込む仕組みです。



`<script src="/js/all.js"></script>`

### 何が良くないか

- ファイルが巨大化してロードタイムに影響を与える。
- すべてのページですべての UI 部品を読み込んでいて無駄が多い。

## Webpack を導入する

上述の構成を改善させるため、Webpack を導入します。

### インストール



`$ npm install --save-dev webpack webpack-cli`

### バンドル設定

`webpack.config.js` という設定ファイルをプロジェクトルート（`package.json` などが置かれるディレクトリ）に作成し、バンドルする際の設定を記述します。

webpack.config.js
      

`module.exports = {
  mode: 'development',
  entry: 'src/main.js'
};`

上記では `mode` と `entry` を指定しています。

項目
内容

```plain text
mode
```

バンドルモード。

```plain text
development
```

（開発用）と

```plain text
production
```

（本番用）があります。

```plain text
production
```

に設定するとコード圧縮などの最適化が得られます。

```plain text
entry
```

エントリポイントです。ここで指定したファイルから順次モジュールが解決されていきます。エントリポイントからインポートされているファイル→そのファイルからさらにインポートされているファイル…と辿って必要なファイルのみがバンドルされる仕組みです。

### 既存コード修正

`main.js` をエントリポイントとして以下のように修正します。

main.js
      

`require('./modules/bootstrap');
require('./modules/Carousel');
require('./modules/Modal');

new myapp.Carousel();
new myapp.Modal();`

本来はエクスポートしたモジュールをインポートしてきてインスタンス生成したほうがカッコいいと思いますが、既存の構成ではグローバルにオブジェクトが定義されているのでそれを活かそうとするとこんな感じでしょう。

デフォルトでは `dist` ディレクトリにファイルが出力されます。



`<script src="/dist/main.js"></script>`

出力先を変更したい場合は設定ファイルに `output` オプションを追記します。

webpack.config.js
      

`module.exports = {
  mode: 'development',
  entry: 'src/main.js',
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/js'
  }
};`

### バンドル実行

npm スクリプトを定義しておきます。

package.json
      

`"scripts": {
  "start": "webpack",
}`

以下のコマンドでバンドルが実行されます。



`$ npm run start`

ここまでで基本的な構成はできたので、機能を追加していきます。

## ファイルを圧縮したい

まずはファイルの圧縮です。前述の通り、`mode` オプションを `production` に設定すると自動的にファイルの圧縮などの最適化が得られます。しかし開発中は最適化前の内容が必要な場合もあるでしょう。そこで開発用ビルドと本番用ビルドのコマンドを分けることにします。

コマンド実行時の環境変数で開発と本番を切り分けたいですが、Windows マシンでは Mac および Linux マシンと同様には環境変数が扱えません。そこで環境差異を吸収してくれる `cross-env` パッケージをインストールします。



`$ npm install --save-dev cross-env`

npm スクリプトを以下の通り2種類用意します。

package.json
      

`"scripts": {
  "start": "cross-env NODE_ENV=development webpack",
  "build": "cross-env NODE_ENV=production webpack"
}`

設定ファイル `webpack.config.js` で環境変数を参照します。

webpack.config.js
      

`module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: 'src/main.js'
};`

以下のコマンドで圧縮された JS ファイルが出力されるでしょう。



`$ npm run build`

## ページごとに JS ファイルを出力したい

次にページごとに JS ファイルを出力します。

たとえば About ページがあるとしましょう。
以下のように `entry` オプションに2つのエントリポイントを指定します。

webpack.config.js
      

`module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: 'src/main.js',
    about: 'src/about.js'
  }
};`

About ページ用のエントリポイントのイメージです。
（main.js と異なり Carousel は読み込まれていない）

about.js
      

`require('./modules/bootstrap');
require('./modules/Modal');

new Modal();`

以下のコマンドでビルドすると、about.js も出力されているはずです。



`$ npm run start`

## 外部パッケージを利用したい

最後に外部パッケージの利用です。例として jQuery を読み込む必要があるとします。

まずは npm からパッケージをダウンロードします。



`$ npm install --save-dev jquery`

エントリポイントの冒頭に以下の一行を追記します。



`window.jQuery = window.$ = require('jquery');`

これで jQuery も出力結果に含まれます。

外部パッケージのビルドはさらに最適化できます。外部パッケージのコードのみ別ファイルに出力できるのです。

以下のように `optimization.splitChunks` オプションを指定します。

webpack.config.js
      

`module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: 'src/main.js',
    about: 'src/about.js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  }
};`

`name` オプションは出力ファイル名です。`chunks` オプションには `initial`, `async`, `all` の3種類の値を指定できます。`async` を指定すれば非同期でインポートしたパッケージのみが別出し対象になりますが、今回は同期的なインポートのみなので `initial` を指定しています。

より詳しくは[マニュアル](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks)を参照してください。

最適化しない場合はページごとに出力したすべての JS ファイルに外部パッケージのコードが含まれます。それでは共通部分が多いにも関わらずファイル名が異なるのでブラウザキャッシュが効かず、毎回 jQuery などの外部パッケージのコードを含めたサイズの JS ファイルをリクエストすることになってしまいます。

外部パッケージのみ別ファイルにすることでブラウザキャッシュを有効活用できるでしょう。

例
      

`<script src="/dist/js/vendor.js"></script><script src="/dist/js/page.js"></script>`

## Gulp を使う場合

おまけで Gulp から Webpack のバンドル処理を呼びだす場合の gulpfile も載せておきます。

[webpack-stream](https://github.com/shama/webpack-stream)　というプラグインを使用します。また[複数のエントリポイント](https://github.com/shama/webpack-stream#multiple-entry-points)に対応するために vinyl-named プラグインも必要らしいです。



`$ npm install --save-dev gulp webpack-stream vinyl-named`

`gulpfile.js` はこんな感じです。

gulpfile.js
      

`const gulp = require('gulp');
const gulpWebpack = require('webpack-stream');
const named = require('vinyl-named');

const webpackConfig = {
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  }
};

function scripts() {
  return gulp.src(['src/main.js', 'src/about.js'])
    .pipe(named())
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('dist/js'));
}

exports.default = scripts;`

以上、モジュールシステムが入っていないプロジェクトに、なるべくアプリケーションコードに手を加えない形で Webpack を導入する方法を紹介しました。