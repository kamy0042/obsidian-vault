---
type: summary
updated: 2026-07-25
---

# Color Module - First Draft by adekunleoduye · Pull Request 147 · design-tokens-community-group · GitHub 要約

ソース: [[Color Module - First Draft by adekunleoduye · Pull Request 147 · design-tokens-community-group · GitHub]]

Design Tokens Community Group (DTCG) に adekunleoduye 氏が提出した Color Module 仕様初稿の Pull Request (#147) のクリップで、色トークンの `$value` をオブジェクト化し、必須の `$hex` フォールバックと `$colorSpace`（rgb・srgb・hsl・lch）で hex を超える広色域の色を表現する提案や、Base トークンなどのトークン命名ガイド、グラデーションの章を含む。
レビューでは kaelig 氏がブラウザ対応の記述の不正確さ（OKLCH は Safari 限定ではなくなった等）を指摘し、drwpow 氏と c1rrus 氏は `$value` 内部のプロパティに `$` プレフィックスを付けるのは現行フォーマットと不整合だと主張した。
従来の文字列構文 `"$value": "#111111"` とオブジェクト構文は等価に併存する方針であることも確認された。
エディタの c1rrus 氏は changes requested とし、`$darkValue` が現行仕様で許可されないため例から削除すべきこと、色空間の許容値や成分の値域の明確化、gradient 章の別 PR への分離、規範的な仕様部分と非規範的なガイダンス部分の明確な区別（色仕様をフォーマット仕様本体へ移す案を推奨）を求めた。
全体として、初稿は評価されつつもフォーマット仕様との整合性の作業が残る、というレビュー途上の状態を記録した資料である。
