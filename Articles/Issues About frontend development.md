---

Tags: [topic/組織/キャリア]
---
![](https://d1eu30co0ohy4w.cloudfront.net/assets/mark-white-8d908558fe78e8efc8118c6fe9b9b1a9846b182c503bdc6902f97df4ddc9f3af.svg)

### Issues About frontend development

[Arakaki Yuji](https://speakerdeck.com/ug)

![](https://secure.gravatar.com/avatar/922f51d458d6ffee8578b9d3ab0a52b6?s=47)

June 21, 2020

[Programming
](https://speakerdeck.com/c/programming)

[0](https://speakerdeck.com/signin?return_to=%2Fug%2Fissues-about-frontend-development)

670

# Issues About frontend development

![](https://secure.gravatar.com/avatar/922f51d458d6ffee8578b9d3ab0a52b6?s=128)

### [Arakaki Yuji](https://speakerdeck.com/ug)

June 21, 2020

**Transcript**
1. [**フロントエンド開発にお ける課題を問い直す 株式会社Payke 新垣 雄志(あらかき ゆうじ)**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_0.jpg)
            
        
2. [**⾃⼰紹介 u 新垣 雄志(あらかき ゆうじ) u Twitter: @arakaji u 株式会社**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_1.jpg)
            Paykeに所属 u ソフトウェアエンジニア u フロントエンドエンジニアではないが、フロントエンドもやる u 過去実績 u Angular.jsで公共施設予約サイト管理画⾯ u Angular.jsで某エンジニア向けイベント情報サイト管理画⾯ u React.jsで求⼈サイトの管理画⾯開発 u Vue.jsでWebサイトの⼀部を動的に実装 u Ionic(angular/typescript)でモバイルアプリ開発
        
3. [**なぜ課題を問い直すのか u ⼀応Keynoteなので、フロントエンド開発のOverviewを提供したい u 他のセッションでより深堀りしていただければ u 技術というのは課題解決のためのソリューション u この技術が流⾏っているから学ぶのではなく、なぜ流⾏っているか知りたい u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_2.jpg)
            流⾏っている理由には、課題がある。 u 課題→ソリューションとして技術を知ることで、今の⾃分にとって学ぶ技術が⾒え れば良い
        
4. [**課題の定義 u 1. 与える、または、与えられる題⽬ u 2. 解決しなければならない問題 u 解決しなければならない問題とは︖ u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_3.jpg)
            進みたい⽅向に進みたい速度が進みたいが、それが出来ない障害があるので解決し ないといけない u その障害が、課題 u 課題を知るには、進みたい⽅向を知る必要がある。 u 進みたい⽅向 = ⽬的
        
5. [**フロントエンド開発の⽬的は ユーザーに良いUXを届けること u フロントエンド = UI(User Interface) u ユーザーとの接点 u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_4.jpg)
            ユーザー体験 = UX(User Experience) u ユーザーはUIを通してシステムを利⽤し、問題を解決したい u フロントエンド(UI)は、その問題解決をより良い体験として提供することが⽬的 u 問題は解決できても、悪い体験になってはいけない u 使いづらい u バグる u どの使うかわからない u 使えるが、気分がよくない u Etc…
        
6. [**良いUXとは︖ UXハニカム UXの評価指標の⼀つ。UX評価軸を6つに分けて5段階で評価し、その 総合点でUXを評価する⼿法 1. Useful – 役に⽴つ 2. Desirable**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_5.jpg)
            – 好ましい 3. Accessible – アクセスしやすい 4. Credible – 信頼できる 5. Findable – 探しやすい 6. Usable – 使いやすい from: https://blog.btrax.com/jp/ux-evaluation/
        
7. [**UXを⾼めるために発⽣する課題とは︖ u 正解がわからない u そもそもUXをどうやったらUXが⾼まるのかという共通の解はない u プロダクトの性質、ユーザー層、市場の動向や環境などで変わる。 u マルチデバイス対応 u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_6.jpg)
            10数年前まではPCでのWeb利⽤だけを対応していればよかった u いまはスマホ、タブレット、Watchなどもある u さらにこれらの各OSへの対応をどうするか u ユーザーの期待値の増加 u スマホの普及によってソフトウェアの利⽤が⾝近に u かつ⼀般的に利⽤するのが世界トップレベルの洗練されたプロダクト u Instagram, Tiktok, Netflixなど u これらがユーザーのアプリのUXに対する期待値を増加させた
        
8. [**正解が分からないという課題にどう⽴ち 向かうか︖ u 基本的には、早く⼩さく作ってリリースし、フィードバックを得て、その フィードバックをもとに改善していくしかない u アジャイル u アジャイルはみんなやっている、やること⾃体が競争優位性にはならない。 u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_7.jpg)
            競争⼒となるのは試⾏回数とその精度 u 課題︓ u 単位時間あたりの試⾏回数を増やせるか︖ u データドリブンな意思決定をどれだけうまく⾏えるか︖
        
9. [**単位時間あたりの試⾏回数を増やすに は︖ u 限られた⼈数での開発効率を上げる u コード量が増えても開発効率を落とさないようにできるか u ⼈数が増えても開発効率を落とさないようにできるか**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_8.jpg)
            
        
10. [**データドリブンな意思決定を⾏うには u ユーザーの利⽤動向に関するデータ収集 u データの可視化**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_9.jpg)
            
        
        
        
11. [**単位時間あたりの試⾏回数を増やすこと にどうFirebaseが貢献するのか︖ u 限られた⼈数で開発効率を上げる、コード量と開発⼈数がふえても開発効率を 落とさないのが重要 u それらを解決する最⼤の⽅法 u 「⾃分たちで作らないことを増やすこと」 u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_11.jpg)
            開発しないで要件を満たせるなら、他の開発にリソースを当てられ開発効率が上が る u コードが少なくて良いので開発効率は落ちない u 開発⼈数が増えることによる開発効率の低下は主にコミュケーションの問題 u 既存のサービスを利⽤することで、そのサービスのドキュメントを読めば仕様を把握でき るのでコミュケーションコストが増えない
        
12. [**Firebase Authentication u Firebaseが提供するユーザー認証のサービス u ログイン/ログアウトなど u 利⽤すると u ユーザー認証を作らなくてよくなる。**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_12.jpg)
            u セキュリティ対応やバグ対応なども不要になる u メンテナンスコストも最⼩ u トレードオフももちろんある u できることしかできない。 u 何が出来ないのか事前に把握しておく必要はある。 u サービス停⽌の可能性とその時の対応⽅法を考慮しておく
        
13. [**Cloud Firestore u GCPにホストされたNoSQLデータベース u iOS、Android、WebのクライアントからSDK経由で直接DBにアクセスできる u 単純なRead/Write/Update/Deleteなコードのためにサーバーサイド開発をする必要 を無くせる可能性 u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_13.jpg)
            その他の強⼒な機能 u リアルタイムアップデート u オフラインサポート u スケーラビリティ u WebAPIやインフラ運⽤などの多くを「作らないモノ」に⼊れられる u いままでとメンタルモデルが違うため、どういうリスクがあるのかの事前調査は必 要
        
14. [**データドリブンな意思決定にFirebaseが いかに貢献するか u 開発効率をいかに⾼めてもそれがユーザーの体験価値向上につながっているの か、また今提供しているプロダクトのどこが体験価値を毀損しているのかを正 しく把握することが必要 u そのためには以下が必要 u ユーザーの利⽤動向をデータとして正しく取る**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_14.jpg)
            u 取得したデータを可視化する u この基盤を0から作るのは⾮常に困難だが、Firebaseは無料で提供してくれて いる u Google Analytics
        
15. [**Google Analytics u SDKを⼊れることでユーザーの属性や⾏動をトラッキングすることが可能 u iOS、Android、Webに対応 u どの画⾯を開いたか、どのボタンを押したかもカスタムイベントを⾶ばすよう にプログラムを書くことでトラッキング可能 u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_15.jpg)
            それらすべてのデータがWeb上のダッシュボードを⾒ることができる。 u 他にも類似サービスはあるが、無料であることやその他のサービス(クラッ シュレポートやパフォーマンス監視)があることを総合するとデフォルトの選 択視としては⼗分すぎる u すべてのフロントエンド開発者がマスターすべきというわけではないが、チームに おいて⼀⼈は使いこなせる⼈がいないとデータ分析をする上で⼤きなハンディ キャップになる
        
        
        
16. [**マルチデバイスへの対応 単純化するために以下を対象とする。 u Android端末 u iOS端末 u Web このときに考えるべきは、「各プラットフォームでどれだけコードを共有する か」**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_17.jpg)
            u すべてのOS⽤にそれぞれアプリを書くとその分開発リソースは増える u しかし共通化すると違う問題を抱える u コードの複雑性 u プラットフォームの機能をどう使うか u 利⽤ツールの継続性
        
17. [**Flutter、iOSとAndroidコード共通化の解 のひとつ u FlutterはGoogleが提供するiOSとAndroidアプリをDartという⾔語で書けるツー ル u UIとビジネスロジックを両⽅で共通化 u ネイティブの機能はPlugin u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_18.jpg)
            ネイティブのコードを直接書く必要があり u 他にも以下の様な選択肢 u Xamarin u React Native u Ionic(cordova)
        
18. [**ユーザーの期待値増加に⽴ち向かう⼿段 としてのSPA u スマホネイティブアプリの普及によってそれに相当するUXをWebでも実現する ための⼿段 u SPA u それによって以下の問題も発⽣ u**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_19.jpg)
            JS担当範囲増加によるプログラムの複雑性 u 初回表⽰のパフォーマンス悪化とGoogleインデックス遅い問題
        
19. [**プログラムの複雑性増加 u 画⾯描画処理の複雑性とパフォーマンス改善 u React.js、Vue.js、Angular(js) u 不具合発⽣率を⾔語レベルで減らす u Typescript**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_20.jpg)
            
        
20. [**初回表⽰パフォーマンス悪化とGoogleイ ンデックス遅い問題 u サーバーからのレスポンスが早くてもJSを実⾏しないとコンテンツがわからな い u ユーザーが使えるまでに時間がかかる u GoogleクローラーがきてもJS実⾏をするためのキュー待ちのため、インデックスさ れるのが遅くなる**](https://files.speakerdeck.com/presentations/7a7ffa3a9567417ba2e44f2d7ae02afa/slide_21.jpg)
            u Newsサイトなどには致命的 u この対応策としてのSSR u コレをフレームワークして提供したのがVue.jsのNuxt.jsであり、React.jsのNext.js u AngularにはAngular UniversalというものがありSSRを提供