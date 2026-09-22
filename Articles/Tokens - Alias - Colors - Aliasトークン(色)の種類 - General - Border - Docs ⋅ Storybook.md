---
Created: 2024-12-18T01:07:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-general-border--docs
Tags: [topic/ツール/BRIDGE]
---
# General - Border

**※ border限定**

汎用的なボーダー色を構造化したものです。要素の強度によって各色を使い分けてください。

利用の際は、他のコンセプトにもっと最適なものがないか検討してください。

## primary

- 特定の利用箇所に依存しない、メインのボーダー色として利用します

<AliasTokenPath path='general.primary'/>

<ThemeWrapper>
<ColorItemWrapper border={baseBorder.general.primary.$value}>
<ColorItem title="" subtitle="" colors={{
background:"",
border:colorsLight.border.general.primary,
text:""
}} />
</ColorItemWrapper>
<ColorItemWrapper border={baseBorderDark.general.primary.$value}>
<ColorItem title="" subtitle="" colors={{
background:"",
border:colorsDark.border.general.primary,
text:""
}} />
</ColorItemWrapper>
</ThemeWrapper>

## secondary

- 補助的なボーダー色として利用します
- タブバー内で選択中のタブやinfoメッセージに用いられます

<AliasTokenPath path='general.secondary'/>

<ThemeWrapper>
<ColorItemWrapper border={baseBorder.general.secondary.$value}>
<ColorItem title="" subtitle="" colors={{
background:"",
border:colorsLight.border.general.secondary,
text:""
}} />
</ColorItemWrapper>
<ColorItemWrapper border={baseBorderDark.general.secondary.$value}>
<ColorItem title="" subtitle="" colors={{
background:"",
border:colorsDark.border.general.secondary,
text:""
}} />
</ColorItemWrapper>
</ThemeWrapper>