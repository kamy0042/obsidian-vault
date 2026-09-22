---
タグ: []
作成日時: 2024-04-18T13:06:00
URL: https://timwright.org/blog/2016/11/19/difference-rolepresentation-aria-hiddentrue/
Tags: [topic/アクセシビリティ/WAI-ARIA]
---
In dealing with `role="presentation"` and `aria-hidden="true"` you may find that they both have deceptively similar functions when it relates to how they interact with assistive technology (screen readers). Before we dig into the difference between these two attributes we first need to learn a little bit about how accessibility in a Web browser works and this thing called: [The Accessibility Tree](https://www.w3.org/TR/core-aam-1.1/#intro_treetypes)

## The Accessibility Tree

The accessibility tree is a mapping of objects within an HTML document that need to be exposed to assistive technology (if you’re familiar with the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), it’s a subset of the DOM). Anything that communicates aspects of the UI or has a property or relationship that needs to be exposed, gets added to the tree. This happens automatically for most elements when you use a strong semantic HTML structure, but you can also add or remove objects programmatically with accessibility hooks like: `role="presentation"` and `aria-hidden="true"` (and some CSS properties). In a nutshell, this means… if I have a text input on a page, a screenreader will be able to interact with it, because it has been added into the accessibility tree.

If `role="presentation"` and `aria-hidden="true"` do the same thing and interact with the accessibility tree the same way, then what’s the difference? Why do we even need both of them?

It’s true, that both these attributes will remove objects from the accessibility tree, but they act at different levels and report varying semantics to assistive technology.

## Presentational Roles

Most of the documentation you’ll find online about the `role="presentation"` attribute mentions removing spacer images,and layout tables. Well that’s not very helpful in 2016, because we don’t use spacer images anymore and table layouts have long since been removed from our minds. If that’s true, then what good is this attribute?

Presentational roles are used when elements need to be in the DOM, but the semantics of them are inaccurate or unnecessary. We’re basically telling a screen reader that the semantics of an element are wrong, so ignore them. Which is why the example `<table role="presentation">` is often used to present it to the world.

In the below example you’ll see an unordered list that is using `role="presentation"` to remove it’s semantics:

```plain text
<ul role="presentation">
  <li>This is an item</li>
  <li>I like a good<a href="#!"sandwich</a></li>
  <li>Hello last item</li>
</ul>
```

Below, is that gets reported to assistive technology. Note that the `<span>` elements could also be `<div>` because neither have a semantic meaning.

```plain text
<span role="presentation">
  <span>This is an item</span>
  <span>I like a good <a href="#!"sandwich</a></span>
  <span>Hello last item</span>
</span>
```

Something important to notice here is that all children of the original `<ul>` have had their semantics removed as well. The exception to this is the link in the second list item. Using `role="presentation"` will not remove and content or semantic definition from focusable elements. That means your links, buttons, and inputs will remain as they should, along with all the content. There are some elements, like images, that will get completely removed from the tree when this attribute is applied (you’d use it when it doesn’t make sense for an image to have alternative text so it can be removed from the tree).

This is an important distinction to make when comparing to `aria-hidden="true"`, which is a little more aggressive in how it interacts with the accessibility tree.

### ARIA Hiding

Completely hiding an element from a screen reader is pretty common in a couple different situations:

1. A UI element is detrimental or unimportant to assistive technology (you see this a lot with icons – for better or worse)
2. You’re mimicking the visual UI (like menus opening and closing)

The `aria-hidden` attribute has two states: true and false and they correspond to an element’s state within the accessibility tree. `aria-hidden="true"` means the element is removed from the tree, and `aria-hidden="false"` means the element is present in the tree; the default state for an element is “false”. Elements can be added or removed in the HTML or programmatically in JavaScript and combined with other accessibility attributes to create robust interactions with assistive technology.

If you’re changing an element’s hidden state from true to false, this should always happen within JavaScript to provide a fallback for someone browsing with JavaScript turned off. If an element’s state is “hidden” and it will always remain hidden, it’s fine to add `aria-hidden="true"` right into the HTML.

The code block below shows two examples. One is hidden via the HTML, and the other within JavaScript to show a toggle interaction ([you can also check it out in this pen](http://codepen.io/timwright12/pen/zKNppy)):

```plain text
<!--this element is hidden in the HTML-->
<span class="icon icon-home" aria-hidden="true"></span>

<!--this menu UI hides/shows with JS-->
<a href="#m" id="trigger" aria-controls="m">menu</a>

<nav id="m" role="navigation">
  <a href="#!">Home</a>
</nav>

<script>
var trigger = document.getElementById("trigger");
var menu = document.getElementById("m");

// set the menu to hidden
menu.setAttribute('aria-hidden', 'true');

trigger.addEventListener("click", function(e) {
  e.preventDefault();

// check the aria state
  if( menu.getAttribute('aria-hidden') === 'true' ) {
    menu.setAttribute('aria-hidden', 'false');
  } else {
    menu.setAttribute('aria-hidden', 'true');
  }

});
</script>
```

Using `aria-hidden="true"` will completely remove all elements, child elements, and content from the accessibility tree regardless of the default semantic nature and they will remain removed until the aria state is changed to `false` it functions in much the same way as CSS’s `display:none`. This is where it differs from `role="presentation"`.

When you’re thinking about removing an element from the accessibility tree first think, “Am I removing the element all together or just the semantics?” If you do that, it will be sure to lead you down the right path and make your UI all the more pleasurable for assistive technology to consume.

## Resources and Further Reading

- [The Accessibility and DOM Tree](https://www.w3.org/TR/core-aam-1.1/#intro_treetypes)
- [The Presentational Role](https://www.w3.org/TR/wai-aria-practices-1.1/#presentation_role)
- [aria-hidden (state)](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden)
- [Practical ARIA examples](http://heydonworks.com/practical_aria_examples/)