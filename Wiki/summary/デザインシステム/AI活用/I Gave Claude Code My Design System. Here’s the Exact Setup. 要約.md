---
type: summary
updated: 2026-09-22
---

# I Gave Claude Code My Design System. Here’s the Exact Setup. 要約

ソース: [[I Gave Claude Code My Design System. Here’s the Exact Setup.]]

Claude Code や Cursor にデザインシステムを推測させず、トークン・Figma・利用規則を構造化して与える実装手順を示す。
Figma のトークンを JSON 化し、Style Dictionary で各プラットフォーム向けコードへ変換したうえで、トークン MCP と Figma MCP から正確な値と構造を提供する。
トークンだけでは表せない判断は、コンポーネントの再利用、余白、タイポグラフィ、変更禁止事項などに絞った短い CLAUDE.md または design.md に置く。
生成後は同じデータ源を使って未使用・非推奨トークンや利用状況を監査し、生成・批評・修正のループを閉じる。
これにより見た目の一致を構造的に担保し、人間はフロー、情報階層、出荷判断に集中できるとする。
