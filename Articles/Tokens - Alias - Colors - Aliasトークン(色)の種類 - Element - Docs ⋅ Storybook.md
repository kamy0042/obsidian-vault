---
Created: 2024-12-18T01:12:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-element--docs
Tags: [topic/ツール/BRIDGE]
---
# Element

**※ border限定**

画像やポップアップなど、UI中に存在する何らかの要素に依存しているボーダー色です。

## image

- 画像やアバターを囲むボーダーとして利用します

<AliasTokenPath path='element.image' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper border={baseBorder.element.image.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:colorsLight.border.element.image.default,
text:""
}} />
</ColorItemWrapper>
<ColorItemWrapper border={baseBorder.element.image.hovered.$value}>
<ColorItem title="hovered" subtitle="" colors={{
background:"",
border:colorsLight.border.element.image.hovered,
text:""
}} />
</ColorItemWrapper>
<ColorItemWrapper border={baseBorder.element.image.pressed.$value}>
<ColorItem title="pressed" subtitle="" colors={{
background:"",
border:colorsLight.border.element.image.pressed,
text:""
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper border={baseBorderDark.element.image.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:colorsDark.border.element.image.default,
text:""
}} />
</ColorItemWrapper>
<ColorItemWrapper border={baseBorderDark.element.image.hovered.$value}>
<ColorItem title="hovered" subtitle="" colors={{
background:"",
border:colorsDark.border.element.image.hovered,
text:""
}} />
</ColorItemWrapper>
<ColorItemWrapper border={baseBorderDark.element.image.pressed.$value}>
<ColorItem title="pressed" subtitle="" colors={{
background:"",
border:colorsDark.border.element.image.pressed,
text:""
}} />
</ColorItemWrapper>
</div>
</ThemeWrapper>

## frame

- ポップアップ系UIを囲むボーダーとして利用します

<AliasTokenPath path='element.frame'/>
<ThemeWrapper>
<ColorItemWrapper border={baseBorder.element.frame.$value}>
<ColorItem title="" subtitle="" colors={{
background:"",
border:colorsLight.border.element.frame,
text:""
}} />
</ColorItemWrapper>
<ColorItemWrapper border={baseBorderDark.element.frame.$value}>
<ColorItem title="" subtitle="" colors={{
background:"",
border:colorsDark.border.element.frame,
text:""
}} />
</ColorItemWrapper>
</ThemeWrapper>
