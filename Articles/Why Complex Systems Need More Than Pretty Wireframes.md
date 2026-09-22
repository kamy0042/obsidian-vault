---
title: "Why Complex Systems Need More Than Pretty Wireframes"
source: "https://medium.com/@chawsuhlaingc7/why-complex-systems-need-more-than-pretty-wireframes-b2440aa633f4"
author:
  - "[[Chaw Su Hlaing]]"
published: 2026-01-08
created: 2026-07-26
description: "More"
tags:
  - topic/デザイン/UIデザイン
  - topic/AI
---
*How AI-driven interactive prototypes help us design, validate, and ship better products*

## The Meeting That Went Too Well

Here’s a scenario that happens more often than we’d like to admit.

I was designing a booking system for the Porsche Experience Center. My wireframes looked great in the stakeholder review. I showed three clean screens:

- **Screen A** — Booking with items listed, total shows $500
- **Screen B** — User removes an item
- **Screen C** — Updated total shows $350

Everyone nodded. Everyone approved. Meeting done.

Then developers started building it.

**“When items get removed, how should the total update?”**

- Does it recalculate instantly or when they click “update”?
- What if they remove multiple items quickly?
- Does the old total show while calculating, or disappear?

**“What happens to payments already made?”**

- The customer paid $500, then removed $150 worth of items
- Do we automatically refund $150, or hold it as credit?
- If they paid with multiple cards, which one gets refunded?
- Is this automatic, or does someone approve it?

**“Which number is correct when staff and customers view the same booking?”**

- Customer removes item at 2:00 PM, sees $350
- Staff opens the same booking at 2:00 PM, and still sees $500
- Customer calls: “Why does it still show $500?”
- Which is the truth?

My beautifully annotated Figma file went silent.

Here’s what I realized: my wireframes were like showing three photos:

- car parked,
- car driving,
- car parked elsewhere.

But they didn’t show how the car started, what route it took, or what happens if two people try to drive it at once.

> **Static screens show outcomes, not behavior.**

And behavior is where systems break.

## Why Everyone Approved Wireframes That Didn’t Work

The stakeholders in that meeting weren’t careless. They were doing mental math we shouldn’t have asked them to do.

When looking at my three screens, their brains had to:

- Remember what was on Screen A while looking at Screen C
- Imagine the calculation happening between screens
- Track what should happen in edge cases
- Keep all of this in their heads while discussing five other features

**We were asking them to mentally simulate a computer system.**

Think about learning to ride a bike. You can look at photos of someone riding and think, “I understand this.” But until you actually feel the balance, the speed, the moment when you start to tip — you don’t really know how it works.

The same thing happened with our booking system. Looking at the screens, everyone *thought* they understood. But the actual behavior — the timing, the rules, the edge cases — only became clear when developers tried to build it.

This is why projects that “looked perfect in design reviews” end up with so many change requests during development.

## Where Even Simple Features Get Complex

Let me show you another example where static wireframes fall short.

Imagine designing pickup time slots for a restaurant’s online orders. Seems straightforward, right? Just show a dropdown of times.

But to build it, you need logic that handles:

- Different operating hours for different days
- Prep time varies by order size
- Minimum gaps between pickup slots
- Last allowable pickup before closing
- Edge cases at opening and closing times

Now try this: write out every valid time slot for a Tuesday when the kitchen closes at 9 PM, and orders take 45 minutes to prepare.

Go ahead, actually try it.

Feels tedious? That’s because our brains aren’t built to validate sequences and calculations. We’re great at recognizing patterns, terrible at running computations in our heads.

**This is exactly what we ask stakeholders to do when we show them wireframes of complex systems.**

With the Porsche booking system, I was essentially asking stakeholders to compute:

- IF item removed THEN recalculate total
- IF payment exists THEN determine refund amount
- IF multiple users THEN resolve conflict

No wonder everyone said “looks good” without catching the gaps.

> **They weren’t validating logic — they were validating layout.**

## What I Built Instead: From Slideshow to Sandbox

After that painful development phase, I tried something different for the next complex feature.

I built two interactive prototypes using Figma Make:

**Prototype 1 — Calendar booking allocation UI and Program Creation**

- That exactly matched the Porsche design system
- Looked production-ready
- Showed the happy path and bearly noticeable patterns with static UI screens
- Made edge cases visible and testable, and fixed them in time

**Prototype 2 — The Invoice Sandbox**

- Intentionally ugly and simple.
- Let stakeholders actually add and remove items
- Showed totals recalculating in real-time
- Displayed what happened with existing payments
- Made edge cases visible and testable, and fixed them in time

Prototype 2 looked nothing like our designed wireframe. It was a sandbox, not a showcase.

But here’s what stakeholders could do with it:

- Add items and watch the total update
- Remove items and see refund calculations
- Experience the timing and sequence of changes
- Test edge cases themselves instead of imagining them

The difference was dramatic. Instead of nodding at screens, stakeholders were *using* the system. They found issues I’d missed. They asked better questions. They understood not just what it looked like, but how it *behaved*.

Once everyone could feel how the system worked — once they trusted the logic — the visual design discussions became easy.

Understanding came first. Polish followed.

## So, How to Build Prototypes That Actually Help?

Here’s what I learned about building these interactive prototypes:

## 1\. Understand Your System First

Before touching Figma or any prototyping tool, write out:

- What the product does
- How users move through it
- What choices change their path
- What should never happen

If you can’t explain it in plain language, you’re not ready to build it.

## 2\. Be Explicit About Everything

When using AI tools to help build prototypes, don’t assume they’ll “figure out” what you mean. State clearly:

- What screens exist, and what each one does
- How users get to each screen
- What makes them move between screens
- What calculations happen when

The AI is only as good as your explanation.

## 3\. Build in Phases

For the Porsche Corporate Booking Invoicing logic, I broke it into:

- **Phase 1** — Enquiry Entry & Booking Context
- **Phase 2** — Agenda Planning (Source of Truth)
- **Phase 3** — Pro Forma Invoice Generation
- **Phase 4** — Invoice Finalize vs Revise Logic
- **Phase 5** — Multi-Invoice Sequencing & Adjustment
- **Phase 6** — Discounts, GST, and Deposit
- **Phase 7** — Payments & Refunds

Build one phase. Test it completely. Then move to the next.

## 4\. Test Each Phase Until You Can’t Break It

After building each phase, I would:

- Click every button multiple times
- Try things in the wrong order
- Look for unexpected behavior
- Confirm it matched my logic document

Fix everything before moving forward.

## 5\. Update, Don’t Rebuild

When something needed fixing, I learned to be specific:

- “The total should update immediately when an item is removed.”
- “Keep the navigation working, only change the calculation.”

Small, clear updates keep things stable. Rebuilding from scratch creates chaos.

## Example Prompt That Works

```c
### **Context**

This interactive prototype is being built incrementally in clearly defined phases.
The purpose of this prototype is to simulate a realistic invoicing flow that evolves over time, while keeping behavior predictable and testable.

The overall experience includes several connected screens with conditional transitions.
Later phases will introduce additional logic, but this prompt should implement only Phase 1.
---

### **Overall Phase Plan (For Awareness Only — Do Not Implement Yet)**

* **Phase 1**: Entry & booking context
* **Phase 2**: Agenda planning (source of truth)
* **Phase 3**: Pro forma generation when agenda changes
* **Phase 4**: Finalize vs revise behavior
* **Phase 5**: Multi-invoice adjustments over time
* **Phase 6**: Discounts, tax, and deposit logic
* **Phase 7**: Payments and refunds

Only **Phase 1** should be implemented in this prompt.

---

### **Existing Screens**

The following screens already exist in the design and should not be modified:

Figma Node 1: Link
* **Enquiry List** – shows incoming enquiries
Figma Node 2: Link
* **Enquiry Detail** – displays enquiry information
Figma Node 3: Link
* **Create Booking** – used to initialise a booking container

No additional screens should be created.

---

### **Phase to Implement Now: Phase 1 — Entry & Booking Context**

Implement only the following behavior:

* From **Enquiry List**, allow selecting an enquiry to open **Enquiry Detail**
* From **Enquiry Detail**, allow creating a booking
* Creating a booking should navigate to **Booking Overview**
* A booking must exist before the user can proceed further
* No agenda, invoice, pricing, or calculation logic should be introduced

---

### **Explicit Constraints**

* Do not implement any logic from Phase 2 or later
* Do not add calculations, summaries, or financial data
* Do not create temporary or preview states
* Do not assume future behavior

This phase is purely about **establishing context and navigation**.

---

### **Validation Criteria**

After implementation:

* Every screen in Phase 1 is reachable
* Navigation only occurs through explicit user actions
* Booking Overview cannot be accessed without creating a booking
* Repeating the flow behaves consistently
* No unexpected screens or states appear

If any of these fail, the phase should be corrected before proceeding.

---

### **Important Note for Future Phases**

Later phases will:

* Build on the booking created in this phase
* Introduce agenda as a source of truth
* Add financial logic incrementally

Do not anticipate or prepare for those behaviors in this prompt.

---
### **Success Criteria**

Enquiry converts cleanly into a draft booking
State is future-proof for later phases
UI remains enterprise, dense, and operational
No assumptions block invoicing or payments later
```

Simple. Specific. Testable.

## What Changed for Our Team

After adopting interactive prototypes for complex features:

**Before**

- Stakeholders approved the wireframes quickly
- Developers discovered gaps during build
- Multiple rounds of “we need to redesign this.”
- Launches are regularly delayed by 2–3 weeks

**After**

- Stakeholders spent more time on prototype reviews
- Developers had fewer questions during the build
- Logic was validated before visual polish
- Launches stayed on schedule

The upfront time creating interactive prototypes saved us weeks in the development phase.

But the bigger change was how we thought about design:

> **From** making screens → **To** designing behavior
> 
> **From** looking correct → **To** working correctly
> 
> **From** explaining in meetings → **To** showing with prototypes

## What This Means for You

If you’re designing straightforward products — marketing sites, content pages, simple forms — wireframes still work great.

But if you’re designing systems where:

- Things change state (bookings, orders, schedules)
- Calculations happen (prices, totals, balances)
- Multiple people interact with the same data
- Timing matters (real-time updates, conflicts)
- Edge cases are common (refunds, cancellations, errors)

**Then, wireframes alone aren’t enough.**

You’re not designing screens. You’re designing behavior. And behavior can’t be validated by looking — it has to be experienced.

Interactive prototypes aren’t about fancy tools or impressive demos. They’re about making sure you’re building the right thing before your developers spend weeks building the wrong thing.

## Final Thought

That meeting where everyone approved my wireframes? It felt great at the time.

But it was a false positive. Everyone was approving what they *saw*, not what would actually *happen*.

Now that stakeholders quickly approve my designs, I worry. When they spend time breaking my prototype and asking hard questions, I relax.

For complex systems, interactive prototypes aren’t a luxury — they’re how we avoid building the wrong thing beautifully.