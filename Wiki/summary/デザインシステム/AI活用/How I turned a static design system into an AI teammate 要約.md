---
type: summary
updated: 2026-07-27
---

# How I turned a static design system into an AI teammate 要約

ソース: [[How I turned a static design system into an AI teammate]]

B2B 薬局プラットフォームで DesignOps をひとりで担うデザイナーが、Claude Code・Figma MCP・自作 npm パッケージでデザインシステムを「AI のチームメイト」に変えた事例（I Putu Dana Putra）。
AI の課題は理解ではなく「記憶」——セッションごとに再教育が必要な状態では共有システムにならないため、生成→検証→修正→保存のループを回して Claude Skill に知識を固定した。
構成は4層を順に構築: スタイルガイド（基盤）→ Figma コンポーネントライブラリ（構築）→ Claude Skill（記憶・一貫性）→ npm パッケージ（ブランドのガードレール、コードとの自動同期）。
結果、PM やエンジニアが AI 経由で最初からオンブランドの成果物を作れるようになり、生産量がデザイナー個人の稼働時間に律速されなくなった——デザイナーの役割は作る人から「オーケストレーター（ヘッドシェフ）」へ移る。
ポイントはツールではなく「AI が推測でなく実際の決定から作業できる共有言語」であり、コンポーネント1つずつ AI の理解を検証し修正を永続化するループこそが agentic layer 構築の本体だと結ぶ。
