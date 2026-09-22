---
Created: 2021-01-15T20:35:00
URL: https://www.slideshare.net/NaoshiHoshi/backendsforfrontends
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
組織の問題も解決するアーキテクチャ BackendsForFrontends

![](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-1-638.jpg?cb=1540265997)

Upcoming SlideShare

Loading in …5

×

1

1 of 35

Embed

Size (px)

Start on

Show related SlideShares at end

WordPress Shortcode

Link

1,837 views

Published on

PIXTAは2007年にサービスを開始し、年々サービスとシステムの規模が大きくなっおり、それに伴い、組織的な規模も大きくなってきました。
今回はPIXTAにおいて規模が大きくなるシステムと組織をつなぐためのアーキテクチャとしてBackendForFrontend(以下BFF)の導入検討を始めているので、BFFの概要やユースケースを紹介し、ピクスタが抱える問題をどのように解決するかについて、まとめた資料です。
BFFは世の中にで初めてから日が浅く、そこまで認知が行き渡ってないのではないかと思うので、今回話のメインはBFFそのものに焦点を当てて紹介します。
この内容はWeb現場Meetup#4の発表資料です。

Published in:
                [Engineering](https://www.slideshare.net/featured/category/engineering)

[Syuichi Tsuji
                            
                              
                                , 
                                フリーランス
                              
                              
                                 at 
                                WebSite制作
                              
                            

                            

                            
                              9 months ago
                            
                          ](https://www.slideshare.net/syuichitsuji?utm_campaign=profiletracking&utm_medium=sssite&utm_source=ssslideshow)

![](https://cdn.slidesharecdn.com/profile-photo-syuichitsuji-48x48.jpg)

No Downloads

**Views**

Total views

1,837

On SlideShare

0

From Embeds

0

Number of Embeds

361

**Actions**

Shares

0

Downloads

6

Comments

1

Likes

1

No notes for slide


1. 
      1.
    組織の問題も解決する
BackendsForFrontends
PIXTA株式会社　星直史
16545027 Photo by Fast&Slow
 
  
2. [
        2.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-2-638.jpg?cb=1540265997)
    自己紹介
2018年1月より開発部の部長に就任。
エンジニアの採用、育成、組織作りに取り組んでいる。
星直史
@NaoshiHoshi
 
  
3. [
        3.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-3-638.jpg?cb=1540265997)
    ピクスタのご紹介
 
  
4. [
        4.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-4-638.jpg?cb=1540265997)
    PIXTAのご紹介
 
  
5. [
        5.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-5-638.jpg?cb=1540265997)
    fotowa のご紹介
 
  
6. [
        6.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-6-638.jpg?cb=1540265997)
    Snapmart のご紹介
 
  
7. [
        7.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-7-638.jpg?cb=1540265997)
    ● BFFの概要
● BFFが必要になった背景
● 代表的な5つのユースケース
今日話すこと
BackendsForFrontends
ピクスタの今後の構想
 
  
8. [
        8.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-8-638.jpg?cb=1540265997)
    ● BFFの概要
● BFFが必要になった背景
● 代表的な5つのユースケース
今日話すこと
BackendsForFrontends
ピクスタの今後の構想
 
  
9. [
        9.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-9-638.jpg?cb=1540265997)
    BFFの概要
クライアントとバックエンドの中間に位置するサーバーを置く
アーキテクチャを指す
● メリット
○ APIサーバーの処理結果を元にUI構築を補助 (性能面)
○ フロントエンドとバックエンドに境界を設け、レイヤーを分割することで
独立して開発を進めることができる (組織面)
 
  
10. [
        10.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-10-638.jpg?cb=1540265997)
    ● BFFの概要
● BFFが必要になった背景
● 代表的な5つのユースケース
今日話すこと
BackendsForFrontends
ピクスタの今後の構想
 
  
11. [
        11.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-11-638.jpg?cb=1540265997)
    BFFが必要となった背景
● モノリシックWebアプリケーション
● APIサーバー
● マイクロサービス
● BFFの台頭
 
  
12. [
        12.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-12-638.jpg?cb=1540265997)
    モノリシックWebアプリケーション
BFFが必要となった背景
● DBとのやりとりからHTMLの構築までを一つのサーバーで行う
● 日々改善改修を繰り返すことでコードが肥大化し、運用や修正に苦しむケースも有る
 
  
13. [
        13.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-13-638.jpg?cb=1540265997)
    APIサーバー
● Ajax通信の浸透
● スマホの急激な普及に伴うネイティブアプリ開発
● Webブラウザ向けの処理とネイティブアプリ向けの処理を並行して開発しなければならない
BFFが必要となった背景
 
  
14. [
        14.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-14-638.jpg?cb=1540265997)
    APIサーバー
● フロントエンドとバックエンドを切り離す動きが活発化
○ モノリシックなWebアプリからフロントエンドを分離さえ、バックエンドを API化
BFFが必要となった背景
 
  
15. [
        15.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-15-638.jpg?cb=1540265997)
    マイクロサービス
● プログラムの修正範囲を限定的にする
● リリースまでのワークフローの時間短縮 (自動テスト、ビルド、デプロイ )
● 言語やフレームワークなどの技術選定を柔軟に行える
● サービスや組織のスケール化
BFFが必要となった背景
 
  
16. [
        16.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-16-638.jpg?cb=1540265997)
    BFFの台頭
● クライアントの増加による要求内容の差異
○ PC、スマホ、タブレット、 TV、ゲーム機...
● HTTP/1.1における同時リクエスト制限
BFFが必要となった背景
 
  
17. [
        17.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-17-638.jpg?cb=1540265997)
    ● BFFの概要
● BFFが必要になった背景
● 代表的な5つのユースケース
今日話すこと
BackendsForFrontends
ピクスタの今後の構想
 
  
18. [
        18.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-18-638.jpg?cb=1540265997)
    代表的なユースケース
● API Gateway
○ GraphQL
● Server Side Rendering(SSR)
○ Next.js
● セッション管理
● ファイルアップロード
● WebSocket
 
  
19. [
        19.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-19-638.jpg?cb=1540265997)
    API Gateway
代表的なユースケース
フロントエンドからバックエンドへ APIリクエストをする際の受け口となる。
複数のAPIリクエストに対して中継点を置く事で、複数のAPIの結果を集約させることや、APIをクライアント用に加工す
ることが容易になる。
● API の結果を一つに集約する Aggregation の役割
● API の結果をクライアント用に翻訳する Translation の役割
● 毎回呼び出す必要がない API の結果をキャッシュしておく Cache の役割
● API の結果から一部の情報をフィルタし、データサイズを圧縮させる Filter の役割
 
  
20. [
        20.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-20-638.jpg?cb=1540265997)
    GraphQL
API向けのクエリ言語。
GraphQLの定義に従ってクエリを書くと、サーバーと通信結果をJSONにして返却。
● 一覧系のリソースのページネーションをもっとシンプルに行えるようにしたい
● API リクエストのパラメーターを型安全に扱えるようにしたい
● API の実装コードからドキュメントを生成したい
● クライアントコードを自動生成したい
代表的なユースケース
http://localhost:4000/graphql
 
  
21. [
        21.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-21-638.jpg?cb=1540265997)
    Server Side Rendering(SSR)
(元々ブラウザ上でしか動かなかった )JavaScriptをサーバー内部で実行して、 HTMLを生成すること
● Client Side Rendering(CSR)
○ ページ内のHTMLのうち、変更が必要な部分だけ JSで差し替え
○ 懸念
■ SEO対策
■ 初期表示の遅さ
代表的なユースケース
 
  
22. [
        22.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-22-638.jpg?cb=1540265997)
    Server Side Rendering(SSR)
via. Web Application 2018 From Performance Perspective / Yousuke Furukawa
代表的なユースケース
 
  
23. [
        23.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-23-638.jpg?cb=1540265997)
    Server Side Rendering(SSR)
via. Web Application 2018 From Performance Perspective / Yousuke Furukawa
代表的なユースケース
 
  
24. [
        24.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-24-638.jpg?cb=1540265997)
    Next.js
Next.js とは SSR する Universal な Web アプリケーションのためのフレームワーク
1. 導入が容易
2. 開発環境 (Babel/Webpack 等) を設定する必要がない
3. ディレクトリ構造がルーティングとして扱われる
代表的なユースケース
 
  
25. [
        25.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-25-638.jpg?cb=1540265997)
    Next.js
Next.js を用いる事で SSR のデ メリットであるクライアントサイド処理とサーバーサイド処理の重複
実装を避けることが できる。CSR と SSR の良いところを取り、デメリットを軽減
• 初回アクセス時は SSR で表示
• ページ遷移は SPA として機能させる
• 上記は同一のスクリプトで実装されている
代表的なユースケース
 
  
26. [
        26.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-26-638.jpg?cb=1540265997)
    セッション管理
クライアントがサーバと通信する際のユーザーセッ ションをBFF に持たせることで、バックエンドの
API サーバーは状態を保持す る必要がなくなり、API の実装をシンプルにする
● Redis / memcachedで高速化
● APIの実装をシンプルに保つ
代表的なユースケース
 
  
27. [
        27.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-27-638.jpg?cb=1540265997)
    ファイルアップロード
送信されたファイルの格納を BFFが受け持つ。チャンク送信やエンコードの省略による効率化や、
APIの処理をシンプルに保つ
1. 大きなファイルをチャンクして格納
2. Base64エンコードを行わないため効率化が良い
3. APIはデータ格納時のPathを受け取るだけとなるため、処理をシンプルに保てる
代表的なユースケース
 
  
28. [
        28.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-28-638.jpg?cb=1540265997)
    WebSocket
BFFがWebSocketを受け付けるエンドポイントと、リアルタイムにデー タの交換する処理を受け持
つことで、APIサーバーの処理を「データを DBに記録する」ことに集中させる
代表的なユースケース
 
  
29. [
        29.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-29-638.jpg?cb=1540265997)
    WebSocket
チャットやSNSといった、ユーザー数 (トラフィック)が多くなるシステムの場合は BFF自体も冗長化
し、可用性を高める必要がある
代表的なユースケース
 
  
30. [
        30.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-30-638.jpg?cb=1540265997)
    ● 概要
● BFFが必要になった背景
● 代表的な5つのユースケース
今日話すこと
BackendsForFrontends
ピクスタの今後の構想
 
  
31. [
        31.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-31-638.jpg?cb=1540265997)
    ピクスタの今後の構想
 
  
32. [
        32.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-32-638.jpg?cb=1540265997)
    ピクスタの今後の構想
 
  
33. [
        33.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-33-638.jpg?cb=1540265997)
    ピクスタの今後の構想
● 各拠点に施策を考えるグロースチームが存在
○ グロースチームの関心ごとは SoE寄りの話が多い
● 各拠点は同じPIXTA事業でもフェーズが異なる
○ 日本以外では表示上のチューニングを行なっている最中
● 各拠点は共通のViewファイルを修正する
○ あるロケールの修正が他のロケールに影響
● 開発拠点は日本とベトナムにある
○ デザインガイドラインに沿っていない実装になる可能性
 
  
34. [
        34.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-34-638.jpg?cb=1540265997)
    ピクスタの今後の構想
● アーキテクチャを変更することにより、組織構造との整合性をとる
○ バックエンドをAPI化しViewの分離
○ Viewを各ロケール事に分ける
○ BFFを設置
 
  
35. [
        35.
      ](https://image.slidesharecdn.com/backendsforfrontends-181023032746/95/backendsforfrontends-35-638.jpg?cb=1540265997)
    才能をつなぎ、
世界をポジティブにする
We're hiring!
7336449 Photo by Sunny studio

[
        新卒入社のみなさまへ30代が贈る20代のキャリア戦略入門
      ](https://www.slideshare.net/NaoshiHoshi/3020-231257053)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/3020-231257053)[
        SnapmartにおけるCameraRollから写真の複数枚アップロードの実装
      ](https://www.slideshare.net/NaoshiHoshi/snapmartcameraroll)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/snapmartcameraroll)[
        マネージャーになってからの技術を磨く戦略と戦術
      ](https://www.slideshare.net/NaoshiHoshi/ss-227748316)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/ss-227748316)[
        Webエンジニアになるための戦略と戦術
      ](https://www.slideshare.net/NaoshiHoshi/web-162593646)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/web-162593646)[
        Reactnative はじめの一歩
      ](https://www.slideshare.net/NaoshiHoshi/reactnative-150371271)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/reactnative-150371271)[
        WebエンジニアのReactNativeでの戦い方
      ](https://www.slideshare.net/NaoshiHoshi/how-web-engineer-fight-in-the-reactnative-138559060)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/how-web-engineer-fight-in-the-reactnative-138559060)[
        ピクスタ株式会社 完全到着マニュアル
      ](https://www.slideshare.net/NaoshiHoshi/ss-130213993)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/ss-130213993)[
        How you can speed up serverless development by local
      ](https://www.slideshare.net/NaoshiHoshi/how-you-can-speed-up-serverless-development-by-local)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/how-you-can-speed-up-serverless-development-by-local)[
        サービスのスケール化のための検索システム改善
      ](https://www.slideshare.net/NaoshiHoshi/ss-81750748)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/ss-81750748)[
        スクラムを導入してみて一回挫折したけど再起させた話
      ](https://www.slideshare.net/NaoshiHoshi/ss-77789368)[PIXTA Inc.](https://www.slideshare.net/NaoshiHoshi/ss-77789368)

![](https://cdn.slidesharecdn.com/ss_thumbnails/careerstrategy-200402023529-thumbnail-2.jpg?cb=1585795041)

![](https://cdn.slidesharecdn.com/ss_thumbnails/cameraroll-200226105309-thumbnail-2.jpg?cb=1582714450)

![](https://cdn.slidesharecdn.com/ss_thumbnails/tipsforselfversionupfrombecamemanager-200212100917-thumbnail-2.jpg?cb=1581502246)

![](https://cdn.slidesharecdn.com/ss_thumbnails/strategiesandtacticstolifeofwebengineer-190809094824-thumbnail-2.jpg?cb=1565344181)

![](https://cdn.slidesharecdn.com/ss_thumbnails/reactnativethefirststep-190618105856-thumbnail-2.jpg?cb=1560856035)

![](https://cdn.slidesharecdn.com/ss_thumbnails/howwebengineerfightinthereactnative-190328135524-thumbnail-2.jpg?cb=1553781504)

![](https://cdn.slidesharecdn.com/ss_thumbnails/perfectarrivalmanualtopixta-190202013651-thumbnail-2.jpg?cb=1549071616)

![](https://cdn.slidesharecdn.com/ss_thumbnails/howyoucanspeedupserverlessdevelopmentbylocal-181129062522-thumbnail-2.jpg?cb=1543472824)

![](https://cdn.slidesharecdn.com/ss_thumbnails/random-171108103838-thumbnail-2.jpg?cb=1510184652)

![](https://cdn.slidesharecdn.com/ss_thumbnails/random-170712114500-thumbnail-2.jpg?cb=1499860102)