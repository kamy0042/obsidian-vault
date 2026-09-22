---
title: "Reusable Does Not Mean Good: The Hidden Trap of Design System Components"
source: "https://medium.com/@SaraTariqMustafa/reusable-does-not-mean-good-the-hidden-trap-of-design-system-components-771291a23dfc"
author:
  - "[[Sara Tariq Mustafa]]"
published: 2026-09-03
created: 2026-09-08
description: "More"
tags:
  - "topic/デザインシステム/コンポーネント設計"
  - "topic/デザインシステム/批評・本質論"
  - "clippings"
---
Just because a component can be used everywhere does not mean it should be. Here is how to design for actual utility.

I still remember the exact moment I realized our design system was a beautiful, expensive failure. It was not during a heated argument with the engineering team. It was not during a usability test with our end users. It was a quiet Tuesday afternoon, about six months after we had proudly launched our new component library to the entire product organization.

We had spent nearly a year building it. We had meticulously crafted every button variant, every input state, and every icon. We had organized the pages, created beautiful cover images, and written hundreds of lines of documentation. When we finally published the library, the internal chat channels were filled with celebratory messages. We felt like we had crossed the finish line. We had built a fully reusable design system.

Or so we thought.

A few weeks later, I was doing a routine audit of the main product. I opened a screen that had been built by one of our senior product designers. I looked at the layers panel in the design tool. Almost nothing was linked to our new library. The designer had detached the instances, changed the padding, altered the corner radius, and created custom shadows. When I asked them about it, they gave me a simple, devastating answer.

The library components did not fit their specific use case, and it was actually faster to just build it from scratch.

That single sentence shattered my illusion. We had not built a good design system. We had built a highly reusable one. And in the minds of our product teams, those two things were not the same.

Looking back, I realize how fundamentally we had misunderstood the assignment. We had conflated the inventory of parts with the quality of the experience. We thought that if we provided enough flexible, reusable components, the product would naturally become consistent and efficient. We treated reusability as the ultimate metric of success.

But reusability is just a technical capability. It means a component can be instantiated in multiple places without breaking. It does not mean the component is actually good at solving the user’s problem. It does not mean it is easy to use. It does not mean it creates a cohesive experience.

Most people assume that a reusable component is inherently a good component. They think that if a button can be used in a modal, on a landing page, and inside a data table, it is a successful design.

What I have learned is that extreme reusability often comes at the direct expense of quality. When you try to make a component work everywhere, you usually end up making it perfect for nowhere. You strip away the context. You add bloated configuration options. You create a generic shape that lacks the specific nuance required to guide the user effectively.

This article is about the dangerous illusion of reusability. It is about why having a highly flexible component library does not mean you have a good product. And it is about the critical, often unglamorous work required to shift your focus from building components that can be reused, to building components that are actually good.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GOK0c9AqqP9TtHMKEtfftA.jpeg)

Reusability is just a technical capability. When we prioritize flexibility over quality, we create a chaotic product experience, no matter how uniform the building blocks are.

## The Illusion of the Mega Component

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*DSUx_7RHCmp5Pqf3j1WyKQ.jpeg)

A component that tries to do everything usually does nothing well. Escaping the Mega Component fallacy requires shifting focus from extreme flexibility to specific, constrained utility.

The design industry has a deep, psychological attachment to flexibility. There is a tangible, immediate satisfaction in creating a component that can adapt to any situation. You can see it in the endless variants. You can see it in the complex property panels. It feels like undeniable progress. You are building a Swiss Army knife of interface elements.

But this satisfaction is a trap. It leads to what I call the Mega Component fallacy.

We assume that if we just build a component that can handle every possible scenario, the product teams will naturally build a cohesive, beautiful product. We focus entirely on the atomic level of flexibility. We obsess over adding every possible state, every possible layout, and every possible configuration. We treat the Mega Component as the ultimate goal of the design system.

I noticed this pattern clearly when I was consulting for a mid-sized fintech company. They had a massive library with over six hundred components. It was a visual masterpiece of flexibility. Every possible state of every possible element was accounted for.

But when I looked at the actual product, it was a chaotic mess.

The product teams were using the components, but they were using them incorrectly. They were putting secondary actions inside primary modals. They were using success state colors for warning messages. They were nesting dropdowns inside dropdowns, creating a confusing, un-navigable hierarchy.

The designers had the Mega Components, but they had no blueprint. They had no established patterns for how to assemble those flexible pieces into a coherent user experience. The component library was actually making the product worse, because it gave designers a false sense of security. They assumed that because they were using official, highly reusable components, the resulting screen must be correct.

What surprised me most during this audit was realizing how much cognitive load we were placing on the product teams. Every time they dragged a Mega Component onto the canvas, they were faced with a dizzying array of choices. Which of the forty variants should they use? Which of the fifteen boolean toggles should they turn on?

Instead of speeding up the design process, the Mega Component was slowing it down. It was forcing the designer to make micro-decisions about configuration that they should not have to think about.

Most people assume that providing more options makes a design system more useful. They think that if a component can do everything, it will solve every problem.

What I have learned is that a component that tries to do everything usually does nothing well. It becomes a generic shape that lacks the specific nuance required to solve a specific problem. A button that can be used as a primary action, a secondary action, a destructive action, and a navigation link is not a good button. It is a confused button.

To escape the Mega Component fallacy, you have to shift your focus from flexibility to specificity. You need to stop asking, “How many things can this component do?” and start asking, “What specific problem does this component solve, and how well does it solve it?”

When you design for specificity, you create components that are highly optimized for their intended use case. You remove the unnecessary configuration options. You hardcode the decisions that do not need to be flexible. You create a component that does one thing, and does it beautifully.

The practical takeaway is to audit your current library for Mega Components. Look at your most complex components. How many variants do they have? How many configuration options are exposed to the user? If a component has more than five primary variants, it is probably trying to do too much. Break it down. Create smaller, more specific components that are optimized for their exact context.

When you stop trying to build the Swiss Army knife, you start building the exact tool the user actually needs. And that is the first step toward building a component that is actually good.

## The Context Deficit

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*rzn-gnr8c6Soy78_Odx4KA.jpeg)

A component in a vacuum is just a shape. Designing in context ensures the component respects the density, hierarchy, and reality of the user’s actual environment.

If a Mega Component is a trap of flexibility, the Context Deficit is a trap of isolation.

When we design components in a design system, we often design them in a vacuum. We create a beautiful card component. We place it on a clean, white artboard. We adjust the shadows, the padding, and the typography until it looks perfect in isolation. We publish it to the library. It is highly reusable. It can be dropped into any screen.

But a component in a vacuum is just a shape. It has no context. It has no environment. It has no relationship to the data it is displaying or the user who is interacting with it.

When a product team takes that isolated component and drops it into a complex, messy, real-world screen, the illusion shatters. The shadows clash with the background. The padding feels too tight for the dense data. The typography feels too large for the compact layout. The component looks like it belongs in a different product.

I experienced this vividly when we were building a data visualization tool for a logistics company. We had designed a highly reusable “Metric Card” component. It was beautiful. It had a large number, a subtle trend line, and a clean label. It looked fantastic in the design library.

But when the product team used it to display real-time fleet tracking data, it failed completely.

The metric card was designed to display a single, static number. But fleet tracking data was highly dynamic. It needed to show a number, a unit of measurement, a timestamp, a status indicator, and a sparkline chart. The reusable component could not handle the density of the information. The product team tried to force the data into the card, and the result was a cramped, illegible mess.

We had designed a reusable component, but we had completely ignored the context of the data it needed to display.

Looking back, I realize how arrogant our design process had been. We had designed for the artboard, not for the screen. We had designed for the library, not for the product. We assumed that the product team would just figure out how to adapt the component to their specific context.

But adaptation is hard. It requires detaching instances, overriding styles, and creating custom layouts. It requires fighting against the component rather than working with it.

What I have learned is that a good component is not just a well-crafted shape. It is a shape that is deeply aware of its environment. It understands the density of the data it will display. It understands the visual hierarchy of the screen it will live on. It understands the physical context of the user who will interact with it.

To fix the Context Deficit, we had to completely change how we designed our components. We stopped designing them in isolation. We started designing them in context.

We created “contextual frames” in our design tool. Instead of just showing the Metric Card on a white artboard, we showed it inside a dense data dashboard. We showed it next to other cards. We showed it with real, messy data. We adjusted the padding, the typography, and the shadows based on how it looked in the actual environment.

Something changed when we started designing in context. The product teams stopped fighting the components. They stopped detaching instances and overriding styles. The components finally felt like they belonged in the product, because they had been designed for the product, not just for the library.

The practical takeaway is to never publish a component that has only been tested in isolation. Before you add a component to your library, place it in a realistic, complex screen. Fill it with real, messy data. Surround it with other components. See how it behaves in the actual environment. If it looks out of place, or if it fails to communicate the data clearly, it is not a good component. It is just a reusable shape.

When you design for context, you create components that feel native to the product. You create components that respect the density, the hierarchy, and the reality of the user’s environment. And that is the second step toward building a component that is actually good.

## The Cognitive Load of Configuration

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-hNP19F01kNYoMYcdsvk9Q.jpeg)

Every configuration option is a decision. When a component requires too much setup, it transfers cognitive load to the product team, becoming a liability rather than a tool.

There is a hidden cost to making a component highly reusable. That cost is paid in cognitive load.

When you want a component to be flexible, you have to expose its internal mechanics to the user. You have to give them the ability to change the colors, the sizes, the padding, the borders, and the states. You have to create a configuration panel. You have to add properties, toggles, and dropdowns.

In the design tool, this looks like a powerful, flexible component. In the code, this looks like a highly configurable React or Vue component with dozens of props.

But every time you expose a configuration option, you are transferring cognitive load from the component to the user of the component. You are forcing the designer or the developer to make a decision. You are forcing them to understand the internal mechanics of the component. You are forcing them to think about how the different options interact with each other.

I noticed the devastating impact of this configuration load when we were testing a new “Data Table” component.

The component was incredibly powerful. It was highly reusable. It could handle sorting, filtering, pagination, row selection, expandable rows, and custom cell rendering. It had over thirty different configuration options.

We handed it to the product team and asked them to build a simple user management screen.

They stared at the configuration panel for twenty minutes. They were paralyzed by the choices. Should they use the built-in pagination, or build a custom one? Should they enable row selection, or just use action buttons? How did the expandable rows interact with the custom cell rendering?

They spent more time trying to configure the Data Table than they would have spent just building a simple HTML table from scratch.

Most people assume that providing more configuration options makes a component easier to use. They think that if a designer can tweak every single pixel, they will be able to achieve the exact look they want.

What I have learned is that configuration is a burden. Every toggle is a decision. Every dropdown is a question. When you give a designer thirty options, you are not giving them power. You are giving them homework.

If it takes longer to configure a reusable component than it takes to build a custom solution from scratch, the component is not reusable. It is a liability. It is actively slowing down the product team and degrading the quality of the output.

To reduce the cognitive load of configuration, you have to embrace the concept of sensible defaults.

A good component should work beautifully out of the box. A designer should be able to drag it onto the canvas, and it should immediately look correct, aligned, and polished. They should not have to tweak the padding. They should not have to adjust the line height. They should not have to choose between five different border styles.

The configuration options should only be exposed for the things that actually need to change. If a button is always going to have a specific padding and a specific border radius, do not expose those as configuration options. Hardcode them. Lock them down.

Something changed when we started aggressively reducing the configuration options in our components. The design team stopped complaining about the library. They started using it constantly. The components were no longer a burden. They were a relief.

We realized that the best configuration option is the one you do not have to make. By hiding the complexity behind sensible defaults, we allowed the product team to focus on the actual user experience, rather than the mechanics of the component.

The practical takeaway is to audit your components for configuration bloat. Look at the property panels in your design tool. Look at the props in your code. Ask yourself, “Does the user of this component actually need to change this, or can we just make a decision for them?” If you can make the decision for them, do it. Hide the complexity. Provide a beautiful, functional default.

When you reduce the cognitive load of configuration, you transform your components from a complex puzzle into a seamless building block. And that is the third step toward building a component that is actually good.

## Designing for the Edge Cases vs the Core Reality

One of the most difficult challenges in component design is deciding what the component will not do.

We are naturally wired to want to cover every possible scenario. We want to build a component that can handle the happy path, the sad path, the empty state, the error state, the edge case, and the bizarre outlier. We want to build a component that is bulletproof.

But trying to handle every edge case is the fastest way to ruin the core reality of the component.

When you try to make a component handle every possible scenario, you inevitably compromise the core experience. You add extra padding to accommodate a rare, long text string. You add complex logic to handle a bizarre data format. You create a bloated, heavy component that is slow to render and difficult to maintain.

I experienced this reality when we were building a “Navigation” component for a complex enterprise application.

The application had a massive, deeply nested menu structure. Some sections had one level of navigation. Some had two. Some had three. Some had icons, some had badges, some had tooltips.

We decided to build a single, highly reusable Navigation component that could handle all of these scenarios. We added logic to handle one level, two levels, and three levels. We added support for icons, badges, and tooltips. We added support for collapsible sections and mega menus.

The component was a masterpiece of flexibility. It was incredibly reusable.

But when we actually used it in the product, it was a disaster.

The core navigation, which was just a simple list of links, was now burdened by the complex logic required to handle the three-level mega menus. The rendering was slow. The accessibility was broken because the screen reader was trying to parse the complex nested structures even when they were not being used. The visual design was compromised because the component had to accommodate the widest possible variety of content.

We had optimized for the edge cases, and we had completely ruined the core reality.

Looking back, I realize how seductive the edge case is. It is easy to point to a bizarre, complex scenario and say, “But what if the user needs to do this?” It feels irresponsible to say, “The component will not handle that.”

But the 80/20 rule applies heavily to component design. Eighty percent of the time, the user is just navigating a simple, one-level list of links. Twenty percent of the time, they are dealing with a complex, three-level mega menu.

When you design a component, you must optimize for the eighty percent. You must make the core experience as fast, as accessible, and as beautiful as possible. You must let the edge cases be edge cases.

If a product team has a bizarre, complex scenario that the standard component cannot handle, they should build a custom solution for that specific scenario. They should not force the standard component to bend out of shape to accommodate a rare use case.

What I have learned is that a good component is defined by its boundaries. It is defined by what it refuses to do. By drawing a hard line on what the component will and will not handle, you protect the integrity of the core experience.

Something changed when we started explicitly documenting the boundaries of our components. We stopped trying to build the ultimate, all-purpose navigation. We built a simple, fast, accessible “Primary Navigation” component that handled the eighty percent use case perfectly. And we built a separate, highly complex “Mega Menu” component for the twenty percent use case.

The product team was thrilled. They had a fast, reliable component for their daily work, and a specialized component for their complex needs. The core reality was protected.

The practical takeaway is to define the boundaries of your components before you build them. Ask yourself, “What is the core use case for this component, and what are the edge cases we will explicitly refuse to handle?” Document those boundaries. Communicate them to the product team. Protect the core experience at all costs.

When you stop trying to handle every edge case, you create components that are fast, accessible, and deeply optimized for the reality of the user’s daily work. And that is the fourth step toward building a component that is actually good.

## The Framework for Evaluating Component Quality

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2hqPmfWb3iK49Xl_olOntQ.jpeg)

The Clarity, Constraint, and Composition framework. True component quality is measured not by how many places it can be used, but by how well it communicates, enforces boundaries, and harmonizes with the system.

Understanding the traps of the Mega Component, the Context Deficit, the Cognitive Load of Configuration, and the Edge Case Obsession is only the first step. The real challenge is changing how you evaluate the quality of your components on a daily basis.

For years, I evaluated components based on their reusability. I looked at a component and asked, “How many places can I use this?” If the answer was “everywhere,” I considered it a high-quality component.

This was a fundamental mistake. Reusability is a technical metric. Quality is a human metric.

A component can be highly reusable and deeply flawed. It can be instantiated in fifty places, but if it confuses the user, slows down the interface, or creates visual inconsistency, it is a bad component.

To truly build a good design system, we need a new mental model for evaluating quality. We need a framework that looks beyond reusability and focuses on the actual value the component provides to the user and the product team.

Over the last few years, I have developed a framework for this. I call it the Clarity, Constraint, and Composition framework. It is a set of three questions I ask myself, and my team, every time we review a component.

The first question is about Clarity. Does this component clearly communicate its purpose and its state to the user?

When a user looks at the component, do they instantly understand what it does? Do they understand if it is clickable, if it is selected, if it is loading, or if it is disabled?

Clarity is not just about visual design. It is about semantic meaning. A button that looks like a link is not clear. A toggle that does not clearly indicate its on and off states is not clear. A card that does not clearly define its boundaries is not clear.

If a component lacks clarity, no amount of reusability will save it. It will confuse the user, no matter where it is placed.

The second question is about Constraint. Does this component enforce the right boundaries and make the right decisions for the product team?

A good component should not just be a blank canvas. It should be a set of guardrails. It should prevent the product team from making bad decisions. It should enforce the spacing scale, the typography scale, and the color palette. It should make the right way the easy way, and the wrong way the hard way.

If a component is so flexible that it allows a designer to break the visual hierarchy, or use an inaccessible color combination, it is not a good component. It is a liability. Constraint is what creates consistency. Constraint is what creates quality.

The third question is about Composition. Does this component work harmoniously with the other components in the system?

A component does not exist in a vacuum. It exists in a system. It must sit next to other components, inside other components, and respond to the same environmental conditions.

Does it respect the same spacing rules? Does it use the same typography scale? Does it respond to the same interaction patterns?

If a component is highly reusable, but it clashes with every other component in the system, it is not a good component. It is a rogue element. Composition is about ensuring that the individual parts create a cohesive, harmonious whole.

When I started applying the Clarity, Constraint, and Composition framework to our design system, the quality of our components improved dramatically.

We stopped celebrating components just because they were flexible. We started celebrating components because they were clear, constrained, and compositional. We deprecated the Mega Components that lacked clarity. We fixed the Context Deficits by adding constraints. We reduced the Cognitive Load by simplifying the composition.

Most people assume that evaluating component quality is a subjective, aesthetic exercise. They think it is about whether the component looks beautiful.

What I have learned is that evaluating component quality is an objective, structural exercise. It is about whether the component clearly communicates, enforces the right boundaries, and works harmoniously within the system.

The practical takeaway is to adopt the Clarity, Constraint, and Composition framework for your next design review. Look at your most used components. Ask the three questions. If a component fails any of them, it is not a good component, no matter how reusable it is. Fix it, constrain it, or deprecate it.

When you shift your focus from reusability to quality, you transform your design system from a loose collection of parts into a tightly integrated, highly effective tool. You stop building components that can be used everywhere, and you start building components that are actually good.

## The Responsibility of the System Builder

As I reflect on my journey from that quiet Tuesday afternoon of realization to the robust, quality-focused system we build today, I realize that my understanding of what it means to be a design system builder has completely evolved.

Early in my career, I thought my job was to build the most flexible, reusable component library possible. I thought my value was tied to my ability to create components that could adapt to any situation. I viewed reusability as the ultimate measure of success. I viewed the design system as a massive toolbox, and my job was to fill it with as many versatile tools as possible.

But the product teams do not care about the versatility of the toolbox. They care about whether the tools actually help them build a great product. They care about whether the components make their job easier, or whether they make their job harder.

We have a profound responsibility as system builders. We are not just creating reusable assets. We are shaping the daily experience of the designers and developers who use our system. We are shaping the final experience of the users who interact with the product.

Every time we build a Mega Component, we are confusing the product team. Every time we ignore the context, we are creating visual friction. Every time we expose too many configuration options, we are draining the cognitive energy of the team. Every time we try to handle every edge case, we are degrading the core experience.

These are not just technical missteps. They are failures of empathy. They are a refusal to engage with the actual reality of the people who have to use our components every single day.

Great component design is not about flexibility. It is about clarity. It is about constraint. It is about composition. It is about making the hard decisions so that the product team does not have to. It is about building components that are deeply optimized for the specific problems they need to solve, rather than trying to solve every problem at once.

The next time you open your design tool to build a new component, I want you to look past the property panel. I want you to look past the endless list of variants and configuration options.

Ask yourself if the component clearly communicates its purpose. Ask yourself if it enforces the right boundaries. Ask yourself if it works harmoniously with the rest of the system. Ask yourself if it is actually good, not just reusable.

Because at the end of the day, a component that can be used everywhere is worthless if it creates a terrible experience wherever it is used. And it is our responsibility to ensure that the building blocks of our product are not just reusable, but genuinely, undeniably good.

What is one highly reusable component in your current design system that is actually creating friction for your product team, and how can you constrain it to make it genuinely good?