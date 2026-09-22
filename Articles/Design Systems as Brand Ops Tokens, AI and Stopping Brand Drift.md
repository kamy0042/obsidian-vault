---
title: "Design Systems as Brand Ops: Tokens, AI and Stopping Brand Drift"
source: "https://medium.com/by-human-hand/design-systems-as-brand-ops-tokens-ai-and-stopping-brand-drift-0d11805042e8"
author:
  - "[[Jeremy Graham-Cumming]]"
published: 2026-03-03
created: 2026-07-26
description: "How the DTCG specification, agentic AI and proper decision rights turn your design system from a component library into brand infrastructure."
tags:
  - topic/デザインシステム/デザイントークン
  - topic/デザインシステム/戦略・ガバナンス
  - topic/デザインシステム/AI活用
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2YdDtYfI-kkmqd3WntqHNA.jpeg)

Design Systems as Brand Ops: Tokens, AI and Stopping Brand Drift

## How the DTCG specification, agentic AI and proper decision rights turn your design system from a component library into brand infrastructure.

***Pressed for time? Here’s the TL;DR;***

> Design tokens are no longer a styling convenience — they’re governance infrastructure encoding brand rules, accessibility compliance and risk controls into every pixel your organisation ships.
> 
> The Design Tokens Community Group (DTCG) specification hit its first stable release in October 2025, giving enterprises a vendor-neutral standard for multi-brand, cross-platform token management.
> 
> Agentic AI wired into Continuous Integration/Continuous Delivery (CI/CD) pipelines can detect brand drift before code reaches production, turning reactive audits into pre-deploy checkpoints.

## Your Brand Is a Codebase (Whether You Like It or Not)

Most enterprises treat their design system as a component library with nice documentation. That’s a bit like treating your chart of accounts as a spreadsheet with nice formatting — perfectly adequate until someone asks where the money went, at which point you discover that “nice formatting” wasn’t really the point.

Design tokens, the small, standardised values defining colour, spacing, typography and motion, have quietly become legal-adjacent artefacts. They don’t merely control whether your buttons are cerulean or navy; they encode accessibility compliance, brand fidelity across jurisdictions and contractual consistency for partner portals. When the European Accessibility Act carries actual penalties and Target’s accessibility settlement topped $6 million (back in 2008, and the precedent still bites), a misapplied contrast token stops being a minor design quibble and becomes a quantifiable risk event. The sort that turns up in board papers, which is never a good sign.

A Forrester Total Economic Impact study commissioned by Figma found that mature design workflows delivered a 34% increase in design efficiency and significant time-to-market improvements. The question has moved on from whether tokens matter to who actually governs them — and whether they know they’re supposed to.

## A Standard Arrives (Finally)

For years, every design system team invented its own token format, which is exactly as sustainable as it sounds. In October 2025, the DTCG, a W3C (World Wide Web Consortium) community group, released version 2025.10 — the first stable, vendor-neutral specification. It introduces theming, multi-brand support, modern colour spaces including Display P3 and OKLCH, and rich token relationships through inheritance and aliasing. In other words, all the fiddly bits that enterprises running multiple brands across multiple platforms have been bodging together with JSON files and crossed fingers.

Standardisation means tokens become a universal language. The same file generates CSS variables, Swift code and Android XML, keeping brand DNA intact whether it’s rendered in a browser, a native app or a third-party partner portal that really should have been updated in 2023. For multi-brand enterprises, one core set of primitives intelligently overridden per brand replaces the old pattern of duplicated, drifting libraries maintained by people who’ve long since left the company.

## Who Owns the Tokens?

Supernova’s State of Design Tokens 2024 report found that 85.8% of token governance sits with design teams, whilst developers own tokens in just 9.9% of cases. This might sound reasonable until you learn that roughly 63% of organisations don’t version their tokens at all, and 44% still synchronise design-to-code manually. Which is to say: by email, Slack messages and the occasional despairing shout across the office.

This isn’t a missing-tool problem, it’s a missing-rulebook problem. Ask three questions. Who has the authority to approve a new brand value, a sub-brand variant, or a market-specific exception? How do teams request changes, through a central brand ops function, through their own leads, or through whatever hybrid has evolved by accident? And where is the audit trail, because if the answer is “someone’s email” then you don’t have one. Organisations that run this well, Zalando and GOV.UK among them, share one trait: they make it easy to get a fast “yes.” Without that, teams will route around your brand system the same way they route around any slow process. Quietly, and without telling you.

## Agentic AI: The Pre-Deploy Brand Auditor

The most interesting shift in 2026 is the move from reactive drift detection to pre-deploy prevention using agentic AI. High-performing teams now deploy AI agents that scan design files and component libraries before anything ships, catching brand violations that used to slip through until someone spotted them three months later in a customer email.

These agents check the tedious things humans miss: whether a button references brand-primary or someone’s best guess at the approved blue, whether spacing follows the grid or contrast ratios meet Web Content Accessibility Guidelines (WCAG) standards. As one design ops lead put it, the main issue isn’t creating the design system, it’s ensuring it stays consistent when tokens shift, colours vary and everyone develops their own interpretation of the brand.

As CIO.com noted in February 2026, agentic systems don’t fail suddenly, they drift over time. The same applies to design systems. Left unchecked, you don’t get a catastrophic failure, you get six months of accumulated inconsistencies discovered during a brand audit, usually the week before a major launch. Wire AI agents alongside automated accessibility checks and you get continuous brand compliance baked into the design process rather than bolted on afterwards with panic and overtime.

## The Precedent Is Older Than You Think

The anxiety around systematising brand identity is nothing new. When Chermayeff & Geismar designed the Chase Manhattan logo in 1960, it came with one of the first comprehensive corporate identity manuals: hundreds of pages specifying exact usage rules for every application from letterheads to building signage. The goal then was the same as now — stop drift at scale. The difference is that in 1960, the manual sat on a shelf. In 2026, it sits in a CI/CD pipeline.

## But Isn’t This Just Bureaucracy in a Hoodie?

Fair objection. Governance has a brand problem, largely because most people’s experience of it involves committees, forms and waiting three weeks to change a button colour.

But the evidence runs the other way. Industry estimates suggest well-governed design systems cut 20–40% of development costs through reduced duplication, with figures varying by organisation size and maturity. According to the 2021 Design Systems Survey, only about 40% of design systems are considered successful by their own teams. Most fail from neglect and drift, not from excessive process. They become the repository everyone points to in meetings but nobody actually uses.

Like that gym membership you’re definitely going to use next month. If your design system still lives in a Figma library and a prayer, it might be time to treat tokens as what they actually are: the operating code of your brand.

**Connect with me on LinkedIn to explore how I can support you as a Fractional CTO, leadership advisor, or AI and digital strategy partner:** [**https://www.linkedin.com/in/jeremygc/**](https://www.linkedin.com/in/jeremygc/)