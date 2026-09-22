---
タグ: []
作成日時: 2024-09-05T13:29:00
URL: https://www.tpgi.com/should-form-labels-be-wrapped-or-separate/
Tags: [topic/アクセシビリティ, topic/デザイン/UIデザイン]
---
![](https://www.tpgi.com/wp-content/uploads/wrapped-present.jpg)

Several times this year, I’ve answered variations of the following question:

> 
> Is it strictly necessary for form fields and labels to have `for/id` association, or is it enough to wrap the `<label>` around the `<input>`

The answer is — **Wrapping is enough in theory, but isn’t quite in practice**.

## What’s the difference?

All form fields must have an associated label, so that screen reader users know which field the label is referring to, and so that voice control users can speak the label text to focus the field (e.g., Click email address for a field labeled “Email address”). The association also provides a pointer shortcut, making it possible to focus the field by clicking the label.

Wrapping the label around the field is known as implicit association, and it’s a very common pattern:

```plain text
<label>
    Email address
    <input type="email">
</label>
```

This pattern is often cited as a usability benefit, since it makes the whole area clickable, rather than the label and field being separate targets, which can be particularly helpful if they’re not directly next to each other.

However if the label and field are separate elements, then they must be associated using `for` and `id` attributes, which is known as explicit association:

```plain text
<label for="email">Email address</label>
<input id="email" type="email">
```

## So what’s the problem?

All browsers and assistive technologies support explicit association, however **implicit association is not reliably supported by voice control software**.

Both [Dragon Naturally Speaking](https://www.nuance.com/products/help/dragon/dragon-for-pc/enx/professionalgroup/main/Content/Web/web_basics.htm) for Windows, and [Voice Control](https://support.apple.com/en-gb/102225) for macOS and iOS, don’t recognize implicit association, so the Click email address command wouldn’t work.

This is not a blocker, because users have multiple ways to reach and activate controls. For example, Voice Control users can say Show numbers to show an overlay of numbers next to every interactive element, and then say the relevant number to use that control.

But the problem is easily fixable anyway, simply by adding explicit association:

```plain text
<label for="email">
    Email address
    <input id="email" type="email">
</label>
```

## Conclusion

Wrapping the `<label>` around the `<input>` is fine, and is sufficient for conformance on its own, however adding explicit association with `for` and `id` is still necessary in practice.

## Resources

- [Browsing with speech recognition (TetraLogical)](https://tetralogical.com/blog/2021/11/15/browsing-with-speech-recognition)
- [Creating Accessible Forms: Accessible Form Controls (WebAIM)](https://webaim.org/techniques/forms/controls)
- [Understanding SC 2.5.3: Label in Name (WCAG)](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html)

**Image credit:** [Alpha](https://www.flickr.com/photos/10559879@N00/2667291630).