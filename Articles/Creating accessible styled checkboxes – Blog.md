---
タグ: []
作成日時: 2022-05-12T11:51:00
URL: https://www.evinced.com/blog/creating-accessible-styled-checkboxes/
Tags: [topic/アクセシビリティ, topic/デザイン/UIデザイン]
---
![[Accessible_styled_checkboxes.jpg]]

A good user experience is a combination of an interface that catches the eye and clear, easy-to-operate functionality. These two principles usually do not contradict each other, but sometimes they do – especially when it comes to elements where the styling cannot be changed directly, such as checkboxes and radio buttons. In such cases, developers often tend to use alternative elements with easier styling options, but without the required semantics. The use of non-semantic alternative elements may cause screen readers and keyboard users to have a bad user experience or even prevent them from using it at all.

In this post, I will show how to style checkboxes while retaining their semantic values. At each step, I will point out the properties and values that allow us to do it.

As a bonus, I will show you how to extend the semantics and, based on the accessible checkboxes, how to create an accessible switch button.

## What makes an accessible checkbox?

Let’s start by mapping the factors that make checkboxes accessible.

1. It has to be focusable so that keyboard-only users will be able to reach it.
2. It must have a discernible focus indication to indicate the position on the focus sequence for keyboard-only users.
3. It has to programmatically express its role, so that assistive technologies can read and announce it as a checkbox.
4. It has to be properly labeled so it is understandable and interactable for assistive technology users.
5. It has to express its state (checked/unchecked).

## Bringing into practice

### The markup:

Each checkbox will consist of 3 elements. A wrapping element, the checkbox and the element that will act as the presentation element.

```plain text
<div class="checkbox-wrapper">
    <input type="checkbox" ...all other attributes />
    <span></span>
</div>
```

Heads up, the order of the elements inside “`.checkbox-wrapper`” matters. We are going to use the CSS pseudo class “`:checked`” to change the appearance of the `<span>` element. Since CSS does not have a selector for previous sibling(s), our only choice is referring to the next sibling.

There is another thing we should do here. Since the purpose of the span is purely decorative, we want assistive technologies to ignore it, so we give it an `aria-hidden` attribute with the value “`true`”.

```plain text
<div class="checkbox-wrapper">
    <input type="checkbox"  ...all other attributes  />
    <span aria-hidden="true"></span>
</div>
```

We have the HTML setting for our checkbox (still not labeled), so now we would like to style it according to the design’s guidelines, while preserving the native semantics and behaviours of the native HTML checkbox in order to keep it accessible.

### The CSS:

Let’s start by styling the wrapper `<div>` (`.checkbox-wrapper`). In this example the wrapper div is defining the checkbox’s dimensions and icon size; this is only a styling choice. The only property here that’s essential to our purpose is the “`position: relative;`” attribute, it will allow us to position the checkbox input correctly and stack it on top of the span.

```plain text
.checkbox-wrapper {
 	position: relative;
 	font-size: 1rem;
 	height: 3rem;
 	width: 3rem;
}
```

Next, we are going to style the `[type=”checkbox”]` element.

We need the input element to be invisible since we want to present a styled version of it, but we also need it to be available to assistive technologies and to be able to respond to users’ click (change its state).

Set the width and height of the input to 100% so that it will take the full size of its parent.

Set its position to be absolute so that we can stack it on top of the `<span>`. For the same purpose, set its `z-index` to “`0`”.

Finally, set the “`opacity`” property to “`0`”. This will hide the checkbox visually, and still keep it on the accessibility and render trees for keyboards and screen readers.

```plain text
.checkbox-wrapper > [type="checkbox"] {
      cursor: pointer;
      height: 100%;
 	left: 0;
  	margin: 0;
 	opacity: 0;
 	position: absolute;
 	top: 0;
 	width: 100%;
 	z-index: 0;
}
```

The checkbox input is all set, now we can start to actually style it.

**The essentials for our purpose are:**

`**position: relative;**` this is for 2 reasons – first, to be able to set its `z-index` to be lower than the checkbox so that we can be sure it won’t block clicking on the checkbox, and, second, to position its “`::after`” pseudo element, which will contain the “check” sign.

`**z-index: -1;**`** **as mentioned above, we need the span to be stacked under the checkbox.

These `z-index` values are not binding but it is important to see to it that the `z-index` value of the span is lower than the `z-index` value of the input element.

The rest of the properties are purely for appearance.

```plain text
.checkbox-wrapper > [type="checkbox"] + span {
    display: block;
    position: relative;
    z-index: -1;
    height: 100%;
    width: 100%;
    border: 0.2rem solid #51c0a8;
  }
```

For the check sign, I chose to use the `<span>`s “`::after`” pseudo element. We want it to appear only when the checkbox is checked, so that we can use the “`:checked`” pseudo class selector.

```plain text
.checkbox-wrapper > [type="checkbox"]:checked + span::after {
	content: "\2714";
	top: -0.2em;
	left: 0.2em;
	color: #51c0a8;
	font-size: 3em;
	position: absolute;
}
```

As long as you have added the `aria-hidden=”true”` the `<span>`, and as long as it has sufficient contrast from its background, this part will not affect accessibility, and it will only depend on your styling requirements.

The last thing we need to do is to ensure that we have a visual focus indication. Remember that the input is just hidden but it is still on the render and in the focus sequence, so we can use the “`:focus`” pseudo class in the same way we used “`:checked`” to change the appearance of the `<span>`.

```plain text
.checkbox-wrapper > [type="checkbox"]:focus + span {
	box-shadow: 1px 1px 2px 2px #51c0a8;
}
```

## To summarize

6. Markup:
    1. Use an input[type=”checkbox”] for the functionality and a <span> or <div> for the presentation.
    2. Let the accessibility APIs ignore the presentational element by adding aria-hidden=”true” to it.
7. Styling:
    3. Let the checkbox be visually hidden, and keep it on the render and accessibility trees (opacity: 0) so that the advantages of its native semantics and accessibility are kept.
    4. Make sure that the checkbox is stacked on top of the styling element so that it catches the mouse’s click events.
    5. Don’t forget to handle the visual focus indication for the benefit of keyboard-only users.

### See it on Codepen

### Switch Button

See how to use the same approach to create accessible switch buttons.

Thank you for reading!

![[Combobox.png]]