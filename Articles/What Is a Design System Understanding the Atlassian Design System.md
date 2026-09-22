---
title: "What Is a Design System? Understanding the Atlassian Design System"
source: "https://medium.com/@parmesh1042/what-is-a-design-system-understanding-the-atlassian-design-system-a398174a5ad9"
author:
  - "[[Parmeshwar]]"
published: 2026-06-16
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/リファレンス
---
📚 Atlassian Design System Explained — Part 1

Have you ever worked on a project where five different buttons looked almost identical - but each one had slightly different styling?

I recently started learning the [Atlassian Design System](https://atlassian.design/foundations) and quickly realized that one of its biggest strengths is solving a problem many development teams face every day: inconsistency.

### So, what exactly is a design system?

A design system is a collection of principles, foundations, reusable components, and patterns that help teams build consistent and accessible user experiences at scale.

Think of it as a shared language between designers and developers that ensures products look, feel, and behave consistently.

## The Problem

Imagine a team of **50 developers** working on a large application.

One developer creates a **button** with a **4px** border radius, a **grey** background, and **14px** text. Another developer creates a similar button but uses an **8px** border radius, a different shade of **grey**, and **16px** text.

Both buttons solve their immediate requirements, but over time the application ends up with multiple variations of the same component.

As the product grows, this creates several challenges:

- Duplicate code across teams.
- Multiple versions of the same UI component.
- Inconsistent user interfaces.
- Increased maintenance costs.

Now imagine the company decides to update its branding. Developers must search through hundreds of pages and components to update colors, typography, spacing, and other visual elements.

This process is time-consuming, error-prone, and difficult to test thoroughly.

![inconsistent buttons and UI components](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*e-YK5jNE5NUBMUUKedwIZQ.png)

inconsistent buttons and UI components

## Why It Matters

Users expect a predictable experience when using software.

When every screen behaves differently, users must continuously relearn how to interact with the application. This increases friction and reduces confidence in the product.

For development teams, inconsistency creates additional challenges:

- Slower development cycles.
- Higher maintenance costs.
- Increased risk when making visual updates.
- Difficulty maintaining accessibility standards.

What starts as a few styling differences can eventually impact both user experience and engineering productivity.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZxAn8LW-svQ3cRpKvaamFA.png)

## How Atlassian Solves This Problem

Atlassian addresses these challenges through its Design System, which is built around three key concepts.

### Foundations

Foundations define the core building blocks of the user experience, including:

- Colors
- Typography
- Spacing
- Elevation
- Design tokens

These standards ensure visual consistency while supporting accessibility and usability across products.

### Components

Components are reusable UI building blocks such as:

- Buttons
- Text fields
- Modals
- Progress indicators
- Toast notifications

Each component is designed and tested to follow the rules established by the foundations.

### Patterns

Patterns combine multiple components and foundations to solve common user problems.

Instead of focusing on individual UI elements, patterns provide proven solutions for common workflows and interactions.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pyxDAgRuyKTPEVIwuHr6Kw.png)

## Simple Example

Suppose a developer needs a button, modal, or toast notification.

Instead of creating a new implementation from scratch, they can use a pre-built Atlassian component.

This provides several benefits:

- Faster development.
- Consistent styling.
- Built-in accessibility.
- Reduced maintenance effort.

The developer can focus on business logic rather than repeatedly solving the same UI problems.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*XKWPlGsvKvuECJPAz83NpQ.png)

## Real-World Use Case

Consider Atlassian’s investment in Artificial Intelligence features.

Products such as Jira and Confluence could have built entirely different AI chat experiences. Instead, teams can leverage shared design patterns and components from the Design System.

As a result:

- The interfaces look familiar.
- User interactions behave consistently.
- Users can move between products without learning a new experience.

This creates a more cohesive Atlassian ecosystem.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yn775SRW6mhGFAhOOOpHyw.png)

## Key Takeaways

A Design System is much more than a collection of reusable components.

It serves as a shared language between designers and developers, helping teams build products that are consistent, accessible, and scalable.

By standardizing the foundations, components, and patterns used across applications, teams spend less time worrying about pixels and more time solving meaningful user problems.

For users, the result is simple: a product that feels familiar, trustworthy, and easy to use.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vb7zRMj4sAI3_qi-rgWLIw.png)

## What’s Next?

In this article, we explored why design systems exist and how the Atlassian Design System helps teams build consistent and scalable user experiences.

In the next article, we’ll dive into Foundations — the building blocks of the Atlassian Design System. We’ll explore colors, typography, spacing, elevation, and design tokens, and understand how they work together to create a consistent visual language across products.

Stay tuned for Part 2: Foundations.

Thanks for reading, and happy learning! 🚀