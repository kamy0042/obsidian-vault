---
タグ: []
作成日時: 2023-12-21T12:16:00
URL: https://blog.smartbank.co.jp/entry/2023/12/20/195623
Tags: [topic/デザインシステム/デザイントークン]
---
![[20231220195352.png]]

この記事は[Figma Advent Calendar](https://qiita.com/advent-calendar/2023/figma-design) 20日目の記事です。

おはようございます！こんにちは！こんばんは！

「[家計簿プリカB/43](https://b43.jp/)」を運営する[株式会社スマートバンク](https://smartbank.co.jp/)デザイナーの[@putchom](https://putchom.com/)です。

Config 2023から約半年経ち、皆さんもすでに[FigmaのVariables](https://help.figma.com/hc/ja/articles/15339657135383-Figma%E3%81%A7%E3%81%AE%E3%83%90%E3%83%AA%E3%82%A2%E3%83%96%E3%83%AB%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%AC%E3%82%A4%E3%83%89)を使いこなしている頃かと思います。

以前『初公開！「[家計簿プリカB/43」のデザイントークンの設計](https://blog.smartbank.co.jp/entry/2023/06/19/095816)』でスマートバンクでは [Tokens Studio for Figma](https://tokens.studio/) を採用してFigmaで効率的にデザイントークンを管理しているとお伝えしましたが、このたび**Variablesへの移行が完了した**のでその話をしようと思います。

※ この記事ではVariablesの使い方などは説明しませんので、知りたい方は公式のチュートリアルをご覧ください。

- [Create and manage variables – Figma Learn - Help Center](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables)

# なぜ移行したのか？

Tokens Studio for Figmaは素晴らしいプラグインであり、Variablesが登場するまではFigmaでデザイントークンを管理したり、開発者とやりとりするには欠かせないツールでした。しかし、以下に挙げるいくつかの理由によりVariablesの方が優れていると判断したため、移行することにしました。

## 適用するために毎回起動する必要がある

Tokens Studio for Figmaはプラグインであり、Figmaのファイルごとに起動する必要がありました。また、起動するのに地味に時間がかかるため、若干利用にストレスがかかる環境であることは否めませんでした。

![[20231220192716.png]]

ファイル内で起動したTokens Studio for Figma

VariablesはFigmaに内蔵されているため何かを起動したりする必要がなく、**Figmaを使える人であれば誰でもすぐに使うことができます**。

## 動作が不安定

デザイントークンの名前やプロパティを一括変更する処理をしたり、複数のノードのテーマを切り替えたりすると処理が重くなりFigmaが固まってしまったり、最悪クラッシュしてしまうことがありました。これも頻繁に行うタスクではないとはいえストレスでした。

![[20231220193035.png]]

一括処理に時間がかかる

また、SpacingやGapなどDimension周りの適用の動作が怪しく、適用処理を行っても正しく適用されていないこともしばしばありました。

Variablesも公開された変更を適用する一括処理はそれなりに重いとは思いますが、それでもPlugin API経由でリクエストしている分、**体感ではありますがTokens Studioの方が重いと感じました**。

## セットアップ&学習への障壁がある

スマートバンクではGitHubで管理しているデザイントークンをTokens Studio for Figmaに自動でSyncする形の運用を行っていました。そのため、Tokens Studio for Figmaを利用するデザイナーは全員GitHubのPersonal Access Tokenなどのセットアップが必要になり、**GitHubに慣れていないメンバーには障壁が高いものとなっていました**。

![[20231220193151.png]]

GitHubとのSyncにはPersonal Access Tokenなどの設定が必要

また、Figma本体に沿わない独自のトークンの型があるため理解が難しかったり、あくまでプラグインのため「この操作を覚えても将来役に立たないかもしれない」という**心理的ハードルがあったように思います**。

# 移行に伴ってやったこと

上記のような理由でTokens Studio for FigmaからVariablesに移行することを決めたわけですが、それに伴ってやったことを紹介します。

## 1. プラグインを作成してJSONを使ってGitHubとSyncできるようにする

2023年12月20日現在Figmaは公式でGUIによるVariablesのJSONインポートに対応していません。[エンタープライズプラン](https://www.figma.com/ja/enterprise/plan/)に申し込むとREST API経由でのインポートを行えるようですが、スマートバンクのFigmaアカウントはプロフェッショナルプランのため利用できません。

### Figma公式によるREST APIを使ってVariablesをGitHubとSyncする解説動画

また、公式でGUIによるインポートに対応していない理由としては、上記のようなビジネス的な理由以外に、現在W3Cの[Design Tokens Community Group](https://www.w3.org/community/design-tokens/)が仕様策定中の[Design Tokens Format Modules](https://design-tokens.github.io/community-group/format/)でダークモードなどのテーマの扱いの方向性が定まっていないことが考えられます。

[github.com](https://github.com/design-tokens/community-group/issues/210)

そのため、プロフェッショナルプランでも使えるPlugin API経由でインポートするためのプラグインを独自に開発するしかありません。そこで[Friends of Figma Tokyo](https://friends.figma.com/tokyo/)が主催する[Figma プラグイン開発もくもく会](https://friends.figma.com/events/details/figma-tokyo-presents-figma-puraguinkai-fa-mokumokuhui-figmaohuisu-in-wan-nonei-vol2/)に参加し、スマートバンクに最適なVariablesをインポートするためのプラグインを開発することにしました。

![[20231220193547.png]]

完成したPluginをFigmaプラグイン開発もくもく会で発表しました

やったこととしては[公式が提供しているVariablesをインポート、エクスポートするためのプラグインのサンプルコード](https://github.com/figma/plugin-samples/tree/master/variables-import-export)を改変し、以下の3つの仕様を追加したことです。

1. [Native modes and theming support](https://github.com/design-tokens/community-group/issues/210)で提案されているフォーマットでライトモード、ダークモードそれぞれのデザイントークンを扱えるようにする 
    - 仕様が変わる可能性が高いが、Figma内部の方の提案であり、これが一番当たりは良さそうなので採用した
2. 公式のサンプルではVariablesを「作成」できるが、「更新」ができないため更新できるようにする
3. GitHubからインポートできるようにする

1と2に関しては拙著『[デザイントークンのつくりかた](https://putchom.square.site/shop/-/2)』にて方法を解説しているのと、3に関しては本記事の範疇を超えるので詳しい解説はしませんが、概ね上記のような対応を行いました。

[putchom.square.site](https://putchom.square.site/product/how-to-create-design-tokens-pdf/2?cp=true&sa=false&sbp=false&q=false&category_id=2)

とはいえ、実際に運用してみると、スマートバンクのデザイントークンもそれなりに成熟し、そこまで頻繁に更新があるわけではないので、**今となってはインポートに関してはプラグイン経由ではなく手動運用でも良いかなと考えています**。（Variablesの仕様や仕組みに詳しくなったのは良かったですが）

上記のような理由でこのプラグインを運用し続けるモチベーションは薄いので、会社を成長させてエンタープライズプランに契約してREST APIを使えるようにするか、Figmaが公式にGUIによるインポートに対応するのを待ちたいと思います。

## 2. デザイントークンのファイルにインポートしてライブラリとして公開する

![[20231220193754.png]]

スマートバンクのデザイントークンを管理・閲覧するためのファイル群

1で作成したプラグインを使い、デザイントークンを管理・閲覧するためのFigmaファイルにデザイントークンをLocal Variablesとしてインポートします。

![[20231220193850.png]]

インポートされたColorのデザイントークン

そして、それらをライブラリとして公開して他のファイルで使用できるようにします。トークンの型ごとにそれぞれファイルを分けている理由としては**公開された変更を適用する際に今どの型のデザイントークンを適用しているのか認識しやすくなるため**です。

## 3. 各種コンポーネントやマスターデータにVariablesを適用していく

そして、VariablesをFigmaの各コンポーネントに適用していきます。Tokens Studio for Figmaを起動して同じトークンが適用されているノードをInspect機能で一括選択し、それらに該当するVariablesの同じトークンを適用してTokens Studio for Figmaのトークンのメタデータを剥がしていきます。

Tokens Studio for FigmaのInspect機能（Tokens Studio for Figmaの公式ドキュメントより引用）

困ったこととしては最近のアップデートでTokens Studio for Figmaのトークンのメタデータを剥がしたときにスタイルも一緒に消えてしまうようになったことです。（これまではトークンのメタデータを剥がしてもスタイルはそのまま維持されていた）

なので、一度Tokens Studio for Figmaのトークンのメタデータを剥がしたあとスタイルが消えて透明になってしまったコンポーネントにVariablesを当てていくという脳の負荷が高い作業を行うことになりました…つらい…。

作業時点でVariablesがTypographyやGradientなどの型に対応していなかったり、Layer opacityやStroke weightプロパティへの適用に対応していなかったため、**Typography型のトークンはText Stylesに、Gradient型のトークンはColor Stylesにそれぞれ用意し、Layer opacityとStroke weightプロパティは管理するのを一旦諦めることにしました**。

また、スマートバンクでは複雑な画面遷移を把握しやすくするために、Figmaで画面遷移のマスターデータを管理しています。そのマスターデータには画面独自の実装もあり、そこに使われている独自のコンポーネントにもデザイントークンが使用されているため同じように適用を行っていきました。

![[20231220194055.png]]

B/43のモックアップマスターデータ。ツリーで画面遷移を表現している。

# 移行してよかったこと

ほぼ最初の課題の裏返しですが、移行して以下のような良い面がありました。

## セットアップや起動が不要

プラグインを起動しなくてもFigmaが使えればVariablesを通してテーマを持つセマンティックなデザイントークンを扱えるようになり、デザイナーだけでなくPMやエンジニアも含むあらゆる職種がデザイントークンを認識したり、使ったりする障壁をなくすことができました。

![[20231220194129.png]]

スマートバンクで使えるようになったColorのVariables

開発メンバーにも事前にVariablesに移行した際のハンドオフ方法について共有し、問題がないことを確認したため、移行したことによるプロダクト開発への影響もほぼなかったように思います。

## 動作が軽く安定している

デザイントークンの適用や更新にPlugin APIを介する必要がなくなったため、体感ですが動作が軽くなりました。また、Figma標準のライブラリ機能や公開の仕組みを使えるため、より安全に更新作業が行えるようになったと思います。

さらに、Tokens Studio for FigmaではInspectするだけでメタデータが更新されコンポーネントに差分が生まれてしまう問題もあったため、そこが解消されたのも地味に嬉しいポイントです。

# 今後の展望

先で述べたようにVariablesは2023年12月20日現在、Typography型に対応していなかったりB/43のアイデンティティの一つであるグラデーションを表現するためのGradient型に対応していません。しかし、現状以前より頻繁にデザイントークンに変更があるわけでもないため特に困ってはいません。

しかし、Typography型の対応は現在検討中とのことなので、内容次第ではありますがText Stylesから置き換える可能性はあります。

また、**Layer opacityやとStroke weightプロパティに関しては先日のFigmaのアップデートで適用できるようになったため、順次適用していく予定**です。

> Some updates to variables! You can now bind variables to:
> - Individual corner radius
> - Effects
> - Layer opacity
> - Layout grid
> - Nested instances
> - Stroke weight
> 
> Join our Q&A next week (Dec 13) to learn more → [https://t.co/pMWrtjLjpR](https://t.co/pMWrtjLjpR) [pic.twitter.com/QVFGjErnu2](https://t.co/QVFGjErnu2)
> 
> [December 6, 2023](https://twitter.com/figma/status/1732449424872534047?ref_src=twsrc%5Etfw)

# 採用情報

現在株式会社スマートバンクではプロダクトデザイナーを大募集中です！！！

Figmaを使って複雑になりがちなFintechのプロダクトをシンプルにスマートにしていくことに興味のある方の応募をお待ちしております〜！