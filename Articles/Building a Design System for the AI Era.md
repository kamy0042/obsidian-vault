---
title: "Building a Design System for the AI Era"
source: "https://medium.com/@woshixwn/building-a-design-system-for-the-ai-era-a98f7b824379"
author:
  - "[[Aaron]]"
published: 2026-06-20
created: 2026-07-30
description: "More"
tags:
  - topic/デザインシステム/AI活用
  - topic/AI
---
## Preface

This is one part of a broader **AI design workflow** I had been thinking about earlier. As AI keeps evolving at an aggressive pace, I have been asking myself two questions: what is the core value of a designer, and how can that value be embedded into an AI workflow?

I will not expand on the full workflow here. I will only include the original concept below. If you are interested, you can follow along for future updates.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*malpFn0cjU3sO0YIsdrHNw.png)

This article focuses on just one part of that AI design workflow, and also the most difficult part I have explored so far: **a compound design system**.

## Starting Point: Why Do This?

## The Brutal Evolution of AI Capabilities

I have some experience as an indie developer, so I often work with AI coding tools.

Over the past few months, my feeling has been that AI is crossing a threshold, especially in two areas: **instruction following** and **logical reasoning**. This feeling became especially strong when Opus 4.6 was released.

Instruction following means AI can follow a large number of predefined design rules.

Logical reasoning means AI can generalize a core design language and transfer different design rules across pages.

At that point, I realized that AI might be useful for building design systems.

## DESIGN.md and the Push from Claude Design

Google released the DESIGN.md protocol at the end of March. It is still a very rough protocol, but it pointed me in an important direction. Before that, I had been trying to use Figma library files and generate designs inside Figma through external tools. DESIGN.md made me realize that perhaps simple Markdown plus AI tools would be enough.

That was a major shift in thinking. A design system is no longer only an internal design artifact. It can go directly down into code.

Claude Design, and later Open Design, also helped a lot. They made me realize the importance of workflow constraints.

DESIGN.md itself has limitations. For example, it can take up a huge amount of context. Even if a model has strong instruction-following ability, omissions can still happen. But if design critique is moved earlier into the generation workflow, and the feedback is clear enough, the baseline quality can be protected.

## It Was Also Time to Improve My Visual Design Ability

My background is interaction design. A strong logical thinking style can sometimes make my visual design ability weaker. So I also wanted to see whether AI could help me force a breakthrough and raise my own visual design capability in another way.

## Narrative Structure

When something you want to build is still vague, how do you gradually make it clear and eventually turn it into a version that can move forward steadily?

My habit is to first solve three things: goal, measurement, and iteration.

The goal answers the question: where am I going? This step must first define the final working state, then work backward to identify the constraints needed to reach it.

Measurement answers the question: how do I know whether I am getting closer? This step is not about scoring. It is about establishing a stable validation method so I do not get misled by the tool’s own taste or hidden workflow.

Iteration answers the question: when the result is wrong, what should I change? Here, simply adding more prompt text is not enough. I need to determine whether the problem comes from tokens, language, patterns, or the tool’s default behavior.

## Goal: Narrowing Down a Vague Problem

## The Final Working State I Wanted

In this case, the final goal is not complicated: use design system constraints to quickly and efficiently generate design drafts that meet requirements.

Here, “meet requirements” does not simply mean looking good. It means consistent style, reasonable components, usable details, and the ability to continue iterating. In other words, production-level output.

The more specific scenario is this: after receiving upstream product requirements, or when I have my own design iteration needs, I should be able to describe the page structure, core task, content hierarchy, and key states in natural language. Then AI should generate a first draft that has a consistent design style and does not feel rough in the details.

My current situation is “total zero”: there is a brand-new internal company project, and I intentionally want to separate it from previous visual assets and design system styles. So I do not need to accommodate an old system. I can validate a new AI design workflow from scratch.

Once I understood where I wanted to go and where I was standing, I could start breaking the goal down.

At this point, my previous experience manually building design systems became useful.

First, put AI aside and return to a more familiar question:

If I want a junior designer to consistently produce pages above the minimum quality line under a design system, how should I constrain their output?

First, I cannot simply tell them things like “make it more premium” or “make it feel grand and high-end.” These phrases may be useful to experienced designers, but for junior designers they are almost like asking for “a colorful black.”

To stabilize the baseline, I usually need to communicate several things clearly at the same time: which visual atoms can be used, what the overall design language is, and how different scenarios should be designed.

So if I treat AI as another producer that needs to be constrained, what constraints should I apply?

## Constraint 1: Design Tokens as Visual Atoms

This is the most quantitative layer. It constrains atoms such as color, font size, spacing, radius, and shadow.

Design tokens were originally used mainly for handoff between design and development. They turn visual decisions such as colors, radii, and spacing into reusable and implementable variables.

For humans, remembering so many variables is cumbersome. Figma even introduced Variables to help with that. But for AI, this is exactly the kind of thing it is good at, as long as the tokens are clear enough.

This layer first ensures that the underlying materials of the design output do not become chaotic.

## Constraint 2: Design Language as Design Judgment

Design language is abstract, but unavoidable.

Although design tokens are concrete, they still need a design language as their basis. Otherwise, colors, radii, and spacing are only a set of values. They do not know what product temperament they are supposed to serve.

This is also the part I was most worried about with AI. Human designers can misread abstract concepts, let alone AI.

In my early years as a designer, senior designers would pass down design languages such as “borderless design” or “aquatic design.” When I actually produced screens, I often misunderstood them and still relied on senior designers to correct me during design reviews.

So the constraint here needs extra care. I need to make sure AI can understand my broad product concept and generalize it consistently across different pages, instead of coincidentally getting one page right.

## Constraint 3: Design Patterns as Scenario Templates

Design patterns are not just a collection of design principles. They are stable ways to apply the design language in specific scenarios, such as how navigation should be organized or how a page should be laid out.

They are not determined entirely by the design language. The mobile touch era has its own interaction patterns, and desktop tools have their own layout and operation patterns. These things do not depend completely on brand language.

But they also cannot be completely unrelated to the design language. For example, if the design language is “borderless,” but the interface still displays information through rigid boxes everywhere, that page will feel inconsistent with the rest of the product.

In other words, AI needs to know how a certain type of page should organize information after receiving a requirement.

## From Goal to Measurement

I applied the experience accumulated from “how to constrain the output of a junior designer” to this AI design workflow.

It became three directions that needed to be validated step by step: can AI first follow tokens, then understand language, and finally generalize patterns across different pages?

To judge whether it is getting closer, we enter the second question: how do I measure it?

## Measurement: Decide How to Validate First

At the measurement stage, the problem becomes: I need a stable way to validate the result.

This part was not hard to define. The general method is: I create a design system, give it to AI, ask AI to produce pages under that design system, and then check whether the result matches expectations.

The prerequisite is to find an AI tool stable enough for validation. If the tool itself forcibly adds its own aesthetic, or if it has a built-in mechanism that quietly fixes small problems, then it becomes difficult to judge the effectiveness of my design system itself.

At the time, I had three candidates: Stitch, Claude Design, and Claude Code.

## Stitch: Too Much Noise

Stitch is a design tool from Google Labs, the same group that released the DESIGN.md protocol. In theory, it should have been the most suitable tool.

But after using it, I found that Google brings in too much of its own flavor. Design systems generated through Stitch are more or less influenced by Google’s design language.

For some designers, this may not be a bad thing. If the goal is to quickly build a design system, Google’s mature design system can help fill in many details.

But my current need was stable validation. Those additions became noise. So Stitch could not serve as the main measurement tool.

That does not mean Stitch has no value. Its canvas-based workflow is very suitable for direction exploration, which I will mention later in the Origin iteration.

## Claude Design: Too Smart

Claude Design is indeed strong. Its results are no worse than Stitch’s, and it does not obviously mix in another design language.

But I eventually gave it up. The reason is that it is too professional.

Claude Design has a professional design workflow internally. There are also quite a few reverse-engineered analyses of that workflow online, and even some open-source imitations. A design workflow usually includes design review, local correction, variant exploration, and iterative convergence.

That means the final page generated by Claude Design may already have been corrected by its internal workflow. From the perspective of output quality, this is good. But it makes it difficult for me to judge how effective my own design system is.

If the student being taught is too talented, it becomes hard to evaluate the teacher.

P.S. It also burns a serious amount of tokens.

## Claude Code: Honest but Useful

In the end, I chose Claude Code.

It does not add its own theatrical interpretation like Stitch, and it does not have Claude Design’s overly professional design safety net. It is more like a cold robot that follows the design system I give it in a stricter way.

That is exactly what this stage needed.

Compared with Codex, Claude Code also has stronger narrative logic. After generation, I can ask it why it designed something in a certain way, and it can usually point out where the design rationale came from. This is useful for later iteration, because I do not only need to see what is wrong. I also need to know why it happened.

One extra note: when using tools like Claude Code to generate HTML, it is best to start a new session in a new workspace every time. Otherwise, context contamination is almost unavoidable. Styles, judgments, and file structures from the previous generation may all affect the next result.

The prompt I used at the time:

```c
Use DESIGN.md as the design guide, and use the information architecture in the other Markdown files to generate multiple corresponding HTML files.
Put all HTML files in a subfolder named htmls. Name the landing page index.html and add navigation links to the other pages.
```

At this point, the tool used to compare the effectiveness of each new design system version had been decided.

## What to Focus On

After choosing the tool, the next step was deciding what to look at.

Here, I still referred to real design system usage experience from teams. After a design system is handed to other designers, some usage errors tend to appear frequently.

For example, missing or incorrect use of design tokens. As mentioned earlier, AI almost never makes mistakes in this area, so I ignored it directly.

Other mistakes are AI weaknesses: misunderstanding the design language, using components incorrectly, or generating copy that feels too AI-like.

In this situation, I needed to inspect more carefully and locate problems more precisely so I could fix them in later iterations, such as:

- Whether AI understands the design language instead of applying a common template.
- Whether AI misuses components, especially high-frequency ones such as buttons, badges, tables, navigation, and sidebars.
- Whether AI generates meaningless copy, meaningless state labels, or decorative text pretending to be real content.

With a stable tool and a clear idea of what to inspect, I could move into the most important part: how to improve the system.

## Iteration: Put the Problem Back into the System

## Origin

### First, Make Something Bad

“First, make something bad” is something I often tell myself when doing indie development.

Grab the core problem, quickly build an MVP prototype, and then improve it through rounds of feedback. Iteration only truly begins when something can be seen, used, and criticized.

This time was the same.

A design system contains a lot of information, but not every part is worth completing from the beginning. I needed to first identify the parts that most strongly affect the overall visual impression, meaning the parts that, once changed, make the entire page feel most unfamiliar.

For me, those two parts were Button and Language Overview.

Button is the most frequently used component, and it also concentrates many tokens: color, text, stroke width, radius, and more. If the Button is decided, then most of the tokens in the design system are also decided.

Language Overview is more like the constitution. It establishes the overall design style. Later, more detailed design language, component styles, and page patterns can all be derived from it.

So the next step was to define those two parts. At this stage, Stitch and Claude Design became valuable again.

### Diverging with Stitch

Although Stitch was not suitable as a measurement tool, its canvas format was very suitable for exploring directions.

Once design directions are laid out visually, it becomes easier to know what I want. Instead of imagining whether a style works in my head, I can place multiple directions next to each other, compare them, and keep refining toward the closer one.

After the rough direction was determined, I needed to move from divergence to convergence. Claude Design was more suitable for that stage.

### Converging with Claude Design

At the MVP stage, I only needed Button and Language Overview. So I exported the result from Stitch using `Code to Clipboard`, asked Claude Chat to extract those two parts, and then pasted them into Claude Design.

There are several Claude Design features I like a lot. Tweaks can quickly try several options. Markup and Comments can precisely tell AI what to adjust. Edit allows direct changes to specific parameters. All of them are useful for convergence.

Using Button and Language Overview as the anchor, I first asked it to generate an official website landing page, then used these tools to continuously adjust the page toward my own taste.

In the end, I got a design I was satisfied with in Claude Design. The Button configuration and the Language Overview summarized by Claude Design became the starting point for later iterations. I marked it as `Iteration-Origin`.

## Old Experience, New Problems

Back in 2023, when GPT-3.5 had just been released, I was more interested in Stable Diffusion, mainly because I wanted to train models for others and earn from the information gap. That was also my earliest exposure to model training.

That experience taught me that overfitting and underfitting are common problems for any AI model based on the attention mechanism.

**Overfitting: similar, but too similar**

One mistake I made was that after finishing the Origin iteration, I completed the other parts all at once and tried to write the rules as clearly as possible.

It turned out to be a waste of time. I had refined DESIGN.md based on only one landing page case, which caused the other generated pages to carry a strong landing-page flavor. For example, every page wanted to include a large hero section.

This kind of “similarity” is dangerous. It resembles the original page, but it does not resemble a design system that can generalize. That makes it basically useless.

**Underfitting: too much freedom**

At the beginning, the Origin version only had a manually defined Button constraint. The Overview section was very broad, using words like clean, tidy, grand, premium, and other common client-style requirements.

Pages generated under those constraints were too free. The landing page, pricing page, and documentation page all satisfied the two constraints, but they did not look like the same style at all. That obviously could not be used in production.

I also tried asking AI to generate several style-consistent pages in one conversation. But because the design language was too vague, AI naturally returned to the most common public-web patterns, which is what people often call the “AI look.”

How can this be avoided in later iterations? I looked back at my notes from studying Stable Diffusion years ago. The full notes are too long to include here, but the key ideas are:

- Prepare test samples with different styles to detect overfitting.
- Make sure each iteration only fixes one or a few problems from different dimensions, so causes can be attributed.
- Make rules systematic and abstract enough, and avoid being overly absolute, to reduce fitting problems.
- Split rules into sufficiently small pieces so multiple rules do not merge into one hard-to-adjust block.
- Use anti-descriptions to prevent the model from reusing high-frequency patterns.
- Structure rules to reduce context dilution and make conflicts and priorities easier to locate.

The core idea is to treat DESIGN.md as an **iterable rule model**.

## Loop: Solving Problems Through Iteration

This is my loop:

1. Use Claude Code to generate pages based on the latest DESIGN.md and several fixed page structures I wrote.
2. Review the generated pages using the measurement dimensions I had defined earlier and record the problems.
3. Ask Claude Code why it made those design decisions, then add both the problem and the rationale to the issue pool.
4. Choose several unrelated problems from the issue pool, then use Codex plus Git to adjust DESIGN.md.
5. Return to step 1.

> *There was a small side note here. During the iteration process, Anthropic happened to publish* [*Loop Engineering*](https://addyosmani.com/blog/loop-engineering/)*, so I also tried to automate the loop. After a few runs, I gave up. The reason is that locating and abstracting design problems is, frankly, ineffable. It is hard for AI to complete on its own.*

Eventually, the system evolved roughly from version 0.5 to 0.9, with smaller versions such as 0.6.1 in between. Each 0.1 version solved a major problem, and each 0.01 version fine-tuned the direction to make sure the issue was truly resolved.

The process was indeed tedious, so I will not publish every detail here. I will give a few examples.

### Examples

1. Locating the overfitting problem in version 0.6

After analyzing the generated output, I found that the core issue was having too few provided components. This caused AI to choose generic components.

Adding multiple components across the 0.6.x versions improved the situation effectively. So in version 0.7, I added a large number of components.

2\. Finding rule omissions in version 0.8

The List Component rules required each item to preserve a small amount of spacing, but AI did not follow this consistently.

The reason was that AI judged whether something was a list based on HTML tags. So I adjusted DESIGN.md and required the judgment to be based on visual characteristics instead of code structure.

While Claude Code was generating, I used the Workflow panel and confirmed that there was indeed a subagent visually checking whether the current code counted as a List. The generated output also matched the specification, which proved the change was effective.

## Stage Result: Version 0.9 Is Already Usable

Version 0.9 of DESIGN.md now supports the following:

By inputting a fixed page-structure document, I can generate interfaces that follow the design system and stay stylistically consistent.

As a side note, I also tested the results generated by Claude Design. Although they were better than HTML generated directly by Claude Code, the improvement was not huge. This confirmed that design output constrained by a design system does not necessarily need a design workflow to correct errors.

### Remaining Issues

Not every problem has a solution yet. The following issues depend on later model updates or extra upstream and downstream workflow control.

- Chinese adaptation still needs to be solved, especially widows and very short final lines.
- AI seems to have difficulty understanding the problem of a single line containing only one or two Chinese characters, which rarely happens in Western text. Although I can ask AI to add `text-wrap: pretty;` and control the result at the CSS layer, I would prefer to establish a general cross-platform constraint.
- My current idea is to add a widow-line detection step downstream later, using a separate AI model, possibly a Chinese model, to solve this problem.
- Design Patterns need to be separated to avoid excessive context length.
- After version 0.9, I want to add patterns for different sections of each page, such as the usage of each section on a landing page. But this brings the problem back to overfitting. Of course, adding more section-level design patterns may reduce overfitting, just like adding more components did. But that can easily make DESIGN.md extremely long and consume too much of the AI context window.
- My current idea is to use some kind of upstream Skill later to dynamically generate only the relevant Design Pattern sections for the page being built. Those sections, together with DESIGN.md, would form the design context.

## Explode: The Same Move Does Not Work Twice

Finally, one more thing.

Although the design language was defined at the beginning, after encountering a lot of design references during the process, I also found parts I wanted to adjust.

But I did not need to run the whole process again. Since I had already completed an “ideal DESIGN.md” once, I could directly update the Button and Language Overview sections, then let AI reason through how the remaining parts should change. It follows the structure you have already established.

I even went one step further and provided the notes from the previous iterations as context. AI could automatically identify possible pitfalls and avoid them proactively.

The first time, what I got working was the design system itself. The second time, what I reused was actually the iteration method.

This is also a characteristic of working in the AI era: do not repeat the same work.

## A More Useful Summary

After getting to this point, my strongest feeling is that the core of this work is not “letting AI do design.”

It is no longer rare for AI to generate a good-looking page. The real difficulty is this: when requirements, page types, and information density change, can it still consistently use the same judgment, instead of falling back to the most common templates on the internet?

So in an AI workflow, a design system is no longer just a deliverable. It is more like an executable constraint system.

Traditional design systems mainly solved collaboration problems between people. In the AI era, design systems also need to solve collaboration problems between people and models. Designers need to extract the judgments that used to live only in experience: which ones should become tokens, which ones should be written into language, which ones should be turned into patterns, and which ones should not be hardcoded.

Looking back, what I really got working was not a particular DESIGN.md, but a new way of designing.

It requires designers to understand more clearly why they design in a certain way. It also requires designers to translate those “whys” into rules that AI can understand, execute, and validate.

That is what I find truly interesting about AI workflows. They do not turn designers into people who just keep typing prompts. Instead, they force us to organize implicit experience into clearer judgment, more stable rules, and more reusable methods.

Every time we face a similar problem later, we can stand on top of our previous work and go further.