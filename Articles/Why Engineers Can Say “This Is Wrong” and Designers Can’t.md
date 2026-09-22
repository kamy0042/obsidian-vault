---
title: Why Engineers Can Say “This Is Wrong” and Designers Can’t
source: https://www.designsystemscollective.com/why-engineers-can-say-this-is-wrong-and-designers-cant-e6492aded0b3
author:
  - "[[Kevin Muldoon]]"
published: 2026-01-17
created: 2026-04-13
description: Why Engineers Can Say “This Is Wrong” and Designers Can’t One ships. The other schedules more meetings If you’re an engineer who’s sat through a design critique, you’ve felt a specific …
タグ:
作成日時:
URL:
Tags: [topic/デザインシステム/運用・浸透, topic/組織/ハンドオフ, topic/組織/組織文化]
---
## [Design Systems Collective](https://www.designsystemscollective.com/?source=post_page---publication_nav-dbd299f90c1d-e6492aded0b3---------------------------------------)

[![Design Systems Collective](https://miro.medium.com/v2/resize:fill:76:76/1*KfuDI5s2VksG_8pWv0nCFA.jpeg)](https://www.designsystemscollective.com/?source=post_page---post_publication_sidebar-dbd299f90c1d-e6492aded0b3---------------------------------------)

A welcoming community for designers and developers passionate about scalable, consistent design. Explore articles, insights, and resources to build and refine your design systems. Join us to connect, learn, and shape the future of systematic design together.

## One ships. The other schedules more meetings

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*-Yd5ZnAK8rCvUwoeVyxkLA.png)

If you’re an engineer who’s sat through a design critique, you’ve felt a specific kind of frustration.

Not because designers lack taste. Not because collaboration is bad. But because decisions that should be resolvable somehow never are. Meetings stretch. Opinions stack up. The work moves, but nothing ever *lands*.

Design critique didn’t fail because designers are subjective. It failed because the profession refuses to make its decisions falsifiable.

> *Non-members can read this full story for free* [***via this link***](https://medium.com/design-systems-collective/why-engineers-can-say-this-is-wrong-and-designers-cant-e6492aded0b3?sk=84380e600726d06d10b92188a714b699)*. If you enjoy this article, consider* [***becoming a Medium member***](https://medium.com/membership) *for just $5 a month* *to support writers directly — or follow for more stories like this.*

You’ve been in both meetings.

In a code review, disagreement collapses quickly. Does it compile? Do the tests pass? Does it follow the style guide? Feedback is concrete: “Missing a null check on line 47.” The pull request is approved, rejected, or sent back. A decision is made. The system moves forward.

In a design critique, mockups go up and certainty evaporates. “I’m not sure about the blue.” “It feels a little busy.” Thirty minutes later, the designer leaves with six conflicting opinions and no criteria for resolving them. The meeting ends the same way it began: “Let’s circle back.”

Same meeting shape. Wildly different outcomes.

Here’s the difference: code review resolves disagreement against external standards. Design critique usually doesn’t.

> If design decisions can’t be wrong, they also can’t be reviewed.

## The Contrast

To understand the difference, look at what each field actually tells practitioners to do when they disagree.

[Google’s engineering practices documentation](https://google.github.io/eng-practices/review/reviewer/standard.html) states the principle plainly:

> *“Technical facts and data overrule opinions and personal preferences.”¹*

That’s not a suggestion. It’s the standard. When reviewers disagree about code, they don’t retreat into “well, that’s just my preference.” They appeal to authority: the style guide, the test suite, the performance benchmark. On matters of style, Google’s documentation continues, “the style guide is the absolute authority.”\[¹\]

Now consider design critique’s equivalent guidance. The field’s standard reference, [*Discussing Design*](https://www.oreilly.com/library/view/discussing-design/9781491902394/) by Adam Connor and Aaron Irizarry, offers this framework:

> *“For whatever aspect of a design you’re critiquing, you can ask: ‘does this help us reach our goal of…’ or ‘does this adhere to the principle of… that we set?’”²*

At first glance, this looks similar. Both appeal to principles. Both reference standards the team has established. So what’s different?

Not what you might think. Google’s style guide isn’t handed down from some engineering Sinai — they *chose* four-space indentation. Other companies choose two. The rules are locally selected. Engineering standards aren’t more “objective” than design standards could be.

The differences are subtler and more important:

**Engineering documents choices and treats documentation as binding.** Once selected, the style guide *becomes* authoritative. The choice is local; the enforcement is absolute. Connor and Irizarry’s framework assumes teams have set principles — but provides none, and design culture rarely documents them with the same rigor.

**Engineering has industry-wide pattern consensus.** [Gang of Four design patterns](https://en.wikipedia.org/wiki/Design_Patterns). [SOLID principles](https://en.wikipedia.org/wiki/SOLID). [REST conventions](https://en.wikipedia.org/wiki/REST). These aren’t universal laws — they’re hard-won consensus that emerged from decades of practice, were documented extensively, and are now taught as baseline literacy. A team adopting the [Repository pattern](https://martinfowler.com/eaaCatalog/repository.html) doesn’t have to justify it from first principles; the argument has already been made, elsewhere, and the team is borrowing established credibility.

**Unfortunately, design has none of this.** No equivalent to Gang of Four for interaction patterns. No SOLID for visual hierarchy. Each team invents principles from scratch, defends them from scratch, and watches them evaporate when the senior designer who championed them leaves.

This isn’t a new observation. [Massimo Vignelli](https://en.wikipedia.org/wiki/Massimo_Vignelli) argued that design professionalism requires three things: history, theory, and criticism. Engineering has all three — documented decisions that persist, consensus frameworks teams can adopt, and evaluation processes that resolve disputes. Design abandoned them and called it progress.

Without this professionalism, design critique is unmoored from independent analysis. What’s left is vibes.

![An image of a table. On the left are actions/feedback typical for code. On the right are the same actions/feedback for design.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*CNUvJjjpRWC8l_Oo0MI1_Q.png)

On the left are typical actions/feedback for code. On the right are the same actions/feedback for design.

The output of code review is a binary decision. The output of design critique is often another meeting.

## What Goes Wrong

The designers who hate this most are the ones with real standards. They trained in typography, color theory, accessibility, visual systems. They have principles — grounded in decades of practice and cognitive research. But the professional discourse has made those principles illegitimate to invoke. The designer who says “this breaks the [Gestalt principle of proximity](https://en.wikipedia.org/wiki/Gestalt_psychology#Proximity) ” gets the same response as the one who says “I don’t like green”: a shrug and “well, that’s your opinion.”

The field has made expertise indistinguishable from preference.

The predictable pathologies follow: Design by committee. [HiPPO](https://www.wiley.com/en-us/Web+Analytics%3A+An+Hour+a+Day-p-9780470130650) wins by default.\[³\] Designer burnout — because defending taste you can’t articulate is exhausting. Engineers lose respect, having sat through too many meetings where “final” meant “until the next stakeholder drive-by.”

Some teams solve this through strong design leadership. But that’s fragile — it depends on one person staying, and it doesn’t transfer. Engineering’s approach scales. Design’s approach hopes.

## The Way Forward

You can’t fix this with better facilitation. But you can make design critique functional by doing what engineering did: introducing falsifiable criteria.

Here’s the problem: those criteria mostly don’t exist yet. Not in usable form.

[WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) exists, but its color contrast formula is a [starting point, not an ending point](https://uxdesign.cc/what-the-wcag-3-0-767a0a71d4e4). Design systems exist, but they document *what* without *why* — the button is blue, but nobody recorded the reasoning. Pattern libraries show you the modal, not the conditions under which it’s the right choice.

The infrastructure for falsifiable decisions was never built. So you have to build it.

## Document the Why, Not Just the What

This is the core practice. Everything else follows from it.

Here’s what button documentation typically looks like:

```hs
## Button

### Variants

- **Primary:** #0066CC background, white text
- **Secondary:** transparent background, #0066CC text, 1px border
- **Destructive:** #CC0000 background, white text

### Specs

- Border radius: 8px
- Padding: 12px 24px
- Font: 14px/20px, Semi-bold
- Min-width: 120px
```

This tells you *what* to build. It doesn’t tell you *why*. When someone asks “can we make the button rounder?” or “why can’t the destructive button be orange?” — there’s no answer except “that’s what it says.”

Here’s the same button with rationale:

```hs
## Button

### Variants

- **Primary:** #0066CC - Brand blue, verified WCAG AA against white. 
  Use for single primary action per screen.
- **Secondary:** Transparent + border - Visual hierarchy research showed 
  users distinguish primary/secondary 40% faster with fill vs. outline.
- **Destructive:** #CC0000 - User testing confirmed red signifies "caution" 
  across our international user base. Reserved for irreversible actions only.

### Specs
- **Border radius: 8px** - A/B tested against 4px and 16px; matched brand 
  perception of "modern but professional." Revisit if brand guidelines update.
- **Padding: 12px 24px** - Meets 44px min touch target (iOS HIG).
- **Font: 14px/20px Semi-bold** - Minimum readable size for 45+ demographic.
- **Min-width: 120px** - Prevents awkward "Yes"/"No" buttons. German CTAs 
  run ~40% longer.
```

Every spec has a reason. Some reasons are research; some are pragmatic (“German CTAs run longer”). Both are valid. Both are documented. Both can be revisited when circumstances change.

The first is a spec. The second is a falsifiable decision log. When someone proposes a different border radius, they have to engage with the rationale — not with you personally.

## Start Monday

Here’s a secret about working in large organizations: engineers and designers sit in different departments, but you ship together. And you’ve felt the friction — the meetings that don’t resolve, the decisions that unravel, the “final” that wasn’t.

You can help fix this. Not by asking better questions in critique (though that helps), but by doing what engineers do: building infrastructure.

### Build Theirs, Not Yours

If you stand up *your* wiki to document design decisions, you’re overstepping. If you stand up *theirs*, you’re helping.

First, check what already exists. Many organizations have design documentation platforms — [ZeroHeight](https://zeroheight.com/), [Supernova](https://www.supernova.io/), or a homegrown wiki. If that’s in place, you don’t have an infrastructure problem. You have a *content* problem: specs without rationale, “what” without “why.” The fix isn’t a new tool — it’s adding a “Rationale” field to what’s already there.

If nothing exists, you have two problems: no freely accessible documentation, *and* no practice of writing it correctly. Solve the first one simply. A shared Google Doc beats a locked wiki. A public README beats a gated design tool. Don’t let perfect be the enemy of *exists*.

Either way, the documentation must be frictionless to access. If there’s any paid restriction or permission barrier, you’ve built a system designed to fail. The PM who needs to reference the button rationale shouldn’t need a Figma license. The executive asking “why does it look like this?” shouldn’t be told “it’s in Confluence, I’ll send you a screenshot.”

### Document What’s True, Not What’s Ideal

What if the designer doesn’t know why a decision was made? What if the honest answer is “our lead liked it”?

Document that.

*“Primary button color: \#0066CC. Rationale: Selected by design lead, \[date\]. No documented user research.”*

That’s not a failure — that’s the truth, written down. The next time someone asks “why blue?”, the answer isn’t a shrug — it’s a record that invites improvement. Decisions documented today can be revised tomorrow. ==The goal isn’t perfection. The goal is== ==*something to point to*====.==

## Just Do It

You’ve suggested process improvements before. They got nodded at in meetings and nothing changed. Stop suggesting. Start doing.

Stand up a lightweight solution — a Notion page, a README, a shared doc. Test it with one designer on one project. Don’t announce you’re “improving the process.” Just offer: “Hey, I made this thing. Want to try it?”

Don’t schedule a kickoff. Don’t request stakeholder alignment. Just build a small thing, populate it with one or two real decisions, and show it to someone who’d benefit. Process improvements that require buy-in before they exist rarely get buy-in. ==Process improvements that already work get adopted.==

If it works, it spreads. If it doesn’t, you’ve lost an afternoon, not a quarter.

Your designer colleagues have been fighting this battle without ammunition. Design doesn’t need more empathy. It needs more infrastructure. And infrastructure is how professions remember what they’ve already learned.

## References

\[¹\]: Google Engineering Practices Documentation, “The Standard of Code Review.” Available at: [https://google.github.io/eng-practices/review/reviewer/standard.html](https://google.github.io/eng-practices/review/reviewer/standard.html)

\[²\]: Connor, Adam, and Aaron Irizarry. [*Discussing Design: Improving Communication and Collaboration through Critique.*](https://www.oreilly.com/library/view/discussing-design/9781491902394/) O’Reilly Media, 2015. ISBN: 978–1–4919–0240–0.

\[³\]: The term “HiPPO” (Highest Paid Person’s Opinion) was popularized by Avinash Kaushik in [*Web Analytics: An Hour a Day*](https://www.wiley.com/en-us/Web+Analytics%3A+An+Hour+a+Day-p-9780470130650) (Wiley, 2007).

\[⁴\]: Popper’s concept of falsifiability — that a claim must specify conditions under which it would be proven wrong — appears throughout his work, most notably in [*The Logic of Scientific Discovery*](https://en.wikipedia.org/wiki/The_Logic_of_Scientific_Discovery) (1934).

*Kevin Muldoon is a Design Systems Architect who writes about design technology, organizational culture, and cross-disciplinary pattern recognition. His work on design tokens, color systems, and naming conventions has shaped enterprise design systems at Verizon, Dow Jones, and Aetna.*