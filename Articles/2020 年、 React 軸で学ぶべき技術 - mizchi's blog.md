---
URL: https://mizchi.hatenablog.com/entry/2020/01/04/172041
Updated: 2021-01-03T01:21:00
Created: 2021-01-02T18:26:00
Tags: [topic/技術/React]
---
[なぜ仮想 DOM という概念が俺達の魂を震えさせるのか - Qiita](https://qiita.com/mizchi/items/4d25bc26def1719d52e6) から 5 年経ち、 仮想 DOM を備えた React やそれを採用した Vue や他のライブラリも市民権を得たように思います。

有用な技術が市民権を得る、というのはエコシステムが花開くことでもあります。新しいプロダクトを作る際の技術選定において、 TypeScript + React が常に正解というわけではないですが、このスタックはかなり強力だという手応えがあります。

このスタックは得意のウェブフロントエンドは勿論、それ以外もとりあえず 80 点ぐらいの品質でプロトタイピングできる、というようなエコシステムになってきたような肌感があります。

モダンフロントエンドだと TypeScript と Webpack は採用しているのを前提として、本記事では React を軸にその技術を活かすために、次の 6 個の技術を紹介します。

- Next.js
- Preact
- Workbox
- Firebase
- Netlify
- ReactNative

## Next.js

[https://nextjs.org/](https://nextjs.org/)

当初は [SSR](http://d.hatena.ne.jp/keyword/SSR) が可能な[ウェブアプリケーション](http://d.hatena.ne.jp/keyword/%A5%A6%A5%A7%A5%D6%A5%A2%A5%D7%A5%EA%A5%B1%A1%BC%A5%B7%A5%E7%A5%F3)[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)という触れ込みでしたが、静的サイト生成が後に追加されました。これによって、パフォーマンス要件によって「柔軟性のある [SSR](http://d.hatena.ne.jp/keyword/SSR) [フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)」もしくは「運用が容易な静的サイト」を柔軟に切り替えられるようになりました。

去年ついにパラメータ付きのダイナミックルーティングの対応が追加されたことで、プロダクション品質のアプリケーションを現実的に開発可能になったように思います。経験上、[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)の選定過程で、ここが[ブロッキング](http://d.hatena.ne.jp/keyword/%A5%D6%A5%ED%A5%C3%A5%AD%A5%F3%A5%B0)になることが多かったので…

[https://github.com/zeit/next.js#dynamic-routes-support](https://github.com/zeit/next.js#dynamic-routes-support)

実際には Next.js を使って本気で開発すると、[SSR](http://d.hatena.ne.jp/keyword/SSR) する技術スタック(style-components/[apollo](http://d.hatena.ne.jp/keyword/apollo)等) に合わせてプロジェクトごとにかなりのカスタマイズが必要なのですが、現状かなり投資対効果が高い[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)だと思います。

## Preact

[https://github.com/preactjs/preact](https://github.com/preactjs/preact)

3kb の React サブセットの[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)です。React 自体はやや[富豪的](http://d.hatena.ne.jp/keyword/%C9%D9%B9%EB%C5%AA)なサイズのライブラリで、それが基幹となってる SPA や Next.js のような環境以外では採用をためらってしまうところがあるのですが、 preact は軽量でバンドルサイズに悪影響を及ぼすことなく、どんな環境でも採用可能です。 React エンジニアなら選択肢として持っておきたい技術ですね。

作者の @developit 氏が [Google](http://d.hatena.ne.jp/keyword/Google) の DevRel で、 PWA のパフォーマンスの文脈でよく採用されており、 [Google](http://d.hatena.ne.jp/keyword/Google) の支援が厚いのも特長です。

軽量な分、細かい最適化や、 React の Dev Mode のような丁寧な Warning はないのですが、 「React はこう動くから preact もこう動くはず」という期待にほぼ応えてくれます。

preact 10 系になってから hooks 対応が進み、自分はほぼ不満なく使えています。最近ついに Suspense に対応しました。

## Workbox

[https://developers.google.com/web/tools/workbox](https://developers.google.com/web/tools/workbox)

ServiceWorker のキャッシュを扱う[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)を生成してくれるツールです。 Service Worker は合法 MITM のような技術なので、無限の可能性があるのですが、 [IE](http://d.hatena.ne.jp/keyword/IE) が死ぬまでは透過的にキャッシュを効率よく管理するもの、といった位置づけを変えることは難しいです。

現状の ServiceWorker のベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスを [Google](http://d.hatena.ne.jp/keyword/Google) が実装したのが、 Workbox です。現実には workbox-webpack-plugin を使うことになると思います。

[https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)

ただ、それがどのように動いているかを知らないと、思わぬミスをやらかすことがあるかもしれません。Workbox のキャッシュの取り扱いについてのストラテ[ジー](http://d.hatena.ne.jp/keyword/%A5%B8%A1%BC)、とくにデフォルトの stale-while-revalidate については知っておいたほうがいいです。

[https://developers.google.com/web/tools/workbox/modules/workbox-strategies](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)

(つまりはキャッシュを優先して裏で取りに行くから、一回は必ず古いキャッシュを見ちゃうよ、ということです)

## Firebase

[https://firebase.google.com/docs?hl=ja](https://firebase.google.com/docs?hl=ja)

Firebase 、といってもオリジナルの Realtime Database しかなかった時代から時間が経ち、パッケージの詰め合わせといった様を呈しています。ここでは Hosting, Authentication, Firestore, Firebase Function を紹介します。

### Firebase Hosting

静的サイト[ホスティング](http://d.hatena.ne.jp/keyword/%A5%DB%A5%B9%A5%C6%A5%A3%A5%F3%A5%B0)機能です。[CDN](http://d.hatena.ne.jp/keyword/CDN) 上に静的アセットが展開され、 firebase rules の [rewrite](http://d.hatena.ne.jp/keyword/rewrite) ルールでリダイレクトしたり、リソースのアクセスのセキュリティ保護を書けたりできます。[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)を紐付けることもできます。

自分は素朴なサイトは netlify を使うことが多いのですが、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)に基づいた認証系の機能を使うなら、Firebase Hosting を検討します。

### Firebase Authentication

[Google](http://d.hatena.ne.jp/keyword/Google), [Facebook](http://d.hatena.ne.jp/keyword/Facebook), [Twitter](http://d.hatena.ne.jp/keyword/Twitter), [Github](http://d.hatena.ne.jp/keyword/Github) などの各種[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンを渡すことで OAuth の認証系をさっくり実装できます。(普通の email + password の認証の実装もできます)

[ウェブアプリケーション](http://d.hatena.ne.jp/keyword/%A5%A6%A5%A7%A5%D6%A5%A2%A5%D7%A5%EA%A5%B1%A1%BC%A5%B7%A5%E7%A5%F3)の開発において初心者上級者問わず認証系は手こずるところですが、Firebase Authentication の開発体験は最高で、とりあえず何か新規サービスを作る際はこれだけ体験してほしいところです。ロジックが少なく、ログインさせるのが主のサイトなら、ほぼこれだけで実装が終わります。

### Firestore

Firebase 環境の主流なデータベースです。が、かなり[ピーキー](http://d.hatena.ne.jp/keyword/%A5%D4%A1%BC%A5%AD%A1%BC)な性能です。MongoDB のような ドキュメント指向 DB に、 Websocket 経由の Subscription が付属している、というものです。このリアルタイム特性を活かせるアプリケーションは限られていて、そして雑に使うとお高く…といった感じで、扱いが難しいです。

フル Read & Write 権限のテストモードで本番デプロイする人が後を立たず、過去何度も重大な[セキュリティインシデント](http://d.hatena.ne.jp/keyword/%A5%BB%A5%AD%A5%E5%A5%EA%A5%C6%A5%A3%A5%A4%A5%F3%A5%B7%A5%C7%A5%F3%A5%C8)を引き起こしており、正直なところ、セキュリティ意識が足りないプログラミング初心者は、Firestore の使用を避けたほうがいい、と自分は思います。 最初は Cloud Function 経由で普通の [RDBMS](http://d.hatena.ne.jp/keyword/RDBMS) に [CRUD](http://d.hatena.ne.jp/keyword/CRUD) を実装したほうがいいでしょう。

### Firebase Function (on CloudRun)

Firebase 用の FaaS です。中身は [GCP](http://d.hatena.ne.jp/keyword/GCP) Cloud Function です。Node, [Python](http://d.hatena.ne.jp/keyword/Python), Go などのコンテナを選べます。

で、最近追加された機能なのですが(厳密には Firebase Function ではないのですが) [GCP](http://d.hatena.ne.jp/keyword/GCP) CloudRun に対応しました。任意なコンテナをデプロイしてスケールさせることができます。

[https://firebase.google.com/docs/hosting/cloud-run](https://firebase.google.com/docs/hosting/cloud-run)

[GCP](http://d.hatena.ne.jp/keyword/GCP) CloudRun は要は [GCP](http://d.hatena.ne.jp/keyword/GCP) Managed Knative、つまり [k8s](http://d.hatena.ne.jp/keyword/k8s) なので、可用性を求められたら 将来的に GKE に載せ替えることができます。

将来的に、と書いたのは「現時点で、Firebase Hosting は Cloud Run on GKE との統合をサポートしていません。」という但し書きがあるからです…

## Netlify

[https://www.netlify.com/](https://www.netlify.com/)

Firebase は何でも揃っていて便利なのですが、それがちょっと鬱陶しいこともあります。

静的サイトのデプロイ先として、小さな静的ウェブサイトを作った時に便利なのが netlify で、`npm i -g netlify-cli` して `netlify deploy -d public --prod` で指定した[ディレクト](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リを netlify にアップロードすることができます。(要 netlify へのログイン)

デプロイした静的サイトは [CDN](http://d.hatena.ne.jp/keyword/CDN) 上に展開されるので、高速です。また、ビルド毎にハッシュ付きの URL が生成され、デプロイ ID がわかっていれば、その時点のものにアクセスできます。

本格的なものではないのですが、 Firebase Function のような FaaS もついています。中身は [AWS](http://d.hatena.ne.jp/keyword/AWS) Lambda で、無料枠でも次のコンテナが使えます。

```plain text
us-east-1 AWS Lambda region
1024MB of memory
10 second execution limit
```

[https://docs.netlify.com/functions/overview/](https://docs.netlify.com/functions/overview/)

単機能なので、取り回しがよく、自分はプロトタイプや実験作を netlify で実装してしまうことが多いです。本格的なものはその後 firabase に移すことを検討する、といった感じですね。

## ReactNative

[https://facebook.github.io/react-native/](https://facebook.github.io/react-native/)

React Native が常に優秀な選択肢であるとは限りません。それでも React が書ける人間ならば、自分の手持ちの弾でモバイルアプリケーションを作れる、というのを意識しておいたほうがいいでしょう。

プラットフォームごとの最新の [API](http://d.hatena.ne.jp/keyword/API) を使いたい、デ[バイス](http://d.hatena.ne.jp/keyword/%A5%D0%A5%A4%A5%B9)固有 [API](http://d.hatena.ne.jp/keyword/API) を使いたい、限界までパフォーマンスを絞りきって UX に還元したい、専用のネイティブ[プラグイン](http://d.hatena.ne.jp/keyword/%A5%D7%A5%E9%A5%B0%A5%A4%A5%F3)を使いたい、そういう場合は ReactNative を選ぶべきではないです。逆に言えば、それ以外の状況では常に選択肢となります。

ReactNative と Firebase と合わせて、「貧者の選択肢」であって、開発リソースが潤沢な場合は、あえて選ぶ必要はありません。ただ、自分が作りたいものが Firebase + ReactNative + Expo の技術制約を満たすとき、小さな開発リソースで大手プレーヤーと張り合える、数少ない技術的な選択肢の一つです。

[https://expo.io/](https://expo.io/)

個人的に ReactNative を採用できるかどうかは、 Expo のネイティブ[プラグイン](http://d.hatena.ne.jp/keyword/%A5%D7%A5%E9%A5%B0%A5%A4%A5%F3)を使わない、という技術制約を満たすかどうかだと思っています。 Expo を使う限り、 ReactNative で高い生産性を享受できます。

近年、日本国内においては、 Vue と React が同じようなポジションになったように感じているのですが、両者を比べたとき、 React の優位は ReactNative があることだと思っています。個人的な願望として、ReactNative Web がもっと使い心地が良ければこちらにスキルを振っていいと思っていたのですが、そこに関しては現状厳しいものがあります…。

## おわり

僕がフロントエンドをやり始めた 2013 年はまだフロントエンドエンジニアという職種が言葉として認知されてるかどうか怪しい、というレベルだったのですが、今のウェブ業界はフロントエンド技術は花形で、誰も彼もがフロントエンドの[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)なにか一つ、もしくは[AWS](http://d.hatena.ne.jp/keyword/AWS)かGKE、そうじゃない場合はMLやってる、というような時代になった気がします。

フロントエンドはインフラと違って独習にお金があまり掛からないので、入門に適したジャンルであり、プログラミングスクールなどでも最初に教わるテーマに選ばれやすいのですが、そこから一歩踏み出して自分の技術を差別化するのに Firebase からの [GCP](http://d.hatena.ne.jp/keyword/GCP) や ReactNative + Firebase からのモバイルアプリケーションは良いテーマになるんじゃないでしょうか。

かなり個人の主観によった選定なのですが、次に何の技術を選ぶか助けになれば幸いです。