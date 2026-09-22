---
URL: https://www.webprofessional.jp/javascript-modules-bundling-transpiling/
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
Browserify、Webpackなど、ここ数年耳にするようになったフロントエンド開発ツール。結局何をやってるの？　いまどきのフロントエンド開発者になるために欠かせない、JavaScriptのモジュール管理についての少し長いまとめ。

本記事は[Dan Prince](http://www.sitepoint.com/author/dprince)と[Ravi Kiran](http://www.sitepoint.com/author/rkiran/)が査読を担当しています。最高のコンテンツに仕上げるために尽力してくれたSitePointの査読担当者のみなさんに感謝します。

開発者はモジュール、依存関係の管理、最新のプログラミング言語の基本的要件の動的ロードについて考えています。重要ないくつかの機能は、2015年にJavaScriptに追加されたものです。

モジュールはNode.jsで広く使われていますが、この記事ではモジュールをブラウザーで使う方法について焦点をあてていきます。少し過去を振り返り、混乱しがちな現在の状況までの歩みを紹介しながら、将来の見通しを立て、BrowserifyやWebpack、jspmなど重要になってきているJavaScript向けのモジュール群について学んでいきましょう。

最後に、これらのツールをCoffeeScripやTypeScript、Babelなどのトランスパイラー（トランスコンパイラー）と組み合わせて使う方法を説明します。

## **モジュールの歩み**

JavaScriptは1995年に登場し、モジュールをネイティブでサポートしているブラウザーはいまだありません。Node.jsとCommonJSは2009年に開発され、大半のnpmパッケージでCommonJSが使われています。

Browserifyは2011年にリリースされた、すべての必要なオブジェクトを1つのJavaScriptファイルにまとめるツールです。クライアントサイドのJavaScriptでnpmパッケージを**require**で読み込ませるために、CommonJSを採用しました。

## 従来の方法

jQueryなどのライブラリーはグローバルスコープか**window**に**$**を追加します。

```plain text
window.$ = function() { ... };
```

ライブラリーを指定するスクリプトを記述し、グローバルオブジェクトを使います。

```plain text
<script src="jquery.js"></script>
<script>
$(function() { ... });
</script>

```

それぞれのアプリケーションコードはグローバルスコープが汚くなるのを防ぐために、**App**のようなグローバル領域で名前空間が定義されるのが一般的でした。そうしないと、名前が衝突し動作しなくなる以前に、名前が長すぎるのです。

```plain text
var App = {};
App.Models = {};
App.Models.Note = function() {};

```

### これからの方法

ライブラリーは共通のモジュール形式（ES6モジュール）でオブジェクトをエクスポートします。

```plain text
export default function $() { ... }

```

モジュールをローカルスコープにインポートして使います。

```plain text
import $ from 'jquery';

$(function() { ... });

```

- グローバル領域が不要
- 独立性の高いソースコード
- npmへのアクセス
- アプリケーションコード特有の名前空間は不要
- 必要なときにいつでもモジュールを動的にロード

### **現在の状況**

本当に複雑です。あちこちで以下のようなさまざまなモジュールが使われています。

- [CommonJS](http://wiki.commonjs.org/wiki/Modules)
- [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
- [UMD](https://github.com/umdjs/umd)
- [ES6 Modules](http://www.2ality.com/2014/09/es6-modules-final.html#an_overview_of_the_es6_module_syntax)

以下のようなさまざまな形、サイズのアセットをまとめる（バンドリング）ツールがあります。

それから、多くの人が使いたいと思っているトランスパイラもあります。

さらに、モジュールの動的ロードができる、さまざまなライブラリーもあります。

- [Require.js](http://requirejs.org/)
- [System.js](https://github.com/systemjs/systemjs)

書き連ねたものは、現在使われている人気ツールのほんの一部です。初心者だけでなく専門家でもまだ分からないことが多々あります。また[トランスパイルの代価](https://github.com/samccone/The-cost-of-transpiling-es2015-in-2016)として、たくさんのツールを組み合わせて使うと、結果が異なるという点も注目されています。

## **2016年のツールをまとめて整理しよう**

フロントエンドの開発者はかなり長い間ビルドツールを使用してきましたが、ビルドステップが正規に使われ始めたのはこの2、3年です。SassやCoffeeScriptなどのツールは前処理を主流にしましたが、今やES6には回りを巻き込む勢いがあります。

> JavaScript community made some great improvements in 2015, but we need to consolidate tooling in 2016.https://t.co/HGrLjiSQhb— Nicolás Bevacqua (@nzgb) January 8, 2016

このツイートの通りです。

ここ数年、GulpとGruntが人気を集めているのは、アセットを流し込むときに一連の変換ができるからです。多くの人々はnpmのツールをそのまま使っていますが、GulpやGruntは高く評価されていて人気があります。詳しくは「[Why I Left Gulp and Grunt for npm Scripts（npmスクリプトにGulpとGruntを使う理由）](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8)」と「[Give Grunt the Boot! A Guide to Using npm as a Build Tool（ビルドツールとして使うnpmガイド）](http://www.sitepoint.com/guide-to-npm-as-a-build-tool/)」をご覧ください。

個人的には、アセットパイプラインの構築が長くなることについては気にしていません。私が求めているのは、必要なときに最新のツールを使うことができる最小限の構成ツールです。たとえばSassやAutoprefixer、Babel、Coffeescriptなどの、実装、構成、トランスパイル中も安心できる、適切なモジュールシステムやローダーです。要するに、個々の開発者がアセットパイプラインの作成に何年もかけて、たくさんの人が同時に改造に挑んでいるという状況には、無駄な時間が多く費やされていると思うのです。

コミュニティはBrowserify、Webpack、jspm、Sprockets、Gulpなどツールごとに別れています。別れていることが問題ではありませんが、全員が前に向かって進もうとするときに混乱するのです。

## **スタート地点を明確にする**

以下が、共通認識です。

- ES2015モジュールは未来にふさわしいJavaScriptのモジュール形式です。
- Babelは現在、最適なES2015コンパイラです。
- ネイティブのローダーがブラウザーで使えるようになるにはまだ時間がかかります。Telerikのレポート「[The Future of JavaScript:2016 and Beyond（JavaScriptの今後）](http://www.telerik.com/campaigns/kendo-ui/javascript-future)」ではES2015が[モジュールローディングのハードル](https://github.com/tc39/tc39-notes/blob/master/es6/2014-09/sept-25.md#loader-pipeline)をクリアして完全にサポートするには2年以上かかると示唆しています。
- もし今モジュールを使いたいなら、どこかの時点でCommonJSを使う可能性がとても高いです。

最新の動向を知るのに欠かせないJavaScriptバンドラー、BrowserifyやWebpack、jspmを使った最小構成の設定についてみてみましょう。

### **新しいプロジェクト**

```plain text
mkdir modules-app
cd modules-app
npm init -y
npm install --save-dev browserify webpack jspm
mkdir src
touch src/{entry,lib}.js index.html
```

自分が使っているテキストエディターで**index.html**を更新します。

```plain text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Modules!</title>
</head>
<body>
  <script src="bundle.js"></script>
</body>
</html>

```

コードを動かすサーバーも必要になります。たとえば[live-server](https://www.npmjs.com/package/live-server)はライブリロード機能も備えた優れた小さなゼロコンフィグHTTPサーバーです。**npm install -g live-server**と記述してグローバルにインストールし、プロジェクトのルートから**live-server**を実行して開始します。

### **Browserify**

> すべての関係するオブジェクトをバンドルして、ブラウザーでrequire('modules') を使えるようにするのがBrowserifyです。

**src/lib.js**を開き、一番はじめのモジュールを加えます。

```plain text
var double = function(number) {
  return number * 2;
}

module.exports = {
  double: double
}

```

**src/entry.js**を開き、モジュールを**require**で読み込んで使います。

```plain text
var lib = require('./lib.js');
console.log(lib.double(2));

```

**package.json**の**scripts**部分を更新します。

```plain text
"scripts": {
  "browserify": "browserify ./src/entry.js -o ./bundle.js"
},

```

このスクリプトを**npm run browserify**で実行します。

Browserifyでプロジェクトルートの中に**bundle.js**が作成され、コンソールに**4**つのファイルが出力されているのを確認してください。Browserifyで何ができるのか、どのようにバンドルが作成されるのかについてもっと知りたい人は、egghead.ioの[ Browserify入門](https://egghead.io/lessons/nodejs-introduction-to-browserify-part-1)をお勧めします。

**おめでとうございます。**これでブラウザー上にモジュールができました。

Browserifyのメリットのもう1つは、モジュールへのアクセスと同様に、作成者がnpmにもアクセスできるという点です。lodashをインストールしてみてみましょう。

```plain text
npm install lodash --save-dev
```

**src/lib.js**を編集します。

```plain text
var sum = require('lodash/sum');

var double = function(number) {
  return number * 2;
}
var addFive = function(number) {
  return sum([number, 5]);
}

module.exports = {
  double: double,
  addFive: addFive
}

```

**src/entry.js**を編集し新しい関数**addFive**を呼び出します。

```plain text
var lib = require('./lib.js');
console.log(lib.double(2));
console.log(lib.addFive(2));

```

もう一度**npm run browserify**でバンドルを作成して、ブラウザーで**4**と**7**が表示されているのを確認します。表示されていれば、インポートが成功しlodashの**sum**関数が使用されたと分かります。

ここまでくれば、すぐにブラウザーでモジュールを使えます。最初に説明したように、以下のような多くのメリットがあります。

- グローバル領域が不要
- 独立性の高いソースコード
- npmへのアクセス
- アプリケーションコード特有の名前空間は不要

あとで、実行時にモジュールの動的ローディングをしてみましょう。

### **Webpack**

> Webpackはモジュールバンドラーです。Webpackは関係するオブジェクトでモジュールを受け取り、静的アセットを生成します。

**webpack**を呼び出すために、**package.json**に新しいスクリプトを追記します。

```plain text
"webpack": "webpack ./src/entry.js bundle.js"

```

**npm run webpack**でwebpackを実行します。

Webpackは**bundle.js**でリライトされて、ブラウザーでの出力はまったく同じになるはずです。

**npm run browserify**と**npm run webpack**を実行して、コンパイルされた**bundle.js**ファイルの違いを調べてみてください。重要なのは、これらのツールが内部でどのような働きをしたかではありません。実装方法は異なりますが、CommonJSで同じコードをどのブラウザーでも表示できる標準のJavaScriptにコンパイルするという、本質的には同じ働きをしていることです。各モジュールは**bundle.js**内の関数に入れられて、IDが指定され、必要な時に指定されたIDで読み込まれます。

Webpackの機能はまだまだあり、本当に万能なモジュールバンドラーです。Webpackは開発用の優れたツールも提供しています。たとえば、変更されたときに自動で個々のモジュールをリロードしてくれる[hot module replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack)です。このツールは[LiveReload](http://livereload.com/)と似ていますが、ページを更新しなくてモジュールが差し替えられます。

異なるアセットタイプにも使えるローダーは増えています。CSS用の**css-loader**と**style-loader**まであります。CSSをJavaScriptのバンドルにコンパイルし、実行時にページに挿入します。本題から外れましたが、もっと知りたい人は「[Webpackを使ってみよう](http://webpack.github.io/docs/tutorials/getting-started/)」をご覧ください。

## **JavaScriptトランスパイラー**

今日使われているもっとも人気のあるトランスパイラーを3つ紹介します。「[JSにコンパイルする言語](https://github.com/jashkenas/CoffeeScript/wiki/List-of-languages-that-compile-to-JS)」にはとても多くの言語がリストされていますが、紹介する3つでも使いたいものがあるかもしれません。

モジュールバンドラーと合わせたトランスパイラーの使い方の前に、ツールの使い方です。

```plain text
npm install --save-dev coffee-script typescript babel-cli babel-preset-es2015
touch src/{coffee-lib.coffee,ts-lib.ts,es6-lib.js}

```

### **CoffeeScript**

**coffee-lib.coffee**を編集します。

```plain text
sum = require 'lodash/sum'

double = (number)-> number * 2
addFive = (number)-> sum([number, 5])

module.exports =
  double: double
  addFive: addFive

```

**備考：**CoffeeScriptはモジュールを書く際、CommonJS構文を使います。

**coffee**を実行するために**package.json**にスクリプトを追加します。

```plain text
"coffee": "coffee --output ./dist ./src/coffee-lib.coffee"

```

npm run coffeeで実行します。

### **TypeScript**

**ts-lib.ts**を編集します。

```plain text
/// <reference path="lodash.d.ts" />
import * as _ from 'lodash';

const double = (value: number)=> value * 2
const addFive = (value: number)=> _.sum([value, 5])

export = {
  double,
  addFive
}

```

**備考：**TypeScriptは、ES2015モジュール構文とCommonJSを合わせたような、[特有のモジュール構文](http://www.typescriptlang.org/Handbook#modules)を使います。

**tsc**を実行するために、**package.json**にスクリプトを追記します。

```plain text
"tsc": "tsc --outDir ./dist ./src/ts-lib.ts"

```

**npm run tsc**で実行します。

コンパイラーは、TypeScriptファイルではない外部モジュールでの動かし方を把握するのに[型の定義（type definition）](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/lodash/lodash-3.10.d.ts)を必要とするので、lodashが見つからないというエラーメッセージを表示します。そこで定義ファイルを次のように呼び出します。

```plain text
cd src
curl -O https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/lodash/lodash.d.ts
cd ..
npm run tsc

```

### **Babel**

**es6-lib.js**を編集します。

```plain text
import sum from 'lodash/sum';

const double = (number)=> number * 2
const addFive = (number)=> sum([number, 5])

export {
  double,
  addFive
}

```

**備考：**Babelでは素晴らしいことに、新しいES2015のモジュール構文を使えます。

Babelは使用するプリセットを指定する構成ファイルが必要になります。

```plain text
echo '{ "presets": ["es2015"] }' > .babelrc
```

**babel**の実行のためにスクリプトに**package.json**を追加します。

```plain text
"babel": "babel ./src/es6-lib.js -o ./dist/es6-lib.js"

```

**npm run babel**で実行します。

**/dist**内のファイルには、CommonJSモジュール形式のES5コードが含まれていますが、前述のようにBrowserifyかWebpackとなら完全にうまく動きます。CommonJSでES5にトランスパイルしてからバンドルするか、各段階でその両方を実行するために他のパッケージも使えます。

Browserify向けのトランスパイルとバンドルのプラグインには[coffeeify](https://www.npmjs.com/package/coffeeify)、[tsify](https://www.npmjs.com/package/tsify) 、[babelify](https://www.npmjs.com/package/babelify)があります。

Webpack向けのローダーには異なる言語のモジュールをrequireして読み込む[coffee-loader](https://www.npmjs.com/package/coffee-loader)や[ts-loader](https://www.npmjs.com/package/ts-loader)、[babel-loader](https://www.npmjs.com/package/babel-loader)があります。

## **jspm**

> jspmはSystemJSを利用した一般的なモジュールローダー用のパッケージマネージャーで、動的ES6モジュールローダーをベースに構築されています。

jspmのアプローチは他と異なり、モジュールローダーの[System.js](https://github.com/systemjs/systemjs)から始まります。System.jsは、[ローダーのスペック](https://github.com/whatwg/loader/)に依存します。

jspmを使ったプロジェクトをインストールして初期化しましょう。

```plain text
npm install -g jspm
jspm init

```

すべての初期設定はそのままで、**Babel**をトランスパイラーとして使います。ES6形式のモジュールを実行するとBabelを使うようにSystem.jsを設定します。

**index.html**を更新し、System.jsをロードして設定します。

```plain text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Modules!</title>
</head>
<body>
  <script src="jspm_packages/system.js"></script>
  <script src="config.js"></script>
  <!--<script src="bundle.js"></script>-->
  <script>
   System.import('src/entry.js');
  </script>
</body>
</html>

```

ブラウザーが少数のリクエストとlodashに**404を**表示するのは、jspmは初期設定で**jspm_packagess**ディレクトリーからパッケージをロードするためです。

ディレクトリーにlodashをインストールするために**jspm install lodash**を実行し、コンソールに**4**と**7**が出力されているか確認しましょう。ここまでに起きていることを整理します。

- **entry.js**ファイルが**System.import('src/entry.js');**で動的にロードされます。
- System.jsは**entry.js**をロードし、**lib**を実行時に呼び出します。
- System.jsは**lib.js**をロードし、**lodash/sum**も呼び出します。

System.jsは直接ES6で動かせるので、ES6を動的に要求して、実行中にコンパイルするために**entry.js**を更新します。

```plain text
import lib from './es6-lib';
// import lib from '../dist/coffee-lib';
// import lib from '../dist/ts-lib';

console.log(lib.double(2));
console.log(lib.addFive(2));

```

1つずつ上記のコメントを解除して、CoffeeScriptやTypeScriptのES5にコンパイルされたバージョンをロードする方法もあります。その他に、プリコンパイルされたES5コードを読み込む代わりに、コードをトランスパイルする[System.jsプラグイン](https://github.com/systemjs/systemjs#plugins)を使う方法もあります。

**jspm**でバンドルを作成するために、**package.json**に最後のスクリプトを追記します。

```plain text
"jspm": "jspm bundle src/entry bundle.js"

```

**npm run jspm**で実行します。

最後に、**index.html**の**bundle.js**のスクリプトタグのコメントを解除します。ブラウザーは余計なhttpをリクエストすることなく、利用可能なバンドルをロードします。

```plain text
<script src="bundle.js"></script>

```

## **再びWebpackについて**

先のWebpackの例は初期設定オプションを使ったもっとも簡単なもので、CommonJSモジュールで**entry.js**を1つのバンドルにコンパイルしました。Webpackでもっと特別なことをする場合は、すべてのローダーに対応したカスタム構成ファイルを作成する必要があります。

プロジェクトのルート内に**webpack.config.js**を作成します。

```plain text
module.exports = {
  context: __dirname + "/src",
  entry: "./entry",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    },{
      test: /\.coffee$/,
      loader: 'coffee-loader'
    },{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  }
}
```

バンドルされたファイルのみをロードするために**index.html**をもう一度更新します。

```plain text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Modules!</title>
</head>
<body>
  <script src="bundle.js"></script>
</body>
</html>

```

Babel、CoffeeScript 、TypeScriptでトランスパイルするためのローダーをインストールします。

```plain text
npm install --save-dev babel-loader coffee-loader ts-loader
```

**webpack**をグローバルにインストールし、引数なしで実行して構成ファイルからバンドルを作成します。

```plain text
npm install -g webpack
webpack
```

Webpackはローダーがファイル拡張子で区別するため、**entry.js**からES6、CoffeeScript、TypeScriptを自由に使えるので、1つずつコメント解除して試せます。

```plain text
import lib from './es6-lib.js';
// import lib from './coffee-lib.coffee';
// import lib from './ts-lib.ts';

```

Webpackでできることはまだまだたくさんありますが、ここで説明した簡単な設定は出発地点としてふさわしいでしょう。

## **最後に**

モジュールについてもっと詳しくなったら、（もしツールの使用が妨げになってなければ）モジュールを使うことで多くの課題が解決でき、アプリケーションが複雑化するのをかなり防げます。もしモジュールを使っていなければ、早速始めてみましょう。アセットパイプラインを構築するのに無駄な時間を費やすことはありません。代わりにちゃんと動く簡単なツール“Just Work”を使いましょう。

Webpackは今のところ圧倒的な破壊力があって、ほとんど何をするにもWebpackの設定でできるでしょう。jspmはバンドルのニーズをすべて満たす素晴らしいツールで、さまざまな形式で動き、開発をスムーズに進められます。Browserifyは依然として確実なオプションです。現代のモジュールビルダーの原型のような存在で、Webpackのかなり優れた特徴（バンドル分割やホットリローディングなど）を取り入れたビジネスモデルが発達しています。System.jsは実行時に特定のモジュールをロードするときには最適です。

1つのプロジェクトで、これまで紹介したツールをすべてを使いたいとは思わないでしょう。必要なときにトランスパイルを使えるように、これらの人気のある3つのオプションを理解しておくことは大切です。単にモジュールを使いたいのであれば、初期設定オプションで、Browserifyかjspm、Webpackを使えばうまくいくでしょう。

ツールはシンプルに、構成は軽く、です。さあ、プログラミングを楽しみましょう。

［翻訳：[和田麻紀子](http://hanafamilia.com/)］
［編集：[Livit](http://livit.media/)］

Copyright © 2016, Mark Brown All Rights Reserved.

![](https://cdn.webprofessional.jp/wp-content/uploads/sites/2/2016/05/09121304/012.jpg)

Mark Brown

オーストラリア・メルボルン在住。フロントエンドのWeb開発者。有能な人達に囲まれて自分自身が成長しながら、Web設計に喜びを感じています。特にビジュアルプログラミングに興味があり、SVGとCanvasを使ったプログラミングに夢中。