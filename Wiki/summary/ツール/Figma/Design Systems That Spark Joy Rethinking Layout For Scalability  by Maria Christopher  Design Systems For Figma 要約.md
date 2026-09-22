---
type: summary
updated: 2026-07-26
---

# Design Systems That Spark Joy Rethinking Layout For Scalability  by Maria Christopher  Design Systems For Figma 要約

ソース: [[Design Systems That Spark Joy Rethinking Layout For Scalability  by Maria Christopher  Design Systems For Figma]]

Uber のデザインシステム Base における、コンポーネント肥大化からの脱却と「再利用可能なレイアウトモデリング」の実践記。
初期はカタログの広さを成熟の証としたが、プラットフォームあたり60〜70個に達すると冗長性と不整合が増し、システムの健全性を損なった。
再出発の原則として自己完結・コード保守性・持続的な採用フロー・規模と健全性のバランスを掲げ、カスタマイズ手段を variants / custom content slots / overrides の3つに整理した。
転機は Text field や Select などの入力系コンポーネントが Figma 上は共通ベースなのにコードを共有していなかった発見で、コンポーネントレベルトークンでは順序や状態マップを扱えないため、Label + Input コンテナ + Hint text という共有レイアウトモデルとルートクラス→汎用コンテナ→特化クラスの構造で統一した。
結果として File Upload 等の複雑なコンポーネントの開発が加速し、スクリーンリーダー対応の自動化やマイクロアニメーション探索の余地も生まれ、「巨大なカタログより意図的でスケーラブルなアーキテクチャ」への転換が実を結んだとする。
