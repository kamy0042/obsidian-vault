---
title: "Why Your Color Tokens Must Describe Purpose, Not Just Appearance"
source: "https://medium.com/@SaraMontero/why-your-color-tokens-must-describe-purpose-not-just-appearance-d419e5a05904"
author:
  - "[[Sara Montero]]"
published: 2026-08-30
created: 2026-09-13
description: "More"
tags:
  - "topic/デザインシステム/デザイントークン"
  - "topic/デザインシステム/運用・浸透"
  - "clippings"
---
We spent years naming our colors after their hex codes. Here is why that decision is silently destroying your design system.

I still remember the exact moment I realized our design system was built on a fragile illusion.

It was a late Thursday evening in a cramped conference room in Chicago. The heating system was rattling loudly. The whiteboard was covered in a chaotic mess of sticky notes. Across the table sat the lead engineer and the head of product. We were three weeks away from launching a highly anticipated dark mode for our core financial platform.

The design team had spent four months perfecting the dark theme. We had updated every single component in our Figma library. The new dark backgrounds were rich and deep. The text colors were perfectly calibrated for low-light readability. We were incredibly proud of the work.

The lead engineer rubbed his temples and looked at the spreadsheet on his laptop. He let out a long, heavy sigh. He told us that to implement the dark theme, his team had to manually override thousands of hardcoded color values across four different code repositories.

He explained that because our color tokens were named purely by their appearance, like `blue-500` or `gray-200`, there was no semantic meaning attached to them. The primary button used `blue-500`. But so did the selected state of a checkbox. And so did the link text in the footer. And so did the background of a promotional banner.

When we switched to dark mode, we could not just swap `blue-500` for a lighter blue. Because `blue-500` was doing the job of four completely different UI elements, changing its value would break the promotional banner and the footer links. The engineers had to write complex, highly specific conditional logic to figure out which `blue-500` was which, just to apply the correct dark mode equivalent.

He estimated it would take his team three months of full-time work just to untangle the color logic.

The head of product looked at me and asked if there was any way to automate it. I had to look him in the eye and tell him the truth. There was no automation. We had named our colors by what they looked like, not by what they did. And now, we were paying the price.

Looking back, that conversation was the most painful and valuable lesson of my career. We had spent months obsessing over the visual harmony of our palette. We had created a beautiful, mathematically perfect gradient of blues and grays. But we had completely ignored the underlying architecture of how those colors were actually used.

What surprised me most during that ordeal was realizing that this was not just a technical failure. It was a fundamental misunderstanding of what a design system actually is. We thought a color system was just a digital paint palette. In reality, a color system is a language. And we were speaking a language that only made sense to the person holding the brush, not to the people trying to read the message.

That painful three-month delay taught me everything I needed to know about semantic color tokens. I realized that naming colors by their appearance is a relic of the print design era. In the digital product world, colors are not just decorative. They are functional. They convey state, hierarchy, and intent.

Over the past several years, I have completely restructured how my teams approach color systems. We have moved away from appearance-based naming and embraced a purpose-driven philosophy. We have watched our development velocity skyrocket. We have watched our ability to launch new themes go from months to days.

Here is what I have learned about the hidden mechanics of color tokens, why they must describe purpose rather than appearance, and how you can implement them to transform your product development process.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*oPhmxmk2E-WMn4zL5MLU6A.jpeg)

The True Foundation. Components are just the visible output. Purpose-driven color tokens are the resilient, scalable architecture that holds the entire system together.

## The Comfort of the Literal Palette

To understand why teams fall into the trap of appearance-based color tokens, we have to look at the psychology of the design process. We have to understand the deep, visual comfort of the literal palette.

When you open a design tool like Figma, the color styles panel is a thing of beauty. It presents a perfectly ordered, mathematically precise gradient of hues. You see a smooth transition from `blue-50` to `blue-900`. You see the exact hex codes. You see the opacity variations. It feels organized. It feels controlled. It feels like you have a complete set of tools at your disposal.

This visual order creates a powerful illusion. It creates the assumption that because the palette is visually harmonious, it is logically sound. It creates the belief that if you just pick the right shade from the gradient, the design will automatically be correct.

I noticed this psychological trap early in my career when I was leading the design for a complex data analytics dashboard. We had spent weeks perfecting our color scale. We had a beautiful array of grays, from `gray-100` for subtle backgrounds to `gray-900` for primary text.

One day, a junior designer was tasked with creating a new card component to display user metrics. She needed a border color to separate the card from the background. She opened the color panel and started scrolling through the grays.

She tried `gray-200`. It felt too light. It did not provide enough contrast. She tried `gray-400`. It felt too dark. It made the card look heavy and oppressive. She spent forty-five minutes just toggling between `gray-300` and a custom hex code that was slightly darker than `gray-300` but lighter than `gray-400`.

She was entirely focused on the visual weight of the border. She was treating the border as a decorative element, a literal line that needed to look aesthetically pleasing in isolation.

What she was missing was the context. The purpose of the border was not to be a beautiful line. The purpose of the border was to establish a subtle visual hierarchy, to separate the card from the background without drawing unnecessary attention to itself.

If we had been using semantic tokens, she would not have been scrolling through a gradient of grays. She would have simply selected `color-border-subtle`. The token would have automatically resolved to the exact hex code needed for that specific context, in that specific theme. She would have spent two seconds, not forty-five minutes.

Most people assume that appearance-based tokens give designers more creative freedom. They believe that having a literal palette allows designers to make nuanced visual decisions.

This is a dangerous misunderstanding of how cognitive load works in design.

When you use appearance-based tokens, you are forcing the designer to act as a translator. They have to look at the component, understand its purpose, look at the palette, find the color that visually matches that purpose, and then apply it. They have to hold the semantic intent in their working memory while they search for the visual equivalent.

This translation layer creates massive cognitive friction. It leads to decision fatigue. It leads to inconsistencies, because different designers will make different visual judgments about which shade of gray is “subtle” enough for a border.

Looking back, I realize that the literal palette is a comfort mechanism for the designer, not a utility for the product. It satisfies our desire for visual control, but it completely ignores the functional reality of the interface.

One lesson I did not expect to learn was how deeply attached designers become to their hex codes. There is a psychological ownership that develops when you pick a specific shade. When you tell a designer they can no longer use `blue-500` and must use `color-action-primary` instead, they often feel like they are losing their creative agency. They feel like they are being forced to paint by numbers.

But true creative agency in product design does not come from picking the perfect hex code. It comes from solving the user’s problem elegantly. When you remove the burden of color selection from the designer, you free up their cognitive resources to focus on layout, interaction, and information architecture.

The practical takeaway here is to recognize the literal palette for what it is. It is a raw material, not a finished tool.

Stop treating your color styles panel as a menu of finished decisions. Start treating it as a box of raw ingredients. You do not serve raw flour to a customer. You bake it into a cake. Similarly, you do not serve `blue-500` to a user. You bake it into a primary action button.

When you shift your mindset from visual selection to functional application, the comfort of the literal palette fades away. It is replaced by the efficiency and clarity of a purpose-driven system.

## The Linguistics of Design and the Power of Intent

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vWnnR6Nyhe83pGNjMNpCYg.jpeg)

The Linguistics of Design. Semantic tokens are not just naming conventions. They are behavioral constraints that encode design rules directly into the vocabulary of the system.

Once you accept that the literal palette is a trap, you have to confront the actual mechanism that replaces it. You have to understand the linguistics of design.

Language is not just a way to describe reality. Language shapes how we perceive reality. This is a concept known in linguistics as linguistic relativity. The words we use influence the thoughts we have and the decisions we make.

This principle applies directly to design systems. The names we give our tokens dictate how those tokens are used.

When you name a token `blue-500`, you are describing a physical property. You are telling the user of the design system exactly what the color looks like. But you are not telling them what the color means. You are not giving them any guidance on how it should be used.

When you name a token `color-action-destructive`, you are describing an intent. You are telling the user of the design system exactly what the color is meant to achieve. You are embedding a behavioral constraint directly into the name.

I experienced the profound impact of this linguistic shift when we were redesigning a healthcare management application. The existing system was a disaster of visual inconsistency.

The previous design team had used a vibrant red, `red-600`, for a variety of different purposes. They used it for critical system errors. They used it for required form field indicators. They used it for the "Delete" button. And, most problematically, they used it for the badge indicating a patient's critical allergy status.

Because the token was named `red-600`, there was no semantic distinction between these different use cases. To the design team, it was just the "red" from their palette.

But to the nurses and doctors using the application, this created a massive psychological problem. The color red triggers a biological threat response. It signals danger, stop, and critical attention.

When a doctor saw a red badge for an allergy, their brain registered a critical, life-threatening alert. When they saw a red asterisk next to a standard text field for a patient’s middle name, their brain registered the exact same level of threat.

This created a phenomenon known as alert fatigue. Because the red color was being used for trivial things like required fields, the users subconsciously started to tune it out. When a genuine, life-threatening allergy alert appeared, it was visually indistinguishable from a missing middle name. The linguistic ambiguity of the color token had directly compromised patient safety.

We completely overhauled the color system. We stripped away the appearance-based names and built a semantic architecture.

We created `color-feedback-critical` for life-threatening alerts and system-breaking errors. We created `color-input-required` for mandatory form fields. We created `color-action-destructive` for irreversible actions like deleting a record.

Even if all three of these tokens resolved to the exact same hex code in the light theme, the linguistic distinction was critical.

When a designer needed to indicate a required field, they would reach for `color-input-required`. The name itself would act as a cognitive guardrail. It would remind them that this is a standard form requirement, not a critical system alert. It would prevent them from accidentally using the critical error color for a trivial task.

What surprised me most during this transition was how much the naming convention influenced the engineering team as well.

When an engineer saw a CSS class named `.text-red-600`, they just applied it. When they saw a class named `.text-color-feedback-critical`, they paused. They understood the gravity of that class. They knew that if they used it incorrectly, they could cause user panic. The semantic name enforced a level of discipline that the literal name completely failed to achieve.

Most people assume that semantic tokens are just a naming convention. They think it is a cosmetic change to make the design system sound more professional.

This is a fundamental misunderstanding of how semantic tokens function. Semantic tokens are behavioral constraints. They are a way of encoding design rules directly into the vocabulary of the system. They force every person who touches the codebase to think about the purpose of the color, not just its appearance.

The practical takeaway is to audit your token names for intent.

Look at your current color tokens. Are they named after their visual properties? Are they called `blue-500`, `gray-200`, or `accent-orange`?

If they are, you are missing out on the most powerful tool in your design system. You are relying on the designer’s memory and discipline to use the colors correctly, rather than building that discipline into the system itself.

Start renaming your tokens based on their function. Group them by category. Create tokens for actions, surfaces, text, borders, and feedback.

When you change the language of your design system, you change the behavior of your team. You stop relying on visual guesswork, and you start building a system that actively guides your team toward the right decisions.

## The Technical Reality and the Cost of Refactoring

We have discussed the psychological comfort of the literal palette and the linguistic power of semantic naming. Now we have to talk about the hard, unforgiving reality of the codebase.

Design systems do not exist in a vacuum. They exist in a complex, multi-platform, ever-evolving technical ecosystem. And in that ecosystem, the cost of a bad color architecture is measured in thousands of engineering hours and millions of dollars.

I call this the Technical Debt of Appearance. It is the hidden, compounding cost of using literal color tokens in a production environment.

To understand this cost, we have to look at how modern web and mobile applications are built. They are built with component libraries. They are built with CSS variables, or Swift constants, or Kotlin resources. They are built to be dynamic, responsive, and adaptable.

When you use appearance-based tokens, you are fundamentally fighting against the architecture of modern frontend development. You are treating dynamic, state-driven code as if it were a static, printed page.

I learned the true financial impact of this technical debt when I was consulting for a large media and entertainment company. They had a massive, complex streaming application that ran on the web, iOS, and Android.

The business had just acquired a smaller competitor. The executives decided that the best way to integrate the new product was to white-label it. They wanted to launch a version of the streaming app that used the competitor’s brand identity.

The competitor had a very distinct visual identity. Their primary brand color was a vibrant, neon green. Their background colors were slightly warmer. Their text colors had a different contrast ratio.

The executives estimated that creating this white-label version would take two months. They assumed the design team could just update the Figma file, and the engineering team could just swap out the brand colors in the code.

They were completely wrong.

Because the original design system was built entirely on appearance-based tokens, the primary brand color was hardcoded as `green-500`. But `green-500` was not just used for the primary brand button. It was used for the success state of a video upload. It was used for the active state of a navigation tab. It was used for the progress bar on a video player.

When the engineering team tried to swap `green-500` to the competitor's neon green, the entire application broke. The success states looked like the primary brand. The navigation tabs looked like a neon sign. The progress bar became unreadable.

The engineers could not just change the token value. They had to go into every single component, identify which instances of `green-500` were actually brand colors, and manually reassign them to a new, specific token. They had to do this across three different platforms, in three different programming languages.

The project took eight months. It cost over two million dollars in engineering time.

Looking back, the tragedy of this situation was that it was entirely preventable. If the original design system had used semantic tokens, the white-label project would have taken two weeks.

If the primary button used `color-brand-primary`, and the success state used `color-feedback-success`, the engineers could have just updated the mapping for `color-brand-primary` in the new theme. The success state would have remained untouched. The system would have adapted seamlessly.

What surprised me most during this project was realizing that the design team had no idea their color choices had caused this disaster. They were sitting in their Figma files, happily picking shades of green, completely unaware that they were creating a massive technical bottleneck for the future.

This is the fundamental disconnect between design and engineering. Designers view color as a visual medium. Engineers view color as a state variable. When those two mental models do not align, the business pays the price.

Most people assume that technical debt is just about messy code or slow databases. They do not realize that design decisions are a massive source of technical debt. A poorly named color token is just as dangerous as a poorly written database query. It will slow you down, it will break under pressure, and it will cost you a fortune to fix.

The practical takeaway is to understand the technical implications of your design decisions.

You do not need to know how to write production code, but you do need to understand how your design system is implemented. You need to understand how CSS variables work. You need to understand how theming engines operate. You need to understand that every time you hardcode a visual property, you are creating a fragile point of failure.

When you build your color system, build it with the end of the pipeline in mind. Build it so that the engineers can consume it easily, safely, and efficiently.

When you align your design tokens with the technical reality of the codebase, you stop creating debt. You start creating leverage. You transform your design system from a fragile artifact into a robust, scalable engine for the business.

## The Three-Tier Architecture of Color

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uD_MrRDg16O3QZqKWEQx9Q.jpeg)

The Three-Tier Architecture. Scalable design systems require a strict hierarchy. Global primitives feed semantic aliases, which in turn feed specific components.

So how do you actually build a color system that avoids the literal palette, leverages semantic intent, and satisfies the technical requirements of the codebase?

You cannot just throw a bunch of semantic names into a list and call it a day. You need a strict, hierarchical architecture. You need a system that separates the raw materials from the finished decisions.

Over the years, I have found that the only way to achieve true scalability is the Three-Tier Color Architecture. This model divides your color tokens into three distinct, strictly governed categories: Global, Alias, and Component.

The first tier is the Global tier. These are also known as primitive tokens.

Global tokens are the raw, foundational values of your design system. They are the absolute basics. They include your core color palette, your opacity scales, and your raw hex codes.

Global tokens are named purely by their visual properties. They have no semantic meaning. They do not know how they are going to be used.

For example, a global color token would be named `color-blue-500`. A global opacity token would be named `opacity-50`.

The most important rule of the Global tier is this: you never use global tokens directly in your components. They are just the raw materials. They are the paint on the palette. You do not paint a picture directly from the tube. You mix the paint first.

The second tier is the Alias tier. These are also known as semantic tokens.

Alias tokens assign meaning and intent to the global tokens. They translate the raw visual properties into specific use cases. This is where the linguistic power we discussed earlier actually lives.

For example, an alias token would be named `color-action-primary`. In the light theme, this alias token would reference the global token `color-blue-500`. In the dark theme, it might reference `color-blue-300`. In a high-contrast theme, it might reference `color-yellow-400`.

Alias tokens are the most important tier in your system. This is where the actual design decisions live. This is where you define how your brand behaves in different contexts. When you build your components, you only use alias tokens. You never reference the global tokens directly.

The third tier is the Component tier. These are highly specific tokens used for edge cases within individual components.

Most of the time, alias tokens are sufficient. But sometimes, a specific component needs a unique value that does not fit into the general alias structure.

For example, a specific type of promotional banner might need a unique background color that is not used anywhere else in the product. You would create a component token named `color-banner-promotional-background`.

Component tokens should reference alias tokens whenever possible. They should only reference global tokens if absolutely necessary.

I experienced the power of this three-tier architecture when we were tasked with implementing a comprehensive theming engine for a global enterprise software suite.

The product had to support a light theme, a dark theme, a high-contrast accessibility theme, and three different white-label brand themes.

In the past, this would have been an engineering nightmare. We would have had to write thousands of conditional statements to handle the different color variations.

But because we had implemented the three-tier architecture, the process was incredibly elegant.

The Global tier remained exactly the same across all themes. We just defined the raw hex codes for each brand.

The Alias tier was where the magic happened. For each theme, we created a new mapping file. We mapped `color-action-primary` to the correct global blue for the light theme, a lighter blue for the dark theme, and a bright yellow for the high-contrast theme.

The Component tier did not change at all. The buttons, the cards, and the inputs were still referencing `color-action-primary`. They did not care what hex code that resolved to. They just knew their purpose.

When we ran the build process, the system automatically generated the correct CSS variables for every single theme. The engineers did not have to write a single line of conditional logic. The architecture handled it all.

Looking back, what changed for me was realizing that the Alias tier is not just a naming convention. It is a translation layer. It is the bridge between the static world of design and the dynamic world of code.

Most people assume that theming requires complex logic in the components. They think you need to write code that says, “If the theme is dark, use this color, else use that color.”

This is a fundamental misunderstanding of how tokens work. If your components are strictly referencing alias tokens, theming is just a matter of swapping out the alias map at the root of the application. The components remain completely agnostic to the theme.

The practical takeaway is to strictly enforce the three-tier architecture in your design system.

Audit your current tokens. Identify your raw, primitive values and move them to the Global tier. Create a new layer of semantic Alias tokens that reference the Global tokens. Update your components to only use the Alias tokens.

Create a governance rule that forbids the use of Global tokens in components. If a designer or engineer tries to use `blue-500` in a button, the system should flag it as an error.

When you implement this hierarchy, you create a system that is incredibly flexible. You can change the entire visual identity of your product by only modifying the Alias mapping. You can support multiple themes, dark mode, and high-contrast accessibility modes without ever touching your component code.

You stop fighting with a chaotic list of variables, and you start managing a structured, scalable architecture.

## The Human Element and the Cultural Shift

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*U6rRvaAUni49xVmfkjHmjQ.jpeg)

The Adoption Gap. The best token architecture will fail if it is difficult to use. True scalability requires reducing friction and making the right way the easy way.

We have covered the psychology of the literal palette, the linguistics of intent, the technical reality of the codebase, and the architecture of the three tiers. Now we have to confront the hardest part of implementing a purpose-driven color system.

The human element.

You can build the most elegant, perfectly structured three-tier color architecture in the world. You can write beautiful documentation. You can create automated build pipelines.

But if your designers and developers do not actually use the semantic tokens, the system is worthless.

I call this the Adoption Gap. It is the space between the theoretical perfection of your design system and the messy, pragmatic reality of how people actually work.

Adopting semantic color tokens requires a fundamental shift in behavior for both designers and developers. And human beings are notoriously resistant to changing their habits.

Designers love the freedom of the canvas. They love being able to pick any color from the wheel, any font size from the dropdown, and any spacing value from the grid. Semantic tokens restrict that freedom. Semantic tokens force designers to choose from a predefined set of functional options.

Developers love the speed of hardcoding. When they are in the flow of building a component, stopping to look up the correct semantic token name feels like a massive interruption. It feels like bureaucracy.

I experienced the friction of adoption firsthand when we rolled out our new semantic color system to a team of fifty engineers and twenty designers.

We had spent months building the perfect three-tier architecture. We had generated all the CSS variables. We had updated the Figma library. We held a massive training session to explain the difference between Global, Alias, and Component tokens.

We assumed that because the system was better, the team would naturally adopt it.

We were wrong.

A month later, I was reviewing the code for a new feature. I opened the CSS file and saw a sea of hardcoded hex codes and literal color names. The engineers had completely ignored the semantic tokens.

I pulled the lead designer aside and asked her why the Figma files were still using `blue-500` instead of `color-action-primary`. She looked exhausted. She explained that the semantic names were confusing. She could not remember if the primary background was `color-surface-default` or `color-background-base`. She explained that looking up the documentation took too long, and she just needed to get the feature shipped.

She also pointed out that the Figma library was not perfectly synced with the code. The token names in Figma were slightly different from the CSS variable names. This caused constant confusion and required mental translation between the two tools.

Looking back, I realized that we had made a classic design system mistake. We had designed the system for the system’s sake, not for the users of the system. We had prioritized architectural purity over user experience.

The engineers and designers were the users of our design system. And we had built a system that was difficult to use.

Something changed in my approach after that conversation. I realized that governance and education are just as important as the technical setup. If you want people to use semantic tokens, you have to make using semantic tokens the easiest possible path.

We completely overhauled our workflow.

First, we fixed the naming consistency. We ensured that the token names in Figma exactly matched the CSS variable names in the code. We eliminated the mental translation step.

Second, we built better tooling. We created a VS Code extension that provided autocomplete for the token names. We created a Figma plugin that automatically applied the correct token styles. We removed the friction of looking up the documentation.

Third, we changed our code review process. We made the use of hardcoded values a blocking issue in pull requests. If an engineer submitted code with a hardcoded hex code, the automated linter would flag it, and the pull request could not be merged until it was fixed.

We did not just ask them to use the tokens. We built an environment where using the tokens was the default, frictionless behavior.

Most people assume that adoption is just a training problem. They think that if they just write a really good guide and hold a really good workshop, the team will fall in line.

This is a naive view of organizational behavior. People do not change their behavior because they read a guide. They change their behavior because the new behavior is easier, faster, or required by their environment.

The practical takeaway is to treat your design system like a product, and your team like your users.

Conduct user research with your designers and developers. Ask them where the friction is. Ask them what slows them down. Ask them what confuses them.

Build tooling that reduces friction. Create autocomplete, create linters, create plugins. Make the right way the easy way.

Establish clear governance. Make the use of semantic tokens a non-negotiable standard in your code reviews and design critiques.

When you focus on the human experience of using the design system, you bridge the adoption gap. You transform your tokens from a theoretical concept into a living, breathing part of your daily workflow.

You stop fighting against the natural resistance to change, and you start building a culture that naturally embraces consistency and scale.

## Conclusion

I think about that late Thursday evening in the cramped Chicago conference room a lot. I think about the lead engineer rubbing his temples, staring at the spreadsheet of thousands of hardcoded color values. I think about the realization that our beautiful, mathematically perfect palette was entirely useless for the task at hand.

That moment of failure was the catalyst for everything I have learned about design systems since.

For a long time, I viewed color systems as a visual exercise. I thought the goal was to create a beautiful, harmonious gradient of hues. I thought that if the blues looked right, and the grays looked right, the system was successful.

But looking back, I realize that visual harmony is just the surface level. True consistency lives in the underlying architecture. It lives in the shared decisions that govern how the product is built.

Color tokens are the physical manifestation of those decisions. They are the bridge between the abstract intent of the designer and the concrete reality of the code.

When you name your colors by their appearance, you are building a fragile illusion. You are creating a system that looks scalable, but collapses the moment the business needs to change. You are forcing your team to pay the cost of inconsistency every single day, in wasted time, in frustrated engineers, and in delayed releases.

But when you name your colors by their purpose, you change the fundamental economics of your product. You create a system that is resilient, flexible, and truly scalable. You empower your team to pivot quickly, to support multiple themes, and to adapt to new platforms without starting from scratch.

The transition to a purpose-driven color system is not easy. It requires a shift in mindset. It requires designers to think in terms of intent rather than appearance. It requires developers to embrace abstraction over hardcoding. It requires leadership to invest in the foundation before building the roof.

But the reward is profound.

When your semantic tokens are in place, the noise of product development fades away. The endless debates about hex codes and pixel values disappear. The manual, tedious work of re-theming and updating styles is automated.

Your team stops fighting with the codebase and starts focusing on the actual problems your users are facing. You stop building a new product every time the brand changes, and you start evolving a single, cohesive experience.

We spend so much time in this industry chasing the next big visual trend. We obsess over micro-interactions, glassmorphism, and complex animations. We chase the aesthetic novelty.

But the true mastery of product design lies in the invisible elements. It lies in the systems, the structures, and the tokens that make the visible elements possible.

The next time you sit down to build a new component, do not just think about how it looks. Think about how it is built. Think about the values that define it. Think about the tokens that govern it.

Because when you build on a foundation of purpose-driven tokens, you are not just building a better design system. You are building a better, faster, and more resilient product. And that is a foundation that will support your product for years to come.

What is the most significant friction point your team has faced when transitioning to a purpose-driven color token system, and how did you resolve it to improve adoption?