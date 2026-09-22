---
title: "The Token Structure That Survives Five Products (Google Uses It Too)"
source: "https://www.designsystemscollective.com/the-token-structure-that-survives-five-products-google-uses-it-too-c480e864ef64"
author:
  - "[[Surendar Selvaraj]]"
published: 2026-07-13
created: 2026-07-26
description: "The Token Structure That Survives Five Products (Google Uses It Too) It is the same three-tier system Google runs across Android in Material 3. But the reason to build it changed this year: your …"
tags:
  - topic/デザインシステム/デザイントークン
  - topic/デザインシステム/AI活用
---
## It is the same three-tier system Google runs across Android in Material 3. But the reason to build it changed this year: your design system quietly became an API, and tokens are its type system, the contract every AI agent reads before it touches your UI.

Most design systems don’t fail because the components are wrong. They fail because a single color lives in four hundred places. The structure that fixes that is the same one Google runs in Material 3, and I will walk through it with copy-paste code below.

But first, the shift almost nobody has named yet, because it is the reason this stopped being a styling topic.

For twenty years, a design system was documentation. Something humans read, interpreted, and mostly followed. Its audience was people, and people forgive ambiguity. They fill gaps with judgment.

That era is over. Your design system now has a second reader, and it does not forgive anything. AI agents read your system directly, over open protocols, and they build real UI from what they find. The moment that happened, your design system stopped being a document and became an interface. An API.

And an API without a type system is a liability. That is what most design systems are today: a pile of hex codes wearing friendly names, held together by the collective memory of a team that is about to be outnumbered by machines. This piece is about the type system that fixes it, told with copy-paste code, diagrams you can regenerate yourself, and a claim I will defend all the way down: tokens are no longer styling. They are the contract between your brand and every agent that renders it.

## The problem

Here is how it starts. Innocently.

You ship the first product. A button needs a brand color, so you write it in:

```rb
.button-primary {
  background: #6750A4;
}
```

It works. You move on. A second product reuses the component. A third team forks it “just for now.” Eighteen months later, marketing asks for a small brand refresh, a slightly different blue, and a dark theme while you are at it.

Now that one hex value is sitting, hardcoded, in hundreds of files across several codebases. Nobody knows exactly where. What should be an afternoon becomes a multi-week migration, a spreadsheet of screens, and a QA cycle. The “small refresh” quietly becomes a quarter of work.

The problem, stated plainly: when your components hold raw values, every visual change is a manual hunt. The system has no single place to make a decision, so every decision is made everywhere.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4fZyGHLvw5-WJueMDQmw6Q.png)

## Why one flat layer is not the fix

Most teams reach for tokens at this point, and stop halfway. They create one flat list of named values:

```rb
{
  "blue-600": "#6750A4",
  "button-background": "#6750A4",
  "link-color": "#6750A4"
}
```

This feels like progress. It is not. `button-background` and `link-color` both point straight at a raw value. The names changed. The coupling did not. The moment "primary" needs to become a different blue, you are back to find-and-replace.

The problem was never that you skipped tokens. It is that you used one layer where you needed three.

## The solution: three tiers

Material 3 splits tokens into reference, system, and component. Each tier points at the one below it, and that chain is the entire trick. Here is each layer, with copyable examples in the [W3C Design Tokens format](https://www.designtokens.org/).

## Tier 1: Reference tokens (the raw values)

These describe what a value *is*, never where it is used. This is your palette, your type scale, your spacing ramp, sitting quietly at the bottom.

```rb
{
  "ref": {
    "palette": {
      "primary40":  { "$value": "#6750A4" },
      "primary90":  { "$value": "#EADDFF" },
      "neutral10":  { "$value": "#1C1B1F" }
    }
  }
}
```

Reference tokens never change based on context. `md.ref.palette.primary40` is that hex, everywhere, always.

## Tier 2: System tokens (the semantic roles)

System tokens assign meaning. They say “primary means this reference, right now, in this theme.” They describe a role, not a value. This is where a theme’s character actually lives.

```rb
{
  "sys": {
    "color": {
      "primary":           { "$value": "{ref.palette.primary40}" },
      "primary-container": { "$value": "{ref.palette.primary90}" }
    }
  }
}
```

## Tier 3: Component tokens (the usage)

Component tokens are the last mile. A component asks for a role and the role resolves down the chain. A button never reaches down to a raw hex.

```rb
{
  "comp": {
    "fab": {
      "container": {
        "color": { "$value": "{sys.color.primary-container}" }
      }
    }
  }
}
```

Compiled to CSS custom properties, the whole chain reads cleanly:

```rb
:root {
  --md-ref-palette-primary40:     #6750A4;                         /* raw */
  --md-sys-color-primary:         var(--md-ref-palette-primary40); /* role */
  --md-comp-fab-container-color:  var(--md-sys-color-primary);     /* usage */
}
```

Read it top to bottom and the discipline is obvious: a button does not know what blue is. It knows it wants the “primary” role. The system decides what primary means. The reference layer holds the actual value. Three questions, three answers, cleanly separated.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kLXDV5zTOJQxIbT7zf1xDQ.png)

## Why the chain matters

This is not architecture for its own sake. It is the reason [Dynamic Color](https://m3.material.io/styles/color/dynamic-color/overview) works.

## Get Surendar Selvaraj’s stories in your inbox

Join Medium for free to get updates from this writer.

Because every component token points at a semantic system token rather than a literal reference value, you can swap the system layer and the entire interface re-themes at once, consistently and correctly. Change what “primary” means and every button, every FAB, every accent follows, because none of them were holding the hex code. They were holding a promise the system kept.

That is the payoff you actually want:

- A rebrand becomes a swap at the system layer.
- Dark mode becomes an alternate set of system tokens.
- A new product theme becomes configuration, not a redesign.

You stop migrating and start switching.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*052LUYyTqzw62N-qHC58CA.png)

## Why this matters more now

For years this was a nice-to-have that senior people argued for and everyone else deferred. That changed when agents entered the file.

AI agents now read your design system directly. Through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), a model can pull your real tokens and components, the actual named values, not a guess inferred from a screenshot. When it generates a screen, it can reach for your system tokens the same way your engineers do.

But that only works if your tokens carry meaning. If your system is a flat list of hex codes with pretty names, an agent gets the same brittle result your team gets: output that looks right and is quietly wrong the moment anything changes. A clean, semantic token layer is what makes AI-generated UI correct instead of confidently wrong. The structure that saved you during a rebrand is now the structure that keeps a machine honest.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Og3Mcpl_3ppnGa5z7ZNTdw.png)

## What is coming next

Push this one step further. Right now a single agent reads your system over MCP. Soon you will have several: a design agent, a code agent, a QA agent, coordinating through agent-to-agent protocols like [A2A](https://a2aproject.github.io/A2A/), which now sits alongside MCP under the Linux Foundation’s Agentic AI Foundation.

When multiple agents collaborate on a feature, they need a shared, unambiguous source of truth. That source of truth is your design system, and specifically its tokens. Teams whose systems encode intent, not just values, will hand agents something they can build on. Teams whose systems are a pile of hex codes will hand agents something they can only guess at.

I made the fuller case for this shift in [Your Design System Has Two Users Now, You Only Documented It for One](https://www.designsystemscollective.com/your-design-system-has-two-users-now-you-only-documented-it-for-one-b7ce74f3edea). This piece is the token-level companion to it: the two readers are humans and agents, and tokens are the layer where you finally speak to both in the same language.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*JswrATqe1GUsbqSZSTRDlQ.png)

## The one rule

If you take a single thing from this, take the rule that makes the whole model work:

> ***Components never point at raw values.*** *If a button knows a hex code, the system has already leaked, and every promise above it is void.*

Everything else, the naming conventions, the tiers, the tooling, is in service of that one boundary.

## How to migrate without a big-bang rewrite

You do not need to rebuild everything on Monday. Do it in five moves:

1. **Audit.** Grep your component code for raw hex values (`#[0-9A-Fa-f]{3,6}`). That count is your technical debt, made visible.
2. **Extract primitives.** Pull every raw value into a reference layer. Change nothing else yet.
3. **Add the semantic layer.** Introduce system tokens that point at references. Name them by role: `color-action`, `color-surface`, `color-on-surface`.
4. **Repoint components.** One component at a time, swap raw values for system tokens.
5. **Seal the boundary.** Add a lint rule that fails the build if a component references a primitive or a raw hex directly.

Five products from now, that boundary is the difference between a switch and a migration.

## The bigger shift

Step back from the syntax for a moment.

We spent a decade teaching design systems to speak to humans: guidelines, examples, do’s and don’ts, the soft tissue of a shared craft. That work was never wasted. But it was built on an assumption that just quietly broke: that the reader could think.

Agents cannot fill your gaps with taste. They resolve what you encoded and nothing more. So the quality of your token layer is no longer a matter of engineering hygiene. It is the ceiling on how correctly a machine can express your brand at scale. A semantic token system is you, telling every current and future agent what you meant, in a language it cannot misread.

That is why this is not a styling topic anymore. The teams that win the next few years will not be the ones with the prettiest components. They will be the ones whose intent is legible to both audiences at once, the human and the machine, from a single source of truth. Reference, system, component. Raw value, role, usage. It is a small structure. It is about to carry an enormous amount of weight.

Build it now, while it is still a choice. Soon it will be the difference between a system an agent can build on and a system an agent can only guess at, and the guess will ship to production before anyone notices.

The design system stopped being documentation. Treat it like the API it became.

If your components still hold raw hex today, that is the first thing I would fix this week. What is your token setup, one flat layer or three?