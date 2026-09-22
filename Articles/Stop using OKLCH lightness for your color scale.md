---
title: "Stop using OKLCH lightness for your color scale"
source: "https://uxdesign.cc/stop-using-oklch-lightness-for-your-color-scale-02025deca49d"
author:
  - "[[Kevin Muldoon]]"
published: 2026-08-24
created: 2026-09-22
description: "Stop using OKLCH lightness for your color scale It’s brilliant at generating color, but it can’t predict contrast — and there’s a better number for your palette weights. Nearly 6 years ago …"
tags:
  - "topic/デザインシステム/デザイントークン"
  - "topic/アクセシビリティ"
  - "clippings"
---
## It’s brilliant at generating color, but it can’t predict contrast — and there’s a better number for your palette weights.

![A paintbrush on a mid-century abstract background.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*rYTMOiBmAldBeY_imswJpA.png)

A paintbrush on a mid-century abstract background.

Nearly 6 years ago, Swedish software engineer [**Björn Ottosson**](https://bottosson.github.io/) created a color space to solve a problem in image processing and color-gradient generation. Only a few years later, his idea reached every corner of the world.

The problem was real. Blend two bright colors in some color models, and they meet in a muddy gray in the middle. In other spaces, a blue detours into purple on its way to white or black. No one space seemed perfectly suited to the seemingly simple tasks of generating perceptually pleasing gradients between two colors. Designers had been correcting this by hand for decades, but Ottosson wanted to fix it systematically within a purpose-built color space — and he was honest enough about the tradeoffs to put the admission right in the name.

He called it Oklab — “an OK Lab color space,” in his phrasing: the name half a joke and half modesty, *okay* for the jobs he had in mind.

Adoption was fast. Oklab and its cylindrical form, OKlch, went into the new [**CSS Color Module Level 5**](https://www.w3.org/TR/css-color-5/) specification; every browser speaks them now. Tailwind rebuilt its default palette in OKlch, and Adobe added Oklab to Photoshop’s gradient tool.

In about four years, a blog post became standard infrastructure, and it deserved to. And then some of us asked it to do a job it was never built for.

## A Brush, Not a Ruler

If design systems are your thing, you’ve probably seen this — maybe even done it.

When we build a new primitive palette from scratch, every swatch gets two names: a role — primary, warning, neutral — and a number, the weight, meant to say how light or dark that step is: the 500 in `info-500`, the 700 in `neutral-700`.

We ask that number to do two jobs at once, and we’re right to want both. It’s a ranking — 500 darker than 400, lighter than 600, a ladder you can navigate. And it’s a promise — that text at one weight stays legible on a background at another. The ideal is a rank that is a promise: a dependable pattern where each rung guarantees a behavior. But contrast doesn’t answer to whatever number felt right; it answers to WCAG and APCA, the universal rule the whole web is graded against. Draw the ladder however you like — on its own, it guarantees nothing. A weight, the way most of us build it, is a ranking pretending to be a promise it can’t keep.

And lately we’ve tried to make it keep that promise the wrong way — setting the weight straight from Oklch’s lightness, so `primary-500` is really just "lightness 50" and the whole ramp falls out of it. It looks reasonable, but it's a mistake: the number you're trusting to carry contrast can't, because Oklab was never built for that.

The instinct is right, though — which is why it’s worth getting straight. The field has grown past picking a number because it looked about right; we know a weight should answer to something real. We just reached for the buzzy new tool instead of the one built to carry the promise.

Oklab gave us a better blending brush, and some people mistook it for a ruler.

## The Only Question

Measuring color and transforming color are two different jobs, and a tool built for one is rarely good at the other. A brush *transforms* — blends, fades, interpolates, generates a smooth ramp — and OKlch is superb at this task, so keep using it. But where brushes *transforms*, a ruler *informs* — how light is this, will text hold up on it — and a ruler only works if it answers to something outside the tool that drew it.

Here is the part that makes the confusion expensive. For the contrast rule the whole web runs on — WCAG, contrast is computed from luminance, the sheer amount of light a color throws. Once you know the luminance of your two colors, you already have everything you need to know their contrast; the hue never enters into the equation. So a lightness value that genuinely tracked luminance would hand you contrast for free.

The only question is whether OKlch’s lightness is that value.

## Same Number, Different Answer

Spoiler alert, OKlch’s lightness isn’t that value, and you can prove it to yourself in about ten seconds.

Input a few hues and set them all to the same OKLch lightness — say 56. If that number were a real measure of light, the ten would be equally light, and they would pass or fail a contrast check together.

## [CIE vs. OK Lightness for WCAG Contrast](https://codepen.io/Kevin-Muldoon/pen/KwWKMmx?source=post_page-----02025deca49d-----------------------------------------)

### A code demo by Kevin Muldoon created on CodePen

codepen.io

The conclusion is narrow, and that narrowness is its strength, and it is impossible to argue with: ***whatever Oklab’s lightness measures, it is not the thing WCAG contrast measures***. WCAG and APCA both run on luminance — the light itself — and CIE L\* is that luminance re-expressed on a scale tuned to the eye. That makes CIE L\* the one number referentially meaningful for contrast: exactly the kind of value a token weight should be answering to.

That isn’t a bug in Oklab; it’s the design working exactly as intended — for a different job. CIELAB’s lightness is a function of one thing, luminance, so a color’s hue and saturation never touch it; that clean separation is precisely what a ruler needs.

Oklab’s lightness is built the opposite way, and on purpose: to keep the whole space perceptually even for the manipulations Björn cared about, the light gets folded in together with hue and chroma — three cone-like signals, each run through its own cube root and summed, until the luminance can no longer be pulled back out of the number. Two Oklab colors at the same lightness can be throwing different amounts of light. The very property that makes it a superb brush is the one that unfits its lightness as a ruler. He built exactly the right tool and told us what it was for.

We read the label wrong.

## Nobody Ships It as a Ruler

And the people who do this for a living never actually stopped using it. Google’s HCT — the color engine inside Material Design and a billion Android phones — takes hue and chroma from modern color science and keeps its lightness as plain CIE L\*, untouched. Adobe keeps OKlab in Photoshop’s gradient tool and well away from its measurements.

Even OKlch’s most influential champions concede it. The [**Evil Martians article**](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) that converted much of the industry to OKlch first claimed its predictable lightness gave you better accessibility — and then corrected itself in its own changelog, telling developers to measure contrast with APCA instead, because, in their words, “Just OKlch is not enough.” The line between the brush and the ruler isn’t my idea. Everyone who ships color already respects it in practice. They just haven’t named it.

## What This Opens

None of this dethrones OKlab/lch. Transform in it — it is the best brush we have, and nothing here asks you to put it down. Just stop asking it to measure. Use OKlab/lch to decide where color should *go*, and CIE L\* to know where it *is*.

But once we stop asking our color model to be its own reference, a far more interesting question opens up. CIE L\* isn’t just a better number for your palette — it’s the same number in *everyone’s* palette, a ruler owned by no one and legible to anyone. So if every color, in every design system, can be described against that one external reference — what becomes possible?

That’s the next story.

## References

- Björn Ottosson, [*A perceptual color space for image processing*](https://bottosson.github.io/posts/oklab/) — the original Oklab post (December 23, 2020).
- [*Interview with Björn Ottosson, Creator of the Oklab Color Space*](https://www.smashingmagazine.com/2024/10/interview-bjorn-ottosson-creator-oklab-color-space/), Smashing Magazine (2024) — the name, its intent, and the game-industry origin.
- W3C, [*CSS Color Module Level 4*](https://www.w3.org/TR/css-color-4/) — defines the `oklab()` and `oklch()` functions.
- Tailwind Labs, [*Tailwind CSS v4.0*](https://tailwindcss.com/blog/tailwindcss-v4) — the default palette rebuilt in Oklch.
- Adobe, [*Gradient interpolation in Photoshop*](https://helpx.adobe.com/photoshop/using/gradient-interpolation.html) — the Perceptual method interpolates in the Oklab color space, and is the default.
- Evil Martians, [*OKLCH in CSS: why we moved from RGB and HSL*](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) — see the changelog: “Just OKLCH is not enough.”
- Google / Material Foundation, [*Material Color Utilities (HCT)*](https://github.com/material-foundation/material-color-utilities) — HCT’s Tone axis is CIELAB L\*.
- W3C, [*Understanding WCAG 2.2: Contrast (Minimum)*](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — the contrast ratio, computed from relative luminance.
- Andrew Somers (Myndex), [*SAPC / APCA*](https://github.com/Myndex/SAPC-APCA) — the perceptual contrast algorithm proposed for WCAG’s successor.
- [*CIELAB color space*](https://en.wikipedia.org/wiki/CIELAB_color_space) — L\* as a function of luminance.