---
title: "Design systems were already broken"
source: "https://medium.com/design-bootcamp/design-systems-were-already-broken-cfcd854ccb3d"
author:
  - "[[Derek Niedringhaus]]"
published: 2026-09-10
created: 2026-09-13
description: "More"
tags:
  - "topic/デザインシステム/批評・本質論"
  - "topic/デザインシステム/AI活用"
  - "topic/デザインシステム/運用・浸透"
  - "topic/デザインシステム/戦略・ガバナンス"
  - "clippings"
---
For the fifth consecutive year, driving adoption and raising awareness top the list of biggest challenges for design system teams. That’s from zeroheight’s [Design Systems Report 2026](https://report.zeroheight.com/), their fifth annual survey of 147 practitioners, most of them at companies with more than a thousand people.

In the same report, zeroheight describes Gartner’s 2025 Hype Cycle placing design systems on the slide from inflated expectations into the Trough of Disillusionment. The work of maintenance, adoption, and organizational buy-in is catching up with the promise.

But you wouldn’t know it if you looked at what the field is talking about. Agentic design systems. Making your library machine-readable. Rules files and metadata so a coding agent renders the right button. Much of that conversation comes back to how to get an AI to produce accurate screens.

![A neatly aligned grid of cream and blue interface panels sits above exposed machinery with mismatched connectors and dangling, disconnected cables.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1HGIw9fBJXi_24AzSBKo1g.png)

A neatly aligned grid of cream and blue interface panels sits above exposed machinery with mismatched connectors and dangling, disconnected cables.

**What the numbers actually say**

Start with adoption, since that’s the thing that’s been at the top of the list for half a decade.

Satisfaction with getting buy-in for a design system fell from 42% to 32% in a year. Dissatisfaction rose from 23% to 40%. Respondents describe difficulty getting management support and proving the system’s value.

The practitioners say it plainer. One describes a system whose use is encouraged by management but never required. Another reports huge adoption gaps and no metrics to track them. A third says developers have bought in while designers are reluctant to use the components as provided.

Then the machinery. Only 37% of respondents report any automation in their design system. Another 32% plan to add it, and 31% have no plans. Only 40% report a token pipeline, an automated way to move shared values such as colors and spacing between tools. Only 11% can sync tokens from code back to design.

Only 34% provide onboarding materials for the thing they want everyone to adopt.

## The token number is the whole story in miniature

In its [2025 report](https://othr.zeroheight.com/hubfs/zeroheight%20-%20Design%20System%20Report%202025%20-%20release%20version.pdf), zeroheight reported that design token adoption had gone from 56% to 84% in a single year. The report called it mass adoption.

One year later, 40% of respondents have a pipeline and 11% can get a token change from code back into design.

So what was the 84%? Teams reporting that their systems included tokens. It measured coverage. It didn’t establish whether changes could move reliably between tools. Adoption had become a much bigger number than automation.

That gap between the thing being adopted and the thing actually working is the design system story of the last decade, and it has nothing to do with AI.

## Nobody thought the problem was rendering

Run down the failure list. Ownership that never got assigned. Governance nobody agreed to. Systems too rigid for real product work, so teams built around them. Documentation people couldn’t find. No feedback loop, no metrics, no way to prove the thing was working. Components in production that don’t match the library, which don’t match Figma.

Not one of those is a rendering problem. Making a file machine-readable doesn’t assign an owner or resolve a disagreement about how the product should behave.

And the field knew about the variance problem a long time ago. Brad Frost [wrote a post in February 2021](https://bradfrost.com/blog/post/design-system-components-recipes-and-snowflakes/) giving it vocabulary. Design system components are shared across products, recipes combine them for use within one product, and snowflakes are one-off components that don’t get reused. His example was a Seat component for an airline’s seat selection. The advice was architectural. Give each kind of thing a place to live so the library doesn’t get polluted.

That’s useful advice. But those categories tell us where a component belongs and how widely it’s reused. It doesn’t say what the thing is, what it can do, what states it can be in, or who’s allowed to act on it. Knowing that *Seat* is a snowflake doesn’t tell us when it can be reserved or who can release it.

## The screws we tightened, and the ones we didn’t

We got very, very good at visual precision. Named values for colors and spacing, organized into layers. Contrast ratios. Figma variables for themes and brands. The specification of what a thing looks like has never been tighter.

Meanwhile, teams build bespoke components because the real case doesn’t fit. Take two sets of filters on the same kind of object, in the same product. One applies each selection immediately. The other waits for an Apply button. Both can follow the spacing and color rules perfectly. The library still needs a rule for when each behavior is appropriate.

We tightened the screws on appearance and left implementation, variation, and behavior largely to discretion. A system tuned hard for visual consistency and thin on everything else is one that developers have to route around when the component can’t take a real requirement. The rigidity produces a fork, a separate version that lives outside the library. If nobody documents the difference, you now have two systems.

Design systems were sold on efficiency. Nathan Curtis put the value in the right place [back in 2017](https://medium.com/eightshapes-llc/measuring-design-system-success-d0513a93dd96), when he wrote that “a system’s value is realized when products ship features that use a system’s parts.” But counting parts shipped doesn’t tell us whether those two filters should behave the same way, or who decides when they shouldn’t.

## What’s on offer now

A prominent answer is that AI plus a good design system is better than AI alone. Brad Frost [put it plainly in December 2025](https://bradfrost.com/blog/post/agentic-design-systems-in-2026/), writing up a session he did with the Storybook team. Constrain the AI to the organization’s design system materials so the output follows its established standards.

That’s a useful way to generate from an agreed library. The question is what the library has actually settled.

Storybook’s [promotion for the same session](https://bsky.app/profile/storybook.js.org/post/3m7nl66kum22a) said it directly. “AI is now consuming design systems exactly as written.” Their point was that missing examples, states, and constraints become visible in what agents generate.

Exactly as written also leaves out the human work that filled the gaps.

The developer who knew the component wouldn’t take the real case and forked it. The designer who detached a component from the library so they could change it. That gap-filling keeps work moving. It also leaves decisions outside the shared system.

So the plan puts the design system in the guardrail position. But the design system is the thing that wasn’t holding.

## What practitioners actually want from this

In the same [2026 report](https://report.zeroheight.com/), 56% of respondents are using or experimenting with AI. Asked which advances excite them, 57% name documentation generation and 13% name design generation. Asked what worries them, 61% name design generation.

One of them wrote: “AI can help us document faster, but it can’t decide what’s worth documenting.” Another describes spending more time cleaning up AI output than it saves. A third points to the distance between individual contributors’ experience and stakeholders’ expectations, shaped by the marketing around AI tools.

The people doing this work want help with the documentation nobody has time for. Generating more designs doesn’t answer that need.

## Where that leaves it

Making the library machine-readable lets an agent read the rules. Teams still have to decide who owns them, where variation is allowed, and how decisions made in product work get back into the system.

I think that calls for an AI-native design platform. By platform, I mean a connected set of tools that lets people express an idea, work out what it means for the product, and govern the decisions that follow.

A designer should be able to start in Figma and use evidence from working software to develop the idea. Someone else should be able to start with the software, inspect what’s there, and bring what they learn into Figma. Or begin by describing what the product needs to do and explore different ways of expressing it. The work should be able to move between those tools without losing the reasoning behind it.

Take the two filters. A platform should help the team decide when immediate filtering makes sense and when an Apply button is appropriate. It should keep that decision with its evidence and the conditions it applies to. If someone changes the behavior in Figma or in code, the difference should come back for review. The team could accept a useful exception, change the shared rule, or fix an implementation that got it wrong.

AI should help find relevant evidence and make a proposed change explicit enough to inspect. It should show where that change conflicts with an earlier decision and which parts of the product it could affect. People need to be able to question the proposal, try another approach, and decide what becomes part of the system.

That gives the platform something larger to support than the finished interface. It has to support the work while an idea is still taking shape, and make the decisions available to the next person who needs to understand or change them.

I want to explore that in the next two pieces. First, what this ecosystem would need to let us start from an idea, a design, or existing software and move between them. Then, what it takes to change a decision and follow its consequences all the way back into the product.