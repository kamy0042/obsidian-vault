---
URL: https://qiita.com/tonkotsuboy_com/items/2d4f3862e6d05dc0bea1
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
webpackは複数ファイルのJavaScriptファイルやCSS、画像ファイルをモジュールとして取り扱う為の人気のツールです。2018年7月時点の最新バージョンは4.16（いちろく、ではなくじゅうろく）です。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F67884%2Facd3561d-b779-94a6-5ca0-2c966cadf44f.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=3b2f211f4623a50c2a9d2d827a04167e)

webpackはJavaScriptのモジュールの取り扱いに特に便利で、機能ごとに分割したJavaScriptを`import()`や`require()`を使って読み込めるようになります。**ビルドツール**[**Gulp**](http://gulpjs.com/)**と組み合わせれば、大規模なプロジェクトでも見通しのよいタスクを定義可能です**。

webpack 4をGulpで使用するには一工夫が必要なので、本エントリーで紹介します。

なお、webpackについて詳しくは記事「[最新版で学ぶwebpack 4.8入門 - JavaScriptのモジュールバンドラ - ICS MEDIA](https://ics.media/entry/12140)」を参照ください。

# 環境準備

Gulpの詳しい導入方法や使い方については記事「[絶対つまずかないGulp入門。インストールからSassのコンパイルまで](https://ics.media/entry/3290)」を参照してください。以下、Gulpを導入済みの環境として説明します。

プロジェクトフォルダに移動し、プロジェクトの初期設定を行います。

プロジェクトの初期設定

`npm init -y`

webpackをGulpで使うための必要なパッケージは下記です。

- [gulp](https://www.npmjs.com/package/gulp)：Gulp本体です
- [webpack](https://www.npmjs.com/package/webpack)：webpack本体です。最新バージョン4がインストールされます(※1)。
- [webpack-stream](https://www.npmjs.com/package/webpack-stream)：webpackをgulpで使用する為のプラグインです(※2)。

※1 webpackをCLIで使う場合は[webpack-cli](https://www.npmjs.com/package/webpack-cli)が必要ですが、Gulp経由で使用する場合は不要です。
※2 Gulpでwebpackを使用するためのプラグインとして[gulp-webpack](https://www.npmjs.com/package/gulp-webpack)もありますが、こちらは数年メンテナンスされていません。

次のコマンドを用いて、各プラグインをインストールします。`i`や`-D`を使ったコマンドの省略、複数プラグインの同時インストールについて不明な点があれば記事「[GulpやSassを使う時に覚えて幸せになったnpmの便利な使い方](http://qiita.com/tonkotsuboy_com/items/32b56eef5c8114cae43c)」を参照ください。

必要プラグインのインストール

`npm i -D gulp webpack webpack-stream`

# フォルダ構成

次のようにファイルを配置します。

`├── gulpfile.js   (Gulpのタスクを記述するファイル)
├── package.json
├── src           (サンプルとなるJavaScriptモジュール群)
│   ├── main.js
│   └── sub.js
└── webpack.config.js  (webpackの設定ファイル)`

# サンプルのJavaScriptファイル

webpackの動作確認のため、下記のJavaScriptモジュールを用います。`main.js`より`sub.js`のメソッドを実行する例です。

main.js

`// sub.jsファイルを読み込む
import {hello} from "./sub";

// sub.jsに定義されたJavaScriptを実行する
hello();`

sub.js

`export function hello() {
  alert("helloメソッドが実行された。");
}`

# webpackの設定ファイル

webpackの設定は、`webpack.config.js`にて行います。各設定の意味については、「[最新版で学ぶwebpack門 - JavaScriptのモジュールバンドラ - ICS MEDIA](https://ics.media/entry/12140)」を参照ください。

webpack.config.js

`module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  // メインのJS
  entry: "./src/main.js",
  // 出力ファイル
  output: {
    filename: "bundle.js"
  }
}`

# Gulpのタスク定義

Gulpとwebpackを用いて、JavaScriptのモジュールを解決する為のタスクを定義します。

gulpfile.js

`// 必要プラグインの読み込み (var gulp = ~ でも可)
const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

// タスクの定義。 ()=> の部分はfunction() でも可
gulp.task("default", () => {
  // ☆ webpackStreamの第2引数にwebpackを渡す☆
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dist"));
});`

ポイントとなるのは`**webpackStream()**`**の第2引数に**`**webpack**`**を渡すことです**。

# タスクの実行

次のコマンドでGulpのタスクを実行します(※ `npx` コマンドについては記事「[npm 5.2.0の新機能！ 「npx」でローカルパッケージを手軽に実行しよう](http://qiita.com/tonkotsuboy_com/items/8227f5993769c3df533d)」を参考にしてください)。

コマンドライン

`npx gulp`

コマンドラインの出力を見ると、webpack 4が使われていることがわdかります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F67884%2F5175cc1e-bc54-2104-7d05-a757de317531.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=d6d2e3b050e249a7b57260a32eef21b2)

# 最後に

webpackがあればGulpは不要という声もよく聞きますが、個人的にはJavaScriptのモジュール解決のみにwebpackを用い、その他はGulpでタスクを定義すると見通しよくタスクを定義できるというメリットもあります。どちらか一方を使うのではなく、それぞれのメリットを吟味しながら、最適なタスク定義を行いましょう。

## 連載一覧

## - ECMAScript 2015+編

### Gulpの解説についてはこちら

- [Gulp入門 - Schoo](https://schoo.jp/class/3570)
- [絶対つまずかないGulp入門。インストールからSassのコンパイルまで - ICS MEDIA](https://ics.media/entry/3290)