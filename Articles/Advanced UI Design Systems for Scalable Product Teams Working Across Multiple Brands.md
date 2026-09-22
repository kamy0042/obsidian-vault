---
title: "Advanced UI Design Systems for Scalable Product Teams Working Across Multiple Brands"
source: "https://medium.com/design-bootcamp/advanced-ui-design-systems-for-scalable-product-teams-working-across-multiple-brands-029807324043"
author:
  - "[[Akio]]"
published: 2026-07-03
created: 2026-07-26
description: "Moving beyond basic color swaps to build design architectures that scale across distinct brand identities without breaking teams."
tags:
  - topic/デザインシステム/戦略・ガバナンス
  - topic/デザインシステム/デザイントークン
---
## Moving beyond basic color swaps to build design architectures that scale across distinct brand identities without breaking teams.

A few years ago I sat in a room with a newly formed design leadership team. The parent company had just acquired three distinct startups. One was a legacy enterprise software tool, one was a consumer facing mobile app, and one was a developer API platform. The VP of Design looked at the room and said we need one unified design system to rule them all so we can move fast. I knew in that moment they were heading toward a cliff. Six months later, the central design system team was burnt out, the acquired teams had forked the system, and visual consistency was worse than before the acquisition. The problem was not a lack of effort. The problem was a fundamental misunderstanding of what a design system is supposed to do when you scale across multiple brands.

Most people think managing multiple brands in a design system just means swapping colors. You set up a few variables, change the primary brand color from blue to red, and call it a day. This is the great theming illusion. It works fine for static marketing pages. It falls apart completely when you try to apply it to complex, stateful product interfaces.

The misunderstanding starts with how designers view a design system. Junior designers think a design system is a collection of components. Senior designers know it is a collection of decisions. When you operate across multiple brands, you are not just translating visual aesthetics. You are translating interaction models, density preferences, and brand personalities. A consumer facing app wants big touch targets, lots of whitespace, and forgiving error states. An enterprise data tool needs dense information architecture, keyboard navigation, and complex filtering. If you build a system optimized for the consumer app and force the enterprise tool to use it, the enterprise tool will fail. If you build a system for the enterprise tool and give it to the consumer app, the consumer app will feel clunky and dated.

The team I was working with tried to force all three acquired products into a single component library. The central design ops team spent months building the perfect button, the perfect modal, the perfect input field. They tried to make it abstract enough to serve the consumer app, the enterprise tool, and the developer platform. The result was a set of components so heavily laden with configuration props that they became impossible to use. A designer had to pass fifteen different variables just to drop a button on the screen. The engineers hated it because the bundle size was massive. The designers hated it because the components were too rigid to express the unique brand personalities. The unified system became a straightjacket.

The practical lesson here is that uniformity is not the same as consistency. When you scale across multiple brands, your goal should not be to make everything look identical. Your goal should be to create systemic coherence. The products should feel like they belong to the same corporate family, but they should not feel like they are wearing the same clothes.

To achieve this, you have to stop thinking about a single design system and start thinking about a design architecture. You have to decouple the structural logic from the visual identity. You have to build a system of systems.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*p_oVPXB8ROxJp7M8mLGQmw.jpeg)

Image by: Nano Banana 2

## The Three Layer Architecture

When I rebuilt the system for that acquired company, I divided it into three distinct layers. This architecture allows multiple brands to share foundational logic without stepping on each other visual and interaction preferences. I call it the Three Layer Architecture.

i. The Core Engine

ii. The Brand Skin

iii. The Product Context

Let us walk through how each layer functions and why this separation is the only way to scale multiple brands without losing your mind.

The first layer is the Core Engine. This is the foundational layer of the system. It contains no visual styling whatsoever. It is pure logic, structure, and accessibility. The Core Engine defines the spacing scale, the grid system, the z-index mapping, the base motion curves, and the accessibility heuristics. It defines the structural anatomy of a component without defining its appearance. For example, the Core Engine says a modal has a container, a header, a body, a footer, and a close button. It dictates the focus trap logic. It dictates the escape key behavior. It does not dictate the border radius, the background color, or the typography.

The Core Engine is owned by a central design ops team. This team is small, highly technical, and focused on the long term stability of the platform. They do not care if Brand A wants blue buttons and Brand B wants green buttons. They only care that the button is accessible, that it uses the correct spacing grid, and that it handles focus states correctly across the ecosystem.

The second layer is the Brand Skin. This is where the visual identity lives. Each brand gets its own Brand Skin. The Brand Skin consumes the Core Engine and applies visual styles to it. It defines the color palette, the typography stack, the iconography style, the border radii, and the shadow depths.

When Brand A needs a modal, it takes the modal anatomy from the Core Engine and applies its Brand Skin. The modal gets Brand A specific colors, fonts, and spacing adjustments within the constraints of the Core Engine scale. Brand B takes the exact same Core Engine modal anatomy and applies its own skin.

The Brand Skin is owned by the individual brand design teams. They have autonomy over their visual identity. They can make their brand feel playful or serious or dense or airy, as long as they operate within the structural constraints of the Core Engine. This gives the brand teams a sense of ownership while preventing structural drift.

The third layer is the Product Context. This is where specific, complex product features live. Not everything belongs in a shared design system. A highly specific data visualization tool for the enterprise product does not belong in the Core Engine. It only serves one brand. The Product Context layer is where brand teams build complex, task specific components using their Brand Skin and the Core Engine.

This layer prevents the Core Engine from becoming bloated with one off components. If a product team needs a highly specific date picker with a fiscal calendar overlay, they build it in their Product Context layer. They do not push it to the central system. The central system only gets components that are needed by three or more brands. This keeps the core lean and allows product teams to move fast on unique features.

This Three Layer Architecture solves the political and technical problems of multiple brand systems. The central team maintains quality and structure. The brand teams maintain identity and product specificity.

## Design Tokens as the Nervous System

The Three Layer Architecture fails completely without a robust design token strategy. Design tokens are the nervous system that connects these layers. If you are managing multiple brands, tokens are the most critical part of your job.

Most teams start with primitive tokens. They define blue 500, red 500, gray 100. This is fine, but it does not scale across brands. When you hardcode a component to use blue 500, you cannot easily re skin it for a brand that uses green.

To scale multiple brands, you must use semantic alias tokens. Semantic tokens assign meaning to a color rather than a visual value. Instead of blue 500, you use color action default. Instead of gray 100, you use color background subtle.

When Brand A defines its skin, it maps color action default to blue 500. When Brand B defines its skin, it maps color action default to green 500. The component in the Core Engine is built using color action default. It never knows what the actual color value is. It only knows its semantic purpose. When the brand skin is applied, the correct color is injected.

This requires extreme discipline in naming. I once audited a multi brand system that had fallen into chaos. The original team had named tokens based on the parent company brand. They had tokens like brand blue primary and brand blue secondary. When they acquired a company whose brand was red, they created tokens called brand red primary. The components were hardcoded to use brand blue primary. To reskin the app for the red brand, engineers had to manually find and replace every instance of brand blue primary with brand red primary. It took months and introduced hundreds of bugs.

Naming tokens semantically prevents this disaster. You must abstract the token name away from the visual reality. This is hard for designers to grasp initially. They want to see the color in the name. But semantic naming is the only way to achieve true multi brand theming.

The token architecture must also handle component level states. A button has a default state, a hover state, a focus state, a disabled state, and an active state. Each of these states needs a semantic token.

color action defaultcolor action hovercolor action activecolor action disabledcolor action focus outline

Brand A might say the default state is solid blue and the hover state is a darker blue. Brand B might say the default state is a green outline and the hover state is a solid green. The component logic in the Core Engine handles the state changes, but the visual output is entirely controlled by the token mapping in the Brand Skin.

This token strategy extends beyond color. It applies to typography, spacing, motion, and depth. You define semantic spacing tokens like spacing layout medium or spacing component tight. Brand A might map spacing layout medium to 24 pixels. Brand B, which is a dense enterprise tool, might map spacing layout medium to 16 pixels. The Core Engine components use spacing layout medium. They automatically render tighter or looser depending on the brand skin applied.

Building this token architecture is tedious, unglamorous work. It involves creating massive JSON files and rigorous documentation. But it is the technical foundation that makes multiple brand systems possible. Without it, you are just copying and pasting code, and eventually the weight of the duplication will collapse your engineering velocity.

## Governance in a Multi Brand World

The technical architecture is only half the battle. The other half is governance. Who owns what? Who decides what goes into the Core Engine? How do you handle requests for changes? If you do not establish a clear governance model, the multi brand system will devolve into territorial warfare.

A centralized team that tries to own everything becomes a bottleneck. Product teams submit feature requests and wait months for the central team to build them. Eventually, the product teams give up and build their own custom components, fragmenting the system entirely.

On the other extreme, a completely federated model where everyone contributes to the core leads to chaos. Every brand team has different opinions on how a component should work. The core becomes a mishmash of competing ideas.

The solution is a federated governance model with a strong central core. The central team acts as the maintainer of the Core Engine. They set the standards, review contributions, and ensure quality. But the actual work of building and extending the system is distributed among the brand teams.

I use a contribution framework. If a brand team needs a new component in the Core Engine, they do not just submit a request and wait. They build the component themselves, following the Core Engine standards. They submit a pull request to the central team. The central team reviews the submission for accessibility, token usage, and structural logic. If it passes, the central team merges it into the Core Engine.

This model requires the central team to act more like open source maintainers than traditional designers. They are not designing the components. They are curating the ecosystem. Brad Frost wrote extensively about this approach in his work on design system governance. He pointed out that treating the design system like a product with its own roadmap, users, and contributors is the key to scaling. When you apply this to multiple brands, the contributors are your brand teams. The central team is the platform team.

This governance model requires a formal Request for Comments process. When a brand team wants to introduce a new pattern or change an existing core component, they write a brief proposal. They explain the problem, the proposed solution, and the impact on other brands. This proposal is reviewed by representatives from all the brand teams.

This prevents silent breakages. If Brand A wants to add a prop to the modal component that changes the focus trap behavior, Brand C needs to know about it. The RFC process forces these conversations to happen in the open. It builds a shared understanding of the system across the entire organization.

The central team also conducts regular audits. They look at the Product Context layers of the various brands. They are not looking to police visual consistency. They are looking for opportunities to promote patterns up the stack. If they notice Brand B and Brand C have both built custom fiscal calendar date pickers in their Product Context layers, the central team intervenes. They suggest standardizing the component and promoting it to the Core Engine. This proactive curation keeps the system evolving based on real product needs rather than hypothetical assumptions.

## The Cultural Politics of Acquisitions and System Integration

When you are building a design system across multiple brands, you are rarely starting from scratch. Usually, you are dealing with the aftermath of an acquisition. The parent company has its own design language. The acquired company has its own design language. And usually, the acquired company users are fiercely loyal to the brand they know.

This creates intense cultural politics. The parent company design team often views the acquired company design as inferior or noncompliant. They want to assimilate the acquired product into the parent design system immediately. The acquired company design team feels defensive. They know their users. They know their brand. They do not want to lose their identity in a corporate merger.

I lived through this at a large enterprise software company. We acquired a beloved, design forward consumer app. The parent company design system was dense, gray, and utilitarian. The acquired app was colorful, playful, and heavily animated. The parent design leadership wanted to migrate the acquired app onto the parent design system. They argued it would save engineering time and create brand synergy.

I pushed back hard. I knew that forcing a consumer facing app to adopt an enterprise visual language would destroy the user experience. The users of the consumer app did not want to feel like they were using enterprise software. They would churn.

We negotiated a compromise using the Three Layer Architecture. The acquired app would adopt the parent company Core Engine. They would use our spacing scale, our accessibility logic, and our grid system. This satisfied the engineering and structural requirements. But they kept their own Brand Skin. They kept their colors, their typography, and their animations.

The migration was smooth. The engineering teams benefited from the shared structural logic. The design team maintained their brand identity. The users never noticed a disruption. In fact, the app became slightly more stable because it inherited the robust accessibility and state management logic from the Core Engine.

The lesson here is that design system integration after an acquisition requires immense empathy and political savvy. You cannot just dictate compliance. You have to find the intersection of structural integrity and brand autonomy. You have to respect the acquired brand relationship with its users. Visual consistency is not worth losing user trust.

Sometimes, you have to let an acquired brand remain completely independent. If the brand serves a fundamentally different market and user base, forcing integration does more harm than good. I have advised companies to simply let acquired products run their own design systems entirely, accepting the technical redundancy as a cost of preserving market fit. The decision to integrate should be based on user overlap and engineering efficiency, not on a corporate desire for visual homogenization.

## Content Design and Brand Voice in Shared Systems

A design system is not just visual. It is verbal. Most multi brand design systems fail to account for content design. They focus on components and tokens, but they ignore the words inside the components.

A B2B enterprise tool needs formal, precise copy. A consumer app needs casual, friendly copy. If you build a shared component library with hardcoded text, you cannot reuse it across multiple brands.

Consider a simple empty state component. The structure is a title, a body, and an action button. The enterprise brand might need the empty state to say No records found. Click here to create a new record. The consumer brand might need it to say Nothing here yet. Tap to add your first item.

If the component hardcodes the enterprise copy, the consumer brand team cannot use it. They have to build a custom component just to change the text. This fragments the system immediately.

The solution is to separate content architecture from brand voice. The Core Engine defines the content structure. It defines that an empty state has a title, a body, and an action. It defines the intent of the copy. The intent is to inform the user the list is empty and provide a path to add an item.

The Brand Skin layer provides the voice. It maps the specific copy strings to the structural intent. The Core Engine component accepts the copy as variables. When Brand A renders the empty state, it passes the enterprise voice strings. When Brand B renders it, it passes the consumer voice strings.

This requires tight collaboration between design and content design. The content design team needs to be involved in the creation of the Core Engine components. They define the content slots and the intent of each slot. They create a content taxonomy that maps across brands.

This is incredibly difficult to scale. It requires a mature content design practice, which many organizations lack. But if you ignore content in your multi brand system, you will end up with a visually consistent product that sounds schizophrenic. The words matter as much as the pixels.

## Tooling Realities in Figma and Code

Theoretical architecture is nice. Implementing it in real tools is a nightmare. The tools we use for design and development were largely built for single brand systems. Applying them to multi brand architectures requires workarounds and extreme discipline.

Let us talk about Figma first. Figma introduction of variables was a massive step forward for multi brand systems. It finally allowed us to apply the token architecture visually. But it is still limited.

To implement the Three Layer Architecture in Figma, you have to be meticulous about file structure. You need a Core Engine library file. This file contains the structural components, unstyled or styled with generic core tokens. It contains the base variables for spacing, grid, and motion.

Then you need a Brand Skin library file for each brand. These files contain the semantic tokens mapped to specific values. They consume the Core Engine components and apply the brand specific styles.

The problem in Figma is component state management and variant explosion. If you try to build a button component that handles every brand variation, every size, every state, and every intent, you end up with a variant matrix of hundreds of cells. Figma slows down. Designers get confused.

The solution is to use Figma component properties and variables strategically. You minimize the variants. You use boolean properties to toggle states. You use variable modes to handle brand theming.

But even with these tools, the handoff to engineering is fraught. Engineers need to know how the Figma variable maps to the CSS variable in the codebase. If the naming conventions do not match perfectly between Figma and code, the system breaks down. Designers apply a token in Figma, and the engineer writes custom CSS because they cannot find the matching token in the code repository.

The Figma architecture must mirror the code architecture exactly. If you have a core tokens file in Figma, you must have a core tokens file in the codebase. If you change a token name in Figma, you must change it in code. This requires a sync process. Many teams use tools like Style Dictionary or Supernova to automate this translation from Figma to code.

If you do not automate the token sync, maintaining a multi brand system across design and code becomes a full time manual data entry job. It is unsustainable. The tooling investment is a prerequisite for success. You have to budget for design ops engineering just as you budget for product engineering.

The technical reality of managing this in code is also complex. In a React environment, you might have a core component library published as an npm package. The brand teams install this package. They apply their theme provider, which injects the brand specific CSS variables.

The challenge is versioning. If the core team publishes a breaking change to the modal component, every brand team has to upgrade. In a monorepo, this might be automated. In a distributed repo setup, it is a nightmare. Brand teams delay upgrades. The ecosystem fragments. The core team ends up supporting five different versions of the same component.

To solve this, you need strict semantic versioning and a deprecation policy. The core team cannot just ship breaking changes. They must ship deprecation warnings, provide migration guides, and give brand teams time to upgrade. The central design ops team must track adoption metrics. They must know exactly which version of the core engine each brand is using.

I have seen multi brand systems fail not because the design was bad, but because the engineering tooling and versioning strategy was ignored. The design system is a software product. It needs release management, continuous integration, and automated testing. If you treat it like a design file, it will never scale.

## When to Fork and When to Merge

In a multi brand ecosystem, you are constantly faced with a decision. A brand team needs a modification to a core component. Do you modify the core component to accommodate them? Do you tell them to build a custom component in their Product Context? Or do you let them fork the core component entirely?

This is the most common operational friction point. If you modify the core component every time a brand asks for a change, the component becomes bloated with configuration props. It tries to be everything to everyone and fails. If you force every brand to build custom components for their specific needs, you lose the efficiency benefits of the shared system.

I use a decision framework for this.

First, evaluate the structural necessity. Does the brand team need the component to behave differently at a structural level? For example, do they need the modal to close on outside click while the core engine standard is to require an explicit close action? If it is a structural behavior change, evaluate if it should be a core configuration option. If the behavior change benefits the system broadly, add it as a prop in the Core Engine. If it is highly specific to one brand, tell them to build a wrapper component in their Product Context.

Second, evaluate the visual necessity. Does the brand team need a visual modification that cannot be achieved through the token architecture? For example, do they need a completely different border radius on a card component? If the token architecture allows them to override the radius token, let them do it in their Brand Skin. If the component structure hardcodes the radius, refactor the core component to use tokens.

Third, evaluate the frequency of the request. Is this a one off need, or are multiple brands asking for similar variations? I use the rule of three. If one brand asks for a variation, they build it in their Product Context. If two brands ask for it, I note it and watch it. If three brands ask for it, I promote the variation into the Core Engine as a standard option.

Forking a core component entirely is the last resort. Forking means a brand team copies the core component code and maintains their own version. This breaks the system. The forked component will not receive core updates. It will drift. It will accumulate technical debt.

I only allow forking when a brand has fundamentally incompatible technical constraints. For example, if one brand is building a real time trading platform that requires sub 50 millisecond render times, they might not be able to use the core component library because it is too heavy. In that case, they fork. But they must accept the maintenance burden. The central team will not support their fork.

Merging is the opposite of forking. It is the process of taking a pattern from a Brand Skin or Product Context and promoting it up the stack. Merging is how the core system grows organically. The central team should actively look for merging opportunities. If a brand team builds an excellent data table pattern in their Product Context, the central team should work with them to abstract it and merge it into the Core Engine.

This creates a virtuous cycle. Brand teams contribute back to the core. The core becomes more useful. The brand teams rely more on the core. The system becomes healthier over time.

## Measuring System Health Across Brands

How do you know if your multi brand design system is actually working? You cannot just look at Figma usage stats. You have to measure the health of the system across the entire organization.

The most common metric is adoption rate. What percentage of product screens are using core components? This is a useful baseline, but it can be misleading. A brand team might import the core button component but override 90 percent of its styles locally. Adoption looks high, but system health is low.

I track three main categories of metrics.

The first is structural adoption. This measures how much of the core engine is being used without local overrides. I look at the ratio of core token usage to local custom styles in the codebase. If a brand team is using the core components but writing custom CSS to override the colors and spacing, the system is failing to provide the right level of abstraction. High structural adoption means teams are using the system as intended, applying their brand skin via tokens rather than fighting the components.

The second is contribution velocity. How quickly are bugs being fixed and features being added to the core engine? This measures the responsiveness of the central team. If brand teams submit pull requests and wait six months for review, they will stop contributing. Contribution velocity must be high enough to keep the ecosystem engaged.

The third is time to market. This is the ultimate business metric. Does using the design system actually make product teams faster? I measure the time it takes a brand team to ship a new feature using the design system versus building it from scratch. If the design system adds friction and slows them down, it is failing its primary purpose.

These metrics must be visible to the entire organization. I build dashboards that show the health of each brand integration. This transparency creates gentle pressure. If Brand A has high structural adoption and Brand B has low structural adoption, leadership can ask why. Is Brand B dealing with legacy technical debt? Are the core components not flexible enough for their use case? The metrics drive the conversation.

Measuring system health also involves qualitative feedback. I conduct regular surveys of the designers and engineers using the system. I ask them what is working, what is broken, and what they hate. The qualitative feedback often reveals issues that the metrics miss. For example, engineers might be using the core components but complaining constantly about the documentation. The adoption metrics look fine, but the system is breeding resentment.

A multi brand design system is a living product. It needs constant evaluation and adjustment. The metrics tell you where to look. The conversations tell you what to fix.

## The Evolution of the System Lead Role

Building and maintaining a system of this complexity requires a specific type of leader. The traditional design system lead is a senior designer who understands components and Figma inside out. The multi brand system lead needs to be something entirely different.

This person is less of a designer and more of a product manager, politician, and systems architect. They have to manage the roadmap for the Core Engine. They have to negotiate between competing brand teams. They have to understand engineering constraints and token architectures. They have to present to executive leadership about the ROI of the design system.

I have seen brilliant designers fail in this role because they could not let go of the visual design. They spent their time tweaking button padding instead of building the governance and tooling infrastructure. The multi brand system lead has to accept that they will not design the final user interface. They design the system that enables other people to design the user interface.

This requires a massive mindset shift. You are no longer making products. You are making tools for makers. Your users are the designers and engineers in the brand teams. Your product is the design system.

When hiring for this role, I look for people who have experience in platform engineering or developer relations. I look for people who understand open source contribution models. I look for people who can write clear, empathetic documentation. The ability to push pixels is secondary. The ability to build consensus is primary.

The system lead also has to be a master communicator. They have to explain to the VP of Marketing why the acquired brand cannot be visually assimilated overnight. They have to explain to the engineering lead why investing in token infrastructure now will save three months of work next year. They have to explain to the brand design team why their custom component request was rejected in favor of a core standardization.

This role is exhausting. It requires immense patience and strategic thinking. But it is the most critical role in scaling a multi brand design system. Without the right leader, the architecture and the tooling will collapse under political pressure.

## Building for the Long Term

Scaling a design system across multiple brands is a multi year endeavor. It is not a project with a defined end date. It is an ongoing practice of balancing centralization with autonomy, structure with expression, and speed with consistency.

The temptation in these initiatives is to try and solve everything upfront. Teams spend a year building the perfect Core Engine before letting brand teams use it. This is a mistake. The Core Engine will never be perfect. It has to be built iteratively, informed by the real needs of the product teams.

Start small. Build the token architecture first. Get the naming conventions right. Build the most basic structural components. A button, an input, a modal. Migrate one small product flow from one brand onto the Core Engine. Learn from the friction. Adjust the architecture. Then expand.

Do not try to migrate all brands simultaneously. It will overwhelm the central team and paralyze the product teams. Migrate one brand at a time. Let each migration refine the system.

Accept that there will be drift. In a large organization, perfect consistency is a myth. There will always be edge cases where a brand team has to build something custom. There will always be legacy code that does not conform to the new system. The goal is not zero drift. The goal is controlled drift. You want the majority of the system to be standardized, leaving the brand teams energy to focus their creativity on the actual product experience, not on rebuilding basic infrastructure.

The ultimate promise of a multi brand design system is not just efficiency. It is coherence. When a user moves between your different brand products, even if they look different, they should feel the same underlying quality. They should feel the same attention to accessibility, the same structural stability, the same logical interaction patterns.

This systemic coherence builds corporate trust. It tells the user that no matter which door they enter, the house is built on a solid foundation. That is the real value of advanced UI design systems for scalable product teams. It is about building a foundation strong enough to support many different identities without breaking under the weight of corporate complexity.

The people who succeed in this work will not be the ones who draw the prettiest screens. They will be the ones who build the invisible structures that let thousands of people draw screens together. They will understand that in a multi brand world, the greatest design achievement is not a beautiful component. It is a system that allows a hundred different teams to build beautiful components without getting in each other’s way.