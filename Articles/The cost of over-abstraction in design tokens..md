---
title: "The cost of over-abstraction in design tokens."
source: "https://medium.com/design-bootcamp/the-cost-of-over-abstraction-in-design-tokens-70d5e6726c05"
author:
  - "[[Mattia Astorino]]"
published: 2026-04-12
created: 2026-04-20
description: "The cost of over-abstraction in design tokens. Why resisting unnecessary abstraction is the key to real consistency. Nobody talks about the power of resisting unnecessary abstraction. Yet most design …"
Tags: [topic/デザインシステム/デザイントークン]
---
## [Bootcamp](https://medium.com/design-bootcamp?source=post_page---publication_nav-48e972f5c24e-70d5e6726c05---------------------------------------)

[![Bootcamp](https://miro.medium.com/v2/resize:fill:76:76/1*_wDJs77bAPiwuAe9qOK5Zg.png)](https://medium.com/design-bootcamp?source=post_page---post_publication_sidebar-48e972f5c24e-70d5e6726c05---------------------------------------)

From idea to product, one lesson at a time. To submit your story: [https://tinyurl.com/bootspub1](https://tinyurl.com/bootspub1)

## Why resisting unnecessary abstraction is the key to real consistency.

Nobody talks about the power of resisting unnecessary abstraction.

Yet most design systems fail at scale for exactly this reason. Not because they lack tokens, or tooling, or documentation, but because they abstract too early, too much, and in the wrong place.

This article is about a simple idea:

> Design tokens are not semantic. And confusing them with theme tokens breaks consistency across your entire system.

## Where things start to break.

A common pattern in many design systems looks harmless:

![](https://miro.medium.com/v2/resize:fit:1262/format:webp/1*XA5i6x1JW3V45MHf2gu2iQ.png)

Theme: Vira Theme Ocean

At first glance, this feels clean. Even intuitive. But this is already the point where the system starts leaking.

These tokens are no longer just values. They encode intent. They carry assumptions about usage. “Primary” relative to what? “Text” in which context? What happens when the same color is reused somewhere else, with a slightly different role?

The moment a token knows how it will be used, it stops being a token. It becomes a decision embedded in the system.

And that decision will eventually conflict with another one.

## The part nobody considers: people.

Over-abstraction is usually framed as a technical problem. It isn’t. It’s a cognitive one.

When new people join a team, they don’t see architecture diagrams or carefully crafted abstractions. They see names. And they try to understand them.

Something like this:

![](https://miro.medium.com/v2/resize:fit:1336/format:webp/1*w2iwYplbwfA5hXdsD4lMag.png)

Theme: Vira Theme Ocean

This is not expressive. It’s opaque.

There is no shared, objective meaning for “subtle”. There is no clear boundary between “primary” and “secondary” unless someone explains it. The system requires interpretation, and interpretation requires context, and context lives in people’s heads.

So instead of reducing complexity, the system relocates it.

New contributors slow down. They ask questions. They hesitate before changing anything. Over time, the system becomes something only a few people truly understand.

Resisting unnecessary abstraction is not just about cleaner architecture. It directly impacts how fast a team can operate.

## A simpler mental model.

Strip everything down and there are only two layers that matter:

**Design Tokens → Theme Tokens → UI**

Anything beyond this is usually an attempt to compensate for a broken foundation.

## Formalizing the model

At this point, the distinction becomes very precise.

Design tokens and theme tokens don’t just play different roles.  
They follow completely different rules.

### Design tokens (foundation layer — primitive)

- They don’t change across implementations. They are constants.
- They are platform-agnostic raw data and must be transformed for each platform (web, iOS, Android).
- They don’t include platform-specific units like `px`, `rem`, or `dvh`.
- They are non-semantic. They represent absolute values.
- They are the single source of truth for consistency across the system.

### Theme tokens (mapping layer — semantic)

- They don’t follow the same constraints.
- Their values can change across implementations and platforms.
- They are semantic and context-aware.
- They are inherently platform-aware.

If these two layers share the same rules, the system collapses.  
Their separation is what makes the system scalable.

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*tRdxpc_Mx7vWiY1uLSR7Ow.png)

## What design tokens actually are

Design tokens are often described as “variables for design”. That’s wrong, and it leads to misuse. Actually, they are the opposite.

## Get Mattia Astorino’s stories in your inbox

Join Medium for free to get updates from this writer.

A more accurate definition is this:

> Design tokens are immutable, non-semantic constants that represent raw design decisions.

They are not meant to describe intent. They don’t know anything about components, states, or usage. They are just values, expressed in a way that can be shared across platforms.

For example:

![](https://miro.medium.com/v2/resize:fit:1372/format:webp/1*rDviYa9_k8DU0at3dqJ6bA.png)

Theme: Vira Theme Ocean

There is no “primary”, no “background”, no “button”. Just a set of constants.

**That’s the point.**

These values should not change depending on where they are used. They are the most stable layer of the system. If something changes here, it should be a deliberate, system-wide decision — not a contextual tweak.

## Where platform differences actually belong.

One of the most common mistakes is embedding platform concerns directly into tokens. Units, formats, even behavior end up leaking into what should be a pure data layer.

That responsibility belongs somewhere else: the transformation layer. The layers handled by tools like [Style Dictionary,](https://styledictionary.com/) [Diez](https://diez.org/), and others that transform raw tokens to platform-specific values.

The same spacing token might become `0.625rem` on the web, `10` on iOS, or `10dp` on Android. The value is the same. Only its representation changes.

Once you accept this, a lot of accidental complexity disappears. Tokens stop being tied to a specific implementation, and the system becomes portable and multi-platform by design.

## Reintroducing meaning, in the right place.

Semantics are not the problem. Misplacing them is.

This is where theme tokens come in, the layer where raw values are mapped to meaning. They define what a color represents in a given context, and they are allowed to change. A background color can be different in dark mode. A text color can shift depending on brand or product.

For example:

![](https://miro.medium.com/v2/resize:fit:1372/format:webp/1*dd99XsXiWvB6P3lFPEHk2w.png)

Theme: Vira Theme Carbon

Here, the system becomes expressive again, but without losing control. The mapping is explicit, and it can evolve independently from the underlying values.

## Where most systems overreach.

The instinct to abstract doesn’t stop at theme tokens. Many systems keep going, trying to encode every possible variation into the token structure itself.

That’s how you end up with things like:

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5pTkT0qo9P-4XOHhi_VC-w.png)

Theme: Vira Theme Graphene

**At that point, the system is no longer flexible. It is describing UI, not enabling it.**

Every new state, variant, or component adds another layer of naming. The token space grows exponentially, and small changes become expensive. Refactoring requires touching multiple layers that should never have existed in the first place.

What started as an attempt to create clarity ends up creating rigidity.

## What changes when you simplify

When design tokens remain raw and non-semantic, and semantics are isolated in theme tokens, the system behaves differently.

Changes become predictable. Themes can evolve without rewriting the foundation. Platforms can diverge where needed without breaking consistency. New contributors can understand the system without decoding it.

Most importantly, the system stops fighting back.

Consistency is no longer enforced through conventions and documentation. It emerges from the structure itself.

## Final thought

Design tokens are often framed as a naming problem. They are not.

> They are a problem of boundaries.

Once tokens start carrying meaning, those boundaries collapse. And when that happens, everything becomes harder: theming, scaling, onboarding, even simple changes.

**If your tokens are semantic, they are not tokens anymore. They are already UI.**