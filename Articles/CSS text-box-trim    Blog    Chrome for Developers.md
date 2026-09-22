---
Created: 2025-02-14T00:55:00
URL: https://developer.chrome.com/blog/css-text-box-trim?hl=ja
Tags: [topic/技術/CSS]
---
テキスト コンテンツの上下にスペースを追加して、視覚的なバランスをとる。

Chrome 133 以降では、`text-box` を使用して、デベロッパーとデザイナーがテキストの上下のスペースを調整できるようになりました。

Browser Support

- 133
- 133
- x
- 18.2

**長文:**

**略称:**

このプロパティを使用すると、テキストの上下のスペースを制御できます（`<h1>`、`<button>`、`<p>` など）。フォントによって、このブロックの方向性のあるスペースの量が異なり、要素のサイズに影響します。この混沌とした空間の貢献は簡単に測定できず、これまでは制御不可能でした。

フォントが認識した、CSS も認識した

![](https://developer.chrome.com/static/blog/css-text-box-trim/text-box-intro.mp4?hl=ja)

[https://codepen.io/web-dot-dev/pen/xbKjRxL](https://codepen.io/web-dot-dev/pen/xbKjRxL)

フォント上とフォント下のスペースは、ウェブでのテキストのレイアウト方法（「ハーフ リーディング」）によるものです。この点については、[Matthias Ott](https://matthiasott.com/) による「[The Thing With Leading In CSS](https://matthiasott.com/notes/the-thing-with-leading-in-css)」という投稿で詳しく説明されています。基本的に、手作業で文字組を行っていた時代は、金属製の鉛片を使用して行を区切っていました。ウェブでは、その余白を半分に分割し、コンテンツの上と下に分散させます。

![](https://developer.chrome.com/static/blog/css-text-box-trim/half-leading_2880.png?hl=ja)

見出しのテキストの上下にホットピンクのバーが表示され、ハーフ リーダーが表示されています。

この履歴は意味があります。`text-box` には、上限と下限の各半分の名称が示されます。カットすることもできます。

`text-box` には先行技術もあります。Ethan Wang による「[Leading-Trim: The Future Of Digital Typesetting](https://medium.com/microsoft-design/leading-trim-the-future-of-digital-typesetting-d082d84b202)」というエキサイティングな投稿を覚えている方も多いでしょう。この投稿で `leading-trim`（以前の `text-box` の名前）が初めて紹介されました。

![](https://developer.chrome.com/static/blog/css-text-box-trim/gutenberg-leading-trim.gif?hl=ja)

テキストのトリミングは、[デザイナー向けの Figma とその「縦方向のトリミング」コントロール](https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties#h_01H96FW9Z3W7J7Z2HEN8V17BZT)から始めることができます。[この X の投稿では、この縦型トリム オプションの場所](https://x.com/figma/status/1640750882613493760)と、ボタンに役立つ方法について説明しています。

![](https://developer.chrome.com/static/blog/css-text-box-trim/figma-text-box-trim.mp4?hl=ja)

[ソース](https://x.com/figma/status/1640750882613493760)

どのようにしてここにたどり着いたかにかかわらず、この小さなタイポグラフィの調整は大きな違いを生む可能性があります。

## 機能と構文の概要

`text-box` を使用する際に必要となる、最も一般的な 1 行関数は次の 2 つです。

両方を `cap alphabetic` にトリミングするのが、この機能の最も一般的な用途です。次のデモでは、この方法を何度も使用します。ただし、前述の例では `ex alphabetic` も示されています。これは、独自の方法で光学バランスに役立つためです。

### Explorer のプレイグラウンド

次のデモでは、[構文を調べ](https://codepen.io/web-dot-dev/pen/RNbyooE)、プルダウン メニューを使用して結果を確認できます。フォントやオーバー トリムとアンダー トリムの値を変更したり、色分けされたビジュアルやラベルに沿って作業したりできます。

![](https://developer.chrome.com/static/blog/css-text-box-trim/syntax-explorer_2880.png?hl=ja)

構文エクスプローラのデモのスクリーンショット。フォントと、別のフォントを選択するためのプルダウンが表示されます。text-box: trim-both 大文字のアルファベット構文がハイライト表示された構文プレビュー。最後に、トリム値を選択するためのプルダウンが 3 つあります。

**試す方法:**

1. 単一行と複数行のテキスト バリアント間で `text-box-trim` がどのように機能するかを視覚的に検査する。
2. バリエーションにカーソルを合わせると、その効果に使用されているトリム値が表示されます。
3. フォントを変更する。
4. テキスト ボックスの片側のみを切り抜く。
5. プレイしながら構文を確認します。

![](https://developer.chrome.com/static/blog/css-text-box-trim/syntax-explorer.mp4?hl=ja)

[https://codepen.io/web-dot-dev/pen/RNbyooE](https://codepen.io/web-dot-dev/pen/RNbyooE)

## 何を構築できるか、どのような問題を解決できるか

このトリム機能には、よりシンプルな中央揃えと位置合わせのソリューションがいくつかあります。コンテンツ間に `gap` などの文字を使用して、適切な行頭を実現することもできます。

![](https://developer.chrome.com/static/blog/css-text-box-trim/leading_2880.png?hl=ja)

2 つのコンテンツ グループの比較が表示されます。最初のグループは半角先頭文字、2 番目のグループは先頭文字が切り詰められています。その結果、2 番目のグループはより密集した状態になります。

### 中央揃えが簡単

小さく、よりインラインで、コンテンツ固有のコンポーネントの場合は、すべての側面に均等な間隔を空けるために、要素に `padding: 10px` を指定するのが適切なスタイルです。ただし、上部と下部に余分なスペースが空いてしまうため、ユーザーが混乱する可能性があります。

これを回避するために、デベロッパーは、半角の行間の効果を相殺するために、上部と下部（ブロック）のパディングを明示的に減らすことがよくあります。

この時点では、視覚的に中央に配置されるまで値の組み合わせを試す必要があります。ある画面とオペレーティング システムでは見栄えがよく、別の画面とオペレーティング システムでは見栄えが悪い場合があります。

`text-box` を使用すると、テキストから半角スペースを削除できるため、`10px` のような均等なパディング値が便利になります。

![](https://developer.chrome.com/static/blog/css-text-box-trim/centering_2880.png?hl=ja)

2 つの例を示します。1 つ目は、パディング: 10px と半分の行間を持つ要素を示しています。2 つ目は、text-box: trim-both cap alphabetic を指定した同じ要素を示しています。その結果、2 つ目のボタンが視覚的に中央に配置されます。

以下に、`text-box` でスペースをトリミングして、実用的なインタラクティブな要素で `padding: 10px` の四辺を均等に見せる方法を示す `<button>` 要素をいくつか示します。代替フォントによって、ハーフ リーディングのスペースが大きく異なることに注目してください。

![](https://developer.chrome.com/static/blog/css-text-box-trim/buttons_2880.png?hl=ja)

3 つのボタンのグループが表示されます。最初のグループは、通常のサンセリフ フォントを示しています。2 つ目のグループには、凝ったフォントや楽しいフォントが表示されます。3 つ目のグループは、同じ効果ですが手書きフォントを使用しています。各フォントには異なるハーフ リーディング スペースがありますが、トリム値は同じで、スペースを正規化できることを示しています。

以下は、カテゴリやバッジの表示によく使用される `<span>` 要素です。左右対称の余白が最適なソリューションである場合もありますが、`text-box` までは回避策を講じなければなりませんでした。

![](https://developer.chrome.com/static/blog/css-text-box-trim/tags_2880.png?hl=ja)

タグが並べて表示されます。最初のグループは半角先頭文字、2 番目のグループは先頭文字が切り詰められています。その結果、2 番目のグループはより密集し、光学的に中央に配置されます。

### 調整が容易

テキスト ボックスの上（`over`）と下（`under`）に余分な、制御不能な半角スペースが挿入されるため、調整が難しくなります。次の例は、半角の行間設定で配置が難しくなる場合と、テキスト ボックスのブロックの側面を切り詰めて配置を改善する方法を示しています。

画像がテキストの横に配置されています。画像はテキストに必要な高さまで拡大されますが、`text-box` がないと、画像は常に少し高くなります。`text-box` を使用すると、画像をテキスト コンテンツと完全に揃えることができます。

![](https://developer.chrome.com/static/blog/css-text-box-trim/trimmed-half-leading-for-alignment_2880.jpg?hl=ja)

[https://codepen.io/web-dot-dev/pen/yyBjVpg](https://codepen.io/web-dot-dev/pen/yyBjVpg)

行折り返しが設定されている場合、空白文字は、最初の書式設定されたテキスト行の上に、最後の書式設定されたテキスト行の下に配置されます。

次の例では、[`writing-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) の変更に特徴が[論理的に適応する](https://web.dev/learn/css/logical-properties?hl=ja)方法に注目してください。テキストを変更して、レイアウトがどのように整列されたままになるかを確認します。

![](https://developer.chrome.com/static/blog/css-text-box-trim/super-rad-design_2880.png?hl=ja)

[https://codepen.io/web-dot-dev/pen/dPbeOJQ](https://codepen.io/web-dot-dev/pen/dPbeOJQ)

## 調査を続ける

詳しくは、次のリンクリストでは、さまざまな追加情報とユースケースを確認できます。

- [https://codepen.io/collection/zxQBaL](https://codepen.io/collection/zxQBaL) - 上記のすべてのデモの Codepen コレクション
- [https://github.com/jantimon/text-box-trim-examples](https://github.com/jantimon/text-box-trim-examples) - Jan Nicklas による優れた調査とデモ
- [https://css-tricks.com/two-css-properties-for-trimming-text-box-whitespace/](https://css-tricks.com/two-css-properties-for-trimming-text-box-whitespace/)
- [https://drafts.csswg.org/css-inline-3/#text-edges](https://drafts.csswg.org/css-inline-3/#text-edges)
- `size-adjust` や `ascent-override` と混同しないでください。https://web.dev/articles/css-size-adjust
- [https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/](https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/)
- [https://css-tricks.com/two-css-properties-for-trimming-text-box-whitespace/](https://css-tricks.com/two-css-properties-for-trimming-text-box-whitespace/)
- 多くの HTML 要素に適用 [https://codepen.io/nileshprajapati/pen/RweKdmw](https://codepen.io/nileshprajapati/pen/RweKdmw)
- Safari のブログ投稿 [https://webkit.org/blog/16301/webkit-features-in-safari-18-2/](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/)
- [https://piccalil.li/blog/why-im-excited-about-text-box-trim-as-a-designer/](https://piccalil.li/blog/why-im-excited-about-text-box-trim-as-a-designer/)