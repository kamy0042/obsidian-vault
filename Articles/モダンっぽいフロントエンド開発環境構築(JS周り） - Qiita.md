---
URL: https://qiita.com/bijutubu_no_e-su/items/6cfba818e3c7aa6507a1
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
webpackを主軸にモダンっぽい開発・学習環境を構築してみたくなったので、トライしてみた。
とりあえずこの環境があれば、コードの確認とか簡単な確認作業はできるはず。（多分）

## やりたいこと一覧

### js周り

- reactを使いたい(react react-dom)
- typescriptで書きたい(typescript ts-loader @types/react @types/react-dom)
- polyfillとかしたい。(babel babel-loader core-js regenerator-runtime)
- コードの反映をすぐ確認したい(webpack-dev-server)
- eslintで構文チェックをやりたい。(eslint, eslint-loader @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/react @types/react-dom)
- prettier噛ませてコード整形して欲しい(prettier eslint-config-prettier eslint-plugin-prettier pretty-quick)

### CSS周り

- postcssプラグインでベンダープレフィックスを自動でつけて欲しい、cssのノーマライズをしてブラウザ間差異を無くしたい(postcss-loader autoprefixer postcss-normalize)
- scssで書きたい、cssに変換して、javascriptにバンドルして欲しい(sass sass-loader css-loader style-loader)
- stylelintで構文チェックしたい(style-lint stylelint-webpack-plugin stylelint-config-standard stylelint-scss stylelint-config-recess-order)
- pathのresolveがしたい。

列挙するだけでうんざりしてきた。
そもそも足りてんのかこれ。

一気にやるとどこでエラー吐いてるのかよくわからなくなって飽きる気がするので、動作検証しながらダラダラ構築していきます。

大まか↓のようなイメージで進めていきます。

## JS

- webpack-dev-serverのセッティング
- source-map追加
- es6→es5のトランスパイル確認(babel周り)
- polyfillのセッティング
- eslintのセッティング(typescript以外)
- prettierのセッティング
- reactのインストール
- typescriptのインストール
- eslintのセッティング(typescript含む)

## CSS

- postCSSプラグインでnormalize,ベンダープレフィックスの付与
- scss→htmlへのcssの注入
- stylelintのセッティング

## 構築(js周り)

ディレクトリ構成は以下、srcにコードをいろいろ置く想定。

`root/
　├ node_modules/
　├ src/     \#作業ディレクトリ
　│　└ index.js
　│　└ sub.js
　└ package.json`

### webpack

まずwebpackがないとどうしようもないので、webpackをインストールします。

### install

`yarn add webpack webpack-cli -D`

### bundle確認

`yarn webpack --mode development`

`root/
　├ node_modules/
　├ dist/     
　│　└ main.js←New!
　├ src/     \#作業ディレクトリ
　│　└ index.js
　│　└ sub.js
　└ package.json`

bundleされてmain.jsがdistディレクトリごと作成されたことを確認。

webpack.config.jsを作成して、バンドルファイルの場所をpublicに調整。(babelでes6記法で書きたかったがpostcssのコンフィグファイルはどうもbabel/register使ってもes6で書けないようなので、統一できないならcommonJSで書くことに決定。)

### webpack.config.js

`const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/js/'
  }
}`

### 出力を確認

ディレクトリをちょっと変更

`root/
　├ node_modules/
　├ dist/   ←いらないので消します  
　│　└ main.js ←いらないので消します。
　├ src/     \#作業ディレクトリ
　│　└ js ←src/jsにjsファイルを移動
　│　  └ index.js
　│　  └ sub.js
　└ package.json`

### 実行

`yarn webpack`

### 結果

`root/
　├ node_modules/
　├ public/     
　│　└ bundle.js←New!
　├ src/     \#作業ディレクトリ
　│　└ js ←src/jsにjsファイルを移動
　│　  └ index.js
　│　  └ sub.js
　└ package.json`

webpack.config.jsで指定したようにpublic/bundle.jsにバンドルされることを確認。

### webpack-dev-server

とりあえず想定通りにバンドルされることが確認出来たので、開発用サーバーの導入へ。

### install

`yarn add webpack-dev-server -D`

動作確認用にpublic配下にindex.htmlを作成。ついでにindex.jsの動作確認も。

index.html

`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
</head>
<body>
  <script src="js/bundle.js"></script>
</body>
</html>`

index.js

`console.log('bundle test');
document.querySelector("body").innerText= "webpack webpack";`

### webpack.config.jsへdev-server設定を追加

webpack.config.js

`    devServer: {
    open: true,
    port: 9000,
    contentBase: './public'
  }`

カンマつけ忘れて一瞬ハマった。

### package.jsonにwebserver用のscriptを追加。

startでwebpack-dev-serverが立ち上げるようになる。

package.json

`   "scripts": {
    "start": "webpack-dev-server"
  }`

### webpack-dev-serverが立ち上がることを確認

`yarn start`

localhostの9000ポートで立ち上がればOK。
これでファイルを変更しても自動でリロードされるようになります。

### source-mapの追加

bundle前と元のファイルを紐づけてデバッグしやすくするためにソースマップを追加します。

### webpack.config.jsに追加

webpack.config.js

`  devtool: 'cheap-module-eval-source-map'`

これでエラーの箇所がバンドル前のファイルを示すようになるので、開発しやすくなります。

### babelの設定(es6→es5)

ie11とかでも動くようにしたいので、babelでes6→es5のトランスパイルを行えるようにします。

### install

webpack上でbabelを使うにはbabel-loaderからbabel/coreを呼ぶためその二つをインストール。
また環境に合わせて適切なトランスパイルを行うために、@babel/preset-envもインストールする。

`yarn add babel-loader @babel/core @babel/preset-env -D`

### webpack.config.js上の記載

babel-loaderはmoduleの内部に記載する。
具体的には以下

testには対象となるディレクトリ・ファイルを指定。
excludeに対象外を設定。

webpack.config.js

`module: {
  rules:[
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }
  ]
}`

### babel.config.js

babelの設定ファイルとして、babel.config.jsを作成。
babelのpresetにはブラウザーを指定することでそのブラウザで動くようなトランスパイルを行うようにできる。とりあえずIE11でも動くようにトランスパイル。

babel.config.js

`module.expoerts = api => {
  api.cache(true);
  return {
    "presets": [
      ["@babel/preset-env",{
        targets: {
          ie: "11",
          chrome:"60"
        }
      }
      ]
    ]
  }
}`

これでwebpackでバンドルするとアロー関数が普通の関数に、constで定義したものがvarで変換されるなど、es5で出力されるようになります。

### polyfill

ついでにpolyfillのbabel設定を入れます。
仕様で策定されている機能だが、古いブラウザなどではまだ実装されていない時に、APIが全く同じ互換実装を提供するライブラリ(async awaitとか。)

### install

`yarn add core-js@3 regenerator-runtime -D`

### babel.config.js

polyfillの適用はbabel.config.jsに記載。

`module.exports = api => {
  api.cache(true);
  return {
    "presets": [
      ["@babel/preset-env",{
        targets: {
          ie: "11",
          chrome:"60"
        },
        useBuiltIns: "usage",
        corejs:3
      }
      ]
    ]
  }
}`

疲れてきた。

### eslint(typescript除く)の設定

後でtypescript用に書き換えるが、普通にeslintをいれる場合を記載。

eslintをwebpack上で使うには以下が必要

- eslint:eslint本体
- eslint-loader:webpackでeslintを使用するために必要なモジュール
- babel-eslint:eslint上でbabelと連携するために必要なモジュール(babelを使わない場合は必要なし、ほとんどbabelを使う気がするのでほぼ必須のような。。。)

### install

`yarn add eslint eslint-loader babel-eslint -D`

### eslintの設定ファイル

eslintでどのバージョンの構文のチェックをするのかは、`.eslintrc`に記述します。

`{
  "env": {
    "browser": true,
    "es2017":true
  }
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    //"ecmaVersion": 2017,
    "sourceType":"module"
  }
  "rules":{
    "semi":["error","always"]
  }
}`

超シンプル設定。

- env:どのバージョンのチェックを行うかを指定。
- extends:eslintが提供しているオススメの構文設定を読み込める。（今回はeslint:recommendedを使用。)
- parser: babelを使うのでbabelと連携するのでbabel-eslintを設定。
- parserOptions:ecmascriptのバージョンを指定したり、モジュール管理を行っているのかどうかを設定します。envでecmascriptのバージョンをしている場合はecmaVersionには設定する意味はないのでコメントアウト。
sourceTypeにはモジュール管理をする物なのかどうかを設定します。まあモジュール管理しますのでmoduleを設定。

今回はeslintの構文解析をeslint:recommendedを使用しているが、実際はこれはエラー吐かないで欲しいなどの都合を上書きする形で、ruleに書きます。

文末のセミコロンをエラーにするように上書きしました。
ruleは無数にあり、ゼロから設定するのは現実的でないので、extendsした設定から上書きでルールを追加するのがいいような。

### webpackへの導入

webpack.config.jsのmoduleに記載する。↓のような感じ。

webpack.config.js

`module: {
    rules: [
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
}`

これでwebpackの実行時にeslintが走るように。未定義の変数とかを作って実行すると、出力がわかりやすい。↓みたいにコンソール出力されます。

`2:15  error  'msg' is not defined             no-undef`

### prettierをeslint上で動作させる。

コードフォーマッター（ソースコードの整形をしてくれる）prettier
eslint --fixでもソースコードの整形はできるがprettierの方が精度が高い(らしい)し、prettierの設定はとてもわかりやすいので(eslintのルール見てると病んでくる。)eslint上でprettierを実行させたい。

### install

`yarn add eslint eslint-config-prettier eslint-plugin-prettier -D`

prettierをeslint上で動かすことを.eslintrcに記載。

`extends": [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],`

"plugin:prettier/recommended"を指定することで、eslint-plugin-prettier、eslint-config-prettierも有効化してくれる。

### prettier設定ファイル(.prettierrc)

.prettierrcに整形対象のルールを記載。
好みとかプロジェクトの決め事にしたがって設定。
↓は例

`printWidth: 120 # 1行の文字数制限
tabWidth: 2 \#タブのwidth
singleQuote: true \#文字列の囲いがsingleQuoteの場合はtrue、doubleQuoteの場合はfalse
trailingComma: none
semi: true
bracketSpacing: true #{}の前後のスペースを入れるかどうか`

これでeslint上でprettierが動くように。

ここまできたら後はreact入れて、typescript用のセッティングをするだけなので。一気にやりたい。

### reactの導入

react react-dom を導入してreactを使えるように、また@types/react @types/react-domやらtypescriptのための型定義ファイルを導入。

### install

`yarn add react react-dom @types/react @types/react-dom -D`

### typescriptの導入

ようやくtypescriptまでこれた。
ts-loaderだけでもes5へのトランスパイルは可能ですが、babelでpolyfillしたかったので(typescriptでpolyfillのやり方がよくわからん。出来ない？)
なのでトランスパイルは全てbabelでtypescriptには型チェックだけやってもらうようにします。

### install

`yarn add typescript -D`

tsconfig.json

`{
  "compilerOptions": {
    "target": "esnext",
    /* 相対パスではないモジュールは node_modules 配下を検索する */
    "moduleResolution": "node",

    /* `tsc`コマンドでJavaScriptファイルを出力しないよう設定*/
    "noEmit": true,

    /* 厳格な型チェックオプションを有効化する */
    "strict": true,
    /* 各ファイルを個々のモジュールとしてトランスパイルする。
    "isolatedModules": true,

    /* import 形式で読み込めるように設定
    "esModuleInterop": true,
    "jsx": "preserve"
  },
  "include": ["src/**/*"]
}`

本当に動くのか不安なので、src配下に以下のようなtest.tsxを配置して、

test.tsx

`export default function test(string1){
  console.log(string1);
}`

tscで型チェック

`yarn tsc`

`error TS7006: Parameter 'string1' implicitly has an 'any' type.
1 export default function test ( string1){`

型をちゃんと書いてないのでエラー出力されました。よかった。

### typescriptのトランスパイルのためのbabelの設定

typescriptをbabelでトランスパイルさせてやるために、いろいろ入れます。後babel.config.jsを書き換えます。

- @babel/preset-typescript
- babelでtypescriptをトランスパイルしてやるために必要
- @babel/plugin-proposal-class-properties
- @babel/plugin-proposal-object-rest-spread
- 必須じゃないですが、ecmascript策定中の機能をトランスパイルしてやるときに@babel/plugin〜をよく入れます。これはオブジェクトのスプレッド展開とか、静的クラスメソッドとかのトランスパイル。必要だと思ったら都度追加でいいような気がします。

### install

`yarn add @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread -D`

### babel.config.js

presetsに@babel/preset-typescriptを追加
pluginを新たに追加

`"presets":"@babel/preset-typescript"
"plugins": ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"]`

これでトランスパイルと型チェックの設定があらかた終了。後はeslintをtypescript仕様にします。

### eslint(typescript)

typescriptのlintができるように色々インストール。ついでにreactのlintについても入れちゃいます。

- @typescript-eslint/parser
- @typescript-eslint/eslint-plugin
- eslint-plugin-react

### install

`yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react`

.eslintrcを書き換えたり、書き足したりします。
parserにbabel-eslintを指定していたのを@typescript-eslint/parserに
extendsにtypescript用の設定を足したり。

`{
  "env": {
    "browser": true,
    "es2017":true
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/react"
    ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    //"ecmaVersion": 2017,
    "sourceType":"module"
  },
  "rules":{
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true
      }
    ]
  },
  "settings": {
    "react": {"version": "detect"
    }
  }
}`

これでjs周りの基本的な設定は終わりです。
typescriptでreactを書いて、eslintが効くような環境が出来たはず。。。

## まとめ

typescriptとreactが絡んでくるとよくわからない設定をいじっているようでとても不安になったが、動作する環境を作ることができた。この環境で色々やってみて、変なところや不足があれば適宜修正なりなんなりやってみたい。scssはそのうち。。。
仕事やめたい。