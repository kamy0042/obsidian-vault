---
title: "Why Atlassian Rebuilt Its Design System"
source: "https://medium.com/@jihyungyooo/why-atlassian-rebuilt-its-design-system-1376f7d220c7"
author:
  - "[[Jihyung Yoo]]"
published: 2026-07-03
created: 2026-08-03
description: "More"
tags:
  - topic/デザインシステム/導入事例
  - topic/デザインシステム/AI活用
  - topic/デザインシステム/戦略・ガバナンス
---
*What had to be clarified before becoming AI-native*

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*lQc0_Dqq4DgHZkIhuhqNbw.png)

A good design system does not force multiple products into the same shape. What it does is create an order that allows users to move across products without having to relearn everything each time.

When we read about design systems, the conversation usually moves in one of two directions. One is about efficiency: reusing components, organizing tokens, and helping designers and engineers work from the same source of truth. The other, more recent conversation is about AI: a future where AI reads design systems, generates screens, writes code, and assembles prototypes.

At first, I was naturally drawn to the second question. If AI can understand a design system, how will the work of designers change? If product screens can be created through prompts, what role will design systems play? But as I followed Atlassian’s case, what stayed with me was not the AI itself. It was the work that happened before AI entered the picture.

Before Atlassian talked about an AI-native Design System, it rebuilt the foundation of the design system itself. It brought scattered guidelines together, connected brand and product experience, and reorganized the basics so that multiple apps could feel like parts of one working environment. Before attaching AI to the system, Atlassian first made a system that would not collapse when AI tried to read it.

This order matters for product designers. Design systems are often understood as component libraries or UI guidelines. Of course, that role is important. But in a real product organization, a design system carries a more complex kind of judgment. It has to decide what should become a shared standard, what should remain in the context of each product, which exceptions should be allowed, and which patterns should be elevated into the language of the whole organization. In that sense, a design system is less a tool for making screens faster and more a way for an organization to decide how it wants to build products.

When AI enters this environment, the problem becomes larger. AI is very good at filling in blanks. But when the standard itself is blank, AI fills that space with guesses. Slightly different buttons across products, similar but inconsistent patterns, unclear icons, and screens that miss accessibility standards can multiply much faster than before. That is why Atlassian’s case does not read like a simple design system refresh. It feels closer to a case study about what product organizations need to clarify before entering the AI era.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xfVmFNQlNlmgp7bfs3CukA.png)

A system that AI can read begins with standards that people can trust.

## Rebuilding the standard before AI

The starting point of Atlassian’s design system was not a grand AI strategy. The first task was to reorganize standards that had grown old and fragmented.

Early design systems often begin as documentation. Colors, typography, buttons, icons, and usage rules are written down, and designers and engineers use those documents as references when building products. In a small organization, this can work quite well. But as the number of products grows and teams expand, documentation alone becomes difficult to sustain as a standard. Documents and code begin to move separately. Components in Figma start to drift away from components implemented in the actual product. Each team creates slightly different patterns, and over time it becomes harder to know what the official standard is.

Atlassian went through this phase as well. Its design guideline site and React component library were operated on different tracks, and design and engineering were not fully connected through the same standard. What the team needed first was a Source of Truth: a single point of reference. But a Source of Truth does not simply mean collecting documents in one place. It is not just a matter of organizing color names and component lists. It means defining what the organization should ultimately refer to when building products, and being able to explain what belongs inside the system and what still remains outside it.

The key here is drawing boundaries. A good design system is not a storage room that accepts every request. It must be able to explain not only what should be included in the system, but also what should not be included yet. Otherwise, the system quickly becomes heavy. At first, it may look like the system is growing in a healthy way, with different teams contributing components, adding patterns, and registering exceptions. But over time, similar components appear in multiple places, the same pattern repeats under different names, and the official standard becomes hard to find. The number of assets grows, while the standard itself becomes less clear.

What makes Atlassian’s case interesting is that it did not try to solve this problem by adding more. At a certain point, it limited large-scale new additions and focused instead on small fixes and documentation improvements while redefining the boundaries of the system. It observed patterns that emerged from product teams and local systems, then reviewed only those that appeared repeatedly and elevated them into shared patterns.

This attitude becomes even more meaningful once AI enters the workflow. Just because an AI-generated screen looks plausible does not mean it should immediately become part of the system. It has to be tested against multiple contexts. It has to meet accessibility and performance standards. It has to fit the brand expression and the information architecture. The faster generation becomes, the stricter the criteria must be for deciding what to accept and what to leave out.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3uV9qTBoCOu03a6gthVcXg.png)

A good system is not a structure for holding more things, but a standard for explaining what should remain.

## An experience that stays familiar across products

Atlassian’s design system could not remain a tool for one specific product. Jira, Confluence, Trello, Loom, and Rovo all move together within the same organization. In this kind of environment, the role of a design system does not end with unifying buttons and forms. It has to create the feeling that users are moving across products from the same company, and more importantly, across one connected work environment.

The core idea Atlassian describes is an experience that feels as if it came from one hand. This does not mean every screen should look identical. Jira and Confluence support different kinds of work. Trello and Loom are used in different contexts. What matters is that those differences should not become confusion. When users move from one product to another, the structure, expression, and basic behavior should still feel familiar.

To do this, Atlassian separates the system into Core, Platform, and App layers. Core contains company-wide tokens, components, and foundational principles. Platform contains shared patterns that repeat across products and contexts. App contains elements that are specific to a particular product or domain. This is not just a classification table. It is a way of deciding what should become a central standard and what should remain within the context of each product.

If everything is built centrally, the system becomes rigid. If everything is left to individual product teams, consistency disappears. A good system continuously adjusts the balance between the two. Shared structures should be made stable, while areas that require product-specific context should remain open.

The navigation redesign sits in the same line of thinking. Navigation is not merely a menu. It is a structure that determines how users understand the whole product environment. Someone who has used Jira for years, someone who mainly works in Confluence, and someone who moves across apps through Rovo all bring different expectations. Navigation has to absorb these differences into one coherent structure.

Atlassian reorganized top-level structures, sidebars, favorites, recent items, global actions, and tab structures across multiple apps to make them more consistent. The goal was not to make every app look the same. The goal was to make information architecture and basic behaviors feel familiar even as users moved across apps.

At first glance, this work may seem far removed from AI. But if an organization wants to move toward an AI-native Design System, this kind of structural cleanup has to come first. If the basic structure is unstable, users will struggle to feel consistency when moving across products, no matter what kind of screen AI creates. But if the information architecture is already clarified, it becomes possible to explain where a new AI-generated screen or panel should live and what actions it should connect to.

Rules that were implicitly understood inside product teams are not rules for AI. Undocumented boundaries usually become spaces for guessing, and those guesses often produce results that look plausible but are wrong. This is why the move from product to platform is not simply about scaling up. It is also about building a structure that AI can understand in advance.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fuPEQ1ofnvOVQFQY_iqQfQ.png)

Even when products differ, their structure and behavior should remain familiar.

## Brand is proven inside the product

Another important shift in Atlassian’s work was that it did not separate brand from product experience.

Brand refreshes are often treated as marketing work. When the logo, colors, typography, campaign visuals, and illustrations change, we say that the brand has been renewed. But in collaboration software, the brand that users encounter every day does not live only in ads or landing pages. A Jira list, a Confluence document, a Trello board, a Loom video, and a Rovo response state are all part of the brand experience.

The principle Atlassian set was simple: a brand decision that does not work inside the product is not a good decision. This principle is stricter than it sounds. A brand color may be beautiful, but if it does not meet accessibility requirements inside the product, it cannot be used. Typography may be distinctive, but if it is hard to read in long documents or code-heavy environments, it cannot easily become a system standard. An illustration style may feel lively, but if it conflicts with the information architecture of the actual app, it cannot enter the product experience in a stable way.

That is why Atlassian handled brand design and app design together. Brand creates the direction of expression, while product design adjusts that expression so it functions in real working environments. One is not a decoration for the other. Brand and product make decisions together, accept constraints together, and become a system together.

In practice, brand is often understood as a “good-looking tone.” But inside a product, brand appears through concrete moments: color contrast, state expression, information structure, error messages, empty states, loading states. A brand experience is not about imitating a mood. It has to function as a consistent standard inside the screens where users actually work.

If AI is expected to create brand-appropriate UI, that standard has to become more specific. A few sentences in a brand guide are not enough. The system has to explain how brand colors differ from state colors, how typography behaves in real product environments, and which expressions conflict with accessibility. Only then can AI move beyond imitating a mood and begin to work with a brand that actually functions inside the product.

Brand is not a declaration. It is the result of repeated judgments inside the screens users meet every day.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4qIv0HpuKtyKIsg15DjD9A.png)

Brand expression is not a mood; it is proven through standards that work inside the product.

## Details are standards for reducing fatigue

What Atlassian’s design team repeatedly emphasizes is detail. But detail here does not mean decorative polish. It means that small differences accumulate and affect user fatigue, comprehension, and the speed of exploration.

Spacing is a representative example. Spacing is often treated as a question of taste: something looks a little too wide, or a little too tight. But Atlassian treats spacing as a matter of visual structure and cognitive load. It aligns screen structures around an 8-pixel token system and keeps consistent distances between titles and body text, sidebars and content, icons and labels.

The reason this standard matters is simple. In work tools, users are constantly searching for information, checking states, and deciding what to do next. If spacing is slightly inconsistent, users have to reread the structure of the screen each time to understand which information belongs together and which information is separate. Their eyes move unnecessarily, and they repeatedly reinterpret the layout. When small misalignments repeat, they become visual fatigue.

Icons work the same way. Atlassian had to reorganize more than 10,000 icons accumulated over many years. The problem was not just the number of icons. Some icons were filled, while others were drawn only with outlines. Stroke widths and size systems differed. The same icon could also mean different things in different apps.

Users do not describe this by saying, “The stroke width of the icon is inconsistent.” Instead, they say things like, “The screen feels complicated,” “I don’t know where to click,” or “Something feels messy.” The details of a design system are about reducing precisely this vague discomfort. Even when users cannot explain their discomfort in design terminology, the system has to identify where that discomfort is coming from.

Typography leads to the same problem. Atlassian did not create its own typeface simply to strengthen brand personality. If the font a designer sees differs from the font rendered in a customer’s browser, the same heading may wrap differently. It may look like a small difference, but in a collaboration tool it changes the position and readability of information.

Color is even more complex. Color expresses brand, but it also carries state. In many cultures, red, yellow, and green suggest warning, caution, and normal status. But on a personalized board, red may simply be a category color. A color system therefore has to consider brand expression, state meaning, personalization, accessibility, and dark mode together. The same color has to be distinguishable as brand, state, or user-defined classification depending on the context.

Accessibility belongs in this same flow. In Atlassian’s design system, accessibility is less a separate checklist and more a foundational criterion for judging good design. The date picker is one example. In the previous approach, a keyboard user moving through fields could enter the date picker and then have to pass through several elements in sequence. For screen reader users, it was not sufficiently clear what had opened or what action they should take. Atlassian changed this pattern so that instead of automatically opening the calendar and pulling the user into it, the user could first choose whether to open the calendar.

This change does not only help people who use assistive technologies. It also creates a more efficient flow for people who enter information quickly with a keyboard. This is why accessibility improvements are not exception handling for a specific group of users, but standards that raise the quality of the entire experience.

Ultimately, a design system is not limited to making good-looking screens. It is a system that helps users get less lost, rethink less often, and find their next action faster. AI is making it easier to generate average-looking screens. But whether those screens can reduce user fatigue inside work tools used tens of thousands of times every day is a completely different question. Standards for reducing fatigue cannot remain as intuition alone. They have to be organized as tokens, components, accessibility rules, semantic systems, and usage contexts.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*M1yhzsw8Ezl5BaF0bGF7Sg.png)

Detail is not decoration; it is a practical standard for reducing user fatigue.

## A system people can trust

Before moving toward an AI-native Design System, Atlassian first rebuilt the foundation of the system. It gathered scattered guides and code libraries into one standard, clarified what was inside and outside the system, revisited the relationship between product-specific and shared patterns, and designed brand and app experience together. Spacing, icons, typography, color, accessibility, and navigation were also adjusted so that multiple products could appear to speak the same language.

All of this work was necessary even before AI appeared. But once AI entered the picture, its meaning became clearer. In an organization with a weak system, AI may increase inconsistency before it increases speed. If each team creates screens through prompts, produces similar but different components, generates icons that do not exist, and misses accessibility standards, production speed may increase. But product order will quickly collapse.

In contrast, in an organization with a strong system, AI does not have to guess every time. It has references for which component to use, which pattern is official, and how far something should remain within product-specific context. AI works more reliably when it follows an already organized order rather than trying to invent the standard on its own.

Atlassian’s AI-native transition did not begin by attaching AI tools. It began by turning the design system into a standard the organization could trust, helping multiple products speak the same language, and organizing design details into tokens, components, patterns, and documentation. This order matters. Before a system can be technically connected to AI, it has to be trusted within the organization.

For product designers, the message is clear. AI can make design faster. But for fast output to become good product experience, the organization first has to define what good means. A design system is where that standard lives. It is not just a library of buttons. It is a place where an organization agrees on the kind of experience it wants to create consistently.

A design system that AI can read is not created overnight. Only a system that people have read, written, revised, and trusted over time can become a system that AI can read. And this leads to the next question. Once such a system is in place, how does it deliver standards and context when AI enters the product development process? In Part 2, I will look at how Atlassian expanded its design system from a simple UI library into a context engine for AI.

Series:

- [Part 1: Why Atlassian Rebuilt Its Design System](https://medium.com/@jihyungyooo/why-atlassian-rebuilt-its-design-system-1376f7d220c7)
- [Part 2: How Atlassian Moved Toward AI-native](https://medium.com/@jihyungyooo/how-atlassian-moved-toward-ai-native-82c72722a20d)

Reference:

- Figma. “The Hidden Layers of Design Systems with Atlassian’s Design Architect.” YouTube, 2025.
- Atlassian. “Designing the Future with Josh Higgins and Charlie Sutton.” YouTube, Team ’25, 2025.
- Kristin Perchal and Bryan Ye. “How We Built a Navigation That Works for Everyone.” Inside Atlassian, January 31, 2025.