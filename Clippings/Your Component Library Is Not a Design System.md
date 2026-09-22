---
title: "Your Component Library Is Not a Design System"
source: "https://medium.com/@Camila-Flores/your-component-library-is-not-a-design-system-1b3c9dd3f3dd"
author:
  - "[[Camila Flores]]"
published: 2026-09-20
created: 2026-09-22
description: "More"
tags:
  - "clippings"
---
The missing layer is what separates products that feel coherent from products that feel assembled.

I once joined a product team that had spent fourteen months building what they proudly called their design system. And I believed them, at first. They showed me the Figma library. Forty-seven components. Buttons in every state. Cards with six layout variants. A modal component with enough configuration options to land a small aircraft. The documentation was thorough. The naming was consistent. The developers had a matching component library in React, and the parity was nearly perfect.

Then I opened the actual product.

And I felt something I could not immediately name. It was not broken. The buttons looked right. The cards rendered correctly. The typography was on brand. Every individual piece was exactly what the library promised it would be.

But the experience felt assembled. Not designed. Not considered. Assembled. Like someone had poured a box of well-made parts onto a table and arranged them into something that technically functioned but did not quite cohere. The spacing between sections felt arbitrary. The hierarchy shifted from page to page. The same user action produced different interaction patterns depending on which feature team had built it. The product looked consistent if you squinted at individual elements. It felt inconsistent the moment you tried to use it.

I asked the team a question that made the room go quiet. “When a user moves from the dashboard to the settings page, what should feel different, and what should feel the same?”

Nobody could answer. Not because they were not thoughtful designers. But because nobody had ever asked that question before building. They had built the parts. They had never built the rules that govern how the parts relate to each other across contexts.

That was the moment I understood something I have carried into every design system project since. A component library is a collection of parts. A design system is a collection of decisions about how those parts work together. And most teams, with the best intentions in the world, only build the first one.

This distinction is not academic. It is not semantics. It is the difference between a product that scales gracefully and a product that fragments every time a new team touches it. It is the difference between velocity and velocity theater. And it is the difference between a user who trusts your product and a user who cannot quite explain why it feels slightly off.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*rb6Vsyu1E-cG9ewEOM_sdA.jpeg)

Components are the parts. The system is the set of relationships between them. Parts without relationships produce an assembly, not an experience.

## Components Are Nouns. Systems Are Verbs.

The easiest way to understand the gap is to think about what each approach optimizes for.

Component thinking optimizes for the object. A button. A text input. A dropdown. A navigation bar. The question at the center of component thinking is: what is this thing, and how should it look and behave? The answer gets documented, coded, and stored in a library for reuse. And this is genuinely valuable. It eliminates redundant work. It creates visual consistency. It gives developers a reliable API and designers a reliable starting point.

But components, on their own, are isolated. A button does not know what form it belongs to. A card does not know what list it sits inside. A modal does not know what task triggered it or what the user was doing before it appeared. Components are self-contained. That is their strength and their limitation.

System thinking optimizes for the relationship. It asks different questions. When should you use a modal instead of an inline expansion? What happens to the page hierarchy when a drawer opens? How does the spacing between cards change when the user is browsing versus comparing? What is the reading order when a notification interrupts a multi-step flow?

These are not questions about any single component. They are questions about the space between components. About the transitions. About the context. About the rules that govern how parts interact when they meet.

I noticed this distinction most clearly when I audited two products in the same company. Both used the same component library. Same buttons. Same cards. Same color palette. Same type scale. And yet one product felt cohesive and the other felt like four different products stitched together.

The difference was not in the components. The difference was that the cohesive product had a set of documented decisions about how components should relate in specific contexts. There was a pattern for onboarding flows. A pattern for data-heavy tables. A pattern for confirmation moments. A pattern for empty states. And these patterns were not just visual templates. They included interaction logic, content guidance, and accessibility requirements. They were systems-level thinking made tangible.

The fragmented product had none of that. Each feature team grabbed the components they needed and made local decisions about how to arrange them. And because those decisions were local, they varied. Not wildly. Just enough to create the subtle sense that you were moving through different neighborhoods with different architectural rules.

What surprised me most about this realization was how invisible the problem was to the teams building it. Each team’s work looked correct in isolation. The button was the right button. The spacing used the right token. The color was from the right palette. No single decision was wrong. But the absence of a system-level framework meant that the sum of those correct decisions produced an incoherent whole.

Most people assume that if you have consistent components, you will have a consistent product. What I have learned is that consistency at the component level is necessary but not sufficient. You can have perfect component consistency and still produce a product that feels disjointed, because consistency of parts does not automatically produce consistency of experience. The experience lives in the relationships. And relationships require rules that exist above the level of any single component.

The practical takeaway here is to stop asking “do we have a component for this?” and start asking “do we have a pattern for this?” A pattern is a reusable solution to a recurring design problem that involves multiple components working together in a specific context. If you only have components, you have vocabulary without grammar. And vocabulary without grammar does not produce language. It produces word salad.

## The Five Layers a Design System Actually Has

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GZHBibVYlejlz_RKImQHtQ.jpeg)

The five layers of a design system. Most teams build layers two and three. The missing layers, principles, patterns, and governance, are where coherence actually lives.

When I talk to teams about this, the most common response is some version of “but we do have a design system.” And usually they mean they have a component library and a set of design tokens. And those are real, valuable pieces. But they are two layers of a five-layer structure. And missing the other three is where the coherence breaks down.

Let me walk through all five, because I think naming them clearly is the first step toward building them.

The first layer is design principles. These are the beliefs that govern every decision the team makes. Not visual rules. Beliefs. Things like “clarity over cleverness” or “progressive disclosure is our default” or “we optimize for the returning user, not the first-time visitor.” Principles are the why behind every what. They are what you fall back on when two components or two patterns seem to conflict. Without principles, every decision is a negotiation. With principles, most decisions are obvious.

I have seen teams skip this layer entirely and wonder why their design reviews turn into debates about personal preference. The reason is that without shared principles, there is no arbiter. There is no shared framework for resolving disagreements. So every discussion becomes about taste. And taste is unwinnable. Principles turn taste arguments into strategy discussions.

The second layer is foundations. This is where most teams start, and for good reason. Color. Typography. Spacing. Elevation. Motion. Iconography. These are the atomic building blocks. They are the raw materials. And they need to be defined, documented, and tokenized so that they can be shared between design and engineering without loss of fidelity.

But foundations alone do not tell you when to use a 24-pixel gap versus a 32-pixel gap. They tell you that both options exist. The decision about when to use which is a system-level decision. It belongs to the next layer.

The third layer is components. This is the layer most teams invest in most heavily, and it is the layer that gets the most visible attention. Buttons. Inputs. Cards. Modals. Navigation elements. Components are the tangible, reusable objects that designers drag onto canvases and developers import into codebases. They are essential. They are also the layer that gets the most credit for outcomes that actually belong to the other layers.

The fourth layer is patterns. And this is the layer most teams are missing. Patterns are the documented solutions to recurring design problems that involve multiple components working together in a specific context. A search pattern. A settings pattern. A checkout pattern. An empty state pattern. A data table pattern with sorting, filtering, and pagination. Patterns are where components meet context. They are where the system starts to feel like a system instead of a parts bin.

One lesson I did not expect from building pattern libraries is how much they reduce design review time. When a designer presents a new feature, the review conversation shifts from “does this look right?” to “does this follow the pattern?” And if the pattern is well-documented and agreed upon, most of the conversation becomes about whether the pattern needs to evolve, not whether the individual screen is correct. That is a massive shift. It moves the team from policing pixels to evolving strategy.

The fifth layer is governance. And this is the layer nobody wants to build because it sounds bureaucratic. But governance is simply the answer to a set of unavoidable questions. Who can add a new component to the library? What process do they follow? How do you decide when a pattern should be updated versus when a one-off exception is acceptable? Who reviews those decisions? How do you handle deprecation? How do you communicate changes to the teams that depend on the system?

Without governance, the system decays. Not quickly. But steadily. Someone adds a slightly different button variant because their use case felt unique. Another team creates a custom card layout because the existing one did not quite fit. And each individual exception is reasonable. But the accumulation of reasonable exceptions is what turns a system into a swamp. Governance is the immune system. It is not there to prevent change. It is there to make change deliberate instead of accidental.

The practical takeaway is to audit your current system against these five layers. Be honest. If you have principles written on a wiki page that nobody reads, you do not really have principles. If you have patterns documented but not connected to the component library, they are not really patterns. If you have no process for adding or deprecating components, you do not really have governance. Name the gaps. Start with the layer that is causing the most friction. And build from there.

## The Cost of Component-Only Thinking Is Quiet but Real

I want to talk about what this costs, because I think the cost is invisible until you add it up. And by then, it is very expensive.

The first cost is velocity. This sounds counterintuitive, because the whole promise of a component library is speed. Reuse things. Do not reinvent the wheel. And that promise is real, at the component level. You do save time not rebuilding a button from scratch.

But at the system level, the absence of patterns and principles creates a different kind of slowness. Every team has to make local decisions about how components should work together. And those decisions have to be made every time a new feature is built, because there is no documented pattern to reference. The team debates modal versus inline. They debate spacing. They debate hierarchy. And those debates take time. Not a lot of time per feature. But across twenty features and four teams, the accumulated decision cost is enormous.

I tracked this informally at one organization for about six months. I counted the number of design review comments that were essentially about component-to-component relationships. Things like “should this be a dropdown or a set of radio buttons?” or “how much space should be between these two sections?” or “should this confirmation be a modal or a toast?” Roughly forty percent of review feedback fell into this category. And almost none of it was about the components themselves. It was about the relationships between them. And because there were no documented patterns, every one of those questions had to be answered from scratch.

The second cost is user trust. Users do not think in components. They do not open your product and admire your button design. They experience the product as a continuous flow of interactions, and they build a mental model of how it works based on consistency. When the same action produces different interaction patterns in different parts of the product, the user’s mental model gets fuzzy. They hesitate. They second-guess. They lose the sense of mastery that makes a product feel trustworthy.

This erosion is subtle. It does not show up in usability testing as a dramatic failure. It shows up as slightly longer task times. Slightly more support tickets. Slightly lower feature adoption. And it is almost never attributed to design inconsistency, because each individual screen passes review. The problem is distributed across the seams, and nobody owns the seams.

The third cost is organizational. When there is no system-level framework, design decisions become political. Every team defends its local choices. Cross-team alignment becomes a negotiation instead of a reference. And the design system team, if one exists, gets positioned as a service desk rather than a strategic function. They field requests for new components instead of evolving the patterns that would reduce the need for new components in the first place.

What I have learned is that the most expensive design system failure is not a bad component. It is the absence of a shared decision-making framework. Because without that framework, every team optimizes locally, and local optimization at scale produces global incoherence. And global incoherence is what users feel, even if they cannot name it.

Most people assume that design inconsistency is a visual problem. A spacing issue. A color mismatch. A typography error. What I have seen, repeatedly, is that the inconsistency users feel most acutely is not visual. It is behavioral. It is the sense that the product does not have a single set of rules. That the logic shifts depending on where you are. And that kind of inconsistency cannot be fixed with a component library. It can only be fixed with a system.

The practical takeaway is to measure the cost. Look at your design review feedback. Count the percentage of comments that are about relationships between components rather than the components themselves. Look at your support tickets. How many are about confusion that stems from inconsistent interaction patterns? Look at your feature development time. How much of it is spent making decisions that a documented pattern would have already resolved? Once you can see the cost, you can build the business case for the missing layers.

## The Shift From Parts to Relationships Is a Mindset Change, Not a Tooling Change

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fIIC9zBC5FYcPS-K8MahmQ.jpeg)

Without system-level rules, every team makes local decisions that feel reasonable in isolation. With shared patterns and principles, the same components produce a coherent experience.

Here is the part that is harder than it sounds. The shift from component thinking to system thinking is not a matter of buying better software or hiring a design systems engineer. It is a mindset change. And mindset changes are slow, uncomfortable, and require leadership.

The reason is that component thinking is concrete. You can point to a button. You can measure it. You can demo it. You can show it in a portfolio. It is a satisfying deliverable. System thinking is abstract. You cannot point to a relationship. You cannot demo a decision framework. You cannot put a spacing principle on a slide and feel the same sense of accomplishment. And so teams naturally gravitate toward the tangible work, because the tangible work feels like progress.

I made this mistake myself, early in my career. I built a component library and felt enormously proud of it. And I should have been proud. It was good work. But I had skipped the harder work of defining the principles and patterns that would make those components produce a coherent experience. And when the product started to fragment, my first instinct was to build more components. To fill the gaps with more parts. And that made the problem worse, because more parts without more rules just creates more surface area for inconsistency.

Something changed when I started thinking of the design system as a language instead of a toolkit. A toolkit is a collection of objects. You pick the one you need and use it. A language is a set of rules for combining symbols into meaning. You do not just pick a word. You follow grammar. You respect syntax. You consider context. And the same words, arranged differently, produce different meanings.

Components are words. Patterns are sentences. Principles are grammar. And governance is the process by which the language evolves without losing its coherence. When you think of your design system as a language, the goal shifts from building a bigger vocabulary to building a clearer grammar. And that shift changes everything about how you prioritize, how you document, and how you make decisions.

One of the most effective exercises I have run with teams is what I call the “same action, different context” test. You pick a single user action, like confirming a destructive operation, and you map every place in the product where that action appears. Then you look at how it is handled in each location. Is it a modal? An inline confirmation? A toast? A multi-step wizard? And you ask: are these differences intentional, driven by context? Or are they accidental, driven by which team built which feature?

In almost every case, the answer is a mix. Some differences are intentional. Most are accidental. And the accidental ones are the ones that erode trust. Because the user does not know which differences are intentional. They just experience the inconsistency.

The practical takeaway is to start with one pattern. Pick the most common interaction in your product. The one that appears in the most places. And document it. Not just the component. The pattern. When to use it. When not to use it. How it behaves in different contexts. What the accessibility requirements are. What the content guidance is. Make it real. Make it specific. And use it as the seed for the pattern library. You do not need to document everything at once. You need to document the first thing well enough that the team can feel the difference.

## The System Is the Product

I want to come back to that team with the forty-seven components. Because the story has a second half.

After that quiet moment in the review room, after nobody could answer my question about what should feel different between the dashboard and the settings page, we did not throw away the component library. We kept every button. Every card. Every modal. The parts were good. The parts were not the problem.

What we did was spend the next three months building the layers that were missing. We wrote down our design principles. Five of them. Short. Opinionated. Arguable. We debated them until they felt true, and then we put them somewhere everyone could see. We built a pattern library, starting with the four most common interaction flows in the product. We wrote governance guidelines that were light enough to follow and clear enough to enforce. And we started every design review by asking whether the work followed the patterns, and if it did not, whether the pattern needed to change.

The change was not immediate. It was not dramatic. There was no single moment where the product suddenly felt coherent. But over the course of about six months, something shifted. New features started to feel like they belonged. Design reviews got shorter. Cross-team alignment got easier. And the user feedback started to change. People stopped saying the product felt “a bit all over the place.” They started saying it felt “solid.” “Predictable.” “Easy to learn.”

And the components had not changed. The buttons were the same buttons. The cards were the same cards. What had changed was the system around them. The rules. The relationships. The decisions about how they should work together.

I think about that experience often, because it taught me something I did not expect. The design system is not a library you build and then use. The design system is the product. It is the set of decisions that shape every interaction the user has. The components are just the medium through which those decisions are expressed.

Most people assume that the design system serves the product. That it is a support function. A tool that helps teams move faster and stay consistent. What I have learned is that the design system is the product’s identity. It is the thing that makes the product feel like it was made by one mind instead of many. And that sense of a single, coherent mind is what users respond to, even if they never think about it consciously.

The product is not the sum of its components. The product is the system that gives those components meaning. And until you build that system, you have a collection of parts. Well-made parts. Reusable parts. But parts nonetheless.

And parts, no matter how well-made, do not add up to an experience. Only a system can do that.

Think about a product you use regularly that feels genuinely coherent, where every interaction seems to follow the same underlying logic. Now think about a product that feels assembled, where different parts seem to follow different rules. Can you identify what is different between them? Is it the components, or is it the relationships between the components? I am curious whether others have experienced the moment where they realized their component library was not enough, and what the first step was toward building the system layer that was missing.