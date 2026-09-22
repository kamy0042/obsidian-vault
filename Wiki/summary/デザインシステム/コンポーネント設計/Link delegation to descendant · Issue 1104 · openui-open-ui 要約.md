---
type: summary
updated: 2026-07-26
---

# Link delegation to descendant · Issue 1104 · openui-open-ui 要約

ソース: [[Link delegation to descendant · Issue 1104 · openui-open-ui]]

Open UI に提起された、リンクのネスト問題に対する Web プラットフォームレベルの解決策の提案 Issue。
HTML 仕様上 `a` 要素はネストできないが、Reddit や Rotten Tomatoes など多くのサイトがカード全体をクリック可能にするため冗長な JavaScript で疑似的なリンクネストを実装している現状を指摘する。
提案は「リンク委譲（link delegation）」で、親要素（例: `section`）に `link` 属性を持たせ、ID で指定した子孫の `a` 要素へクリックのデフォルトアクションを委譲する仕組み。
アクセシビリティと開発者の使い勝手（エルゴノミクス）の両立を目的としており、カード型 UI コンポーネント設計に共通する課題の標準化議論として参照価値がある。
