---
タグ: []
作成日時: 2023-03-07T23:50:00
URL: https://atlassian.design/foundations/design-tokens
Tags: [topic/デザインシステム/デザイントークン]
---
Design tokens are a single source of truth to name and store design decisions for Atlassian product experiences.

Design tokens are the new way to apply color, elevations, and other visual styles in Atlassian product experiences. Currently, we are rolling out design tokens for [color](https://atlassian.design/foundations/color-new/), opacity, and [elevation](https://atlassian.design/foundations/elevation/) across Atlassian.

## This is a preview of our new color and theming system, powered by design tokens

Expect frequent changes as we iterate over the coming months. For early access and release updates, [see our developer community announcement](https://community.developer.atlassian.com/t/introducing-design-tokens-new-colour-foundations-and-dark-mode/62258). For Atlassian employees, [see details](https://go.atlassian.com/tokens).

## What are design tokens?

Design tokens are name and value pairings that represent small, repeatable design decisions. Design tokens use meaningful names to represent visual styles, instead of hard-coded values.

For example, the green color for an icon on a success flag uses the design token `color.icon.success`, instead of a specific color value like `#36B27E` or `Green300`.

![[design-token-examples.png]]

## What are themes?

A theme is a collection of design tokens that are mapped to specific values in order to achieve a certain look or style. Light mode, dark mode, and white-labeling are all examples of themes.

Because design tokens are named based on context and meaning — not specific values — one token can represent multiple values. This allows one token to work across themes like dark mode and light mode.

![[token-to-themes.png]]

## Benefits of design tokens and themes

Theming with design tokens lets us make visual design changes at scale across products.

- **Intentional design decisions:** Rather than choosing one of many shades of blue, you’ll make a decision based on the intention behind a style. This ensures consistency across products.
- **Design in one theme, get the rest for free: **Our design tokens are mapped to values for light and dark themes. This means when you design with tokens in one theme, you can switch themes automatically with the right corresponding values.
- **Quick changes across the system:** If changes need to be made for accessibility or other reasons, they can be made quickly across all products, without finding and replacing hard-coded values.

![[dark-mode-light-mode.png]]

## How to read design token names

Knowing how to read token names will help you find tokens faster when applying color and elevation styles in designs and in code.

![[token-name-parts.png]]

A design token’s name describes how it should be used, and each part communicates one piece of its usage. Each part of a token name is separated by a period.

1. **Foundation:** The type of visual design attribute or foundational style. The current foundations available as tokens are color and elevation.
2. **Property:** The UI element the token is being applied to, such as a border, text, background, shadow, or other property.
3. **Modifier:** The rest of the name describes details about the token’s purpose, such as its color role, emphasis, interaction state, or elevation level. Not every token needs modifiers. For example, skeleton loaders only have two color token options: `color.skeleton` and `color.skeleton.subtle`.

## Using design tokens

Search the list of [all available tokens](https://atlassian.design/components/tokens/all-tokens) for full usage descriptions. If you can’t tell what a token is for based on its name, the token description can help you choose the right one.

![[do-icon-color-image.png]]

### Do

Use design tokens with names and descriptions that fit your specific situation.

![[dont-icon-color.png]]

### Don't

Don't use a token just because the colors appear to match. This can break the experience in other themes.

## Design token examples

Design tokens are a new way to think about color and other styles. Use these examples to get a better understanding of how tokens work.

Note that all Atlassian Design System components have tokens applied for you. You’ll only choose tokens for experiences using other components and elements. For components examples and code samples, see [components examples](https://atlassian.design/components/tokens/examples).

### Color token example

Here’s an example of color design tokens in use: the default text color and the background color for a "danger" button on hover.

There are dedicated color tokens for text, links, icons, backgrounds, borders, blanket, and skeleton loaders. For more on color design tokens, see our [color foundation](https://atlassian.design/foundations/color-new/).

![[color-token-example.png]]

### Elevation token example

Elevation tokens apply to the perceived surface level and shadow. For details on how and when to apply elevations, see our [elevation foundation](https://atlassian.design/foundations/elevation/).

![[elevation-token-image.png]]

### Opacity token example

Opacity tokens apply transparency to an element. Use `opacity.disabled` for interactive images that are disabled (such as disabled avatar), and `opacity.loading` to content sitting underneath a loading spinner.

![[elevation-token-image 1.png]]

## Related

- To learn more about token usage, read about the [color](https://atlassian.design/foundations/color-new/) and [elevation](https://atlassian.design/foundations/elevation/) foundations.
- See the list of [all design tokens](https://atlassian.design/components/tokens/all-tokens) for full descriptions and values for all tokens.