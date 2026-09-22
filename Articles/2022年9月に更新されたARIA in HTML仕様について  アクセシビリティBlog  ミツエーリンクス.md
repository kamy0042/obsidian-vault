---
タグ: []
作成日時: 2024-01-20T16:52:00
URL: https://www.mitsue.co.jp/knowledge/blog/a11y/202211/14_0910.html
Tags: [topic/アクセシビリティ/WAI-ARIA]
---
![[img-default 3.png]]

少し古い話ですが、[2021年12月に勧告となったARIA in HTML](https://www.w3.org/TR/2021/REC-html-aria-20211209/)について、[2022年9月27日付けのARIA in HTML](https://www.w3.org/TR/2022/REC-html-aria-20220927/)が勧告として発行されました。（過去の関連記事：[ARIA in HTML仕様が勧告案に](https://www.mitsue.co.jp/knowledge/blog/a11y/202110/01_0905.html)、仕様の参考日本語訳：[ARIA in HTML 日本語訳](https://momdo.github.io/html-aria/)）

前回の勧告からの最も大きな変更点は、[WAI-ARIA 1.2](https://www.w3.org/TR/2021/CRD-wai-aria-1.2-20211208/)（[参考日本語訳](https://momdo.github.io/wai-aria-1.2/)）ベースの仕様になったことが挙げられるでしょう。これにより、WAI-ARIA 1.1から追加されたロールや、ステートおよびプロパティの考え方などがARIA in HTMLに取り入れられています。

追加されたロールとしては、例えば、`time`要素には`time`ロールが暗黙のARIAセマンティックスとして設定されるようになっています。現時点でのWAI-ARIA 1.2について、WAI-ARIA 1.1からの主な変更点に関しては、過去の記事（[2019年末に更新されたWAI-ARIA 1.2について](https://www.mitsue.co.jp/knowledge/blog/a11y/202001/27_0916.html)）も参照してください。

さて、この2022年の勧告では、2021年の勧告からの技術的な修正や追加箇所に対して、紫色の背景色がスタイルとして設定されています。[4.1 Requirements for use of ARIA attributes to name elements](https://www.w3.org/TR/2022/REC-html-aria-20220927/#docconformance-naming)がセクション丸ごと追加されているのは目をひくところです。

セクション4.1では、`aria-*`属性においてNaming prohibited（名前付け禁止）の要件を追加しています。これは特定のロールを持つ要素に対して、アクセシブルな名前を付けることを禁止するものです。具体的なコード例を見てみましょう。

```plain text
<span aria-label="...">...<span>
```

上記のように、`aria-label`属性を用いて要素にアクセシブルな名前を付けるというテクニックがあります。しかし、現在のARIA in HTMLでは、`span`要素はNaming prohibitedとして定義されており、構文上`aria-label`属性を付与することは許可されません。

いくつかの要素はNaming prohibitedとして定義され、`aria-label`属性との組み合わせが明示的に禁止されます。筆者の感覚として、`aria-label`属性は濫用される傾向にあると思っていますが、こうして仕様上で一定の歯止めが掛けられるのは歓迎したいところです。

最後に、[2. ARIA semantics that extend and diverge from HTML](https://www.w3.org/TR/2022/REC-html-aria-20220927/#aria-semantics-that-extend-and-diverge-from-html)や[3. Examples of incorrect usage](https://www.w3.org/TR/2022/REC-html-aria-20220927/#examples-of-incorrect-usage)といった、ARIAの使い方に関する参考情報の拡充も図られています。改めてARIAの用法を見つめ直してみるのもよいのかもしれません。