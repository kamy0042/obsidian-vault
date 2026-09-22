---
URL: https://qiita.com/Mr_ozin/items/b6749e60b185a26b97f0
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
※自分のブログに投稿したのものと同じです。[https://mr-ozin.hatenablog.jp/entry/2020/06/20/043243](https://mr-ozin.hatenablog.jp/entry/2020/06/20/043243)

### 動機

毎回 `npx create-react-app` で React アプリを生成していて Webpack の勉強から逃げていたが、いい加減向き合いたいと思ったため。
昔 Webpack に入門しようとしたら難しいという先入観を抱いたので、できるだけシンプルに、一歩一歩づつ入門する。

最終的に、React + TypeScript の環境を作れるようにする。

### リポジトリ

各ステップごとにコミットしているので逐次さかのぼってください。

[https://github.com/ryokryok/webpack-step-by-step](https://github.com/ryokryok/webpack-step-by-step)

### 前提

- 最低限の `yarn` または `npm` コマンドの使い方がわかること。
- `npx create-react-app` で React プロジェクトを作成した事があること。

※VSCode 使用を前提としています。

### Config なしで実行する

最低限の構成で Webpack が何をするのか理解する。

### 準備

`# run at project directory
yarn init -y # generate package.json
yarn add webpack webpack-cli -D
mkdir src
touch src/index.js
touch src/a.js
touch .gitignore`

gitignore

`node_modules/
dist/`

src/index.js

`import a from "./a";
a();`

src/a.js

`export default () => console.log("function called");`

### 実行

2 つの JavaScript ファイルは `import/export` で読み込まれている。
これらを Webpack で Bundle(梱包、まとめる)を行うことで依存関係が解決された 1 つの JavaScript を生成できる。

`# mode を指定しない場合は自動的に production モードで実行される
yarn webpack --mode production

Hash: 812c3c2bfa797a640163
Version: webpack 4.43.0
Time: 132ms
Built at: 2020-06-18 23:07:37
  Asset       Size  Chunks             Chunk Names
main.js  982 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js + 1 modules 79 bytes {0} [built]
    | ./src/index.js 26 bytes [built]
    | ./src/a.js 53 bytes [built]
✨  Done in 1.16s.`

dist/main.js

`!(function (e) {
  // 省略
  ...
})([
  function (e, t, n) {
    "use strict";
    n.r(t);
    console.log("function called");
  },
]);`

Webpack は Config ファイルなしでは `dist/main.js` にまとめられる。[https://webpack.js.org/configuration/](https://webpack.js.org/configuration/)

> Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is src/index.js and will output the result in dist/main.js minified and optimized for production.

### Config ファイルを設定する

Webpack の最低限の働きが理解できたので、次は Config ファイルを設定する。
まずは Bundle するファイル、Bundle で出力されるファイルを明示的に指定する。

### 準備

`webpack.config.js` を作成して設定する。設定用の JavaScript オブジェクトを書いて、`module.exports` すれば良い。

ついでに、npm script を設定して実行を単調なコマンドで実行できるようにする。

`touch webpack.config.js`

webpack.config.js

`const path = require("path");

module.exports = {
  // 入力元
  entry: "./src/index.js",
  // 出力先
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "bundle.js",
  },
};`

package.json

- `}
+ },
+ "scripts": {
+ "build": "webpack --mode production"
+ }`

### 実行

出力先を変更したので実行すると `output/bundle.js` に出力される。

`yarn build
$ webpack --mode production
Hash: c4b26abe6d1df8044083
Version: webpack 4.43.0
Time: 173ms
Built at: 2020-06-18 23:46:27
    Asset       Size  Chunks             Chunk Names
bundle.js  982 bytes       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js + 1 modules 79 bytes {0} [built]
    | ./src/index.js 26 bytes [built]
    | ./src/a.js 53 bytes [built]
✨  Done in 1.63s.`

### 自動更新と開発用サーバーを実行する

現段階では変更があるたびに毎回 `yarn build` する必要がある。これでは面倒なので、ファイルが保存されるたびに自動的に変更を反映させる。

HTML ファイル内で JavaScript を実行したときの環境を作成する。

### 準備

開発環境用サーバー& build 用に `webpack-dev-server` と `html-webpack-plugin` を導入する。

導入する Plugin は `webpack.config.js` の `plugins` に追加する。

`public` ディレクトリーに `index.html` を作成する。JavaScript が HTML 内で動作していることを確認するするため、実行されると `<div id='root'>` 内の文字が変わるようにした。

`html-webpack-plugin` の設定にて `template:` に作成した HTML のパスを設定する。これによって開発用サーバーが立ち上がると指定した HTML に自動的に JavaScript を注入し、変更があるたびに更新する。

[https://github.com/jantimon/html-webpack-plugin#options](https://github.com/jantimon/html-webpack-plugin#options)

`yarn add webpack-dev-server html-webpack-plugin -D
mkdir public
touch public/index.html`

public/index.html

`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="root">JavaScript will be injected here.</div>
  </body>
</html>`

src/a.js

`const endPoint = document.getElementById("root");
export default function a() {
  endPoint.innerHTML = "JavaScript is injected!";
}`

webpack.config.js

`const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};`

package.json

`"scripts": {
  "build": "webpack --mode production",
+  "start": "webpack-dev-server"
},`

### 実行

`yarn start` で開発用サーバーが `http://localhost:8080/` で立ち上がる。
無事 JavaScript が実行されている場合、 `JavaScript will be injected here.` の箇所が `JavaScript is injected!` に置き換わっている。`a.js` の文字列を書き換えて保存すると自動的に反映される。

また `html-webpack-plugin` を導入したので `yarn build` 時に `index.html` も出力してくれる。これを導入しない場合、 `bundle.js` しか出力されない。

[https://webpack.js.org/plugins/html-webpack-plugin/#root](https://webpack.js.org/plugins/html-webpack-plugin/#root)

`# launch dev sever at http://localhost:8080/`
yarn start

# build dist/bundle.js and dist/index.html
yarn build`

### TypeScript を扱えるようにする

現段階では JavaScript しか扱えない。Webpack では様々なファイルを取り扱えるようにするため、各ファイルごとに `loader` が提供されている。
今回は TypeScript の loader、 `ts-loader` を導入する。

[https://webpack.js.org/loaders/#root](https://webpack.js.org/loaders/#root)

### 準備

`typescript` と `ts-loader` を導入する。

TypeScript を実行するときは `tsconfig.json` も必要なので設定する。
今回は `yarn tsc --init` で生成したものからコメント行を削除した。
(2020/7/23 追記)`tsconfig.json` に `"moduleResolution": "node",` 追記。

また、`tsconfig.json` にて `"module": "ESNext"` を指定すること。(標準では"CommonJS" が指定されている)
Webpack の Tree Shaking(未使用の JavaScript を削ってファイルサイズを軽減する機能)を働かせるために必要。

`webpack.config.js` には `ts-loader` が拡張子 `.ts` のファイルに対して働くようにする。
また、 `resolve.extensions` で拡張子を指定しておくと、その拡張子は `import` 時に省略できる。

TypeScript ファイルで実行するため JavaScript ファイルの拡張子を `.js` から `.ts` に変更する。

`yarn add typescript ts-loader -D
# generate tsconfig.json
yarn tsc --init
mv src/index.js  src/index.ts
mv src/a.js  src/a.ts`

tsconfig.json

`{
  "compilerOptions": {
    "target": "es5",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true
  }
}`

webpack.config.js

`const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};`

src/a.ts

`const endPoint = document.getElementById("root");

export default function a() {
  // null check for endPoint
  if (endPoint) endPoint.innerHTML = "JavaScript is injected, from TypeScript";
}`

### 実行

先程と同じ。TypeScript は JavaScript に変換され、Webpack によって 1 つの JavaScript ファイルにまとめられる。

`# launch dev sever at http://localhost:8080/`
yarn start

# build dist/bundle.js and dist/index.html
yarn build`

### React + TypeScript を扱えるようにする

最後に、TypeScript 環境で React(TSX)を扱えるようにする。が、実は前項にてほぼ準備は済んでいる。
TypeScript のコンパイラは TSX をサポートしているため、設定を少し加えて React のライブラリと型ファイルを読み込むめば済む。

[https://www.typescriptlang.org/docs/handbook/jsx.html](https://www.typescriptlang.org/docs/handbook/jsx.html)

### 準備

React のライブラリと型ファイルを導入する。

`webpack.config.js` には、`entry` 、loader 用の `test`、`resolve.extensions` を変更する。

`tsconfig.json` には `"jsx": "react"` を追記するだけ。

`yarn add react react-dom @types/react @types/react-dom
touch src/index.tsx
touch src/App.tsx`

webpack.config.js

`const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};`

tsconfig.json

`{
  "compilerOptions": {
    "jsx": "react",
    "target": "es5",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true
  }
}`

src/App.tsx

`import React from "react";

export default function App() {
  return <div>Hello React with TypeScript</div>;
}`

src/index.tsx

`import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));`

### 実行

前項と同じ。`yarn start` と `yarn build`

### まとめ

というわけで0から順を追ってちょっとづつ追加した。
説明においては「これはおまじないです」というのをできるだけ避けた。

初見ではWebpackのConfigファイルが複雑に見えるかもしれないが、設定を1つ1つ、意味を確認しながら追加すれば難しくなかった。

あとはCSSを読み込むために `style-loader` を入れたりして作りたいものに合わせてカスタマイズする。

### 参考

[https://mizchi.hatenablog.com/entry/2020/05/03/151022](https://mizchi.hatenablog.com/entry/2020/05/03/151022)[https://ics.media/entry/16329/](https://ics.media/entry/16329/)[https://webpack.js.org/guides/](https://webpack.js.org/guides/)