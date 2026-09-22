---
type: summary
updated: 2026-09-22
---

# Stop using OKLCH lightness for your color scale 要約

ソース: [[Stop using OKLCH lightness for your color scale]]

OKLCH は知覚的に滑らかな色の生成や補間には優れるが、その L 値は WCAG が使う相対輝度そのものではないため、コントラストを予測する尺度にはできない。
カラーパレットの weight は明暗の順序だけでなく、異なる段の組み合わせが一定の可読性を持つという約束も担うため、OKLCH lightness をそのまま番号へ割り当てると約束が成立しない。
同じ OKLCH L を持つ色でも色相と彩度によって相対輝度が異なり、同じ背景に対する WCAG コントラストの合否が分かれる。
筆者は、相対輝度 Y の知覚尺度である CIE L* を weight の外部基準に使う方法を提案し、Google HCT が CAM16 の色相・彩度と CIE L* の tone を組み合わせる例を挙げる。
結論は OKLCH を捨てることではなく、色を作る「ブラシ」として使い続け、位置とコントラストを測る「定規」には CIE L* と実際のコントラスト計算を使い分けよ、というものだ。
