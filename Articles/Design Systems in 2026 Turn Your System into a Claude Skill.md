---
title: "Design Systems in 2026: Turn Your System into a Claude Skill"
source: "https://www.designsystemscollective.com/design-systems-in-2026-turn-your-system-into-a-claude-skill-3dd4d8bf5feb"
author:
  - "[[Garima Agarwal]]"
published: 2026-05-14
created: 2026-07-26
description: "Design Systems in 2026: Turn Your System into a Claude Skill Your design system should survive a closed tab. You built the foundations. You created tokens, components, variants, exported …"
tags:
  - topic/デザインシステム/AI活用
  - topic/デザインシステム/ドキュメント
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*JU2Ic8FWhttqCnVAaOOOdA.png)

**Your design system should survive a closed tab.**

You built the foundations. You created tokens, components, variants, exported design\_tokens.json, and generated Storybook stories ([**Part 2**](https://medium.com/@garimaagarwal1200/design-systems-in-2026-claude-desktop-figma-console-mcp-full-workflow-prompts-fe74ed7efe4a)). Before that, you connected Claude Desktop to Figma via Console MCP ([**Part 1**](https://medium.com/@garimaagarwal1200/claude-desktop-figma-console-mcp-complete-setup-guide-2026-babba46b12a0)).

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*GANHEZDd3ffvQOzn.png)

But here’s what keeps happening:

You close the conversation. Open a new one. And Claude has no idea what semantic/primary/default means. It doesn’t know your spacing scale. It doesn’t know your naming conventions. You’re back to pasting 200 lines of context.

**This guide fixes that permanently.**

A Claude Skill is a file you write once that tells Claude everything about your design system. Every new conversation starts pre-loaded with your tokens, naming conventions, component specs, and quality rules.

## What you’ll learn:

- What a Claude Skill actually is (no jargon)
- How to structure your design system as a Skill
- Exact SKILL.md template you can copy-paste
- How to organize reference files (tokens, typography, components)
- How to package and upload
- Testing and validation
- When to split into multiple Skills
- The interview shortcut for undocumented decisions

The result: Every new Claude conversation now knows my full design system — without me typing a single line of context.

**Let’s go.**

## What is a Claude Skill?

A Skill is a folder containing a SKILL.md file. That file has two parts:

1. Metadata (YAML frontmatter) — tells Claude when to use the Skill
2. Instructions (Markdown body) — tells Claude what to do

When Claude detects that your request matches the Skill’s description, it loads your instructions automatically. Your design system context gets injected before you even finish your prompt.

Think of it as a permanent brief. You write it once. Claude reads it every time.

## Why You Need This

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*i2DtdJUvlB1C9Fbe.png)

That’s the difference. Zero re-explaining. Zero context drift. Zero wasted tokens on setup.

## What You Need Before Starting

- Your design\_tokens.json exported from [**Part 2**](https://medium.com/@garimaagarwal1200/design-systems-in-2026-claude-desktop-figma-console-mcp-full-workflow-prompts-fe74ed7efe4a)
- Your component documentation (generated in [**Part 2**](https://medium.com/@garimaagarwal1200/design-systems-in-2026-claude-desktop-figma-console-mcp-full-workflow-prompts-fe74ed7efe4a))
- Your naming conventions (established in Part 2)
- Claude Desktop + Figma Console MCP set-up ([**Setup doc**](https://medium.com/@garimaagarwal1200/claude-desktop-figma-console-mcp-complete-setup-guide-2026-babba46b12a0))

If you haven’t built your design system yet, go back to [**Part 2**](https://medium.com/@garimaagarwal1200/design-systems-in-2026-claude-desktop-figma-console-mcp-full-workflow-prompts-fe74ed7efe4a). You need actual tokens and components to put into a Skill.

## Two Paths: Claude.ai vs Claude Code

Claude Skills work in two environments. Pick the one that matches your workflow.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*z5gAOZ_cFsQKYuRD.png)

I use Claude.ai Skills for my design system work. If you’re sharing with a dev team through a repo, use Claude Code Skills — they commit alongside your code and everyone on the team gets the same context.

This guide covers both. The SKILL.md format is identical.

## Step 1: Structure Your Skill Folder

Here’s the folder structure that works:

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*AE0sLSAPRlaSsAcx.png)

Why this structure? Claude uses progressive disclosure:

- Metadata loads first (~100 tokens) — Claude decides if the Skill is relevant
- Markdown body loads next (~500–2000 tokens) — core instructions
- Reference files load on-demand — only when Claude actually needs the details

This means your Skill doesn’t burn tokens when it’s not being used. It only loads what’s needed for the current task.

## Step 2: Write Your SKILL.md

This is the core file. Copy this template and customize it with your actual values from Part 2.

SKILL.md Template (Copy-Paste Ready):

```hs
---
name: design-system
description: Apply my design system tokens, naming conventions, component specs, and accessibility rules to all UI and design work including Figma components and React code.
---

# [Your System Name] Design System

Use this Skill when:
- Creating new Figma components
- Building UI layouts
- Generating React/TypeScript components
- Writing design documentation
- Reviewing components for consistency
- Exporting tokens or Storybook stories

## Core Principles

1. Every color, spacing, and typography value MUST use semantic tokens
2. No hardcoded values — ever
3. All components meet WCAG 2.1 AA minimum
4. Naming follows: category/role/state pattern
5. All components support light and dark mode
6. Mobile-first responsive
7. Keyboard navigation throughout

## Token Architecture

### Naming Conventions

Colors (Primitive): primitive/[color]/[shade]
Examples: primitive/blue/600, primitive/gray/100

Colors (Semantic): semantic/[category]/[state]
Examples: semantic/primary/default, semantic/primary/hover, semantic/text/on-primary, semantic/surface/neutral-subtle

Spacing: spacing/[context]/[size]
Examples: spacing/component/padding-sm, spacing/layout/gap-md

Typography: typography/[usage]/[size]
Examples: typography/heading/lg, typography/body/md

Border Radius: radius/component/[component-name]
Examples: radius/component/button, radius/component/card

### Variable Collections
1. Colors — modes: light, dark
2. Spacing — single mode
3. Border Radius — single mode
4. Typography — single mode
5. Icon Sizes — single mode

### Spacing Scale
Base unit: 4px
Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px

### Border Radius Values
sm: 4px, md: 8px, lg: 12px, xl: 16px, full: 9999px

## Color Tokens
For full color token list with light/dark mode values:
See [references/color-tokens.md](references/color-tokens.md)

## Typography Tokens
For font families, sizes, weights, and line heights:
See [references/typography.md](references/typography.md)

## Spacing Tokens
For complete spacing scale and usage guidelines:
See [references/spacing.md](references/spacing.md)

## Component Specifications
For component APIs, variants, states, and token bindings:
See [references/components.md](references/components.md)

## Component Building Rules

1. Generate HTML artifact first (cheaper tokens), iterate until correct, then push to Figma
2. All fills must bind to semantic color variables
3. All strokes must bind to semantic color variables
4. All text must use typography tokens
5. All spacing must use spacing scale tokens
6. Every component needs: default, hover, active, disabled, focus states
7. Batch similar operations (create all variants at once)
8. Take a screenshot after creation for verification

## Quality Checklist (Run Before Finalizing Any Component)
- [ ] All fills bound to semantic color variables
- [ ] All strokes bound to semantic color variables
- [ ] All text uses typography tokens
- [ ] All spacing uses spacing scale tokens
- [ ] Light and dark mode variants exist
- [ ] All required states present (default, hover, active, disabled, focus)
- [ ] No hardcoded values in any property
- [ ] Accessible contrast ratios (4.5:1 text, 3:1 UI elements)
- [ ] Naming follows convention
- [ ] Screenshot taken and reviewed

## Storybook Requirements
- React + TypeScript
- CSS custom properties for all styling (no hardcoded values)
- Props match Figma variants
- CSF3 format for stories
- Dark mode toggle included
- Zero hardcoded values in final components
```

Customize this with your actual system name, your specific token names, and your component list. The structure stays the same.

## Step 3: Create Your Reference Files

These files hold the detailed specs. Claude loads them only when it needs specific values — keeping token usage efficient.

**references/color-tokens.md**

```hs
# Color Tokens
 
 ## Primitive Colors
 
 ### Blue Scale
 | Shade | Value | Usage |
 | - - - -| - - - -| - - - -|
 | primitive/blue/50 | #EFF6FF | Subtle backgrounds |
 | primitive/blue/100 | #DBEAFE | Hover backgrounds |
 | primitive/blue/200 | #BFDBFE | Active backgrounds |
 | primitive/blue/500 | #3B82F6 | Default actions |
 | primitive/blue/600 | #2563EB | Primary default |
 | primitive/blue/700 | #1D4ED8 | Primary hover |
 | primitive/blue/800 | #1E40AF | Primary active |
 | primitive/blue/900 | #1E3A8A | Dark accents |
 
 [Add your full primitive scales: Gray, Green, Red, Yellow, Orange]
 
 ## Semantic Colors
 
 ### Primary
 | Token | Light Mode | Dark Mode | Usage |
 | - - - -| - - - - - -| - - - - - -| - - - -|
 | semantic/primary/default | primitive/blue/600 | primitive/blue/500 | Primary actions, links |
 | semantic/primary/hover | primitive/blue/700 | primitive/blue/400 | Hover state |
 | semantic/primary/active | primitive/blue/800 | primitive/blue/300 | Active/pressed state |
 | semantic/primary/subtle | primitive/blue/50 | primitive/blue/900 | Backgrounds, badges |
 
 ### Surface
 | Token | Light Mode | Dark Mode | Usage |
 | - - - -| - - - - - -| - - - - - -| - - - -|
 | semantic/surface/background | #FFFFFF | #0F172A | Page background |
 | semantic/surface/card | #FFFFFF | #1E293B | Card surfaces |
 | semantic/surface/input | #FFFFFF | #1E293B | Input backgrounds |
 | semantic/surface/neutral-subtle | #F8FAFC | #1E293B | Subtle backgrounds |
 
 ### Text
 | Token | Light Mode | Dark Mode | Usage |
 | - - - -| - - - - - -| - - - - - -| - - - -|
 | semantic/text/primary | #0F172A | #F8FAFC | Headings, body |
 | semantic/text/secondary | #64748B | #94A3B8 | Secondary text |
 | semantic/text/subtle | #94A3B8 | #64748B | Placeholders |
 | semantic/text/on-primary | #FFFFFF | #FFFFFF | Text on primary bg |
 
 ### Border
 | Token | Light Mode | Dark Mode | Usage |
 | - - - -| - - - - - -| - - - - - -| - - - -|
 | semantic/border/default | #E2E8F0 | #334155 | Default borders |
 | semantic/border/focus | primitive/blue/600 | primitive/blue/400 | Focus rings |
 | semantic/border/error | primitive/red/600 | primitive/red/400 | Error states |
 
 ### Feedback
 | Token | Light Mode | Dark Mode | Usage |
 | - - - -| - - - - - -| - - - - - -| - - - -|
 | semantic/success/default | #16A34A | #22C55E | Success states |
 | semantic/warning/default | #D97706 | #F59E0B | Warning states |
 | semantic/error/default | #DC2626 | #EF4444 | Error states |
 | semantic/info/default | #2563EB | #3B82F6 | Informational |
 
 [Replace these with your actual token values from design_tokens.json]
```

**references/typography.md**

```hs
# Typography Tokens
 
 ## Font Families
 - Primary: Inter (sans-serif)
 - Mono: JetBrains Mono (monospace)
 
 ## Type Scale
 | Token | Size | Weight | Line Height | Usage |
 | - - - -| - - - | - - - - | - - - - - - -| - - - -|
 | typography/heading/xl | 48px | 700 | 1.2 | Page titles |
 | typography/heading/lg | 36px | 700 | 1.2 | Section headers |
 | typography/heading/md | 24px | 600 | 1.3 | Subsections |
 | typography/heading/sm | 20px | 600 | 1.3 | Card titles |
 | typography/body/lg | 18px | 400 | 1.5 | Lead paragraphs |
 | typography/body/md | 16px | 400 | 1.5 | Default body |
 | typography/body/sm | 14px | 400 | 1.5 | Secondary text |
 | typography/caption | 12px | 400 | 1.4 | Captions, labels |
 | typography/button/lg | 16px | 500 | 1 | Large buttons |
 | typography/button/md | 14px | 500 | 1 | Default buttons |
 | typography/button/sm | 12px | 500 | 1 | Small buttons |
 
 [Replace with your actual typography values]
```

**references/spacing.md**

```hs
# Spacing Tokens
 
 ## Base Unit: 4px
 
 ## Scale
 | Token | Value | Common Usage |
 | - - - -| - - - -| - - - - - - -|
 | spacing/1 | 4px | Tight gaps, icon padding |
 | spacing/2 | 8px | Inline element gaps |
 | spacing/3 | 12px | Compact component padding |
 | spacing/4 | 16px | Default component padding |
 | spacing/5 | 20px | Comfortable padding |
 | spacing/6 | 24px | Section gaps |
 | spacing/8 | 32px | Large section gaps |
 | spacing/10 | 40px | Layout spacing |
 | spacing/12 | 48px | Large layout gaps |
 | spacing/16 | 64px | Hero sections |
 | spacing/20 | 80px | Page sections |
 | spacing/24 | 96px | Major layout divisions |
 
 ## Component Spacing
 | Token | Value | Usage |
 | - - - -| - - - -| - - - -|
 | spacing/component/padding-sm | 8px | Compact components |
 | spacing/component/padding-md | 12px | Default components |
 | spacing/component/padding-lg | 16px | Spacious components |
 | spacing/component/gap-sm | 8px | Tight element gaps |
 | spacing/component/gap-md | 12px | Default element gaps |
 | spacing/component/gap-lg | 16px | Wide element gaps |
 
 [Replace with your actual spacing values]
```

**references/components.md**

```hs
# Component Specifications
 
 ## Button
 Variants: primary, secondary, outline, ghost
 Sizes: sm (32px), md (40px), lg (48px)
 States: default, hover, active, disabled, focus
 Icon support: left, right, icon-only, none
 Total variants: 4 x 3 x 4 x 4 = 192
 
 Token bindings:
 - Fill (primary): semantic/primary/default → hover → active
 - Fill (secondary): semantic/surface/neutral-subtle → hover → active
 - Text (primary): semantic/text/on-primary
 - Text (secondary): semantic/text/primary
 - Border radius: radius/component/button (8px)
 - Padding horizontal: spacing/component/padding-md (12px)
 - Padding vertical: spacing/component/padding-sm (8px)
 - Typography: typography/button/md (14px, weight 500)
 
 ## Input Field
 Types: text, email, password, number, search
 Sizes: sm (32px), md (40px), lg (48px)
 States: default, focused, error, disabled
 Features: label, helper text, error message, prefix/suffix icon
 
 Token bindings:
 - Border: semantic/border/default → semantic/border/focus (focused) → semantic/border/error (error)
 - Background: semantic/surface/input
 - Text: semantic/text/primary
 - Placeholder: semantic/text/subtle
 - Label: semantic/text/secondary
 - Border radius: radius/component/input (8px)
 - Padding: spacing/component/padding-md
 
 ## Card
 Elevation: flat, raised, elevated
 Padding: compact (16px), default (24px), spacious (32px)
 States: default, hover, pressed, disabled
 Structure: header (optional), body, footer (optional)
 
 Token bindings:
 - Background: semantic/surface/card
 - Border: semantic/border/default
 - Border radius: radius/component/card (12px)
 - Padding: spacing/component/padding-[size]
 - Shadow: elevation/[level]
 
 [Add all 8 components with their full specs]
```

## Step 4: Package and Upload

### For Claude.ai (Web/Desktop):

1. ZIP the design-system folder

***Important***: The folder must be the root of the ZIP, not the files directly.

Correct: design-system.zip > design-system/ > SKILL.md  
Wrong: design-system.zip > SKILL.md

2\. Open Claude Desktop or claude.ai

3\. Go to Settings > Capabilities

4\. Enable “Code execution and file creation” (prerequisite for Skills)

5\. Go to Customize > Skills (left sidebar)

6\. Upload your ZIP fil  
Skill is now active

## For Claude Code:

Personal (available across all projects):  
Copy folder to: ~/.claude/skills/design-system/  
  
Project (shared with team via repo):  
Copy folder to:.claude/skills/design-system/  
  
That’s it. Claude Code detects changes immediately — no restart needed.  
Invoke manually with /design-system or let Claude auto-trigger based on your description.

## Step 5: Test With a Fresh Conversation

This is important. Don’t test in the conversation where you built the Skill. Open a brand new conversation and try:

```hs
Test prompt 1:
Create a notification banner component with success, warning, error, and info variants.
```

If the Skill is working, Claude will:

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*QJN6mlQCYF8ywg10.png)

```hs
Test prompt 2:
What's the spacing scale in my design system?
```

Claude should answer from your Skill — not ask you to provide it.

```hs
Test prompt 3:
Audit this button for variable coverage. [describe or show a component]
```

Claude should use your quality checklist to evaluate.

## If It’s Not Triggering

The most common issue: your description isn’t specific enough.

❌ Bad description (too vague):

“Helps with design work”

✅ Good description (keyword-rich, specific):

*“Apply my design system tokens, naming conventions, component specs, and accessibility rules to all UI and design work including Figma components and React code.”*

Claude uses the description to decide whether to load the Skill. Include the keywords your prompts naturally use: tokens, components, design system, Figma, UI, spacing, colors, dark mode, Storybook.

**The description has a 200-character limit on Claude.ai. Make every word count.**

## The Interview Shortcut

Don’t know how to fill in your SKILL.md? Or you have design decisions in your head that never made it into documentation?

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*1Ve7_CtDJIuSr70B.png)

Use this prompt:

```hs
Interview me about my design system. Ask me about:
 - My naming conventions and why I chose them
 - My token structure (primitives vs semantic)
 - My component patterns and rules
 - My accessibility requirements
 - Things I always want Claude to do
 - Things I never want Claude to do
 - Common mistakes I keep correcting
```

Ask one category at a time. After the interview, generate a complete SKILL.md file based on my answers.

Claude asks the questions. You answer naturally. Then Claude generates your SKILL.md from your own words. This captures tribal knowledge that you’d never think to write down on your own.

I used this for my accessibility rules. I had opinions about focus states and color contrast that weren’t documented anywhere — just things I kept correcting manually. The interview surfaced all of them in 10 minutes.

## Advanced: Splitting Into Multiple Skills

One Skill works great for small-to-medium design systems. But if your system grows past 500 lines in SKILL.md, split by concern:

~/.claude/skills/  
├── design-tokens/ ← Token definitions + naming rules  
│ └── SKILL.md  
├── component-specs/ ← Component APIs, variants, states  
│ └── SKILL.md  
├── accessibility/ ← WCAG rules, contrast, focus management  
│ └── SKILL.md  
└── figma-workflow/ ← Figma Console MCP commands + patterns  
└── SKILL.md

Claude automatically uses multiple Skills together. If you ask for a component, it pulls from design-tokens + component-specs + accessibility simultaneously. You don’t need to invoke them separately.

**When to split:**

- SKILL.md exceeds 500 lines
- You have 15+ components with detailed specs
- Different team members own different parts of the system
- You want some Skills to only trigger in specific contexts

**When to keep it as one Skill:**

- System has fewer than 10 components
- You’re the only one using it
- SKILL.md stays under 500 lines comfortably
- Everything fits in one mental model

## Dos and Don’ts

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*Ymdwvs59oMgHASR_.png)

## Token Considerations

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*UMtyL8FHtiKr_oOR.png)

**Good news: Skills are designed to be token-efficient.**

**How the loading works:**

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*bD8zsoKlCWYgMRXn.png)

Compare this to the [**Part 2**](https://medium.com/@garimaagarwal1200/design-systems-in-2026-claude-desktop-figma-console-mcp-full-workflow-prompts-fe74ed7efe4a) workflow where you manually pasted context at the start of every conversation. That cost 500+ tokens every time, whether Claude needed it or not.

**Optimization tips:**

- Tables over prose — “semantic/primary/default | #2563EB | Primary actions” is denser than a paragraph explaining the same thing
- Lists over paragraphs — bullet points parse faster and use fewer tokens
- Reference files for details — keep the SKILL.md body focused on rules and conventions, not exhaustive lists
- One Skill per concern (for large systems) — Claude only loads what’s relevant to the current task

## Common Challenges & Solutions

### Challenge: Skill Not Triggering

You ask Claude to create a component but it doesn’t use your design system context.

Fix: Check your description. Does it include the keywords you’re using in your prompts? Claude tends to under-trigger rather than over-trigger. Make the description more inclusive. Add keywords like: tokens, components, Figma, UI, design system, spacing, colors, dark mode, Storybook.

### Challenge: Skill Triggers When It Shouldn’t

Claude applies design system rules to unrelated requests.

Fix: Make the description more specific. Instead of “Apply to all design work” try “Apply to UI component creation, Figma design, and React component generation.” Narrow the trigger conditions.

### Challenge: Context Gets Stale

You added 3 new components last week but Claude doesn’t know about them.

Fix: Update your references/components.md and re-upload the ZIP (Claude.ai) or just edit the file (Claude Code — picks up changes instantly). Skills don’t auto-sync with Figma. You need to update them when your system changes.

### Challenge: Reference Files Not Loading

Claude acknowledges your Skill but seems to ignore the detailed token values.

Fix: Make sure your SKILL.md links to reference files correctly with relative paths: \[references/color-tokens.md\](references/color-tokens.md). Also check: is your prompt specific enough that Claude knows it needs the detail? “Create a button” might not trigger file loading. “Create a button using my exact token bindings” will.

### Challenge: Too Much Content, Skill Gets Unwieldy

Your SKILL.md is 800+ lines and Claude seems to lose track of details.

Fix: Split into multiple Skills (see Advanced section above). Or aggressively move content to reference files. SKILL.md should contain rules and conventions. Reference files hold the data.

## The Complete 3-Part Workflow

You now have the full end-to-end system:

- Setup — Connect Claude Desktop to Figma via Console MCP ([Read here](https://medium.com/@garimaagarwal1200/claude-desktop-figma-console-mcp-complete-setup-guide-2026-babba46b12a0))
- Build — Create your design system with tokens, components, documentation, and Storybook integration ([Read here](https://medium.com/@garimaagarwal1200/design-systems-in-2026-claude-desktop-figma-console-mcp-full-workflow-prompts-fe74ed7efe4a))
- Remember — Turn it into a Claude Skill so every conversation starts informed (You are here)

The result: A design system that builds faster, stays consistent across sessions, and never needs to be re-explained.

## Quick-Start Checklist

1. Export design\_tokens.json from Part 2 workflow
2. Create folder structure: design-system/ with SKILL.md and references/
3. Copy the SKILL.md template above and customize with your system name and values
4. Fill references/color-tokens.md with your actual token values
5. Fill references/typography.md with your font specs
6. Fill references/spacing.md with your spacing scale
7. Fill references/components.md with your component specs from Part 2
8. ZIP the folder (folder as root)
9. Upload: Customize > Skills in Claude
10. Test in a fresh conversation