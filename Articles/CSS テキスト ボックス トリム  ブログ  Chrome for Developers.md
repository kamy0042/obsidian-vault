---
Created: 2025-02-14T00:55:00
URL: https://developer.chrome.com/blog/css-text-box-trim?hl=en
Tags: [topic/技術/CSS]
---
Take back space from above and below your text content; achieve optical balance.

From Chrome 133, `text-box` lets developers and designers tailor the space above and below text.

Browser Support

- 133
- 133
- x
- 18.2

**Longhand:**

```plain text
text-box-trim: trim-start | trim-end | trim-both | none;
text-box-edge: cap | ex | text | leading + alphabetic | text;

```

**Shorthand:**

```plain text
text-box: trim-both cap alphabetic;

```

This property lets you control the space above and below text, for example `<h1>`, `<button>` and `<p>`. Every font produces a different amount of this block directional space which contributes to the element's size. This chaotic space contribution is not easily measured, and has been impossible to control until now.

The font knows, now CSS knows!

![](https://developer.chrome.com/static/blog/css-text-box-trim/text-box-intro.mp4)

[https://codepen.io/web-dot-dev/pen/xbKjRxL](https://codepen.io/web-dot-dev/pen/xbKjRxL)

The space above and below a font is due to how the web lays out text, called "half-leading". This is expertly covered in a post by [Matthias Ott](https://matthiasott.com/) called [The Thing With Leading In CSS](https://matthiasott.com/notes/the-thing-with-leading-in-css). Essentially, when typesetting was done by hand, pieces of metal lead were used to separate lines of text. The web, inspired by leading, divides that piece of lead in half and distributes a piece above and a piece below the content.

![](https://developer.chrome.com/static/blog/css-text-box-trim/half-leading_2880.png)

A headline is shown with a hotpink bar above and below the text to show half-leading.

This history is meaningful because, `text-box` gives us names for each half: over and under. Plus, the ability to trim it off.

There is prior art to `text-box` also, you may recall the exciting post from Ethan Wang called [Leading-Trim: The Future Of Digital Typesetting](https://medium.com/microsoft-design/leading-trim-the-future-of-digital-typesetting-d082d84b202), where `leading-trim` (the name `text-box` previously had) was first introduced.

![](https://developer.chrome.com/static/blog/css-text-box-trim/gutenberg-leading-trim.gif)

A headline is shown with excess space above and below appear to be cut with scissors and removed.

Your entry point into text trimming might be from [Figma and its "vertical trim" controls](https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties#h_01H96FW9Z3W7J7Z2HEN8V17BZT) for designers. [This X post demonstrates where this vertical trim option is](https://x.com/figma/status/1640750882613493760) and how it's helpful for buttons.

![](https://developer.chrome.com/static/blog/css-text-box-trim/figma-text-box-trim.mp4)

[Source](https://x.com/figma/status/1640750882613493760)

Regardless of how you got here, this small sounding typography control can make a big difference.

## Feature and syntax overview

Here, in my opinion, are the two most common one-liners you'll need when working with `text-box`:

```plain text
h1 {
  /* trim both sides to the capital letters */
  text-box: trim-both cap alphabetic;

  /* trim both sides to the lowercase letter x */
  text-box: trim-both ex alphabetic;
}

```

Trimming both to `cap alphabetic` will be the most common use of this feature. The following demos use this many times. However, the previous example also shows `ex alphabetic` because it is useful for optical balance in its own unique ways.

### Explorer playground

The following demo lets you [explore the syntax](https://codepen.io/web-dot-dev/pen/RNbyooE) and see results using dropdown menus. You can change fonts, change over and under trim values, and follow along with the color coded visuals and labels.

![](https://developer.chrome.com/static/blog/css-text-box-trim/syntax-explorer_2880.png)

A screenshot of the syntax explorer demo. Shows the font and a dropdown to choose a different font. A syntax preview with text-box: trim-both cap alphabetic syntax highlighted and shown. Finall, there's 3 more dropdowns to choose trim values.

**Things to try:**

1. Visually inspecting how `text-box-trim` works across single line and multi-line text variants.
2. Hovering over a variant, seeing the trim values used to achieve that effect.
3. Changing the font.
4. Trimming only one side of a text box.
5. Review the syntax as you play.

![](https://developer.chrome.com/static/blog/css-text-box-trim/syntax-explorer.mp4)

[https://codepen.io/web-dot-dev/pen/RNbyooE](https://codepen.io/web-dot-dev/pen/RNbyooE)

## What can I build with it or what problems does it solve?

There are some much simpler centering and alignment solutions that emerge from this trim capability. You can even get closer to proper leading, where something like `gap` can be used between contents.

![](https://developer.chrome.com/static/blog/css-text-box-trim/leading_2880.png)

A comparison is shown between 2 groups of content. The first group has half-leading, the second has trimmed leading. The result is the second group is tighter together.

### Easier centering

For smaller, more inline and content intrinsic components, `padding: 10px` is a reasonable style to specify for an element for equal spacing on all sides. However, the result can confuse people, as it often has extra space on the top and bottom.

To work around this, developers often explicitly putting less padding on the top and bottom (block) to offset the effects of half leading.

```plain text
button {
  padding-block: 5px;
  padding-inline: 10px;
}

```

At this point we're left to try value combinations until things are optically centered. This might look good on one screen and operating system, but not on another.

`text-box` allows us to trim the half leading space from the text, making equal padding values like `10px` useful:

```plain text
button {
  text-box: trim-both cap alphabetic;
  padding: 10px;
}

```

![](https://developer.chrome.com/static/blog/css-text-box-trim/centering_2880.png)

Two examples are shown. The first shows an element with padding: 10px and half-leading. The second shows the same element with text-box: trim-both cap alphabetic. The result is the second button is optically centered.

**Note:** The following examples will show a regular sans serif font and an alternative fancy or fun font. Showing multiple fonts will help illustrate the dynamic capabilities of `text-box` and how it works across font families.

Here are a few `<button>` elements that show how trimming the space with `text-box` makes `padding: 10px` look equal on all sides in a practical interactive element. Notice how the alternative font can produce some wildly different half leading space.

![](https://developer.chrome.com/static/blog/css-text-box-trim/buttons_2880.png)

Three groups of buttons are shown. The first group shows a regular sans serif font. The second group shows a fancy or fun font. The third group shows the same effect but with a hand writing font. The point is to show each font has different half leading space, but the trim values are the same and can normalize the space.

Here are `<span>` elements, often used to show categories or badges. Another moment where equal sided padding should be the best solution, but until `text-box` we've had to work around it.

![](https://developer.chrome.com/static/blog/css-text-box-trim/tags_2880.png)

Tags are shown compared side by side. The first group has half-leading, the second has trimmed leading. The result is the second group is tighter together and optically centered.

### Easier Alignment

The extra, uncontrollable, half leading space above (`over`) and below (`under`) a text box also makes alignment difficult. The following examples show when half leading can make alignment difficult and how trimming the block sides of a text box can create better alignments.

Here an image is placed next to text. The image will grow to the height that the text needs, but without `text-box`, the image is always a little bit taller. With `text-box`, the image can perfectly align with the text content.

![](https://developer.chrome.com/static/blog/css-text-box-trim/trimmed-half-leading-for-alignment_2880.jpg)

[https://codepen.io/web-dot-dev/pen/yyBjVpg](https://codepen.io/web-dot-dev/pen/yyBjVpg)

Notice the whitespace is above the first formatted line of text and below the last formatted line of text in scenarios with line wrapping.

In the following example, notice how the feature [logically adapts](https://web.dev/learn/css/logical-properties) to a change in [`writing-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode). Try changing the text, watch how the layout continues to stay aligned.

![](https://developer.chrome.com/static/blog/css-text-box-trim/super-rad-design_2880.png)

[https://codepen.io/web-dot-dev/pen/dPbeOJQ](https://codepen.io/web-dot-dev/pen/dPbeOJQ)

## Continue study

Want to know more? The following list of links offer various amounts of additional information and use cases.

- [https://codepen.io/collection/zxQBaL](https://codepen.io/collection/zxQBaL) - a Codepen collection of all the above demo's
- [https://github.com/jantimon/text-box-trim-examples](https://github.com/jantimon/text-box-trim-examples) - Great research and demos by Jan Nicklas
- [https://css-tricks.com/two-css-properties-for-trimming-text-box-whitespace/](https://css-tricks.com/two-css-properties-for-trimming-text-box-whitespace/)
- [https://drafts.csswg.org/css-inline-3/#text-edges](https://drafts.csswg.org/css-inline-3/#text-edges)
- Not to be confused with `size-adjust` or `ascent-override` https://web.dev/articles/css-size-adjust
- [https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/](https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/)
- [https://css-tricks.com/two-css-properties-for-trimming-text-box-whitespace/](https://css-tricks.com/two-css-properties-for-trimming-text-box-whitespace/)
- applied to many HTML elements [https://codepen.io/nileshprajapati/pen/RweKdmw](https://codepen.io/nileshprajapati/pen/RweKdmw)
- Safari's blog post [https://webkit.org/blog/16301/webkit-features-in-safari-18-2/](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/)
- [https://piccalil.li/blog/why-im-excited-about-text-box-trim-as-a-designer/](https://piccalil.li/blog/why-im-excited-about-text-box-trim-as-a-designer/)