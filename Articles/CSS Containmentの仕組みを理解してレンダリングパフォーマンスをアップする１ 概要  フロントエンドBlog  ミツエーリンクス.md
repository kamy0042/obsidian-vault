---
Created: 2024-01-20T19:12:00
URL: https://www.mitsue.co.jp/knowledge/blog/frontend/202311/28_1448.html
Tags: [topic/技術/CSS]
---
[Interop 2023](https://github.com/web-platform-tests/interop/blob/main/2023/README.md)の重点分野の中からWebページの表示性能に関わる[CSS Containment](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Containment)をご紹介します。

CSS Containmentには`contain`プロパティと`content-visibility`プロパティが定義されており、コンテンツの一部を独立したサブツリーとしてブラウザに認識させる「封じ込め」に関する指定ができます。「封じ込め」を行うと、ブラウザはレンダリング処理の一部を省略したり、必要なタイミングでレンダリングするようになります。結果、Webページのレンダリングパフォーマン向上につながります。

## レンダリングの基本的なフロー

CSS Containmentの理解を深めるためにレンダリングについて確認します。

以下のフローは[Blinkのレンダリングフロー](https://web.dev/articles/howbrowserswork?hl=ja#the_main_flow)を簡易的にまとめたものです。

1. Parsing
    - HTMLドキュメントを解析して、[DOM（Document Object Model）](https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model)ツリーを構築します。
2. Style
    - 外部CSSファイルとスタイル要素の両方にあるスタイルデータを解析します。
    - スタイルルールを作成します。
    - スタイルルールをカスケード順にプロパティに適用します。
    - [CSSOM（CSS Object Model）](https://developer.mozilla.org/ja/docs/Web/API/CSS_Object_Model)ツリーを構築します。
3. Layout（Reflow、配置）
    - DOMツリーとCSSOMツリーを結合し、レンダリングツリーを構築します。
    - 各ノードの画面に表示される位置やサイズを計算します。
4. Painting（描画）
    - 各ノードを背景色、背景画像、border、子孫要素、outlineの順に描画します。

詳しくは[ブラウザの仕組み](https://web.dev/articles/howbrowserswork?hl=ja)を参照ください。

## containプロパティ

ブラウザがCSSの`contain`プロパティの設定によりコンテンツの一部を独立したサブツリーとして認識し、コンテンツをサブツリーとそれ以外の部分に分けます。そして、`contain`プロパティの値([レンダリングのフロー](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#render)に沿った値)からレンダリングの仕方を決定します。

`contain`プロパティの値は以下です。

### none

封じ込めを適用しません。

### style

包含ブロック内※のスタイルと包含ブロック外のスタイルはそれぞれ独立するため、`counter()`や`quotes`などのブロックを跨いで使用できるようなプロパティでは、包含ブロック外と包含ブロック内とで別の計算になります。

- ※ Containプロパティを設定したブロックを包含ブロックと呼ぶこととします。

### size

包含ブロック内の子孫要素のサイズ計算を省略することで包含ブロック要素のサイズが固定されるため、包含ブロックのサイズが包含ブロック外のサイズ計算に影響を与えないようになります。

`size`が指定されたブロック要素は、`width`や`height`、`aspect-ratio`などの明示的なサイズ指定をしない限りサイズは0になります。

### layout

包含ブロックは独立した[整形コンテキスト](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_flow_layout/Introduction_to_formatting_contexts)となるため、包含ブロックを基準として要素が配置されます。

また[重ね合わせコンテキスト](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context#%E9%87%8D%E3%81%AD%E5%90%88%E3%82%8F%E3%81%9B%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)が構成されます。

### paint

包含ブロックは独立した整形コンテキストとなるため、包含ブロックを基準として要素が配置されます。

また重ね合わせコンテキストが構成されます。

包含ブロック内の子孫要素は包含ブロックの`padding`領域内でのみ描画され、パッディングの縁（下図参照）を超えた領域では描画されません。そのため包含ブロックがオフスクリーンの位置にある場合や非表示の場合は、包含ブロック内の要素も表示されません。

![[20231107_02.png]]

[MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)より引用。

### strict

`contain: size layout paint` の指定と同等です。

### content

`contain: layout paint`の指定と同等です。

## containプロパティのブラウザの互換性

## content-visibilityプロパティ

ブラウザがCSSの`content-visibility`プロパティの値からレンダリングの制御を決定します。

`content-visibility`プロパティの値は以下です。

### visible

通常通りのレンダリングになります。

### hidden

レンダリングがスキップされます。

フォーカスや選択が不可能になります。

### auto

レンダリングのStyle、Layout、Paintの封じ込めが有効になります。

必要になるまでレンダリングを遅延します。

フォーカスや選択は可能になります。

## content-visibilityプロパティのブラウザの互換性