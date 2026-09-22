---
tags:
  - topic/デザインシステム/戦略・ガバナンス
  - topic/デザインシステム/批評・本質論
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

> **_Enterprise ecosystems rarely become fragmented because someone deliberately designed them that way. They evolve that way._**

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

> **_How do we make all these applications look the same?_**

It was:

> **_How do we create a coherent experience across products that were never designed as one system?_**

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

> **_Before standardising an enterprise ecosystem, understand why it became fragmented._**

## Opportunity: Creating Consistency Without Creating Sameness

Once the ecosystem was viewed as a whole, the opportunity became more nuanced than simply bringing applications under one platform.

Each application had its own business purpose. Some supported different functions, others represented different stages of a workflow, and some had evolved around specific organisational or technical constraints.

A shared platform could provide common foundations, but it couldn’t erase those differences.

That created the central design tension:

> **_How do you create consistency without creating sameness?_**

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

> **_Every application looks identical._**

It meant:

> **_Users can recognise familiar behaviours and interaction patterns as they move between applications._**

The goal was not to make the ecosystem visually uniform.

It was to reduce unnecessary variation; the kind that makes users stop and figure out how something works when they should be able to recognise it immediately.

### Design Insight

> **_Good enterprise standardisation identifies what should be shared and what should remain specific._**

### Designing for products that already existed and products that didn’t

There was another dimension to the opportunity.

The platform wasn’t being created only for the applications that already existed.

It needed to provide a foundation for what would come next.

That meant the design decisions couldn’t be evaluated only against today’s interfaces. They needed to be useful across a growing ecosystem and resilient enough to support products with different requirements in the future.

This changed the question from:

> What component should we create?

to:

> **_What principle or pattern can solve this class of problems repeatedly?_**

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

> **_Are these users performing the same kind of task, and would a shared interaction make that task easier to recognise and perform?_**

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

> **_Is there a recurring interaction or user problem here that deserves a shared solution?_**

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

> **_A design system becomes more valuable when it encodes decisions and principles, not just reusable components._**

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

> **_Real workflows became insights. Insights revealed patterns. Patterns informed principles. Principles became the foundation for a platform._**

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

> **_Consistency became a way of reducing cognitive effort._**

### Familiarity across different products

Consider an employee moving between two applications that support very different parts of their work.

The information may be different. The workflow may be different. The purpose of the product may be completely different.

But the underlying interaction language can still feel familiar.

Navigation follows recognisable conventions.

Common controls behave predictably.

Information is organised using patterns employees have already encountered.

Feedback and system states communicate in consistent ways.

The employee doesn’t have to relearn the fundamentals of the interface every time they enter another product.

That was one of the most important experience outcomes of the shared foundation.

### Consistency without sameness

This distinction is easy to lose when talking about design systems.

A successful design system can make products feel related without making them identical.

In this ecosystem, different applications could still have different structures because their business problems were different.

One product might rely heavily on data tables.

Another might centre around forms and workflows.

Another might be primarily analytical.

Their interfaces didn’t need to converge into one template.

What needed to converge was the **way the system behaved**.

The shared foundation therefore acted more like a common language than a visual mould.

Products could speak differently because they had different things to say, while still following familiar conventions that made them recognisable as part of the same ecosystem.

### Designing for movement between products

The value of consistency becomes particularly visible at the boundaries between applications.

An employee rarely thinks about an application’s design system while doing their work. They think about completing a task.

When that task requires moving from one product to another, however, every unfamiliar interaction introduces friction.

A different navigation model.

A different way of filtering information.

A different approach to forms.

A different terminology for familiar actions.

Each difference may be small, but together they create a learning burden.

The shared foundation was intended to reduce that unnecessary variation.

The objective wasn’t to remove every difference.

It was to make the differences that remained **meaningful differences** — differences caused by the business problem the product was solving rather than differences caused by every team independently solving common interaction problems.

### The system becomes part of the experience

This is also where the distinction between a component library and a design system becomes tangible.

A component library gives teams reusable building blocks.

A design system gives those building blocks context, behaviour, relationships, and principles.

At the product level, users don’t see the library.

They experience its consequences.

They experience familiar navigation.

Predictable interactions.

Consistent feedback.

Recognisable patterns.

And, importantly, a product that still feels appropriate for the work it supports.

That is what made the shared foundation useful.

It wasn’t something placed on top of the products.

It became part of how the products were designed.

### A platform that could continue to evolve

The experience also had to work beyond the products that existed at the time.

Because the foundation was based on reusable patterns and principles rather than a collection of fixed templates, new applications could build on established decisions while still responding to their own requirements.

This created a different starting point for product teams.

They didn’t have to repeatedly solve the same foundational interaction problems.

They could spend more of their design effort on the problems that were actually unique to their product.

That is ultimately what a scalable design foundation should enable.

> **_It doesn’t remove design work. It makes better design work possible._**

The platform therefore became more than a mechanism for visual consistency.

It became a way to carry knowledge from one product into the next.

And for employees, that knowledge surfaced as something much simpler:

**the feeling that a new application wasn’t entirely new.**

## Impact: Value Beyond the Interface

The impact of the transformation wasn’t limited to making applications look more consistent.

The shared foundation changed what could happen across the ecosystem: employees could carry familiarity from one product into another, product teams could build on established patterns instead of repeatedly solving the same foundational problems, and the organisation gained a platform that could support continued growth without every new application starting from scratch.

The value therefore appeared at several levels.

### For Employees: Familiarity Becomes a Form of Leverage

For employees, the most immediate benefit was familiarity.

When applications share common interaction patterns, knowledge becomes transferable. An employee who understands how filtering, navigation, forms, status feedback, or other recurring interactions work in one product can carry that understanding into another.

That doesn’t eliminate the learning required to understand a new business process. The product itself may still be unfamiliar.

What it reduces is the amount of **interface learning** that sits on top of that business learning.

Employees shouldn’t have to learn a new interaction model simply because they moved to another application owned by a different team.

The shared foundation created a more predictable environment in which new products could feel familiar even when the work they supported was different.

### For Product Teams: Reuse Becomes Leverage

The value was equally important for the teams creating the products.

Before a shared foundation, teams can repeatedly encounter the same design problems:

How should this interaction behave?

How should this information be presented?

How should a particular workflow communicate status?

How should a common component work across different contexts?

A shared design foundation doesn’t remove those design questions completely.

Instead, it gives teams a starting point.

Reusable patterns and established principles reduce the need to repeatedly solve foundational interaction problems. Teams can spend more of their effort understanding and solving what is unique about their product.

The foundation also created a shared language between design and engineering.

Because the system was developed alongside the platform rather than handed over as a finished visual library, the patterns could be discussed in terms of both experience and implementation.

That alignment made the design system more than a collection of reusable UI.

It became a shared reference point for how products should evolve.

### For the Organisation: Consistency Becomes a Platform Capability

At the organisational level, the most significant outcome was scalability.

The platform established a foundation that could support both existing applications and future enterprise solutions.

That changes the economics of design decisions.

Without a shared foundation, every new product can introduce another set of patterns, conventions, and interaction decisions.

With one, each new product can build on knowledge that already exists.

The organisation doesn’t have to reinvent the foundation every time it creates a new experience.

This doesn’t mean every future product needs to follow a rigid template.

Quite the opposite.

The value of the foundation is that it establishes **consistency where consistency creates value**, while leaving product teams enough flexibility to respond to their specific business needs.

That makes the platform capable of growing without allowing complexity to grow at the same rate.

### Impact Is Not One Number

One thing worth being transparent about is that this project doesn’t have a reliable set of quantitative metrics that I can use to reduce the outcome to a percentage or a before-and-after number.

I don’t think that makes the impact less meaningful.

Enterprise design often creates value that is distributed across users, products, teams, and future work. Some of that value is measurable; some is visible through adoption, reuse, consistency, continued investment, and the ability to extend a foundation into new products.

In this case, the strongest evidence was the change in what the ecosystem could support.

Employees could encounter familiar experiences across different products.

Product teams had a reusable foundation to build from.

And the organisation had a platform model that could continue to expand.

The impact, ultimately, was not one redesigned application.

It was **the ability for many applications to evolve as part of the same system**.

### The Leverage of a Shared Foundation

That is what I consider the most important outcome of the project.

The design system created value not because it made individual interfaces more polished, but because it allowed knowledge, patterns, and decisions to move from one product to another.

A decision made once could inform many products.

A pattern discovered in one workflow could become useful elsewhere.

An interaction learned in one application could become familiar in another.

And a foundation created for today’s products could support products that did not yet exist.

That is the kind of leverage I now associate with mature enterprise design.

> **_The impact of a system isn’t only what it improves today. It’s what it makes easier to build tomorrow._**

## Reflection: Systems, Not Screens

This project reinforced that enterprise design is about far more than improving individual interfaces.

The real challenge lies in understanding the environment in which those interfaces exist — the business workflows, technologies, data, teams, constraints, and products that shape the experience around them.

It also changed how I think about consistency.

Consistency isn’t about making every product behave identically or forcing every team into the same structure. It is about identifying the decisions that should be shared, making them familiar where they matter, and leaving enough space for products to respond to their own context.

That requires looking beyond individual screens.

A screen is the visible result of many decisions. A system determines whether those decisions can be repeated, shared, evolved, and carried forward into the next product.

This is where I think enterprise design becomes particularly interesting.

The designer isn’t only shaping an interface. They are helping shape the conditions in which many interfaces and the teams behind them can evolve.

The most valuable patterns in this project didn’t come from a component library. They emerged from understanding real workflows, recognising recurring problems, and deciding where consistency could create genuine value.

That experience strengthened my belief that lasting user experiences are built through systems, not screens.

> **_The goal of a shared design foundation isn’t to make every product the same. It’s to make the ecosystem easier to understand, easier to build, and easier to evolve._**
