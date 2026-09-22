---
Updated: 2021-01-08T02:53:00
Created: 2021-01-08T02:53:00
URL: https://www.mitsue.co.jp/knowledge/blog/frontend/201907/05_0944.html
Tags: [topic/技術/PWA]
---
[Request.destination](https://developer.mozilla.org/en-US/docs/Web/API/Request/destination)は[Requestインターフェイス](https://developer.mozilla.org/ja/docs/Web/API/Request)のプロパティで、リクエストしているコンテンツの種類を文字列で返します。これをService Workerの`fetch`イベント時に用いると、リソースの種類別にキャッシュ戦略を切り替えることができます。

## Request.destinationの使い方

`Request.destination`では一体どんな文字列が返されるのでしょうか。[Fetch Standard](https://fetch.spec.whatwg.org/)のRequest.destinationの[仕様の一部](https://fetch.spec.whatwg.org/#concept-request-destination)を抜粋します。

> A request has an associated destination, which is the empty string, "audio", "audioworklet", "document", "embed", "font", "image", "manifest", "object", "paintworklet", "report", "script", "serviceworker", "sharedworker", "style", "track", "video", "worker", or "xslt". Unless stated otherwise it is the empty string.

たとえば画像であれば`image`、フォントであれば`font`などが取得できるようです。`XMLHttpRequest`や`fetch()`で取得されたリソースなど、`Request.destination`でリソースの種別が判別できなかったものに関しては空の文字列で返却されます。

それらをふまえ、Service Workerの`fetch`イベントで`Requset.destination`を用いた例が以下のソースコードです。

```plain text
self.addEventListener('fetch', (event) => {
  const destination = event.request.destination;

  switch (destination) {
    case 'document':
      event.respondWith(
        cacheFirst(event).catch(() => {
          return caches.match('./offline.html');
        })
      );
      break;

    case 'image':
      event.respondWith(
        cacheFirst(event).catch(() => {
          return caches.match('./offline.png');
        })
      );
      break;

    case 'style':
    case 'script':
      event.respondWith(
        cacheFirst(event)
      );
      break;

    default: 
      event.respondWith(
        networkOnly(event)
      );
      break;
  }
});

```

上記の例では以下のような処理を行っています：

- HTMLはCache Firstな戦略（キャッシュが利用できない場合ネットワークから取得）をとり、もしエラーが返される場合（ネットワークで取得できない場合など）はオフラインページを提供する
- 画像の場合もCache First戦略をとり、取得できなければオフライン用の画像を提供する
- CSSやJavaScriptについてもまずキャッシュを探し、キャッシュが利用できない場合はネットワークから取得
- 上記以外のリソースと空文字が返却された場合はネットワークから取得する、キャッシュは探さない

上のリストの内容を簡単にまとめると、HTMLのキャッシュがなければオフラインページが表示されます。HTMLのキャッシュがある場合でも画像のキャッシュがなんらかの理由で残っていない場合は、画像のみオフライン用に用意した画像で表示できます。

また`Request.destination`と、リクエストをURLで判別する方法を組み合わせることで、さらに細かくキャッシュ戦略を分けて提供することが可能です。

以下のソースコードは、`Request.destination`が「`images`」でかつURLが「`.webp`」で終わるリクエストを判別する例です。

```plain text
self.addEventListener('fetch', (event) => {
  const destination = event.request.destination;
  const requestURL = new URL(event.request.url);

  switch (destination) {
    // ...
    case 'images': {
      if(requestURL.endWidth('.webp')) {
        event.respondWith(/* do something */);
      } else {
        event.respondWith(/* do something */);
      }

      break;
    }
    // ...
  }
});

```

## まとめ

Cache APIでキャッシュ可能な容量は限られるので、容量が大きいリソース、たとえば画像やフォントなどはキャッシュせずフォールバックを提供したいなどリソースごとに切り分けをしたいケースに`Request.distination`は有用です。

オフライン時などにどうWebページが見えるとユーザーフレンドリーなのか、シナリオを十分考慮しながら効率的にキャッシュ戦略を考えていきたいです。

AddThis Sharing Buttons

- [前の記事へ](https://www.mitsue.co.jp/knowledge/blog/frontend/201906/28_1120.html)[JavaScriptで操作するCSS TransitionとCSSOMの関係](https://www.mitsue.co.jp/knowledge/blog/frontend/201906/28_1120.html)
- [次の記事へ](https://www.mitsue.co.jp/knowledge/blog/frontend/201907/19_1546.html)[GatsbyJSで静的サイトジェネレートをはじめよう！](https://www.mitsue.co.jp/knowledge/blog/frontend/201907/19_1546.html)