---
タグ: []
作成日時: 2024-06-04T14:35:00
URL: https://stackoverflow.com/questions/69613534/is-using-tabs-for-navigation-a-violation-of-the-aria-specification
Tags: [topic/アクセシビリティ]
---
![[apple-touch-icon2.png]]

The current title is as carefully reworded by somebody else. I could rephrase it as *Do ARIA specs allow the use of tabs-based implementation of a navigation menu?*, just in case it makes things clearer to other readers.

[*§3.22 Tabs*](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) from [*WAI-ARIA Authoring Practices 1.1*](https://www.w3.org/TR/wai-aria-practices-1.1) reads

> 
> Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time. Each tab panel has an associated tab element, that when activated, displays the panel. The list of tab elements is arranged along one edge of the currently displayed panel, most commonly the top edge.

This doesn't seem to exclude that one could use tabs for navigation, i.e. for the elements in a `<nav>`. I think one example of a website that does so are GitHub profile pages ([example](https://github.com/Aster89?tab=repositories)).

On the other hand, the [examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html) from *WAI-ARIA Authoring Practices 1.1* use `<button role="tab" ...>` in a `<div role="tablist" ...>`, and the selected tab doesn't persist across page refreshes. From a later part of the document, I read:

> 
> When a tabbed interface is initialized, one tab panel is displayed and its associated tab is styled to indicate that it is active.

which makes me think it's the intention of WAI-ARIA to have a specific tab panel be selected when the page is refreshed, ignoring which one is selected right before refreshing.

And this does seem to exclude that one could use tabs for navigation, unless one is happy that the navigation state is wiped out every time the page is refreshed.

So my question is two-fold:

- Does using tabs for navigation violate some ARIA principle (e.g. accessibility)?
- If that's the case, then what are those tab-like things I see on GitHub profiles, if not tabs? Or is it just that GitHub is designed in a way that is not ARIA-compliant?