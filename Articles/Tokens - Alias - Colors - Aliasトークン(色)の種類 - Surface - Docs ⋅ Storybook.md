---
Created: 2024-12-18T01:12:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-surface--docs
Tags: [topic/ツール/BRIDGE]
---
# Surface

**※ background限定**

コンテンツの記載面全般に利用します。

その特性上、背景色としてのみ機能します。

記載面の高さに応じて3段階に分かれていますが、あくまでも概念的な高さであり、z-indexと直接の関係はありません

## base

- 主なコンテンツエリアに利用します
- 例：タイムラインなど

<AliasTokenPath path='surface.base' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper bg={baseBg.surface.base.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:colorsLight.background.surface.base.default,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBg.surface.base.hovered.$value}>
<ColorItem title="hovered" subtitle="" colors={{
background:colorsLight.background.surface.base.hovered,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBg.surface.base.pressed.$value}>
<ColorItem title="pressed" subtitle="" colors={{
background:colorsLight.background.surface.base.pressed,
border:"",
text:"",
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper bg={baseBgDark.surface.base.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:colorsDark.background.surface.base.default,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.surface.base.hovered.$value}>
<ColorItem title="hovered" subtitle="" colors={{
background:colorsDark.background.surface.base.hovered,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.surface.base.pressed.$value}>
<ColorItem title="pressed" subtitle="" colors={{
background:colorsDark.background.surface.base.pressed,
border:"",
text:"",
}} />
</ColorItemWrapper>
</div>
</ThemeWrapper>

## upper

- 主なコンテンツエリアの上位に存在する要素に利用します
- 例：ポップアップやルームヘッダーなど

<AliasTokenPath path='surface.upper' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper bg={baseBg.surface.upper.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:colorsLight.background.surface.upper.default,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBg.surface.upper.hovered.$value}>
<ColorItem title="hovered" subtitle="" colors={{
background:colorsLight.background.surface.upper.hovered,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBg.surface.upper.pressed.$value}>
<ColorItem title="pressed" subtitle="" colors={{
background:colorsLight.background.surface.upper.pressed,
border:"",
text:"",
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper bg={baseBgDark.surface.upper.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:colorsDark.background.surface.upper.default,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.surface.upper.hovered.$value}>
<ColorItem title="hovered" subtitle="" colors={{
background:colorsDark.background.surface.upper.hovered,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.surface.upper.pressed.$value}>
<ColorItem title="pressed" subtitle="" colors={{
background:colorsDark.background.surface.upper.pressed,
border:"",
text:"",
}} />
</ColorItemWrapper>
</div>
</ThemeWrapper>

## lower

- 主なコンテンツエリアの下位に存在する要素に利用します
- 例：ルームリストやルーム概要など

<AliasTokenPath path='surface.lower' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper bg={baseBg.surface.lower.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:colorsLight.background.surface.lower.default,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBg.surface.lower.hovered.$value}>
<ColorItem title="hovered" subtitle="" colors={{
background:colorsLight.background.surface.lower.hovered,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBg.surface.lower.pressed.$value}>
<ColorItem title="pressed" subtitle="" colors={{
background:colorsLight.background.surface.lower.pressed,
border:"",
text:"",
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper bg={baseBgDark.surface.lower.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:colorsDark.background.surface.lower.default,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.surface.lower.hovered.$value}>
<ColorItem title="hovered" subtitle="" colors={{
background:colorsDark.background.surface.lower.hovered,
border:"",
text:"",
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.surface.lower.pressed.$value}>
<ColorItem title="pressed" subtitle="" colors={{
background:colorsDark.background.surface.lower.pressed,
border:"",
text:"",
}} />
</ColorItemWrapper>
</div>
</ThemeWrapper>