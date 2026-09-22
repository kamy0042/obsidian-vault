---
title: "The Anatomy of a Design Token"
source: "https://medium.com/@jonas_duri/effective-design-token-structure-111e4bd934c8"
author:
  - "[[Jonas Duri]]"
published: 2021-12-04
created: 2026-04-20
description: "Design-Tokens is a hot topic in the Design and Development community. In this article, you will learn about the anatomy of a Design-Token and how to structure them."
Tags: [topic/デザインシステム/デザイントークン]
---
![](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*RUlTWPfo3LR5ggL8V8glZA.png)

Design-Tokens is a hot topic in the Design and Development community. *What is a Design Token?* Here’s a brief introduction into the topic

## [Design Tokens: The hidden superpower of a Design System](https://medium.com/@jonas_duri/design-tokens-the-hidden-superpower-of-a-design-system-4267db0d73be?source=post_page-----111e4bd934c8---------------------------------------)

### Design Tokens are a fundamental part of a design system, making them an invaluable tool for anyone looking for…

medium.com

In this article, you will learn about the anatomy of a Design-Token and how to structure them.

Design-Tokens are a hot topic in Design and Development. Designers and developers use Design-Tokens to share design specifications, but the concept of Design-Token is not new. Designers have been using them for decades to communicate their ideas more effectively.

Apple has a color for their line of products, **Space Gray**. It’s an aluminum color that is very stylish and it pairs nicely with most desk- or office designs. You’ve seen this color before if you’ve seen a MacBook Pro. It is a grayish tint that stands out but doesn’t overpower your eye when looking at it.

You may notice that Apple doesn’t just refer to the color as *“grayish tint, slightly darker than silver”*. They chose a unique, rememberable name for it — **Space Gray**.

The color and the properties attached to it can be distinguished from all other gray/metallic colors just by referencing the name. In Apple’s unique language, **Space Gray** is a Design-Token.

Apple has modified **Space Gray** since its debut with the iPad mini 2 in 2013 countless times, but they didn’t change the unique name. They loosely coupled the name to the actual color, which made the evolution possible.

## Anatomy of a Design Token

### Name

The name of a design token should immediately tell your audience what they can expect from it. In the case of Apple, they use a suggestive and unique name for their color token. This makes it easy for people to remember and distinguish it from other colors.

### Type

The type of a design token gives the user a clear hint, how it can be used. For example, a “color-token” may be used to paint things, but it can’t be used as a duration for an animation. Each token type must have a predictable, stable interface so that software tools can work with them.

### Meta

Metadata can be multiple types of optional information. A design token may have an author or team attached to it or a description, that is used to automatically generate documentation. Another helpful piece of information is the date when the design token was introduced or updated.

### Data

The data is the actual implementation of a design token. In the case of a “color-token”, RGBA is a suitable format. The data must be in a technology-agnostic format so that any system that is capable to display the color may use it. You can use software to easily convert RGBA to another color format. Chose a future-proof format and stick to it.

In the case of a “text-style” token, the data should include the font family name, size, weight, line height, or letter spacing. Also, any modifiers like underline, italic, or non-italic should be part of the design token.

## Design Token examples including colors, fonts, and measurement

<iframe src="https://medium.com/media/457055ae240c45cccd944cd6fcc06878" allowfullscreen="" frameborder="0" height="1182" width="680" title="design-tokens-raw-data.json"></iframe>

## Use Software to convert between different units

The “px” unit is a measurement of the size of a digital display. Each device displays a different number of pixels which must be taken into consideration when deciding what size to design for. Designers have been adapting their designs to work with the new pixel density capabilities of high-end devices by utilizing relative units such as ems and rems.

Therefore converting your design tokens into the desired format is an important capability when using design tokens in your applications.

If you want to use the design tokens above in a web application, the required format can look like this:

<iframe src="https://medium.com/media/4cbc158eb6ac2bc96481862b50c509c8" allowfullscreen="" frameborder="0" height="434" width="680" title="design-tokens-web.json"></iframe>

But an iOS application can’t do much with CSS custom properties, so the output can look like this:

<iframe src="https://medium.com/media/2517959f16c85bfe6389c4dee736cc8e" allowfullscreen="" frameborder="0" height="463" width="680" title="design-tokens-ios.json"></iframe>

If you want to use your design tokens in multiple projects, a good way to start is a dedicated Git repository for your tokens. You can also create an NPM package and publish the design token JSON file(s) so that all your web projects can install them.

A quick and dirty solution to work with the raw design tokens could be as easy as a simple JavaScript that converts them into the desired output format and writes the file(s) to a special location in your project.

## Conclusion

Design tokens are an important design tool for any designer. Design Tokens can be used to create your UI kit, with all the necessary assets needed to make a website or app that is unique and creative.

The name of a Design Token is the most important part. Like apple, you can change the underlying value and make sure, that all systems are in sync.

Design tokens come in different types including color, fonts, measurements, or durations. Pick an interface for a design token type and stick to it, but make sure, that it can be converted into multiple different formats.

Publish your raw design tokens to a central place, so that many applications can use them. If you can, provide helpful tools to convert the raw tokens into different formats.

Thanks for reading 👍