---
type: summary
updated: 2026-08-12
---

# OKF（Open Knowledge Format）の仕様を整理してみた 要約

ソース: [[OKF（Open Knowledge Format）の仕様を整理してみた]]

Google Cloud が2026年6月に公開した Open Knowledge Format（OKF）v0.1について、仕様本文を基に構造と適合条件を整理した記事。
OKF は Knowledge Bundle をディレクトリ、Concept を YAML frontmatter 付き Markdown ファイルとして表し、必須フィールドを `type` だけに抑えている。
Concept 間の関係は標準 Markdown リンク、外部根拠は `# Citations`、段階的な探索と履歴は任意の `index.md` と `log.md` で表現できる。
Consumer は未知の type・追加フィールド・壊れたリンクを理由に拒否せず、Producer が加えた未知のフィールドも保持するという寛容な消費モデルを採用する。
Git 管理可能な単純なファイル形式と自由な拡張性により、組織固有の設計情報を段階的に構造化し、AI エージェントが横断利用できる点を主要な価値としている。
