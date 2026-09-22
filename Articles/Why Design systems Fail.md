---
title: "Why Design systems Fail"
source: "https://medium.com/design-bootcamp/why-design-systems-fail-fe6abf722380"
author:
  - "[[Victoria Vilariño]]"
published: 2026-04-20
created: 2026-04-23
description: "Why Design systems Fail And it’s not because of components. When a design system starts to break down, the instinct is to look at the artefacts. The components aren’t flexible enough. The token …"
Tags: [topic/デザインシステム/ドキュメント]
---
*And it’s not because of components.*

When a design system starts to break down, the instinct is to look at the artefacts. The components aren’t flexible enough. The token naming is inconsistent. The library is missing half the patterns teams actually need.

These are real problems. But they are rarely the root cause. In most cases, design systems don’t fail because of what they include. They fail because of how they are understood, and more specifically, because that understanding was never made explicit in the first place.

After years of working on systems at scale, I’ve come to believe that the single most underinvested area in design systems work is not component architecture or token strategy. It’s clarity: the shared, documented understanding of why the system exists, how it should be used, and what it is meant to solve.

**The illusion of alignment**

One of the most dangerous moments in a design system’s lifecycle is early adoption. Teams are using the components. Coverage looks good on paper. Everyone seems to be working from the same library.

But underneath that surface-level consistency, something else is happening. Different teams are interpreting the same component in different ways. Designers are adjusting spacing “just this once” because the system doesn’t quite fit the context. Engineers are implementing edge cases differently because the specification doesn’t address them. Product managers are making decisions about when to use which pattern based on instinct rather than guidance.

None of these deviations feel significant in isolation. But they compound. Over months and years, the system drifts.. not because anyone made a bad decision, but because the reasoning behind the good decisions was never communicated clearly enough to prevent the bad ones.

This is what I call the illusion of alignment: the appearance of a unified system masking a fragmented reality underneath.

**A shared understanding, not a shared library**

The most important reframe in design systems thinking is this: a design system is not primarily a component library. It is a shared language. A set of agreements about how a product should look, behave, and feel, expressed through code, design, and documentation.

A library is just the technical implementation of that language. It is necessary, but not sufficient. What teams actually need is the understanding that sits behind the library: the reasoning, the constraints, the intended use cases, and the boundaries.

When that understanding is missing, the library becomes a set of suggestions rather than a system. Teams treat it as a starting point to be modified rather than a foundation to be built upon. And the further they diverge, the more expensive it becomes to bring things back into alignment.

> ***THE CORE DISTINCTION.*** A component library answers: what do we build with? A design system answers: how and why do we build? Without the second question, the first becomes almost meaningless.

**Documentation is not an afterthought. it is the work**

The standard approach to documentation in most design systems teams is to build first and document later. Components get designed, reviewed, and shipped. Documentation gets added when someone has time, which in practice means it gets added minimally, inconsistently, or not at all.

This is backwards. Documentation is not a record of decisions that have already been made. It is part of the design process itself. The mechanism by which a decision made by one person becomes a decision available to everyone.

There is a useful test here. If you cannot articulate why a component works the way it does, or when it should and should not be used, in clear and unambiguous prose, it is likely that the component itself has not been fully designed. The inability to document a decision is usually a signal that the decision is incomplete.

> *If you cannot document a decision clearly, the decision probably isn’t finished yet.*

Effective documentation addresses at least four things. It explains when to use a component and, crucially, when not to. The negative space of a component is often as important as its intended use. It describes how a component behaves across the full range of real-world scenarios, not just the happy path. It surfaces the trade-offs that shaped the component’s design, so future contributors understand the constraints they are working within. And it anticipates the questions that teams will have when they encounter the component in an unfamiliar context.

Writing this kind of documentation is genuinely difficult. It requires the author to think carefully about their own decisions, to anticipate the needs of people they may never meet, and to write with precision and clarity. That is exactly why it tends not to get done, and exactly why teams that do it consistently end up with systems that scale.

**The governance problem no one wants to talk about**

Even well-documented systems drift without governance, a clear set of processes for how the system evolves, who can contribute to it, and how conflicts between the system and product needs are resolved.

Governance is the least glamorous part of design systems work. It does not produce visible outputs. It does not show up in a portfolio. But without it, a design system is not really a system at all. it is a snapshot of a set of decisions made at a particular point in time, slowly becoming less relevant as the product evolves around it.

Good governance does not mean centralised control. It means clear ownership, transparent processes, and a forum for the kind of cross-functional discussion that keeps the system connected to the products it serves. It means treating the system as a living product, one that requires the same investment in strategy, roadmap, and iteration that any other product receives.

**Accessibility is where the cost of ambiguity is highest**

Accessibility failures in design systems tend to be quiet and cumulative. They rarely announce themselves. They accumulate gradually, as small ambiguities in documentation become inconsistent implementations across teams, as missing interaction states get filled in differently by different engineers, as focus management decisions get made locally rather than systematically.

The problem is not usually that teams don’t care about accessibility. It is that the system has not made the right choices easy and the wrong choices visible. When documentation does not specify how a component should behave for keyboard users, different engineers will make different calls. When interaction states are not designed explicitly, some will be omitted. When the reasoning behind an accessible pattern is not explained, it will be modified by someone who does not understand why it was designed that way.

Accessibility is perhaps the clearest illustration of why documentation is not optional. The consequences of ambiguity are real, legally significant, and borne disproportionately by users who are already underserved. A design system that does not treat accessibility documentation as a first-class concern is not a mature system, regardless of how comprehensive its component library is.

> **WHAT COMPLETE ACCESSIBILITY DOCUMENTATION LOOKS LIKE.** Expected keyboard behaviour and focus order. ARIA roles, states, and properties with rationale. Required and optional interaction states. Screen reader announcements. Known limitations and recommended workarounds.

**Adoption is a design problem**

There is a tendency in design systems teams to treat low adoption as a communication problem: teams don’t know the system exists, or don’t know how to find things. These are real friction points and worth addressing. But the more fundamental adoption challenge is a design problem.

Teams don’t use a design system because it is there. They use it because it makes their work easier. They use it because it gives them confidence that the decisions they are implementing have been thought through carefully. They use it because it reduces the cognitive load of working on a complex product at scale.

If the system does not deliver on those things, if it is difficult to understand, inflexible in the wrong places, or silent on the questions teams actually have, then adoption will be low regardless of how much it is promoted. The solution is not better marketing. It is a better system.

This means designing for the people who will use the system as seriously as you design for the people who will use the product. It means understanding the friction points in the adoption journey and removing them. It means treating documentation, governance, and support as core parts of the product… not supporting infrastructure.

**What maturity actually looks like**

A mature design system is not one with a large component library. It is one where teams consistently make good product decisions without needing to escalate to a central team, because the system has given them the understanding they need to make those decisions themselves.

That kind of maturity is built through clarity. Through documentation that explains not just what but why. Through governance that keeps the system connected to reality as the product evolves. Through a genuine investment in the adoption experience, not just the technical implementation.

It is, in other words, built through the same things that make any complex system work: clear communication, shared understanding, and the discipline to maintain both over time.

> *We do not just design components. We design shared understanding. Every decision we make is only as valuable as the clarity with which it is communicated — and every system is only as strong as the weakest link in that chain of communication. If that link is unclear, no system, however well-built, will hold.*