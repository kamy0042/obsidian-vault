---
title: "How I turned a static design system into an AI teammate"
source: "https://medium.com/design-bootcamp/how-i-turned-a-static-design-system-into-an-ai-teammate-a1e87feb43a9"
author:
  - "[[I Putu Dana Putra]]"
published: 2026-07-17
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/AI活用
  - topic/デザインシステム/導入事例
---
*A solo product designer’s case study on turning a design system into leverage — using Claude Code, Figma MCP, and a custom npm package.*

## More than consistency

I used to think a design system’s job was to keep things consistent. I don’t think that anymore.

Somewhere along the way, ours turned into something closer to leverage — the kind that let people who’d never opened a component library ship work that looked like it came from one. That still catches me off guard when I say it out loud. It wasn’t the plan. The plan was smaller: one product designer, doing DesignOps solo for a growing B2B pharmacy platform, trying to keep Figma and code from drifting apart as the engineering team outgrew what one person could personally hold together.

For a long time, “keep it consistent” meant “run it through me.” Every component, every judgment call on spacing or color, funneled through one inbox. That’s not a design system working. That’s a ceiling with good documentation.

So I stopped trying to document my way out of it, and started asking a different question: what would it take for the system to hold the line without me standing there holding it?

I didn’t know yet that the answer wouldn’t just change what I could build. It would change what an entire team coulddo.

## The constraint no one names

Everyone talks about whether AI can understand a design system. Almost no one talks about whether it remembers. That gap is where most of the leverage gets lost.

Claude never struggled with ours. Show it a component, explain a token, and it followed along — every time. The catch was “every time.” A new session meant starting over: re-sharing, re-explaining, re-establishing rules I’d already locked in more times than I could count. A system that must be retaught by one person with each use isn’t a shared system at all. It’s just me, relaying information slightly faster than I could type it myself.

So I stopped trying to make the documentation more thorough and built something structurally different instead: a loop where I’d share one component, generate documentation for it, and check — really check — whether the AI had understood it, not just produced something that looked plausible. Wrong, I corrected. Corrected, I saved. Generate, correct, update, repeat.

What came out of that loop wasn’t more documentation. It was a Skill — the piece of the system that didn’t need me in the room to work.

## Four layers, in order

The Skill didn’t arrive on its own. It was the third of four pieces, built in an order I didn’t fully understand the logic of until I saw all four running together, connected, doing what no single one of them could do alone.

I built this in stages, and the order mattered:

- **Foundation — the style guide.** Typography, color, spacing, the basic visual language written down in one place.
- **Build — the component library.** The style guide turned into reusable, documented components in Figma.
- **Elevate — the Skill.** A single custom Claude Skill, invoked with one command, that taught the AI our tokens, components, and patterns — once. Documentation became something that could *act*: generate code, answer design questions, and scaffold UI.
- **Scale — the npm package.** Our design tokens and components are published so developers can install the actual system into their codebase instead of eyeballing Figma and guessing at pixel values. It stays in sync automatically.

Day to day, it runs as one continuous loop: I update a token in Figma, Figma MCP syncs the change live into Claude, a developer invokes the Skill, and the code that comes back uses the real tokens — with the npm install staying in sync automatically behind it.

If I had to describe what each piece *does* rather than what it *is*, it reads less like a toolkit and more like a small team. Claude Code is the executor — it reads the actual codebase and iterates on its own. The npm package is the brand guardrail — AI doesn’t guess at our components; it uses the real ones. The Skill is the memory: the thing that makes the other two consistent, session after session, without me in the loop every time.

There’s a version of this that still catches me off guard when I see it laid out end to end — the diagram I ended up mapping the whole loop into, from Figma to finished screen.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uaB8iyz3AkbgXfRQ17P-sw.png)

Flow diagram showing a Figma design system feeding into Figma MCP, which passes live context to an AI assistant that compiles a documentation site and an installable design system package, powering an agentic skill layer that outputs both rapid prototypes and pixel-perfect UI code.

The detail I didn’t expect going in: the system doesn’t just do one thing well — it does two different things well, on purpose. Ask it for something new, and it explores: new layouts, new variants, genuinely generative. Ask it to match something that already exists in Figma, and it stops exploring and gets literal — pixel-perfect, 1:1. Same tokens, same components, two different modes depending on what I actually need in the moment.

## What changed in practice

Here’s what changed, in the moments that used to go one way and now go another. A PM used to sketch a rough idea and hand it to me to translate into something on-brand. Now they open the AI, describe what they want, and it already looks like it belongs in the system — because it does. That’s the shift underneath everything else here:

- **Components stay consistent no matter who — or what — is generating them.** Nothing gets improvised, because nothing has to be. The AI reaches for the real components, not their approximations.
- **Brainstorming got faster** because the output already speaks the system’s language. Ideas don’t need a separate “make this on-brand” pass afterward — they start on-brand.
- **Prototyping for research no longer starts from zero.** What used to be the slow part of a research cycle — building a plausible-looking prototype — stopped being the bottleneck.

Put together, what got made didn’t just go up a little. It stopped being bottlenecked by how many hours I personally had in a day — which is a stranger thing to sit with than it sounds.

## A different kind of ownership

There’s a difference between owning a system and being willing to stand in front of a room and answer for it. I’ve done the second part three times now: an “Orchestrating AI to Build Products Faster” masterclass with Underdogs Indonesia (part of Underdogs Korea) to 400+ registrants, a more technical follow-up with them, “The Autonomous Blueprint,” to 200+, and a talk at a Friends of Figma Bali Config Watch Party to 120+ more. Not the polished result each time, but what actually broke along the way, and what I had to unlearn about what “shared context” between a designer and an AI actually means.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jHaLDQe3LhGalIGadLcyww.png)

A collage of event posters and registration counts from two Underdogs Indonesia sessions and a Friends of Figma Bali Config Watch Party, where I was invited to speak about agentic design systems.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pR-gS50JV_FBpPdBGdRAMQ.jpeg)

Presenting my talk on agentic design systems at the Figma Config Agenda event in Bali.

Explaining it out loud, three separate times, did something documentation never did: it forced me to find the one idea underneath all four layers of tooling — the same one this piece opened with. A design system’s job was never just to keep things consistent. Once it’s built right, it’s leverage — for whoever needs it, not just for me. Saying that to a room, out loud, is what turned it from a private realization into the actual thesis of this article.

## Not the tooling

Here’s the version of this piece that would be easiest to write: get an npm package and a Claude Skill. That’s not really the point — the principle underneath is simpler. AI needs a shared language to work in, and a design system is just one form that language can take. What matters isn’t the format — it’s that the AI is working from your real decisions instead of guessing at them.

That reframes what a design system even is: not the most complete library, but the easiest one to use — including by an AI. I set the direction now; the system holds the line.

Which raises the question I sat with for a long time — and finally have an answer to: if a design system can act on its own, does the designer’s job shift from building it to orchestrating it?

A design system that’s actually AI-legible changes who gets to produce work that looks right. A PM sketching a feature, an engineer prototyping an edge case, anyone reaching for AI instead of waiting on me — it comes out on-brand now, because the system carries that weight instead of me carrying it in my head. It stops feeling like one designer’s output and starts feeling like the whole team can suddenly design — not because anyone learned a new skill overnight, but because the thing that used to gate that ability isn’t me anymore. It’s the system, and I built it.

That’s not a smaller role — it’s a head chef’s role. Line cooks executing the dishes don’t make the chef less of a chef. It’s what makes them the head chef instead of a solo cook.

That’s the actual leverage. Not speed for its own sake — multiplication. What I can produce didn’t just increase; what the *team* can produce did, and I’m the one who built the thing that made that possible. I stopped being the person who makes things look right and became the person who built the machine that does. If that’s what “orchestrator” means, I’ll take it — it might be the first job I’ve had that actually scales with the team instead of quietly losing to it.

## Where to start, even without any of this

None of that leverage requires my exact stack to start building your own version. You don’t need a Claude Skill or an npm package to start. What you need is some form of shared context an AI can actually read — and most teams already have one lying around:

- A Figma file with clean, well-named components and documentation
- A brand guidelines PDF
- An existing codebase with consistent patterns
- Even a plain style guide document with your colors, type, and spacing rules written down

Start smaller than you think you need to. Share one component or one pattern at a time, and actually check whether the AI understood it — don’t assume it did. Correct what’s wrong, and if your tool supports it, save that correction somewhere persistent instead of repeating it every session. That loop, repeated enough times, is most of what building an agentic layer actually is. The npm package and the Skill were just what my version of that loop happened to produce.