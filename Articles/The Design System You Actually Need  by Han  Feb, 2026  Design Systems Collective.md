---
タグ: []
作成日時: 2026-03-06T18:36:00
URL: https://www.designsystemscollective.com/the-design-system-you-actually-need-791f5b697731
Tags: [topic/デザインシステム/批評・本質論]
---
![[bc1f8416df0cad099e43cda2872716e5864f18a73bda2a7547ea082aca9b5632.bin]]

I’ve seen teams spend six months building a design system nobody uses.

I’ve also seen a shared Figma file with twelve components carry a startup through its Series B. Both of these are real stories. Neither team was wrong at the time they made their choice.

There’s a lot of advice out there about building design systems. Tokens. Semantic layers. Contribution models. Versioning strategies. Accessibility audits. And look — all of that matters. Eventually. But I think we skip a step when we talk about design systems. We jump straight to *how to build one well* without asking *what do we actually need right now*.

I want to talk about that step.

## Start With the Problem, Not the Solution

It’s tempting to look at what Shopify or GitHub or Atlassian have built and think: *that’s what a design system looks like*. And then you try to build that. For your team of four.

This is a trap.

Their design system solves *their* problems. They have hundreds of engineers. Dozens of products. Years of accumulated inconsistency they needed to wrangle. The shape of their solution is a response to the shape of their problem.

Your problem is probably different.

Maybe your problem is that your two designers keep making slightly different buttons. Maybe it’s that your new hire doesn’t know which shade of blue to use. Maybe it’s that your app has three different modal patterns and users are confused.

These are real problems. They don’t require a real *Design System™* to solve them. Sometimes they require a shared Figma library and a short document that says “here’s how we do modals.”

That’s it. That’s a design system. It doesn’t look impressive. It works.

## The Best Practices Bias

There’s a specific bias I keep running into. I don’t know if it has a formal name, but I think of it as the *Best Practices Bias*. It goes like this:

> *“If the best practice is X, then doing less than X means we’re doing it wrong.”*

This is not true. Best practices describe what works at a certain scale, for a certain context. They are not universal laws. They are *somebody else’s* local optimum.

Let me give you an example. A lot of design system literature will tell you to use design tokens. And tokens are great! They give you a single source of truth for your visual language. They enable theming. They create a contract between design and engineering.

But if you have one product, one theme, and a team of five — do you need tokens? Or do you need a CSS file with some well-named variables?

The CSS file is faster to build, easier to understand, and simpler to change. Tokens add a layer of abstraction that pays off at scale. If you’re not at that scale, you’re paying the cost of abstraction without getting the benefit.

This doesn’t mean tokens are bad. It means the *right time* to introduce them is not day one.

## What Actually Determines What You Need

I think there are a few honest questions worth asking before you build anything:

**How big is your team?** Two designers and three engineers don’t need a contribution model. They need a Slack channel and a weekly sync. Thirty designers and a hundred engineers? Yeah, you need governance.

**How many products do you support?** One product can get away with a lot. The moment you’re building a second product that shares UI, the cost of *not* having shared components goes up fast.

**How much time do you actually have?** This one hurts. Because the answer is usually “not enough.” A design system is infrastructure. Infrastructure competes with features for time. If your company is in survival mode, a comprehensive design system is a luxury. A small, focused one is a survival tool.

**What’s causing the most pain right now?** Build for that. Not for theoretical future pain. Not for what a blog post told you would hurt later. For the thing that’s slowing you down *today*.

## Growing Up, Not Out

Here’s the mental model I like: grow your design system *up*, not *out*.

Growing out means adding more components, more tokens, more documentation, more tooling. It means making your system wider.

Growing up means making what you already have more robust. It means adding accessibility to the five components you actually use instead of building twenty components nobody asked for. It means writing usage guidelines for the patterns that keep getting implemented wrong.

Width feels productive. Depth is what makes a design system useful.

I’ve seen teams with 80 components in their library where engineers still build custom ones because the existing components are too rigid, too buggy, or too poorly documented to actually use. That’s a wide system. It’s not a deep one.

Start narrow. Go deep. Widen when the pain tells you to.

## A Ladder, Not a Blueprint

I think of design system maturity as a ladder. You don’t have to climb every rung. You stop at the height that lets you see what you need to see.

**Rung 1: Shared decisions.** You and your team agree on colors, spacing, type. Maybe this lives in a Figma file. Maybe it’s a wiki page. The point is that decisions are written down somewhere.

**Rung 2: Shared components.** You’ve built a small set of reusable UI components. Button, input, card, modal. They’re in code. Designers and engineers both know they exist.

**Rung 3: Shared language.** You have tokens or variables that encode your decisions. Design and engineering share a vocabulary. When a designer says “surface-primary,” an engineer knows exactly what that means.

**Rung 4: Shared process.** You have a way for people to propose, build, and release new components. There’s versioning. There’s documentation. There might be a small team that owns this.

**Rung 5: Shared ecosystem.** You have tooling, plugins, linters, analytics. You know which components are used where. You can make changes confidently because you understand the blast radius.

Most teams I’ve worked with need to be somewhere between rung 1 and rung 3. That’s fine. Rung 2 is a great place to be for a long time.

## The Biases That Get Us

Let me name a few biases that I think lead to over-engineered design systems. Not because naming them will make them go away, but because seeing them helps.

**Survivorship bias.** We study the design systems that succeeded and got famous. We don’t study the ones that were abandoned six months in because they were too ambitious. The successful ones are not representative.

**Complexity bias.** We tend to assume that complex problems require complex solutions. Sometimes they do. Often they don’t. A naming convention can solve problems that people want to throw a token pipeline at.

**Premature abstraction.** This one comes from engineering, but it applies here too. We abstract too early, before we understand the actual patterns. Then we’re stuck with abstractions that don’t quite fit, and we build workarounds on top of them.

**Social proof.** “Stripe has this, so we should too.” Stripe also has a team dedicated to this full-time. You don’t. That’s the part of the equation people leave out.

## A Practical Starting Point

If you’re starting from zero, here’s what I’d actually do.

First, audit what you already have. Look at your product. Screenshot every button, every form, every card. Group the ones that should be the same but aren’t. That’s your backlog.

Second, pick the three to five components that appear most often. Build those well. Make them flexible enough to cover real use cases, rigid enough to enforce consistency. No more, no less.

Third, write down your decisions. Not in a 50-page document. In something short that answers the question “why does it look like this?” Future you will thank present you.

Fourth, make it easy to use. If using the design system is harder than building a custom component, people will build custom components. Every time.

That’s your foundation. Build on it when you need to. Not before.

## The Point

The point is not that design systems are overrated. They’re not. At the right scale, they’re essential.

The point is that *your* design system should be a response to *your* problems, at *your* scale, with *your* constraints. Not a copy of someone else’s solution to someone else’s problems.

Keep it simple. Not because simple is always better, but because simple is the easiest thing to change when you learn more. And you will learn more. You always do.

Build the design system you need today. Make it easy to grow into the one you’ll need tomorrow.

That’s it. That’s the whole thing.