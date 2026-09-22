---
title: "Your design system’s real job in 2026 is catching the AI."
source: "https://nurxmedov.medium.com/your-design-systems-real-job-in-2026-is-catching-the-ai-8a916ad82bdf"
author:
  - "[[Nurkhon]]"
published: 2026-07-21
created: 2026-07-26
description: "Agents mostly follow your system now. Mostly isn’t a design system."
tags:
  - topic/デザインシステム/AI活用
  - topic/デザインシステム/戦略・ガバナンス
---
![A calm grid of small white app screens where one lime screen on the left multiplies column by column until the right side is mostly lime, under the headline “One miss became forty.”](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Ia-XbfVEHDdrXxaBsV6lLg.png)

illustration by author

## Agents mostly follow your system now. Mostly isn’t a design system.

**In this article:**

- Why a screen that looks perfect can still break your system
- The check that grades whether the agent obeyed it
- Why the person who writes that check gets harder to replace

I run product now. Which means I sit in the review, not the file. Once a week, a designer walks me through what shipped, and my only job in the room is to catch the thing that’s wrong.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*44N_wyzgPtvWNdnx)

Never run out of design inspiration again with Mobbin (Sponsored)

Last month I almost missed it.

The screen was clean. Right font, right blue, right spacing, the tab bar sitting exactly where our system says it sits. A senior designer built it with an agent in about four minutes. It looked like us.

It wasn’t us. Three of the components on that screen weren’t from our library. The agent hand-rolled them, close enough to pass, close enough that nobody in the review stopped. By the time someone noticed, the same three lookalikes were sitting in forty other screens, copied forward by the next prompt and the one after that.

The design system didn’t fail. Every token resolved. Every color was on-brand. The library was fine.

The check failed. We didn’t have one.

Most design system teams still think the win is a better library. More components. Tighter tokens. A cleaner Figma file. But agents already follow the system most of the time, and “most of the time” is the whole problem. At machine speed, the 5% that drifts doesn’t stay a rounding error. It becomes the screen the next agent copies. One miss last month turned into forty. The job isn’t a bigger library anymore. What we were missing was the check that catches the drift before it copies.

## Mostly isn’t a design system

![A big 95% beside one lime screen that copies itself into three more.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*I4fGV_gOSbV2LcXLvAQL6Q.png)

illustratiob by author

Here’s what changed under us. You used to review one screen at a time, built by a single person over a few days. Now an agent builds forty in an afternoon. [Claude](https://claude.ai/) writes the component. [Cursor](https://cursor.com/) wires it into the codebase. [Figma’s agents](https://www.figma.com/ai/) lay out the next flow before you’ve finished the last review. The work still looks like design. It just lands at a speed no reviewer was built to keep up with.

And the agents are good. That’s the trap. Researchers at [CHI 2026 tested how well LLM agents follow a design system](https://dl.acm.org/doi/10.1145/3772363.3798616) when they generate UI. The best setup they found, where the agent reads from a live component registry, hit about 95% compliance. Paste your entire style guide into the prompt instead, and the AI-generated UI compliance drops below that level. So, on a good day with the right plumbing, the ceiling is roughly 95%.

Ninety-five percent sounds like an A. For a human designer shipping one screen a week, it basically is.

Run it at machine speed, and the math turns on you. Five screens in a hundred ship off-system. Then the next agent reads those five as if they were the library, because it can’t tell your real button from the one that looks like it. The drift copies itself. The forty screens I described weren’t forty separate mistakes. They were one mistake, forwarded thirty-nine times.

That’s why a bigger library won’t save you. You can add every component anyone could want. The agent will still hand-roll the one it didn’t quite find, in a blue that resolves to your token and a shape that passes the eye. More components just make a better menu. It says nothing about whether the kitchen followed it.

## The check is the new deliverable

![Two check columns, mechanical and judgment, with the judgment one circled lime.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*i6I7bQQCLXz1UYUMxbBVBg.png)

illustration by author

The person who first named this is [Murphy Trueman, who argues that design systems now need evaluations](https://blog.murphytrueman.com/design-systems-need-evals/) the same way code needs tests. Not a nicer doc. A check that runs.

His split is the useful part. Two kinds of checks.

The mechanical ones are yes-or-no. Do the props match the real component’s API, or did the agent invent one? Do the colors and spacing resolve to tokens, or are they hardcoded values dressed up to match? Did the screen pull an actual library component, or hand-rolled markup wearing its clothes? A machine can answer all of those on its own, in seconds, with no opinion required.

The judgment ones are harder. Was this the right component for what the user is trying to do? Did the agent handle the empty state, the error state, the list with one item, and the list with a thousand? You can’t grep for that. So you grade it the way Trueman describes: one model scores another against a rubric you wrote. LLM as a judge. It reads the screen, compares it to your standard, and flags anything that drifted. Then the whole thing runs in CI, like a regression suite, every time an agent opens a pull request.

This stopped being niche. In March 2026, [OpenAI acquired promptfoo](https://openai.com/index/openai-to-acquire-promptfoo/), a tool built to run exactly these evals. Eval infrastructure is something a company buys now, not a script one engineer keeps in a drawer. In the same season, [Google Labs open-sourced DESIGN.md](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/), a machine-readable spec that an agent can read to understand your system and check its own choices against it. The system is turning into a document the machine reads. The check is what reads back.

## What the machine gets right, and where it needs you

![An arrow runs from “grades” down to one lime document labelled the rubric.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jMc47TbddXcKEnomHLq7Aw.png)

illustration by author

Don’t misread that 95%. The machine is genuinely good, and the judge is real. When researchers pit [strong models against human experts as judges](https://arxiv.org/abs/2306.05685), the models agreed with the humans more than 80% of the time. You can trust a machine to run the check. That part scales.

Here’s where it needs you. The mechanical checks write themselves once someone defines the tokens. The judgment rubric doesn’t. Somebody has to decide what “the right component for the intent” actually means, screen by screen, edge case by edge case. The judge is only as sharp as the rubric it reads, and the rubric is a design decision wearing a checklist’s clothes.

That’s the whole thing. The machine can confirm the button resolves to the right token. It can’t tell you a date picker was the wrong call for a field that only ever needs a year. One is compliance. The other is taste, written down clearly enough that a model can grade against it.

## This makes the design system designer worth more, not less

![A whistle and a lime open rulebook above a row of plain agent-drawn buttons.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wubqMI5aEu4BqUzCdeUWFQ.png)

illustration by author

For years the design system team’s value was the library. The components. The Figma file everyone pulled from. That was the deliverable, and it was real.

The agents just made components cheap to produce and easy to fake. What got expensive is the thing that proves the machine’s output actually obeyed the system. It’s the same move that already [rewrote the design technologist’s job around the code, not the mockup](https://medium.com/@nurxmedov/the-handoff-is-gone-design-technologists-got-the-job-7a9487958eae): the value slid one step downstream, from making the thing to proving the thing holds.

So the deliverable moved. It used to be the component. Now it’s the check. The person who writes the rubric, who can point at forty agent-built screens and say which three broke the system and why, is doing the design system governance the whole org now runs on. That person is harder to replace than the one who drew the button, because the button can be prompted and the judgment can’t.

You grade the machine now. That’s the job. Picture the referee who also wrote the rulebook, and in an agentic design workflow that referee is the one seat you can’t automate away, because someone has to author the rule the automation checks against.

## What AI can’t do here?

![A perfect on-brand screen stamped with a lime question mark reading obeyed.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*JVjwcp9OoUgpBtJ15A8IJA.png)

illustration by author

An agent can generate a screen that looks completely on-brand. Right font, right blue, right spacing, the whole thing. What it can’t do is decide whether that screen actually obeyed your system, because “obeyed” is a standard you hold, not a pattern it matches. It can copy the surface. It can’t hold the intent.

That’s the part with no API. The rubric is a point of view about what good means here, in this product, for this user. A point of view is the one thing you can’t download from a component library or a pricing page.

So the design system isn’t a folder of components anymore. It’s a standard, plus the check that proves the standard held. The components will keep getting cheaper. The agents will keep getting faster, closer to 95, maybe past it. None of that closes the gap, because the gap was never about production. It was always about judgment, and judgment is the one thing that doesn’t ship in the model.

Someone still has to be the one who can look at forty agent-built screens and say which three are lying, and why. That seat doesn’t automate. Make sure it’s yours.

*This piece draws on Murphy Trueman’s argument that design systems need evals, a CHI 2026 study on design-system compliance in LLM-generated UI, and Zheng et al.’s work on LLM-as-a-judge. The forty-screens review is put together from real ones; details are changed.*

Follow

[Nurkhon](https://medium.com/u/a44b336d205b?source=post_page---user_mention--8a916ad82bdf---------------------------------------)

for more on AI, design practice, and the skills that compound when tools get cheaper.

♻️ If this said the thing you’ve been thinking, repost it; your followers’ feed is where conversations like this find the next reader.

### Read next:

## [The handoff is gone. Design technologists got the job.](https://nurxmedov.medium.com/the-handoff-is-gone-design-technologists-got-the-job-7a9487958eae?source=post_page-----8a916ad82bdf---------------------------------------)

### The Bridge Tax is why design technologists are winning the room in 2026.

nurxmedov.medium.com

**Further reading:**

1. [Murphy Trueman: Design systems need evals](https://blog.murphytrueman.com/design-systems-need-evals/)
2. [CHI 2026: Design-system-compliant UI generation with LLM agents](https://dl.acm.org/doi/10.1145/3772363.3798616)
3. [OpenAI to acquire promptfoo](https://openai.com/index/openai-to-acquire-promptfoo/) [Zheng et al.: Judging LLM-as-a-Judge (NeurIPS 2023)](https://arxiv.org/abs/2306.05685)
4. [Google Labs: DESIGN.md](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)