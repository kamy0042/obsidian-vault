---

Tags: [topic/技術/HTML]
---
[https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html](https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html)

![](https://adrianroselli.com/wp-content/uploads/2011/01/HTML5_Logo1.png)

I figured I would state the entire argument in the title. After all, as of this writing and the last seven-plus years, the statement is accurate as far as the browsers are concerned.

I am penning this as sort of a follow-up to my post from 2013, [The Truth about “The Truth About Multiple H1 Tags”](https://adrianroselli.com/2013/12/the-truth-about-truth-about-multiple-h1.html). Even after that post helped kick off an update to the W3C HTML5 specification, it is not reflected in current tutorials and informative pieces.

## Bad Information Persists

The appeal of ignoring heading levels for developers and authors is pretty compelling when you do not know how or where that content will appear (or it appears in many different locations). In particular, the all-`<h1>` approach appeals to many for its simplicity.

It makes sense why a developer might see this advice, or hear about it through [misinformed articles](http://webdesign.tutsplus.com/articles/the-truth-about-multiple-h1-tags-in-the-html5-era--webdesign-16824), and never look back. This advice is a free pass. Many content authors don’t even know *where* their content will appear, making an all-`<h1>` approach feel like the safe approach.

Unfortunately, despite all the activity in the standards world along with the lack of activity on the part of the browsers, many developers continue to be unaware that this imparts no benefits to users and even harms many of those users. I run into this repeatedly when I answer [questions on Stack Overflow](http://stackoverflow.com/questions/38448811/is-it-semantically-correct-to-use-h1-in-a-dialog/38467898#comment64346101_38467898), when I talk to developers in real life, and even from generally trusted outlets:

> 
> This was part of the spec, and it was “revoked”, which is not a nice thing to do. And it was revoked not because they considered that it was a bad idea, but because of screen readers not implementing it correctly.
> 
> [Author comment on “A few HTML tips” at Mozilla Hacks](https://hacks.mozilla.org/2016/08/a-few-html-tips/comment-page-1/#comment-20156)

This is a common position, captured succinctly in this one example.

Disregarding the fact that it was never part of the final W3C spec, that the spec had a warning for three years, that nobody considered the algorithm a bad idea, that screen readers had nothing to do with it, and that browsers not implementing it is different from correctly implementing it, there is one statement that belies the issue at hand.

Not a nice thing to do is a value judgment. It presumes that the specification’s primary benefactors are developers when [in reality it is about users](https://www.w3.org/TR/html-design-principles/#priority-of-constituencies). It also presumes that it is acceptable to give developers advice (that harms some users) that has never been supported.

Like it or not, browsers are not moving on this feature and citing the purely theoretical document outline does nothing to move it forward. We as developers need to resolve this while still making it easy for content authors.

### Update: February 13, 2017

There is a new issue opened against the W3C specification to try to understand how the outline algorithm is supposed to work so a polyfill can be created. This is sometimes a first step to getting support built into browsers. Read more at the issue, [Update outline algorithm #794](https://github.com/w3c/html/issues/794).

## One Alternative (in Two Parts)

The average web developer would rather not have to think about mapping the appropriate heading level for every potential re-use of content. Authors should not have to think about it at all.

### Server Side

Way back in the early oughts (actually, 1999–2000) I wrote a CMS (Content Management System) based on delimited text files. It was a lark. I wanted to teach myself some programming skills and my brother needed a mini-CMS while he was overseas.

I quickly ran into the heading issue that HTML5 tried to solve — sometimes his content would be re-used elsewhere in the layout, and the headings would not make sense anymore. But I solved it. I solved it without any fancy frameworks or libraries or HTML5 retooling.

Every content container carried a variable (this was all server-side code). That variable was a number reflecting its nesting level on the page. That number was then used to replace the number in any `<h#>` levels in the content (the content was chunked enough that there was not more than one heading).

I carried that technique forward into projects on much beefier CMSes and never had to worry about training authors how to manage chunked content on their home pages (and similar chunked pages). The move to HTML5 never made me consider an all-`<h1>` solution, partly because I knew the outline was not supported.

### Client Side

Since so much of the content on modern sites comes in via client-side scripting, the code would simply need to be updated to run in the browser — this assumes you don’t mind offloading simple processing to thousands of users across uncontrollable run-times. But then if you are relying on client-side scripts to render a page you have already made your decision.

The following embedded code shows an HTML document that uses an all-`<h1>` structure. With a (not production-ready) chunk of JavaScript and some custom `data-` attributes on the sectioning containers, I re-write the `<h1>`s to reflect a document outline appropriate for this content. I use some CSS generated content to include the heading level after the text of each heading so you can easily see which is which. If the script does not work, you will see black headings sans parentheses for all.

Conceivably you can let your authors continue an all-`<h1>` approach, while your templates just tweak the structure based on attributes you embed in the layout.

See the Pen [Dynamic Heading Level Demo](http://codepen.io/aardrian/pen/VKkwwE/) by Adrian Roselli ([@aardrian](http://codepen.io/aardrian)) on [CodePen](http://codepen.io/).

You [can see (steal, fix) the script at CodePen](http://codepen.io/aardrian/pen/VKkwwE?editors=0010) directly, or you can [view it as a full page](http://codepen.io/aardrian/debug/VKkwwE) and make sure your assistive technology (such as a screen reader in this case) can navigate the corrected heading structure as you expect.

## Another Alternative

We can work to get browsers to support another new element, the `<h>` element ([proposed in April](https://github.com/w3c/html/issues/169#issuecomment-210681765), which was probably based on [Gez Lemon’s 2004 suggestion](http://juicystudio.com/article/nested-headings.php)). Browsers would still need to implement some sort of document outline algorithm, but in this case a new element means no need to rewrite existing `<h#>` logic.

That will require the developer community to come together as it did for the `<picture>` element. It can be done, it just requires some effort.

### Update: January 18, 2017

While the issue opened last April has since been closed (since it was about a language change in the spec), a new issue was opened [specifically for adding an ](https://github.com/w3c/html/issues/774)[`<h>`](https://github.com/w3c/html/issues/774)[ element](https://github.com/w3c/html/issues/774).

## Minutiae

The statement in the title of this post is not new. It has been discussed for at least three years in standards bodies. It has been ignored by browsers for longer (more than seven years), though the browser bugs linked at the end are only a couple years old. Anyone who claims this is a recent change has not confirmed that with the W3C specification in two years.

The following links are just evidence I have needed to provide repeatedly to demonstrate these points. I guess they are more for me to easily reference from future Stack Overflow answers.

- In October 2013, Steve Faulkner (an editor of the HTML5 specification) wrote a post, [The HTML5 Document Outline](https://www.paciellogroup.com/blog/2013/10/html5-document-outline/), explaining that it does not exist outside of the draft spec.
- In January 2014, [discussions started](http://lists.w3.org/Archives/Public/public-html/2014Jan/0004.html) on the W3C HTML Working Group mailing list.
- On January 25, 2014, [Mozilla Developer Network updated its advice](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines), acknowledging there is no outline algorithm in any browser.
- In March of 2014, a W3C HTML 5 bug was opened to “[modify required heading mappings to reflect reality](https://www.w3.org/Bugs/Public/show_bug.cgi?id=25003).”
- As of April 17, 2014, a [warning was added to the W3C draft HTML5 specification](https://web.archive.org/web/20160829041520/http://w3c.github.io/html/sections.html#creating-an-outline) explicitly stating there are no implementations of the outline algorithm.
- On October 28, 2014, the [W3C HTML5 specification was officially released](https://www.w3.org/TR/html5/) as a W3C Recommendation. It included the [warning about the document outline](https://www.w3.org/TR/html5/sections.html#outlines).
- On September 1, 2015, Steve Faulkner [opened an issue with the WHATWG HTML5 specification](https://github.com/whatwg/html/issues/83) suggesting a similar change. That bug is still open.
- As of January 22, 2016, Steve Faulkner [re-opened the discussion with the W3C HTML5 specification](https://github.com/w3c/html/issues/33) to see if there was some way to reflect reality.
- On April 7, 2016, Chaals opened the issue [Do not recommend using nested sections with h1](https://github.com/w3c/html/issues/169) against the W3C HTML5 spec (which is also where a `<h>` element was proposed).
- As of June 9, it was [removed from the HTML 5.1 draft specification](http://w3c.github.io/html/sections.html#the-h1-h2-h3-h4-h5-and-h6-elements).
- On June 16, 2016, both the [W3C HTML Checker](https://validator.w3.org/nu/) and the [W3C Markup Validation Service](https://validator.w3.org/) were updated to issue warnings, but still let you see the ideal outline (if it was supported).
- 2014 [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=365070) to support the outline algorithm (closed as WONTFIX July 28, 2021).
- 2014 [Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=998590) to support the outline algorithm (closed as RESOLVED October 16, 2019).
- 2014 [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=131920) to support the outline algorithm (still open with no activity since 2014).
- 2014 [Internet Explorer bug](https://web.archive.org/web/20160827032318/https://connect.microsoft.com/IE/feedback/details/856898/expose-output-of-html5-outline-algorithm-as-a-dom-method) to support the outline algorithm (closed as EXTERNAL and moved to Legacy Edge before it was shut down).
- Added January 17, 2017: [Add element #774](https://github.com/w3c/html/issues/774) formally opened against the spec, [tweeted by W3C Web Platform WG](https://twitter.com/htmlwg/status/821717149869690880), mooted when HTML moved to WHATWG.

To recap, the Document Outline Algorithm was never a recommendation in a final W3C spec. There was a warning explicitly *against* authors relying on it, though the outline language was retained for browsers to understand how to implement support (eventually).

Regardless of whether you like the idea of the document outline algorithm, it does not reflect reality since no user agent supports it.

## Update: January 23, 2018

WHATWG has maintained the fiction of the document outline despite no implementations. An [issue against the spec](https://github.com/whatwg/html/issues/83) was opened in 2015 to rectify this, where it has languished.

Until today. [New conversation has started](https://github.com/whatwg/html/issues/83#issuecomment-359871505), with any eye toward accessibility. So there is promise we will either see a more workable proposal for browsers (to ignore?) and/or acknowledgment that the current WHATWG definition needs to be scrapped.

## Update: March 1, 2019

I was made aware that MDN has an entire section on using the document algorithm outline, so I edited the page to [drop a warning into it in three spots](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#The_HTML5_outline_algorithm).

## Update: October 15, 2019

An effort is underway at WHATWG to try to resurrect `<hgroup>` ([Alternative take on hgroup #5002](https://github.com/whatwg/html/issues/5002)), an element [dropped from the W3C version of HTML in 2013](https://lists.w3.org/Archives/Public/public-html-admin/2013Apr/0003.html) and never supported in any browser. If you pay attention to the description, however, it is the latest effort to try to get a Document Outline Algorithm into the WHATWG HTML5 specification.

I made a pitch, which got some positive emoji responses, but a dismissive response from the OP:

> 
> Alternative proposal:
> 
> 1. Declare that `<hgroup>` on its own does nothing;
> 2. Mint `<h>`.
> 
> Then `<hgroup>` does not modify `<h#>`, thereby leaving existing structures intact and not modifying author intent for explicitly-chosen heading levels.
> 
> Given use of `<hgroup>` I have seen in the wild, this approach will not make any existing heading structures *less* accessible.
> 
> If the effort here is to justify `<hgroup>`, and by extension try again at a Document Outline Algorithm, then let’s mint a new required child element, `<h>`. The `<h>` element can then get its nesting level from the algorithm proposed here.
> 
> This has the advantage of keeping existing heading parsing logic in place and compartmentalizing the logic of this new effort at a Document Outline Algorithm without blowing up 30 years of existing content and rules. It may also make uptake in user agents a bit easier to swallow.
> 
> We can lean on a [previous effort to mint ](https://github.com/w3c/html/issues/774)[`<h>`](https://github.com/w3c/html/issues/774) to kick this off.
> 
> For the sub-heading concept, we can argue that any non-`<h>` non-phrasing-content-element child of `<hgroup>` is a de facto sub-head, whether it is a `<div>` or a `<p>` (probably more thought required there).
> 
> [Alternative take on hgroup #5002, comment 12](https://github.com/whatwg/html/issues/5002#issuecomment-542275840)

I suspect there will never be support for `<h>`.

## Update: January 7, 2020

In a new post at Smashing Magazine, [Why You Should Choose HTML5 ](https://www.smashingmagazine.com/2020/01/html5-article-section/)[`<article>`](https://www.smashingmagazine.com/2020/01/html5-article-section/)[ Over ](https://www.smashingmagazine.com/2020/01/html5-article-section/)[`<section>`](https://www.smashingmagazine.com/2020/01/html5-article-section/), Bruce Lawson reaffirms that there is no document outline algorithm and that no, you should not pepper your page with `<h1>`s.

## Update: January 25, 2020

Ongoing efforts at [WHATWG to create a functional outline algorithm](https://github.com/whatwg/html/pull/3499#issuecomment-577866180) that browsers want to, and can, implement continues despite two years with no progress. Well, there was progress in so far as Mozilla tried, and failed, to implement the latest effort. Remember, W3C never had a document outline algorithm in a final spec, [though WHATWG did](https://groups.google.com/forum/#!msg/mozilla.dev.platform/SdnMKYwWxzU/U-v_b8c2BwAJ) (that email implies it was in a spec that browsers implemented), even though it never reflected reality.

It’s been 7 years of no browser support. This latest effort trying to resurrect `<hgroup>` as the new keeper of the Document Outline Algorithm may not end that drought.

## Update: February 10, 2020

Steve Faulkner has wrapped up the history and current situation (as detailed in my January 25 update above) in his aptly-titled post [A decade of heading backwards](https://codepen.io/stevef/post/a-decade-of-heading-backwards).

## Update: April 6, 2022

Interestingly, the first version of HTML discussed, and dropped, heading levels that adapted to sectioning:

> 
> Should we support headers for which the level is implicitly defined by nestable section elements?[*2](https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html#HTMLplus2) We could also support autonumbering of headers. Unfortunately, on further investigation these ideas proved trickier than thought at first, and so have been dropped from this draft.
> 
> 2. For example with `<H>` for headers and `<SECTION>` for nestable sections.
> 
> [HTML+ Discussion Document](https://www.w3.org/MarkUp/HTMLPlus/htmlplus_10.html)

## Update: April 9, 2022

Thanks to [Ramón Corominas’ memory](https://twitter.com/tinitun/status/1511474421969608709), I was able to confirm that IE9 / JAWS 13 announced `<h1>`s in simple nested `<section>`s at an appropriate depth. Chrome 99 / JAWS 13 did not, Firefox 91 ESR refused to work with JAWS 13 at all. I did not record more complex constructs, but it started to fall apart pretty quickly as I adjusted the nesting to match things I have seen in real life. For timeline context, [JAWS 13 was released in late 2011](https://support.freedomscientific.com/About/News/Article/52), while the algorithm was still a draft.

> 
> I found it! 🙂 It was in May 2012, and the combination was: Firefox 10/IE 9 + JAWS 13, but it only worked when using <h1> for every heading. <hgroup> had no support at all
> 
> [April 5 tweet](https://twitter.com/tinitun/status/1511474421969608709)

> 
> If any <h2>-<h6> were used within a section, the level was incorrectly increased, and any headings with a calculated level higher than 6 were no more interpreted as headings
> 
> [April 5 tweet](https://twitter.com/tinitun/status/1511474927043502080)

I recorded a video that uses this HTML, pulled from the [WHATWG HTML specification examples for headings and sections](https://html.spec.whatwg.org/multipage/sections.html#headings-and-sections):

```plain text
 <h1>Apples</h1>
 <p>Apples are fruit.</p>
 <section>
  <h1>Taste</h1>
  <p>They taste lovely.</p>
  <section>
   <h1>Sweet</h1>
   <p>Red apples are sweeter than green ones.</p>
  </section>
 </section>
 <section>
  <h1>Color</h1>
  <p>Apples come in various colors.</p>
 </section>
```

![](https://adrianroselli.com/wp-content/uploads/2016/08/IE9-DOA.mp4)

JAWS 13 with Internet Explorer 9.

This is a case where IE9 was not exposing the nesting level information ([IE9 does not expose heading semantics](https://twitter.com/stevefaulkner/status/1512435160175845377) in the accessibility layer), but JAWS was using heuristics to try to support the draft specification.

Steve Faulkner gave some context:

> 
> The JAWS implementation was flawed and they couldn’t get it right, so they pulled it.
> 
> [April 8 tweet](https://twitter.com/stevefaulkner/status/1512430030542020609)

> 
> The JAWS implementation was sponsored by Rich S/IBM in discussion with me at the time
> 
> [April 8 tweet](https://twitter.com/stevefaulkner/status/1512436555348070405)

Despite one of the WHATWG HTML editors [asserting](https://github.com/whatwg/html/issues/83#issuecomment-1089073624) this week that The problem is about the mismatch with accessibility tech, it looks like some *accessibility tech* tried to match the draft specification in 2011 and rolled it back.

This is all on the radar again since Léonie Watson is trying to get some help from WHATWG on publishing the January 2021 HTML Review Draft as a W3C Candidate Recommendation after Steve (and I along with others) [raised an objection](https://github.com/w3c/htmlwg/issues/22#issuecomment-1004986487) since it contains the fictional Document Outline Algorithm.

Back in 2015, one of the [WHATWG HTML contributors suggested a preference for removing](https://github.com/whatwg/html/issues/83#issuecomment-136859478) the Document Outline Algorithm from the WHATWG HTML specification instead of adding a warning, but the [editor at the time disagreed](https://github.com/whatwg/html/issues/83#issuecomment-136882847), stating a full re-write was necessary. Then 7 years of no movement from WHATWG.

Last week the now-current WHATWG HTML editor, after the failure of anyone to get the outline algorithm implemented in the last 7 years, [pivoted back to the 2015 plan](https://github.com/whatwg/html/issues/83#issuecomment-1096853048), though once again implying he would not do it.

So Steve Faulkner did. Steve filed WHATWG HTML PR [#7829 removes outline algorithm ](https://github.com/whatwg/html/pull/7829). On Easter Sunday. If all goes well, maybe it won’t be another 7 years for this to be merged.

[Steve also points out](https://twitter.com/stevefaulkner/status/1515814973703958534) that User Agent default CSS style sheets do not visually honor the Document Outline Algorithm (something folks have incorrectly asserted for years):

See the Pen [ incomplete implementation of outline styles](https://codepen.io/stevef/pen/ZEvmNPg) by steve faulkner ([@stevef](https://codepen.io/stevef)) on [CodePen](https://codepen.io/).

## Update: July 1, 2022

The Document Outline Algorithm is now gone from the WHATWG HTML specification.

It took 6¾ years from when Steve Faulkner first opened the issue, with the intervening time seeing piles of evidence ignored, the backing of dozens of experts, spec editor gatekeeping, a pull request, and help shepherding it through the WHATWG process, but Steve pulled it off.

> 
> Replace the outline algorithm with one based on heading levels (thanks stevefaulkner!)[github.com/whatwg/html/commit/6682bdeee…](https://github.com/whatwg/html/commit/6682bdeee6fb08f5972bea92064fe250f1b4ec9c)
> 
> [July 1, 2022](https://twitter.com/htmlstandard/status/1542725809848434688)

If you see any tools, editors, articles, “experts”, etc., pitching the Document Outline Algorithm, remind them they are wrong (and have been).

## Update: July 7, 2022

Bruce has provided some context as well, which is far shorter than my stove-piped post, in [Why the HTML Outlining Algorithm was removed from the spec – the truth will shock you!](https://brucelawson.co.uk/2022/why-the-html-outlining-algorithm-was-removed-from-the-spec-the-truth-will-shock-you/). This part hits home:

> 
> One of the reasons I liked having a W3C versioned specification for HTML is that it would reflect the reality of what browsers do on the date at the top of the spec. A living standard often includes things that aren’t yet implemented. And the worse thing about having zombie stuff in a spec is that lots of developers believe (in good faith) that it accurately reflects what’s implemented today.
> 
> [Why the HTML Outlining Algorithm was removed from the spec – the truth will shock you!](https://brucelawson.co.uk/2022/why-the-html-outlining-algorithm-was-removed-from-the-spec-the-truth-will-shock-you/)

With the version-less WHATWG spec, the update is only there if people remember to look. So it might be some time before folks believe it. Even after *years* of evidence.

## Update: August 24, 2023

[Don’t blame screen readers for this](https://adrianroselli.com/2021/10/blaming-screen-readers-red-flag.html). As I noted above, a screen reader was the first to try to implement the document outline algorithm when the browsers would not. It was a screen reader that proved the algorithm was untenable.

## Update: September 19, 2023

The 2019 suggestion from Mu-An Chiou [for ](https://github.com/whatwg/html/pull/3499#issuecomment-544745912)[`headinglevelstart`](https://github.com/whatwg/html/pull/3499#issuecomment-544745912) has [fresh activity](https://github.com/whatwg/html/issues/5033#issuecomment-1721308852) coming out of TPAC. Scott mentioned [current limitations](https://github.com/whatwg/html/issues/5033#issuecomment-1725690910) in screen readers along with designating an upper limit.