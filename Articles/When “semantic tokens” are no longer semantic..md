---
title: "When “semantic tokens” are no longer semantic."
source: "https://www.designsystemscollective.com/when-semantic-tokens-are-no-longer-semantic-d65ef16fadd7"
author:
  - "[[Nate Baldwin]]"
published: 2024-03-15
created: 2026-04-20
description: "When “semantic tokens” are no longer semantic. Design tokens are now safe to consider a common, basic practice among design systems teams. And although the names of these types can vary, we …"
Tags: [topic/デザインシステム/デザイントークン]
---
## [Design Systems Collective](https://www.designsystemscollective.com/?source=post_page---publication_nav-dbd299f90c1d-d65ef16fadd7---------------------------------------)

[![Design Systems Collective](https://miro.medium.com/v2/resize:fill:76:76/1*KfuDI5s2VksG_8pWv0nCFA.jpeg)](https://www.designsystemscollective.com/?source=post_page---post_publication_sidebar-dbd299f90c1d-d65ef16fadd7---------------------------------------)

A welcoming community for designers and developers passionate about scalable, consistent design. Explore articles, insights, and resources to build and refine your design systems. Join us to connect, learn, and shape the future of systematic design together.

Design tokens are now safe to consider a common, basic practice among design systems teams. And although the names of these types can vary, we generally group them into three major buckets:

1. Primitive tokens
2. Semantic tokens
3. Component tokens

Each of these types of tokens have very important and unique roles in design system creation and maintenance. The type of token that we give the most attention to tends to be those of the semantic type. But what are those exactly?

## What are semantic tokens?

Semantic tokens are an “abstract layer” of tokens. They typically reference a primitive token, and are named based on the context of their use. As [Nathan Curtis](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421) puts it, *primitive tokens are the options; semantic tokens are the choices*.

Choices with design tokens relate to **how**, **where**, and **when** you may make a choice about any design element (color, spacing, typography, etc). These choices answer questions like *“when might I use the brand color?”* by offering a resolution such as *“I would use it as my primary color in across the interface”* — ergo, `color-ui-primary`.

A powerful aspect of semantic tokens is that they provide a very broad coverage of use cases across interface and systems design. The token `color-ui-primary` can be applied to many different elements, attributes, and states.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*-fyQZo9Oqik0QnSj.png)

There is a wide range of use case coverage and contextual precision we can have with semantic tokens. We can be more or less specific in order to apply them in more or less specific use cases. Source image.

Since there’s a wide range, the actual boundaries between what is considered “semantic” gets blurry.

## When is a semantic token no longer semantic?

As we create semantic tokens, we should be striving for the “ [Goldilocks zone](https://exoplanets.nasa.gov/faq/15/what-is-the-habitable-zone-or-goldilocks-zone/) ” of token classification: Not too precise, but not too generic. If our tokens lean too far in one of these directions, there are a number of pitfalls that we will encounter. Yet, in all fairness, there are always compromises with tokens — so getting it “just right” depends, and can change over time.

So lets take a look at what’s **too generic**, what’s **too specific**, and what’s **just right** …

## What is “too generic”?

A semantic token is too generic when it cannot sufficiently answer **how**, **where**, or **when** a token is intended to be used. Without that clarity, there is no “choice” being defined at all.

Let’s take an example for padding. Say we want to define semantic tokens for the internal padding of basic components. At Intuit, we have many different types of components; some of them use consistent padding values, while others differ in order to fulfill more specific use cases.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*6RT8a4vMJ3ZRvMZOChsYlA.png)

Sample set of Intuit components, which use various padding values to create different size and density options.

Each component uses different padding values based on more specific context, such as *top/bottom padding*, *left/right padding when an icon is present*, and *left/right padding when text is present*. There are also *gaps between text and icons*. Each of their values change based on the size or density option defined by the component.

If we over-index on making a “simple system”, it can become attractive to reduce the set of semantic tokens to as small as possible. In this case, we could rationalize that this set of semantic tokens could be made highly generic with a set of options such as:

```rb
element-spacing-xx_small
element-spacing-x_small
element-spacing-small
element-spacing-medium
element-spacing-large
element-spacing-x_large
element-spacing-xx_large
...etc
```

At this point, we’re only specifying *very broadly* **where** the token should be applied (on an element). For some this may be just fine. But what happens when we want to alter a value?

**Let’s take this scenario:** We have this spacing that’s applied *between icons and text* for components. Using the semantic tokens we listed above, these gaps were implemented using `element-spacing-small` for medium sized components. ==If we wanted to reduce the space between the icon and text, we would change this token’s value from== ==`8px`== ==to== ==`4px`==.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*T0tdu-K0bdcFqX_QMG2Oog.png)

\[left\] original value for element-spacing-small of 8px applied to space between icon and text, compared to the \[right\] new value of 4px for tighter spacing.

In *theory and isolation*, this looks fine. But with a generically named token like `element-spacing-small`, we’ve likely used this elsewhere in the system. Now **all of these unrelated use cases are altered** because they leverage such a generic token.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*alJxBuEan4-U9DhF_XSC7g.png)

Button, textfield, and table cell paddings are also affected since they relied on the same token \`element-spacing-small\`.

The problem here is that *the change does not align with the intent*. We intended to change the space between icons and text, but we ended up changing paddings as well. Here we can see that a semantic token is no longer semantic when it lacks clear intent: there is no longer valuable context for its use.

> ==A semantic token is no longer semantic when it lacks clear intent.==

This approach is inflexible to design change. Because it lacks clear intent, this set is almost no different from a list of *options rather than choices*. Changing `element-spacing-small` to any other value will have nearly the same major impacts across the ecosystem as we would have by changing a primitive such as `space-100`. Rather than changing the value based on specific yet broad-reaching context, we’re forced to either change everything, or make the change in multiple components directly.

Clearly we need more specificity, but how much do we really need?

### What is “too specific”?

Using this same example, let’s take a different approach. Our intent is to change the spacing between text and icons.

If we over-index on making a “highly specific system”, it can become attractive to introduce duplicative tokens in order to support as much specificity (and future flexibility) as possible. In this case, we could rationalize that this set of semantic tokens could be made highly specific with a set of options such as:

```rb
button-icon-to-text-gap
button-padding-top
button-padding-bottom
button-padding-to-icon
button-padding-to-text

textfield-icon-to-text-gap
textfield-padding-top
textfield-padding-bottom
textfield-padding-to-icon
textfield-padding-to-text

etc...
```

For these tokens, we’re specifying *very clearly* **how** and **where** they should be applied. At this point, many people will say these are now “component tokens,” since they specify a component in their name. In my experience, “component tokens” are much more specific than this, and come with [their own set of pro’s and con’s](https://medium.com/@NateBaldwin/component-level-design-tokens-are-they-worth-it-d1ae4c6b19d4).

Now what happens when we want to alter a value with this set of tokens?

**Let’s take this scenario:** We are redesigning the system and want to reduce the overall size of our components from 36px height down to 32px height for medium sized components. If we wanted to do this, we would need to change the top and bottom padding values from `6px` to `4px`.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GQMrbCHee7R2hb94C46acg.png)

Before and after of search field and button with 6px top and bottom padding vs 4px padding

Again, in *theory and isolation*, this seems like it will be fine. But with a specifically named tokens like `button-padding-top`, we’re going to have to **repeat this update to many more tokens**. In order to meet our intent of adjusting all basic components’ sizes from 36px to 32px, we will have to update all of these tokens:

```rb
button-padding-top
button-padding-bottom
textfield-padding-top
textfield-padding-bottom
iconcontrol-padding-top
iconcontrol-padding-bottom
dropdown-padding-top
dropdown-padding-bottom
etc...
```

The problem here is that *changes do not scale*. In other words, these tokens have a very low degree of use case coverage due to how specifically they are classified. We intended to make a change to a large group of different components, but multiple tokens were required to make that change. Here we can see that a semantic token is no longer semantic when it does not scale across broad use cases.

> A semantic token is no longer semantic when it does not scale across broad use cases.

### What is “just right”?

This question is a very difficult one to answer clearly, and it varies depending on a lot of factors. But despite that, there is a sure-fire way to identify this for your team and design system: **creating abstractions and identifying common associations**.

The first abstraction would be to identify most components have an element paired next to a text label. This can be an icon, and in some cases another component (such as a physical checkbox).

The next abstraction would be to identify the structures used to build most components, such as the space between text or internal elements and the edges of a component’s boundary.

![Annotated illustrations of component templates highlighting token opportunities “text to element”, “edge to element horizontal”, “edge to text horizontal” and “edge to element vertical”](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*oYjCo7FIjG4WcUfsHrpgeA.png)

Abstract elements or “component templates” can help identify the common, scalable intent without over-generalizing or being too specific.

These abstractions would result in a set of tokens that is both manageable, has clear intent, and will scale to a wide variety of use cases. By creating size options for these tokens, you can account for smaller components (such as a Badge) or larger components (such as a table cell). You can more easily scale this approach to accomodate various t-shirt sizing options for components, as well as their densities too.

```rb
text-to-element-sm
text-to-element-md
text-to-element-lg

edge-to-element-horizontal-sm
edge-to-element-horizontal-md
edge-to-element-horizontal-lg

edge-to-text-horizontal-sm
edge-to-text-horizontal-md
edge-to-text-horizontal-lg

edge-to-element-vertical-sm
edge-to-element-vertical-md
edge-to-element-vertical-lg
```

Changing values to any of these tokens will get you closer to meeting the appropriate design intent at the right level of scale. Depending on your system, this approach may shift or change a bit. But if you’re looking for examples where other systems have used this approach for their semantic tokens, here are a few:

- [Wise design system](https://wise.design/foundations/spacing)
- [Adobe Spectrum design tokens](https://github.com/adobe/spectrum-tokens/blob/main/packages/tokens/src/layout.json)

## Summary

Semantic tokens offer a lot of value to design system maintainers and their consumers. They offer a wide range of use case coverage within a system, as well as a wide range of specificity they can support. Because of this variability, there’s a blurred line between when semantic tokens can be too generic or too specific.

> A semantic token is no longer semantic when it lacks clear intent and does not scale across broad use cases.

By finding the right levels of abstraction and identifying common associations across components, you can create semantic tokens with just the right level of specificity and impact.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WEI92rjWrOvdphhd0YzSCw.jpeg)

AI generated image of “Goldilocks” when she finds the porridge that’s “just right”, except the porridge is a bowl full of design tokens.