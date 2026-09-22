---
タグ: []
作成日時: 2024-03-05T14:17:00
URL: https://bradfrost.com/blog/post/ai-and-design-systems/
Tags: [topic/デザインシステム/AI活用]
---
We’ve all watched with simultaneous fascination and trepidation as a flood of AI-powered tools continues to wash over the digital landscape. At [Big Medium](https://bigmedium.com/), we help complex organizations design at scale and pragmatically adopt new technologies, so naturally we’ve been putting AI tools through their paces in order to uncover opportunities to help people produce better digital products and work better together.

As we all know, design systems have proven to be effective tools that help organizations ship higher-quality user interfaces more efficiently**.** **We’re finding that this new crop of AI tools can help supercharge design system efforts across many categories**, and we’re starting to help our clients use AI to do exactly that. Our resident AI expert, [Kevin Coyle](https://kevincoyle.co.uk/), has been leading the charge in this wild new landscape, and we’ve all been exploring some promising ways that AI can assist in various aspects of design system creation and consumption. The future is here, and in this post we’ll demonstrate some of the ways we’re applying AI to the world of design systems, including:

1. Writing component code
2. Translating components across frameworks
3. Writing unit tests
4. Reviewing accessibility
5. Writing documentation
6. Making documentation more accessible/inclusive

Of course, these are only some of the potential use cases and there’s plenty more potential still to explore. Let’s dig in!

## Component code generation

One of the most obvious examples of AI for design systems is to generate design system component code. Last year, [I wrote](https://bradfrost.com/blog/post/design-systems-in-the-time-of-ai/) that AI could be trained to act on instructions like this:

> 
> Make a new component called badge that has 4 variants: success, error, warning, and info. It has a text string prop, and a size prop that has sm and lg as available options. The background colors for the 4 variants should use the success, error, warning, and info background color design token variants.
> 
> And splat goes the AI.

Turns out this is absolutely possible:

**When you train a LLM on a design system’s codebase, conventions, syntax and documentation, you get a component boilerplate generator on steroids.** Human developers can then evaluate any outputted code, refine it (with or without the help of AI), and bring it over the finish line. In this scenario, AI becomes a junior developer contributing code for review like any other developer. **We guestimate this approach could help developers create components 40-90% faster than manually writing things from scratch**.

**It’s important to underscore that the AI can be trained on existing — often bespoke — conventions, technology choices, and language preferences.** In our work across organizations of all shapes and sizes, we’ve seen all manner of approaches, standards, syntax, and preferences baked into a design system codebase. Turns out that stuff really matters when it comes to creating a design system that can successfully take root within an organization. So while we’ve seen plenty of impressive AI-powered code generator products, they tend to produce things using specific technologies, tools, and syntax that may not be compatible with conventions and preferences found at many capital-E Enterprises. We’re skeptical of general-purpose AI code generators and err on the side of solutions that are closely tailored to the organization’s hard-won conventions and architecture.

### Component translation

A different flavor of AI code generation involves translating code from one tech stack to another. Need to support Vue in addition to your existing Angular library? Want to create a Web Component library out of your existing React library? **Without the help of AI, translation is a labor-intensive and error-prone manual effort. But with AI, we’ve dramatically reduced both effort and error when migrating between tech stacks.**

The video below demonstrates AI converting a badge Web Component built with LitElement into a React component in a matter of a few keystrokes.

Code and conventions that are shared between the tech stacks (SCSS, Storybook stories, component composition, doc blocks, props, state, and functionality) persist, and code and conventions that differ between tech stacks update in order to match the specific tech stack’s conventions.

**This is powerful! Working with AI has brought our team closer to a true “write once, deploy anywhere” reality.** Similar to how tools like [Prettier](https://prettier.io/) have disarmed the Spaces vs Tabs Holy Wars, we envision AI tools making specific implementation details like tech stack, conventions, syntax, and preferences less important. Instead, we can name or demonstrate requirements, and then the robots handle the implementation details—and port the code accordingly.

### Platform-specific conventions

We’ve leaned on AI to assist with translating components to work with proprietary conventions in specific popular platforms. For example, we’ve used AI to convert a more standards-based `<a>` tag into [Next.js’s ](https://nextjs.org/docs/pages/api-reference/components/link)[`<Link>`](https://nextjs.org/docs/pages/api-reference/components/link) convention in a way that preserves a clean source of truth while also leaning into platform-specific optimizations.

It’s possible to take a clean design system codebase and use AI tools to create adaptations, wrappers, codemods, glue code, etc to help everything play nicely together. Our team is already doing all of these things with AI to great effect.

## Component testing and QA

As we’ve demonstrated, AI component code generation can be quite powerful. But a healthy level of skepticism is encouraged here! How can we be sure that component code — whether human or AI generated — is high quality and achieves the desired effect? **We like to think of AI as a smart-but-sometimes-unsophisticated junior developer.** That means we need to review their work and ask for revisions, just as you would with a human developer.

Testing and QA are critical activities that help ensure that a design system’s codebase is sturdy and sound. Setting up AI automation for this can also help keep us honest when the pressure is on.** Testing and QA often fall by the wayside when the going gets tough and teams are distracted by tough deadlines. AI can help make sure those tests keep getting written even as developers focus on shipping the project.**

### Unit tests

Unit tests are a special kind of chore that always felt like pseudo-code to me. “Click the accordion; did the accordion open? Now click it again; did it close?” Manually writing unit test code is something we’ve seen many teams struggle with, even if they know unit tests are important. Thankfully with AI, you can write prompts as unit test pseudo code and the AI will generate solid unit test code using whatever tools/syntax your team uses.

There may be some manual last-mile stuff to bring tests over the finish line, but I see this as a big step forward to help developers actually create component unit tests. This also means no more excuses for not having unit tests in place!

### Accessibility review

There are many great accessibility testing and auditing tools out there; AI adds another layer of accessibility QA to the puzzle:

AI-powered accessibility review can be integrated into a design system workflow, ensuring that component code is up to snuff before being released. And unlike existing automated accessibility testing that often surface a simple “pass vs fail” checklist, AI-powered accessibility testing can integrate your organization’s specific accessibility guidelines and also surface helpful context and framing for best practices. We like this as this additional context and framing can really help teams grow their accessibility understanding and skills. Hooray!

## Documentation

**Here’s the painful truth about documentation: nobody likes authoring it, and nobody likes reading it. But documentation is also critical to a design system’s success.** I liken it to Ikea furniture construction: sure you could technically build a piece of furniture with only the parts on hand, but you’ll likely screw it up, waste time, and get frustrated along the way. Maybe AI can help solve the documentation paradox?

### Documentation authoring

Authoring design system documentation by hand is a laborious, painful task. Teams are tasked with authoring pithy component descriptions, providing a visual specification, detailing each component’s API names and values, writing usage guidelines, and more. This information is incredibly helpful for design system consumers, contributors, and other stakeholders, but again, it’s all a pain in the butt to create. Moreover, documentation risks falling out of sync with the design system’s design and code library, and also has

If LLMs can generate entire novels, they certainly would have no problem generating some words about some well-trodden UI components. **The gist is to get AI to extract human-friendly documentation from design files, code libraries, and any other relevant sources (user research, personas, analytics, etc).** And just as with code generation, **LLMs can learn your organization’s specific conventions so documentation is custom tailored to your reality.** Pretty dang cool.

Moreover, when this AI-powered documentation is wired up to the teams’ workflows, the documentation can always represent reality and doesn’t get stale.

### Documentation viewing

In Douglas Adam’s Hitchhikers Guide to the Galaxy, a [Babel fish](https://hitchhikers.fandom.com/wiki/Babel_Fish) “can be placed in someone’s ear in order for them to be able to hear any language translated into their first language.” Indeed, many emerging AI technologies get awfully close to the sci-fi dream of real-time language translation. **But beyond *****linguistic***** language, design systems need to account for language differences between disciplines, experiences, and other contexts.**

Design systems promise to deliver a shared language, but current design system documentation tends to be static and either too specific or too general to be useful for the myriad stakeholders that make up a digital organization. Wouldn’t it be cool if design system documentation morphed itself into a form that’s custom-fit to the individual looking for guidance? AI can be the babel fish that speaks in the manner and lingo that you personally need things to be explained.

A junior-level designer understands the design system in a different way than a senior-level designer. A consuming front-end developer has different goals than a consuming designer. **AI can address this by tailoring the design system’s documentation to the individual: their discipline, their skill level, their context, and yes even their preferred spoken/written language.**

Perhaps this AI-powered personalized guidance can help design systems realize the lofty goal of delivering a shared vocabulary across a digital organization?

## Principles and considerations

As we’ve demonstrated here, AI tools can supercharge many facets of design system work. Of course it’s critical to stress that all of this is emerging technology, has the potential to do a lot of harm, and should be handled with care. **A human-centric mindset along with a healthy level of skepticism (especially in these early days!) should be employed when wielding these new tools.**

At Big Medium, we’re formulating some guiding principles and important considerations as we dig into these technologies:

- **Respect** – With all of our work, we want to respect peoples’ time, energy, and talents. AI can be wielded in many ways and has the potential to stomp all over our craft and our humanity. How can we let the machines take over our drudgery and free us up for more important, thoughtful, and fulfilling work? How can AI elevate and enhance our work?
- **Org-specific solutions** – Design systems need to be tuned to the needs of a specific organization in order to be successful. AI can help evangelize “this is how we do things here”, but in order to do so these AI tools need to be internalize a specific organization’s culture, people, needs, technology, architecture, tools, and preferences.
- **Security and privacy** – Related to the above point, in order for AI to be successfully integrated into an organization’s workflow, it needs to clear a high bar for security and privacy. Security is critical, and AI is rightly sounding alarm bells across the enterprise landscape. We feel strongly that on-premises AI tools are preferred over chucking an organization’s intellectual property into ChatGPT.
- **Human-owned input and output** – It’s crucial for humans to control what gets fed into AI, and it’s crucial for humans to have the ability to modify/extend/fix any AI-generated output. While AI itself tends to be a black box, organizations should have full control over the input materials that the AIs are trained on, and should have full control over any outputted materials. Human team members can coach the AI, similar to how they might train a smart-yet-naive junior team member.
- **Predictability and reliability** – Any AI tool needs to produce predictable, reliable results in order to be allowed anywhere near [critical front-end infrastructure](https://bigmedium.com/ideas/design-system-pace-layers-slow-fast.html) at an organization. Training AI on an organization’s specific conventions is an important first step, but then it takes some finessing refining, and evolving to ensure the AI systems behave in a reliable manner.
- **Enhancement vs replacement** – Teams shouldn’t have to throw away all of their hard-earned knowledge, architecture, and assets in order to make use of AI. AI should work with the grain of hard-earned solutions and architecture, and teams should feel like AI enhances their work versus replacing their jobs.

Of course, these principles and considerations aren’t exhaustive, and we fully expect them to change and evolve as the landscape continues to shift.

## A brave new world

As we’ve demonstrated here, there’s so much potential to integrate AI into many facets of design systems work. What we’ve shared is by no means comprehensive; for instance, we haven’t shared much around how AI impacts the world of UX and visual designers. There’s also plenty more cooking in the lab; Kevin the AI wizard is conjuring up some downright inventive AI solutions that make the demos shared here look like child’s play. And of course we’re all witnessing the AI Big Bang unfold, so the landscape, capabilities, and tools will continue to evolve. It feels inevitable that the world of design systems — along with the rest of the world! — will be shaped by the evolution of AI technologies.

*Does your organization need help integrating AI into your design system operation? We can help! Big Medium helps complex organizations adopt new technologies and workflows while also building and shipping great digital products. Feel free to *[*get in touch*](https://bigmedium.com/hire/)*!*

[Brad Frost speaking at TEDx Pittsburgh](https://bradfrost.com/speaking)

![](https://bradfrost.com/wp-content/themes/v8/images/brad-speaking.jpg)