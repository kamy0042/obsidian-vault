---
title: "When You Actually Need a Design System"
source: "https://medium.com/@sicarlos/when-you-actually-need-a-design-system-047f6243a173"
author:
  - "[[Carlos Fraccalvieri]]"
published: 2026-06-18
created: 2026-07-26
description: "Last time I said the system can wait. The product cannot."
tags:
  - topic/デザインシステム/戦略・ガバナンス
---
## Last time I said the system can wait. The product cannot.

I meant it. But waiting does not mean never. It means waiting for the right signal. And the right signal is not a feeling, not a conversation at a team offsite, not a designer who just came from a company that had one and wants to rebuild it here.

It is a specific kind of pain. And when you feel it, you will know.

## The pain that tells you it is time

You have more than one designer working on the same product at the same time. They are making different decisions. Not because they have bad taste. Because they have no shared reference. One uses 8px padding inside a card. The other uses 12px. Both look fine in isolation. Together they make the product feel like it was built by two different companies.

Developers are rebuilding components from scratch. Not because the components do not exist in Figma. Because there is no single source of truth they can pull from. Every new feature starts with a conversation about which version of the button is the right one.

A rebrand is on the table. Someone opens the Figma file and realises that changing the primary colour means hunting through three hundred artboards and updating things manually. The rebrand gets delayed. Then delayed again.

New people are joining the team. Onboarding takes weeks because the design decisions are not written down anywhere. They live in the heads of the people who were there at the beginning. When those people are busy, everything slows down.

Any one of these is a signal. All of them together is a clear answer.

## What you are actually building

A design system is not a component library. That is the part most teams build and the part that matters least.

A design system is a set of decisions that have been made once, documented clearly, and made available to everyone who needs them. The component library is just those decisions expressed in code and design files.

The decisions are the system. The files are the output.

This distinction matters because teams that think they are building a component library end up with a Figma file that nobody uses. Teams that think they are documenting decisions end up with something that actually changes how the product gets built.

Before you write a single component, write down the decisions. What are the colours and why were they chosen. What is the type scale and what are the rules for using it. What is the spacing system and what problem was it designed to solve. What does the product voice sound like and what are the words we do not use.

If you cannot write these down, you do not have a design system yet. You have a collection of files.

## The mistake everyone makes at the start

They try to build the whole thing before they use any of it.

Six weeks of system work before a single component touches the product. Tokens, documentation, contribution guidelines, versioning strategy, a Notion page with governance rules nobody has read.

Then the system meets reality and half the decisions made in isolation turn out to be wrong. The button padding that looked right in a component frame looks wrong inside an actual form. The colour that passed contrast checks in Figma fails in the browser on a Windows machine.

Build the system by building the product.

Take the next real feature and build it properly. Document the decisions you make. Extract the components. Put them somewhere shared. That is your first version. It is imperfect and it is real and it is infinitely more useful than six weeks of work that has never touched a user.

## How small is small enough to start

One token file. Colours, spacing, typography. The decisions that everything else will be built from. Get these right and the components that come later are just combinations of things you have already decided.

One component. The one that appears most frequently across the product. A button, a form field, an input. Document it properly. States, variants, usage rules, what it is not for. One component done right is worth more than twenty components done quickly.

One place where everything lives. Not a beautiful documentation site. A Notion page, a Figma library, a shared folder. Somewhere that is not in someone’s head or in a file called “design-system-v3-FINAL-use-this-one.”

That is enough to start. Grow it from there as the need arises, not in anticipation of needs that might never come.

## The governance question nobody wants to answer

Who owns this.

Not who built it. Who owns it. Who decides when something gets added. Who reviews contributions. Who is responsible for keeping it consistent as the product grows.

Without an answer to this question, design systems decay. Components drift. The token file gets duplicated and edited locally because updating the shared one requires a process nobody has time for. The documentation falls behind. New team members stop trusting the system because it does not match what is actually in production.

Ownership does not mean one person does everything. It means one person or one small group is accountable for the health of the system. They review changes. They communicate updates. They retire things that are no longer relevant.

In a small team this can be one designer with one afternoon a week. The time is less important than the accountability.

## When the system is working

You will know because the questions stop.

Not all questions. But the questions about which version of something to use. Whether a new component should use this spacing or that one. What colour the secondary button should be on a dark background. These questions have answers and the answers are in the system and nobody has to ask.

New features get designed faster because the building blocks already exist. Developers build faster because the components are documented and the decisions have been made. Onboarding takes days instead of weeks because the thinking is written down.

The system is not the thing users interact with. They never see it. But they feel the difference between a product built with one and a product built without one.

Consistency is not a visual thing. It is a trust thing. A product that feels coherent feels considered. A product that feels considered feels like the people behind it know what they are doing.

That trust starts in the system.

## The honest version

Building a design system is not a milestone. It is not something you finish and move on from. It is ongoing work that compounds over time when you treat it seriously and decays rapidly when you do not.

The teams that get the most from their systems are not the ones that built the most comprehensive ones. They are the ones that built the right ones for where they are, maintained them honestly, and grew them in response to real problems.

Start when the pain is real. Start smaller than feels right. Document decisions before you document components. Assign ownership before you assign tickets.

And remember what the system is actually for. Not to impress new hires. Not to add to a case study. To make it easier to build a better product consistently, over time, as the team and the product grow.

Everything else is secondary.

*I’m* [*Carlos*](https://www.linkedin.com/in/sicarlos/)*, a product designer running from Porto. I work with startups and founders on products that are worth using. If something here resonated, feel free to connect.*