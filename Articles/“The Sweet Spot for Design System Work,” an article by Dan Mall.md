---
タグ: []
作成日時: 2023-12-15T12:00:00
URL: https://danmall.com/posts/the-sweet-spot-for-design-system-work/
Tags: [topic/デザインシステム/運用・浸透]
---
There’s a narrow window for effective design system work. It sits squarely in the center of a spectrum that’s too easy to slide towards one end or the other.

![[sweet-spot-design-system-work.svg]]

Effective design system work sits on a spectrum between being a Component Factory and being Staff Augmentation

## The ends of the spectrum

On one end is where a lot of design system efforts often begin. Many design systems start when a designer and/or engineer makes a handful of components that they don’t want to keep making from scratch over and over again. Those handful of components serve them well to start, so they decide to make more. Pretty soon, they have a multitude of components at their disposal.

The problem is that they often don’t bother to 1) test these components with anyone that would need to use them or 2) see if anyone needs them with any type of urgency. So, their design systems end up being a lot of components that *could* be used *someday* by *someone* but actually *isn’t* used *today* by *anyone*. This is what I refer to as a “design system ghost town,” a fully built city with no inhabitants.

I have a name for the kinds of teams who create design system ghost towns. I call them **Component Factories**.

On the other side of the spectrum are teams who, in contrast, see the value of working directly with the people who would use their components. Very often, these are teams who have experienced the folly of being a Component Factory, so they try to correct for that. Unfortunately, they often overcorrect. They ask product teams what they need, receive requirements, and get to work designing and building components on behalf of the team they're partnering with.

It’s easy to justify this work too, because it feels good. When you’re a Component Factory, no one seems to want what you have and are freely offering. Now, product teams are working directly with you, you’re giving them what they need, and they’re using it. This is a [design system as a service](https://danmall.com/posts/what-is-a-design-system/#5.-design-system-as-a-service), right? You provide components, and they use them! You’ve made it! Success!

Unfortunately, this is closer to being **Staff Augmentation** to product teams than a design system team. It’s not much more than being an extra set of hands. And, if that was the only problem, that wouldn’t be so bad. But there are a few major issues that come with this kind of role:

1. As Staff Augmentation, there’s not a great way to negotiate discrepancies within the same component between multiple teams. For example, if Product Team A needs a Card component to support 2 images and Product Team B needs a Card component to support 3 buttons, an easy enough solution would be to build a Card component that supports 2 images and 3 buttons. But Product Team A might not get why their Card has 3 buttons they don’t need, and Product Team B might not get why their Card has 2 images they don't need. The easiest solution is to build 2 different versions of the Card component, 1 for each team, which kinda defeats the purpose of design system work.
2. The biggest issue that Staff Augmentation teams run into is that their capacity to work with product teams is lower than the number of product team needs. For example, the design system team might have the capacity to work with 5 teams at a time, but there may be 50 teams that want and/or need their help. So, at any given time, there will always be 45 teams who “lose faith” in the design system team.

What’s a better way? What’s the sweet spot between Component Factory and Staff Augmentation?

Working relentlessly and methodically at appropriate scale.

Here’s how to get that done.

## Effective design system work

As early as you can, establish an expectation with all product teams that the design system team’s job is to only work on the highest coverage components at scale. That means that you will only prioritize requests that 3 or more teams have in common. (Why 3? Because [three times is a pattern](https://danmall.com/posts/three-times-is-a-pattern/).) This way, one chunk of effort from the design system team has at least three points of impact. (As opposed to Staff Augmentation teams, where one chunk of effort has only one point of impact: the direct product team you’re working with.)

Don’t Component Factories solve this problem? After all, if they build a fitting enough Card component, that one chunk of effort can have dozens or even hundreds or even thousands of points of impact!

First of all, a design system [doesn’t have to cover every interface your organization creates](https://danmall.com/posts/design-system-coverage/)… only [the most common ones](https://danmall.com/posts/identifying-useful-design-system-patterns/).

Secondly, this is a part of systems work that I rarely hear talked about: **some components have *****too***** broad of a reach to tackle wisely, especially in the early days of that design system.**

Blasphemy! Isn’t the point of a design system to have the widest coverage possible? Yes, but it has to be proportional to the scale the team is ready to handle. The team’s experience, capacity, and discipline are all important factors in deciding which components are appropriate to attempt.

(This is exactly why I’m bullish on avoiding “[foundational](https://danmall.com/posts/folly-of-design-system-foundations/)” or “atomic” components as an early step in a design system’s life. [Tackling the Button component](https://youtu.be/mPXljWeWu3g?si=BXC5h75X2IrIorBk&t=699) or trying to establish design tokens first is like starting a video game by playing the final boss. You’re just not ready.)

Think about the moment a design system team builds their first component… let’s say it’s a generic Card component. Until that moment, 0 teams have used anything the design system team has made, because they haven’t made anything yet. They make a great, usable Card component, one than has immediate applicability in hundreds of places. Suddenly, in an instant, they’ve gone from 0 customers to hundreds of customers, each with their own individually urgent needs.

Very few good products have scaled effectively this way, by opening the floodgates to everyone right at the outset.

Facebook started as a network for Harvard students, then expanded to other Ivy League universities, then opened up to all U.S. and Canadian colleges and universities, and then eventually to the broader public.

Tech startups like [The Browser Company](https://thebrowser.company/) with their Arc browser, [Superhuman](https://superhuman.com/), [Loom](https://www.loom.com/), and more [employed a wait list system](https://www.theverge.com/2013/7/30/4567794/mailbox-loom-cloud-app-wait-lists) to help throttle their scaling challenges.

So why do we expect that design system teams go directly from no customers to immediately serving an entire enterprise organization?

The only thing that opening the floodgates on day 1 accomplishes is drowning the design system team.

## A strict criteria for choosing components and teams

What’s a better way? Start by finding something that works at the smallest scale possible. For design systems, that means it works in 3 places… and ideally no more, at least not right now. (The smallest scale for design system work isn’t 1 place; that would be Staff Augmentation work again.)

One of the biggest challenges with finding a component that works in 3 places but not more is that there likely aren’t very many, at least not innately. The nature of enterprise interface design is such that components are often either a one-off or they’re widespread; there’s not much middle ground.

So you create the middle ground. **Consciously restrain the reach of a component through strict criteria.** Instead of saying, “We’re going to make a Card component for everyone,” decide “we’re going to make a Card component for these three teams.” This is the idea of [piloting a component](https://danmall.com/posts/design-systems-pilots-scorecards/) with a few testers before you release it to everyone.

How do you pick the initial three feature teams to pilot with? Start naming components that have as much of this criteria as possible, in this order:

3. A team that needs this component is incredibly excited to work with us *right now*.
4. A team that needs this component has deadlines/a roadmap that can adopt a somewhat slow back-and-forth collaboration process with us.
5. This component is needed around 6-8 weeks from today… not before, not after.
6. This component would excite a high percentage (start at 50%) of other feature teams
7. This component would save at least 1 day of work for a high percentage (start at 50%) of other feature teams
8. This component has technical requirements that can be met in less than 6-8 weeks
9. This component could be used *immediately* by 3 *additional* teams as soon as we finish refining it with the first set of 3 teams

For most teams I’ve worked with, it’s initially difficult to even name *1* feature team that fits all of this criteria! (That’s why many design system teams resort to being Component Factories or Staff Augmentation; it’s easier.) The difficulty usually lies in timing: no feature team needs a component like this soon—they’ll probably need it in 6–12 months though—or they already needed it and it’s too late.

This is incredibly irritating, but it’s a blessing in disguise! This is kind of true constraint that allows you to not have to immediately serve an entire organization when you’re not ready to.

Push through! Every team I’ve worked with has eventually been able to generate a list of components and features teams; it just takes a few weeks of workshopping and having conversations with various product managers, designers, and engineers around the org.

I think a design system team should have a list that meets this criteria at any given time. Design system teams that don’t have this list easily find themselves sliding toward either end of the spectrum.

Here's a list of scenarios that are close but aren’t actually forms of effective design system work:

- Team A needs Card, Team B needs Notification, and Team C needs Stepper. (That’s Staff Augmentation.)
- Team A needs Card in Q1, Team B needs Card in Q2, and Team C needs Card in Q3. (This is a form of Staff Augmentation, even though it doesn’t look like it. This version will have you constantly modifying the component to suit individual needs, often undoing or reversing changes you made prior.)
- Teams A, B, and C need Card in 2025. (A form of Component Factory work: you’re making something that *might* get used *someday*. It doesn’t sound like it, but the farther away a component need is, the higher the likelihood that the need will change before you get around to it.)
- Teams A–Z need Card in 6–8 weeks. (This is a good potential for effective design system work, but it’s too many teams to serve well simultaneously unless you’re a very mature team and/or have many people available to meet this scale.)

## Putting it all together

In short, what should a design system team constantly be searching for?

**A manageable amount of teams for us to work with simultaneously need the same component within the same timeframe.**

Anything else isn’t really work worth doing for a design system team.

It’s a simple sentence that’s contingent upon the right amounts of skill, will, and luck… way easier said that done. This is why design system work is often described as the stars aligning.

Read Next

# [Does Web Design Matter?](https://danmall.com/posts/does-web-design-matter/)

Join 37,100+ subscribers to the weekly Dan Mall Teaches newsletter. I promise to keep my communication light and valuable!