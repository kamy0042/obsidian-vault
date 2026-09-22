---
Updated: 2021-01-08T02:52:00
Created: 2021-01-08T02:52:00
URL: https://next.rikunabi.com/journal/20180201_t21_iq/
Tags: [topic/技術/PWA]
---
Webアプリはネイティブアプリと比べてロードが遅い、通知が出せない、実行が遅いといった課題を持つ。だがProgressive Web AppとWebAssemblyを活用し、ネイティブアプリと遜色のない速さを実現させたサイトも登場している。
html5j Webプラットフォーム部では今回「Progressive Web AppとWebAssembly」をテーマに勉強会を開催した。

最後に登壇したのは、日本経済新聞社のソフトウェアエンジニアとして「[r.nikkei.com](https://r.nikkei.com/)」のフロントおよびバックエンドを担当している宍戸俊哉さん。セッションタイトルは「[日経電子版のページ高速化とPWA対応](https://speakerdeck.com/sisidovski/nikkei-high-performance-pwa)」だ。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/DSC08245.jpg)

## リニューアルして表示が速くなったと大きな反響を呼んだ日経電子版

日経電子版とは2010年3月に創刊した、毎日約900本の記事を配信している電子媒体。有料会員54万人以上、無料会員300万人以上、月間3億アクセス以上。紙・電子版の合計では全世界で300万部を発行する世界最大の経済メディアである。

宍戸さんが担当したのは、「Next Nikkei」という日経電子版リニューアルプロジェクト。「r.nikkei.com」からの配信に、11月のリリースではモバイル版と一部PCページを置き換えた。表示速度も向上し、旧モバイル版と比較して約2倍の速度を達成するなど、反響も大きかった。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_2.jpg)

リニューアルの背景にあったのが、モバイル端末のアクセス増加、PC版とSP版をそれぞれ開発する工数がかかっていたこと。内製化の推進、2015年に買収した英フィナンシャル・タイムズ社からの学びがあったことだ。

**旧モバイル版の課題の第一は、Backbone.jsとjQueryをベースに書かれたSPAで、保守性に問題があった**こと。

**第二に大量のサブリソースの読み込みや肥大化jsファイル、サーバサイドレンダリング（SSR）非対応だったことから、初回表示速度が遅かった**こと。第三は**古いAPIサーバを利用しており、共通化したいと考えていた**ことだ。

日経に先行してフィナンシャル・タイムズ社ではWeb版をリニューアルしていた。同社のCIOのケイト氏は、「テストを実行してみて、もしユーザーがページを訪れた時に、ページの表示が1秒でも遅かったらエンゲージメントは5％下がる」と、ページのスピードは非常に大事だと話していた。

FTではあえてページを遅く表示させることで、コンバージョンにどう影響するかテストしたところ、ページを1秒遅くなるたびに、数％ずつコンバージョンは下がることがわかったという。この事例を日経にも応用するということで、Next Nikkeiのプロジェクトが立ち上がった。**最重要KPIはスピードである**。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_3.jpg)

UI/UXを改善するためにレスポンシブ対応、PWA化に取り組んだ。実際インフラやアーキテクチャも見直し、Fastlyやmicroserviecesアーキテクチャを採用することに。もちろん内製で行った。

r.nikkei.comの内部構成は、Fastly + Elastic Beanstalk + Node.js on the containerによる構成となっており、30以上のサービスで動いている。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_1.jpg)

## ページの高速化のための手法

r.nikkei.comはFastlyで動的なコンテンツもCDN経由で配信。VCLで柔軟にキャッシュを制御し、HTTP/2の利用、サブリソースの圧縮、画像配信を最適化している。これらのページ高速化をどう進めていったのか。

Fastlyのキャッシュ戦略としては、Cache-Control、Surrogate-Controlの設定、認証cookieのdecode、Feature Flagsの正規化（Preflight）など。詳しくは「[Microservices on Fastly by Ryo yasuda](https://speakerdeck.com/ryysd/microservices-on-fastly)」を見てほしいが、この結果、キャッシュヒット率は約90％を維持することが可能となった。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_4.jpg)

HTTP/2に関してもFastlyの機能を利用している。ドメインの同時接続数を気にする必要がなくなることや、バイナリストリームによる高速化といったHTTP/2の恩恵に加え、Server Pushも利用している。Server Pushは、critical pathに適用している。

リソースの圧縮も、圧縮できるものはすべて圧縮している。Fastlyは基本的にVanishに乗っているものしかキャッシュできないが、H2Oを使ってオンザフライ圧縮も可能になっている。Fastlyに圧縮を任せることで、オリジンのCPUリソースを節約できる。

画像配信はSaaSのimgixを利用している。内製で作っていた画像変換サーバから乗り換えた。HTTP APIで顔認識、クロップ、リサイズなどが柔軟にできるほか、キャッシュ制御も行ってくれる。エッジサイドで最適化をした結果、高いキャッシュヒット率、オリジンサーバのリソース削減が実現した。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_5.jpg)

続いてフロントエンドの最適化について。高速化のためにフロントエンドですべきことは、ベストプラクティスを実施である。つまりアセットの再利用、サブリソースの非同期読み込み、Responsive Image、lazy loading、Resource Hintsを使って事前に読み込んだりすることだ。

まずは**Cache-Control**。静的ファイルにはセオリー通りhash string + max-ageをつけることで、サーバへの問い合わせを行えるようにしている。リロードへの対策としてimmutableをつける。

次に**UIコンポーネントの作成**。NIKKEI UIと言うコンポート指向のスタイルガイドを作成し、マークアップの開発コストを削減、スタイル定義の重複削減、UI/UXの一貫性の担保を実現した。

第三は**Resource Hintsの利用**。dns-prefetch、preconnect、prefetch、prerenderという必要となるリソースの投機的な取得を行う。

r.nikkei.comではdns-prefetch、prefetch、prerenderを利用し、広告などサードパーティドメインはdns-prefetchを利用している。

例えば朝夕刊ページはprefetchの利用だ。朝夕刊ページとは紙の新聞と同じコンテンツを載せているページ。静的ページのため、prefetchを使っている。200msから20msで返せるようになっている。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_6.jpg)

また動的にprerenderを設定している。マウスカーソルがアイコンに載ったら、linkタグを挿入する。これはChrome58から無効化されているので、今は動いていない。

Resource Hints対応状況は、ブラウザによってまちまちだ。IEやSafariの場合は、dns-prehetchしか現状選択肢がない。ブラウザが未サポートでも動作に影響を与えないので採用しやすい。いずれにしてもユースケースを考慮することが重要だ。

続いてFrameworkやSPAについて。フロントだとFrameworkを使うのが前提になっているが、r.nikkei.comではFrameworkは使っていない。

その理由はWeb標準の普及やPolyfillを使うことで、Frameworkのロックインを避けつつモダンな開発が十分にできるということや、無駄なファイルサイズ増大を防げるということ。

また、SPAは一般的に状態管理が難しく、長期的に見ると保守性に問題が生じる懸念があったからだ。SSR、TTI（Time To Interactive）の問題もあり、一部ページを除き非SPAで実装している。

パフォーマンスのモニタリングはどうしているのか。これにはSpeedcurveで、旧プロダクトや競合サービスと比較。各パフォーマンス指標を可視化できるので、ボトルネックの調査ができる。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_7.jpg)

Performance BurgetのチェックもSpeedcurveで行っている。ファイルサイズの差分チェックは自前のツールで実施しており、変更後のCSS／JSファイルサイズをPull Requesetに通知するようになっている。自分の変更がファイルサイズにどう影響するのか事前にわかる。

パフォーマンス・モニタリングでは次のような課題がある。

- Push Cache等のキャッシュ周り最適化
- Code Splitting
- DOMが複雑になりすぎる問題
- Performance Budgetの基準が不明瞭
- RUMを使った計測していないので、実際のランタイムの動きは細かく把握できていない。

## Service Workerでできることと今後の課題

高速化対応に引き続きPWA化について。PWAはService Workerが必須だが、初期r.nikkei.comにおいては、有料会員にもpaywallが表示されてしまったり、キャッシュしたページを表示すると、バグだらけだった。何がいけなかったのか。

CIでのテストがなく、リリースする以外に本番環境相当で検証する手段がなかったのだ。ではどうやってService Workerのテストをすればよいのか。

その解決策としては実際にブラウザを立ち上げてテストし、実行環境をモック化することだ。r.nikkei.comでは現状Seleniumを使ったテストをCIに組み込んでいる。

まだ実装できていないが、Feature FlagsをIndexedDBに同期させることで、コード変更やQAをより容易にすることを考えているという。

ngrokを使った本番環境相当のデバッグは、Fastly上でHTTPヘッダとトークンの検証を行うことで実現する。現在はngrokではなく、チームメンバーが自作したツールを利用している。

現在のr.nikkei.comは**Service Workerを利用して、静的ファイルのキャッシュ、トップページや記事ページへのオフラインアクセス、記事の更新チェック、速報のプッシュ通知**を可能にしている。

トップ記事・朝夕刊の事前キャッシュすることの利点は、**高速化・オフラインでのアクセスを実現**することだ。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_9.jpg)

ただ、事前キャッシュはデータ通信量が非常に大きくなるという問題点がある。それを解決するために、Network Information APIを使っている。

通信環境を取得できるので、Wi-Fiかセルラーかなど、をリアルタイムで取得できる。大きなリソースのダウンロードはWi-Fi接続時のみに限定しているのだ。

Service Workerの課題はそれだけではない。ユーザーがログインしたとき、非ログイン時の古いキャッシュが残ってしまうという問題がある。

これを防ぐため、Service Worker内でログイン/ログイン時のURLをキャプチャし、ログイン前後でキャッシュを削除するか、postMessageを使っている。

古いキャッシュの削除については、割とリソースには余裕はあるものの、不要なキャッシュはさっさと削除するようにしている。

キャシュしたURLとタイムスタンプをIndexedDBに保存。Cache Storage内のリソースと同期させる。キャッシュ追加リクエストの前処理として同時に一定時間経過後に削除するのである。

プッシュ通知は速報の通知に利用している。プッシュのパーミッションについては、ページを開いた瞬間にパーミッションを要求する対応などで、悪いUXを避けるようにしている。

r.nikkei.comにおけるPWA対応の課題もまだまだある。更新系の処理のオフライン対応ができていない。定期実行ができない（朝刊のキャッシュなどは寝ている間にかってやっておいてほしいなど）、プッシュ通知などがその一例だ。

しかし、ページ高速化＋PWA対応した結果、旧モバイル版との比較、パフォーマンスのスコアは2倍以上改善、現行PC版との比較は、Speed Index、Shart Renderが約1/3にまで削減できた。

![](https://next.rikunabi.com/journal/wp-content/uploads/2018/02/sisidovski_10.jpg)

これらの高速化の手法については、「[超速！Webページ速度改善ガイド](http://gihyo.jp/book/2017/978-4-7741-9400-4)」にほぼ書かれている。

PWAやWASMに関心のある人は、今回のセッションを参考にぜひチャレンジしてほしい。よりユーザーにとって使いやすいページができるはずだ。

## 関連ページ

- [html5j Webプラットフォーム部 第19回勉強会](https://html5j-webplat.connpass.com/event/74013/)
- [日経電子版 サイト高速化とPWA対応 / nikkei-high-performance-pwa](https://speakerdeck.com/sisidovski/nikkei-high-performance-pwa)

### イベントの様子は動画でも公開中

**※本記事は「CodeIQ MAGAZINE」掲載の記事を転載しております。**

## タグ

- [\#html5jplat](https://next.rikunabi.com/journal/tag/html5jplat/)
- [\#UI/UX](https://next.rikunabi.com/journal/tag/uiux/)
- [\#Progressive Web Apps](https://next.rikunabi.com/journal/tag/progressive-web-apps/)
- [\#PWA](https://next.rikunabi.com/journal/tag/pwa/)
- [\#Service Worker](https://next.rikunabi.com/journal/tag/service-worker/)