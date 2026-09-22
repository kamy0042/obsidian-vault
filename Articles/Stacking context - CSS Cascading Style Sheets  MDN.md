---
Created: 2023-10-30T11:51:00
URL: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context
Tags: [topic/技術/CSS]
---
**Stacking context** is a three-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user, who is assumed to be facing the viewport or the webpage. HTML elements occupy this space in priority order based on element attributes.

## [Description](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context#description)

In the previous article of this guide, [Using z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Using_z-index), we showed that the rendering order of certain elements is influenced by their `z-index` value. This occurs because these elements have special properties which cause them to form a *stacking context*.

A stacking context is formed, anywhere in the document, by any element in the following scenarios:

- Root element of the document (`<html>`).
- Element with a [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) value `absolute` or `relative` and [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) value other than `auto`.
- Element with a [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) value `fixed` or `sticky` (sticky for all mobile browsers, but not older desktop browsers).
- Element with a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type) value `size` or `inline-size` set, intended for [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries).
- Element that is a child of a [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) container, with [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) value other than `auto`.
- Element that is a child of a [`grid`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) container, with [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) value other than `auto`.
- Element with an [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity) value less than `1` (See [the specification for opacity](https://www.w3.org/TR/css-color-3/#transparency)).
- Element with a [`mix-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) value other than `normal`.
- Element with any of the following properties with value other than `none`: 
    - [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
    - [`filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
    - [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
    - [`perspective`](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)
    - [`clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
    - [`mask`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask) / [`mask-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image) / [`mask-border`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border)
- Element with an [`isolation`](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation) value `isolate`.
- Element with a [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) value specifying any property that would create a stacking context on non-initial value (see [this post](https://dev.opera.com/articles/css-will-change-property/)).
- Element with a [`contain`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) value of `layout`, or `paint`, or a composite value that includes either of them (i.e. `contain: strict`, `contain: content`).
- Element placed into the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) and its corresponding [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop). Examples include [fullscreen](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) and [popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) elements.

Within a stacking context, child elements are stacked according to the same rules explained just above. Importantly, the `z-index` values of its child stacking contexts only have meaning in this parent. Stacking contexts are treated atomically as a single unit in the parent stacking context.

In summary:

- Stacking contexts can be contained in other stacking contexts, and together create a hierarchy of stacking contexts.
- Each stacking context is completely independent of its siblings: only descendant elements are considered when stacking is processed.
- Each stacking context is self-contained: after the element's contents are stacked, the whole element is considered in the stacking order of the parent stacking context.

**Note:** The hierarchy of stacking contexts is a subset of the hierarchy of HTML elements because only certain elements create stacking contexts. We can say that elements that do not create their own stacking contexts are *assimilated* by the parent stacking context.

## [Example](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context#example)

![[understanding_zindex_04.png]]

Example of stacking rules modified using z-index

In this example, every positioned element creates its own stacking context, because of their positioning and `z-index` values. The hierarchy of stacking contexts is organized as follows:

- Root 
    - DIV #1
    - DIV #2
    - DIV #3 
        - DIV #4
        - DIV #5
        - DIV #6

It is important to note that DIV #4, DIV #5 and DIV #6 are children of DIV #3, so stacking of those elements is completely resolved within DIV #3. Once stacking and rendering within DIV #3 is completed, the whole DIV #3 element is passed for stacking in the root element with respect to its sibling's DIV.

DIV #4 is rendered under DIV #1 because DIV #1's z-index (5) is valid within the stacking context of the root element, while DIV #4's z-index (6) is valid within the stacking context of DIV #3. So, DIV #4 is under DIV #1, because DIV #4 belongs to DIV #3, which has a lower z-index value.

For the same reason DIV #2 (`z-index`: 2) is rendered under DIV#5 (`z-index`: 1) because DIV #5 belongs to DIV #3, which has a higher z-index value.

DIV #3's z-index is 4, but this value is independent from z-index of DIV #4, DIV #5 and DIV #6, because it belongs to a different stacking context.

An easy way to figure out the *rendering order* of stacked elements along the z-axis is to think of it as a "version number" of sorts, where child elements are minor version numbers underneath their parent's major version numbers. This way we can easily see how an element with a z-index of 1 (DIV #5) is stacked above an element with a z-index of 2 (DIV #2), and how an element with a z-index of 6 (DIV #4) is stacked below an element with a z-index of 5 (DIV #1).

In our example (sorted according to the final rendering order):

- Root 
    - DIV #2: (`z-index`: 2)
    - DIV #3: (`z-index`: 4) 
        - DIV #5: (`z-index`: 1), stacked under an element (`z-index`: 4), which results in a rendering order of 4.1
        - DIV #6: (`z-index`: 3), stacked under an element (`z-index`: 4), which results in a rendering order of 4.3
        - DIV #4: (`z-index`: 6), stacked under an element (`z-index`: 4), which results in a rendering order of 4.6
    - DIV #1: (`z-index`: 5)

### [HTML](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context#html)

html

```plain text
<div id="div1">
  <h1>Division Element #1</h1>
  <code>
    position: relative;<br />
    z-index: 5;
  </code>
</div>

<div id="div2">
  <h1>Division Element #2</h1>
  <code>
    position: relative;<br />
    z-index: 2;
  </code>
</div>

<div id="div3">
  <div id="div4">
    <h1>Division Element #4</h1>
    <code>
      position: relative;<br />
      z-index: 6;
    </code>
  </div>

  <h1>Division Element #3</h1>
  <code>
    position: absolute;<br />
    z-index: 4;
  </code>

  <div id="div5">
    <h1>Division Element #5</h1>
    <code>
      position: relative;<br />
      z-index: 1;
    </code>
  </div>

  <div id="div6">
    <h1>Division Element #6</h1>
    <code>
      position: absolute;<br />
      z-index: 3;
    </code>
  </div>
</div>

```

### [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context#css)

css

```plain text
* {
  margin: 0;
}
html {
  padding: 20px;
  font:
    12px/20px Arial,
    sans-serif;
}
div {
  opacity: 0.7;
  position: relative;
}
h1 {
  font: inherit;
  font-weight: bold;
}
#div1,
#div2 {
  border: 1px dashed #696;
  padding: 10px;
  background-color: #cfc;
}
#div1 {
  z-index: 5;
  margin-bottom: 190px;
}
#div2 {
  z-index: 2;
}
#div3 {
  z-index: 4;
  opacity: 1;
  position: absolute;
  top: 40px;
  left: 180px;
  width: 330px;
  border: 1px dashed #900;
  background-color: #fdd;
  padding: 40px 20px 20px;
}
#div4,
#div5 {
  border: 1px dashed #996;
  background-color: #ffc;
}
#div4 {
  z-index: 6;
  margin-bottom: 15px;
  padding: 25px 10px 5px;
}
#div5 {
  z-index: 1;
  margin-top: 15px;
  padding: 5px 10px;
}
#div6 {
  z-index: 3;
  position: absolute;
  top: 20px;
  left: 180px;
  width: 150px;
  height: 125px;
  border: 1px dashed #009;
  padding-top: 125px;
  background-color: #ddf;
  text-align: center;
}

```

## [Result](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context#result)

## [See also](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context#see_also)

- [Stacking without the z-index property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_without_z-index): The stacking rules that apply when `z-index` is not used.
- [Stacking floating elements](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_floating_elements): How floating elements are handled with stacking.
- [Using z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Using_z-index): How to use `z-index` to change default stacking.
- [Stacking context example 1](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context_example_1): 2-level HTML hierarchy, `z-index` on the last level
- [Stacking context example 2](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context_example_2): 2-level HTML hierarchy, `z-index` on all levels
- [Stacking context example 3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context_example_3): 3-level HTML hierarchy, `z-index` on the second level
- [Top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)

**Found a content problem with this page?**
• [Edit the page on GitHub](https://github.com/mdn/content/edit/main/files/en-us/web/css/css_positioned_layout/understanding_z-index/stacking_context/index.md).
• [Report the content issue](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FCSS_positioned_layout%2FUnderstanding_z-index%2FStacking_context&metadata=%3C!--%20Do%20not%20make%20changes%20below%20this%20line%20--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage%20report%20details%3C%2Fsummary%3E%0A%0A*%20Folder%3A%20%60en-us%2Fweb%2Fcss%2Fcss_positioned_layout%2Funderstanding_z-index%2Fstacking_context%60%0A*%20MDN%20URL%3A%20https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FCSS_positioned_layout%2FUnderstanding_z-index%2FStacking_context%0A*%20GitHub%20URL%3A%20https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fcss%2Fcss_positioned_layout%2Funderstanding_z-index%2Fstacking_context%2Findex.md%0A*%20Last%20commit%3A%20https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2F9a06522ff323403f707ddad2cb45e27b53cee41e%0A*%20Document%20last%20modified%3A%202023-09-08T00%3A00%3A27.000Z%0A%0A%3C%2Fdetails%3E).
• [View the source on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/css/css_positioned_layout/understanding_z-index/stacking_context/index.md?plain=1).Want to get more involved? [Learn how to contribute](https://github.com/mdn/content/blob/main/CONTRIBUTING.md).