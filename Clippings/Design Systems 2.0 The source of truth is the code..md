---
title: "Design Systems 2.0: The source of truth is the code."
source: "https://medium.com/design-bootcamp/design-systems-2-0-the-source-of-truth-is-the-code-ad2605e4f72d"
author:
  - "[[Mattia Astorino]]"
published: 2026-09-15
created: 2026-09-17
description: "There’s a lot of noise about design systems and AI right now, and much of it misses the point."
tags:
  - "clippings"
---
## There’s a lot of noise about design systems and AI right now, and much of it misses the point.

Teams still treat a design system like a Figma library plus a style guide, then ask AI to help maintain that pile, which fights the medium: you’re asking a model to keep several copies of the same system aligned across static design files, docs, code, and guidelines. Drift isn’t a tooling bug; it’s what you get when truth lives in five places.

A design system isn’t a deck of components on a canvas. It’s a shared language made real in product: tokens, foundations, components, patterns, and the rules that keep them coherent as the product changes. Split that language across tools with no single source, and every change becomes a reconciliation job. AI doesn’t fix that; it multiplies it.

The better path looks almost opposite to how most teams work today. Code can live on a canvas in the browser, where designers edit it visually with AI in the loop and developers still edit it as code: same artifact, same truth. That isn’t a compromise between design and engineering. It’s the only workflow where AI works well, because the model reads and writes one thing it understands deeply: the system as implemented.

Why put code at the center? Because code is the powerful part of the stack, and it’s what people actually see. A static design file is a proposal; the running interface is the product. That same code can be rendered in the browser as a visual canvas, close to how teams already think in Figma, while staying editable as real implementation. Designers get a surface they can shape, developers get source they can trust, and AI gets something it already understands natively: structured, executable interface code, not a picture of one. When the system lives there, you’re not translating between worlds. You’re working in the one that ships.

Forcing AI into the old pipeline (mock, hand off, document, implement, hope the docs still match) optimizes for familiarity, not coherence. Maintain four or five surfaces and you create four or five chances to diverge; focus on one scope (the code) and the AI stays inside a single object. Alignment stops being a project and becomes a property of the process.

That only works if you build a strong, platform-agnostic foundation underneath the system: not another layer of the product UI kit, but the substrate the system sits on, covering distribution, versioning, tokens, and a toolchain where the canvas and the code are the same conversation. Without that, “code as source of truth” is a slogan. With it, design and development can share one loop.

I’m building [ViraUI](https://viraui.dev/) around this idea. The workflow looks like this in my head.

## 1\. Define the system with AI

Before anyone draws a button or ships a package, you decide what the system is. That work is conversational and deliberate: you describe the product context, the audience, the constraints, and the interface language you want to own, then use AI to turn that intent into an explicit brief covering principles, UI tone of voice, aesthetic direction, density, motion posture, accessibility baselines, what “on brand” means in interaction terms, and what is out of scope.

This is design-system design, not component production. You’re setting the rules the rest of the team will follow: how decisions get made, what consistency means here, and which tradeoffs you accept. The model helps you pressure-test those rules by surfacing contradictions, proposing alternatives, and turning vague taste into written constraints, while the team still owns the judgment. The output isn’t a library. It’s a shared definition clear enough that foundation work and later component work have something solid to build against, instead of reinventing taste in every pull request.

## 2\. Engineers build the skeleton

Once that identity is clear, engineering builds the substrate that makes code-as-truth real: tokens, themes, package distribution, versioning, docs generated from the same source that ships, and a toolchain that connects visual editing on a canvas (Storybook?) to the coded artefact developers already trust.

This layer isn’t “part of the design system” in the product sense. It’s the platform-agnostic base underneath it, something that has to hold whether you render on the web today or extend later. Spacing, color, typography, elevation, focus behavior, and the rest become encoded contracts rather than slide-deck promises. The toolchain decides whether designers and developers meet on one object or keep bouncing between mirrors. Get this wrong and every AI-assisted edit becomes another sync problem; get it right and the canvas, the code, and the release pipeline describe the same system.

Distribution is part of that job, and it has to include the documentation itself. If you want AI to work the way the team defined (inside the system’s rules, not beside them), ship the full docs with the design system and keep that material always up to date and reachable at the source, so an LLM can read it directly instead of scraping pages written for humans and then guessing what still matches reality. Human-facing docs go stale; this is a fact. They get paraphrased, pick up small errors, and those errors compound into drift. When the system package carries its own machine-readable contract, the model consumes the same truth the product ships. Vercel takes a similar path with Next.js: documentation travels with the framework so tools and models can use the source built from the source, not a secondhand rewrite of it.

## 3\. Design builds on that foundation

With foundations and toolchain in place, design can work where the product actually lives. Designers shape components and patterns with AI, inside the constraints engineering already encoded (spacing, color, typography, interaction rules, and the rest). They explore on the canvas: compose, refine, ask the model for variants, while every change lands in the same coded source developers will review, test, and ship.

That changes the job. You’re no longer inventing a parallel truth in a static file and hoping implementation catches up. You’re authoring the system itself: components that respect the foundation, patterns that encode real product flows, and states and edge cases that usually die in handoff. AI speeds up exploration and boilerplate, and it stays useful because it operates on one scope (the living system), not on a Figma file, a docs site, and a repo that disagree by Thursday. Design leads the craft, the foundation keeps craft honest, and code remains the record.

## 4\. The system lives

From there, iteration is continuous. AI sits at the center of the process, not as an optional plugin on yesterday’s handoff. The system evolves in one place, with one source of truth, and so do the documentation and the guidelines that orchestrate it. The people who care about craft and the people who care about implementation finally work on the same object, not multiple representations of the same system.

Design systems didn’t fail because teams lacked discipline. They strained under a model that duplicated truth and asked humans (and now models) to keep the copies honest. If AI can read and write interface code fluently, stop treating static design files and prose docs as peers of the implementation. Put the source of truth in code, give it a canvas, let designers and developers meet there, and let AI work where it’s strongest: on one living system, not on five shadows of one.

That’s Design Systems 2.0: no more tools in the old workflow, but one workflow built around how AI actually works.