---
Updated: 2021-01-08T02:53:00
Created: 2021-01-08T02:53:00
URL: https://libra-nk.net/sw-cash-strategy/
Tags: [topic/技術/PWA]
---
2019-11-27            

            
                
                2019-11-27

Service Worker では、キャッシュやリクエストの処理方法を制御できます。 考えられるいくつかのパターンがあり、「キャッシュ戦略」として一般化されています。

目次

[前の記事](https://libra-nk.net/service-worker/)で、Service Worker の仕組みは理解できたと思います。しかし、いざ実装しようとすると設計につまづくと思います。幸い、キャッシュに関してはいくつかの考えうるパターンが確立されており、ほとんどの場合はいずれかのパターンに該当します。これらのパターンを組み合わせることで実用性のある Service Worker キャッシュ機能を実装することができると思います。

以降の内容で、これらのパターン「キャッシュ戦略」を順に見ていきます。

## パターン: アセットをキャッシュするタイミング

キャッシュするタイミングに迷う場合、下記のどのパターンに該当するかを考えます。ほとんどの場合はいずれかに該当するはずです。

キャッシュタイミングのタイミング最適なケースインストール時 – 依存関係としてサイトの特定のバージョンに対して静的と見なしうるものインストール時 – 依存関係としてではなくサイズが大きく、すぐには必要とされないリソース

（例：ゲームの後の方のレベルで使用されるアセットなど）アクティベート時クリーンアップと移行ユーザー操作時サイト全体をオフラインにできない場合に、ユーザーがオフラインで利用したいコンテンツを選択できるようにする

（例： YouTube などの動画、Wikipedia の記事、Flickr の特定のギャラリーなど）ネットワークの応答時頻繁に更新されるリソース

（例：ユーザーの受信トレイや記事コンテンツなど）Stale-While-Revalidate頻繁に更新されるが、必ずしも最新のバージョンでなくてもよいリソース

（例：アバター）プッシュ メッセージ時通知に関連するコンテンツ。 また、頻繁には変更されないが即座に同期することに意味があるコンテンツ

（例：チャット メッセージ、ニュース速報、メール、TODO リストの更新やカレンダーの予定変更など）バックグラウンド同期時急を要さない更新

（例：ソーシャル メディアのタイムラインやニュース記事など）

### インストール時 – 依存関係として

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzYzMycgd2lkdGg9JzEwMTYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/cm-on-install-dep.png)

`install` イベント時に `cache.addAll()` の中でキャッシュするアセットを指定して `return` します。インストールが成功するためには、すべてキャッシュされる必要があります。1つでもキャッシュできなければインストールは失敗します。

```plain text
self.addEventListener('install', function(event) {  event.waitUntil(    caches.open('mysite-static-v3').then(function(cache) {      return cache.addAll([        // キャッシュするアセット（依存関係）      ]);    })  );});
```

### インストール時 – 依存関係としてではなく

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzYzNCcgd2lkdGg9JzEwMTQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/cm-on-install-not.png)

`install` イベント時に `cache.addAll()` の中でキャッシュするアセットを指定しますが、`return` はしません。これにより、キャッシュの成否がインストールの成否に影響しません。

```plain text
self.addEventListener('install', function(event) {  event.waitUntil(    caches.open('mygame-core-v1').then(function(cache) {      cache.addAll(        // キャッシュするアセット（非依存関係）      );      return cache.addAll(        // キャッシュするアセット（依存関係）      );    })  );});
```

### アクティベート時

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzYzNCcgd2lkdGg9JzEwMTQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/cm-on-activate.png)

`activte` イベント時に不要な**キャッシュを削除**します。アクティベート中は、`fetch` などの他のイベントはキューに入れられるため、アクティベーションは最小限に留めます。古いバージョンがアクティブだったときに実行できなかった処理のみにアクティベーションを使用します。

```plain text
self.addEventListener('activate', function(event) {  event.waitUntil(    caches.keys().then(function(cacheNames) {      return Promise.all(        cacheNames.filter(function(cacheName) {          // ここで true を返した場合、そのキャッシュは削除される        }).map(function(cacheName) {          return caches.delete(cacheName);        })      );    })  );});
```

### ユーザー操作時

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzI4MScgd2lkdGg9JzEwMTQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/cm-on-user-interaction.png)

`click` などのユーザーの操作によるイベントを監視します。「後で読む」ボタンが良い例です。

```plain text
document.querySelector('.cache-article').addEventListener('click', function(event) {  event.preventDefault();   var id = this.dataset.articleId;  caches.open('mysite-article-' + id).then(function(cache) {    fetch('/get-article-urls?id=' + id).then(function(response) {      // /get-article-urls は、JSON エンコードされた アセットのURLの配列を返す      return response.json();    }).then(function(urls) {      cache.addAll(urls);    });  });});
```

### ネットワーク応答時

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzQ5NCcgd2lkdGg9JzEwMTQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/cm-on-network-response.png)

リクエストに一致するものがキャッシュ内になければ、ネットワークから取得してページに送信し、同時にキャッシュにも追加します。

```plain text
self.addEventListener('fetch', function(event) {  event.respondWith(    caches.open('mysite-dynamic').then(function(cache) {      return cache.match(event.request).then(function (response) {        // キャッシュがあればそれを返す        return response || fetch(event.request).then(function(response) {          // キャッシュに追加          cache.put(event.request, response.clone());          // ネットワークから取得したものを返す          return response;        });      });    })  );});
```

### Stale-While-Revalidate

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzQ5Micgd2lkdGg9JzEwMTQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/cm-stale-while-revalidate.png)

直前に紹介した「ネットワークの応答時」と似ていますが、こちらは、キャッシュがあってもなくてもアセットをネットワークから取得し、そしてキャッシュを更新します。

```plain text
self.addEventListener('fetch', function(event) {  event.respondWith(    caches.open('mysite-dynamic').then(function(cache) {      return cache.match(event.request).then(function(response) {        // ネットワークから取得してキャッシュを更新        var fetchPromise = fetch(event.request).then(function(networkResponse) {          cache.put(event.request, networkResponse.clone());          return networkResponse;        });        // キャッシュまたは取得したアセットを返す        return response || fetchPromise;      })    })  );});
```

### プッシュ メッセージ時

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzYzMicgd2lkdGg9JzEwMTYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/cm-on-push.png)

例: Twitter アプリの問題点

1. デバイスがオンライン時にプッシュ通知を受信し、表示される。
2. その後、デバイスがオフラインになったときに、プッシュ通知をタップして Twitter を起動する
3. ネットワークに繋がらないため、該当のツイートを取得できない
4. 一度タップしたため、プッシュ通知が消えている。

これはよくない例です。本来あるべき姿は、プッシュ通知を受信したら、表示する前にアセットをキャッシュしておくことです。そうすれば、デバイスがオフラインのときでも該当のツイートを参照できます。

```plain text
// プッシュ通知受信時self.addEventListener('push', function(event) {  if (event.data.text() == 'new-email') {    event.waitUntil(      caches.open('mysite-dynamic').then(function(cache) {        return fetch('/inbox.json').then(function(response) {          // キャッシュへ追加          cache.put('/inbox.json', response.clone());          return response.json();        });      }).then(function(emails) {        // 通知を行う        registration.showNotification("New email", {          body:"From " + emails[0].from.name          tag: "new-email"        });      })    );  }}); // 通知ボタンクリック時self.addEventListener('notificationclick', function(event) {  if (event.notification.tag == 'new-email') {    new WindowClient('/inbox/');  }});
```

### バックグラウンド同期時

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzI3Nicgd2lkdGg9JzEwMDYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/cm-on-bg-sync.png)

sync イベント時にキャッシュへ追加します。

```plain text
self.addEventListener('sync', function(event) {  if (event.id == 'update-leaderboard') {    event.waitUntil(      caches.open('mygame-dynamic').then(function(cache) {        return cache.add('/leaderboard.json');      })    );  }});
```

## パターン: リクエストへの応答

キャッシュは使わなければ意味がありません。リクエストがあったとき、キャッシュを提供するのか、ネットワークから取得するのか、タイミングを含めると様々な制御方法が考えられます。

リクエストへの応答パターン最適なケースCache Only（キャッシュのみ）サイトの特定の「バージョン」に対して静的と見なしうるすべてのもの

（補足：

```plain text
install
```

イベントでキャッシュされているはずなので、存在を前提とする）Network Only（ネットワークのみ）アナリティクス ping、GET 以外のリクエストなど、オフラインに相当するものがないCache First（キャッシュになければネットワークから取得）オフラインファーストのアプリを作成する場合キャッシュとネットワークの優劣ディスク アクセスが低速な端末でパフォーマンスを追及する場合の小さなアセットNetwork First（ネットワークから取得できなければキャッシュから取得）サイトの「バージョン」外で頻繁に更新されるリソースが取得できなかった場合の応急策

（例：記事、アバター、ソーシャル メディアのタイムライン、ゲームの得点ランキングなど）先にキャッシュ、次にネットワーク頻繁に更新されるコンテンツ

（例：記事、ソーシャル メディアのタイムライン、ゲームの得点ランキングなど）汎用的なフォールバックキャッシュやネットワークからリソースを提供できない場合

（例：アバターなどのセカンダリ画像、失敗した POST リクエスト、「このページはオフラインでは利用できません」というページ）Service Worker 側のテンプレートサーバー レスポンスをキャッシュできなかったページ

### Cache Only（キャッシュのみ）

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzM0NCcgd2lkdGg9JzEwMTMnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/ss-cache-only.png)

```plain text
self.addEventListener('fetch', function(event) {  // もしキャッシュが見つからなかったとき、（ネットワークから取得できる状態でも）エラーとなります。  event.respondWith(caches.match(event.request));});
```

### Network Only（ネットワークのみ）

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzM0NScgd2lkdGg9JzEwMTQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/ss-network-only.png)

```plain text
self.addEventListener('fetch', function(event) {  event.respondWith(fetch(event.request));  // event.respondWith() とはしないでください。ブラウザはデフォルトの動作になります。});
```

### Cache First（キャッシュになければネットワークから取得）

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzQ5Nicgd2lkdGg9JzEwMDQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/ss-falling-back-to-network.png)

オンラインファーストのアプリの場合、大抵この方法が適用されます。

```plain text
self.addEventListener('fetch', function(event) {  event.respondWith(    caches.match(event.request).then(function(response) {      return response || fetch(event.request);    })  );});
```

### キャッシュとネットワークの優劣

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzU0MScgd2lkdGg9JzEwMTQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

![](https://libra-nk.net/wp-content/uploads/ss-cache-and-network-race.png)

一般的にはないことですが、キャッシュを取得するよりもネットワークからの方が先だった場合、それをレスポンスします。

```plain text
// Promise.race() は、いずれか1つが拒否されると全体でも拒否するためこのケースには相応しくありません。function promiseAny(promises) {  return new Promise((resolve, reject) => {    // promises の要素が全ての Promise オブジェクトであることを保証する    promises = promises.map(p => Promise.resolve(p));    // 最初に1つ resolve した時点で全体でも resolve にする    promises.forEach(p => p.then(resolve));    // すべて reject だったら全体でも reject    promises.reduce((a, b) => a.catch(() => b))      .catch(() => reject(Error("All failed")));  });}; self.addEventListener('fetch', function(event) {  event.respondWith(    promiseAny([      caches.match(event.request),      fetch(event.request)    ])  );});
```

### Network First（ネットワークから取得できなければキャッシュから取得）

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzQ5Micgd2lkdGg9JzEwMTQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

```plain text
self.addEventListener('fetch', function(event) {  event.respondWith(    // ネットワークから取得    fetch(event.request).catch(function() {      // ネットワークがダメだったのでキャッシュ      return caches.match(event.request);    })  );});
```

### 先にキャッシュ、次にネットワーク

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzYwOScgd2lkdGg9JzEwMTknIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

ページのコード:

```plain text
var networkDataReceived = false; startSpinner(); // 新しいデータを取得するvar networkUpdate = fetch('/data.json').then(function(response) {  return response.json();}).then(function(data) {  networkDataReceived = true;  updatePage(data);}); // キャッシュデータを取得するcaches.match('/data.json').then(function(response) {  if (!response) throw Error("No data");  return response.json();}).then(function(data) {  // 新しいネットワークデータを上書きしないでください  if (!networkDataReceived) {    updatePage(data);  }}).catch(function() {  // キャッシュされたデータを取得できませんでした。ネットワークは最後の希望です。  return networkUpdate;}).catch(showErrorMessage).then(stopSpinner);
```

Service Worker のコード:

```plain text
self.addEventListener('fetch', function(event) {  event.respondWith(    caches.open('mysite-dynamic').then(function(cache) {      return fetch(event.request).then(function(response) {        cache.put(event.request, response.clone());        return response;      });    })  );});
```

### 汎用的なフォールバック

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzQ5Mycgd2lkdGg9JzEwMTMnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

```plain text
self.addEventListener('fetch', function(event) {  event.respondWith(    // キャッシュ取得を試みる    caches.match(event.request).then(function(response) {      // ネットワークにフォールバックする      return response || fetch(event.request);    }).catch(function() {      // 両方とも失敗した場合、一般的なフォールバックを表示する      return caches.match('/offline.html');      // 実際にはURLやヘッダーに応じてたくさんのフォールバックコンテンツを用意する必要があります。      // 例えば、「No Image」画像    })  );});
```

### Service Worker 側のテンプレート

![](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzU4Nicgd2lkdGg9JzEwMTMnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJy8+)

```plain text
self.importScripts('templating-engine.js'); self.addEventListener('fetch', function(event) {  var requestURL = new URL(event.request.url);   event.respondWith(    Promise.all([      // キャッシュからテンプレートを取得      caches.match('/article-template.html').then(function(response) {        return response.text();      }),      // キャッシュからデータを取得      caches.match(requestURL.path + '.json').then(function(response) {        return response.json();      })    ]).then(function(responses) {      var template = responses[0];      var data = responses[1];       return new Response(renderTemplate(template, data), {        headers: {          'Content-Type': 'text/html'        }      });    })  );});
```

## まとめ

「アセットをキャッシュするタイミング」と「リクエストへの応答」のパターンを見てきました。ほとんどの場合は、それぞれいずれかのパターンを採用して最適なキャッシュ戦略を立てることができるでしょう。特に、次のキャッシュ戦略についてはおさえておくと良いです。

- Stale While Revalidate
- Network First
- Cache First
- Network Only
- Cache Only

なお、これらの実装には、**Workbox** というライブラリーを使うことで効率的に行うことができます。Service Worker を実装する際には是非利用したいおすすめのライブラリーです。

## 参考資料

- [オフライン クックブック | Google Developers](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/?hl=ja)