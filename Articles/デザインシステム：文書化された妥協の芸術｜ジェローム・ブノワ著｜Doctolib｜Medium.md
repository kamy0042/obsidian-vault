---
タグ: []
作成日時: 2026-04-11T16:35:00
URL: https://medium.com/doctolib/design-system-the-art-of-documented-compromise-04a7a5fab937
Tags: [topic/デザインシステム/批評・本質論]
---
# Design System: the art of documented compromise

![](https://miro.medium.com/v2/resize:fill:64:64/1*IohBscnZuYxScBDEmEHo0w.png)

[Jérôme Benoit](https://medium.com/@JeromeBenoit)

8 min read

·

Jan 26, 2026

- -

[Listen](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D04a7a5fab937&operation=register&redirect=https%3A%2F%2Fmedium.com%2Fdoctolib%2Fdesign-system-the-art-of-documented-compromise-04a7a5fab937)

Share

Press enter or click to view image in full sizeLike Neo in Matrix, two realities are existing and a choice has to be made

## When principles meet industry reality

At Doctolib, we aim to be accessible by design, as a healthcare software aiming to ease the access to care, it’s a pre-requisite. As a consequence, we require all teams to respect our accessibility guidelines based on the high standards we set. Yet, some of our design system patterns are not following those guidelines.

> This situation isn’t the result of an oversight or lack of rigor. It’s the product of a fundamental tension: how do you build a design system that respects accessibility principles while meeting UX expectations forged by industry standards, that are not at level of our accessibility standards? And above all, how do you maintain your legitimacy when you create the very exceptions you forbid others from making?

Welcome to the daily paradox of a design system team.

## The example that hurts: the Search without a visible label

Open Slack, Linear, WhatsApp, or any app you use daily, whether you’re young or old, whether it’s social media or productivity tools , the top item you’ll encounter will be a search without a visible label. It’s such a widespread pattern that it’s become a de facto standard. Users expect it, designers want it but it goes against accessibility best practices.

Press enter or click to view image in full sizeDifferent types of tools using Search without visible label

Here’s the nuance many miss: a visible label isn’t strictly required by WCAG, but it’s strongly recommended. You can be technically compliant with aria-label or a visually hidden **<label>**, but you’re only solving accessibility for screen reader users, not for everyone else.

The accessibility principle is that every input purpose must be identifiable. In most cases, this means a visible label. Technically, aria-label can satisfy WCAG compliance, but it only benefits screen reader users. Imagine a form with four filled inputs, without visible labels. Even without any vision impairment, how do you distinguish between “first name,” “middle name,” “birth name,” and “family name”? Impossible.

Press enter or click to view image in full sizeOn left, a legible form with labelled inputs, on right, the same form without text label appearing really confusing.

But then, how do we handle this ubiquitous search in our interfaces?

## Solutions explored (and their problems)

**Option 1: the popover with visible label**

Press enter or click to view image in full sizeA button triggering a popover containing a search with visible label

You click a button (1), it opens a popover with a real labeled input and a submit button (2). It’s 100% accessible for everyone. It’s also frustrating to use. When your users are doing this actions hundreds times a day, this extra click is perceived as an additional unnecessary friction.

**Option 2: the button that transforms into an input**

Press enter or click to view image in full sizeClicking on the Search button turns it into a unlabelled focused input.

You click (1), the button becomes a focused input (2), ready to receive text. Better UX, but still no visible label, only programmatic identification. We meet WCAG compliance but not best practices.

Additional issue: our button and inputs don’t have the same height and same border colors…

**Option 3: the icon as visible label**

Press enter or click to view image in full sizeA Search without visible label but with a icon acting as visible label

We embrace the industry standard: a search icon paired with an input, aria-label for screen readers, and we rigorously document why this pattern is actually WCAG compliance.

We chose option 3. But not without careful justification.

## The WCAG reality check

Here’s what changed our perspective: **we’re actually WCAG compliant with **a Search without a visible label (as long as some prerequisites are met).

The W3C explicitly acknowledges this pattern:

> *“A website provides a global search field in the header of the site. Any term can be entered, so there are no instructions needed, but the field needs a cue to communicate its purpose. Commonly, such search field will be paired with a ‘loupe’ or ‘magnify glass’ search icon, serving as its visible label.”*

Source:[ S.C.3.3.2 — Labels and instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)

Our filtering pattern search fits this exact scenario:

- ✅ Search icon (magnifying glass) provides visual cue
- ✅ Clear positioning (integrated within the filtering pattern UI)
- ✅ Obvious function (search icon + surrounding filter context make purpose unmistakable)
- ✅ aria-label=”Search” provides programmatic name

**WCAG criteria met:**

- ✅ [**3.3.2 Labels or instructions**](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)**:** Icon + context serve as “visible label”
- ✅ [**4.1.2 Name, role, value**](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)**:** Programmatic name exists via aria-label
- ✅ [**1.3.1 Info and relationships**](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships)**:** Proper association maintained

So why all the tension in our team?

## The legitimacy problem

> “”If we can’t articulate why our decisions are sound, we lose the standing to guide others. Teams will reasonably ask: ‘How can you require us to meet accessibility standards when your own patterns seem to violate them?’”

This sentence, spoken by our accessibility expert, captures the real issue.

The problem isn’t technical compliance, it’s about **perception and consistency**. Designers see our Search without a visible label and think: *“But why do I have to put a visible text label on my form input, if the Design System team is not doing it?”*

Without a clear explanation of **when** and **why** this pattern is acceptable, they’re totally right to question the inconsistency.

**The domino effect is real:** the more patterns we create without visible text labels, the more normalized they become, and the less weight our guidelines carry.

> *Today’s acceptable pattern becomes tomorrow’s misapplied hack.*

We can’t hide behind *“it’s different”* without explaining exactly how and why.

## The methodology: when is Search without a visible label acceptable?

We’ve established clear criteria for when a search can skip the visible text label:

### 1. Visual context must make purpose obvious

Press enter or click to view image in full sizeThe context and the icon is making the purpose of the Search obivous

The search must have:

- A clear search icon (magnifying glass)
- An obvious positioning (header, filtering area)
- No ambiguity about its function

**Why?** This satisfies the “visible label” aspect of[ WCAG 3.3.2](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html), the icon IS the label.

### 2. It must be a standalone search or documented pattern component

Never in a multi-input context like forms. The pattern must be:

- Part of an integrated, documented component (filtering pattern, top bar)
- Not extractable for standalone use
- Visually distinctive from form inputs

Press enter or click to view image in full sizeThe Search without visible label included in its context: the filtering pattern

**Why?** In forms, users need visible text labels to distinguish between multiple fields. A search icon doesn’t help you tell “search patient” from “search doctor” from “search appointment”.

Moreover, as we’re aligning the UI of the Search with the filter buttons, this search is a bit visually distinctive from our regular search (border color and height)

### 3. Programmatic label must exist

Always include aria-label or equivalent: <input type=”search” aria-label=”Search” />

**Why?** This satisfies[ WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html) and ensures screen reader users can identify the field.

### 4. The exception must be hyper-documented

In our case, the documentation states:

- **Why** this pattern is WCAG compliant (icon as visible label)
- **Where** it can be used (filtering pattern, global search)
- **Where** it CANNOT be used (forms, multi-input contexts)
- **What** the difference is between this and regular form inputs

Without this rigor, we’re opening the door to misuse.

## **The role of (benevolent) police**

> “*Our role is key, it’s to bring people back down to earth. For example, we see it on some design proposals: by default they don’t put the text label on the search even though they have room for it.”*

Our job isn’t to forbid, but to educate. When a designer proposes a Search without a visible label in a form, we always come back to the above-mentioned rationales.

The difference between being “blockers” and being “guardians” lies in this pedagogy, and the line is really thin…

## **Tensions to navigate**

### **Industry standards vs accessibility best practices**

The brutal reality: **most of the industry meets minimum WCAG compliance but doesn’t follow best practices.** The patterns users know, the interfaces they find “intuitive,” are often technically compliant but not optimal.

Should we systematically go against these patterns? Create a “different” UX in the name of best practices? Not sure.

### **Control vs autonomy**

> “The reality is we can’t review every design decision. Work moves fast, and plenty gets built without our input.*”*

Being too restrictive guarantees workarounds. Designers and Engineers will create custom solutions, hide labels with CSS, find hacks. We lose all control and visibility.

It’s better to provide clear guidelines with documented patterns than suffer dozens of silent violations, that will be even more debt to fix later on.

## **Practical recommendations**

If you manage a design system facing these same tensions, here’s what works for us:

### **1) Know WCAG, don’t assume**

Read the actual success criteria and understand documents. We assumed Search without a visible label was non-compliant (as other inputs). Truth is the W3C explicitly acknowledges the icon-as-label pattern for searches.

### **2) Distinguish compliance from gold standard and prioritize by context**

Be clear when we’re choosing the industry pattern over the ideal, in our case:

- Medical form > Gold standard mandatory, even more true in healthcare where a design can lead to mistakes, mistakes can lead to wrong medical decision, wrong medical decision to potentially to life or death situation.
- Filtering search with obvious visual context > Industry standard is acceptable (and does not imply error with critical risk).

### **3) Document relentlessly**

Documentation has a reputation for being tedious work (and is not the most thrilling dinner conversation), but it has become one of our most powerful tools.

Every pattern must explain its accessibility approach, and rules must be clear. In our specific case:

- **General inputs:** Visible text labels are the default
- **Forms, multi-input contexts:** Visible text label mandatory, zero exceptions
- **Standalone search** (global, filtering): Icon + aria-label acceptable if meeting the above mentioned requirements.

### 4) **Educate on the “why,” not just the “what**

Don’t just say “*labels are required. Period.”*

The explanation must be heavily detailed.

### 5) **Make exceptions visually distinctive**

This is an optional step, but still, it’s supporting the initiative. Our filtering pattern search looks different from form inputs:

- Integrated into a button-based filtering UI
- Activates differently (click button first)
- Visually cohesive with filter buttons
- Can’t be confused with form inputs

Press enter or click to view image in full sizeOn left (1), the exception, on right (2) the regular Search component

This prevents casual “borrowing” of the pattern for inappropriate contexts.

## **Conclusion: rigor through precision**

A good design system isn’t the one that never deviates from the gold standard. It’s the one that knows:

- What WCAG actually requires
- When industry standards are acceptable
- How to document the reasoning
- Where each pattern applies

Our credibility doesn’t come from rigid rules, but from **precision and honesty**. Our Search without a visible label in the filtering pattern isn’t a violation, it’s a documented choice.

Filtering pattern search? We own it, we documented it, and we confined it to appropriate contexts.

And above all, we use it as a teaching example to explain **why**, in forms and multi-input contexts, visible text labels remain mandatory, not for WCAG compliance, but because **it’s the right thing to do for all users**.

Design systems live in nuance, not absolutes. Between what’s required and what’s ideal. Between industry reality and accessibility gold standards. Our job? Navigate these tensions honestly, decide deliberately, and explain clearly. The conversation doesn’t end here, it starts here.