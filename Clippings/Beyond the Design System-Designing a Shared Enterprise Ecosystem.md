---
title: "Beyond the Design System: Designing a Shared Enterprise Ecosystem"
source: "https://medium.com/apploitte/beyond-the-design-system-designing-a-shared-enterprise-ecosystem-70cc877dcae3"
author:
  - "[[Soumitra Mishra]]"
published: 2026-08-21
created: 2026-09-22
description: "What designing a shared experience across a fragmented enterprise ecosystem taught me about consistency, systems thinking, and scale."
tags:
  - "clippings"
---
## What designing a shared experience across a fragmented enterprise ecosystem taught me about consistency, systems thinking, and scale.

Enterprise organisations rarely start with a clean digital ecosystem.

Over time, products accumulate. A legacy application continues to support an important business process. A new SaaS product is introduced to solve a different problem. Another team builds an internal web application. Somewhere along the way, an Excel-based workflow becomes critical to how a team operates.

Different systems evolve around different business functions, technologies, teams, and sources of information.

Individually, these products can make perfect sense.

Together, they can become difficult to navigate.

That was the situation I encountered while working on an enterprise application platform: a broad ecosystem made up of legacy applications, internally developed products, external SaaS tools, spreadsheet-driven workflows, manual artefacts, and multiple data sources.

The challenge wasn’t that these products existed.

The challenge was that they had evolved independently.

> ***Enterprise ecosystems rarely become fragmented because someone deliberately designed them that way. They evolve that way.***

## Context: A platform made of many products

From a technical perspective, some of the products were connected. Data and services could move between parts of the ecosystem, and the organisation was already thinking in terms of a broader platform.

From an employee’s perspective, however, the experience could feel very different.

Applications had different navigation models, terminology, interaction patterns, and visual languages. Employees often had to move between multiple products because different applications supported different business functions, different stages of a workflow, or different organisational teams.

This kind of fragmentation is easy to describe as a UX problem.

I don’t think that tells the whole story.

Products are built when a business need emerges. Teams make decisions within the technology and organisational constraints they have at the time. New tools are introduced because they solve a problem effectively. Legacy products remain because replacing them isn’t always practical or even desirable.

Over several years, those individually reasonable decisions can produce an ecosystem that is difficult to experience as a whole.

That distinction changed how I looked at the problem.

The question wasn’t:

> ***How do we make all these applications look the same?***

It was:

> ***How do we create a coherent experience across products that were never designed as one system?***

### The complexity was bigger than the interface

As I looked across the ecosystem, the complexity appeared at several levels simultaneously.

- **Business complexity —** different products supported different functions and workflows.
- **Product complexity** — applications had evolved different interaction models and information structures.
- **Technical complexity** — products existed across different technologies and constraints.
- **Data complexity** — information lived across multiple sources.
- **Organisational complexity** — different products were shaped by different teams and ownership models.

Looking only at the interfaces would therefore have been misleading.

The visible inconsistency was only the surface expression of a much larger system.

That also meant that creating a design system could not be the starting point.

There were already brand and UI guidelines, but there wasn’t a mature product design foundation shared consistently across the ecosystem. New applications were being shaped through a combination of team-level practices, existing guidance, and informal reuse.

The opportunity was therefore broader than standardising components.

The organisation was moving toward a shared platform direction, but the experience and design model needed to evolve alongside it.

### Design Insight

> ***Before standardising an enterprise ecosystem, understand why it became fragmented.***

## Opportunity: Creating Consistency Without Creating Sameness

Once the ecosystem was viewed as a whole, the opportunity became more nuanced than simply bringing applications under one platform.

Each application had its own business purpose. Some supported different functions, others represented different stages of a workflow, and some had evolved around specific organisational or technical constraints.

A shared platform could provide common foundations, but it couldn’t erase those differences.

That created the central design tension:

> ***How do you create consistency without creating sameness?***

### Standardisation has a limit

There is an obvious response to fragmentation: standardise everything.

Create common components. Define common layouts. Establish common navigation. Apply the same interaction patterns everywhere.

That can certainly make an ecosystem look more coherent.

But visual consistency alone doesn’t create a coherent product experience.

If two products support fundamentally different workflows, forcing them into the same structure can make one or both harder to use. A design system that dictates every detail can also become a constraint for product teams rather than an enabler.

The opportunity, therefore, wasn’t to prescribe a single experience.

It was to identify the **right level of consistency**.

Some things needed to become shared because they represented recurring user behaviours or common interaction problems.

Other things needed to remain flexible because they were specific to the product, workflow, or business context.

That distinction became central to the platform strategy.

### From a collection of products to a shared language

I began thinking less about standardising interfaces and more about establishing a **shared design language**.

A language has rules, patterns, and conventions, but it doesn’t require every sentence to say the same thing.

The same principle could apply to the applications.

Navigation could follow familiar conventions. Common data-display patterns could behave consistently. Forms, filters, status feedback, information containers, and other recurring interactions could share principles and patterns.

But the products could still express their own business workflows.

This shifted the definition of consistency.

Consistency didn’t mean:

> ***Every application looks identical.***

It meant:

> ***Users can recognise familiar behaviours and interaction patterns as they move between applications.***

The goal was not to make the ecosystem visually uniform.

It was to reduce unnecessary variation; the kind that makes users stop and figure out how something works when they should be able to recognise it immediately.

### Design Insight

> ***Good enterprise standardisation identifies what should be shared and what should remain specific.***

### Designing for products that already existed and products that didn’t

There was another dimension to the opportunity.

The platform wasn’t being created only for the applications that already existed.

It needed to provide a foundation for what would come next.

That meant the design decisions couldn’t be evaluated only against today’s interfaces. They needed to be useful across a growing ecosystem and resilient enough to support products with different requirements in the future.

This changed the question from:

> What component should we create?

to:

> ***What principle or pattern can solve this class of problems repeatedly?***

A component solves a specific interface need.

A reusable pattern captures a recurring interaction.

A design principle provides guidance when the exact situation hasn’t been solved before.

And a platform foundation brings those decisions together so teams can build on them rather than repeatedly starting from zero.

### The opportunity was bigger than a design system

This was also why I didn’t see the design system as a standalone deliverable.

The platform direction included shared design principles and patterns, but also shared services and sources where appropriate. Engineering was involved throughout the process because the foundation needed to work within the realities of the underlying platform.

The design challenge therefore sat between product and platform thinking.

We had to consider the employee using an application, the product team building it, the engineers implementing it, and the organisation trying to grow the ecosystem.

A useful shared foundation needed to create value for all of them.

- For employees, that meant **familiarity**.
- For product teams, it meant **reuse**.
- For the organisation, it meant **scalability**.

The opportunity was to find the layer where those needs could meet.

### The real transformation

Looking back, this was the point where the project stopped being about making individual applications better and became about **designing the relationship between applications**.

That relationship would eventually be expressed through shared patterns, principles, components, services, and platform foundations.

But before any of those could be defined, we needed to understand what the products already had in common.

The next step wasn’t to start designing components.

It was to look across the ecosystem, understand the real workflows, and identify the patterns hidden inside the complexity.

That became the foundation for everything that followed.

## Approach: From Real Workflows to a Shared Foundation

Once the design challenge was clear, the temptation would have been to start defining a design system.

We could have audited the existing interfaces, collected the common components, established a visual language, and begun rebuilding the products around it.

But that would have been starting from the wrong end.

The ecosystem already contained years of product decisions, user behaviours, workflows, technical constraints, and organisational knowledge.

Before deciding what should be standardised, we needed to understand what was already there.

So the approach evolved from the work itself.

Rather than treating the design system as the starting point, we treated it as the **result of progressively understanding the ecosystem**.

The progression looked something like this:

**Real Workflows → Insights → Patterns → Design Principles → Platform Foundation**

Each layer answered a different question.

### 1\. Start with Real Workflows

The first step was to look beyond the interfaces.

We brought together what we could learn from the products, their workflows, users, stakeholders, engineering teams, existing patterns, and the underlying platform context.

The goal wasn’t to catalogue every screen.

It was to understand how work actually happened.

That distinction is important in enterprise design.

Two applications can have completely different interfaces while supporting remarkably similar behaviours.

Conversely, two applications can look almost identical while solving very different problems.

If we had started with visual similarity, we would have risked standardising the wrong things.

Instead, we looked across the ecosystem for recurring structures:

- How did users move through their work?
- Where did similar decisions occur?
- How was information presented?
- Which interactions appeared repeatedly?
- Where did users encounter unnecessary variation?
- Which differences existed because the products genuinely had different requirements?

The ecosystem became something to understand rather than something to immediately redesign.

### 2\. Turn Observation into Insights

Once the workflows were visible, the next step was making sense of what they had in common.

This was less about collecting observations and more about identifying **why those similarities mattered**.

A repeated interaction wasn’t automatically a candidate for standardisation.

We needed to understand the user problem behind it.

If several products used different ways of presenting or manipulating information, the useful question wasn’t:

> Which UI should become the standard?

It was:

> ***Are these users performing the same kind of task, and would a shared interaction make that task easier to recognise and perform?***

That distinction helped separate meaningful commonality from superficial similarity.

The insights emerging from the ecosystem gave us a better basis for deciding where consistency would create value.

### 3\. Identify Patterns, Not Just Components

This is where the work began to move from product design toward systems thinking.

We started looking for recurring patterns across the applications.

A component might be a button, table, input, card, or navigation element.

A pattern is more fundamental.

It describes how a user interacts with a particular type of problem.

That difference became important because the platform needed to support products we hadn’t designed yet.

If we only collected existing components, we would be documenting the past.

If we identified the underlying patterns, we could create something that could support the future.

The test therefore wasn’t simply:

> Can this component be reused?

It was:

> ***Is there a recurring interaction or user problem here that deserves a shared solution?***

This also gave product teams room to adapt the pattern to their specific workflow without having to reinvent the underlying experience every time.

### 4\. Turn Patterns into Design Principles

Patterns alone weren’t enough.

As we identified common behaviours, we needed principles that could help teams make decisions in situations where an existing pattern didn’t provide an exact answer.

This is an important distinction between a component library and a design foundation.

A component can tell a designer **what to use**.

A principle can help them decide **why and when to use it**.

That became particularly important because the products still needed flexibility.

We didn’t want a system where every application was forced into an identical structure.

Instead, the shared foundation needed to establish consistency at the right level.

Common behaviours could become familiar.

Common interaction patterns could become predictable.

Visual and structural conventions could reinforce recognition.

But product teams could still adapt the experience to their specific business context.

In that sense, the principles became the connective tissue between individual products.

They defined what should remain consistent while leaving space for meaningful differences.

### 5\. Build the Platform Foundation

Only after the ecosystem had been understood, patterns had been identified, and principles had started to emerge did the design foundation begin to take shape.

The design system was no longer just a collection of components.

It became part of a broader platform foundation.

That foundation brought together shared design principles, reusable interaction patterns, components, and the broader platform capabilities that could support multiple products.

Engineering was involved throughout this process.

That was important because a shared experience cannot exist independently of the system underneath it. Design decisions needed to work within technical realities, and technical capabilities could also influence what experiences were possible to create consistently.

The result was not one application.

It was a **shared foundation that allowed multiple applications to evolve as part of the same ecosystem**.

That distinction became one of the most important outcomes of the approach.

### Designing the Space Between Products

Looking back, I think the most significant shift was that we stopped thinking primarily about individual applications.

We started thinking about the **relationship between them**.

The platform wasn’t trying to erase the boundaries between products.

Instead, it created familiarity across those boundaries.

- A user could move from one application to another and encounter patterns they already understood.
- A product team could solve a new problem without starting from an entirely blank canvas.
- An engineer could work with established patterns rather than repeatedly implementing the same interaction from scratch.
- The organisation could continue adding products without allowing every new product to introduce another completely different experience.

That is where the platform started creating leverage.

### Design Insight

> ***A design system becomes more valuable when it encodes decisions and principles, not just reusable components.***

### The Design System Was an Outcome, Not the Starting Point

This changed how I think about design systems in enterprise environments.

A design system can certainly provide immediate value through reusable components and shared visual language.

But its deeper value comes from the thinking that determines **what should be shared in the first place**.

Without that understanding, standardisation can easily become cosmetic.

With it, the system becomes a way of encoding organisational knowledge:

- how users work
- how products behave
- which interactions should feel familiar
- where flexibility is necessary
- which decisions should not have to be made repeatedly

That was the real progression of the work.

We didn’t begin with a library and try to fit the organisation into it.

We began with the organisation’s complexity and progressively extracted the patterns and principles that could make that complexity easier to design for.

> ***Real workflows became insights. Insights revealed patterns. Patterns informed principles. Principles became the foundation for a platform.***

And that foundation could then support experiences that felt connected without requiring every product to become the same.

## Experience: When the System Becomes Visible

A shared design foundation only matters if people can feel it in the products they use.

This was the point where the principles, patterns, and platform decisions became visible in the actual experience.

The goal wasn’t to make every application look identical. Each product still needed to support its own business function and workflow.

Instead, the shared foundation created a layer of familiarity underneath those differences.

Users could move between applications and encounter interaction patterns they already understood.

That familiarity came from many small decisions working together: how navigation behaved, how information was structured, how actions were presented, how forms responded, how status was communicated, and how common tasks were organised.

Individually, these patterns might seem relatively small.

Across an ecosystem, they become significant.

> ***Consistency became a way of reducing cognitive effort.***

### Familiarity across different products

Consider an employee moving between two applications that support very different parts of their work.

The information may be different. The workflow may be different. The purpose of the product may be completely different.

But the underlying interaction language can still feel familiar.

Navigation follows recognisable conventions.

Common controls behave predictably.

Information is organised using patterns employees have already encountered.

Feedback and system states communicate in consistent ways.

The employee doesn’t have to relearn the fundamentals of the interface every time they enter another product.

That was one of the most important experie