---
タグ: []
作成日時: 2022-09-07T21:11:00
URL: https://speakerdeck.com/kodai3/figmaniokerumotukudetaguan-li-nogai-shan-an
Tags: [topic/ツール/Figma]
---
# Figmaにおけるモックデータ管理の改善案

[jQuery: Nuts, Bolts and Bling](https://speakerdeck.com/dougneiner/jquery-nuts-bolts-and-bling)

![[preview_slide_0 101.jpg]]

[A Tale of Four Properties](https://speakerdeck.com/chriscoyier/a-tale-of-four-properties)

![[preview_slide_0 102.jpg]]

[Statistics for Hackers](https://speakerdeck.com/jakevdp/statistics-for-hackers)

![[preview_slide_0 103.jpg]]

[Producing Creativity](https://speakerdeck.com/orderedlist/producing-creativity)

![[preview_slide_0 104.jpg]]

[Building Adaptive Systems](https://speakerdeck.com/keathley/building-adaptive-systems)

![[preview_slide_0 105.jpg]]

[10 Git Anti Patterns You Should be Aware of](https://speakerdeck.com/lemiorhan/10-git-anti-patterns-you-should-be-aware-of)

![[preview_slide_0 106.jpg]]

[Code Reviewing Like a Champion](https://speakerdeck.com/maltzj/code-reviewing-like-a-champion)

![[preview_slide_0 107.jpg]]

[XXLCSS - How to scale CSS and keep your sanity](https://speakerdeck.com/sugarenia/xxlcss-how-to-scale-css-and-keep-your-sanity)

![[preview_slide_0 108.jpg]]

## Transcript

1.  e r 直近の社内課題を元に始めたばかりです、全然完成していません! ・ より良いアイデアなど、FoFコミュニティのお力をぜひお貸しください！ ・
    ### [1 はじめに D i s c l a i m](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_3.jpg)
2.  n F i g m a 複数パターン検証を重ねるにあたって、同一ドメインデータを複数回入力する必要がある
    ### [1 Figma上でデータ入力が大変 P r o b l e m o](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_5.jpg)
3.  h e n P r ot ot y p i n g デザインに使用したデータをプロト実装に合わせて入力し直す必要がある
    ### [1 プロトタイプ作成時のデータ入力が大変 P r o b l e m w](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_6.jpg)
4.  h e n D e v e l o p i n g storybook駆動開発とSnapshot Testを実行するにあたって、理想に近いデータを再度入力する必要がある
    ### [1 実装時のデータ入力が大変 P r o b l e m w](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_7.jpg)
5.  h e n C l i e n t r e v i e w プロダクトの性質上、同一UIをクライアント様ごとの見え方で提供する必要がある GANMA! TIF
    ### [1 クライアント様への最適化が大変 P r o b l e m w](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_8.jpg)
6.  ・ エンジニアが、実装時・テスト時に入力するのが大変 ・ 価値ある検証をするために、より簡単に高品質のデータを利用したい ・
    ### [1 課題まとめ S u m u p デザイナーが、作成したUIごとに入力するのが大変 ・ デザインエンジニアが、プロトタイプ時に再度入力するのが大変](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_9.jpg)
7.  h e e t S y n c Google Spreadsheetでデータ管理することができる。
    ### [1 Spreadsheet Sync S p r e a d s](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_11.jpg)
8.  Spreadsheetで管理することができる ・ スプシよりは良いけど、ただのjsonか..... Jsonで管理することができる ・ 本物のデータ!! だけど、実装済みの機能にしか使えない.... 既存APIを使うことができる
    ### [1 既存の解決策まとめ S u m u p ・ だけど、エンジニア的にスプシ使うのはちょっと..... Google](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_14.jpg)
9.  t デザイナー、エンジニア共に使いやすいもの ・ ただデータを用意する以上の付加価値があるもの ・
    ### [1 何が欲しいか W h a t I w a n](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_16.jpg)
10.  i v e n フロントエンドとバックエンドが共通したドメインオブジェクトを扱う バックエンド フロントエンド
    ### [1 スキーマ駆動 S c h e m a D r](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_18.jpg)
11.  i v e n デザイナーも共通したドメインオブジェクトを扱えるとデータ管理以外のメリットも... デザイナー バックエンド フロントエンド
    ### [1 スキーマ駆動 S c h e m a D r](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_19.jpg)
12.  s w デザイナーとSchema駆動で開発できる環境をいかにして作ることができるか？
    ### [1 Figma msw (graphql) F i g m a m](https://files.speakerdeck.com/presentations/4d1a6a0e3ab64a7a8d980e96feea387a/slide_20.jpg)