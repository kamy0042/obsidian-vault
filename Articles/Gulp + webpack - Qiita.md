---
URL: https://qiita.com/1221221221/items/9442697ae9a6950db87d
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
[https://qiita.com/tonkotsuboy_com/items/2d4f3862e6d05dc0bea1](https://qiita.com/tonkotsuboy_com/items/2d4f3862e6d05dc0bea1)

この記事が神すぎたので、これをベースに自分用の備忘録にしました。
感謝しかないです。

## webpackとは

jsを一つのファイルとしてまとめることが可能[https://qiita.com/kamykn/items/45fb4690ace32216ca25](https://qiita.com/kamykn/items/45fb4690ace32216ca25)

## 事前にやっておくこと

### ①任意の名前のフォルダを作成

今回はmyprojectというフォルダにする。

### ②このプロジェクトに対し、gulp導入まで済ませておく

導入手順は[こちらの記事](https://qiita.com/1221221221/items/cb7205ac2d21feed3243)を参照

## 手順

### ①3つのプラグインのインストール

- gulp : Gulp本体
- webpack：webpack本体
- webpack-stream：webpackをgulpで使用するためのプラグイン

コマンドに以下を入力→Enter

`npm i -D gulp webpack webpack-stream`

### ②フォルダを作成

`myproject
├── gulpfile.js   (Gulpのタスクを記述するファイル)
├── package.json
├── src           (サンプルとなるJavaScriptモジュール群)
│   ├── main.js
│   └── sub.js
└── webpack.config.js  (webpackの設定ファイル)`

※webpack.config.jsはエディターから手動で作成してok

### ③main.js及びsub.jsに以下を記入

main.js

`// sub.jsファイルを読み込む
import {hello} from "./sub";

// sub.jsに定義されたJavaScriptを実行する
hello();`

sub.js

`export function hello() {
  alert("helloメソッドが実行された。");
}`

### ④webpack.config.jsに以下を記入

コマンドに以下を入力→Enter

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

### ④gulpfile.jsに以下を記入に以下を記入

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

⑤taskの実行

`npx gulp`

### 参考記事はこちら

[https://qiita.com/tonkotsuboy_com/items/2d4f3862e6d05dc0bea1](https://qiita.com/tonkotsuboy_com/items/2d4f3862e6d05dc0bea1)[https://qiita.com/bakira/items/3c4e2d10aae085767817](https://qiita.com/bakira/items/3c4e2d10aae085767817)[https://qiita.com/kamykn/items/45fb4690ace32216ca25](https://qiita.com/kamykn/items/45fb4690ace32216ca25)