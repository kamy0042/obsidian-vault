---
Created: 2022-08-11T16:01:00
URL: https://web.dev/inp/
Tags: [topic/技術/パフォーマンス]
---
Interaction to Next Paint (INP) is an experimental metric that assesses [responsiveness](https://web.dev/user-centric-performance-metrics/#types-of-metrics). INP observes the latency of all interactions a user has made with the page, and reports a single value which all (or nearly all) interactions were below. A low INP means the page was consistently able to respond quickly to all—or the vast majority—of user interactions.

Chrome usage data shows that 90% of a user's time on a page is spent *after* it loads, Thus, careful measurement of responsiveness *throughout* the page lifecycle is important. This is what the INP metric assesses.

Good responsiveness means that a page responds quickly to interactions made with it. When a page responds to interactions, the changes in the user interface that result are *visual feedback* provided in the next frame the browser presents. Visual feedback tells us if, for example, an item we've asked to add to an online shopping cart is indeed being added, if a login form's contents are being authenticated by the server, whether a mobile menu has opened, and so on.

The goal of INP is to ensure the time from when a user initiates an interaction until the next frame is painted is as short as possible, for all or most interactions the user makes.

In the following video, the example on the right gives immediate visual feedback that an accordion is opening. It also demonstrates how poor responsiveness can cause multiple unintended responses to input because the user thinks the experience is broken.

![](https://storage.googleapis.com/web-dev-uploads/video/jL3OLOhcWUQDnR4XjewLBx4e3PC3/WSmcjiQC4lyLxGoES4dd.mp4)

An example of poor versus good responsiveness. At left, long tasks block the accordion from opening. This causes the user to click multiple times, thinking the experience is broken. When the main thread catches up, it processes the delayed inputs, resulting in the accordion opening and closing unexpectedly.

This article explains how INP works, how to measure it, and offers advice for improving it.

## What is INP? [#](https://web.dev/inp/#what-is-inp)

INP aims to represent a page's overall responsiveness by measuring all click, tap, and keyboard interactions made with a page. The longest of those observed interactions—with some exceptions noted below—is chosen as the page's INP value when the user is done with the page.

An *interaction* is a group of event handlers that fire during the same logical user gesture. For example, "tap" interactions on a touchscreen device include multiple events, such as `pointerup`, `pointerdown`, and `click`. An interaction can be driven by JavaScript, CSS, built-in browser controls (such as form elements), or a combination thereof.

An interaction's latency consists of the single longest [duration](https://w3c.github.io/event-timing/#ref-for-dom-performanceentry-duration%E2%91%A1:~:text=The%20Event%20Timing%20API%20exposes%20a%20duration%20value%2C%20which%20is%20meant%20to%20be%20the%20time%20from%20when%20user%20interaction%20occurs%20(estimated%20via%20the%20Event%27s%20timeStamp)%20to%20the%20next%20time%20the%20rendering%20of%20the%20Event%27s%20relevant%20global%20object%27s%20associated%20Document%E2%80%99s%20is%20updated) of a group of event handlers that drives the interaction, from the time the user begins the interaction to the moment the next frame is presented with visual feedback.

## What's a "good" INP value? [#](about:blank#what%27s-a-%22good%22-inp-value)

Pinning labels such as "good" or "poor" on a responsiveness metric is difficult. On one hand, you want to encourage development practices that prioritize good responsiveness. On the other hand, you must account for the fact that there's considerable variability in the capabilities of devices people use to set achievable development expectations.

To ensure you're delivering user experiences with good responsiveness, a good threshold to measure is the **75th percentile** of page loads recorded in the field, segmented across mobile and desktop devices:

- An INP below or at **200 milliseconds** means that your page has **good responsiveness**.
- An INP above **200 milliseconds** and below or at **500 milliseconds** means that your page's responsiveness **needs improvement**.
- An INP above **500 milliseconds** means that your page has **poor responsiveness**.

## What's in an interaction? [#](https://web.dev/inp/#what%27s-in-an-interaction)

![[Ng0j5yaGYZX9Bm3VQ70c.svg]]

The life of an interaction. An input delay occurs until event handlers begin running, which may be caused by factors such as long tasks on the main thread. The interaction's event handlers then run, and a delay occurs before the next frame is presented.

The primary driver of interactivity is often JavaScript, though browsers do provide interactivity through controls *not* powered by JavaScript, such as checkboxes, radio buttons, and controls powered by CSS.

As far as INP goes, **only the following interaction types are observed:**

- Clicking with a mouse.
- Tapping on a device with a touchscreen.
- Pressing a key on either a physical or onscreen keyboard.

Hovering and scrolling does not factor into INP. However, scrolling with the keyboard (space bar, page up, page down, and so forth) involves a keystroke, which may trigger other events that INP *does* measure. Any resulting scrolling is *not* factored into how INP is calculated.

Interactions may consist of two parts, each with multiple events. For example, a keystroke consists of the `keydown`, `keypress`, and `keyup` events. Tap interactions contain `pointerup` and `pointerdown` events. The event with the longest duration within the interaction is chosen as the interaction's latency.

![[vNosnKDYgBRnFmEvwm0c.svg]]

A depiction of an interaction with multiple event handlers. The first part of the interaction receives an input when the user clicks down on a mouse button. However, before they release the mouse button, a frame is presented. When the user releases the mouse button, another series of event handlers must run before the next frame is presented.

INP is calculated when the user leaves the page, resulting in a single value that is representative of the page's overall responsiveness throughout the entire page's lifecycle. **A low INP means that a page is reliably responsive to user input.**

## How is INP different from First Input Delay (FID)? [#](https://web.dev/inp/#how-is-inp-different-from-first-input-delay-(fid))

Where INP considers *all* page interactions, [First Input Delay (FID)](https://web.dev/fid/) only accounts for the *first* interaction. It also only measures the first interaction's *input delay*, not the time it takes to run event handlers, or the delay in presenting the next frame.

Given that FID is also a [load responsiveness metric](https://web.dev/user-centric-performance-metrics/#types-of-metrics), the rationale behind it is that if the first interaction made with a page in the loading phase has little to no perceptible input delay, the page has made a good first impression.

INP is more than about first impressions. By sampling all interactions, responsiveness can be assessed comprehensively, making INP a more reliable indicator of overall responsiveness than FID.

## What if no INP value is reported? [#](https://web.dev/inp/#what-if-no-inp-value-is-reported)

It's possible that a page can return no INP value. This can happen for a number of reasons:

- The page was loaded, but the user never clicked, tapped, or pressed a key on their keyboard.
- The page was loaded, but the user interacted with the page using gestures that did not involve clicking, tapping, or using the keyboard. For example, scrolling or hovering over elements does not factor into how INP is calculated.
- The page is being accessed by a bot such as a search crawler or headless browser that has not been scripted to interact with the page.

## How to measure INP [#](https://web.dev/inp/#how-to-measure-inp)

INP can be measured both in [the field](https://web.dev/lab-and-field-data-differences/#field-data) and in [the lab](https://web.dev/lab-and-field-data-differences/#lab-data) (with some effort) through a variety of tools.

The best way to measure your website's INP is by gathering metrics from actual users in the field. If you're accustomed to relying on lab data for assessing performance, take some time to read [Why lab and field data can be different (and what to do about it)](https://web.dev/lab-and-field-data-differences/).

### Field tools [#](https://web.dev/inp/#field-tools)

- [PageSpeed Insights](https://pagespeed.web.dev/).
- [Chrome User Experience Report (CrUX)](https://developer.chrome.com/docs/crux/).
    - Via BigQuery in the CrUX dataset's `experimental.interaction_to_next_paint` table.
    - CrUX API via `experimental_interaction_to_next_paint`.
    - CrUX Dashboard.
- [`web-vitals`](https://github.com/GoogleChrome/web-vitals/tree/next)[ JavaScript library](https://github.com/GoogleChrome/web-vitals/tree/next).

### Lab tools [#](https://web.dev/inp/#lab-tools)

- Lighthouse Panel in DevTools, available in "Timespan Mode".
- [Lighthouse npm module](https://www.npmjs.com/package/lighthouse).
- [Lighthouse User Flows](https://web.dev/lighthouse-user-flows/).
- [Web Vitals extension for Chrome](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma).

### Measure INP In JavaScript [#](https://web.dev/inp/#measure-inp-in-javascript)

Writing your own [`PerformanceObserver`](https://developer.mozilla.org/docs/Web/API/PerformanceObserver) to measure INP can be difficult. To measure INP in JavaScript, it's advised that you use the `web-vitals` JavaScript library, which exports an `onINP` function to do this work for you. At the moment, getting INP data is only possible in version 3 of `web-vitals`, currently in beta, which can be installed with the following command:

```plain text
npm install web-vitals@next --save
```

You can then get a page's INP by passing a function to the `onINP` method:

```plain text
import {onINP} from 'web-vitals';

onINP(({value}) => {
  // Log the value to the console, or send it to your analytics provider.
  console.log(value);
});
```

As with other methods exported by `web-vitals`, `onINP` accepts a function as an argument, and will pass metric data to the function you give it. From there, you can send that data to an endpoint for collection and analysis.

See the [`onINP()`](https://github.com/GoogleChrome/web-vitals/tree/next#oninp) reference documentation for additional usage instructions.

## How to improve INP [#](https://web.dev/inp/#how-to-improve-inp)

If your website is reporting INP values that fall outside of the "good" threshold, you'll naturally want to figure out what you can do to improve. High INP values are usually indicative of a high reliance on JavaScript, or other non-JavaScript main thread work that may run concurrently with user interactions.

### Improving INP during page startup [#](https://web.dev/inp/#improving-inp-during-page-startup)

INP can be a factor during page load, because users may attempt to interact with a page as it's fetching JavaScript to set up event handlers that provide the interactivity required for a page to work.

Per the HTTP Archive, [Total Blocking Time (TBT)](https://web.dev/tbt/) has [a much stronger correlation with INP than it does with FID](https://github.com/GoogleChromeLabs/chrome-http-archive-analysis/blob/main/notebooks/HTTP_Archive_TBT_and_INP.ipynb). TBT is a lab metric, but if you're observing high TBT values in lab tools, that could be a signal that higher INP values in the field will be observed.

To improve responsiveness during page load, look into the following solutions:

- Remove unused code using the [coverage tool](https://developer.chrome.com/docs/devtools/coverage/) in Chrome's DevTools.
- [Find code-splitting opportunities](https://web.dev/reduce-javascript-payloads-with-code-splitting/) so you can lazy load JavaScript not needed during page load. The coverage tool can help with this.
- [Identify slow third-party JavaScript](https://web.dev/identify-slow-third-party-javascript/) that you may be loading during startup.
- Use the performance profiler to find [long tasks](https://web.dev/long-tasks-devtools/) that you can optimize.
- Ensure you aren’t asking too much of the browser in terms of rendering work during startup. Avoid large component tree re-rendering, huge DOM sizes, large image decodes, computationally expensive [CSS animations](https://web.dev/animations-examples/), and so forth.

### Improving INP after page startup [#](https://web.dev/inp/#improving-inp-after-page-startup)

Because INP is calculated from inputs sampled during the entire page lifecycle, it's probable that your site's INP could be influenced by what happens *after* page startup. If that's the case for your website, here are a few areas to look into for solutions:

- Use the [`postTask`](https://github.com/WICG/scheduling-apis/blob/main/explainers/prioritized-post-task.md)[ API](https://github.com/WICG/scheduling-apis/blob/main/explainers/prioritized-post-task.md) to appropriately prioritize tasks.
- [Schedule non-essential work when the browser is idle](https://philipwalton.com/articles/idle-until-urgent/) with [`requestIdleCallback`](https://developer.mozilla.org/docs/Web/API/Window/requestIdleCallback).
- Use the performance profiler to assess discrete interactions (for example, toggling a mobile navigation menu) and find long tasks to optimize.
- Audit third-party JavaScript in your website to see if it's affecting page responsiveness.

## CHANGELOG [#](https://web.dev/inp/#changelog)

No changes have occurred to this metric since it has shipped. If changes occur, they will be noted in this [CHANGELOG](http://bit.ly/chrome-speed-metrics-changelog). If you have feedback for this metric, you can provide it in the [web-vitals-feedback Google group](https://groups.google.com/g/web-vitals-feedback).