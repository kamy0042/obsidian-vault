---
タグ: []
作成日時: 2024-04-14T17:20:00
URL: https://design-system.w3.org/
Tags: [topic/デザインシステム/リファレンス]
---
This design system documents the styles, components and templates available to use on your website.

Find out how to [get started](https://design-system.w3.org/getting-started.html).

How the front end assets (CSS and JavaScript) are organised and compiled is discussed below.

## [¶](https://design-system.w3.org/#css)CSS

The design system uses [Sass](http://sass-lang.com/) - specifically the [SCSS syntax](https://sass-lang.com/documentation/syntax)) - which is compiled into CSS files. The CSS approach is heavily influenced by [Andy Bell's](https://github.com/andy-piccalilli/) [CUBE CSS](https://cube.fyi/). This has some similarities with the [BEM Methodology](http://getbem.com/) but with a more judicious use of class names.

### [¶](https://design-system.w3.org/#css-architecture)CSS architecture

All CSS is found within `/assets-src/styles/sass`.

The architecture is split into a series of levels, each level representing a directory containing Sass split out into multiple [partial files](https://sass-lang.com/guide#topic-4).

More generic and wide-reaching styles sit within the lower numbered levels, with specificity increasing with each level:

- **00-settings:** global [Sass variables](https://sass-lang.com/documentation/variables) for your project - [more about settings](https://design-system.w3.org/settings/index.html)
- **10-functions:** global [Sass functions](https://sass-lang.com/documentation/values/functions) e.g. em/rem calculation, unit stripping
- **20-mixins:** global [Sass mixins](https://sass-lang.com/documentation/at-rules/mixin) for font size/line-height combinations, media queries and vertical spacing
- **30-base:** essential styles forming the base of your project, like typography, reset and global elements like links and lists. Print styles also reside here - [more about styles](https://design-system.w3.org/styles/index.html)
- **40-layouts:** heavily influenced by [Every Layout](https://every-layout.dev/), these are the styles for the basic layout types, which can be combined and customised to make a variety of components and templates - [more about layouts](https://design-system.w3.org/layouts/index.html)
- **50-core-components:** the basic components available for use, un-enhanced by JavaScript - [more about components](https://design-system.w3.org/components/index.html)
- **60-advanced-components:** components that are enhanced in some way with JavaScript - [more about components](https://design-system.w3.org/components/index.html)
- **70-third-party-plugins:** any functionality that comes from external sources - [more about third-party plugins](https://design-system.w3.org/third-party-plugins/index.html)
- **80-templates:** styles required for specific page templates and/or content types - [more about templates](https://design-system.w3.org/templates/index.html)
- **90-utilities:** overrides or helper classes - [more about utilities](https://design-system.w3.org/styles/utilities.html)

### [¶](https://design-system.w3.org/#css-compilation)CSS compilation

The Sass files are compiled into three separate CSS stylesheets:

- `core.css`, which contains: 
    - Settings, Functions and Mixins (referenced elsewhere within the stylesheet)
    - Base styles
    - Layouts
    - Core component styles
    - Template-specific styles
    - Utility styles
- `advanced.css`, which contains 
    - Settings, Functions and Mixins (referenced elsewhere within the stylesheet)
    - Styles from Base for [hiding and showing items](https://design-system.w3.org/styles/how-to-hide-and-show-things.html) (to allow for extending [SASS placeholders](https://sass-lang.com/documentation/style-rules/placeholder-selectors))
    - Advanced component styles
    - Third party plugins involving JavaScript
- `print.css` (print stylesheet)

The files `core.scss` and `advanced.scss` determine which Sass files will be compiled into the relevant stylesheet. CSS is organised in specificity order, from low to high. The individual Sass partials are included using the [`@import`](https://sass-lang.com/documentation/at-rules/import#partials)[ directive](https://sass-lang.com/documentation/at-rules/import#partials) in the order denoted by the level in which they reside, remembering the impact of the [CSS cascade](https://wattenberger.com/blog/css-cascade).

Print styles are a slight exception - as noted previously, they reside in **30-base** but are included in `print.scss`.

Both `core.css` and `print.css` are served to all browsers. `advanced.css`, is only served to browsers that meet the following CSS media query that sits within `<head>`:

```plain text
<!--
CSS Mustard Cut
Print (Edge doesn't apply to print otherwise)
Edge, Chrome 39+, Opera 26+, Safari 9+, iOS 9+, Android ~5+, Android UCBrowser ~11.8+
FF 47+
-->
<link rel="stylesheet" id="advanced-stylesheet" href="../dist/assets/styles/advanced.css" media="
        only print,
        only all and (pointer: fine), only all and (pointer: coarse), only all and (pointer: none),
        only all and (min--moz-device-pixel-ratio:0) and (display-mode:browser), (min--moz-device-pixel-ratio:0) and (display-mode:fullscreen)
">

```

This technique is known as [‘cutting the mustard’](https://www.zeldman.com/2015/09/01/youre-welcome-cutting-the-mustard-then-and-now/). It can be done via a JavaScript query but the design system, inspired by the [Springer Nature Frontend Playbook](https://github.com/springernature/frontend-playbook/blob/main/practices/graded-browser-support.html), uses the [CSS Only Mustard Cut](https://github.com/Fall-Back/CSS-Mustard-Cut).

## [¶](https://design-system.w3.org/#javascript-js)JavaScript (JS)

There are two general rules for JS:

- `data-attributes` are preferred as hooks within the HTML for applying JS functionality. They are less likely to be accidentally over-written than classes. In the case of some third-party scripts, it may be necessary to use an `id` instead.
- If a class is added to the HTML by JS, prefix it with `.js-`, e.g. `.js-slider`. This helps provide context within the stylesheets.

### [¶](https://design-system.w3.org/#js-architecture)JS architecture

The architecture takes inspiration from Chris Ferdinandi's [How I structure my vanilla JS projects](https://gomakethings.com/how-i-structure-my-vanilla-js-projects/).

All JS is found within `/assets-src/js`. This directory contains a mixture of individual files, and the following subdirectories:

- `/libraries`: contains third party scripts, e.g. [Font Face Observer](https://fontfaceobserver.com/) and [Accessible autocomplete](https://github.com/alphagov/accessible-autocomplete).
- `/libraries-extensions`: contains any custom implementations for the third party scripts that may be required to work with the design system.
- `/main`: contains code used on most/all pages.

### [¶](https://design-system.w3.org/#js-compilation)JS compilation

Scripts within `/main` are concatenated together into `main.js` and `main.min.js`, which is loaded everywhere.

Individual files are minified into files of the same name, but are kept separate. They are typically used on only one or two templates.

Webpack is used to concatenate and minify JS. the configuration files sit within the project root: `webpack.config.js` and `webpack.config.min.js`

## [¶](https://design-system.w3.org/#twig-filters)Twig filters

A number of filters exist to help format data in Twig templates. They are documented in [their dedicated page](https://design-system.w3.org/twig/filters.html).