---
type: summary
updated: 2026-07-26
---

# Storybook公式MCPの解説とその先 - Design Systems with Agentsの提案について - 要約

ソース: [[Storybook公式MCPの解説とその先 - Design Systems with Agentsの提案について -]]

2025年8月末に登場した Storybook 公式の MCP Addon と、その先の2つの RFC を解説するサイボウズフロントエンドの記事。
MCP Addon を入れると Story ファイル生成の精度が上がり、play 関数やイベント Mock を使ったテストコードまで最新記法で自動生成されるほか、Story の URL 提示によるコンポーネント探索も可能になる。
Agentic Workflow RFC は「AI が作った UI がどう見えるか確認しにくい」問題に対し、良いストーリー基準の明確化・評価の自動化・AI の自己チェック・専用確認画面などの展望を示す。
Design Systems with Agents RFC は、AI がデザインシステムを守らず shadcn や Tailwind で独自 UI を作ってしまう問題に対し、コンポーネント・マニフェスト（名前・Props・サンプルコード等）と Design System MCP Server を提案するもので、Storybook を使わないアプリチームでも利用できる点が Addon MCP との違い。
実現にはメタデータのサーバーサイド化という大きなアーキテクチャ変更が必要なため段階的な実装計画（v0.0.1〜v1.0.0）が示されており、Storybook にデータを蓄積しているデザインシステムには Single Source of Truth の投資判断材料になると締めくくる。
