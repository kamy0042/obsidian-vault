---
タグ: []
作成日時: 2023-12-11T14:38:00
URL: https://design.gs.com/foundation/color-system/color-tokens#token-structure
Tags: [topic/デザインシステム/デザイントークン]
---
Color tokens allow a designer or developer an understanding of how or when to apply our palette and what options are available. They are used to bridge the gap between naming and use.

View GSUI Toolkit Documentation (Internal Only)

View in Figma (Internal Only)

[Overview](https://design.gs.com/foundation/color-system/color-tokens#overview)

Color tokens are semantically named style labels that are each assigned two color values — one for the default palette and another for the dark mode palette.

![[tokens-intro.png]]

Color Tokens Intro

Note: Dark Mode will be available in GS UI Toolkit V16.

[Token Structure](https://design.gs.com/foundation/color-system/color-tokens#token-structure)

Tokens are built using semantic names that help provide an understanding on how or when the token should be used.

![[tokens-building.png]]

Token Structure

[Sample Tokens](https://design.gs.com/foundation/color-system/color-tokens#sample-tokens)

Generally tokens are structured as follows.

![[tokens-sample.png]]

Token sample

[Sample Tokens](https://design.gs.com/foundation/color-system/color-tokens#sample-tokens)

At a base level the [color system ramps](https://design.gs.com/foundation/color-system/all-hues-and-values) are used as a source values for all color tokens and each token is assigned a value for both default mode and dark mode.

![[tokens-applying-system.png]]

Token sample

[Brand](https://design.gs.com/foundation/color-system/color-tokens#brand)

![[Tokens-brand.png]]

Color Tokens Brand

[Base Scheme](https://design.gs.com/foundation/color-system/color-tokens#base-scheme)

The base color scheme is a reference palette for the most commonly used colors within Goldman Sachs user interfaces. These base colors are referenced by other color tokens in the system to build a flexible and scalable system.

![[Tokens-base-scheme.png]]

Base Scheme Tokens

[Surface](https://design.gs.com/foundation/color-system/color-tokens#surface)

Surface tokens are meant to be used in background fills. Any container that houses content should use a surface token. Seven surface tokens provide designers and engineers a flexible and consistent range of grays for base application layers, panels and side bars, etc.

![[Tokens-surface.png]]

Color Tokens Surface

[Surface Interaction States](https://design.gs.com/foundation/color-system/color-tokens#surface-interaction-states)

All surface color tokens have assigned color tokens for the core [interaction states](https://design.gs.com/foundation/interaction-states). These should be used whenever a container is interactive. They include hover, active, and selected with subtle or bold emphasis.

![[tokens-surface-interaction-default.png]]

Surface Interaction States - Default

![[tokens-surface-interaction-dark.png]]

Surface Interaction States - Dark

[Surface and Elevation](https://design.gs.com/foundation/color-system/color-tokens#surface-and-elevation)

Elevation styles are used to create separation between surfaces. Eight elevation styles are available in a range of depths. In default mode, elevation is created through shadows and elevation design tokens. In dark mode, on surfaces with elevation (i.e. Cards), an additional transparent overlay is used to lighten the surface color and create the visual effect of an elevated surface.

![[tokens-elevation-surface.png]]

Surface + Elevation

[Border](https://design.gs.com/foundation/color-system/color-tokens#border)

Borders and dividers help to group and separate content on a page or within a component. A range of border tokens are provided to allow for flexibility in hierarchy and emphasis.

![[tokens-borders.png]]

Color Token Border

[Border Interaction States](https://design.gs.com/foundation/color-system/color-tokens#border-interaction-states)

Border color tokens also have assigned colors for interactions states which include hover, focus and selected with subtle or bold emphasis.

![[tokens-border-interaction-default.png]]

Border Interaction States - Default

![[tokens-border-interaction-dark.png]]

Border Interaction States - Dark

[Text](https://design.gs.com/foundation/color-system/color-tokens#text)

Text and icons are foreground elements and often paired together. They share a set of color tokens.

![[tokens-text.png]]

Text Colors

[Status](https://design.gs.com/foundation/color-system/color-tokens#status)

Status tokens are used in components that can showcase a particular status to the user and they are available in bold, subtle and minimal emphasis. There are six status types available — none, information, warning, error, information and loading.

[Bold Emphasis](https://design.gs.com/foundation/color-system/color-tokens#bold-emphasis)

![[tokens-status-bold.png]]

Tokens Status Bold

- Warning-alt is an alternative color when a AA compliant foreground color is needed for iconography or graphical elements meant to indicate a warning to the user. In the system we use it on input fields to color the border and alert icon.

[Subtle Emphasis](https://design.gs.com/foundation/color-system/color-tokens#subtle-emphasis)

![[tokens-status-subtle.png]]

Tokens Status Subtle

[Data Visualization](https://design.gs.com/foundation/color-system/color-tokens#data-visualization)

The data visualization color tokens include enough distinct colors for numerous datasets to be represented, and allows users with color blindness to discern differences between data points.

![[tokens-dataviz.png]]

Data Visualization

[Core Colors](https://design.gs.com/foundation/color-system/color-tokens#core-colors)

For every color ramp within our broader [color system](https://design.gs.com/foundation/color-system/all-hues-and-values) we have identified one value for each color to represent each emphasis — bold, subtle, or minimal. This allows for the system to maintain consistency per color while also offering some flexibility with color options based on emphasis.

The colors outlined below are used in background fills in several components including [Badge](https://design.gs.com/components/badge), [Tag](https://design.gs.com/components/tag), and [Alert](https://design.gs.com/components/alert), and [Avatar.](https://design.gs.com/components/avatar) Some other tokens within the system, such as status, are then derived from these core color tokens (i.e. status-error uses the red core color token values.)

![[tokens-core-color-ramps.png]]

Core Color System Application

[Interaction States](https://design.gs.com/foundation/color-system/color-tokens#interaction-states)

Each core color has interaction states defined using a formula to change the shade of the color as the user interacts with the element. For example, hover states take a color 2 shades darker on the color ramp and overlay that color at 20%. Active states use the same shade and overlay the color at 40%. In dark mode, the formula changes to use 2 shades lighter on the ramp with the same percentages. Read more about [interaction states](https://design.gs.com/foundation/interaction-states).

![[dark-mode-tokens-color-interaction.png]]

Core Color Interaction State Formula

[Bold](https://design.gs.com/foundation/color-system/color-tokens#bold)

Most bold colors are value 60 for default styles and value 50 for dark mode, with the exceptions being orange and yellow. In default mode all text color is white, except yellow which is gray 110. In dark mode all text colors are gray 110.

![[tokens-colors-bold-default.png]]

Bold Colors

![[tokens-colors-bold-dark.png]]

Sublte Colors Dark Mode

[Subtle](https://design.gs.com/foundation/color-system/color-tokens#subtle)

Most subtle color backgrounds use the value 20 for default mode and value 80 for dark mode, with the exception being yellow. In default mode all text colors, use value 70 (i.e. red 70, orange 70, etc), except yellow, which uses Gray 110 for AA contrast requirements. In dark mode all text colors use the 30 value of the color, except yellow which uses gray 110.

![[tokens-colors-subtle-default.png]]

Subtle Core Colors

![[tokens-colors-subtle-dark.png]]

Subtle Dark Mode Colors

[Minimal](https://design.gs.com/foundation/color-system/color-tokens#minimal)

Minimal color backgrounds use a 0% transparency for the default fill and the same hover and active logic as subtle, but instead of being over the originating color it is just over a transparent fill. All text colors use value 60, i.e. red 60, orange 60, etc. In dark mode all text colors use 50.

![[tokens-colors-minimal-default.png]]

Minimal Core Colors

![[tokens-colors-minimal-dark.png]]

Minimal Dark Mode