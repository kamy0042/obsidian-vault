---
タグ: []
作成日時: 2023-03-07T19:06:00
URL: https://spectrum.adobe.com/page/design-tokens/#Design-token-types
Tags: [topic/デザインシステム/デザイントークン]
---
![[design-tokens_hero_desktop2x_4IewHrPB0vOPrmLcSgUAvg_1611634790959.png]]

![[design_tokens2x_1649708322885.png]]

The following types of design tokens are the building blocks and design decisions that make up the Spectrum design language:

### Global tokens

Global tokens are the primitive values in our design language, represented by context-agnostic names. Our color palette, animation, typography, and dimension values are all recorded as global tokens. These can be directly used, and are inherited by all other token types.

![[global_tokens2x_1649708387768.png]]

### Alias tokens

Alias tokens relate to a specific context or abstraction. Aliases help communicate the intended purpose of a token, and are effective when a value with a single intent will appear in multiple places.

![[alias_tokens2x_1649708387835.png]]

### Component-specific tokens

Component-specific tokens are an exhaustive representation of every value associated with a component. They often inherit from alias tokens, but are named in a way that allows engineering teams to be as specific as possible in applying tokens in component development.

![[component_tokens2x_1649708387911.png]]

## Global tokens

### Size tokens

Global size tokens are used for specifying dimensions and spacing for every Spectrum component. Since Spectrum supports two platform scales, token values automatically adjust between scales, allowing for a single token to be used for each.

Size tokens are anchored around a base value. Each token’s number represents a percentage relative to the base value. For example, size-100 is 100% of the base value, size-400 is 400%, and so on.

![[size-tokens2x_1649708427916.png]]

| Token name | Desktop scale | Mobile scale |
| --- | --- | --- |
| size-0 | 0 px | 0 px |
| size-10 | 1 px | 1 px |
| size-25 | 2 px | 2 px |
| size-40 | 3 px | 4 px |
| size-50 | 4 px | 5 px |
| size-65 | 5 px | 6 px |
| size-75 | 6 px | 8 px |
| size-85 | 7 px | 9 px |
| size-100 | **8 px (base size)** | **10 px (base size)** |
| size-115 | 9 px | 11 px |
| size-125 | 10 px | 13 px |
| size-130 | 11 px | 14 px |
| size-150 | 12 px | 15 px |
| size-160 | 13 px | 16 px |
| size-175 | 14 px | 18 px |
| size-200 | 16 px | 20 px |

*Not all global size tokens are displayed in this chart.*

### Static size tokens

Static size tokens are persistent across each platform scale. Global size tokens change at every scale in order to support overall scaling of an application and its components. Static size tokens are used for properties such as border thickness, which are meant to remain the same across platform scales.

![[static-size-tokens2x_1649708427979.png]]

| Token name | Desktop and mobile scale |
| --- | --- |
| static-size-0 | 0 px |
| static-size-10 | 1 px |
| static-size-25 | 2 px |
| static-size-40 | 3 px |
| static-size-50 | 4 px |
| static-size-65 | 5 px |
| static-size-75 | 6 px |
| static-size-85 | 7 px |
| static-size-100 | 8 px |
| static-size-115 | 9 px |
| static-size-125 | 10 px |
| static-size-130 | 11 px |
| static-size-150 | 12 px |
| static-size-160 | 13 px |
| static-size-175 | 14 px |
| static-size-200 | 16 px |

*Not all static size tokens are displayed in this chart.*

## Usage guidelines

### Use global tokens sparingly

Global tokens are the easiest to reference for the various attributes in Spectrum. While they’re the building blocks of Spectrum, they’re also the token type that is the least tied to the logic of our design language. Only use global tokens when there are no aliases for your use case.

![[global_tokens_do2x_447t7HVEEYigOUwvaAiEqx_1611634800113.png]]

![[global_tokens_dont2x_614MOMlhn86JV0YS95dW2s_1611634800859.png]]

### Use aliases wherever they can apply

Alias tokens are the recommended type to use when building your product with design tokens. Aliases are like a “Rosetta Stone” for understanding Spectrum, and they help to associate meaning, context, and/or intent to the design tokens you’re applying to your product. Using aliases is a good way to ensure that your product can evolve alongside Spectrum as the design system evolves, and to minimize future maintenance for your product.

![[alias_tokens_do2x_2OXZiwnADMBPaipnSqX1b4_1611634801787.png]]

![[alias_tokens_dont2x_4UuBgZwG4J1wryZttlrcnh_1611634802785.png]]

### Use component-specific tokens for their respective component

When building Spectrum verified components, use component-specific tokens. This ensures that as a component’s design evolves, you won’t have to retrace any higher-level design decisions that informed the updates. It’s not recommended to use component-specific tokens interchangeably with other components, unless one is derivative of the other.

![[component_tokens_do2x_2rtybmKmEkv2psksxx9ovH_1611634803749.png]]

![[component_tokens_dont2x_QwxF6GkxKRhlkaO5yVe7z_1611634804674.png]]