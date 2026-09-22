---
Created: 2024-12-18T01:13:00
URL: https://d7lazuefhn8wz.cloudfront.net/?path=/docs/tokens-web-global-typography-index--docs
Tags: [topic/ツール/BRIDGE]
---
# **Global Typography - Web**

TypographyのWeb用Globalトークンとして下記の値を定義しています。

これらは基本的にAliasトークンから参照する形で利用します。

例外的な対応が必要でAliasトークンを利用できない場面のみ、Globalトークンを直接利用します。

# font-family

**Figmaで利用する場合:** Hiragino Sans

**実装で利用する場合:** -apple-system, BlinkMacSystemFont, '.SFNSDisplay-Regular', 'Segoe UI', 'Helvetica Neue', 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', Meiryo, 'メイリオ', 'MS PGothic', 'ＭＳ Ｐゴシック', sans-serif

```plain text
globalTypography['font-family'].default

Copy

```

# font-size

Figma、実装ともに下記の値を利用します。

- xSmall: 11px
- small: 12px
- medium: 13px
- large: 14px
- xLarge: 16px
- xxLarge: 20px

```plain text
globalTypography['font-size'].{size}

Copy

```

# line-height

**Figmaで利用する場合:** font-size * 1.5の値を利用します

- xSmall: 16.5px
- small: 18px
- medium: 19.5px
- large: 21px
- xLarge: 24px
- xxLarge: 30px

**実装で利用する場合:** どのfont-sizeでも相対値として1.5を指定します

```plain text
globalTypography['line-height'].{size}

Copy

```

# font-weight

Figma、実装ともに下記の値を利用します。

- normal: 400
- bold: 700

```plain text
globalTypography['line-height'].{weight}

Copy

```