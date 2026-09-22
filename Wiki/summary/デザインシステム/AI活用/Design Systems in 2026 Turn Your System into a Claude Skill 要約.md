---
type: summary
updated: 2026-07-27
---

# Design Systems in 2026 Turn Your System into a Claude Skill 要約

ソース: [[Design Systems in 2026 Turn Your System into a Claude Skill]]

デザインシステムを Claude Skill（SKILL.md ＋ references フォルダ）としてパッケージし、会話のたびにコンテキストを再説明しなくて済むようにする実践ガイド（Claude Desktop × Figma Console MCP 3部作の最終回）。
Skill はメタデータ→本文→参照ファイルの段階的開示（progressive disclosure）で必要時のみロードされるため、毎回500トークン超を手貼りするより効率的だとする。
SKILL.md にはトークン命名規則・スペーシングスケール・コンポーネント構築ルール・品質チェックリストを置き、色やタイポグラフィの詳細値は references/ に分離するテンプレートを提供する。
文書化されていない暗黙の設計判断は「Claude に自分をインタビューさせる」プロンプトで10分程度で引き出せると勧める。
SKILL.md が500行を超えたらトークン・コンポーネント仕様・アクセシビリティなど関心ごとに Skill を分割し、トリガーしない場合は description のキーワードを具体化せよと結ぶ。
