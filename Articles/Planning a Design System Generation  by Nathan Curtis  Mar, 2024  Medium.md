---
タグ: []
作成日時: 2024-03-10T14:06:00
URL: https://medium.com/@nathanacurtis/planning-a-design-system-generation-ce4120393557
Tags: [topic/デザインシステム/戦略・ガバナンス]
---
Top highlight

# Planning a Design System Generation

## How to approach a cycle sweeping change across a library

![](https://miro.medium.com/v2/resize:fill:44:44/1*dHlxssasdBxNPbItO2d2Yw.jpeg)

[Nathan Curtis](https://medium.com/@nathanacurtis)

·

[Follow](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fsubscribe%2Fuser%2F799c7c7840a&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40nathanacurtis%2Fplanning-a-design-system-generation-ce4120393557&user=Nathan%20Curtis&userId=799c7c7840a)

9 min read

·

Mar 2, 2024

![](https://miro.medium.com/v2/resize:fit:5936/1*aFkTtxKcVYkE08XbU43McA.png)

*#2 of 5 of the series Design Systems Generations:*[Defining](https://medium.com/@nathanacurtis/design-system-generations-65f99960dc3d) | **Planning** | Naming |Adopting | Retiring

Changing the entire library is a daunting challenge. It takes months of work. Sometimes, over a year. Updates and refactors ripple across a catalog of complicated, interdependent features. Waves of tasks and reviews wash across disciplines and stakeholders. Brave early adopters crave access to anything as fast as possible to get work done. You burst ahead. Then backtrack and refactor as you learn. The scale of work is immense.

Design system leaders and managers, don’t fret. A well-devised plan can guide work across phases, deliver it gradually and communicate clearly at key milestones along the way.

This post describes a high-level approach to steward a design system’s library through a significant, generational change. Once demos and planning enable an organization to commit to a **strategy**, work on the **implementation** can progress across phases to deliver the library. Along the way, you can apply **tactics** to assign, group, and order the work. Once complete, **launch** the library while taking the previous generation through **deprecation** and **end-of-life** activities.

Life cycle of a design system generation, bridged by key milestones

![](https://miro.medium.com/v2/resize:fit:1000/1*t07BxRG-sRAbr_1bmMgf4Q.png)

# The Strategy Phase

Whether triggered by external needs or system-driven pursuits, a strategic phase can shift from discovery into agreements across concurrent tracks to explore directions, align stakeholders, and plan an implementation.

## Common activities

- **Discovering** needs through gathering requirements, interviewing stakeholders, and auditing existing systems and backlog(s).
- **Exploring** potential future(s), whether evolving a visual language and/or coding proof(s)-of-concepts via technical spikes.
- **Planning** who will make what, how, and by when.
- **Aligning** stakeholders with explorations and plans to generate awareness and foster agreement.

## Defining done

A strategy phase is done when all stakeholders align and commit to the plan (the “Commit”) to implement what’s been explored and demo’ed.

A strategy phase’s explorations can cascade into implementation. If the latter starts before the former ends, that’s fine. The planner’s focus should be on confident commitments and a clear path forward.

# The Implementation Phase

The implementation phase produces the complete library and always progresses over multiple phases that end with meaningful milestones.

Over the years, I’ve settled on progressing through two periods:

- **Alpha**(s), where a few features (`Color`, `Typography`,`Icon`, `Button`, …) evolve sufficiently to demonstrate how features will be built.
- **Beta**(s), where enough features are built at sufficient quality and stability to permit production use by interested and willing adopters.

Separating an implementation phase into two main periods: Alpha and Beta

![](https://miro.medium.com/v2/resize:fit:1000/1*feyAgY-p3gk6h597WXuJrQ.png)

## Common activities

- Regular progress demos, particularly influential community members.
- Regular status meetings to monitor doneness of features and outputs
- Per-milestone [communications](https://medium.com/eightshapes-llc/design-system-communications-ca679ffc36d3) to show progress, generate excitement
- Pilots and testing cycles to validate approach, changes and migration
- Revisiting and refactoring completed portions based on what you learn
- Pre-launch teaser and expectation-setting communications

## Defining done

The library “goes beta” when enough components are available at sufficient, production level quality that early adopters can use them with confidence. Implementation overall is complete when the library exits beta and launches as generally available.

# Implementation Tactics

## Augment main milestones with incremental delivery

The larger the scale of work, the longer it takes. As a result, break work down into milestones to communicate at key moments and incrementally deliver otherwise.

In recent years, the simplest “redesign” implementation I’ve led included an alpha release followed by three betas, roughly by month, before launch.

Further breaking Alpha or Beta periods into incremental deliveries of more and more features.

![](https://miro.medium.com/v2/resize:fit:1000/1*MolMCeUDxLaBELoyVKkTqQ.png)

More often, a “redesign” cycle lasts nine to twelve months to deliver, with more alpha and beta moments to incrementally deliver the work.

Longer implementation cycle with more Alpha and Beta phase milestones

![](https://miro.medium.com/v2/resize:fit:1000/1*HsXEjJ_Lx4I7u7HxLunqHw.png)

Consider important moments across milestones. For example, one output (such as a documentation site) could emerge visible to all adopters for the first time later than other outputs (such as a published Figma library and Storybook docs).

Distinguishing moments when major outputs (Storybook, Figma Library, Doc Site) first become available to early adopters

![](https://miro.medium.com/v2/resize:fit:1000/1*V8w6vZWu_z95l3h3FK9mNw.png)

## Use dependencies to order the work

A complete generation of a library can include anywhere from 10 or 15 to upwards of 100+ components. How do you decide how to sequence the work? Certainly, you don’t start at A and end at Z.

Library features, ordered alphabetically prior to more intentional sequencing and grouping

![](https://miro.medium.com/v2/resize:fit:1000/1*J4bpsi-rDyZ4WkK0P5CB1A.png)

In general, a component library is made or remade from small to large. It’s difficult to consider larger things complete if the smaller things they depend on are incomplete. Therefore, mapping the tree of a library’s [dependencies](https://medium.com/eightshapes-llc/dealing-with-dependencies-inside-design-systems-aa6ce2cf7bc3) directly informs how you order the work.

Library features, arranged as a dependency tree

![](https://miro.medium.com/v2/resize:fit:1000/1*J4YfeRmIrRWBacW0FwTlKw.png)

Simple components like `Breadcrumb` and `Tabs` have no dependencies. You can do those whenever. `List Group` ? That’s another story. It depends on `Checkbox` (if you have checkable items), which depends on `Form label` which depends on `Tooltip` (in a few systems I work on) which depends on `Icon`. Many paths trace back to `Icon`, so tackle that in the first batch.

Increasingly complicated dependency tree

![](https://miro.medium.com/v2/resize:fit:1000/1*9DFvtwg04dP4barIt4VakQ.png)

Large libraries, particularly those with [subcomponents](https://medium.com/eightshapes-llc/subcomponents-753ce9f6600a), result in dependency tree maps that are complicated, difficult to create and annoying to maintain. Therefore, treat it less formally. Until you automate such diagrams, avoid perfecting and maintaining it. Instead, capture these relationships into a tool better equipped for it, like a spreadsheet or task management tool like Jira or Asana.

## Group and assign based on dependencies and shared attributes

Don’t let the tree diagram deceive you. Arrange features and groups to respect dependencies while prioritizing and grouping effectively. For example, `Button` is needed early, resolving `Text input` opens the door to finish other form components, and `Breadcrumbs` are both isolated in layouts and a low priority. Order batches accordingly.

Features organized by batches, often aligned with releases

![](https://miro.medium.com/v2/resize:fit:1000/1*UYWKSXVsjJ4NDK7gbIrdbg.png)

However, features are made by people. Distribute and assign across staff while respect dependencies, grouping components with similar attributes and aligning assignments with their interests.

Batched features assigned to distinct designers

![](https://miro.medium.com/v2/resize:fit:1000/1*dpN565lmkS1VRvO1BeaiCA.png)

In the revised example, designer 1 is clearly the “forms designer.” Early yet complicated considerations on `Tooltip` give way to doing `Label` and `Error` to deliver `Text input` and finishing batches of “selectables” (`Checkbox`, `Radio button` and `Toggle`) and other stuff.

Designer 2 focuses on `Icon` and `Button`, throws in “easy” components like `List unordered` and `Breadcrumb` along the way, and is responsible to deliver what can be a behemoth `List group` later. Notice the limited number dependency connectors between assignees, minimizing the risk of one blocking the other.

Feature assignments are now roughly equally distributed by effort, clearly divide work across teammates, and respect the flow of dependencies. Assuming both deliver as expected, that is 😉.

## Increase feature quality, quantity and stability at different rates

As implementing a full generation of a design system progresses, component quantity, quality and stability increase across phases differently.

Quality, stability and quantity increasing across phases

![](https://miro.medium.com/v2/resize:fit:1000/1*pJiUjsAK1AmGBddlYsl9xg.png)

Such enable you to frame the alpha, beta and GA moments of a cycle:

> The alpha release includes a few unstable features that, while of unproven quality, sufficiently demonstrate how things work.
> The first beta release includes **many** increasingly **stable** features built at **sufficient quality** for production use.
> 
> The “GA” release includes **every** feature, completely **stable** at highest **quality**.

Feature **quality **starts high and stays high. System practitioners tend to consider architectural precision, usability, accessibility, performance and within library consistency as nonnegotiable. I love that about them. Yet, defects occur. Missed details need correcting. Perfection can become the enemy of progress. Quality compromises matter less for an alpha, but they will impact adopters delivering production work. So set expectations that quality need not be perfect early on, and that OK. Instead, focus on a vital inflection point: beta. Once the library is available for beta, early adopters must trust quality is good enough for production work.

The **quantity **of completed features resembles an “S curve” over time, accelerating gradually before flattening as launch approaches. An alpha need only include a few components. Then, the team churns out more and more, faster and faster. However, as launch approaches, perceived production can slow because:

- Focus shifts from making things to testing and documenting things
- Later components can be larger and more complicated
- Feedback necessitates revisiting things already considered complete

Each feature visual and API **stability **increases over the course of implementation. Yet, reversals happen. As you make more, expect to revisit things already presumed done based on what you learn. A commitment to a stable API need only be ironclad by launch. Some choices, like a component’s name should be stable as it’s introduced. On the other hand, property API, layout and visual detailing should be allowed to shift. During the cycle, a system team needs space to zoom out, compare and evaluate patterns and normalize them across features.

Each organization will define their own definition for how complete, stable and good a system is in each phase. Regardless, by the time you’re done, adopters need a generation that’s complete, stable and well made.

## Report on work using a doneness matrix

Once work is scoped, planned and underway, the most concrete single visual I’ve used to summarize progress is a [doneness matrix](https://medium.com/@nathanacurtis/doneness-matrices-c7f0a026365f). The primary structure is [top level tasks and/or outputs](https://medium.com/eightshapes-llc/design-system-subtasks-by-step-2f43d7d4bce0) as columns, features as rows grouped by type (Foundations, Components, Patterns) and ordered by release milestones (Alpha, Beta 1, Beta 2…).

Abstract depiction of a doneness matrix

![](https://miro.medium.com/v2/resize:fit:1000/1*7vtS2m_WHZ1wIoHdpbASSQ.png)

Unfortunately, it’s difficult automate producing this matrix in task management tools like Jira or Asana (although creating custom fields as columns in a release board can go a long way). Otherwise, it becomes a manual process to update a table maintained in Figma, Confluence or a presentation slide.

# Launch and General availability (“GA”)

The formal launch. This “It’s done and ready for everyone!” moment is reinforced by heavy communications and can be followed by a brief if intense “warranty” period. Don’t dismiss how much adopters expect a system team to train them, help solve problems, and fix things.

## Common activities

- Launch email, Slack and other notifications
- Live demos tailored to broad and diverse audiences
- Celebration(s) with parties for the system team and friends
- Training deep dives focused on migration and new capabilities
- Shifting system team capacity temporarily to favor *more *of support and consulting over *less* of “delivering the next component(s)”
- Taking a breath, calming the nerves, and letting the team recharge as plans for the next things shape up.

## Defining done

A launch period ends when design system practices settle back into “business as usual” (BAU). Incremental work enhances what’s there, offers new things, and breaks smaller things slowly as needs require.

But, for most, periods of smaller, incremental change doesn’t last forever. Another generation shows up on the horizon, and…

Periods of generational change are the biggest, most momentous moments in the life of a design system. By planning and communicating how you’ll progress across phases of strategy, implementation and ultimately end-of-life, you set expectations and enable your partners to plan accordingly. Best to you and your team as you prepare for that next, big moment!

Next: **#3. Naming a generation**