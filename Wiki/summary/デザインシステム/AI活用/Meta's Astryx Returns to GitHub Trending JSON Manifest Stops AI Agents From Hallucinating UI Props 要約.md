---
type: summary
updated: 2026-07-25
---

# Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props 要約

ソース: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]

Meta の OSS React デザインシステム [[Astryx]] が公開約3週間で9,000スター超を集め GitHub Trending に再登場した理由を、コンポーネント数ではなく `npx astryx manifest --json` という単一コマンドにあると分析する記事。
構造化仕様を持たない AI エージェントは人間向けドキュメントとのパターンマッチングで存在しない props を幻覚するが（Stack Overflow 2025 調査では回答者の66%が「ほぼ正しいが、完全には正しくない」を AI ツール最大の不満に挙げた）、自己記述型 JSON マニフェストはこれを業界が解き方を知っている「構造化仕様の問題」に変換すると論じる。
基盤は Meta 社内8年・13,000超アプリで検証済みで、スタイリングはコンパイル時 CSS の [[StyleX]]（Meta 規模で CSS 約80%削減）、テーマは CSS カスタムプロパティのトークン連鎖。
[[Model Context Protocol]] サーバー同梱により MCP 互換環境ならカスタム統合なしで接続でき、同じ構造化マニフェストのパターンはエンタープライズツール全般に応用可能とする。
一方でベータ特有のリスク（CLI v0.1.6、未安定パッケージ2つ、バスファクター2、コンポーネント数の矛盾 90+ vs 150+）を指摘し、安定した公開 API が必要なチームはベータ解除まで待つべきと結論する。
