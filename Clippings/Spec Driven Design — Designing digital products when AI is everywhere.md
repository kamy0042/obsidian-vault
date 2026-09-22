---
title: "Spec Driven Design — Designing digital products when AI is everywhere"
source: "https://medium.com/@edoardotorda/spec-driven-design-designing-digital-products-when-ai-is-everywhere-11c373e870b9"
author:
  - "[[Edoardo Torda]]"
published: 2026-07-15
created: 2026-09-14
description: "More"
tags:
  - "clippings"
---
There’s a moment, in any technological shift deep enough, when learning a new tool isn’t enough: you have to change the way you think about the work itself. That’s what’s happening to design right now, and not in the sense it’s usually described — “AI generates interfaces faster” — but in a far more radical sense: it changes what designing means, in what order decisions get made, who gets to make them, and what they’re actually based on.

Over the past two years I’ve worked on a method that ties this shift together, and I’ve called it **Spec Driven Design** [(from Spec Driven Development).](https://en.wikipedia.org/wiki/Specification-driven_development) It isn’t a tool, it isn’t a plugin, it isn’t yet another collection of prompts for Claude or Figma: it’s a different way of moving through the entire design process, from research all the way to the shipped product, built for a context where artificial intelligence isn’t an accessory to use here and there, but the fabric that connects every stage of the work to the next.

Before getting into the operational side, which I’ll cover in the articles that follow, it’s worth pausing on what has actually changed and why a different approach was needed from the one most of us learned to work with: how design has moved over the past few years, what “becoming a full-stack designer” really meant before AI rewrote the rules, and why today the whole reasoning has to revolve, far more than people admit, around data.

![muzli new tab](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4OmXLaKwVSCR5qmuLym0jQ.png)

muzli new tab

## How design moved before we got here

For a couple of decades, digital design went through a steady process of systematization. We moved from freehand screens to structured design systems, from personal intuition to increasingly rigorous research methodologies, from linear workflows (research first, then design, then development, each on its own track) to iterative processes where, at least on paper, research and design walked closer together. It was an era that gave design a new legitimacy: from a craft to a discipline with a method, shared tools, a recognized seat inside companies.

But there was a structural limit that no methodology ever managed to overcome: the hard line between who designed and who built. However deep a designer could go into research, product logic, information architecture, there was always a moment when their work had to be handed off to someone else to become real software. And in that handoff, a word we’ve always used for it, something got lost: unwritten intentions, interaction nuances too subtle to spec out in a static file, decisions made during design that got simplified or reinterpreted once they reached development.

The arrival of generative models broke this pattern, not gradually but all at once. Within a few months we saw people with no developer training producing working interfaces, wired to real data, deployable. Not prototypes that look like they work: applications that actually work. It’s a leap with no real precedent in the history of digital design, and it’s the point from which the entire argument for Spec Driven Design begins.

## The dream of the full-stack designer, and why code was the real obstacle

Anyone who’s been in this field for a while will remember the phrase “full-stack designer.” For years it was almost a collective aspiration: the designer able to move along the entire value chain, from research to at least some implementation, without having to depend on someone else at every single step. The people who actually pulled it off were a minority, and for good reason: it meant learning, on top of your own craft, a second craft just as complex, with different logic, different tools, a profoundly different way of thinking. Code wasn’t simply “another skill to add to the résumé”: it was a real barrier to entry, one that took years to overcome properly, and which in practice selected for a small number of people willing to invest that time.

The result was that most teams stayed organized around a hard split of roles, with all the coordination costs that comes with it: meetings to align intentions, documentation that aged faster than the project itself, review cycles where design “explained” to development what it meant, instead of simply being able to show it working.

What’s happening now is that code, as a barrier, has almost dissolved. Not because it’s become less complex in absolute terms, it’s still a domain with its own logic, performance to manage, architecture to understand, but because artificial intelligence has made that competence available on demand, instead of something to already possess. A designer who can describe precisely what they want to achieve can today arrive at a working implementation without having spent years writing code from scratch. Being full-stack in the classic sense of the term, with dual technical competence built up along two parallel tracks, is no longer necessary: it’s enough to know how to steer well a tool that puts that technical competence at your disposal exactly when it’s needed.

This doesn’t make code irrelevant, quite the opposite: it makes it even more important to be able to read it, evaluate it, fix it when necessary. But it radically changes who can start a project and carry it all the way through with their own hands, and this is exactly the ground Spec Driven Design grows out of: a method built for anyone who wants to move along the entire chain, from research to production, using AI as the infrastructure that connects each stage to the next, rather than as an isolated tool picked up here and there to speed up a single step.

## The real paradigm shift isn’t AI. It’s data.

Here I get to the point I consider the most important in the whole piece, and the one that risks getting lost in the general enthusiasm for generative tools: the real revolution isn’t that AI can write code or generate interfaces. It’s that, for the first time, **data** can stay at the center of the entire design process, from start to finish, without being translated and re-translated, losing pieces at every step.

In the classic design process, research data gets collected, then interpreted by a person or a team, and that interpretation becomes an artifact in its own right: an insight, a persona, a journey map, which from that point on lives a life of its own. Whoever designs the interface works on the interpretation, not on the original data anymore. It’s a necessary step in traditional design, but it’s also the exact point where information starts to leak away: what the research had shown, with all its nuance, becomes a synthesis, then the synthesis becomes a generic guiding principle, then the guiding principle becomes an interface decision that, if someone asked “why is it built this way?”, would get a vaguer and vaguer answer the further back you traced it.

With AI involved at every stage of the process, this is no longer an inevitable trade-off. Research can become directly a set of structured prompts. Prompts can become verifiable specifications. Specifications can directly generate prototypes and interfaces. And, this is the crucial point, you can always trace your way back: from an interface component to the specification that generated it, from the specification to the research data that made it necessary. Data isn’t interpreted once and then abandoned: it’s progressively transformed, while staying traceable the whole way through.

This radically changes how much value we need to place on three activities that, in traditional design, were often treated as secondary to the “real” creative work:

**Creating data.** How we gather information today can no longer be a craft-like, occasional activity. If data is the raw material of the entire process, the quality of what we collect at the start determines the quality of everything that comes after, in a far more direct way than it used to.

**Maintaining data.** Research data collected six months ago and never updated is data that’s quietly corrupting the decisions being made today. In a process where research directly feeds prompts and specifications, unmaintained data isn’t just “less reliable”: it’s an active input producing the wrong interfaces.

**Using data.** It’s not enough to have good, up-to-date data if, when it comes time for actual design work, decisions revert to gut instinct, ignoring what’s been gathered. The method I’m building exists specifically to prevent this: every stage, as we’ll see, is designed to explicitly carry forward what the previous stage produced, without ever cutting the connection.

This principle, that every artifact in the process must be traceable, without interruption, back to the data that generated it, is probably the most important idea in all of Spec Driven Design. For now, it’s enough to say this: if in traditional design data was the starting point of an interpretation, here data is the thread that runs through the entire process and never breaks, not even once it reaches the shipped product.

## Just another article about yet another approach to design?

The purpose of these pages is to give shape to and share the experimentation journey I’ve been pursuing — one that, over the past few months, has found in **the Edge team at** [**Sketchin**](https://www.sketchin.com/) **/** [**BIP Red**](https://www.bip.red/) the ideal environment to be tested, refined, and put into practice on a daily basis.

What started as a series of experiments has gradually become our new way of working. Since January 2026, we have completely moved away from Figma and the “traditional” design workflow, delivering around ten projects using a fundamentally different approach. The result has been a high level of satisfaction among clients, stakeholders, and, above all, ourselves as designers, who have rediscovered the motivation and curiosity to challenge the way we work.

> To be continued

## 💡 Stay inspired every day with Muzli!

Follow us for a daily stream of design, creativity, and innovation.  
[***Linkedin***](https://www.linkedin.com/company/muzli/) | [***Instagram***](https://www.instagram.com/usemuzli/) | [***Twitter***](https://x.com/usemuzli)

![Stay inspired every day with Muzli!](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*8L_711tWW8tSuAZXI73-2Q.png)

Stay inspired every day with Muzli!