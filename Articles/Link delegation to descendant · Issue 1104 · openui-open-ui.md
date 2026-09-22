---
Created: 2024-10-17T12:29:00
URL: https://github.com/openui/open-ui/issues/1104
Tags: [topic/デザインシステム/コンポーネント設計]
---
As per spec, the `a` element cannot nest, you cannot put links inside links.

This is important from an a11y perspective and for other reasons.

However, many websites today (e.g. Reddit, Rotten Tomatoes) implement this kind of link "nesting" on their own with somewhat verbose javascript.

Proposing to discuss finding a web platform solution for this that would take accessibility and ergonomics into account.

This solution might look like link delegation

```plain text
<section link="item1-link">
   <link id="item1-link" href="details?item=1">
</section>
```

In the above example, the `link` attribute of the `section` element "delegates" the link to an `a` (or `area`) descendant with the given ID. UAs should implement this by making the section's default click action delegate the click to the `item1-link` element, and they may support it in other UI such as right-clicking the `section`.

---