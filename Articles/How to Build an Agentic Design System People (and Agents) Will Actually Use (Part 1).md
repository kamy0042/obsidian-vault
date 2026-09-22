---
title: "How to Build an Agentic Design System People (and Agents) Will Actually Use (Part 1)"
source: "https://medium.com/manychat-engineering/how-to-build-an-agentic-design-system-people-and-agents-will-actually-use-part-1-1b08abca90bd"
author:
  - "[[Thành Đỗ Long]]"
published: 2026-06-10
created: 2026-07-26
description: "On building Manychat’s design system in ten working days, and why those days were even possible."
tags:
  - topic/デザインシステム/AI活用
  - topic/デザインシステム/デザイントークン
  - topic/デザインシステム/導入事例
---
## On building Manychat’s design system in ten working days, and why those days were even possible.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*G3n0yKbwZ1Jk2SpfASTG8w.png)

Most design systems don’t fail by being wrong. They fail by multiplying.

When Manychat shifted mobile-first, we needed a design system that worked across all three platforms. We had one — mature, well-maintained, living on the web. But mobile had never adopted it. So each platform did what made sense locally: iOS added its own semantics, Android added its own, web shipped its own names. We’d been building parallel design systems — none of them quite agreeing on what subtle text or warning yellow actually meant.

Hello 👋 — my name is [Thanh](https://www.linkedin.com/in/thanhdolong), an iOS Engineer at [Manychat](https://careers.manychat.com/team/engineering). This series is about what we did about it: building our agentic design system which works across all the platforms. Just in 10 working days.

This is the first chapter focusing on what a solid design system should have in its foundation and how we rebuilt it to be AI-driven. If you finish it and you’re not slightly curious how AI can change the way you build — I failed 😔.

## A design system is a shared language

A design system isn’t a component library, a Figma file, or even tokens in the abstract. It’s an agreement — a shared language between design and engineering for what the product should look like, feel like, and behave like, written in a form both sides can read, write, and hold each other to. Tokens encode the agreement: *Link*, *Danger*, *Surface*, *Subtle*. Not the same hex, but the same meaning.

Without that language, a codebase isn’t a system — it’s a collection of coincidences that happen to look like one. Engineers re-derive every spacing decision from scratch. Dark mode becomes a parallel product maintained by guesswork. New engineers spend their first week learning which color belongs where, knowledge that lives in tribal memory rather than documentation. Designers feel it from the other side: they invest in a Figma system and engineering ships something close. Nobody’s fault — there’s just no vocabulary to hold either side accountable.

Users notice eventually, not as bugs but as wobble — spacing that almost matches, colors that almost pair, a dark mode that almost works.

The question isn’t whether you need a design system. It’s how you build one that actually fits into the development flow instead of sitting next to it. Here’s what worked for us.

## Do tokens before components

Most design systems start where they can ship: buttons, inputs, cards. That’s how we started too.

Brad Frost’s [Atomic Design](https://atomicdesign.bradfrost.com/) borrows directly from chemistry — atoms (button, input, label) bond into molecules, molecules into organisms, then templates, then pages. Simple, stable things combine into complex, situational ones.

Frost himself [extended the model downward](https://bradfrost.com/blog/post/design-tokens-atomic-design-%E2%9D%A4%EF%B8%8F/), treating tokens as the *sub-atomic* layer beneath atoms — the particles, and the rules atoms are made of. We use the same framing.

Sub-atoms are the raw decisions every atom is built from: color, spacing, radius, shadow, motion, typography. Other teams call them tokens. Either way, users don’t see them. Users see what they make possible.

Think of it like a food pyramid: what’s at the base supports everything above.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*inRSQgwkbs-i34kBmrQOdQ.png)

Skip them, and components rest on quicksand. A “primary button” isn’t a stable concept if “primary” doesn’t resolve to a specific background, a specific radius, a specific spacing rhythm, or a specific shadow language. Without those, every primary button in the codebase is a small re-derivation. The next brand refresh will break every component that never agreed on what “primary” meant.

Start with components, and you’ll rewrite them. Start with sub-atoms, and you’ll build on something that holds.

## Name tokens by intent

Token names have nouns but no verbs — they describe a value, not an intent. I once found *blue300* in our iOS codebase used as a text color, a button background, an icon tint, a tab indicator, and a border stroke — all in files written by different people, technically valid against the palette, none of them intentionally chosen against a shared rule. It was even worse: *neutral100* had more than a hundred uses across the same codebase, working as disabled backgrounds, card surfaces, separators, chip fills, divider lines. *One gray, five intentions.*

The fix is a semantic layer. We built a three-layer architecture:

- **Core** — raw values. Eleven color families, scales from s0 to *s900*. Platform-agnostic, defined once, and referenced everywhere — with no product opinion baked in
- **Semantic** — intent-based tokens, organized into five categories: *text*, *icon*, *background*, *border*, *shimmer*. Semantic tokens are named using patterns such as *text.brand*, *background.warningDefault*, *icon.danger*. Each token resolves to different core values depending on context — light mode, dark mode, high contrast, brand variant.
- **Component** — names scoped to specific components. *button.primaryBackground* maps to a semantic background.

The layers talk in one direction: component → semantic → core. The payoff is change isolation. Need to update a brand color? Adjust core; everything downstream follows. Need a high-contrast accessibility mode? Remap semantics. White-label the product? Swap the semantic resolution. None of it requires touching the components that consume the tokens.

The categories themselves do enforcement work. If a token lives under text, it can only be used for text. If an engineer reaches for background.brand to color an icon, the name itself signals the mistake — before any linter, review, or designer catches it. Naming by intent turns the taxonomy into a guardrail.

## Start where it hurts

Don’t try to define everything at once. For us, the categories that hurt most were color and spacing — the most visible sources of inconsistency.

Your starting point might be different — typography, elevation, something product-specific. It doesn’t matter. A small system that works beats a large one that’s half-finished

## Build with AI in mind, and expect everything to change

By the time you read this, half of this is already different.  
AI changes two things at once: the tools you use to build a design system, and the requirements the system itself has to meet. Structure and semantic clarity — everything we covered above — matter more when AI is in the loop. An AI agent reads your system more literally than a person does. If there are some gaps, a person fills them with intuition; an agent fills them with whatever fits the pattern — including the flawed ones.

For months we’d been building the first version of the design system the classic way: multi-week negotiations on what subtle text should mean, designer-engineer back-and-forth on dark-mode pairings, reviewed screen by screen. That process gave us the right foundation — semantic layers, tokens, atoms, a shared language. But the structure wasn’t designed for AI to read. So we restarted from scratch to make it AI-driven.

What we ended up building is close to what the 2026 design-systems community has started calling an *agentic design system*. Thanks to AI, in just ten days we could structurally encode the foundation we had as machine-readable infrastructure rather than static, human-oriented documentation. The result is **Manyfest Design System**: one Figma file and repository for all platforms — web, iOS, Android — built to be read by both humans and AI agents.

Just as the classic process taught us how to lay the foundation, the AI-first rebuild taught us what that foundation needs to support.

**One: design intent has to be explicit  
**Designers and engineers bring years of product context to every decision. AI doesn’t — not yet. So the token structure has to carry that context instead.  
Our schema adopts the [W3C Design Tokens Community Group](https://www.designtokens.org/) standard, which has become the industry baseline. The standard provides the what: value, type, and description. We added the *intent* block to capture the *why*. This is what the community now calls **token intent metadata** — the structured rules about usage and pairings that transform a token from a simple hex string into something an AI agent can actually reason over.

So in Manyfest, every token carries metadata about *why.* It’s a hex string plus the role it plays, the surfaces it’s allowed on, and the contrast guarantees it carries.

```c
// illustrative — actual schema is still being formalized
{
  "color.background.warning": {
    "$value": "{color.core.yellow.500}",
    "$type": "color",
    "$description": "Surface tone for non-blocking warning states",
    "$intent": {
      "useFor": ["banners", "inline alerts", "form-field warnings"],
      "doNotUseFor": ["error states", "destructive actions", "icon foregrounds"],
      "pairsWith": ["text.warning", "icon.warning", "border.warning"]
    }
  }
}
```

The metadata isn’t decoration. It’s the difference between an AI agent getting the token right by guessing, and getting it right because the token told it.

### Two: reviews stop being only between humans

Designers and engineers used to review each other in PRs and Figma threads. Now there’s a third reader.

We have a shared skill ([figma-component-review](https://gist.github.com/thanhdolong/229d2fa226b45e878571ec0f1e35ba62)) that takes a Figma URL, parses the file, pulls the design variables and the component context, scans the matching package code in the design-system repo, and writes back a categorized list of questions: *for the designer* (intent ambiguity, missing variants, accessibility gaps) and *for the engineer* (token mismatch, naming drift, component reuse opportunities). The questions land as comments on the Figma node, where the designer is already working.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*U3Jk4lcErA2WyMMw0r_eSQ.png)

The point isn’t to replace the design review. It’s to surface the same questions earlier — the ones both sides would otherwise hit three weeks later, in a PR. That’s only possible because the system has structure: semantic tokens, named intent, atomic hierarchy. Give the skill a flat palette and it has nothing to compare against.

### Three: AI catches mistakes humans miss

Not by writing code. By reading it.

We have AI in the loop on every PR: descriptions auto-written from the diff in the template, Conventional Commit titles normalized, contextual labels applied (accessibility, performance, migration), a split gate that blocks merges over 1,000 lines. It takes a whole category of small mistakes off the team’s plate.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GLHbJcqe0lKQTp1oCahUOA.png)

This is an example of the PR from the template we give AI to fill the PR. The full version you can find here.

The real value shows up in smaller moments. While setting up Manyfest’s iOS skill — the file that tells AI agents how to scaffold a new component — an AI reviewer caught three mistakes:

- a cyclic dependency I’d introduced in a preview helper;
- a scope error that made an internal helper accidentally public;
- three doc references pointing to a file I’d renamed two PRs earlier.

AI wasn’t writing my code, it was catching my mistakes — and that’s the version of AI-driven engineering I trust.

### Four: don’t let AI decide, let it accelerate

AI isn’t magic, at least not at the moment I’m writing this. It hallucinates with confidence. It invents APIs that don’t exist, writes code that compiles and quietly does another thing. Check the screenshot below: at one point our skill description randomly slipped into another language for no apparent reason. Because why not, I guess.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CaTQHtxnYtnUeTuS3I-BCA.png)

Treat it like a senior teammate — sharp, fast, sometimes too confident. Brief it carefully. Read its work. Push back when it’s wrong. It implements faster than you can but it doesn’t decide better than you can. The judgment stays yours.

## The receipts

Ten working days — that’s how long it took to ship the AI-driven version of the design system. The classic version, the one we restarted from, had taken months. But the ten days became possible because we already had these months without AI, finding the right approach.

The system isn’t done yet. What’s done is the foundation: Manyfest in Figma is the source of truth, and everything defined there translates automatically into the format each platform speaks — twenty-three components, ready to wire in on every change.

Building a design system that AI can read pays off immediately: a designer can start prototyping by dropping a Figma file into Claude with the [Figma MCP](https://help.figma.com/hc/en-us/articles/32132100833559) installed. What used to take a sprint takes a day.

*Chapter 2 is coming next with more on building an AI-driven design system and the skills we developed along the way.*