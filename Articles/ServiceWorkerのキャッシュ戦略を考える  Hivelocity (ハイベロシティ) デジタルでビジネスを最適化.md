---
Updated: 2021-01-08T02:53:00
Created: 2021-01-08T02:53:00
URL: https://www.hivelocity.co.jp/blog/46047/
Tags: [topic/技術/PWA]
---
先日Workboxを使ってServiceWorkerのキャッシュ機能を体感してみました（前回記事『[Workbox + webpackでServiceWorkerのオフラインキャッシュと戯れる](https://www.hivelocity.co.jp/blog/46013/)』を参照ください）が、手当たり次第にキャッシュしてしまうとキャッシュストレージを圧迫してしまったり、更新性の高いコンテンツが反映されなかったりとさまざまな問題に直面します。

自社プロダクトへの実装を考えるにあたり、キャッシュ戦略についてもう少し理解を深めて（考えて）みたいと思います。

## Pre CacheとRuntime Cache

[Workboxを触った時](https://www.hivelocity.co.jp/blog/46013/)に、ServiceWorkerでキャッシュを扱う際に大きな概念として**“Pre Cache”**と**“Runtime Cache”**の2つが登場しました。これはキャッシュを生成するタイミングを管理する要素になります。

実装するときには、まず各ファイルがこのどちらに分類した方がよいのかを考えることから始めることになるのではないかと思います。

### Pre Cache

ServiceWorkerの起動時にキャッシュされます。事前キャッシュと表現されたりもしています。Pre Cacheしたものは、URLにハッシュをつけたりしてユニークなものにしない限り変更されません。主に静的なリソースを指定することが多いようですが、頻繁に更新しないようなファイルなどをPre Cacheすると良いのではないかと思います。

### Runtime Cache

指定した任意のURLにアクセスしたタイミングで取得したデータをキャッシュします。主に動的なリソースを指定します。APIからのGetリクエストなども含まれます。さらにRuntime Cacheでは、データをどのように取得するのかという“キャッシュ戦略”も選択できます。

## キャッシュ戦略（Cache Strategy）とは

キャッシュ戦略と呼ばれているので、誰かがそういう戦略を提唱しているものだと思ってしまいそうですが、実際はファイルを**「キャッシュから取得するのか」**それとも**「ネットワーク経由で取得するのか」**というファイル取得のパターンをそのように呼んでいると解釈しました。おそらくは“Cache Strategy”を単に和訳したのでそうなっているのだと思います。

## キャッシュ戦略（Cache Strategy）のパターン

いろいろパターンがあるのでここで軽く紹介します。実装時にはこれらのロジックをファイルの用途や性質などによって使い分ける必要があると思います。

### Cache First

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/06/cache-first.png?auto=compress%2Cformat&fit=scale&h=379&ixlib=php-1.2.1&w=768&wpsize=medium_large)

文字通り最初にキャッシュに要求されたファイルを探しにいきます。キャッシュにデータがなければネットワーク経由でファイルを取得します。

### Cache Only

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/06/cache-only.png?auto=compress%2Cformat&fit=scale&h=261&ixlib=php-1.2.1&w=768&wpsize=medium_large)

キャッシュからのみファイルを返します。

### Network First

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/06/network-first.png?auto=compress%2Cformat&fit=scale&h=373&ixlib=php-1.2.1&w=768&wpsize=medium_large)

Cache Firstとは逆に最初にネットワーク経由で要求されたファイルを探しにいきます。ネットワークに接続できない状態だったりした場合はキャッシュにデータを探しにいきます。

### Network Only

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/06/network-only.png?auto=compress%2Cformat&fit=scale&h=261&ixlib=php-1.2.1&w=768&wpsize=medium_large)

ネットワーク経由でのみファイルを返します。

### Stale While Revalidate

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/06/stale-while-revalidate.png?auto=compress%2Cformat&fit=scale&h=373&ixlib=php-1.2.1&w=768&wpsize=medium_large)

キャッシュに要求されたファイルを探しにいき、キャッシュにデータがなければネットワーク経由で取得します。Cache Firstと異なる点は、バックグラウンドでfetchしてキャッシュのデータを更新します。

## 導入シミュレーション

キャッシュ戦略（Cache Strategy）の特性を理解した上で弊社サイトの記事一覧ページ（[https://www.hivelocity.co.jp/blog/](https://www.hivelocity.co.jp/blog/)）を例にして導入シミュレーションをしてみます。

上記のページをざっとパーツごとに分類すると以下のようなパターンになるかと思います。

- ヘッダーエリア
- スライダーエリア
- コンテンツエリア
- フッターエリア

それぞれ見ていきましょう。

### ヘッダーエリア

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/07/header.png?auto=compress%2Cformat&fit=scale&h=428&ixlib=php-1.2.1&w=768&wpsize=medium_large)

ヘッダーエリアの要素は頻繁に変わるものではないので、Pre Cacheしても良いと思います。

### スライダーエリア

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/07/slider.png?auto=compress%2Cformat&fit=scale&h=428&ixlib=php-1.2.1&w=768&wpsize=medium_large)

スライダーエリアでは、新着記事を表示していますので頻繁に更新がかかります。ここはRuntime Cacheした方が良いと思います。ユーザーがアクセスしたタイミングでネットワークから最新のデータを取ってきてほしいので、キャッシュ戦略はNetwork Firstを選択しておいた方がよいのではないでしょうか。

### コンテンツエリア

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/07/contents.png?auto=compress%2Cformat&fit=scale&h=462&ixlib=php-1.2.1&w=768&wpsize=medium_large)

コンテンツエリアは、更新頻度が高いのでRuntime Cacheした方が良いと思います。キャッシュ戦略はスライダーエリアと同様にNetwork Firstが良いと思います。カテゴリ名の頭に表示しているバッジアイコンなどは頻繁に更新されるものではないと思いますので、Pre Cacheしても良いと思います。

### フッターエリア

![](https://bst-image.imgix.net/prod-hivelocity/content/uploads/2019/07/footer.png?auto=compress%2Cformat&fit=scale&h=454&ixlib=php-1.2.1&w=768&wpsize=medium_large)

フッターエリアの要素もヘッダー同様頻繁に変わるものではないので、Pre Cacheしてしまって良いと思います。

### その他

その他ページ全体で使用するデータについては以下のようなものがあります。

- HTML（PHP）
- CSS
- JavaScript
- フォント

フォントなど頻繁に変更されないものはPre Cacheで良いと思います。CSSやJavaScriptもPre Cacheしても良いと思いますが、ここはサイトの構成によって変わってくると思います。弊社ではJavaScriptとCSSをコンポーネントやモジュールごとに分けておりますが最終的に1つのファイルにバンドルしています。それらをキャッシュしてしまうと部分的に変更した時にユーザー側で更新されないケースなどが発生してしまうので、ここはNetwork FirstでRuntime Cacheするのが良いと思いました。致命的なバグを持った状態でProductionにdeployされないようにフローが整っていれば、Stale-While-Revalidateを採用しても良いかもしれません。最後にHTMLですが、ここも更新が発生することを考えるとNetwork FirstでRuntime Cacheを設定した方が良いのかなと感じました。

## まとめ

CMSなど頻繁に更新が発生するサイトでは、最新のコンテンツを閲覧したいというニーズの優先度が高いと思いますので、基本的にNetwork Firstのキャッシュ戦略がベースとなる気がします。キャッシュはオフライン時でもある程度の閲覧を担保するための補助的な役割になると思いますので、基本的なレイアウトを描画する上で必要なファイルなどを含めておくというような感じになるのではないでしょうか。

今回は自社サイトを例にして考えてみましたが、サイトの性質やファイル構成によって変わってくると思います。実際にProductionに投入してみて、新しい発見や問題などが見えてきたらまた考察してみたいと思います。

### ライターおすすめ記事

- [数分でできる！mkcertでローカル環境へのSSL証明書設定](https://www.hivelocity.co.jp/blog/46149/)
- [Workbox + webpackでServiceWorkerのオフラインキャッシュと戯れる](https://www.hivelocity.co.jp/blog/46013/)