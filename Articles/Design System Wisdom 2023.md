---
タグ: []
作成日時: 2023-11-28T23:12:00
URL: https://cianfrani.dev/posts/design-system-wisdom-2023/
Tags: [topic/デザインシステム/運用・浸透]
---
![[placeholder-social.png]]

The following is a result of my three years as lead developer on the Astro UX Design System. These are not universal truths. These are lessons I [had to learn](https://github.com/merlinmann/wisdom/blob/master/wisdom.md). These are lessons that have stuck to the bottom of the pan, for better or for worse. Do not take these as gospel or endorsements—our design system is very unique and is likely very different than yours.

## The Prime Directive

- *Remember:* you are building something that users are forced to use. This is different than building something that users want to use.
- Be a thoughtful host: [The role of the designer is that of a very good, thoughtful host anticipating the needs of [their] guests.”](https://eamesfoundation.org/events/1563/) - Eames 
    - See: [Different Chairs](https://www.iwritewordsgood.com/apl/patterns/apl251.htm)
- Don’t weigh other design system’s decisions too heavily. You have no idea the constraints they were working under to arrive at their decisions.
- Adopt a [Sliding Scale of Giving a Fuck](https://capwatkins.com/blog/the-sliding-scale-of-giving-a-fuck) early to resolve designer/developer disputes. We bypassed so many needless discussions with this one simple trick.
- Everything that goes into the system must be maintained.
- Avoid using terms like “designer” and “developer” internally. At the end of the day, we’re all doing the same work just with different tools. Atlassian uses the term “maker” instead. Phrases like “design side” and “dev side” unintentionally divide camps.
- [Design assets are roadkill on the path to production experiences built in code that change constantly](https://medium.com/eightshapes-llc/testing-figma-components-a47fc978465f)

## Building

- Don’t build the wrong components / not everything needs to be a component. Do you really want to get into the business of building your own select menu or date picker?
- Your component library code is competing against dozens of open source projects with thousands of contributors.
- You probably don’t want to ever build your own data table component.
- Your component APIs should reflect your organization’s language. We have a `primary`, `secondary`, and `borderless` button. We tried calling it `tertiary` , but kept having to clarify for others.
- A tale of two box models: as an organization, decide on your box model. 
    - You have a 100x100 image. It has 5px of padding and a 2px border. What are the final dimensions? Hint: there are two answers.
    - How you talk about things is extremely important. Decide which one you’re using and write it down. Put it at the top of your page. Star, heart, and favorite it. Make sure everybody understands and is aligned on this decision.
    - If we’re drawing rectangles on screens, understanding (and aligning on) the box model is critical.
    - I forget this every 6 months.
- Prefer HTML and CSS.
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) have a lot of asterisks. [Shadow Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) aren’t a great developer experience.
- Component API design is all about dialing two imaginary knobs—one for flexibility, one for ease of use. A component that can do everything is too hard to use. A component that is too easy to use will need to be redesigned to accommodate other use cases.
- [Craft APIs Together](https://medium.com/eightshapes-llc/crafting-ui-component-api-together-81946d140371)
- A bad, clunky API decision is a papercut. Too many papercuts will destroy your system.
- Visual Regression Tests are worth gold. They cost almost nothing to write.

## Cultivating

- Regularly prune your system. When was the last time you removed a component?
- Once a year, as a team, ask and reinforce “why are we doing this?”
- Some useful metrics you can start collecting today include NPM weekly downloads, Github views/clones, google analytics. You can use NPM and Github’s APIs to collect this data daily for archival purposes and analysis. For example, is your design token package slowly getting more downloads than your React component library?
- Track the work you do on individual components. If you start to notice any one component is getting the majority of feature requests, it usually means the API isn’t flexible enough. Don’t be afraid to rewrite it.
- Everyone on the team needs to build something with the system every now and then.

## Naming

- Most things on the web have already been named. Default to [ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) . If your org uses another term a lot internally, use that.
- You don’t get any extra points for coming up with the perfect name.
- There is no perfect name.

## Documentation

- Documentation is more important than design assets or code.
- Model your documentation site after Severus Snape’s copy of *Advanced Potion Making*. Make it useful over formal. Much of the value comes from the margins and footnotes.
- [Diátaxis](https://diataxis.fr/how-to-use-diataxis/) is a good framework for thinking about documentation.
- Documentation Fridays - Documentation is never finished. Pick a day of the week and encourage team members to improve a piece of the documentation—a sentence, a paragraph, code examples, etc.
- Be careful using Storybook—it can create a divide between designer and developer documentation. Keep everything in one place.
- “Rules of thumb” are useless without including how you arrived at them. See [GOV.UK](https://design-system.service.gov.uk/components/button/) “Research on this component” sections for a good example of this in practice.
- There are few very absolutes. Guidance is guidance. Set the reader up to so that they can make informed decisions vs. mandating strict compliance.
- Organize documentation based on “building” and “using”. How to build a component is a different journey than how to use an already built component. This applies to both design and development.
- Your documentation should be good enough to train an AI.

## Design Tokens

- With design tokens, less is more.
- A few good semantic tokens can take you really far. With a solid design foundation, you won’t need to build every component.
- Component tokens are for people who don’t want to or can’t use your first party assets (Figma Library or code).
- Don’t attempt component tokens until you align on your component API. The process of fully tokenizing an existing component will likely expose cracks between your design and development implementations.
- Most design token discourse out there right now is incredibly over-engineered. Do what works for you today.

## Patterns

- Variation is not the enemy of design systems.

## Versioning

- Don’t move fast and break things. People do not care if you want to rename a component or API to be more consistent. They only care about the work they need to do to upgrade.
- Make upgrading painless. Invest in automated codemods, step by step migration guides.
- Nobody wants to upgrade unless they get something in return.
- Document your API contract. Explicitly define everything you consider to be a breaking change. When it comes to design systems, there is a lot of nuance. For example, is changing a color token value a breaking change? It might break someone’s contrast. Define these up front and be ruthless in adhering to them.