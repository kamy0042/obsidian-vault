---
type: summary
updated: 2026-09-22
---

# From UI Archaeology to Design System Infrastructure 要約

ソース: [[From UI Archaeology to Design System Infrastructure]]

成熟したレガシー製品では、Figma、文書、コード、本番画面がそれぞれ異なる現実を持つため、本番そのものをデザインシステムの入力として扱う必要がある。
DOM、computed styles、CSS、UiBinder/XML、Java の参照関係を抽出し、環境非依存の正規化コンポーネントモデルへ変換する構想により、反復的な「UI 考古学」を減らせる。
ただし生の実装をそのまま移すと既存の不整合まで複製するため、同一パターンか、正当な variant か、廃止対象かという判断は人間が行う。
正規化モデルは Figma だけでなく、文書、実装参照、棚卸し、移行追跡、監査、プロダクトカバレッジにも使え、デザインシステムを現状と将来像の調停層に変える。
結論は、デザイン判断を自動化するのではなく、抽出・照合・翻訳を自動化して判断に使える時間を増やすことであり、記事自身もこの仕組みを探索的構想だと明記している。
