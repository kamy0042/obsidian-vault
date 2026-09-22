---
Updated: 2021-01-08T02:52:00
Created: 2021-01-08T02:52:00
URL: https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89
Tags: [topic/技術/PWA]
---
[ServiceWorkerをproductionで使ってる話](https://scrapbox.io/shokai/ServiceWorker%E3%82%92production%E3%81%A7%E4%BD%BF%E3%81%A3%E3%81%A6%E3%82%8B%E8%A9%B1)[検索や推薦をWebWorkerでやる](https://scrapbox.io/shokai/%E6%A4%9C%E7%B4%A2%E3%82%84%E6%8E%A8%E8%96%A6%E3%82%92WebWorker%E3%81%A7%E3%82%84%E3%82%8B)[assets cache](https://scrapbox.io/shokai/assets_cache)[
](https://scrapbox.io/shokai/assets_cache)[SPAを構築するのに必要な部品を、CacheStorageにあらかじめ保存しておくScrapboxの部品](https://scrapbox.io/shokai/assets_cache)[
](https://scrapbox.io/shokai/assets_cache)[この機能だけ単体で練習した](https://scrapbox.io/shokai/assets_cache)[
](https://scrapbox.io/shokai/assets_cache)[https://github.com/nota/sw_skelton](https://scrapbox.io/shokai/assets_cache)[cache first](https://scrapbox.io/shokai/cache_first)[
](https://scrapbox.io/shokai/cache_first)[ServiceWorkerの振る舞いのパターン](https://scrapbox.io/shokai/cache_first)[
](https://scrapbox.io/shokai/cache_first)[キャッシュから即座に返す](https://scrapbox.io/shokai/cache_first)[
](https://scrapbox.io/shokai/cache_first)[キャッシュが見つからなければ、ネットワークから取得して返す](https://scrapbox.io/shokai/cache_first)[
](https://scrapbox.io/shokai/cache_first)[network firstが対になる](https://scrapbox.io/shokai/cache_first)[network first](https://scrapbox.io/shokai/network_first)[
](https://scrapbox.io/shokai/network_first)[ServiceWorkerの振る舞いのパターン](https://scrapbox.io/shokai/network_first)[
](https://scrapbox.io/shokai/network_first)[ネットワークからまずデータを取得し、返す](https://scrapbox.io/shokai/network_first)[
](https://scrapbox.io/shokai/network_first)[失敗したらキャッシュから返す](https://scrapbox.io/shokai/network_first)[
](https://scrapbox.io/shokai/network_first)[cache firstが対になる](https://scrapbox.io/shokai/network_first)[
](https://scrapbox.io/shokai/network_first)[network first, cache secondと言ったほうがわかりやすいかも](https://scrapbox.io/shokai/network_first)[Offline mode](https://scrapbox.io/shokai/Offline_mode)[postMessage](https://scrapbox.io/shokai/postMessage)[
](https://scrapbox.io/shokai/postMessage)[`window.postMessage`](https://scrapbox.io/shokai/postMessage)[
](https://scrapbox.io/shokai/postMessage)[Webブラウザのwindow同士を通信させる機能](https://scrapbox.io/shokai/postMessage)[
](https://scrapbox.io/shokai/postMessage)[UIスレッドとブラウザ拡張やWebWorker、ServiceWorkerの通信にも使われる](https://scrapbox.io/shokai/postMessage)[ServiceWorker](https://scrapbox.io/shokai/ServiceWorker)[
](https://scrapbox.io/shokai/ServiceWorker)[プログラマブルなcache, proxy](https://scrapbox.io/shokai/ServiceWorker)[
](https://scrapbox.io/shokai/ServiceWorker)[WebWorkerとは別物](https://scrapbox.io/shokai/ServiceWorker)[ServiceWorkerをproductionで使ってる話に知見を書いた](https://scrapbox.io/shokai/ServiceWorker)[WebWorker](https://scrapbox.io/shokai/WebWorker)[
](https://scrapbox.io/shokai/WebWorker)[2つ定義がある](https://scrapbox.io/shokai/WebWorker)[
](https://scrapbox.io/shokai/WebWorker)[1. ](https://scrapbox.io/shokai/WebWorker)[`window.Worker`](https://scrapbox.io/shokai/WebWorker)[の事](https://scrapbox.io/shokai/WebWorker)[
](https://scrapbox.io/shokai/WebWorker)[これをWebWorkerと呼ぶ事もある](https://scrapbox.io/shokai/WebWorker)[
](https://scrapbox.io/shokai/WebWorker)[2. ServiceWorkerとSharedWorkerとDedicatedWorkerの3つをまとめてWebWorkerと呼ぶ場合もある](https://scrapbox.io/shokai/WebWorker)[
](https://scrapbox.io/shokai/WebWorker)[SharedWorkerと対比して、](https://scrapbox.io/shokai/WebWorker)[`window.Worker`](https://scrapbox.io/shokai/WebWorker)[の事をDedicatedWorkerと呼ぶ場合があるようだ](https://scrapbox.io/shokai/WebWorker)[FGNエンジニアMeetup vol.1](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[
](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[https://fgn.connpass.com/event/129569/](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[
](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[日時](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[
](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[2019/06/01(土) 18:30 〜 21:30](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[
](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[場所](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[
](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[福岡 Growth Next](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[Heroku](https://scrapbox.io/shokai/Heroku)[Scrapbox](https://scrapbox.io/shokai/Scrapbox)[SPA](https://scrapbox.io/shokai/SPA)[
](https://scrapbox.io/shokai/SPA)[Single Page Applicationの事](https://scrapbox.io/shokai/SPA)[
](https://scrapbox.io/shokai/SPA)[複数の画面を持つ複雑な動作をするアプリケーションだが](https://scrapbox.io/shokai/SPA)[
](https://scrapbox.io/shokai/SPA)[画面遷移する時にHTMLをまるごとリロードしない](https://scrapbox.io/shokai/SPA)[
](https://scrapbox.io/shokai/SPA)[Ajaxで通信し](https://scrapbox.io/shokai/SPA)[
](https://scrapbox.io/shokai/SPA)[JavaScriptでDOMを部分的に書き換えて](https://scrapbox.io/shokai/SPA)[サーバーサイドレンダリング](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[
](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[ReactのVirtualDOMから、DOMではなくHTMLを書き出す](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[
](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[つまりクライアントではなくサーバーでHTMLをレンダリングする](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[
](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[ふつうの静的ページとして配信する](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[
](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[良い所](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[
](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[react.jsを読み込ませるよりも帯域を使わない](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[発表資料](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[
](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[slideなど](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[
](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[このscrapbox project外の発表資料](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[
](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[/remote/コミュニケーションを減らそう](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[
](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[/remote/リモートで信頼をどう発生させるか (shokai)](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[
](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[/scrapbox-drinkup/時間を超越した存在になりたい](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[福岡](https://scrapbox.io/shokai/%E7%A6%8F%E5%B2%A1)[Scrapbox](https://scrapbox.io/shokai/Scrapbox)[2020年を振り返る](https://scrapbox.io/shokai/2020%E5%B9%B4%E3%82%92%E6%8C%AF%E3%82%8A%E8%BF%94%E3%82%8B)[heroku session-affinityをdisableにし、socket.ioのpollingを切ってwebsocket onlyにした](https://scrapbox.io/shokai/heroku_session-affinity%E3%82%92disable%E3%81%AB%E3%81%97%E3%80%81socket.io%E3%81%AEpolling%E3%82%92%E5%88%87%E3%81%A3%E3%81%A6websocket_only%E3%81%AB%E3%81%97%E3%81%9F)[Reactでstyleタグを作る](https://scrapbox.io/shokai/React%E3%81%A7style%E3%82%BF%E3%82%B0%E3%82%92%E4%BD%9C%E3%82%8B)[Gyazz](https://scrapbox.io/shokai/Gyazz)[氏が作っているWiKiの一種](https://scrapbox.io/shokai/Gyazz)[
](https://scrapbox.io/shokai/Gyazz)[Scrapbox（このWiKi）も、Gyazzの派生物](https://scrapbox.io/shokai/Gyazz)[
](https://scrapbox.io/shokai/Gyazz)[アウトラインエディタっぽい段落操作ができる](https://scrapbox.io/shokai/Gyazz)[
](https://scrapbox.io/shokai/Gyazz)[編集モードが無くWYSIWYGだが、ツールバーやボタンが無くて見た目がシンプル](https://scrapbox.io/shokai/Gyazz)[
](https://scrapbox.io/shokai/Gyazz)[カーソルが乗った行だけが編集モードになる](https://scrapbox.io/shokai/Gyazz)[Node.jsを10.x系にupdateした](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[
](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[Node.jsのバージョンを9系から10系に上げた](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[
](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[Scrapboxの開発環境と本番環境で使っている](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[
](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[久しぶりにMemory Usageが40%切っているのを見た](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[
](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[Node.js 9.xでは50%〜60%ぐらいだった](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[
](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[まだあまり時間経っていないので、個人の感想レベルです](https://scrapbox.io/shokai/Node.js%E3%82%9210.x%E7%B3%BB%E3%81%ABupdate%E3%81%97%E3%81%9F)[GyaPC2016](https://scrapbox.io/shokai/GyaPC2016)[
](https://scrapbox.io/shokai/GyaPC2016)[\#イベント](https://scrapbox.io/shokai/GyaPC2016)[
](https://scrapbox.io/shokai/GyaPC2016)[やります](https://scrapbox.io/shokai/GyaPC2016)[
](https://scrapbox.io/shokai/GyaPC2016)[詳しくは/GyaPC2016に書かれている](https://scrapbox.io/shokai/GyaPC2016)[
](https://scrapbox.io/shokai/GyaPC2016)[申し込み](https://scrapbox.io/shokai/GyaPC2016)[
](https://scrapbox.io/shokai/GyaPC2016)[https://nota.connpass.com/event/44328/](https://scrapbox.io/shokai/GyaPC2016)[md2sb](https://scrapbox.io/shokai/md2sb)[が作ったmarkdownからScrapbox記法へ変換するツール](https://scrapbox.io/shokai/md2sb)[
](https://scrapbox.io/shokai/md2sb)[Node.jsで書かれている](https://scrapbox.io/shokai/md2sb)[
](https://scrapbox.io/shokai/md2sb)[pastak/md2sb: Encode Markdown to Scrapbox.io style text](https://scrapbox.io/shokai/md2sb)[
](https://scrapbox.io/shokai/md2sb)[md2sb](https://scrapbox.io/shokai/md2sb)[qiita-team-to-scrapbox](https://scrapbox.io/shokai/qiita-team-to-scrapbox)[
](https://scrapbox.io/shokai/qiita-team-to-scrapbox)[qiita-team-to-scrapbox](https://scrapbox.io/shokai/qiita-team-to-scrapbox)[
](https://scrapbox.io/shokai/qiita-team-to-scrapbox)[Import to Scrapbox.io from json exported Qiita::Team](https://scrapbox.io/shokai/qiita-team-to-scrapbox)[
](https://scrapbox.io/shokai/qiita-team-to-scrapbox)[Qiita:Teamからscrapboxにインポートできるツール](https://scrapbox.io/shokai/qiita-team-to-scrapbox)[UserCSS](https://scrapbox.io/shokai/UserCSS)[
](https://scrapbox.io/shokai/UserCSS)[/help-jp/UserCSS](https://scrapbox.io/shokai/UserCSS)[
](https://scrapbox.io/shokai/UserCSS)[テーマを変更するだけでは物足りず、さらにScrapbox側のHTML構造の変更を物ともしない上級者向けの機能です。](https://scrapbox.io/shokai/UserCSS)[
](https://scrapbox.io/shokai/UserCSS)[Scrapboxには、CSSで見た目をカスタムする機能が2種類ある](https://scrapbox.io/shokai/UserCSS)[
](https://scrapbox.io/shokai/UserCSS)[1. プロジェクト全体にCSSをかける(ProjectCSS)](https://scrapbox.io/shokai/UserCSS)[
](https://scrapbox.io/shokai/UserCSS)[settingsというページを作ってそこにコードブロック記法で](https://scrapbox.io/shokai/UserCSS)[`code:style.css`](https://scrapbox.io/shokai/UserCSS)[を書く](https://scrapbox.io/shokai/UserCSS)[markdownはデカイ文字を書くのに便利](https://scrapbox.io/shokai/markdown%E3%81%AF%E3%83%87%E3%82%AB%E3%82%A4%E6%96%87%E5%AD%97%E3%82%92%E6%9B%B8%E3%81%8F%E3%81%AE%E3%81%AB%E4%BE%BF%E5%88%A9)[Scrapbox または Wiki で再び遊ぶ — しっぽのさきっちょ | text.Baldanders.info](https://scrapbox.io/shokai/Scrapbox_%E3%81%BE%E3%81%9F%E3%81%AF_Wiki_%E3%81%A7%E5%86%8D%E3%81%B3%E9%81%8A%E3%81%B6_%E2%80%94_%E3%81%97%E3%81%A3%E3%81%BD%E3%81%AE%E3%81%95%E3%81%8D%E3%81%A3%E3%81%A1%E3%82%87_%7C_text.Baldanders.info)[
](https://scrapbox.io/shokai/Scrapbox_%E3%81%BE%E3%81%9F%E3%81%AF_Wiki_%E3%81%A7%E5%86%8D%E3%81%B3%E9%81%8A%E3%81%B6_%E2%80%94_%E3%81%97%E3%81%A3%E3%81%BD%E3%81%AE%E3%81%95%E3%81%8D%E3%81%A3%E3%81%A1%E3%82%87_%7C_text.Baldanders.info)[Scrapbox または Wiki で再び遊ぶ — しっぽのさきっちょ | text.Baldanders.info](https://scrapbox.io/shokai/Scrapbox_%E3%81%BE%E3%81%9F%E3%81%AF_Wiki_%E3%81%A7%E5%86%8D%E3%81%B3%E9%81%8A%E3%81%B6_%E2%80%94_%E3%81%97%E3%81%A3%E3%81%BD%E3%81%AE%E3%81%95%E3%81%8D%E3%81%A3%E3%81%A1%E3%82%87_%7C_text.Baldanders.info)[
](https://scrapbox.io/shokai/Scrapbox_%E3%81%BE%E3%81%9F%E3%81%AF_Wiki_%E3%81%A7%E5%86%8D%E3%81%B3%E9%81%8A%E3%81%B6_%E2%80%94_%E3%81%97%E3%81%A3%E3%81%BD%E3%81%AE%E3%81%95%E3%81%8D%E3%81%A3%E3%81%A1%E3%82%87_%7C_text.Baldanders.info)[\#scrapbox](https://scrapbox.io/shokai/Scrapbox_%E3%81%BE%E3%81%9F%E3%81%AF_Wiki_%E3%81%A7%E5%86%8D%E3%81%B3%E9%81%8A%E3%81%B6_%E2%80%94_%E3%81%97%E3%81%A3%E3%81%BD%E3%81%AE%E3%81%95%E3%81%8D%E3%81%A3%E3%81%A1%E3%82%87_%7C_text.Baldanders.info)[2016年の働きぶり](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[
](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[2016年5月からNota Inc.で働きはじめた](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[
](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[12月末までで8ヶ月間](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[
](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[pullreq 313件](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[
](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[約](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[`313/8/20 = 1.95件`](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[ぐらい](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[
](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[主にScrapboxを開発している](https://scrapbox.io/shokai/2016%E5%B9%B4%E3%81%AE%E5%83%8D%E3%81%8D%E3%81%B6%E3%82%8A)[コードブロック記法](https://scrapbox.io/shokai/%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E8%A8%98%E6%B3%95)[scrapmemo](https://scrapbox.io/shokai/scrapmemo)[
](https://scrapbox.io/shokai/scrapmemo)[Scrapboxでその日の日付のページを素早く作り、メモを取るためのコマンド](https://scrapbox.io/shokai/scrapmemo)[
](https://scrapbox.io/shokai/scrapmemo)[TouchBarから日記を書くために作った](https://scrapbox.io/shokai/scrapmemo)[
](https://scrapbox.io/shokai/scrapmemo)[上のコードブロック記法はファイル名の部分(scrapmemo)をクリックしたり、名前を付けて保存したりできる](https://scrapbox.io/shokai/scrapmemo)[関連ページリスト](https://scrapbox.io/shokai/%E9%96%A2%E9%80%A3%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AA%E3%82%B9%E3%83%88)[TouchBarにGyazoボタンを作る](https://scrapbox.io/shokai/TouchBar%E3%81%ABGyazo%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E4%BD%9C%E3%82%8B)[TouchBarから日記を書く](https://scrapbox.io/shokai/TouchBar%E3%81%8B%E3%82%89%E6%97%A5%E8%A8%98%E3%82%92%E6%9B%B8%E3%81%8F)[2017年1月18日](https://scrapbox.io/shokai/2017%E5%B9%B41%E6%9C%8818%E6%97%A5)[
](https://scrapbox.io/shokai/2017%E5%B9%B41%E6%9C%8818%E6%97%A5)[Scrapboxにドラッグアンドドロップやコピペで貼り付けた画像が、Gyazoの自分のアカウントに入るようになった](https://scrapbox.io/shokai/2017%E5%B9%B41%E6%9C%8818%E6%97%A5)[
](https://scrapbox.io/shokai/2017%E5%B9%B41%E6%9C%8818%E6%97%A5)[Gyazo側で関連検索して、別の画像からアップロード元のScrapboxの記事に戻ったりもできて便利感がある](https://scrapbox.io/shokai/2017%E5%B9%B41%E6%9C%8818%E6%97%A5)[
](https://scrapbox.io/shokai/2017%E5%B9%B41%E6%9C%8818%E6%97%A5)[\#2017年1月 \#memo](https://scrapbox.io/shokai/2017%E5%B9%B41%E6%9C%8818%E6%97%A5)[アイコン記法](https://scrapbox.io/shokai/%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E8%A8%98%E6%B3%95)[増井ラボノート コロンブス日和 第16回　Scrapbox（1）](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[
](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[\#コロンブス日和](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[
](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[第16回　Scrapbox（1）：増井ラボノート コロンブス日和｜gihyo.jp … 技術評論社](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[
](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[私は個人的なメモや予定表，TODOなどをすべてScrapboxで管理しており，現在6,000ページほどが作成されています。また家族間で共有したい情報もScrapboxで管理しています。親戚の連絡先，銀行口座情報，各種の契約情報，予定表など，家族間で共有したい情報は意外とたくさんあるものです。こういった情報は住所録やスケジュール帳のようなアプリケーションで管理している人が多いと思いますが，家族関連情報はすべて1つの場所に置いておけば何かと便利です。私の場合，家紋の情報，家系図，引っ越し履歴など家族に関連するさまざまな情報を書いていたら簡単に100ページを越えてしまいました。](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[
](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[私はこの考えに基づくシステムを10年以上利用しており，Scrapboxはその最新版です。多くの機能を盛りこんだために現在のScrapboxの仕様はある程度は大きなものとなっていますが，多くのアイデアは「コロンブスの卵」的であり，仕様のシンプルさは保てています。次号では，Scrapboxのさらに詳しい利用法および実装について解説します。](https://scrapbox.io/shokai/%E5%A2%97%E4%BA%95%E3%83%A9%E3%83%9C%E3%83%8E%E3%83%BC%E3%83%88_%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%96%E3%82%B9%E6%97%A5%E5%92%8C_%E7%AC%AC16%E5%9B%9E%E3%80%80Scrapbox%EF%BC%881%EF%BC%89)[アウトライン編集テクニック](https://scrapbox.io/shokai/%E3%82%A2%E3%82%A6%E3%83%88%E3%83%A9%E3%82%A4%E3%83%B3%E7%B7%A8%E9%9B%86%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF)[URLをコピペするとリンク記法になる](https://scrapbox.io/shokai/URL%E3%82%92%E3%82%B3%E3%83%94%E3%83%9A%E3%81%99%E3%82%8B%E3%81%A8%E3%83%AA%E3%83%B3%E3%82%AF%E8%A8%98%E6%B3%95%E3%81%AB%E3%81%AA%E3%82%8B)[ServiceWorker](https://scrapbox.io/shokai/ServiceWorker)[Workbox](https://scrapbox.io/shokai/Workbox)[YAPC2016 shokaiメモ](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[YAPC2016のメモ by ](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[
](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[2日目のみ参加](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[
](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[タイムテーブル](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[
](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[スマホ時代のBotアプリのつくり方 by yusukebe](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[
](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[boketeのLINE BOTアプリ](https://scrapbox.io/shokai/YAPC2016_shokai%E3%83%A1%E3%83%A2)[ServiceWorker内にExpressサーバーを立てる - Qiita](https://scrapbox.io/shokai/ServiceWorker%E5%86%85%E3%81%ABExpress%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E7%AB%8B%E3%81%A6%E3%82%8B_-_Qiita)[
](https://scrapbox.io/shokai/ServiceWorker%E5%86%85%E3%81%ABExpress%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E7%AB%8B%E3%81%A6%E3%82%8B_-_Qiita)[ServiceWorker内にExpressサーバーを立てる - Qiita](https://scrapbox.io/shokai/ServiceWorker%E5%86%85%E3%81%ABExpress%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E7%AB%8B%E3%81%A6%E3%82%8B_-_Qiita)[
](https://scrapbox.io/shokai/ServiceWorker%E5%86%85%E3%81%ABExpress%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E7%AB%8B%E3%81%A6%E3%82%8B_-_Qiita)[Node学園祭で「Browser is the new server」というセッションの際に発表されていたライブラリ、express-service(bahmutov氏作成)が非常に興味深かったため、その処理内容を追いました。](https://scrapbox.io/shokai/ServiceWorker%E5%86%85%E3%81%ABExpress%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E7%AB%8B%E3%81%A6%E3%82%8B_-_Qiita)[
](https://scrapbox.io/shokai/ServiceWorker%E5%86%85%E3%81%ABExpress%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E7%AB%8B%E3%81%A6%E3%82%8B_-_Qiita)[\#ServiceWorker \#express](https://scrapbox.io/shokai/ServiceWorker%E5%86%85%E3%81%ABExpress%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E7%AB%8B%E3%81%A6%E3%82%8B_-_Qiita)[ScrapboxはSEO意外と強い？](https://scrapbox.io/shokai/Scrapbox%E3%81%AFSEO%E6%84%8F%E5%A4%96%E3%81%A8%E5%BC%B7%E3%81%84%EF%BC%9F)[大切なことはだいたいHerokuで学んだ](https://scrapbox.io/shokai/%E5%A4%A7%E5%88%87%E3%81%AA%E3%81%93%E3%81%A8%E3%81%AF%E3%81%A0%E3%81%84%E3%81%9F%E3%81%84Heroku%E3%81%A7%E5%AD%A6%E3%82%93%E3%81%A0)[FGNエンジニアMeetup vol.1](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)[天ぷらたかお](https://scrapbox.io/shokai/%E5%A4%A9%E3%81%B7%E3%82%89%E3%81%9F%E3%81%8B%E3%81%8A)[発表資料](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)[YAPC2016Gyazzスライド](https://scrapbox.io/shokai/YAPC2016Gyazz%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%89)[Scrapboxの開発 - React & Websocketで作るリアルタイムWiki](https://scrapbox.io/shokai/Scrapbox%E3%81%AE%E9%96%8B%E7%99%BA_-_React_&_Websocket%E3%81%A7%E4%BD%9C%E3%82%8B%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0Wiki)[スライドを印刷 & PDFに書き出す](https://scrapbox.io/shokai/%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%89%E3%82%92%E5%8D%B0%E5%88%B7_&_PDF%E3%81%AB%E6%9B%B8%E3%81%8D%E5%87%BA%E3%81%99)[コミュニケーションを減らそう](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[
](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[we are remoteで話した発表資料](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[
](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[/remote/コミュニケーションを減らそう](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[
](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[リモートワークについての知見を話してきた](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[
](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[完全リモートワークをしている身として](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[
](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[コミュニケーションを減らして、大きめのタスクを集中してやれる時間を作る](https://scrapbox.io/shokai/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%B8%9B%E3%82%89%E3%81%9D%E3%81%86)[社会に出てみて実際役に立った、大学で得たスキル](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[ < コンニチハ](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[
](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[増井研合宿 2019GWの発表資料です](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[
](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[現状](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[
](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[社会人 満3年](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[
](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[自宅から京都にリモートワークしています](https://scrapbox.io/shokai/%E7%A4%BE%E4%BC%9A%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%BF%E3%81%A6%E5%AE%9F%E9%9A%9B%E5%BD%B9%E3%81%AB%E7%AB%8B%E3%81%A3%E3%81%9F%E3%80%81%E5%A4%A7%E5%AD%A6%E3%81%A7%E5%BE%97%E3%81%9F%E3%82%B9%E3%82%AD%E3%83%AB)[宣言的にJSXを書く](https://scrapbox.io/shokai/%E5%AE%A3%E8%A8%80%E7%9A%84%E3%81%ABJSX%E3%82%92%E6%9B%B8%E3%81%8F)[福岡](https://scrapbox.io/shokai/%E7%A6%8F%E5%B2%A1)[百道浜](https://scrapbox.io/shokai/%E7%99%BE%E9%81%93%E6%B5%9C)[ShinShin](https://scrapbox.io/shokai/ShinShin)[福岡のうどん](https://scrapbox.io/shokai/%E7%A6%8F%E5%B2%A1%E3%81%AE%E3%81%86%E3%81%A9%E3%82%93)[明星和楽2018](https://scrapbox.io/shokai/%E6%98%8E%E6%98%9F%E5%92%8C%E6%A5%BD2018)[海の中道](https://scrapbox.io/shokai/%E6%B5%B7%E3%81%AE%E4%B8%AD%E9%81%93)[天神](https://scrapbox.io/shokai/%E5%A4%A9%E7%A5%9E)[
](https://scrapbox.io/shokai/%E5%A4%A9%E7%A5%9E)[福岡の真ん中あたりにある地名・駅名](https://scrapbox.io/shokai/%E5%A4%A9%E7%A5%9E)[
](https://scrapbox.io/shokai/%E5%A4%A9%E7%A5%9E)[天神駅](https://scrapbox.io/shokai/%E5%A4%A9%E7%A5%9E)[
](https://scrapbox.io/shokai/%E5%A4%A9%E7%A5%9E)[福岡空港まで地下鉄1本、15分ぐらいで行けて、やたら便利な街だと思った](https://scrapbox.io/shokai/%E5%A4%A9%E7%A5%9E)[太宰府天満宮](https://scrapbox.io/shokai/%E5%A4%AA%E5%AE%B0%E5%BA%9C%E5%A4%A9%E6%BA%80%E5%AE%AE)[ニクゼン](https://scrapbox.io/shokai/%E3%83%8B%E3%82%AF%E3%82%BC%E3%83%B3)[Kazz Yokomizo](https://scrapbox.io/shokai/Kazz_Yokomizo)[博多もつ鍋前田屋](https://scrapbox.io/shokai/%E5%8D%9A%E5%A4%9A%E3%82%82%E3%81%A4%E9%8D%8B%E5%89%8D%E7%94%B0%E5%B1%8B)[明星和楽](https://scrapbox.io/shokai/%E6%98%8E%E6%98%9F%E5%92%8C%E6%A5%BD)[
](https://scrapbox.io/shokai/%E6%98%8E%E6%98%9F%E5%92%8C%E6%A5%BD)[http://myojowaraku.net/](https://scrapbox.io/shokai/%E6%98%8E%E6%98%9F%E5%92%8C%E6%A5%BD)[
](https://scrapbox.io/shokai/%E6%98%8E%E6%98%9F%E5%92%8C%E6%A5%BD)[福岡で10年ぐらいやっているイベント](https://scrapbox.io/shokai/%E6%98%8E%E6%98%9F%E5%92%8C%E6%A5%BD)[呉服町ランチ](https://scrapbox.io/shokai/%E5%91%89%E6%9C%8D%E7%94%BA%E3%83%A9%E3%83%B3%E3%83%81)[
](https://scrapbox.io/shokai/%E5%91%89%E6%9C%8D%E7%94%BA%E3%83%A9%E3%83%B3%E3%83%81)[/gofukumachi-lunch](https://scrapbox.io/shokai/%E5%91%89%E6%9C%8D%E7%94%BA%E3%83%A9%E3%83%B3%E3%83%81)[
](https://scrapbox.io/shokai/%E5%91%89%E6%9C%8D%E7%94%BA%E3%83%A9%E3%83%B3%E3%83%81)[福岡のごはん情報がどんどん書かれていく](https://scrapbox.io/shokai/%E5%91%89%E6%9C%8D%E7%94%BA%E3%83%A9%E3%83%B3%E3%83%81)[SPA](https://scrapbox.io/shokai/SPA)[今さら聞けないSPAのCORS対策の話 by sota1235](https://scrapbox.io/shokai/%E4%BB%8A%E3%81%95%E3%82%89%E8%81%9E%E3%81%91%E3%81%AA%E3%81%84SPA%E3%81%AECORS%E5%AF%BE%E7%AD%96%E3%81%AE%E8%A9%B1_by_sota1235)[CSSレスポンシブデザインをSPAで使うと破滅する](https://scrapbox.io/shokai/CSS%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B7%E3%83%96%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%92SPA%E3%81%A7%E4%BD%BF%E3%81%86%E3%81%A8%E7%A0%B4%E6%BB%85%E3%81%99%E3%82%8B)[サーバーサイドレンダリング](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)[koa](https://scrapbox.io/shokai/koa)[semirara](https://scrapbox.io/shokai/semirara)[
](https://scrapbox.io/shokai/semirara)[このwikiのことではない](https://scrapbox.io/shokai/semirara)[
](https://scrapbox.io/shokai/semirara)[2016年春ごろ作った](https://scrapbox.io/shokai/semirara)[
](https://scrapbox.io/shokai/semirara)[ほぼ今のこのwikiに機能は吸収された (2016/09/14)](https://scrapbox.io/shokai/semirara)[
](https://scrapbox.io/shokai/semirara)[サーバーサイドレンダリングまわり以外？](https://scrapbox.io/shokai/semirara)[Stylify](https://scrapbox.io/shokai/Stylify)[
](https://scrapbox.io/shokai/Stylify)[BrowserifyでStylusを使うためのtransform](https://scrapbox.io/shokai/Stylify)[
](https://scrapbox.io/shokai/Stylify)[require(foo.styl)がbrowserify内で解決される](https://scrapbox.io/shokai/Stylify)[
](https://scrapbox.io/shokai/Stylify)[文字列として読み込まれるようだ](https://scrapbox.io/shokai/Stylify)[
](https://scrapbox.io/shokai/Stylify)[読み込んだcss文字列はinsert-cssでstyleタグとして埋め込む](https://scrapbox.io/shokai/Stylify)[React v16](https://scrapbox.io/shokai/React_v16)[
](https://scrapbox.io/shokai/React_v16)[React v16.0 - React Blog](https://scrapbox.io/shokai/React_v16)[
](https://scrapbox.io/shokai/React_v16)[Reactのあたらしいやつ](https://scrapbox.io/shokai/React_v16)[
](https://scrapbox.io/shokai/React_v16)[componentがArrayやnullを返せるようになった](https://scrapbox.io/shokai/React_v16)[
](https://scrapbox.io/shokai/React_v16)[react-addons-perfが使えなくなった](https://scrapbox.io/shokai/React_v16)[
](https://scrapbox.io/shokai/React_v16)[chromeでhttp://localhost:3000/?react_perfを開くと計測できるらしい](https://scrapbox.io/shokai/React_v16)[componentDidCatch](https://scrapbox.io/shokai/componentDidCatch)[
](https://scrapbox.io/shokai/componentDidCatch)[React v16で実装された機能](https://scrapbox.io/shokai/componentDidCatch)[
](https://scrapbox.io/shokai/componentDidCatch)[そのコンポーネント、および子コンポーネントで発生した例外をcatchできる](https://scrapbox.io/shokai/componentDidCatch)[
](https://scrapbox.io/shokai/componentDidCatch)[Error Handling in React 16 - React Blog](https://scrapbox.io/shokai/componentDidCatch)[
](https://scrapbox.io/shokai/componentDidCatch)[`componentDidCatch (error, info)`](https://scrapbox.io/shokai/componentDidCatch)[というメソッドをComponent classに宣言するだけで使える](https://scrapbox.io/shokai/componentDidCatch)[
](https://scrapbox.io/shokai/componentDidCatch)[catchしたら、](https://scrapbox.io/shokai/componentDidCatch)[`setState({error})`](https://scrapbox.io/shokai/componentDidCatch)[とかしてrenderを切り替えればいい](https://scrapbox.io/shokai/componentDidCatch)[Roppongi.js#5](https://scrapbox.io/shokai/Roppongi.js%235)[
](https://scrapbox.io/shokai/Roppongi.js%235)[5回目のRoppongi.js](https://scrapbox.io/shokai/Roppongi.js%235)[
](https://scrapbox.io/shokai/Roppongi.js%235)[https://roppongi-js.connpass.com/event/95936/](https://scrapbox.io/shokai/Roppongi.js%235)[
](https://scrapbox.io/shokai/Roppongi.js%235)[日時](https://scrapbox.io/shokai/Roppongi.js%235)[
](https://scrapbox.io/shokai/Roppongi.js%235)[2018/08/23(木) 19:00 〜 22:00](https://scrapbox.io/shokai/Roppongi.js%235)[
](https://scrapbox.io/shokai/Roppongi.js%235)[場所](https://scrapbox.io/shokai/Roppongi.js%235)[Heroku](https://scrapbox.io/shokai/Heroku)[PaaS](https://scrapbox.io/shokai/PaaS)[
](https://scrapbox.io/shokai/PaaS)[アプリケーションを送るとホストしてくれるサービス](https://scrapbox.io/shokai/PaaS)[
](https://scrapbox.io/shokai/PaaS)[ユーザーはアプリケーションより下の事を気にしなくていい](https://scrapbox.io/shokai/PaaS)[
](https://scrapbox.io/shokai/PaaS)[OSやインフラなど](https://scrapbox.io/shokai/PaaS)[
](https://scrapbox.io/shokai/PaaS)[DBや依存ライブラリ等も適当にインストールして環境構築してくれる](https://scrapbox.io/shokai/PaaS)[
](https://scrapbox.io/shokai/PaaS)[Herokuなど](https://scrapbox.io/shokai/PaaS)[Let's Encrypt](https://scrapbox.io/shokai/Let%27s_Encrypt)[
](https://scrapbox.io/shokai/Let%27s_Encrypt)[https://letsencrypt.org/](https://scrapbox.io/shokai/Let%27s_Encrypt)[
](https://scrapbox.io/shokai/Let%27s_Encrypt)[SSLの証明書が無料でもらえる](https://scrapbox.io/shokai/Let%27s_Encrypt)[
](https://scrapbox.io/shokai/Let%27s_Encrypt)[すぐexpireするから自動更新を設定するとかしなければならない](https://scrapbox.io/shokai/Let%27s_Encrypt)[
](https://scrapbox.io/shokai/Let%27s_Encrypt)[Herokuでも使えるみたいなのであとでやる](https://scrapbox.io/shokai/Let%27s_Encrypt)[
](https://scrapbox.io/shokai/Let%27s_Encrypt)[Let's encryptをHerokuにあるRailsアプリに適用する - Qiita](https://scrapbox.io/shokai/Let%27s_Encrypt)[HerokuでNodeを動かす](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[
](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[Procfileはいらない](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[
](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[最近はpackage.jsonのstartを見てくれる](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[
](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[で起動するアプリならそのまま動く](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[
](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[devDependenciesもインストールする](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[
](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[デフォルトでは](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[`dependencies`](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[しかインストールしてくれない](https://scrapbox.io/shokai/Heroku%E3%81%A7Node%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99)[Herokuにサブドメインを向ける](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[
](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[を作った](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[
](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[昔は金払わないとサブドメイン使えなかった気がする](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[
](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[semirara](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[
](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[wiki.shokai.orgとして動かしたかった](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[
](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[簡単にできた](https://scrapbox.io/shokai/Heroku%E3%81%AB%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E5%90%91%E3%81%91%E3%82%8B)[haikunator](https://scrapbox.io/shokai/haikunator)[
](https://scrapbox.io/shokai/haikunator)[haikunator](https://scrapbox.io/shokai/haikunator)[
](https://scrapbox.io/shokai/haikunator)[Generate Heroku-like random names to use in your node applications.](https://scrapbox.io/shokai/haikunator)[
](https://scrapbox.io/shokai/haikunator)[herokuっぽい名前を生成できるnpm](https://scrapbox.io/shokai/haikunator)[
](https://scrapbox.io/shokai/haikunator)[seed](https://scrapbox.io/shokai/haikunator)[
](https://scrapbox.io/shokai/haikunator)[readmeでは](https://scrapbox.io/shokai/haikunator)[`new Haikunator({seed: 'custom-seed'})`](https://scrapbox.io/shokai/haikunator)[という風にseedを設定している](https://scrapbox.io/shokai/haikunator)[run-with-heroku-env](https://scrapbox.io/shokai/run-with-heroku-env)[
](https://scrapbox.io/shokai/run-with-heroku-env)[Herokuの環境変数を取得して、それをセットした状態でコマンドを実行するCLI tool](https://scrapbox.io/shokai/run-with-heroku-env)[
](https://scrapbox.io/shokai/run-with-heroku-env)[本番環境のDBに接続してbatch処理とかやる時に、ローカルにパスワード等を残したくなかったので作った](https://scrapbox.io/shokai/run-with-heroku-env)[
](https://scrapbox.io/shokai/run-with-heroku-env)[https://www.npmjs.com/package/run-with-heroku-env](https://scrapbox.io/shokai/run-with-heroku-env)[
](https://scrapbox.io/shokai/run-with-heroku-env)[https://github.com/shokai/run-with-heroku-env](https://scrapbox.io/shokai/run-with-heroku-env)[
](https://scrapbox.io/shokai/run-with-heroku-env)[インストール](https://scrapbox.io/shokai/run-with-heroku-env)[sticky-session](https://scrapbox.io/shokai/sticky-session)[
](https://scrapbox.io/shokai/sticky-session)[あるクライアントからのリクエストを必ず同じサーバーに送るようにするHTTPロードバランサーの機能](https://scrapbox.io/shokai/sticky-session)[
](https://scrapbox.io/shokai/sticky-session)[cookieを食わせてルーティングする](https://scrapbox.io/shokai/sticky-session)[
](https://scrapbox.io/shokai/sticky-session)[リクエスト元のIPアドレスから毎回hashを計算し、接続先サーバーを決めるという方法ではない](https://scrapbox.io/shokai/sticky-session)[
](https://scrapbox.io/shokai/sticky-session)[socket.io-redisでサーバーをcluster化する時などに使う](https://scrapbox.io/shokai/sticky-session)[
](https://scrapbox.io/shokai/sticky-session)[socket.ioは接続時の最初の数回はhttp pollingでhandshakeしようとする](https://scrapbox.io/shokai/sticky-session)[Heroku Router](https://scrapbox.io/shokai/Heroku_Router)[
](https://scrapbox.io/shokai/Heroku_Router)[https://devcenter.heroku.com/articles/http-routing](https://scrapbox.io/shokai/Heroku_Router)[
](https://scrapbox.io/shokai/Heroku_Router)[Herokuの各Dynoにアクセスを振り分けるHTTPロードバランサー](https://scrapbox.io/shokai/Heroku_Router)[
](https://scrapbox.io/shokai/Heroku_Router)[sticky-sessionやWebSocketに対応していたりして、なかなかよく考えて実装されているようだ](https://scrapbox.io/shokai/Heroku_Router)[
](https://scrapbox.io/shokai/Heroku_Router)[定期的なdynoの再起動とgraceful restartのためのルールが実装されている](https://scrapbox.io/shokai/Heroku_Router)[
](https://scrapbox.io/shokai/Heroku_Router)[アプリがclientに30秒以内にレスポンスを返さないとエラーと見なす、等](https://scrapbox.io/shokai/Heroku_Router)[Heroku Redis](https://scrapbox.io/shokai/Heroku_Redis)[失敗学](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[
](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[/yuiseki/失敗学](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[
](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[いい記事](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[
](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[失敗からフィードバックを得てシステムを修復する方法が色々書かれている](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[
](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[人間のやる気や根性に頼っても失敗が改善されることはない](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[人間のやる気を出す事、までをシステムに組み込むことは可能だとも思う](https://scrapbox.io/shokai/%E5%A4%B1%E6%95%97%E5%AD%A6)[mlab](https://scrapbox.io/shokai/mlab)[アプリ開発で、大事なことを身につけるために Herokuが教えてくれる２つの要素 | しょっさん](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[
](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[アプリ開発で、大事なことを身につけるために Herokuが教えてくれる２つの要素｜しょっさん｜note](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[
](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[大切なことはだいたいHerokuで学んだで触れた、Herokuの](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[
](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[1. 悪い設計をさせてくれない](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[
](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[2. 運用しやすい設計になる](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[
](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[について](https://scrapbox.io/shokai/%E3%82%A2%E3%83%97%E3%83%AA%E9%96%8B%E7%99%BA%E3%81%A7%E3%80%81%E5%A4%A7%E4%BA%8B%E3%81%AA%E3%81%93%E3%81%A8%E3%82%92%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB_Heroku%E3%81%8C%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%EF%BC%92%E3%81%A4%E3%81%AE%E8%A6%81%E7%B4%A0_%7C_%E3%81%97%E3%82%87%E3%81%A3%E3%81%95%E3%82%93)[dependenciesにbabelを入れる](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[
](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[babel等のbuild関係のnpmは、常にdevDependenciesに入れなければならないという勘違いを見かけるので書いておく](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[
](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[分けにくい物を無理やり2つに分ける](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[
](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[dev、test、build、runの4フェーズを](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[
](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[開発(local)、CI、productionの3環境で分けていて](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[
](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[それらを、package.jsonではdependenciesとdevDependenciesの2つに割り振って](https://scrapbox.io/shokai/dependencies%E3%81%ABbabel%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B)[Logentries](https://scrapbox.io/shokai/Logentries)[
](https://scrapbox.io/shokai/Logentries)[Herokuで使えるログコレクタ](https://scrapbox.io/shokai/Logentries)[
](https://scrapbox.io/shokai/Logentries)[https://elements.heroku.com/addons/logentries](https://scrapbox.io/shokai/Logentries)[
](https://scrapbox.io/shokai/Logentries)[scrapboxで使っている](https://scrapbox.io/shokai/Logentries)[
](https://scrapbox.io/shokai/Logentries)[月139ドルで3つの用途を満たせるので選択した](https://scrapbox.io/shokai/Logentries)[
](https://scrapbox.io/shokai/Logentries)[他のheroku addonではPapertrailでもできるが、Logentriesの方が安い](https://scrapbox.io/shokai/Logentries)[Prefetch](https://scrapbox.io/shokai/Prefetch)[Network Information API](https://scrapbox.io/shokai/Network_Information_API)[postMessage](https://scrapbox.io/shokai/postMessage)[Worker Threads](https://scrapbox.io/shokai/Worker_Threads)[
](https://scrapbox.io/shokai/Worker_Threads)[https://nodejs.org/api/worker_threads.html](https://scrapbox.io/shokai/Worker_Threads)[
](https://scrapbox.io/shokai/Worker_Threads)[Node.js v10.5.0で実装されたmulti-thread機能](https://scrapbox.io/shokai/Worker_Threads)[
](https://scrapbox.io/shokai/Worker_Threads)[APIはWebWorkerに似ている](https://scrapbox.io/shokai/Worker_Threads)[
](https://scrapbox.io/shokai/Worker_Threads)[postMessageでやりとりする](https://scrapbox.io/shokai/Worker_Threads)[
](https://scrapbox.io/shokai/Worker_Threads)[WebWorkerとの違い](https://scrapbox.io/shokai/Worker_Threads)[WebWorker](https://scrapbox.io/shokai/WebWorker)[Coinhive](https://scrapbox.io/shokai/Coinhive)[
](https://scrapbox.io/shokai/Coinhive)[WebWorkerを使った社会的コンセンサスが皆無な仮想通貨マイニングをするサービス](https://scrapbox.io/shokai/Coinhive)[
](https://scrapbox.io/shokai/Coinhive)[東京や京都以外でWebWorker使うと逮捕されるらしい](https://scrapbox.io/shokai/Coinhive)[
](https://scrapbox.io/shokai/Coinhive)[高木浩光＠自宅の日記 - 懸念されていた濫用がついに始まった刑法19章の2「不正指令電磁的記録に関する罪」](https://scrapbox.io/shokai/Coinhive)[
](https://scrapbox.io/shokai/Coinhive)[仮想通貨マイニング（Coinhive）で家宅捜索を受けた話 - Webを楽しもう「ドークツ」](https://scrapbox.io/shokai/Coinhive)[
](https://scrapbox.io/shokai/Coinhive)[WebWorkerは、scrapboxでも活用しているので心配](https://scrapbox.io/shokai/Coinhive)[ウェブブラウザの off-the-main-thread API の話](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[
](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[ウェブブラウザの off-the-main-thread API の話](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[
](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[UI thread以外で実行させる事をoff-the-main-threadと呼ぶ](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[
](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[WebWorker以外にも、Workletがある](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[
](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[Audio Worklet](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[
](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[Animation Workelt](https://scrapbox.io/shokai/%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE_off-the-main-thread_API_%E3%81%AE%E8%A9%B1)[検索や推薦をWebWorkerでやる](https://scrapbox.io/shokai/%E6%A4%9C%E7%B4%A2%E3%82%84%E6%8E%A8%E8%96%A6%E3%82%92WebWorker%E3%81%A7%E3%82%84%E3%82%8B)[async-singleton](https://scrapbox.io/shokai/async-singleton)[
](https://scrapbox.io/shokai/async-singleton)[https://www.npmjs.com/package/async-singleton](https://scrapbox.io/shokai/async-singleton)[async-awaitやPromiseの多重呼び出しを避けたくて作った](https://scrapbox.io/shokai/async-singleton)[
](https://scrapbox.io/shokai/async-singleton)[これを](https://scrapbox.io/shokai/async-singleton)[
](https://scrapbox.io/shokai/async-singleton)[こうすると](https://scrapbox.io/shokai/async-singleton)[
](https://scrapbox.io/shokai/async-singleton)[skipされた呼び出し元にも、](https://scrapbox.io/shokai/async-singleton)[`Promise.resolve`](https://scrapbox.io/shokai/async-singleton)[が返る](https://scrapbox.io/shokai/async-singleton)[roppongi.js#1](https://scrapbox.io/shokai/roppongi.js%231)[エッジコンピューティング](https://scrapbox.io/shokai/%E3%82%A8%E3%83%83%E3%82%B8%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0)

![](https://gyazo.com/86faa398b233f86be3ad4a15cd2e777e/thumb/400)

![](https://gyazo.com/d487581f31f748e594a067d758880ef6/thumb/400)

![](https://gyazo.com/7622d63ce35541453a74a7a53c2196d3/thumb/400)

![](https://scrapbox.io/api/pages/shokai/shokai/icon)

![](https://gyazo.com/6baf2292cdcc5d9a137f9e1b3423fa2d/thumb/400)

![](https://gyazo.com/042440239d2fdb126a93351629d91c13/thumb/400)

![](https://gyazo.com/02bb0b23cf9c15d5581c8ac7b0269d14/thumb/400)

![](https://gyazo.com/97a250efb01db1cec31adedbb577b8bf/thumb/400)

![](https://gyazo.com/d8c6563d49573a87bc05f3c05938a140/thumb/400)

![](https://gyazo.com/1084aad0ac79042c1d788e04c1f3ace7/thumb/400)

![](https://scrapbox.io/api/pages/shokai/%E5%A2%97%E4%BA%95%E4%BF%8A%E4%B9%8B/icon)

![](https://scrapbox.io/api/pages/shokai/pastak/icon)

![](https://gyazo.com/0f4d04297dd1ca7a57e58553e4ec805c/thumb/400)

![](https://gyazo.com/a2645bc6799d87351a8222b2ca72de53/thumb/400)

![](https://gyazo.com/343caf0f14cc565ce656a43e9a02aad2/thumb/400)

![](https://gyazo.com/76c888b9853c5f59b316df5e4a5b25a9/thumb/400)

![](https://gyazo.com/e18d300736ca9d82b8c180f101215519/thumb/400)

![](https://gyazo.com/a5281d9b46aa709fd46a68ad94d3bb87/thumb/400)

![](https://gyazo.com/01f4aad0d02c7a39c1def1f4f2784d2a/thumb/400)

![](https://gyazo.com/af13096c1525bee0fc77beb064d22fed/thumb/400)

![](https://gyazo.com/1fb9efebd3f237306b1eced28fab59d2/thumb/400)

![](https://scrapbox.io/api/pages/shokai/shokai/icon)

![](https://gyazo.com/d0cb05c6e36cf5cecd42a0884723b5eb/thumb/400)

![](https://gyazo.com/81f27f51c12fab10d496f825cff77e24/thumb/400)

![](https://gyazo.com/6b0acfdb0cec5c143ba8e2ddb02d4c29/thumb/400)

![](https://gyazo.com/02fb6e1009a6115079f2bb6603971b73/thumb/400)

![](https://gyazo.com/60f40e0ffa7bdb6c23cff0accae8f511/thumb/400)

![](https://gyazo.com/3e27ee39a56c0afdeb40c67d12049bea/thumb/400)

![](https://scrapbox.io/api/pages/shokai/shokai/icon)

![](https://gyazo.com/aec28cbecc6743ac75b40fa8ef5bf5c0/thumb/400)

![](https://gyazo.com/3fec32684c98c8cf73dd6e40b0d05feb/thumb/400)

![](https://gyazo.com/4be9b63c3f17fe03be51622ecb67e875/thumb/400)

![](https://gyazo.com/85a174b341b3ded27047b483c1b5fd9c/thumb/400)

![](https://gyazo.com/d53dae6baf7df4d5ebdbab951d240445/thumb/400)

![](https://gyazo.com/b0d5fd114f74e64e0b0cda65e3ddf1a0/thumb/400)

![](https://gyazo.com/1bcba51392204a35fed5f92db248a73b/thumb/400)

![](https://gyazo.com/2054b14309e4dd0109842f5a1fce1cf1/thumb/400)

![](https://gyazo.com/9a6bf3c91d2a171f1b6799d32e345c10/thumb/400)

![](https://gyazo.com/0d4650398b339f9f9371496a669207a0/thumb/400)

![](https://gyazo.com/8d6992e282554b599f0837af551b31eb/thumb/400)

![](https://gyazo.com/ea72cb71236d0d77d02150292feca87e/thumb/400)

![](https://gyazo.com/8b05f9047581746f49943b8908342668/thumb/400)

![](https://gyazo.com/5c3e5a71fab92e47e156907df0de3006/thumb/400)

![](https://scrapbox.io/api/pages/shokai/shokai/icon)

![](https://gyazo.com/2c77b3f0410633c53c9d0fb83fbcee70/thumb/400)

![](https://gyazo.com/2c530e0efd556de7e868b26b9a365466/thumb/400)

![](https://scrapbox.io/api/pages/shokai/shokai/icon)

![](https://gyazo.com/016fe739ec67e2f955064078b712cdde/thumb/400)