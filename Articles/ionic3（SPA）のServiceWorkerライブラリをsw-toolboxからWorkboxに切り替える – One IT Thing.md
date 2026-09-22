---
Updated: 2021-01-08T02:52:00
Created: 2021-01-08T02:52:00
URL: https://one-it-thing.com/5528/
Tags: [topic/技術/PWA]
---
昨今は閲覧速度向上やオフラインでも使える利便性が求められ、Webアプリ開発とPWAはセットで考えられるようになってきましたね。

PWAは「ServiceWorker API」を使ってキャッシュする資源をコーディングしていきますが、ServiceWorkerのキャッシュは強力で、実際に開発してみるとコード変更が反映されない状況に陥ったりしてやきもきしたりします。

私も学習当初そうでしたがこの原因は「単純にServiceWorkerのことをよく理解していないだけ」だったりするので、そんな時は以下のPeteさんのハンズオンをやってみると底辺から理解が深まってスッキリすると思います。

[Google Developers  220 users](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/?hl=ja)[はじめてのプログレッシブウェブアプリ  |  Web Fundamentals  |&n...](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/?hl=ja)[https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/?hl=ja](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/?hl=ja)

![](https://www.google.com/s2/favicons?domain=developers.google.com)

![](https://one-it-thing.com/wp-content/uploads/pz-linkcard/cache/e94d130926c7da0f1b8b0ac5f99a2efc9cd1fff00d3b3f98dc19dd72aa175c51)

とはいえお仕事でキャッシュの為のコーディングを毎回しているのは時間が勿体ないです。

ライブラリを使って楽をしたいところですが、既存のionic3プロジェクトに入っているServiceWorkerライブラリは「sw-toolbox」という今は推奨されていないものだったりします。

[googlechromelabs.github.io](https://googlechromelabs.github.io/sw-toolbox/)[SW Toolbox](https://googlechromelabs.github.io/sw-toolbox/)[https://googlechromelabs.github.io/sw-toolbox/](https://googlechromelabs.github.io/sw-toolbox/)[A collection of service worker tools for offlining runtime requests](https://googlechromelabs.github.io/sw-toolbox/)

![](https://www.google.com/s2/favicons?domain=googlechromelabs.github.io)

![](https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgooglechromelabs.github.io%2Fsw-toolbox%2F?w=100)

2019年現在はこちらの「Workbox」が主流です。

[Google Developers  105 users](https://developers.google.com/web/tools/workbox)[Workbox  |  Google Developers](https://developers.google.com/web/tools/workbox)[https://developers.google.com/web/tools/workbox](https://developers.google.com/web/tools/workbox)[<!-- No Description -->](https://developers.google.com/web/tools/workbox)

![](https://www.google.com/s2/favicons?domain=developers.google.com)

![](https://one-it-thing.com/wp-content/uploads/pz-linkcard/cache/a8f617c142cd0457652b14d5aca7020c4e50aa5aea4989ba10526632e094277e)

Workbox（とworkbox-cli）を使うと、予めキャッシュしておく資源（precache）、こういうケースはキャッシュから取り、こういうケースはネットワークから取るのような戦略（storategy）を、ほぼコーディング無しで設定出来るようになります。

ユーザエクスペリエンスが高まるServiceWorkerを少ない労力で導入できる為、ionic3（Cordova無しのSPA）をまだ使っているプロジェクトは勿論、非SPAなWebサイトでもWorkboxは導入検討の価値が有ります。

今回は「ionic3（SPA）でのServiceWorkerライブラリ移行」ケースにフォーカスして検証していきたいと思います。

目次 []

## Workboxへの切り替え手順

前回、History APIを使って戻るボタン対応したionic3プロジェクトでやってみます。

[One IT Thing](https://one-it-thing.com/5491/)[History APIを使ってIonic（3以前のSPA）でブラウザの戻るボタンやAndroidバックキ...](https://one-it-thing.com/5491/)[https://one-it-thing.com/5491/](https://one-it-thing.com/5491/)[Ionic2や3ではまだAngular Routerを採用していなかったので、ページ遷移をしてもブラウザ履歴が積まれず、Androidのバックキーやブラウザの戻るボタンを押すとサイトに入ってくる前のページまで戻らされてしまいます。遷移した「About」ページでAndroidバックキーを...](https://one-it-thing.com/5491/)

![](https://www.google.com/s2/favicons?domain=one-it-thing.com)

![](https://one-it-thing.com/wp-content/uploads/2019/11/back-158491_640-150x150.png)

### sw-toolkitをアンインストール

package.jsonを見ると3.6.0が入っていました。もう使わないのでnpm uninstallしておきます。

`    "dependencies": {

        (snip)

        "sw-toolbox": "3.6.0",`

`C:\src\ionic\withHistoryAPI> npm uninstall sw-toolbox`

### service-worker.jsを編集してWorkboxを使うようにする

まだsw-toolbox用のコードが書かれている/src/service-worker.jsを、Workbox公式に従って変更します。

[Google Developers](https://developers.google.com/web/tools/workbox/guides/get-started)[Get Started  |  Workbox  |  Google Developers](https://developers.google.com/web/tools/workbox/guides/get-started)[https://developers.google.com/web/tools/workbox/guides/get-started](https://developers.google.com/web/tools/workbox/guides/get-started)[Get Started with Workbox.](https://developers.google.com/web/tools/workbox/guides/get-started)

![](https://www.google.com/s2/favicons?domain=developers.google.com)

![](https://one-it-thing.com/wp-content/uploads/pz-linkcard/cache/a8f617c142cd0457652b14d5aca7020c4e50aa5aea4989ba10526632e094277e)

service-worker.js自体はindex.htmlからロードする記述があるのでコメントアウトされている場合は有効化するか、workboxで紹介されているコードでロードしておきます。

`    
    

   <script>
     if ('serviceWorker' in navigator) {
       window.addEventListener('load', () => {
         navigator.serviceWorker.register('/service-worker.js');
       });
     }
</script>`

service-worker.jsを以下の内容で書き換えてみます。

`
console.log('Hello from service-worker.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded`);
} else {
    console.log(`Boo! Workbox didn't load`);
    
workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
);`

で、このファイルにキャッシュしたい資源や戦略を設定していく訳ですが・・・正規表現が使えるとはいえ、Webサイトの資源が多いとめんどいですね。

このServiceWorker定義を自動生成する「workbox-cli」がGoogle公式から公開されているのでそれを使ってもっと楽をします。

## ServiceWorker定義をworkbox-cliで自動生成する

workbox-cliを入れてservice-worker.jsを自動生成していきます。

[Google Developers  3 users](https://developers.google.com/web/tools/workbox/modules/workbox-cli)[Workbox CLI  |  Google Developers](https://developers.google.com/web/tools/workbox/modules/workbox-cli)[https://developers.google.com/web/tools/workbox/modules/workbox-cli](https://developers.google.com/web/tools/workbox/modules/workbox-cli)[The module guide for workbox-cli.](https://developers.google.com/web/tools/workbox/modules/workbox-cli)

![](https://www.google.com/s2/favicons?domain=developers.google.com)

![](https://one-it-thing.com/wp-content/uploads/pz-linkcard/cache/a8f617c142cd0457652b14d5aca7020c4e50aa5aea4989ba10526632e094277e)

### workbox-cliインストール

公式では-gでグローバルインストールしていますが、プロジェクト毎の開発時依存でも十分です。

`C:\src\ionic\withHistoryAPI> npm install workbox-cli --save-dev

    (snip)

+ workbox-cli@4.3.1
added 193 packages from 125 contributors and audited 10775 packages in 61.917s
found 2 low severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details

C:\src\ionic\withHistoryAPI>workbox --version
4.3.1`

workboxコマンドが使えるようになりました。

### workbox-cliの設定

プロジェクトルートにworkbox.config.jsを作成して以下の内容を記述。

`module.exports = {
    
    globDirectory: "www/",
    
    globPatterns: ["**/*.{html,png,svg,jpg,json,pem,js,ttf,woff,woff2,eot}"],
    
    globIgnores: ["**/main.js", "**/main.css", "**/vendor.js"],
    
    ignoreURLParametersMatching: [/^v$/],
    
    swDest: "src/service-worker.js",

    
    runtimeCaching: [
        {
            urlPattern: "/build/main.js",
            handler: "StaleWhileRevalidate",
            options: {
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        },
        {
            urlPattern: "/build/main.css",
            handler: "StaleWhileRevalidate",
            options: {
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        },
        {
            urlPattern: "/build/vendor.js",
            handler: "StaleWhileRevalidate",
            options: {
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }
    ]
};`

ionic3のwebpack結果は/wwwに吐かれるので配下資源をprecache対象にします。その中でもmain.js、main.css、vendor.jsはよく変更が入る為、「キャッシュ優先だけど同時にネットワークにも取りに行く」StaleWhileRevalidate戦略を設定しておきます。

（実際にはprecacheされた資源もサーバ資源が更新されれば更新されます。個別にStaleWhileRevalidateする必要はないかも知れません）

### キャッシュ戦略の種類

キャッシュ戦略については以下のWorkboxページが図解付きで分かり易いです。

[Google Developers  2 users](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)[Workbox Strategies  |  Google Developers](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)[https://developers.google.com/web/tools/workbox/modules/workbox-strategies](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)[The module guide for workbox-routing.](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)

![](https://www.google.com/s2/favicons?domain=developers.google.com)

![](https://one-it-thing.com/wp-content/uploads/pz-linkcard/cache/a8f617c142cd0457652b14d5aca7020c4e50aa5aea4989ba10526632e094277e)

- Cache Only : キャッシュからしか取らない
- Cache First : キャッシュになかったらネットワークから取る
- Network Only : ネットワークからしか取らない
- Network First : ネットワークが繋がらなければキャッシュから取る
- Stale While Revalidate : キャッシュから取るが、同時にネットワークにも取りに行き、更新されていればキャッシュに入れる。次回は最新がキャッシュから表示される。

### service-worker.jsを自動生成してみる

workbox generateSW workbox.config.js

`C:\src\ionic\withHistoryAPI> workbox generateSW workbox.config.js
Using configuration from C:\src\ionic\withHistoryAPI\workbox.config.js.
The service worker was written to src/service-worker.js
25 files will be precached, totalling 2.4 MB.`

生成されたservice-worker.js。先ほど行ったworkbox.config.jsの設定どおり、

- main.js、main.css、vendor.jsはStaleWhileRevalidate戦略
- それ以外はprecache

するコーディングが成されたServiceWorker定義が出来上がりました。

`importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});


self.__precacheManifest = [
  {
    "url": "assets/fonts/ionicons.eot",
    "revision": "bdf1d30681cf87986c385eea78e8de9a"
  },
  {
    "url": "assets/fonts/ionicons.svg",
    "revision": "d9496a234c81179afbca6bf5959cc30a"
  },
  {
    "url": "assets/fonts/ionicons.ttf",
    "revision": "74c652671225d6ded874a648502e5f0a"
  },
  {
    "url": "assets/fonts/ionicons.woff",
    "revision": "81414686e99c00d2921e03dd53c0ab04"
  },
  {
    "url": "assets/fonts/ionicons.woff2",
    "revision": "311d81961c5880647fec7eaca1221b2a"
  },
  {
    "url": "assets/fonts/noto-sans-bold.ttf",
    "revision": "a165a42685795361b25593effb32fdb1"
  },
  {
    "url": "assets/fonts/noto-sans-bold.woff",
    "revision": "ce3d777f2c41cca1494021cfa3fcd72c"
  },
  {
    "url": "assets/fonts/noto-sans-regular.ttf",
    "revision": "2fd9c16b805724d590c0cff96da070a4"
  },
  {
    "url": "assets/fonts/noto-sans-regular.woff",
    "revision": "ce8ba1a4ff970db896192c41fc3c96b1"
  },
  {
    "url": "assets/fonts/roboto-bold.ttf",
    "revision": "1f4fd7e4df65487f07ba9148f7ca095d"
  },
  {
    "url": "assets/fonts/roboto-bold.woff",
    "revision": "43183beef21370d8a4b0d64152287eba"
  },
  {
    "url": "assets/fonts/roboto-bold.woff2",
    "revision": "28d80f43ae4cc35f19e1f1a6ab670f25"
  },
  {
    "url": "assets/fonts/roboto-light.ttf",
    "revision": "9ff15bd34ea83e4dd3f23c20c7f5090e"
  },
  {
    "url": "assets/fonts/roboto-light.woff",
    "revision": "7e2d32e7141050d758a38b4ec96390c0"
  },
  {
    "url": "assets/fonts/roboto-light.woff2",
    "revision": "a826ff848e9f52b1732fed7d154afa97"
  },
  {
    "url": "assets/fonts/roboto-medium.ttf",
    "revision": "a937e2cae14e68262a45aa91204c2fdf"
  },
  {
    "url": "assets/fonts/roboto-medium.woff",
    "revision": "0f3b7101a8adc1afe1fbe89775553c32"
  },
  {
    "url": "assets/fonts/roboto-medium.woff2",
    "revision": "b2c9c262e089411e20689ed393c00796"
  },
  {
    "url": "assets/fonts/roboto-regular.ttf",
    "revision": "07f8fb6acbabeb10d3fad9ab02d65e0b"
  },
  {
    "url": "assets/fonts/roboto-regular.woff",
    "revision": "f94d5e5102359961c44a1da1b58d37c9"
  },
  {
    "url": "assets/fonts/roboto-regular.woff2",
    "revision": "e6b9d54811307f98da62eae992ae05ba"
  },
  {
    "url": "assets/imgs/logo.png",
    "revision": "ff5d7c95e2809b0dd177a9768ba3b619"
  },
  {
    "url": "build/polyfills.js",
    "revision": "443c697fc904cd88a651d09cf5c2fe2b"
  },
  {
    "url": "index.html",
    "revision": "5b0901552c2613b21c23cd069ce0affc"
  },
  {
    "url": "manifest.json",
    "revision": "e46a62111076747fd325b7b2bce78d92"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "ignoreURLParametersMatching": [/^v$/]
});

workbox.routing.registerRoute("build/main.js", new workbox.strategies.StaleWhileRevalidate({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute("build/main.css", new workbox.strategies.StaleWhileRevalidate({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute("build/vendor.js", new workbox.strategies.StaleWhileRevalidate({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');`

冒頭のPeteさんのハンズオンではキャッシュする資源だけでなく、キャッシュするロジックも全部自分で書きましたが、Workboxを使うとノーコーディングです。楽ですね。

ブラウザにprecacheされた資源も、「revision」（ファイル内容のハッシュ値）が変わるとブラウザにダウンロードされ、更新されます。

## service-worker.js更新をビルドサイクルに組み込む

プログラムを編集したらその変更がクライアントのブラウザに検知されるようにしておく必要があります。

リビジョンの更新によってそれが成されるので、ionic buildした際に自動でworkboxコマンドが走るようにしておきます。

webpackのworkboxプラグインを使うか、package.jsonでビルドスクリプトに組み込みます。今回は手間の要らない後者で行きます。

`    "scripts": {
        "start": "ionic-app-scripts serve",
        "clean": "ionic-app-scripts clean",
        "build": "ionic-app-scripts build",
        "lint": "ionic-app-scripts lint",
        
        "ionic:build:after": "workbox generateSW workbox.config.js && cp src/service-worker.js www"
    },`

ionic buildした後、wwwの資源を対象にsrc/service-worker.jsを作り、wwwにコピーするようにしました。

## 動作確認

ionic serveコマンドなりhttp-serverコマンドでHTTPサーバを起動してChrome（ver.78）でアクセスしてみます。

`C:\src\ionic\withHistoryAPI> ionic serve`

http://localhost:8100

![](https://one-it-thing.com/wp-content/uploads/2019/12/workbox1.png)

F12でデベロッパーツールを表示。ServiceWorkerが認識されています。

![](https://one-it-thing.com/wp-content/uploads/2019/12/workbox2.png)

続いてprecacheの確認。service-worker.jsで定義したリソースがキャッシュされています。precacheされたファイルはリビジョンが変わらない限りずっとブラウザキャッシュから表示します。ページ表示の高速化、ネットワーク節約、オフライン表示OKが期待できますね。

![](https://one-it-thing.com/wp-content/uploads/2019/12/workbox3.png)

この時点ではまだStaleWhileRevalidate戦略でキャッシュするmain.js、main.css、vendor.jsは見えません。一度F5して再描画すると。ランタイムキャッシュに出てきます。この3ファイルはキャッシュ表示と同時にネットワークにもフェッチしにいきます。

![](https://one-it-thing.com/wp-content/uploads/2019/12/workbox4.png)

Workboxによって適切にサーバ資源がブラウザにキャッシュされていることが分かりました。

プログラムを編集したらionic buildし直せばキャッシュ資源も更新されます。

### 留意点

Chromeの場合、サーバ側でservice-worker.jsが更新されていても、同じURLを開いている古いタブがある（古いServiceWorkerが動いている）とブラウザに更新されません。

再描画しても古いキャッシュが表示されてしまうときは、古いタブが残っていないか確認してみてください。

## まとめ

- Workboxの導入は簡単。ionic3だけでなく静的なWebでも有効。
- キャッシュ戦略を知っておき、precacheが使えれば大体問題無し。