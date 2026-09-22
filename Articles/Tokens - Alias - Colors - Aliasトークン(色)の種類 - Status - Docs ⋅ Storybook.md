---
Created: 2024-12-18T01:11:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-alias-colors-alias%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-%E8%89%B2-%E3%81%AE%E7%A8%AE%E9%A1%9E-status--docs
Tags: [topic/ツール/BRIDGE]
---
# Status

システムの状態やユーザー操作に応じたステータス表示に利用します。

※エラーの分類についての詳細は
[通知（エラー）の分類・パターン定義 - CW Spec - Confluence](https://chatwork.atlassian.net/wiki/spaces/CWSPEC/pages/1321141246)
を参照してください。

## positive

- 以下の状況で利用します
    - 処理が正常におこなわれた
    - 利用可能のラベリング

<AliasTokenPath path='status.positive' />

<ThemeWrapper>
<ColorItemWrapper bg={baseBg.status.positive.$value} border={baseBorder.status.positive.$value} text={baseText.status.positive.$value}>
<ColorItem title="" subtitle="" colors={{
background:colorsLight.background.status.positive,
border:colorsLight.border.status.positive,
text:colorsLight.text.status.positive
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.status.positive.$value} border={baseBorderDark.status.positive.
value} text={baseTextDark.status.positive.$value}>
<ColorItem title="" subtitle="" colors={{
background:colorsDark.background.status.positive,
border:colorsDark.border.status.positive,
text:colorsDark.text.status.positive
}} />
</ColorItemWrapper>
</ThemeWrapper>

## negative

- 以下の状況で利用します
    - 致命的な状態に陥っている（陥る懸念のある）場合
    - 障害発生
    - 禁止事項
    - Chatworkの責任下での処理エラー
    - 復元不可能な致命的な操作についての警告

<AliasTokenPath path='status.negative' />

<ThemeWrapper>
<ColorItemWrapper bg={baseBg.status.negative.$value} border={baseBorder.status.negative.$value} text={baseText.status.negative.$value}>
<ColorItem title="" subtitle="" colors={{
background:colorsLight.background.status.negative,
border:colorsLight.border.status.negative,
text:colorsLight.text.status.negative
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.status.negative.$value} border={baseBorderDark.status.negative.
value} text={baseTextDark.status.negative.$value}>
<ColorItem title="" subtitle="" colors={{
background:colorsDark.background.status.negative,
border:colorsDark.border.status.negative,
text:colorsDark.text.status.negative
}} />
</ColorItemWrapper>
</ThemeWrapper>

## information

- 特定の文脈を持たない、単純な状態の通知に利用します
- 処理中であることを表します

<AliasTokenPath path='status.information' />

<ThemeWrapper>
<ColorItemWrapper bg={baseBg.status.information.$value} border={baseBorder.status.information.$value} text={baseText.status.information.$value}>
<ColorItem title="" subtitle="" colors={{
background:colorsLight.background.status.information,
border:colorsLight.border.status.information,
text:colorsLight.text.status.information
}} />
</ColorItemWrapper>
<ColorItemWrapper bg={baseBgDark.status.information.$value} border={baseBorderDark.status.
information.$value} text={baseTextDark.status.information.$value}>
<ColorItem title="" subtitle="" colors={{
background:colorsDark.background.status.information,
border:colorsDark.border.status.information,
text:colorsDark.text.status.information
}} />
</ColorItemWrapper>
</ThemeWrapper>

## warning

- ユーザーの動作や挙動に警告する時に利用します
- このまま進めるとユーザーに不利益があることを表します

<AliasTokenPath path='status.warning' />

<ThemeWrapper>
<ColorItemWrapper bg={baseBg.status.warning.$value} border={baseBorder.status.warning.$value} text={baseText.status.warning.$value}>
<ColorItem title="" subtitle="" colors={{
background:colorsLight.background.status.warning,
border:colorsLight.border.status.warning,
text:colorsLight.text.status.warning
}} />
</ColorItemWrapper>
<ColorItemWrapper
bg={baseBgDark.status.warning.$value}
border={baseBorderDark.status.warning.
value}
text={baseTextDark.status.warning.$value}>
<ColorItem title="" subtitle="" colors={{
background:colorsDark.background.status.warning,
border:colorsDark.border.status.warning,
text:colorsDark.text.status.warning
}} />
</ColorItemWrapper>
</ThemeWrapper>