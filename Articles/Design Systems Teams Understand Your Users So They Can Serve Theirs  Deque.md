---
タグ: []
作成日時: 2024-01-16T19:18:00
URL: https://www.deque.com/blog/design-systems-teams/
Tags: [topic/デザインシステム/運用・浸透, topic/組織/組織文化]
---
![[Design-Systems-Teams-Blog-Image.png]]

Computer monitor and mobile phone screen surrounded by design systems icons: pressing play, zooming in, turning up sound, clicking keyboards and talking into devices.

Welcome to the next edition of my Design Strategy blog series. Today, I’ll be sharing a story from some recent client visits that will help y’all recognize WHY you should do things differently to mature and scale your digital accessibility program quickly. I will once again skip the “how-to” dry laundry lists of tactical “do this/don’t do that” mechanics.

I will be using the terms Design System and Component Library interchangeably. Brand and style guidelines, however, are a horse of a different color as they say, and these terms will stand on their own.

On to the story…

## The Problem

I recently completed back-to-back visits with two clients. In both cases, since we were onsite (and therefore within their network) I asked if we could take a few moments to put eyes on their design systems. To clarify, I wanted to look at accessibility information related to the components–not the WCAG conformance of the design system itself. Both generously agreed.

In both scenarios the system was mature (2–3 years into development) and anecdotally industry-leading. We’re talking about 75+ components with code, documentation, examples, usage guidance, and the beginnings of reusable design documentation. I asked if we could focus on the user experience items that I noticed before we looked at accessibility-related things.

Universally, the data was digestible if you had significant time to sit and interpret the content; but it was laid out poorly for quick consumption. The designers of the design system failed to follow standard user experience design rules/techniques related to layout, hierarchy, labeling and titling, etc. Most importantly, they hadn’t involved their end users in the design process. So, the system was designed to be consumed by the design system team itself–not designers, developers, and testers/quality engineers. It was very evident it was written as a repository of data and rules, not as a tool for digital teams to actually use.

This is a critical part of the problem story as the accessibility information pertinent to the component was written to be relevant to an accessibility subject matter expert (SME), *not* the intended users—who were decidedly NOT accessibility SMEs. The component cited WCAG rules but didn’t put them in terms the real users needed to understand; best practices for WCAG success criteria were not even touched on. For example, [Name/Role/Value](https://www.deque.com/blog/name-role-value-design/) information of the checkbox entry was not even mentioned, let alone clearly called out) in the documentation. There were images for checked and unchecked states, but no documentation on whether the brand standard was for the end user to opt-in or opt-out of the checkbox. There was no content showcasing a successful screen reader interaction with the component to help the developer with implementation or the tester with testing.

## The ‘A-ha!’ Moment Followed by Contemplation, Insights and Some Colorful Commentary

In both cases, as I laid out my user experience observations the teams had their a-ha moments, seeing their content through another’s eyes for the first time. You know the moment I mean, right? They go quiet, maybe pale a little bit, audibly gulp, and in some cases, drop an expletive (or two). Let’s just say, the words dropped were *very* colorful!

Simulating a designer’s role, we took a moment to walk through a component for potential implementation. As the designer, I needed a checkbox in a newsletter sign-up form for the end user to agree to the terms of the company’s use of their email in future transactions. I encouraged everyone to “play along” and list out (in importance order) what information we would need to review if we had multiple components to choose from: usage guidance, state descriptions, visuals, do’s & don’ts, exceptions, design [tool] snippets to load into our wireframes, assurances that this component was WCAG 2.1AA conformant, and accessibility guidance.

Given that there was only one checkbox in the design system, it didn’t take a lot of brain power to decide we were going to use it. But, looking at their interface, only half of the data needing review was available. And, the information that *was* available wasn’t presented in the correct order (see paragraph above). Meaning that, as users, we would have to hunt for what we needed and then guess at the rest of the information.

I clicked on another component and they quickly saw that it had different information than the checkbox component) and that it was presented in yet a different order. As a user, I would need to relearn the information layout with each new component, which would dramatically increase my cognitive load, not to mention velocity. Let’s just say there were more sighs and very colorful expletives dropped.

It is critical that you, dear reader, understand that the hard work you have already put into your accessibility program and/or design system is not wrong or worthless. Everything you’ve done is on the maturity spectrum. The desire, effort, and ambition to make what you have so far is in no way diminished here. Having someone like me come in and quickly identify things that can be improved on is the ‘forest for the trees’ phenomenon. You are very close to it, so your objectivity is obscured. Trust me, I’ve been there. It often takes fresh eyes with a fresh perspective to see the whole “forest”. Take a deep breath and focus on the horizon–the destination. Take pride in what you’ve built thus far and gather the energy to take things to the next level. Kumbaya!

## What Can We Do with These Insights

Each client said that this exercise quickly showed them where they needed to go next to bring their design system to the next level of maturity. Here are some additional insights I shared with them:

### General

- Make sure you’re focusing on the real end users, e.g., designers, developers, testers, etc. Use design thinking exercises with your end users to explore what they need and how they need it to be successful in their jobs.
- Be consistent with (per component) page layout. This will reduce cognitive load while providing user efficiency by knowing exactly where to go for the information they need. NOTE: If a section of data does not apply to a specific component, list the section with a ‘not applicable’ label; do* not* remove it! The user will be anticipating information in specific locations and order.
- Be cognizant of multi-user tenancy. Find a homogenous presentation format that’s relevant for multiple users. This should include type of data, tone, and relevancy of data. For example: Including the Name/Role/Value information clearly called out helps the designer understand the screen reader user’s experience, helps the developer with their coding, and helps the tester know what the correct scenario is for that component. Anything other than *that* experience should be logged by the tester as a defect.

### Testing

- Provide test scripts for each component. This will enable testers to easily replicate the test for that component. Include the completed design system team’s test scripts to confirm the component is conformant prior to its implementation. This will also passively communicate that defects found after component placement would have to have been introduced after they were imported by development. If there are WCAG Success Criteria that cannot be tested until the component is in place, make note of this in the test script to jog the tester’s memory.
- Test to WCAG 2.2AA conformance *regardless of the level stated in your policy*. Keeping all components in the design library at the highest available WCAG level will give teams a jumpstart to meet future policy changes.
- Clearly demonstrate “success” information to aid testers. For instance, include a video of the screen reader correctly announcing the component.

### Standards

- Include all specific and applicable accessibility information (as if it is an annotation) for the component. For example, what is the Name/Role/Value of the checkbox in both the checked and unchecked states. Provide brand-preferred usage with the component. In the case of the checkbox, the usage might be for users to opt-in for terms and conditions (or similar) and opt-out for all other cases.
- Include guidelines or standards in your design system for universal items such as how telephone numbers or currency amounts should be announced by a screen reader.
- Consider hyper efficiency by incorporating your brand and style guidelines into the design system instead of having separate documents. If you need to maintain them as separate documents, provide easy links to them in your design system’s top-line navigation.
- Take your accessibility documentation to the next level: specify (and label) best practices versus WCAG normative Success Criteria. For instance: X is a WCAG Best Practice (optional) but is part of your brand (required). This will allow users to know which best practices they must address. Know that it might take you some time as an accessibility program to land on definitive best practices and document them. That’s perfectly fine.
- Passively communicate WCAG conformance data at the component level. Not only will it reiterate the need for conformance to your users, it will also allow your design system team to independently up the conformance level during times of transition.
- Design systems with a high level of maturity will have unique entries for components that meet AA-levels and similar components that meet AAA-level. Each will have clear documentation on why and how they meet the different levels and offer usage guidance to help the user determine why they would use one over the other in their implementation.

### Collaboration

- Make sure that your design system (preferably at the component level) has an easy defect reporting process. As we have all experienced, not all scenarios can be tested during the component design and development process. Installers may be able to break the component when used in an untested scenario.
- Be a team that is easy to work with. Allow your colleagues to engage you easily and respond quickly to their needs. You are a service provider with a user that is blocked. It’s critical to get them operational as quickly as possible with a strong sense of customer service. We see higher design system adoption rates when the design system team is seen as easy to work with.
- Create quality loops for your design system team. Hold retrospectives or periodic reviews of implementation issues, problems, complaints, and questions to optimize your process, your documentation, and the design system itself. Whenever possible, include digital team members that are beyond the core design system team.

### Leadership

As a leader, balance ‘trust’ versus ‘blind trust.’ Evident in both scenarios: the leaders I was working with trusted their staff to execute well, however, they themselves were not users or reviewers of the design system. They were shocked to see the lack of continuity which was leading to user confusion and contributing to their adoption issues. As a leader, you should absolutely trust your team to execute their work well, but you also need to be a member of the team and use your more senior skills to provide an outside-in perspective. Help your team step back periodically to look at the forest–not *just* the trees. If you‘re leading a team that is outside your core skill set, make sure the team has users provide periodic reviews and feedback on content, usability, continuity, delivering on purpose, etc. during the design/development process, not just after it’s complete and in front of the users.

## Why I Love This Approach for Solving Design Problems at Scale

These are a few of the many reasons why I love this approach:

- You can quickly scale your design system usage and rapidly extend accessible components with a strong foundation, a robust page layout, and a clear plan by delivering information in a format that will allow designers, developers, and testers to quickly accomplish their goals. (You might even be wildly popular to boot!)
- Baking accessibility into the components will greatly reduce technical debt further down your SDLC.
- Build confidence and trust in the design system by ensuring components meet WCAG conformance, providing evidence of its conformance, and that conformance is thoroughly labeled throughout the design system. This will reduce back and forth with developers, saving everyone significant cycles.
- By being a team that’s easy to work with, you will increase user loyalty, trust, and ongoing use of your design system.