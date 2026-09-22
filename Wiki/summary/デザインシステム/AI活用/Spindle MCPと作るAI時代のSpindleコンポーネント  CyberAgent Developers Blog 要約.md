---
type: summary
updated: 2026-07-26
---

# Spindle MCPと作るAI時代のSpindleコンポーネント  CyberAgent Developers Blog 要約

ソース: [[Spindle MCPと作るAI時代のSpindleコンポーネント  CyberAgent Developers Blog]]

Ameba のデザインシステム Spindle の Table コンポーネントを、AI（Claude Code / Cursor）と Spindle MCP を併用して開発した事例。
Table は Web 標準の table 要素を wrap する立ち位置とし、サービスごとに異なるデザイン要件に応えるため CSS Variables によるスタイル上書きを全面的に許可するカスタマイズ性の高い設計を採った。
Design Doc 作成では MCP のテンプレート取得・デザイントークン参照・アクセシビリティガイドライン参照ツールを活用し、Design Doc からのコード生成精度も高く、レビュー段階で既に動くものを提示できた。
一方で DO/DO NOT セクションの生成は共通認識の不足からうまくいかず手動調整が必要で、Table は Figma で直接表現できないため Figma MCP は使わずテキストベース設計が適していたという学びも共有する。
AI 活用により実装の詳細から「どんなコンポーネントを提供するのが長期的に良いか」という抽象度の高い設計に時間を割けるようになったと結論づけている。
