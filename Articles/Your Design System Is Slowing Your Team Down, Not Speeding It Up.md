---
title: "Your Design System Is Slowing Your Team Down, Not Speeding It Up"
source: "https://medium.com/design-bootcamp/your-design-system-is-slowing-your-team-down-not-speeding-it-up-ef6314b3ac93"
author:
  - "[[Ciara Hayes]]"
published: 2026-07-17
created: 2026-07-26
description: "The tool that was supposed to remove friction had quietly become the biggest source of it."
tags:
  - topic/デザインシステム/戦略・ガバナンス
  - topic/デザインシステム/批評・本質論
---
## The tool that was supposed to remove friction had quietly become the biggest source of it.

A designer on my team spent forty minutes trying to get approval to change a button’s border radius from six pixels to eight.

Not redesign the button. Not rethink the interaction. Eight pixels instead of six, because the six pixel version looked slightly out of place next to a new card component we’d just shipped. She opened a ticket in our design system backlog, waited for the weekly review meeting, presented her case to four people who had opinions about a decision that would affect maybe eleven pixels of visual difference across the entire product, and left the meeting without an answer, because two of the four wanted to “think about broader implications.”

I watched this happen and felt something I hadn’t expected to feel about a design system I had personally championed two years earlier. Embarrassment.

We built that system to solve a real problem. Before it existed, every team shipped slightly different buttons, slightly different spacing, slightly different everything, and the product felt like it had been assembled by four companies that had never spoken to each other. The design system fixed that. Consistency went up. Onboarding new designers got faster, because there was finally a shared vocabulary instead of tribal knowledge locked in someone’s head.

But somewhere between fixing that problem and where we ended up, the system had stopped being infrastructure and started being government. Every small decision now required a review. Every review required a meeting. Every meeting required consensus from people who weren’t actually building the thing in question, and consensus, I’ve come to believe, is one of the most expensive things an organization can demand for decisions that don’t warrant it.

I started paying closer attention after that forty minute meeting about a button, and what I found unsettled me. We had built a system meant to remove friction from design decisions, and it had slowly become the single largest source of friction in our entire design process. Not because the system was badly built. Because nobody had ever gone back to ask whether the governance around it still matched the problem it was originally meant to solve.

## The System Was Never the Problem. The Governance Was.

Most critiques of design systems attack the wrong target. People blame the components, the documentation, the tooling, when the actual bottleneck almost always lives in the layer above all of that, the decision making process that determines who gets to change what, and how long that takes.

Our system itself was genuinely well built. Clean component architecture, solid documentation, decent Figma library organization. None of that was the issue. The issue was that we’d designed the governance around it as if every change carried equal risk, and treated every proposed modification with the same level of ceremony, regardless of whether it affected one screen or the entire product.

This is a pattern I’ve since noticed across nearly every design system that starts to calcify. Early on, when the system is small and the team trusts each other, changes happen fast, almost too fast, without enough scrutiny. Then something breaks, a color token gets changed and quietly wrecks contrast ratios across a dozen screens nobody thought to check, and the organization overcorrects. A review process gets built. That review process works reasonably well at first. Then more people join, more stakeholders want a voice, and the review process that once took a day starts taking two weeks, because more people means more schedules to coordinate and more opinions that all feel equally entitled to weigh in.

Nobody ever consciously decided that a border radius change should require the same governance process as a new color token that touches accessibility contrast across the whole product. It just accumulated that way, because removing process is much harder than adding it. Adding a review step feels responsible in the moment it’s added. Removing one feels like you’re inviting the exact mistake that justified adding it in the first place, even years after the context that created it has completely changed.

What I’ve learned is that design system governance needs to be tiered by actual risk, not applied uniformly out of habit. A change to a foundational token, color, spacing scale, typography, that touches hundreds of components deserves real scrutiny, because getting it wrong is expensive and hard to reverse. A change to a single component’s border radius, used in three places, reversible in an afternoon, does not deserve the same process. Treating them identically doesn’t make the low risk change safer. It just makes the whole system slower, and slowness eventually teaches your best designers to route around the system entirely, which is precisely the fragmentation the system was built to prevent in the first place.

## When the System Starts Optimizing for Itself

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*JVvgCgU-LSnbUo6AMLSK-w.jpeg)

Image showing two overlapping circles in a Venn diagram style

Here’s the part that took me the longest to see clearly, and I think it’s the part most teams never see at all, because admitting it means admitting the system has developed something like institutional self interest.

A design system, once it has a dedicated team, a roadmap, and a headcount attached to it, starts to develop goals that aren’t identical to the goals of the product teams it’s supposed to serve. This isn’t malicious. It’s structural. A design system team’s success metrics tend to be adoption rate, consistency score, component reuse percentage, things that are genuinely useful proxies for value, but proxies that can be optimized in ways that actively work against the product teams using the system.

I watched this happen directly. Our design system team, entirely reasonably from their own vantage point, wanted higher adoption of a new data visualization component they’d spent a quarter building. A product team building an analytics dashboard needed a chart interaction that the new component didn’t support well, a specific drill down behavior that mattered enormously to their actual users. The design system team’s instinct, again not from malice but from incentive, was to push the product team toward adapting their design to fit the existing component rather than approving a variant or an exception, because every exception granted was, in their internal metrics, a small failure of the system’s core promise of consistency.

The product team spent three weeks negotiating a compromise that satisfied nobody, a chart that technically used the approved component but required six lines of override code to behave the way their users actually needed, code that then became technical debt nobody claimed ownership of, because it existed in the seam between two teams with different incentives.

This is the trade-off almost nobody names honestly in design system conversations. Consistency and flexibility are in real tension, not imagined tension, and every design system has to choose, explicitly or by default, how much of one it’s willing to sacrifice for the other. Systems that lean too far toward flexibility drift back into the fragmented mess they were built to solve. Systems that lean too far toward consistency start forcing product teams into solutions that technically match the design language and functionally fail the actual user in front of them.

I think the healthiest design systems I’ve encountered, and I include a specific period of our own system’s life in this, before the governance calcified, treat exceptions as information rather than failures. If three separate product teams need the same variant the system doesn’t support, that’s not three teams being difficult. That’s a signal the system’s coverage has a gap worth closing. Treating every exception request as a threat to consistency, rather than as data about where the system’s assumptions don’t match reality, is how systems slowly drift from serving the product to demanding the product serve it instead.

## The Meeting That Should Have Been a Decision Tree

After the border radius incident, I did something that felt almost too simple to matter, and it ended up being the highest leverage change we made that year.

I sat down with our design system lead and mapped every category of change that had come through the review process in the previous six months. Not the specific decisions, the categories. New foundational token. New component. Modification to an existing component’s visual properties. Modification to an existing component’s behavior. New variant of an existing component. Deprecation of a component. Exception request for a one off use case.

For each category, we asked a blunt question. What’s the actual cost of getting this wrong, and how easily can it be reversed if we do get it wrong. A new color token that touches accessibility contrast across the system is expensive to get wrong and moderately hard to reverse once fifty screens have shipped using it. That deserves real review. A new variant of an existing button component, additive rather than replacing anything, reversible by simply not using it if it doesn’t work out, is cheap to get wrong and trivial to reverse. That does not need the same four person meeting.

We built what became, informally, a decision tree rather than a single review process. Foundational and structural changes still went through full review with representation from accessibility, engineering, and multiple product teams. Additive, reversible, low blast radius changes, new variants, new component compositions using existing tokens, got approved by a single design system maintainer within a day, sometimes within an hour, with a lightweight async written justification instead of a meeting.

The effect was immediate in a way that honestly surprised me, given how simple the change was. The backlog of pending design system requests, which had been growing for months, started shrinking within the first two weeks. More importantly, I started seeing designers use the system as a tool again instead of negotiating with it as an obstacle. The forty minute button meeting became, for equivalent future requests, a same day async approval with a clear written rationale that other designers could reference later without needing to ask in a meeting themselves.

What surprised me most about this fix wasn’t that it worked. It was how long we’d gone without trying it, because the existing process, however slow, had never been bad enough on any single day to justify the effort of redesigning it. It had just been bad enough, accumulated across two years, to quietly cost us more design velocity than almost anything else in our workflow, and nobody had ever measured that cost directly enough to notice.

This is, I think, the pattern worth naming clearly. Bad governance rarely fails catastrophically in a way that forces a fix. It fails slowly, in accumulated minutes and small frustrations, until the total cost becomes enormous while no single instance of it ever looked bad enough on its own to warrant fixing. You have to go looking for that cost deliberately, because it will never show up on its own the way a system outage or a missed deadline does.

## What Actually Gets Lost When Systems Get Too Rigid

There’s a cost to over governed design systems that goes beyond wasted meeting time, and it’s the one I think matters most for anyone leading design at scale. Rigid systems don’t just slow down decisions. They slowly train your best people to stop having design opinions at all.

I noticed this pattern specifically in our more experienced designers, the ones who had strong instincts and had shipped good work under less constrained conditions elsewhere. Over time, several of them stopped proposing anything that deviated from the existing component library, not because they’d run out of good ideas, but because the cost of proposing a deviation, the meetings, the justification documents, the waiting, had grown large enough that most ideas simply weren’t worth the friction required to pursue them. They started designing within the system’s existing vocabulary exclusively, even when a slightly different approach would have served users better, because the different approach meant a fight, and the existing approach meant shipping today.

This is an enormous, mostly invisible cost, because it doesn’t show up as a complaint. It shows up as an absence, the gradual disappearance of design judgment from a design team, replaced by component assembly. I don’t think this is what anyone intends when they build a design system. The intention is almost always to free designers from reinventing basic patterns so they can spend their attention on harder, more specific problems. What actually happens, when the governance grows too heavy, is closer to the opposite. Designers spend their creative energy on winning approval for changes rather than on the underlying user problem the change was meant to solve, and eventually a meaningful number of them stop bothering to try.

I think this connects to something Melvin Conway’s observation about organizational structure gets used for constantly in engineering contexts and far too rarely in design ones. Conway’s Law suggests that systems tend to mirror the communication structure of the organizations that build them. A design system with slow, hierarchical, consensus heavy governance will produce a product that feels slow, hierarchical, and overly negotiated in its details, even if no single component looks wrong in isolation. Users can feel when a product was designed by committee, even when they can’t articulate why. The friction in your process becomes friction in your product, not through any single bad decision, but through the accumulated texture of a hundred small compromises made to satisfy a review process rather than a user need.

What changed after we rebuilt our approval tiers wasn’t just speed. It was that designers started proposing things again. Small variants, new compositions, experiments that didn’t need to go through the heavy process because they were reversible and low risk. Some of those experiments failed and got quietly removed. Most of that is exactly what should happen in a healthy system, more small bets, faster feedback, less ceremony around decisions that don’t warrant it. The system got more consistent at the foundational level, where consistency actually matters for accessibility and brand coherence, and more flexible at the surface level, where flexibility is what lets a genuinely good design idea survive contact with the product it’s meant to serve.

## The Framework I Use Now for Every Design System Decision

I’ve since distilled what we learned into a framework I bring into every design system conversation now, whether I’m advising a startup building their first component library or auditing a mature system that’s started to feel heavy the way ours did.

The first question is always about blast radius. How many screens, flows, or products does this specific change actually touch, directly and indirectly. A token level change touching typography scale across the entire product has a large blast radius and deserves proportional scrutiny. A new variant of a card component used in one flow has a small blast radius and should be approved quickly by a single accountable person, not a committee.

The second question is about reversibility. If this decision turns out to be wrong in three months, how expensive is it to undo. Cheap, fast reversal justifies fast, low ceremony approval, because the cost of a wrong decision is low and the cost of a slow decision, delayed shipping, frustrated designers, is often higher than the risk being guarded against. Expensive, slow reversal justifies real scrutiny upfront, because getting it wrong compounds.

The third question, and the one most systems skip entirely, is who actually has the context to make this call well. Not who has a stakeholder title that entitles them to an opinion. Who has actually looked closely at the specific problem this change is solving. A four person committee where only one person has genuinely engaged with the underlying user need isn’t rigorous. It’s theater that produces the appearance of scrutiny while actually diluting the one informed opinion in the room with three uninformed ones.

The fourth question is how we’re measuring the system’s success, and whether that measurement has quietly started working against the teams it’s meant to serve. If your design system’s core metric is adoption percentage or component reuse rate, ask honestly whether that metric could be improved by making it harder to request exceptions, rather than by making the system itself genuinely better. Metrics that can be gamed by adding friction will eventually get gamed by adding friction, even unintentionally, because that’s the path of least resistance for whoever owns the metric.

The last piece of this framework isn’t a question. It’s a habit. Revisit your governance itself on a schedule, not just your components. We audit our component library regularly for staleness, deprecated patterns, unused variants. Almost no team I’ve encountered applies that same scrutiny to the process governing the library, even though process rot is, in my experience, more expensive than component rot, because it’s invisible until someone spends forty minutes arguing about eight pixels and finally says something out loud.

I think about that meeting sometimes, the one about the button, not because it was dramatic, but because it was so completely ordinary. Nobody in that room was wrong to care. Nobody was acting in bad faith. The system had simply grown a kind of gravity that pulled small decisions into the orbit of large process, and nobody had stepped back far enough to notice that the orbit itself had become the problem.

We built that design system to give our team a shared language, so that good decisions, once made, wouldn’t have to be re-argued every time someone opened a new file. What we forgot, for a while, is that a shared language still needs room for someone to say something new in it, and that room has to be protected as deliberately as the vocabulary itself.

If you looked closely at your own design system right now, not the components, the actual decision making process wrapped around them, how much of it is protecting something that genuinely still needs protecting, and how much of it is just habit wearing the costume of rigor?