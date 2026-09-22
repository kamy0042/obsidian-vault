---
タグ: []
作成日時: 2023-03-23T13:49:00
URL: https://a11y-guidelines.ameba.design/
Tags: [topic/アクセシビリティ]
---
![[default.png]]

Ameba Accessibility Guidelinesは、Amebaのサービスを利用するユーザーの「誰もがいつでも迷わずコンテンツを楽しむことができる」ようにするための、制作指針集である。

Amebaのサービスに携わるコンテンツや開発者は、高品質なサービスを提供するため、ガイドラインに沿った制作/開発を**強く推奨する。**

## [対象となるサービス](https://a11y-guidelines.ameba.design/#%E5%AF%BE%E8%B1%A1%E3%81%A8%E3%81%AA%E3%82%8B%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9)

本ガイドラインに準拠するサービス一覧。 各サービス毎に、アクセシビリティ改善プロジェクトの目的と対象とする範囲を定義する。

- [アメブロ](https://a11y-guidelines.ameba.design/services#%E3%82%A2%E3%83%A1%E3%83%96%E3%83%AD)

## [各項目の構成](https://a11y-guidelines.ameba.design/#%E5%90%84%E9%A0%85%E7%9B%AE%E3%81%AE%E6%A7%8B%E6%88%90)

- 適合レベル
- 達成基準を対応する目的と意義、対応すると得られるメリットなど
- 具体例
- 実装方法
- テスト・チェック方法
- 参考文献

## [目次](https://a11y-guidelines.ameba.design/#%E7%9B%AE%E6%AC%A1)

WCAG2.1に記載の項目のうち、Amebaブランドのサービスで準拠すべき項目。（※WCAG2.1の項目は、追加作業中）

### [適合レベルとは](https://a11y-guidelines.ameba.design/#%E9%81%A9%E5%90%88%E3%83%AC%E3%83%99%E3%83%AB%E3%81%A8%E3%81%AF)

各項目を達成するアクセシビリティ上の重要度を示す指標である。[WCAG 2.1の適合レベル](https://waic.jp/docs/WCAG21/#cc1)は、以下のようにレベルA、レベルAA、レベルAAAの3つに分類されている。

### [1. 知覚可能](https://a11y-guidelines.ameba.design/#1.-%E7%9F%A5%E8%A6%9A%E5%8F%AF%E8%83%BD)

### 1.1 代替テキストを提供する

- [1.1.1 画像に代替テキストを提供する](https://a11y-guidelines.ameba.design/1/1/1/)A

### 1.2 動画・音声に代替コンテンツを提供する

- [1.2.1 収録済みの動画に代替コンテンツを提供する](https://a11y-guidelines.ameba.design/1/2/1/)A

### 1.3 様々な方法・環境で利用できる

- [1.3.1 情報や関係性を明確にする](https://a11y-guidelines.ameba.design/1/3/1/)A
- [1.3.2 意味のある順序でコンテンツを表現する](https://a11y-guidelines.ameba.design/1/3/2/)A
- [1.3.3 感覚的な特徴だけで説明しない](https://a11y-guidelines.ameba.design/1/3/3/)A
- [1.3.4 表示の向きを固定しない](https://a11y-guidelines.ameba.design/1/3/4/)AA
- [1.3.5 入力目的を特定できる](https://a11y-guidelines.ameba.design/1/3/5/)AA

### 1.4 判別できる（見やすく、聞きやすく、区別しやすく）

- [1.4.1 色だけで伝えない](https://a11y-guidelines.ameba.design/1/4/1/)A
- [1.4.2 音声を制御できるようにする](https://a11y-guidelines.ameba.design/1/4/2/)A
- [1.4.3 テキストや文字画像のコントラストを確保する](https://a11y-guidelines.ameba.design/1/4/3/)AA
- [1.4.4 テキストサイズを拡大縮小できる](https://a11y-guidelines.ameba.design/1/4/4/)AA
- [1.4.7 音声コンテンツを背景音で邪魔しない](https://a11y-guidelines.ameba.design/1/4/7/)AAA
- [1.4.8 テキストの可読性を担保する](https://a11y-guidelines.ameba.design/1/4/8/)AAA
- [1.4.10 リフローできる](https://a11y-guidelines.ameba.design/1/4/10/)AA
- [1.4.13 ホバーまたはフォーカスで表示されるコンテンツを制御できる](https://a11y-guidelines.ameba.design/1/4/13/)AA

### [2. 操作可能](https://a11y-guidelines.ameba.design/#2.-%E6%93%8D%E4%BD%9C%E5%8F%AF%E8%83%BD)

### 2.1 キーボードで操作ができる

- [2.1.1 キーボード、タッチデバイスで操作できる](https://a11y-guidelines.ameba.design/2/1/1/)A
- [2.1.2 キーボード操作を可能にする](https://a11y-guidelines.ameba.design/2/1/2/)A
- [2.1.4 単一文字キーのショートカットを解除、回避、限定できる](https://a11y-guidelines.ameba.design/2/1/4/)A

### 2.2 十分な時間がある

- [2.2.1 コンテンツに制限時間を設けない](https://a11y-guidelines.ameba.design/2/2/1/)A
- [2.2.2 動く、自動更新するコンテンツに配慮する](https://a11y-guidelines.ameba.design/2/2/2/)A
- [2.2.4 コンテンツの更新を中断または延期できる](https://a11y-guidelines.ameba.design/2/2/4/)AAA

### 2.3 発作を防止する

- [2.3.1 画面の点滅を防止する](https://a11y-guidelines.ameba.design/2/3/1/)A
- [2.3.3 ユーザー操作で起きるアニメーションを無効にできる](https://a11y-guidelines.ameba.design/2/3/3/)AAA

### 2.4 ナビゲーションできる

- [2.4.1 重複する情報をスキップできるようにする](https://a11y-guidelines.ameba.design/2/4/1/)A
- [2.4.2 ページの主題がわかるタイトルを設定する](https://a11y-guidelines.ameba.design/2/4/2/)A
- [2.4.3 適切なフォーカス順序にする](https://a11y-guidelines.ameba.design/2/4/3/)A
- [2.4.4 リンクの目的を理解できるようにする](https://a11y-guidelines.ameba.design/2/4/4/)A
- [2.4.5 コンテンツへの到達手段を複数用意する](https://a11y-guidelines.ameba.design/2/4/5/)AA
- [2.4.6 見出しやラベルは、主題または目的を説明する](https://a11y-guidelines.ameba.design/2/4/6/)AA
- [2.4.7 フォーカスを見えるようにする](https://a11y-guidelines.ameba.design/2/4/7/)AA
- [2.4.8 現在位置を確認できる](https://a11y-guidelines.ameba.design/2/4/8/)AAA
- [2.4.10 各セクションに見出しをつける](https://a11y-guidelines.ameba.design/2/4/10/)AAA

### 2.5 入力方法

- [2.5.1 ポインタジェスチャを必須としない](https://a11y-guidelines.ameba.design/2/5/1/)A
- [2.5.2 ポインタ操作のキャンセルができる](https://a11y-guidelines.ameba.design/2/5/2/)A
- [2.5.3 表示するラベルが実装上のテキストに含まれている](https://a11y-guidelines.ameba.design/2/5/3/)A
- [2.5.4 動きによる操作以外でも操作を可能にする](https://a11y-guidelines.ameba.design/2/5/4/)A
- [2.5.5 ターゲットのサイズを理解する](https://a11y-guidelines.ameba.design/2/5/5/)AAA

### [3. 理解可能](https://a11y-guidelines.ameba.design/#3.-%E7%90%86%E8%A7%A3%E5%8F%AF%E8%83%BD)

### 3.1 読みやすい

- [3.1.1 ページの言語を指定する](https://a11y-guidelines.ameba.design/3/1/1/)A
- [3.1.3 一般的でない用語は補足説明をする](https://a11y-guidelines.ameba.design/3/1/3/)AAA
- [3.1.5 難しい文章表現を避ける](https://a11y-guidelines.ameba.design/3/1/5/)AAA

### 3.2 予測できる

- [3.2.1 フォーカス時にコンテンツを大きく変更しない](https://a11y-guidelines.ameba.design/3/2/1/)A
- [3.2.2 入力時に予測できない変化を起こさない](https://a11y-guidelines.ameba.design/3/2/2/)A
- [3.2.3 ナビゲーションの位置を統一する](https://a11y-guidelines.ameba.design/3/2/3/)AA
- [3.2.4 一貫した識別性を持たせる](https://a11y-guidelines.ameba.design/3/2/4/)AA

### 3.3 入力しやすい、間違いにくい

- [3.3.1 エラーを特定できる](https://a11y-guidelines.ameba.design/3/3/1/)A
- [3.3.2 入力項目にラベルまたは説明をつける](https://a11y-guidelines.ameba.design/3/3/2/)A
- [3.3.3 エラーの修正を提案する](https://a11y-guidelines.ameba.design/3/3/3/)AA
- [3.3.4 入力時のエラーを回避できる](https://a11y-guidelines.ameba.design/3/3/4/)AA
- [3.3.5 状況に応じたヘルプが利用できる](https://a11y-guidelines.ameba.design/3/3/5/)AAA

### [4. 堅牢性](https://a11y-guidelines.ameba.design/#4.-%E5%A0%85%E7%89%A2%E6%80%A7)

### 4.1 互換性を保つ