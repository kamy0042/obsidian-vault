---
URL: https://mizchi.hatenablog.com/entry/2018/11/26/164523
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
[www.slideshare.net](https://www.slideshare.net/ssuser46977e/webpack-why-cant-you-understand-the-webpack?fbclid=IwAR13e2bvjjpYMAPQ6ftdYiUEeUsZlVGFltyU7LMN6hoA3b1tQcEm2v5BUOI)

この記事バズってたけど、わからない人がよりわからなくなる、という点で問題だと思っていて、webpack の目的の本質的な部分から整理する必要があると思います。

(あと友人が webpack に挑戦していたので入門資料も兼ねてる)

Webpack の本質的な部分は次の3つです。それ以外は全部おまけ機能だと思ってよいです。

- ES Modules のエミュレート
- node_modules のリンカ
- 拡張子ごとの変形

## Webpack が本当にやりたいこと

こういうコードがあるとします。

```plain text
// src/a.js
export default () => console.log('hello');

```

```plain text
// src/index.js
import a from './a.js'
a();

```

このコードは、今現在 [IE](http://d.hatena.ne.jp/keyword/IE) 以外のブラウザで既に実行可能ですが、[IE](http://d.hatena.ne.jp/keyword/IE) と、あと [Google](http://d.hatena.ne.jp/keyword/Google) のクローラ は Chrome41相当となっていて、実行できません。また現行のブラウザのサポートがあると言っても、とりあえず実行できるという程度で、パフォーマンスはよくありません。(ネットワーク越しに一個一個ダウンロードして依存を判明させるのを想像してみてください)

とりあえず、これを node 環境を使って実行してみましょう。

```plain text
$ npm install esm --save-dev
$ node -r esm  src/index.js
hello
```

(esm は node で import/export を有効化するおまじないと思ってください)

ブラウザで実行する際は、これらを一つのファイルに結合します。つまりこの import/export を使わない形式に書き換えた上で結合する必要があります。

```plain text
$ npm install --save-dev webpack webpack-cli
$ npm run webpack --mode development
```

これは次のようなコードを出力します。(全部読まなくていいです。雰囲気で)

```plain text
/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId]) {
/******/            return installedModules[moduleId].exports;
/******/        }
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // define getter function for harmony exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/        }
/******/    };
/******/
/******/    // define __esModule on exports
/******/    __webpack_require__.r = function(exports) {
/******/        if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/        }
/******/        Object.defineProperty(exports, '__esModule', { value: true });
/******/    };
/******/
/******/    // create a fake namespace object
/******/    // mode & 1: value is a module id, require it
/******/    // mode & 2: merge all properties of value into the ns
/******/    // mode & 4: return value when already ns object
/******/    // mode & 8|1: behave like require
/******/    __webpack_require__.t = function(value, mode) {
/******/        if(mode & 1) value = __webpack_require__(value);
/******/        if(mode & 8) return value;
/******/        if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/        var ns = Object.create(null);
/******/        __webpack_require__.r(ns);
/******/        Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/        if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/        return ns;
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => console.log('hello'));\n\n\n//# sourceURL=webpack:///./src/a.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a.js */ \"./src/a.js\");\n\nObject(_a_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
```

前半のコメント付きの部分が webpack 自体のランタイムで、あとは `__webpack_require__` によって、単なるパスとそれに対応する辞書が組み立てられ、素朴な関数として実行されているのがわかります。

webpack は本当に、ただこの結合をやりたいだけ、というライブラリです。

(ここで一つ暗黙的な知識を使っていて、無設定の webpack は `src/index.js` を `dist/main.js` に[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)するようになっています)

## node_modules の解決

上の例は素朴な[相対パス](http://d.hatena.ne.jp/keyword/%C1%EA%C2%D0%A5%D1%A5%B9)の解決でしたが、これだけだと、例えば lodash みたいなnode_modulesから参照するライブラリは解決できません。

node の慣習だと、これは `const _ = require('lodash')` とすると、`node_modules/lodash/package.json` の `main` に指定されたモジュールが手に入りますが、webpack はこの名前解決ルールをエミュレーションしています。

index.js を次のようにします

```plain text
// npm install lodash --save してから
import { flatten } from 'lodash';
console.log(flatten([[1], [2]]));

```

```plain text
$ node -r esm src/index.js
[1, 2]
```

そうすると、ビルド済みファイルの一部がこんな感じ

```plain text
/***/ "./node_modules/lodash/lodash.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/lodash.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
// 以下実装
```

require と ESM の import/export の関係もまたややこしいのですが、とりあえず今は import/export だけ使うようにしてればいいはずです。

## transform

webpack 環境下では、実際には plane な js を書くことはなく、babel か typescript を使うことが多いと思います。babel-loader を使うと `.babelrc` を参照するし、ts-loader を使うと `tsconfig.json` を参考にします。

これを実現するのが `module.rules` で、babel を使うだけだったら単にこれだけです。

```plain text
//webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};

```

test の[正規表現](http://d.hatena.ne.jp/keyword/%C0%B5%B5%AC%C9%BD%B8%BD)でヒットした rule が、 use で指定された babel-loader を通して(その過程で `.babelrc` の設定を参照して) `.js` を変形します。

基本的には「拡張子ごとに特定のloader を通して変形する」という考え方でいいと思います。バンドラーがトランスフォームまで行うのは、これらを役割を兼ねた方がパフォーマンスがよくなり、結果としての設定も少なくなる、という webpack 以前に使われていた browserify からの伝統です。

## 細々とした最適化

webpack を使っていて、これら以外は基本的に学習者にとっての「ノイズ」に映ることと思います。具体的には、他にこのようなことをやるわけです。

- 複数のリソースから共有できるビルドステージを作る
- インメモリ上に展開
- 最終出力をどう最適化するか(uglifyjs)、どう出力パスを決定するか(webpack-manfiest-plugin)
- SPA 用のエントリポイントを生成 (html-webpack-plugin)
- [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript) 以外、 [css](http://d.hatena.ne.jp/keyword/css) を js から読み込んだり(style-loader/[css](http://d.hatena.ne.jp/keyword/css)loader), 画像を [base64](http://d.hatena.ne.jp/keyword/base64) 化したり…
- 未使用モジュールの削除

このうち、特に js 以外を扱う操作が曲者だと思っていて、「ES Modules をエミュレートしたい」というwebpack本来のスコープに含まれていません。その結果、実現方法がどれも歪です。

Webpack が嫌がられるのは、これらを覚えることでプログラミングの深淵に迫れるわけでもなければ、他に転用できる知識があるわけではない点です。単なる設定の組み合わせにすぎません。だるいですね。

## 要約

- JS を ESM に沿った形で変形/結合するのは、本来の目的に沿うので OK
- それ以外は Webpack 以外での実現も考えてはどうか

難しい(ややこしい)部分は大抵後者なので、触れずに済むならそれでいいはずです。

style-loader + [css](http://d.hatena.ne.jp/keyword/css)-loader 程度だったらライブラリのJSと協調する[CSS](http://d.hatena.ne.jp/keyword/CSS)引くのに有用だけど、これに scss や postprefixer とかはいれたくないな、というのが個人的な気持ち。

## 将来的に Webpack を捨てられるか

Webpack を捨てるのに、大きなブロッカーが3つあります

- [IE](http://d.hatena.ne.jp/keyword/IE)
- 使ってる npm モジュールが ES Modules の形式で配布されるか
- JSX/TypeScript のような拡張構文

[IE](http://d.hatena.ne.jp/keyword/IE)はまあ死んでもらうのをまつとして、[IE](http://d.hatena.ne.jp/keyword/IE)が死んだあとに素の ESModules を使えるかどうかは、使ってるライブラリ次第です。lodash や react などは一応対応していますが、現状作者側にとっても対応の敷居が高いので、対応は後回しになりがち。(rollupを使う)

むしろ、将来的に難しいのは TypeScript の問題で、最近のトレンドだと、もはや JS = TypeScript になりそうなぐらいの勢いですが、ただし当然のごとく非標準な文法なので、依存してしまうと捨てるのが難しいのではないか、という気がしています。同様の理由で非標準の JSX も厳しい気がします。

一応今tc39にプロポーザルが出ているのですが、[ジェネリクス](http://d.hatena.ne.jp/keyword/%A5%B8%A5%A7%A5%CD%A5%EA%A5%AF%A5%B9)みたいなセマンティクスの議論の余地がある文法も含んだ提案が、すんなり通るとは思えません。

[https://github.com/samuelgoto/proposal-optional-types](https://github.com/samuelgoto/proposal-optional-types)

プリ[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)一回するなら二回するのも中間生成物があるのは変わらないし、手間はそう変わらない、ということで、 Webpack + TypeScript or Babel がしばらく生き残ってしまうのではないでしょうか。

## おまけ: Parcel

webpack の [alternative](http://d.hatena.ne.jp/keyword/alternative) として parcel があります。

[https://github.com/parcel-bundler/parcel](https://github.com/parcel-bundler/parcel)

webpack ユーザー的な解釈だと、便利なデフォルト設定集なんですが、実際には webpack の慣習やお気持ちに深く精通して初めて parcel の挙動が理解できる、という感じが強いです。
その結果 webpack を完全に理解した仙人なら設定をサボるのに parcel を使うことが出来る、という状態になっています。勉強したくないからこれで！とやると、おそらく何が起こるのか、その理由がまったくわからなくなって、結果的に辛い感じになると思います。