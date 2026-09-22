---
タグ: []
作成日時: 2022-01-28T18:40:00
URL: https://storybook.js.org/blog/figma-plugin-sneak-peek/
Tags: [topic/ツール/Figma]
---
![[storybook-connect-hero.gif]]

At Storybook, we believe the software industry is converging on [Component-driven UIs](https://componentdriven.org/) to deliver durable user experiences. Our goal is to accelerate the industry's shift to components.

Thousands of developers now build, test, and document components with Storybook. Designers create components too. Figma adopted components back in 2016 and is championing the cause from the design perspective.

I’m excited to share a sneak peek of our new Figma plugin, **Storybook Connect**. It keeps designers and developers in sync by connecting designs to stories.

- 🤝 Link design components to stories
- 🕹 Play with interactive stories in Figma
- 🎯 Compare implementation to the design

![[storybook-figma.png]]

## Wait, but why?

One of the classic hurdles in frontend is keeping designers abreast of what’s live in production. The implementation and design tend to drift apart over time. This leads to confusion around expected UI appearance and behavior.

With components, developers and designers have a shared construct. But the approach to components is different depending on your discipline.

Developers use Storybook to develop components in isolation from the app. The core innovation is the **story**, a standards-based format for component examples. You build components and write stories along the way that capture key states.

Inspired by engineering, Figma’s components unlock superpowers like “[composition, inheritance, and unlimited overrides](https://www.figma.com/blog/components-in-figma/)”. With component **variants**, designers can represent key states in a more granular way.

It doesn’t take much squinting to see that **Storybook stories map to** **Figma** **variants **and vice versa. Till now, these sibling constructs have been tough to link together.

## Connect Storybook and Figma

What if you could connect stories to their variants? That’d mean designers see live components to debug inconsistencies earlier in the design process. As a developer, you’d save time because designs would actually reflect what’s in production.

The Figma plugin embeds stories into the design workspace so that designers can cross-reference the live implementation in one place. Open the Storybook Connect window to interact with the real component.

![[storybook-connect-interact-with-component.gif]]

### Link components

When you link a component or a variant to a story that link propagates to every instance in Figma. That saves you time by ensuring your collaborators can also see the story link.

No more tabbing between Figma and Storybook during design handoff or searching multiple Storybooks to find out where a component was implemented. Link once and for all.

![[storybook-connect-variant-link.gif]]

### Compare implementation to the design

The plugin comes with a compact yet powerful story embed that includes familiar tools like the Outline, Measure, Backgrounds, and more. This gives you a quick way to spot check appearance.

![[storybook-connect-measure-component.gif]]

### Open Storybook from the sidebar

See which components are linked by glancing at the Storybook Connect section in Figma’s sidebar. You’ll find convenient actions to view the story in place or in your web browser.

![[Sidebar.jpg]]

## Sign up for early access

Storybook Connect for Figma brings designers closer to developers by connecting stories (code) to variants (design). It's in active development, hence the sneak peek.

We need your help and feedback to bring it to life. Our mission is to unite component tools in one seamless workflow. Sign up to Storybook’s mailing list below to get notified of early access and project updates.

Join us in Storybook’s [Discord chat](https://discord.gg/storybook) \#design and on GitHub. The plugin is developed by [Jonathan Kolnik](https://twitter.com/_jonok), [Michael Arestad](https://twitter.com/michaelarestad), [Zoltan Olah](https://twitter.com/zqzoltan), and [Dominic Nguyen](https://twitter.com/domyen) (me!).