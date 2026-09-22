---
type: summary
updated: 2026-07-26
---

# Dark Mode with Style Dictionary  dbanksdesign 要約

ソース: [[Dark Mode with Style Dictionary  dbanksdesign]]

Style Dictionary 作者 Danny Banks による、Web / iOS / Android を横断したダークモード対応トークンビルドの実装解説。
1つのトークンに `value` と `darkValue` を同居させる single-token 方式を軸に、CSS・Android リソース・iOS colorset それぞれへ出力するカスタムフォーマット／アクションの実装を示す。
single-token 方式は Style Dictionary が `value` しか変換しないという制約のため `darkValue` を必ず参照にする必要があり、SVG グラフィックスもダーク版ファイルを別途用意するなど、カスタマイズが重くなる。
結論として著者は、モード別にトークンファイルを分ける multi-file 方式（background.json / background.dark.json）を推奨する——カスタマイズ量が少なく、Android の慣習にも近いためである。
いずれの方式でも多層のトークン構造と参照を活用すれば、ダーク値を持たせるトークンは一握りで済み、high contrast などモード追加にも漸進的に拡張できると締めくくる。
