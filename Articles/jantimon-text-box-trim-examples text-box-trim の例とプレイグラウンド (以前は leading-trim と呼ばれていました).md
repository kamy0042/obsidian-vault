---
Created: 2025-02-14T00:56:00
URL: https://github.com/jantimon/text-box-trim-examples
Tags: [topic/技術/CSS]
---
# CSS Text Box Trim

![](https://github.com/jantimon/text-box-trim-examples/raw/main/public/leading-trim.png)

CSS Text Box Trim is a CSS property that allows you to remove the leading whitespace from a block of text. This is useful for removing the space between the top of the text and the top of the container.

🚨 `text-box-trim` is the new name for `leading-trim`: [w3c/csswg-drafts#8067 (comment)](https://github.com/w3c/csswg-drafts/issues/8067#issuecomment-1451111081)

## Usage

```plain text
.text-box-trim {
  text-box-trim: both;
  text-box-edge: cap alphabetic;
}
```

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/intro.webp)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/ascender.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/asian-fonts.png)

## Playground

text-box-trim can be enabled with a feature flag in Chromium browsers and Safari. Alternatively, you can try it out in the [**playground**](https://text-box-trim.vercel.app/?c=FwJw9mAuAEDeBQ1oFpkA8DOxoBYAOaA3IisltABwHFKoC22AjAGzXwC%2088AdAO4gBDPHgCmIOCSR0BaZLwCWAE0gALJhQAMbJEgBGYEIrHIANiIBmkbACYC0DGBNLoukwIDGAaxo68AxYryAHYA5qYWVrjaOtIgIcHI%20pCQYAzQAG4CIAAU9ACUxJzwKowSOtBm-sFhkCDyaUkqPkiQImiQyCKKISLY7kLQre3N0O6OBthxutnWAKyzADSUjEsaBZLQsfFB2BojWwlJKWmZOfmFXHhlOpWBoci19diNI0MdXT19A2-7Wdu7Fy4ugArskwEFrn4AtUbHZ8EQOPAQWCIQA%20ex%20CEIcq3aoPOoNKBNDZvTrdXqjb5tSAjQIYPBuACe2GCTiCIkSJjAXkKAB4APT81G8wLpUZuDAYAC8ACJ%20EJRCAZaiNrySiryjiRFVQtBebpxELBgTVfz1aq8BrNUhcfdHnRoPIMNABPZgSEehhWopoOzeNAAMIAZSD0Dw4EVkEZgxUAhgZkgzuBzpAIjoYHSIhjWepggxHmqjohIkzIGj5nBMAcMbj0F4Wf6EPTqbDqcC7kgAlc0a9jLMg2p3FNlvgAtFKtHyJSQStSF59IEM425XcTi8mxEpoXS4FU-BqKAA)

## Playground Examples

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview-text-box-edges.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview-button.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview-subgrid.png)

## Text Edge Values

Text edge values are based of a fonts OpenType meta data. It will also be possible to define these values with css: [https://www.w3.org/TR/css-fonts-5/#font-metrics-override-desc](https://www.w3.org/TR/css-fonts-5/#font-metrics-override-desc)

Visualisation of the different text-box-edge values:

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--normal-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--text-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--ex-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--ex-alphabetic-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--cap-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--cap-alphabetic-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--ideographic-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--ideographic-ideographic-ink-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--ideographic-ink-.png)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/preview--text-box-edge--ideographic-ink-ideographic-.png)

## Browser Support

- [Can I use](https://caniuse.com/css-text-box-trim)
- [WebPlatformTests](https://results.web-platform-tests.org/results/css/css-inline/text-box-trim)

| Browser | Version |
| --- | --- |
| Chrome | Available behind a feature flag in v128+ |
| Firefox | - |
| Safari | Available behind a feature flag in v16.4+, available in Technology Preview 171+ |
| Opera | - |
| Edge | Available behind a feature flag in v128+ |

## Talks

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/talk-precise-text-alignment.png)

## Initial

[Initial idea from October 2018](https://lists.w3.org/Archives/Public/www-archive/2018Oct/0004.html)

## Proposal

[w3c/csswg-drafts#3240](https://github.com/w3c/csswg-drafts/issues/3240) [https://www.w3.org/TR/css-inline-3/#propdef-text-box-trim](https://www.w3.org/TR/css-inline-3/#propdef-text-box-trim)

## Usecases

Here are some cases where this property can be useful:

### Centering text in buttons

```plain text
button {
    padding: 6px
}
```

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/button.webp)

With text-box-trim:

```plain text
button {
  text-box-trim: both;
  text-box-edge: cap alphabetic;
  padding: 10px
}
```

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/button-leading-trim.webp)

### Spacing Systems

Most design systems have a spacing system that is based on multiples of a base unit. For example, a spacing system might have a base unit of 4px, and then multiples of that unit, such as 8px, 12px, 16px, etc. This is a great way to ensure that spacing is consistent across the design system.

However the added line-height destroys the spacing system:

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/spacing-system.webp)

### Icons

Aligning icons with text is a common problem. With leading trim, you can align the icon with the text:

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/icon.jpeg)

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/icon2.png)

### Images

In articles images are often placed next to images. The leading trim property allows you to remove the whitespace above the text to align the text with the image.

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/image.png)

### Art

Especially in logo design and art leading trim can be used to create aligned different text elements:

![](https://github.com/jantimon/text-box-trim-examples/raw/main/docs/art.jpg)

## Open Issues

- [Firefox Issue 1816038 - [css-inline-3] Implement ](https://bugzilla.mozilla.org/show_bug.cgi?id=1816038)[`text-box-trim`](https://bugzilla.mozilla.org/show_bug.cgi?id=1816038)[ (formerly ](https://bugzilla.mozilla.org/show_bug.cgi?id=1816038)[`leading-trim`](https://bugzilla.mozilla.org/show_bug.cgi?id=1816038)[)](https://bugzilla.mozilla.org/show_bug.cgi?id=1816038)
- [Chromium Issue 1411581 - Implement ](https://bugs.chromium.org/p/chromium/issues/detail?id=1411581)[`text-box-trim`](https://bugs.chromium.org/p/chromium/issues/detail?id=1411581)[ property](https://bugs.chromium.org/p/chromium/issues/detail?id=1411581)
- [Webkit Issue 252161 - [leading-trim] nested elements shift text upwards](https://bugs.webkit.org/show_bug.cgi?id=252161)

## Related Links

- [w3.org text-box-trim](https://www.w3.org/TR/css-inline-3/#leading-trim)
- [w3.org text-box-edge](https://www.w3.org/TR/css-inline-3/#text-box-edges)
- [Leading-Trim: The Future of Digital Typesetting](https://medium.com/microsoft-design/leading-trim-the-future-of-digital-typesetting-d082d84b202)
- [Typography design 101: a guide to rules and terms](https://en.99designs.it/blog/tips/typography-design/)
- [CapSize](https://seek-oss.github.io/capsize/)
- [Deep dive CSS: font metrics, line-height and vertical-align](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align)
- [Online fonteditor](https://kekee000.github.io/fonteditor/index-en.html)

## Credits

- [Elika J. Etemad (fantasai)](https://twitter.com/fantasai) (Spec, Images, Talk)
- [Ethan Wang ](https://twitter.com/SashimiEthan) (Images, Talk)
- [Andrea Stan](https://en.99designs.it/profiles/mky) (Images)
- [Vincent De Oliveira](http://twitter.com/iamvdo) (Button Image)
- [Kanji Database Project](https://kanji-database.sourceforge.net/index.html?lang=en) (Image)
- [Anton Ball](https://medium.com/@antonball) (SubGrid Example)