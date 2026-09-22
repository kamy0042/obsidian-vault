---
URL: https://qiita.com/kazukiii/items/4a8fece8881bc79b18e2
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
2018年現在、フロントエンド開発に関わっている人でwebpackの名前を聞いたことがないという人はいないのではないでしょうか。

## webpackとは

Webアプリを構成する個々のファイルを一つに束ねるいわゆるモジュールバンドラと呼ばれるツールです。

JSファイルのみならずCSSや画像までも一つのファイルにまとめることができます。

現在（2018年11月時点）でのフロントエンド開発を学ぶ上でははずすことのできないものになっています。

設定ファイルは基本的にwebpack.config.jsというJSファイル（jsonではないことに注意）に書いていきます。

公式サイト: [https://webpack.js.org/](https://webpack.js.org/)

## webpackが生まれるまでの経緯

「過去の歴史なんてどうでもいいや」って人もいると思うのでそういう人は読み飛ばしてください。

自分は結構興味があったので、ちょっと調べてみました。

### モジュールバンドラが求められるようになった背景

従来JavaScriptを実行するためには、入門書などでよく書いてあるようにHTMLファイルで以下のようにJSファイルを読み込む必要がありました。

`<script src="foo.js"></script>
<script src="hoge.js"></script>
<script src="piyo.js"></script>`

そして、例えばhoge.jsがfoo.jsに依存している場合foo.js→hoge.jsの順で記述しないといけなかった。（hoge.js→foo.jsだとhogeからfooが参照できずにエラーとなります）

さらに複雑なWebアプリになってくるとJSファイルの数ももっと増え、HTML側でその依存関係を解決するのが困難になってきます。

そこで登場したのがモジュールバンドラです

### モジュールバンドラの主なメリット

- 自動的に依存関係を解決する

これが一番大きな目的だと思います。
JSファイル間の依存関係を自動で解析し、一つのファイルとしてまとめてくれます！

- リクエストの回数を減らせる

今だとJSファイルはS3などのクラウドストレージに置いておくのが普通かと思いますが、一つにまとめることにより通信回数を減らすことができます。

### webpackの利点

webpack以前にも、BrowserifyやRequireJSなどモジュールバンドラが存在していたがそれらとwebpackがどのように違うか

- **様々なモジュール形式に対応**

JavaScriptにはファイルをモジュールとして管理する仕様が複数あり、例えば主に以下の３つのようなものがあります。

(1) CommonJS

Node.jsはこれ発祥（が今は準拠していないと言っている）。
require使うやつ。結構使う。

(2) AMD

あんまり知らない。RequireJSによる実装が有名らしい。

(3) ES Modules

ES2015で標準化されたモジュール仕様。
今のフロントエンドではこれがもっともポピュラーなんじゃないかと思う。例のimportとexport使うやつ。

BrowserifyやRequireJSはいずれも特定のモジュール形式しかサポートしていないが、webpackはこれらが混在していてもOK。（過去の資産も利用しやすい）

- **ローダー/プラグインが豊富**

ローダーは簡単に言うと非JSファイルJSファイルに変換して一緒にバンドルするためのもの。

プラグインはwebpack自体の機能を拡張するもので、例えばコードの圧縮（minify）、バンドルしたファイルを実行するためのページの生成などを行います。

- **主要フレームワークでの採用が増えている**

具体的には現在のフロントエンドで主流のReactやVue.js、またRuby on Railsでも5.1以降ではwebpackが標準採用されています。

つまりwebpackを知っておくことはこれらのフレームワークを学ぶための有用な前提知識になります。

## 使ってみよう

webpackが使われるようになった背景はここまでにして、実際に手を動かしてみるのが大事!ということで簡単なハンズオンをやってみます。

自分のnodeのバーションは以下です。

`$ node -v
v8.11.1`

まず、webpack_practiceプロジェクトを作ってみましょう。

`$ mkdir webpack_practice
$ cd webpack_practice`

次に以下のコマンドでpackage.jsonを作ります。

`$ npm init -y`

以下のようなpackage.jsonができていると思います。

`{
  "name": "webpack_practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`

そしてwebpackをインストール

`$ npm i --save-dev webpack webpack-cli`

webpack-cliはあとでwebpackコマンドを実行するときに必要になるパッケージです。

そして実際に実行するJSファイルを作りましょう。

/src/indes.jsと/src/myutil.jsを用意します。

`$ mkdir src
$ cd src`

index.jsとmyutil.jsを作ります。

index.js

`import { hello } from './myutil';

hello();`

myutil.js

`export function hello() {
  console.log('びよよよーーーん');
}`

ここで

`$ node index.js`

とやってみても、依存関係は解決されずエラーになります。

そこでこれらをwebpackでバンドルしてみましょう。プロジェクトルートで以下のコマンドを実行します。

`$ npx webpack`

npxはnode.js 8.2以降で導入されたコマンドで、プロジェクトローカルにインストールされたパッケージにコマンドを実行します。

すると、/src/indes.jsと/src/myutil.jsがバンドルされたものがデフォルトで/dist/main.jsに吐き出されます。

これを実際に実行してみましょう

`$ node dist/main.js
びよよよーーーん`

依存関係が自動で解消され無事実行することができました。

## おわりに

ここまで読んでくれた方には現在のフロントエンドでのwebpackの有用性がわかったと思います。

ちなみにwebpack.config.jsの設定方法は以下の記事が参考になります。[webpack 4 入門 - Qiita](https://qiita.com/soarflat/items/28bf799f7e0335b68186)

最後まで読んでいただきありがとうございました。