---
title: "Design Systems Beyond Components"
source: "https://medium.com/@jihyungyooo/design-systems-beyond-components-700b115691ff"
author:
  - "[[Jihyung Yoo]]"
published: 2026-06-17
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/AI活用
  - topic/デザインシステム/批評・本質論
---
*When the Order of Components Becomes the Language of Experience*

As generative experience becomes more prominent, one of the first things that must be redefined is the design system.

Until now, design systems have primarily been mechanisms for consistency. They have included colors, typography, icons, spacing, components, patterns, accessibility standards, and documentation practices. A good design system allowed multiple products and teams to create screens in the same language. Buttons looked like buttons. Modals behaved like modals. Cards, tables, and input fields were used across products in predictable ways.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*E80fKxcT1EIveuEDqRMQDw.png)

For organizations operating large digital products, this was an essential foundation.

But in the age of generative experience, that definition is no longer enough. If users no longer move through fixed screens, and if screens and flows are dynamically composed according to user intent and context, a design system cannot remain a collection of components that humans simply pick up and use.

It must become a structure that AI can read, interpret, and assemble.

In other words, the design system must expand from a repository for visual consistency into an operating framework for safely running generative experiences.

The limitation of existing design systems is relatively clear. They are very good at defining “how something should look.” The states of a button, the structure of a card, the color of a banner, the position of a modal, and the error state of an input field can all be managed with great precision.

But the question of “when, why, and for which user intent this pattern should be used” is much less often structured.

That judgment has typically depended on the experience of designers and product managers, the tacit knowledge of an organization, and the habits of individual product teams. When humans designed the screens, this was often enough. But the moment AI begins to assemble the structure of the screen, that tacit knowledge becomes a problem.

AI cannot only know what a component looks like. It also needs to know the context in which that component is appropriate.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8H15YEUFxPTQiBGolYQC-w.png)

Consider a commerce service with a component called `ProductCard`. A traditional design system defines what information the card displays, what image ratio it uses, and where price and delivery information are placed.

But generative experience requires more information.

Is this card suitable for fast browsing, or for careful comparison? Should it be shown first to a user who cares about price, or to a user who cares about delivery? If the user is buying a gift for their parents, should the card emphasize ease of operation and return policy? In categories such as food or healthcare, where the cost of failure is higher, what warnings or confirmation steps are required?

A conventional component definition cannot fully answer these questions.

This is why the design system must expand from a component library into a component registry.

A registry is not simply a list of parts. It is a structure that includes each component’s purpose, the kinds of intent it is suitable for, the data it requires, and the situations in which it should not be used.

A `ComparisonTable` may be appropriate when multiple candidates need to be compared by attributes. But if the required data is incomplete or unreliable, it should not be rendered. A `RiskAlert` should appear when uncertainty may affect the user’s decision. A `CheckoutGuardrailCard` should be used as a pattern for checking required conditions just before payment.

In this model, a component is no longer only a visual unit. It becomes a unit of judgment.

Pattern libraries also need to change. Until now, patterns have mostly been organized around functions: search result patterns, filter patterns, checkout patterns, onboarding patterns, empty state patterns, and so on.

In generative experience, intent comes before function.

Urgent purchases, gift purchases, careful specification comparisons, repeat purchases, low digital confidence, high-risk decisions, returns, and compensation should all become contexts around which patterns are organized.

Even the same product list may need a different composition depending on the user’s intent. In an urgent purchase, delivery availability and stock should come first. In a gift purchase, the recipient’s context and the risk of failure become more important. In a specification-heavy comparison, comparison tables and trade-offs should be foregrounded.

The design system must no longer only define “which screen to create.” It must define “which experience grammar should be applied to which intent.”

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iHSyqfLqrJYraQESI2fm4g.png)

Tokens also need to become deeper.

Today’s design tokens mostly standardize visual expression: color, typography, spacing, shadow, radius. But generative experience requires semantic tokens. Tokens such as `risk.high`, `confidence.low`, `evidence.verified`, `constraint.required`, `recommendation.primary`, and `user-control.required`.

What matters is not the color itself, but the meaning of the state.

If an AI-generated recommendation is uncertain, the issue is not simply whether to show it in gray. The system must understand that uncertainty and apply the right copy, visual treatment, explainability, and user confirmation procedure together.

Design tokens must expand from a visual language into a semantic system of experience.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2XrcIrH2hpvQ-_PjgRjfJQ.png)

In this context, recent discussions from the Atlassian Design System team are useful. They describe the design system as a “context engine” for the AI era. The idea is that a design system should no longer remain only a library of consistent UI and components. It should become a foundation that helps AI understand the design intent and context of a product.

What generative AI needs is not just a prompt. It needs structured context.

Which component should be used? Which pattern is appropriate? Which accessibility standards must be followed? Which content tone should be maintained? In which cases should something not be generated at all?

A useful design system for AI must contain this context.

The role of the Design Technologist, as discussed by the Atlassian team, also becomes important here. This role is not simply a designer who can code. It is a person who translates technical possibility into user experience across design, engineering, and product strategy.

In the AI era, this role becomes more necessary because generative experience is difficult to evaluate through static screens alone. We need to actually type, generate, assemble, revise, fail, and confirm in order to understand whether an interaction is good. Static artifacts alone are not enough to validate the next generation of interaction. New interactions must be tested by being used, not just viewed.

IBM’s Carbon for AI is also useful from another direction. Carbon for AI treats patterns for making AI involvement visible and for allowing users to inspect explanations of AI-generated results at the design system level.

This connects directly to the trust problem in generative experience.

Users need to know which results were generated by AI. They need to understand the basis on which those results were produced. AI should be a transparent presence inside the product. As invisible automation increases, users can more easily lose their sense of control. Patterns that show AI’s presence, explain the reasoning, and allow user intervention are not optional. They are close to a basic condition of generative experience.

Salesforce’s Lightning Design System has also begun addressing generative AI and agentic experience patterns. As enterprise products increasingly include agents that summarize, write, recommend, and suggest next actions, the design system becomes more than a set of screen components. It becomes a standard for how AI should behave inside workflows.

In enterprise contexts, this question is especially sensitive. A single incorrect recommendation can lead to incorrect work, poor customer communication, or a flawed business decision.

The direction these examples suggest is clear. The design system must become a language that AI can use.

Human-readable documentation is not enough. We need structured Markdown, JSON schemas, component metadata, prompt guidelines, code templates, and context-sharing approaches such as Model Context Protocol. If the existing design system was centered on Figma libraries and React component packages, the future design system will become a knowledge infrastructure that distributes the same context across multiple production environments and AI tools.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*A5iaUmFT9ltzwOVtl7mbyw.png)

I think we can call this shift Design System 2.0.

Design System 1.0 was a set of tokens, components, patterns, and documentation that helped humans create consistent screens. Design System 2.0 is a system of meaning, rules, policies, evidence, and evaluation that helps AI safely assemble experiences around user intent.

This system does not only manage colors and buttons. It manages intent, risk, explainability, and the limits of generation. It moves beyond the consistency of screens and begins to manage the responsibility of experience.

In the end, the quality of generative experience is not determined by model performance alone. Connecting a better LLM does not automatically create a better experience.

We need a system that defines how user intent is structured, which pattern is mapped to that intent, what data is sufficient, when recommendations should be withheld, when human confirmation is required, what evidence should be shown, and which failures must not be allowed.

That system must become the new design system.

The design system of the future will not be a quiet back-office asset. It will become the operating system of generative experience.

In the background, it will define what AI can do and what it must not do. It will determine how user intent is translated into structure, how the evidence behind recommendations and generation is shown, and when humans should intervene.

This is why a design system can no longer remain just a component library.

In the age of generative experience, the design system becomes not a tool for making screens, but the order that governs how experience is generated.