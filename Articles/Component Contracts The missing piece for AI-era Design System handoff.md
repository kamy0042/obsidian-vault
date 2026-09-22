---
title: "Component Contracts: The missing piece for AI-era Design System handoff"
source: "https://medium.com/design-bootcamp/component-contracts-the-missing-piece-for-ai-era-design-system-handoff-41edb55bf031"
author:
  - "[[Ehsān Vaeghi]]"
published: 2026-06-13
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/AI活用
  - topic/組織/ハンドオフ
---
## Background

I’m the Design Systems Owner at Aparat, the largest video platform in Iran, serving over 60 million monthly active users with YouTube-style long-form videos, Netflix-style exclusive films and series, short-form UGC videos, and live streaming platform across Web, Android, iOS, PWA, and TV. The design system supports all of these platforms with small, remote, and async teams, which means anything we build has to scale without scaling headcount.

Like many teams, our developers started integrating AI agents into their workflow for building and refactoring components. After testing different providers and models, they settled on Figma Make. The results were good, but uneven, and understanding *why* they were uneven is what led to this project.

## The missing piece: Behavior

Design systems have made real progress on visual and structural fronts. Design tokens have a W3C community standard. Component anatomy, variants, and styles are well-covered by Figma libraries and easily readable by MCPs. Open-source libraries like shadcn and RadixUI even provide some behavioral context for common components.

Proprietary components are a different story, though. There is no public standard for documenting how a custom component should *behave* — its states, transitions, triggers, edge cases, and constraints. That layer usually lives in scattered design files, handoff notes, and people’s heads.

In practice, this gap costs more than it seems. Every undocumented behavior becomes a question. Every question becomes a thread, a meeting, or a developer blocked in an async workspace. Different people form different interpretations of the same component, and the implementation drifts. For a small team supporting multiple platforms, writing exhaustive behavioral documentation for every component wasn’t a realistic option — it simply doesn’t scale.

We needed something faster to write, complete enough for developers, and structured enough for AI agents.

## The MVP: a simple list

We didn’t start with anything sophisticated. The first version was a plain template of a structured list covering the behavioral information every component needs: states, transitions, what triggers them, and constraints. Designers filled it out per component and attached it to the Figma files. That was it.

The results were immediate. Developers reported around a 70% drop in ambiguity. Mid-project questions fell by roughly the same amount. Work that had been stalled started moving.

![Two overlapping dark panels. The left shows a plaintext behavioral spec file for a tooltip component. The right partially reveals the actual Figma component with several tooltip variants rendered in Persian, showing what the spec describes.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*aEmUhY7ttn4tm-Ya52ajNg.png)

Prose context provided as the MVP solution

For a template that took minutes per component, that return was hard to ignore. But the more interesting question was *why* it worked — especially for the AI agents our developers were using.

## The Insight: Context > Model

Our developers had tested several AI providers and models before settling on Figma Make. What made that comparison interesting is that Figma Make runs on Claude — the same model some developers were already using standalone. Same model, noticeably different results.

> The quality gap was a context gap.

The difference wasn’t the model. It was what the model could *see*. Figma Make has direct access to the design file: structure, variants, properties, layout. A standalone chat only knows what the operator pastes into it.

Looking back at the MVP, the same thing had happened on our side of the handoff. The behavioral list wasn’t documentation in the traditional sense — it was context. It worked for developers and AI agents for exactly the same reason: it put the missing information where the work was happening, in a form that left no room for interpretation.

That reframing changed the direction of the project. If context quality matters more than model capability, then the highest-leverage thing a design system team can build isn’t better prompts or better components — it’s better context infrastructure. So that’s what we built.

## From List to Contract

Doubling down on context meant the simple list had to grow up. A plaintext attachment works for humans, but it’s loose — every designer fills it slightly differently, and an AI agent has to re-interpret its structure every time.

Inspired by how configuration files work in software, we rebuilt the list as a structured, machine-readable format. We evaluated YML and JSON and landed on JSON: more universal among developers, stricter structure, less room for syntax errors. The list became a config. Or as we call it, a contract: one component file, one contract file.

A contract formally specifies everything behavioral about a component: props, states, a state machine defining valid transitions, triggers from every input source, interactions and emitted events, accessibility requirements, responsive and composition rules, and end-to-end behavioral scenarios in prose.

Deliberately absent are anything visual. Colors, sizes, and typography already live in tokens and Figma. A contract is not documentation — it’s an execution boundary. If a behavior isn’t in the contract, it doesn’t exist.

On top of the contract files, we added agent manifests and workflows so an AI agent processes only the files relevant to the current task instead of burning tokens on the whole repository.

![A dark code panel showing a JSON contract file for a Button component (v1.A dark code panel showing a JSON contract file for a Button component (v1.2.0), displaying its props (variant, size, disabled, loading), states (default, hover, focused, pressed, disabled, loading), state machine with transitions, and triggers with click events — including what it emits and when it’s blocked.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*6bMEG14qmkU3jAMz1jMIoA.png)

Sample code for a contract file written in JSON

## Contracts Writing Themselves

Once the format was stable, a natural question followed: does a designer still have to write these from scratch every time?

Not anymore. But the designer’s input is still essential.

What changed is how that gap gets filled. A designer writes a natural language prompt describing intended behavior — edge cases, conditional logic, constraints, in plain language. An agent combines that behavioral intent with the component’s structural context pulled from Figma via MCP and outputs a valid contract JSON. The designer reviews and refines, but the work of translating intent into structured specification is handled by the agent.

We started by manually writing context to help developers and AI agents build components. We ended up with AI agents turning designer intent into that context themselves.

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Kc2CwmHvD_2rv97LtvrXUQ.png)

The contracts formalize the communication between design and development as a source of truth for behavior.

## Results in Production

Before any of this, nearly 16% of our active development time was spent fully blocked. Developers waiting on answers, and when they did start, spending significant time reviewing and planning before writing a single line of code. Complex, feature-level components barely moved. Overall throughput in this period sat at **0.8 SP/D**.

When we introduced MVP contracts, the change was immediate. Blocked time dropped from 15.9% to 3.3% — **a 79% reduction.** Overall throughput rose from 0.8 to **1.4 SP/D.**

Structured JSON contracts pushed things further. Early production data puts throughput at **9.6 SP/D** on complex feature-level work — a **7.8x improvement** over the same complexity tier.

To put the full arc plainly: a component that would have been stuck with no context, and taken over three days with MVP contracts, now takes less than half a day with Component Contracts.

The bottleneck has flipped. Development now moves faster than design and design system delivery can keep up. That’s a good problem to have.

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Mo_TZ4KryR864ruv7FP-fQ.png)

This figure illustrates two main milestones: a sharp decline in blocked time (displayed in red) after introducing MVP contracts, and an increase in component units developed each day (displayed in white) after using JSON contracts. CX(n) is an internal fixed unit of complexity.

## What’s next?

Component Contracts is open source. The repository includes the JSON contract template and the agent manifests and workflows needed to get started immediately.

The project is still early. We’ve validated it in production at Aparat, but there are more environments, team structures, and component types to test against. On our end, the next priorities are contract linting, using contracts as a basis for automated test generation, and contract diffing — so teams can track behavioral changes across component versions the same way they track code changes.

The longer-term vision is bigger. Contracts were built to solve a handoff problem, but the more we use them, the more they look like the missing synchronization layer between design, development, and AI agents — and a foundation for systems where components aren’t just built with AI assistance, but assembled by AI from well-defined behavioral primitives.

If you’re working on a design system and want to try it, clone it, run it against your own components, and let us know what breaks.

[See on GitHub](https://github.com/ehxter/Contracts)