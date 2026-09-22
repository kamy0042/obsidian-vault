---
URL: https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html
Updated: 2020-12-31T16:05:00
Created: 2020-12-31T16:05:00
Tags: [topic/技術/React, topic/技術/ビルドツール]
---
2018-06-24

# **react-create-appで作成したTypeScriptのプロジェクトのwebpack.configを上書きする**

[typescript](https://blog.mitsuruog.info/tags/typescript/)
    
      [react](https://blog.mitsuruog.info/tags/react/)

タイトル長くてすみません。

ひと昔前までは、[react-create-app](https://github.com/facebook/create-react-app)で作成したプロジェクトのwebpack.configを上書きするには、`eject`するしか方法がなかったのですが、現在は [react-app-rewired](https://github.com/timarney/react-app-rewired)を使うことで上書きが可能です。

> この方法を使った場合、react-create-appが提供するツールの動作保証対象外となります。つまり、これ以降発生した問題は自己責任で解決しなければなりません。ご注意ください。

紹介する内容は、こちらのGithubで見ることができます。

- [https://github.com/mitsuruog/create-react-app-typescript-rewired-styleguidist](https://github.com/mitsuruog/create-react-app-typescript-rewired-styleguidist)

## [react-app-rewiredを導入する](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#react-app-rewired%E3%82%92%E5%B0%8E%E5%85%A5%E3%81%99%E3%82%8B)

[基本的にはリポジトリにあるREADME.mdの通りに導入します。より具体的な例については後で少し紹介します。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#react-app-rewired%E3%82%92%E5%B0%8E%E5%85%A5%E3%81%99%E3%82%8B)

### [react-app-rewiredをインストールする](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#react-app-rewired%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B)

[まずnpmモジュールをインストールします。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#react-app-rewired%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B)

[`npm install react-app-rewired --save-dev
1`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#react-app-rewired%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B)

### [プロジェクトのルートディレクトリに](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%88%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%ABconfig-overrides-js%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)[`config-overrides.js`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%88%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%ABconfig-overrides-js%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)[を作成する](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%88%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%ABconfig-overrides-js%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)

[プロジェクトのルートディレクトリに](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%88%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%ABconfig-overrides-js%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)[`config-overrides.js`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%88%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%ABconfig-overrides-js%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)[を作成します。とりあえず、ファイルの中身は公式ドキュメントのままにしておきますが、詳しくは後で紹介します。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%88%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%ABconfig-overrides-js%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)

[`module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}
1234`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%88%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%ABconfig-overrides-js%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)

### [`package.json`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[の](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[`sctipts`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[を変更する](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)

[`package.json`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[を変更します。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)

[基本的には](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[`react-scripts`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[の部分を](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[`react-app-rewired`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[に変更すればいいのですが、TypeScriptプロジェクトの場合は](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[`--scripts-version`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[に起動スクリプトの名前が必要です。これは、react-app-rewiredの内部でTypeScript用の起動スクリプトにスイッチするために利用しています。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[

](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)[`"scripts": {
-  "start": "react-scripts start",
+  "start": "react-app-rewired start --scripts-version react-scripts-ts",
-  "build": "react-scripts build",
+  "build": "react-app-rewired build --scripts-version react-scripts-ts",
-  "test": "react-scripts test --env=jsdom",
+  "test": "react-app-rewired test --env=jsdom --scripts-version react-scripts-ts",
},
12345678`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#package-json%E3%81%AEsctipts%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)

### [動作確認する](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)

[最後にプロジェクトの開発用サーバーの起動とビルドの確認をします。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)

[`# 開発用サーバーの起動
npm start

# ビルド
npm build
12345`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)[
](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)[正しく動いているようであれば、ひとまず導入は完了です。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)

## [`config-overrides.js`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#config-overrides-js-%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B)[ をカスタマイズする](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#config-overrides-js-%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B)

[上の内容では元のWebconfigのままなのでカスタマイズする必要がありますが、その内容は](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#config-overrides-js-%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B)[**中〜上級者向け**](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#config-overrides-js-%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B)[です。カスタマイズのプロセスは次の通りです。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#config-overrides-js-%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B)

1. [ここから](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#config-overrides-js-%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B)[config-overrides.jsのテンプレート](https://github.com/timarney/react-app-rewired#extended-configuration-options)を取得する
2. 設定変更用の関数(慣例で`rewire(再結線する)`と呼ぶことが多い)を作成する
3. rewire関数をconfig-overrides.jsに追加する

`config-overrides.js`のテンプレートは大まかに次のようなファイルになっています。いくつかカスタマイズできるポイントがあるのですが、webpack.configのカスタマイズだけであれば、`webpack`の部分だけ注視していればいいと思います。

```plain text
module.exports = {
  // 開発サーバーのカスタマイズポイント
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      // デフォルト設定の開発サーバーを作成する
      const config = configFunction(proxy, allowedHost);

      // この辺でカスタマイズする

      return config;
    }
  },
  // `npm test`のカスタマイズポイント
  jest: function (config) {

    // この辺でカスタマイズする

    return config;
  },
  // webpack.configのカスタマイズポイント
  webpack: function (config, env) {

    // この辺でカスタマイズする

    return config;
  },
};
123456789101112131415161718192021222324252627
```

### [(実践例)Sass設定のカスタマイズ](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)

[では、既存のwebpack.configのSass設定をカスタマイズして](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`sass-loader`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[を追加してみましょう。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)

[`react-create-app`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[の公式では別の方法が推奨されていますが、自分はこの昔ながらのやり方が好きなのです。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[
](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[まず、Sass設定を上書きする](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`rewireSass`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[関数を作成します。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[

](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`// config-overrides.js
const rewired = require('react-app-rewired');

function rewireSass(config) {
  const cssLoader = rewired.getLoader(
    config.module.rules,
    // ここでloaderをフィルタする
    rule => rule.test && String(rule.test) === String(/\.css$/)
  );

  // 新しいsass-loaderの設定
  const sassLoader = {
    test: /\.scss$/,
    use: [...(cssLoader.loader || cssLoader.use), 'sass-loader']
  };

  // sass-loaderを追加する
  const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
  oneOf.unshift(sassLoader);

  return config;
}
12345678910111213141516171819202122`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[
](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`react-app-rewired`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[のパッケージに](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`getLoader`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[というloaderをpick upする関数があるので、これを使って既存のconfigから上書きするターゲットのloaderだけを抽出します。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[
](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[あとは、コードを見てもらうとわかると思うのですが、普通のJavaScriptプログラミングです。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[途中、](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`console.log`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[などを出しながら途中経過を見てカスタマイズしていきます。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[なので、将来react-create-app側のwepack.configが変わったり、Webpack自体のバージョンが上がった場合は、容易に動作しなくなると思います。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[
](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[この](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`rewireSass`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[関数を](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`config-overrides.js`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[に追加します。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[

](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[`// config-overrides.js

function rewireSass(config) {
  ...
}

module.exports = {
  // 開発サーバーのカスタマイズポイント
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      // デフォルト設定の開発サーバーを作成する
      const config = configFunction(proxy, allowedHost);

      // この辺でカスタマイズする

      return config;
    }
  },
  // `npm test`のカスタマイズポイント
  jest: function (config) {

    // この辺でカスタマイズする

    return config;
  },
  // webpack.configのカスタマイズポイント
  webpack: function (config, env) {

    // この辺でカスタマイズする
    config = rewireSass(config, env); // <--------- ここに追加

    return config;
  },
};
12345678910111213141516171819202122232425262728293031323334`](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[
](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)[SassファイルがWebpackで変換されていれば、無事OKです。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E5%AE%9F%E8%B7%B5%E4%BE%8B-Sass%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA)

## [まとめ](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)

[react-create-appのWebpack.configをカスタマイズする方法でした。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)

[react-create-app便利なのですが、いままで作ったプロダクトではカスタマイズしなかったことなかったなぁ。。。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)[ちなみにカスタマイズは「](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)[**自己責任**](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)[」です。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)[
](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)[カスタマイズする人は、「なぜ最近のWebフロントエンドはこんなに難しくなったのか。。。」と血の涙を流しながらやるといいでしょう。](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)

[新しい記事
      ](https://blog.mitsuruog.info/2018/06/react-app-rewired-typescript.html#%E3%81%BE%E3%81%A8%E3%82%81)[
        typesafe-actionsを使って型安心なRedux Storeを実装する](https://blog.mitsuruog.info/2018/12/typesafe-redux-store)

古い記事

[親子でマイクラ ー HerokuにMincraftのプライベートサーバーを立てる](https://blog.mitsuruog.info/2018/06/heroku-minecraft-server)