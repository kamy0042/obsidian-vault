---
type: summary
updated: 2026-07-26
---

# Design tokens - Spectrum 要約

ソース: [[Design tokens - Spectrum]]

Adobe Spectrum のデザイントークン公式ドキュメントで、トークンを3タイプに分類して使い分けを定める。

- Global tokens — 文脈非依存の名前を持つプリミティブ値（カラーパレット、アニメーション、タイポグラフィ、寸法）
- Alias tokens — 特定の文脈や抽象に結びつき、トークンの意図を伝える層
- Component-specific tokens — コンポーネントに紐づく全値の網羅的表現

サイズトークンは基準値に対するパーセント表記（size-100 = 基準の100%）で、デスクトップ／モバイルの2スケールに自動対応し、ボーダー太さのようにスケール間で不変の値は static-size として分離する。
使用指針は「Global は控えめに、Alias を使える場所では常に Alias を、Component-specific は当該コンポーネントにのみ」で、特に Alias は Spectrum を理解する『ロゼッタストーン』として製品がシステムの進化に追従するための推奨手段と位置づけられる。
