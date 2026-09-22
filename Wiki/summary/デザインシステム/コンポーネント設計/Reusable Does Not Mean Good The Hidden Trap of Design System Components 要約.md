---
type: summary
updated: 2026-09-22
---

# Reusable Does Not Mean Good The Hidden Trap of Design System Components 要約

ソース: [[Reusable Does Not Mean Good The Hidden Trap of Design System Components]]

コンポーネントが多くの場所で再利用できることと、利用者やプロダクトにとって良いことは別だと主張する。
多数の variant や設定項目を持つ「Mega Component」は、判断と認知負荷を利用側へ押し戻し、誤用やライブラリ離れを招く。
改善には、実データを入れた複雑な画面の中で検証し、コア用途に適した既定値と明確な境界を与え、稀な例外は専用の解へ分ける必要がある。
品質評価には、目的と状態の明瞭さを問う Clarity、誤用を防ぐ境界を問う Constraint、他の部品との調和を問う Composition の三軸を使う。
システム構築者の責任は選択肢を最大化することではなく、利用チームに代わって必要な判断を行い、実際の有用性を高めることだと結論づける。
