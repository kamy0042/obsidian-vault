---
title: "8 Underrated Design Systems We Keep Coming Back to for Inspiration"
source: "https://medium.muz.li/8-underrated-design-systems-we-keep-coming-back-to-for-inspiration-77b27026c403"
author:
  - "[[Damilola Olawoyin]]"
published: 2026-09-15
created: 2026-09-22
description: "8 Underrated Design Systems We Keep Coming Back to for Inspiration Forget the buttons for a minute. These are eight lesser-known design systems we study for the thinking, patterns and decisions …"
tags:
  - "topic/デザインシステム/リファレンス"
  - "topic/デザインシステム/批評・本質論"
  - "clippings"
---
Forget the buttons for a minute. These are eight lesser-known design systems we study for the thinking, patterns and decisions behind them.

Co-written with [Ossai Emmanuel](https://medium.com/u/5dc5358d8eb9?source=post_page---user_mention--77b27026c403-----------------------------------------)

![Cover image showing title, sub-title and logo of 8 companies](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4DRMrZfhLsdkGBD548FHjQ.png)

Cover image showing title, sub-title and logo of 8 companies

There are a few design systems almost every product designer knows.

Material. Carbon. Polaris. Atlassian. Fluent.

And for good reason. They’re mature, incredibly well documented, and have shaped a lot of how we think about designing digital products today. But they’re not the only ones worth studying. Over time, we’ve found ourselves collecting design systems in much the same way we collect UI inspiration. Except we’re rarely there looking for a button to copy into Figma.

We’re looking for decisions.

How does another team document a complicated interaction? How do they handle errors? What do they consider a pattern rather than a component? How do they approach accessibility? How do they keep design and development aligned? What happens when a product has to work across several platforms, languages or completely different use cases?

That’s where design systems become really interesting.

A mature design system is almost a record of problems a product team has encountered and the decisions they’ve made while solving them. So we went through some of the systems we’ve bookmarked, referenced or simply found ourselves impressed by and picked eight that deserve more attention. Not necessarily because they have the prettiest components.

But because there’s something worth stealing from the thinking behind them.

## 1\. Blade by Razorpay

![Intro page of Blade design system documentation](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*XL8oTKk4u0zRNbcbh8s_Tw.png)

Intro page of Blade design system documentation

### What caught our attention: It feels like infrastructure, not a UI kit.

[Explore Blade by Razorpay](https://blade.razorpay.com/)

Blade is the design system powering Razorpay, and there’s something particularly interesting about studying a design system built around financial products. Trust matters differently when an interface is dealing with someone’s money. A missing state, inconsistent interaction or unclear error isn’t simply untidy UI. It can make a product feel unreliable.

That context seems to have influenced the way Blade has evolved.

What impressed us most isn’t necessarily any individual component. It’s how much infrastructure exists around the components. Blade works across React Web and React Native, supports white-labelling and accessibility, and, interestingly, Razorpay publicly documents RFCs and API decisions. Their ecosystem also includes tooling for measuring Blade adoption in Figma, publishing tokens and even enforcing Blade standards in code.

That’s a design system thinking beyond *“here’s the component library.”*

It’s thinking about how the system actually survives once hundreds of people start using it.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*xaf4es8DNsh5fqod.png)

### The detail worth stealing: Make adoption measurable

One problem we’ve seen with design systems is that teams can spend months creating them without really knowing whether anyone is using them properly. Blade’s approach to tooling around coverage is interesting for that reason. If you can measure how much of a design file uses system components, the conversation changes from:

*“We think people are using the design system.”*

to:

*“We can actually see where the system is and isn’t being used.”*

Razorpay has also spoken publicly about why this mattered. Before Blade, teams could miss seemingly small details such as button states or how errors within text fields should behave. Across a large financial product ecosystem, those small inconsistencies accumulate.

### What we’d take from it

A design system isn’t finished when the components are published. You need to think about **adoption, contribution, maintenance and the relationship between design and code**. Blade is worth studying if you’re building a system that needs to scale beyond one Figma file and actually become part of how an organisation builds products.

**We’d look here for:** design-system operations, cross-platform systems, design-to-development alignment and scaling a system across multiple products.

## 2\. Seeds by Sprout Social

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*O3Enxqq_ZjzF3Y7DZb88MQ.png)

### What caught our attention: They document problems, not just components.

[Explore Seeds by Sprout Social](https://seeds.sproutsocial.com/)

Seeds was one of the systems that made us rethink what design-system documentation could actually contain. The interesting part starts when you click **Patterns**. Instead of only finding components, you find guidance for things like: Accessibility, Contextual messaging, Date and time, Filters, Forms, Navigation, Notifications, Onboarding, Charts, Data states, Tables, etc.

These aren’t simply pieces of UI. They’re recurring product problems, and Seeds treats them that way. Their definition of a pattern is essentially a combination of documentation, components and guidelines used to solve recurring problems. That’s such a small distinction, but it’s an important one. A component can tell a designer how a filter looks.

A pattern can help them understand **how filtering should work**.

### The detail worth stealing: Create a vocabulary for recurring UX problems

Imagine three teams are designing filtering experiences. If the system only provides dropdowns, checkboxes and chips, each team can still assemble those components into completely different behaviours. The UI might technically use the design system while the product experience becomes inconsistent.

Seeds tackles the layer above the component.

The same thinking appears in its analytics guidance, where charts, data states, visualisation, source tables and summary tables are treated as related product concerns rather than isolated UI elements. That’s the level where a design system starts becoming organisational knowledge.

### What we’d take from it

When the same UX problem keeps appearing across your product, don’t automatically build another component. Sometimes what the team needs is a **pattern**. Document the problem, the behaviour, the components involved and the rules around how they work together.

**We’d look here for:** SaaS products, filters, analytics, forms, notifications, content-heavy interfaces and documenting recurring UX behaviour.

## 3\. Gestalt by Pinterest

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xXBzKQeD1aZgGAxVGWMgUQ.png)

### What caught our attention: Accessibility feels built into the system rather than added to it.

[Explore Gestalt by Pinterest](https://gestalt.pinterest.systems/)

Pinterest operates at the kind of scale where seemingly small design decisions become global ones.

Gestalt reflects that.

The system is designed for designers, engineers, product managers and others working across Pinterest, creating a shared language rather than something that belongs exclusively to the design team. But what we particularly like is how accessibility and globalisation sit inside that language. Gestalt’s documentation explicitly considers things like right-to-left text, localisation and light and dark colour schemes alongside accessibility guidance.

That matters for a product used by millions of people across different languages, devices and abilities.

### The detail worth stealing: Design for the version of your product you haven’t seen yet

It’s easy to make a component look great with: **“Settings”**

It’s harder when that same component has to support a much longer translation, right-to-left text, increased text size, keyboard navigation and a different colour mode. Those aren’t edge cases when your product operates globally. They’re the product.

Gestalt is a good reminder that scalability isn’t just about how many screens use a component. It’s also about how many **contexts** that component can survive.

### What we’d take from it

Accessibility and localisation shouldn’t be QA tasks that happen once the design is finished. They should influence how the system is constructed in the first place. A mature component isn’t simply reusable. It’s resilient.

**We’d look here for:** accessibility, localisation, consumer products, cross-functional system adoption and designing at global scale.

## 4\. Pajamas by GitLab

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_1TQqgDaQGu0JYAyDMDR-g.png)

### What caught our attention: The system explicitly gives designers permission to leave the system.

[Explore Pajamas by GitLab](https://design.gitlab.com/)

This might be our favourite philosophy in the entire list. GitLab’s Pajamas Design System makes something very clear: The design system is a starting point, not the ending point.

That sounds obvious, but it’s surprisingly easy for a mature design system to become restrictive. A component exists, so we use it. A pattern exists, so every problem starts looking like that pattern. Consistency becomes the goal instead of the consequence of solving similar problems well.

Pajamas takes a more nuanced position.

Teams should start from shared foundations and existing patterns, but they’re also encouraged to design for their specific context. GitLab’s guidance explicitly acknowledges that not every problem will be solved by an existing component. Even better, when teams discover something new, they’re encouraged to share what they’ve learned so the system itself can evolve.

### The detail worth stealing: Separate the core from emerging patterns

Pajamas distinguishes between its core system and an extended layer. The core prioritises reusable concepts that need stability and consistency across GitLab. The extended layer gives teams room to share production-ready solutions that might be useful elsewhere but aren’t necessarily mature enough to become universal. We love this because it solves a difficult design-system question:

**When does a solution deserve to become part of the system?**

Not everything reusable needs to immediately become core. Let teams experiment. See what survives real product use. Then standardise what proves valuable.

### What we’d take from it

A healthy design system shouldn’t eliminate product design. It should eliminate the problems that teams shouldn’t have to solve repeatedly, while leaving room for designers to solve the problems that are actually unique.

**We’d look here for:** design-system governance, contribution models, enterprise products, complex workflows and balancing consistency with product-specific needs.

## 5\. Orbit by Kiwi.com

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*oR9r_oS7uYRo-jeo5rFMxQ.png)

### What caught our attention: The system clearly understands the domain it was built for.

[Explore Orbit by Kiwi.com](https://designsystems.surf/design-systems/kiwicom)

Orbit is Kiwi.com’s open-source design system, built around travel products. And that’s what makes it interesting. A lot of design systems eventually converge on the same foundations: colour, typography, spacing, buttons, inputs, modals, cards.

Orbit has those too.

But its documentation also extends into accessibility, internationalisation, theming, voice and tone, patterns and travel-specific product needs. That domain awareness matters. Because a good design system shouldn’t make every product look like a generic SaaS dashboard. It should encode knowledge about the kind of product you’re actually building.

### The detail worth stealing: Your domain belongs in your design system

Think about what a travel product has to deal with. Countries, currencies, dates, times, languages, passenger information, long place names, disruptions, itinerary changes and a huge amount of information that users need to process confidently. The system supporting those experiences needs to understand more than border radius.

This is something we think more internal design systems could learn from.

If you’re designing workplace software, for example, perhaps your system should contain established patterns around availability, booking states and permissions. If you’re designing fintech, perhaps transaction status and financial-data presentation belong there. Your design system can carry **domain knowledge**, not just visual consistency.

### What we’d take from it

Don’t build a generic design system and force your product into it. Let the problems your product repeatedly solves shape the system.

**We’d look here for:** internationalisation, travel products, domain-specific patterns, theming and systems that need to work across markets.

## 6\. Garden by Zendesk

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Fyz2pQCxcxV7qa8HaZD8WA.png)

### What caught our attention: It gets surprisingly specific about behaviour.

[Explore Garden by Zendesk](https://garden.zendesk.com/)

Zendesk describes Garden as an evolving library of shared knowledge that intentionally blurs the line between design, content strategy and engineering. That description makes much more sense once you get into its patterns. There are guides for buttons, copy, drag and drop, errors, filters, loaders, saving, tables and more.

But the **error-handling documentation** is where we found ourselves spending time.

Garden doesn’t simply give you a red alert component and send you on your way. It distinguishes between system-level errors, contextual alerts, notifications and form validation. It explains where they should appear, what information they should contain and what action the user should be given. It even gets into details like keeping invalid form data rather than clearing what the user entered.

That’s not component documentation, that’s UX guidance.

### The detail worth stealing: Document what happens when things go wrong

Happy paths are easy to standardise, errors are where products often become inconsistent. One team uses a toast, another uses a modal, another puts red text somewhere, another clears the form and makes the user wonder what happened.

Garden treats error handling as a system rather than a collection of red components. We particularly like the principle behind retaining incorrect values after validation. The goal isn’t simply to announce that something went wrong. It’s to help the user recover without creating more work.

### What we’d take from it

The best design-system documentation doesn’t only tell you **what to use**. It helps you understand **why, when and what should happen next**. That’s where documentation starts improving UX rather than simply improving consistency.

**We’d look here for:** error handling, forms, loaders, tables, enterprise UX and bringing design, engineering and content guidance together.

## 7\. PatternFly by Red Hat

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WgZsUDxKpL-NJy4R9NtVmw.png)

### What caught our attention: It isn’t afraid of complexity.

[Explore PatternFly by Red Hat](https://www.patternfly.org/)

Some design systems feel optimised for creating clean marketing pages. PatternFly absolutely does not. It’s an open-source system built around complex enterprise software, and the depth of the documentation reflects that.

Of course there are buttons, tabs and modals. But then you keep going, bulk selection, status and severity, primary-detail views, data views, topology, log viewers, skeleton tables, accessibility testing, etc.

Even AI-specific design guidance and conversation design now sit within the wider system. It feels less like browsing a component library and more like browsing years of accumulated enterprise-product problems.

### The detail worth stealing: Standardise complexity instead of hiding it

There’s a temptation in product design to equate simplicity with removing things. But enterprise users often genuinely need a lot of information and control. The problem isn’t necessarily that the interface contains complexity.

The problem is **unstructured complexity**.

PatternFly’s status and severity guidance is a good example. In operational software, statuses aren’t decorative badges. They communicate system conditions that can affect what someone does next. So the system provides shared approaches for representing those conditions consistently. That’s a much more interesting design problem than choosing the colour of a tag.

### What we’d take from it

If your users have complicated jobs, your design system needs to respect that. Don’t simplify away information they need. Create patterns that make complexity easier to understand and act on.

**We’d look here for:** enterprise software, admin tools, data-heavy products, complex states, operational interfaces, accessibility and advanced interaction patterns.

## 8\. Cash App’s Design System

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4u-9rItUaetQ_ny5eT-EUg.png)

### What caught our attention: A design system doesn’t have to make your product boring.

[Explore Cash App’s design system](https://designsystems.surf/design-systems/cashapp)

There’s a particular criticism of design systems that we understand. Use the same spacing, use the same components, use the same patterns, use the same layouts. Eventually everything starts looking the same.

Cash App is a useful counterexample.

Its system includes the foundations you’d expect: colour, typography, iconography and tokens. But motion and voice and tone sit alongside them, and the system goes further into what Cash App calls **Expressions**, including graphic UI. That distinction immediately caught our attention.

Because Cash App has a very recognisable visual personality, and the system isn’t trying to suppress it in the name of consistency. It’s trying to make that personality repeatable.

### The detail worth stealing: Systemise expression, not just consistency

Most design systems are excellent at telling you how *not* to break the interface. Fewer are good at explaining how to make the interface feel distinctly like the brand.

That matters.

If every expressive decision exists outside the system, teams eventually face a choice between consistency and creativity.

Cash App suggests another approach: Put some of that expression **inside the system**. Motion can be systematic. Voice can be systematic. Graphic treatments can be systematic. Brand personality doesn’t necessarily have to live in a separate PDF that product designers look at twice a year.

### What we’d take from it

A design system shouldn’t only answer:

*“Does this look consistent?”*

It should also help answer:

*“Does this feel like us?”*

The strongest systems create consistency without removing personality.

**We’d look here for:** fintech, motion, brand expression, voice and tone and connecting product design with brand identity.

## What these systems changed about how we think about design systems

After spending time across all eight, the biggest takeaway wasn’t a component we wanted to recreate. It was how differently each team interpreted what a design system should be.

**Blade** made us think about adoption and tooling.

**Seeds** made us think about documenting recurring UX problems.

**Gestalt** made us think about designing components for contexts beyond the screen in front of us.

**Pajamas** made us think about how systems leave room for experimentation.

**Orbit** made us think about encoding domain knowledge.

**Garden** made us think about documenting behaviour and recovery, not just components.

**PatternFly** made us think about systemising complexity.

**Cash App** made us think about systemising personality.

And that’s probably why we keep coming back to design systems for inspiration.

At some point in your career, another beautifully designed button isn’t particularly useful. You know what a button looks like. The harder questions are everything around it.

When should it be used?

What happens after someone clicks it?

What happens when the action fails?

How does it work with a keyboard?

What happens when the label becomes twice as long in another language?

Should this interaction be consistent everywhere?

When is it okay not to be consistent?

Who owns the pattern?

How does it evolve?

How do developers know what the designer intended?

How do you know whether anyone is even using it?

Those questions are much closer to the actual work of designing products at scale.

## Don’t steal the component. Steal the thinking.

We’re still going to open design systems and inspect their components.

We are designers, after all. But the longer we’ve worked with them, the less interesting the component itself has become.

A button is the outcome of dozens of decisions, so is an error message, so is a filter, so is a table. The valuable part is understanding the decisions that got the team there.

That’s what makes public design systems such an incredible source of inspiration. You’re getting a small window into how another product organisation thinks, what problems they’ve encountered and what they’ve decided should never need to be solved from scratch again.

So next time you’re stuck on a product problem, don’t just open another UI inspiration gallery.

Open someone else’s design system.

And don’t look for a component to copy.

**Look for a decision you haven’t considered.**

Co-written with [Ossai Emmanuel](https://medium.com/u/5dc5358d8eb9?source=post_page---user_mention--77b27026c403-----------------------------------------)

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/0*BCGdAYO3TKYXQjwX.png)