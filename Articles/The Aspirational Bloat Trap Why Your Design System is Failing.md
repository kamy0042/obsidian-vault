---
title: "The Aspirational Bloat Trap: Why Your Design System is Failing"
source: "https://medium.com/@danial.yavari/the-aspirational-bloat-trap-why-your-design-system-is-failing-4605f598addb"
author:
  - "[[Daniel Yavari]]"
published: 2026-07-13
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/デザイントークン
  - topic/デザインシステム/批評・本質論
  - topic/デザインシステム/AI活用
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AMwoB0N0ON4kAz8WGX8Elw.png)

When you join a new company or start building a design system from scratch, the instinct is usually the same.

You look at publicly available systems from companies like Shopify, IBM, or Google. You explore Polaris, Carbon, and Material Design. You find beautifully documented architectures, hundreds of carefully nested tokens, and components capable of handling almost every imaginable variation.

It is easy to look at all that sophistication and think:

*This is what a mature design system looks like. We should build ours like this.*

But public design systems are not universal templates. They are responses to very specific organizational realities.

These systems serve huge product portfolios, multiple brands, countless teams, and an enormous range of use cases. More importantly, they are often supported by people whose full-time job is to build, document, govern, and evolve them.

Most product teams do not have that reality.

You are probably working with a small group of designers and developers who can only dedicate part of their time to the system. You still have sprint deadlines, product problems, research, Jira tickets, and features that need to ship.

When a small or mid-sized company copies an enterprise-grade design system without having an enterprise-grade organization to support it, complexity quickly becomes a liability.

It starts with ambition.

It ends with abandonment.

This is the aspirational bloat trap.

The way out is not more documentation, stricter governance, or another layer of tokens. It is pragmatic simplicity.

## Inheriting a Ghost Town

I experienced this firsthand when I joined a product team as a designer a few years ago.

Naturally, I wanted to understand and adopt the existing design system. But whenever I asked other designers about the token structure, nobody seemed to fully understand the logic behind it. I went to the developers hoping they could explain the technical side, but they were just as lost.

The system had originally been built by a few designers who had left the company years earlier. The components and variables were still there, but the reasoning behind them had disappeared.

What remained was a ghost town of a design system.

It technically existed, but nobody could confidently navigate it.

Designers were faced with long lists of highly specific tokens and unclear naming conventions. To get their work done, they routinely detached tokens, introduced local styles, or dropped raw hex values directly into their designs.

Developers were left guessing which token represented what, or whether the token in Figma matched anything in the codebase.

The problem was not that people were careless or unwilling to follow the system. The problem was that using the system demanded more effort than bypassing it.

And when the officially correct path is more difficult than the workaround, the workaround eventually becomes the real system.

Over time, every client platform created its own solution. Web, iOS, Android, and TV ended up with separate token structures, inconsistent naming conventions, and mismatched values.

The system was meant to create alignment. Instead, it had become a source of fragmentation.

It needed to change.

## The Pragmatic Pivot: Sacrificing Granularity for Sanity

The original system defined tokens at the component level.

You might find tokens named something like:

`button / level2 / secondary / label / default`

or:

`badge / primary / label`

On paper, this gives you an impressive level of control. You can change the label color of a secondary button without affecting a badge, a chip, or any other component.

But that flexibility comes at a cost.

When every element inside every component needs a separate token for every possible state, the system grows exponentially. Every new component creates another branch. Every new state creates another set of variables. Every exception becomes a naming debate.

Eventually, the system becomes so granular that nobody can hold its logic in their head.

I made a judgment call.

Our product did not need ultimate UI flexibility. It needed a system that was easy to understand, hard to misuse, and lightweight enough for the team to maintain alongside everyday product work.

We had to let go of some granularity.

By unifying the fragmented platform systems and replacing component-specific tokens with a smaller semantic structure, **we reduced the total number of color tokens from 195 to just 25.**

That number matters, but the more important change was behavioral.

People could understand the system again.

## The Mechanics of Simplicity

To make this work, we had to stop defining tokens based on where they appeared.

In a lightweight design system, a token should not care whether it is being used inside a button, a badge, a card, or a navigation item. It should describe the role the color is performing.

We introduced a simpler taxonomy based on **Target / Role / State**:

## Target

What kind of element is receiving the color?

- Surface
- On-surface content, such as text or icons
- State layer
- Border

## Role

What purpose or visual tone does it communicate?

- Primary
- Secondary
- Accent
- Success
- Neutral

## State

Is the element in a state other than its default?

- Hover
- Pressed
- Disabled

Instead of creating a dedicated token for every piece of every component, components could now share tokens whenever those tokens served the same purpose.

A primary button and an accent badge did not need separate background tokens simply because they were different components. If they used the same visual role, they could use the same semantic token:

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8DubZiGQduSWH8xHysDzDA.png)

The original architecture created separate tokens for individual component elements and states.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sky1-kM0k9ol-SpMtVDypw.png)

The simplified architecture describes what each color is used for rather than which component it belongs to.

## The Magic of State Layers

The hover state is a good example of how much complexity this removed.

In the old system, every component needed a dedicated hover color. Buttons had their own hover tokens. Badges had theirs. Navigation items had another set.

In the new system, the underlying button surface remains `surface/accent`.

To create the hover effect, we place a reusable `state-layer` over it.

The component no longer needs its own specially calculated hover color. The state is expressed independently from the component.

This allows the same hover logic to be reused across many surfaces without maintaining dozens of slightly different color values.

The best part was that **the interface did not visually change.**

The output remained the same. The underlying system simply became smaller, clearer, and easier to use.

That is an important distinction.

Simplification does not have to mean lowering the quality of the product. Sometimes, it means removing complexity that users never benefited from in the first place.

## Governance Without the Red Tape

A lightweight system only stays lightweight if you protect it from creeping complexity.

But protecting a system does not mean turning the design system team into a police force. The system should not become a barrier that designers need permission to cross.

**A design system should make good design technically and systematically possible. It should not dictate every design decision.**

When someone requests a new token or style, we use a simple filtering process.

### Can we achieve the desired outcome with existing tokens?

Sometimes a small adjustment to the design solves the problem without requiring a new variable.

This is not about forcing every interface into the same template. It is about distinguishing a genuine system gap from a one-off design preference.

### Is this a reusable pattern?

When an existing token genuinely cannot support the desired outcome, we discuss the request in our design system sync. If we can see the same need appearing across several components, flows, or product areas, it probably belongs in the system.

If it only solves one highly specific scenario, it may be better handled locally. The goal is not to reject change. It is to prevent the system from accumulating permanent complexity in response to temporary problems.

## Build for Your Reality

A design system can be technically impressive and operationally useless.

Stop building systems for conference presentations, portfolio case studies, or hypothetical futures in which your company suddenly has ten times as many products and a dedicated team maintaining every token.

Build for the organization you actually have. Build for the people who will need to understand the system six months from now, including the people who were not there when the original decisions were made. Build something that can survive busy sprints, changing teams, departing employees, and imperfect documentation.

You may lose a small amount of theoretical flexibility. In return, you gain a system that is faster to learn, easier to maintain, and far more likely to be used. The sophistication of a design system should not be measured by how many scenarios it can technically support. It should be measured by how confidently people can use it without needing to ask the person who built it.

## Using AI to Audit the System and Build the Transition Map

Simplifying the token architecture in Figma was only part of the work.

The old system already existed in production. Its tokens, raw color values, platform-specific aliases, and one-off exceptions were scattered across several codebases. Before we could migrate anything, we needed to understand what was actually being used, where it was being used, and what purpose each color served.

Doing this manually would have meant searching through multiple repositories, collecting values in a spreadsheet, tracing references back to components, and constantly switching between the codebase and Figma.

Instead, I experimented with using AI as the connective layer between design and code.

I used Codex, connected it to our GitHub repositories and to Figma through the Figma MCP integration. I opened a dedicated audit file in Figma and asked the agent to inspect the codebases, collect the existing color styles and tokens, and reconstruct that information visually inside the file.

The initial prompt was something along these lines:

```c
Inspect the connected codebases and identify all color tokens, color variables, aliases, and primitive color values currently used in the UI.
For every color you find:

1. Record its name and resolved color value.
2. Identify the file or token source where it is defined.
3. Find examples of where it is referenced in the product.
4. Describe the UI context in which it is used, such as a background, text, icon, border, overlay, or interactive state.
5. Note whether it appears to be a semantic token, component-specific token, primitive value, or raw color value.

In the currently open Figma file:
1. Create a variable collection containing the discovered colors.
2. Add the colors as Figma variables while preserving their existing names.
3. Create an audit table that shows the token name, resolved value, source, usage context, and example references.
4. Group duplicate values together, but do not remove or merge anything.
5. Flag tokens whose purpose cannot be confidently determined.

Do not propose a new architecture yet. The goal of this step is to accurately document the current system.
```

This gave me something much more useful than a flat list of hex values.

It created a visual representation of how color worked in the actual product. I could see which tokens shared the same values, which colors had accumulated several names, which styles were barely used, and where primitive values had bypassed the semantic system entirely.

More importantly, the audit included context.

A value like `blue-40` tells you almost nothing on its own. It might be used as a button background, a link label, an icon color, or a focus border. Those usages may look identical at the primitive level, but they represent completely different roles in a semantic system.

Once the audit was generated, I reviewed it with a client developer. The point was not to treat the AI output as automatically correct. It was to use it as a fast first pass, then validate that pass with someone who understood the implementation details of the platform.

The developer helped confirm that the agent had found the relevant sources, interpreted the token structure correctly, and had not missed platform-specific patterns.

That validation mattered. An AI agent can inspect a huge amount of code quickly, but speed is not the same as certainty. The audit became trustworthy because it combined machine-scale exploration with human technical review.

## From a Static Mapping to an Agentic Transition Map

With the current system documented, I wrote a transition map describing how every old token should map to the new semantic architecture.

Some mappings were straightforward:

```c
button-primary-background-default
→ surface/accent

text-button-primary-label-default
→ on-surface/accent

input-border-error
→ border/error
```

But the found primitive colors which were used for UI elements, required a different approach.

A primitive such as `blue-40` could not always be mapped to a single new token. Its correct replacement depended on what it was doing in each particular context.

For example:

blue-40 used as a background → surface/accent  
blue-40 used for text or an icon → on-surface/accent  
blue-40 used as an outline → border/accent

A traditional find-and-replace migration would fail here. Replacing every occurrence of `blue-40` with the same semantic token would preserve the color value, but destroy the meaning of the new architecture.

This is where the transition map became agentic.

Instead of giving the agent only a list of direct replacements, I gave it a set of contextual rules. The agent needed to inspect each usage, understand the role the color played in the component, and select the appropriate semantic token.

A mapping prompt could look like this:

```c
Find every reference to the primitive color token in the connected codebase.
For each reference, inspect the surrounding component and determine the visual role of the color.

Use the following mapping rules:

- If it's used as a container, fill, or background, map it to \`surface/*\`.
- If it is used for text, an icon, or content displayed on a surface, map it to \`on-surface/*\`.
- If it is used for a stroke, divider, outline, or border, map it to \`border/*\`.
- If it is used to represent an interactive state through an overlay, map it to the appropriate \`state-layer\` token.
- If the role is ambiguous, do not change it. Add it to a review list with the file path, component name, code reference, and an explanation of why the usage is unclear.

Before making changes, produce a transition table containing:

1. The current token
2. The proposed semantic token
3. The detected visual role
4. The component or usage context
5. A confidence level
6. Any cases requiring human review
```

This was not AI deciding what our new design system should be.

The architecture, semantic roles, naming logic, and mapping rules were still design decisions. The agent was helping apply those decisions across a large and fragmented implementation.

That distinction is important.

There is a tendency to frame AI in design as something that generates screens, explores visual directions, or replaces parts of the creative process. But some of its most valuable applications are much less glamorous.

It can trace dependencies.

It can compare design definitions with implementation.

It can identify inconsistencies across repositories.

It can turn a migration strategy into a structured set of executable rules.

And it can surface ambiguous cases for humans instead of silently guessing.

## Expanding What Designers Can Participate In

This approach also changed the boundary between design and engineering.

Previously, auditing the implementation would have required us to ask developers to collect the information, explain the code structure, and translate it into something we could work with. That creates a dependency on engineering availability before the design system work can even move forward.

Connecting the agent to both environments allowed me to participate much more directly.

I could investigate the implementation, test my assumptions, prepare a structured transition plan, and bring developers something concrete to validate rather than starting with an open-ended request for help.

That did not remove engineers from the process. It made the collaboration more efficient.

Instead of asking:

> *Can you help me figure out how colors currently work across all our platforms?*

I could ask:

> *Here is the audit, here is what the agent found, here are the proposed mappings, and here are the seven cases where the usage is still ambiguous. Can we review those together?*

That is a very different conversation.

The designer gains more agency. The developer spends less time doing investigative work on the designer’s behalf. And both can focus their shared time on the cases that actually require judgment.

For me, this is one of the more practical opportunities AI creates for design system work. Not autonomous design, but assisted understanding and execution.

It helps designers move beyond documenting the ideal state in Figma and participate more meaningfully in the transition from the system that exists today to the system we want the product to use tomorrow.

## The Real Measure of a Design System

This is not an argument against sophisticated design systems.

Complexity can be completely justified when the products, teams, brands, and use cases demand it. But complexity should be earned by real needs, not borrowed from organizations that operate at a completely different scale.

The same principle applies to AI.

AI did not decide our architecture, understand every implementation detail perfectly, or remove the need for collaboration with engineers. It helped us investigate faster, expose hidden inconsistencies, apply rules at scale, and focus human attention on the decisions that actually required judgment.

The value came from combining three things:

- A simpler system designed around our actual product needs
- Agents capable of navigating both design and code
- Designers and engineers validating the results together

The result was not merely a cleaner Figma library or a smaller list of tokens.

It was a system that people could understand, implement, and maintain.

That is the real measure of a design system. Not how impressive its architecture looks in a diagram. Not how closely it resembles a sophisticated design system.

A successful system reduces the number of decisions people need to make without removing their ability to make good ones. It makes the correct path easier than the workaround.

And most importantly, it continues to work even after the people who originally built it are no longer there to explain it.

Thanks for reading!