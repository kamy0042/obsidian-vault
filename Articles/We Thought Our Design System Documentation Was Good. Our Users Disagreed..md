---
title: "We Thought Our Design System Documentation Was Good. Our Users Disagreed."
source: "https://medium.com/@donyaaliy.design/we-thought-our-design-system-documentation-was-good-our-users-disagreed-459721b5e28c"
author:
  - "[[Donya Aali]]"
published: 2026-06-18
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/ドキュメント
  - topic/デザインシステム/運用・浸透
  - topic/デザイン/UXリサーチ
---
How a simple survey revealed a deeper issue: our documentation wasn’t wrong — it was optimized for us, not for the people using it

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*i23_3klfvN7tFlHJXN7QUQ.jpeg)

A few months after publishing our Design System documentation, something didn’t add up. Designers kept asking questions that were already documented. Developers kept reaching out about component states and implementation details that were clearly written in the docs.

At first, the explanation felt obvious: People just weren’t reading the documentation.

We had spent weeks writing guidelines, documenting components, adding examples, and organizing everything carefully. So if people still had questions, the problem had to be adoption — not the content. But after hearing the same questions repeatedly, that explanation started to feel too simple. Maybe people weren’t ignoring the documentation. Maybe the documentation wasn’t helping them. That question changed how we looked at everything.

**The Documentation Looked Complete (From Our Side).**

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wLnC8P8lkOzVFhAWxjDt2Q.jpeg)

Like many Design System teams, we started by documenting components one by one.

Each page included:

- Usage guidelines
- Variants and states
- Do’s and Don’ts
- Visual examples
- Implementation details

We followed patterns from established systems like Material Design and other public Design Systems. Structurally, everything felt correct. But there was a hidden issue we didn’t notice at the time: ‘ The Do’s and Don’ts were heavily inspired by Material Design and similar systems — not based on the actual needs and edge cases of our product.’

That meant that in many situations, designers couldn’t actually find answers to their questions in the documentation, because the documentation simply didn’t cover their real problems.

From our perspective, the system was “complete”. But from the users’ perspective, it often wasn’t answering their questions at all.

**We Stopped Assuming and Started Asking.**

Instead of guessing, we ran a short survey and interviewed designers and developers across teams. We wanted to understand:

- How they actually used the documentation
- What they searched for when they opened it
- What forced them to ask the DS team anyway
- What they expected but didn’t find

We also looked at internal support requests. A clear pattern emerged:

Even when documentation existed, people often defaulted to Slack or asking teammates instead of using it. Not because the answer wasn’t there — but because finding it wasn’t fast enough.

**The Documentation Was “Complete”, But Not Clear**

As we started reviewing the content more critically, another problem became obvious. Some parts of the documentation were simply too long and hard to understand. We had written detailed explanations for almost every component and behavior, but the result was heavy, verbose, and difficult to scan.

So we went back and did a full content pass:

We simplified the language, reduced unnecessary explanations, and rewrote sections to be shorter, clearer, and more direct.

This alone made a noticeable difference in readability.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*NsQUiof1P0Tx7tODU27fDA.jpeg)

**We Had One Documentation. We Actually Had Two Audiences.**

One conversation changed our direction completely.

A developer told us:

> “When I implement a component, I need everything in one place. I don’t want to jump between Figma, code, and multiple pages.”

We showed him a proposed specification table (colors, spacing, typography, states, props). His response was immediate:

> “I would use this every day.”

Then he added something important:

“We don’t really read Do’s and Don’ts.” That wasn’t a rejection of the content. It was a mismatch of purpose.

Do’s and Don’ts were written with Material Design patterns in mind — but they weren’t aligned with how our product actually behaved. So they weren’t answering the real questions designers had.

That was a key realization: Designers were using Do’s and Don’ts to make decisions. But those decisions weren’t covered in a way that matched our product reality. Developers, on the other hand, needed structured specifications for implementation. We had merged both needs into a single experience — and it served neither well.

So we separated them. We introduced two distinct layers:

\*\*\*Specification layer\*\* → technical implementation details

\*\*\*Guidelines layer\*\* → design decisions and usage intent

What started as a documentation task turned into an information architecture problem.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*nrm3NHPTC4V99yXjfRm8pQ.jpeg)

**The Language Problem We Didn’t Expect**

During interviews, a designer said something simple:

> “Reading English takes extra effort for me.”

At first, it didn’t seem critical. The documentation wasn’t complex, and most people on the team understood English. But the issue wasn’t comprehension. It was friction. When people need a quick answer, even small amounts of friction change behavior.

The same designer explained:

> “If I need something fast, I’d rather ask someone than read a long page in English.”

That explained a lot of our support behavior. Documentation doesn’t compete with other documentation. It competes with the fastest available alternative.

**We Organized by Components. Users Thought in Problems.**

Our structure was familiar:

Button. Input. Checkbox. Dropdown, etc. It matched how the system was built. But users weren’t thinking in components.

They were thinking in questions:

- Which variant should I use here?
- What should happen when validation fails?
- What’s the correct behavior in this flow?

We were documenting components. They were looking for decisions.

**Not Everything Needed Documentation**

Another insight came from observing workflows more closely. Some information was already discoverable:

- Figma components
- Code implementation
- Visible UI behavior

But some critical information wasn’t:

- Edge-case behavior
- Hidden states
- Spacing logic
- System-level decisions

That became our focus. Instead of documenting everything equally, we started prioritizing what users couldn’t infer on their own.

**We Prototyped the Documentation Itself**

One of the biggest structural changes we made was treating the documentation as a product, not just a set of pages. To support this, we even prototyped the documentation experience itself.

The goal was simple:

Make it easier for users to navigate between different parts of the documentation based on their needs.

Instead of forcing users to follow a linear structure, we designed it so they could move between sections as they would in a product interface — jumping between specs, guidelines, and examples depending on their intent.

This helped us validate something important:

Navigation mattered as much as content.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KtXtOa_k1Ph1x7mfRgssJg.jpeg)

**What Changed**

After restructuring:

- Specification content moved into dedicated tables
- Guidelines became decision-focused pages
- Language was simplified and rewritten for clarity
- Documentation navigation was prototyped for better exploration

Over time, we observed:

- Fewer repetitive questions in Slack
- More self-serve usage of documentation
- Reduced dependency on the DS team for basic implementation questions

We didn’t eliminate questions. But we reduced the number of questions that documentation was supposed to answer. That was the signal.

**Final Thoughts**

Looking back, the problem was never a lack of documentation. We had plenty of it.

The problem was that we optimized for completeness instead of usability. We documented what we thought people should know. Instead of understanding what they were trying to do.

The shift happened when we stopped treating documentation as a collection of pages — and started treating it as a product.

A product with users, constraints, and competing alternatives.

And like any product, it only works when it solves real user intent faster than everything else available.

**If there’s one principle we keep coming back to**

\*\*Don’t structure documentation around what you built.

\*\*Structure it around the questions people are trying to answer.\*\*