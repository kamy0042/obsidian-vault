---
type: entity
entity-type: person
updated: 2026-07-27
---

# Murphy Trueman

## 概要

デザインシステムの「validation（検証）層」と AI エージェント対応を主題に発信する実践者。Design Systems Collective 誌に寄稿し、自身のブログ（blog.murphytrueman.com）で「暗黙知から明示的な契約へ」のシフトを継続的に論じている（出典: [[Your design system has opinions. They’re just not being enforced]]）。

## 主要な主張

以下すべて出典: [[Your design system has opinions. They’re just not being enforced]]

- 「ほとんどのデザインシステムはインフラのようには機能しない。**希望（hope）のように機能する**」— 意見（ルール）を持ちながら強制しないシステムは、人々が好きに解釈するライブラリにすぎない
- validation は documentation と adoption の間の失われた層。Design-time / Build-time / Runtime の3点で検証する
- 「**composable contracts**」— コンポーネントが必須の子要素や禁止の prop 組合せを、RESTful API の必須パラメータのように自ら記述・強制する設計
- 「文書化する価値があるなら、強制する価値がある」
- ヘルパー vs ゲートキーパーの緊張は認めつつ、「良い validation はストライクゾーンのようなもの」と、取り締まりに感じさせない強制を提唱

## 影響

- validation 論は第三者記事で「evals」として具体化されている: 機械的チェック（props 実在・トークン解決・実コンポーネント使用）と判断チェック（LLM-as-a-judge＋ルーブリック）を CI で実行するという処方箋で、Trueman の議論が明示的に参照される（出典: [[Your design system’s real job in 2026 is catching the AI.]]。詳細は [[AI時代のデザインシステム]]）

## 関連記事（本人ブログ、上記記事内で言及）

- Your next design system user（agent-ready デザインシステム、composable contracts の初出）
- Design system entropy（AIはデザインシステムの質を増幅する）
- The component adoption gap（ヘルパー/ゲートキーパーの緊張）

## 登場するソース

[[Your design system has opinions. They’re just not being enforced]], [[Your design system’s real job in 2026 is catching the AI.]]

## 関連ページ

[[デザインシステムの強制と例外]], [[AI時代のデザインシステム]], [[デザインシステム批判論]]
