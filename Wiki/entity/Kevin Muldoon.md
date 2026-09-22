---
type: entity
entity-type: person
updated: 2026-09-22
---

# Kevin Muldoon

## 概要

デザインシステムとデザイントークンの実務家・著者。
Dow Jones の Index Design System におけるマルチブランド契約層、デザイン判断の反証可能性、カラー尺度とコントラスト測定の分離を論じる。

## 主要な事実

- Dow Jones の Index Design System（18ブランド×6プラットフォーム）で、値の集合であるトークン実装とは別に「全ブランドがどのキー・型・制約を満たすべきか」を宣言するinterface層を構築した。9ポジションのタクソノミーは [[Nathan Curtis]] と Style Dictionary の命名系譜を引く（出典: [[Design Tokens Aren’t a Contract]]）
- デザイン批評が決着しにくい原因を、判断が反証可能になっていないことに求め、`why` を残す決定ログを処方箋とする（出典: [[Why Engineers Can Say “This Is Wrong” and Designers Can’t]]）
- OKLCHを色生成・補間の「ブラシ」、CIE L*と実際のコントラスト計算をパレット位置と可読性を測る「定規」として分けることを提案した。同じOKLCH Lでも色相・彩度で相対輝度が変わるため、L値をtoken weightや適合保証へ直接使えないと指摘する（出典: [[Stop using OKLCH lightness for your color scale]]）

## 登場するソース

[[Design Tokens Aren’t a Contract]], [[Why Engineers Can Say “This Is Wrong” and Designers Can’t]], [[Stop using OKLCH lightness for your color scale]]

## 関連ページ

[[デザインシステムの強制と例外]], [[カラーシステムの設計]], [[DTCG]], [[Nathan Curtis]]
