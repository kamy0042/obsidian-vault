---
title: "Governance Models in Practice: From Controlling to Collaborative Design System Cultures"
source: "https://medium.com/@vasilhodzhev/governance-models-in-practice-from-controlling-to-collaborative-design-system-cultures-a6b51c63317f"
author:
  - "[[Vasil Hodzhev]]"
published: 2026-09-04
created: 2026-09-13
description: "More"
tags:
  - "clippings"
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RqFIYBHmWO1_-6I2ZsCwmA.png)

Governance is the question design system teams avoid until they can’t. Ask *“how are decisions made?”* and you’ll often hear a vague answer — *it depends*, *we align as needed*, *the team decides*. That lack of clear clarity is more than a simple gap in the process. It’s the source of most governance mistakes, and it usually signals something deeper: the organisation hasn’t agreed on what it values — consistency or autonomy, speed or inclusion, control or trust.

Governance isn’t paperwork. It’s a system for how your organisation collaborates.

The real question isn’t *“Which governance model is best?”*

> It’s *“Which governance model reflects how we want to work — and what trade-offs we’re willing to live with?”*

## The tension you can’t eliminate and you shouldn’t try

Every design system lives inside a permanent tension:

- Shared vs. Bespoke
- Consistency vs. Autonomy
- Rules vs. Flexibility

This tension isn’t a flaw to be fixed. It’s a reality to structure. Strong design systems don’t remove tension — they create mechanisms that turn it into productive decisions instead of recurring problem.

> Different governance models don’t “solve” the tension. They decide where the tension sits and who carries it.

## Centralised governance: the strong hand

In centralised governance, the design system team owns decisions and execution. They approve proposals, build components, and control what enters the shared library. All roads lead to the system team.

### How it works in practice

- The system team owns the roadmap and standards.
- Product teams submit requests for new components or changes.
- Requests go into a queue and are evaluated against principles and technical guidelines.
- If accepted, the system team builds and maintains it; if rejected, they provide rationale and alternatives.
- Only the system team can add to the canonical library.

Centralisation creates clear authority and removes ambiguity. When the central team is reactive, it can be remarkably efficient.

### When this works well

Centralised governance fits when:

- You need ***high consistency*** — regulated environments, accessibility-critical domains.
- The organisation is small or highly aligned.
- The system team understands most use cases.
- Teams trust the central authority.

A good centralised model often looks like protection: “We’ve solved this so you can focus on your product.”

### Where it breaks

Centralisation fails when it becomes a black box:

- The system team turns into a bottleneck.
- Product-specific needs don’t get addressed.
- Teams stop believing the system is for them and build workarounds.

The risk isn’t centralisation itself — it’s ***perceived gatekeeping***.

### What makes it work

Centralised governance survives on credibility, and credibility comes from:

- **Relentless transparency**: publish decision criteria and rationale.
- **Predictable responsiveness**: quick “yes” or quick “no” beats slow silence.
- **Visible impact**: show how feedback influences the roadmap.
- **Human access**: office hours, open reviews, and stakeholder loops.

If centralised governance is going to be strict, it must also be easy to exaplain.

## Federated governance: distributed authority

Federated governance distributes contribution and maintenance across teams. A core design system group typically owns foundations, while product teams can build product-specific components within shared guidelines.

### How it works in practice

- The core team maintains foundations — tokens, key primitives, critical patterns.
- Product teams create components for local needs using system standards.
- Components that prove broadly useful can “graduate” into the core library and core maintenance.

This creates shared direction without making one team hit ti operational limit.

### When this works well

Federated givernance works when:

- Design maturity is high across teams.
- Products are diverse and need local innovation.
- Leaders align on principles.
- You can invest in coordination and enablement.

### Where it breaks

Federated governance collapses into fragmentation when:

- Principles are unclear or weak.
- Quality and accessibility drift.
- Maintenance becomes everyone’s problem (*and therefore no one’s job*).
- Coordination overhead slows decisions more than centralisation would.

The key insight: ***federation requires clarity***. Without strong principles and boundaries, it becomes pure cahos. With them, it becomes scale.

### What makes it work

Successful federated systems typically have:

- **Champions,** often called ambassadors, in each product area.
- **Community rituals**: critiques, showcases, and cross-team reviews.
- **A lightweight proposal path**: pitch → feedback → build → graduate if proven.
- **Automated quality gates**: accessibility, linting, performance, documentation.

Federation succeeds when teams feel empowered and supported.

## Community-driven governance: emergent order

In the most distributed model, the system evolves primarily through community contribution with minimal central control. Shared principles and strong culture do most of the work.

### How it works in practice

- Most teams can create and share patterns without approvals.
- Good solutions spread through adoption rather than enforcement.
- A small group, or even one person, often coordinates documentation and makes collaboration easier, but doesn’t gatekeep.

### When this works well

This model can work when:

- Design culture is exceptionally strong and aligned.
- Contributors are senior and thoughtful.
- The organisation is small — or operates like an open-source community.

### Where it breaks

Community-driven governance breaks when scale outpaces culture:

- Consistency degrades and knowledge fragments.
- Teams duplicate work unknowingly.
- Decisions feel unpredictable.

### What makes it work

Emergent governance isn’t “no governance.” It’s governance by:

> Principles — Documentation — Peer review — Shared standards — Social accountability

If those aren’t real, the model won’t work.

## Hybrid governance: adaptive structure (what most teams actually need)

Most mature organisations land on a hybrid model: different parts of the system have different governance because they carry different risk.

A practical hybrid looks like:

- **Core primitive** such astokens, buttons, inputs, navigation: ***centralised.*** Too foundational to branch off.
- **Composite patterns** — forms, tables, workflows: ***federated.*** Built near product context; promoted when generalised.
- **Specialised components**: **community-driven.** Fast experimentation, shared learnings, optional adoption.

### A useful hybrid pattern: tiers

Assign every component a governance tier:

- **Tier 1 — Core**: centrally maintained; high bar for additions; changes require core approval.
- **Tier 2 — Standard**: teams can build; core team reviews for architecture or fit.
- **Tier 3 — Experimental**: teams share freely; minimal process; evidence required to move up.

Hybrid models work when tiers are explicit, understood, and revisited.

### Where it breaks

Hybrid becomes political when:

- Tiers are unclear or inconsistently applied.
- Teams game the categorisation.
- The core team lacks legitimacy to enforce standards.
- Communication fails and people don’t know how to navigate the system.

## Governance is also emotional and that’s why it succeeds or fails

Governance discussions often pretend they’re rational. In practice, governance is about how people ***feel***:

- Do people feel ***heard***?
- Do they have ***influence***?
- Do they get ***support***, not just rules?
- Do they keep ***autonomy where it matters***?
- Do they feel part of something larger?

The same centralised process can feel like protection or restriction depending on communication. The same federated model can feel empowering or chaotic depending on clarity.

If your governance model ignores emotion, adoption becomes a compliance problem. If it honors emotion, adoption becomes a relationship.

## The governance you actually need

Skip the theory. Focus on the basics:

1. **Make decision boundaries explicit —** What requires core approval? What can teams decide locally?
2. **Communicate authority and rationale** — People don’t just want rules — they want reasons.
3. **Make the process predictable** — How do proposals work? What’s the timeline? How are decisions communicated?
4. **Stay responsive** — Slow governance teaches teams to route around you.
5. **Listen more than you decide** — Treat feedback as signal. Change governance when it stops serving people.
6. **Celebrate influence** — Make it visible when the community shaped the system.

## The truth about governance

Governance isn’t about finding the perfect structure. It’s about building trust between the system and the teams across.

When people believe their voice matters — and can see how it changes outcomes — adoption follows naturally. When people feel ignored or constrained without explanation, resistance is inevitable, no matter how good the model looks on paper.

Pick the model that matches your maturity, then invest in transparency, clarity, and responsiveness. Do that, and whichever governance structure you choose will work.