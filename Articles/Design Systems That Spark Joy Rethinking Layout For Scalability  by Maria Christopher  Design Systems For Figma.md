---
タグ: []
作成日時: 2025-07-14T16:24:00
URL: https://blog.designsystemsforfigma.com/design-systems-that-spark-joy-rethinking-layout-for-scalability-a0015dda4a7a
Tags: [topic/ツール/Figma, topic/デザイン/レイアウト, topic/デザインシステム/コンポーネント設計]
---
Illustration by [Lolita Calistru](https://dribbble.com/lolitaillustration) for this article

![](https://miro.medium.com/v2/resize:fit:3200/1*Y63T4xasaV3QpLoP9k1_fA.jpeg)

Working on [Uber’s design system Base](https://base.uber.com/6d2425e9f/p/294ab4-base-design-system), has allowed me to watch and contribute to its significant evolution over the past few years.

And I’ll be the first to tell you, it hasn’t been without its fair share of challenges and learnings.

# The challenge of growth

When we embarked on our journey with Base we were excited by the challenge of supporting diverse platforms — from Base Mobile to Base Web. Each platform came with its own set of native components and frameworks, and our ambitious goal was to unify them under a **single, seamless system**.

Base’s technology stack

![](https://miro.medium.com/v2/resize:fit:700/0*fsV9h-UI_N-taGgp)

## The problem with component overload

In the early days of our design system, our measure of success was the breadth of our component library. We took pride in the extensive catalog we managed, believing that a larger number of components was a sign of our system maturing. But as that number climbed to around **60-70 per platform**, we faced an unexpected problem.

Over time, we struggled with component redundancy and system inconsistency. The increasing complexity from the sheer amount of components, variants, and customizations began to undermine the effectiveness and integrity of our system.

It turns out, we weren’t alone. This mirrors a broader trend in the design industry, where the focus is shifting towards critically evaluating and simplifying systems, rather than just adding more layers of complexity.

![](https://miro.medium.com/v2/resize:fit:700/1*l8aP3uKNvSdy678ll4o4iQ.png)

# Rethinking our approach

As we entered the next phase of our design system and continued to scale, it became clear that to move forward, we needed a fresh perspective. We had to step back, reassess our approach, and find a way to balance flexibility with structure.

> A design system should aim to not only build but maintain high quality.

## Core principles for component development

We developed a set of principles to guide how we build and manage components, balancing design ideals with engineering realities:

- **Self-Containment:** Avoid strong opinions on components managed by other teams.
- **Code maintainability:** Steer clear of complex custom solutions to prevent increased support loads and risks on legacy frameworks.
- **Sustained adoption flow:** Build components only when confident in manageable migration costs and consistent use cases.
- **Balance system scale with health:** Avoid adding unnecessary complexity that could jeopardize codebase maintainability.

## Understanding composability

We learned that too much flexibility can turn a component into an overly complex framework that’s difficult to use. Our card component, for example, became unwieldy as we tried to accommodate too many variations. The key is to make components adaptable, but not so flexible that they become impractical.

This shift began with gaining a clearer understanding of composability and how to apply it across our design system.

High-utility components prioritize functionality, while information display components require more adaptability.

![](https://miro.medium.com/v2/resize:fit:700/1*F_JrCSGAvkOvvZvyMjYygQ.png)

## Defining customization methods

Handling content variations proved challenging, as we frequently introduced new variants based on feature team requests with limited oversight. To tackle this, we aligned on the usage of our three key methods: **variants**, **custom content slots**, and **overrides**.

**Variants** are valuable when consistent functionality is required across multiple contexts, though they can quickly become complicated.** Custom content slots** offer greater flexibility, making them ideal for components that need to evolve over time. Finally, **overrides** are reserved for special cases, helping us maintain stability by limiting excessive customization.

## System application

One of our biggest wins was applying these frameworks to what we call “not-so-distant cousin” components. For instance, List Item and Accordion, or Message Card and Card, were found to have minimal differences, mostly stylistic.

![](https://miro.medium.com/v2/resize:fit:700/0*ooLpb-YlW-DL6PGZ)

The turning point came when I discovered from our engineers that many of our input components, Text fields, Selects, Search fields, and more — had no shared code despite using a common base in Figma.

Existing inconsistencies between Text field and Select components

![](https://miro.medium.com/v2/resize:fit:700/1*MYPKilRfCgGb4w8umxmfAA.png)

# Embracing reusable layout modeling

The idea of reusable layout modeling emerged as a solution to this problem. By focusing on designing components with shared core properties and layout architecture, we could address component duplication and streamline our system.

At first, we hoped component-level tokens would address our challenges. While tokens effectively maintain stylistic consistency, such as matching error text colors or standardizing padding, they fell short in other crucial areas.

Tokens alone couldn’t manage the ordering of components or convey the nuances of our state map. They were useful for ensuring visual uniformity but didn’t address the underlying structural and functional complexities that were impacting our system’s efficiency.

![](https://miro.medium.com/v2/resize:fit:700/1*12V8CYzNsT58cl17chr4VQ.png)

## Implementing our first layout model

Implementing our initial layout model involved creating a framework that provided flexibility for content slots and accommodated complex indicator configurations.

This model was integrated into our component architecture to standardize shared properties while still allowing for essential customization.

**Designing the layout model**

We started by designing a broad component structure that includes a Label + Input container (which could be a Text field, Select, PIN Code, Search, Text area, etc.) + Hint text. This foundational structure needed to be versatile enough to accommodate various types of inputs.

Input variations

![](https://miro.medium.com/v2/resize:fit:700/0*nYMk8Fud3rG4tQqp)

Next, we concentrated on defining the architecture and logic for individual input types, such as Text Field and Select.

This process involved designing a comprehensive layout framework for enhancers and indicators, specifying their positions within each component. Additionally, we developed detailed state maps and hierarchical structures to ensure a clear and consistent organization of these elements.

Input container layout model

![](https://miro.medium.com/v2/resize:fit:700/0*bEhCSznUp0OzsTHF)

**Integrating the layout model**

With the foundational layout model in place, our next step was to implement it across our components. We began by defining a root class, which served as the core structure for all input components.

From this base, we developed a generic container class. This class acted as a wrapper that could house various types of input components, such as text fields, selects, or search fields. It was designed to be flexible, enabling us to swap in different content types and maintain a cohesive design across the system.

We then created specialized component classes, including Select Input, PIN Input, and Text Input. These classes extended the generic container to handle specific input types, like Select Input or Text Field, each with its unique set of properties and behaviors.

Input component structure

![](https://miro.medium.com/v2/resize:fit:700/1*W3zuAexac5wM2tkJ8rDJtg.png)

Thanks to our new approach, we were able to unlock some additional benefits:

- **Accelerated Development:** Consolidating code and reducing redundancies allowed us to speed up the creation of complex components like File Uploads and DateTime Selects, resulting in more efficient and polished implementations.
- **Streamlined Accessibility:** Our custom screen reader system now automatically supports similar components, reducing the need for manual adjustments and improving accessibility consistency.
- **Explored Microanimations:** With quicker development cycles, we were able to explore subtle enhancements that improve state comprehension and delight.

Shifting from a massive component catalog to focusing on intentional and scalable system architecture has made a real difference —we’ve streamlined our development process, cut down on maintenance, and boosted consistency across platforms.

Looking ahead, we’re focusing on refining the architecture on our most complex components. Our goal is to enhance both API usability and provide a clear, structured approach that minimizes inconsistencies and reduces varied interpretations.

> Ultimately, it’s about building something that not only works but grows with you — flexible enough to scale, yet structured to stay consistent.

My hope is that sharing our process helps other teams strike that same balance and inspires fresh ideas for your next design challenge.