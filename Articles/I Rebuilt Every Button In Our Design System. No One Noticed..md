---
title: "I Rebuilt Every Button In Our Design System. No One Noticed."
source: "https://medium.com/design-bootcamp/i-rebuilt-every-button-in-our-design-system-no-one-noticed-c3631f8c8337"
author:
  - "[[DeShawn Harris]]"
published: 2026-07-16
created: 2026-07-26
description: "What silence taught me about invisible work, review culture, and the real job of a design system."
tags:
  - topic/デザインシステム/運用・浸透
  - topic/デザインシステム/批評・本質論
---
## What silence taught me about invisible work, review culture, and the real job of a design system.

Three weeks after I shipped a complete rebuild of our button component, a product manager asked me in a hallway if I had “made any updates lately.”

I had rebuilt every state. Every size. Every corner radius, every shadow, every hover transition, every disabled state, every focus ring. I had rewritten the token structure underneath it. I had fixed a contrast issue that had been sitting in our library for over a year, quietly failing accessibility guidelines every time someone shipped a primary action.

And the answer to her question was, technically, no. Not “lately.” I had made those updates three weeks earlier.

Nobody had filed a bug. Nobody had posted a reaction in the design channel. No engineer had asked why the button padding changed. No user had emailed support. The change had gone out to production, sat there, and simply existed, like it had always been there.

For about a day, I felt like I had failed.

Then I started thinking about what that silence actually meant, and it turned into one of the more useful lessons I’ve had about what a design system is actually for.

## The Buttons Nobody Was Supposed to Notice

Here’s what the rebuild actually involved, because the specifics matter more than the summary.

Our button component had drifted. Not dramatically, but in the way most design systems drift after two years of feature pressure. Someone had added a “large” size for a marketing page that never made it into the core spec. The disabled state used a gray that failed contrast against certain backgrounds. Focus rings were inconsistent between the coded component and the Figma library, which meant designers were prototyping states that engineers weren’t actually building. Loading states existed in three different visual styles depending on which engineer had last touched that part of the codebase.

None of this was catastrophic. Users were still clicking buttons. Conversion wasn’t collapsing. But every one of these inconsistencies was a small tax being paid by someone, somewhere, every single day.

So I rebuilt it properly. New token structure tied to our color system instead of hardcoded hex values. Consistent spacing scale across all sizes. A disabled state that met the 3:1 contrast ratio WCAG requires for non-text UI components. One focus ring, matched exactly between design and code. A single loading pattern instead of three competing ones.

I documented all of it. I wrote migration notes for engineering. I recorded a short video walking through what changed and why. I posted it in three channels.

And the reaction was close to nothing.

Most people who write about design systems talk about the launch. The rollout plan, the communication strategy, the adoption metrics. What almost nobody talks about is the specific, slightly deflating experience of doing real craft work and watching it disappear into the product without a ripple.

I noticed something about myself in that moment. I had wanted a reaction. Not because I needed praise, but because a reaction would have confirmed that the work mattered. Silence felt ambiguous in a way that criticism never does. Criticism at least tells you someone looked.

## Change Blindness Is Not a UX Compliment

There’s a concept in perceptual psychology called change blindness. It describes the well documented tendency for people to fail to notice significant changes in a visual scene, especially when the change happens gradually or during a moment of visual disruption, like a screen refresh or a page reload.

Designers love to invoke this concept as proof of good design. “Nobody noticed the change, which means it felt native.” I said something close to that to myself in the hallway conversation, and for a while it made me feel better.

But it’s worth being honest about what change blindness actually explains and what it doesn’t.

Change blindness explains why users don’t consciously register a shift in padding or a slightly warmer shadow color. It does not explain why an entire product team, including other designers, engineers who built the component, and a product manager who reviews the interface daily, also failed to notice.

Those are different audiences with different responsibilities. Users are allowed to not notice interface details. That’s the goal. But a team that ships a component library should be catching changes before they reach production, not discovering them by accident weeks later, if at all.

What I actually witnessed wasn’t a UX success story. It was a review gap. The pull request got approved based on the diff looking reasonable, not because anyone opened Figma and compared the before and after visually. The design QA step, if you could call it that, was me looking at my own work and deciding it was good enough to ship.

Most people assume a mature design system means high adoption and consistent components. What I learned is that adoption without active review is just a more expensive way of not paying attention. The components were being used correctly. Nobody was checking whether they were being used well, or whether changes to them were actually appropriate.

This is the part that made me uncomfortable, because it wasn’t really a story about buttons anymore. It was a story about how much of our process depended on someone eventually noticing something, rather than anyone being responsible for actually looking.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pARwcl1PF-0qJ_Dpekl6Kw.jpeg)

Diagram showing two rows of UI buttons side by side

## The Difference Between Invisible and Unexamined

I want to be careful here, because there’s a real distinction between two things that look identical from the outside: invisible design and unexamined design.

Invisible design is when something works so well that it recedes from attention. The user completes their task, the interface behaves predictably, and there’s nothing worth noticing because nothing went wrong. This is the outcome every interface designer is actually working toward. Don Norman wrote about this decades ago in relation to good doors and good faucets. The best interaction is the one you don’t have to think about.

Unexamined design is different. It’s when a change goes unnoticed not because it worked, but because no one was looking closely enough to know either way. The outcome looks the same on the surface. The difference only shows up when something goes wrong.

Here’s how I tell them apart now. I ask myself one question after any quiet launch: if I had introduced a regression instead of an improvement, would anyone have caught it before a user did?

For the button rebuild, the honest answer was no. If I had accidentally shipped a disabled state with worse contrast instead of better contrast, nothing in our process would have caught it before it reached production. No accessibility audit was scheduled. No visual regression testing was running against the component library. No designer outside my own team had eyes on the change before it merged.

That’s not a compliment to the design. That’s a gap in the system around the design.

I think this distinction matters more than most design system conversations acknowledge, because teams frequently celebrate silence as validation. A redesign ships, nobody complains, and leadership treats that as proof the change was correct. Sometimes it is. But sometimes silence just means nobody was positioned to notice a problem even if one existed.

Shopify’s Polaris team and Atlassian’s design system group have both written publicly about the review infrastructure they built specifically because they didn’t trust silence as a signal. Visual regression testing, automated contrast checking, and scheduled component audits exist precisely because relying on someone noticing is not a strategy. It’s a hope.

What changed for me after this realization wasn’t how I built components. It was how I evaluated whether a launch had actually succeeded.

## What I Started Measuring Instead of Waiting for a Reaction

Once I accepted that silence wasn’t a reliable signal in either direction, I stopped treating “no complaints” as the finish line for a design system change. I built a short checklist I now run through every time something ships quietly, and it has nothing to do with whether people react.

The first thing I check is whether the change is measurable independent of human attention. For the button rebuild, that meant running an automated contrast check across every button variant in every state, in every product surface where the component was used. Not asking a designer to eyeball it. Running an actual audit.

The second thing I check is whether the change was reviewed by someone with no stake in shipping it. Self review catches maybe half of what matters. I started asking a designer from a different product team to spend fifteen minutes clicking through the new component in context, with no context given in advance about what changed. If they couldn’t articulate what was different after using it, that told me something useful, either that the change was genuinely seamless or that it was too subtle to have been worth the engineering time.

The third thing, and this is the one most teams skip, is checking whether the change would have been caught if it had gone wrong. I started deliberately asking “what is our failure detection method here” before shipping, not after. For the button component, that eventually meant setting up a simple visual regression test in our CI pipeline, comparing screenshots of key components against a baseline before any merge. It’s not sophisticated. It just means a human doesn’t have to remember to look.

The fourth thing was harder to build a process around, and it’s the one I care about most now. I started asking whether the change actually mattered enough to justify the silence being acceptable. Not every inconsistency needs an emergency fix. Some things genuinely are fine to leave alone if the cost of changing them exceeds the benefit. I had assumed the button rebuild was obviously worth doing because I could see the flaws clearly. But worth doing to whom, and measured how?

This is where I started tracking something small but real: support tickets referencing button behavior, before and after the change. Time to complete key flows involving primary actions, before and after. Not because I expected dramatic movement, but because if a change I considered important produced zero measurable difference in either direction, that was information too. It might mean the change was purely a craft improvement with no business impact, which is a legitimate category of work, but one that should be labeled honestly rather than framed as more urgent than it was.

What surprised me most going through this exercise was how rarely teams distinguish between “this change matters and nobody noticed because it worked” and “this change didn’t actually matter much, which is why nobody noticed.” Both produce silence. They deserve completely different responses.

## The Meeting Where Someone Finally Noticed Something

About two months after the rebuild shipped, someone did notice, and it wasn’t the button styling.

A new engineer joined the team and was building a settings page. He opened our component library, found the button documentation, and used it exactly as written, including the updated focus ring behavior and the corrected disabled state contrast. In a design review, another designer pointed out that his disabled buttons looked “different” from what she remembered.

She wasn’t wrong. She just hadn’t noticed the change when it originally shipped. She noticed it later, in a new context, built by someone who hadn’t been part of the original rollout.

That moment taught me something about how design system changes actually get absorbed into an organization’s collective memory, or don’t. The initial launch is rarely when most people form their understanding of a component. Most people learn a component by encountering it being used, sometimes months after it changed, often by someone who wasn’t there for the original conversation.

This means documentation isn’t just for the day of launch. It’s for the six month mark, when someone new is trying to understand why a component behaves the way it does, with zero memory of the original decision. I went back and rewrote our button documentation with that person in mind specifically, not the team that shipped it, but the person who would eventually encounter it cold.

I also started doing something I hadn’t done before, which was scheduling a genuinely boring recurring review. Once a quarter, someone outside the original design system team spends an hour going through the core components with fresh eyes, comparing them against the documented spec, and flagging anything that has drifted. It’s not exciting work. Nobody has ever thanked me for instituting it. But it’s the closest thing I’ve found to a reliable notice mechanism that doesn’t depend on luck or someone happening to look closely on the right day.

Looking back, the meeting where someone finally noticed something wasn’t really about buttons either. It was a reminder that organizational attention is not evenly distributed across time. The people paying the most attention to a change are rarely the people who will be affected by it a year later.

## What This Says About How Design Systems Get Trusted, or Don’t

Here’s the conclusion I didn’t expect to arrive at when I started this whole exercise. The value of a design system isn’t proven by whether people notice it. It’s proven by whether people trust it enough to stop thinking about it.

That sounds close to the change blindness argument I was skeptical of earlier, so let me be precise about the difference. Trust isn’t the absence of scrutiny. Trust is scrutiny that happened once, thoroughly, by someone qualified to do it, resulting in a component reliable enough that repeated scrutiny becomes unnecessary.

The problem with our button rebuild wasn’t that people didn’t notice it. It’s that the lack of noticing wasn’t backed by any actual verification that the change was safe. We got lucky. The rebuild happened to be correct. But luck isn’t a system, and I don’t want to build a career on the assumption that my work will always be right the first time with no one checking.

This has a business implication that’s worth being blunt about. Design system work is chronically underfunded in a lot of organizations partly because its success looks identical to nothing happening at all. A redesigned onboarding flow that increases completion rate produces a chart leadership can point to. A button component that eliminates a year old accessibility failure produces nothing visible unless someone specifically goes looking for what didn’t go wrong.

If you work on a design system, or you’re advocating for one, this is worth saying out loud in whatever room decides your budget. The absence of visible failure is the actual product. It just doesn’t show up on a dashboard the way a feature launch does, so it has to be reported differently, through audits completed, defects prevented, and accessibility standards actually met rather than merely documented.

One lesson I didn’t expect from this whole experience is that I stopped needing the reaction I originally wanted. Not because I became indifferent to recognition, but because I found a better source of confirmation. I know the buttons are correct because I can point to the contrast ratio. I know the focus states work because there’s a test verifying it, not because nobody complained. That’s a sturdier foundation than silence ever was.

The buttons still work exactly the way I built them three months ago. Nobody has mentioned them since. I’ve stopped checking whether that bothers me, because I’ve replaced the question that used to matter to me, which was whether anyone noticed, with a better one. Would we have caught it if it had gone wrong.

Most of the important work in a design system will never be applauded. It will just quietly stop being a problem. The real discipline is building enough verification into your process that you don’t need anyone’s attention to know whether that quiet is earned.

What would you actually find if you audited the last quiet change your team shipped, not for whether anyone noticed, but for whether anyone could have caught it if it had failed?