---
URL: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
Created: 2023-01-13T17:28:00
Tags: [topic/技術/テスト]
---
![[photo-1555861496-0666c8981751.bin]]

Photo by Sarah Kilian

Hi there 👋 I created React Testing Library because I wasn't satisfied with the testing landscape at the time. It expanded to DOM Testing Library and now we have Testing Library implementations (wrappers) for every popular JavaScript framework and testing tool that targets the DOM (and even some that don't).

As time has gone on, we've made some small changes to the API and we've discovered suboptimal patterns. Despite our efforts to document the "better way" to use the utilities we provide, I still see blog posts and tests written following these suboptimal patterns and I'd like to go through some of these, explain why they're not great and how you can improve your tests to avoid these pitfalls.

Note: I label each of these by their importance:

- low: this is mostly just my opinion, feel free to ignore and you'll probably be fine.
- medium: you might experience bugs, lose confidence, or be doing work you don't need to
- high: definitely listen to this advice! You're likely missing confidence or will have problematic tests

If you'd like to avoid several of these common mistakes, then the official ESLint plugins could help out a lot:

Note: If you are using create-react-app, `eslint-plugin-testing-library` is already included as a dependency.

Advice: Install and use the ESLint plugin for Testing Library.

The name `wrapper` is old cruft from `enzyme` and we don't need that here. The return value from `render` is not "wrapping" anything. It's simply a collection of utilities that (thanks to the next thing) you should actually not often need anyway.

Advice: destructure what you need from `render` or call it `view`.

For a long time now `cleanup` happens automatically (supported for most major testing frameworks) and you no longer need to worry about it. [Learn more](https://testing-library.com/docs/react-testing-library/api#cleanup).

Advice: don't use `cleanup`

`screen` [was added in DOM Testing Library v6.11.0](https://github.com/testing-library/dom-testing-library/releases/tag/v6.11.0) (which means you should have access to it in `@testing-library/react@>=9`). It comes from the same `import` statement you get `render` from:

The benefit of using `screen` is you no longer need to keep the `render` call destructure up-to-date as you add/remove the queries you need. You only need to type `screen.` and let your editor's magic autocomplete take care of the rest.

The only exception to this is if you're setting the `container` or `baseElement` which you probably should avoid doing (I honestly can't think of a legitimate use case for those options anymore and they only exist for historical reasons at this point).

You can also call [`screen.debug`](https://testing-library.com/docs/dom-testing-library/api-queries#screendebug) instead of `debug`

Advice: use `screen` for querying and debugging.

That `toBeDisabled` assertion comes from [`jest-dom`](https://github.com/testing-library/jest-dom). It's strongly recommended to use `jest-dom` because the error messages you get with it are much better.

Advice: install and use [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom#tobedisabled)**

## [Wrapping things in ](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#wrapping-things-in-act-unnecessarily)[`act`](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#wrapping-things-in-act-unnecessarily)[ unnecessarily](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#wrapping-things-in-act-unnecessarily)

I see people wrapping things in `act` like this because they see these "act" warnings all the time and are just desperately trying anything they can to get them to go away, but what they don't know is that `render` and `fireEvent` are already wrapped in `act`! So those are doing nothing useful.

Most of the time, if you're seeing an `act` warning, it's not just something to be silenced, but it's actually telling you that something unexpected is happening in your test. You can learn more about this from my blog post (and videos): [Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning).

Advice: Learn when `act` is necessary and don't wrap things in `act` unnecessarily.

We maintain a page called ["Which query should I use?"](https://testing-library.com/docs/guide-which-query) of the queries you should attempt to use in the order you should attempt to use them. If your goal is aligned with ours of having tests that give you confidence that your app will work when your users use them, then you'll want to query the DOM as closely to the way your end-users do so as possible. The queries we provide will help you to do this, but not all queries are created equally.

As a sub-section of "Using the wrong query" I want to talk about querying on the `container` directly.

We want to ensure that your users can interact with your UI and if you query around using `querySelector` we lose a lot of that confidence, the test is harder to read, and it will break more frequently. This goes hand-in-hand with the next sub-section:

As a sub-section of "Using the wrong query", I want to talk about why I recommend you query by the *actual* text (in the case of localization, I recommend the default locale), rather than using test IDs or other mechanisms everywhere.

If you don't query by the actual text, then you have to do extra work to make sure that your translations are getting applied correctly. The biggest complaint I hear about this is that it leads to content writers breaking your tests. My rebuttal to that is that first, if a content writer changes "Username" to "Email" that's a change I definitely want to know about (because I'll need to change my implementation). Also, if there is a situation where they break something, fixing that issue takes no time at all. It's easy to triage and easy to fix.

So the cost is pretty low, and the benefit is you get increased confidence that your translations are applied correctly *and* your tests are easier to write and read.

I should mention that not everyone agrees with me on this, feel free to read more about it [in this tweet thread](https://twitter.com/kentcdodds/status/1203179007644012544).

As a sub-section of "Using the wrong query" I want to talk about `*ByRole`. In recent versions, the `*ByRole` queries have been seriously improved (primarily thanks to great work by [Sebastian Silbermann](https://twitter.com/sebsilbermann)) and are now the number one recommended approach to query your component's output. Here are some of my favorite features.

The `name` option allows you to query elements by their ["Accessible Name"](https://www.w3.org/TR/accname-1.1/) which is what screen readers will read for the element *and* it works even if your element has its text content split up by different elements. For example:

One reason people don't use `*ByRole` queries is because they're not familiar with the implicit roles placed on elements. [Here's a list of Roles on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles). So another one of my favorite features of the `*ByRole` queries is that if we're unable to find an element with the role you've specified, not only will we log the entire DOM to you like we do with normal `get*` or `find*` variants, but we also log all the available roles you can query by!

This will fail with the following error message:

```plain text
TestingLibraryElementError: Unable to find an accessible element with the role "blah"

```

Notice that we didn't have to add the `role=button` to our button for it to have the role of button. That's an implicit role, which leads us perfectly into our next one...

Slapping accessibility attributes willy nilly is not only unnecessary (as in the case above), but it can also confuse screen readers and their users. The accessibility attributes should really only be used when semantic HTML doesn't satisfy your use case (like if you're building a non-native UI that you want to make accessible [like an autocomplete](https://github.com/downshift-js/downshift)). If that's what you're building, be sure to use an existing library that does this accessibly or follow the WAI-ARIA practices. They often have [great examples](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html).

Note: to make `input`s accessible via a "role" you'll want to specify the `type` attribute!

Advice: Avoid adding unnecessary or incorrect accessibility attributes.

## [Not using ](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-testing-libraryuser-event)[`@testing-library/user-event`](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-testing-libraryuser-event)

[`@testing-library/user-event`](https://github.com/testing-library/user-event) is a package that's built on top of `fireEvent`, but it provides several methods that resemble the user interactions more closely. In the example above, `fireEvent.change` will simply trigger a single change event on the input. However the `type` call, will trigger `keyDown`, `keyPress`, and `keyUp` events for each character as well. It's much closer to the user's actual interactions. This has the benefit of working well with libraries that you may use which don't actually listen for the change event.

We're still working on `@testing-library/user-event` to ensure that it delivers what it promises: firing all the same events the user would fire when performing a specific action. I don't think we're quite there yet and this is why it's not baked-into `@testing-library/dom` (though it may be at some point in the future). However, I'm confident enough in it to recommend you give it a look and use it's utilities over `fireEvent`.

Advice: Use `@testing-library/user-event` over `fireEvent` where possible.

The *only* reason the `query*` variant of the queries is exposed is for you to have a function you can call which does not throw an error if no element is found to match the query (it returns `null` if no element is found). The *only* reason this is useful is to verify that an element is not rendered to the page. The reason this is so important is because the `get*` and `find*` variants will throw an extremely helpful error if no element is found–it prints out the whole document so you can see what's rendered and maybe why your query failed to find what you were looking for. Whereas `query*` will only return `null` and the best `toBeInTheDocument` can do is say: "null isn't in the document" which is not very helpful.

Advice: Only use the `query*` variants for asserting that an element cannot be found.

Those two bits of code are basically equivalent (`find*` queries use `waitFor` under the hood), but the second is simpler and the error message you get will be better.

Advice: use `find*` any time you want to query for something that may not be available right away.

The purpose of `waitFor` is to allow you to wait for a specific thing to happen. If you pass an empty callback it *might* work today because all you need to wait for is "one tick of the event loop" thanks to the way your mocks work. But you'll be left with a fragile test which could easily fail if you refactor your async logic.

Advice: wait for a specific assertion inside `waitFor`.

Importance: low

Let's say that for the example above, `window.fetch` was called twice. So the `waitFor` call will fail, however, we'll have to wait for the timeout before we see that test failure. By putting a single assertion in there, we can both wait for the UI to settle to the state we want to assert on, and also fail faster if one of the assertions do end up failing.

Advice: only put one assertion in a callback.

## [Performing side-effects in ](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#performing-side-effects-in-waitfor)[`waitFor`](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#performing-side-effects-in-waitfor)

`waitFor` is intended for things that have a non-deterministic amount of time between the action you performed and the assertion passing. Because of this, the callback can be called (or checked for errors) a non-deterministic number of times and frequency (it's called both on an interval as well as when there are DOM mutations). So this means that your side-effect could run multiple times!

This also means that you can't use snapshot assertions within `waitFor`. If you do want to use a snapshot assertion, then first wait for a specific assertion, and then after that you can take your snapshot.

Advice: put side-effects outside `waitFor` callbacks and reserve the callback for assertions only.

## [Using ](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions)[`get*`](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions)[ variants as assertions](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions)

This one's not really a big deal actually, but I thought I'd mention it and give my opinion on it. If `get*` queries are unsuccessful in finding the element, they'll throw a really helpful error message that shows you the full DOM structure (with syntax highlighting) which will help you during debugging. Because of this, the assertion could never possibly fail (because the query will throw before the assertion has a chance to).

For this reason, many people skip the assertion. This really is fine honestly, but I personally normally keep the assertion in there just to communicate to readers of the code that it's not just an old query hanging around after a refactor but that I'm explicitly asserting that it exists.

Advice: If you want to assert that something exists, make that assertion explicit.

As maintainers of the testing library family of tools, we do our best to make APIs that lead people to use things as effectively as possible and where that falls short we try to document things correctly. But this can be really difficult (especially as APIs change/improve/etc). Hopefully this was helpful to you. We really just want to make you more successful at shipping your software with confidence.

Good luck!

![[rocket.bin]]

![[testing-trophy.bin]]

Written by Kent C. Dodds

Kent C. Dodds is a JavaScript software engineer and teacher. Kent's taught hundreds of thousands of people how to make the world a better place with quality software development tools and practices. He lives with his wife and four kids in Utah.

![](data:image/webp;base64,UklGRnYBAABXRUJQVlA4IGoBAABQDQCdASpkAEYAPqFAmki/tLEhMzbcA/AUCWMGcA0pf7GYDQbNZTqFw7jLssndjN/hhNnCMlCefxFjvC+TvoXvahLwSOJGlcly7zMuTXzT45cmV9pWeQGhIzUk7zxZhIpoCptxtReJ8itNr/pUHGmruIcmAP74h212HNtR2o627+W0FqM02NwxuNXufJzoWAy2fsnzGS6CHbax4te4kUzgXoS1I2aRyx3Fd7bwOi+ZzTN/tTtbefJThqEc0nRaLTnHvt/BPg3q9L0PVAGZGkYHu4nAcZsEmGEw58kRl42tpA7McKHhxMQB75nrtdeR++w2TuESeEah+m2MVQqu+oODneTELX2VvPoRgIEzX32uxXx27W7GV/K51R0OB/JJTCllKxRr3VFbawUnHWXztmiBZhiUAvOukaQczRgQp5+uLYqNj0MVUcWs9kGgd/Rkrct29z2PL+Xh7feAM9aCmf6EQMx4EZrMa5bcAA==)

[August 17th, 2020 — 12 min read](https://kentcdodds.com/blog/testing-implementation-details)

![](data:image/webp;base64,UklGRiYDAABXRUJQVlA4WAoAAAAgAAAAYwAASgAASUNDUDACAAAAAAIwQURCRQIQAABtbnRyUkdCIFhZWiAHzwAGAAMAAAAAAABhY3NwQVBQTAAAAABub25lAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUFEQkUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApjcHJ0AAAA/AAAADJkZXNjAAABMAAAAGt3dHB0AAABnAAAABRia3B0AAABsAAAABRyVFJDAAABxAAAAA5nVFJDAAAB1AAAAA5iVFJDAAAB5AAAAA5yWFlaAAAB9AAAABRnWFlaAAACCAAAABRiWFlaAAACHAAAABR0ZXh0AAAAAENvcHlyaWdodCAxOTk5IEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkAAAAZGVzYwAAAAAAAAARQWRvYmUgUkdCICgxOTk4KQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAAQIzAABjdXJ2AAAAAAAAAAECMwAAY3VydgAAAAAAAAABAjMAAFhZWiAAAAAAAACcGAAAT6UAAAT8WFlaIAAAAAAAADSNAACgLAAAD5VYWVogAAAAAAAAJjEAABAvAAC+nFZQOCDQAAAAMAgAnQEqZABLAD6dSJ1LP6uirKhVWnPwE4lnAM+gB829WDtr1ADO8o/8ijVQxWaLmLI0yeSmFy4CggudxBwGhrU5R1Swet5PtaAA/upK7r/I53s+o7xcJyNjK0XsCuoC7ArCbu9dPNJ/XZkm6bAlC4bQQHAF4DD6g1rrRYK8q233MB5Iypnb8lGzg/+Ap9qH8gQ+/F1lYGLNxEZJGSSeXVRIn92A5LOmCozpFBghR7BqKh0yaMRPGONwV+jC9YrTkSgMLUoAfrPPzZ4JUT+AAA==)

![](data:image/webp;base64,UklGRiYBAABXRUJQVlA4IBoBAADwDACdASpkAEgAPqE+mUi/pqIhMztpI/AUCWcAz9TUo/NGmOjLQeeGoceI0bMr+hYlbtE7ki7qvzMrY8kINfcxV/2MJfX7AZfwhCIsQZZ4qWIjkGFqHLaTW4Yxrq4hEuuZKWGcu1lCdXtHENcJ52CAAP7Wn7rdDv/dY/S6+/2u54df/Ml7Dz8ap/jItacd12b0MTK3+cqnAhU5r+oEnMiy4PF7alUHF2o/E8++SwcoiAQ10fmjXH0W4vAWxFWx1GfBzdb7gHYrgedfa+TqiAFBp0wVpe9io47g4movXusyV3OQAc7Zhs+nN39lHQk9+YRz18MMIJQ17ifGKdHHvT5zKMi3Bkq7FKGGcwp4mPTqNWySSdjBPoAAAAA=)