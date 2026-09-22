---
title: "From UI Archaeology to Design System Infrastructure"
source: "https://medium.com/@msh_cd/from-ui-archaeology-to-design-system-infrastructure-3ef86da5937e"
author:
  - "[[Marcos Heiz]]"
published: 2026-09-15
created: 2026-09-22
description: "More"
tags:
  - "clippings"
---
![](https://miro.medium.com/v2/resize:fit:3072/format:webp/1*xmSh4HKggfWSqd7hfadb1A.png)

## How we explored turning a legacy healthcare product into structured design-system intelligence — reducing repetitive work across design and engineering.

Modernizing a legacy product usually begins with an uncomfortable question:

**What do we actually have?**

Not what exists in Figma. Not what the documentation says should exist. Not what everyone remembers being built.

What actually exists in production.

At Ontada, working around iKnowMed meant working with a product that had evolved over many years. That history was visible everywhere: established workflows, different generations of UI, implementation patterns created at different moments, and a large amount of product knowledge embedded directly in the application and its code.

The Design System could help us define where the product should go. But modernization also required understanding where the product already was.

And that was creating an operational problem.

## The Design System wasn’t the only source of truth

A mature product rarely has a single source of truth.

Figma might describe the intended component. Documentation might describe its expected behavior. The codebase contains its implementation. Production shows what users actually experience.

Sometimes those sources agree.

Sometimes they don’t.

For a legacy product, the gap can become substantial. A component may exist in production but not in Figma. A pattern may have several implementations. Two controls that look almost identical may behave differently. A documented component may have evolved in code without the design artifact evolving with it.

That meant we couldn’t simply look at the Design System to understand the product.

We had to look at the product itself.

## Design was becoming archaeology

Understanding an existing interface could involve opening the application, finding the right state, inspecting the DOM, looking at computed styles, searching the repository, identifying the relevant CSS, finding UiBinder/XML structures, understanding the associated Java implementation, comparing similar screens, and then reconstructing the relevant pattern in Figma.

None of those activities was inherently unreasonable.

The problem was how often they repeated.

A designer investigating one component might go through:

**Inspect → Screenshot → Measure → Search → Compare → Recreate → Document**

Then, later, an engineer working from the resulting design might effectively perform part of that process in reverse:

**Open Figma → Interpret → Search repository → Compare → Implement → Validate**

We were spending significant effort translating information from production into design artifacts and then translating those artifacts back into implementation.

That led to a simple question:

**Why were humans repeatedly translating information the system already knew?**

## What if production became an input?

The existing product already contained a surprising amount of the information we were manually reconstructing.

The browser knew the DOM structure.

Computed styles knew what was actually rendered.

The repository knew where styles and implementation logic came from.

CSS described visual rules.

UiBinder/XML described interface structures.

Java fields and application logic helped reveal relationships and behavior.

Instead of treating the running product only as something to inspect manually, we started thinking about it as structured input.

The idea was straightforward:

**iKnowMed screen**  
→ **DOM + computed styles extraction**  
→ **Repository mapping: CSS + UiBinder/XML + Java fields**  
→ **Normalized component model**  
→ **MCP / Figma tooling**  
→ **Editable Figma components**  
→ **Design System library**

This wasn’t about automatically redesigning iKnowMed.

It was about automating the collection and translation of evidence so designers and engineers could spend more time deciding what the system should become.

## Automate extraction, not design judgment

This distinction became fundamental.

There are parts of Design System work that require judgment: deciding whether two implementations represent the same pattern, determining which behavior should become canonical, defining semantic variants, deciding what should be deprecated, and understanding whether an inconsistency is accidental or meaningful.

Those are design decisions.

But reading CSS values, extracting dimensions, identifying typography, capturing DOM relationships, finding repeated properties, or locating implementation files are different kinds of work.

They are deterministic.

The machine can help:

**Extract** structures and properties.  
**Locate** implementation sources.  
**Compare** repeated values.  
**Identify** similarities.  
**Structure** the resulting information.

The designer can then:

**Interpret** patterns.  
**Resolve** inconsistencies.  
**Define** canonical behavior.  
**Establish** semantics.  
**Decide** what belongs in the system.  
**Govern** how it evolves.

The objective wasn’t to automate design.

**It was to automate the work around design that didn’t require design judgment.**

## The browser became a source of design data

This changed how we thought about the running application.

Instead of seeing a screen only as pixels, we could think of it as a structured artifact.

A button, for example, contains information about typography, spacing, borders, colors, dimensions, state and hierarchy. Its DOM position provides structural context. Computed styles tell us what the user actually sees. The repository can provide additional information about where those properties originated.

What looked like:

**Button**

could be interpreted as something closer to:

**Element**  
→ structure  
→ styles  
→ state  
→ source  
→ relationships

That makes the existing interface useful for more than visual reference.

It becomes evidence.

## But raw extraction isn’t a Design System

This was one of the most important limitations of the idea.

If we extracted every implementation exactly as it existed, we would simply reproduce the inconsistencies of the legacy product.

Automation could make that mistake much faster.

So extraction alone wasn’t enough.

We needed a normalization layer.

Consider several buttons discovered across the application. They might have slightly different padding, colors, heights, border treatments or naming conventions.

The wrong conclusion would be:

**Five implementations → five Design System components.**

The more useful question is:

**Do these five implementations represent five intentional patterns, or five versions of the same pattern?**

That is where normalization becomes essential.

## Creating a normalized component model

Between the product and Figma, we needed a representation that wasn’t tied entirely to either environment.

Conceptually, a component could be described through structured properties:

**Button**

Variant: Primary  
Size: Medium  
State: Default  
Typography: Label Medium  
Background: Primary  
Horizontal padding: 16  
Radius: 4

Alongside implementation references:

DOM source  
CSS source  
UiBinder/XML source  
Java relationship

The specific schema could evolve, but the architectural idea mattered more.

This normalized model could become a translation layer between what existed in production and what we wanted to represent in the Design System.

Instead of:

**Code → Designer interpretation → Figma**

we could begin thinking about:

**Production + Code → Structured Model → Design System decision**

That creates a very different workflow.

## From component extraction to pattern detection

Once interface elements become structured data, another possibility appears.

We can compare them.

Imagine discovering many implementations that appear to belong to the same family. Some differences may be legitimate variants. Others may be historical drift.

Without structured information, identifying that drift requires someone to notice it manually.

With structured component evidence, we can begin grouping similar implementations and asking better questions.

Are these actually different components?

Are they states?

Are they variants?

Are some obsolete?

Is one an exception?

Should several converge into a canonical component?

This is where the workflow moves beyond extraction and into **component intelligence**.

The system doesn’t make the final decision.

It makes the inconsistency visible enough for people to make a better one.

## The Design System becomes a reconciliation layer

This reframed the role of the Design System itself.

A Design System isn’t only a library of components that designers pull into new screens.

In a legacy modernization effort, it can also become the place where existing product reality is reconciled with future product direction.

On one side:

**What exists**

Multiple implementations  
Legacy patterns  
Historical decisions  
Local variations

On the other:

**What should exist**

Canonical components  
Defined variants  
Shared behaviors  
Tokens  
Guidelines

Between them:

## Design System

The Design System becomes a mechanism for convergence.

## Figma becomes an output, not the starting point

This was another meaningful shift.

Traditionally, teams often think of the Design System beginning in Figma. Components are created, organized into a library, documented, and eventually implemented.

But in this workflow, Figma isn’t necessarily where discovery begins.

Production is.

The running product provides evidence. The normalized model structures that evidence. Designers decide how it should be represented. Figma becomes one expression of the resulting system.

That means an editable Figma component isn’t simply a recreation of the production component.

It can be the result of a deliberate transformation:

**Observed implementation → normalized candidate → reviewed pattern → canonical component**

That difference is important.

We weren’t trying to make Figma look exactly like the legacy product.

We were trying to use the legacy product to make the Design System more informed.

## MCP could shorten the last mile

Once the component model is structured, tooling such as MCP and Figma integrations becomes particularly interesting.

Instead of manually creating every layer, property and variant from scratch, structured information could help generate an editable starting point inside Figma.

That might include component structure, basic properties, text styles, spacing, visual attributes and implementation references.

The result still requires design review.

But the designer starts from structured evidence instead of a blank frame.

That’s an important DesignOps distinction:

**Automation doesn’t need to produce the final answer to create significant value.**

> Sometimes the biggest operational improvement comes from producing a much better starting point.

## The same model can serve more than Figma

Once we had this architecture in mind, another limitation of thinking purely in terms of “code-to-Figma” became obvious.

Why should the structured model end at Figma?

The same component information could potentially support other parts of the Design System ecosystem.

**Normalized Component Model**

could support:

**Figma components**

**Design System documentation**

**Engineering references**

**Component inventories**

**Migration tracking**

**Audit reports**

**Coverage analysis**

Potentially even comparisons with implementation environments such as Storybook as the system evolves.

> At that point, the normalized model stops being a conversion format.It becomes infrastructure.

## From component library to product coverage

One of the most interesting questions this approach creates is something many Design Systems struggle to answer:

**How much of the actual product does our Design System represent?**

A library can contain beautifully documented components and still have limited adoption across the product.

Production tells a different story.

If we can compare what exists in the application with what exists in the Design System, we can start thinking about coverage.

A production scan might conceptually reveal:

✓ Recognized Design System component  
✓ Recognized Design System component  
⚠ Legacy variant  
✓ Recognized pattern  
⚠ Deprecated implementation  
✕ Unknown component

Now the audit becomes less anecdotal.

Instead of saying:

**“There seems to be a lot of legacy UI here.”**

we can start asking:

**Where does the product diverge from the system?**

**Which patterns appear most often?**

**Where would consolidation create the most value?**

**What should we modernize first?**

This turns Design System adoption into something that can be observed and prioritized.

## DesignOps is often about removing translation

This project changed how I think about DesignOps.

Operational efficiency isn’t only about meetings, documentation, governance ceremonies or handoff processes.

Sometimes the largest inefficiency is translation.

Design translates production into Figma.

Engineering translates Figma into code.

Documentation translates decisions into guidelines.

Teams translate guidelines back into implementation.

QA compares all of those interpretations against the product.

Every translation creates effort.

It can also create information loss.

A stronger system reduces the number of times people need to reconstruct the same knowledge in different formats.

That is where tooling, structured data and Design Systems can work together.

## A different relationship between Design and Engineering

The approach also changes collaboration.

Instead of Design and Engineering maintaining separate interpretations of the same component, both disciplines can work around shared evidence.

Engineering contributes implementation reality.

Design contributes semantic and interaction decisions.

The Design System provides the canonical model.

Tooling helps connect them.

This doesn’t eliminate collaboration.

It makes collaboration more valuable.

Less time is spent answering:

**What padding is this?**

**Which component is this?**

**Where is this implemented?**

**Is this supposed to be different?**

More time can be spent discussing:

**Should these patterns converge?**

**What behavior should be canonical?**

**Which exceptions are legitimate?**

**What should we migrate first?**

Those are much better questions.

## From a linear handoff to a learning loop

The traditional workflow looked largely linear:

**Production → Designer → Figma → Engineer → Production**

Information moved through people, and each person reconstructed part of the system.

The model we explored suggested something more circular.

**Production**

↓ Observe

**Extract**

↓ Structure

**Normalize**

↓ Interpret

**Systemize**

↓ Distribute

**Design System**

↓ Adopt

**Product**

↓ Observe again

The product becomes evidence for the Design System. The Design System improves the product. The resulting product creates new evidence.

> Modernization becomes a learning loop rather than a one-time migration.

## What actually gets faster?

Without reliable measurement, I wouldn’t claim that this approach reduced design time by a specific percentage.

But we can be precise about what operational work it was designed to reduce.

Less manual inspection.

Less recreation from screenshots.

Less measurement of properties that already exist in code.

Less searching for implementation references.

Less duplication between design and engineering inventories.

Less repeated interpretation during handoff.

Less time discovering inconsistencies one screen at a time.

And correspondingly, more time becomes available for the work that actually requires expertise:

- Pattern decisions.
- Interaction design.
- Accessibility.
- Consolidation.
- Governance.
- Prioritization.
- Modernization strategy.

The goal wasn’t simply to make designers faster. It was to improve what designers and engineers were spending their time on.

## The question changed

Initially, the problem appeared to be:

**How can we recreate legacy components in Figma more efficiently?**

That would have been useful.

But it was also too small.

The more interesting question became:

## How can the product help us understand the system we’re trying to modernize?

Once production becomes evidence, extraction becomes structured, and the Design System becomes the reconciliation layer, we’re no longer simply moving components from code to Figma.

We’re building a mechanism for understanding, consolidating and progressively improving a complex product.

And that changes the role of DesignOps.

## Stop rebuilding what the product already knows.

Let machines extract what can be observed.

Let structured models preserve what can be shared.

Let tooling remove repetitive translation.

And let designers and engineers spend their time on the decisions that actually require judgment.

Because the most valuable automation in design isn’t necessarily the one that designs for us.

**It’s the one that gives us more time to design.**

*This case study reflects my experience contributing to Design System, DesignOps, and modernization explorations around Ontada’s iKnowMed platform. Certain workflows, implementation details, interfaces, and technical examples have been simplified or reconstructed to protect confidential product and proprietary information. Some concepts shown represent exploratory workflows and tooling approaches rather than released product functionality.*