---
title: Your design system has opinions. They’re just not being enforced
source: https://www.designsystemscollective.com/your-design-system-has-opinions-theyre-just-not-being-enforced-281ed81083f7
author:
  - "[[Murphy Trueman]]"
published: 2026-01-15
created: 2026-07-10
description: "Your design system has opinions. They’re just not being enforced Why validation is the missing layer between documentation and adoption Disclaimer: I earn a small amount when Medium members read my …"
tags:
  - topic/デザインシステム/戦略・ガバナンス
---
## [Design Systems Collective](https://www.designsystemscollective.com/?source=post_page---publication_nav-dbd299f90c1d-281ed81083f7---------------------------------------)

Follow publication

[![Design Systems Collective](https://miro.medium.com/v2/resize:fill:76:76/1*KfuDI5s2VksG_8pWv0nCFA.jpeg)](https://www.designsystemscollective.com/?source=post_page---post_publication_sidebar-dbd299f90c1d-281ed81083f7---------------------------------------)

A welcoming community for designers and developers passionate about scalable, consistent design. Explore articles, insights, and resources to build and refine your design systems. Join us to connect, learn, and shape the future of systematic design together.

Follow publication

**Why validation is the missing layer between documentation and adoption**

> *Disclaimer: I earn a small amount when Medium members read my work, so I’ve set this one to members-only. Not a member? No worries — you can still read the full article using* [*my friend link*](https://murphytrueman.medium.com/281ed81083f7?sk=b8467b3dfff03c04af0bcfaddabccbb8)*.*

A modal needs a header, a body, and actions. Everyone knows this. It’s in the docs. It’s in the Figma file. It’s in the component definition.

And yet, two days ago, someone shipped a modal without action buttons. The PR got approved. QA didn’t catch it. Now it’s in production, and a user is staring at a dialog box with no way to proceed.

This happens because design systems have opinions they don’t enforce. We write the rules down. We trust people to follow them. And when they don’t, we call it a “process problem” and move on.

Most design systems don’t work like infrastructure. They work like hope.

We publish components, write docs, and pray teams wire them up correctly. When they don’t, we discover it in QA… or production. And now we’re entering a world where the “team” using your components might be a human, an AI agent, or both. If your design system doesn’t enforce contracts, it isn’t infrastructure. It’s a library people interpret however they want, and you spend the next six months arguing about what “correct” means.

I’ve [written before](https://blog.murphytrueman.com/your-next-design-system-user/) about the shift from implicit knowledge to explicit contracts. That shift isn’t optional anymore.

![Isometric illustration of a central hub branching to coloured blocks, like a component tree on a circuit board.](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*PpTCBHmQheS3qUyb.jpeg)

Isometric illustration of a central hub branching to coloured blocks, like a component tree on a circuit board.

## The infrastructure mindset

Backend teams would never ship an API that accepts whatever it’s given and “does its best”. They validate inputs. Databases enforce constraints. Infrastructure rejects malformed requests before they can cause damage.

UI rarely gets the same treatment. We tolerate ambiguity that backend teams would never accept.

Nathan Curtis has been pushing back against this for years, [advocating for components as structured data](https://medium.com/@nathanacurtis/components-as-data-2be178777f21). His work on component definitions is basically “design tokens, but for components”: anatomy, props, styles, variant behaviour, all expressed in neutral formats like YAML or JSON. When the component is a spec, you can validate it.

His [Anova plugin](https://medium.com/@nathanacurtis/analysis-of-variants-9e440c30b93e) takes this further, analysing Figma assets and deriving what’s invalid from the structure, including a summary of `invalidVariantCombinations`. The system already knows what’s invalid. We’re just not using that output to enforce anything.

But we could.

## Validation rules are encoded design decisions

A healthy design system validates at three points, all with the same goal: catch problems before users do.

- **Design-time:** Figma linting, specs-as-data, structured component definitions
- **Build-time:** TypeScript constraints, ESLint rules, schema validation in CI
- **Runtime:** dev-only guardrails with human-readable errors

## Required children

Some components aren’t “anything goes” containers. They expect a specific structure.

A modal without actions is a bug. A table without headers is a mistake. A form without inputs is just a box. Instead of burying that in docs, encode it. `Modal` requires `ModalHeader`, `ModalBody`, `ModalActions`. If the structure is wrong, throw a dev-time error or render a debug placeholder.

In [my piece on agent-ready design systems](https://blog.murphytrueman.com/your-next-design-system-user/), I called these “composable contracts”: components that describe their relationships like a RESTful API with required parameters. The same principle applies whether the consumer is a developer or an AI agent.

## Forbidden combinations

Some prop combinations don’t make sense together.

A common one: `loading` and `disabled`. In many systems, loading implies disabled. You can’t click while something is in flight. So don’t allow both, and don’t leave it up to everyone’s personal interpretation.

In TypeScript, the `never` type makes this constraint explicit:

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*87ojhXUxlIaW3ant.png)

Try to pass both and the compiler catches it. The constraint lives in the type system, not in someone’s head.

## State constraints

Some rules are harder to encode, but they’re often the ones that cause the most friction:

- Navigation that shouldn’t exceed a max item count
- A card footer that only accepts certain subcomponents
- A form that requires at least one input
- A destructive action that must include a confirmation pattern

Right now, these live in tribal knowledge. Someone remembers, or they don’t. Validation turns that into a contract.

## Start small, but start

If this feels heavy, good. Infrastructure always feels heavy until the first outage.

Start with the components that people constantly misuse. The ones you dread reviewing. The ones where “just this once” happens every week.

## A first rule: no inline styles on system components

Pick 3–5 high-usage components and start there. You’re not solving the universe, you’re carving a boundary.

Here’s a minimal example using `no-restricted-syntax`:

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*LE2zxv-fMqZWp8Yz.png)

If you want something more maintainable, `react/forbid-component-props` from `eslint-plugin-react` is built for this kind of enforcement.

One thing worth remembering: the error message matters as much as the rule. Don’t just block the behaviour. Teach the alternative. The message is part of the product.

## Why this matters more now

Humans can squint at a slightly-wrong implementation and “make it work”. Agents can’t. They need crisp structure.

I’ve [written about how AI amplifies your design system](https://blog.murphytrueman.com/design-system-entropy/), for better or worse. If your system is solid, AI makes it more powerful. If it’s inconsistent, AI makes that inconsistency impossible to ignore. Validation is how you make sure it’s the former.

Three signals I’m watching:

**A protocol-level approach.** Google’s [A2UI](https://a2ui.org/) treats UI as messages, not executable code. The client owns rendering. The agent can only request components from a client-supported catalogue. If the message doesn’t validate, the client rejects it and reports the error. The trust boundary is solved with schema and catalogue, not vibes.

Even if you’re not building agent-driven interfaces, three principles from A2UI translate directly:

1. **Publish a component catalogue.** Name things once. Make “unknown component” a hard error, not undefined behaviour.
2. **Make composition explicit.** Model parent-child relationships as a contract, not a suggestion.
3. **Separate structure from implementation.** Let the system describe what appears. Let the client decide how it looks.

**A tooling-level approach.** The [Storybook MCP server](https://storybook.js.org/blog/storybook-mcp-sneak-peek/) provides structured component context for AI tools, and enables an autonomous correction loop that can run interaction and accessibility tests. Once AI is writing chunks of UI, this stops being a “nice to have”.

**A design-asset-to-data approach.** Nathan Curtis’s work on component definitions and TJ Pitre’s [FigmaLint](https://southleft.com/insights/design-systems/designing-for-developers-introducing-figmalint/) both push toward the same idea: get validation into the design layer, before code is ever written. Errors compound as they flow downstream. Catch them early.

## What this unlocks

Validation isn’t about slowing teams down. It’s about removing friction from things that shouldn’t require discussion.

- **Faster PR reviews.** Less bikeshedding about whether `CardFooter` can contain a `ButtonGroup`. The system has an opinion.
- **Fewer regressions.** Constraints catch errors before they ship. That’s a QA cycle that doesn’t need to exist.
- **Better agent output.** Less ambiguity means AI tools generate code that actually works with your system.

Design system teams have historically positioned themselves as helpers rather than gatekeepers. I’ve [written about this tension before](https://blog.murphytrueman.com/the-component-adoption-gap-understanding/), and I still agree with that instinct. Rigid enforcement breeds resentment and workarounds.

But validation doesn’t have to feel like policing.

Good validation feels like the strike zone: clear boundaries, consistent calls, and fewer arguments that waste everyone’s time.

If it’s important enough to document, it’s important enough to enforce.

## The bigger picture

We’ve been treating design systems as libraries: collections of components teams can use however they want.

Maybe it’s time to treat them as infrastructure: systems that enforce contracts, validate input, and guarantee behaviour.

The tooling already exists. The patterns are proven. The only question is whether we’re ready to stop hoping and start enforcing.

Design Systems

Design System Tips

AI

Vibe Coding

UI Design