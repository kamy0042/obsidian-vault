---
Updated: 2021-01-08T02:51:00
Created: 2021-01-08T02:51:00
URL: https://scrapbox.io/daiiz/ServiceWorker%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0%E6%88%A6%E7%95%A5_~Wiki%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BE%8B%E3%81%AB~
Tags: [topic/技術/PWA]
---
ServiceWorkerを用いたキャッシング戦略 ~Wikiアプリケーションを例に~

https://gyazo.com/3e64389efc3835ed63048eb9093968c8

daiiz /daiiz/daiiz.icon

/icons/twitter.icon [@daizplus](https://twitter.com/daizplus)

[Nota Inc.](https://scrapbox.io/daiiz/Nota%20Inc.)で/daiiz/Scrapbox.iconを作っています

/icons/scrapbox.icon [https://scrapbox.io/daiiz](https://scrapbox.io/daiiz)

Nota Inc.

https://gyazo.com/f7e0e917a181c6c8fc5943d935e8bce8

Gyazo

スクリーンショットを使ったコミュニケーションと情報収集のためのツール

[https://gyazo.com/](https://gyazo.com/)

Scrapbox

あらゆる情報をつなげて整理する知識共有サービス

[https://scrapbox.io/product](https://scrapbox.io/product)

rakusai.icon shokai.icon daiiz.icon progfay.icon yutaro.icon で作っている

daiiz.icon は去年の夏から参加

Scrapbox

Wikiみたいなノートアプリ

https://gyazo.com/6650f305b46ff9a2683fd11988e12cf3 https://gyazo.com/ed58dad9ca677c8ab54867fe08cf6817

複数人での同時編集できる

文中リンクで繋げて思考する

フルJavaScript実装のSingle Page Application

サーバーサイド

クライアントサイド

[React](https://scrapbox.io/daiiz/React)

[/shokai/Scrapboxの開発 - React & Websocketで作るリアルタイムWiki](https://scrapbox.io/shokai/Scrapbox%E3%81%AE%E9%96%8B%E7%99%BA%20-%20React%20&%20Websocket%E3%81%A7%E4%BD%9C%E3%82%8B%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0Wiki)

本日の発表で具体例として登場します

本日お話しすること

概要

ユーザーによってコンテンツが頻繁に更新されるようなウェブサービスにService Workerを導入して、ローカルに持てるリソースを徐々に増やし活用していく取り組みについて

目次

1. [ServiceWorker](https://scrapbox.io/daiiz/ServiceWorker)とは

2. キャッシュパターン

3. 静的リソースのキャッシュ

4. 動的リソースのpreftch

5. オフライン表示に向けた動的リソースのキャッシュ

6. 今後

1. ServiceWorkerとは

[Service Worker の紹介  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/primers/service-workers)

プログラム可能なネットワークプロキシ

オフラインで動作させるために必要な機能を提供してくれる

ネットワークリクエストへの介入や処理機能

レスポンスをプログラムから操作できるキャッシュ機能

JavaScript Workerの一種なので、DOMにはアクセスできない

UIスレッドとの通信はpostMessageを用いる

起動、停止のタイミングはブラウザ任せ

一定時間イベントが来ないと勝手に停止する

次にイベントが来たタイミングで自動で起動する

https://gyazo.com/9d3c6c43510989e406d65e7091e3b9c5

Chrome DevTools を開いていると、停止しようとした瞬間を観測できる

ServiceWorkerの対応状況

各ブラウザでの対応状況

[https://jakearchibald.github.io/isserviceworkerready/](https://jakearchibald.github.io/isserviceworkerready/)

https://gyazo.com/5599c3b34772696076e03cbba49e546c

ServiceWorkerに関連するAPIの実装状況と仕様を確認できる

各ブラウザでのデバッグ方法も学べる

Scrapboxでの導入

オフラインアプリの骨組みを小さく作りながら実験していた

[https://github.com/nota/sw_skelton](https://github.com/nota/sw_skelton) rakusai.icon

Scrapboxと似た構成で練習して問題点の洗い出し

ServiceWorkerの導入

ユーザーの環境に登録する

code:js

// Window

const registration = await navigator.serviceworker.register('/sw.js', {scope: '/'})

ServiceWorker自身の更新

ブラウザが自動で更新してくれる

登録したsw.jsがbyte単位で変更がないかを確認している

installが完了するとwating worker状態で待機

適切なタイミングでactivate

controllerになる

画面をリロードしてclientを更新した後

または

activateイベントでclients.claims()を実行し完了した後

ServiceWorker導入前

https://gyazo.com/f13e2e792c051b99ac7cbf5d5f22473c

何をキャッシュして、いつ使うかはブラウザ任せ

HTTP header Cache-Control のmax-ageに大きい値を与える策など

画像やフォントは、運よくキャッシュがあるかもしれない

これだけあってもオフライン時に画面を構成するのは無理

ServiceWorker導入後

https://gyazo.com/56ea425ad45437eb2bdb1093a5f065a1

何をキャッシュするか、どのタイミングで使うかを開発者側でコントロールできる

発行されたリクエストを横取りしてResponse返却の間に色々できる

Responseにheaderを加えたり

イチから組み立てたり

任意のタイミングでリクエストを発行できる

事前にResponseをキャッシュして温めておくなど

他にもいろいろできる

これらの処理をJavaScriptで書ける！

UIスレッド ↔ ServiceWorker

https://gyazo.com/a02919ec041cf1c05bb3187469f251d5

特に意識ことは必要はない

普段どおりHTTPリクエストを発行するだけで良い

aタグをクリック

XHRライブラリ

[fetch API](https://scrapbox.io/daiiz/fetch%20API)

どこ由来のデータか気にする必要もない

ローカルキャッシュか？リモートサーバーか？

postMessageで通信する方法もある

ServiceWorker ↔ Network, CacheStorage

https://gyazo.com/1ac40646474b698a91d7c3cde2c7d441

ServiceWorkerには色んなイベントが飛んでくる

アプリで必要な機能に関するイベントハンドラを実装していく

FetchEvent

UIスレッドでリクエストが発生すると飛んでくるイベント

same originリクエストに限らず、すべて通ってくる

FetchEventのハンドリング

ブラウザのデフォルト動作にfallbackする

respondWith()内でレスポンスをつくって返す

respondWith()をマスターすれば完璧

networkを優先するか？

cacheStorageを優先するか？

コンテンツによって使い分けていく

respondWith の書き方を見ていきましょう

2. キャッシュパターン

ネットワークのみ

キャッシュファースト

ネットワークファースト

fallback to the network

ブラウザのデフォルト動作にfallbackする

直ちにnetworkに取りに行く

https://gyazo.com/d7e6c2e9af111ddffdbde2d9e2620e22

ServiceWorkerでハンドリングしない (または、できない) リクエストに対して使う

POST, DELETE など、GET以外のリクエスト

http, file など、httpsでないリクエスト

デバッグ用途として [http://localhost](http://localhost/) に限っては大丈夫

respndWith に渡るまえにreturnするだけでOK

code:sw.js

self.addEventListener('fetch', event => {

return

})

ServiceWorker導入前と動作は何も変わらない

キャッシュファースト

https://gyazo.com/7b630b4f518e1e486d3121f12a490e03

code:sw.js

self.addEventListener('fetch', event => {

event.respondWith(async function () {

const req = event.request

const res = await caches.match(req)

if (res) return res

return fetch(req.clone())

}())

})

ネットワークの状況に依らずにCacheStorageに保存したResponseを優先

キャッシュがなければネットワークリクエストを発行

寿命が長いコンテンツに向いている

HTML, JS, CSS, 画像, Fonts など

[caches.match(requestInfo)](https://developer.mozilla.org/ja/docs/Web/API/Cache)

CacheStorage全体から探してResponseを取得する

ネットワークファースト

https://gyazo.com/f64a42f8b107adae90cb04517fc6be72

code:sw.js

self.addEventListener('fetch', event => {

event.respondWith(async function () {

const req = event.request

if (navigator.onLine) {

const res = await fetch(req.clone())

if (res) return res

}

return caches.match(req)

}())

})

ネットワークからの取得を優先

offline環境でのみCacgeStorageを頼る

更新頻度が高く、寿命が短いコンテンツに向いている

ユーザーによって作成されるページデータなど

Cache API について

RequestInfo, Response のペアを保存できるKey Value Store

[RequestInfo](https://fetch.spec.whatwg.org/#requestinfo): Request object または URL文字列

Window, ServiceWorkerGlobalScope の両方から参照できる

Cacheの作成、取得

cacheNameを指定して caches.open(cacheName) でCacheオブジェクトを作成

この中に保存していく

Scrapboxでのキャッシング戦略

アプリケーション構成

基本はSPA

client routerを通して画面ごとにReact Componentを出し分ける

最初に全部をまとめてロード可能

共通で使うHTML

JS, CSS, Fonts, UI画像

ページコンテンツ、ページリスト

都度APIを呼んでJSONで取得

ユーザーがアップロードした画像

主にGyazoから取得

ページの扉画像、本文中のアイコンとしても使われる

Scrapboxでのキャッシング戦略

全ページで共通に使うHTML

https://gyazo.com/a5a4cdaacfa52984f79720ae00b2bd88/thumb/500.png

SPAであることを活かし、最初のHTMLもキャッシュから返す

Scrapboxでは app.html と呼んでいる

CacheStorageから取得して使う

キャッシュの生成日から1ヶ月以上経過している場合はリモートサーバーから取り直す

https://gyazo.com/d93afd2f8ead5ec4fefd1a52f5de20f3

アプリ画面に関して、どのURLにアクセスしてもこれが返される

ServiceWorkerでRequestを横取りしてResponseを組み立てる

code:sw.js

function createSinglePageRequest (req) {

const url = new URL(req.url).origin + '/app.html'

return new Request(url, {

method: req.method,

headers: req.headers,

credentials: req.credentials,

cache: req.cache,

mode: 'same-origin',

redirect: 'manual'

})

}

オンライン時

Scrapbox画面の下地をいきなり表示できる

https://gyazo.com/eb16be60f4456eb160d5556c2daf7f40

オフライン時

Scrapboxのメッセージ画面を出せる

https://gyazo.com/3e03e2c3a65f8f90152bd97bbf7d0275

Scrapboxでのキャッシング戦略

JS, CSS, UI画像などのassets (静的リソース)

https://gyazo.com/9c0d03eeba913af9b8f9e85ca2348ed7/thumb/450.png

ネットワーク状況に依らずにキャッシュファースト

画面表示のためのリソースのfetchが落ち着いたら、assets cacheを更新

最新版があればダウンロード

projectデータ、pageデータなどのAPI (動的リソース)

https://gyazo.com/b96007f53263a6053bf119245d0a837d/thumb/450.png

現時点では計画的なキャッシュをしていない

最近見たページはオフラインでも表示できるようになった

全ページを本格的にキャッシュしてネットワークファーストで応答する作戦は検討中

マウスホバー時にprefetchをして高速に表示する

3. 静的リソースのキャッシュ

assets cacheを作成するタイミングの検討

Scrapboxでのassets cacheの更新フロー

assetsキャッシュ作成のタイミング

assets cache作成 / 更新のタイミングを3つ検討したい

1. リソースにアクセスされる都度？

2. 新しいServiceWorkerがactivateされたとき？

ServiceWorker自身の更新の仕組みを利用する

3. アプリ画面表示のたびに最新のキャッシュを保持しているか確認？

assetsキャッシュ更新の仕組みを自前で実装する

assetsキャッシュ作成のタイミング案①

リソースにアクセスされるたびに逐次追加

一番最初に思いつくシンプルな方法

問題

リソース間の整合性が保てない

古い画像あり、新しいCSSあり、JSは持っていない など

優先度が付けられない

CacheStorageの割り当て容量を有効活用できない

何がキャッシュされているか把握できない

assetsキャッシュ作成のタイミング案②

新しいServiceWorkerがactivateされたとき

ServiceWorkerのコードにキャッシュすべきassets URLリストを書いておく

このリストを更新すれば、SWのコードを変更することによってブラウザ自動更新が走る

これによりCacheStorageの内容も更新できる

という仕組みを利用

install時に新しいassets cacheを作成

code:sw.js

self.addEventListener('install', event => {

// ここで新しいasstes cacheを作成する

// 直ちにactivateする

event.waitUntil(self.skipWaiting())

})

activate時に古いものを削除

code:js

self.addEventListener('activate', event => {

// 直ちに全clientに適用する

event.waitUntil(self.clients.claim())

})

問題

controllerの切り替わりが不安定だった

ServiceWorkerのコードを変更しても入れ替わらないときがある

WebSocketを使っているからだろうか

ブラウザをリロードしても、WebSocketの接続が切れていないタブがあると現在のcontrollerのactive状態が終了しないようだった

assetsキャッシュ作成のタイミング案③

アプリ画面表示の度にキャッシュが最新であるかを確認

ServiceWorker自身の更新の仕組みに頼らずに、assets cacheのみを更新する

キャッシュすべきリソースのURLを列挙したjsonデータを配信するAPIを用意

Scrapboxではこの方針を採用した

assetsのホワイトリスト

アクセス毎に逐次キャッシュする方針でないので、キャッシュすべきリソースリストを定義しておく必要がある

ここで指定したリソースを一気にcache.addAll(urls)する

HTML, JS, CSS のversionが揃う

JSは新しいがCSSは古いというようような不整合がおきない

[cache.addAll(urls)](https://developer.mozilla.org/ja/docs/Web/API/Cache/addAll)

URLの配列を渡して使う

成功したならば、すべてのリソースのキャッシュに成功している

200以外のstatusを返すリソースが1個でもあれば、TypeErrorで失敗する

no-cors modeでfetchした[opaque](https://scrapbox.io/daiiz/opaque)なResponseを保存できない点に注意

assetsのホワイトリスト

キャッシュすべきassetsのURLのリストとassets-versionを記述しているファイル

https://gyazo.com/ef02015c516be6de5b082c602d360667

js build時にnpm scriptsのtaskで生成される

server js, client js で使っているURLリストを共用できる

アプリとassets.jsonの乖離が起きない

CDNから読み込むリソースも含まれる

CSS内部から読み込んでいるfontファイルのURLなども書いている

クエリパラメータ付きのURLを呼んでいることがあるので注意！

Cacheから返していると思い込んでいたが、cache.match()でhitしないので、実際はnetworkリクエストを飛ばしていた

オフラインモードでシミュレートすること大事

すべてのURLが status 200 を返すことをtest

cache.addAll でコケてキャッシュ更新に失敗することを防ぐ

assetsリストのversion管理

app.htmlとJavaScript, CSS, 画像, fontなどをひとまとめで、一意に与えられるversion番号

assets間の整合性を担保できる

つまり、これらのうちどれかが更新されればversionが上がる

ビルド日時で管理している

assets-20181109-103746というフォーマットになっている

assets-年月日-時分秒

そのままcacheNameとして使っている

assets-versionの使いどころ

Response Header

app.html のhtmlタグのdata属性

<html data-assets-version='assets-20181109-103746'>

client jsで、現在表示しているassetsが最新であるかを把握できる

assets cacheの更新

サイレント自動アップデートを実装

ユーザーが気づかないうちにbackgroundで更新される

次にリロードした瞬間から最新版を使える

UIスレッドからのFetchEventが落ち着いてから実行する

最後のfetchから数秒経過するまで待つ

順に行う

assets.jsonをfetchする

最新のassets versionを取得

最新のバージョンのキャッシュがあるか確認

指定したバージョンをcacheNameとするcacheが存在するかを見るだけでは不十分

cache.addAllが中断されていた場合、空のcacheオブジェクトが存在する

code:sw.js

async function cacheExists (version) {

if (!(await caches.has(version))) return false

const cache = await caches.open(version)

// cacheオブジェクト内にRequestが存在することも確認する

return (await cache.keys()).length > 0

}

なければ新しく作り、古いものを削除

QuotaExceededErrorをハンドル

CacheStorageの割り当て容量超過時に発火する

page dataなど (後述) 他のAPIのキャッシュを破棄して容量を確保

アプリ画面を構成するための重要リソースなので、こちらを優先する

ChromeのPrivate Windowを使うとdebugしやすい

割り当て容量が小さめ (〜10MB) に設定されている

QuotaExceededErrorを発生させやすい

assets cache導入の効果

サーバーから304 Not modified を待つよりも速い

サーバーに送るリクエスト数が減少

レイテンシが高い環境での初期レンダリング時間短縮

Chrome DevToolsのNetworkタブで、Slow 3Gに速度を絞るとわかる

assets cacheなし

12.5秒

https://gyazo.com/b710e475c32cb4a32b2164f59ecc9cdd

assets cacheあり

9秒

https://gyazo.com/5ca3661796b3890eb2ba96c76b8933da

オフライン表示の第一歩

4. 動的リソースのprefetch

= Scrapboxページデータのprefetch

https://gyazo.com/cec09588ff9af551617ebb122d9a7373

オンライン時

ページロード時間の短縮

postMessageでUIスレッドからServiceWorkerにキャッシュ要請する例

prefetch cache作成と破棄

https://gyazo.com/001535b8818d4324257a0c729b2a25a3

aタグにonmouseenterしたとき

GET /api/pages/:projectName/:pageTitle のレスポンスをキャッシュ

ServiceWorkerにURLを渡してfetchを要求する

client ↔ SW間はpostMessageを使って通信

clientでfetchを実行すると？

SWでfetchEventハンドラを通る

キャッシュファーストな応答される場合、ネットワークリクエストが飛ばずに最新のデータを得られない

どちらか早いほうのタイミングで破棄

キャッシュを使用した直後

保存から15秒経過

postMessage

client ↔ ServiceWorker間で通信するときに使う

Dedicated Worker (Web Worker) でも使ったことがある

code:js

// Window

const worker = new Worker('dedicated-worker.js')

worker.onmessage = event => {

// Web Workerからの応答を受信

}

worker.postMessage(data)

https://gyakky.herokuapp.com/svgyazo/9628e85e5af77c4163e468e0e11f2c13.svg

code:js

// DedicatedWorkerGlobalScope

self.addEventListener('message', event => {

// ここでタスクを処理

// clientに返信

self.postMessage({result: ''})

})

同様にService Workerとも通信できる

clientとworkerが1対1対応していないので、呼び出し方が少々複雑

[MessageChannel](https://developer.mozilla.org/ja/docs/Web/API/MessageChannel)を作成してやりとりする

port1, port2 の対を得る

https://gyakky.herokuapp.com/svgyazo/476eafaf9a9ea567fd0a6e668d40cd5f.svg

code:js

// Window

const channel = new MessageChannel()

channel.port1.onmessage = event => {

// ServiceWorkerからの応答を受信

}

navigator.serviceworker.controller.postMessage(data, [channel.port2](https://scrapbox.io/daiiz/channel.port2))

code:sw.js

self.addEventListener('message', event => {

// ここでタスクを処理

// client (event.ports[0](https://scrapbox.io/daiiz/0)) に返答

event.ports[0](https://scrapbox.io/daiiz/0).postMessage({result: ''})

})

React component <PrefetchOnHover>

aタグにmouseenterしたときにSWにpostMessageする

aタグにwrapして使う

code:jsx

<PrefetchOnHover urls={['/api/pages/Nota/東京Node学園祭'](https://scrapbox.io/daiiz/%27/api/pages/Nota/%E6%9D%B1%E4%BA%ACNode%E5%AD%A6%E5%9C%92%E7%A5%AD%27)}>

<a href='/Nota/東京Node学園祭'>東京Node学園祭</a>

</PrefetchOnHover>

React Component

code:js

function PrefetchOnHover ({children, urls}) {

return (

<span onMouseEnter={() => prefetch(urls)}>

{children}

</span>

)

}

postMessageしてServiceWorkerにprefetch要求する

code:js

// Window

async function prefetch (urls) {

const {controller} = await navigator.serviceWorker

return new Promise((resolve, reject) => {

const channel = new MessageChannel()

channel.port1.onmessage = event => {

resolve(event.data)

}

controller.postMessage({

title: 'prefetch',

body: {urls}

})

}

ServiceWorkerではMessageEventをハンドル

code:sw.js

self.addEventListener('message', event => {

event.waitUntil(async function () {

const {urls} = event.data

// ここで各urlをfetchしてcacheに追加する

// await fetch(new Request(url, {credentials: 'same-origin'}))

event.ports[0](https://scrapbox.io/daiiz/0).postMessage({title: 'prefetch'})

}())

})

prefetchするかどうか

低速ネットワーク環境ではprefetchしたくない

mouseenter時のprefetchが終わらない状態でclickされると、最悪2回分のレスポンスを待たないといけない

[Network Information API](http://wicg.github.io/netinfo/)

ブラウザのネットワーク接続状況を取得できるAPI

https://gyazo.com/f3959d3b5dd11234f5ef05c4fa1f27d9

navigator.connection.downlink

回線速度

navigator.connection.rtt

Round Trip Time

往復遅延時間

まだChromeでしか使えない 2018/11/22 現在

https://gyazo.com/17a3a823dc73837890ca3d1d9cc64f36 https://caniuse.com/#search=Network%20Information%20API

代替実装

試しにprefetchしてみて、3秒以内で取得できなかったら機能をしばらくオフにする

Promise.race を使って、prefetchとtimeoutを競わせる

code:sw.js

const result = await Promise.race([

fetchAndCache(request),

delay(3000).then(() => 'timeout')

])

if (result === 'timeout') temporarilyDisable()

prefetchの効果 ①

高速にページを表示できる

click前にはデータをfetch済みなので高速

アドレスバーが変わってから画面が更新されるまでの時間が短くなった

https://gyazo.com/7cda1660ac0133c6337c857ffe28935e

[Random Jump Button](https://scrapbox.io/daiiz/Random%20Jump%20Button)の動作も速い

押す前に次のページのデータ取得が終わっている

https://gyazo.com/2bade20b0eef1a6004f72c1cd93c9a00

prefetchの効果 ②

レイテンシの大きいネットワークで発生するbugが表面化した

https://gyazo.com/6b964ea85cd5c3a50fdf7efcb33ff59a

Cacheを操作できるようになり、これまで発生頻度が低く見落としていたbugが再現しやすくなった

リンククリックしてページデータを取得している間に、他のユーザーがページを書き換えている場合がある

→ そのまま編集すると、変更がコンフリクトしてしまう

データ取得とclient jsに反映されるタイミングの間にラグができやすくなったため

編集の途中でコンフリクトするケースについては、コンフリクト解消が正常に動いていたが

最初からコンフリクトしていた場合の処理に問題があった

5. 動的リソースのキャッシュ

ページのオフライン表示を実現する

サーバー上の最新状態ではないものの、最近見た状態の内容を提示できる機能

CacheStorageから返されたResponseであるか？

どういう手法を選択するにしても必要になる

Wikiアプリとしては、見ているページが最新状態でないなら提示したい

Response に Header X-Serviceworker-Cacheを付けてcache.put() する

'true'

取得日時など

code:sw.js

async function setHeader (res) {

if (res.type === 'opaque') return res

const headers = new Headers(res.headers)

headers.set('X-Serviceworker-Cached', 'true')

return new Response(await res.blob(), {

status: res.status,

statusText: res.statusText,

headers

})

}

[cache.put(requestInfo, response)](https://developer.mozilla.org/ja/docs/Web/API/Cache/put)

Response objectを明示的に与えられる

自前で組み立てたResponseを保存するときに便利

Responseを返却する際に付けても良い

が、レスポンスのbodyが大きいとcloneするのに時間がかかることがある

UIスレッドでレスポンスのheaderを読んでCache経由であることがわかればいい

「offline mode」、「◯時間前のキャッシュを表示しています」などのメッセージを出せる

GET APIレスポンスをすべてキャッシュ

GET APIのresponseをキャッシュしてoffline時に使う

ネットワークファーストで応答しつつ、リソースにアクセスされる度に逐次追加していく方式

assets cacheで検討したが採用しなかったアイデアだが、ここでは使えそう

code:sw.js

export async function respondApiNetworkFirst (req) {

const respondCache = () => {

return caches.match(getCacheUrl(req.url))

}

let remoteRes

try {

// navigator.onLineを信用せずに、実際にリクエストを発行して判断する

remoteRes = await fetch(req.clone())

} catch (err) {

return respondCache()

}

if (remoteRes) {

if (remoteRes.ok) updateApiCache(req, remoteRes.clone())

return remoteRes

}

return respondCache()

}

navigator.onLine === trueを信用しない

onLineでも、WiFiにログインしていなかったり、経路に問題があったりして実質オフラインの場合がある

実際にアクセスしてみて判定する

Cache objectを分ける

キャッシュを管理しやすいようにcacheNameを工夫する

Responseから判断する

URLの字面を見る

Response Headerを使う

日付を使う

cache名にprojectNameを使う

Requestのpathnameの字面からprojectNameを取得する

pathnameが/api/page/:projectName/:pageTitleのようになっているので、正規表現によってマッチングさせて頑張ることが可能

projectNameの変更に対して弱い

pathnameから取得できないケースもある

サーバーから送信する際にResponse HeaderにprojectIdを載せる

projectが削除されるまで一意な値を使ったほうが安全

APIのendpoint URLを変えずに対応可能

一定期間を経過したCacheを削除したいが

cache内のHTTP responseを1つずつ見ていくことは現実的でない

cache名に日付を使う

日付毎にCache objectに保存しておくと、定期的に古いCacheを削除しやすい

api-2018-11-16というcacheNameの字面を見るだけで古いかどうか判断できる

同一URLとそのResponseが複数のCache objectに入っているとき、caches.match(url)はどのResponseを返すか？

こういう状況

https://gyazo.com/dfa4e96b3bb1bda4678872ed349f7072/thumb/542.png

古いcacheが優先して返される

https://gyazo.com/1fbbaf1a825e1b0c5817d7860336240f/thumb/542.png

一番新しいcacheを探すには？

日付順にcacheをopenして、探していく必要がある

code:sw.js

async function findLatestCache (req) {

const cacheNames = await caches.keys()

for (const date of cacheNames.sort().reverse()) {

const cache = await caches.open(date)

const res = await cache.match(req, {ignoreSearch: true})

if (res) return res

}

return null

}

cache.match()のoptionsに{ignoreSearch: true}をセットするとsearch queryを無視して取得できる

cacheをputするときにURLを正規化する必要がなくなる

https://gyazo.com/163c4ff27535cd5df8d70b66b9da2022/thumb/542.png

Offline mode

オフラインになる前に、ページリストや欲しいページを見ておく必要はあるが

一度以上見たページはオフライン時にもイチから構築できる

https://gyazo.com/2b6e01a1972e3aae3184a79029d90885

課題

オフライン表示できるページが限定的

オンラインで見ていないページはオフラインでも見れない

画像のキャッシュがブラウザ任せ

6. 今後検討したいアイデア

Offline modeの改良

オフラインでの書き込み

project内の全pageデータを一気にキャッシュ

project export用のjsonを活用する

https://gyazo.com/489c421ccef712e678dc2ef21a3c6b27

オフラインで必要なprojectのみ、ユーザーに予めダウンロードしてもらう

既存のproject export機能のようなボタンを押すだけでダウンロード可能にしたい

不要になったら削除してもらう

https://gyazo.com/8f1eb52bc7f30a1a5f94109abde85f78/thumb/500.png

このデータをオフライン表示のソースとして使う

ローカルDBとして、Cacheデータにアクセスして加工して使う

APIリクエストに対するレスポンスをServiceWorker内で組み立てる

ページデータをすべて持っているので、殆どのAPIに対応可能

ServiceWokrerから定期的にデータの更新を確認してキャッシュを最新に保つこともできそう

予め指定されたprojectだけをwatchしていればよい

データの保持方法

CacheStorageを使う

/api/page-data/export/:projectName.jsonのResponseをそのまま保存

多少扱いやすい形式に整えてから保存

UIスレッド ↔ ServiceWorker だけで使うendpointを作って通信する手もアリ

架空のRequest /api/cache/page-data に対するResponseとして保存

全ページを一括で取得することになるので扱いづらい

IndexedDBも使う

pageごとに取得、更新できる

定期的な更新を考えるなら、page単位で操作できたほうが便利

オフラインでの書き込み

送信に失敗したリクエストをIndexedDBなどに保持

インターネット接続が復帰したら再送信

まとめ

ServiceWorkerについて

オフラインキャッシュの実装

キャッシュパターンの考察

リソースの種類によって適切な戦略を選ぶ

ServiceWorkerが入ってアプリ化の土台が整った

オンライン時のキャッシュの活用

静的リソースをキャッシュ優先で使う

APIレスポンスをprefetchして読み込み高速化

オフラインでも読めるようにする

オンライン時にアクセスしたページの逐次キャッシュ

今後

オフラインでも書けるようにする

柔軟なOffline mode + ServiceWorker Background Sync = Offline edit