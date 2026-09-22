---
URL: https://testing-library.com/docs/queries/about/#priority
Created: 2023-01-13T17:28:00
Tags: [topic/技術/テスト]
---
# About Queries

1. Queries that reflect the experience of visual/mouse users as well as those that use assistive technology.
    1. : This can be used to query every element that is exposed in the . With the option you can filter the returned elements by their . This should be your top preference for just about everything. There's not much you can't get with this (if you can't, it's possible your UI is inaccessible). Most often, this will be used with the `name` option like so: `getByRole('button', {name: /submit/i})`. Check the [list of roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles).
    2. `getByLabelText`: This method is really good for form fields. When navigating through a website form, users find elements using label text. This method emulates that behavior, so it should be your top preference.
    3. `getByPlaceholderText`: [A placeholder is not a substitute for a label](https://www.nngroup.com/articles/form-design-placeholders/). But if that's all you have, then it's better than alternatives.
    4. `getByText`: Outside of forms, text content is the main way users find elements. This method can be used to find non-interactive elements (like divs, spans, and paragraphs).
    5. `getByDisplayValue`: The current value of a form element can be useful when navigating a page with filled-in values.
2. **Semantic Queries** HTML5 and ARIA compliant selectors. Note that the user experience of interacting with these attributes varies greatly across browsers and assistive technology.
    6. `getByAltText`: If your element is one which supports `alt` text (`img`, `area`, `input`, and any custom element), then you can use this to find that element.
    7. `getByTitle`: The title attribute is not consistently read by screenreaders, and is not visible by default for sighted users
3. **Test IDs**
    8. `getByTestId`: The user cannot see (or hear) these, so this is only recommended for cases where you can't match by role or text or it doesn't make sense (e.g. the text is dynamic).

## Using Queries

The base queries from DOM Testing Library require you to pass a `container` as the first argument. Most framework-implementations of Testing Library provide a pre-bound version of these queries when you render your components with them which means you *do not have to provide a container*. In addition, if you just want to query `document.body` then you can use the [`screen`](https://testing-library.com/docs/queries/about/#screen) export as demonstrated below (using `screen` is recommended).

The primary argument to a query can be a *string*, *regular expression*, or *function*. There are also options to adjust how node text is parsed. See [TextMatch](https://testing-library.com/docs/queries/about/#textmatch) for documentation on what can be passed to a query.

Given the following DOM elements (which can be rendered by React, Vue, Angular, or plain HTML code):

You can use a query to find an element (byLabelText, in this case):

```plain text
import {screen, getByLabelText} from '@testing-library/dom'
// With screen:
const inputNode1 = screen.getByLabelText('Username')
// Without screen, you need to provide a container:
const container = document.querySelector('#app')
const inputNode2 = getByLabelText(container, 'Username')

```

### `queryOptions`

You can pass a `queryOptions` object with the query type. See the docs for each query type to see available options, e.g. [byRole API](https://testing-library.com/docs/queries/byrole#api).

### `screen`

All of the queries exported by DOM Testing Library accept a `container` as the first argument. Because querying the entire `document.body` is very common, DOM Testing Library also exports a `screen` object which has every query that is pre-bound to `document.body` (using the [`within`](https://testing-library.com/docs/dom-testing-library/api-within) functionality). Wrappers such as React Testing Library re-export `screen` so you can use it the same way.

Here's how you use it:

```plain text
import {screen} from '@testing-library/dom'
document.body.innerHTML = `
<label for="example">Example</label>
<input id="example" />
`
const exampleInput = screen.getByLabelText('Example')

```

> Note
> You need a global DOM environment to use `screen`. If you're using jest, with the [testEnvironment](https://jestjs.io/docs/en/configuration#testenvironment-string) set to `jsdom`, a global DOM environment will be available for you.
> 
> If you're loading your test with a `script` tag, make sure it comes after the `body`. An example can be seen [here](https://github.com/testing-library/dom-testing-library/issues/700#issuecomment-692218886).

## `TextMatch`

Most of the query APIs take a `TextMatch` as an argument, which means the argument can be either a *string*, *regex*, or a *function* of signature `(content?: string, element?: Element | null) => boolean` which returns `true` for a match and `false` for a mismatch.

### TextMatch Examples

Given the following HTML:

***Will***** find the div:**

```plain text
// Matching a string:
screen.getByText('Hello World') // full string match
screen.getByText('llo Worl', {exact: false}) // substring match
screen.getByText('hello world', {exact: false}) // ignore case
// Matching a regex:
screen.getByText(/World/) // substring match
screen.getByText(/world/i) // substring match, ignore case
screen.getByText(/^hello world$/i) // full string match, ignore case
screen.getByText(/Hello W?oRlD/i) // substring match, ignore case, searches for "hello world" or "hello orld"
// Matching with a custom function:
screen.getByText((content, element) => content.startsWith('Hello'))

```

***Will not***** find the div:**

```plain text
// full string does not match
screen.getByText('Goodbye World')
// case-sensitive regex with different case
screen.getByText(/hello world/)
// function looking for a span when it's actually a div:
screen.getByText((content, element) => {
return element.tagName.toLowerCase() === 'span' && content.startsWith('Hello')
})

```

### Precision

Queries that take a `TextMatch` also accept an object as the final argument that can contain options that affect the precision of string matching:

- `exact`: Defaults to `true`; matches full strings, case-sensitive. When false, matches substrings and is not case-sensitive.
    - `exact` has no effect on `regex` or `function` arguments.
    - In most cases using a regex instead of a string gives you more control over fuzzy matching and should be preferred over `{ exact: false }`.
- `normalizer`: An optional function which overrides normalization behavior. See [`Normalization`](https://testing-library.com/docs/queries/about/#normalization).

### Normalization

Before running any matching logic against text in the DOM, `DOM Testing Library` automatically normalizes that text. By default, normalization consists of trimming whitespace from the start and end of text, and collapsing multiple adjacent whitespace characters into a single space.

If you want to prevent that normalization, or provide alternative normalization (e.g. to remove Unicode control characters), you can provide a `normalizer` function in the options object. This function will be given a string and is expected to return a normalized version of that string.

> Note
> Specifying a value for `normalizer` *replaces* the built-in normalization, but you can call `getDefaultNormalizer` to obtain a built-in normalizer, either to adjust that normalization or to call it from your own normalizer.

`getDefaultNormalizer` takes an options object which allows the selection of behaviour:

- `trim`: Defaults to `true`. Trims leading and trailing whitespace
- `collapseWhitespace`: Defaults to `true`. Collapses inner whitespace (newlines, tabs, repeated spaces) into a single space.

### Normalization Examples

To perform a match against text without trimming:

To override normalization to remove some Unicode characters whilst keeping some (but not all) of the built-in normalization behavior:

## Debugging

### `screen.debug()`

For convenience screen also exposes a `debug` method in addition to the queries. This method is essentially a shortcut for `console.log(prettyDOM())`. It supports debugging the document, a single element, or an array of elements.

```plain text
import {screen} from '@testing-library/dom'
document.body.innerHTML = `
<button>test</button>
<span>multi-test</span>
<div>multi-test</div>
`
// debug document
screen.debug()
// debug single element
screen.debug(screen.getByText('test'))
// debug multiple elements
screen.debug(screen.getAllByText('multi-test'))

```

### `screen.logTestingPlaygroundURL()`

For debugging using [testing-playground](https://testing-playground.com/), screen exposes this convenient method which logs and returns a URL that can be opened in a browser.

```plain text
import {screen} from '@testing-library/dom'
document.body.innerHTML = `
<button>test</button>
<span>multi-test</span>
<div>multi-test</div>
`
// log entire document to testing-playground
screen.logTestingPlaygroundURL()
// log a single element
screen.logTestingPlaygroundURL(screen.getByText('test'))

```

## Manual Queries

On top of the queries provided by the testing library, you can use the regular [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)[ DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to query elements. Note that using this as an escape hatch to query by class or id is not recommended because they are invisible to the user. Use a testid if you have to, to make your intention to fall back to non-semantic queries clear and establish a stable API contract in the HTML.

```plain text
// @testing-library/react
const {container} = render(<MyComponent />)
const foo = container.querySelector('[data-foo="bar"]')

```

## Browser extension

Do you still have problems knowing how to use Testing Library queries?

There is a very cool Browser extension for [Chrome](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano/related) named Testing Playground, and it helps you find the best queries to select elements. It allows you to inspect the element hierarchies in the Browser's Developer Tools, and provides you with suggestions on how to select them, while encouraging good testing practices.

## Playground

If you want to get more familiar with these queries, you can try them out on [testing-playground.com](https://testing-playground.com/). Testing Playground is an interactive sandbox where you can run different queries against your own html, and get visual feedback matching the rules mentioned above.