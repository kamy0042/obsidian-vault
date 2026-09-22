---
タグ: []
作成日時: 2025-10-29T14:09:00
URL: https://www.figma.com/blog/schema-2025-design-systems-recap/
Tags: [topic/ツール/Figma]
---
![[d6e77a69f96aad2c5187c51fbe888e4cc4d1742a-3840x2160.png]]

Quality and taste matter more than ever now that [the boundaries between product, design, and engineering are blurring](https://www.figma.com/blog/2025-shifting-roles-report/), and more people—and AI tools—contribute to the product development process. Design systems have long been the key to driving consistency between design and production at scale. Now they have the potential to be not just a shared language for product builders, but also the translation AI needs to understand design and code. In this way, design systems are evolving from static standards into living systems that product teams can build on.

Today, we’re sharing design systems updates to help you navigate these shifts across design and development. We’re focusing on balancing power and flexibility, bridging the gap between design and code, and broadening the reach and impact of your design system to let more people contribute to the design process. We want teams to take ideas further while extending and evolving taste and design intent wherever they are working. We’re rolling out some of these features in the coming weeks, and will continue to develop others based on your feedback.

Design systems are built to make things simpler. But as they span new products, brands, and platforms, simplicity can give way to complexity for design systems managers and product builders alike. Today, we’re announcing updates that make it easier for teams to scale their design systems across new paradigms.

[Variables have become the standard](https://www.figma.com/blog/config-2023-recap/#with-variables-design-systems-speak-the-same) for managing theming in Figma. While they’ve worked seamlessly for Figma users looking for a straightforward approach, they are an imperfect solution for companies that have multiple products, each with their own distinct brand needs.

Enter: Extended collections, a new way to manage multi-brand design systems. Now, design systems authors can release a simple whitelabeled version of their design system that designers across the company can extend with their own themes, publish, and reuse. This extension is intrinsically tied to the parent design system, meaning it will inherit changes like new variables or color updates. This allows the extended collection to stay in sync with the core system while still maintaining the colors and values it has explicitly overridden.

[**Learn more**](https://help.figma.com/hc/en-us/articles/35794667554839-What-s-new-from-Schema-2025#h_01K84JN6K1F6DV56040A75F2BF)** about Extended collections, which will be available in November.**

Since [components](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma) were originally released in Figma, they’ve had restrictions on how they could be used. For example, if you had a dropdown list component, you couldn’t add new list items to an instance; you’d either have to author it with hidden list items (which designers could unhide to use), or designers would have to detach the component (breaking its connection with the design system and making handoff more difficult). With slots, you will be able to add your own layers within instances and easily specify *which* instances a slot accepts, allowing for both increased usability and compliance with your design system.

[**Learn more**](https://help.figma.com/hc/en-us/articles/35794667554839-What-s-new-from-Schema-2025#h_01K84PB569NTFMXBDS36C8DCPV)** about slots and apply for early access **[**here**](https://docs.google.com/forms/d/1eQUIdmkJDHT6RlKvb69Kqirw41TTGBPYlCk2BQUJijQ/edit#responses)**.**

If you’ve ever handed off a design for development, you’ve probably received follow-up questions about which *exact* token you’re using. Now it’s easier than ever to match your raw values with their corresponding variables with our new Check designs linter. Simply mark something ready for dev, or trigger “Check designs” via a quick action, and we’ll automatically surface elements like variables to align to your design system. Our custom model will suggest the right variable to use in that context, and let you check the work before applying it. Once you’re done, you can hand off those designs to a dev with confidence.

[**Learn more**](https://help.figma.com/hc/en-us/articles/35794667554839-What-s-new-from-Schema-2025#h_01K84PBY9TFHJ40AEC4Q47DGKH)** about Check designs. Organization or Enterprise full seat plans can apply for early access **[**here**](https://docs.google.com/forms/d/1eQUIdmkJDHT6RlKvb69Kqirw41TTGBPYlCk2BQUJijQ/edit#responses)**.**

Our design systems rewrite has delivered big performance gains: Actions like updating variables or switching modes are now 30–60% faster, and heavy state swaps have gone from 3500ms to 350ms, and from 2500ms to 450 ms, depending on complexity of variable interactions and components.

We know that performance gains can have an outsized impact on workflow efficiency. That’s why we set out to improve performance by creating a single, unified foundation for all of Figma’s design systems features. We’ve completed a massive rewrite of our design systems architecture, refactoring and creating new systems and underlying data models that power core features like components and variables.

With this new foundation, you’ll see faster instance updates (especially for components with thousands of instances) and a more responsive editing experience across even the most complex files. These systems also provide the foundation for many of the new features we’re announcing today.

**These performance improvements are now live.**

## [Codebase context](https://www.figma.com/blog/schema-2025-design-systems-recap/#codebase-context)

Whether through loosely inferred connections—like shared naming conventions on components, styles, and variables—or more tightly-bound context with Code Connect and variables code syntax, we’ve been working hard to bring context from your codebase into your design system. As more teams rely on AI tools to write workable code, this link between design systems and code is more important than ever.

[Code Connect](https://www.figma.com/blog/introducing-code-connect/) has been one of the biggest drivers in bridging the gap between design and code in Figma. While we’ve seen a lot of excitement from users about Code Connect and its power to drive design system adoption by making code more accessible and useful for developers, we’ve also heard feedback that getting started could be easier. With the new Code Connect UI, users can connect Figma directly to their GitHub repositories and use our new AI suggestions feature to quickly find the right code file to map to Figma components—no coding necessary. This new flow allows design system teams to establish a link between code and design more quickly, and with less maintenance.

[**Learn more about the Code Connect UI**](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/)**, which is now rolling out to Organization and Enterprise customers.**

### [Figma MCP server](https://www.figma.com/blog/schema-2025-design-systems-recap/#figma-mcp-server)

[The Figma MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/), which brings your Figma and codebase context into agentic coding workflows, is out of beta and generally available. Starting today, you can now add guidelines for how AI models should adhere to your design system. Our remote and desktop servers—which allow you to access context from Figma links and the desktop app—also have feature parity so you can use MCP in your preferred workflow. And with new FigJam diagram support, you can build multi-step workflows and wire up interactions using your agentic coding tools. We want everyone coding with Figma context, so we’re excited to expand MCP availability to all users.

[**Learn more**](https://developers.figma.com/docs/figma-mcp-server/)** about the Figma MCP server, which is now available, and visit the **[**MCP Client Catalog**](https://www.figma.com/mcp-catalog/)** to get started with a supported MCP client.**

As AI tools make it easier for even more people to participate in the design process, many teams are worried that quality is at stake. Our view is that design is everyone’s business. Craft doesn’t have to suffer when more people design; especially if designers are defining the quality bar. We’re making it easier for builders in every role to take part in design, without losing sight of craft and taste.

We [launched Figma Make](https://www.figma.com/blog/introducing-figma-make/), a prompt-to-app tool, at Config 2025 to help teams prototype, validate, and build more easily across the product development process. It’s been incredible to see how Figma Make has opened up new possibilities for iterating and shipping across entire product teams.

At the same time, we know that pulling context from your design system and production code is essential to getting better results. People spend months crafting thousands of components, styles, and variables with every single detail being refined down to the pixel—we want that level of fidelity and craft to be reflected in your Make generations. We also want you to be able to bring in your design systems no matter where they live—whether they're in Figma libraries or in code. We’re approaching this in two ways:

The first is to allow you to directly import libraries from Figma, through a new feature we’re calling Make kits. With Make kits, you will be able to generate React code components and CSS files for your styles and variables, then package those outputs for use in Figma Make.

[**Learn more**](https://help.figma.com/hc/en-us/articles/35794667554839-What-s-new-from-Schema-2025#h_01K84PAJQKX5G36P1307W7P74T)** about Make kits and apply for early access **[**here**](https://docs.google.com/forms/d/1eQUIdmkJDHT6RlKvb69Kqirw41TTGBPYlCk2BQUJijQ/edit#responses)**.**

For teams who already have a design system in their codebase, we will allow you to import your React components—whether self-built or open-source components—via public and private node package manager (npm) imports.

All of these updates are focused on helping you build and maintain design systems that flex and grow with your team. And to truly enable this kind of scale, we’re always looking to the community for their feedback on how we can help those who manage, maintain, and consume design systems. Here are some of the most-requested features that we’re excited to roll out over the coming weeks.

Native import and export has long been a top-requested feature in our forums. We’ve held off on adding this feature—opting instead to release an [open source import/export plugin](https://github.com/figma/plugin-samples/tree/main/variables-import-export)—until [The Design Tokens W3C Community Group (DTCG)](https://www.w3.org/community/design-tokens/), a community focused on creating design tokens standards, finished their 1.0 release. This was to ensure a better authoring experience across our tooling ecosystem. The community group spec is now officially at 1.0, along with native import and export support in Figma.

**Variables import and export will be available in November.**

To give you context on your design system architecture while you author new variables, we’re making a change that will show you all of your subscribed collections—directly in the authoring modal. You’ll also be able to create variables inline to help you more easily author collections that are organized in groups. Finally, to make more space for these updates, the authoring modal will open full screen by default.

**Variables authoring improvements will be available in November.**

For large teams, four modes just isn’t enough for your growing design systems. Today, we have increased the number of modes to 10 for those on the Professional plan and 20 for those on Figma Organization.

[**Learn more**](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables#h_01HMCXW0AVHQ0E11JMK1WJAS2J)** about the variable mode limit increase, which is now available.**

Design systems allow teams to harness the power of AI tooling while keeping craft high. We want to make it easy for design systems authors and consumers to use their systems as catalysts for creativity as they navigate this shifting landscape. As always, we’re driven by your feedback and can’t wait to see what you build as these updates roll out over the coming months.

Paige Costello is the VP of Product at Figma leading the Editor group, responsible for Figma Design. Before Figma, she led Core Product and was the Head of AI at Asana, a work management platform built to maximize team impact and create clarity at scale. She has also held leadership roles at Intercom and Intuit. Paige is passionate about building products customers love and growing the people who bring them to life.

## Subscribe to Figma’s editorial newsletter

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)