---
Updated: 2021-01-08T02:48:00
Created: 2021-01-08T02:48:00
URL: https://1000ch.net/posts/2014/service-worker-internals.html
Tags: [topic/技術/PWA]
---
# [**EagleLand**](https://1000ch.net/)

[RSS](https://1000ch.net/rss.xml)

[Activity](https://shogosensui.com/)

[Facebook](https://www.facebook.com/1000ch.net)

2014.12.29

# Service Workerに関する仕様とか機能とか

今巷で流行りのService Workerについて調べ物してたので、まとめたメモ。

# Service Workerが解決してくれること

Service WorkerはHTML・CSS・JS・画像等などのリソースを、JavaScriptのAPIから命令的にコントロールすることを実現する。Webページのパフォーマンスに関する指標としてネットワークを介して得るリソースをキャッシュさせたりすることが効果的であることは今更改めて挙げないが、Service Workerによって保持されたリソースは、オフライン状態でも返却することが可能という凄さを持っている。つまり、更新性の低いコンテンツであればオフラインでも閲覧させることが可能ということ。

更新性のあるコンテンツでも、回線が不安定な時はローカルに変更を保持して、サーバーに対してデータを遅延で同期するみたいなテクニックは既に存在している。ので、こういったテクニックと組み合わせて、よりクライアントの画面がホワイトアウトすることを減らしていける。はず。

こちらは、Jake Archibald氏とAlex Russell氏によるGoogle I/O 2014でのセッション「Bridging the gap between the web and apps」。[@myakura](https://twitter.com/myakura)氏による[解説記事](http://html5experts.jp/myakura/8365/)もある。

### Application Cache

先程の動画でも少し触れられているように、Application Cacheとよく対比される。リソースをキャッシュする機能として現れたのがApplication Cacheだったが、キャッシュリソースのコントロールがし難かったり、動的なコンテンツを生成する際、構成がApplication Cache前提になってしまう等、いささか問題を抱えていた。それを解決してくれるのがService Workerでもある。

Application Cacheの問題点については、[@kyo_ago](https://twitter.com/kyo_ago)さんが執筆した[モバイル対応Webアプリケーションのキャッシュ戦略](http://html5experts.jp/kyo_ago/2466/)という記事にまとまっている他、TwitterでメンションしてもApplication Cacheの話題であれば何かしらレスをくれる。かもしれない。

### ブラウザキャッシュ

ブラウザキャッシュもパフォーマンスを向上させる上で非常に重要な存在であることには間違いなさそうだが、JavaScriptからコントロールすることは不能だし、ブラウザによって挙動もまちまちである。なんせ、ブラウザキャッシュはW3Cに載っているような仕様の類ではなく、ブラウザベンダーが気を利かせて実装している機能に過ぎないからである。

ブラウザキャッシュと言えば、[Nicholas Zakas](https://twitter.com/slicknet)氏による[The changing role of the browser cache](http://calendar.perfplanet.com/2014/the-changing-role-of-the-browser-cache/)というブラウザキャッシュの役目の移り変わりについての記事も興味深い。

### オフラインアプリケーションの夢

ホワイトアウトを減らすどころか、必要なリソースを全てService Workerでコントロールすればオフラインアプリケーションの作成も可能である（キャッシュするリソースを取得する最初のダウンロードは必要になるが）。

つまりService Workerは、~~Application Cacheの屍を超えて生まれた~~今までにないリソースのコントロール機構であると言える。

# Service WorkerのAPIと挙動

Service WorkerはWeb Workerなんかと同じように（Web Workerの一種と言ったほうが正確なのかも）、ブラウザの表示とは別スレッドで実行される（だから、DOMのAPIとかを叩いたりすることは出来ない）。Service Workerでは、ページから行われるリソースの要求等に対し、独自の処理を挟むことが出来る。 **プロキシを自前で用意出来る** と言ったほうがイメージしやすいかも。

リクエストをフックし、Cache APIを介してアレコレする。あるURLへのリクエストに対するレスポンスを受け取った時にそのリソースを保持したり、はたまた再度そのリクエストが発生する時にはCache APIから保持したリソースを引っ張りだしてブラウザに返却する。といったような処理をService Workerにしてもらうことになる。

しれっと[Cache API](https://www.w3.org/TR/service-workers/#cache-objects)が出てきたが、これもService WorkerのAPIの一環で、Service Workerコンテキストで利用可能なキャッシュリソースを管理するためのAPIである。

### もうちょっと実際の処理に近い説明

1. リクエストされたリソースをキャッシュさせたり、リクエストに割り込んでキャッシュされたリソース等を返却するような処理が記述されている`service-worker.js`を用意
2. `index.html`で`service-worker.js`をService Workerとして登録する（この時、`index.html`内の評価は行われていない）。
3. `service-worker.js`に定義してあるリクエストが`index.html`から行われた場合、フックする。既にキャッシュに存在している場合はそれを返却したり、キャッシュされていなければそのままサーバーへリクエストしてあげる。

# 画像をService Workerでcachesにキャッシュさせるサンプル

実際のコードを動かしてもらって、デバッグしてもらう方がイメージしやすいと思うので簡単なサンプルを作った。

### ブラウザの準備

[Google Chrome Canary](https://www.google.co.jp/chrome/browser/canary.html)の **Version 41.0.2259.0 canary (64-bit)** で動作確認済。フラグをonにしないと動かないので[`chrome://flags`](https://1000ch.net/posts/2014/service-worker-internals.htmlchrome://flags/)で、[**Enable experimental Web Platform features.**](https://1000ch.net/posts/2014/service-worker-internals.htmlchrome://flags/#enable-experimental-web-platform-features)と[**Enable support for ServiceWorker background sync event.**](https://1000ch.net/posts/2014/service-worker-internals.htmlchrome://flags/#enable-service-worker-sync)を有効にしておく。

Service Workerはセキュリティ上、HTTPS環境かローカルホストのみ実行可能になっている。ローカルでのデバッグは`python -m http.server`でOKだが、動くように作ったつもりでもホスト先がHTTPSじゃないと動かない。~~簡単デプロイの代名詞のGitHub Pagesもダメなので、~~お手軽に用意出来そうなHTTPS環境はDropboxのPublicっぽい。

※2014/12/29追記

> 簡単デプロイの代名詞のGitHub Pagesもダメなので、

と書いてあるところに指摘を頂きまして、修正しました。

[**sada_h**](https://twitter.com/sada_h?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E549383897373356032%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2F1000ch.net%2Fposts%2F2014%2Fservice-worker-internals.html)[@sada_h](https://twitter.com/sada_h?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E549383897373356032%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2F1000ch.net%2Fposts%2F2014%2Fservice-worker-internals.html)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-13gxpu9 r-4qtqp9 r-yyyyoo r-1ve99a9 r-19fsva8 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-23tnvd js-evernote-checked' data-evernote-id='62'%3e%3cg%3e%3cpath d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

[@1000ch](https://twitter.com/1000ch?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E549383897373356032%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2F1000ch.net%2Fposts%2F2014%2Fservice-worker-internals.html) github pagesはhttpsも提供されてますよー。httpsでアクセスすれば表示されると思います。

[Service Workerに関する仕様とか機能とか](http://t.co/327sxlRQ3R?amp=1)[Service Workerに関する仕様とか機能とか 今巷で流行りのService Workerについて調べ物してたので、まとめたメモ。 Service Workerが解決してくれること Service WorkerはHTML・CSS・JS・画像等などのリソースを、JavaScriptのAPIから命令的にコントロールすることを実現する。Webページのパフォーマンスに関する指標としてネットワー...](http://t.co/327sxlRQ3R?amp=1)[1000ch.net](http://t.co/327sxlRQ3R?amp=1)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr js-evernote-checked' data-evernote-id='63'%3e%3cg%3e%3cpath d='M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z'%3e%3c/path%3e%3cpath d='M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

[午前10:58 · 2014年12月29日](https://twitter.com/sada_h/status/549383897373356032?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E549383897373356032%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2F1000ch.net%2Fposts%2F2014%2Fservice-worker-internals.html)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr js-evernote-checked' data-evernote-id='64'%3e%3cg%3e%3cpath d='M12 18.042c-.553 0-1-.447-1-1v-5.5c0-.553.447-1 1-1s1 .447 1 1v5.5c0 .553-.447 1-1 1z'%3e%3c/path%3e%3ccircle cx='12' cy='8.042' r='1.25'%3e%3c/circle%3e%3cpath d='M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

[sada_hさんの他のツイートを見る](https://twitter.com/sada_h?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E549383897373356032%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2F1000ch.net%2Fposts%2F2014%2Fservice-worker-internals.html)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr js-evernote-checked' data-evernote-id='65'%3e%3cg%3e%3cpath d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr js-evernote-checked' data-evernote-id='66'%3e%3cg%3e%3cpath d='M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

GitHub PagesのHTTPSサポートについては、以下にも情報があった。

- [What are GitHub Pages?](https://help.github.com/articles/what-are-github-pages/)
- [GitHub Pages Now Supports HTTPS, So Use It](https://konklone.com/post/github-pages-now-supports-https-so-use-it)

### `index.html`

5枚の画像を表示するだけの、シンプルなHTML。

ブラウザキャッシュだと、URLにアクセスした時に真っ白になってしまうけど、今回はURLに対して、画像5枚とHTMLをService Workerで丸ごとキャッシュさせてインターネットに接続されていない状態でも表示させることを目指す。

`<``**html**``>
  <``**head**``>
    <``**meta**`` charset="utf-8">
    <``**title**``>Service Worker Playground</``**title**``>
    <``**script**``>
      // navigator.serviceWorkerがある場合
      ``**if**`` (navigator.serviceWorker) {

        // service-worker.jsをService Workerとして登録する
        navigator.serviceWorker.register('./service-worker.js', {
          scope: '.'
        }).then(``**function**`` ``**onFulfilled**`` () {

          // service-worker.jsがひと通り評価され、インストールが成功した場合
          console.log('Service Worker was installed.');
        }, ``**function**`` ``**onRejected**`` () {

          // service-worker.jsのインストールが失敗した場合
          console.log('Service Worker was not installed.');
        });
      }
    </``**script**``>
  </``**head**``>
  <``**body**``>
    <``**div**``><``**img**`` src="img/1.jpg"></``**div**``>
    <``**div**``><``**img**`` src="img/2.jpg"></``**div**``>
    <``**div**``><``**img**`` src="img/3.jpg"></``**div**``>
    <``**div**``><``**img**`` src="img/4.jpg"></``**div**``>
    <``**div**``><``**img**`` src="img/5.jpg"></``**div**``>
  </``**body**``>
</``**html**``>`

### `service-worker.js`

先程の`index.html`からService Workerとして登録している`service-worker.js`の中身。Service Workerコンテキストは`self`で参照し、各種イベントにハンドラを登録している。

また、Chrome 40ではCache APIが一部未実装なので[coonsta/cache-polyfill](https://github.com/coonsta/cache-polyfill)をロードする。

`// Cache APIが一部未実装なのでポリフィルをロード
importScripts('serviceworker-cache-polyfill.js');

// キャッシュのキーとなる文字列
``**var**`` CACHE_KEY = 'service-worker-playground-v1';

self.addEventListener('install', ``**function**`` (e) {

  console.log('ServiceWorker.oninstall: ', e);

  e.waitUntil(
    caches.open(CACHE_KEY).then(``**function**`` (cache) {

      // cacheさせたいリクエストのキーを追加
      ``**return**`` cache.addAll([
        'index.html',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', ``**function**`` (e) {

  console.log('ServiceWorker.onfetch: ', e);

  e.respondWith(
    caches.open(CACHE_KEY).then(``**function**`` (cache) {
      ``**return**`` cache.match(e.request).then(``**function**`` (response) {
        ``**if**`` (response) {

          // e.requestに対するキャッシュが見つかったのでそれを返却
          ``**return**`` response;
        } ``**else**`` {

          // キャッシュが見つからなかったので取得
          fetch(e.request.clone()).then(``**function**`` (response) {

            // 取得したリソースをキャッシュに登録
            cache.put(e.request, response.clone());

            // 取得したリソースを返却
            ``**return**`` response;
          });
        }
      });
    })
  );
});

self.addEventListener('activate', ``**function**`` (e) {
  console.log('ServiceWorker.onactivate: ', e);
});`

Service Workerの登録（`navigator.serviceWorker.register`）時に発火する`install`イベントで、キャッシュさせたいリソースのパスをキーとして登録定義している。これは[`RequestInfo`](https://fetch.spec.whatwg.org/#requestinfo)という構造体の配列になる。

`fetch`はブラウザのUIスレッドからリクエストが発生したときに発火する。ここでは、キャッシュオブジェクト（`caches`）にリクエストに対するリソースが保持されている場合に、サーバーへのリクエストを実行せずキャッシュされたリソースを返却し、キャッシュに保持されていない場合はサーバーにリソースを要求しキャッシュに保持した上でブラウザにリソースを返却している。

### Service Workerのデバッグ

`index.html`と`service-worker.js`、あとは`img`フォルダに`1.jpg` ~ `5.jpg`を配置して準備は完了。あとはローカルホストを起動する。

`$ python -m http.server`

URLに対し登録されたService Workerは、[`chrome://serviceworker-internals`](https://1000ch.net/posts/2014/service-worker-internals.htmlchrome://serviceworker-internals/)でどういう状態かを確認することが出来る。 **Opens the DevTools window for ServiceWorker on start for debugging.** のチェックをオンにしておくと、Service Workerが登録された時にワーカースレッドに対するDevToolsが自動で開くのでデバッグ時はオンにしておくと良さげ。

起動した[`localhost:8000`](http://localhost:8000/)をCanaryで開くとService Workerの登録（`service-worker.js`）が`index.html`で行われる。Service WorkerのDevTools上でステップ実行をしていくと、各イベントハンドラが登録されていくのがわかる。最後まで実行されると、`index.html`に実行スレッドが戻ってくるのが確認出来る。

初回登録時にはService Workerで定義しているリソースが保持されていないのでダウンロードが必要だが、2回目以降のアクセス時には`<img src='img/1.jpg'>`によって発生するリクエストをService Workerが拾って、`fetch`イベント内でキャッシュからリソースを返却するようになる。

めでたしめでたし。

# その他

今回はService Worker内で`fetch`や`install`といった初歩的な部分しかハンドルしてないけど、バックグラウンドでデータの同期（Background Sync）を行ったり、[Push API](https://w3c.github.io/push-api/)と連携する`push`だったり、ブラウザスレッドからのメッセージ（`navigator.serviceWorker.controller.postMessage`）を`message`で受け取ることで任意のタイミングでリソースの更新を行ったり出来そう。

まだ`push`の機能はChromeにも実装されていないけど、`chrome.gcm`のインフラ使うのかなとか、SafariだったらiOSのプッシュサーバー使うのかなとか色々妄想はある。インフラさえ整えば、`push`イベント時にNotification出すとか、本当のプッシュ通知をWebで利用できる日が来そう。

何にせよ、仕様がもっと安定して、ブラウザの実装が進むのを待ちたい。

# 参考リソース

以下、Jake率高めなService Workerに関する記事とか。

- [Service Workers - W3C](https://www.w3.org/TR/service-workers/)
- [ServiceWorker API - MDN](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API)
- [Service Worker - first draft published - JakeArchibald.com](https://jakearchibald.com/2014/service-worker-first-draft/)
- [Using ServiceWorker in Chrome today - JakeArchibald.com](https://jakearchibald.com/2014/using-serviceworker-today/)
- [Launching ServiceWorker without breaking the web - JakeArchibald.com](https://jakearchibald.com/2014/launching-sw-without-breaking-the-web/)
- [The offline cookbook - JakeArchibald.com](https://jakearchibald.com/2014/offline-cookbook/)
- [Capability Reporting with Service Worker - igvita.com](https://www.igvita.com/2014/12/15/capability-reporting-with-service-worker/)
- [PSA: Service Workers are Coming - Infrequently Noted](https://infrequently.org/2014/12/psa-service-workers-are-coming/)
- [Introduction to Service Worker - HTML5 Rocks](https://www.html5rocks.com/en/tutorials/service-worker/introduction/)

[2014年の振り返りと人気記事まとめ](https://1000ch.net/posts/2014/look-back-over-2014.html)

[画像をdataURIに変換するライブラリをES6で書きなおす](https://1000ch.net/posts/2015/image-encoder-es6.html)

# Author

### 1000ch [**フォローする**](https://twitter.com/intent/follow?original_referer=https%3A%2F%2F1000ch.net%2F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=1000ch&tw_p=followbutton)

ソフトウェアエンジニア。SIer でのプログラマーを経て Web 業界に転職して以来、Web 技術に没頭する日々を送っている。Web 標準の動向やアーキテクチャの流行を追いかけつつ、技術啓蒙や OSS 活動に励んでいる。