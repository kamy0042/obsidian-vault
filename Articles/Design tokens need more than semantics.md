---
title: "Design tokens need more than semantics"
source: "https://medium.com/@NateBaldwin/design-tokens-need-more-than-semantics-0e5a85df0d33"
author:
  - "[[Nate Baldwin]]"
published: 2026-09-18
created: 2026-09-22
description: "More"
tags:
  - "topic/デザインシステム/デザイントークン"
  - "topic/デザインシステム/コンポーネント設計"
  - "clippings"
---
![](https://miro.medium.com/v2/resize:fit:4080/format:webp/1*1MaTN1TS_OCVbB3KZa8T2A.png)

Many design systems teams use [**semantic tokens**](https://www.designsystemscollective.com/when-semantic-tokens-are-no-longer-semantic-d65ef16fadd7) as a way to separate design intent from the final implementation. Broadly speaking, this is a way to ensure design can evolve without continually modifying the component libraries or products themselves (*a dream that doesn’t always pan out, but that’s a topic for another article*).

Color tokens use names like “negative” or “warning” to express what the color communicates to the end user, regardless of the value. Whether that value is red, orange, yellow, or something else is a separate concern. By separating the idea from the value, a single system can implement across a variety of contexts where a value may need to be different, but what it’s communicating remains the same.

![Red, Green, and Blue colors assigned the semantic meanings negative, positive, and informative respectively](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3KhXov81Wn_7xPfgBXUXAA.png)

Semantic colors abstract meaning from the color choice.

The approach we use for color is about asking *“what does this communicate to the end user?”* or *“what is the sentiment we want to convey to the user?”* This approach has become so common that it’s easy to assume this type of semantic thinking can be applied to any other category of design decision (spacing, sizing, motion, shadows, etc). After all, we call this entire tier of token abstraction “semantic tokens” so **it’s easy to assume that it’s all the same.**

We made this assumption too.

While working on Spectrum’s **spacing** tokens, we set out to identify a reusable semantic model that would work across components and platforms. We were interested in *what spacing communicates* to users in the same way color communicates concepts like warning, success, or emphasis.

On paper this idea seemed promising. If colors communicate meaning, perhaps spacing could communicate *relationships*.

This seemed like a very natural solution; after all this is a key aspect of gestalt philosophy and how the human visual system interprets spatial relationships. Elements closer together are perceived as related, and elements farther apart are perceived as less related. In terms of tokens, this could emerge as options like “gap-tight” or “gap-loose”, or even “gap-related” or a number of other possibilities.

The challenge was that nobody actually thought this way.

![Meme of confused woman with overlaying mathematical diagrams](https://miro.medium.com/v2/resize:fit:1100/format:webp/0*Tj7QHQOY-pGqJ2IM.gif)

Our team over-intellectualizing spacing tokens.

### When a model makes sense in theory, but not in practice

We collaborated on a variety of ideas with designers and engineers across our team and key partners. As we reviewed these ideas, a consistent pattern emerged.

**People were never describing spacing in terms of relationships**. Nobody thought of them in terms of “strongly related” or “weakly related”. They never thought of them in terms of how they’re nested within structures of a component either. Instead, they described **where** or **how** spacing was being used. They would describe them as *“this is space between a label and a field”* or *“this is the padding inside a container”*.

People were thinking of spacing (and size) in terms of **construction; not communication**. Whether they were a designer or an engineer, they thought about spacing (and size) tokens in terms of *how something is built*.

### Shifting from communication to construction

That realization forced us to rethink the problem. Instead of thinking of semantic tokens as purely relating to *what they communicate to end users*, we started thinking of them in terms of *what they help to construct*.

![Text labels speak to users and build structure.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GcMWJmHaSpQeXEHOWWodIg.png)

Semantic tokens can communicate meaning to end users, or can clarify how elements are constructed

This added another challenge to the mix. Because designers and engineers naturally thought in terms of specific components. Padding for a button, or gaps between picker menu items. In some cases, even the spacing around a very specific icon like a checkmark.

We needed to [move away from component-specific tokens](https://medium.com/@NateBaldwin/component-level-design-tokens-are-they-worth-it-d1ae4c6b19d4) and use cases so we could scale the system elegantly. We needed to support the construction-oriented mental model of our designers and engineers without creating tokens for every single component.

### Looking at the in-between layer

We begun by evaluating design tokens and the components of our system that use them. What was missing from this equation was the in-between layer: recurring visual patterns and compositions used inside components.

![Diagram illustrating the path from individual component definitions to reusable structure definitions.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*c4iSaXJT6d6js7wn8jsjDA.png)

Reusable structures allow for composing a wide variety of different components with consistent compositional patterns and spatial relationships.

A menu item is not entirely unique. It’s very similar to other list-like components such as a tree view item, side navigation item, and list view item. But more than that, we could see that these components were comprised of other recurring patterns. The combination of a label and description text. The pairing of label text and a visual, whether an icon or an image. This same compositional patterns (the elements, their arrangement, their sizes, and the spacing between and around them) were showing up across many components.

This exposed another insight to our team. **The reusable thing isn’t just the token. It’s also not the component. It’s the recurring compositional structures.**

> Reusable structures provide scalability, flexibility, and cohesion, reinforce token usage, and support modular design practices.

### We weren’t defining token categories. We were defining structures.

At first we thought we were looking for a better way to classify spacing design tokens. The challenge seemed largely taxonomical: finding the right abstractions, naming them well, and using those to organize design decisions across the system.

But the patterns we were uncovering weren’t simply categories that tokens fell into. They were recurring parts of an interface architecture. Labels, visual elements, content regions, groups, containers, lists all appeared throughout our system. They weren’t specific components or random naming conventions. These were reusable structures that were repeatedly used across different components.

What made this particularly interesting is that these structures had characteristics of their own. For example, a label may appear with description text. Or it may be paired with an icon, or an image. That visual element could be on the left or right side of the label, and the label could also be accompanied by an interactive affordance icon.

![Base structure object in wireframe format with diagram indicating gap and padding tokens.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KEeGRlNk-BjbbKUwuH2iaw.png)

The base structure is a compositional pattern with options for label, description, visual, and interaction affordance. Many compositions and components can be made from this core structure.

### Nothing is ever that easy

Despite seeing these recurring patterns and structures, it was clear that *they were never designed with the specific intention of consistency*. We identified the recurrence of these patterns across our components, but between each of the components there were often nuanced differences. The spacing between a label and its description text may be 1 pixel or 0 pixels. The space between an icon and a visual element could vary by up to 4 pixels in some cases.

In order for us to codify a standard set of recurring structures, and support those through the implementation of structural semantic tokens, the design of many components needed to change. In some cases, components would need to be reconstructed entirely.

> In order to systematize chaos, you have to break it first.

But this is the cost of systemizing a collection of similarly-looking components. **In order to systemize chaos, you have to break it first.** We prepared for this by defining each of these structures as “structural templates.”

### Structural templates

Rather than starting with tokens and attempting to group them into categories, we began by defining (and designing) the abstract structures themselves. Each structure required a clear definition, purpose, ways it could be composed, and how or where variation could occur. We also defined when one structure was the composite of a variety of other structures. After that, we could identify the design decisions that needed to be represented as tokens.

This sequence turned out to be an important shift in perspective. Structural semantic tokens were no longer the starting point of the process; they became a byproduct of understanding the structures themselves. The goal was not to invent reusable tokens and then find places to use them. The goal was to understand a reusable interface pattern deeply enough that the necessary design decisions became obvious.

![Base, Accessory, List item, and Banner structures displayed with highlighted regions of nested structures to demonstrate composability](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*nTYEsAZIGHQolpmN1bPk-g.png)

Some of the more common structural templates with nested structures highlighted

We eventually referred to these formalized structures as structural templates. A structural template describes the reusable interface pattern that can appear across components, products, and platforms. Some components align to a single template (such as a button to the base template). Others were comprised of several templates working together. For example, a list item combines base structures and groups into a single structure, which can be customized to build a variety of list-like components.

Each template defines its structure, and the semantic tokens support the design decisions required to create that structure. The templates also document variability and options for novel ways of using the template to build components.

This distinction is subtle, but fundamentally changed how we approach token creation. Instead of asking “ *what tokens do we need?*”, we started asking “ *what structures exist?*” Once these structures are defined, token requirements began to reveal themselves.

## Looking beyond semantic tokens

What started as an effort to refine our spacing tokens ultimately **changed how we think about semantic tokens altogether**. Originally we thought semantic tokens should ideally describe what is being communicated to the end user. For certain colors, this works very well. But spacing led us somewhere else entirely.

When designers and engineers reason about dimensional properties (spacing, sizing, radii), they rarely start with end-user-communication or relationships. They think about *construction*. They think about labels, containers, objects, and how they assemble the parts together to build components.

That forced us to confront an uncomfortable reality. Not all semantic tokens are “semantic” in the same way.

![Positive Toast component annotated with tokens that communicate meaning versus tokens that communicate structure.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*jtWsiutRynQkrhNGM4H4KQ.png)

Some “semantics” convey meaning. Other “semantics” convey structure.

Some semantic tokens clearly communicate meaning, or tone. Others communicate structure. We call both of these “semantic tokens, but they describe very different aspects of a user interface. And once we realized this distinction, a number of problems became easier to solve. Instead of creating tokens directly from component use cases, we could **identify recurring structures**, **define them explicitly**, and **create tokens** to support the structures. The result is a system that’s more composable, more reusable, and significantly easier to scale.

Structural templates were one outcome of the process, but they weren’t the most important discovery. More important was that recurring structures are *first-class design system concepts*. They aren’t implementation details hiding inside components, and they aren’t just convenient labels for organizing tokens. They are a reusable architectural pattern that exists independently from any particular component or platform.

![Diagram illustrating first-class design concept of structural templates, followed by the semantic tokens then examples of components built with them.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-sqMV1BqDyg4l-RFTMoknA.png)

Structural templates are basic UI object compositions, supported through semantic layout tokens and used to implement the vast majority of components of a design system.

For our team, this process led to the discovery of a layer of systems design and interface architecture we weren’t looking for, but that dramatically improved the outcomes of a design token strategy.