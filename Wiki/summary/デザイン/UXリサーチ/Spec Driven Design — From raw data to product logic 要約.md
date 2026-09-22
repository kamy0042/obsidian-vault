---
type: summary
updated: 2026-09-22
---

# Spec Driven Design — From raw data to product logic 要約

ソース: [[Spec Driven Design — From raw data to product logic]]

Spec Driven Design の前半を、Ingestion、Synthesis、Specification の3段階として具体化し、生データを製品ロジックへ変換する過程を説明する。
Ingestion では面接や観察は人間、デスクリサーチや大量資料の横断分析はAIが主導し、どちらの成果も一貫したメタデータを持つMarkdownへ収束させてRAGとLLM wikiに蓄積する。
Synthesis では生データからタッチポイント、機能、ユーザーストーリーを順に導き、各単位が前段の根拠まで遡れる状態を保つ。
Specification ではユーザーストーリーを、技術選定を含まない機能ロジックのプロンプトへ変換し、静的なワイヤーフレームより精密に状態・条件・例外・順序を記述する。
最終的に、仕様からユーザーストーリー、機能、タッチポイント、生データまで切れ目なく追跡できることが、後続する設計と実装を検証可能にする。
