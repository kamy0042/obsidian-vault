---
type: summary
updated: 2026-07-26
---

# When “semantic tokens” are no longer semantic. 要約

ソース: [[When “semantic tokens” are no longer semantic.]]（同一記事の重複クリップ: [[When “semantic tokens” are no longer semantic]]）

Intuit の Nate Baldwin が、セマンティックトークンの粒度設計における「Goldilocks zone（ちょうど良い帯域）」を論じる記事。
セマンティックトークンは how / where / when の選択（choice）を定義する層であり、Nathan Curtis の「primitive は選択肢、semantic は選択」という整理を踏まえる。
`element-spacing-small` のような汎用的すぎる名前は意図を欠き、アイコンとテキストの間隔を変えたいだけなのに無関係なパディングまで変わってしまう——「意図が不明確なトークンはもはやセマンティックではない」。
逆に `button-padding-top` のような特化しすぎた名前は変更がスケールせず、全コンポーネントのサイズ変更で大量のトークンを個別更新する羽目になる。
解は「共通の関連性の抽象化」で、`text-to-element-sm` や `edge-to-element-horizontal-md` のようにコンポーネントテンプレートから共通構造を抽出した命名が、明確な意図と広い適用範囲を両立させるとし、Wise や Adobe Spectrum を実例に挙げる。
