---
title: "Our Core Design System was not enough : Why we built a Domain-Specific Design System (and how it made us scale)"
source: https://medium.com/@pennylanedesign/our-core-design-system-was-not-enough-why-we-built-a-domain-specific-design-system-738db54cec48
author:
  - "[[Pennylane Design]]"
published: 2026-06-03
created: 2026-06-15
description: More
Tags:
  - topic/デザインシステム/戦略・ガバナンス
---
In the world of high-growth product engineering, there is a danger called “The Illusion of Velocity”. You’re shipping. The screens look right. But under the hood, the engine is smoking and the teams are struggling.

At Pennylane, within our squads working on Fiscal Declarations, we are managing hundreds of different tax declaration forms. Technical and domain complexity are astronomical, and our users need clarity and simplicity.

### On the surface, we were fine.

- We had a UI library in a Figma file.
- We were using Pennylane’s Core Design System.
- We had reusable technical components.

### But “fine” doesn’t scale.

We were paying a heavy price just to keep the lights on.  
This is the story of how we made Pennylane’s fiscal declarations scalable by building a **domain-specific Design System.**

## 1\. The Symptoms: When “Every Squad has a Library” Becomes Invisible Debt

The turning point came during a sync between designers and engineers. What we expected to be a quick alignment turned into four hours of answering a deceptively simple question: “Which components do we actually have in production and what do we call them?”. We picked one small pattern as a test case: section headers in our forms. Across 28 forms, we found 8 different implementations of what was supposed to be the same building block.

We realized that while our product looked consistent to the user, our internal processes were diverging into parallel universes.

We noticed the red flags of a system in collapse:

- **The Translation Tax:** A “Table Title” in Figma was a “Header Row” in code. Every handoff required a human “translator” to bridge the gap.
- **Parallel Universes:** Squad A built Component X while Squad B custom-coded Component Y for the exact same purpose.
- **The “80% Match”:** Design files were a graveyard of components that only *kind of* matched the codebase. New hires couldn’t tell a pattern from technical debt.
- **Accidental Standards:** Under pressure, “quick fixes” were copy-pasted into new features. We weren’t designing; we were replicating precedents.

> ***The Result:*** *We were optimizing for a single designer-engineer duo shipping a single feature, at the expense of the next fifty people joining the team. We were fast, but we weren’t scalable.*

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*VMZGlXdksh-EaN8Mb6oI-Q.jpeg)

To meet our goals and team expansion, we had to stop the manual work and automate our consistency.

## 2\. The Pivot: When a Core Design System Isn’t Enough

We realized that our Core Design System wasn’t the problem: it was how we were trying to stretch it. We reached a ceiling where a global kit stops being a tool and starts being a bottleneck.

**Like us, you will want to consider a domain-specific system if:**

- **Domain logic is baked in:** Your patterns aren’t just UI; they embed business rules and constraints that make sense in your domain but would be overkill elsewhere.
- **Bricks are not houses:** Design Ops provides the bricks (colors, typography), but they can’t support you in building your specific house. You need specialized architecture.
- **You need to scale consistently:** Dealing with one flow is a task; dealing with hundreds requires a factory.
- **Ownership is unclear:** When everyone replicates “precedents” instead of using a system, nobody owns the source of truth.
- **Centralization is a speed trap:** Shipping requires fast iteration on domain rules. A long contribution pipeline to a global DS would only slow you down.

> ***Insight:*** *A Domain-Specific Design System is a specialized layer. It allows you to move at light speed on complex rules without polluting the global product language.*

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ln0_RZJ5Rn8q1TDkD5bjUw.jpeg)

A Domain-Specific Design System allows you to move fast on complex rules without polluting the global Design System.

## 3\. Auditing Reality: Systems Over Shortcuts

We decided to “pause the roadmap” to rebuild our engine. This wasn’t a “make it pretty” project. It was a structural overhaul:

1. **Mapping the mismatch:** We stopped fixing bugs in isolation and started fixing them in the system. We ran an audit and had the whole squad collaborate to choose only one solution for one given need.
2. **Mirroring the Architecture:** We rebuilt our Figma library as the “twin” of our codebase. If it’s a `DeclarationCard` in React, it’s a `DeclarationCard` in Figma. We stopped documenting looks and started documenting *behavior*.
3. **Developer Autonomy:** The goal wasn’t pixel perfection; it was developer autonomy and, by extension, scalability. We wanted any engineer to ship using known patterns without needing a two-hour sync with a designer.
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZYYNBZ8elBFXPlLi_iAsJA.png)

From Figma to code

## The 4x Payoff: From Patching To Scaling

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Ft6q713XDVG4FYTxV_ItAQ.jpeg)

Before: Everyone had their own task

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*kK0DpSBn8utO0r6pMvejxg.jpeg)

Vision: Build is automated, everyone collaborates on one source of truth,

After just a few weeks, the change was operational. The systemization opened the door to radical efficiency:

1. **Eliminating the “Translation Tax”:** As every component in Figma has a 1:1 twin in the code, handoffs are seamless. Designers provide the logic, and engineers build the tax forms. The back-and-forth has vanished. What used to take over four days of consecutive steps now takes under two days, thanks to a streamlined and collaborative workflow.
2. **A Unified Language:** All squads now share a clear understanding of our component DNA. Designers no longer reinvent the wheel, and engineers no longer “tweak” components to fit. Everyone in the team knows what can be built using our system, and sticks to it for maximum speed.
3. **Engineering Independence:** The guesswork is gone. Our “plug-and-play” architecture allows any engineer — including backend specialists — to build complex tax forms solo. For simple forms, the system acts as a direct bridge between official fiscal forms and our UI; clear guidelines empower engineers to ship without the need for wireframes.
4. **Zero-Start Onboarding:** New members become contributors in days because they are learning a language, not a list of exceptions.
5. **The Upstream Pipeline:** Our system became a proving ground. As Pennylane grew and new needs emerged, some components were promoted into the Core Design System, and Pennylane’s process for domain-specific systems was formalized and replicated in other product areas.

> ***Result:*** *By trading manual patching for systemic scaling, we moved from “hacking” to orchestrating. Our delivery speed improved 4x, and our engine is finally built for the long term.*

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*SavJ7UxH2yl3utK_755tWQ.png)

Fiscal Declarations Forms managed by Pennylane accross the year: Our delivery speed improved 4x.

## Clarity is the Real Velocity, although it brings its lot of other issues

From the outside, it’s velocity. From the inside, it’s a deliberately designed language: shared patterns, shared names, and a shared way of shipping.

We didn’t eliminate complexity: fiscal declarations will always be a challenge.

In truth, we are still learning. Prioritizing speed of release means we sometimes choose the “good-enough” option our system supports over the perfect, bespoke design. We tend to think more system-first rather than user-first at times.

- We prefer implementing something feasible with our current system, rather than investing into the perfect customized solution for our users.
- We had a few hiccups when working on components improvements, which broke things for other squads. As a result, engineers became a bit reluctant when it comes to working on those components.
- We had to learn along the way how to build governance around the system: putting extra efforts on QA, aligning on what should be in the system vs. what should remain squad-specific, and having component improvements reviewed by the right people.

But that friction is a small cost compared to what we gained: a shared foundation that lets many squads move fast in the same direction, without drifting into parallel solutions. This reflects Pennylane’s culture: we move fast, but we build on strong foundations. When growth exposed cracks, we paused, invested in the system, and came back stronger.

*A story by* [*C* oralie P](https://www.linkedin.com/in/coralie-s-p/). and [Julie Pronzac](https://www.linkedin.com/in/juliepronzac/?locale=en)*, Product Designers at* [*Pennylane*](https://www.pennylane.com/fr/)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*DTsauCEQRjAi85LqQvuaSw.png)