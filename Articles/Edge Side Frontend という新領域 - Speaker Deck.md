---
Created: 2022-07-23T19:13:00
URL: https://speakerdeck.com/mizchi/edge-side-frontend-toiuxin-ling-yu
Tags: [topic/技術/フロントエンド]
---
![[Attachments/無題のフォルダ/slide_0 4.jpg]]

## Transcript

1.  ページスピードが非機能要件から SEO という準機能要件へ LCP: 最大コンテンツ確定時間 CLS: 累積レイアウト TTI: 操作可能タイミング
    ### [近年のゲームチェンジャー : Core WebVitals https://web.dev/i18n/ja/vitals/ ページ速度が Google Search SEO に関与するようになった](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_4.jpg)
2.  が、ベースラインとして「良いコンテンツ= 高速」は個人的に納得 感はある 何よりパフォーマンスをゲーミフィケーションできて楽しい!
    ### [Core WebVitals への個人的な見解 ページ特性次第で常に正しい指標とは言えない 「Core Web Vitals はWeb を高速化したか？」 https://postd.cc/have-core-web-vitals-made-the-web-faster/](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_5.jpg)
3.  ( 経験的 な感覚) 以内に LCP 確定の必要 TTFB: 初期応答時間 LCP: ページ内で最大レイアウト要素が確定したタイミング 雑な肌感 DNS Lookup で 20~80ms 限界まで絞った JS/CSS の Evaluation でも CPU Time: 80~ms 残りの猶予で使える RTT * N はほとんどない 現実には Blocking Waterfall が多発するのでもっと厳しい
    ### [LCP 最適化 Lighthouse Pref で 100 点を出すには TTFB から約 450ms](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_6.jpg)
4.  を返す伝統的なスタ イルは既に不利 我々が考えることは、何が どこまで静的コンテンツと して事前に確定するか？
    ### [「正解」 CDN Edge から全部返す アプリケーションサーバー に到達させたら負け つまり アプリケーションか ら html](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_7.jpg)
5.  コンテンツが肥大化するに つれてリリース時間が増大 更新が低頻度でアクセスが 多い場合に向いてる ( 人によって定義がブレます)
    ### [Jamstack 再考 構成要素が更新されるたび に静的アセットをCDN に撒 く( だけ) ビルド後は静的アセットな ので運用が楽/ 閲覧が高速](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_8.jpg)
6.  = await fetch('https://.../posts').then(res => res.json()); return { props: { posts }, revalidate: 60 } } 60 秒ごとにキャッシュを破棄して静的コンテンツを再生成する 初回リクエストは遅延を許容して生成しながら返す 再生成中は一つ前のコンテンツを返す( かどうかを制御できる)
    ### [ISR: Next.js Example export async function getStaticProps() { const posts](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_10.jpg)
7.  基本的に ユーザーに弱整合を納得してもらうのは困難 ISR: Vercel 以外のネイティブサポートがない( 難しい) ISR でも再生成時間を短くするとコストが増大
    ### [Jamstack | ISR の課題 ビルド ~ CDN Cache Purge 間は古いコンテンツが表示される](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_11.jpg)
8.  props.article.user.id; useEffect(() => { if (!isMine) return; getArticle({ slug: props.slug }).then(setAricle); }, [isMine]); Zenn では著者本人の場合のみ最新のデータをリクエストするよう にしています “ “
    ### [Zenn のキャッシュ整合性ハック https://zenn.dev/catnose99/articles/8bed46fb271e44 // 上記記事と同様の処理を行う疑似コード const isMine = currentUser.id ===](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_12.jpg)
9.  以外のコンテンツに対してキャッシュ整合の興味がな いのでは？ キャッシュ整合性のアドバンス戦略 : 弱整合静的コンテンツと強整合API の 2 系統用意 認証フラグ等で強整合API を選択的に有効化
    ### [Zenn のハックをどう解釈するか 仮説 : 人間は「自分が更新したら反映される」という予想から外れると 強い拒否感を示す 自分 ( 自社 )](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_13.jpg)
10.  略なのでは？ 注意: もちろんコンテンツの性質次第
    ### [キャッシュ設計は納得感との戦い キャッシュしたら速くて安いことはエンジニアなら知ってる でも自分( 自社) の納得感のために強整合を要求する( 要求される) 閲覧者は多少の遅延を許容してでも閲覧が速いほうが嬉しいし、提 供側にとっても安いはず… 全体最適のためにコンテンツオーナーだけハックする のは立派な戦](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_14.jpg)
11.  ず) ただし、反映速度は CDN の Cache Purge 速度に依存 この点現時点で最強なのは Fastly の Instant Purge (~150ms)
    ### [キャッシュ破棄をアプリケーションに織り込む 光を超えるためのフロントエンドアーキテクチャ https://speakerdeck.com/mizchi/guang-wochao- erutamefalsehurontoendoakitekutiya 全キャッシュを前提として、API によるリソース更新にキャッシュ 破棄を仕込む ISR の時間経過以外をトリガーにコンテンツ再生成を実現できる( は](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_15.jpg)
12.  Edge 上から細かくやれると嬉しい というのがフリで、そろそろ CDN Edge Worker が欲しくなってきま せんか？
    ### [ISR | Jamstack でさらにできるといいこと キャッシュ不整合状態を短くした上で多くをキャッシュヒットさせ たい ハイパフォーマンスなフロントエンドの責務は、アプリケーション サーバーに到達させないための、キャッシュ制御が主になってくる キャッシュ制御は CDN](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_17.jpg)
13.  $ ping api.twitter.com PING tpop-api.twitter.com (104.244.42.66): 56 data bytes 64 bytes from 104.244.42.66: icmp_seq=0 ttl=47 time=183.429 ms $ ping skypack.dev PING skypack.dev (104.26.12.82): 56 data bytes 64 bytes from 104.26.12.82: icmp_seq=0 ttl=51 time=6.695 ms 64 bytes from 104.26.12.82: icmp_seq=1 ttl=51 time=10.566 ms
    ### [CDN の復習 リクエスト元から地理的に近い場所でレスポンスをキャッシュし、返 却する仕組み。 CDN を使っていない api.twitter.com と skypack.dev で比較する](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_19.jpg)
14.  GeoDNS/GeoIP 技術を使って地理的に近いエンドポイントに リクエストを振り分け ClouDNS, Amazon Route 53, Google Cloud DNS, Cloudflare 等が サービスとして提供 実際難しいのはここから先の分散ファイルシステムの実装
    ### [頑張れば CDN ( の IP 最適化 ) は自分で作れる https://dev.to/megajakob/how-to-build-your-own-cdn-io1 要約:](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_20.jpg)
15.  スイッチ相当: 主に TCP / HTTP Header を見てネットワークを振 り分ける CDN 利用する開発者にできるのは、 ヘッダを付与してキャッシュ 破棄間隔を指定する程度 Cache-Control: s-maxage=300,max-age=180
    ### [これまでの CDN の役割 Akamai, AWS Cloudfront, Cloudflare, Fastly 主に静的アセット配信の最適化 L4](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_21.jpg)
16.  Varnish VCL でリクエストをコントロールできるようになった。 例: origin で feature flag を切り替える if (req.restarts == 0) { set req.backend = F_origin_0; set req.http.tmpOrigUrl = req.url; set req.url = "/response-headers?Flags=group-A,new-header,search-enabled"; } else { set req.backend = F_origin_1; is disabled. This re-enables it. set req.http.Fastly-Force-Shield = "1"; }/ return(lookup);
    ### [Fastly VCL による動的なエッジ処理 (2011?-) CDN はある程度決め打ちなものだったが、Fastly では CDN 利用者で も、](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_22.jpg)
17.  専用言語 アプリケーション設計全体が Fastly VCL ありきになり、強いロック インが発生してしまう 自分はこれを懸念して Fastly に賭けられないでいた。新規プロダ クトや転職先で Fastly を選択できる保証がないため… 仮に採用したとして、より良い選択肢が出てきた時に乗り換えら れるか？
    ### [Fastly VCL の問題 VCL 自体が Fastly | Varnish 前提でほぼ Fastly](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_23.jpg)
18.  JavaScript(V8) 実行環境 汎用言語(JS/Wasm) で動く CDN Edge Worker を各社も追従 Fastly: Comupute@Edge (WebAssembly) AWS: Cloudfront Function (ES5) Deno: Deno Deploy (Deno) ( 本資料は主に Cloudflare Workers にフォーカスを当てます)
    ### [Cloudflare Workers の登場 (2017-) Cloudflare Workers: https://workers.cloudflare.com/ Cloudflare CDN 上で動く](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_24.jpg)
19.  で実行する以上、強いマシンは仕込めなさそう 強めの CPU 制約 | 実行時間制限
    ### [CDN Edge Worker の特徴 ユーザーから地理的に近い CDN 上で応答するので低遅延 メモリフットプリントの小さいランタイムを要求 世界中の DC](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_25.jpg)
20.  Bundled Unbound CPU Time 10ms/req 50ms/req 30000ms/req Cost 100000/day 10 million / month, +$0.50/million 1 million / month, + $0.15/million
    ### [Cloudflare Workers にみる CPU 制約 (1) https://developers.cloudflare.com/workers/platform/limits/#environ ment-variables 課金するほど制約が緩くなる Free](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_26.jpg)
21.  ちょっと富豪的な Node アプリは動かない水準。 実際、node_modules そのまま現実的に不可能なので、 フロントエン ドと同等の Bundle + Optimize が必要になる。
    ### [Cloudflare Workers にみる CPU 制約 (2) メモリ上限: 128MB コード上限: 1MB](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_27.jpg)
22.  で記述できるようになった Node.js エンジニアの発想 Unbound を有効にすれば、サーバーサイド JS として十分なので は？ ( いずれにせよ High CPU なワークロードは任せない前提) Jamstack|ISR のリソース再生成はほぼ外部 API を読み出して外 にパスしてるだけと考えると、実際 Edge Worker 内でコンテン ツ再生成を任せられるのでは？
    ### [Cloudflare Workers の制約をどう解釈するか ネットワークエンジニアの発想( 既存の延長の発想) CDN で動く L7 プロキシを JavaScript](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_28.jpg)
23.  Node エンジニア CPU 制約を受け入れられれば高応答性のアプリケーションサー バーにもできそう Cloudflare も Workers が真の Serverless だとアピール Node + フロントエンドエンジニア (mizchi) 遂にアプリにCDN キャッシュ破棄を織り込む設計ができるぞ！
    ### [Cloudflare Workers は誰のためのもの？ ネットワークエンジニア CDN Edge 上の富豪的な L7 プロキシ 既存のネットワークの間に挟んでプロトコルの最適化ができる](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_29.jpg)
24.  JavaScript の標準を決めるためのグループ Cloudflare / Vercel / Deno / Shopify / Bytedance / Igalia が参加 自分のスタンス: 現状はある程度のロックインは許容しつつ、 Cloudflare に学習コストを全振り中
    ### [あれ、お前が嫌ってたロックイン問題は？ 現在、WinterCG というグループで、ブラウザ外 JavaScript の相互運 用性について仕様策定中 https://wintercg.org/ | https://github.com/wintercg ブラウザ以外で動く](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_30.jpg)
25.  Workers Works https://developers.cloudflare.com/workers/learning/how-workers- works/ Security Model https://developers.cloudflare.com/workers/learning/security- model/
    ### [CDN Edge Worker はスケールするのか？ なんで JS なんかの高水準言語でスケールさせようと思ったのか調 べた https://mizchi.dev/202009122126-cloudflare-workers How](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_32.jpg)
26.  その変数を変異させることが許されたコードを含む軽量なコンテ キストです。 Isolate は、関数を実行するための「サンドボック ス」と考えることもできます。 “ “ Isolate のメモリは完全に分離されているので、各コードはランタ イム上の他の信頼されていないコードやユーザーが書いたコード から保護されています。また、Isolate は非常に迅速に起動できる ように設計されています。各関数のために仮想マシンを作成する のではなく、既存の環境内に Isolate を作成します。このモデル は、仮想マシンモデルのコールドスタートを排除します。 “ “
    ### [How Workers Works - Cloudflare V8 は Isolate をオーケストレートします: 変数をグループ化して、](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_33.jpg)
27.  を仮想コンテナ として決め打ちして、大量にスケールさせてる
    ### [V8 Isolate on Cloudflare Workers 大雑把に言うと CPU: 128MB 割り当てた v8::Isolate](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_34.jpg)
28.  V8 Isolate を動かすためのサンドボックス v8::Isolate: 実行単位。 V8 Snapshot に実行状態をダンプできる v8::Snapshot: バイナリシリアライズされたIsolate の中間状態 例えば Chrome なら DOM API が Binding された Snapshot Node.js / Deno でもその環境の API が構築済みの Snapshot Cloudflare Workers もおそらく同様の Snapshot がある ( 極論: Node や Deno のコードを読むと理解できます)
    ### [ここで V8 の復習 V8: Google Chrome の JavaScript Engine v8::Context:](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_35.jpg)
29.  V8 Isolate であるという主張
    ### [Ryan Dahl 曰く「 V8 はコンテナ」 https://tinyclouds.org/javascript_containers Linux OS, Docker, に続くコンテナこそが](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_36.jpg)
30.  “ 私はLinux コンテナがなくなると主張しているわけではありませ ん。その抽象化のレベルは常に有用です。ただ、人々が書く「ビ ジネス・ロジック」の多くには、むしろ低レベルすぎます。ウェ ブサイトを作るとき、systemd のコンフィギュレーションなどは 定型的なものです。 “ “
    ### [Ryan Dahl の主張 (1) JavaScript は世界共通のスクリプト言語です。JavaScript の普遍 性のために、サーバーを単純化する新しいコンテナのような抽象 化が出現しています。 “](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_37.jpg)
31.  “ ウェブは人間のためのものであり、実行環境がスクリプティング 言語であることは理にかなっています。 “ “
    ### [Ryan Dahl の主張 (2) Web サービスの大部分は、Linux コンテナではなく、JavaScript コ ンテナの観点から考えることで、簡略化できるかもしれません。 “](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_38.jpg)
32.  High CPU 処理を切り分けるために Fastly Comupte@Edge のように WebAssembly Runtime も選択肢としてほしい。だが Ry の言うよ うに人間の生産性を注力するなら v8 の選択肢は妥当
    ### [Ryan Dahl の意見をどう捉えるか v8 がコンテナというのには同意だが、技術的中立性を欠く 同コンセプト実行モデルを持つの他の言語( 例: dart) でも同等のこ とができそう](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_39.jpg)
33.  Cloudflare Workers は V8 Isolation をコンテナとして決め打ちして CDN Edge でユーザコードを評価 Ry も「V8 はウェブと人間のためのコンテナ」と主張してる
    ### [Cloudflare Workers どう動くか : まとめ V8 Isolation はセキュリティサンドボックス付きの JS 実行モデル](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_40.jpg)
34.  KV: Regional Cache Cloudflare R2: Amazon S3 互換のオブジェクトストレージ Cloudflare D1: CDN Edge 上で動く sqlite
    ### [Cloudflare Workers 周辺の機能群 手元の弾を把握する DurableObjects: 強整合の CDN Edge 上のステートマシン Workers](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_43.jpg)
35.  await KV.put(key, value, { metadata: { someMetadataKey: "someMetadataValue" }, });
    ### [Workers KV 弱整合で高速な KeyValueStore インバリデーションは実測 5 秒程度だが、ワーストで60 秒かかる( ら しい)](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_44.jpg)
36.  に応じて地理的に Edge Location が再配置され る 各ドキュメントを読む限り、 DurableObjects が他を成立させるた めの基幹プロダクトっぽい扱いをされてる ( 完全に勘だけど R2 や D1 もこの中で動いてそう)
    ### [Durable Objects https://blog.cloudflare.com/ja-jp/introducing-workers-durable- objects-ja-jp/ CDN 上で動く強整合の Actor Model 現在の Connection](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_45.jpg)
37.  this.state = state; // `blockConcurrencyWhile()` ensures no requests are delivered until // initialization completes. this.state.blockConcurrencyWhile(async () => { let stored = await this.state.storage.get("value"); // After initialization, future reads do not need to access storage. this.value = stored || 0; }); } // Handle HTTP requests from clients. async fetch(request) { // use this.value rather than storage } }
    ### [Durable Objects: コード例 export class Counter { constructor(state, env) {](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_46.jpg)
38.  を同期する https://litestream.io/ や https://github.com/rqlite/rqlite と似た技術 を CDN 間で行ってると予想される 参考: Cloudflare D1 がヤバい https://zenn.dev/mizchi/articles/cloudflare-d1
    ### [Cloudflare D1 CDN Edge で read replica がばら撒かれる sqlite おそらく強整合ではないが、sqlite](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_47.jpg)
39.  https://github.com/cloudflare/worker-template-static CDN Edge 内で処理を完結させて高速に応答したい 参照系 API を D1 で完結して構築する( ことができるか？) 動的コンテンツの不整合な時間を最小にしたい KV.delete(...) をアプリケーションロジックに入れる
    ### [そもそも Edge で何がやりたかったんだっけ？ 静的アセットを CDN に当てたい R2 + KV で実装可](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_48.jpg)
40.  D1 に書き込 みつつ選択的に KV.delete() する キャッシュがない時: 動的な 静的アセット再生成と再キ ャッシュ(ISR)
    ### [Edge Worker 用フレ ームワークを考える フロントエンドの表示に関 わるデータをD1 に集約 更新系 API は](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_49.jpg)
41.  await env.db.exec([/*...*/]); kv.delete(req.params.id).catch(console.error); req.json({ok: true}); } // pages/posts/[uuid].tsx export const getStaticProps = async (ctx) => { const id = ctx.params.uuid; const posts = await env.db.get('select * from posts where id=$id', {$id:id}); return { // このページを破棄するタグ cacheKeys: ['@app', '@posts', id], props: { posts } } };
    ### [Next.js 風 API // api/update-post.ts export default (req) => {](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_50.jpg)
42.  で、普及は時間とリソース投資の問題 Edge Worker は既存のクラウドを置き換えるものではない あくまでユーザーと直接通信する末端の最適化で、今までのスタ ックが不要という話ではない とはいえ高コストなクラウドリソースを Edge Cache でアクセス 頻度を下げるという発想が主になる
    ### [誰が Edge Worker を触る必要があるか ウェブアプリケーションは Edge First で考える時代が来るだろう エコシステム枯れ具合だけが問題で、まだ未成熟 パフォーマンスとコストというわかりやすいメリットがあるの](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_51.jpg)
43.  という職域が 発生する 既存の Frontend の延長というより、 Frontend Ops と Node.js のサ ーバーサイド技術の組み合わせ SPA 職人の頃と同じで、最初は高級品扱いだが、Next.js のように 時代とともに陳腐化する
    ### [Edge Side Engineer という職域 Frontend Engineer から派生した Edge Side Engineer](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_52.jpg)
44.  Wasm に全振りは面白いけど Cloudflare の V8 のが好き Cloudflare と比較して開発者支援が貧弱 Deno Deploy: 簡易な Cache がない。Dynamo や Firebase 使えと言われても… Cloudfront Function: ES5 水準だし CPU 制約が多すぎて本当にL7 プロキシ。順次機能 開放されると思うが…
    ### [おまけ : Cloudflare 以外の Edge Worker への気 持ち Fastly Compute@Edge:](https://files.speakerdeck.com/presentations/903e170d2d8d4f878dfcf5a6390d63be/slide_53.jpg)