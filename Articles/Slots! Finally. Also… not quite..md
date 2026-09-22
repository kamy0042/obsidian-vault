---
title: "Slots! Finally. Also… not quite."
source: "https://medium.com/@kshitij.tembe/slots-finally-also-not-quite-e15816510c42"
author:
  - "[[Kshitij Tembe]]"
published: 2026-05-18
created: 2026-07-26
description: "More"
tags:
  - topic/ツール/Figma
  - topic/デザインシステム/コンポーネント設計
---
![](https://miro.medium.com/v2/resize:fit:3840/format:webp/1*HoW6v0S1xxiWpbP3K9Q3ng.png)

Flexible. Composable. Ungoverned.

*A month and a half in, 5 challenges that the hot takes didn’t cover.*

**Instance Swap** felt like Figma’s stepping stone to native Slots. When Slots *finally* arrived, I expected to replace my workarounds with a native offering.

Turns out, I am already working on new ones.

I have spent month and a half with native Slots. Not theorising about it, but actually using it. While the community is already surfacing real problems on the Figma Community Forum, most of the conversation is stuck at the bug report level. The friction I ran into goes deeper.

## 1\. Closer to Code, Harder to Use

For years, design system teams who wanted slot-like behaviour built their own version of it. The go-to method was the **Instance Swap** prop. You would expose an instance swap prop on a component, set your preferred instance if needed, and that was it.

The experience for a user was simple:

*Open the prop panel → pick a component from the dropdown → slot it in.*

![](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*dAFjcnMz9q2U-0JOipC44A.png)

Set it up once, expose it, and you were done.

It was clean and discoverable. The system defined the boundaries and the designer made choices within those boundaries.

To be fair, Instance Swap was never how engineers worked. Engineers don’t pick children from a dropdown, they compose directly by nesting components. The props panel was a designer’s *abstraction.* It didn’t mirror code, but it gave designers a way to think about composition that made sense on their terms.

If Instance Swap was a stepping stone toward native Slots, the transition should have felt like a natural evolution. It didn’t.

With native Slots, the props panel doesn’t disappear, but the workflow has fundamentally changed. What used to be a single interaction (pick from a dropdown on the right) is now a two-step model. You compose on the canvas by dragging content into the slot’s pink-bordered area, then you manage and adjust that composition through the layers panel on the left.

![](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*yYFyO2isMfbzlk7slq4sUg.png)

Same job. Three panels. And the right panel just says “Modified” and calls it a day.

Slots introduced composition inside instances for the first time, which is a genuinely new capability. But managing slotted content, selecting nested items, and reordering them now routes through the layers panel. Previously, the layers panel was purely navigational. The fact that it has picked up management responsibilities muddies the experience. This is a massive shift that every designer who has ever used a prop-based slot must now relearn.

## 2\. The Migration Is a Rebuild, Not an Upgrade

Replacing Instance Swap slots with Figma Slots is a breaking change. Any existing composition a designer has built on top of an Instance Swap slot will need to be rebuilt.

Figma provides a [migration guide](https://help.figma.com/hc/en-us/articles/38607529833751-Migrate-a-library-to-using-slots), but reading it makes the scale of the problem clearer, not smaller. For teams using variant-based slot placeholders, Figma’s own recommendation is to rebuild the asset from scratch because the instance swap property and variant logic disappear during conversion.

The documentation states it plainly: existing slot swap bindings will break, instances won’t auto-update, and designer overrides won’t carry over. For the simpler placeholder component pattern, each parent component still needs to be individually edited, the shared placeholder deprecated, and the changes published and communicated to the team.

That’s not an upgrade path. That’s a migration event where the plan is “rebuild everything and tell your team the old stuff is deprecated.”

This is exactly the kind of transition that needs proper deprecation tooling. I’ve previously presented a concept called **Deprecation Mode**, a visual indicator system that lets designers toggle a view of what’s deprecated and swap at their own pace. Figma’s migration guide is a document, but what teams actually need is a workflow.

Deprecation Mode. A concept I presented for handling exactly this kind of transition.

## 3\. The Right Panel Stopped Being the Source of Truth

When you nest a component inside a Figma Slot, **you lose direct access to its properties from the parent context**. To reach the props of a nested component, you have to go into the layers panel, select it specifically, and interact with it from there.

For years, the right panel has been the single source of truth for how a component behaves: properties, variants, and text overrides. Slots fracture that. Now, some decisions live in the right panel and some live in the layers panel, depending on whether something is inside a slot or not.

![](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*kpxoQPhrpNO_0mDJMOM2iA.png)

Same card. One side tells you everything. The other side tells you to go find it yourself.

In practice, a designer grabs a card component and sees some properties on the right, like a variant toggle or text override. But if the contents inside that card is in a Slot, its properties are invisible unless the designer knows to look in the layers panel. Consequently, they either miss the property entirely, detach the instance to get at it, or build a workaround.

The component no longer tells you what it can do just by selecting it. You have to already know how it’s built to use it correctly. This disorientation leads to the exact patterns Slots were supposed to replace: detached instances and manual overrides. It also makes documentation and onboarding harder. You can no longer screenshot the right panel to show *everything* a component does.

## 4\. The Moment I Stopped Giving Slots the Benefit of the Doubt

If a component inside a Slot has variant properties that respond to context (such as viewport), the slotted component will not respect changes to the parent automatically. It requires manual intervention.

While this was also true with makeshift slots, the path to the fix is now through the layers panel rather than the props panel, which is less intuitive for a configuration issue.

This broke for me while building a composable tile/card component. I created a base with exposed slots and dedicated composed variants for different viewports: Desktop/Tablet and Mobile. This is a standard use case for cards with breakpoints.

I set up both variants with their authored compositions and dropped an instance. I started on mobile and performed the most basic interaction a designer has: a copy update to a text string inside one of the slotted components. Then, I switched the viewport to desktop.

**The desktop composition was gone.**

Changed a headline. Lost a layout.

My mobile slot content, text edit and all, had carried over. The desktop layout I authored inside the component was completely ignored.

Any interaction with slot content in one variant, no matter how small, permanently overrides the authored composition in every other variant. Figma treats everything inside a slot as an override. The moment a designer touches anything, the component’s own variant definitions for that slot stop existing for that instance.

Many teams are [reporting](https://forum.figma.com/suggest-a-feature-11/overriding-one-element-inside-a-slot-marks-the-entire-slot-as-overridden-51686) this on the Figma forum. When asked, Figma support confirmed this is expected behaviour: *“Any edit made to an instance’s slot will cause that slot to diverge from the backing component’s slot.”*

This means you cannot have variant-specific slot compositions that survive first contact with a user. The “default content” you set up per variant is merely a suggestion that lasts until someone uses the component. After that, it is overrides all the way down.

## 5\. Composition Without Governance

From an architect’s perspective, the frustrations are structural.

First, you cannot change the direction of a slot. If you need a slot to flow horizontally instead of vertically, you have to add another auto layout wrapper. You are working around the feature rather than with it.

Second, you cannot set a strict limit on how many nested instances can live inside a slot. While you can specify preferred instances, there is no hard cap. Someone can drop fifteen items into a slot designed for three, and the component will simply stretch to accommodate them.

These are not just feature gaps; they point to a fundamental issue. The promise of a design system is managed flexibility: freedom within boundaries. Instance Swap did this naturally because the dropdown showed exactly what was allowed.

Slots, as they exist today, provide composition without governance. There are no hard caps and no way to constrain what gets dropped in. Composition without guardrails is how systems start to decay quietly, through a thousand small decisions that nobody questioned because nothing stopped them. For anyone responsible for the integrity of a design system, that is a nightmare.

## Here’s What I Actually Think

When Figma introduced Modes through Variables, the shift from Styles was significant but it made sense. Variables solved real problems that Styles structurally couldn’t, and the migration path, while tedious, was logical. The benefit and the unlock were genuinely transformative.

Slots don’t feel like that *yet*.

I spent over a month trying to make them work with real components and real patience. What I found is a feature that doesn’t hold up to the most basic test a design system can throw at it: a card with two breakpoints.

The community is finding the same issues: [hover states lost inside Slots](https://forum.figma.com/report-a-problem-6/some-elements-in-a-slot-do-not-show-hover-state-in-prototype-preview-52191), [fill values not being respected](https://forum.figma.com/report-a-problem-6/slots-don-t-respect-nested-component-s-fill-values-51776), [components flickering](https://forum.figma.com/report-a-problem-6/fix-slots-52242), and a [total lack of grid layout support inside Slots](https://forum.figma.com/suggest-a-feature-11/will-the-grid-layout-be-available-within-the-new-figma-slots-before-the-end-of-the-beta-51735). Teams are returning to old workarounds because native Slots aren’t reliable enough to replace them.

Figma’s support team is logging these as feedback. That’s not a launch, that’s a proof of concept.

My honest take: Don’t rearchitect your library for Slots. Not until variant compositions are respected. Not until governance tools exist. Not until a copy edit in one variant stops destroying your layouts in every other variant.

I will keep building with Slots and pushing on where they break, but I am not restructuring a system around them until the foundation feels finished.

*The views, opinions and work expressed in this article are solely my own and do not reflect or represent the views of my current or former employers.*