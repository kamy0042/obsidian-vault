---
URL: https://zenn.dev/sakito/articles/7002f4d1097a85cb2b31
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
10/10 に [webpack v5 がリリースされた](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)ので、今回は変更点や気をつけたい点をまとめてみました。

# プロダクションで使うのはまだ早いかも(2020/10/27時点)

webpack v5 のリリースは行われたが、まだバグが多くあり、webpack で使用する loader や plugin は対応が追いついていません。
パッと[webpack 5 関連の Issue](https://github.com/webpack/webpack/issues?q=is%3Aissue%20is%3Aopen%20label%3Awebpack-5)を眺めるだけでも、まだ多くの問題があることがわかります。
なので、webpack v5 を使用するのは安全にいきたければ 1,2 ヶ月ほど待ってもよいと思います。
いまはこのバグ対応によりすでに webpack のバージョンは v5.3.0 になっています。

試して見たい方は [v4 から v5 へのマイグレーションガイド](https://webpack.js.org/migrate/5/)を参考にするとよいです。

# 周辺ツールの現状

webpackを使用するにあたって特に重要な [webpack-dev-server](https://github.com/webpack/webpack-dev-server) と [webpack-cli](https://github.com/webpack/webpack-cli) の現状をまとめました。

## webpack-dev-server

現在の webpack-dev-server は webpack v5 対応のバージョンががまだリリースされてないので、動かないケースが何点かあります。

- [webpack cli v4 と webpack-dev-server を組み合わせた時に起きる問題についての Issue](https://github.com/webpack/webpack-dev-server/issues/2759)
- [browserslist 使用時のバグ](https://github.com/webpack/webpack-dev-server/issues/2758)

## webpack-cli

webpack v5 対応のため [v4 のリリース](https://github.com/webpack/webpack-cli/releases/tag/webpack-cli%404.0.0)はされていますが、上記でも書いている通り、webpack dev server と組み合わせるとバグがあります。

webpack cli v4 から webpack-dev-server の起動を`webpack serve`コマンドに統合するようになっています。[webpack serve コマンドの案内を促すエラー文の実装](https://github.com/webpack/webpack-dev-server/pull/2772)

新機能として`webpack --analyze`コマンドで、[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) を使用して、各モジュールのバンドルサイズを可視化することができるローカルサーバーを立ち上げることができます。便利。

# [変更内容](https://webpack.js.org/blog/2020-10-10-webpack-5-release/#major-changes-removals)

主に下記のような変更があります。

- 永続的なキャッシング
- TS の対応で`@types/webpack`が不要になり、`import { WebpackOptionsNormalized } from 'webpack';` で型を import できるようになった。(ファイル名を webpack.config.ts にする必要がある)
- Tree Shaking の最適化が入りバンドルサイズ縮小に期待できる
- CommonJs の Tree Shaking 対応
- css の chunk が可能になった([MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)使用時にできる)

ここでは特に大きな破壊的変更を 2 つほど紹介します。

## Node.js の polyfill を自動で挿入しなくなった

webpack を使用すれば、Node.js のコードをクライアントサイドで使用し、自動で polyfill を挿入してくれていました。

今後 webpack は Web で動作するコードに焦点を当てていくため、Node.js の polyfill がバンドルに含まれ、結果的にバンドルサイズがデカくなくることを望まないようになったので、
自動で polyfill を挿入しなくなります。

polyfill を挿入したい場合は[webpack/node-libs-browser](https://github.com/webpack/node-libs-browser)を参照して、自前で挿入する必要があります。
また、クライアントサイドで Node.js に依存したパッケージを使用している場合は、パッケージの対応を待つか、フロントエンド互換のあるパッケージに変更する必要があります。

`global`,`__filename`,`__dirname`も webpack の設定でデフォルト`false`に変更されるので、使用したい場合は明示的に変更する必要があります。

## デフォルトランタイムが一部 ES2015 になった

webpack が生成するコードが一部 ES2015 になったので、明示的に es5 への対応が必要になりました。
browserslist のサポートが含まれたので、browserslist の設定 or webpack の設定を変える、２つの選択肢があります。

- webpack の設定

webpack.config.js



`module.exports = {
  target: ['web','es5']
};`

- browserslist の設定

.browserslistrc



`last 1 version
ie >= 11`

package.json



`  "browserslist": [
    "last 1 version",
    "> 1%",
    "ie >= 11"
  ]`

# さいごに

日本語で webpack v5 について解説を入れてくれている方もいるので、変更点についてはこちらが非常に参考になります。[webpack@5の主な変更点まとめ](https://blog.hiroppy.me/entry/webpack5)