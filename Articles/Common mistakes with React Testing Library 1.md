---
URL: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
Created: 2022-02-15T20:58:00
Tags: [topic/技術/テスト]
---
![[photo-1555861496-0666c8981751 1.bin]]

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

```plain text
const wrapper = render(<Example prop="1" />)
wrapper.rerender(<Example prop="2" />)

const {rerender} = render(<Example prop="1" />)
rerender(<Example prop="2" />)

```

The name `wrapper` is old cruft from `enzyme` and we don't need that here. The return value from `render` is not "wrapping" anything. It's simply a collection of utilities that (thanks to the next thing) you should actually not often need anyway.

Advice: destructure what you need from `render` or call it `view`.

```plain text
import {render, screen, cleanup} from '@testing-library/react'


import {render, screen} from '@testing-library/react'

```

For a long time now `cleanup` happens automatically (supported for most major testing frameworks) and you no longer need to worry about it. [Learn more](https://testing-library.com/docs/react-testing-library/api#cleanup).

Advice: don't use `cleanup`

```plain text
const {getByRole} = render(<Example />)

```

`screen` [was added in DOM Testing Library v6.11.0](https://github.com/testing-library/dom-testing-library/releases/tag/v6.11.0) (which means you should have access to it in `@testing-library/react@>=9`). It comes from the same `import` statement you get `render` from:

```plain text
import {render, screen} from '@testing-library/react'

```

The benefit of using `screen` is you no longer need to keep the `render` call destructure up-to-date as you add/remove the queries you need. You only need to type `screen.` and let your editor's magic autocomplete take care of the rest.

The only exception to this is if you're setting the `container` or `baseElement` which you probably should avoid doing (I honestly can't think of a legitimate use case for those options anymore and they only exist for historical reasons at this point).

You can also call [`screen.debug`](https://testing-library.com/docs/dom-testing-library/api-queries#screendebug) instead of `debug`

Advice: use `screen` for querying and debugging.

```plain text
const button = screen.getByRole('button', {name: /disabled button/i})

expect(button.disabled).toBe(true)

```

That `toBeDisabled` assertion comes from [`jest-dom`](https://github.com/testing-library/jest-dom). It's strongly recommended to use `jest-dom` because the error messages you get with it are much better.

Advice: install and use [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom#tobedisabled)**

```plain text
const input = screen.getByRole('textbox', {name: /choose a fruit/i})

const input = screen.getByRole('textbox', {name: /choose a fruit/i})

```

I see people wrapping things in `act` like this because they see these "act" warnings all the time and are just desperately trying anything they can to get them to go away, but what they don't know is that `render` and `fireEvent` are already wrapped in `act`! So those are doing nothing useful.

Most of the time, if you're seeing an `act` warning, it's not just something to be silenced, but it's actually telling you that something unexpected is happening in your test. You can learn more about this from my blog post (and videos): [Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning).

Advice: Learn when `act` is necessary and don't wrap things in `act` unnecessarily.

```plain text
screen.getByRole('textbox', {name: /username/i})

```

We maintain a page called ["Which query should I use?"](https://testing-library.com/docs/guide-which-query) of the queries you should attempt to use in the order you should attempt to use them. If your goal is aligned with ours of having tests that give you confidence that your app will work when your users use them, then you'll want to query the DOM as closely to the way your end-users do so as possible. The queries we provide will help you to do this, but not all queries are created equally.

As a sub-section of "Using the wrong query" I want to talk about querying on the `container` directly.

```plain text
const {container} = render(<Example />)
const button = container.querySelector('.btn-primary')
expect(button).toHaveTextContent(/click me/i)

screen.getByRole('button', {name: /click me/i})

```

We want to ensure that your users can interact with your UI and if you query around using `querySelector` we lose a lot of that confidence, the test is harder to read, and it will break more frequently. This goes hand-in-hand with the next sub-section:

As a sub-section of "Using the wrong query", I want to talk about why I recommend you query by the *actual* text (in the case of localization, I recommend the default locale), rather than using test IDs or other mechanisms everywhere.

```plain text
screen.getByRole('button', {name: /submit/i})

```

If you don't query by the actual text, then you have to do extra work to make sure that your translations are getting applied correctly. The biggest complaint I hear about this is that it leads to content writers breaking your tests. My rebuttal to that is that first, if a content writer changes "Username" to "Email" that's a change I definitely want to know about (because I'll need to change my implementation). Also, if there is a situation where they break something, fixing that issue takes no time at all. It's easy to triage and easy to fix.

So the cost is pretty low, and the benefit is you get increased confidence that your translations are applied correctly *and* your tests are easier to write and read.

I should mention that not everyone agrees with me on this, feel free to read more about it [in this tweet thread](https://twitter.com/kentcdodds/status/1203179007644012544).

As a sub-section of "Using the wrong query" I want to talk about `*ByRole`. In recent versions, the `*ByRole` queries have been seriously improved (primarily thanks to great work by [Sebastian Silbermann](https://twitter.com/sebsilbermann)) and are now the number one recommended approach to query your component's output. Here are some of my favorite features.

The `name` option allows you to query elements by their ["Accessible Name"](https://www.w3.org/TR/accname-1.1/) which is what screen readers will read for the element *and* it works even if your element has its text content split up by different elements. For example:

```plain text
screen.getByText(/hello world/i)

screen.getByRole('button', {name: /hello world/i})

```

One reason people don't use `*ByRole` queries is because they're not familiar with the implicit roles placed on elements. [Here's a list of Roles on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles). So another one of my favorite features of the `*ByRole` queries is that if we're unable to find an element with the role you've specified, not only will we log the entire DOM to you like we do with normal `get*` or `find*` variants, but we also log all the available roles you can query by!

This will fail with the following error message:

```plain text
TestingLibraryElementError: Unable to find an accessible element with the role "blah"

Here are the accessible roles:

```

Notice that we didn't have to add the `role=button` to our button for it to have the role of button. That's an implicit role, which leads us perfectly into our next one...

Advice: Read and follow the recommendations [The "Which Query Should I Use" Guide](https://testing-library.com/docs/guide-which-query).**

```plain text
render(<button role="button">Click me</button>)

```

Slapping accessibility attributes willy nilly is not only unnecessary (as in the case above), but it can also confuse screen readers and their users. The accessibility attributes should really only be used when semantic HTML doesn't satisfy your use case (like if you're building a non-native UI that you want to make accessible [like an autocomplete](https://github.com/downshift-js/downshift)). If that's what you're building, be sure to use an existing library that does this accessibly or follow the WAI-ARIA practices. They often have [great examples](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html).

Note: to make `input`s accessible via a "role" you'll want to specify the `type` attribute!

Advice: Avoid adding unnecessary or incorrect accessibility attributes.

```plain text
fireEvent.change(input, {target: {value: 'hello world'}})

```

[`@testing-library/user-event`](https://github.com/testing-library/user-event) is a package that's built on top of `fireEvent`, but it provides several methods that resemble the user interactions more closely. In the example above, `fireEvent.change` will simply trigger a single change event on the input. However the `type` call, will trigger `keyDown`, `keyPress`, and `keyUp` events for each character as well. It's much closer to the user's actual interactions. This has the benefit of working well with libraries that you may use which don't actually listen for the change event.

We're still working on `@testing-library/user-event` to ensure that it delivers what it promises: firing all the same events the user would fire when performing a specific action. I don't think we're quite there yet and this is why it's not baked-into `@testing-library/dom` (though it may be at some point in the future). However, I'm confident enough in it to recommend you give it a look and use it's utilities over `fireEvent`.

Advice: Use `@testing-library/user-event` over `fireEvent` where possible.

The *only* reason the `query*` variant of the queries is exposed is for you to have a function you can call which does not throw an error if no element is found to match the query (it returns `null` if no element is found). The *only* reason this is useful is to verify that an element is not rendered to the page. The reason this is so important is because the `get*` and `find*` variants will throw an extremely helpful error if no element is found–it prints out the whole document so you can see what's rendered and maybe why your query failed to find what you were looking for. Whereas `query*` will only return `null` and the best `toBeInTheDocument` can do is say: "null isn't in the document" which is not very helpful.

Advice: Only use the `query*` variants for asserting that an element cannot be found.

```plain text
const submitButton = await waitFor(() =>
  screen.getByRole('button', {name: /submit/i}),

const submitButton = await screen.findByRole('button', {name: /submit/i})

```

Those two bits of code are basically equivalent (`find*` queries use `waitFor` under the hood), but the second is simpler and the error message you get will be better.

Advice: use `find*` any time you want to query for something that may not be available right away.

```plain text
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('foo'))

```

The purpose of `waitFor` is to allow you to wait for a specific thing to happen. If you pass an empty callback it *might* work today because all you need to wait for is "one tick of the event loop" thanks to the way your mocks work. But you'll be left with a fragile test which could easily fail if you refactor your async logic.

Advice: wait for a specific assertion inside `waitFor`.

```plain text
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('foo'))

```

Let's say that for the example above, `window.fetch` was called twice. So the `waitFor` call will fail, however, we'll have to wait for the timeout before we see that test failure. By putting a single assertion in there, we can both wait for the UI to settle to the state we want to assert on, and also fail faster if one of the assertions do end up failing.

Advice: only put one assertion in a callback.

`waitFor` is intended for things that have a non-deterministic amount of time between the action you performed and the assertion passing. Because of this, the callback can be called (or checked for errors) a non-deterministic number of times and frequency (it's called both on an interval as well as when there are DOM mutations). So this means that your side-effect could run multiple times!

This also means that you can't use snapshot assertions within `waitFor`. If you do want to use a snapshot assertion, then first wait for a specific assertion, and then after that you can take your snapshot.

Advice: put side-effects outside `waitFor` callbacks and reserve the callback for assertions only.

```plain text
screen.getByRole('alert', {name: /error/i})

expect(screen.getByRole('alert', {name: /error/i})).toBeInTheDocument()

```

This one's not really a big deal actually, but I thought I'd mention it and give my opinion on it. If `get*` queries are unsuccessful in finding the element, they'll throw a really helpful error message that shows you the full DOM structure (with syntax highlighting) which will help you during debugging. Because of this, the assertion could never possibly fail (because the query will throw before the assertion has a chance to).

For this reason, many people skip the assertion. This really is fine honestly, but I personally normally keep the assertion in there just to communicate to readers of the code that it's not just an old query hanging around after a refactor but that I'm explicitly asserting that it exists.

Advice: If you want to assert that something exists, make that assertion explicit.

As maintainers of the testing library family of tools, we do our best to make APIs that lead people to use things as effectively as possible and where that falls short we try to document things correctly. But this can be really difficult (especially as APIs change/improve/etc). Hopefully this was helpful to you. We really just want to make you more successful at shipping your software with confidence.

Good luck!

![[profile-transparent.bin]]

Kent C. Dodds is a JavaScript software engineer and teacher. He's Co-Founder and Director of Developer Experience at Remix! Kent's taught hundreds of thousands of people how to make the world a better place with quality software development tools and practices. He lives with his wife and four kids in Utah.

![](data:image/webp;base64,UklGRgIBAABXRUJQVlA4IPYAAAAwCACdASpkAEMAPp1Kn0wsL6aiJJZqIfATiWUAyfSSgEc/GtT0mHKdzHFLl3LiEpsZRLNOBmqxnXaeaEKRhCTa4qdPXztUj3OQAAD+71Ev/6tD/+QZ//IM/aR/2p87fCg/zbiOendFqmjcLvFs1XKBG2LnlMO8i4JGnXqU2LbV1AdRG3n4LGiPD1M13AHcj8foCIYljpkQ23VEwS90Uu5o4oJhKgDzE8P/CtmRPahoXVponQRTLHexVS42NzUeoleskN5k5hTEbFkmQhDbTzbbB7fx/e5R4lPhc+xfSGP9nTUHJcXnqHxkyj+XbqYfiIm/ST8kAAA=)

![](data:image/webp;base64,UklGRvoDAABXRUJQVlA4WAoAAAAgAAAAYwAAQQAASUNDUDACAAAAAAIwQURCRQIQAABtbnRyUkdCIFhZWiAHzwAGAAMAAAAAAABhY3NwQVBQTAAAAABub25lAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUFEQkUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApjcHJ0AAAA/AAAADJkZXNjAAABMAAAAGt3dHB0AAABnAAAABRia3B0AAABsAAAABRyVFJDAAABxAAAAA5nVFJDAAAB1AAAAA5iVFJDAAAB5AAAAA5yWFlaAAAB9AAAABRnWFlaAAACCAAAABRiWFlaAAACHAAAABR0ZXh0AAAAAENvcHlyaWdodCAxOTk5IEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkAAAAZGVzYwAAAAAAAAARQWRvYmUgUkdCICgxOTk4KQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAAQIzAABjdXJ2AAAAAAAAAAECMwAAY3VydgAAAAAAAAABAjMAAFhZWiAAAAAAAACcGAAAT6UAAAT8WFlaIAAAAAAAADSNAACgLAAAD5VYWVogAAAAAAAAJjEAABAvAAC+nFZQOEykAQAAL2NAEAAXoCBtAxbtT0yapmCXSCBpi7f98x/Edf8Aydn2phFIZE+K7zMF9rHEh+Ts7ZT7GOlnn2IfE5f/nzlBRP8ZuJHihoTheodHNP/y7bevlVf1rcwCUkz7PURFe602QGSVBjbs+dl0UmAnsZkqxVZ8DbmF5u15gicDgEUPwMEbKLbiawI942UGxoERDW8e7mVnnDgMQAhxvQAY2LxdY4xPg5FrOeIVNrksbMdveIqbBAPVsqcXk6wkAIXsd+wBTnhm+nAzxq5+Q1hK4MQh5FgNdvsqzp5i3pA9WOCVCxmoKnptCzxm7Bn4kIuzLMrMy4ixgkdRfHcs7EuOQhwPT3I85XBSDCAxUIAE8MUdCYrvcixBXBzE8PntrXzxCJJCgyrFmkH9jjoGLlYgfDn3GWpgzs8WGcs5E+xLCg1XgivWPkg9YMJSDvQn1P2y0s1x6CZPFU/e7RlQFHryGTaH4dDs4fKeDqqufY/igQBj09ZR+PiW13suuFkqW3ZtI3DMVRBZWw0bNvEYeybT7+E3YwHdNXyQtoTZYBg6LtxP8KBqiG4A)

![](data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAACQBwCdASpkAEMAPp1Mn0uwrCohpZVaMhATiWkA0BgFV57BMt/OzkRLfe9NPqklHRYhx/MuLe61AJuqT7kNVfar7NzxFVQA/vW0AXamFg6MxefAoBGe76Csx8zJYOJwFbzxOX4TueMS5GpuL2wTsVH/ltlN/COStXAK0w5Y1bMjEH8lAqD7/ZXSJIzCv+d5m7sxZfDcUApl09nxGpv2aKUKyN6Dt75BBAAAAA==)