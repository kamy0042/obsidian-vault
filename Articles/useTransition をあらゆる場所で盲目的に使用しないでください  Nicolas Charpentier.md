---
Created: 2026-02-19T11:06:00
URL: https://www.charpeni.com/blog/dont-blindly-use-usetransition-everywhere
Tags: [topic/デザインシステム/コンポーネント設計]
---
![](https://www.charpeni.com/_next/image?url=%2Fstatic%2Fimages%2Fdont-blindly-use-usetransition-everywhere%2Fbanner.png&w=3840&q=75)

Lately, I have been looking into React's [`useTransition`](https://react.dev/reference/react/useTransition) hook because I keep seeing posts about how great it is for improving the user experience in React applications. I have seen posts recommending this hook for managing state transitions more effectively, especially in scenarios involving slow-rendering components, but also just as a loading state handler.

So, naturally, I looked closely at the documentation and ended up disappointed because the example doesn't look like a user experience improvement at all, it looks like a terrible user experience, to be honest.

**Don't get me wrong here.** I believe `useTransition` is an amazing improvement, especially if you are building libraries affecting routing, etc. But to recommend using this everywhere? It looks like misuse is easy unless there are nuances I've missed. If so, please comment!

## Deep dive

To understand why, let's look at some examples step by step.

### Basic example without `useTransition`

A basic example, extracted on React Docs, where the usage of `useTransition` has been removed to understand why we would need it (based from React Docs):

In this example, we can see how a simple tabbed interface can lead to a poor user experience when switching between tabs that contain slow-rendering content:

- There's no feedback in the UI after clicking on `Posts (slow)` because the slow-rendering content blocks the whole thread.
- There's no way to back out, so the user is stuck waiting for the content to load. What if we want to interact with something else? Or navigate to another tab.
- Subsequent navigation to the same slow-rendering tab will still be slow.

### Introducing `useTransition`

In this example, again extracted from React Docs, we can see how `useTransition` was used in a tabbed interface.

> Because the parent component updates its state inside the `action`, that state update is marked as a transition. This means you can click on “Posts” and then immediately click “Contact” and it does not block user interactions.
> [🔗 Source](https://react.dev/reference/react/useTransition#displaying-a-pending-visual-state:~:text=Because%20the%20parent%20component%20updates%20its%20state%20inside%20the%20action%2C%20that%20state%20update%20gets%20marked%20as%20a%20Transition.%20This%20means%20you%20can%20click%20on%20%E2%80%9CPosts%E2%80%9D%20and%20then%20immediately%20click%20%E2%80%9CContact%E2%80%9D%20and%20it%20does%20not%20block%20user%20interactions%3A).

> You can use the `isPending` boolean value returned by `useTransition` to indicate to the user that a Transition is in progress. For example, the tab button can have a special “pending” visual state.
> [🔗 Source](https://react.dev/reference/react/useTransition#displaying-a-pending-visual-state).

> Notice how clicking “Posts” now feels more responsive because the tab button itself updates right away.
> [🔗 Source](https://react.dev/reference/react/useTransition#displaying-a-pending-visual-state:~:text=Notice%20how%20clicking%20%E2%80%9CPosts%E2%80%9D%20now%20feels%20more%20responsive%20because%20the%20tab%20button%20itself%20updates%20right%20away%3A).

## Why it looks terrible

I agree that using `useTransition` allows us to bail out of a render (which is super useful), like in this case, someone could click on `Posts` tab by accident, but then the app is still responsive and we can navigate somewhere else.

I believe it looks terrible because using `isPending` doesn't really provide a great experience. It indicates that the tab we just clicked is pending, something is happening, but then, the previous tab is still considered active and we can still see the previous tab content, which doesn't feel like a great user experience to me.

**What I would truly prefer here, is to prevent blocking the tabs component so we can update this one as a high priority, then follow up with rendering the content.**

Another point: if this is part of the navigation, the user experience is still not great because navigating back to `Posts` tab will still be slow, every single time. It could have been rendered in the background during browser idle time, or just cached or kept rendered but hidden (think `<Activity>`, we will cover this below).

I don't see why we should use this everywhere like I keep seeing recommended in blog posts, unless you are building a routing library or something that requires it. But even there, I think we should be careful about how we use it.

### Common pitfalls

### Double render

When you run a transition, it schedules two renders:

1. One urgent render to show a pending state (`isPending = true`) with old state value
2. One concurrent render with `isPending = false` and new state value 
    - When this render is completed, it gets committed

That's why it's super important to memoize expensive tabs in our context!

See [facebook/react#24269](https://github.com/facebook/react/issues/24269).

### Not for controlled inputs

Did you know that you can't wrap input updates in a Transition because typing must update state synchronously?

Transitions are non-blocking, so they're unsuitable for controlled inputs that must reflect user input immediately.

### Overusing transitions

Wrapping all state updates can delay even urgent UI feedback (e.g., button clicks, input updates), therefore, degrading the experience. Only non-critical, expensive updates should use transitions.

## Better solutions

### Yield to React

If we focus solely on the tabs state, one way to achieve a better user experience is by handling the tab state as a critical update, by ensuring that rendering the tab content yield back to React.

If we pick back the basic example **without** `useTransition`, we can rely on a `<Delay>` component that will delay the render of the tab content until the next event loop—mostly just skipping the first render:

With `<Delay>`, we yielded back and allowed the tabs to update first before rendering the content, which achieved, in my opinion, a way better user experience.

But, there's a catch again. We lose the ability to bail out of this render! When clicking the `Posts` tab, the app freezes, and that's also not a great user experience. See, that's a case where we evaluated our options and can finally opt-in for a `useTransition`, but this time, in better control.

So, let's see an example on how we can combine both `<Delay>` and `useTransition` to achieve the best of both worlds. In this example, `<Delay>` initiates the transition, allowing the tabs to update first before rendering the content.

As a bonus, since `<Delay>` initiates the transition, we can freely use `isPending` (in the right context this time) to render a loading state, directly within the content!

As a reminder on priorities and what we are trying to achieve:

- **Critical update: Tabs**—It needs to update instantly for a great user experience.
- **High priority: Posts container**—We need to remove the old content to make way for the new content and not confuse the user.
- **Low priority: Posts content**—This is our real background rendering activity for which we truly need a transition.

So, this is a way better user experience than the example from React Docs, isn't it? 🙂

### `<Activity>`

There's also another way of making it better, by using [`<Activity>`](https://react.dev/reference/react/Activity), which lets you hide and restore the UI and internal state of its children.

We could use this to either pre-load the content of `Posts` that, or even use it for a just-in-time render, but we keep the tab mounted but hidden via `<Activity>` since it's expensive to render.

I won't go into more details because this blog post is already long enough and `<Activity>` could be its own blog post, so I will refer to the React Docs about [`<Activity>`](https://react.dev/reference/react/Activity) for now and will follow up later.