---
title: "When Design and Engineering Start Drifting Apart"
source: "https://medium.com/@abdullasulaiman/when-design-and-engineering-start-drifting-apart-00337ce85235"
author:
  - "[[Mohamed Abdulla]]"
published: 2026-08-31
created: 2026-09-13
description: "More"
tags:
  - "clippings"
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*R_CswabE1Dfacas-5HD-JQ.png)

**A design system rarely breaks in one big moment.**

It usually starts with something much smaller.

A designer adds a new variant to a component.

An engineer builds a slightly different version because the existing component doesn’t support the requirement.

A Figma update doesn’t make it into the code.

A code change doesn’t make it back into Figma.

Someone says, “We’ll fix it later.”

And later never comes.

A few months pass.

Now there are three versions of the same component.

Nobody is quite sure which one is right.

This is how **design and engineering start drifting apart.**

Not because either team stopped caring.

Usually, both teams are doing exactly what they think is right.

That’s what makes this problem interesting.

## It rarely starts with bad intentions

Let’s take a simple example.

A designer needs a new button state for an upcoming feature.

The design system has a Button component, but it doesn’t quite support what they need.

So they create a new variant.

From the design side, this makes perfect sense.

The experience needs it.

The design is ready.

Now it goes to engineering.

The engineer looks at the existing Button API.

The new variant doesn’t fit cleanly.

Changing the shared component could affect 40 other consumers.

The feature needs to ship next week.

So the engineer does what most engineers would probably do.

They create a small extension.

Maybe it’s another prop.

Maybe it’s a wrapper.

Maybe it’s a local component.

The feature ships.

Everyone moves on.

Nothing seems wrong.

Until the next team needs the same thing.

They find the local implementation.

Copy it.

Change it slightly.

Now we have two versions.

Six months later, someone asks:

> *“Why do we have four different button components?”*

And nobody remembers how it happened.

## This is where the drift becomes expensive

The problem isn’t really four buttons.

The problem is that **the decision was made four times.**

That’s the part we don’t see immediately.

Every duplicate component creates another set of decisions.

Another API.

Another implementation.

Another design definition.

Another set of tests.

Another place to document.

Another thing to maintain.

And when the product requirement changes, the same decision has to be revisited again.

This is one of the hidden costs of design-system drift.

**You start paying for the same decision repeatedly.**

## Design moves differently from engineering

There is another reason this happens.

Design and engineering don’t operate at the same speed.

A designer can open Figma and change a component in a few minutes.

Change the padding.

Add a variant.

Introduce a new state.

Rename something.

Done.

Engineering has a different reality.

A seemingly small component change might involve:

- existing consumers
- API compatibility
- accessibility
- tests
- visual regression
- documentation
- release cycles
- migration
- production risk

So when someone says:

> *“It’s just a small design change.”*

It might actually be a fairly significant engineering change.

And when an engineer says:

> *“We can’t change this right now.”*

That doesn’t necessarily mean engineering is being difficult.

There may be 50 products depending on that component.

Both perspectives are valid.

The problem starts when **we don’t have a way to connect those perspectives.**

## Figma can be right. Code can also be right.

This is probably one of the strangest situations in a mature product.

You open Figma.

The component looks correct.

You open Storybook.

The component looks correct there too.

But they aren’t actually the same component anymore.

The design version has six variants.

The coded version has four.

The names are slightly different.

The spacing is slightly different.

The interaction behavior is different.

The states don’t match.

And nobody can point to a single moment where things went wrong.

That’s drift.

It’s not necessarily a bug.

It’s **two systems slowly evolving independently.**

## Engineering creates drift too

It’s easy to point fingers at design here.

“Design keeps changing things.”

“Design doesn’t understand engineering complexity.”

Sometimes that’s true.

But engineering is equally capable of creating drift.

A product team has a deadline.

The shared component doesn’t support their use case.

They could wait for the design system team.

Or they could build it locally.

They build it locally.

The reasoning is usually completely understandable.

The problem isn’t the local solution.

The problem is when nobody comes back to ask:

**Should this now become part of the shared system?**

That second step is where many teams fail.

Temporary solutions have a funny habit of becoming permanent architecture.

## The most dangerous phrase in a design system

There are a few phrases I’ve learned to be careful with.

One of them is:

> *“Let’s just make it configurable.”*

Need a different padding?

Add a prop.

Need another color?

Add a prop.

Need another layout?

Add a prop.

Need a slightly different interaction?

Add another prop.

At some point, the component stops being a component.

It becomes a configuration engine.

You started with:

```c
<Button variant="primary" />
```

And eventually arrive at something like:

```c
<Button
  variant="primary"
  size="large"
  tone="brand"
  appearance="filled"
  customPadding={...}
  disableHover={...}
  iconPosition="..."
/>
```

Technically, it is reusable.

But is it still understandable?

That’s a different question.

A good design system isn’t one where everything is configurable.

**It’s one where the right things are configurable and the wrong things are intentionally constrained.**

## Treat design-system components like APIs

This is where I think engineering can bring a useful mindset into the conversation.

A design-system component isn’t just a visual object.

It behaves more like an API.

It has:

**Inputs**

What can consumers configure?

**States**

What happens when something is loading, disabled, focused, errored, empty, or unavailable?

**Constraints**

What is intentionally not supported?

**Behavior**

How does it respond to user interaction?

**Compatibility**

What happens when we change it?

Once you start thinking about components this way, design discussions become much more useful.

Instead of:

> *“Can you make the component look like this?”*

The conversation becomes:

> *“What are we actually adding to the component contract?”*

That’s a very different conversation.

And usually a better one.

## The handoff model is part of the problem

A lot of teams still operate like this:

**Design → Handoff → Engineering → Done**

That worked reasonably well when design was mostly a set of static screens.

Modern products are not static.

Components have behavior.

They have states.

They have responsive rules.

They have accessibility requirements.

They have technical constraints.

So I don’t think design should “finish” something and then throw it over the wall to engineering.

The better model is:

**Design ↔ Engineering**

Design explores the experience.

Engineering explores the implementation.

Design challenges technical assumptions.

Engineering challenges unnecessary complexity.

Both sides shape the final component.

The best components I’ve seen usually come from this kind of collaboration.

Not from a perfect handoff document.

## The design system should be the shared language

A healthy design system gives both teams a common vocabulary.

When a designer says:

> *“Use the Modal.”*

Engineering knows exactly what that means.

When engineering says:

> *“That behavior isn’t supported by the Modal contract.”*

Design understands the limitation.

When product asks:

> *“Can we customize this just for this feature?”*

Both teams can have a meaningful conversation about whether that belongs in the system.

That’s the real value of a design system.

It’s not just visual consistency.

**It’s shared understanding.**

## But here’s the thing

Design and engineering don’t need to agree on everything.

In fact, they shouldn’t.

If design always gets what it wants, you probably have an engineering problem.

If engineering always gets what it wants, you probably have a design problem.

Healthy systems have disagreement.

A designer might push for an experience that doesn’t fit the current implementation.

An engineer might find a better way to achieve the same outcome.

A product team might have a legitimate edge case.

That’s okay.

The goal isn’t to eliminate divergence.

The goal is to make divergence **intentional.**

There is a big difference between:

> *“We did something different because we intentionally made a product decision.”*

and:

> *“We did something different because nobody knew what the shared component supported.”*

The first is a decision.

The second is drift.

## So how do you know you’re drifting?

You can usually see the signs.

You start hearing:

> *“I think there’s another component for that.”*
> 
> *“The Figma version is slightly different.”*
> 
> *“That’s not how the component works in code.”*
> 
> *“We had to create a local version.”*
> 
> *“We’ll migrate it later.”*
> 
> *“I don’t know who owns this.”*
> 
> *“Just override it for this page.”*

None of these statements sounds particularly dangerous on its own.

Together, they are a warning sign.

Your design system is slowly developing two sources of truth.

## The answer isn’t more meetings

This is another trap.

When teams notice drift, the first response is often:

“Let’s have a weekly sync.”

Maybe that helps.

But meetings don’t fix broken contracts.

What helps more is making the relationship between design and engineering explicit.

For important components, both sides should understand:

- What problem the component solves
- What states it supports
- What is configurable
- What is intentionally constrained
- Who owns changes
- How changes are communicated
- How design and code stay aligned
- What happens when a product needs something outside the system

The exact process doesn’t matter as much as having one.

## Don’t aim for perfect synchronization

There is one thing I wouldn’t try to solve.

Perfect synchronization.

It’s not realistic.

Design will evolve.

Engineering will evolve.

Products will evolve.

Sometimes the code will be ahead of Figma.

Sometimes Figma will be ahead of code.

That’s okay.

The goal is not to eliminate the gap.

The goal is to make the gap:

**Visible.**

**Intentional.**

**Easy to correct.**

That’s a much more realistic standard.

## The real design system isn’t Figma or Storybook

This is probably the biggest lesson for me.

A design system isn’t successful because the Figma component perfectly matches the Storybook component.

Those are just artifacts.

The real system is the **relationship between the people and decisions behind them.**

When design and engineering make the same decisions for the same reasons, the system becomes strong.

When they start making decisions independently, the system starts to fragment.

First you see small differences.

Then exceptions.

Then local implementations.

Then duplicated components.

And eventually, people stop trusting the system.

That’s when adoption really starts to fall apart.

## One last thought

If you want to know whether your design system is healthy, don’t just ask:

**“Are our components consistent?”**

Ask:

**“Do design and engineering still have the same mental model of these components?”**

Because the moment they don’t, the drift has already started.

And by the time you see it in the UI, it’s usually been happening for a while.

**Design and engineering don’t drift apart because they work independently.**

They drift apart when **the system stops giving them a reason to work together.**