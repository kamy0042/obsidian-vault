---
type: summary
updated: 2026-07-26
---

# Planning a Design System Generation  by Nathan Curtis  Mar, 2024  Medium 要約

ソース: [[Planning a Design System Generation  by Nathan Curtis  Mar, 2024  Medium]]

Nathan Curtis による「Design System Generations」シリーズ第2回（2024年）で、ライブラリ全体を刷新する世代交代をどう計画・遂行するかを扱う。
ライフサイクルは、探索と合意形成を経てステークホルダーが計画にコミットする「戦略フェーズ」、Alpha（少数機能で作り方を実証）と Beta（本番利用に足る品質で段階提供）から成る「実装フェーズ」、そして「ローンチ／GA」から旧世代の廃止へと進む。
実装の戦術としては、以下を挙げる。

- マイルストーンを刻んだ漸進的デリバリー
- 依存関係ツリー（多くは Icon に遡る）による作業順序の決定
- 依存と類似性に基づく担当者へのバッチ割り当て
- 進捗を1枚で示す doneness matrix

品質は最初から高く保ち、量は S 字カーブで増え、API の安定性はローンチまでに固まればよい、とフェーズごとに期待値を変えるべきと説く。
世代交代はデザインシステムの一生で最大の節目であり、フェーズと節目を事前に伝えることで採用側が計画を立てられるようになる、と結ぶ。
