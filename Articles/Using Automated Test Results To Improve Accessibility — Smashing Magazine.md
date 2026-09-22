---
タグ: []
作成日時: 2024-01-20T17:02:00
URL: https://www.smashingmagazine.com/2022/11/automated-test-results-improve-accessibility/
Tags: [topic/アクセシビリティ, topic/技術/テスト]
---
A cursory google search will return a treasure trove of blog posts and articles espousing the value of adding accessibility checks to the testing automation pipeline. These articles are rife with tutorials and code snippets demonstrating just how simple it can be to grab one’s favorite open-source accessibility testing library, jam it into a cypress project, and presto changeo, shifting left, and accessibility has been achieved… right?

Unfortunately, no, because actioning results in a consistent, repeatable process is the *actual* goal of shift-left, not just injecting more testing. Unlike the aforementioned treasure trove of blog posts about how to add accessibility checks to testing automation, there is a noticeable dearth of content focused on **how to leverage the results from those accessibility checks to drive change and improve accessibility**.

With that in mind, the following article aims to fill that dearth by walking through a variety of ways to answer the question of “what’s next?” after the testing integration has been completed.

## Status Quo

The confluence of maximum scalability and accessibility as requirements has brought most modern-day digital teams to the conclusion that the path to sustainable accessibility improvements requires a shift left with accessibility. Not surprisingly, the general agreement on the merits of shifting left has led to a tidal wave of content focused on how important it is to include accessibility checks in DevOps processes, like frontend testing automation, as a means to address accessibility earlier on in the product life cycle.

Unfortunately, there has yet to be a similar tidal wave of content addressing the important next steps of how to effectively use test results to fix problems and how to create processes and policies to reduce repeat issues and regression. This gap in enablement creates the problem that exists today:

> The dramatic increase in the amount of accessibility testing performed in automation is not correlating to a proportional increase in the accessibility of the digital world.

## Problem

The problem with the status quo is that without guidance on what to do with the results, increased testing does not correlate with increased accessibility (or a decrease in accessibility bugs).

## Solutions

In order to properly tackle this problem, development teams need to be enabled and empowered to make the most of the output from automated accessibility testing. Only then can they effectively use the results to translate the increase in accessibility testing in their development lifecycle to a proportional decrease in accessibility issues that exist in the application.

How can we achieve this? With a combination of strategically positioned and mindfully structured quality gates within the CI/CD pipeline and leveraging freely available tools and technologies to efficiently remediate bugs when they are uncovered, your development team can be well on their way to effectively using automated accessibility results. Let’s dive into each of these ideas!

Meet [**Smashing Workshops**](https://www.smashingconf.com/online-workshops/) on **front-end, design & UX**, with practical takeaways, live sessions, **video recordings** and a friendly Q&A. With Brad Frost, Stéph Walter and [so many others](https://smashingconf.com/online-workshops/workshops).[Jump to the workshops ↬](https://smashed.by/smashing-workshops)[Feature Panel](https://smashed.by/smashing-workshops)

![[cat-scubadiving-panel.svg]]

### Quality Gates

Making a quality gate is an easy and effective way to automate an action on your project when committing your code. Most development teams now create gates to check if there are no linting errors, if all test cases have passed, or if the project has no errors. Automated accessibility results can fit right into this same model with ease!

### Where Do The Gates Exist?

For the most part, the two primary locations for quality gates within the software development lifecycle (SDLC) are during pull requests (PRs) and build jobs (in CI).

With pull requests, one of the most commonly used tools is GitHub Actions, which allows development teams to automate a set of tasks that should be completed or checked when code is committed or deployed. In CI Jobs, the tools’ built-in functionality (Azure, Jenkins) is used to create a script that checks to see if test cases or scenario has passed. So, where does it make sense to have one for your team?

It all depends on what level development teams want to put a gate in place for accessibility testing results. If the team is doing more linting and component-level testing, the accessibility gate would make the most sense at a pull request level. If the automated test is at an integration level, meaning a full baked-out site ready for deployment, then the gate can be placed with a CI job.

### Types Of Gates

There are two different ways that quality gates can operate: a soft check and a hard assertion.

A soft check is relatively simple in the definition. It looks at whether or not the accessibility tests were executed. That is it! If the accessibility checks were run, then the test passes. In contrast, assertions are more specific and stringent on what is allowed to pass. For example, if my accessibility test case runs, and it finds even ONE issue, the assertion fails, and the gate will say it has not passed.

So which one is most effective for your team? If you are looking to get more teams to buy into accessibility testing as a whole, a best practice is to not throw a hard assertion right away. Teams initially struggle with added tasks or requirements, and accessibility is no different. Starting with a soft gate allows teams to see what the requirement is going to be and what they are required to be doing.

Once a certain amount of time has passed, then that soft gate can switch to a hard assertion that will not allow a single automated issue out the door. However, if your team is mature enough and has been using accessibility automation for a while, a hard assertion may be used initially, as they already have experience with it.

### Creating Effective Gates

Whether you are using a soft or hard gate, you have to create requirements that govern what the quality gate does with regard to accessibility automated results. Simply stating, “The accessibility test case failed,” is not the most effective way to make use of the automated results. Creation of gates that are data-driven, meaning they are based on a piece of data from the results, can help make a more effective gate that matches your development team or organization’s accessibility goals.

Here are three of the methods of applying assertions to govern accessibility quality:

- **Issue severity**Pass or fail based on the existence or count of specific severity issues (Critical, Serious, and so on).
- **Most common issues**Pass or fail based on the existence or count of specific issue types which are known to be most common (either global or organization specific).
- **Critical or Targeted UI /UX**Do these bugs exist in high-traffic areas of the application, or do these bugs directly impede a user along a critical path through the UX?

### Fixing Bugs

The creation and implementation of quality gates is an essential first step, but unfortunately, this is only half the battle. Ultimately a development organization needs to be able to fix the bugs found at the various quality gate inspection points. Otherwise, the applications’ quality will never improve, and nothing will clear the gates that were just put in place. What a terrifying thought that is.

In order to translate the adoption of the quality gates into improved accessibility, it is vital to be able to make effective use of the accessibility test results and leverage tools and technologies whenever possible to help drive remediation, which eliminates accessibility blockers and ultimately creates more inclusive experiences for users.

### Accessibility Test Results

There is a common adage that “there is no such thing as bug-free software,” and given that accessibility conformance issues are bugs, this axiom applies to accessibility as well. As such, it is absolutely necessary to be able to clearly prioritize and triage accessibility test results in order to apply limited resources to seemingly unlimited bugs to fix them in as efficient and effective a way as possible.

It is helpful to have a few prioritization metrics to assist in the filtration and triage work when working with test results. Typically, **context is an effective top-level filter**, which is to say, attacking bugs and blockers that exist in high-traffic pages or screens or critical user flows is a useful way to drive maximal impact on the user experience and the application at large.

Another common filter, and one that is often secondary to the “context” filter mentioned above, is to **prioritize bugs by their severity**, which is to say, the impact on the user caused by the bug’s existence. Most free or open-source automated accessibility tools and libraries apply some form of **issue severity** or **criticality label** to their test results to help with this kind of prioritization.

Lastly, as a tertiary filter, some development teams are able to organize these bugs or tasks by thinking about the **level of effort to implement a fix**. This last filter isn’t something that will commonly be found in the test results themselves. Still, developers or product managers may be able to infer a level of effort estimation based on their own internal understanding of the application infrastructure and underlying source code.

Thankfully, accessibility test results, for the most part, share a level of consistency, regardless of which library is being used to generate the test results, in that they generally provide details about what specific checks failed, where the failures occurred in terms of page URL and sometimes even CSS or XPath as well as specific component HTML, and finally actionable recommendations on how to fix the components that failed the specific checks. That way, a developer always has a result that clearly states what’s wrong, where’s it wrong, and how to fix what’s wrong.

In the above ways, developers can clearly stack, rank, and prioritize tasks that result from automated accessibility test results. The test results themselves are typically designed to be clear and actionable so that each task can be remediated in a timely fashion. Again, the focus here is to be able to **effectively deliver maximal impact with limited resources**.

### Helpful Tools

The above strategies are well and good in terms of having a clear direction for attacking known bugs within a project. Still, it can be daunting to figure out whether one’s remediation solution actually worked or further to figure out a path forward to prevent similar issues from recurring. This is where a number of free tools that exist in the community can come into play and support and empower development organizations to expedite remediation and enable validation of fixes, which ultimately improves downstream accessibility while maintaining development velocity.

One such family of free tools is the **accessibility browser extension**. These are free tools that can help teams locate, fix, and validate the remediation of accessibility bugs. It is likely that whatever accessibility library is being used in the CI/CD pipeline has an accompanying (and free) browser extension that can be used in local development environments. A couple of examples of browser extensions include:

- [Axe Browser Extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd?hl=en-US)
- [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [IBM Equal Access Accessibility Checker](https://chrome.google.com/webstore/detail/ibm-equal-access-accessib/lkcagbfjnkomcinoddgooolagloogehp?hl=en-US)
- [Wave Tool](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US)

The browser extensions allow a developer to quickly and easily scan a page in the browser, identify issues on the page, or as in the case described above, they can validate that an issue that was detected during the testing automation process, which they have since remediated, no longer exists (validation!). Browser extensions are also a fantastic tool that can be leveraged during active development to find and fix bugs before code gets committed. Often, they are used as a quality check during a pull request approval process, which can help prevent bugs from making their way downstream.

Another group of free tools that can help developers fix accessibility bugs is **linters** which can be integrated within the developers **integrated development environment (IDE)**and automatically identifies and sometimes automatically remediates accessibility bugs detected within the actual source code before it compiles and renders into HTML in a browser.

Linters are fantastic because they function similarly to a spell checker in a document editor tool like Microsoft Word. It’s largely fully automated and requires little to no effort for the developer. The downside is that linters typically have a limited number of reliable checks that can be executed for accessibility at the point of source code editing. Here are some of the top accessibility linters:

- ESLint Plugins:
    - [Vue Accessibility Plugin](https://www.npmjs.com/package/eslint-plugin-vuejs-accessibility)
    - [JSX Accessibility Plugin](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
    - [Angular Accessibility Plugin](https://www.npmjs.com/package/eslint-plugin-lit-a11y)
- [Web Hint](https://webhint.io/docs/user-guide/hints/accessibility/)
- [Axe-Linter](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)

Equipping a development team with browser extensions and linters is a free and fast way to empower them to find and fix accessibility bugs immediately. The tools are **simple to use, and no special accessibility training is required** to execute the tests or consume and action the results. If the goal is to get farther faster with regard to actioning automated accessibility test results and improving accessibility, the adoption of these tools is a great first step.

## The Next Level

Now that we have strategies for how to use results to improve accessibility at an operational level, what’s next? How can we ensure that all of our organization knows that accessibility is a practical piece of our development lifecycle? How can we build out our regression testing to include accessibility so that issues may not be reintroduced?

### Codify it!

One way we can truly ensure that what we have created above will be done on a daily basis is to bring accessibility into your organization’s policy (also known as code policy or policy of code) — establishing such means that accessibility will be included throughout the SDLC as a foundational requirement and not an optional feature.

Although putting accessibility into the policy can take a while to achieve, the benefits of it are immeasurable. It creates a set of accessible coding practices that are clearly defined and established for how accessibility becomes part of the acceptance criteria or definition of “done” at the company level. We can use the automated accessibility results to drive this policy of code and ensure that the teams are doing full testing, using gates, and fixing the issues set by the policy!

### Automate it!

Most automated accessibility testing libraries are standard out-of-the-box libraries that test generically for accessibility issues that exist on the page. The typical amount of issues caught is around 40%, which is a good amount. However, there is a way in which we can write automated accessibility tests to go above and beyond even more!

**Accessibility regression scripts** allow you to check accessibility functionality and markup to ensure that the contents of your page are behaving the way they should. Will this guarantee it works with a screen reader? Nope. But it will ensure that the accessible functionality of it is properly working.

For example, let’s say you have an expand/collapse section that shows extra details have you click the button. Automated accessibility libraries would be able to check to ensure the button has accessible text and maybe that it has a focus indicator. Writing a regression script, you could check to ensure the following:

- It works with a keyboard (Enter and Space);
- `aria-expanded=” true/false”` is properly set on the button;
- The content in the expanded section is properly [hidden from screen readers](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html#hiding-content-completely).

Doing this on key components can help ensure that the markup is properly set for assistive technology, and if there is an issue, it can be easier to debug if the issue is in code or potentially a bug in the assistive technology.

## Conclusion

The “shift left” movement within the accessibility industry over the last few years has done a lot of good in terms of generating awareness and momentum. It has helped engage and activate companies and teams to actually take action to impact accessibility and inclusion within their digital properties, which in and of itself is a victory.

Even so, the actual impact on the overall accessibility of the digital world will continue to be somewhat limited until teams are not only empowered to execute tests in efficient ways but also that they are enabled to **effectively use the test results to govern the overall quality, drive rapid remediation, and ultimately put process and structure in place** to prevent regression.

In the end, the goal is really more than simply shifting left with accessibility, which often ends up taking what a bottleneck of testing in the QA stage of the SDLC is and simply dragging it left and upstream and placing it into the CI/CD pipeline. What really is desired, if sustainable digital accessibility transformation is the goal, is to **decentralize the accessibility work and democratize it across the entire development team** so that everyone participates (and hopefully into the design as well!) in the process.