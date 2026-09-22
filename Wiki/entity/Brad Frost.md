---
type: entity
entity-type: person
aliases: [ブラッド・フロスト]
updated: 2026-07-12
---

# Brad Frost

## 概要

Atomic Design（2013）の提唱者。Big Medium 所属（Josh Clark らと）でエンタープライズのデザインシステム構築を支援する。デザインシステムを「**組織がデジタルインターフェイスをどうデザインし構築するかの公式の物語**」と定義し（出典: [[“What is a Design System” an article by Dan Mall]] での引用）、近年は5層エコシステム論と Global Design System 構想で「1組織のライブラリ」を超えたアーキテクチャを論じる。

## 主要な事実

- **Atomic Design（2013）**: atoms / molecules / organisms / templates / pages のスケール階層でUI構造の共有語彙を作った転換点（出典: [[What Is a Design System  Design Systems 101  Figma Blog]]）。アトムを HTML 要素に接地させた点が本質で、「HCI プリミティブをマークアップとして表現する意味論的語彙」への錨と評される（出典: [[Design systems are contracts, not libraries]]）。ブランド語彙版の変奏に Heavyweight の6階層がある（[[コンポーネント設計]]）
- **デザインシステム・エコシステム（2023）**: コア／技術特化／レシピ／スマートコンポーネント／プロダクトの5層アーキテクチャ。ほぼ全層がオプションで、Gall の法則（動く複雑系は動く単純系から進化する）を設計原理に置く。詳細は [[デザインシステムの階層化]]（出典: [[The Design System Ecosystem  Brad Frost]]）
- コア web DS の実装技術として **Web Components を強く推奨**（標準・フレームワーク非依存・テーマ可能。Lit / Stencil で執筆）。「フレームワーク特化実装は時間とともに減っていく」と見る（出典: 同上）。反対側の実務証言として「Web Components には注釈が多い。Shadow Parts の DX は良くない」（出典: [[Design System Wisdom 2023]]）
- **「デザインシステムは資産の関係ではなく、人と人の関係の話」**——エコシステム論の結語（出典: [[The Design System Ecosystem  Brad Frost]]）
- **A Global Design System 構想（2024）**: 組織単位のDSが個人の重複作業を解消した結果、組織間の重複という「**メタデザインシステム問題**」が生じた——世界中の膨大な人々が同じアコーディオンを作り続けている。共通コンポーネントを世界で一度だけ作る、美観・技術非依存（Web Components・テーマ可能・a11y/i18n 内蔵）のライブラリを W3C 的な場で作ろうという呼びかけ。WebAIM Million の「1ページ平均50件のa11yエラー」を「開発者にもっと大声で叫ぶ」以外の方法で解く道でもある。既存ライブラリ（Material/Bootstrap）は特定組織の目的と既定の美観を持ち込み、headless UI / react-aria は精神は正しいが React に繋がれている、という整理（出典: [[A Global Design System  Brad Frost]]）
- Global DS が実現しても DS チームの仕事は残る: デザイン言語の構築・ガイドライン・エコシステムの編成・レシピのキュレーション・スマートコンポーネント・AI 自動化——「機械的な component 生産から解放され、組織に固有の仕事に集中できる」（出典: 同上）
- ガバナンスワークフロー（プロダクトチームがレシピの初稿を作り、DSチームがレビュー・収録する公式プロセス）の提唱者として Big Medium のペースレイヤー論からも参照される（出典: [[Ship Faster by Building Design Systems Slower  Big Medium]]）
- **AI の DS 適用6領域**（コード生成・フレームワーク翻訳・ユニットテスト・a11y レビュー・文書執筆・バベルフィッシュ文書）と運用6原則を実務デモ付きで整理。「AI は賢いがときどき未熟なジュニア開発者」、組織固有の規約で訓練してこそ、という立場（出典: [[AI and Design Systems  Brad Frost]]。詳細は [[AI時代のデザインシステム]]）

## 登場するソース

[[The Design System Ecosystem  Brad Frost]], [[A Global Design System  Brad Frost]], [[AI and Design Systems  Brad Frost]], [[“What is a Design System” an article by Dan Mall]], [[What Is a Design System  Design Systems 101  Figma Blog]], [[Ship Faster by Building Design Systems Slower  Big Medium]], [[Design systems are contracts, not libraries]], [[Design System Wisdom 2023]]

## 関連ページ

[[デザインシステムの階層化]], [[デザインシステムとは何か]], [[コンポーネント設計]], [[AI時代のデザインシステム]], [[Dan Mall]], [[Nathan Curtis]]
