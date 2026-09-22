---
タグ: []
作成日時: 2023-04-23T03:59:00
URL: https://speakerdeck.com/1coin/freeehui-ji-tenomodule-federationniyorumaikurohurontoentonoshi-jian
Tags: [topic/デザインシステム/配信基盤]
---
![[slide_0 16.jpg]]

## Transcript

1.  
freee会計でのModule Federationによるマイクロフロントエンドの実践ichien2023年4⽉16⽇
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_0.jpg)
2.  
ここに円に切り抜いた画像を入れてくださいichien2021年にfreeeに⼊社。中部オフィスに所属。freee会計の会計事務所向けの新機能開発をやりつつ、地⽅オフィスでの働き⽅アップデート活動も⾏っている。趣味は散歩。Webアプリケーションエンジニア
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_1.jpg)
3.  
アジェンダ● 背景編○ なぜwebpack v5のModule Federationを採⽤に⾄ったのか● 実践編○ どうやって実現したのか
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_2.jpg)
4.  
● メイン技術は、React/JavaScript/FlowType/Flux● バンドラーはwebpack● Multi Page Application. 画⾯ごとのentryファイル数は250以上.● ⼤規模フロントコードをwebpackでbuild. 画⾯共通のvendor.jsが誕⽣している.● Railsベースで10年メンテナンスしている.freee会計のフロントエンド技術構成※ 関連する「会計フロントエンドのTypeScript化」セッションがあります。ぜひ参加してみてください！
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_3.jpg)
5.  
作ったもの：freee会計の「仕訳の⼀覧‧登録」
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_4.jpg)
6.  
開発で成し遂げたいこと● インストール型ソフトに匹敵する操作体験をwebで作り出す○ キーボードのみでの⾼速な移動操作○ APIデータのキャッシュ、楽観的UIを駆使した快適なインタラクション● 未知なる要件を試⾏錯誤できる環境の構築○ 簿記知識を必須としないfreee会計で、税理⼠さん向けの仕訳形式による取引登録機能は、未踏領域への挑戦
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_5.jpg)
7.  
● 課題● 開発をフィードバックループを⼩さく‧たくさん回しながら始めていきたい.● しかし、freee会計が⼤規模すぎてつらい● 理想○ コードベース/デプロイフローを分離することで、⼤きいものを分割して扱いやすくしたい課題と理想、そしてマイクロサービスのアプローチを適⽤できないか👇マイクロフロントエンド● 課題● ⼊⼒操作にインタラクションが⾮常に多いため、FEの状態管理が複雑になるのは確実● 理想○ 要件にあったモダンなFE技術選定を⾃分達でしたい (data fetching library, TypeScriptなど)
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_6.jpg)
8.  
マイクロフロントエンドで考えたこと● 分割：分離する境界を決める● 結合：分離したものを1つのプロダクトで動かすにはどうするか
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_7.jpg)
9.  
マイクロフロントエンドについて分割● ⽔平分割/垂直分割○ 画⾯単位から新規作成するため、垂直分割を選択※ https://lucamezzalira.medium.com/micro-frontends-decisions-framework-ebcd22256513
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_8.jpg)
10.  
マイクロフロントエンドについて結合● 検討したのは2パターン○ コード/デプロイフロー分離が⽬的なので、client sideを選択合成パターン 説明client side ブラウザでHTML/CSS/JSを⽤いてランタイムでレンダリングbuild time JS/CSSなどのassets build時にソースコード結合
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_9.jpg)
11.  
client sideでの合成⽅法を検討● 検討した2案○ webComponents○ webpack5 Module Federation
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_10.jpg)
12.  
Module federationとは● webpack5の新機能で、JavaScriptアプリ(host)は別のアプリ(remote)からコードを動的にロードできる機構を提供● これにより、マイクロフロントエンドが実現しやすい● 共通の依存ライブラリのロード制御もでき、1つのwebpackのビルドであるかのように振る舞える● マイクロフロントエンドのオーケストレーションツールと理解 (個⼈の意⾒)https://module-federation.github.io/ よりhttps://github.com/module-federation より
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_11.jpg)
13.  
client sideでの合成⽅法を検討● 検討した2案○ webComponents○ webpack5 Module Federation● 採⽤理由 (2021/12時点)○ webpack5の新featureで試してみたかった.（当時はもっと話題になると思ってた.）○ Reactの書き味はそのまま。webpack pluginがいい感じにしてくれるので、実践コストは低い○ 依存ライブラリの共有が可能で、ファイルダウンロードのコスト増を防げる採用！
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_12.jpg)
14.  
図解Container Component (host)Content Component (remote)
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_13.jpg)
15.  
CDN図解remoteEntry.js ContentComponentremote: Contenthost: freee会計ContainerComponent1. entryファイルをfetch0. build & upload2. 取得したentryファイルから、conent Componentの場所をwebpackが⾃動解決してfetch & render
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_14.jpg)
16.  
0. build & upload ：webpack.conﬁgの設定host remote● ModuleFederationPluginを利⽤
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_15.jpg)
17.  
0. build & upload ：webpack.conﬁgの設定● build成果物を動作環境ごとのCDNにアップロード● 動作環境○ integration：統合○ staging：ステージング○ production：本番動作環境 ファイル名integration /assets/{integration_name}/remoteEntry.js/assets/{integration_name}/[name].[contenthash].jsstagingproduction/assets/staging-remoteEntry.js/assets/remoteEntry.js/assets/[name].[contenthash].js
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_16.jpg)
18.  
● CDN起点で動作環境ごとに分離したremoteEntry.jsを取得するhook● host側はremoteのasset置き場を実⾏時に判断します。これにより、remote側はCDNにアップロードだけすればコード変更が可能になります。1&2. fetch & renderhost
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_17.jpg)
19.  
動作イメージ
[View Slide](https://files.speakerdeck.com/presentations/7bdb84a4b6f54b9ba863625fba6e86e1/slide_18.jpg)
20. 
運⽤して⾒えてきた課題● リポジトリ分離の結果、freee会計本体の課題感理解やカイゼンに対する関⼼が⾼まりづらい● turbopack, rspackといった、より⾼速なバンドラーの登場○ rspackはサポートを表明しているが、今後の動向を注視する必要がある○ webComponents化も選択肢に戻ってくる○ 会計の技術構成次第で、build time合成になる可能性も捨てきれない
21. 
参考情報マイクロフロントエンド● https://martinfowler.com/articles/micro-frontends.html● https://micro-frontends.org/● O'Reilly Japan - マイクロフロントエンドmodule federation● Webpack 5 Module Federation: A game-changer in JavaScriptarchitecture● Module Federation · GitHub● dynamic System Host - 実装時、参考にしたexample○ https://github.com/module-federation/utilities/tree/main/runtime/importRemote