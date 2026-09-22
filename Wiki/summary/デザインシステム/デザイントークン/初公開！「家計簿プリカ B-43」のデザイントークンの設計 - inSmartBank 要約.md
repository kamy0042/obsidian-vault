---
type: summary
updated: 2026-07-26
---

# 初公開！「家計簿プリカ B-43」のデザイントークンの設計 - inSmartBank 要約

ソース: [[初公開！「家計簿プリカ B-43」のデザイントークンの設計 - inSmartBank]]

スマートバンクのデザイナー putchom による「家計簿プリカ B/43」のデザイントークン設計の全面公開記事。
Material Design 3 を参考に、カラーコード等の参照用「Reference Token」とシステム全体で使う抽象化された「System Token」の2分類とし、コンポーネントレベルのトークンは Tokens Studio for Figma で適用先を判断できるため採用しなかった。
命名は Nathan Curtis の「Naming Tokens in Design Systems」を参考に Domain（b43）・Category・Type・Property・Theme（light/dark）のレイヤー構造を図式化し、size は extraSmall〜extraLarge に統一するなど「B/43 における一般的な命名」を先に定義して揺れを防いでいる。
ビルドは Style Dictionary で iOS / Android / Figma / Web / Primer Prism 向けに生成し、Figma へは GitHub Actions 経由で自動配信、W3C の Design Tokens Format Module に将来寄せやすい形を意識して設計している。
効果は共通言語化（トークン名だけで意図が伝わる）と日々の判断コスト削減で、課題はキャッチアップコストの高さと仕様が過渡期であることだと率直に述べる。
