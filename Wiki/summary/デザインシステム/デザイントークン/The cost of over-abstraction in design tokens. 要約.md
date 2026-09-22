---
type: summary
updated: 2026-07-26
---

# The cost of over-abstraction in design tokens. 要約

ソース: [[The cost of over-abstraction in design tokens.]]

Mattia Astorino が、デザインシステムがスケールで失敗する主因は「早すぎ・多すぎ・間違った場所での抽象化」だと論じる批評。
デザイントークンは「immutable で非セマンティックな定数」であり、primary や text のような意図を知った瞬間にトークンではなく UI に埋め込まれた意思決定になると主張する。
過剰抽象化は技術問題ではなく認知問題で、「subtle」のような解釈を要する名前は複雑さを人の頭の中へ移し替え、新規メンバーの速度を落とす。
必要な層は「Design Tokens（原始・定数）→ Theme Tokens（セマンティック・文脈依存）→ UI」の2層のみで、px/rem などプラットフォーム差は Style Dictionary 等の変換層が担うべきとする。
セマンティクス自体は悪ではなく置き場所の問題であり、この境界を守れば一貫性は規約や文書ではなく構造そのものから生まれると結論づける。
