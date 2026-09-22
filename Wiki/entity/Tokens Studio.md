---
type: entity
entity-type: product
aliases: [Figma Tokens, Tokens Studio for Figma]
updated: 2026-07-10
---

# Tokens Studio

## 概要

Figma 上でデザイントークンを定義・管理するプラグイン（旧称 Figma Tokens）。Figma 本体機能では全種類のトークン定義や値のエクスポートができなかった時代の事実上の標準で、JSON エクスポートと **Git との双方向同期**を核とする（出典: [[デザイントークンって何？｜seya｜note]], [[トークンベースのUIアーキテクチャを設計する]]）。

## 主要な事実

- **双方向 Git 同期**: GitHub / GitLab と連携し、trunk-based と PR ベースの両ワークフローに対応。「Git リポジトリ（デザインツールではなく）を Single Source of Truth にする」ベストプラクティスを、双方向同期対応プラグインとして支える（出典: [[トークンベースのUIアーキテクチャを設計する]], [[Tokens Studio for FigmaとStyle Dictionaryでデザインの共通言語をつくる - 弁護士ドットコム株式会社 Creators’ blog]]）
- 実運用例: microCMS は Figma Tokens の GitHub 連携で PR を作り、Netlify のプレビューで Storybook レビューへ繋いだ（出典: [[Style DictionaryとStorybookを使ったデザイントークンの連携フロー  microCMSブログ]]）。**Adobe Spectrum も Figma からの著述に Tokens Studio ＋独自ワークフローを使い、公開 GitHub リポジトリへ流している**（出典: [[Garth Braithwaite on Design Tokens, Governance, and Scaling Spectrum at Adobe  Knapsack]]）
- **documentation tokens**: トークン更新のたびに自動更新されるリファレンスシートを Figma 上に作る機能。Automator プラグインと組み合わせるとレイヤー生成まで自動化できる（出典: [[Tokens Studio for FigmaとStyle Dictionaryでデザインの共通言語をつくる - 弁護士ドットコム株式会社 Creators’ blog]]）
- **限界（B-43 の移行理由）**: プラグインゆえファイルごとに起動が必要で遅い／一括変更でフリーズ・クラッシュしうる、Dimension 系の適用が不安定／GitHub Personal Access Token の設定が非エンジニアに高い障壁／Figma 本体に沿わない独自トークン型の学習コストと「プラグイン操作は将来役立たないかも」という心理的ハードル／Inspect するだけでメタデータが更新されコンポーネントに差分が生まれる／トークンのメタデータを剥がすとスタイルごと消える（後年の仕様変更）。これらを理由にスマートバンクは Figma Variables へ移行した（出典: [[B-43のデザイントークンをTokens Studio for FigmaからVariablesに移行しました - inSmartBank]]）。移行の全体像は [[デザイントークンのツールチェーン]]
- ツール間移行の互換問題（Tokens Studio → Anima 等でデータ構造が不整合になる）は、[[DTCG]] 仕様の必要性を示す代表例として引かれる（出典: [[デザイントークンに詳しくなれるスクラップ]]）
- 開発元は Figma 以外のツールでも使える**専用デザイントークンマネージャー**の開発意向を表明している（出典: [[Tokens Studio for FigmaとStyle Dictionaryでデザインの共通言語をつくる - 弁護士ドットコム株式会社 Creators’ blog]]）

## 登場するソース

[[トークンベースのUIアーキテクチャを設計する]], [[デザイントークンって何？｜seya｜note]], [[Style DictionaryとStorybookを使ったデザイントークンの連携フロー  microCMSブログ]], [[Tokens Studio for FigmaとStyle Dictionaryでデザインの共通言語をつくる - 弁護士ドットコム株式会社 Creators’ blog]], [[B-43のデザイントークンをTokens Studio for FigmaからVariablesに移行しました - inSmartBank]], [[Garth Braithwaite on Design Tokens, Governance, and Scaling Spectrum at Adobe  Knapsack]], [[デザイントークンに詳しくなれるスクラップ]]

## 関連ページ

[[デザイントークンのツールチェーン]], [[デザイントークン]], [[Style Dictionary]], [[DTCG]], [[Adobe Spectrum]]
