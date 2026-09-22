---
Created: 2022-01-11T14:16:00
URL: https://medium.com/@matthew.costello/frontend-web-performance-the-essentials-0-61fea500b180
Tags: [topic/技術/パフォーマンス]
---
![[1BK3PHVbfaONNdaqvy0mEDQ.png]]

[Less is more](https://unsplash.com/photos/fum5PsUHyt4)

Device displays run at a certain number of frame per second. Browsers try to match this rate for a smooth user-experience. To output a new frame to the display, the browser must first complete its ‘rendering cycle’ or ‘pixel pipeline’.

The majority of devices run at 60 FPS. This allows for around a 16ms window to complete the rendering cycle, per frame. Increased FPS means even smaller frame budgets; 120 FPS requires no more than 8ms spent per frame.

To make matters worse, browsers generally add some extra overhead and can take up to 4ms away from the frame budget; more realistically we end up with around a 12ms budget to reach 60 FPS. At 120 FPS that’s just 4ms per frame!

**If the browser is unable to meet the frame budget, frames get ‘dropped’**, meaning it is outputting frames at a lower rate than the screen’s refresh rate. This leads to unsmooth motion, jitter, judder, or ‘jank’: **a bad user-experience**, particulary if it is happening consistently.

A solid understanding of the rendering cycle, and how you can analyse it with available tools, will allow you to minimise the work necessary to deliver frames – essential for a performant frontend in browsers.

# Contents

- The Rendering Cycle
- Layout Bad, Composite Good
- The Secret Sauce
- Too Much of a Good Thing
- Test, Test, Test
- Putting It All Together
- More Resources

# The Rendering Cycle 🔁

![[0DLbVQYU3MX7tAOhZ.jpg]]

[The rendering cycle](https://developers.google.com/web/fundamentals/performance/rendering)

Above are each of the stages which *may *be proccessed in the rendering cycle of a frame.

A quick overview of the cycle stages:

## **JS/CSS Animation:**

Some JS or a CSS animation causes a visual change, kicking off the rendering cycle.

## **Style:**

Matching then applying new CSS selectors & rules to DOM elements.

## **Layout:**

Calculating the new geometry of DOM elements.

## **Paint:**

Draws, or fills in, the new pixels for different areas of the page.

## **Composite:**

Combine all the individually painted layers together, ready to display.

Importantly, **the number stages necessary to run, and by extension the time to complete the rendering cycle for a frame, depend on what element properties are being changed**. Different properties can often be utilised to create the same visual effect – however some can be much more expensive to render.

Properties can be grouped into layout, paint, and composite properties. Spoiler: composite properties are the cheapest.

# Layout Bad, Composite Good 📢

Changing layout properties will trigger Layout. These are generally any properties relating to position or size, take for example an element’s width, height, or left/top/right/bottom values. If you change a Layout property, know that the maximum rendering cycle will be necessary; all of the above stages will need to run before the frame is completed.

Aditionally, Layout calculations are generally much more costly to process than the other stages. Layout performance is proportional to the size of the DOM, and how close layouts need to be recalculated from the DOM tree root. In the worst case, this is the root – the Document element.

**Regularly changing Layout properties should be avoided where possible, particularly with animations.**

Next up, we have paint properties, which have no impact on the layout of the page, thus the Layout stage will be skipped. Take for example an element’s colour or background image. Different paint properties have varying levels of processing time/performance. Though usually faster than Layout, paint speeds can be improved by minimising repaint area, a topic we will return to soon.

![[0J3a2iTyob8EQq8pC.jpg]]

[Render cycle for a changed ‘paint property’ — Layout is skipped](https://developers.google.com/web/fundamentals/performance/rendering)

Last and least (time-to-render) are the composite properties. These *can be (and usually are)* rendered without needing Layout or Paint, giving the minimal and cheapest rendering cycle! Composite properties utilise hardware acceleration (the GPU) to do all the heavy-lifting, helping you deliver lightning-fast frames. This is very useful for choke points relating to animations and scrolling. There is a catch, but we will get to that later.

![[0HOi12ZBWi8pX0gGE.jpg]]

![[0HOi12ZBWi8pX0gGE 1.jpg]]

[Render cycle for a changed ‘composite property’ — Layout & Paint can be skipped](https://developers.google.com/web/fundamentals/performance/rendering)

The composite properties are:

Any combination of translating, scaling, rotating and skewing an element.

The transparency of an element.

Any combination of blur, contrast, grayscale, hue-rotation and drop-shadow effects.

While it is not feasible to only get the minimal, composite-only rendering cycle each frame, there are often cases where you can swap out slower properties, whilst still creating the same or a similar visual effect. You can accomplish a suprising amount with just these three properties.

Finally, an important concept which will enable you to get the most out of compostite properties: layers.

![[0DZs1plzSxAyhDG9w.jpg]]

![[0DZs1plzSxAyhDG9w 1.jpg]]

[Compositor layers](https://developers.google.com/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas)

# The Secret Sauce ✨

Layers, or compositor layers, are effectively DOM elements that have been ‘promoted’ by the browser to have their own individual painting area.

A layer that is on top of other page content, when changed visually, only requires the repainting of itself — not the content underneath. Good layer usage minimises paint areas, which equals faster painting. **The browser will automatically manage the promotion and demotion of DOM elements to and from layers**, to improve perfomance. This occurs by its own set of criteria — for example, if the DOM element (in simpler terms):

> - has 3D or perspective transform CSS properties
> - is used by <video> element using accelerated video decoding
> - is used by a <canvas> element with a 3D context or accelerated 2D context
> - is used for a composited plugin
> - uses a CSS animation for its opacity or uses an animated webkit transform
> - uses accelerated CSS filters
> - has a descendant that is a compositing layer
> - has a sibling with a lower z-index which has a compositing layer (in other words the layer overlaps a composited layer and should be rendered on top of it)

Only a promoted element can make use of GPU acceleration. **If the browser doesn’t promote an element, changing composite properties will still incur an extra paint stage as part of the rendering cycle**.

Generally, individual changes of a composite property such as transform would not result in the browser promoting a layer. However, animating a composite property would result in the browser promoting the element at the start of the animation, before demoting it again on completion. Layer promotion and demotion is not free.

**The CSS property ‘**[**will-change**](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)**’ can be used to hint to the browser that an element should get promoted to its own layer**. I.e, ‘will-change: transform’.

This makes changing composite properties next to free as they will always use the minimal rendering cycle/GPU acceleration, including individual changes of composite properties. The element will remain promoted, meaning the browser no longer needs to promote/demote for animations or other criteria.

With the right combination of composite properties and ‘will-change’, it’s very possible to create a dynamic page that requires little to no Paint or Layout events post-load.

# Too Much of a Good Thing 🤔

Promoting layers can be a bit of a balancing act. **Take care not to create an excessive amount of layers**, otherwise the rendering cycle performance can actually be harmed — with the browser having to manage and update too much layer state, and with additional GPU VRAM usage. This is the reason why browsers do not automatically just promote every element; ‘will-change’ should only be used in cases where you can actually save unnecessary paints — without overloading the browser.

You should also be wary of triggering a ‘layer explosion’ — when promoting one layer with ‘will-change’ unintentionally causes many more to be promoted due to the browser’s automatic criteria (usually related to siblings and z-indexes).

# Test, Test, Test 🔎

When implementing rendering cycle improvements, it’s important to:

- Identify where improvements can be made
- Analyse and verify how your changes impacted the rendering cycle

Thankfully, Chrome’s DevTools (accessed via F12) make it easy to investigate paint and layout costs, and layers:

## The Performance Profiler

The Performance Profiler (accessed via the Performance tab) allows you to record any interaction with your application over some time duration. After completing a recording, this information is presented in the form of a timeline, detailing every event, rendering cycle stage, function calls, etc, for every frame.

![](https://miro.medium.com/proxy/0*ANZutdH4gcHAjR9_)

[Performance Profiler](https://developer.chrome.com/docs/devtools/evaluate-performance/)

Zooming into an individual frame **will let you see each of the individual rendering cycle stages occurring**, such as Layout. You can look for cycle stages running too often, for too long, or where you aren’t expecting any, and for red (dropped) frames — then look for the causes. The ‘Summary’ tab pie chart will give you general information about which stages are taking the most time to execute.

Good-to-knows:

- Clicking on cycle events such as Layout or Paint will give you more detailed information about their extent and causes
- Running the profiler always incurs some overhead, the time you see for execution would be a tiny bit faster normally — disabling JavaScript samples will reduce this (but then you won’t see detailed JS)
- You can throttle your CPU or network to experience/test how your application performs in worse conditions, in order to create a more inclusive application for all users
- Enabling screenshots can help you visualise exactly what was going on in the application at a specific frame
- The ‘Update Layer Tree’ event is the browser managing the state of all the layers — if this is taking too long, you may have too many layers or too large of a DOM

## The Rendering Drawer

One way to open the Rendering Drawer is through pressing *Ctrl/Cmd+Shift+P*, then search for ‘rendering’ and open the ‘Show Rendering’ result. There are a whole lot of useful utilities packed in here, which can be very helpful in quickly finding problems before delving deeper into the performance profiler to figure out what is going wrong.

![[0HghPwo5qPJNlASLS.png]]

![[0HghPwo5qPJNlASLS 1.png]]

[Rendering Drawer](https://developers.google.com/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas)

**The ‘Paint flashing’ checkbox will show which areas of the page are being repainted during Paint, and when.** This is useful for identifying if you are painting more often than necessary, or in unecessary areas. You can use this tool to check if you have successfully removed some excessive painting through promoting an element with ‘will-change’.

**‘Layout Shift Regions’ will show areas that have shifting layouts**, which you also want to avoid. Use this tool to verify that you have removed unnecessary Layouts, or to identity where layout shifts are occurring.

**‘Layer borders’ will visualise the actual compositor layers **being used on the page, very useful for investigating if your elements are being promoted to layers as expected. [Differently coloured borders have specific meanings](https://source.chromium.org/chromium/chromium/src/+/main:cc/debug/debug_colors.cc;l=16).

Finally, ‘Frame Rendering Stats’ and ‘Scrolling performance issues’ may also be useful, with a real-time framerate indicator and simple scrolling performance insights, relatively.

## The Layers Panel

The Layers Panel can be accessed at the end of the DevTools top navigation. This will give you an interactive 3D view of all the layers on the page. On selecting a layer, you will see information about:

- Why the element was promoted to a layer (i.e. ‘will-change’ or other criteria)
- Layer memory estimation
- Layer dimensions
- Number of times it has been painted

![[0rTb-CGD70GQp0FLK.png]]

![[0rTb-CGD70GQp0FLK 1.png]]

[Layers Panel](https://blog.logrocket.com/eliminate-content-repaints-with-the-new-layers-panel-in-chrome-e2c306d4d752/)

# Putting It All Together 👩‍💻

Here we will examine the use-case of implementing an animated gradient loading placeholder — how the worst possible performance can be transformed into the best, through utilising available tools and knowledge of the rendering cycle.

![[1N3Wg87dPnAQn1Kfj5ifY_Q.gif]]

[Animated gradient loading placeholder](https://github.com/ngneat/content-loader)

Typically this is done through overlaying shapes over an animated background — for simplicity, we’ll only consider the background.

## 1: The Layout Implementation

[See the code and preview on Codepen.](https://codepen.io/mttrx/pen/rNGzdKo) ***Note that Codepen runs the code inside of an iframe, which will have its own separate Performance Profiler timeline to expand. Also Render Draw tools do not work within iframes — you will need to run the code locally if you want to test them.***

If you wanted to treat your users with the worst *loading-placeholder-animated-gradient-background-experience* possible, this is how!

Here, there is a div filled with a gradient, with an animation on the left property in order to move it side-to-side. **‘Left’ is a layout property**; this results in the slowest rendering cycle running every frame, with Layout and Paint.

Here’s how each frame’s rendering cycle in the profiler looks:

![[1Z3MjF6deaBiSfgrUmEzqrA.png]]

![[1Z3MjF6deaBiSfgrUmEzqrA 1.png]]

A full rendering cycle visible in the profiler

Notice that red line above indicates layout shift is occurring. With ‘Layout Shift Regions’ enabled, notice that the gradient is constantly highlighted in purple — it is causing a layout shift every frame:

![[1csiQOw-ens9uIwjc3ju8YA.png]]

![[1csiQOw-ens9uIwjc3ju8YA 1.png]]

‘Layout Shift Regions’ flashing

And finally, here’s the total time spent across the rendering cycle — this will be useful to compare to the next versions.

![[1exqWlW2nOU_mWf44iX6bXA.png]]

Rendering cycle work distribution pie chart

Despite running Layout every frame, it’s unlikely that it’s actually slowing down the browser enough to impact your framerate. I’ve throttled my CPU to make it more noticeable. Keep in mind that this is a *very *minimal example; the Layout here is very fast, as there really isn’t much geometry necessary to be calculated. **With a real, complex application, a larger DOM, multiple elements simultaneously requiring Layout, amongst other events going on, you will start to see a real impact — especially with lower-end devices.**

## 2: The Paint Implementation

Certainly an improvement, instead of animating ‘left’, ‘background-position’ — **a paint property **— is used instead.

Notice that now the profiler shows rendering cycles without Layout, and no more red indicating layout shifts:

![[1fVlu3wl7IYNQnUkKLCJUWg.png]]

![[1fVlu3wl7IYNQnUkKLCJUWg 1.png]]

A rendering cycle, skipping Layout, visible in the profiler

‘Layout Shift Regions’ will no longer flash purple, but instead with ‘Paint flashing enabled’ we will see the whole area is constantly green, it is repainting every frame:

![[1sLYf1b6okPHqgME3ELRvVg.png]]

![[1sLYf1b6okPHqgME3ELRvVg 1.png]]

‘Paint flashing’ flashing

Rendering time has now been improved through removing Layouts (though still the largest, as this includes the ‘Recalculate Style’ stage, which must run every frame), and painting is the same:

Rendering cycle work distribution pie chart

## 3: The Composite Implementation

With this implementation, we longer have any Paint or Layout stages running.

The performance profiler is now empty! And so is the summary!

Rendering cycle work distribution pie chart

Neither ‘paint flashing’ or ‘Layout shift regions’ will trigger any flashes. **The browser has automatically promoted the element to a layer (due to an animated composite property)**, running the minimal rendering cycle with hardware acceleration — using **‘will-change’ here is not necessary**. It could be useful if you were frequently toggling this animation on and off, or using JS to apply the animation manually each frame, however. With ‘Layer borders’ enabled, you can see the orange outline:

![[1OWKh3V6TdzJ185aoR00AWQ.png]]

Gradient element layer border (orange)

**Three separate implementations for the same visual effect — yet the last takes drastically less effort for browsers to render. **While this was a very simple example, the benefits only increase for real, complex applications.

Thanks for reading, and stay tuned for Frontend Web Performance: The Essentials [1]!

# More Resources 📚

Checkout these resources for more on GPU-acceleration and layers: [[0]](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count), [[1]](https://developers.google.com/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas), [[2]](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/), [[3]](https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome), in increasing levels of complexity.

**How can you know which CSS properties will trigger Layout or Paint? **[**See this table**](https://csstriggers.com/)**.**

[See this list](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) to see what JS properties/methods may trigger Layout.