---
type: summary
updated: 2026-07-26
---

# デザインシステムにおけるタイポグラフィーの試行錯誤 - DMM inside 要約

ソース: [[デザインシステムにおけるタイポグラフィーの試行錯誤 - DMM inside]]

DMM のデザインシステム「Turtle」におけるタイポグラフィー設計の事例。
Adobe Spectrum の Global Token / Alias Token の概念を取り入れ、15段階のフォントサイズを Global Token として定義し、Alias Token は heading / body / buttonText の3種にとどめる。
`label` のような詳細度の高い Component Specific Token は作らない——多数のサービスに展開する DMM ではトークンが増えるほど提供側と利用側のギャップが広がり一貫性を保てなくなるため、MUI などの OSS を参考に詳細度を高めない設計とし、ベストプラクティスはコンポーネント側に集約する。
Alias Token でカバーできない表現（ヒーローヘッダーの巨大文字など）は Global Token を直接使ってよい運用にして柔軟性を確保している。
さらに `clamp()` によるレスポンシブタイポグラフィで、画面幅ごとに異なるスケールのニーズ（小画面では小さく・大画面では大きく）をデザイン・実装コストを抑えて実現している。
