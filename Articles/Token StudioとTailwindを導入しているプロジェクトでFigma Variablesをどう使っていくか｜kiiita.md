---
タグ: []
作成日時: 2023-09-08T15:27:00
URL: https://note.com/kiiita/n/n6438f96388c7
Tags: [topic/ツール/Figma]
---
![[rectangle_large_type_2_8c00c156f4b24c99b6424221f370de8d.png]]

こんにちは。UIデザイナーとフロントエンドエンジニアとしてフリーランスでお仕事をさせていただいている北國です。

今携わっているプロジェクトが複数ありますが、以下のようなプロジェクトが多いです。

- FigmaにToken Studioプラグインを導入している
- Webフロントエンド開発にTailwind CSSを導入している
- 双方において、デザイントークンをベースとした設計・管理をしている

2023年6月のFigma Configにて発表された新機能の中にVariablesという機能があります。Token Studioを使っているプロジェクトでは、Token StudioとVariablesの役割分担を考える必要が出てきました。

今後の方向性の候補は3つです。

- このままToken Studioを基幹としてデザイントークンを管理する
- Variablesにすべて移行する
- Token StudioとVariablesを併用する

どの方向性で進めていくか検討するために、Variables機能が公開されてから1数日ですが、UIデザイナーとフロントエンドエンジニアの両方の視点から、自分の手元で触ってみた感想をまとめてみます。

## 目次

## 結論

本題に入る前にまず現時点での自分の結論です。

**今後の方針は、基本的にはToken Studioから脱却し、Variablesに寄せていくのが良いのではないか、と思っています。**Variablesの次のアップデートまではToken Studioを併用し、アップデートが来たら100% Variablesに移行できるのかな、と想定しています。

細かい理由は後述しますが、大雑把にいえばToken StudioでできていることのおおよそのことがVariablesで実現でき、UIデザイナー視点では、Token Studioのパネルよりも操作性が良く、エンジニア視点では、Dev Modeの操作性がToken Studioに勝ると感じたためです。

## Token StudioとFigma Variableのできること・できないこと

現時点でそれぞれの機能でできること・できないことを整理すると以下のようになります。

### Token StudioもFigma Variableもできること

- 色のトークン管理
- 寸法系のトークン管理

### Figma Variablesでしかできないこと

- Dev Modeでのプロパティの閲覧
- 各トークンの状態(mode)管理

### Token Studioしかできないこと

- タイポグラフィやShadow、ボーダー等のトークン管理
- tailwind.configとの同期

## タイポグラフィやShadowのトークン管理について

現時点では、タイポグラフィのトークンをVariablesに登録することはできません。つまりtext-sm, text-baseのような変数を管理できないため、この点においてはToken Studioに軍配が上がります。

ただ、現時点では4つのプロパティ以外にVariablesは適用できないですが、[Figma LearnのComing Soon](https://help.figma.com/hc/en-us/articles/4406787442711-Figma-beta-features)に記載がある通り、タイポグラフィプロパティや画像プロパティにもVariablesが適用できるようになる予定らしいので、近々この問題は解消されそうです。

## tailwind.configとの同期について

- Token Studio(と各種ライブラリ)を使えば、Token Studio上でのtokenの変更をtailwind.configに同期が自動化できる。一方、Figma variablesにはGitHubとの連携はないため、同期は自動化できない。
- とはいえ、Token Studio + Style Dictionary + GitHub Actionsの設定をしてtokenとconfigの同期の自動化をするメリットと、今回のFigma variablesを使ってDev modeでの開発のメリットを比較すると悩ましいものがある。
- Token Studioを使ってtokenを自動化の設定をすれば、Token Studio側での変更をtailwind.configに同期ができるし、その逆もできる。つまり、もしコード側でconfigの変更があった場合には、Figmaにも反映される。
- しかし、tokenの変更というデザインシステムに影響の大きい変更というものは、プロジェクトを運用していく過程で実際にはそこまで発生しない。デザイナーとエンジニア間で連携し、手動で変更内容を同期すれば十分にカバーできる。

## デザイナー視点だとどちらが使いやすいか

Token StudioのUIには癖があって使いづらいと感じるケースが割とありました。Variablesと比較すると、Variablesの方が使いやすいと感じています。

Token Studioはプラグインなのでパネルが出てきて画面を専有しますし、若干buggyな箇所もあったりするので。

## 開発者目線だとどちらが使いやすいか

- Dev modeの方がトータルでは使いやすい
    - **特にSpacingはコンポーネント上に直接変数が表示されるので、Token Studioのパネルをみるより圧倒的に使いやすそう**
- テキストのスタイルに関してはToken Studioの方が見やすいが、Dev modeでもめちゃくちゃ見づらいわけではない
    - Dev modeの場合、font-[14px]のように表示されるので、頭の中でfont-smに変換は必要。
    - **ただし、これも上述の通り次のアップデート等でタイポグラフィのVariables化ができれば解消されそう**

```plain text
// Dev modeでテキストのスタイルはこのように表示される

// タイトル
text-gray-500
text-[20px]
font-bold
leading-tight
---
// リード文
text-gray-400
text-[14px]
font-normal
leading-snug
```

- 使いやすさとは違うが、Dev modeだと開発者は課金しなくてよい(少なくとも2023年中は)
    - Token Studioを開発者が使う場合、Editor権限が必要になるので課金しないといけない

というわけで、今後のFigmaのアップデートを考慮すると、徐々にToken Studioからは脱却していっても良いのかな、という感想です。開発者視点では、Dev Modeがだいぶ使いやすいなあと感じる面が多々ありました。もう少しここをこうしてほしいみたいな細かい要望もありましたが、今後のアップデートに期待です！