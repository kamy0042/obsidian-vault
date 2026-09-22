---
type: entity
entity-type: product
updated: 2026-07-25
---

# Astryx

## 概要

Meta のオープンソース React デザインシステム。社内で8年間開発され、Facebook・Instagram・Threads など13,000以上の社内アプリケーションを支える同社最大のデザインシステム。JSON マニフェスト CLI と MCP サーバーを標準搭載した初の「エージェント対応」デザインシステムとして注目される。

## 主要な事実

以下すべて出典: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]

- 2026-06-18 パブリックベータ公開、2026-06-28 に MIT ライセンスで GitHub リポジトリ（facebook/astryx）公開。公開約3週間で9,000スター超
- CLI（`astryx` / 短縮形 `xds`）の `npx astryx manifest --json` が、全コマンド・引数・フラグ・許容値・応答タイプを記述した自己記述型 JSON ペイロードを出力する。OpenAPI 型の機械可読契約をフロントエンド DS の CLI に初適用したもので、他の主要 DS に比肩する機能はない
- `--dense` フラグは人間向け文章を削り LLM コンテキストウィンドウに最適化したペイロードを出力。全コンポーネントに構成ヒント付き JSDoc 注釈
- [[Model Context Protocol]] サーバーを同梱。MCP 互換のコーディング環境からスキャフォールド・コンポーネント閲覧・テーマ生成・構造化ドキュメント取得が追加統合なしで可能
- スタイリングは [[StyleX]]（コンパイル時 CSS）。CSS はプリコンパイル済みで利用側のビルドプラグイン設定は不要。テーマは CSS カスタムプロパティのトークン連鎖で、リリース時点で10テーマ同梱
- コンポーネント数に文書化された矛盾がある: GitHub リポジトリは90+、公式ドキュメントサイトは150+。Meta は「社内には存在するが外部向け文書化が未完」と認めている。コードベースの約75%が TypeScript
- ベータのリスク: CLI は2026-07時点で v0.1.6（API 変更の可能性）。lab パッケージと Vega/Vega-Lite チャートラッパーは未安定リリース。バスファクター2（直近6ヶ月のコミットの過半を2人のメンテナーが占める）
- shadcn/ui が最も近い比較対象（コンポーネント所有権・CLI スキャフォールド・構成可能プリミティブ）だが、①コンパイル時アトミック CSS の StyleX ②JSON マニフェスト + MCP 層の2点で構造的に異なる。MUI は Emotion ランタイム CSS でエージェントツール非搭載

## 登場するソース

[[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]

## 関連ページ

[[StyleX]], [[Model Context Protocol]], [[AI時代のデザインシステム]]
