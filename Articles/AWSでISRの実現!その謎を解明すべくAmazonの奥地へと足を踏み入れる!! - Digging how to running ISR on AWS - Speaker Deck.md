---
URL: https://speakerdeck.com/keisuke69/digging-how-to-running-isr-on-aws
Created: 2021-10-01T10:04:00
Updated: 2021-11-06T22:40:00
Tags: [topic/技術/React/Nextjs]
---
![[Attachments/無題のフォルダ/slide_0 4.jpg]]

## Transcript

1.  creative work. 🎨 Love Music ♫ Love Camping ⛺ Blog: https://www.keisuke69.net/ 💻 Everything will be serverless. ⚡ カジュアル⾯談:https://meety.net/matches/kBtcRNFYzKEI 🧑💻
    ### [CTO@ Singular Perturbations Inc Keisuke Nishitani @Keisuke69 Programming is a](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_1.jpg)
2.  • HTMLのレンダリングおよびリクエストのルーティングがクライア ントサイド（≒ブラウザ）で⾏われる • 同⼀のページ内で⾏われる • ページ遷移がサクサク動く • React / Vue.js /Angularあたりが 有名 ①初回リクエスト ②HTML/JS/CSS ③APIリクエスト ④JSON Webサーバ/ホスティング バックエンドAPI
    ### [Single Page Application (SPA) • 単⼀のHTMLページで構成されるWebアプリケーション • 1枚のHTMLに置かれたJavaScript (およびTypeScript)もしくはアプリケー ションですべてが成⽴](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_12.jpg)
3.  • GooglebotはレンダリングエンジンとしてHeadless Chromiumを⽤いてJavaScriptを実⾏ するが、⼀昨年まではChrome41相当の古いものであったためそもそも正しく動いてくれ ない、つまり正しいHTMLを認識してくれないという問題があった • 現在は最新のChromeに常に対応していくことが発表されている • ファーストビューが遅い • UXの問題に加えて対クローラーの観点でも問題になりうる • 例えば⾮同期に他のAPIをコールしてデータを取得してコンテンツを⽣成する場合にローディング中 の表⽰やスピナを表⽰することが多いがクローラーは最後まで待ってくれないケースが多い • 動的なOGP対応が難しい • Google以外のbot等ではJavaScriptを解釈して実⾏してくれないものもある
    ### [SPAの課題 • SEO周りが課題になりがち • HTMLがリクエストされてもJSがロードされて処理が実⾏されるまでは真っ⽩。ここ⼤事。 • 検索エンジンのクローラーが仮にJavaScriptを解釈しないものだと真っ⽩な⼀枚の何もな いものを受け取るだけ • 最近ではGoogleのクローラー（Googlebot）はJavaScriptの解釈と実⾏も可能](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_13.jpg)
4.  2回⽬以降はSPAと同様 • ReactだとNext.js、VueだとNuxt.jsあたりが著名 • SPAで課題になったクローラーによるアクセスであっても正しいコ ンテンツを返せるようになる • 動的なOGPの問題について同様 ①リクエスト ④HTML/JS/CSS ②APIリクエスト ③JSON ⑤APIリクエスト ⑥JSON Node.jsサーバ バックエンドAPI
    ### [Server Side Rendering (SSR) • 端的に⾔うと初回のHTMLをサーバ側でレンダリング • ⾔葉とおりレンダリングのためのサーバを⽤意して、必要に応じてAPIリ クエストを実⾏し、HTMLをレンダリング •](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_15.jpg)
5.  • キャパシティ不⾜になってしまうとレスポンスが返せなくなることがあり、 そうなるとブラウザ上では画⾯が真っ⽩に
    ### [SSRの課題 • やはりサーバが必要になってくること • サーバが必要になるため、それに伴うインフラ的な課題が⽣まれ てくる • CPU負荷⾼くなりがち • さばけるリクエスト量が少なくなりがち](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_16.jpg)
6.  • 動的な部分がないためセキュアになる • 配信もシンプルになりWebサーバだけで可能。スケールも容易 • 各種ホスティングサービスも利⽤可能。Amazon Simple Storage Service (S3)も • Gatsby、HugoなどのStatic Site Generatorを利⽤するだけでなく、 Next.jsやNuxt.jsでも可能 • JamstackもSSGが前提
    ### [Static Site Generation (SSG) • JSで構築されたページを事前にすべて静的なページとして⽣成 • 静的サイトとして配信可能 • 動的な処理がないためSSRと⽐べると軽量であり⾼速](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_18.jpg)
7.  当然ながら動的なコンテンツは処理できないためリアルタイム性 の⾼いコンテンツには利⽤できない
    ### [SSGの課題 • ビルドプロセスの整備が重要 • コンテンツの更新のたびに全体のビルドが必要となる • コンテンツの数が増えると時間かかる • CMSなんかで⼊稿されたらまるっと再ビルドが必要になる •](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_19.jpg)
8.  Static Regeneration Incremental Static Regeneration
    ### [Single Page Application Server Side Rendering Static Site Generation Incremental](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_20.jpg)
9.  たもの • Next.js 9.4から追加された機能 • SSRとSSGそれぞれの⾟みをある程度解消してくれる • ISRでは静的ページの事前ビルドをしつつ、キャッシュを有効活⽤しつつ、静的 ページの更新を⾃動的に⾏う • 動的に近いこともできるようになった • SSGのようにサイト全体をリビルドする必要がない • 次世代のStatic Site Generationと⾔っても過⾔ではない（⻄⾕談）
    ### [Incremental Static Regeneration (ISR) • リクエストに対して静的にビルドされたページを返しつつ、有効期限が 過ぎたら⾮同期で静的ページの再⽣成を⾏う • Cache Controlにおけるstale-while-revalidateと同様の考え⽅が適⽤され](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_21.jpg)
10.  </div> ); } export async function getStaticProps() { const date = new Date(); const current = date.toLocaleString() return { props: { current, }, revalidate: 10, }; }
    ### [シンプルなサンプル export default function Index({current}) { return ( <div> 現在時刻は{current}です。](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_22.jpg)
11. 
    ### [シンプルなサンプル • SSGと同様にgetStaticProps()を利⽤ • Revalidateの指定により、指定したインターバルでビルドし直される • 動的ルーティングする場合はこれに加えてgetStaticPaths()で fallback: trueを指定する必要がある](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_23.jpg)
12.  キャッシュ 静的ページ再⽣成 (v2) & キャッシング更新 0 s 30 s 60 s 0 s 65 s Time キャッシュ(v2)
    ### [Incremental Static Regeneration revalidate: 60の場合 静的ページ⽣成(v1) & キャッシング キャッシュ 期限切れ](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_24.jpg)
13.  キャッシュ 静的ページ再⽣成 (v2) & キャッシング更新 0 s 30 s 60 s 0 s 65 s Time キャッシュ(v2)
    ### [Incremental Static Regeneration revalidate: 60の場合 静的ページ⽣成(v1) & キャッシング キャッシュ 期限切れ](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_25.jpg)
14.  キャッシュ 静的ページ再⽣成 (v2) & キャッシング更新 0 s 30 s 60 s 0 s 65 s Time キャッシュ(v2)
    ### [Incremental Static Regeneration revalidate: 60の場合 静的ページ⽣成(v1) & キャッシング キャッシュ 期限切れ](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_26.jpg)
15.  キャッシュ 静的ページ再⽣成 (v2) & キャッシング更新 0 s 30 s 60 s 0 s 65 s Time キャッシュ(v2)
    ### [Incremental Static Regeneration revalidate: 60の場合 静的ページ⽣成(v1) & キャッシング キャッシュ 期限切れ](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_27.jpg)
16.  キャッシュ 静的ページ再⽣成 (v2) & キャッシング更新 0 s 30 s 60 s 0 s 65 s Time キャッシュ(v2)
    ### [Incremental Static Regeneration revalidate: 60の場合 静的ページ⽣成(v1) & キャッシング キャッシュ 期限切れ](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_28.jpg)
17.  キャッシュ 静的ページ再⽣成 (v2) & キャッシング更新 0 s 30 s 60 s 0 s 65 s Time キャッシュ(v2)
    ### [Incremental Static Regeneration revalidate: 60の場合 静的ページ⽣成(v1) & キャッシング キャッシュ 期限切れ](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_29.jpg)
18.  Elastic Container Service (Amazon ECS)
    ### [Containers Amazon Elastic Kubernetes Service (Amazon EKS) AWS Fargate Amazon](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_34.jpg)
19.  つまり、通常のWebアプリケーションと同じ • Pros • ⼀番わかりやすい（≠ 楽） • 従来型の構成を再現しやすい • コンテナならではのポータビリティ、柔軟性、軽量なことによる起動と開発プロ セスの⾼速化 • Cons • EC2よりはマシとはいえ、DockerfileやTask Difinition、Podといったコンテナ環境 の定義を運⽤管理していくのは⼿間 • ランタイムの管理が必要 • AWSやインフラよりの知識がアプリケーション開発者に求められる • キャッシュが分散し、反映にタイムラグなどが発⽣する
    ### [コンテナの利⽤ • FargateでもECSでもEKSでもk8s on EC2でもOK • ISRはnext startをサポートしているのでNode.jsをセットアップしたコン テナとWebサーバとなるコンテナがあれば動く •](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_35.jpg)
20.  コンテナサービス各種で必要となるDockerfile以外の定義ファイルたちが不要 • デプロイパイプラインまで⽤意してくれる • AWS Lambdaと異なりコールドスタートがない • 最⼩インスタンス数が1 • インフラ知識不要 • VPCとかLBはもちろんオートスケーリングとかも意識しなくていい、⼀応 • Cons • 最⼩インスタンス数が1なので完全にゼロスタートはできない? • ただ、課⾦は考慮される • VPC内のリソースにアクセスできない (2021年9⽉30⽇時点) • Amazon Relational Database Service (Amazon RDS)とかAmazon Elastic File System (Amazon EFS)が使えない • 当然ながら各AWSサービス単位での細かいチューニングは難しい • キャッシュの問題などコンテナで運⽤する場合と同じ問題がある
    ### [AWS App Runner • コンテナベースで作られたWebアプリのフルマネージドサービス • 簡単、⼿軽に、⼤規模なWebシステムのビルドとデプロイが可能 • Pros •](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_38.jpg)
21.  revalidateもコンテナごとにバラバラ • ロードバランサによるリクエストの転送先とrevalidateのタイミン グ次第ではなかなか更新されないといった状況が発⽣しうる • 極端な例として、revalidateの時刻に達していないコンテナにばかりリクエ ストが転送されてしまった場合
    ### [キャッシュの問題とは • ISRでは仕組み上、サーバ内部でキャッシュが保持される • つまり、コンテナごと、インスタンスごとに別のファイルになる • ロードバランサからはどのインスタンスにいくかわからない • 最初の⽣成が⾏われるタイミングがバラバラ •](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_40.jpg)
22.  • AWS Lambdaの場合、1リクエスト（＝イベント）に対して1インスタンス （＝コンテナ）が対応 • 同時にリクエストが来た場合もそれぞれ別のインスタンスが対応するため、 リクエストが集中してサーバに処理が集中してCPU負荷が⾼まった結果ク ライアントにレスポンスが返せなくなるみたいなことが発⽣しない • しかし、AWS Lambdaで実装を頑張るのは現実的ではない • ISRは仕組み上内部でキャッシュが保持されるため、AWS Lambdaの関数 モデルで実現するのは難しい
    ### [サーバーレスを利⽤することの意味 • AWS Lambda等のサーバーレスなサービスを使うことによるメ リット • コンテナとかインフラそのものの管理をしなくていい • CPU負荷が⾼くなりがちな点とスケーラビリティ上の難点を解決してくれ る](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_43.jpg)
23.  Next.jsをサーバーレスで実⾏可能にする • Lambda@Edgeで実現 • 静的なアセットや静的ファイルとして⽣成されたものはS3でホスティングするよ うにデプロイした上でCloudFrontを使って配信される • Lambda@EdgeでルーティングやSSG、SSRのハンドリングといったことを⾃前で 実装するのはコストが⾼い • Zero configurationを謳っており、SSGやSSRはAPIで⾃動判別して対応 • Image Optimizationにも対応 • ISRにも対応 • Lambda@Edgeで静的ページへのリクエストをハンドリングしてSSRし ないリクエストはS3へとフォワード • Dynamic Routingもサポート
    ### [Serverless Next.js Component • AWSを始めとするサーバーレス環境のデプロイやプロビジョニングツー ルであるServerless Frameworkの関連機能であるServerless Component の⼀つ •](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_44.jpg)
24.  Pages API (/api/*) /_next /static /public /static-pages Amazon CloudFront Amazon S3
    ### [Serverless Next.js Component Build成果物（_next/*） User Assets (/static/*) SSR and Static](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_45.jpg)
25.  • 将来の値であればcache-controlヘッダを適⽤しエッジに保存 • 過去の値であればページの再⽣成をトリガー。同時に既存ページをno- cacheで返す • 再⽣成のためにSQSのFIFO キューにメッセージをpublishし、 Lambda関数で⾮同期に⽣成
    ### [Serverless Next.js Component • Origin ResponseでISRのページかどうかをチェック • Expiresヘッダがあるか、revalidateプロパティがあるか • Expiresヘッダーをチェック](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_46.jpg)
26.  GitにPushしたらビルドが実⾏されてデプロイされるというフローを簡単 に実装できる • SPAやSSG/Jamstackに向いている • Next.jsをサポート • 2021年5⽉にNext.js 9のSSRをサポート、7⽉に10/11に対応 • SSRだけでなくIncremental Static Regenerationに対応 • Image Optimization(next/image)とScript Optimization (next/script)も対応 • Serverless Next.js Componentをベースにしている模様 • 現状では⼀番簡単だと思う（⻄⾕談）
    ### [AWS Amplify Console • Library、CLI等からなるAWS Amplify のサービス群の1つ • 元来は静的サイトのデプロイパイプラインとホスティングが守備範囲 •](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_49.jpg)
27.  • 実装の簡単さではAWS Amplify ConsoleとAWS App Runner • Serverless Next.js Component • 結論として、AWSでISRを実現するには現状ではAWS Amplify Console or Serverless Next.js Component • 個⼈的にはAWS Amplify Console⼀択だがAWS WAFを使いたい場合などは Serverless Next.js Componentもあり • コンテナでの実装はキャッシュの問題があって現実的に使い物にならないのでは
    ### [Wrap up • AWSでISRを実現する⼿段は複数ある • EC2からサーバーレスまで • EC2やコンテナなどで実現する場合はキャッシュの問題がある • 特にスケールする場合に問題になる](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_50.jpg)
28.  Cache ControlをサポートするCDNであれば実は同じようなことが できる • Next.js側ではISRをせずとも通常のSSRでよくなる • そもそもNext.jsとかSSRとか関係なくなるという期待 • しかし、AWSのCDNであるCloudFrontは現状ではstale-while- revalidateには対応していない（stale-if-errorには対応している）
    ### [stale-while-revalidate • キャッシュコントロールの⼀種 • ブラウザやCDNにおけるキャッシュにおいて、⼀定期間はキャッシュから レスポンスするが指定時間を経過したら⾮同期でオリジナルをfetchして キャッシュをレスポンス/更新する • ISR以外にもデータ取得にフォーカスしたSWRというライブラリもある •](https://files.speakerdeck.com/presentations/2e1fb4fc22e34aa8bdd0a49e2d0e9ae8/slide_52.jpg)