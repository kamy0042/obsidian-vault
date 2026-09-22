---
タグ: []
作成日時: 2023-10-30T12:45:00
URL: https://adactio.com/journal/17838
Tags: [topic/組織/デザインエンジニアリング]
---
![[photo-300.jpg]]

It’s been just over two years since Chris wrote his magnum opus about [The Great Divide](https://css-tricks.com/the-great-divide/). It really resonated with me, and a lot of other people.

The crux of it is that the phrase “front-end development” has become so broad and applies to so many things, that it has effectively lost its usefulness:

> 
> Two front-end developers are sitting at a bar. They have nothing to talk about.

Brad nailed the differences in responsibilities when he described them as [front-of-the-front-end and back-of-the-front-end web development](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/):

> 
> A front-of-the-front-end developer is a web developer who specializes in writing HTML, CSS, and presentational JavaScript code.
> 
> A back-of-the-front-end developer is a web developer who specializes in writing JavaScript code necessary to make a web application function properly.

In my experience, the term “full stack developer” is often self-applied by back-of-the-front-end developers who perhaps underestimate the complexity of front-of-the-front development.

Me, I’m very much a front-of-the-front developer. And the dev work we do at [Clearleft](https://clearleft.com/) very much falls into that realm.

This division of roles and responsibilities reminds me of a decision we made in the founding days of Clearleft. Would we attempt to be a full-service agency, delivering everything from design to launch? Or would we specialise? We decided to specialise, doubling down on UX design, which was at the time an under-served area. But we still decided to do front-end development. We felt that working with the materials of the web would allow us to deliver better UX.

We made a conscious decision *not* to do back-end development. Partly it was a question of scale. If you were a back-end shop, you probably had to double down on one stack: PHP or Ruby or Python. We didn’t want to have to turn away any clients based on their tech stack. Of course this meant that we had to partner with other agencies that specialised in those stacks, and that’s what we did—we had trusted partners for Drupal development, Rails development, Wordpress development, and so on.

The world of front-end development didn’t have that kind of fragmentation. The only real split at the time was between Flash agencies and web standards (HTML, CSS, and JavaScript).

Overall, our decision to avoid back-end development stood us in good stead. There were plenty of challenges though. We had to learn how to avoid “throwing stuff over the wall” at whoever would be doing the final back-end implementation. I think that’s why we latched on to design systems so early. It was clearly a better deliverable for the people building the final site—much better than mock-ups or pages.

Avoiding back-end development meant we also avoided long-term lock-in with maintainence, security, hosting, and so on. It might sound strange for an agency to actively avoid long-term revenue streams, but at Clearleft it’s always been our philosophy to make ourselves redundant. We want to give our clients everything they need—both in terms of deliverables and knowledge—so that they aren’t dependent on us.

That all worked great as long as there was a clear distinction between front-end development and back-end development. Front-end development was anything that happened in a browser. Back-end development was anything that happened on the server.

But as the waters muddied and complex business logic migrated from the server to the client, our offering became harder to clarify. We’d tell clients that we did front-end development (meaning we’d supply them with components formed of HTML, CSS, and JavaScript) and they might expect us to write application logic in React.

That’s why Brad’s framing resonated with me. Clearleft does front-of-front-end development, but we liaise with our clients’ back-of-the-front-end developers. In fact, that bridging work—between design and implementation—is where devs at Clearleft shine.

As much as I can relate to the term front-of-front-end, it doesn’t exactly roll off the tongue. I don’t expect it to be anyone’s job title anytime soon.

That’s why I was so excited by the term “design engineer,” which I think I first heard from Natalya Shelburne. There’s even [a book about it](https://www.designbetter.co/design-engineering-handbook/) and the job description sounds very much like the front-of-the-front-end work but with a heavy emphasis on the collaboration and translation between design and implementation. [As Trys puts it](https://twitter.com/trysmudford/status/1362375379038707712):

> 
> What I *love* about the name “Design Engineer”, is that it’s entirely focused on the handshake between those two other roles.
> 
> There’s no mention of UI, CSS, front-end, design systems, documentation, prototyping, tooling or any ‘hard’ skills that could be used in the role itself.

Trys has been doing some soul-searching and has come to the conclusion “[I think I might be a design engineer…](https://www.trysmudford.com/blog/i-think-im-a-design-engineer/)”. He has also written on the Clearleft blog about how well the term describes [design and development at Clearleft](https://clearleft.com/posts/design-engineering-and-development-at-clearleft).

Personally, I’m not a fan of using the term “engineer” to refer to anyone who isn’t actually a qualified engineer—I explain why in my talk [Building](https://adactio.com/articles/16334)—but I accept that that particular ship has sailed. And the term “design developer” just sounds odd. So I’m all in using the term “design engineer”.

I *can* imagine this phrase being used in a job ad. It could also be attached to levels: a junior design engineer, a mid-level design engineer, a senior design engineer; each level having different mixes of code and collaboration (maybe a head of design enginering never writes any code).

Trys has written a whole series of posts on the nitty-gritty work involved in design engineering. I highly recommend reading all of them: