---
タグ: []
作成日時: 2024-04-17T03:50:00
URL: https://www.figma.com/blog/introducing-code-connect/
Tags: [topic/ツール/Figma, topic/デザインシステム/コンポーネント設計]
---
![[4b569560fb80744397542d4700c1363bacbbda88-1608x1206.png]]

Today, we’re announcing beta for Code Connect, a feature built to improve design system adoption by making code more accessible and useful for developers.

Design systems are one of our most powerful tools for bridging the gap between design and code. By creating a shared language, they enable designers and developers to efficiently collaborate across their respective workflows. We’ve been working hard to bring design systems closer to code through features like [auto layout](https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout), [variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma), [component props](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties), and [Dev Mode](https://www.figma.com/blog/introducing-dev-mode/) which we launched last year.

[Get in touch with our Sales team](https://www.figma.com/contact/?utm_source=Shortcut&utm_medium=Blog&utm_campaign=Framework) for tailored guidance on how to leverage our latest features for your design system.

Despite these advancements, one major challenge still remains: adoption. As an Engineering Manager, I’ve seen this firsthand. When we talk to our customers, we hear the same thing over and over again: “We built a design system, but it’s not being used to its full potential.” Developers may use parts of the design system, but they often aren't aware of everything it contains. And when they do use it, they may unintentionally misuse components or patterns in ways that don't align with the system's intended guidelines. This is a critical problem, as the success of a design system depends on people not only using it, but using it correctly and consistently.

This is why I’m so excited to introduce **Code Connect**, a new tool to help organizations boost design system adoption by making code more accessible and useful for developers. With Code Connect, you can customize the code snippets that appear in Dev Mode, so developers see your actual design system code instead of auto-generated CSS. The result is faster, more efficient development, higher adoption of your design system across the organization, and a reduction in the creation and maintenance of duplicated, one-off components.

## [Connecting design and code](https://www.figma.com/blog/introducing-code-connect/#connecting-design-and-code)

Design system adoption at scale is something we’ve been thinking about for a long time. The barrier to adoption isn’t just a matter of individual workflows or preference; it’s a testament to the broader disconnect between design and code. As our CEO Dylan Field [explains](https://www.figma.com/blog/config-europe-2020-new-feature-announcements/), design and code have traditionally occupied different worlds: **“There’s a natural tension between design and code. In the world of design, the focus is deciding what to build—in the world of code, the focus is building it…In practice, they’re partners working to bring a product to life.”**

Designers and developers work in different tools, with different constraints and considerations. Designers optimize for creativity and exploration, while developers optimize for structure and maintainability. At Figma, we imagine a world where designers and developers can move seamlessly between freeform exploration and structured, systematic implementation. Code Connect is another step in that direction.

## [Meeting developers where they are](https://www.figma.com/blog/introducing-code-connect/#meeting-developers-where-they-are)

Code Connect aims to bridge this gap by bringing the power of code into the design tool. Under the hood, Code Connect is a utility provided through **npm** for JavaScript and TypeScript projects, as well as Swift Package Manager for SwiftUI projects. This allows developers to easily install and use Code Connect in their own projects, regardless of the platform they’re working on. With more platform support coming soon, Code Connect aims to meet developers where they are, integrating seamlessly into their existing tools and workflows.

The package and setup instructions [live in GitHub](https://github.com/figma/code-connect), and developers can install it via a simple command line interface. This maps to the tools and workflows developers already know and use.

Once installed, Code Connect allows design system teams to surface and distribute best practices and documentation for how to use the design system, contextually tied to the mockups. So when a developer clicks on a mockup, they don’t need to search through a bunch of documentation and code to figure out how to build it in the design system. Instead, they just click on it and get the approved, maintained code samples they need, published by the design systems team.

This has huge benefits: Since developers aren’t rewriting components, there’s less code to maintain. By using what’s already there—rather than creating components from scratch—developers can work more efficiently and effectively. And with better adherence to your design system, you can more easily improve accessibility and consistency across applications.

Here are some examples of what that looks like to implement Code Connect into your system:

JSX

```plain text
1import * as figma from '@figma/code-connect'2
3figma.connect(Button, 'https://...', {
4  props: {
5    label: figma.string('Text Content'),
6    disabled: figma.boolean('Disabled'),
7    type: figma.enum('Type', {
8      Primary: 'primary',
9      Secondary: 'secondary',
10    }),
11  },
12  example: ({ disabled, text, type }) => {
13    return (
14      <Button disabled={disabled} type={type}>
15        {text}
16      </Button>
17    )
18  },
19})
20
```

Swift

```plain text
1import Figma
2
3struct Button_connection : FigmaConnect {
4  let component = Button.self5  let figmaNodeUrl: String = "https://..."6
7  @FigmaProp("Text Content")
8  var label: String = "Submit"9
10  @FigmaProp("disabled")
11  var disabled: Bool = false12
13   @FigmaProp(
14      "Variant",
15      mapping: [
16          "Primary": ButtonVariant.primary,
17          "Secondary": ButtonVariant.secondary,
18          "Destructive": ButtonVariant.danger
19      ]
20  )
21  var type: ButtonType = .primary
22
23   var body: some View {
24      Button(type: self.type, disabled: self.disabled, label: {
25          Text(self.label)
26      })
27   }
28}
```

## [A more unified workflow](https://www.figma.com/blog/introducing-code-connect/#a-more-unified-workflow)

When developers use Code Connect, they aren’t generating new code; they’re accessing the approved, maintained code samples and documentation that have been published by the design systems team. This helps to ensure consistency and adherence to the design system guidelines, without relying on automated code generation that could introduce errors or inconsistencies. Code Connect is about surfacing and distributing existing code and documentation from your design system. By making the design system the path of least resistance, we can encourage adoption and ensure that everyone is working from the same source of truth.

This is especially important as teams scale. When you’re a small team, it’s easy to keep everyone on the same page. But as you grow, silos start to form. Designers and developers start working in isolation, and the design system becomes more of a loose assemblage of guidelines than a shared standard. With Code Connect, we want to make it easy for teams to stay in sync, no matter how large they get.

But Code Connect is just the start. Looking ahead, Code Connect unlocks many exciting possibilities for further integrating design and development workflows. For example, it could potentially enable automatic audits of design system usage in both code and design, identifying areas where designs and code are out of sync. It might also open up opportunities to provide analytics and insights into design system usage, helping teams to better understand how their system is being used in practice. Another possibility is the potential to enable approval flows between design and engineering for component updates, ensuring that changes to the design system are properly reviewed and coordinated across teams.

While these specific features aren’t currently on our roadmap, having the connection between design and code opens up a whole new world of opportunities for future exploration and innovation. Our vision is to create an even deeper connection between design and code, beyond just design systems or components. Imagine a future where we have that connection for variables, iconography, typography—all the things involved in a design. Code Connect is laying that foundation, and we’re excited to see how this technology evolves to support even more powerful workflows in the future.

Code Connect will be available in beta for Figma [Organization](https://www.figma.com/organization/) and [Enterprise](https://www.figma.com/enterprise/plan/) plans, with general availability planned for later this year. Beta is about presenting the idea, testing the waters, and getting feedback from the community. We plan to fully integrate Code Connect into the Figma workflow, including the component playground, with support for additional platforms, such as Android, and web frameworks.

*To get started with Code Connect, *[*visit our GitHub repo*](https://github.com/figma/code-connect)* for instructions on installing and configuring the NPM package, and check out our documentation to learn more.*