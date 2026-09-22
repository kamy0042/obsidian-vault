---
Created: 2024-12-18T01:10:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-general-text--docs
Tags: [topic/ツール/BRIDGE]
---
# General - Text

**※ text限定**

汎用的なテキスト色を構造化したものです。要素の強度によって各色を使い分けてください。

利用の際は、他のコンセプトにもっと最適なものがないか検討してください。

## strong

- テキストの中でも、特に強調したい箇所に利用します
- 主に見出し等に用いられます

<AliasTokenPath path='general.strong' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper text={baseText.general.strong.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.strong.default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseText.general.strong.disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.strong.disabled
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper text={baseTextDark.general.strong.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.strong.default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseTextDark.general.strong.disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.strong.disabled
}} />
</ColorItemWrapper>
</div>
</ThemeWrapper>

## primary

- メインのテキスト色として利用します

<AliasTokenPath path='general.primary' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper text={baseText.general.primary.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.primary.default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseText.general.primary.disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.primary.disabled
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper text={baseTextDark.general.primary.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.primary.default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseTextDark.general.primary.disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.primary.disabled
}} />
</ColorItemWrapper>
</div>
</ThemeWrapper>

## secondary

- 補助的なテキスト色として一部分にのみ利用します
- infoメッセージのタイトル等に用いられます

<AliasTokenPath path='general.secondary' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper text={baseText.general.secondary.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.secondary.default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseText.general.secondary.disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.secondary.disabled
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper text={baseTextDark.general.secondary.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.secondary.default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseTextDark.general.secondary.disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.secondary.disabled
}} />
</ColorItemWrapper>
</div>
</ThemeWrapper>

## tertiary

- 最も弱いテキスト色として利用します
- 入力フォームのプレースホルダーやその他の付帯的な情報用のテキスト色として用いられます

<AliasTokenPath path='general.tertiary' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper text={baseText.general.tertiary.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.tertiary.default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseText.general.tertiary.disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.tertiary.disabled
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper text={baseTextDark.general.tertiary.default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.tertiary.default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseTextDark.general.tertiary.disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.tertiary.disabled
}} />
</ColorItemWrapper>
</div>

</ThemeWrapper>

## on-background

- テキストを濃い背景色の上に載せたい時に、視認性を確保するために利用します

<AliasTokenPath path='general["on-background"]' hasState/>

<ThemeWrapper>
<div>
<ColorItemWrapper text={baseText.general["on-background"].default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general["on-background"].default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseText.general["on-background"].disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general["on-background"].disabled
}} />
</ColorItemWrapper>
</div>
<div>
<ColorItemWrapper text={baseTextDark.general["on-background"].default.$value}>
<ColorItem title="default" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general["on-background"].default
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseTextDark.general["on-background"].disabled.$value}>
<ColorItem title="disabled" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general["on-background"].disabled
}} />
</ColorItemWrapper>
</div>
</ThemeWrapper>

## link

- ページ間のテキストリンクに用いられます

<AliasTokenPath path='general.link'/>

<ThemeWrapper>
<ColorItemWrapper text={baseText.general.link.$value}>
<ColorItem title="" subtitle="" colors={{
background:"",
border:"",
text:colorsLight.text.general.link,
}} />
</ColorItemWrapper>
<ColorItemWrapper text={baseTextDark.general.link.$value}>
<ColorItem title="" subtitle="" colors={{
background:"",
border:"",
text:colorsDark.text.general.link,
}} />
</ColorItemWrapper>
</ThemeWrapper>