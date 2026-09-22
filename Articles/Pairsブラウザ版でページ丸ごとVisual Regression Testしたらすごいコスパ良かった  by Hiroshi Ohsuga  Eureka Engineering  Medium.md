---
URL: https://medium.com/eureka-engineering/pairs%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E7%89%88%E3%81%A7%E3%83%9A%E3%83%BC%E3%82%B8%E4%B8%B8%E3%81%94%E3%81%A8visual-regression-test%E3%81%97%E3%81%9F%E3%82%89%E3%82%84%E3%81%A3%E3%81%B1%E3%82%8A%E3%82%B3%E3%82%B9%E3%83%91%E8%89%AF%E3%81%8B%E3%81%A3%E3%81%9F-726ad2352ace
Created: 2024-01-20T19:11:00
Tags: [topic/技術/テスト]
---
# Pairsブラウザ版でページ丸ごとVisual Regression Testしたらすごいコスパ良かった

![[1dnLHvGUBGzGWpcpKtv3FLg.jpeg]]

![[14nQvYibd3aHYOp1xrvmfMQ.png]]

[Hiroshi Ohsuga](https://medium.com/@hiroshi.ohsuga)

·

[Follow](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fsubscribe%2Fuser%2Fa6d024ffc33e&operation=register&redirect=https%3A%2F%2Fmedium.com%2Feureka-engineering%2Fpairs%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E7%89%88%E3%81%A7%E3%83%9A%E3%83%BC%E3%82%B8%E4%B8%B8%E3%81%94%E3%81%A8visual-regression-test%E3%81%97%E3%81%9F%E3%82%89%E3%82%84%E3%81%A3%E3%81%B1%E3%82%8A%E3%82%B3%E3%82%B9%E3%83%91%E8%89%AF%E3%81%8B%E3%81%A3%E3%81%9F-726ad2352ace&user=Hiroshi%20Ohsuga&userId=a6d024ffc33e)

Published in

[Eureka Engineering](https://medium.com/eureka-engineering)

·

13 min read

·

Jan 17, 2022

![[1VwHX6VLib-5OIgaElszseQ.png]]

Webフロントエンド エンジニアの大須賀です。

Pairsのブラウザ版(以下Pairs)ではいくつかの理由のためにStorybookを使ったページ単位のVisual Regression Test(以下VRT)を導入しました。

なんとなく「すごいコスパいいんじゃないか？」と思ってやってみたらやっぱりコスパよくて満足してます。

この記事は以下の人に読んでもらえたらいいかなと思って書いています。

- VRT 良さそうだけど大変なんじゃない？って思ってやってないひと
- なんか楽にテストのカバレッジ上がらんかな？って思ってるひと
- Storybookを普通に使ってるひと
- [Testing Trophy](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests) 良さそうだけど実際にやるとどうなん？って気になってるひと

内容には以下を含みます。

- よかったこと・わるかったこと
- Pairsのアーキテクチャ概要の紹介
- VRTするところ・しないところ
- 実際にやったこと
- 参考実装 (in Code Sandbox)
- 目的

目的は長くなるので後ろにしました。 「VRTやってないけど結局どうなん？」とか「VRTやってるけど粒度の小さいコンポーネントのことしか考えてなかった」みたいなひとは是非読んでみてください。

# よかったこと・わるかったこと

まずはよかったこと4点・わるかったこと1点から共有します。

![[1CUM-H59OG4w-ZZrSqSzTzA.png]]

## よかったこと1. 開発中のコンテキストスイッチが少ない

VRTのメリットとしては、機能実装とテスト実装のコンテキストスイッチが少ない点があります。

![[1zkjUKFvEFHvPakF90qfqMQ.png]]

機能実装時の作業がStorybook+実装だとすると、Jestなどでユニットテストする場合はそれに加えてテスト実装をする必要があります。 この結果テストの実行・確認とブラウザ上での動作確認の2つのコンテキストが発生しています。

VRTの場合mockの準備が終わるとStorybook + 実装のコンテキストだけでよくなります。

## よかったこと2. カバレッジの高さに対して実装が簡単

前述したmockの準備は単体テストに比べれば大変なもののカバレッジの観点で優位であると感じます。

本記事で説明するVRTではコンポーネント単体ではなくReduxのロジックやAPIクライアント部分もカバーされます。 この結果として単体テストでテストしにくいモジュールのつなぎ目の部分がカバーされます。

たとえばPairsではReduxを採用していますがaction creator/reducer/selectorを一連の流れとしてカバーでき、 これが修正範囲が大きくなりがちなグローバルステートのリファクタなどにおいて大きな安心材料となります。

この恩恵をmockの準備だけで行えるのはコスパがいいと感じます。

## よかったこと3. デザインシステム上での変更の影響範囲がちゃんとわかる

Typographyを更新したときのVRT結果

![[1cJHx-QfWepA8nggeyRJDsQ.png]]

弊社Pairs開発組織ではデザインチームと開発チームに分かれていますが、デザインチームではデザインシステムの実践にチャレンジしています。

ソフトウェアアーキテクチャ同様に、アプリケーションへの要求が変化・増加するときに、共通部分を修正したくなることもあるでしょう。

例えばボタンのデザインを変更するとか、タイポグラフィを調整するとか、色を調整するとか、こういうときにコード上の変更箇所は少ないものの影響範囲は大きくなります。 こういうケースでVRTにより差分が検知されることで影響範囲が明らかになり安心して修正を反映することができます。

画像はタイポグラフィを更新したときのVRT結果ですが、想像通り影響範囲は大きいものでしたが、フォントサイズの変更によるレイアウト崩れが発生していないことをリリース前に確認することができました。

## わるかったこと1. テストが長い/高い

CIが長いです。(あたりまえ)

Github Actionとchromaticの所要時間

![[1jZvV6mxoOhUD6Pk4xlFGrg.png]]

ページ単位のStoryはバリエーションが多くなりがちで、複雑な画面では20 Storyぐらいあったりします。 PairsではVRTの環境として [chromatic](https://www.chromatic.com/) を利用しています。 現在総Story数は757あり、GitHub actionでStorybookをビルドするのに3分 ~ 4分。chromatic上でテスト結果がでるまでに2分 ~ 3分かかります。

またchromaticはSnapshot数に応じて課金されるため、いつか開発の頻度や並列性が高くなっていったとき偉い人に怒られるんじゃないかと心配になります。

※ ちゃんと見積して稟議を通しています！

良いところ・悪かったところのトレードオフは十分勝ってるなと感じていて、総じてやってよかったと思っています。

ここからは具体的な話をしていきます。

# Pairsの大まかな設計とテストするところ諦めたところ

Pairsは以下の図のようにオーソドックスなReduxやreact-routerを使った構成をしています。この内VRTに関係するところを説明します。

![[1TILguaXmW1JC0Xr7sgUiAQ.png]]

- **エンドユーザ**

![[1TA7Ct-wWWY97kWDE2Y6Vcg.png]]

アプリケーションの出力結果としてレンダリングされた画面を見る。また入力としてクリックやテキスト入力などの様々な操作を行う。

- Pairs **Web API **サーバ

![[10J-AFLuBGYLMBLS-acj-ww.png]]

HTTPリクエストはアプリケーションの出力であり、レスポンスはアプリケーションへの入力となる。

- History API. ≒ **URL**

![[1tNGLtJ5DHCZauUoyo4aFdw.png]]

HTTPサーバの観点でURLはアプリケーションへの入力であり、Redirectなどを含むと出力でもあります。

- Date API

![[1-uKYnmjJW_GX0OM6RqoMeA.png]]

ここでは**現在時刻**のこと。「1日前」のような表示に必要な入力。

これら4つの内、今回のVRTで工夫したりテストするのは以下のようになります。

- テストする →「レンダリングされた画面」
- テストしない →「APIリクエスト」「ページ遷移(URLの更新)」
- モックする → 「ユーザ入力」「APIレスポンス」「URL」「現在時刻」

# 実際にやったこと

ここからの内容の殆どがモックについてになります。

## Reduxを丸ごと動かす

![[1tGg0-DNVNOVfkoqI6KF3WQ.png]]

ページを丸ごとマウントしつつカバレッジを高めようとするとReduxもほしくなります。

やりかたとしてはDecoratorで本番同様のRedux Contextを提供するだけなので、よっぽど複雑なmiddlewareを設定していない限りは難しいことは無いと思います。

1点工夫しておくといいことがあって、Global Stateを好き勝手設定できるように、本番のReducerをWrapしておくと、困ったときの奥の手として便利です。(基本はmswでやるので出番は殆どない。)

これらを使ったStorybookの実装は以下のようになります。

詳細は [Code Sandbox](https://codesandbox.io/embed/eureka-engineer-blog-2022-january-forked-4kwdo?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fpages%2Flist%2Findex.stoires.test.tsx&theme=dark&view=editor) でどうぞ。

## mock service workerをつかったmockとfixture

![[1gNfTYarp6Cl8jLDt7rUOkA.png]]

[mock service worker](https://mswjs.io/)はネットワークリクエストをmockし、任意のレスポンスを返せるようにしてくれるライブラリで、[storybookの用のaddon](https://storybook.js.org/addons/msw-storybook-addon)もあるので簡単に組み込む事ができます。 mockのために用意するモジュールはだいたい3つで、 `1.`, `2.` は単体テストや複数のStorybookファイルで再利用できる内容にします。

1. APIのレスポンスを返す関数
2. mswのhandlerを返す関数
3. storiesファイルの中で複数のhandlerをまとめてカスタマイズできるようにする関数

こんな感じで、mswを前提にしながら再利用可能なmock用の関数を実装します。 再利用性を確保しつつ、よくあるパターン(API通信中のStoryとか)に対しては大胆に共通化することで実装をコストを削ります。

Storybook の実装はこんな感じ。

詳細は [Code Sandbox](https://codesandbox.io/embed/eureka-engineer-blog-2022-january-forked-4kwdo?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fpages%2Fmsw-handlers%2Findex.stories.test.tsx&theme=dark&view=editor) でどうぞ。

## ユーザ入力のemulationについて

簡単にいうと [Storybook7で入るやつ](https://storybook.js.org/blog/interaction-testing-sneak-peek/) です。 なのでこの項目は絶対真似せずちょっと待ちましょう。

さて、 画面によってはモーダルダイアログなどユーザ入力をきっかけにして状態変化が起き、画面に反映されるものがあります。

通常のStorybookの開発ではコンポーネントのPropertyに `initialDialogOpen: boolean` などのプロパティを追加することでユーザ入力が後の画面を確認するやりかたになりますが、 ユーザ入力そのものをmockすることで、コンポーネント内部の `状態遷移のロジック` もカバーしています。

現在サポートしている操作は以下の5つです。

- 要素のclick
- ファイル入力 (input type=file)
- フォーカス
- select要素の操作
- テキスト入力

操作用の実装は Cypressを参考に一定時間対象を探して見つかったら操作、見つからなかったら例外を投げるようにしています。 Storybook7になったら全部捨てるんじゃないかなと思ってます。

emulation部分は複雑ですがユースケースが極めておおく、再利用できるので簡単にe2eっぽいことができます。

Storybook の実装はこんな感じ。

詳細は [Code Sandbox](https://codesandbox.io/embed/eureka-engineer-blog-2022-january-forked-4kwdo?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fpages%2Femulations%2Findex.stories.test.tsx&theme=dark&view=editor) でどうぞ

## 時刻のmock

時間に関する機能は少なくありません。 とくに `現在時刻` に関係するものはSnapshot時に毎回違う表示になるので、VRTにおいて一つの鬼門です。

時間のmockには[timemachine](https://github.com/schickling/timemachine)をつかい、 Decorator経由して操作できるようにしました。

timemachineは微妙に副作用があるので多少の工夫をしながら組み込んでいます。

Storybook の実装はこんな感じ。

詳細は [Code Sandbox](https://codesandbox.io/embed/eureka-engineer-blog-2022-january-forked-4kwdo?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fpages%2Ftimemachine%2Findex.stories.test.tsx&theme=dark&view=editor)でどうぞ

## URLパラメタやクエリに依存している場合

![[1dH9BYWEMP-rBOIIFD7BBzQ.png]]

`/user/:id` みたいなURLの画面や `/?param=1` のようにURLから入力値を受け取る画面もあります。

Pairsでは[react-router](https://reactrouter.com/)を使っているので、各画面からのアクセスはreact-routerのContextを前提としています。 このContextをDecorator経由で提供し、各Storyからhooks経由で制御します。

正直ここは微妙で `path` の部分が2重管理になったりするところは解決したいです。 それこそアプリケーション全体をマウントしてしまう作戦を検討してもいいかもしれません。

Storybookの実装はこんな感じ

詳細は [Code Sandbox](https://codesandbox.io/embed/eureka-engineer-blog-2022-january-forked-4kwdo?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fpages%2Froute%2Findex.stories.test.tsx&theme=dark&view=editor)でどうぞ

コレぐらい準備すると、Reduxを含めてStorybookに1ページ丸ごとマウントできるようになります。 ボリュームは大きいですが一度実装してしまった後は全然いじってないので十分コスパはあると感じます。

# 目的

さて、なんでこんな大変なことをしたかの話です。

## 目的1. css-loaderを全部emotionに置き換えたい

css-loader を初期には利用していて、途中から emotion を併用し、「手を加えるときにはその範囲で css-loader から乗り換える」作戦をとっていました。 が、css-loaderはメンテの停止がアナウンスされていたり、事業上の理由もあってできるだけ早く css-loaderを捨てたくなりました。

ただこの css-loader 前提のComponentはかなりの数があるため、ASTを利用した半自動化処理により行いました(まだちょっと残ってる)。 このAST処理自体にかんして個人でもチームでも経験がなかったため、処理後の動作確認は必須という判断をしました。 自動化したのに確認が手動というのではコスト削減になりません。

そこで合わせてVRTを導入しました。

## 目的2. デザインシステムの更新をサポートしたい

前述していますが、弊社デザインチームはデザインシステムの運用にチャレンジしていて、変更もあります。 このとき「影響範囲が大きくて確認が大変だからあとまわし」というのではデザインシステムの進化の足を引っ張ってしまいます。 そうならないためにも規模の大きいデザイン変更も安心して行えるVRTは役に立ちます。

## 目的3. リファクタをサポートしたい

テストがあるとリファクタが楽になるわけですが、リファクタを重要視する理由を2つピックアップすると。

**アジャイル開発においてはリファクタを前提に短期的に十分なアーキテクチャを採用する方が効果的なことが多い**

「[アジャイルソフトウェア開発の奥義](https://www.amazon.co.jp/%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E9%96%8B%E7%99%BA%E3%81%AE%E5%A5%A5%E7%BE%A9-%E7%AC%AC2%E7%89%88-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91%E9%96%8B%E7%99%BA%E3%81%AE%E7%A5%9E%E9%AB%84%E3%81%A8%E5%8C%A0%E3%81%AE%E6%8A%80-%E3%83%AD%E3%83%90%E3%83%BC%E3%83%88%E3%83%BBC%E3%83%BB%E3%83%9E%E3%83%BC%E3%83%81%E3%83%B3/dp/4797347783/ref=sr_1_1?keywords=%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E9%96%8B%E7%99%BA%E3%81%AE%E5%A5%A5%E7%BE%A9&qid=1640337449&sprefix=%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E9%96%8B%E7%99%BA%20%2Caps%2C198&sr=8-1)」などで語られていますが、アジャイル開発を前提としたとき長期にわたって最適なアーキテクチャを検討・実装してもよきせぬ変更が発生すれば結局リファクタが必要になります。

それよりは、リファクタを前提としてリファクタのコストを下げる環境にしておきたかった狙いがあります。

**設計をミスっても取り返せるようにしたい**

設計スキルは抽象的で身につけるには座学だけではなく実際の実装やディスカッションの経験を必要とします 。

経験が少ないメンバにも安心して設計にチャレンジし早く設計スキルを身につけてもらうためにも、リファクタしやすい環境が必要だと考えています 。

## 目的4. ライブラリの更新を楽にしたい

Pairsでは毎週npmの更新を行っています。

メジャーアップデートだろうがマイナーアップデートだろうが互換性があるか多少の変更であれば更新します。 利用するモジュールはじわじわとですが増加傾向にありだんだん大変になってきています。 この更新コストを下げ、安心して毎週更新するためにもテストに高いカバレッジがほしかったのです。

# まとめ

一言でいうと1ページ丸ごとVRTは「テストはほしいが楽したい」に対していい感じの答えになっている気がします。

今回のアイデアは [Static vs Unit vs Integration vs E2E Testing for Frontend Apps](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests) の定義に従うと、お客様側はe2e的であり、API側はintegration的な中間になっています。これが同記事でも解説されているTrade-offのなかでいいバランスになっているんだろうなと思います。

# 最後に

現在 Webフロントエンジニアを絶賛応募中です。

この記事に共感もらえる人には特に応募いただきたいと思っています。

[https://www.wantedly.com/projects/676686](https://www.wantedly.com/projects/676686)