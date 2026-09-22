---
title: Design Systems in Product Development
source: https://medium.com/@glmrvn/design-systems-in-product-development-240bba845d5f
author:
  - "[[Alex Dyakov]]"
published: 2026-07-22
created: 2026-07-25
description: "When people talk about design systems, the conversation almost always quickly narrows down to Figma: colors, buttons, component variants, an"
tags:
  - topic/デザインシステム/批評・本質論
  - topic/デザインシステム/コンポーネント設計
---
When people talk about design systems, the conversation almost always quickly narrows down to Figma: colors, buttons, component variants, and libraries. In my view, that definition is far too narrow.

**A design system is a set of rules and building blocks from which a product is made.** The building blocks give us material to work with, while the rules help turn it into a predictable, coherent soThat is why a design system does not start with a button. It starts with a shared understanding of **how we build a product together**.

## Design systems have always existed

The word “system” itself implies order. It is not a random collection of objects, but a set of interconnected parts governed by clear logic.

Viewed this way, design systems clearly predate digital interfaces. We simply did not use that term for them before.

Take architecture. A building consists of repeatable elements: rooms, windows, doorways, stairwells, and elevator lobbies. Standard solutions limit variation, but they also make design and construction faster.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*aKDbEO40PF5TNz_-x5YwaQ.jpeg)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZJ2sj5HhPtPga3pYUdMx9w.jpeg)

A repeatable foundation does not eliminate diversity — it makes diversity manageable.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vWZKLqHViNMkCLpADX2QJQ.jpeg)

The same is true in the automotive industry. Cars from different brands and segments can be built on a shared modular platform. Their appearance and specifications vary, but their key units, requirements, and connection methods remain consistent.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*PMB__n4bSgoJunkxK99Yvw.jpeg)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*H3Fep_u844l0MfpoAVIFGw.jpeg)

This is an essential property of a system: it does not force every product to look the same. It allows different solutions to be created in a compatible way.

Another example is urban wayfinding. It uses a limited set of typefaces, colors, pictograms, arrows, and layout rules.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yC-UFbI7lZQLmSCBP0nDxw.jpeg)

Those elements can be combined into signs for hundreds of different situations.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*X_VlOBjbwOcK-csFQMurMg.jpeg)

People do not have to relearn every sign. They recognize a familiar language and make decisions faster.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*U9LhFUQHsMPJ3SjvJ_D2iQ.jpeg)

A system therefore helps not only the people who create a product. Consistency also reduces the cognitive load for the people who use it.

## Interfaces change, but core patterns remain

Digital interfaces are young compared with architecture or transportation. Yet the earliest graphical environments already established the building blocks we still use today: windows, menus, cursors, trash bins, files, and buttons.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mYHSJpf64DX8faCTkLJ5Gw.jpeg)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*K30ltpTJnwSB3dQHHmTcqg.jpeg)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Ry8_JR6QXyfy5lAUY-xdmw.jpeg)

Modern operating systems have advanced dramatically in visual terms, but their fundamental logic is still recognizable.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*N_QpO99IvyhBvSWo-KwJEQ.jpeg)

People carry experience from one product to another because creators rely on stable patterns.

## Why a product needs a system

When a product is small, many decisions can live in people’s heads. As it grows, however, chaos becomes inevitable. A working design system solves four problems:

- **Brings order to chaos.** The team does not have to start from scratch every time.
- **Creates a shared language.** Designers and developers work with the same names and building blocks.
- **Makes the product consistent.** Familiar patterns help people find their way faster.
- **Speeds up work and reduces errors.** Changes propagate through reusable elements.

In a small project, the impact may seem minor. In a large product, it saves hundreds of hours and keeps the interface from fragmenting as new teams and platforms appear.

## A UI kit is not a design system

An interface starts with a visual language: color palettes, typography, grids, spacing, shadows, icons, and graphic assets. These are combined into components, then into patterns and templates.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hJ6B1JpM7kIs3UeckEtTHA.jpeg)

On its own, however, this collection is still only a UI kit. Four things turn it into a design system:

- rules for behavior, states, and how elements work together;
- documentation that records decisions and constraints;
- the same building blocks implemented in code;
- a process for evolving, validating, and measuring the system.

I like to compare a design system to a LEGO set.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jZh6RyjKsjNL-qk0Qh0vvw.jpeg)

Its value lies not in the number of pieces, but in their compatibility.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7AehhMAbW5O-KhWF-7_GPg.jpeg)

Constraints do not prevent new ideas — they make the assembly predictable.

## A good design system does not make people think

One common problem with a large design system is too much choice. Imagine that a subheading needs to be gray. The library contains several similar shades, so a designer chooses one from memory or personal preference. Eventually, identical blocks diverge and unnecessary entities appear in the code.

## Get Alex Dyakov’s stories in your inbox

Join Medium for free to get updates from this writer.

In Yandex Maps, I organized colors by semantic roles: text, backgrounds, buttons, and icons. Instead of an abstract Gray 50, a designer chooses a role such as primary or secondary text.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ggfqtWhhp9sBJr7_S4018g.jpeg)

**A system should not merely offer options — it should help people make the right choice.**

This is the “don’t make me think” principle in practice. If the system knows the appropriate range of solutions, it should guide the user toward it.

Semantic roles also make themes easier to manage. Light and dark palettes use the same logic, so the interface can switch automatically instead of being recolored screen by screen.

## Not everything should become a component

When a team starts building a design system, it is tempting to turn every finished block into a component. The library quickly fills up with special cases, duplicates, and complex entities that nobody knows how to use.

A component should represent something genuinely reusable with a stable structure. In mobile interfaces, a list item is a common example. Icons, labels, and actions may change, but the underlying structure remains.

A single flexible master component can cover many scenarios. The smaller the system, the easier it is to maintain.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8-WhTt_-SNNPyGgilpFUZA.jpeg)

That is why I would start with the smallest viable solution and add complexity only when real usage demands it. A design system built for its own sake does not help the product.

## Unification is key

iOS, Android, and the web historically evolved around different guidelines. Successful patterns have gradually converged, however: most product interfaces can be built on a shared system, while differences remain where native elements and platform-specific conventions truly matter.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zpOc6EE1veqyBNY9R9o9gw.jpeg)

This does not mean every interface must look identical. The system unifies what should be shared, while platform-specific details remain deliberate exceptions rather than a separate architecture for every application.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cKam_yDfXYLnlkamtQKyZQ.jpeg)

A shared foundation reduces the number of decisions that need to be designed, implemented, and tested. The team spends less time repeating the same work, while users get familiar, predictable behavior regardless of platform.

## Design should be connected to code

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*irPoV4yZ-O4IO5OKTr4sRg.jpeg)

As long as the system exists only in design files, a manual layer remains between design and the product: exporting assets, choosing formats, naming files, and transferring values. In a large product with thousands of assets, this process becomes a source of errors.

A good design system is not measured by the number of components it contains. Its value depends on how reliably it connects:

- the building blocks from which the product is assembled;
- the rules that make outcomes predictable;
- the people who share a common language;
- the tools and code that preserve decisions in the working product.

So the starting point should not be “build every component.” It is better to ask a few questions:

- What repeats across our product?
- Where does the team make conflicting decisions?
- Which errors keep happening again and again?
- Which rules would make the right choice obvious?

A system should make product development easier, not create more work just to maintain the system itself.

That is why a design system does not start with a button. It starts with a shared understanding of **how we build a product together**.