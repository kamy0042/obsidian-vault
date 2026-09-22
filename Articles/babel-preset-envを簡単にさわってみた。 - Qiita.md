---
URL: https://qiita.com/ryuone/items/13f5d450c3865709ba10
Updated: 2021-01-15T17:59:00
Created: 2021-01-15T17:59:00
Tags: [topic/技術/ビルドツール]
---
最近、babel-preset-envなる物を知ったので、どんな物なのかを調べてみました。
知ったきっかけは、

> babel-preset-env楽— よこた (@yokotak0527) 2016年11月25日

です。あと、

> babel-preset-env is 1.0! New `useBuiltIns` option as suggested by @keyanzhang + electron support by @paulcbettshttps://t.co/L3ygdLljVT pic.twitter.com/XCjaVkHLps— Henry Zhu (@left_pad) 2016年12月9日

`babel-preset-env is 1.0!`とアナウンスが流れてきたので、使ってみたいなーと思ったしだいです。

# Babelとは

ES2015,ES2016などの新しいJavaScriptの規格(文法や機能)に対応していないブラウザでも使えるように、昔の文法に変換してくれるライブラリです。

# babel-preset-envとは

[babel/babel-preset-env](https://github.com/babel/babel-preset-env)をみていただくのが一番いいのですが、

> Babel preset that automatically determines the the Babel plugins you need based on your supported environments. Uses compat-table

と書かれています。
要するに、[compat-table](https://github.com/kangax/compat-table)([ECMAScript 6 compatibility table](https://kangax.github.io/compat-table/es6/))を用いて、サポートされている環境に基づいて必要なBabelプラグインを自動で決定するライブラリということらしいです。

# インストール

`$ npm install --save-dev babel-preset-env`

# 使い方：準備

## babel-cliのインストール

babelのコマンドを使いたいので、babel-cliをインストールします。

`$ npm install --save-dev babel-cli`

## .babelrcの作成

とりあえず、[babel/babel-preset-env](https://github.com/babel/babel-preset-env)の設定を記述。

`{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}`

# 使い方：変換1

## 変換(トランスパイル)対象のファイル(index.js)を作成する。

とりあえず簡単なプログラムを作成する。

`class A{
  constructor(name){
    this.name;
  }
  say() {
    console.log(this.name)
  }
}`

## 変換(`"browsers": ["last 2 versions", "safari >= 7"]`)

`./node_modules/.bin/babel index.js`

### 変換後のプログラム

`"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = function () {
  function A(name) {
    _classCallCheck(this, A);

    this.name;
  }

  _createClass(A, [{
    key: "say",
    value: function say() {
      console.log(this.name);
    }
  }]);

  return A;
}();`

# 使い方：変換2

## .babelrcをNodeように書き換える。

`babelrcJavaScript

{
  "presets": [
    [ "env", {
      "targets": {
        "node": "current"
      }
    } ]
  ]
}`

## 変換(`"node": "current"`)

`./node_modules/.bin/babel index.js`

### 変換後のプログラム

`"use strict";

class A {
  constructor(name) {
    this.name;
  }
  say() {
    console.log(this.name);
  }
}`

# まとめ

いい感じに、変換してくれて楽ですね。babel-preset-es2015とかインストール必要もないですし。
今後は、これを使っていこう。