---
type: entity
entity-type: spec
aliases: [OKF]
updated: 2026-08-12
---

# Open Knowledge Format

## 概要

人間と AI エージェントの双方が扱える形で、データやシステムを取り巻くメタデータ、コンテキスト、キュレーション済み知識を表現するオープン仕様。Google Cloud が2026年6月に v0.1を公開し、LLM-wiki パターンをベンダーや組織を越えて交換可能にする共通形式として設計している（出典: [[Open Knowledge Format のご紹介  Google Cloud 公式ブログ]], [[OKF（Open Knowledge Format）の仕様を整理してみた]]）。

## 主要な事実

- Knowledge Bundle は Markdown ファイルのディレクトリツリー、Concept は YAML frontmatter を持つ1つの Markdown ファイルであり、ファイルパスから拡張子を除いた値が Concept ID になる（出典: [[Open Knowledge Format のご紹介  Google Cloud 公式ブログ]], [[OKF（Open Knowledge Format）の仕様を整理してみた]]）
- frontmatter の必須フィールドは空でない `type` だけで、Producer は任意のフィールドを追加できる。Consumer は未知の type やフィールドを許容し、往復変換時には未知のフィールドも保持すべきとされる（出典: [[OKF（Open Knowledge Format）の仕様を整理してみた]]）
- Concept 間の関係は標準 Markdown リンクで表し、関係の種類はリンク周辺の文章で伝える。壊れたリンクも将来作成される知識への参照として許容する（出典: [[OKF（Open Knowledge Format）の仕様を整理してみた]]）
- `index.md` は段階的な探索、`log.md` は更新履歴のための予約ファイル名で、いずれも任意。外部資料に基づく主張は `# Citations` セクションに列挙することが推奨される（出典: [[OKF（Open Knowledge Format）の仕様を整理してみた]]）
- 適合条件は、予約ファイル以外の全 Markdown に解析可能な frontmatter と空でない `type` があり、存在する `index.md` と `log.md` が所定の構造に従うこと。未知のフィールドや壊れたリンクは不適合理由にならない（出典: [[OKF（Open Knowledge Format）の仕様を整理してみた]]）
- Git リポジトリ、圧縮アーカイブ、大きなリポジトリ内のサブディレクトリとして配布でき、専用 SDK、ランタイム、中央スキーマレジストリを必要としない（出典: [[Open Knowledge Format のご紹介  Google Cloud 公式ブログ]], [[OKF（Open Knowledge Format）の仕様を整理してみた]]）
- Google Cloud は概念実証として、BigQuery から Concept 文書を生成・拡充するエージェント、静的 HTML ビジュアライザー、3つのサンプルバンドルを公開している。これらの実装は仕様の必須要素ではない（出典: [[Open Knowledge Format のご紹介  Google Cloud 公式ブログ]]）

## 登場するソース

[[Open Knowledge Format のご紹介  Google Cloud 公式ブログ]], [[OKF（Open Knowledge Format）の仕様を整理してみた]]

## 関連ページ

[[Model Context Protocol]]
