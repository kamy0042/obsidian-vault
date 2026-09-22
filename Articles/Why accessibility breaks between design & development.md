---
タグ: []
作成日時: 2025-11-09T16:27:00
URL: https://www.alicia.design/post/why-accessibility-breaks-between-design-development
Tags: [topic/アクセシビリティ]
---
![](https://static.wixstatic.com/media/b148d4_c12eade4960449f7afcb5833263b7099~mv2.png/v1/fill/w_740,h_227,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b148d4_c12eade4960449f7afcb5833263b7099~mv2.png)

Symbol of a person in a wheelchair on a computer screen, with an arrow pointing to a gear, on a beige background. Represents accessibility settings.

Accessibility often starts strong in design — with thoughtful colour contrast, readable typography, and inclusive interaction flows. But somewhere between design sign-off and development, it starts to crumble.

By the time the product reaches QA, features that looked accessible on Figma suddenly fail real-world tests.

- Screen readers miss entire sections.
- Developers are left scrambling to fix what was once “already designed for accessibility.”

So, what happened?

When you’re building across Android TV, Roku, Fire TV, Apple TV, and proprietary platforms, accessibility doesn’t behave consistently. Each ecosystem interprets accessibility guidelines in its own way — with different APIs, focus models, and input methods.

Design teams may envision a single, inclusive experience, but developers are forced to translate that vision through multiple technical lenses. Without platform-specific guidance early on, accessibility intent gets lost in translation.

Accessibility is everyone’s job — but when everyone owns it, no one really does. Designers assume developers will implement correctly. Developers assume testers will catch issues. Testers assume design already considered accessibility.

Without a clear process for accessibility handoff, verification, and accountability, issues slip through. Accessibility becomes reactive instead of built-in.

Design mocks usually represent ideal states — clean, static, and predictable. But accessibility lives in the messy edges: when users zoom text, navigate by remote, or rely on assistive tech. If these use cases aren’t prototyped and tested during design, developers are left guessing how to handle them later.

## How to Close the Gaps

**1. Create platform-specific accessibility specs. **Document how each platform handles focus, labels, and input. Treat these specs like design tokens — standardized, reusable, and reviewable.**2. Build accessibility into design reviews. **Add an accessibility checkpoint before handoff. Make it visual and interactive — not just a checklist.**3. Pair design and development early. **A short design-dev sync before sprints start can prevent weeks of accessibility rework later.**4. Test with assistive tech before QA. **Early testing on target devices (especially with screen readers or remotes) reveals where design assumptions break down.

Accessibility shouldn’t fade as products move from design to code. With clear ownership, platform awareness, and early collaboration, we can stop accessibility from breaking in the handoff — and start launching inclusive experiences by design, not by patch.