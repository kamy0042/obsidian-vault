---
URL: https://techblog.yahoo.co.jp/advent-calendar-2018/yahoo-frontend/
Updated: 2021-01-03T01:24:00
Created: 2021-01-03T00:41:00
Tags: [topic/技術/React, topic/技術/ビルドツール]
---
テクノロジー

2018.12.06

![](https://s.yimg.jp/images/tecblog/2018-2H/yahoo-frontend/frontend1.png)

[Yahoo! JAPAN Tech Advent Calendar 2018](https://qiita.com/advent-calendar/2018/yahoojapan-tech)の6日目を担当します、Webフロントエンドエンジニアをやっている向井[(@](https://twitter.com/__sakito__)[**sakito**](https://twitter.com/__sakito__)[)](https://twitter.com/__sakito__)です！

今回はヤフー株式会社でWebフロントエンドエンジニアがどのような取り組みを行なっているのかをお伝えします。

## ヤフーの組織体制

![](https://s.yimg.jp/images/tecblog/2018-2H/yahoo-frontend/5nESy5c009e8cdf812067c92199dc.png)

Webフロントエンドエンジニアの取り組みを紹介する前に、ヤフーがどのような組織体制なのか紹介します。組織図については[現在Web上](https://about.yahoo.co.jp/info/organization/)で閲覧できます。

冒頭画像のようにヤフーではカンパニー制度を取り入れており、それぞれのカンパニーにサービスを開発する事業本部があり、この事業本部単位でデザイナーやエンジニア、そのほかにもさまざまな職種の方が所属し、サービスごとで日々開発に取り組んでいます。そして、現在はサービス数が**100以上**存在し、エンジニア数は**約2600人**、デザイナーは**約400人**です。

この中で、Webフロントエンドに携わる人は各サービスに数人居るので、全社員で何人のWebフロントエンドエンジニアが所属しているとは正確に答えることができない規模になっています。

このように大規模な組織のため、各サービスごとに抱えてる課題や目標が異なるので、選定する技術も異なります。カンファレンスや勉強会で会えるWebフロントエンドエンジニアは、この中の一部分のみなので断片的なものになります、だからこそ今回はできるだけ弊社のWebフロントエンドについて、多くの情報を紹介したいのです。

## 各サービスにおけるWebフロントエンドの取り組み

ここからは、Webフロントエンドとして取り組んでいる一部サービスの方に、下記3つの観点で聞いた取り組みを紹介します。

- 使用している技術
- 採用した背景
- 最近挑戦したorしようと思ってるWebフロントエンド技術

## メディアカンパニー

## サービス：トップページのスマホWeb

開発メンバー：神野[(@miracletshirt09)](https://twitter.com/miracletshirt09)職種：エンジニア

### 使用している技術

・React + Redux・react-app-rewired・PWA

### 採用した背景

### react-app-rewired

- webpackやbabelが古かった。
- 1からwebpackなどを書くのではなく、react-app-rewiredの設定を拡張していくようにした。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### PWA

- 現在ホーム画面追加に対応した(Androidのみ)。
- Service Workerでのキャッシングなど今後は随時PWAに沿った実装を行う予定。

### TypeScript

- コードが大規模になり、改修頻度があがった。
- そこで、静的解析の力を借りて、開発スピードと品質を保ちたい。

## サービス：ワイキュー

開発メンバー：石井[(@kaidempa)](https://twitter.com/kaidempa)職種：エンジニア

### 使用している技術

- React + Redux
- TypeScript
- Redux-thunk
- Redux-first-router
- Storybook
- Jest
- styled-jsx(Sassを書けるようにプラグイン入れてる)
- Node.js

### 採用した背景

### React

- 他のサービスで2015年からReactをはじめて、良さを感じたのがそもそもの始まり。
- その知見があり、スピード感も早く作れるので、Reactではじめた。

### Redux-first-router

- 過去にreact-routerを使っててバージョン変更など辛かった。
- Reduxを使用する前提で作られているRouterが好ましかった。
- Reduxのある環境でルーティングがしやすい。
- URLを双方向バインディングできる。

### TypeScript

- 新規サービスなので、時代の流れ的にも挑戦したかった。

### styled-jsx

- デザイナーがHTML、CSS書く人よりだった。
- styled-componentsが一番良さそうだったが、JSよりな書き方が懸念だった。
- コンポーネントとCSSをセットに表現しやすかった。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### WebRTC

- 今後P2P通信が必要になってくる機運があるから。

## サービス：Yahoo!ニュース

開発メンバー：三浦[(@kohei_miura)](https://twitter.com/kohei_miura)職種：エンジニア

### 使用している技術

- React + Redux
- TypeScript
- PostCSS
- Jest
- Storybook

### 採用した背景

### React

- FaceBookOSSのライセンス問題が解消されて使いやすいタイミングだった。
- 他のメディアサービスでReactを使用している実績があった。

### TypeScriprt

- 周りの実績もあり、Flowは考えなかった。
- 規模が大きいので型の制約がほしかった。

### PostCSS

- デザイナーが書きやすいようにCSS-in-JSにはしなかった。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### Node.js

- 今現在のBFFを構成する言語はJava。
- SSRをしたいのでNode.jsに置き換えていく。
- JavaScriptの言語で一貫してBFFまで開発したい。

## GYAO!(株式会社GYAO!)

開発メンバー：浜田[(@narirow)](https://twitter.com/narirow)職種：エンジニア

### 使用している技術

- Web Components
- AMP

### 採用した背景

### WebComponents

- 部品単位で分割したかった。
- コンポーネント機能で再利用、拡張できるものがほしかった。
- 将来的にReactやVue.jsは使いたいが、現状機能を維持したまま段階的に移行したいので、まずはコンポーネント機能だけでよかった。
- Atomic Designでコンポーネントを分割しつつ、デザインシステムでデザインの指針を決めている。

### AMP

- 流入の拡大を目指して導入した。
- Chromeのportal機能やWeb Packagingの未来的導入を見据え、まずはAMPからはじめた。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### GraphQL

- 現在一部で挑戦中。
- フロント側の求めるAPIとバックエンドから提供するAPIの責任分離をしたかった。
- 4年~5年前からTypeScriptでBFFは開発されていた。
- BFFを更に疎結合にしたいのでGraphQLをいれた。

### React + TypeScript + PWA

- Web Packagingをフル活用したい。
- Webでスマホデザインの対応はできているので、キャッシュ管理などを駆使してパフォーマンスやUXを向上させていきたい。

## サービス：代理店向け広告入稿管理画面

開発メンバー：向井[(@](https://twitter.com/__sakito__)[**sakito**](https://twitter.com/__sakito__)[)](https://twitter.com/__sakito__)職種：エンジニア

### 使用している技術

- React + Redux
- Sass
- Redux-Form
- redux-thunk

### 採用した背景

### React

- 2016年の頭から開発をはじめ、当時AngularJSの次のSPAフレームワークとして注目を集めていた。
- まだ広告プロダクトで実績はなかったが一つの挑戦として始めた。

### Sass

- 他サービスのCSSからスタイルを移植できやすいようにSassにした。
- CSS-in-JSは当時まだ認識できるほど安定したフレームワークがなかった。

### Redux-Form

- 当時はFormのフレームワークとして1強状態だった。
- 自前でForm用のReducerやActionを作るのは手間だった。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### Emotion

- CSS-in-JSをしたい。
- 使うのが簡単で、いろんなことができる。
- GatsbyJSなどのOSSも取り入れ始めている。
- styled-componentsと同じstyled方式でスタイルを割り当てることもできる。

### TypeScript

- 大規模な開発で型がないのでリファクタリングなど現在進行中の開発が大変。
- コンポーネントのテストでpropsの有無のなどのテストは型定義で開発コードと密にしたい。

### Formik

- Redux-Formだとstoreを隠蔽しているので、Form状態の操作に苦労している。
- [React公式ドキュメント](https://reactjs.org/docs/forms.html#fully-fledged-solutions)にも紹介されており、筋が良さそう。
- Yupと組み合わせることでバリデーションも書きやすそう。

## コマースカンパニー

## サービス：Yahoo!ダイニング

開発メンバー：福本[(Facebook)](https://www.facebook.com/yasuhiro.fukumoto.9)職種：デザイナー

### 使用している技術

- Vue.js
- Vuex
- Vue CLI

### 採用した背景

### Vue.js

- デザイナーがメインで開発をする前提技術選定をした。
- CSSやHTMLのテンプレートがデザイナーにとって書きやすかった。
- 既存サービスからの移行でjQueryが使用できたり、CSSの移行コストの低さが必要だった。
- Yahoo!ダイニングサービスの他プロダクトで実績があった。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### E2Eテスト

- 品質の担保。
- 事前に事故を防ぐため。

## サービス：Yahoo!プレミアム

開発メンバー：小林[(@mp030)](https://twitter.com/mp030)職種：デザイナー

### 使用している技術

- Nuxt.js
- Jest
- Storybook

### 採用した背景

### Nuxt.js

- コマースカンパニーで一度Webフロントエンドメンバーにヒアリングを行った。
- Vue.jsの先行事例や知見が多かった。
- JavaScriptができるWebフロントエンド専任の人がいない。
- デザイナーが開発することが多いので、デザイナーライクなフレームワークだった。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### PWA

- 技術として挑戦したい。
- キャッシュなどを駆使してパフォーマンスを向上させたい。
- カンファレンスで刺激を受けた。

## サービス：Yahoo!ショッピングの検索部分

開発メンバー：平山[(@rhirayamaaan)](https://twitter.com/rhirayamaaan)、稲垣職種：両名ともにデザイナー

### 使用している技術

- Next.js(SSR込み)
- Redux
- Redux-saga
- TypeScript
- Node.js
- Sass
- Storybook
- Jest

### 採用した背景

### TypeScript

- 静的型づけで堅牢にかける。
- Javaエンジニアが多く、TypeScriptに入りやすかった。

### Next.js

- Vue.jsと比べた時にReactがTypeScriptとの相性がよかった。
- React+SSRしたかった。
- SSRを構築する学習コストがなかった。

### Redux-saga

- 非同期処理をsagaの思想内に切り出せる。
- テストがしやすい。

### CSSはSassでBEM記法

- 既存のスタイルがSassなのでそこから移行しやすいようにした。
- デザイナーもCSSが書けるようにしたかった。

### Storybook

- UIパーツ集をきちんと作って、共有できる状態にしたかった。
- デザインの統一性をUIで見られる。
- 再開発しないように見やすくしておく。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

- React hooksを使い始めた
- React hooksでrecomposeのメンテが止まるので捨てたかった

## テクノロジーグループ、システム統括本部

## サービス：社内エンジニアが使用するプラットフォームのUI開発

開発メンバー：狩野[(@nana4gonta)](https://twitter.com/nana4gonta)職種：エンジニア

### 使用している技術

- Angular
- angular-redux/store

### 採用した背景

### Angular

- TypeScriptフレンドリーである。
- Angularから提供されているライブラリで実装できる。
- 技術選定の手間があまりない。
- チームで開発するときに、だいたいのライブラリが提供されているので選定コストが少ない。
- コンポーネントとサービスを使用すれば最低限の機能はできる。
- バージョンのポリシーやサポート期間が決まっているので、いつまでにリファクタしないといけないのか明確。
- チーム開発するときに、だいたいのライブラリが提供されているので選定コストが少ない。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### Angularの改善

- 最近カンファレンスに参加し、聴講した[HTML5 Conference 2018 - Angular Webアプリケーションの最新設計手法.pdf](https://speakerdeck.com/koumatsumot0/angular-webahurikesiyonfalsezui-xin-she-ji-shou-fa)に影響を受けて改善しようと思っている。
- 現在はコンポーネントのテストが書きづらいところがある。
- injectionするRouterなどをコンポーネントに分離するなどして、依存を分離していきたい。
- Angularのコンポーネントをテストしやすい形にもっていきたい。
- テストでバグが起きる可能性をできるだけなくしたい。

## サービス：社員が使用する社内システム

開発メンバー：伊藤[(@koh110)](https://twitter.com/koh110)職種：エンジニア

### 使用している技術

- Angular
- angular-redux/store
- ng2-dragula
- Angular Material

### 採用した背景

### Angular

- Webフロントエンド専任の人がいない。
- webpackやライブラリのバージョン追従やメンテナンスをできそうになかった。

### angular-redux/store

- Fluxの概念が触りやすい、なじみやすいと感じた。

### ng2-dragula

- 当時ドラッグ&ドロップの候補ライブラリがなかった。
- 管理画面にFormが多くドラッグ&ドロップは必須要件だった。

### Angular Material

- Angularに寄り添ったライブラリなので、相性が良さそうだった。
- Angular Materialそのものというよりもカレンダー機能が欲しかった。

### 最近挑戦したorしようと思ってるWebフロントエンド技術

### SSR

- 自社内向けにも効果があるのかを実証したい。

### PWA

- 社内システムをアプリ化するのは需要はあるが、アプリエンジニアがいない。
- PWAでWebフロントエンドがアプリのようなWebを作る挑戦が社内貢献できると思っている。
- 社内システムなのでReact Nativeなどのストアに出したりする必要性がない。

## 全社におけるWebフロントエンド活動

ここまで様々な一部サービスのWebフロントエンドについて浅く広く紹介しました、このように挑戦できるフィールドは他の企業よりもかなり多く感じます。ここから先は各カンパニーをまたぎ、全社横断での取り組みについて紹介します。

### Webフロント技術室

今期から設立されたCTO室直下の組織です。各カンパニーのさまざまなサービスから11人のWebフロントエンドが集まっており、現在は社内のフロントエンドの状況把握するために、使用技術や環境を集約しています。

今後は各サービスにおけるWebフロントエンドの課題を解決し、その内容を再び全社のWebフロントエンドに共有していく活動を行います。

### JavaScriptサポートチーム

Webフロントエンドについての相談を受けサポートを行っているチームで、現在は4名で活動しています。Webフロント技術室とは異なり、気軽に対面で相談できる会を月に1度設けており、Node.jsサポートチームと共に相互にサポートし合いながら進めています。

- Node.jsサポートチームについての過去紹介記事はこちら => [Node.jsのコミッターを迎え、炎の特訓－Node.js社内勉強会はこうして始まった](https://linotice.tumblr.com/post/166348035844/20171013)

## 社内Webフロントエンドイベント

ここからは社内で行っている勉強会などの、全社Webフロントエンドのつながりを強くするイベントを紹介します。

### WebフロントエンドLT会

半期に1度のペースで登壇者を募り、全体参加者が約50人ほどの外部勉強会と同じような規模で行われているLT会です。さかのぼると2014年から開催されており、約4年以上継続して開催されています。社外では公開できない情報を含んだ課題解決方法や勉強した得た知見などが発表されています。

先日の[Yahoo! JAPAN Tech Advent Calendar 2018の2日目 - ありがとう、MYM 安らかに眠れ](https://techblog.yahoo.co.jp/advent-calendar-2018/goodbye-mym/)に紹介されている社内チャットツールで、実況や資料の共有も行われています。

### Webフロントエンドランチ会

月に1度のペースで開催している全社Webフロントエンドに興味あるメンバーが参加しているランチ会です。Webフロントエンドに関して少し悩んでること、キャリアプラン、副業など気軽に話せる会になっています。

この会に参加することで、全社Webフロントエンドのコミュニケーション促進につながって欲しいという思いで開催しています。

### Webフロントエンドもくもく会

月に2度のペースで開催しており、普段業務に追われてインプットできていない技術などをもくもくする会です。もくもくしている途中で詰まっても他の相談者に相談できるので、個人でもくもくして悩む部分が素早く解決でき、新しいコミュニケーションも生まれています。

## Bonfire_Frontendと告知

![](https://s.yimg.jp/images/tecblog/2018-2H/yahoo-frontend/GxBCl5a8f891b0c825d015f566657.png)

弊社ではBonfireという技術・デザインに関する勉強会を開催しています([詳しくはこちら](https://linotice.tumblr.com/post/166705023214/20171023))。

その中のWebフロントエンドに関する領域をBonfire_Frontendという形で開催しており、今までに[Bonfire_Frontend #1](https://yj-meetup.connpass.com/event/58718/)と[Bonfire_Frontend #2](https://yj-meetup.connpass.com/event/97695/)の計2回を開催しています。

ここからは告知になるのですが、1月24日にBonfire_Frontend \#3を開催します。今回は、株式会社一休、Retty株式会社、ヤフー株式会社の3社から、各社が行なっている刷新やアーキテクチャ変更についての発表していただきます。

募集の開始は１月となりますが、[connpassグループ](https://yj-meetup.connpass.com/)のメンバーになると開催時に通知を受け取れるので、ぜひ登録してください。

## 最後に

今回は浅く広く弊社のWebフロントエンドについて紹介しました。1つ1つのサービスでの取り組みは、深く話そうと思えば1記事出来上がるほど長い話になってしまうので、どこかで再び記事になると思います。

まだまだ紹介できていないサービスや取り組みもあるので、ぜひBonfire_Frontend \#3で弊社のWebフロントエンドと交流をしに来てください！

Yahoo! JAPANでは情報技術を駆使して人々や社会の課題を一緒に解決していける方を募集しています。詳しくは[採用情報](https://about.yahoo.co.jp/hr/)をご覧ください。

[前の記事へ](https://techblog.yahoo.co.jp/advent-calendar-2018/yahuoku-ar-measure/)

[一覧へ戻る](https://techblog.yahoo.co.jp/)

[次の記事へ](https://techblog.yahoo.co.jp/event/yjtc19/)

## 関連記事