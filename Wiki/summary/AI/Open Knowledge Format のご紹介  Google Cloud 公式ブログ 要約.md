---
type: summary
updated: 2026-08-12
---

# Open Knowledge Format のご紹介 Google Cloud 公式ブログ 要約

ソース: [[Open Knowledge Format のご紹介  Google Cloud 公式ブログ]]

Google Cloud が、LLM-wiki パターンを組織やツールの境界を越えて移植可能にするオープン仕様 Open Knowledge Format（OKF）v0.1を紹介した公式記事。
組織のナレッジがカタログ、Wiki、コード、個人の頭に分散し、AI エージェントがコンテキストを毎回組み立て直す問題に対し、ベンダー非依存の共通形式を解決策として提示する。
OKF は YAML frontmatter 付き Markdown のディレクトリを Knowledge Bundle とし、各ファイルを Concept、ファイルパスを ID、通常の Markdown リンクを Concept 間の関係として扱う。
設計原則は、必須項目を `type` だけにする最小限の制約、Producer と Consumer の独立性、特定サービスではなく形式そのものを標準化することの3点である。
BigQuery 向け拡充エージェント、静的 HTML ビジュアライザー、サンプルバンドルも公開されているが、いずれも概念実証であり、OKF 自体は特定のクラウド、SDK、エージェントフレームワークに依存しない。
