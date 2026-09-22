---
type: summary
updated: 2026-07-27
---

# The Aspirational Bloat Trap Why Your Design System is Failing 要約

ソース: [[The Aspirational Bloat Trap Why Your Design System is Failing]]

Polaris や Carbon など企業規模のデザインシステムを、それを支える組織を持たない中小チームが模倣すると複雑さが負債になる「憧れの肥大化（aspirational bloat）の罠」を、自身が引き継いだ「ゴーストタウン化した」システムの再建事例で論じる。
作成者退職後に誰もロジックを説明できなくなったコンポーネントレベルのトークン群は、正規の手順よりワークアラウンドの方が楽な状態を生み、各プラットフォームが独自構造を作る断片化を招いていた。
コンポーネント別トークンを Target（Surface / On-surface / State layer / Border）× Role（Primary / Accent 等）× State のセマンティック分類に置き換え、カラートークンを195個から25個へ削減し、UI の見た目を変えずにシステムを理解可能にした。
移行では Codex を GitHub と Figma MCP に接続し、全カラー使用の監査と文脈依存のマッピング（blue-40 が背景なら surface/accent、テキストなら on-surface/accent 等）をエージェントに実行させ、曖昧なケースだけを人間がレビューした。
デザインシステムの真の尺度はアーキテクチャの見栄えではなく、作った本人がいなくなっても機能し続け、正しい道がワークアラウンドより楽であることだと結論する。
