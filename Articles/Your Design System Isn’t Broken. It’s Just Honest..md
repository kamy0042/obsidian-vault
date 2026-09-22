---
title: "Your Design System Isn’t Broken. It’s Just Honest."
source: "https://medium.com/@shivadyahvir/your-design-system-isnt-broken-it-s-just-honest-ab58017775f0"
author:
  - "[[Shiva Padival]]"
published: 2026-07-31
created: 2026-08-03
description: "More"
tags:
  - "topic/デザインシステム/批評・本質論"
  - "topic/デザインシステム/運用・浸透"
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IroN3V2zjwUL42VUaA4j8g.jpeg)

## Why every mature design system starts to look like a museum of compromises — and why that’s a good sign

Every design system starts the same way: clean, opinionated, small. One type of scale. One spacing unit. A button component with exactly three states. It fits on a single Figma page, and everyone on the team can hold the whole thing in their head.

Then the product grows. And the system starts to look less like a manifesto and more like a negotiation.

## The moment it happens

There’s a specific moment every design team hits. Someone needs a button that doesn’t quite match the spec — maybe it needs to sit inside a dense data table, or survive inside a third-party embed with its own CSS reset. The “correct” answer is to redesign the constraint out of existence. The real answer, 90% of the time, is that a new variant is added, a note is left in the documentation, and the system grows by one exception.

Do this 50 times over 2 years, and you get a design system that a purist would call bloated. But look closer, and you’ll notice something: every one of those exceptions is a fossil record of a real decision made under real constraints — a legal requirement, a performance budget, a stakeholder who wouldn’t budge, an accessibility fix that couldn’t wait for the “proper” redesign.

## Two ways to read the mess

You can read a sprawling system as evidence of poor discipline. Or you can read it as evidence that the system is actually being used — by real teams, shipping real products, under real deadlines. A design system with zero exceptions after three years in production isn’t disciplined. It’s either brand new, or nobody’s actually building with it.

The best systems teams I’ve seen don’t fight this. They build for it. That means:

**Documenting the “why,” not just the “what.”** A component library that shows you a button but not the three product decisions that shaped its padding is a style guide, not a system. The context is the actual value.

**Treating deprecation as a feature, not a failure.** Old patterns should be allowed to die publicly, with a paper trail, rather than quietly forking into 10 undocumented variants across different teams.

**Budgeting for drift.** If you assume the system will stay pristine, every real-world compromise feels like a form of damage. If you assume drift is inevitable, you can design the governance to catch it early instead of pretending it won’t happen.

## The tutorial part

If you’re starting a system today, resist the urge to build for the imagined “final” version of your product. Build the smallest usable core — typography, colour, spacing, one or two components — and instrument it so you can *see* where teams reach for exceptions. That data is more valuable than any amount of upfront planning, because it tells you where your real constraints live instead of the ones you assumed.

A design system’s job was never to be beautiful in isolation. It was to absorb the chaos of a growing product without passing it all on to the user. Judge it by that, and the “mess” starts looking like exactly what a working system should look like.

*I hope you found this article helpful and that you will follow all of the rules and recommendations I provided.*

*And I would greatly appreciate your opinions and comments.*

*For more design updates, follow me on YouTube / Instagram and* [*Behance*](https://www.behance.net/shivapadival)*.*