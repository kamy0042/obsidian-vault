---
title: "Design Tokens: An Introduction"
source: "https://frontend-digest.com/design-tokens-an-introduction-db0b3c999322"
author:
  - "[[Andy Barnes]]"
published: 2020-07-14
created: 2026-04-20
description: "A brief overview of design tokens, what they can do, and why you should be using them in your projects"
Tags: [topic/デザインシステム/デザイントークン]
---
## [Frontend Digest](https://frontend-digest.com/?source=post_page---publication_nav-ca3e4733c82d-db0b3c999322---------------------------------------)

[![Frontend Digest](https://miro.medium.com/v2/resize:fill:76:76/1*s7I1XqcdBhD7NzIdPNUSRQ.png)](https://frontend-digest.com/?source=post_page---post_publication_sidebar-ca3e4733c82d-db0b3c999322---------------------------------------)

Anything and everything frontend. JavaScript, CSS and HTML.

## A brief overview of design tokens, what they can do, and why you should be using them in your projects

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kGysDrOA6HPzpIaQkg1fGw.jpeg)

Have you ever got back from IKEA, full of anticipation and excitement at the thought of constructing a cupboard yourself? Only to be left questioning your life choices two hours later, when you realise you’ve put two of the panels on upside down.

This can be a similar experience when application designs are handed over to developers. Often a sizeable amount of guesswork goes into translating design documents into code. Enter design tokens. They’ll do absolutely nothing to help your wonky cupboard doors, but can greatly help designers and developers create consistent user interfaces.

It wasn’t that long ago that services like [InVision’s Inspect](https://www.invisionapp.com/feature/inspect/) and [Zeplin](https://zeplin.io/) started to make the design to developer handover a thing that could be taken seriously. These solutions provide a well needed bridge between design and development, doing away with the painful concept of manual [redlining](https://www.uxbeginner.com/glossary/redlining/). It still often leaves a lot open to interpretation. Design tokens hope to help with this interpretation, and get everyone talking in the same language.

## What are design tokens?

At their core, design tokens are tiny bits of styling information that are tech agnostic. They are design decisions, translated into design variables that are made available in different coding languages.

The tokens are things like colours, sizes, spacing — which on their own might be fairly meaningless — but used together and with some guidelines, can enable developers to create applications that are fully consistent with the design system.

The tokens also live in one place, which is where it starts to get really powerful. If the CEO suddenly has a change of heart, and wants to change the brand’s primary colour from blue to purple (that would never happen, right?), the colour can be updated centrally, and every consumer will get the updated token in their application.

## Benefits

- **Avoids code duplication:** As with anything in code, when you can avoid repeating yourself, you should. Duplication is error prone. Not to mention, when you have multiple teams implementing similar but different solutions to the same problems, it becomes even more costly to the business. Having the default text colour defined in one place is the best option, and indeed, the safest option.
- **Free updates**: As mentioned above, when design decisions are made, and tokens might be tweaked. For the large part, consumers can get those updates for free. If the large font size is increased by `2px`, the variable name doesn’t change, and the design system remains in tact, with very little work.
- **Common language**: The more the tokens are used, the more familiar everyone will be when referencing them. So when a designer suggests changing a button to `color-palette-secondary`, the developers will know exactly what they mean. Historically, this would have probably ended with the developer asking for the hex value 😬.
- **Tech agnostic**: What happens when you want to move from SASS to CSS in JS? You’ve abstracted much of the fundamentals and it’s easier to migrate.
- **Design/UX ownership**: Historically there would be a large onus on a development team to implement a design system into their stack. Using design tokens gives more of that responsibility to the design team.

## How to create design tokens

*Depending on the tool set you are using, your mileage may vary. For this example, we’ll be looking at* [*Adobe XD*](https://www.adobe.com/products/xd.html) *and* [*Style Dictionary*](https://amzn.github.io/style-dictionary/)*.*

The workflow will look something like this, and we’ll go into slightly more detail below.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0JeTKMh0b_pvYnCX0dQG_w.png)

### Adobe XD

Behind every token, there is a design decision. Once these decisions start to be made, they can be validated alongside the rest of the design system to make sure everything still looks and feels right. [Adobe XD announced this week, that it now supports design tokens](https://www.youtube.com/watch?v=-ifl1tl-SuE) (CSS Variables). This means that designers can start to label up certain things like colours with the same names that the developers will be using.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MouVS0f7yUipB82RmRlThA.png)

Adobe XD’s online inspector

Once the tokens have been validated they can start to be created.

### Style Dictionary

One of the core selling points of design tokens, is the fact that they are tech agnostic. This means that the tokens are written in a generic language (JSON in this instance) that allows it to be translated into the right formats for consumers. We want to avoid just coding the tokens straight into SASS.

Style Dictionary allows just this, and it also has a really deep level of configuration to get the tokens doing exactly what you want.

The tokens are authored in the format below:

Once built, Style Dictionary will provide the variables in files that can be used by consumers.

<iframe src="https://frontend-digest.com/media/18112e1b5777f0682412abf14b3617fd" allowfullscreen="" frameborder="0" height="111" width="680" title="Design Tokens: SASS outputs"></iframe>

Example of the SASS variables that are generated

<iframe src="https://frontend-digest.com/media/ecda23f7a56acaad6f33e244e99b4e1e" allowfullscreen="" frameborder="0" height="170" width="680" title="Design Tokens: Swift output"></iframe>

Example of the Swift variables that are generated

These outputs can then be bundled into an NPM package, which will allow you to do meaningful releases with release notes. This means that if a design decision is made to remove a token, then it can be called out in the release notes. It then won’t be a shock to consumers when they need to make changes to their code.

## The future

Allowing designers to manage the design tokens, ensures consistency right from the start. It puts the right people in control of what they specialise in. That being said, it’s still not a seamless experience for designers to actually use the tokens in their own workflows.

The concept of design tokens has been around for a few years now, and it’s slowly becoming common place. Hopefully, with increased usage, the features will start to improve with design tools like Sketch, Adobe XD and Figma, and designers will be able to consume their own tokens in a native and fully featured way.