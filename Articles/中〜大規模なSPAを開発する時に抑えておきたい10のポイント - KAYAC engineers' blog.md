---
Created: 2021-01-15T18:10:00
URL: https://techblog.kayac.com/10-spa-knowhow
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
こんにちは。カヤックのSPAおじさんこと[島津](https://www.kayac.com/team/shimazu-junya)です。

今年はReactとVueを使ったSPA開発プロジェクトをいくつか担当してきたので、そこで得た知見の総まとめをしたいと思います。

※ ここでのSPAとはすべてのViewをJavaScriptで書くWebアプリのことを指します。サーバーサイドMVCを主軸にViewの一部をReactやVueで書くこともありますが、今回はそのケースではありません。

## 1. フレームワーク

数年前とは事情が変わり、
フレームワークを使わないという選択肢は昨今だともう無いでしょう。丸腰のJSでDOMを弄っていた時代に比べると、かなり安定したフロントエンドの開発ができるようになりました。

人気フレームワークの台頭になっている

React + Redux

Vue + Vuex

をこの1年使ってきましたが、書き方は違えどFluxアーキテクチャ・仮想DOM・コンポーネント志向という大枠含め共通点はかなり多いです。

特にVueのv2はReactより後発のため、Reactで面倒だったあれこれが改善されていて、学習コスト・開発コストが大幅に低くなっているという印象です。

その影響もあり、カヤックの新規プロジェクトでSPAを導入する場合は
Vue + Vuexを採用することが多くなってきています。

## 2. 開発環境

特別な事情がなければwebpackやgulp等タスクランナーの設定を書くコストが浮くので、公式が提供しているボイラープレートを使用するのがおすすめです。

Reactの時は、[create-react-app](https://github.com/facebookincubator/create-react-app)

Vueの時は [vue-cli](https://github.com/vuejs/vue-cli)

を利用していました。設定不要で

`npm install` → `npm start`

だけですぐに開発がスタートできます。

## 3. クライアントサイドルーティング

これもスクラッチで開発するメリットはほぼないので、公式のルーターを使いましょう。

[react-router](https://github.com/ReactTraining/react-router)[vue-router](https://github.com/vuejs/vue-router)

## 4. CSS

### CSSフレームワークを導入する場合

Bootstrapなど多くのCSSフレームワークは一部の挙動がjQueryに依存しているため、そのまま導入すると結構バグりました。CSSフレームワークに限らずですが、jQueryとVirtualDOMはまぜると危険ですね。

React ComponentやVue Componentとして提供されているもの

[react-bootstrap](https://react-bootstrap.github.io/)

[bootstrap-vue](https://bootstrap-vue.js.org/)

を使うか、JS依存のないフレームワーク

[bulma](https://bulma.io/)

[Picnic CSS](https://picnicss.com/)

などを利用するのがSPAとの相性を考えると吉です。

ちなみにVueのマテリアルデザインフレームワーク
[Vuetify](https://vuetifyjs.com/)
を実際のプロジェクトで導入しましたが、コンポーネントも豊富で使い心地良かったです。

### Scoped CSS

独自に書くCSSは、コンポーネント単位でのCSSを書けるScoped CSSを導入するのがおすすめです。グローバルスコープが汚れず衝突の心配もなく、末永く安心してCSSが書けます。

Reactでは、
(react-css-modules)[https://github.com/gajus/babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
を使っていました。

Vueはデフォルトで `<style scoped=""> 〜 </style>` の中に書くだけでOKなので、Reactと比較して超楽ちんになったと感じた機能の一つです。

## 5. ユーザー認証

APIとクライアントが疎結合なため、以下のような認証フローが必要になります。

![](https://user-images.githubusercontent.com/1800369/34323517-4140dd8e-e890-11e7-8bef-8a071746d6a6.png)

表示するビューの制御については、
認証前後のコンポーネントを切り替えます。
Reactの便宜で簡単に示すと以下のようなものです。

```plain text
<App>
  <Signin /> // → 未ログイン状態のとき表示
  <Mypage /> // → ログイン済みのとき表示
</App>
```

実装の詳細はrouterの公式マニュアルに記載されている方法が参考になります。

react-router

[https://reacttraining.com/react-router/web/example/auth-workflow](https://reacttraining.com/react-router/web/example/auth-workflow)

vue-router

[https://router.vuejs.org/ja/advanced/meta.html](https://router.vuejs.org/ja/advanced/meta.html)

## 6. 環境変数

APIのルートURLなど、開発環境と本番環境で変えたいオプションは必ず出てきます。

以下のbabel pluginを使うことで、Node.jsではおなじみの `process.env.HOGEHOGE` が
クライアントサイドでも参照できるようになります。

[babel-plugin-transform-inline-environment-variables](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables)

※ 実際はprocess.envに環境変数が入るわけではなく

ソース

```plain text
if (process.env.NODE_ENV === 'development') {
  // 開発環境のみ実行するコード
}
```

`NODE_ENV=development npm run build` でビルド後

```plain text
if ('development' === 'development') {
  // 開発環境のみ実行するコード
}
```

のように変換される仕組みになっています。
これにより、envがすべてクライアントサイドに丸見えになってしまうという危険性はなく安心して使えます。

## 7. ディレクトリ構成とFluxアーキテクチャ

Reduxも、Vuexも堅牢なFluxアーキテクチャを提供してくれるフレームワークではありますが、ディレクトリ構成が決められているわけではありません。規模に応じて柔軟に構成を変えられるメリットがあるのですが、設計に迷ってしまう部分でもあります。

規模が大きくなる場合、関心事を適度に分離するよう
"モジュール" という概念でディレクトリを括るというのを実践してきましたが、これは導入して正解だと思ったので紹介します。

React + Reduxでは、Ducksと呼ばれる構成方針があり、導入していました。
簡単にいうと、reducer, actionを一つのファイルにまとめるというものです。

Vuexにはデフォルトでmoduleという機能がデフォルトで備わっているので、
こちらを使うと良いでしょう。
[https://vuex.vuejs.org/ja/modules.html](https://vuex.vuejs.org/ja/modules.html)

## 8. ビルド＆デプロイシステム

本番運用するためには、デプロイとビルドは同時に自動実行するよう仕組みを作っておくべきです。

ビルド後に生成するファイルは以下のようなものが一般的だと思います。(webpack利用の場合)

```plain text
public/
 index.html → ルートのHTML
 script.js → ビルドしたJS（CSSも含む）
 static/**/* → 画像など
```

上記のファイルを、`npm run build` 等のコマンド出力できるようにしておきます。

自動化には

- CircleCIやTravisCIなどgithubと連動したCIサービスを使う
- gitのwebhook + ビルドとデプロイを実行するコマンドAPIを用意する

等の方法があります。
CIサービスを使ったほうが、コンテナを使ったビルドを行っていて
冪等性が確保されいるのでオススメです。

CircleCIからAWS S3へコードをビルド & デプロイするサンプルはこちら
[jshimazu/circlci-s3deploy-example](https://github.com/jshimazu/circlci-s3deploy-example)

## 9. サーバーサイドレンダリング （※ 以下SSR)

SEOが必要なアプリに関してはこの対応が必須になってきます。
簡単に解決できるベストプラクティスはあまりなく、力技を要します。

選択肢としては、以下の3つになります。

1. 何もしない
2. サーバーサイドアプリレイヤーでSSR処理を実装する
3. ヘッドレスブラウザを利用したPrerendering

> １. 何もしない

というのは実は怠惰ではなく、Googleのクローラはここ数年で進化してきているので、ある程度JSでレンダリングしたものをインデックスしてくれています。（実際にインデックスされているのを確認しました）ただ、レンダリングするタイミングよってはコンテンツがインデックスされなかったり、100%の精度とはまだ言えないようなので、確実なSEOを求める場合は、SSRを検討した方が良いです。

また、Google以外のクローラの多くはSSRの状態しか読み取らないので、
シェア画像をURLごとに最適化したいケースなどは、この方法は使えないでしょう。

> ２. サーバーサイドアプリレイヤーでSSR処理を実装する

Isomophic (Universal) Javascriptと呼ばれるものです。
expressなどでクライアント側で利用しているコンポーネントをサーバーサイドレンダリングする仕組みを作ります。クライアント固有のオブジェクト（例えばwindow)などは利用できないので、そのあたりを最適化する必要があります。レンダリング前にAPIから必要なデータを取得して表示するというのも、コツコツ実装していきます。

実装していて冗長感が否めないところですが、
フレームワーク・言語問わず「どこまでクライアントサイドとファイルを共有できるか」というのがポイントとなります。
実装言語はJSに限らず、各言語でSSRをサポートしてくれるライブラリがあり、Ruby on Railsを利用していた時には [reactjs/react-rails](https://github.com/reactjs/react-rails) などがありました。

いまから新規開発するなら
SSRのためのライブラリも成長してきているので、

Reactなら [Next.js](https://github.com/zeit/next.js/)

Vueなら [Nuxt.js](https://ja.nuxtjs.org/)

を導入してみたいところです。

> ３. ヘッドレスブラウザを利用したPrerendering

ヘッドレスブラウザはレイテンシが大きく、キャッシュして返す仕組みが必須なため、スクラッチで作ると結構大掛かりです。メリットとしては、2のSSRのように冗長な実装が不要なところです。

(prerender.io)[https://prerender.io/](https://prerender.io/) のようなPrerenderを代行してくれるSAASもあるので、予算との兼ね合いがありますが利用するのも実装コストを抑える手段の一つとしてありそうです。

## 10. サーバー構成

4のSSRが必要無い場合は性能限界の心配がない

CDN + ファイルストレージ

がおすすめです。

(AWSだと、Cloudfront + S3)

この場合、どのURLでアクセスしてもindex.htmlをレンダリングするような設定が必要です。
AWS Cloudfrontを利用していたので、Custom Error Pageの仕組みを使って ファイルが存在しなかった場合index.htmlを返すよう設定していました。

参考： Cloudfront Custom Error ページの設定 [http://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html#custom-error-pages-cache-behavior](http://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html#custom-error-pages-cache-behavior)

![](https://user-images.githubusercontent.com/1800369/34320474-773bcec8-e83e-11e7-9136-40a21b728c92.png)

SSRが必要な場合は、以下のようにAPIとは別のアプリケーションサーバーが必要になります。

![](https://user-images.githubusercontent.com/1800369/34320476-80444d6a-e83e-11e7-8b6b-4b6627021569.png)

## まとめ

半年前くらいまではReactおじさんと名乗っていましたが、
今はすっかりVue使いとなっています。

そして数年後にはVueでもReactでもないフレームワークが現れてもおかしくない状況ですよね。

SPAはWebをより快適にするために必要な技術なので
きっと今後も破壊的な進化を続けていくでしょう。

そんな時代を生き抜くためには、フレームワークの栄枯盛衰に一喜一憂せず、
本質的なところを抑えておくことが大切だと思っています。

- SPA環境構築
- Fluxアーキテクチャ
- コンポーネント志向

この辺りは必ず今後も生き残っていくものになるはず。

ということで、この記事が誰かの今後のSPA開発の参考になれば幸いです。

[KayacではSPAをガシガシ開発してみたいエンジニアを募集しています。](https://www.kayac.com/recruit/career)