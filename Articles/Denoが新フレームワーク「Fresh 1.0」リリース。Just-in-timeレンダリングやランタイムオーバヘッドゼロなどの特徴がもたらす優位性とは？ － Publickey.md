---

Tags: [topic/技術/NodeJS]
---
JavaScriptやTypeScriptのサーバサイドランタイム「Deno」を開発するDeno Land Inc.は、Deno用のフルスタックフレームワーク「[Fresh 1.0](https://fresh.deno.dev/)」のリリースを[発表しました](https://deno.com/blog/fresh-is-stable)。

バージョン番号の1.0が示すように、安定版としてのリリースです。

> Fresh is a new full stack web framework for Deno. It sends zero JavaScript to the client by default and has no build step. Today we are releasing the first stable version of Fresh.https://t.co/WV2C6gllsL
> [June 28, 2022](https://twitter.com/deno_land/status/1541790500985905159?ref_src=twsrc%5Etfw)

Freshは以下の特徴を持つと説明されています。

- エッジでのJust-in-timeレンダリング
- ビルドの工程が不要
- デフォルトではクライアントにJavaScriptを用いないため、ランタイムオーバーヘッドがゼロ
- 高いインタラクティブ性を実現するためアイランドベースのクライアントハイドレーションを採用
- コンフィグレーション不要
- TypeScriptをサポート

これらの特徴がFreshにどのような優位性をもたらすのでしょうか。

## 要求毎にHTMLをレンダリング。ビルド工程不要

Freshは、基本的にはすべてサーバサイド側でHTMLが生成されます。Freshの基礎部分はテンプレートエンジンとルーティングフレームワークであり、これが1つ目の特徴である「エッジでのJust-in-timeレンダリング」を実現しています。

ちなみにDeno LandはDenoをCDNのエッジロケーションで提供するサービス「Deno Deploy」を提供しているため、サーバサイドではなくあえて「エッジ」という言葉を使っているのだと推察されます。

エッジでのJust-in-timeレンダリングとは、要求が発生したタイミングでレンダリングを行い、HTMLを生成する、という意味です。これは2つ目の特徴である「ビルドの工程が不要」とも直結しています。

サーバサイドでHTMLを生成する場合、あらかじめビルドを行うことでHTMLファイルを生成しておくことで、Webブラウザから要求があった時点で生成済みのHTMLをすぐに返すことができる高速性を実現できます。ただしこの場合、デプロイする毎にビルド工程が発生するため、リリースサイクルが遅くなりがちです。

Freshでは要求毎にJust-in-timeレンダリングを行うことで事前のビルド工程を省略しました。これは事前にHTMLを生成する仕組みよりもWebサイトのレスポンスが多少犠牲になりますが、それ以上にFreshがリリースサイクルの高速さを重視しているといえるでしょう。

## サーバサイドでHTMLを生成、クライアント側のJavaScript不要

クライアントとなるWebブラウザ側ではデフォルトでJavaScriptを用いないことも、Freshの大きな特徴です。

従来のWebアプリケーションの多くで用いたれていたSPA（Single Page Application）と呼ばれる仕組みでは、WebブラウザにJavaScriptフレームワークを送信、実行して、サーバ側から送られたデータを基にDOMを生成し、Webページが表示されるという処理が行われていました。

FreshではサーバサイドでHTMLが生成され、それがWebブラウザに送られてくるため、Webブラウザは受け取ったHTMLをすぐに表示できます。これが3つ目の特徴である「ランタイムオーバーヘッドがゼロ」です。

ただしこれではWebブラウザ上でインタラクティブなユーザーインターフェイスには不向きです。

そこで登場するのが4つ目の特徴である「高いインタラクティブ性を実現するためアイランドベースのクライアントハイドレーションを採用」です。

## インタラクティブなWebページの機能も組み込める

Freshは[アイランドアーキテクチャ](https://jasonformat.com/islands-architecture/)を取り入れています。

アイランドアーキテクチャを簡単に説明するならば、Webページのヘッダやフッタ、サイドバーなどインタラクティブ性が必要なく、固定されたレイアウトとデザインを持つ部分のHTMLは、あらかじめサーバサイドで生成して静的HTMLとしてWebブラウザに送信して表示しつつ、インタラクティブ性が必要となる部分のJavaScriptは必要に応じて後から組み込む（ハイドレーションする）、という仕組みのことです。

Freshではこのインタラクティブ性を組み込む部分のJavaScriptフレームワークとしてPreactとJSX/TSXに対応しています。

これにより、WebブラウザでのランタイムオーバーヘッドなしにWebページの高速表示が可能な利点をできるだけ活かしつつ、インタラクティブなユーザーインターフェイスにも対応することを実現します。

## FreshはDenoの代表的なフレームワークに

DenoはもともとNode.js作者のライアン・ダール氏が、Node.jsでの反省を活かして新たに開発したJavaScript/TypeScriptランタイムでした。そのDenoは、フレームワークにおいても、既存のさまざまなフレームワークを見直してDeno（そしてDeno Deploy）にふさわしいものに作り直した、それがFreshなのかもしれません。

すでにDeno LandのWebサイトの多くがFreshで構築されているとのことです。今後FreshはDenoの代表的なフレームワークとなっていくと予想されます。

[シェア](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse)

[Tweet](https://twitter.com/share)