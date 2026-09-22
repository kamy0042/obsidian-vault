---
title: "Building a Design System That Survives Contact with Reality"
source: "https://medium.com/design-bootcamp/building-a-design-system-that-survives-contact-with-reality-f5a104d157aa"
author:
  - "[[Shiva Padival]]"
published: 2026-07-16
created: 2026-07-26
description: "I still remember the day we launched our design system. The component library was pristine. Every colour token had a name that made sense. T"
tags:
  - topic/デザインシステム/運用・浸透
  - topic/デザインシステム/戦略・ガバナンス
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*M9xQujPouU-Hlb6GvavdJA.jpeg)

## Most design systems look perfect in Figma. Here’s what actually happens once they meet a real product team.

I still remember the day we launched our design system. The component library was pristine. Every colour token had a name that made sense. The documentation site had that satisfying, Stripe-esque polish. We demoed it to the whole org, and people clapped.

Four months later, three teams had forked the button component because “the padding didn’t work for their use case.” Nobody was using the new form patterns. And I found a screenshot of our “single source of truth” spacing scale being used as a joke in an engineering Slack channel, because half the codebase still used hardcoded pixel values anyway.

The system wasn’t badly designed. It was badly *deployed*. And once I stopped taking that personally, I started noticing the pattern everywhere — design systems don’t usually fail because of bad components. They fail because of bad assumptions about how systems survive contact with real teams, real deadlines, and real politics.

Here’s what I’ve learned, the hard way, about building one that actually holds up.

## Why design systems actually fail

Strip away the specifics, and most failed design systems break for one of three reasons.

**No ownership model.** Someone builds v1, gets promoted or moves teams, and the system quietly stops evolving. New components get bolted on by whoever needs them next, with no consistent point of view. Six months later, it’s not a system anymore — it’s a shared folder with delusions of grandeur.

**No versioning discipline.** A component changes, but there’s no changelog, no migration path, and no communication. Teams either silently break with an update or, more commonly, stop updating altogether and quietly drift onto a frozen fork. Now you’re maintaining two systems and calling it one.

**No adoption incentive.** This is the quiet killer. If using the design system is *slower* than a team just building their own button, they will build their own button — every time, no matter how good your documentation is. A system that isn’t the path of least resistance isn’t a system. It’s a suggestion.

None of these is a design problem. They’re operational ones. Which is exactly why so many talented designers get blindsided by them — we’re trained to solve the wrong layer of the problem.

## What “good enough to ship” actually means.

One of the more freeing lessons I’ve learned is that your v1 does not need to be comprehensive. It needs to be *credible*.

Credible means: it solves a real, current pain point for at least one team, it’s built on tokens (not hardcoded values) from day one, and it has just enough governance that people trust it won’t disappear next quarter.

I’ve seen teams delay launch for months trying to cover every edge case — dark mode, five-button variants, exhaustive documentation — before a single real screen ships with it. By the time it’s “done,” priorities have shifted, and the momentum is gone. Ship the ten components your product actually uses today. Let usage tell you what to build next.

## Getting engineering buy-in before design buy-in

This might be the most counterintuitive thing I did, and also the thing that made the biggest difference: I pitched the design system to engineering *before* I pitched it to design leadership.

Designers will generally support a design system in principle — it’s an easy yes in a meeting. Engineers are the ones who build and maintain the actual components, and they’re also the ones who quietly work around them if they're poorly built or poorly integrated into the codebase.

## Get Shiva Padival’s stories in your inbox

Join Medium for free to get updates from this writer.

I sat down with a senior engineer early and asked one question: “What would make this something you’d actually want to build against?” The answer reshaped the whole technical foundation — token structure, naming conventions, and even which framework primitives we built on top of. By the time design leadership saw the pitch, I already had an engineering champion in the room supporting it. That changes the entire dynamic of the conversation.

## Governance without becoming a bottleneck

Somebody has to say yes or no to new components, or the system degrades into chaos. But if that person becomes a bottleneck, teams will bypass the system entirely just to hit their deadlines.

The model that’s worked best for me is a lightweight review process with a clear default: propose a new component using existing tokens and patterns, get async review from one system owner within 48 hours, and if there’s no fundamental objection, it ships. Full committee review is reserved for genuinely new patterns — a new colour role, a new interaction paradigm — not for every variant of an existing card.

The goal isn’t zero friction. It’s *proportional* friction. Small changes should be nearly frictionless. Foundational changes should be scrutinised. Most systems get this backwards.

## Metrics that actually prove it’s working

“We shipped a design system” is not a result. Here’s what I actually track to know if it’s earning its keep:

- **Adoption rate** — what percentage of new screens are built using system components, tracked over time, not just at launch
- **Time-to-ship** — has the time from design handoff to shipped feature actually decreased for teams using the system
- **Consistency audits** — periodic spot-checks across the live product for drift (hardcoded colours, off-token spacing, one-off components duplicating existing ones)
- **Component requests vs. component forks** — are teams asking for new components, or just building their own without asking? The ratio tells you whether the system feels trustworthy.

None of these is exciting to report on. But they’re the difference between a system that’s actually load-bearing and one that’s decorative.

## A system is a product, not a deliverable.

The biggest mental shift I made was realising a design system isn’t something you launch. It’s something you *operate*. It has users (your product teams), a roadmap, support requests, and a deprecation policy for what didn’t work.

Once I started treating it like a product — with actual product management discipline, not just design polish — the conversations changed. Instead of “why isn’t everyone using this,” it became “what’s stopping adoption, and how do we fix that this sprint?” That’s a solvable problem. A vague sense that people “just don’t get it” is not.

The system that survives contact with reality isn’t the most beautiful one. It’s the one that’s honest about being a living piece of infrastructure — built with the same rigour, maintenance plan, and humility you’d expect from any other product your team ships.

> ***If you’re building or rescuing a design system right now, I’d love to hear what’s breaking for your team — governance, adoption, or something else entirely.***

*I hope you found this article helpful and that you will follow all of the rules and recommendations I provided.*

*And I would greatly appreciate your opinions and comments.*

*For more design updates, follow me on YouTube / Instagram and* [*Behance*](https://www.behance.net/shivapadival)*.*