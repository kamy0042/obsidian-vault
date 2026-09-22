---
URL: https://qiita.com/geek_duck/items/6f99a3da15dd39658fff
Updated: 2021-01-03T01:24:00
Created: 2021-01-02T17:21:00
Tags: [topic/技術/React, topic/技術/ビルドツール]
---
## はじめに

最近はReact.jsでフロント側、SpringBoot/GrailsでAPI側を作るプロジェクトに関わっています。

そのプロジェクトの中で調べた、知っていると捗る[create-react-app](https://facebook.github.io/create-react-app/)の設定を紹介したいと思います。

### この投稿で使用している言語、ライブラリのバージョン

- Node.js v10.14.1
- npm v6.4.1
- create-react-app v2.1.1
- react.js v16.6.3

## create-react-app基本の使い方

最初にcreate-react-appの基本的な使い方をサッと紹介します。

[create-react-app](https://facebook.github.io/create-react-app/)は、React.jsのアプリのひな形を作成してくれるツールです。

以下のnpxコマンド経由でcreate-react-appを実行するとsampleという名前のReactアプリが出来上がります。

`$ npx create-react-app sample
$ cd sample`

create-react-appで作成したプロジェクトはbabelやwebpackやESLintの設定が済んでおり、

以下の`npm start`コマンドを実行することで開発サーバをlocalhost:3000で起動しつつブラウザで開いてくれます。

`$ npm start`

本番環境用にJSファイルを1つにまとめたい場合は`npm run build`を実行するとbuildディレクトリにまとめてくれます。

`$ npm run build
$ ls build`

babelやwebpackやESLintの設定を細かく変更したい場合は`npm run eject`を実行します。

configディレクトリ以下にwebpackの設定ファイルが作成され細かく設定できるようになります。

`$ npm run eject
$ ls config`

## 開発中にAPIサーバにリクエストを投げたい

SPAアプリを構築する場合、フロントエンドのReactアプリからバックエンドのAPIサーバを叩きにいくことになります。

ローカルで開発している最中は、APIサーバのURLが[SameOriginポリシー](https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy)に引っかかってそのままではAPIサーバにアクセスできないことが多々あります。

例えばローカルで以下のようなURLでReactアプリとAPIサーバを動かす場合は、ポート部分が異なるためブラウザのSameOriginポリシーに引っかかります。

- [https://localhost:3000](https://localhost:3000/) ... ローカルのReactアプリの開発サーバ
- [https://localhost:8080](https://localhost:8080/) ... ローカルのAPIサーバ

このような場合、`package.json`にproxyプロパティを追加することでSameOriginポリシーを回避できます。

package.json

`  "proxy": "http://localhost:8080",`

こうすると`http://localhost:3000`に対するリクエストのうち、`Accept`ヘッダが`text/html`以外のリクエストを全て`http://localhost:8080`にproxyします。

Reactアプリから`fetch("/api/auth")`を実行した場合、ブラウザは`http://localhost:3000/api/auth`にリクエストを投げ、開発サーバが`http://localhost:8080/api/auth`にproxyします。

ブラウザから見れば`http://localhost:3000/api`にアクセスしているように見えるのでSameOriginポリシーに引っかかりません。

もしAPIサーバが複数種類ある場合はproxyプロパティではなく、`http-proxy-middleware`を使います。

`$ npm i -D http-proxy-middleware`

`src/setupProxy.js`を作成し、proxyの詳細な設定を書きます。(内部的には[expressのmiddleware](https://expressjs.com/ja/guide/using-middleware.html)として動作します。)

src/setupProxy.js

`const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy("/api/auth", { target: "http://localhost:8080/" }));
  app.use(proxy("/api/users", { target: "http://localhost:8081/" }));
};`

上記のように設定することで、Reactアプリから`fetch("/api/auth")`を実行した場合は`http://localhost:8080/`へ、`fetch("/api/users")`を実行した場合は`http://localhost:808/`にproxyされます。

注意点としてproxy設定は`npm start`の時だけ有効で、`npm run build`した後は効きません。

## 開発環境、本番環境でアプリに渡す環境変数を切り替えたい

開発環境や本番環境それぞれの環境で設定値を切り替えたい場合は、各環境に合わせた`.env`ファイルを用意するのが簡単です。

- `.env` : デフォルト
- `.env.local`: ローカル環境用(Environmentモードがtestの場合は読み込まれない)
- `.env.development, .env.test, .env.production`: それぞれのEnvironmentモードで読み込まれる
- `.env.development.local, .env.test.local, .env.production.local`: ローカル環境用

create-react-appは[dotenv](https://www.npmjs.com/package/dotenv)を利用しており、`.env`ファイルで指定した設定値はReactアプリ内から`process.env`経由でアクセスできます。

`.env`ファイルには、`REACT_APP_`から始まる変数名=値 の形式で記述します。

.env

`REACT_APP_SOME_VALUE=hogehoge`

アプリからは`process.env.REACT_APP_xxxx`で値を取得します。

App.js

`render() {
  return {
    <div>{process.env.REACT_APP_SOME_VALUE}</div>
  }
}`

`.env`ファイルを使わずに`npm start`や`npm run build`実行時の環境変数として指定することも可能です。

`$ REACT_APP_SOME_VALUE=hogehoge npm start`

例として、あるコンポーネントについて開発環境とステージング環境では表示したいが、本番環境ではまだ表示したくない場合は以下のように実現できます。

App.js

`render() {
  // REACT_APP_SHOW_SOME_COMPONENTで表示/非表示をコントロール
  const flag = process.env.REACT_APP_SHOW_SOME_COMPONENT && process.env.REACT_APP_SHOW_SOME_COMPONENT.toLowerCase() === "true";
  return {
    <div>
      {flag && <SomeComponent />}
    </div>
  }
}`

環境変数で表示するかどうかを指定してビルドします。

`$ REACT_APP_SHOW_SOME_COMPONENT=true npm run build`

注意点として、create-react-appはアプリ実行時やビルド時にNODE_ENVを指定できず([ソースコードはこの辺](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/start.js#L12-L13))、

- `npm start`を実行した時は`development`モード
- `npm run test`を実行した時は`test`モード
- `npm run build`を実行した時は`production`モード

と実行方法でEnvironmentモードが固定されてしまいます。

そのため`npm run build`時に環境変数`NODE_ENV=development`を指定して`.env.development`を読み込ませる、といったことはできません。

## オートリロード機能をタブごとに無効化したい

## おわりに

APIとの連携や、環境変数で設定値を渡す方法はよくやりたくなるので知っておくと捗ると思います💪

明日の担当は [@nobeans](https://qiita.com/nobeans) です。お楽しみに🎉