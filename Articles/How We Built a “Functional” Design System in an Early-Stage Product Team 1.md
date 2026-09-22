---
title: "How We Built a “Functional” Design System in an Early-Stage Product Team"
source: "https://www.designsystemscollective.com/how-we-built-a-functional-design-system-in-an-early-stage-product-team-78552b67d71a"
author:
  - "[[Kayo Fujii]]"
published: 2026-05-18
created: 2026-09-09
description: "How We Built a “Functional” Design System in an Early-Stage Product Team Beyond Components: Creating Systems That Streamline Team Decision-Making Creating a design system is easy. Maintaining it …"
tags:
  - "topic/デザインシステム/導入事例"
  - "topic/デザインシステム/運用・浸透"
  - "topic/デザインシステム/コンポーネント設計"
  - "clippings"
---
## Beyond Components: Creating Systems That Streamline Team Decision-Making

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*urpYFKH_ObnP_K3UFGFzIQ.png)

Creating a design system is easy.

Maintaining it, getting team members to actually use it, and evolving it in a way that streamlines product development. That’s the hard part.

I joined a startup SaaS company as both a Product Designer and Software Engineer. Over time, I worked with frontend engineers and designers to build and evolve our design system while shipping real product features.

Looking back, I realized something important:  
A functional design system is not just a component library.

> It’s a communication system, a decision-making framework, and a way to reduce unnecessary thinking across the team.

This article is about the mistakes we made, what we learned, and how we gradually evolved our design system into something that actually improved our workflow.

## Stage 1 — Creating the First Design System

At the beginning, our frontend engineers created a component library using Storybook.

The problem was:

- Figma components were disconnected from Storybook components
- Developers didn’t fully understand how or when to reuse components
- Similar UI elements were recreated across multiple pages

At that stage, I started creating reusable UI components in both Figma and Vue.js while reviewing existing product screens.

For example:

- Forms
- Buttons
- Input fields
- Basic modal structures

As I reviewed the product, I noticed many inconsistencies:

- Different button styles across pages
- Multiple versions of similar forms
- Slightly different spacing and layouts everywhere

Whenever I found duplicated patterns, I replaced them with reusable components.

Over time, we successfully created a foundational system shared between design and engineering.

Most importantly, the team gradually understood:

> “Where should we use existing components instead of creating new ones?”

That mindset shift was more important than the components themselves.

## Stage 2 — Realizing Components Alone Were Not Enough

As the product grew, a new challenge appeared.

**We kept creating slightly different modal components for different pages.**

Why?

Because:

- Components were not designed to be flexible enough
- Designers were not aligned on existing UI patterns
- Developers often created new components instead of evolving existing ones

At that point, we realized something critical:

> *Before creating a new component, we needed to discuss whether we actually needed one!*

This changed our workflow significantly.

Instead of immediately designing or coding new UI, we started asking questions like:

- Can we reuse an existing component?
- Can we extend the current component instead?
- Will this pattern appear elsewhere in the future?
- Is this difference truly necessary for users?

For example, one designer wanted to create a completely new table design for a specific feature.

But we already had another table component in the product.

Instead of creating a separate version, we discussed:

- What problem are we trying to solve?
- Is this a one-time exception?
- Can the existing table evolve to support this use case?

Sometimes the answer was “create something new.”

But often, the answer was:

> *“Improve the current component instead of multiplying patterns.”*

This dramatically reduced UI inconsistency and unnecessary development work.

## Stage 3 — Moving Beyond Components

Eventually, we realized another important thing:

> *Even with reusable components, designing repetitive product flows still required too much decision-making.*

So we expanded our thinking beyond components.

We introduced two concepts:

- Layout Patterns
- Workflow Patterns

These became the turning point where our design system started functioning as an operational system instead of just a UI library.

## Layout Patterns — Standardizing UI Structure

Layout patterns focused on visual consistency.

Instead of defining only components, we also defined:

- Spacing rules
- Heading hierarchy
- Card structures
- Form layouts
- Margin relationships between elements

For example:

- How much spacing should exist between a form and a button?
- How should headings be organized?
- What should the structure of a standard information card look like?

This reduced countless small design decisions.

Designers no longer needed to rethink basic layouts every time they created a new screen.

## Workflow Patterns — Standardizing User Experience

Workflow patterns focused more on UX than UI.

Instead of individual screens, we documented multi-step user behaviors.

For example, we had several features where HR managers(target audience of our product) needed to send emails to employees.

Even though the features were different, the workflow itself was similar.

We standardized questions like:

- What type of modal should we use?
- What wording should appear?
- What happens after sending the email?
- Should we show a toast notification?
- Should the user stay on the page or navigate elsewhere?

By defining workflow patterns, we reduced inconsistency across the product experience.

More importantly, designers and developers no longer had to repeatedly solve the same UX problems.

## What I Learned

The biggest lesson I learned is this:

> A design system is not just about creating reusable UI.
> 
> It’s about reducing unnecessary decisions.

Good design systems help teams focus their energy on solving unique product problems instead of redesigning the same patterns repeatedly.

Especially in early-stage startups, it’s unrealistic to build a massive enterprise-level design system immediately.

Instead, I think small product teams should focus on:

- Creating shared understanding between design and engineering
- Evolving patterns gradually through real product development
- Discussing reuse before creating new components
- Standardizing workflows, not just UI elements

That’s what makes a design system truly functional.

## Takeaways

Many articles about design systems focus on tools, tokens, or component libraries.

But in small product teams, the real challenge is usually operational:

- How do we align decision-making?
- How do we reduce duplicated thinking?
- How do we keep consistency while shipping fast?

For us, the answer was evolving from:

> *Components → Patterns → Workflow Thinking*

And that evolution changed not only our UI consistency, but also how our entire team collaborated.