---
Updated: 2021-01-08T04:41:00
Created: 2021-01-08T04:41:00
URL: https://www.suzukikenichi.com/blog/google-doubles-speed-of-repeated-searches-by-using-service-worker/
Tags: [topic/技術/PWA]
---
[レベル: 上級]

Service Worker の機能を利用することにより、Google は繰り返し行われる検索の結果を 2 倍速く表示するに成功したそうです。[VentureBeat（ベンチャービート）が報じて](https://venturebeat.com/2018/09/01/google-search-now-uses-service-worker-for-repeated-searches/)います。

![](https://www.suzukikenichi.com/images/service-workers-running-in-google-search.png)

[Google 検索で可動する Service Worker]

## SW + Navigation preload で速度2倍

繰り返される検索にこの速度改善は適用されるとのことなので、Service Worker のキャッシュ機能を利用しているのでしょう。キャッシュは Service Worker が持つ定番の機能です。

さらに、Navigation preload という仕組みを Google は Service Worker で構成しているとのことです。状況によっては、Service Worker が起動するまでの時間がネットワークのレスポンスを遅らせてしまうことがあります。結果として、ページの読み込みも遅くなります。

Navigation preload はこうした問題を解決するのです（[詳しくはドキュメントを参照](https://developers.google.com/web/updates/2017/02/navigation-preload)してください）。

Navigation preload 自体は登場したばかりの新技術というわけではありません。2017 年 6 月にリリースされた Chrome 59 からサポートされています。しかしながら、Navigation preload をサポートしているのは、現状では Android 版 Chrome だけです。Android 版 Chrome であれば、スピード2倍の検索結果表示の恩恵を享受できます。

Google としては、検索以外のプラットフォームおよび Chrome 以外のブラウザにも [Navigation preload を広めていきたい](https://twitter.com/igrigorik/status/1037354267231703045)と考えているようです。

Google は、僕たちサイト管理者に速度改善の必要性を啓発するとともに、自分たちのプロダクトでも速度改善を追求しています。[Service Worker/PWA によって、Google は通常の検索でもスピードアップ](https://www.suzukikenichi.com/blog/google-maps-and-google-search-now-powered-by-pwa/)しています。Navigation preload によって繰り返しの検索ではさらに2倍速くすることに成功しました。

JavaScript に強い開発者がいるなら、[Navigation preload を研究](https://developers.google.com/web/updates/2017/02/navigation-preload)してみるといいかもしれませんね。

[Ads & Featured Articles]