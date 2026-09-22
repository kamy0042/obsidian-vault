---
title: "Owning the Design System"
source: "https://medium.com/design-bootcamp/owning-the-design-system-8a28ea61372b"
author:
  - "[[Joshua Hall]]"
published: 2026-06-30
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/戦略・ガバナンス
  - topic/デザインシステム/運用・浸透
---
![](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*EnUf3uPuWb5ZQgHe-QqYQw.jpeg)

Photoshop and Illustrator have lived in the same building at Adobe for more than thirty-five years. They share a brand, an installer, a roadmap, and a customer base. They do not share what the escape key does inside a text field. Hit escape in Illustrator and your edit commits. Hit escape in Photoshop and your edit cancels. Same vendor, same decades of design investment, opposite behavior on the single most common keystroke a user makes in a text input.

This is what I think about when someone tells me their company is “between design systems” or “about to start a design system project.” Every software product needs a design system, in the sense that every product runs into the questions one exists to settle. Not every product has one. The gap between needing and having is where the escape key ends up meaning two different things, and most of the failure modes I see live in that gap, because companies treat the system as a project they’ll finish rather than a function they have to own.

## The Project Trap

The pattern is predictable. Leadership notices the products have drifted, sometimes cosmetically but usually a mix of visual and UX inconsistency. They fund a six-month design system effort, which is a reasonable first investment depending on scope. They assign a small team, which is also fine; a design system rarely needs a large one. The team ships a version on time. Then it gets disbanded or rotated back to product work, because the system has been “delivered.”

Within a year the system is stale. Within two there are seventeen dropdowns again. Within three, leadership starts talking about “doing a real design system this time,” and the cycle restarts. I’ve watched this play out at three companies I’ve worked with closely, and from the outside at many more.

The fix is structural. A design system is not a deliverable; it’s a function. Someone has to be accountable for it for as long as the products live, and that accountability has to be staffed continuously: named people, on the org chart, evaluated against the health of the system. Without it, the system decays at roughly the rate the surrounding products evolve, which is fast.

That rate is accelerating. As product development speeds up under agentic engineering, so does the rate of decay, and agents introduce a failure mode of their own. Point a coding agent at a feature without strong harnesses, CI checks, and constraints, and it will happily invent a component that diverges from your approved variants, because inventing one is locally easier than finding the sanctioned one. The same force runs the other way. Build a strong system with those harnesses and agent-facing tools, and you accelerate agentic development instead of fighting it. The companies that get this right compound a durable advantage; the ones that don’t keep paying down the same drift, faster than before.

## Who’s Accountable

Accountability means one person, not a committee, and not “design owns it” as a department-wide shrug. A specific individual whose job is the system and whose performance is judged on whether the system is healthy. What “healthy” means is the crux, and I define it precisely further down.

The background that fits best is heavy UX design experience, but the role benefits from range, frontend engineering especially, because designers and engineers are the two stakeholder groups the system serves. In a smaller org this is usually a principal-level person. In a larger one it can be a director or VP. The level matters less than the mandate.

Placement is where it gets interesting. This person typically reports into a cross-org product or technology unit, and I think it’s important they sit as a peer to the product-line leaders rather than beneath one. The design system team will almost always be smaller than the teams it serves, and silos form fast when a small team lacks peer-level authority. Put it under a single product line and it inherits that line’s priorities; the other lines stop treating it as theirs.

Reporting under Design is the most common arrangement and often the worst. The team becomes a designer-only group shipping beautiful Figma libraries that engineering implements incompletely, and the code drifts because there’s no accountable counterpart on the build side. Reporting under Platform Engineering buys technical credibility at the cost of design quality; engineers optimize for “is it reusable” and “is it cheap to build” over “does it feel coherent.” The structure I prefer for mature orgs is a peer to both, reporting to whichever executive can fund and protect the function, usually the CPO and sometimes the CTO. As a technical CPO myself I lean toward product, but that’s how I happen to operate, not a universal rule.

What matters more than the reporting line is political weight. The team has to be able to tell a product team no, you can’t fork this component, and have that no taken seriously. If it can’t say no, the system fragments. If it can only say no, the system becomes an obstacle. It also needs enough influence to prioritize system work ahead of other engineering initiatives when the reasoning is sound. Often the two run in parallel; sometimes a system change genuinely has to finish first, and the team needs the standing to make that call stick.

## The Team

A single design system team is small: one accountable lead, one or two senior designers, one or two senior engineers, and partial design-ops support. It scales with company size, but the shape stays consistent.

Seniority matters most at the top. Design system engineers are platform engineers, building infrastructure other engineers depend on, and the calls they make about API design, breaking changes, and deprecation get baked into every downstream product. The same holds for designers: reasoning about how a component lands across thirty feature contexts takes someone who has seen thirty feature contexts. The standard to hold isn’t “big team” or “small team.” It’s the highest possible quality control, because a mistake in the design system behaves like a mistake in DevOps. It propagates everywhere, and in the worst case it takes down the whole org’s surface for as long as it takes to unwind.

That standard is about the leadership of the team, not a wall around it. I’ve rotated junior engineers and designers through the system team, paired with a senior or architect-level mentor, precisely because the work is so high-impact downstream. It’s the roadworks of the org: less glamorous than shipping product, and the thing that lets everything else get built. A tour on the system team shows people the full breadth of the org’s work in a way they never see siloed in one business unit. Some find they love it and stay. Most should do a six-month tour, absorb how the system thinks, and carry that back to a product team. The trap to avoid is leaving people feeling stuck there forever.

For larger portfolios, one team isn’t enough, and the structure that works is layered. A meta-system team owns what every product shares: brand, yes, but also shared workflows, shared interaction patterns, and platform-level components. Each product’s design system builds on that foundation and adds what’s specific to it. Audition and Premiere both need a media-file list (a shared component), both add media to a project (a shared workflow), both put tracks on a timeline (a shared interaction model). Audition never exports a video file; Premiere never takes a live MIDI feed, so those stay product-specific. This is the layer where Photoshop and Illustrator should have inherited one shared answer for how text boxes behave on a canvas, the same in every Adobe app with a visual artboard. They wouldn’t have started that way, since most of these products were separate before they were Adobe’s, but as each migrated onto the shared system it would have inherited the common behavior. The escape key would mean one thing.

## How You Know It’s Healthy

I said the accountable person is judged on whether the system is healthy. That word does no work unless you define it, so here’s the definition I use: four measures, each one a question the team can answer with data.

**Adoption** is the first, and the one most teams already reach for. The question is simple, do product teams actually use the system, and it’s measurable without much effort. Parse the codebase for system component instances versus inline implementations. Count the buttons that are `<Button>` against the ones that are `<div role="button">`. Flag inline styles that bypass design tokens. None of this is hard; most companies just never ask anyone on the team to measure it.

**Throughput** is the one teams forget, and it’s the closest thing to a business case. The question is whether the teams consuming the system ship faster because of it. The proof is in cycle time on feature work that leans on the system versus work that doesn’t. A healthy system shows up as product teams moving faster on the parts the system covers, because they’re not relitigating primitives for every feature.

**Completeness** is distinct from adoption, and keeping the two separate is what makes this framework crisp. Adoption asks whether teams use the system. Completeness asks whether they can. The measure is how often a team hits a wall that needs a new component, state, or pattern before it can proceed. A system can have high adoption and low completeness: everyone uses it, and everyone is also blocked twice a sprint waiting on it. The hard cases live here. Does the system hold up across device sizes and interaction models, across screen readers and locales, against WCAG and ADA, when a new feature needs something the system never anticipated?

**Downstream value** is the hardest to measure and the largest in magnitude. The question is what the system is worth in compounded efficiency. The honest comparison is to scaffolding everywhere else in software: writing HTML and CSS from scratch versus reaching for Tailwind, building authentication from scratch versus configuring Clerk or Cognito. Good scaffolding compresses weeks of work into hours of configuration. A design system does the same for product UI, and a system built with agent-facing documentation and tooling (an MCP server the agents can query, skills scoped to your components) compounds it further, because every agent-assisted feature inherits the system instead of reinventing around it. I’d expect a strong system to move total output by double-digit percentages on that axis alone.

Measuring these changes how the team responds when a product team forks a component. Without numbers, the response is moralistic: they were wrong, they should have used the existing component. Moralism breeds resentment and eventually silent forking. With numbers, the response is diagnostic: adoption on this component dropped last quarter, why? The diagnostic stance produces a working system. The moralistic stance produces a working dashboard and a fractured product.

The goal is to make the system the platform of choice, the easiest path most of the time, with enough shared ownership that people want to use it. When a gap shows up, it should land as opportunity: “I get to help define a thing everyone will use,” or “I just found something that already does this better than what I was about to build.” What you’re avoiding is the third reaction, “this is going to slow me down for two months and put me on the wrong side of a slipped schedule.” That reaction is how systems die.

## The Productive Conversation

Authority to say no only works if no is almost never the answer. When a product team needs to fork a component, the team’s response matters more than its veto. The pattern that works starts the same way every time. The product team says “here’s what we’re building, and the existing component doesn’t fit because X,” and the system team’s first move is to listen and confirm the gap is real. Then it branches three ways.

Sometimes the gap is real and small: “Agreed, we can patch the existing component within a week. Use it for the prototype and we’ll ship the update before you launch.” Sometimes the gap is real and large: “Build what you need bespoke, document it as a temporary fork, tag it so we can track it, and we’ll pull the pattern back into the system next release.” That’s the legitimate fork: explicit, time-bounded, with a path home. And sometimes the better move is a redirect: “Did you consider this alternative with existing components? It’s slightly off-optimal for your case but stays in the system, and we’ll watch whether your case is common enough to warrant a change.”

The wrong response, the one that kills system teams, is “no, use what we have, your case isn’t important enough.” That trains product teams to stop having the conversation, and the moment they stop, silent forking starts and the seventeen dropdowns come back.

On a large enough org, rotation reinforces this. Cycling people through the system team, the way a factory floor rotates positions, builds a deeper appreciation for the work and a web of social connections with the core team everyone depends on. As long as people like working with that core team, it’s one of the most effective ways I’ve found to build lasting esprit de corps across an org.

## The Failure Mode to Avoid

The system teams that die all die the same way. Treated as a project that got delivered. No authority to hold the line on adoption. No relationships to make the productive conversation work. No measurement, so they couldn’t show leadership why the investment paid off. Funding pulled after a quarter or two for lack of visible ROI, the team disbanded, the products fragmented again, and three years later someone proposes a real design system this time.

The alternative isn’t exotic. Fund the function continuously. Give it the authority to operate and the peer standing to prioritize. Staff it with people who can hold the bar. Define healthy as adoption, throughput, completeness, and downstream value, and measure all four, so the ROI is visible before anyone questions it. Most companies skip this not because it’s hard but because a design system doesn’t show up on the org chart as a function the way platform engineering does.

So here’s the test, if you’re building a product company meant to run more than a few years. The need isn’t in doubt; every product runs into the questions a design system exists to answer. Whether you *have* a design system is the only thing that varies, and that’s a question about ownership, not components. Ask who’s accountable for the system by name, what number tells them it’s healthy, and what happens to that number when they leave. If you can’t answer all three, you’re in the gap between needing and having. What’s sitting there is a collection of components waiting to drift, and the next dropdown is already being built.