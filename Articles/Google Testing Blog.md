---
URL: https://testing.googleblog.com/
Created: 2022-08-15T11:58:00
Tags: [topic/技術/テスト]
---
This is another post in our [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) series. A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode. You can download a [printer-friendly version](https://docs.google.com/document/d/1AqF96_mlhZO0xyW8noG5PA0B6p8uLshLfkiupxM-NzY/edit) to display in your office.

Loops are the standard way to process collections like arrays and lists. However, some loops implement the same patterns repeatedly, leading to duplicate code. [***Higher-order functions***](https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99)—functions that use other functions as inputs or outputs—can reduce duplication by providing a simpler way to express common operations with collections.

Consider these two loops in JavaScript that decide if every object in an array meets a condition:

![[Archive/import/Google Testing Blog/New database/New database.base]]

The high similarity between the two loops violates the [Don’t Repeat Yourself ](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)principle and creates an unnecessary burden on readers and maintainers of the code.

To reduce the maintenance burden, use the every method to replace each loop with a single expression. (In other languages every may have a different name, like all or allMatch).

![[Archive/import/Google Testing Blog/New database/New database.base]]

Processing collections with higher-order functions has several benefits:

- It significantly reduces duplication by abstracting away the common looping code.
- The resulting code is much shorter and simpler, with less opportunity for bugs.
- A reader can quickly see the intent of the code as it is not obscured behind low-level control flow.

Two other common higher-order functions are map (apply a function to each element of a collection) and filter (select the elements of a collection that pass a predicate). While the exact syntax varies by language, here’s how they look in JavaScript (using an anonymous function as the argument):

![[Archive/import/Google Testing Blog/New database/New database.base]]

Just don’t overdo it! Don’t rewrite a loop with functions if it makes it harder to understand, or if it would be considered unidiomatic in your language (for example, in Python, list comprehensions are equivalent to map and filter but are usually preferred).

## By George Pirocanac

I have often been asked, “What is the most memorable bug that you have encountered in your testing career?” For me, it is hands down a bug that happened quite a few years ago. I was leading an Engineering Productivity team that supported Google App Engine. At that time App Engine was still in its early stages, and there were many challenges associated with testing rapidly evolving features. Our testing frameworks and processes were also evolving, so it was an exciting time to be on the team.

What makes this bug so memorable is that I spent so much time developing a comprehensive suite of test scenarios, yet a failure occurred during such an obvious use case that it left me shaking my head and wondering how I had missed it. Even with many years of testing experience it can be very humbling to construct scenarios that adequately mirror what will happen in the field.

I’ll try to provide enough background for the reader to play along and see if they can determine the anomalous scenario. As a further hint, the problem resulted from the interaction of two App Engine features, so I like calling this story *A Tale of Two Features.*

## Feature 1 - Datastore Admin (backup, restore, delete)

Google App Engine was released 13 years ago as Google’s first Cloud product. It allowed users to build and deploy highly scalable web applications in the Cloud. To support this, it had its own scalable database called the Datastore. An administration console allowed users to manage the application and its Datastore through a web interface. Users wrote applications that consisted of request handlers that App Engine invoked according to the URL that was specified. The handlers could call App Engine services like Datastore through a remote procedure call (RPC) mechanism. Figure 1 illustrates this flow.

![[AVvXsEh0cVtb0BQOCfEOdYOLTEzlkK6wlHKjVPjCdIUxMjMR8xH7dG2zAClwF1rdSiYZKoH9ZODmhh46bvRoZNh1m6GnBRcdO5-bJEOOBJXrH5GObECmzIKNS6w0aladuki_mY3bM1WaDl7sdTrvvbYTsJ1cY5xhWO1idwxPAnN-UrTSYyALq8JnxQw640-h194.bin]]

The first feature in this *Tale of Two Features* resided in the administration console, providing the ability to back up, restore, and delete selected or all of an application’s entities in the Datastore. It was implemented in a clever way that incorporated it directly into the application, rather than as an independent utility. As part of the application it could freely operate on the Datastore and incur the same billing charges as other datastore operations within the application. When the feature was invoked, traffic would be sent to its handler and the application would process it. Figure 2 illustrates this request flow.

![[AVvXsEjqOeIzD2oUVRnK14nCw8j5vxEcBvN98tBirvh3sj_P3a2E29GoZTKeSvgl2ePALbtxdVRSZ2R3tIWwPL93U3ckniR0hkDQBmKyTXqfvTzOjpLcNCVlEfLSBGUfzMD2PX6a5q4zrI8hUbJbbmPWnz5HDlWSJXQ_1LK7Hy92zVGIkx7KRZuFQQw640-h410.bin]]

By the time this memorable bug occurred, this Datastore administration feature was mature, well tested, and stable. No changes were being made to it.

## Feature 2 - Utilities for Migrating to the HR - Datastore

The second feature (or more accurately, set of features) came at least a year after the first feature was released and stable. It helped users migrate their applications to a new High Replication (HR) Datastore. The HR Datastore was more reliable than its predecessor, but using it meant creating a new application and copying over all the data from the old Datastore. To support such migrations, App Engine developers added two new features to the administration console. The first copied all the data from the Datastore of one application to another, and the second redirected all traffic from one application to another. The latter was particularly useful because it meant the new application would seamlessly receive the traffic after a migration. This set of features was written by another team, and we in Engineering Productivity supported them by creating processes for testing various Datastore migrations. The migration-support features were thoroughly tested and released to developers. Figure 3 illustrates the request flow of the redirection feature.

![[AVvXsEhR9Tw44yOC48vvAARE70a2JNLAB5EcYPimIFeuGBNnm4Qbjf5d7W4NzZ-s-j5BU-b0-u2cFX1q9AL0e-QNkVabq3CpiTLZzVSA7fjrYTjHXofw0WErosSUgI_XHygJbMRIyuoPno0b4JNzgrXPXSPz2xLhZqKPUy8gkISvOZS_mjrhAKsprQw640-h364.bin]]

## What Could Possibly Go Wrong?

So this was the situation when we released these utilities for migrating to the new Datastore. We were very confident that they worked, as we had tested migrations of many different types and sizes of Datastore entities. We had also tested that a migration could be interrupted without data loss. All checked out fine. I was confident that this new feature would work, yet soon after we released it, we started getting problem reports.

If you have been playing along, now is the time to ask yourself, “What could possibly go wrong?” As an added hint, the problem reports claimed that all the data in the newly migrated application was disappearing.

## What Did Go Wrong

As mentioned above, developers began to report that data was disappearing from their newly migrated applications. It wasn’t at all common, yet of course it is most disconcerting when data “just disappears.” We had to investigate how this could occur. Our standard processes ensured that we had internal backups of the data, which were promptly restored. In parallel we tried to reproduce the problem, but we couldn’t—at least until we figured out what was happening. As I mentioned earlier, once we understood it, it was quite obvious, but that only made it all the more painful that we missed it.

What was happening was that, after migrating and automatically redirecting traffic to the new application, a number of customers thought they still needed to delete the data from their old application, so they used the first Datastore admin feature to do that. As expected, the feature sent traffic to that application to delete the entities from the Datastore. But that traffic was now being automatically redirected to the new application, and voila—all the data that had been copied earlier was now deleted there. Since only a handful of developers tried to delete the data from their old applications, this explained why the problem occurred only rarely. Figure 4 illustrates this request flow.

![[AVvXsEjRpHqaAL8XEJd2_MiESEmXnj8sqqctGvogjgRsw9Ty40zwQbmhfA9CLeECNR3dSh5PxIkN1HC3AnydKx-ef6LzkcC3E6QrKi23Y5IqZPPB9t38DIQylqsW3o-VIVhFpi0OkeX5YxkMmWk0Etiy4Php_XQWMDDeG0ZPirNEFM6Sr1Mg9Y85xgw640-h510.bin]]

Obvious, isn’t it, once you know what is happening.

## Lessons Learned

This all occurred years ago, and App Engine is based on a far different and more robust framework today. Datastore migrations are but a memory from the past, yet this experience made a great impression on me.

The most important thing I learned from this experience is that, while it is important to test features for their functionality, it’s also important to think of them as part of workflows. In performing our testing we exercised a very limited number of steps in the migration process workflow and omitted a very reasonable step at the end: trying to delete the data from the old application. Our focus was in testing the variability of contents in the Datastore rather than different steps in the migration process. It was this focus that kept our eyes away from the relatively obvious failure case.

Another thing I learned was that this bug might have been caught if the developer of the first feature had been in the design review for the second set of migration features (particularly the feature that automatically redirects traffic). Unfortunately, that person had already joined a new team. A key step in reducing bugs can occur at the design stage if “what-if” questions are being asked.

Finally, I was enormously impressed that we were able to recover so quickly. Protecting against data loss is one of the most important aspects of Cloud management, and being able to recover from mistakes is at least as important as trying to prevent them. I have the utmost respect for my coworkers in Site Reliability Engineering (SRE).

## References

## By George Pirocanac

A familiar question every software developer and team grapples with is, “How much testing is enough to qualify a software release?” A lot depends on the type of software, its purpose, and its target audience. One would expect a far more rigorous approach to testing commercial search engine than a simple smartphone flashlight application. Yet no matter what the application, the question of how much testing is sufficient can be hard to answer in definitive terms. A better approach is to provide considerations or rules of thumb that can be used to define a qualification process and testing strategy best suited for the case at hand. The following tips provide a helpful rubric:

- Document your process or strategy.
- Have a solid base of unit tests.
- Don’t skimp on integration testing.
- Perform end-to-end testing for Critical User Journeys.
- Understand and implement the other tiers of testing.
- Understand your coverage of code and functionality.
- Use feedback from the field to improve your process.

## Document your process or strategy

If you are already testing your product, document the entire process. This is essential for being able to both repeat the test for a later release and to analyze it for further improvement. If this is your first release, it’s a good idea to have a written test plan or strategy. In fact, having a written test plan or strategy is something that should accompany any product design.

## Have a solid base of unit tests

A great place to start is writing unit tests that accompany the code. Unit tests test the code as it is written at the functional unit level. Dependencies on external services are either mocked or faked.

A *mock* has the same interface as the production dependency, but only checks that the object is used according to set expectations and/or returns test-controlled values, rather than having a full implementation of its normal functionality.

A *fake*, on the other hand, is a shallow implementation of the dependency but should ideally have no dependencies of it’s own. Fakes provide a wider range of functionality than mocks and should be maintained by the team providing the production version of the dependency. That way, as the dependency evolves so does the fake and the unit-test writer can be confident that the fake mirrors the functionality of the production dependency.

At many companies, including Google, there are best practices of requiring any code change to have corresponding unit test cases that pass. As the code base expands, having a body of such tests that is executed before code is submitted is an important part of catching bugs before they creep into the code base. This saves time later both in writing integration tests, debugging, and verifying fixes to existing code.

## Don’t skimp on integration testing

As the codebase grows and reaches a point where numbers of functional units are available to test as a group, it’s time to have a solid base of integration tests. An integration test takes a small group of units, often only two units, and tests their behavior as a whole, verifying that they coherently work together.

Often developers think that integration tests can be deprioritized or even skipped in favor of full end-to-end tests. After all, the latter really tests the product as the user would exercise it. Yet, having a comprehensive set of integration tests is just as important as having a solid unit-test base (see the earlier Google Blog article, [Fixing a test hourglass](https://testing.googleblog.com/2020/11/fixing-test-hourglass.html)).

The reason lies in the fact that integration tests have less dependencies than full end-to-end tests. As a result, integration tests, with smaller environments to bring up, will be faster and more reliable than the full end-to-end tests with their full set of dependencies (see the earlier Google Blog article, [Test Flakiness - One of the Main Challenges of Automated Testing](https://testing.googleblog.com/2020/12/test-flakiness-one-of-main-challenges.html)).

## Perform end-to-end testing for Critical User Journeys

The discussion thus far covers testing the product at its component level, first as individual components (unit-testing), then as groups of components and dependencies (integration testing). Now it’s time to test the product end to end as a user would use it. This is quite important because it’s not just independent features that should be tested but entire workflows incorporating a variety of features. At Google these workflows - the combination of a critical goal and the journey of tasks a user undertakes to achieve that goal - are called Critical User Journeys (CUJs). Understanding CUJs, documenting them, and then verifying them using end-to-end testing (hopefully in an automated fashion) completes the [Testing Pyramid](https://docs.google.com/presentation/d/15gNk21rjer3xo-b1ZqyQVGebOp_aPvHU3YH7YnOMxtE/edit#slide=id.g437663ce1_53_98).

## Understand and implement the other tiers of testing

Unit, integration, and end-to-end testing address the functional level of your product. It is important to understand the other tiers of testing, including:

- Performance testing - Measuring the latency or throughput of your application or service.
- Load and scalability testing - Testing your application or service under higher and higher load.
- Fault-tolerance testing - Testing your application’s behavior as different dependencies either fail or go down entirely.
- Security testing - Testing for known vulnerabilities in your service or application.
- Accessibility testing - Making sure the product is accessible and usable for everyone, including people with a wide range of disabilities.
- Localization testing - Making sure the product can be used in a particular language or region.
- Globalization testing - Making sure the product can be used by people all over the world.
- Privacy testing - Assessing and mitigating privacy risks in the product.
- Usability testing - Testing for user friendliness.

Again, it is important to have these testing processes occur as early as possible in your review cycle. Smaller performance tests can detect regressions earlier and save debugging time during the end-to-end tests.

## Understand your coverage of code and functionality

So far, the question of how much testing is enough, from a qualitative perspective, has been examined. Different types of tests were reviewed and the argument made that smaller and earlier is better than larger or later. Now the problem will be examined from a quantitative perspective, taking code coverage techniques into account.

Wikipedia has a great article on [code coverage](https://en.wikipedia.org/wiki/Code_coverage) that outlines and discusses different types of coverage, including statement, edge, branch, and condition coverage. There are several open source tools available for measuring coverage for most of the popular programming languages such as Java, C++, Go and Python. A partial list is included in the table below:

![[Archive/import/Google Testing Blog/New database/New database.base]]

Table 1 - Open source coverage tools for different languages

Most of these tools provide a summary in percentage terms. For example, 80% code coverage means *about* 80% of the code is covered and *about* 20% of the code is uncovered. At the same time, It is important to understand that, just because you have coverage for a particular area of code, this code can still have bugs.

Another concept in coverage is called changelist coverage. Changelist coverage measures the coverage in changed or added lines. It is useful for teams that have accumulated technical debt and have low coverage in their entire codebase. These teams can institute a policy where an increase in their incremental coverage will lead to overall improvement.

So far the coverage discussion has centered around coverage of the code by tests (functions, lines, etc.). Another type of coverage is feature coverage or behavior coverage. For feature coverage, the emphasis is on identifying the committed features in a particular release and creating tests for their implementation. For behavior coverage, the emphasis is on identifying the CUJs and creating the appropriate tests to track them. Again, understanding your “uncovered” features and behaviors can be a useful metric in your understanding of the risks.

## Use feedback from the field to improve your process

A very important part of understanding and improving your qualification process is the feedback received from the field once the software has been released. Having a process that tracks outages and bugs and other issues, in the form of action items to improve qualification, is critical for minimizing the risks of regressions in subsequent releases. Moreover, the action items should be such that they (1) emphasize filling the testing gap as early as possible in the qualification process and (2) address strategic issues such as the lack of testing of a particular type such as load or fault tolerance testing. And again, this is why it is important to document your qualification process so that you can reevaluate it in light of the data you obtain from the field.

## Summary

Creating a comprehensive qualification process and testing strategy to answer the question “How much testing is enough?” can be a complex task. Hopefully the tips given here can help you with this. In summary:

- Document your process or strategy.
- Have a solid base of unit tests.
- Don’t skimp on integration testing.
- Perform end-to-end testing for Critical User Journeys.
- Understand and implement the other tiers of testing.
- Understand your coverage of code and functionality.
- Use feedback from the field to improve your process.

## References

By Goran Petrovic

## History

It’s been a long-standing tradition of my team to organize hackathons twice a year. In weeks prior to the hackathon, the team gathers and brainstorms ideas for projects, ranging from improving the testing infrastructure or an existing process, to trying out a wild idea they’ve had for some time. Just before the hackathon, the team rates the accumulated ideas on a coolness-impact scale: how much fun does a project sound vs. how impactful could it potentially be; while impact is important, for hackathons, fun is non-negotiable. Then, engineers who are excited to work on some of the proposed projects subscribe and form teams. It was no different in the cold winter of 2013, where among the plethora of cool and wild ideas, one was to prototype **Mutation testing.**

For those who are not familiar with it, mutation testing is a method of evaluating test quality by injecting bugs into the code and seeing whether the tests detect the fault or not. The more injected bugs the tests catch, the better they are. Here’s an example:

Negating the *if* condition.

![[Archive/import/Google Testing Blog/New database/New database.base]]

If a test fails, we say it kills the mutant, and if no tests fail, we say that the mutant is alive.

By the end of the hackathon, mutagenesis was implemented for C++ and Python, and a prototype was born: a shell script that evaluates generated mutants in a diff (pull request) and textually reports live mutants in the files in the diff. A year passed with no work done on the project, before I started to work on it in my [20% time](https://en.wikipedia.org/wiki/20%25_Project). I had no idea what Mutation testing was at the time, so I researched and read papers on the topic, and collected lots of ideas on what I should focus on.

## From Prototype To Launch

I quickly realized that the hackathon crew did not calculate the Mutation score, the ratio of mutants detected by tests, which is a prominent metric in the research literature and the holy grail of evaluating test quality, but just enumerated live mutants. My first exposure to mutants was just running the tool on the mutagenesis code itself and trying to understand the report. I was immediately overwhelmed: after a long execution time, I was facing thousands of mutants in just a handful of files. I tried going through a couple, but after a few minutes I grew tired and moved on with my main project, which happened to be on Google Shopping. In the following months, I stayed away from my 20% project, but I kept thinking about it, bugging my colleagues and friends about the ideas I had to make mutation testing work for us. After many months of brainstorming and discussions, almost a year after the original hackathon project, I was ready to design the Mutation Testing Service.

I faced two big problems. First, I could force myself to go through lots of mutants, and maybe find a useful one that would prompt me to write a test case, but I could not force others, not even my teammates. Second, the vast majority of mutants were simply bad. Here are some examples:

Replacing division with subtraction, but in a logging statement.

![[Archive/import/Google Testing Blog/New database/New database.base]]

Appending number 1 to an error message.

![[Archive/import/Google Testing Blog/New database/New database.base]]

Replacing *greater than with less than* when comparing length of a collection to zero.

![[Archive/import/Google Testing Blog/New database/New database.base]]

Replacing the idiomatic python check for whether the module is imported or executed as main.

![[Archive/import/Google Testing Blog/New database/New database.base]]

Changing python’s string concatenation (+) to string multiplication (*).

![[Archive/import/Google Testing Blog/New database/New database.base]]

![[Archive/import/Google Testing Blog/New database/New database.base]]

Changing a network timeout, but the network layer is mocked in the tests.

![[Archive/import/Google Testing Blog/New database/New database.base]]

Yes, the tests did not detect these mutants, but we would not want such tests anyway. Many of them would produce fragile, [change-detector tests](https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html). We later settled on calling them **unproductive mutants**: writing tests for those mutants would make the test suite worse, not better.

I realized that I needed to suppress these types of mutants: if I reported them, nobody would use mutation testing, myself included. Most of the mutants were not useful, and that is a waste of developer attention. The onus was on me to create a better tool. I set out to try various heuristics by looking at the report and suppressing mutants that I found unproductive. I encoded the heuristics in AST ([Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) matching rules, and I dubbed the AST nodes which contained unproductive mutants as **arid nodes**. In the beginning, there were only a few rules in the system, but that was enough to make me feel confident that my colleagues would give it a try.

The other big issue was the sheer number of mutants. With five or more in a line, hundreds in a file, it was a challenge to display them, and even if I managed that, nobody would go through them anyway. I quickly realized that they shouldn’t: it took a lot of time for me to go through the mutants, and, while some pointed me to a hole in my test suite, most were useless, and many of them, especially ones in the same line, redundant. I did not need every possible combination of operators changed to tell me that my test for that condition was insufficient; one was just fine. That was my first decision on mutation testing: to report at most one mutant in a line. This was a quick and easy decision to make, because, if you’ve ever used a Code review system, you know that having more makes the review noisy and harder to do. Another reason why it was such an easy decision was that it would have been computationally prohibitively expensive to calculate all mutants, and I could have thrown my 20% project down the drain. I call it limitation-driven development :)

Of course, the idea was to report live mutants during [Code review](https://research.google/pubs/pub47025/). Code review is the perfect time in the engineering process to surface useful findings about the code being changed, and integrating into the existing developer process has the [highest chance](https://research.google/pubs/pub43477/) that the developers will take action. This seemed like the most normal thing in the world: we had hundreds of [analyzers](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43322.pdf) and all engineers were used to receiving findings from various analyses of their code. It took an outsider to point out that this was a strange approach: mutation testing was classically run on the whole program and the mutation score calculated and used as guidance.

This is what a Mutant finding looks like in the Code review tool:

![[Code2BReview2BImage2Bfor2BMutation2BTesting2BArticle.jpg]]

Mutation Testing at Google is a dynamic analyzer of code changes that surfaces mutants during Code review by posting code findings. In terms of infrastructure, it consists of three main parts: the *change listener*, the *analyzer*, and many *mutagenesis servers*, one for each language.

![[Block2BDiagram2Bfor2BMutation2BTesting2BArticle.jpg]]

Each event during the Code review is announced using a publisher-subscriber pattern, and any interested party can listen, and react, to these events. When a change is sent for Code review, many things happen: linters are run, automated tests are evaluated, coverage is calculated, and for the users of mutation testing, mutants are generated and evaluated. Listening on all events coming from the Code review system, the *listener* schedules a mutation run on the *analyzer*.

The first thing the analyzer does is get the code coverage results for the patch in question; from it, the analyzer can extrapolate which tests cover which lines of source code. This is a very useful piece of information, because running the minimum set of tests that can kill a mutant is crucial; if we just ran all tests that were linked in, or covered the project, that would be prohibitively computationally expensive

Next, for each covered line in each file in the patch, a *mutagenesis server* for the language in question is asked to produce a mutant. The mutagenesis server parses the file, traverses its AST, and applies the mutators in the requested order (as per mutation context), ignoring arid nodes, nodes in uncovered lines and in lines that are not affected by the proposed patch.

When the *analyzer* assembles all mutants, it patches them one by one to a version control context and then evaluates all the tests for each mutant in parallel. For mutants for which all tests pass, the *analyzer* surfaces a finding for the code author and reviewers, and is done for the time being.

Because the Code review is a laborious and dynamic process, with many rounds of comments from reviewers and many automated findings from hundreds of different analyzers, there can be many snapshots as the patch evolves: adoption of recommendations from reviewers or accepting proposed changes from linters yields many code states. Mutation testing first runs after coverage is available, and then it runs for each subsequent snapshot: developers like to see the fruits of their labor: when they write a test to kill a mutant, they want to see the mutant killed.

I launched Mutation testing for the Shopping Engineering Productivity team in late 2015. Around 15 of my colleagues were subjected to Mutant findings during their Code reviews, and it was a bumpy start. Each finding has two buttons: **Please fix** and **Not useful**, as you can see on the Code review screenshot above. A reviewer can instruct the code author to fix some finding (e.g. a ClangTidy finding might point out that an object is being unnecessarily copied and suggest using a reference instead, or a Mutant finding might point out that code is not well tested). The author and all reviewers can give feedback to the author of the finding/analyzer that their finding is not useful. This is a source of valuable information, and I made use of it. For each mutant that was deemed not useful, I’d check it out and see whether I could generalize from it and add a new rule to my arid node heuristics. Slowly, I collected several hundred heuristics, many of them generally applicable, but many also tied to internal stuff, like monitoring frameworks. More and more, I noticed that just marking nodes as arid and suppressing mutants in them was not enough on its own; a more powerful mechanism was required to reduce this noise even further. Take a look at these motivating examples:

Changing the condition of an if statement, but the body is arid (a logging statement).

![[Archive/import/Google Testing Blog/New database/New database.base]]

Similar pattern, but in C++:

I settled for a transitive rule: an AST node is arid if I say it’s arid, or if it’s a compound statement and all its body is also arid. This made sense in retrospect, but it took some looking at reported examples of unproductive mutants to crystalize. Because the logging statements are arid, the whole *if* statement’s body is arid, and hence, the if statement itself is arid, including its condition.

In the summer of 2015, my intern, Małgorzata Salawa, and I got mutagenesis implemented for C++, Go, Python, and Java, and having transitive arid node detection and surfacing at most a single mutant per line and 7 per file, we called it a v1.0 and launched. Mutation testing was always an opt-in service, and in the beginning had a few users (93 code reviews in Q1 of 2016), but over time it ramped up to 2,500 users in February 2017, to tens of thousands today. The early days were crucial to get the users’ feedback and extend the arid node heuristics ever further. In the beginning, the *Not Useful* rate was around 80%, and this was already with some heuristics and at most a single mutant per line. With time, I got it down to around 15%. I was always aware that getting the rate to 0% was impossible, because of the nature of the mutants: sometimes, the mutant would produce an equivalent behavior as the original, and there was no way to avoid that fully.

Changing cached lookup by removing the cache and always recalculating yields functionally equivalent code, undetectable by conventional testing.

![[Archive/import/Google Testing Blog/New database/New database.base]]

I was both surprised and happy that I could lower the *Not useful* rate to under 50%.

## Mutation Context

As time went by, I added support for more languages. In early 2017, I implemented support for JavaScript and TypeScript, and later in the year I added support for Dart. In 2018 I added support for [ZetaSQL](https://github.com/google/zetasql). And finally, in early 2020, I added support for Kotlin as it became more and more popular in the Android world.

I kept track of various stats for all mutants: their survival rates and *Please fix/Not useful* ratios.

The worst performing mutator was ABS(*Absolute Value Mutator*) that would replace an *expression* with *±abs(expression),* for example:

![[Archive/import/Google Testing Blog/New database/New database.base]]

Looking at the examples, I had to agree. Because the feedback was predominantly negative for this mutator, I quickly completely disabled it for all languages.

I soon noticed that the SBR (*Statement Block Removal*) mutator, which deletes statements or whole blocks, is the most common one, and that made sense: while mutating a logical or arithmetic operator required the existence of such an operator in the code to be mutated, any line of code was eligible for deletion. Mutants generated by code deletion, though, did not have the best reported usefulness, or productivity. In fact, almost all other mutators generated more productive mutants than the SBR, and that got me thinking: not all code is the same; a condition within an *if* statement that contains a *return* statement is not the same as a condition in another location.

Out of this, an idea was born: context-based mutator selection. For each line, I would randomly shuffle mutator operators and pick one by one until one generated a mutant in that line. That was not ideal, because I knew that some operators worked better than others in some contexts. Rather than just randomly picking a mutant operator, I decided to pick the one most likely to generate a surviving mutant that is then most likely to be productive when reported, based on historical data. I had millions of mutants to learn from, I just needed to define the distance between pieces of code. Finally deciding to look for AST nodes that were in similar contexts as the node being mutated, I looked at the nodes around the node under mutation, and encoded the child-parent relationships of the near-by nodes to capture the AST context. Armed with the distance measure and with the help of my returning intern Małgorzata, it was easy to find the closest AST contexts from historic mutants and to look at their fate and pick the best one. I ordered the mutators by their productivity and tried to generate a mutant in the node, in that order, since it’s quite possible that some of the mutant operators are not applicable on some piece of code.

This was quite an improvement. Both mutant survivability and usefulness improved significantly for all mutant operators and programming languages. You can read more about the findings in [the upcoming paper](https://arxiv.org/pdf/2102.11378.pdf).

Mutation testing is only valuable if the test cases we write for mutants are valuable. [Mutants do not resemble real bugs](https://ieeexplore.ieee.org/document/6982626), they are simpler than bugs found in the wild. Mutation testing relies on the coupling hypothesis: [mutants are coupled with real bugs](https://dl.acm.org/doi/abs/10.1145/2635868.2635929) if a test suite that is sensitive enough to detect mutants is also sensitive enough to detect the more complex real bugs. Reporting mutants and writing tests to kill them only makes sense if they are coupled with real bugs.

I instinctively thought that fault coupling was real, otherwise I would not have worked on mutation testing at all, and I’ve seen many many cases where mutants pointed to a bug; but still, I wanted to verify this hypothesis, if only for our code base. I designed an experiment: I would generate all mutants in a line for explicit bug-fixing changes, before and after the fix, and I would check whether, had mutation testing been run, it would have surfaced a mutant in the change that introduced the bug, and potentially prevented it (i.e., killed in the change that fixed the bug and added new tests cases). I ran this experiment on weekends for over a month, because we did not have the resources to run it during workdays. While I normally generate a single mutant in a line, to test the fault coupling effect, I used the classical mutation testing approach and generated all possible mutants, while still adhering to the arid node suppression. A total of 33 million test suites were executed to test hundreds of thousands of mutants, finally to conclude that, in around 70% of cases, a bug was coupled with a mutant.

While I was at it, I also checked my intuition on whether a single mutant per line was enough, and found that it was overwhelmingly so: in more than 90% of cases, either all mutants were killed in a line or none was. It’s worth keeping in mind that I still applied my arid node suppression heuristics for this experiment. It was great to finally have confirmation of my intuitions.

I also looked into the developer behavior changes after using mutation testing on a project for longer periods of time, and discovered that projects that use mutation testing get more tests over time, as developers get exposed to more and more mutants. Not only do developers write more test cases, but those test cases are more effective in killing mutants: less and less mutants get reported over time. I noticed this from personal experience too: when writing unit tests, I would see where I cut some corners in the tests, and anticipated the mutant. Now I just add the missing test cases, rather than facing a mutant in my Code review, and I rarely see mutants these days, as I’ve learned to anticipate and preempt them.

## Conclusion

It’s been a long road since that hackathon in the winter of 2013. Mutation testing was a lot of fun to work on. It had its challenges, and I had days where I thought that I would throw everything down the drain (I’m looking at you, clang), but I am glad I stuck with it.

The most interesting part of the project was getting Mutation testing to scale to such a large code base, and that required redefining the problem and adapting it to the existing ecosystem that engineers were already used to. Another interesting angle was working, and learning from, the academic community, in particular Gordon Fraser (University of Passau) and René Just (University of Washington).

I would like to encourage everyone to give one of the many open source mutation testing tools a try on their projects. With some tweaks here and there, it can be a great way to keep your software well tested.

By George Pirocanac

This is part two of a series on test flakiness. The [first article](https://testing.googleblog.com/2020/12/test-flakiness-one-of-main-challenges.html) discussed the four components under which tests are run and the possible reasons for test flakiness. This article will discuss the triage tips and remedies for flakiness for each of these possible reasons.

### Components

To review, the four components where flakiness can occur include:

- The tests themselves
- The test-running framework
- The application or system under test (SUT) and the services and libraries that the SUT and testing framework depend upon
- The OS and hardware and network that the SUT and testing framework depend upon

This was captured and summarized in the following diagram.

![[Copy2Bof2BCopy2Bof2BTest2BFlakiness2BArticle2BII2Bfor2BExternal2BTesting2BBlog2B252812529.jpg]]

### The tests themselves

The tests themselves can introduce flakiness. This can include test data, test workflows, initial setup of test prerequisites, and initial state of other dependencies.

![[Archive/import/Google Testing Blog/New database/New database.base]]

*Table 1 - Reasons, triage tips, and remedies for flakiness in the tests themselves*

![[Archive/import/Google Testing Blog/New database/New database.base]]

*Table 2 - Reasons, triage tips, and remedies for flakiness in the test running framework*

### The application or SUT and the services and libraries that the SUT and testing framework depend upon

Of course, the application itself (or the SUT) could be the source of flakiness.

An application can also have numerous dependencies on other services, and each of those services can have their own dependencies. In this chain, each of the services can introduce flakiness.

![[Archive/import/Google Testing Blog/New database/New database.base]]

### The OS and hardware that the SUT and testing framework depend upon

![[Archive/import/Google Testing Blog/New database/New database.base]]

*Table 4 - Reasons, triage tips, and remedies for flakiness in the OS and hardware of the SUT*

### Conclusion

As can be seen from the wide variety of failures, having low flakiness in automated testing can be quite a challenge. This article has outlined both the components under which tests are run and the types of flakiness that can occur, and thus can serve as a cheat sheet when triaging and fixing flaky tests.

### References