---
タグ: []
作成日時: 2024-04-26T12:38:00
URL: https://azukiazusa.dev/blog/input-type-checkbox-switch/
Tags: [topic/アクセシビリティ, topic/デザイン/UIデザイン]
---
![](https://images.ctfassets.net/in6v9lxmm5c8/7JMBg7AGfyKjOq5A9IKtCB/6b734f49345ec2e4d71a1f3136154b30/christmas_tonakai_5266.png?q=50&fm=webp&w=1200)

input 要素の switch 属性は 2023 年 12 月現在実験的に実装されている機能です。将来的に仕様が変更される可能性があります。

[スイッチ](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) とは、オンとオフの 2 つの状態を持つ UI コンポーネントのことです。チェックボックスとよく似ていますが、スイッチは第 3 の状態である[未確定の状態](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/checkbox#%E6%9C%AA%E6%B1%BA%E5%AE%9A%E7%8A%B6%E6%85%8B%E3%81%AE%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9)持たないという点が異なります。

このスイッチ UI は多くのウェブサイトで利用されているものの、HTML の標準要素としては存在していませんでした。そのため多くの開発者は、スイッチ UI を実装するために独自の実装を行っていましたが、このような独自の実装はアクセシビリティの問題を引き起こす可能性がありました。

この問題を解決するために、WHATWG により `input[type="checkbox"]` 要素に `switch` 属性を追加することが提案されました。この属性を指定することで、チェックボックスをスイッチ UI として利用できるようになります。

![](https://opengraph.githubassets.com/10872d098aa515b79f4ff05c8b56b1f6d23993fc2da0fa9df01a2e95011cc824/whatwg/html/pull/9546)

この提案は現在 [Safari Technology Preview 185](https://developer.apple.com/documentation/safari-technology-preview-release-notes/stp-release-185#HTML) にのみ実験的に実装されています。

## スタイリング

`<input type="checkbox">` 要素に `switch` 属性を指定した場合、ブラウザのデフォルトのスタイルが適用されスイッチ UI として表示されます。

スイッチ UI はウェブコンポーネントとして実装されており、`thumb` と `track` という 2 つのパーツで構成されています。`thumb` はスイッチのハンドル部分で、`track` はスイッチの背景部分です。これらのパーツはそれぞれ `::thumb` と `::track` という疑似要素を使ってスタイルを指定できます。

`::thumb` と `::track` 疑似要素を使用したスタイリングは 2023 年 12 月現在、Safari Technology Preview 185 で、Develop > Feature Flags... から「:thumb and ::track pseudo-elements」を有効にすることで利用できます。

チェックボックスなどと同じく、スイッチ UI のデフォルトのスタイルを変更しカスタマイズしたい場合には、`appearance: none` を指定してデフォルトのスタイルを無効化する必要があります。スイッチがオンの場合のスタイルは `:checked` 疑似クラスを使って指定できます。

### スイッチの色の変更

スイッチの見た目を大きくカスタマイズせずに、色の変更だけを行いたい場合には、[accent-color](https://developer.mozilla.org/ja/docs/Web/CSS/accent-color) プロパティを使うことで簡単に実現できます。

`color-scheme: dark;` を指定することで、スイッチの背景色をダークモードに最適な配色に変更できます。

## アクセシビリティ上の考慮事項

`input[type="checkbox"]` 要素に `switch` 属性を指定すると、デフォルトのロールが [switch](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/switch_role) に変更されます。また `checked` 属性が `true` の場合には、スイッチがオンの状態であることがアクセシビリティツリーに伝えられます。

チェックボックスと同等のキーボード操作もサポートされています。フォーカスが当たっている状態でスペースキーを押すと、チェックボックスと同様に `checked` 属性の値がトグルされます。

アクセシビリティ上の注意点として、2023 年 12 月現在ではスイッチにフォーカスした際にデフォルトでフォーカスリングが表示されないようです。このため、スイッチにフォーカスした際にはフォーカスリングを表示するように CSS で指定する必要があります。

## 未確定の状態（`indeterminate`）のサポート

`input[type="checkbox"]` 要素には `indeterminate` 属性を指定することで、未確定の状態を表すことができます。この属性は HTML から設定できず、JavaScript から HTMLInputElement オブジェクトの `indeterminate` プロパティを使用して設定する必要があります。

未確定の状態のチェックボックスは多くのブラウザでチェックボックス内に水平線が表示されるようになっています。また [:indeterminate](https://developer.mozilla.org/ja/docs/Web/CSS/:indeterminate) 疑似クラスを使って、未確定の状態のチェックボックスにスタイルを適用できます。

この `:indeterminate` 疑似クラスは以下の要素を対象としています。

- `<input type="checkbox">` 要素で、JavaScript によって `indeterminate` プロパティが `true` に設定されている場合
- `<input type="radio">` 要素で、フォーム内の同じ `name` の値を持つすべてのラジオボタンが未選択である場合
- `<progress>` 要素で、中間の状態の場合

ただし冒頭で述べた通り、スイッチ UI はチェックボックスと異なり未確定の状態を持つことはありません。つまり `<input type="checkbox">` 要素であっても、`switch` 属性を指定されている場合 `indeterminate` プロパティが `true` に設定されいたとしても `:indeterminate` 疑似クラスは適用されません。

## `<switch>` 要素としての提案

この記事では `input[type="checkbox"]` 要素に `switch` 属性を指定することでスイッチ UI を実装する方法を紹介しましたが、[Open UI](https://open-ui.org/) では `<switch>` 要素を提案しています。

この提案は WHATWG によるものに対して異なるアプローチであると述べられています。

`<switch>` 要素は以下のようにシンプルに実装できます。

または、スロットを用いることでカスタマイズが可能です。

大きな違いとしては、thumb にアイコンを指定したい場合に `background-image` を使うのではなく、`<thumb>` 要素の中に直接 `<svg>` 要素を記述することでアイコンを指定する点が挙げられています。これはアイコンに対して `currentColor` を指定できるという利点があります。

他にも track に国際化されたテキストを埋め込みたい場合にも、CSS を使わずに `<track>` 要素に対して直接テキストを記述できるという利点があります。

一方で、`input[type="checkbox"]` 要素に `switch` 属性を指定する方法は、古いブラウザに対しても下位互換性が維持されるという利点があると言えるでしょう。

## まとめ

- `input[type="checkbox"]` 要素に `switch` 属性を指定することでスイッチ UI を実装できる
- `switch` 属性によりスイッチを実装するメリットは、スイッチ UI が標準の HTML 要素として実装されることで、アクセシビリティの問題を引き起こす可能性が低くなること
- スイッチは `thumb` と `track` という 2 つのパーツで構成されていて、それぞれに対して疑似要素によりスタイルを指定できる
- whatwg による `input[type="checkbox"]` 要素に `switch` 属性を指定する提案と、Open UI による `<switch>` 要素の提案がある