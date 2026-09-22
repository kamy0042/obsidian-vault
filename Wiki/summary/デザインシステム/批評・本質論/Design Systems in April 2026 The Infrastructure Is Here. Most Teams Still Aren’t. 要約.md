---
type: summary
updated: 2026-07-26
---

# Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t. 要約

ソース: [[Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t.]]

Oleksandr Konovalov による2026年4月時点の業界定点観測。
自社デザインシステムを「非常に安定」と評価する企業チームはわずか8%で、技術インフラ（MCP・W3C トークン仕様・AI ツール）は完成したのにチーム側が追いついていない、と現状を批判する。
運用パラダイムは「デザイン→開発者へのハンドオフ」から「デザイン→エージェントのオーケストレーション」に移行し Figma ファイルはクエリ可能なデータベースになったが、乱雑なシステムに MCP アクセスを与えても「大規模な幻覚をより速く起こす」だけだと警告する。
セマンティック命名は `{category}-{role}-{variant}-{state}` の4部構成が標準となり、人間ではなく推論する機械のための命名＝振る舞いの仕様になったとする。
このほかの論点:
- W3C DTCG v2025.10 の安定版リリースでトークン保存フォーマット論争が終結
- EAA 施行でアクセシビリティが法的責任化（WCAG 最低基準＋APCA の同時準拠、CI での自動 lint）
- AI 機能の従量課金による「トークン税」という新コスト
- GenUI ではデザインシステムが AI 生成の制約層（文法ルール）になる
結論は、DS をリリース日のあるプロジェクトではなく継続的オーナーを持つプロダクトとして保守せよ、「遠目にインフラに見える」だけでは通用しない、というもの。
