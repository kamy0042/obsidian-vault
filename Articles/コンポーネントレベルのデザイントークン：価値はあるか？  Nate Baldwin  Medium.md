---
タグ: []
作成日時: 2025-07-25T16:45:00
URL: https://medium.com/@NateBaldwin/component-level-design-tokens-are-they-worth-it-d1ae4c6b19d4
Tags: [topic/デザインシステム/デザイントークン]
---
·Top highlight

Zoom image will be displayedPhoto by Pixabay: [https://www.pexels.com/photo/pile-of-gold-round-coins-106152/](https://www.pexels.com/photo/pile-of-gold-round-coins-106152/)

![](https://miro.medium.com/v2/resize:fit:700/1*6mJcjTUqaSlRQA4O58TWCg.jpeg)

# Component-level Design Tokens: are they worth it?

![](https://miro.medium.com/v2/resize:fill:64:64/1*xrTOjmPGml0s_ntynZY65A@2x.jpeg)

[Nate Baldwin](https://medium.com/@NateBaldwin)

7 min read

·

Oct 4, 2022

There are lots of resources for learning [what design tokens are](https://lukasoppermann.medium.com/design-tokens-what-are-they-how-will-they-help-you-b73f80f602ab), [how to use them](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421), and their benefits to design systems.** This is not that article.**

This article is intended to provide some practical, real-world basis for the use of [component-level design tokens](https://spectrum.adobe.com/page/design-tokens/#Component-specific-tokens). It should help you to understand **why** you may want to use them, **when** they are useful, and just **how much **you may (or may not) want to use them throughout your design system. The examples in this article come from my experience implementing component-level tokens in [Adobe’s Spectrum Design System](https://spectrum.adobe.com/page/design-tokens/).

# Benefits of component tokens

First, let’s look at some of the benefits to using component-level design tokens.

## Design security

Design tokens help to create security, flexibility, and unification of foundational design elements such as colors, spacing, and typography. These same functional benefits are also true for component-level tokens. Effectively, component-level tokens serve as a final layer in creating a [**separation of concerns**](https://en.wikipedia.org/wiki/Separation_of_concerns) between design and implementation, and reduce duplication and fragmentation of the system.

When component-level tokens are implemented into component libraries, design has a **guarantee** that the values they’ve chosen for every attribute of a component will be implemented *as intended* (so long as correct tokens are used where they’re supposed to be). One of the biggest issues with “the gap” design systems aim to resolve is the issue of miscommunication, “hand-offs”, and human error in design translation. Component-level tokens offer a very explicit, error-free framework for design-developer collaboration.

> This approach was used early in Spectrum as a mechanism to ensure 7+ unique frameworks had consistent and accurate implementations of our design.

## Flexibility at scale

With component-level tokens, teams have the flexibility to evolve their design over time with minimal impact to engineering consumers. For most of the small design updates (patches) that occur over time, this can be a major time saver.

> In Spectrum we made many patch updates to component tokens over the years, which ensured the changes would cascade to all frameworks that relied on tokens for their component implementations. All that was required (aside from coordinated communications) was a task to upgrade to the latest version of our tokens. This saved our teams from many repeat-tasks for updating token assignments directly in their frameworks.

## Self-service-friendly

Component-level tokens offer **specificity** regarding where a token should be used. With a consistent framework, these tokens support a self-service model. In other words, the tokens “speak for themselves,” and integrating them into a component should be straightforward. A token, such as `button-cta-background-color-hover`, has all the necessary information regarding what the token is (background color), which component and variant it’s for (CTA button), and the specific interaction state it’s applied to (hover).

> Early on with Spectrum, we had a very small team and partner teams that were implementing the design system into component libraries. These teams were globally distributed, so coordination was difficult. Component-level tokens helped all of our teams progress with minimal communication. It also helped solidify a common language and understanding of the system for engineering teams.

## Automation-friendly

Component-level tokens are a basis for automation workflows in a design system. When implemented thoroughly (every permutation of component’s properties and states) and in a machine-readable format, you have data that can be used to generate code, automate regression testing, and lint your codebases for appropriate token implementation (and more). **Automation in design systems can be greatly beneficial**, not only for the design system team, but for the entire organization. It epitomizes the goal of operational efficiency.

> Spectrum’s component-level design tokens were used to enhance visual regression testing for some of our frameworks teams. When upgrading the tokens, if VRT failed for a particular component but token assignments were the same, they could verify if it was an expected design change quickly via previous communications and release notes. In another example, some teams were able to automate the creation of styles (such as CSS) for components based on the component’s API and component-level tokens.

# The challenges and pitfalls

Before you get too excited about the potential benefits of component-level tokens, there are some serious challenges that arise with their use.

## Authoring bloat

Writing component-level tokens can easily get out of hand. If you’re tokenizing every attribute of a component, for every permutation and state, the data becomes multidimensional and scales exponentially. Traditional mechanisms for authoring design tokens (such as [Style Dictionary](https://amzn.github.io/style-dictionary/#/) or [Theo](https://github.com/salesforce-ux/theo)) are insufficient for this approach. This is not a jab at those tools, however, since the problem is more about what you define as a “design token.”

> In Spectrum we had to continually evolve our internal design token authoring tool to accommodate for authoring bloat. We implemented a tool that supported inheritance / extension of token data, and would expand our tokens into all permutations of the component. This grew into something where we could write conditions or functions to return specific tokens based on various component options and states. As powerful as this authoring tool became, it had the pitfalls of being difficult to learn, reducing the amount of contributors we could have on our token system.

## Package & consumption bloat

The more visible and impacting aspect of bloat comes in the output tokens. If tokens are philosophically approached as key-value pairs or data (eg. JSON), then the output for any single component could be ridiculously large. Let’s consider a component with three variations (primary, secondary, tertiary), three sizes (small, medium, large), and four interaction states (default, hover, keyboard focus, down/pressed). Let’s assume this component has 12 attributes defined and tokenized (such as border-radius, height, etc). Some basic math reveals that this level of specificity in data would result in 432 tokens. This means that component library teams would either have to **rely on automation tools** or **hand-code the connections** for 432 tokens in their codebase. This is not a good situation; it could result in costing more time than it intended to save.

> At one point in time Spectrum had 210,180 design tokens in an 18MB JSON file. We had to reinvent “design tokens” in a way that could accommodate for the high degree of specificity (security, flexibility, automation) without all the bloat of a traditional design token output type. This meant more innovation, but also came with an amplified learning curve. Ultimately this negatively impacted our ability to grow contributions into the token system.

## Cognitive load

It’s important to remember that **design tokens are an interface** for users (both designers and engineers). While component-level tokens offer a self-service model, they also become very difficult to reason about and can create more confusion in the long run. Bloat affects cognitive load, but component-level token names can exacerbate it.

> In Spectrum we had some component tokens with such large names engineers could no longer grasp what each word was related to. The multidimensionality of options resulted in eliminating the self-serviceability of the tokens. A specific example of such a token would be spectrum-button-m-warning-quiet-overbackground-textonly-focus-ring-animation-duration.

## Inflexible API for a flexible system

This approach is heavily reliant upon the token names, or data structures for component tokens. The names of tokens become API, so the order of attributes or the construction of a “token name” is extremely important. Initially, this won’t seem to be much of an issue, however it becomes a breaking change when property names change (such as a variant) or if design adds more options to a component that did not exist before.

> Spectrum used a simple rule to enforce a naming convention standard for component tokens and their options + states. This became problematic when we introduced the notion of “t-shirt-sizes” to all of our components. Based on the standard naming convention (API), we couldn’t just add the t-shirt size to the end of the token name string. So instead, we placed t-shirt size names in an order that aligned with our standard. This resulted in breaking changes for every design token in each component that now supported t-shirt sizes. For instance spectrum-button-primary-textonly-height became spectrum-button-m-primary-textonly-height (added “-m” for medium). Every single framework had to update their codebases with the new token names, granted most of it was done with find and replace.

# When would you want to use component-level tokens in your design system?

As you can see, there are some powerful benefits to component-level tokens, as well as some crippling downfalls. From my experience, using a handful of component-specific tokens *as they are needed* is a good approach for most design systems. A fully component-level system like we had used in Spectrum is only valuable when you fit a specific scenario, such as:

1. Many framework implementations to support (4+)
2. [Centralized](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0) design team
3. Single design language (one brand; one style)
4. Platform uniformity (little to no iOS or Android-centric design)
5. Robust, dedicated design tooling team

Most design teams won’t fit the bill for all of those points. In fact, Spectrum no longer fits this either, as it’s evolving to become better citizens of each platform (iOS, Android, Windows). If your design system aligns with these five points, then component-level design tokens are a potential investment for you to look at; otherwise, the cost may greatly outweigh the returns.

# Further thoughts

I believe that the greatest potential from component-level tokens is less in their use (by today’s standard of “design tokens”) and more in the philosophy and what they aim to accomplish. Automation, machine-readability, a better separation of concerns, systems-oriented approaches to design, and better design and engineering tools are all worthwhile goals to have.

Frankly, todays tools do not have the sophistication to provide value in design token authoring or maintenance, except for the simplest of use cases. Design systems are founded upon repeatable rules, conditions, common styles, and inheritance. We need tools that support this.

The way we define tokens would similarly need to evolve. Rather than static data and key-value pairs, the concept of component-level tokens should only exist as *directions to get to the correct token*. Much like an alias, these are really *instructions* for how to construct a component *with* design tokens. But this would need to be something new — a format or filetype that is lightweight, systems-oriented, and interoperable.

I hope that these insights help you to navigate the various levels of design token abstraction in order to make the best choices for your design system team and its consumers.