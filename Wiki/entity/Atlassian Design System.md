---
type: entity
entity-type: product
updated: 2026-08-03
---

# Atlassian Design System

## 概要

Atlassian（Jira / Confluence 等）のデザインシステム。Foundations / Components / Patterns の3層構造を持ち、近年は AI 時代の「コンテキストエンジン」への進化と AI プロトタイピングの大規模運用の事例として参照されることが多い。

## 主要な事実

- Foundations（トークン・色・タイポグラフィ等の基礎）/ Components / Patterns の3層構造。Jira と Confluence の AI チャット体験は共有パターンによって製品横断で一貫している（出典: [[What Is a Design System Understanding the Atlassian Design System]]）
- 生成体験時代の DS を「コンテキストエンジン」（AI が読み・組み立てられる意味・規則・リスク管理の OS）として再定義する論の代表例とされ、Design Technologist の役割を重視する（出典: [[Design Systems Beyond Components]]）
- AI プロトタイピングの実績: 月次35%成長、12,000超の AI プロトタイプが稼働し、社員の42%が納品速度の向上を報告（Maria Christley の発信）。ハンドオフ工程の消滅を示す事例として引かれる（出典: [[The handoff is gone. Design technologists got the job.]]）
- 四半期ごとのドリフト監査（システムからの逸脱を定期検出する運用）の先行例として Shopify Polaris と並んで言及される（出典: [[I Rebuilt Every Button In Our Design System. No One Noticed.]]）
- **AI-native に先立つ基盤再構築**（以下すべて出典: [[Why Atlassian Rebuilt Its Design System]]、Jihyung Yoo による事例論考 Part 1。Part 2「How Atlassian Moved Toward AI-native」が続編）:
  - 分散していたガイドラインとコードを単一の Source of Truth に統合。新規追加を制限して境界を再定義し、繰り返し現れるパターンのみ昇格させる運用へ転換
  - Jira / Confluence / Trello / Loom / Rovo を一つの作業環境として扱うため **Core / Platform / App の3層**に分離し、ナビゲーションを製品横断で再編（Kristin Perchal / Bryan Ye の参照記事あり）
  - ブランドは「**プロダクト内で機能しない決定は良い決定ではない**」原則でアプリデザインと一体化。8px スペーシングトークン・1万超アイコン・色・日付ピッカーのアクセシビリティ改善などディテールを疲労軽減の基準として整理
  - 結論:「標準が空白だと AI は推測で不整合を量産する。**AI が読めるシステムの前提は人が信頼できる標準**」——[[AI時代のデザインシステム]] の「成熟した DS こそが AI の信頼できる出力の前提」論と同型

## 登場するソース

[[What Is a Design System Understanding the Atlassian Design System]], [[Design Systems Beyond Components]], [[The handoff is gone. Design technologists got the job.]], [[I Rebuilt Every Button In Our Design System. No One Noticed.]], [[Why Atlassian Rebuilt Its Design System]]

## 関連ページ

[[AI時代のデザインシステム]], [[デザインエンジニアリング]], [[デザインシステムの階層化]]
