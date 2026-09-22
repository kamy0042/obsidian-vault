---
type: summary
updated: 2026-07-25
---

# AI × Turtle で実現する Vibe Coding：DMM デザインシステムを活用した新たな開発ワークフロー - DMM Developers Blog 要約

ソース: [[AI × Turtle で実現する Vibe Coding：DMM デザインシステムを活用した新たな開発ワークフロー - DMM Developers Blog]]

DMM の Developer Productivity Group が、社内デザインシステム Turtle と生成 AI を組み合わせて Figma デザインからのフロントエンド実装を自動化する「AI-Turtle」プロジェクトを紹介する記事。
OSS の Figma MCP サーバー単体では Figma のコンポーネントプロパティと React の props の不一致から精度が出なかったが、Turtle 向けのマッピング情報を組み込んだ独自 MCP サーバーと AI エージェント向けルールの整備で精度を大幅に向上させ、デザイントークンの変換もルールで自動化した。
得られた知見として、セマンティックなレイヤー名やオートレイアウトが整った「AI-friendly」なデザインデータが生成精度を大きく左右すること、AI にルールで判断させるより fullWidth のような props 化でレスポンスを固定化する方が揺れが減り精度が安定することを挙げている。
この経験から React コンポーネントを props 中心の設計にリファクタリングする検討も始めており、AI-friendly デザインガイドラインの策定も進めている。
プロトタイピングコストの低下と Turtle の普及が UI の一貫性・アクセシビリティを担保し、DMM 全体の品質向上につながるエコシステムになると展望して締めくくっている。
