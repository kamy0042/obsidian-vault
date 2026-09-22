---
URL: https://qiita.com/seya/items/06b160adb7801ae9e66f
Updated: 2021-11-06T22:49:00
Created: 2021-09-03T21:10:00
Tags: [topic/技術/ビルドツール]
---
Code Splitting、サボってきたのですが、必要になりそうだったので真面目に調べてみました。
 これからCode Splittingやりたい方の入口的な役割になれれば幸いです。

## Code Splittingとはなにか

Code Splittingはその名の通り「コードを分割すること」を指します。分割されたコードはユーザのアクションに応じて非同期に読み込まれます。

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F1505692F110e1bab-d708-c20b-38eb-528b4c990c3a.png]]

ちなみにWebpackでentry point分けることとかもCode Splittingと言えばそうなのですが、本記事では触れません。また、別にSPAでなくともCode Splittingはパフォーマンス向上に利用できますが、これ以降はSPAを前提に話します。

### Code Splittingの目的

Code Splittingの目的は初期表示にかかる時間、及びユーザがインタラクションできるようになるまでの時間の削減です。

SPAではJSがHTMLを生成してそれを描画します。なのでJSがパース/コンパイル/実行されるまでは何も表示されない時間が続きます。また、基本的にSPAはアプリケーション全てのコードを一つのファイルにバンドルするため、得てしてファイルサイズが大きくなりがちです。

なので、一度に全部読み込むのではなく、使う部分だけのJSを取り出して初期表示を速くしようというのがCode Splittingの目的です。

それでは私が所属してる会社の某サービスのSPAを例に、どれくらい伸び代がありそうかを見てみます。別に誰でも見れる情報なので特に怒られないとは思いますが、個人の記事であるため一応サービス名は伏せておきます。

まずページの表示にどれくらいかかっているのかをLighthouseで見てみます。

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F1505692Ff7ee75af-2511-147f-4e7a-d9a45cf47206.png]]

表示まで約4秒ほどかかっていますね。
 そして、メインのSPAのJSの実行にかかっている時間はこんな感じ。

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F1505692Fd4a5d256-eafb-7bd1-066c-a7126ba6bfb1.png]]

Totalで1秒ほどかかっています。
 あれ意外と速いな…。若干企画倒れ感がしてきましたが次にCode Coverageを見てみます。
 (ちなみにどっちかというとボトルネックになっているのは画像の読み込みでした。)

Code Coverageとはその名の通り、読み込まれているJSの何%が現在の表示に使われているのかを表す数値です。確認するためにはChromeの開発者ツールを使います。(他のブラウザのツールは見つけられませんでした)
 Chromeで開発者コンソールを開いて `Cmd + Shift + p` (Windowsでは多分CmdがCtlr)を押して`coverage`と入力して`show coverage`でEnter押します。そうすると`Coverage`というタブが開くと思うので、「●」ボタンを押して計測を始めます。私のサイトでは結果はこのようになりました。

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F1505692F7283b8c8-7b40-1911-ad74-f2d5ecfc0a69.png]]

一番上の明らかにサイズが大きいものがSPAのbundle.jsなのですが、およそ1.2MBあるうちの52% がunusedだと仰っていますね。うーむ中々。ただ逆に言えばこれが伸び代で、最大で現在の半分の時間に短縮できるということを示してくれています。今回の例で言うと約1秒のところが0.5秒くらいになります。

初期表示と聞くとSSRがよく引き合いに出されますが、Code Splittingで最適化していてSEOの要求も強くないのであればSSRいらないのかと言われると、そんなことはなくFirst Meaningful Paint(FMP)にこだわるのであればSSRが必要です。

SSRは事前にJSを実行して描画されたHTMLを返してくれます。なのでリクエストが返ってきてから表示されるまでの時間は速いです。Code Splittingをした場合はファイルサイズが小さくなったとは言え依然としてJSが読み込まれてからでないとHTMLは描画されません。FMPが指標として重要である場合SSRは視野に入れた方がよいでしょう。

### 逆にSSRする場合はCode Splittingいらない？

SSRライブラリは基本的にページ単位でのCode Splittingしてるっぽいので、この質問はもはやナンセンスかもしれないんですが、SSRする場合にもCode Splittingは重要です。

SSRが実現してくれるのは初期の"表示"(HTMLの生成)までです。SPA実行した場合にレンダーされるHTMLを返してくれる訳ですが、これはあくまで見た目の部分だけの話であり、実際にはJSを実行する処理が走ります。このJSの実行が終わるまではクリックしても何も反応してくれません。この「ユーザがインタラクションできるようになるまでの時間」を `Time to Interactive(TTI)` と呼びます。

TTIに長い時間をかけてると、ユーザに「押してるのに全然反応しない！」といった負の体験を与えてしまう恐れがあります。SSRした際は、コンテントが見えてから実際に反応してくれるまでの体感時間はむしろ増えてしまうので、対策しないとより負の体験を与えやすくなってしまうのではないかと思います。なのでCode SplittingはこのTTIを削減するために重要です。

### Code Splittingのデメリット

これはメリットの裏返しなのですが、分割したモジュールを読み込む際にレイテンシーが増えることは一つのデメリットでしょう。1ファイルなSPAでは一回読み込まれてさえしまえばあとはパフォーマンスを発揮してくれますが、Code Splittingを用いた場合は分割されたファイル個別に読み込みが発生します。(後述しますが、これを抑えるためにprefetch/preloadが有用です)

また分割すればするほどファイルが増えるため、リクエスト数が増えることによるオーバヘッドもあります。

せっかくJSの読み込みの時間を削減したのに今度はネットワークがボトルネックになった、なんて状況になったらあまり笑えないので、この辺りはバランスとってチューニングしていくのが大切そうです。

## (Webpackの)Code Splittingの仕組み

現状Code SplittingをやろうとしたらWebpackを使わざるを得ないっぽいので、Webpack前提で考えます。(ちなみに利用するimport()自体は現在[TC39 でstage-3となっているDynamic import](https://github.com/tc39/proposal-dynamic-import)となるべく同じ仕様のようです。)

### Webpack のバンドルの仕組み

まずCode Splittingの前にWebpackのbundlingがどうやって実現されているのかを確認してみます。Webpackはbundleする時にモジュールのマップを作ります。実際にwebpackが生成したバンドルファイルを見てみましょう。

簡単な例でビルドしてみて、Webpackが生成したファイルの中身をみてみます。
 文字列をexportするだけの`a.js` と、それを読み込んで `console.log` するだけの`index.js`を作りました。

a.js

```plain text
const a = 'a';
export default a;

```

index.js

```plain text
import a from './a';

console.log(a);

```

それではビルドした結果を見てみると、まずモジュールのマップが作られていることが確認できます。

dist/main.js

```plain text
{

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst a = 'a';\n/* harmony default export */ __webpack_exports__[\"default\"] = (a);\n\n\n//# sourceURL=webpack:///./src/a.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \"./src/a.js\");\n// const getTheme = name => import(`./theme/${name}.js`);\n\n// getTheme('dark').then(module => console.log(module));\n\n\nconsole.log(_a__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n// const a = () => import('./a');\n\n// a().then(module => console.log(module));\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

```

ファイルパス名をキーとして、コードの中身が値となったオブジェクトが作られていますね。このファイルパス名が個々のモジュールのIDとなります。

そして、次に重要なのはこちらの `moduleId` を引数に取った `__webpack_require__` と言う関数です。
 この関数が指定されたmoduleIdのモジュールを実行します。

dist/main.js

```plain text
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

```

そして、最後に`modules`(前述のモジュールのマップ)を引数に取る関数を古き良きIFFIパターンで即時実行し、最初にentryポイントのモジュールを `__webpack_require__` 関数で実行することによってWebpackはバンドリングを実現してくれています。

それでは次にCode Splittingをしてビルドしてみた時の結果を見てみます。
 a.jsの中身を以下のように書き換えてみます。

WebpackではTC39で現在stage-3のDynamic Importの構文を利用しており、import関数がある場合自動的にimportの対象のファイルを別のChunkファイルとして生成します。

なので、今回ビルドした時は先ほどのmain.jsとは別に次のファイルが生成されました。main.jsの他に0.jsがあります。
 0.jsの中身は次のように、`b.js`の内容を持っています。

main.jsの方にも変化があります。

また、chunkを非同期で読み込むための `requireEnsure(chunkId)` という関数が追加されています。(長いので詳細な内容は割愛)そしてその関数を用いてChunkとなったモジュールを読み込んでいます。

まとめるとWebpackではそれぞれのモジュールに対してIDを振り、そのIDと実際のコードのマップを作ります。あるモジュールが他のモジュールを使う際には `__webpack_require__` という関数を用いてその対象のモジュールを実行する訳ですが、これを実際に必要になった時に非同期に行う仕組みがCode Splittingです。

## Code Splittingのパターン

それでは実際にCode Splittingを使っていこう！となった場合に具体的にどうやって分割していくのかという話ですが、大きくは次の３パターンが主流みたいです。

1. Page
2. Fold
3. Temporal

これはイメージしやすいと思うんですが、ページ毎に分割してルートの変換が行われた時に読み込まれるようにする考え方です。基本的にRouterの部分で以下のような感じで設定してあげることになります。

Foldという聞き慣れない英単語を言われてもピンと来ないと思うのですが、`Above the Fold` という単語は "最初の表示域" という意味です。元はSEO界隈の用語っぽいです。

例えばQiitaをスマホで開いた場合ですが、最初の表示域はこんな感じになります。

影になっている部分がBelow the Fold、初期表示域にはない部分です。記事のリストの部分はCode Splittingしても意味ないですが、下の方に色んなランキングを表示している部分があるので、それらをCode Splittingして遅延読み込みするのは多少最適化に繋がるかもしれません。Foldはイメージ的にはそんな感じです。

設計にもよりますが、そのCode Splittingする場所をWrapするコンポーネントを作る必要があったり、適切なローディングプレイスホルダーを出しておくなど実装のトリッキーさはやや上がるかなという印象です。

### 3. Temporal

3番目のTemporalですが、これはモーダルとかツールチップとか最初に表示されないようなUI要素を指します。それらのコンポーネントが出現するトリガーとなるイベントと一緒に絡めて対象のコンポーネントを読み込みます。

実はWebpackのCode Splittingにはもう一種類あり、Dynamic Code Splittingと言います。
 Dynamicと言いつつやってることはstaticだったり、名前がDynamic importと紛らわしかったり(これは私だけかもしれない)しますが、状態によって読み込むChunkを変更することを可能にしてくれるのがDynamic Code Splittingです。

例として `theme` というフォルダの中にいくつかファイルを作ります。

そして`index.js`を書き換えて、以下のようにimport()関数の引数のパス名が動的に決まるようにします。

こうしてビルドするとthemeフォルダ内にあるそれぞれのファイルに対してChunkが生成されます。

こうすることによって動的にどのChunkを読み込むのかを変更することができるようになりました。このDynamic Code Splittingはパフォーマンスを上げることが目的というよりは、用途としてはA/Bテストで機能の出し分けをしたり、サイトのテーマを変えたりなどが挙げられます

ちなみに`./theme/${name}.js` のようにするとjsファイルだけChunkを産むとかできます。

### prefetch/preload

参考: [ in webpack – webpack – Medium](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)

v4.6からはいった機能ですが、prefetchというフラグをつけてあげることで、Chunkにしたモジュールを事前に読み込んでおくことができます。

やり方は簡単でimport()関数内にコメントつけるだけです。

これにより

のタグがHTMLファイル内に作られます。

ちなみに複数のChunkを作っていてprefetchする順番を制御したい場合は `true` の代わりに数値を入れてあげればいいそうです。(というよりtrueは0としてカウントされている) z-indexを彷彿とさせますね。

preload も同様で、こちらも専用のコメントをつけるだけです。

import()だけでもできなくはないですが、書き方をサラッとご紹介。

Vueだと `vue-loader` が解決してくれるので、SFCで書いている方は特に追加の設定は必要なくCode Splittingが導入できます。

めっちゃ簡単。

参考: [https://jp.vuejs.org/v2/guide/components-dynamic-async.html#%E9%9D%9E%E5%90%8C%E6%9C%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88](https://jp.vuejs.org/v2/guide/components-dynamic-async.html#%E9%9D%9E%E5%90%8C%E6%9C%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88)

Reactの場合はVueのようにライブラリ自体がサポートしてくれているわけではないので、何らかのライブラリを用いる必要があります。いくつかあるのですが、一番有名どころはこちらのreact-loadableっぽいです。[GitHub - jamiebuilds/react-loadable: A higher order component for loading components with promises.](https://github.com/jamiebuilds/react-loadable)

react-loadbleからそのまま実装例をコピペしてきました↓

こちらもVueほどステップなしとは行きませんがそこまで複雑ではないですね。

ただこのreact-loadable、そもそもissueが受け付けられていなかったり[Webpack v4のmigrationのPR](https://github.com/jamiebuilds/react-loadable/pull/110)が謎にspam扱いされてcloseされてたり未来が明るくなさそうみたいです。

複雑なことやらないなら自前でラッパーコンポーネント作っても行けそうだけど、この辺のライブラリ事情は詳しい人いたら教えてほしい。

やたら長文になってしまいましたが、ご読了いただきありがとうございました。Code Splittingは割と職人芸的なイメージが強くてちゃんと触れてこなかったのですが、Webpackが便利すぎたせいか意外と怖くなかったです。SPAの初回のロードの遅さって開発していると慣れてしまいがちな気がするのですが、ユーザの体験を毀損しているかもしれないと気を引き締めて行きたいですね。

それではよいCode Splittingを〜。