---
title: "How the errors are guiding the Harness Design System"
source: "https://johnmorais.medium.com/how-the-errors-are-guiding-the-harness-design-system-ba5b56c72e69"
author:
  - "[[John Morais]]"
published: 2026-06-16
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/AI活用
  - topic/デザインシステム/ドキュメント
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*DQAOA8sx48Q-7EBCqRnZrA.png)

[*Leia em Português*](https://www.johnmorais.com/post/como-os-erros-est%C3%A3o-guiando-o-harness-design-system)

*Claude Code’s failures revealed exactly what our design system was missing.*

A conversation today with our Engineering Manager, Gustavo Navarro, and our Group Product Manager, Diogenes Vanzela, made something click that had been in front of me the whole time. The map of what we need to document in the Harness Design System project already existed. It was sitting in the errors Claude Code had been making for months.

## What the earlier tests had already shown

Before this project was formalized, we had already run experiments using Claude Code to build interfaces directly in code. Some results were surprisingly good. Others revealed problems I hadn’t expected.

What worked was the type of component with a global pattern: tables, headers, menus. Claude Code has seen these elements in thousands of different codebases. It can infer what a table is, how a menu behaves. It doesn’t need much instruction because the pattern exists outside our system.

What failed was a different type of component.

In one project we tested without any Figma prototyping, Claude Code tried to build screens that included drawers and other more complex components. For a custom component that displays a tire diagram, it got some parts right and badly mishandled others. Information became too small, spacing too tight for any real readability.

In list views, it used checkboxes inside a format that doesn’t exist in our system. It created grid-based indicators, splitting information into separate boxes when a simple list would have worked better. In another case, it generated a card-based list that was completely generic, with colors that made no sense and information boxes stacked with no refinement at all.

The most telling case: unable to find our specific way of handling status, it invented its own. It created cards with yellow, red, or green backgrounds depending on the situation. That logic doesn’t exist in our design system. It built it from scratch because it found nothing to reference.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iO33HaxJMD43QGS0XViUNA.png)

## The pattern behind the failures

Looking at the set of errors together, one pattern became clear: Claude Code invents when it can’t find.

When a documented component is available, it uses it. When there isn’t one, it creates one. And what it creates reveals exactly what’s missing from the documentation.

The checkbox inside a list view points to a list pattern that needs an explicit rule for when to use it and when not to. The status cards with shifting background colors show that our status system isn’t documented anywhere accessible. The information box taking up an entire row on its own points to a complete absence of guidance on space optimization.

Structural components with global patterns work because Claude Code has enough reference from the outside world. Components that are specific to the product fail because the only possible reference is our own system, and if that system doesn’t document well, the LLM guesses.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yTVk2qcKCTMX3MG-w_ktbg.png)

## How this changes prioritization

In the previous piece, I described the logic of prioritizing by the most-repeated screen pattern: menu, topbar, header, and table. That anchor still makes sense as a starting point. Today’s conversation added a second layer that had been missing.

The first part is still the components from the anchor screen. The menu appears on virtually every screen in the system. Claude Code can already build it reasonably well, but it still makes mistakes. Refining the documentation enough to eliminate those mistakes has immediate impact at full scale. It’s the component with the highest proportional return.

The second part goes directly to where the errors are concentrated. Drawers are the most critical case: they replace modals in our system, they’re used extensively, and Claude Code has been building them in a way that’s essentially random. Sometimes it lands on something close to our layout, but most of the time it misses badly.

Before assuming the problem is purely documentation, we need to test more. I need to understand whether Claude Code fails because it couldn’t find the component, because the existing documentation is insufficient, or because the instructions we gave were wrong to begin with. Each cause has a different fix.

## A recommendation for teams just starting out

Not every team has two weeks of dedicated focus on their design system, and not every design system has the specific problem we had with outdated tokens.

What this process is suggesting as a more practical entry point: start by using an LLM to build real interfaces in code. LLMs that produce code usable in production, with a developer in the loop. Rapid-prototyping tools fall outside what I’m recommending here.

In that process, the errors will show up. Each one points to a specific gap in the documentation. You don’t need to plan what to document. The LLM shows you where the gap is.

If you already have experiments done and failure cases mapped, which is our situation now, you can go straight to what’s failing and prioritize from there. If you don’t yet, test first, let the LLM fail, and use the errors as your map.

This doesn’t replace foundational work when it’s needed. Outdated tokens need to be resolved before any AI layer goes on top. Order matters. With the foundation reasonably solid, prioritizing by failure can be the fastest path to real value in day-to-day operations.

## What’s coming next

The Harness Design System project is already underway. React and Flutter developers, a teammate, and I are spending two weeks fully focused on it. The goal is to come out of this period with tokens applied in code, the anchor screen’s components refined, and a clear understanding of where drawers are failing and how to fix it.

I don’t know what results we’ll get. More to come soon.