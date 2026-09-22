---
type: summary
updated: 2026-07-25
---

# Building Durable Component APIs for Design Systems – Blog – Supernova.io 要約

ソース: [[Building Durable Component APIs for Design Systems – Blog – Supernova.io]]

Booking.com のプリンシパルフロントエンドエンジニアで Reshaped 作者の Dmitry Belyaev が、デザインシステムの採用促進の鍵となる、耐久性のあるコンポーネント API（プロパティ設計）の作り方を解説した記事。
まず既存コードや技術的制約から考えるのではなく、利用者視点で理想の使用コードを書いてから複雑さを段階的に足す「dream-driven development」（The best API is no API）を提唱する。
プロパティの名前と値はコンポーネント単位でなくシステム全体で一貫させ（type/mode/variant などの混在を避ける）、同じサイズ値のコンポーネント同士が並べて機能するよう設計し、「システムが許容する組み合わせは必ずどこかで使われる」前提で未サポートの組み合わせを最小化すべきとする。
また全要件の予測は不可能なため、プロダクトチームをブロックしない「escape hatches」を恐れず提供すべきで、その際はスタイル上書きではなくコンポジションによる拡張を推奨する（使わせないとチームがシステム自体を離脱する方が悪いため）。
さらにプロパティ名は各プラットフォームの慣習（Figma では image、Web では src）に合わせるべきで、初回で理想の API は作れない前提で意思決定ログを残し、破壊的変更を段階的に展開する戦略を持つことが結論である。
