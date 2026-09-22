---
Created: 2024-01-20T17:03:00
URL: https://frontendmastery.com/posts/the-evolution-of-scalable-css/
Tags: [topic/技術/CSS]
---
![[the-evolution-of-scalable-css.png]]

How we write and think about CSS has changed significantly since the web’s beginning.

We’ve come a long way from table-based layouts, to responsive web design, and now into a new era of adaptive layouts powered by modern CSS features.

Managing and organizing CSS has always been challenging, where consensus is hard to find.

In this post, we’ll develop a deeper understanding of CSS by diving into the underlying issues that make it difficult to scale.

We’ll understand the evolution of the various CSS best practices that have emerged and changed over time.

By the end, we’ll have a good grasp on past approaches to scaling CSS on large projects, and how popular tools like Tailwind and a range of others address these issues in counter-intuitive ways.

## The time before CSS

In the very beginning, the web only had HTML. We wrote it in all caps, and we styled pages using properties directly on markup:

```plain text
<BODY>
	<P SIZE="8" COLOR="RED">LOUD NOISES</P>
</BODY>
```

These were dark times for those wanting stylish pages.

Besides the limited number of styles available, a clear limitation was all the duplication needed.

A quintessential example of the web around this time was the good old [Space Jam](https://www.spacejam.com/1996/) website.

Now some might be thinking “that looks like the props I pass into my component library.” As we’ll see later, things often come full circle with a twist in the cycle of innovation.

## Stylesheets and separation of concerns

CSS entered the game, and like many innovations born from previous pain points, we could now remove all that duplication.

Stylesheets enabled us to style pages declaratively, affecting vast swaths of elements with very little code:

```plain text
p {
color: red;
}
```

We could now think about the structure of our content and its visual appearance and layout separately. Moving layout concerns from HTML using tables into CSS instead.

CSS was minimal initially, heavily inspired by physical desktop publishing, with terms like “float” that supported formatting columns of text.

As time progressed, we started collecting examples on a site called [CSS Zen Garden](http://www.csszengarden.com/).

CSS Zen garden became a hub for showing how people could use CSS creatively. People could submit CSS files that re-styled the same HTML in interesting and unique ways.

This was very influential in spreading the idea of **separating content from its styling**, re-stylable HTML, and thinking about applying themable “skins” to a core skeleton.

### Figuring out best practices

We started building more complex sites and applications, putting new demands on CSS to evolve.

Any new technology often takes a few cycles of different approaches before best practices emerge.

We saw tools like [Less](https://lesscss.org/) and [Sass](https://sass-lang.com/) pop up that extended native CSS capabilities. Giving us things like variables and calc functions, greatly improving the developer experience.

As we spent more time in these stylesheets, we sought ways to organize all these rules and selectors.

Many different patterns for scaling CSS cropped up. These tried to strike a balance between maintenance, performance, and readability and are called “CSS architectures”.

Before we dive into these architectures, let’s first understand why managing CSS on large-scale projects gets complicated quickly.

## Why CSS hard to manage at scale

“At scale” refers to the intersection of multiple things, including people, tools, processes, and performance.

Scaling effectively requires us to carefully manage the growth of complexity. So as the system grows, it’s still understandable, changeable, and performant. Where the cost of adding new code remains as low as possible, and people are confident changing and deleting old code.

The cascade (the C in CSS) originates from the web’s early days. Browsers could apply default styles to these new electronic documents. Document authors could then provide their own styles, which could be overridden by individual user preferences.

This image of cascading rules is central to understanding CSS. The same properties that make CSS powerful also make it hard to achieve those scaling properties in large projects. In particular, its **global namespace**, **cascading rules**, and **selector specificity**.

### The global namespace

The global CSS namespace can be powerful if leveraged carefully. But on large projects, it’s often a curse.

When everything is global, anything can unexpectedly affect something else. Either now or sometime in the future when things change.

This becomes problematic pretty quickly. There are reasons we don’t put everything in a global namespace in other languages. As more code gets added, things become way less predictable and challenging to maintain.

It’s worth noting that [CSS cascade layers](https://www.smashingmagazine.com/2022/01/introduction-css-cascade-layers/) is an up-and-coming feature that can help address this problem natively.

### Naming things is hard

Creating a series of semantic class names often feels like a chore without much benefit when iterating quickly with CSS.

Coming up with useful names is hard because we’re attempting to compress a bunch of info into a precise label. Getting this right becomes even more important when everything is global.

Naming things too early is a form of premature abstraction. Because often the things we’re naming still need to be fully formed and are not yet reusable.

Design changes are common in the frontend, and these labels regularly become outdated and require refactoring of both styles and markup.

### Refactoring CSS is hard

Both design and modern software development are highly iterative. We often only start to develop a clear picture after a few iterations have stacked up.

This requires us to regularly re-evaluate our understanding of the problem we’re solving. In code, this means refactoring as our understanding changes and solidifies.

Refactoring can be challenging, but it’s a tried and true method for arriving at good abstractions over time based on actual requirements rather than theory.

In CSS it’s pretty hard. Without solid visual regression testing, many CSS failures are “silent,” where it’s easy to create unforeseen bugs and side effects. This leads to a couple of common scenarios.

1. **Append only stylesheets**
Projects start with stylesheets that feel manageable. But it’s common for new code to get stuck on the end of files after a few iterations and bug fixes later.
Knowing when we can safely change or delete a rule is hard. So we override what came before in the cascade at the end of the file.
This is the cause of **specificity battles**. We’ve all probably had the experience of needing to override some other styles. It’s an easy road into the dark arts, where `!important`’s start cropping up, deepening the maintenance burden.
2. **Dead code**
In practice, we often use the same CSS properties repeatedly. It’s usually much safer to continually duplicate rules, rather than take on the risk of refactoring large amounts of CSS in a global namespace.
This often leads to a lot of unused CSS that’s hard to know if something is relying on it. Which ends up bloating CSS spread out over various files.

### Debugging CSS is hard

A big part of debugging is simulating what the computer does in our heads.

Debugging is hard with complex CSS because we’re mentally computing the cascade and calculating the final rules while considering source order.

Particularly with CSS’s many nuances around positioning, alignment, stacking contexts, margins, and height. Without a systematic approach, a common CSS debugging workflow often involves tweaking some values to see what happens. Refreshing the page, and absolutely nothing has changed. Or something has completely broken.

This is particularly challenging when working with code you don’t control or browser-specific bugs.

## Taming complexity with CSS architectures

CSS has a simple model, but it’s easy for things to get messy quickly. We eventually started looking to apply software engineering principles to help us manage.

These architectures are more like high-level blueprints for organizing CSS files and their rules and selectors.

Let’s get a quick overview of some of the more influential and popular CSS architectures and their main ideas.

### OOCSS: Object Orientated CSS

OOCSS distinguished the different types of CSS we write in practice. CSS that does layout, and CSS that themes or “skins” HTML, like colors, fonts, etc.

An “object” in OOCSS is a [repeating visual pattern](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) that can be abstracted and reused. The idea is to identify common visual patterns and extract duplicated code blocks into reusable classes.

One of the most widely used CSS frameworks that leverage these ideas is [Bootstrap](https://getbootstrap.com/).

### SMACSS: Scalable and Modular CSS

In practice, large single-file CSS files quickly become unmanageable and hard to debug.

SMCASS was a guide to categorizing the different types of CSS and was compatible with approaches like OOCSS.

The main idea was to take all these class names, and organize them into separate buckets, and provide some much-needed [structure to our CSS files](http://smacss.com/book/categorizing). In addition to some conventions around naming classes.

### BEM: Block, Element, Modifier

BEM is a model for how to think about breaking things down into components, their sub-elements, and their various discrete states.

Originally [created at Yandex](https://en.bem.info/methodology/history/), it provides a systematic naming convention that avoids specificity battles by keeping all selectors flat (no descendant selectors), where every element that gets styled, gets its own class name.

BEM gelled well with popular CSS pre-processors like Sass with nested rules that would compile down to flat CSS selectors:

```plain text
.nav {
  // block styles
	&__link {
    // element styles that depend on the parent block
		&--active {
          // modifer styles
		}
	}
}
```

### ITCSS: Inverted Triangle

One of the main ideas behind ITCSS is thinking about our style sheets through the lens of layering to help tame the cascade.

ITCSS is a like “meta-framework” for CSS, compatible with other systems.

The idea is to tame the chaos of everything overriding each other unpredictably by providing explicit layers of increasing specificity.

“Inverted triangle” comes from each progressive layer forming an inverted pyramid shape.

It’s an influential methodology for managing CSS files on large-scale projects. To dive deeper, you can check out [a talk given by its creator](https://www.youtube.com/watch?v=1OKZOV-iLj4&ab_channel=DaFED).

### Cube CSS

Cube CSS works with the global namespace and cascade rather than trying to work around it.

Cube CSS provides a set of well-defined buckets that categorize CSS. These form the cube acronym: Composition, Utility, Block, Exception.

The docs do a great job [explaining the principles](https://cube.fyi/principles.html#progressive-enhancement). It’s a loose methodology that is like a mental model for organizing CSS.

Similar to ITCSS, it’s an influential “meta CSS framework”, compatible with various approaches.

## Rethinking separation of concerns

With the rise of SPAs and [component-driven development](https://www.componentdriven.org/) we started seeing new approaches to CSS.

In this world, managing CSS became even harder, because components now load asynchronously, with no guarantees on source order.

A common issue is when some element on the page looks different when doing an SPA transition from page A to B, but looks fine if you directly load to B. Leading to some interesting debugging sessions.

We started looking for more concrete solutions to managing CSS that gelled with this new component-centric approach to structuring our frontends.

These tools often broke many of the established best practices we had been building up and thinking about so far. Let’s understand them.

### Inline styles

The shift to component-based frameworks often saw styles applied inline inside components. In frameworks like React, we pass a Javascript object to the `style` prop, converting it to inline styles.

This causes a visceral reaction for many because it’s like we’re going back to the very start when we didn’t have external stylesheets, throwing away existing best practices.

In the context of components, inline styles don’t face the original problem of massive duplication because it’s encapsulated inside the component. The fact that styles only affect the element they’re on is a nice way to add and modify CSS safely in components.

The main problem with inline styles is the lack of access to more powerful CSS features, like pseudo selectors and media queries. In addition to the difficulty of leveraging shared design tokens, caching, static analysis, and pre-processing.

### CSS in JS

In the early days of React, [Veujx gave a talk](https://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html) on Facebook’s approach to CSS. On the surface, this looked a lot like inline styles but with access to the power of stylesheets.

This talk led to a proliferation of open-source libraries that took a Javascript-driven approach to CSS.

**The first wave of CSS in JS** libraries became popular with libraries like [Styled Components](https://styled-components.com/), [Emotion](https://emotion.sh/docs/introduction), and a whole range of others in the React ecosystem.

These solved most of the problems vanilla CSS had on large projects using components, making working with dynamic values from JS incredibly easy.

The problem was the performance tax end users were paying. There were server-side rendering inefficiencies, issues around caching, and client runtime costs.

This exacerbated slow app start-up times, requiring multiple re-renders once the Javascript had hydrated. A lot of work added up quickly for large apps.

A more recent **second wave of CSS in JS** libraries aim to give the best of the developer experience without the runtime cost.

Tools like [Vanilla extract](https://vanilla-extract.style/), [Linaria](https://linaria.dev/), and [Compiled](https://compiledcssinjs.com/) extract stylesheets out from components in a compile step. This moves much of what happens at runtime on users’ browsers to compile time.

CSS is often compiled into Atomic CSS (a CSS architecture we’ll touch on in a bit) to avoid bloated CSS files and is a lot more cacheable compared to dynamic runtime style sheets.

### CSS Modules

CSS modules strike a balance between writing regular CSS (or Sass) and hitting many of the scaling properties we’re looking for.

CSS modules allow you to use CSS’s full power and control without worrying about styles bleeding out across components, while keeping things localized within a component directory.

Particularly with the first wave of CSS in JS libraries, tying CSS to a particular view library was a step too far for some, where CSS modules was a great alternative. However some may consider this a form of CSS in JS because it depends on a bundler like Webpack to generate and ensure selectors are scoped.

Regardless, CSS modules are a great middle-ground between the regular CSS world and fully component-centric approaches like CSS in JS. Coming up with names is still required and compatible with conventions like BEM.

## Challenging CSS Best Practices

Meanwhile, outside the world of component-based SPA’s, the original CSS Zen Garden influenced best practices were [challenged on another front](https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/).

**Atomic CSS** was born in the darkness of managing CSS on large projects. Molded by it.

Its initial motivation was entirely pragmatic - enable styling without having to edit or append rules to an existing stylesheet. Avoiding all the issues that come with that.

It was on the other end of the spectrum compared to other CSS architectures like OOCSS, BEM, and SMACSS, and completely counterintuitive.

Atomic CSS went a level lower than “blocks” and “objects,” focusing on single-purpose atoms. Going directly against established best practices even outlined in the [HTML spec](https://html.spec.whatwg.org/multipage/dom.html#classes) on how not to name CSS classes.

It has become a popular productivity-boosting approach for teams on projects where it feels too risky to modify existing CSS. Some popular CSS libraries included [ACSS](https://acss.io/), [Tachyons](https://tachyons.io/), [WindiCSS](https://windicss.org/), and many others.

According to the [state of CSS](https://stateofcss.com/en-us/), one of the most popular implementations of this CSS architecture that makes it accessible today is the [Tailwind](https://tailwindcss.com/) CSS framework.

## The rise of Tailwind

Tailwind has been rapidly gaining popularity since its release in 2017. A typical testimonial of Tailwind is that it increases productivity by making CSS more accessible to non-experts while leading to more maintainable CSS. Frequently the advice is to “just try it, and you won’t go back”.

## Principles powering Tailwind

To understand its popularity, let’s examine the underlying principles behind Tailwind’s method.

Despite seemingly throwing out established best practices, we’ll see underneath it’s a collection of pragmatic principles that work in practice.

### Defer naming things

Not having to continually name things is one reason Tailwind feels so productive. This workflow is backed by the idea of composing single-purpose atoms bottom-up.

From a maintainability perspective, it’s a great way to [avoid hasty abstractions](https://kentcdodds.com/blog/aha-programming#aha-).

Never namings things at all harms the readability of code. Often leading to a soup of atomic classes (or components) without clear boundaries.

This is a valid criticism. But in practice, it’s surprising how far this can go before being a legitimate pain point. It’s often the right trade-off in code bases subject to regular changes or with many people.

This is a powerful workflow in a component model. You already have a semantic name for the component you are working in, and so you end up building up towards that, with styles contained to the component.

This is the same higher-level principle outlined in [Building future-facing frontends](https://frontendmastery.com/posts/building-future-facing-frontend-architectures/). It’s not about never creating abstractions, but not creating them prematurely.

### Abstract when the time’s right

When operating iteratively, the ability to easily delete and change code vastly overshadows the cost of duplication.

A common pain point when writing CSS is that making things overly DRY or optimized up front often feels like a waste when things are hard to change later.

It’s much easier to DRY up repeated code behind a common abstraction than it is to work around overly abstracted code and make it work for your new use case.

Tailwind offers two techniques to abstract at the right time, either by creating a shared CSS class representing a block (similar to OOCSS).

Or more encouraged when using component-based frameworks, is to extract the duplicated classes into a reusable (React, Vue, Solid, Svelte, etc.) component and share that.

### Have confidence refactoring

Because classes are localized to the markup they are on, we can confidently refactor these without worrying about affecting other elements or components elsewhere.

This works for both mental models of the web as a document and component-centric models. This leads to the feeling that Tailwind can scale up and down depending on the type of site or application you are building.

### Avoid dead code

Tailwind and CSS in JS libraries that pre-compile to Atomic CSS solve the problems of bloated CSS files full of duplicated rules.

With Atomic CSS, the growth of CSS is tied to the number of unique styles used, not the amount of features developers are shipping.

For example, it’s common to reuse certain properties like `flex` everywhere. Rather than have these duplicated in stylesheets under different class names, we only pay that cost once. This is true for each property/value combination.

## Bridging the design gap

Let’s take a break from all these principles and architectures, and remember that CSS is ultimately about implementing visual designs.

A big reason CSS feels hard for many developers is the fact that design is hard.

Getting the fundamentals right goes a long way. In the case of visual design, some key elements are alignment, spacing, consistency, sizing, typography, and color.

In CSS, for any given property like `font-size`, `color` or `padding`, there are multiple ways to implement values.

Often we do so in an ad-hoc way, leading to a proliferation of slightly different font sizes, spacing, and color inconsistencies that add up to an unpolished look and feel.

A key part of scaling CSS is bridging this design gap by having a solid bedrock of sharable primitives that define values for spacing, font-sizing, colors, break-points, etc.

These are often called **design tokens** and form the foundation of a design system. Without this foundation, things can feel very arbitrary and chaotic.

One aspect that is key to Tailwind’s popularity is providing a set of pre-thought foundational design primitives you can use off the shelf. This eliminates a huge amount of decision-making that often gets done ad-hoc with inconsistency.

Another great open-source option for a solid foundation is [Open Props](https://open-props.style/), compatible with whatever CSS approach you take, and provides a ton of great pre-baked variables and tokens.

## Concluding thoughts

> Absorb what is useful, discard what is useless, and add what is specifically your own

No tool is perfect, and every project and team is different. Whatever approach is taken, establishing foundations that bridge the design gap is a key element to scaling CSS.

Focussing on the primitives that get composed and built on top of also goes a long way. This also applies to large component-based applications using component libraries. Providing composable component layout primitives like `Box`, `Stack`, `Inline` etc, is a great way to manage CSS without developers having to write any CSS.

Recently there have been an impressive number of features shipped to evergreen browsers that address many of the pain points that make CSS hard to scale. Newer features like cascade layers, container queries, sub-grid, `has`, and many more will likely change how we think about and leverage CSS in the future.

Success in scaling CSS is less about dogmatic adherence to particular principles or best practices and more about defining what you need based on real-world constraints and doing what works sustainably and performantly to get the job done.

## References & resources

- [Learn CSS](https://web.dev/learn/css/)