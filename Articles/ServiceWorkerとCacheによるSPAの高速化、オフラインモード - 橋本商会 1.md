---
Updated: 2021-01-08T02:50:00
Created: 2021-01-08T02:50:00
URL: https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89
Tags: [topic/技術/PWA]
---
[ServiceWorkerとCacheによるSPAの高速化、オフラインモード](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19d2997c2910000e6c067)

[Scrapbox](https://scrapbox.io/shokai/Scrapbox)

の中で、

[ServiceWorker](https://scrapbox.io/shokai/ServiceWorker)

を使って何やってるか解説する

[FGNエンジニアMeetup vol.1](https://scrapbox.io/shokai/FGN%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2Meetup_vol.1)

の

[発表資料](https://scrapbox.io/shokai/%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99)

[こんにちは](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf23cfc97c2910000e27a10)

[shokaiです](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf23cf897c2910000e27a0f)

[Scrapboxを作っています](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf23d0797c2910000e27a11)

[横浜の自宅から京都にリモートワークしている](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf23d0d97c2910000e27a12)

[福岡](https://scrapbox.io/shokai/%E7%A6%8F%E5%B2%A1)

のほうが京都より安いし近い✈️

[詳細な実装の話](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1797a97c2910000aa0f59)

[/daiiz/ServiceWorkerを用いたキャッシング戦略 ~Wikiアプリケーションを例に~](https://scrapbox.io/daiiz/ServiceWorker%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0%E6%88%A6%E7%95%A5_~Wiki%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BE%8B%E3%81%AB~)

by

[半年ぐらい前の資料](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf23fa197c2910000e27a18)

[これをアップデートしつつ、もう一度噛み砕いて説明したい](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1798397c2910000aa0f5a)

[普通の](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf179ae97c2910000aa0f5b)

[SPA](https://scrapbox.io/shokai/SPA)

を高速化したり、オフライン対応したりする事を考える

[どこから手を付けるべきか？](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1963d97c2910000e6c01a)

[デモ内容](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18b2497c29100005e98e3)

[起動がはやい](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18b2697c29100005e98e5)

[Desktop PWA](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18b2e97c29100005e98e6)

[画面遷移がはやい](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18b4997c29100005e98e7)

[エディタにいろいろ書ける](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18b4f97c29100005e98e8)

[オフラインモード](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18d3997c29100005e98f5)

[普通の](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf171eb97c2910000aa0f11)

[SPA](https://scrapbox.io/shokai/SPA)

の動作

[0. ブラウザでページ開くと](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1721897c2910000aa0f14)

[1. HTML, JS, CSSなどのassetsをダウンロードして](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1721e97c2910000aa0f15)

[2. AjaxでAPIからデータをダウンロードして](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1723597c2910000aa0f16)

[3. 画面が表示される](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1723f97c2910000aa0f17)

[よくある高速化](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1728e97c2910000aa0f19)

[サーバーサイドレンダリング](https://scrapbox.io/shokai/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0)

[` 3. 画面が表示される `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf172a697c2910000aa0f1b)[まで終わったHTMLをいきなり返せば、最初の表示が速くなる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf172a697c2910000aa0f1b)

[その後で、ブラウザ上でも1,2,3を実行したりする技もある](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1730297c2910000aa0f20)

[CDN](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf172bb97c2910000aa0f1c)

[1と2のダウンロードが速くなる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf172c397c2910000aa0f1d)

[どちらも通信を効率化する](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf4bb3797c2910000ad2fa0)

[これらは](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1733197c2910000aa0f21)

[Scrapbox](https://scrapbox.io/shokai/Scrapbox)

では全くやっていない

[サーバーはアメリカの](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1733c97c2910000aa0f23)

[Heroku](https://scrapbox.io/shokai/Heroku)

にある

[往復200 msecぐらいかかるが、問題ない](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1738397c2910000aa0f24)

[ServiceWorker](https://scrapbox.io/shokai/ServiceWorker)

で高速化

[0. ブラウザでページ開くと](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1739b97c2910000aa0f27)

[1. HTML, JS, CSSなどを](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1739b97c2910000aa0f28)

[CacheStorage](https://scrapbox.io/shokai/CacheStorage)

から表示

[2. 前回取得したAPIデータをCacheStorageから表示](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1739b97c2910000aa0f29)

[3. 画面が表示される](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1739b97c2910000aa0f2a)

[この時点で操作可能になる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1760b97c2910000aa0f34)

[4. AjaxでAPIからデータをダウンロードして](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf173b697c2910000aa0f2b)

[5. 画面がさらに更新される](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf173c597c2910000aa0f2c)

[1, 2, 3まで一切通信をせずブラウザ内のキャッシュでやる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1922d97c2910000e6c002)

[通信するのは4だけ](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1cab597c2910000bc7cb8)

[通信速度を効率化するのではなく、タイミングや順序を入れ替えた](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf4bb5297c2910000ad2fa1)

[**基本の話**](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf179dc97c2910000aa0f5d)

[ServiceWorker](https://scrapbox.io/shokai/ServiceWorker)

とは？

[プログラマブルなネットワークproxy](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1771397c2910000aa0f48)

[HTTP通信を途中で書き換え可能](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1772497c2910000aa0f4b)

[オフライン表示の為の機能ではない](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1774f97c2910000aa0f4c)

[レスポンスをcacheしてあれば、オフライン表示も実装できるよね（自力でがんばれ）という世界観](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1775797c2910000aa0f4d)

[何でもできる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf177d097c2910000aa0f50)

[通信を握りつぶしたり](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf177c497c2910000aa0f4f)

[送信先を書き換えたり](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf177ed97c2910000aa0f53)

[リクエストしたフリをしてリクエストせず、適当なレスポンスを返したり](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf177db97c2910000aa0f52)

[回線切ってChrome起動すると見える](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf23e5c97c2910000f207ad)

[Chromeのホーム画面はServiceWorkerで実装されてるから、オフラインでも表示できる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf23e5c97c2910000f207af)

[workerのソースも見れるぞ](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf23e5c97c2910000f207b0)

[https://www.google.co.jp/_/chrome/newtab-serviceworker.js](https://www.google.co.jp/_/chrome/newtab-serviceworker.js)

[CacheStorage](https://scrapbox.io/shokai/CacheStorage)

とは？

[KVSです](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf187c297c29100005e98ba)

[key		Request object](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf187c497c29100005e98bb)

[value 	Response object](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf241a997c29100007155de)

[最近のブラウザに組み込まれている型](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1933697c2910000e6c004)

[UIスレッドとServiceWorkerの両方からアクセスできる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf187d597c29100005e98bd)

[` const response = await caches.match(request) `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1880097c29100005e98be)[で取り出せる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1880097c29100005e98be)

[ServiceWorkerのインストール](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17d7097c29100005e9875)

[ここは特に工夫の余地無いので飛ばす](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17d8097c29100005e9876)

[` navigator.serviceWorker.register `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17d8b97c29100005e9877)[でググれ](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17d8b97c29100005e9877)

[一度インストールすれば、約24時間毎に更新チェックされる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf185d197c29100005e98b3)

[ブラウザが自動的にやってくれる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1977c97c2910000e6c02f)

[HTTP通信がServiceWorkerを通る](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1762e97c2910000aa0f35)

[1. リクエスト](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17c4997c29100005e9859)

[UIスレッド → ServiceWorker → サーバー](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1767f97c2910000aa0f38)

[2. レスポンス](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17c4c97c29100005e985a)

[UIスレッド ← ServiceWorker ← サーバー](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1768597c2910000aa0f3a)

[どちらもServiceWorkerを通る](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17c8f97c29100005e985b)

[Fetchイベント](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1397c29100005e987a)

```plain text
serviceworker.js
```

[`self.addEventListener('fetch', event => {`](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1f97c29100005e9884)

[`  event.respondWith((async () => {`](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1f97c29100005e9885)

[`    const response = await fetch(event.request)`](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1f97c29100005e9886)

[`    return response`](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1f97c29100005e9887)

[`  })())`](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1f97c29100005e9888)

[`})`](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1f97c29100005e9889)

[1. fetchというイベントが来る](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e0a97c29100005e9879)

[2. 関数の方の](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1997c29100005e987b)[` fetch(request) `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1997c29100005e987b)[でサーバーから取得して](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e1997c29100005e987b)

[3. UIスレッドに返す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e7697c29100005e988a)

[これを自由に拡張して](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e7a97c29100005e988b)

[例えば](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e9597c29100005e988d)[` fetch(request) `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e9597c29100005e988d)[が失敗したらcacheを返す様にすれば、オフラインモード完成](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17e9597c29100005e988d)

[Prefetch](https://scrapbox.io/shokai/Prefetch)

[ServiceWorkerとUIスレッドの間は、](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1809e97c29100005e989f)

[postMessage](https://scrapbox.io/shokai/postMessage)

でもやりとりできる

[リンクにマウスホバーで「cache温めといて」](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf180b197c29100005e98a0)

[クリックする前にデータ取得して光速を超える](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1815797c29100005e98a8)

[詳しくは](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf180c397c29100005e98a2)

[ServiceWorkerをproductionで使ってる話](https://scrapbox.io/shokai/ServiceWorker%E3%82%92production%E3%81%A7%E4%BD%BF%E3%81%A3%E3%81%A6%E3%82%8B%E8%A9%B1)

[**話を戻す**](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1810f97c29100005e98a6)

[ServiceWorkerを使った高速化](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17f5c97c29100005e9890)

[0. ブラウザでページ開くと](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17f6397c29100005e9891)

[1. HTML/JS/CSSを](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17f6397c29100005e9892)

[CacheStorage](https://scrapbox.io/shokai/CacheStorage)

から表示

[2. 前回取得したAPIデータをCacheStorageから表示](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17f6397c29100005e9893)

[3. 画面が表示される](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17f6397c29100005e9894)

[4. AjaxでAPIからデータをダウンロードして](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17f6397c29100005e9896)

[5. 画面がさらに更新される](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf17f6397c29100005e9897)

[順に見ていく](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1808797c29100005e9899)

[1. HTML, JS, CSSなどを](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1808c97c29100005e989b)

[CacheStorage](https://scrapbox.io/shokai/CacheStorage)

から表示

[assets cache](https://scrapbox.io/shokai/assets_cache)

という仕組みを実装した

[バックグラウンドでHTML, JS, CSSを取得しておく](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1850c97c29100005e98aa)

[取得タイミング](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1859f97c29100005e98b1)

[ServiceWorkerが自動更新した後](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1857b97c29100005e98af)

[しばらくUIスレッドが通信していない時](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf185a697c29100005e98b2)

[日時をkeyにしたCacheStorageに保存してある](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1861297c29100005e98b4)

[新しいのを取得したら古いのを削除](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1871697c29100005e98b6)

[https://scrapbox.io/assets/assets.json](https://scrapbox.io/assets/assets.json)

[取得するassetのリスト](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1875897c29100005e98b8)

[このServiceWorkerの振る舞いを](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18cc097c29100005e98ed)

[cache first](https://scrapbox.io/shokai/cache_first)

と呼んでいる

[まずcacheから返す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18ccc97c29100005e98ee)

[cacheに無ければ、networkから取得して返す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18cd297c29100005e98ef)

[2. 前回取得したAPIデータをCacheStorageから表示](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1886b97c29100005e98c1)

[ブラウザ側のstateを復元する](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1886e97c29100005e98c3)

[この工程にServiceWorkerは関わらない](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf188a097c29100005e98c5)

[CacheStorageはUIスレッドからも直接読み書きできるので](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1888997c29100005e98c4)

[stateに](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf188f897c29100005e98ca)[` readyState = RESTORE_CACHE `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf188f897c29100005e98ca)[をセットしておく](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf188f897c29100005e98ca)

[後で使う](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1891397c29100005e98cb)

[エディタの中身はまだこの工程を実装していない](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1900097c2910000e6bff3)

[古いページを編集したらややこしくなるので](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18fdb97c2910000e6bff1)

[3. 画面が表示される](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf188e297c29100005e98c7)

[stateに基づき、Reactを普通にレンダリングするのだが](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf188e397c29100005e98c9)

[UIによっては「あくまでCacheから表示していますよ」と教えた方が良い物もある](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1892697c29100005e98cc)

[最新データの取得＆準備にちょっと時間がかかる為](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1899897c29100005e98cf)

[4. AjaxでAPIからデータをダウンロードして](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18c9c97c29100005e98eb)

[ServiceWorkerは、普通にfetchイベント受けて](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18d1397c29100005e98f4)[` fetch(request) `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18d1397c29100005e98f4)[してresponseをUIスレッドに返す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18d1397c29100005e98f4)

[だけでなく](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18dcd97c29100005e98f7)

[fetchの失敗をtry-catchして](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1915697c2910000e6bfff)

[Cache Storageから返す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1915697c2910000e6c000)

[responseをCacheStorageに保存しておく](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1908697c2910000e6bff8)

[日付を付けて、古いのは消す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1909997c2910000e6bff9)

[外部originの画像もimageに保存](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1912f97c2910000e6bffe)

[これを](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e0397c29100005e98fa)

[network first](https://scrapbox.io/shokai/network_first)

(cache second)と呼んでいる

[まずnetworkから返そうとする](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf4bcf497c2910000ad2fa2)

[失敗したらcacheから返す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf4bd0397c2910000ad2fa3)

[stateに](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e4797c29100005e98fe)[` readyState = FROM_REMOTE `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e4797c29100005e98fe)[もしくは](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e4797c29100005e98fe)[` FALLBACK_CACHE `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e4797c29100005e98fe)[をセットしておく](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e4797c29100005e98fe)

[後で使う](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e4797c29100005e98ff)

[5. 画面がさらに更新される](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf189f497c29100005e98d2)

[もう一度Reactのレンダリングを行う](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e7897c29100005e9900)

[` readyState = FROM_REMOTE `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e8397c29100005e9902)[の時](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18e8397c29100005e9902)

[普通に表示する](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18f9d97c2910000e6bfef)

[ServiceWorkerがインストールされてない場合と同じ](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1918497c2910000e6c001)

[` readyState = FALLBACK_CACHE `](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18ec997c29100005e9903)[の時](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18ec997c29100005e9903)

[右下に](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18f7b97c2910000e6bfed)

を表示しつつ

[編集系の操作をロックし、閲覧専用にする](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1903397c2910000e6bff4)

[これで](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1904c97c2910000e6bff5)

[Offline mode](https://scrapbox.io/shokai/Offline_mode)

ができた

[Offline mode](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19b0897c2910000e6c04c)

[Wikiなので編集が行われる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19b1097c2910000e6c04d)

[編集した後のデータでCacheStorageを更新したい](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19b1b97c2910000e6c04f)

[色々考えたけど「今見てるページをたまにGETする」が一番簡単だった](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19b2897c2910000e6c050)

[**まとめ**](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1949797c2910000e6c00b)

[起動はやい＆オフライン表示](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1956097c2910000e6c013)

[ServiceWorker](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf194fd97c2910000e6c010)

[assetsを](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf194e297c2910000e6c00f)

[cache first](https://scrapbox.io/shokai/cache_first)

で返す

[APIリクエストを](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf194cb97c2910000e6c00e)

[network first](https://scrapbox.io/shokai/network_first)

で処理する

[UIスレッド](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1950397c2910000e6c011)

[stateをまずcacheから復元する](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1950c97c2910000e6c012)

[これら3つのstateをユーザーに適切に教える](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf4bd6c97c2910000ad2fa4)

[画面遷移はやい](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1949d97c2910000e6c00d)

[prefetch](https://scrapbox.io/shokai/prefetch)

[Scrapboxではこの順で導入した](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19bb697c2910000e6c05a)

[1.](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19bb697c2910000e6c05b)

[assets cache](https://scrapbox.io/shokai/assets_cache)

実装して

[2. prefetch](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19bb697c2910000e6c05c)

[3. APIレスポンス全部cacheする](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19bb697c2910000e6c05d)

[4. オフライン表示](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19bb697c2910000e6c05e)

[5. cacheから復元して起動速度アップ](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19bb697c2910000e6c05f)

[6. ページ編集後にcache更新](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19bb697c2910000e6c060)

[既存のSPAを高速化するなら、どこからやる？](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf195a997c2910000e6c019)

[prefetchだと思う](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf197bb97c2910000e6c031)

[効果がわかりやすい。画面遷移はしょっちゅうある](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1996097c2910000e6c041)

[実装が一番簡単](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1979797c2910000e6c030)

[起動はやい＆オフライン表示　は](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1993f97c2910000e6c03f)

[assets cache](https://scrapbox.io/shokai/assets_cache)

がまず必要

[実装がちょっとめんどくさい](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19fea97c2910000e6c076)

[めんどくさい割に感動が薄い（起動した時しか効果が無い）](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf19fed97c2910000e6c077)

[ビルド・デプロイシステムにも関わってくる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1999697c2910000e6c044)

が作った

[https://github.com/nota/sw_skelton](https://github.com/nota/sw_skelton)

が参考になる

[WebWorker](https://scrapbox.io/shokai/WebWorker)

も併用するとアツい

[ブラウザ側でマルチスレッドプログラミングができる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18a0597c29100005e98d5)

[最近はスマホでも8コアとか入ってる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf193a497c2910000e6c008)

[無料でスケールする](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf4beaa97c2910000ad2fa5)

[エッジコンピューティング](https://scrapbox.io/shokai/%E3%82%A8%E3%83%83%E3%82%B8%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0)

[API設計が変わってくる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1939897c2910000e6c007)

[これを](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18a4b97c29100005e98d9)

[サーバーでデータを計算をしてブラウザに返す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18a2897c29100005e98d7)

[こうしていく](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18a5197c29100005e98da)

[サーバーはデータをドカッと返す](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18a4897c29100005e98d8)

[ブラウザで計算する](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18a5d97c29100005e98db)

[cacheされたAPIレスポンスを元に、ブラウザ側でインタラクティブな事をやれる](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18a6397c29100005e98dc)

[こういう分業になる様にAPIを作っていくと、たぶんオフラインモードでできる事が増える](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18aea97c29100005e98e2)

[サーバー](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18aa797c29100005e98dd)

[データの単純な保存、アクセス権限チェック](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18abb97c29100005e98de)

[ブラウザ](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18ac697c29100005e98df)

[計算していい感じに表示](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf18ac897c29100005e98e0)

[詳しくは](https://scrapbox.io/shokai/ServiceWorker%E3%81%A8Cache%E3%81%AB%E3%82%88%E3%82%8BSPA%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96%E3%80%81%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89#5cf1944e97c2910000e6c00a)

[検索や推薦をWebWorkerでやる](https://scrapbox.io/shokai/%E6%A4%9C%E7%B4%A2%E3%82%84%E6%8E%A8%E8%96%A6%E3%82%92WebWorker%E3%81%A7%E3%82%84%E3%82%8B)

へ