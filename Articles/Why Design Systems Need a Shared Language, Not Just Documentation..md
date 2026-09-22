---
title: "Why Design Systems Need a Shared Language, Not Just Documentation."
source: "https://medium.com/design-systems-collective/why-design-systems-need-a-shared-language-not-just-documentation-4d25580c2303"
author:
  - "[[Ed Hockings]]"
published: 2026-05-18
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/ドキュメント
  - topic/デザインシステム/デザイントークン
---
There’s a moment most design teams will recognise. A designer and a developer are looking at the same screen, talking about the same thing (e.g animation), and somehow, they’re having completely different conversations.

One is thinking about brand personality. The other is thinking about implementation. Neither is wrong. But without a shared foundation, the gap between them quietly creeps into a product that feels inconsistent in ways no one can quite explain.

That problem was a core consideration when we were asked to *“add motion to the design system.”*

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5SyRctA1diehp-QNK4zVXw.avif)

A screenshot of documentation explaining keyframes.

## The Brief Wasn’t the Real Problem.

On the surface, the ask was straightforward: “ *document how motion should work across the product”.* But before writing a single line of guidance, it was worth asking a harder question. Why was motion inconsistent in the first place?

What we found was a split. Designers knew motion mattered, but lacked the confidence and permission to apply it consistently. Whilst our developers wanted precision. They needed specific values they could map directly to code. Both groups were trying to do the right thing. They just had no shared reference point for doing it together.

That reframed the work entirely. Beneath the design system sat a much larger issue of culture and alignment. One that documentation, done right, could actually fix.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*k2csjQ95b3FR27InsTg96Q.avif)

A screenshot of documentation explaining reduced motion settings.

## Resist the Urge to Start Designing.

The most important decision made early in this project was to not start designing.

Instead, the first weeks were spent in conversation: with designers, with front-end engineers, the people who had been quietly working around the gaps in the system. The goal was to diagnose the real source of friction before proposing any solutions.

These conversations are worth highlighting because they challenge the common narrative surrounding design work. There’s always pressure to demonstrate output early, but solutions built on misunderstood problems rarely succeed.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*prjeA0eIz2ns9OXXSCIeIQ.avif)

A screenshot of documentation explaining the concept of easing.

## Defining the Framework.

The output of the project was a motion framework built around two distinct concepts: **functional motion** and **expressive motion**.

Functional motion is the product working as it should. Hover states, transitions and feedback. It should feel invisible.

Expressive motion is where brand personality lives. The moments that make a product feel considered rather than merely operational.

Conflating the two leads to guidance that’s either too rigid or too loose. Separating them gave the team a clear mental model for decision-making.

Alongside this framework, a token architecture was developed with engineering from the start. Shared naming conventions that existed simultaneously in Figma and in code, so that a designer and a developer pointing to the same token were always pointing to the same thing.

Critically, accessibility wasn’t bolted on at the end. Reduced motion support was built into the architecture from the first conversation.

The documentation was written last and deliberately kept lightweight. Not a motion theory textbook, but a short checklist a designer could run through before handoff. Something designed to prompt thinking, not replace it.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Lj0DqOE8Ve_3m_jszzjgzw.avif)

A screenshot of documentation explaining functional motion.

## The Outcome That Mattered Most.

The engineering team got something they could implement immediately. Designers got a framework that told them clearly where to follow the system and where they had creative latitude. Both outcomes were real and measurable.

But the most meaningful result was harder to quantify: it changed how the team talked.

Before, conversations about animation were circular. People were describing what they wanted without the vocabulary to do it accurately.

After, designers and engineers could point to specific tokens, reference shared principles, and have productive disagreements instead of frustrating ones.

That shift. From vague friction to precise collaboration. That is what a design system is actually for. Not to constrain creativity, but to create the conditions where good creative decisions can be made reliably, by anyone on the team, at any time.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zJw1hMsP4W5m1gUTj2yRvQ.avif)

A screenshot of documentation explaining the concept of duration.

## What This Means for Design Culture.

The lesson here isn’t specific to motion. It applies to any area where a team is producing inconsistent work despite individual effort and good intentions.

The gap is rarely laziness or lack of skill. It’s usually the absence of a shared model. A common language that lets people coordinate without needing to relitigate first principles every time a decision comes up.

Investing in that shared language is one of the highest-leverage things a design team can do. It’s slower up front. It requires conversations that don’t produce immediate visible output. But it creates compounding return. In consistency, in speed, in the quality of cross-functional collaboration.

That’s what separates teams that produce good work occasionally from teams that produce it systematically.