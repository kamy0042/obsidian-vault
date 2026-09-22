---
title: "People are the point: Why cognitive accessibility needs to be part of your design system"
source: "https://zeroheight.com/blog/people-are-the-point-why-cognitive-accessibility-needs-to-be-part-of-your-design-system/"
author:
  - "[[Nathania Gilson]]"
published: 2026-08-28
created: 2026-09-10
description: "Nathania Gilson explains why cognitive accessibility belongs in design systems, and how better documentation and governance can create more inclusive experiences."
tags:
  - "topic/アクセシビリティ"
  - "topic/デザインシステム/ドキュメント"
  - "topic/デザインシステム/戦略・ガバナンス"
  - "clippings"
---
Amy is trying to renew her car insurance online.

She finds the right page and starts filling in the form. But her kids need help with something. So she deals with it, then comes back to the screen. The form has timed out. Everything she entered is gone.

She starts again. Gets further this time. Then her phone rings. When she comes back, the same thing happens.

She closes the tab. Her insurance doesn't get renewed.

Every component on that page probably passed its accessibility audit. The contrast ratio was right. The labels were present. The ARIA was clean. And still, Amy — who has ADHD, and who is also just a person with kids, a phone, and a life — couldn't complete the task.

Amy doesn't file a bug report, though. She just leaves. And somewhere in your product analytics, her session is recorded as an abandonment with no further detail.

## How undocumented decisions become user problems

Here are the design systems questions Amy's experience raises: Did the system that built that form document what should happen when someone steps away mid-task? Did any documentation specify that progress should be saved? Were there guidelines for what the timeout message should contain — and how to help someone start again without losing everything?

If that documentation didn’t exist, that failure wasn't a developer decision. It was a design systems gap. And it will happen on every form built from that system, by every team, for every user who needs a little more time.

That's the cognitive accessibility problem. And it's not accidental — it's structural. Not caused by individual failure, but by the absence of decisions that should have been made in the system and weren't. Those gaps don't announce themselves. They get filled anyway — by team turnover, new teams building from the system without context, and AI tools defaulting to whatever pattern appeared most frequently in their training data.

## Why gaps in design systems create gaps about people

![Screenshot of the IBM Design Language website showing a typographic gallery with letters and characters from multiple scripts, with headings that say &quot;Think → Guide&quot; and &quot;Build Bonds&quot;](https://cmszeroheight.wpenginepowered.com/wp-content/uploads/2026/08/image-13.png)

Source: https://www.ibm.com/design/language/

[Carbon](https://carbondesignsystem.com/) is IBM's open-source design system — actively maintained, rigorous on accessibility for visual, auditory, and motor categories, and the foundation for every digital experience IBM builds. Product software. IBM.com. Internal tools. Conversational agents. An entire ecosystem of experiences, all consuming Carbon assets and guidance.

That foundation has [three sentences on cognitive accessibility](https://carbondesignsystem.com/guidelines/accessibility/overview/#users-with-cognitive-disabilities): Avoid complex language, avoid autoplaying animations, and pass usability heuristics.

This isn't a criticism of Carbon or the team that built it. Carbon represents the current baseline: what a well-resourced, carefully maintained design system looks like when a team takes accessibility seriously. But the current baseline isn't enough for cognitive accessibility.

### Not every decision is made equally

When Carbon doesn't answer a question — for example, what should happen when someone steps away from a form mid-task, what an error message should specifically contain, or how navigation should behave consistently across every product in the ecosystem — that question doesn't stay unanswered.

The answer gets decided by each team independently, under a deadline, with whatever judgment is available to them. Across IBM's entire product portfolio and every external team building from the open-source layer, AI tools increasingly fill those gaps with inherited patterns.

Undocumented decisions don't stay undecided. They get decided badly, at scale, by whoever or whatever is building next. And the cost of those decisions isn't shared equally — it falls on the people who don’t fit neatly into your average user profile. The ones who close the tab and don't come back. The ones your analytics records as an abandonment with no further detail.

Like Amy.

### Why should we care?

However, before a design system can answer the questions cognitive accessibility raises, someone has to argue successfully that those questions are worth asking. [Eric Bailey](https://ericwbailey.design/) — who has [written about cognitive accessibility on this blog](https://zeroheight.com/blog/design-systems-cant-automate-away-all-of-your-accessibility-considerations/) — names the gap that comes before the documentation gap:

"The hardest cognitive accessibility question our team gets asked is 'Why?',” he says. “It’s never asked directly. Instead, it’s indirectly asked as 'Why should we care?' There are a few factors at play: unconscious ableist attitudes, incentive structures that don’t reward what is perceived as the unglamorous parts of the work, and the myopia of people designing and building for their own immediate biases and preferences."

In many organizations, that argument is still being lost. Which means the documentation gap never gets a chance to close.

## The questions your design system doesn’t automatically answer

Cognitive accessibility can't be validated by a checker or guaranteed by a component. Whether someone can find their way back mid-task, whether an error message is clear enough to act on under stress, and whether navigation is consistent enough to build a mental model — these are all emergent properties of how a whole system behaves. They can only be committed to in documentation and governance — and commitments that aren't written down don't hold up later.

Eric Bailey describes a recent service launch at his organization — built by highly technically literate people, geared toward a wide general audience:

"User testing revealed many less technically literate peers struggled to onboard, understand interaction paradigms, or recover from corner case situations and error states,” he explains.

“All too predictable, yet a lesson that apparently needs to be learned over and over again. On the upside, this learning did communicate the value of speaking with the actual people who use your product. The research team is now actively supported and engaged — I hope this momentum is carried to other areas of the product, as well."

The system was built by people who knew exactly how to use it. It wasn't built for the people who needed to.

Translated into the specific questions a design system should answer:

### What should happen when someone steps away mid-task?

Most design systems document what a form component looks like. Almost none specify what should happen when someone with ADHD, a memory impairment, or just a demanding life gets interrupted and comes back 20 minutes later.

Should progress be saved? For how long? What should the interface tell them when they return? This decision is made by every team that builds a multi-step flow — or it gets filled by AI with whatever pattern appeared most frequently in the training data.

![A modal dialog reading &quot;Your application will be closed soon. We will close your application if you do not do anything in the next 48 seconds. Your answers will be deleted. This is to protect your information.&quot; A green ‘Continue’ button is shown below.](https://cmszeroheight.wpenginepowered.com/wp-content/uploads/2026/08/image-8.png)

Source: https://design-system.dwp.gov.uk/patterns/manage-a-session-timeout/examples/default

Some government design systems are beginning to answer this question explicitly. The [DWP Design System's session timeout pattern](https://design-system.dwp.gov.uk/patterns/manage-a-session-timeout) includes a principle that directly addresses Amy's situation: "Consider if your users might need long periods away from the screen, for example to collect documents or look up information."

![A modal dialog on a UK Home Office service page with a darkened overlay behind it. The modal reads &quot;You will be signed out soon. To protect your information, you will be signed out in 5 minutes.&quot; Two options are shown: a green ‘Stay signed in’ button and a ‘Sign out’ link.](https://cmszeroheight.wpenginepowered.com/wp-content/uploads/2026/08/image-9.png)

Source: https://design.homeoffice.gov.uk/design-system/patterns/help-users-to/manage-service-timing-out

The UK Home Office pattern goes further — so that people using a service are told whether their information or progress will be saved, and are taken back to the page they were on when they sign back in. These patterns demonstrate examples of documented answers to a question that most design systems leave open.

### What should an error message actually say?

Most design systems show what an error state looks like. Very few specify what it should contain. "Invalid input" is not an error message for someone with a reading disability or a traumatic brain injury trying to recover from a mistake. This is a documentation decision that belongs in your component page — and if it isn't there, every team and every AI tool will write their own version.

The stakes of getting that language wrong are higher than most documentation currently acknowledges.

![Book cover for &quot;Designed With Care: Creating Trauma-Informed Content,&quot; edited by Rachel Edwards, showing a geometric heart shape in blue and pink tones on a blue background, with contributor names listed below.](https://cmszeroheight.wpenginepowered.com/wp-content/uploads/2026/08/image-10.png)

Source: https://www.designedwithcare.org/

"When someone in crisis comes across content — any content — we have to remember that their brain isn't working as well as it normally does,” explains [Rachel Edwards](https://www.linkedin.com/in/rachel-edwards-scotland/), a lead content designer and the editor of [*Designed With Care: Creating Trauma-Informed Content*](https://www.designedwithcare.org/chapters). “They are flooded with stress hormones that make it harder to think, reason, make decisions, and understand information or actions. Doing something that they might find easy on a good day becomes incomprehensible, or even impossible."

Rachel points out that this is something most people have experienced without naming it:

"Ever said, 'Slow down!' or 'Just tell me what I need to do'? That's us being overloaded, stressed, and unable to take in and process information."

And the implication for how design systems encode language is even more specific than most documentation currently reflects:

"Sometimes the kindest thing you can do for someone who is stressed and overwhelmed is to just tell them clearly and simply what they need to do — rather than trying to empathizse or tell them how they feel, “ Rachel says. “Technical jargon that makes its way in front of the user — it happens! — can risk causing confusion and even harm to someone."

### How should navigation behave consistently across every product?

Instructional design also doesn’t have to predict outcomes to be useful. It can simply act as in-the-moment scaffolding to make a situation easier, and that same principle works for navigation consistency across every product.

Because consistency isn't a component property. It's a system property — it emerges from how your entire product ecosystem behaves, across every team, every surface, every release. For someone with memory difficulties or dementia, an interface that behaves differently from one product to the next isn't just frustrating. It's a barrier that compounds with every interaction.

Rachel recommends going back to basics — subtracting, even — rather than adding to what already exists:

“When we design for cognitive accessibility, we’re usually not talking about adding a whole lot of new things to our design practice. Many best practices already work really well for people who are in crisis. Things like short sentences and simple words are great. So are things like one question per page, lots of white space, and letting someone know where they are in your service.”

## Why cognitive accessibility for design systems is urgent now

![Screenshot of the WebAIM Million report page, last updated March 30, 2026, showing article contents including Introduction, The Sample, Methodology, and Detected Errors](https://cmszeroheight.wpenginepowered.com/wp-content/uploads/2026/08/image-12.png)

Source: https://webaim.org/projects/million/

[WebAIM's 2026 Million report](https://webaim.org/projects/million/) recorded the first reversal in six years of web accessibility progress. A stunning 95.9% of homepages now fail WCAG — up from 94.8% in 2025, with errors per page jumping 10.1% in a single year. WebAIM attributes this directly to AI-assisted coding — what they call, without irony, "vibe coding."

AI was trained on a web that was already failing. When teams started shipping with AI-assisted coding tools, those tools didn't fix that — they learned from it and reproduced it at scale.

As systems and platform designer [Anna E. Cook argued in her axe-con 2026 keynote](https://annaecook.com/writing/2026/ai-doesnt-fix-accessible-systems-it-depends-on-them): "If our system is accessible, it’s structured. If it’s structured, it’s parseable. If it’s parseable, AI can interpret it and create from it. When the foundation is wrong, no layer on top can fully compensate."

AI inherits your design system. The questions it doesn't answer, AI fills with pattern. And the pattern it learned from was never designed for Amy.

## What shared responsibility looks like in practice

Cognitive accessibility in government services rarely fails because nobody cared. Often, these initiatives fail because the questions that need answering don't belong to any single role — and without a clear home in the system, even the best questions don't get answered consistently at all.

### Designing beyond individual components

![Screenshot of the DWP Accessibility Manual showing the Service Designer guidance page, with navigation listing roles including Accessibility Specialist, Content Designer, Interaction Designer, and others](https://cmszeroheight.wpenginepowered.com/wp-content/uploads/2026/08/image-11.png)

Source: https://accessibility-manual.dwp.gov.uk/guidance-for-your-job-role/service-designer

[Stéphanie Krus](https://stephanie.chezleskrus.com/) is a senior service designer in the UK’s public sector, where she helped develop the [DWP Accessibility Manual's guidance for the service designer role](https://accessibility-manual.dwp.gov.uk/guidance-for-your-job-role/service-designer). On the mid-task interruption question, she points out why documenting this type of guidance can be harder than it initially looks:

"If the information people are entering is sensitive — which is the case most of the time in government — we need to reduce the risk of someone accessing this, whether it's in a public area like a library, or at home, where it might be dangerous if someone else knew they were doing it. Should we save each step? If so, do people need to create an account? Having yet another account can have a cognitive cost, too. If the person is told ahead of time what they will be asked for, they can prepare the information we might request — or decide that now is not a good time to start."

![Screenshot of the GOV.UK Design System components page showing the ‘Exit this page’ component, with a description reading &quot;Give users a way to quickly and safely exit a service, website or application&quot;](https://cmszeroheight.wpenginepowered.com/wp-content/uploads/2026/08/image-10.png)

Source: https://design-system.service.gov.uk/components/exit-this-page/

Stéphanie mentions the [GOV.UK exit page component](https://design-system.service.gov.uk/components/exit-this-page/) as one example of a design system [encoding a response to a specific human safety need](https://designnotes.blog.gov.uk/2023/08/14/exit-this-page-fast-with-the-design-systems-new-component/) — a component that exists precisely because someone asked what happens when a person needs to leave a service quickly and safely.

The governance challenge extends beyond documentation into how teams test and collaborate across the whole service.

"Designing a time-out involves the tech people,” Stéphanie argues. “Designing an upload functionality involves interaction, content, user research, and tech — can we help people ensure they are uploading the right file? Can they preview it once uploaded? If they struggle, are we providing good error messages, and at what point in the interaction? It's hardly ever about just one role."

Cognitive accessibility isn't a component problem, a content problem, or a developer problem. It's a systems problem — and it only gets solved when everyone on the multi-disciplinary team knows their part.

"We need to test whole journeys, not just steps in the end-to-end journey and across different channels, to understand where we might be inconsistent, where we might have gaps,” Stéphanie recommends. “When we do accessibility testing, we need to go beyond screen reader users or visual impairments and make sure we also test with people with various cognitive disabilities, so their issues can be surfaced."

### Why cognitive accessibility is also about safety

That testing imperative connects directly to a broader point about what it means to design safely — not just accessibly.

"The most important thing a system or service can be is safe — yet safety is often left out of the design process, either through a lack of understanding or a belief that it's designing for too narrow an edge case,” says [Kieran Cutting](https://kierancutting.substack.com/), a service designer in the UK public sector who has written about [how safety and accessibility are inseparable in digital public services](https://kierancutting.substack.com/p/your-service-isnt-accessible-if-it). “In reality, the people who most need a service are often the same people most likely to be harmed by it if safety isn't designed in."

"Design well for cognitive accessibility, and you're often already designing in a trauma-informed way: being as transparent as possible, building in choice throughout someone's journey, and keeping their safety at the forefront."

That consistency isn't just about usability — it's about giving people the conditions to feel safe enough to continue.

"Recurring service patterns help people prepare to engage with them. When an organization asks for my address history, I already know it'll want the past five years, because I've seen that pattern before. Patterns like these help people feel prepared, anticipate what's coming next, and pick back up where they left off if something becomes too difficult to continue in the moment."

And the stakes are highest precisely when the information being requested is most sensitive.

"Cognitive accessibility matters even more when you're asking for information that might be difficult or retraumatizing to give,” Kieran points out. “You need to be certain you're only asking for what's actually necessary — both to minimize the chance of that becoming a harmful experience, and to make sure people can safely and accurately recall or access what you're asking for."

## Why advocacy matters even when it isn't always rewarded

None of this is easy to argue for inside most organizations — and the practitioners doing it know that better than anyone.

Eric Bailey speaks to how the work can often feel unofficial, or driven by personal initiative:

"Cognitive accessibility issues are difficult to quantify, hence WCAG not having much coverage of the concern. Without a measurable metric, most organizations won't invest the resources needed to do the work. You won't get rewarded for making cognitive accessibility considerations more visible. However, doing this quiet future-proofing work does go a long way — especially when you consider the actual human impact."

The wins are invisible, and the case has to be made over and over. But the decisions that get made in your system — the questions you answer, the intent you document, the consistency you govern — are the ones that travel. The ones that hold. The ones that shape real people's lives.

Every decision encoded in a design system is a decision made on behalf of every person who will ever use a product built from it. Most of those people will never be in the room. They'll never be consulted. They'll never file a bug report. They'll just experience the consequences of decisions made without them — or feel, sometimes without knowing why, that something was made with them in mind.

The current reality is that cognitive accessibility isn't easy, and there isn't a templated checklist that solves it systematically. Questions need to be asked out loud, answered as a team, and documented widely enough that the answers survive — across roles, across sprints, across the whole organization. That's harder than a checklist. It's also the only thing that actually works at scale.

People are the point. The system is how you reach them.

*Amy is a composite persona drawn from* [*W3C cognitive accessibility research*](https://www.w3.org/WAI/WCAG2/supplemental/#-cognitive-accessibility-guidance)*. She represents documented patterns of real experience, not a specific individual.*  
  
*And* *for a deeper dive on how accessibility intent gets lost between base and product systems — and what to do about it —* [*Anna E. Cook's piece on this blog*](https://zeroheight.com/blog/how-accessibility-gets-lost-between-base-and-product-design-systems/) *explores when to stay within a system, and when to deviate from it.*

![Nathania Gilson](https://cmszeroheight.wpenginepowered.com/wp-content/uploads/2026/07/nathania_gilson-196x196.jpeg)

Nathania Gilson

Try zeroheight

The design systems platform that keeps teams and agents in sync

[

Start for free

](https://zeroheight.com/create/account/?trialPlanId=3)