---
title: "Design Tokens Aren’t a Contract"
source: "https://www.designsystemscollective.com/design-tokens-arent-a-contract-ac19e5e3afef"
author:
  - "[[Kevin Muldoon]]"
published: 2026-02-07
created: 2026-04-20
description: "Most design systems treat tokens as the contract. They're not. Learn how to build an enforceable interface layer that prevents brand drift, enables white-label theming, and makes dark mode a configuration switch"
Tags: [topic/デザインシステム/デザイントークン]
---
## [Design Systems Collective](https://www.designsystemscollective.com/?source=post_page---publication_nav-dbd299f90c1d-ac19e5e3afef---------------------------------------)

[![Design Systems Collective](https://miro.medium.com/v2/resize:fill:76:76/1*KfuDI5s2VksG_8pWv0nCFA.jpeg)](https://www.designsystemscollective.com/?source=post_page---post_publication_sidebar-dbd299f90c1d-ac19e5e3afef---------------------------------------)

A welcoming community for designers and developers passionate about scalable, consistent design. Explore articles, insights, and resources to build and refine your design systems. Join us to connect, learn, and shape the future of systematic design together.

## Moving beyond ‘gentleman’s agreements’ toward enforceable design contracts.

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*WOQCH_3RTVWKaS7GTsbsEw.png)

In the summer of 2022, the Index Design System for Dow Jones powered eighteen brands across six platforms. The Wall Street Journal, Barron’s, MarketWatch, and more — on web, native mobile, and email. A single brand like the Journal carried seven sub-brands of its own, each with its own design variations that still had to play by the same rules as the base brand. The mantra was build once, theme anywhere.

Except “theme anywhere” had quietly become an exercise in silent failure.

> Non-members can read this full story for free [**via this link**](https://medium.com/design-systems-collective/why-engineers-can-say-this-is-wrong-and-designers-cant-e6492aded0b3?sk=84380e600726d06d10b92188a714b699). If you enjoy this article, consider [**becoming a Medium member**](https://medium.com/membership) for just $5 a month to support writers directly — or follow for more stories like this.

A brand like Barron’s would introduce a new token — a specific color, a particular spacing value — to solve a real design need. Perfectly reasonable. But MarketWatch wouldn’t have that token. Neither would Mansion Global. And because each brand’s tokens lived in its own file with no shared authority, these small divergences accumulated invisibly.

When our custom Figma plugin reached for a token that didn’t exist in a given brand, it didn’t throw an error. It simply did nothing. A color that should have displayed Barron’s value just kept showing the Journal’s default — no warning, no failure state, no indication that anything was wrong. The system looked fine. It wasn’t.

## The missing layer

A design token is a key-value pair. The key is a name — color.primary.500. The value is what that name resolves to — `#0A5DC2` for one brand, `#1A1A1A` for another. Components point to keys, not values. That indirection is what makes theming possible: swap the values, keep the keys, and every component updates without changing a line of code.

But a key-value pair alone isn’t enough.

In software engineering, there’s a concept old enough to have grandchildren: the *interface*. An interface separates the declaration from the implementation. It declares the keys — their names, their types, their constraints — but never the values. The implementation provides the values. This separation is what makes contracts enforceable: you can validate any implementation against the interface and know, before runtime, whether it fulfills the obligation.

An interface is a promise. It says: I don’t care how you implement this, but you *will* provide these capabilities. It doesn’t contain the logic. It doesn’t contain the values. It contains the *obligation*.

Design systems have the implementations. Every brand’s token file is an implementation — a set of values for a set of keys. What they almost never have is the interface. The independent declaration of *which keys must exist* that every brand must satisfy.

At Dow Jones, we had eighteen brands’ worth of implementations. But implementations of *what*? There was no interface. No document, no schema, no authority that said: *a valid token set for this system MUST include these keys, of these types, with these constraints.* Each brand’s token file was a set of answers — but no one had defined the questions.

Each brand was painting by numbers, but nobody had agreed on the numbered canvas.

In 2019, [Matt Ström argued](https://css-tricks.com/design-apis-the-evolution-of-design-systems/) that design systems were evolving into APIs — that the contract between designers and developers should be formalized the way software APIs formalize communication between systems. He was right about the direction. But the industry took the tooling path — design tokens, Style Dictionary, Figma variables — without building the contract infrastructure that makes an API an API. Six years later, we have better phone books.

And critically, in software, the contract is enforceable. Your compiler screams when you violate it. Your tests fail. Your CI pipeline blocks the merge. The contract isn’t a suggestion; it’s a structural reality with teeth.

Here’s what that looks like when you build it — three interlocking interfaces:

```hs
// The envelope: identity and context
interface SchemaInterface {
  key: string | null;
  name: string;
  brand: string;
  subBrand: string | null;
  mode: string | null;
  meta: SchemaMetaInterface;
  taxonomy: SchemaTaxonomyInterface;
}

// Classification: what kind of token?
interface SchemaMetaInterface {
  class: string | null;
  subclass: string | null;
  key: string | null;
  deprecated: string | null;
  mapped: (string | null)[];
}

// Taxonomy: where does it sit in the system?
interface SchemaTaxonomyInterface {
  domain: string | null;
  category: string | null;
  type: string | null;
  item: string | null;
  variant: string | null;
  subitem: string | null;
  state: string | null;
  context: string | null;
  deprecated: string | null;
}
```

Three layers of obligation. The envelope carries identity — which brand, which mode. The classification identifies what kind of token it is. The taxonomy places it in a nine‑position hierarchy that scales from simple (a palette color needs only a domain, variant, and state) to complex (an editorial typography token might use most of the positions). Each position answers a different question about the token — what it is, how it’s used, which component owns it, what state it’s in — and simple tokens leave most positions null.

The taxonomy itself builds on a lineage of community work — Danny Banks’s original CTI convention, Nathan Curtis’s naming frameworks at EightShapes, and others who recognized that token names carry structural meaning, not just labels. The nine positions extend that thinking into a formal schema.

None of these interfaces contain a value. They contain the shape of the contract. Violate that shape and nothing compiles.

==Design systems, as an industry, have almost entirely skipped this step. We jump straight from “here are my tokens” to “here are my components” without ever formally declaring the contract between them. The tokens== ==*are*== ==the contract in most systems. That’s like writing your interface and your implementation in the same class and calling it architecture.==

If you’re running a single-brand system, this might sound like overkill. Fair enough — don’t build what you don’t need yet is sound engineering. But even a single-brand system has modes: dark mode, high contrast, compact density, responsive breakpoints. The moment you have two modes of anything, you have two implementations that need to satisfy the same interface. You just don’t call it that yet. Modes are brands you haven’t named. And the contract layer is dramatically cheaper to build early than to retrofit after hundreds of tokens have accumulated without one — which is exactly the situation I inherited at Dow Jones.

When there’s no explicit contract, compliance becomes invisible. You can’t test whether a new brand satisfies the system because the system has no independently defined shape. You can’t audit, you can’t validate, you can’t automate. You have a gentleman’s agreement that degrades silently until the day it doesn’t.

## Building the contract

At Dow Jones, I built the missing layer.

It began as a manifest embedded in Style Dictionary — a declaration of every token a valid brand must provide, with types, constraints, and relationships. If a brand’s token set didn’t satisfy the manifest, the pipeline caught it.

But I quickly ran into a limitation. The contract was trapped inside an implementation tool. Style Dictionary is a build pipeline, not an authority. Embedding the contract there meant only consumers of that tool could reference it. Figma plugins couldn’t see it. Documentation tools couldn’t validate against it. The contract existed, but it wasn’t accessible.

So I migrated the manifest to a database and published it as an API.

The manifest grew to over five hundred entries spanning color, typography, dimension, elevation, and overlay — each conforming to the three‑layer contract shown above. That number sounds large until you see the breakdown: 222 of those entries were palette colors alone — thirty semantic ramps, each with up to twenty-two weight stops, that every brand was obligated to fill. It’s not bloat. It’s combinatorial reality. When a tool queried the API for a given token, it got back the shape of the obligation — not a value:

```hs
{
  "domain": "idx",
  "class": "color",
  "subclass": "palette",
  "variant": "primary",
  "state": "500",
  "key": "PRIMARY500",
  "Last Modified": "2024-12-10T19:12:16.000Z"
}
```

No value. No hex code. Just the shape of the obligation: every brand must provide a primary palette color at the 500 weight. What that color *is* — that’s the brand’s decision. That it *exists* — that’s the contract.

You’ll also notice there’s no assembled token name — no `idx-palette-primary-500`. The taxonomy positions *are* the semantic identity. Consuming applications assemble the name in whatever convention they require: hyphenated for CSS, camelCase for iOS, dotted for Style Dictionary. Same contract, different outputs. Even the naming convention is an implementation detail the contract correctly abstracts away.

Entries also carried deprecation references and timestamped descriptions, turning the manifest into a living record of design decisions — not just what exists, but what changed and why.

Now every tool in the ecosystem — Figma plugins, token pipelines, documentation generators, validation scripts — could query the same source of truth. An auditor in the build pipeline compared each brand’s token set against the manifest, catching unknowns and flagging missing entries before they reached production.

The effects were immediate. Brand drift stopped. Proposing a new token now forced a higher‑quality conversation. You couldn’t just add it to one brand and move on; you had to justify it against every brand that would need to implement it. The contract became a design review embedded in the architecture.

And something unexpected happened: brands gained *more* creative freedom, not less. Before the manifest, brands were theoretically free but practically trapped. Any deviation risked silently breaking theme‑swapping across the system. After the manifest, brands had real latitude inside a structure that guaranteed interoperability.

The constraints were liberating precisely because they were explicit.

I’m not the only one who arrived at this architecture. James Nash, co‑author of the [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) format specification, independently proposed formalizing this idea as a *design token interface* — tokens with names, types, and metadata, but no values. At Investec, his team built validation tooling around the same principle. Nash came at it from the standards side; I came at it from the enterprise side. That convergence suggests this isn’t taste or methodology — it’s a structural necessity the industry keeps rediscovering because its absence keeps producing the same failures.

It’s worth noting what the W3C Design Tokens Community Group specification does and doesn’t do. The DTCG format standardizes how tokens are *expressed* — their syntax, their types, their structure in a file. That’s necessary work, and it’s advancing — but it’s not yet complete. And even when it is, expression is not obligation. A format tells you how to write a token; it doesn’t tell you which tokens must exist. The contract layer described here is complementary to the DTCG spec, not competitive with it. It sits one level above: the spec gives you the grammar, the contract gives you the vocabulary list every brand must complete.

Which means: don’t wait. No specification will ever tell your organization which tokens your brands require — that’s inherently local knowledge that only your team can formalize. The contract is yours to define. Build it now, adopt the DTCG format when it stabilizes, and you’ll be ahead of both the spec and the industry.

## How to build this

The contract unlocks specific capabilities that most design systems claim but can’t verify. White‑label theming — proving that a generic component library can express any brand in your portfolio. Dark mode — not as a six‑month project, but as a configuration switch, because every brand already declares values for both modes against the same interface. Sub‑brand overrides — scoping token variations for a brand’s editorial products or regional editions without breaking the base contract. Platform expansion — knowing, before you start building for a new platform, exactly which obligations that platform’s tokens must satisfy.

These aren’t theoretical benefits. They’re the difference between answering “does our system support white‑labeling?” with *I think so* and answering with *yes, and here’s the validation log that proves it.*

Here’s how.

**Define the contract independently.** Create an explicit manifest that declares what a valid token set must contain — not the values, but the obligations. Treat every entry as a decision record: who proposed the token, when it was accepted, why it was needed, which brands must implement it. A contract without provenance is just a schema. A contract with provenance is an auditable design history.

**Publish it as an API.** Not a spreadsheet. Not a Confluence page. An addressable, machine‑readable source of truth every tool in your ecosystem can query. This doesn’t require custom infrastructure — Airtable, Notion databases, even a versioned JSON file in a repository can serve as the backbone. If you’re unsure how to structure it, describe your contract to an LLM and ask it to generate the schema. The barrier is lower than you think.

**Enforce it early.** Wire validation into the earliest point in your pipeline — the Figma plugin that exports tokens, the Style Dictionary build, a pre‑commit hook. Don’t wait for production to discover a missing token. Generate a failure log that names exactly what’s missing, from which brand, against which version of the contract. A contract nobody validates is just documentation.

Without this discipline, you’re building on consensus, and consensus drifts. Tokens exist in one brand but not another. “Works on my brand” becomes a debugging category. Dark mode becomes a roadmap item instead of a toggle. White‑labeling becomes a theoretical capability nobody can verify. Manual audits become rituals no one runs and everyone dreads.

With the contract, you get automated quality control, provable brand compliance, auditable decision history, and the confidence to say *yes, our system supports that* — and mean it.

## Essential complexity

[Frederick Brooks](https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf) once distinguished between *essential complexity* — the inherent difficulty of the problem — and *accidental complexity* — the mess we introduce with our tools.

The design systems community spends most of its energy on accidental complexity: tools, files, workflows.

The essential complexity is this: how do you express a coherent set of design decisions in a form that can be consumed by any implementation, on any platform, and remain provably consistent across all of them?

That’s a contract problem.

And it requires a contract.

## References

1. Matt Ström, “ [Design APIs: the Evolution of Design Systems](https://css-tricks.com/design-apis-the-evolution-of-design-systems/),” CSS-Tricks, 2019.
2. James Nash, “The Future of Design Tokens,” [The Future of Design Systems Conference](https://intodesignsystems.gumroad.com/l/wzkix), May 2022. Nash is a format editor for the [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/).
3. Frederick P. Brooks Jr., “ [No Silver Bullet — Essence and Accident in Software Engineering](https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf),” 1986.