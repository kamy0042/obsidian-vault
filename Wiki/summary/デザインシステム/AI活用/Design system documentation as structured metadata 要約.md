---
type: summary
updated: 2026-09-22
---

# Design system documentation as structured metadata 要約

ソース: [[Design system documentation as structured metadata]]

デザインシステムの既存ドキュメントを、AIエージェントが問い合わせ・検証できる構造化メタデータへ翻訳する方法を、Buttonを例に示す。
判断に直結する usage、aiHints、variants、composition、behavior を中核に置き、props、accessibility、examples と組み合わせて選択理由・禁止事項・振る舞いを明示する。
TypeScript形式は実行可能な例、型安全、実装型の再利用に向き、ヘッダーで候補を発見して必要な本文だけ読む段階的探索にも適する。
展開時は既存資料を棚卸しし、テンプレートを定義し、AIに意図を抽出させ、propsなどの機械的情報はスクリプトで生成し、人間が設計意図を補う。
これは新しい文書を増やすのではなく、既存の判断をコンポーネントの隣で明示・検索・検証・版管理できる契約へ変換する取り組みである。
