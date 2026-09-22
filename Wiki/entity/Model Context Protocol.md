---
type: entity
entity-type: spec
aliases: [MCP]
updated: 2026-09-22
---

# Model Context Protocol

## 概要

AI モデルが外部データソースやツールに構造的にアクセスするためのオープンスタンダード。Anthropic が2024年11月に発表し、現在はエージェントとツールの相互運用の共有プロトコルとして業界横断で採用。デザインシステムのエージェント対応（[[AI時代のデザインシステム]]）を支える中核インフラになっている。

## 主要な事実

- 2024-11 に Anthropic が発表。トランスポート層は JSON-RPC 2.0（出典: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]], https://www.anthropic.com/news/model-context-protocol）
- 2025-12 に Anthropic が Linux Foundation の Agentic AI Foundation へ寄贈。OpenAI と Google DeepMind も共有プロトコルとして採用（出典: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]）
- デザインシステム関連の実装例: [[Storybook]] MCP server（AI ツールへの構造化コンポーネントコンテキスト供給。出典: [[Your design system has opinions. They’re just not being enforced]]）、Figma Dev Mode の MCP 統合（Figma ファイルをクエリ可能なデータベース化。出典: [[Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t.]]）、[[Astryx]] 同梱の MCP サーバー（出典: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]）
- MCP 互換のマニフェストインターフェースを公開するツールは、MCP 上に構築されたあらゆるエージェントから追加統合なしにアクセス可能になる。この相互運用パターンはデザインシステムに限らずエンタープライズツール全般に応用可能（出典: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]）
- ただし「煩雑な DS への MCP アクセスは開発を速くしない。大規模な幻覚をより速くするだけ」——MCP は前提としてクリーンで意味構造化されたデザインシステムを要求する（出典: [[Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t.]]）
- Notion は自社デザインシステムの MCP サーバーを公開しており、「AI を意識した文書化」の実例として引かれる（出典: [[Design Systems Are No Longer Component Libraries. They Are Strategic Business Infrastructure.]]）
- Aparat の Component Contracts では、契約（振る舞いの JSON 仕様）自体を AI が生成する——デザイナーの自然言語の意図と Figma MCP から得た構造情報を材料にする（出典: [[Component Contracts The missing piece for AI-era Design System handoff]]）
- 実装上は、正確な値を返す**トークンMCP**と、実際の画面・コンポーネント構造を返す**Figma MCP**を分担させ、両者にない判断規則だけを短いプロジェクト文書で補う構成が提案されている。MCPは真実源そのものではなく、異なる構造化資産への問い合わせ経路である（出典: [[I Gave Claude Code My Design System. Here’s the Exact Setup.]]）
- [[relay Design System]] はstdio版とリモート版を提供し、導入・コンポーネント・トークン・原則・アクセシビリティ・アセット・検索の8ツールを「一覧→詳細」の段階的探索に分ける。接続時instructionsで常駐ルールを渡し、`get_setup`を最初に呼ばせてCSS未導入からハードコードへ逃げる失敗を防ぐ。Claude Teamの組織コネクタにより管理者の設定だけでメンバーへ配布できる点も、MCPを選んだ理由とされる（出典: [[AIネイティブを目指した「これまで」と「これから」｜agu  relay（リレイ）]]）
- 兄弟プロトコル A2A（agent-to-agent）も Linux Foundation の Agentic AI Foundation 傘下にあり、マルチエージェント協調ではデザイントークンが「共有真実源」として機能するという展望がある（出典: [[The Token Structure That Survives Five Products (Google Uses It Too)]]）

## 登場するソース

[[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]], [[Your design system has opinions. They’re just not being enforced]], [[Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t.]], [[Design Systems Are No Longer Component Libraries. They Are Strategic Business Infrastructure.]], [[Component Contracts The missing piece for AI-era Design System handoff]], [[I Gave Claude Code My Design System. Here’s the Exact Setup.]], [[AIネイティブを目指した「これまで」と「これから」｜agu  relay（リレイ）]], [[The Token Structure That Survives Five Products (Google Uses It Too)]]

## 関連ページ

[[Astryx]], [[Storybook]], [[relay Design System]], [[Open Knowledge Format]], [[AI時代のデザインシステム]]
