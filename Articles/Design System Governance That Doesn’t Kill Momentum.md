---
title: "Design System Governance That Doesn’t Kill Momentum"
source: "https://robertcelt95.medium.com/design-system-governance-that-doesnt-kill-momentum-1ff6c3af6b5f"
author:
  - "[[Roberto Moreno Celta]]"
published: 2025-11-18
created: 2026-04-13
description: "Design System Governance That Doesn’t Kill Momentum Your design system has 50 open contribution requests, 3 months of backlog, and teams are building their own components anyway. Here’s how to …"
Tags: [topic/デザインシステム/戦略・ガバナンス]
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*hv3Q0fVmsoHERap_)

Photo by Sunder Muthukumaran on Unsplash

**Your design system has 50 open contribution requests, 3 months of backlog, and teams are building their own components anyway. Here’s how to fix it.**

Your design system is technically successful. Components are well-documented. The code is clean. Adoption is growing.

But every contribution request takes 6 weeks to approve. Your Slack channel is full of frustrated designers asking “When will my button variant be added?” Teams are building shadow systems because the official process is too slow.

This is the governance problem. Without structure, the system becomes chaotic. With too much structure, it becomes a bureaucratic nightmare that kills momentum.

This article breaks down the contribution workflow, decision frameworks, and organizational models that let design systems evolve quickly without breaking.

## Why “Centralized Approval” Doesn’t Scale

Most design systems start with a simple model: one core team approves everything.

## The Initial Model (Works for <20 users)

```c
Product team → Requests change → Core team reviews → Approved/Rejected
```

**Why it works initially:**

- Small number of requests (2–3 per week)
- Core team knows all the context
- Fast decisions (same-day turnaround)
- High quality maintained

## The Bottleneck Problem (Breaks at 50+ users)

**What happens as the system scales:**

```c
Week 1: 5 requests → Core team reviews → 2 approved, 3 pending
Week 2: 8 requests → Core team reviews → 3 approved, 8 pending
Week 3: 12 requests → Core team reviews → 4 approved, 16 pending
Week 4: 15 requests → Core team reviews → 5 approved, 26 pending
```

**The death spiral:**

1. Backlog grows faster than review capacity
2. Wait times increase (now 4–6 weeks)
3. Teams get frustrated and stop contributing
4. OR teams build their own components (shadow systems emerge)
5. Design system team burned out from review load

## The Real Cost

**Quantified impact from our case study:**

- Average approval time: 6 weeks
- Rejection rate: 40%
- Shadow components built: 73 (across 15 teams)
- Design system team satisfaction: 3.2/10
- Product team satisfaction: 2.8/10

**The problem isn’t bad people. It’s bad process.**

## The 3-Tier Contribution Model

Different changes need different processes. Stop treating all contributions the same.

## Tier 1: Small Changes (Self-Service)

**Definition:** Changes that take <2 hours and have minimal system-wide impact.

**Examples:**

- Fix typos in documentation
- Add new color token to existing palette
- Add new size variant to existing component
- Fix obvious bugs
- Update example code

**Process:**

```c
1. Create PR
2. Automated checks pass (linting, tests, accessibility)
3. Self-merge (no approval needed)
4. Announce in Slack (transparency)
```

**Automated checks include:**

- Tests pass
- No accessibility regressions (Axe)
- No visual regressions (Percy/Chromatic)
- Documentation updated
- Changelog entry added

**Example PR template:**

markdown

```c
## Small Change: Add "xs" size to Button
**Type:** Enhancement
**Impact:** Low (additive change)
**Estimated effort:** 1 hour
### Changes
- Added \`size="xs"\` variant to Button component
- Updated Storybook stories
- Updated documentation
### Checklist
- [x] Tests added/updated
- [x] Accessibility tested
- [x] Visual regression tests pass
- [x] Documentation updated
- [x] Changelog updated
**Note:** This is a Small Change and will auto-merge after checks pass.
```

**Result:** 70% of contributions are Small Changes → no human review needed.

## Tier 2: Medium Changes (Weekly Council Review)

**Definition:** Changes that take 2–8 hours and affect multiple components or patterns.

**Examples:**

- New component variant with novel interaction
- API changes to existing component
- New pattern (not component)
- Breaking changes with migration path
- Design token structure changes

**Process:**

```c
1. Create RFC (Request for Comments)
2. Async review (Council members comment within 48 hours)
3. Weekly sync meeting (30 min discussion)
4. Decision made (approve/reject/needs-more-info)
5. Contributor implements
6. Final review and merge
```

**RFC Template:**

markdown

```c
## RFC: Add loading state to all interactive components
**Author:** @designer-name
**Date:** 2025-11-16
**Type:** Medium Change
**Estimated effort:** 6 hours
### Problem Statement
Users don't get feedback during async operations. 47% of components lack loading states.
### Proposed Solution
Add \`isLoading\` prop to Button, Link, IconButton, and Input components.
**API:**
\`\`\`jsx
  Save Changes
\`\`\`
**Visual design:** [Figma link]
### Alternatives Considered
1. **Separate LoadingButton component**
   - Pro: No API changes to existing Button
   - Con: Duplication, users confused about which to use
   
2. **Global loading indicator only**
   - Pro: Simple, one place
   - Con: Doesn't work for multiple async actions
### Impact Assessment
- Components affected: Button, Link, IconButton, Input (4 total)
- Breaking changes: None (additive only)
- Migration needed: No
- Teams requesting this: 12
### Open Questions
1. Should loading state disable the component? (Proposed: Yes)
2. What about very quick operations (<200ms)? (Proposed: Don't show spinner)
### Council Decision
- [ ] Approve
- [ ] Reject (explain why)
- [ ] Needs more information
**Decision date:** [To be filled by Council]
**Decision:** [To be filled by Council]
```

**Council Structure:**

- 4–6 members (2–3 designers, 2–3 developers)
- Rotating seats (6-month terms)
- Weekly 1-hour meeting
- Async-first (meeting for decisions only)

**Result:** 25% of contributions are Medium Changes → reviewed in 3–5 days.

## Tier 3: Large Changes (RFC + Stakeholder Buy-In)

**Definition:** Changes that take 8+ hours and have significant system-wide impact.

**Examples:**

- New major component (e.g., Data Table)
- Architecture changes (e.g., React → Web Components)
- Breaking changes requiring migration
- New design language (rebrand)

**Process:**

```c
1. Pre-RFC discussion (align on problem)
2. Formal RFC with detailed design
3. Stakeholder review (product leads, engineering leads)
4. Council review and approval
5. Pilot implementation (1-2 teams test)
6. Iterate based on feedback
7. Full implementation
8. Phased rollout
```

**Timeline:** 4–8 weeks typical

**Example: Data Table Component**

markdown

```c
## Large RFC: Data Table Component
**Type:** New Component (Large Change)
**Timeline:** 6-8 weeks
**Estimated effort:** 40 hours (design + dev)
### Business Case
- 23 teams building custom tables (maintenance nightmare)
- Accessibility issues in 18 of 23 implementations
- Estimated savings: $200K/year in maintenance
### Design Proposal
[Link to Figma with full specifications]
**Features:**
- Sorting (single and multi-column)
- Filtering
- Pagination
- Row selection
- Expandable rows
- Responsive (mobile-first)
### Technical Architecture
[Detailed component API design]
### Pilot Plan
- Phase 1: Pilot with 2 teams (Team A, Team B)
- Phase 2: Gather feedback, iterate
- Phase 3: Open to all teams
### Success Metrics
- Adoption: 50% of teams within 6 months
- Accessibility: 100% WCAG AA compliant
- Performance: <100KB bundle size
### Resources Required
- Design: 20 hours
- Development: 40 hours
- Documentation: 8 hours
- Total: 68 hours over 6 weeks
### Risks
- Scope creep (teams want custom features)
- Performance (large datasets)
- Accessibility (complex interactions)
**Mitigation:**
- Strict feature scope for v1
- Virtual scrolling for performance
- Dedicated accessibility testing
```

**Result:** 5% of contributions are Large Changes → planned as projects.

## The Decision Framework: When to Say Yes

Not every contribution should be accepted. Use this framework:

## The 3 C’s: Consistency, Coverage, Cost

### 1\. Consistency (30% weight)

**Question:** Does this align with existing patterns?

**Scoring:**

- ✅ **High (3 points):** Matches existing patterns exactly
- ⚠️ **Medium (2 points):** Extends pattern in logical way
- ❌ **Low (1 point):** Creates new pattern or conflicts

**Example:**

```c
Request: Add "outlined" variant to Card component
Evaluation:
- Button already has "outlined" variant ✅
- Input already has "outlined" variant ✅
- Consistent naming and behavior ✅
Score: 3/3 (High)
```

### 2\. Coverage (40% weight)

**Question:** How many teams need this?

**Scoring:**

- ✅ **High (3 points):** 10+ teams need it
- ⚠️ **Medium (2 points):** 3–9 teams need it
- ❌ **Low (1 point):** 1–2 teams need it

**Example:**

```c
Request: Add drag-and-drop to Button
Evaluation:
- Survey shows 2 teams need this ⚠️
- 45 teams would never use it ❌
- Very specific use case ❌
Score: 1/3 (Low)
Decision: Reject, build as team-specific component
```

### 3\. Cost (30% weight)

**Question:** What’s the maintenance burden?

**Scoring:**

- ✅ **Low cost (3 points):** Simple, well-understood, low maintenance
- ⚠️ **Medium cost (2 points):** Some complexity, moderate maintenance
- ❌ **High cost (1 point):** Complex, high maintenance, edge cases

**Example:**

```c
Request: Add Rich Text Editor component
Evaluation:
- Very complex (thousands of lines of code) ❌
- Many edge cases (browser quirks, paste behavior) ❌
- Continuous maintenance needed ❌
Score: 1/3 (High cost)
Decision: Reject, recommend third-party library
Alternative: Provide integration guide for popular editors
```

## The Scorecard

```c
Total Score = (Consistency × 0.3) + (Coverage × 0.4) + (Cost × 0.3)
9 points: Auto-approve
6-8 points: Discuss and likely approve
3-5 points: Needs strong justification
1-2 points: Reject (provide alternatives)
```

**Example Evaluation:**

markdown

```c
## Scorecard: Outlined Card Variant
**Consistency:** 3/3 (matches existing "outlined" pattern)
**Coverage:** 3/3 (12 teams requested this)
**Cost:** 3/3 (simple CSS change, low maintenance)
**Total:** 9/9 → Auto-approve ✅
```

## Federated vs. Centralized vs. Hybrid Models

The right governance model depends on team size:

## Centralized Model (Best for <50 people)

**Structure:**

- Single core team (2–4 people)
- They own all decisions
- They implement all changes

**Pros:**

- Consistent quality
- Clear ownership
- Fast decisions (no coordination overhead)

**Cons:**

- Bottleneck as you scale
- Core team burnout
- Product teams feel disconnected

**When to use:** Startups, small companies, early-stage design systems

## Federated Model (Best for 50–500 people)

**Structure:**

- Core team (2–4 people) sets direction
- Contributors from product teams implement changes
- Shared responsibility

**Pros:**

- Scales to many teams
- Product teams feel ownership
- More diverse perspectives

**Cons:**

- Coordination overhead
- Quality variance (different contributors)
- Slower decisions (more people involved)

**When to use:** Mid-size companies, established design systems

**Implementation:**

## Get Roberto Moreno Celta’s stories in your inbox

Join Medium for free to get updates from this writer.

markdown

```c
## Federated Model Structure
**Core Team (2-4 people):**
- Set vision and strategy
- Define guidelines and standards
- Review and approve contributions
- Maintain critical infrastructure
**Contributors (anyone):**
- Propose new components/changes
- Implement approved changes
- Maintain components they own
- Participate in Council (rotating)
**Council (4-6 people, rotating):**
- 2-3 from Core Team
- 2-3 from product teams (6-month terms)
- Weekly review of Medium/Large changes
- Decision-making authority
```

## Hybrid Model (Best for 500+ people)

**Structure:**

- Central platform team (design system infrastructure)
- Guild model (specialized groups)
- Federated contributions

**Pros:**

- Scales to enterprise
- Specialization (accessibility guild, performance guild)
- Distributed decision-making

**Cons:**

- Complex coordination
- More process overhead
- Risk of fragmentation

**When to use:** Large enterprises, global teams

**Implementation:**

markdown

```c
## Hybrid Model: Guild Structure
**Central Platform Team (4-6 people):**
- Infrastructure and tooling
- Documentation platform
- Release management
- Support and training
**Guilds (3-5 people each):**
- **Accessibility Guild:** Reviews all changes for a11y
- **Performance Guild:** Reviews bundle size, optimizations
- **Content Guild:** Reviews documentation, writing style
- **Mobile Guild:** Reviews mobile-specific patterns
**Product Teams:**
- Contribute components
- Implement design system
- Provide feedback
**Decision Flow:**
1. Proposal → Relevant Guild reviews
2. Guild approves → Central team reviews
3. Central team approves → Merge and release
```

## Handling Rejected Contributions (Without Crushing Morale)

Rejection is necessary, but how you reject matters.

## The “Yes, And…” Framework

Never just say no. Always provide a path forward.

### Scenario 1: Good idea, wrong time

markdown

```c
## Decision: Needs Deprecation First
**Request:** Remove \`isFullWidth\` prop from Button
**Decision:** Not yet (but yes, eventually)
**Reasoning:**
- This is a breaking change
- 247 instances of \`isFullWidth\` in codebase
- Need deprecation period first
**Path forward:**
1. ✅ Approve deprecation warning (now)
2. ⌛ Wait 3 months for teams to migrate
3. ✅ Approve removal (Q2 2026)
**What you can do now:**
- Add deprecation warning PR
- Create migration guide
- Track usage in adoption dashboard
```

### Scenario 2: Good idea, too specific

markdown

```c
## Decision: Build as Team-Specific Component
**Request:** Add "shuffle" animation to Button
**Decision:** Not for design system (but you should build it!)
**Reasoning:**
- Only 2 teams need this
- Very specific to gaming products
- Would add unnecessary complexity for 45 other teams
**Path forward:**
1. ✅ Build as team-specific component
2. ✅ Share implementation in Slack (others might want it)
3. ⌛ If 5+ teams adopt, revisit for design system
**We'll help you:**
- Code review your component
- Share in showcase channel
- Document as community pattern
```

### Scenario 3: Good idea, wrong implementation

markdown

```c
## Decision: Approved with Changes
**Request:** Add tooltip to all form inputs
**Decision:** Approved (with different approach)
**Reasoning:**
- Great idea (helpful hints for users) ✅
- Proposed implementation has accessibility issues ❌
- Tooltips on hover don't work on mobile ❌
**Required changes:**
1. Use hint text instead of tooltip
2. Visible by default (not on hover)
3. Connected with aria-describedby
**We'll help you:**
- Pair programming session this week
- Accessibility review before merge
- Mobile testing guidance
```

## The Public Decision Log

Document all decisions publicly:

markdown

```c
# Design System Decisions
## 2025-11-16: Shuffle Animation (Rejected)
**Request:** Add shuffle animation to Button
**Requestor:** @gaming-team
**Decision:** Build as team-specific
**Reasoning:** Too specific (2 teams), adds complexity
**Alternative:** Team-specific component, share in community
## 2025-11-15: Dark Mode (Approved)
**Request:** Add dark mode support
**Requestor:** @mobile-team
**Decision:** Approved as Large Change
**Timeline:** Q1 2026 (8-week project)
**Why:** 15 teams requested, aligns with roadmap
## 2025-11-14: isFullWidth Removal (Deferred)
**Request:** Remove deprecated prop
**Requestor:** @core-team
**Decision:** Wait for deprecation period
**Next review:** Q2 2026
**Why:** 247 usages still exist
```

**Why this works:**

- Transparency builds trust
- Future requestors can reference past decisions
- Prevents re-litigating same decisions

## Office Hours > Approval Meetings

Replace synchronous approval with asynchronous support.

## The Office Hours Model

**Structure:**

- 2x per week, 1 hour each
- Drop-in (no agenda, no RSVP)
- Core team available for questions

**Topics covered:**

- “How do I contribute?”
- “Is this a Small/Medium/Large change?”
- “Help me scope my RFC”
- “Code review before I submit PR”
- “Why was my request rejected?”

**Example schedule:**

```c
Tuesdays 2-3pm PT: Design Office Hours
- Design system designers available
- Help with Figma, component specs, patterns
Thursdays 10-11am PT: Engineering Office Hours
- Design system developers available
- Help with implementation, APIs, performance
```

## Async Communication Channels

**Slack:**

```c
#design-system-help
  - Questions and support
  - Core team responds within 4 hours
  
#design-system-contributions
  - Contribution discussions
  - RFC feedback
  
#design-system-announcements
  - New releases
  - Breaking changes
  - Important updates (read-only)
```

**GitHub Discussions:**

```c
- Proposals (RFCs)
- Q&A
- Show and tell (community components)
```

## Self-Service Resources

**Before asking, check:**

1. **Contribution guide** (how to contribute)
2. **Decision log** (past decisions)
3. **FAQ** (common questions)
4. **Examples** (similar past contributions)

**Reduces support load by 60%.**

## Real Case Study: 87 Teams, One Design System

**Company:** Mid-size SaaS (500 employees, 87 product teams)

## Before: Centralized Chaos

**Problems:**

- Average approval time: 6 weeks
- Rejection rate: 40%
- Shadow components: 73 (across 15 teams)
- Open requests: 52
- Core team satisfaction: 3.2/10
- Product team satisfaction: 2.8/10

**Root cause:** Single approval bottleneck

## Changes Implemented

**1\. Adopted 3-Tier Model (Month 1)**

- Small changes: Automated approval
- Medium changes: Weekly Council
- Large changes: RFC process

**2\. Created Design System Council (Month 1)**

- 6 members (3 designers, 3 developers)
- Rotating seats (6-month terms)
- Weekly 1-hour sync

**3\. Office Hours Started (Month 2)**

- 2x per week
- Drop-in support
- Avg attendance: 8 people/session

**4\. Decision Framework Implemented (Month 2)**

- Consistency + Coverage + Cost scorecard
- Public decision log
- “Yes, And…” rejection framework

## After: Scalable Governance (Month 6)

**Results:**

- Average approval time: 3 days (95% reduction)
- Rejection rate: 15% (63% reduction)
- Shadow components: 8 (89% reduction)
- Open requests: 6 (88% reduction)
- Core team satisfaction: 8.7/10
- Product team satisfaction: 8.3/10

**Contribution volume:**

- Before: 3 contributions/month
- After: 18 contributions/month (6x increase)

**Why it worked:**

1. Self-service for small changes (70% of volume)
2. Fast decisions for medium changes (3-day turnaround)
3. Clear process for large changes (no ambiguity)
4. Transparent decisions (public log)
5. Support not gatekeeping (office hours)

## Unexpected Benefits

**1\. Quality improved**

- Automated checks caught issues earlier
- More eyes on code (Council rotation)
- Better documentation (requirement for approval)

**2\. Ownership increased**

- Product teams feel heard
- Contributors stay engaged
- Shadow systems disappeared

**3\. Core team less burned out**

- No longer review every small change
- Office hours more enjoyable than approval meetings
- Shared responsibility with Council

## The Implementation Checklist

Rolling out new governance? Use this:

## Month 1: Foundation

- Define contribution tiers (Small/Medium/Large)
- Set up automated checks (CI/CD)
- Create RFC template
- Document decision framework

## Month 2: Structure

- Form Design System Council (recruit members)
- Set up weekly meeting
- Create public decision log
- Launch office hours (pilot)

## Month 3: Communication

- Announce new process (all-hands)
- Update contribution guide
- Train Council members
- Create FAQ

## Month 4+: Iterate

- Gather feedback
- Adjust tier definitions if needed
- Rotate Council members (if needed)
- Measure metrics (approval time, satisfaction)

## The Bottom Line

Governance that works requires three things:

1. **Tiered process** (70% self-service, 25% Council, 5% large projects)
2. **Clear decisions** (Consistency + Coverage + Cost framework)
3. **Support over gatekeeping** (Office hours, async help, “Yes, And…”)

**Don’t:**

- Single approval bottleneck
- Review every small change
- Say no without alternatives
- Make decisions in secret

**Do:**

- Automate what you can (small changes)
- Empower contributors (clear guidelines)
- Be transparent (public decision log)
- Provide support (office hours, async channels)

Good governance makes the design system move faster, not slower.

[![Roberto Moreno Celta](https://miro.medium.com/v2/resize:fill:96:96/1*PQat25KQvAesafPUMl9oaA.jpeg)](https://robertcelt95.medium.com/?source=post_page---post_author_info--1ff6c3af6b5f---------------------------------------)[54 following](https://robertcelt95.medium.com/following?source=post_page---post_author_info--1ff6c3af6b5f---------------------------------------)

Webflow & Front-End Developer with passion for UX, UI and Design in general