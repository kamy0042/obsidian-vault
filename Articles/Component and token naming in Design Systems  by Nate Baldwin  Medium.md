---
タグ: []
作成日時: 2024-01-16T10:29:00
URL: https://medium.com/@NateBaldwin/component-and-token-naming-in-design-systems-366bad54843f
Tags: [topic/デザインシステム/デザイントークン]
---
# Component and token naming in Design Systems

![[1xrTOjmPGml0s_ntynZY65A2x.jpeg]]

[Nate Baldwin](https://medium.com/@NateBaldwin)

·

[Follow](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fsubscribe%2Fuser%2F7a84b3976523&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40NateBaldwin%2Fcomponent-and-token-naming-in-design-systems-366bad54843f&user=Nate%20Baldwin&userId=7a84b3976523)

6 min read

·

Feb 18, 2020

![[1AkHWF_ZOV7WZx7ex-KO_cg2x.png]]

There are a lot of stories out about naming, naming conventions, and best practices for design systems. Many of these articles have good spirit in the advice, however, as an author and maintainer of enterprise-level, cross-platform design systems, I feel they miss the mark on a few points. This is simply my two cents in practical, future-forward, and realistic advice for naming in design systems.

## On the naming of ‘components’, ‘patterns’, and more

Call them components, elements, patterns, interactive-clicky-things — it doesn’t really matter. The best practice here is to find common ground with your company with regards to what they are called, whether that means one team calls them ‘patterns’ and another calls them ‘components’. What’s important is understanding the vernacular of your teams, and what the key differentiators are between their named things.

For example, some of our engineers see most ‘components’ as ‘patterns’ because they are a component composed of other components. Some of our design teams would classify ‘patterns’ as more of a workflow or interaction pattern, which is independent of specific componentry. Some teams even call larger components ‘super-components’. This is fine; as long as you all understand one another.

**Takeaway: ***Seek understanding of each team’s vernacular rather than fighting for uniformity across all teams with philosophical terminology. It helps with communication, but is by no means a sword to fall on.*

## Naming conventions of components

Much of the advice I’ve seen in this regard is fickle. The names of your components are very important, but the idea that naming convention should be uniform system-wide is ill-informed. Why? Because every component library should be in charge if its own set of engineering standards, naming convention being one of those things. Platforms have their own conventions for naming, and it is better for your OS-specific engineering teams to use components that are named in a way that makes sense with the APIs they’re used to.

For example, let’s say you have a component called Quick Actions. The name “Quick Actions” is important here, but how that is formatted in coded naming conventions is not. It does not matter if a library prefers hyphens, underscores, camel case, or all caps. What **is important** in this scenario is that each library uphold their own set of consistent standards in accordance with the expectations their users will have, including platform-specific best practices and conventions.

It’s perfectly fine for all of these unique class names to exist in a design system’s component ecosystem:

- `QuickActions`
- `quickactions`
- `Quick-Actions`
- `quick-actions`
- `quickActions`
- `QUICKACTIONS`

> “Wait, how do we know whether to use the QuickActions, quickActions, or the quick-actions?”
> *— Nobody, ever*

What **is problematic** is when each library gives the same component a different name. For instance, if one team decided the Quick Actions component should be called `Action Buttons`.

Another point to mention is that **your component libraries are not necessarily going to be the very first to deliver a reusable set of components to your engineering team**. You will run into a lot of trouble if you use generic names, especially when teams migrate from old component libraries to a new one. In order to differentiate between components, a rationale solution is to prefix all component names, such as `myDSButton`. This is fine; it’s better to avoid conflict between libraries than to search for a “clean” naming convention.

What’s even more important than component names? The components’ API (see next section).

**Takeaway:*** Component libraries should own their own naming convention standards, so long as components are named consistently. Prefixing is also ok for libraries to do on their own.*

## Component variations, aka API

Not enough people are talking about this. Matthew Strom wrote a [great article](https://matthewstrom.com/writing/design-apis/) about some of this that I think everyone should read. In Spectrum, we have found that a consistent API is more beneficial than anything, such that we’ve [documented all of our design options](https://spectrum.adobe.com/page/action-button/#Table-of-options) in a pseudo-API that is created as a guide for component libraries in understanding each component’s design intent.

**A few questions that a Design API answers:**

- What options are available?
- What options are boolean?
- What options are enumerations?
- What options can be combined?
- What options are mutually exclusive?
- What options are related to other components’ options?
- What are the default options?

The names of these options, and what type of value they are, is of utmost importance in ensuring the engineering of components is consistent. A consistent API means designers and engineers on all platforms will understand not only the available options, but what combination of options are also available. An added bonus: **a design API** **helps inform the engineering of components by answering many questions that would otherwise be interpreted or invented by each engineering team.**

**Takeaway:** *Collaborate on crafting a platform-agnostic “Design API” for components, in order to ensure clear comprehension of a component’s options for your users, as well as consistent implementation across platforms.*

## Token Naming

Clarity is of utmost importance for ensuring your design system consumers understand the **design intent and usage** for particular tokens. This philosophy enables teams to design by intent, rather than design by property value.

Let’s take a look at color token naming as an example. Many resources and systems that are out there advocate for naming with loose semantics; something that is not tied to color value, but illustrates a general usage. This is almost always a recommendation in support of naming your colors `primary` / `default`. This is not good advice. Why?

Well, let’s see — in a quick glance, what colors are these? How should they be applied to a design system?

```plain text
primary: rgb(130, 80, 170);
secondary: rgb(219,106,163);
tertiary: rgb(111,191,182);
```

These names answer none of these questions well. There’s no answer to what the color is, and there’s no clear answer as to what the design intent is.

What needs to be recognized is that design tokens need to be implemented as a system in and of themselves, as your tokens are essentially the codification of design decisions and logic that you (or others) apply to your design system. For that, you need aliasing (as well as other things not mentioned here).

Let’s re-approach these color tokens in a meaningful way. First, we need to know what color these values represent.

```plain text
purple: rgb(130, 80, 170);
fuchsia: rgb(219,106,163);
seafoam: rgb(111,191,182);
```

In the real world, you will need a variety of tints and shades for each color. In that case, what works very well is a numeric increment — it communicates increase/decrease in lightness (or contrast) while still being vague enough not to tie it to specific values.

```plain text
purple100: rgb(184, 121, 240); // lighter purple
purple200: rgb(159, 101, 208); // midtone purple
purple300: rgb(130, 80, 170);  // darker purple
```

Great, now we know what these colors are, and we have a sense of tint/tonal direction. Now we apply context, ie. the design intent. For these, we will alias (cross-reference) existing tokens to give them new contextual names. **A good bit of advice here is to start with broad contexts and work your way down to more specific contexts.**

```plain text
// no context/clear identity
purple100: rgb(184, 121, 240); // lighter purple
purple200: rgb(159, 101, 208);
purple300: rgb(130, 80, 170);  // darker purple// some context/less identifiable
primaryBackgroundColor: $purple200; // for backgrounds
primaryTextColor:       $purple300; // for text// specific context
primaryButtonBackgroundColor: primaryBackgroundColor;
primaryButtonQuietTextColor:  primaryTextColor;
```

Now, context is explicitly clear — use `primaryButtonBackgroundColor` for the primary button’s background color. If users want to compose new components that are not yet defined, they can reference higher-level aliases. The alias `primaryBackgroundColor` provides enough context to answer not only semantics, but application for this specific token value.

This method of aliasing is a future-aware technique, knowing that **certain semantics or broad uses of any given token may change over time. **At any level of context, you can more easily change or adapt your system with broad strokes.

**Takeaway:** *Tokens need names that identify what they are, followed by layers of aliasing that provide broad to specific contextual uses of the token within your system.*

## Summary

There’s no hard-and-fast rules or best practices for a single, system-wide naming convention or standard. What’s important is the various resources of your system are consistent in spirit, and uphold their own uniform set of standards that are not in direct conflict with the use and comprehension of your system as a whole. As other smarter people than me have said, favor “*unity; not uniformity*”.

I hope that these insights provide a little more realistic and applicable guidance on naming in design systems.