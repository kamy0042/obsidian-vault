---
type: summary
updated: 2026-07-26
---

# Storybook Design Systems with Agents RFC · storybookjs-ds-mcp-experiment-reshaped · Discussion 1 要約

ソース: [[Storybook Design Systems with Agents RFC · storybookjs-ds-mcp-experiment-reshaped · Discussion 1]]

AI エージェントが既存デザインシステムを無視して shadcn や Tailwind で独自 UI を生成してしまう問題に対する、Storybook チームの RFC。
Storybook がコンポーネント名・props・ストーリー由来のコード例・MDX ドキュメント等の構造化メタデータ「Component Manifest」を JSON として出力し、それを消費する Design System MCP Server が LLM にトークン効率よく提供するアーキテクチャを提案する。
MCP サーバーは Storybook に直接依存せず、npm パッケージ同梱・ビルド済み静的ファイル・Chromatic 公開 URL など任意の配布経路のマニフェストを参照できる設計である。
v0.0.1 の実験では LLM に Reshaped デザインシステムのドキュメントを生成させて MCP 経由で提供したところ、不正確・非一貫という品質問題はあるものの、MCP を使った LLM は使わない場合より明確に良いコンポーネントを生成した。
必要なメタデータの95%が現状クライアント側にしかないため Storybook コアの大規模な変更が必要であり、マニフェスト生成を段階的に Storybook 本体へ移していくロードマップ（v0.0.1〜v1.1.0）を示して意見を募っている。
