---
タグ: []
作成日時: 2024-02-07T12:35:00
URL: https://creatorzine.jp/article/detail/583
Tags: [topic/組織/DesignOps]
---
![[1200.png]]

- 
- 

アジャイルソフトウェア開発手法のひとつ「スクラム開発」。最近、開発の現場で取り入れられることも多くなってきました。本連載では、エンジニアの立場ではなく、”デザイナー”がスクラム開発に関わるときのコツについて、サイボウズのUX/UIデザイナー、樋田勇也（といだゆうや）さんに解説していただきます。初回は「デザイナーがスクラム開発に関わるべき理由とそのメリット」がテーマです。

近頃、「スクラム開発」を取り入れるチームが増えてきたように思います。現在、サイボウズでも多くのチームがスクラム開発を実践しています。

最近普及してきたアジャイルソフトウェア開発手法のひとつです。言葉を耳にしたことがあるという方も多いのではないでしょうか。工程ごとに大きくフェーズがわかれている「ウォーターフォール」型の開発とは異なり、「アジャイル」型では、短期間で小さな開発と改善を反復しながらソフトウェアを開発していく方法です。

このスクラム開発はデザイナーにとっても無関係なものではありません。開発のプロセスが変わるということは、デザイナーの仕事もその変化に合わせて変えていく必要があるのです。そこで本連載では、「スクラム開発というプロセスに対してデザイナーがどう関わっていくべきか」についてお話していきたいと思います。

なおこの連載では、スクラム開発自体の詳細な解説は行いません。気になる方は、入門編として書籍『SCRUM BOOT CAMP THE BOOK』をぜひ読んでみてください。

本題に入るまえに、簡単に自己紹介をさせていただきます。

サイボウズでUX/UIデザイナーをしている樋田勇也（といだゆうや）と申します。サイボウズでは、「kintone」というクラウドサービスのプロダクトデザイン全般を担当しています。この連載では私が実際にスクラム開発に関わったときの実体験をもとにお伝えしていけたらと思っています。どうぞよろしくお願いします。

さて、初回となる今回は、デザイナーがスクラム開発に参加することにどのようなメリットがあるのかについて、お話していきます。

## デザイナーの役割ってなんだろう

「デザイナーは開発チームの一員としてスプリントに参加するべき？ それともスプリントの外から関わるべき？」

「これまでと比べて期間がぐっと短くなったことでデザインを作りきれなくなってきた」

「最近エンジニアのチームがスクラム開発を始めたんだけど、デザイナーとしてどう関わったらいいかわからない」

最近、こんなデザイナーの声をよく耳にします。どうしてデザイナーは「スクラム開発」に戸惑うのでしょうか。

そのひとつの理由は、“デザイナー”の役割がはっきりと定義されていないことにあると思っています。プロダクトオーナーに近い立場で動くのがよいのか。開発チームの一員として関わるべきなのか。はたまたそれらとは違う立ち位置で動くべきか――。

『SCRUM BOOT CAMP THE BOOK』にもデザイナーと思われる人物が開発チームのひとりとして登場しますが、とくにエンジニアとは区別されていません。実際デザイナーの立場はさまざまで、エンジニアと近い役割を担うこともあれば、プロダクトオーナーのような立ち位置になることもあり、一概にこれ、と当てはめることは難しいでしょう。

では、スクラム開発におけるデザイナーの役割とは何でしょうか。ここで一度、スクラム開発とは何かを振り返ってみたいと思います。

Wikipediaにはこのように書いてあります。

「柔軟かつ全人的なプロダクト開発ストラテジーであり、共通のゴールに到達するため、開発チームが一体となって働くこと」、「チームが自発的に組織だって行動することを可能にする」（出典：[Wikipedia「スクラム (ソフトウェア開発)](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%82%AF%E3%83%A9%E3%83%A0_(%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E9%96%8B%E7%99%BA))[」](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%82%AF%E3%83%A9%E3%83%A0_(%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E9%96%8B%E7%99%BA))より）

つまりこれによれば、デザイナーも柔軟かつ自発的に、共通のゴールに到達するための行動をすればいいということになります。

デザイナーの最大の武器は、言葉どおり、デザインできること。つまり情報を整理し、可視化できることにあります。この長所をスクラムのプロセスでどう活かせるかを考えることが、デザイナーの役割を見つけ出すヒントになりそうです。

## デザイナーが参加することのメリット kintone開発チームの場合

ここで私が所属するkintone開発チームの例を紹介します。

### メリット1：バックログの可視化

このチームにおけるデザイナーの仕事は、プロダクトオーナーのプロダクトバックログづくりを支援することから始まります。これはバックログができてスプリントに投入される前、つまりスプリントの外の仕事です。

基本的にkintone開発チームでのバックログは、その背景となるユースケースを示した「ユーザーストーリー」と、何を満たせば完成なのかを定義した「受け入れ条件」からなる、スプリント期間での開発チームへの要求事項を示したドキュメントです。スプリントの基点となるべきドキュメントなので、このバックログの質は非常に重要です。

デザイナーはバックログづくりを支援するため、プロダクトオーナーがバックログを考え始めた時から隣で一緒にプロトタイプを作ります。これは何かを検証するためというより、プロダクトオーナーが考えていることを具体化した青写真のようなものです。

デザイナーがそばで可視化することで、頭の中や文字情報だけでは気づけなかった考慮ポイントに気づくことができます。その結果、プロダクトオーナーはより正確に用件を検討することができ、バックログの取捨選択や優先順位づけなど、スプリントにバックログ投入するために必要なあらゆる判断を下すことができます。

### Special Contents AD

### 人気ランキング

- [Daily](https://creatorzine.jp/article/detail/583?p=2#daily)
- [Monthly](https://creatorzine.jp/article/detail/583?p=2#monthly)
1. [ ](https://creatorzine.jp/article/detail/5158)[プロンプトでUIを生成してくれるAIサービス「v0」をUIUXデザイナーが使ってみた](https://creatorzine.jp/article/detail/5158)[ ](https://creatorzine.jp/article/detail/5158)[2024/02/02 ](https://creatorzine.jp/article/detail/5158)[ ](https://creatorzine.jp/article/detail/5158)
2. [ ](https://creatorzine.jp/article/detail/4686)[ラスター画像をベクター変換するAIツール「Vectorizer.AI」が便利すぎた](https://creatorzine.jp/article/detail/4686)[ ](https://creatorzine.jp/article/detail/4686)[2023/09/25 ](https://creatorzine.jp/article/detail/4686)[ ](https://creatorzine.jp/article/detail/4686)
3. [ ](https://creatorzine.jp/article/detail/5143)[グッドパッチが実際に行っているステップ別に解説 デザインシステム構築前の準備フェーズですべきこと](https://creatorzine.jp/article/detail/5143)[ ](https://creatorzine.jp/article/detail/5143)[2024/02/05 ](https://creatorzine.jp/article/detail/5143)[ ](https://creatorzine.jp/article/detail/5143)
4. [ ](https://creatorzine.jp/article/detail/5200)[「LINE」アプリ、生成AIと他のユーザーに質問ができるサービス「LINE AI Q＆A」がAndroidで先行して登場](https://creatorzine.jp/article/detail/5200)[ ](https://creatorzine.jp/article/detail/5200)[2024/02/06 New ](https://creatorzine.jp/article/detail/5200)[ ](https://creatorzine.jp/article/detail/5200)
5. [ ](https://creatorzine.jp/article/detail/5099)[なぜ「想像以上」の成果が出せたのか にじさんじ×味ぽんコラボから見えた成功のヒントとVTuberの可能性](https://creatorzine.jp/article/detail/5099)[ ](https://creatorzine.jp/article/detail/5099)[2024/01/12 ](https://creatorzine.jp/article/detail/5099)[ ](https://creatorzine.jp/article/detail/5099)
6. [ ](https://creatorzine.jp/article/detail/5132)[ユーザーテストにおける生成AIツールの活用について検証してみた](https://creatorzine.jp/article/detail/5132)[ ](https://creatorzine.jp/article/detail/5132)[2024/02/01 ](https://creatorzine.jp/article/detail/5132)[ ](https://creatorzine.jp/article/detail/5132)
7. [ ](https://creatorzine.jp/article/detail/4436)[デザイナーがCanvaを使って本気でデザインを作ってみたらこうなった](https://creatorzine.jp/article/detail/4436)[ ](https://creatorzine.jp/article/detail/4436)[2023/07/07 ](https://creatorzine.jp/article/detail/4436)[ ](https://creatorzine.jp/article/detail/4436)
8. [ ](https://creatorzine.jp/article/detail/4558)[TikTokにて、LIVEサブスク登録者だけが見られるショート動画投稿機能「サブスク限定動画」公開](https://creatorzine.jp/article/detail/4558)[ ](https://creatorzine.jp/article/detail/4558)[2023/07/21 ](https://creatorzine.jp/article/detail/4558)[ ](https://creatorzine.jp/article/detail/4558)
9. [ ](https://creatorzine.jp/article/detail/3929)[仕事の充実度を上げたい人へ イラストレーターとの関わりで得た、満足感のある仕事に“する”ための秘訣](https://creatorzine.jp/article/detail/3929)[ ](https://creatorzine.jp/article/detail/3929)[2023/02/08 ](https://creatorzine.jp/article/detail/3929)[ ](https://creatorzine.jp/article/detail/3929)
10. [ ](https://creatorzine.jp/article/detail/3967)[UIUXデザインが素晴らしい！ 感動すら覚えた「Bento.me」を知っていますか？](https://creatorzine.jp/article/detail/3967)[ ](https://creatorzine.jp/article/detail/3967)[2023/02/20 ](https://creatorzine.jp/article/detail/3967)[ ](https://creatorzine.jp/article/detail/3967)

### 新着

- [記事](https://creatorzine.jp/article/detail/583?p=2#article)
- [ニュース](https://creatorzine.jp/article/detail/583?p=2#news)
- [ ](https://creatorzine.jp/article/detail/5142)[生成AI時代の到来、企業内で日本のクリエイターはゲームチェンジャーになれるか【アドビ×デザイナー対談】](https://creatorzine.jp/article/detail/5142)[ ](https://creatorzine.jp/article/detail/5142)[2024/02/07 New ](https://creatorzine.jp/article/detail/5142)[ ](https://creatorzine.jp/article/detail/5142)
- [ ](https://creatorzine.jp/article/detail/5143)[グッドパッチが実際に行っているステップ別に解説 デザインシステム構築前の準備フェーズですべきこと](https://creatorzine.jp/article/detail/5143)[ ](https://creatorzine.jp/article/detail/5143)[2024/02/05 ](https://creatorzine.jp/article/detail/5143)[ ](https://creatorzine.jp/article/detail/5143)
- [ ](https://creatorzine.jp/article/detail/5158)[プロンプトでUIを生成してくれるAIサービス「v0」をUIUXデザイナーが使ってみた](https://creatorzine.jp/article/detail/5158)[ ](https://creatorzine.jp/article/detail/5158)[2024/02/02 ](https://creatorzine.jp/article/detail/5158)[ ](https://creatorzine.jp/article/detail/5158)
- [ ](https://creatorzine.jp/article/detail/5132)[ユーザーテストにおける生成AIツールの活用について検証してみた](https://creatorzine.jp/article/detail/5132)[ ](https://creatorzine.jp/article/detail/5132)[2024/02/01 ](https://creatorzine.jp/article/detail/5132)[ ](https://creatorzine.jp/article/detail/5132)
- [ ](https://creatorzine.jp/article/detail/5101)[九州に根差す「welzo」が企業リブランディングを実施 その覚悟の裏側を経営陣とクリエイターが語る](https://creatorzine.jp/article/detail/5101)[ ](https://creatorzine.jp/article/detail/5101)[2024/01/30 ](https://creatorzine.jp/article/detail/5101)[ ](https://creatorzine.jp/article/detail/5101)

[新着記事一覧を見る](https://creatorzine.jp/article)