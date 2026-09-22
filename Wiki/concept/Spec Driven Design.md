---
type: concept
aliases: [仕様駆動デザイン]
updated: 2026-09-22
---

# Spec Driven Design

## 概要

AIを個別工程の補助ではなく、リサーチから出荷までを接続する基盤として使う設計方法論。
生データから導いた判断を、プロンプト、検証可能な機能仕様、実装へ段階的に変換し、出荷物から根拠まで遡れる状態を保つ（出典: [[Spec Driven Design — Designing digital products when AI is everywhere]], [[Spec Driven Design — From raw data to product logic]]）。

## 中核原則

- 本質はUI生成の高速化ではなく、**データ→判断→仕様→実装の導出連鎖**を切らさないこと。古いデータは参考価値が下がるだけでなく、誤った仕様を生成する能動的な入力になるため、データの作成・保守・実利用を中核活動として扱う（出典: [[Spec Driven Design — Designing digital products when AI is everywhere]]）
- AIはコードを書く参入障壁を下げるが、コードを読み、品質を評価し、必要時に修正する能力までは不要にしない。設計者の役割は二職能の完全習得から、技術能力を適切に指揮・評価することへ移る（出典: [[Spec Driven Design — Designing digital products when AI is everywhere]]）
- 著者は2026年1月以降、Figma中心の工程を離れて約10件のプロジェクトへ適用したと自己報告している。ただし現時点ではシリーズ記事による方法論の提示であり、比較実験による有効性の検証ではない（出典: [[Spec Driven Design — Designing digital products when AI is everywhere]]）

## Ingestion → Synthesis → Specification

1. **Ingestion** — 面接・観察のように関係性を要する調査は人間、デスクリサーチや大量資料の横断分析はAIが主導し、両者の出力を一貫したメタデータ付きMarkdownへ収束させる。
2. **Synthesis** — 生データからタッチポイント、機能、ユーザーストーリーを順に導き、各単位から前段の根拠へ遡れるようにする。
3. **Specification** — ユーザーストーリーを、技術選定ではなく「どの条件・順序・状態で製品が何をするか」を記述する機能仕様へ変換する。静的ワイヤーフレームより論理を明示し、後続の設計・実装を検証可能にする（出典: [[Spec Driven Design — From raw data to product logic]]）。

## 登場するソース

[[Spec Driven Design — Designing digital products when AI is everywhere]], [[Spec Driven Design — From raw data to product logic]]

## 関連ページ

[[AI時代のデザインシステム]], [[デザインエンジニアリング]], [[デザインシステムのドキュメンテーション]]
