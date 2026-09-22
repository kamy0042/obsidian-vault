---
type: summary
updated: 2026-07-26
---

# Our Core Design System was not enough  Why we built a Domain-Specific Design System (and how it made us scale) 要約

ソース: [[Our Core Design System was not enough  Why we built a Domain-Specific Design System (and how it made us scale)]]

会計 SaaS の Pennylane が、数百種類の税務申告フォームを扱う領域でコアデザインシステムの限界に直面し、ドメイン特化デザインシステムを構築した事例記事。
表面上は順調に見えても、Figma とコードで名前が食い違う「翻訳税」、スコッド間の重複実装、80%しか一致しないデザインファイルなどの見えない負債が蓄積し、28フォーム中に同一部品の実装が8通り存在していた。
ドメインロジックが UI に埋め込まれている・グローバル DS への貢献パイプラインでは遅すぎる、といった条件が揃うとき、ドメイン特化の専用レイヤーが有効だと整理する。
ロードマップを一時停止して監査を行い、Figma ライブラリをコードベースの「双子」（React の DeclarationCard は Figma でも DeclarationCard）として再構築し、見た目ではなく振る舞いをドキュメント化した。
結果としてハンドオフの往復が消えてデリバリー速度は4倍になり、バックエンドエンジニアでも単独でフォームを構築でき、優れたコンポーネントはコア DS へ昇格するパイプラインも生まれたが、システム優先の思考やガバナンス整備という新たな課題も残ると率直に認めている。
