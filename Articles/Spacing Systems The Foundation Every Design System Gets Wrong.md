---
title: "Spacing Systems: The Foundation Every Design System Gets Wrong"
source: "https://www.designsystemscollective.com/spacing-systems-the-foundation-every-design-system-gets-wrong-f0ec3b1feaba"
author:
  - "[[Roberto Moreno Celta]]"
published: 2025-09-15
created: 2026-04-20
description: "Spacing Systems: The Foundation Every Design System Gets Wrong Your components look perfect in Figma but chaotic in production, here’s the spacing framework that fixes it. Every design system …"
Tags: [topic/デザインシステム/デザイントークン]
---
## [Design Systems Collective](https://www.designsystemscollective.com/?source=post_page---publication_nav-dbd299f90c1d-f0ec3b1feaba---------------------------------------)

[![Design Systems Collective](https://miro.medium.com/v2/resize:fill:76:76/1*KfuDI5s2VksG_8pWv0nCFA.jpeg)](https://www.designsystemscollective.com/?source=post_page---post_publication_sidebar-dbd299f90c1d-f0ec3b1feaba---------------------------------------)

A welcoming community for designers and developers passionate about scalable, consistent design. Explore articles, insights, and resources to build and refine your design systems. Join us to connect, learn, and shape the future of systematic design together.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*TngBhmip8dwNUNYU)

Photo by Ramin Khatibi on Unsplash

Your components look perfect in Figma but chaotic in production, here’s the spacing framework that fixes it.

Every design system tutorial starts with colors and typography. But there’s a more fundamental layer that most teams get wrong: spacing. Poor spacing systems are why your beautiful Figma components look messy when developers implement them, why responsive layouts break unpredictably, and why adding new features destroys your visual consistency.

The problem isn’t that designers don’t understand spacing, it’s that most spacing systems are built backwards, focusing on individual components instead of relationships between them.

## Why Most Spacing Systems Fail

## The Component-First Trap

**Traditional approach**: Define padding and margins for each component individually.

**Why it fails**: Components don’t exist in isolation. They exist in layouts, next to other components, in different contexts.

**The result**: Components that look great alone but create visual chaos when combined.

## Mathematical vs Optical Spacing

**Mathematical spacing**: Everything uses multiples of 8px because it’s clean and systematic.

**Optical spacing**: Adjusting mathematical spacing based on how elements actually look together.

**Reality check**: Mathematical perfection often creates visual imbalance. Different content types need different spatial relationships.

## Static vs Responsive Thinking

Most spacing systems are designed for desktop and then awkwardly adapted for mobile. But spacing needs change dramatically across screen sizes, not just proportionally, but structurally.

## Mathematical vs Optical Spacing Approaches

## When Mathematical Systems Work

**Good for**:

- Layout grids and containers
- Consistent component internal spacing
- Developer implementation (easier to remember and apply)
- Maintaining rhythm across large pages

**Common mathematical progressions**:

- Linear: 4, 8, 12, 16, 20, 24px
- Exponential: 4, 8, 16, 32, 64px
- Modular scale: 4, 6, 9, 14, 21, 32px

## When Optical Adjustment is Essential

**Typography spacing**: Line-height calculations that look optically balanced

**Icon alignment**: Mathematical center vs optical center for visual balance

**Mixed content**: When text, images, and UI elements need to feel harmonious

**Brand elements**: Logos and decorative elements that don’t follow system rules

## Hybrid Approach: Systematic with Optical Overrides

Start with mathematical spacing as your foundation, then create documented exceptions for optical balance.

css

```hs
/* Base mathematical system */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
/* Optical adjustments for specific contexts */
--space-text-below-heading: 12px; /* Optically tighter than mathematical 16px */
--space-icon-text: 6px; /* Slightly less than base 8px for visual balance */
```

## Component Relationship Mapping

## Understanding Spacing Context

Components need different spacing depending on their relationships:

**Sibling relationships**: How components relate when placed side by side

**Parent-child relationships**: How nested components affect each other

**Content relationships**: How spacing changes based on content type and length

## The Relationship Matrix

Create a spacing matrix that defines relationships between component types:

```hs
&]:odd:bg-bg-500/10">Component AComponent BDesktop SpacingMobile SpacingContext Notes&]:odd:bg-bg-500/10">HeadingParagraph12px8pxTighter for reading flow&]:odd:bg-bg-500/10">ButtonButton16px12pxAction spacing&]:odd:bg-bg-500/10">CardCard24px16pxContainer separation
```

## Contextual Spacing Tokens

Instead of fixed spacing values, create tokens that adapt to context:

css

```hs
/* Context-aware spacing */
--spacing-related-content: clamp(8px, 2vw, 16px);
--spacing-unrelated-content: clamp(16px, 4vw, 32px);
--spacing-section-break: clamp(32px, 8vw, 64px);
```

## Responsive Spacing That Actually Works

## Beyond Proportional Scaling

**Common mistake**: Making all spacing proportionally smaller on mobile.

**Better approach**: Understanding that spatial relationships change on different screen sizes.

## Content-Density Considerations

**Desktop**: More white space creates sophistication and reduces cognitive load

**Mobile**: Tighter spacing maximizes content visibility in limited space

**Tablet**: Hybrid approach that balances content density with touch interaction needs

## Breakpoint-Specific Spacing Strategy

css

```hs
/* Mobile-first spacing that adapts contextually */
.content-section {
  --section-spacing: 24px;
  
  @media (min-width: 768px) {
    --section-spacing: 40px;
  }
  
  @media (min-width: 1024px) {
    --section-spacing: 64px;
  }
}
```

## Touch-Target Considerations

Mobile spacing isn’t just about visual density, it’s about interaction design.

**Minimum touch targets**: 44px for interactive elements **Touch spacing**: 8px minimum between tappable elements **Scroll spacing**: More generous vertical spacing for thumb-scroll ergonomics

## Scaling Spacing Decisions Across Teams

## Documentation That Developers Actually Follow

**Bad documentation**: “Use 16px spacing between related elements”

**Good documentation**: “Use space-related for elements that serve the same user goal”

## Semantic Spacing Tokens

Create tokens based on purpose, not just size:

css

```hs
/* Size-based tokens (bad) */
--space-small: 8px;
--space-medium: 16px;
--space-large: 24px;
/* Purpose-based tokens (good) */
--space-component-internal: 16px;
--space-related-elements: 12px;
--space-section-break: 32px;
--space-page-margin: clamp(16px, 5vw, 80px);
```

## Design System Integration

Your spacing system should integrate with your other design tokens:

**Typography**: Baseline grids that align with spacing units

**Grid systems**: Column gaps that work with spacing tokens

**Component sizing**: Heights and widths that create harmonic proportions

## Building Flexible Spacing Tokens

## The Token Hierarchy

**Level 1: Primitive tokens →** Raw values (4px, 8px, 16px)

**Level 2: Semantic tokens →** Purpose-based ( — space-related, — space-unrelated)

**Level 3: Component tokens →** Context-specific ( — button-internal-spacing)

## Responsive Token Strategy

css

```hs
/* Fluid spacing using CSS custom properties */
:root {
  --space-unit: clamp(4px, 1vw, 8px);
  --space-sm: calc(var(--space-unit) * 1);
  --space-md: calc(var(--space-unit) * 2);
  --space-lg: calc(var(--space-unit) * 4);
  --space-xl: calc(var(--space-unit) * 8);
}
```

## Dark Mode Spacing Considerations

Spacing can feel different in dark vs light interfaces:

**Light mode**: Sharper contrast allows for tighter spacing **Dark mode**: Softer contrast often needs slightly more breathing room **Implementation**: Use CSS custom properties to adjust spacing based on color scheme

css

```hs
[data-theme="dark"] {
  --space-text-spacing: calc(var(--space-text-spacing) * 1.1);
}
```

## Real Examples of Spacing Systems

## Tailwind CSS Approach

**Strengths**:

- Consistent mathematical progression
- Easy to learn and implement
- Good for rapid prototyping

**Weaknesses**:

- Lacks semantic meaning
- Doesn’t account for optical spacing needs
- Can create overly rigid designs

## Material Design Spacing

**Strengths**:

- Based on 8px grid system
- Considers touch interaction needs
- Provides responsive guidelines

**Weaknesses**:

- Can feel mechanical and uniform
- Limited flexibility for brand expression
- Dense on mobile devices

## Custom Semantic Systems

**Example**: Shopify’s Polaris design system

css

```hs
/* Shopify's semantic spacing approach */
--space-tight: 4px;        /* For cramped layouts */
--space-base-tight: 8px;   /* Default tight spacing */
--space-base: 16px;        /* Default spacing */
--space-loose: 24px;       /* Generous spacing */
--space-extra-loose: 32px; /* Very generous spacing */
```

## Spacing Audit Framework

## Component Isolation Test

Test your spacing system by:

1. **Place components in isolation →** Do they look balanced?
2. **Combine different components →** Do spacing relationships feel consistent?
3. **Test with varying content lengths →** Does spacing adapt appropriately?
4. **Check responsive behavior →** Do spatial relationships make sense across breakpoints?

## Cross-Team Consistency Check

**Designer perspective**: Does the spacing feel visually balanced? **Developer perspective**: Is the spacing system easy to implement consistently? **Content perspective**: Does spacing work with real content, not just placeholder text?

## User Experience Validation

**Scanning patterns**: Does spacing support natural reading and scanning behavior? **Touch interaction**: Is spacing appropriate for finger navigation? **Accessibility**: Do spacing choices support users with motor or vision difficulties?

## Implementation Strategies

## CSS Custom Properties for Flexibility

css

```hs
/* Flexible spacing system using CSS custom properties */
.component {
  /* Base spacing */
  --internal-spacing: var(--space-md);
  --external-spacing: var(--space-lg);
  
  /* Context modifiers */
  padding: var(--internal-spacing);
  margin-bottom: var(--external-spacing);
}
/* Contextual overrides */
.component--tight {
  --internal-spacing: var(--space-sm);
  --external-spacing: var(--space-md);
}
```

## Design Tool Integration

**Figma**: Create spacing styles that match your CSS tokens **Sketch**: Use shared spacing symbols across team libraries **Adobe XD**: Set up spacing guides that reflect your token system

## Developer Handoff Best Practices

**Spacing specifications**:

- Document the purpose behind spacing choices
- Provide code snippets for common spacing patterns
- Include responsive behavior guidelines
- Show examples of spacing token usage

## Common Spacing System Mistakes

## 1\. Too Many Spacing Options

**Problem**: Creating 20+ spacing values that developers can’t remember **Solution**: Limit to 5–7 core spacing values with clear semantic meaning

## 2\. Ignoring Content Context

**Problem**: Using the same spacing regardless of content type **Solution**: Adjust spacing based on content density and user scanning patterns

## 3\. Forgetting Interaction States

**Problem**: Not considering how spacing affects hover, focus, and active states **Solution**: Define spacing behavior for all interactive states

## 4\. Static Thinking for Dynamic Content

**Problem**: Designing spacing for fixed content that works poorly with dynamic content **Solution**: Test spacing with varying content lengths and user-generated content

## The Bottom Line

Spacing is the invisible foundation that makes everything else in your design system work. Get it wrong, and even perfect components will feel chaotic when combined. Get it right, and your entire product feels cohesive and professional.

Start with user behavior and content relationships, not mathematical perfection. Create semantic tokens that describe purpose, not just size. Test your spacing system with real content and real users across different devices and contexts.

Remember: the best spacing system is the one that teams actually use consistently. Build for adoption, not just aesthetic perfection.

Your spacing decisions should disappear into the background, creating effortless user experiences where content and functionality take center stage. That’s when you know your spacing system is working.