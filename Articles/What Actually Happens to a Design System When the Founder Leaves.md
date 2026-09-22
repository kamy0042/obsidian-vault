---
title: "What Actually Happens to a Design System When the Founder Leaves"
source: "https://medium.com/@iAkio/what-actually-happens-to-a-design-system-when-the-founder-leaves-04efdfc58ce2"
author:
  - "[[Akio]]"
published: 2026-07-20
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/戦略・ガバナンス
  - topic/デザインシステム/運用・浸透
  - topic/組織/組織文化
---
The most dangerous legacy code is not in the repository. It is in the component library.

The Slack message went out at 4:15 PM on a Thursday. The founder was stepping down. The product was being handed over to a new executive team. The engineering and design departments were told to expect a transition period.

The immediate reaction in the design team was a mix of shock and quiet panic. But as the initial emotional wave settled, a different kind of anxiety began to take root. It was not about the company’s future. It was about the Figma file.

The founder had built the original design system. They had handcrafted every icon, defined every color token, and argued with the first engineers about the exact pixel radius of the primary button. The design system was their baby. It was the visual manifestation of their taste, their priorities, and their mental model of the product.

Now, the parent was gone.

I have been in this exact room during three different company transitions. I know the specific type of silence that falls over a design team when they realize they are now the sole guardians of a system built by someone else.

The first instinct is to do nothing. We tell ourselves that we will just maintain the system. We will keep it running. We will respect the founder’s legacy. We treat the component library like a historical monument that must be preserved behind velvet ropes.

But a design system is not a monument. It is a living tool. And when the person who defined its purpose leaves the building, the tool stops making sense.

Looking back at my first week after a founder transition, I noticed a subtle shift in how the team interacted with the files. Designers stopped using the official components. They started building local variants. Engineers started writing custom CSS overrides. The system was not breaking all at once. It was fracturing quietly, one micro decision at a time.

What surprised me most was realizing that the design system was never actually built for the team. It was built for the founder. It was optimized for their specific workflow, their speed, and their personal aesthetic preferences. The moment they left, the system stopped being an accelerator and became a bottleneck.

To understand how to save a design system after a founder leaves, we have to stop looking at the Figma files. We have to look at the psychology of the team, the governance vacuum, and the hidden social contracts that hold the product together.

## The Myth of the Living Design System

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*b1I_sTkNyJ6KvjN0lvfkiA.jpeg)

Figure 1. A founder’s design system is often a fossil record of their personal mental model, not a living tool for the current team.

We talk about design systems as if they are organic entities. We call them living, breathing ecosystems. We say they need to be nurtured and allowed to grow.

This is a beautiful metaphor. It is also completely misleading when applied to a founder-led system.

A true living system adapts to its environment. It responds to the needs of the organisms within it. But a design system built by a solo founder is not an ecosystem. It is a fossil record.

When a founder builds a product from scratch, they hold the entire mental model of the company in their head. They do not need to document their decisions because the context lives in their brain. If a product manager asks why a modal slides in from the right instead of fading in, the founder does not need to check a documentation site. They just remember that they read an article about cognitive load in 2018 and decided sliding felt faster.

The design system, in this context, is just an externalization of the founder’s working memory. It is a collection of their personal compromises, their fleeting inspirations, and their deeply held beliefs about how the product should feel.

Most people assume that a design system is a set of objective rules. They assume that every component exists because it is the optimal solution to a specific user problem.

What I have learned is that in a founder-led system, at least thirty percent of the components exist simply because the founder liked the way they looked on a Tuesday afternoon.

When the founder leaves, that context vanishes. The team is left with a Figma file full of highly specific, deeply opinionated components. They do not know which decisions were the result of rigorous user research and which decisions were just the founder copying a Dribbble shot they admired.

Because they do not know the difference, they treat everything as sacred. They assume every border radius, every shadow depth, and every interaction timing was chosen for a critical business reason. They become terrified of changing anything.

This is the myth of the living design system. We pretend it is alive, but it is actually frozen in time. It is trapped in the exact state of the founder’s mind on the day they last updated the library.

To fix this, we have to change how we view the existing assets. We need to conduct what I call an Intent Audit.

An Intent Audit is not a visual review. It is a historical investigation. You sit down with the remaining early employees, the founding engineers, and the original product managers. You go through the core components of the system and ask one simple question.

Why does this exist?

You will be shocked by the answers. You will find that the complex data visualization component that takes three weeks to update was built because the founder wanted to impress a specific investor during a seed round. You will find that the custom typography scale was chosen because the founder had a leftover license for a specific font foundry.

Once you separate the deliberate, research-backed decisions from the arbitrary, context-dependent whims, the system stops being a monument. It becomes a tool again.

You will realize that you do not need to preserve everything. You only need to preserve what serves the current team and the current users. The rest is just ghost data.

## The Orphaned Components and the Shadow Library

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*YL0ulEiR9vfM_FaRpcASyQ.jpeg)

Figure 2. The shadow library is not a sign of rogue designers. It is a map of where the official system is failing the team.

Once the team realizes that the official design system does not perfectly fit their current needs, a predictable psychological reaction occurs.

They do not immediately petition to rebuild the system. That takes too much time and requires too much political capital. Instead, they quietly start working around it.

This is the birth of the shadow library.

A shadow library is the dark matter of your product’s interface. It is the collection of local components, custom overrides, and unofficial variants that designers and engineers create to get their work done without fighting the official system.

Imagine a designer who needs to build a new settings page. The official design system has a “Card” component. But the founder designed the Card component with a very specific, heavy drop shadow and a thick border. The new designer thinks it looks dated and clashes with the new, lighter aesthetic the team is moving toward.

Instead of proposing a change to the core Card component, which would require a review from the design lead and might upset the engineers who have to refactor the code, the designer just duplicates the Card in their local Figma file. They remove the shadow, thin the border, and use it for their settings page.

On the engineering side, the developer sees the new design. They know it does not match the official component library. But they also know that updating the core component will break the old settings pages that still use the heavy shadow. So, they write a custom CSS class just for the new settings page.

The shadow library grows.

Six months later, you have three different versions of the Card component in the Figma file. You have four different CSS implementations in the codebase. The product looks slightly inconsistent. The engineering team is frustrated because they have to maintain custom code. The design team is frustrated because the official system feels useless.

Most design leaders look at this situation and blame the designers. They say the team is not adopting the system. They say the designers are being rogue and selfish.

This is a fundamental misunderstanding of human behavior. Designers are not trying to break the system. They are trying to do their jobs.

When a tool prevents you from doing your work efficiently, you find a workaround. That is not rebellion. That is basic problem solving. The shadow library is not a symptom of lazy designers. It is a symptom of a broken social contract between the system and the team.

One lesson I did not expect was how much the shadow library actually contains the roadmap for the next version of the design system.

If you want to know what the team actually needs, do not look at the official library. Look at the shadow library. The local variants they are creating tell you exactly where the official system is failing.

If every designer is creating a local variant of the primary button with a smaller padding, it means the official padding is too large for the current product density. If the engineers are constantly writing overrides for the modal overlay, it means the official modal does not support the complex data tables the team needs to display.

To fix the shadow library, you have to stop punishing the people who create it. You have to start studying it.

Create a process where designers and engineers can submit their local variants to a review board. Instead of saying no, ask them why they built it. Understand the friction they experienced with the official component. Then, take the best parts of their shadow variant and promote it to the official library.

When you do this, something magical happens. The team stops seeing the design system as a set of rules imposed on them from above. They start seeing it as a tool that responds to their needs. The shadow library shrinks, not because you forced it to, but because the official system finally became useful again.

## The Governance Vacuum and the War of the Pixels

When the founder is running the company, design governance is simple. The founder makes the decisions. If a product manager disagrees with a button color, the founder says no. If an engineer says a custom animation is too hard to build, the founder overrides them.

It is an autocracy. And in the early days of a company, autocracy is highly efficient. The founder’s taste is the product’s taste. There is no debate. There is no committee. There is just execution.

When the founder leaves, that autocracy collapses. And nature abhors a vacuum.

The immediate result is a descent into design by committee. Without a single authority figure to make the final call, every design decision becomes a negotiation.

I watched a team spend three weeks debating the hover state of a secondary link. The product manager wanted it to underline. The lead engineer wanted it to change color. The junior designer wanted it to do both. Because there was no clear governance model, they argued in Slack threads. They pulled in the VP of Product to mediate. They scheduled a meeting to discuss the cognitive load of underlines.

Three weeks. For a hover state.

This is the war of the pixels. It happens in almost every company after a leadership transition. The team confuses democracy with good design. They believe that if everyone gets a vote, the outcome will be better.

But design is not a democracy. It is a dictatorship informed by consensus. You need to gather input, you need to understand the constraints, but ultimately, someone has to make the call and move the product forward.

When governance breaks down, the design system stops being a unifying force. It becomes a battleground. Every component is contested. Every token is debated. The team spends more time arguing about the system than actually using it to build the product.

What I have learned is that the war of the pixels is rarely actually about the pixels. It is about power and ownership.

When the founder leaves, the team feels a loss of control. The product no longer belongs to the visionary who created it. It belongs to the company. In response, individual team members try to assert their own control over small pieces of the product. They dig in their heels on minor design details because they feel powerless about the major strategic shifts happening around them.

To stop the war, you have to establish a new governance model. But you cannot just appoint a new dictator. The team will resent it. You have to build a system of distributed ownership.

The most effective model I have used is the Design System Council.

The Council is not a massive, bureaucratic committee. It is a small, rotating group of three to five people. It includes one product designer, one engineering lead, one product manager, and one UX researcher.

The Council meets for exactly forty five minutes every two weeks. Their only job is to resolve disputes about the design system and approve new components.

The magic of the Council is not in the decisions it makes. The magic is in the rules of engagement.

Rule one is that the Council does not design. They only evaluate proposals. If a designer wants to change a core component, they must bring a fully fleshed out proposal to the Council. They must show the user research that justifies the change. They must show the engineering impact.

Rule two is that the Council operates on a consent model, not a consensus model. Consensus means everyone agrees. Consent means no one has a critical, blocking objection. If the engineer says the change will break the database, that is a blocking objection. If the product manager just prefers the old way, that is not a blocking objection. The proposal passes.

Rule three is that once the Council makes a decision, the debate is over. The team executes.

This structure removes the emotion from the process. It gives everyone a voice, but it prevents the loudest voices from dominating. It shifts the focus from personal preference to objective problem solving.

When you implement a clear governance model, the team stops fighting over hover states. They realize that the system is not a reflection of anyone’s personal taste. It is a negotiated agreement between design, engineering, and product. And that agreement is what allows them to move fast.

## Decoding the Founder’s Intent Versus the Team’s Reality

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*y9OgrrqfZH0n15VOLUS9Yw.jpeg)

Figure 3. The Sacred and the Whim matrix helps teams separate critical product features from the founder’s arbitrary technical experiments.

Even with a new governance model, the team will still struggle with the existing components. They will look at a highly complex, deeply nested component and feel a sense of dread. They will know it was built by the founder. They will be terrified to touch it.

This is the psychological weight of the founder’s legacy.

The team assumes that because the founder built it, it must be brilliant. They assume that the complexity is necessary. They assume that if they simplify it, they are somehow disrespecting the original vision.

This is a dangerous trap. It leads to a bloated, unusable design system that no one wants to touch.

You have to actively decode the founder’s intent and separate it from the team’s reality. The reality is that the team is different. The users are different. The technical stack is different. The system must reflect the current reality, not the historical one.

I use a framework called the Sacred and the Whim matrix to help teams navigate this.

You take all the core components and plot them on a two by two grid. The X axis is Technical Complexity. The Y axis is User Value.

Components that are high in user value and low in technical complexity are your quick wins. You can update these immediately.

But the most interesting part of the matrix is the bottom right quadrant. These are the components that are high in technical complexity but low in user value.

These are the founder’s whims.

These are the components that are incredibly difficult to maintain, require massive amounts of code, but the user barely notices them. Maybe it is a highly custom, physics based drag and drop interaction for a feature that only five percent of users access.

The founder loved building it. It was a fun technical challenge. But for the current team, it is a nightmare. Every time the framework updates, the component breaks. It takes weeks to fix. And the users do not care if it is there.

When you plot the system on this matrix, the whims become visually obvious. They are the heavy, complex anchors dragging the product down.

The hardest part of this process is giving the team permission to kill the whims.

Designers are naturally conservative. They do not want to delete things. They want to preserve options. Engineers are even more conservative. They do not want to delete code because they are terrified it will break something else.

You have to lead a deliberate decommissioning process. You take the whims from the matrix. You look at the usage data. If the usage is low, you make the hard call. You deprecate the component. You remove it from the Figma library. You delete the code.

I remember the first time we deleted a founder built component. It was a complex, animated navigation menu. The founder had spent two weeks building the spring physics for the animation.

When we proposed deleting it, the team was nervous. They felt like they were erasing history. But when we removed it, the build size of the application dropped by four percent. The engineering team was thrilled. The users did not notice a thing.

Something changed in the team’s psychology that day. They realized that the design system was not a museum. It was a garden. And sometimes, you have to pull out the weeds to let the useful plants grow.

Decoding the intent is not just about deleting things. It is about translating the founder’s vision into the current context.

Maybe the founder built a complex component because they wanted the product to feel premium. You do not need to keep the complex physics based animation to achieve that feeling. You can achieve the same feeling of premium quality with a simpler, cleaner, more performant interaction.

You honor the intent, but you change the execution. You respect the founder’s desire for quality, but you express it through the lens of the current team’s capabilities and the current users’ needs.

## Rebuilding the Social Contract of the Design System

We have talked about auditing the components. We have talked about stopping the shadow library. We have talked about establishing governance and killing the whims.

But all of these tactical steps will fail if you do not address the underlying issue.

A design system is not a Figma file. It is not a Storybook repository. It is not a set of design tokens.

A design system is a social contract.

It is an agreement between design, engineering, and product about how they will work together. It is a promise that if the designers use the components, the engineers will build them efficiently. It is a promise that if the engineers maintain the code, the designers will respect the constraints.

When the founder leaves, that original social contract is voided. The founder was the guarantor of the contract. They enforced the rules. They resolved the disputes. Without them, the contract is just a piece of paper.

The new leadership team cannot simply sign the old contract and expect it to work. The team has changed. The power dynamics have changed. The trust needs to be rebuilt from the ground up.

Rebuilding the social contract requires a fundamental shift in how the team views ownership.

Under the founder, ownership was centralized. The founder owned the vision, the system, and the final say. The team were just executors of the founder’s will.

In a mature, post founder organization, ownership must be distributed. The design system belongs to everyone who uses it.

This is a terrifying concept for many design leaders. They want to maintain strict control over the system to ensure consistency. They want to be the gatekeepers.

But gatekeeping creates bottlenecks. It creates resentment. It creates the shadow library.

To build a new social contract, you have to move from a model of gatekeeping to a model of contribution.

You need to create a clear, documented path for anyone on the team to contribute to the design system. If an engineer notices that a component is missing a specific state, they should be able to propose an update. If a product manager sees a pattern emerging in user research, they should be able to suggest a new component.

The Design System Council we talked about earlier is the mechanism for this. But the culture of contribution has to start before the Council even meets.

You have to celebrate contributions. When an engineer submits a pull request to fix a bug in a core component, acknowledge it publicly. When a junior designer proposes a new variant that gets adopted, highlight it in the team newsletter.

You have to shift the narrative from “maintaining the founder’s system” to “building our system.”

Language matters immensely in this transition. If you keep referring to it as “the founder’s design system,” the team will always feel like guests in someone else’s house. They will walk softly. They will be afraid to move the furniture.

Start calling it “our design system.” Start referring to the components as “our components.” It sounds like a small psychological trick, but it fundamentally changes how the team relates to the work.

One lesson I did not expect was how much the engineering team’s attitude changed when we shifted the ownership model.

For the first few months after the founder left, the engineers viewed the design system as a set of demands imposed on them by the design team. They grumbled about the complex animations. They complained about the strict spacing rules.

But once we opened up the contribution model, once we let the engineers help define the component APIs and the technical constraints, their attitude flipped. They started defending the system. They started pushing back on designers who tried to use local variants. They took pride in the quality of the code.

The social contract was no longer a set of rules written by a distant founder. It was an agreement they had helped write. They had skin in the game.

Rebuilding the social contract also means redefining what success looks like.

Under the founder, success was visual consistency. The product looked beautiful. It felt cohesive. The founder’s taste was evident in every pixel.

But visual consistency is a vanity metric. The true measure of a design system is velocity and quality.

Does the system allow the team to ship features faster? Does it reduce the number of bugs in the UI? Does it free up the designers to focus on complex user problems instead of drawing buttons?

When you measure the system by velocity and quality, the team stops obsessing over minor visual inconsistencies. They start focusing on the structural integrity of the components. They start asking better questions.

Instead of asking, “Does this shadow match the founder’s shadow?” they ask, “Does this component allow the product team to ship the new checkout flow in two weeks?”

That shift in focus is the ultimate sign that the new social contract is working. The team has stopped looking backward at the founder’s legacy. They are looking forward at the product’s future.

## The Cursor and the Context

Let me take you back to that Thursday afternoon. The Slack message had just gone out. The founder was leaving. The design team was sitting in silence, staring at the Figma file.

They were looking at the component library, wondering what to do next. They were wondering how to preserve the legacy. They were wondering how to avoid breaking the system.

I wish I could go back and tell them what I know now.

I would tell them to close the Figma file. I would tell them to stop looking at the pixels.

I would tell them that the design system is not the file. The file is just a byproduct. The real system is the trust between the designers and the engineers. It is the shared understanding of the user’s needs. It is the agreement on how the team will solve problems together.

The founder took their mental model with them when they left. They took their personal taste, their arbitrary preferences, and their historical context.

What they left behind was a blank canvas.

Yes, it was covered in old paint. Yes, it required a lot of scraping and sanding to get it ready for a new coat. But it was a blank canvas nonetheless.

The most successful teams I have worked with did not try to perfectly preserve the founder’s design system. They used it as a starting point. They respected the good decisions. They ruthlessly eliminated the bad ones. And most importantly, they built a new culture around the system.

They realized that a design system is never finished. It is never perfect. It is just a reflection of the team that builds it.

When the founder leaves, the system does not die. It just wakes up. It stops being a reflection of one person’s mind and starts becoming a reflection of the entire organization.

That transition is messy. It is uncomfortable. It involves arguments about hover states and long debates about border radii. It involves deleting sacred cows and building shadow libraries.

But it is also incredibly liberating.

When the team finally takes ownership of the system, when they stop treating it as a historical artifact and start treating it as a living tool, the product changes. It stops feeling like a tribute to the past. It starts feeling like a vehicle for the future.

The cursor is still blinking in the Figma file. The components are still there. But the context has changed.

The founder is gone. The team is here. And for the first time, the design system actually belongs to them.

When you inherit a design system from a previous leader, what is the first component you would audit to determine if it serves the current team or just preserves the past?