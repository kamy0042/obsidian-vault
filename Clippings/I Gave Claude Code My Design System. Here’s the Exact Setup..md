---
title: "I Gave Claude Code My Design System. Here’s the Exact Setup."
source: "https://medium.muz.li/i-gave-claude-code-my-design-system-heres-the-exact-setup-9f676feb65eb"
author:
  - "[[Santhosh Reddy Kanthala]]"
published: 2026-09-10
created: 2026-09-16
description: "I Gave Claude Code My Design System. Here’s the Exact Setup. From Tokens to Shipped Screen: The Actual Setup, Step by Step My last piece made the case for feeding your design system into Claude …"
tags:
  - "clippings"
---
## From Tokens to Shipped Screen: The Actual Setup, Step by Step

My [*last piece*](https://medium.com/@santhoshreddy_80343/your-design-system-is-now-a-prompt-heres-how-to-make-it-a-good-one-d5d200899129?sharedUserId=santhoshreddy_80343) made the case for feeding your design system into Claude Code, Cursor, and v0 instead of letting them guess. This one is the part people usually ask for next: how do you actually build that pipeline? Not the theory — the files, the folder structure, the config, and the prompt that turns it all into a real screen.

Here’s the path, in the order I’d actually build it.

## Step 1: Turn your tokens into structured JSON

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*dR-1vqdTk4LWWnifXGwtpA.png)

Row token to multiple output formats.

If your tokens still live only as Figma styles, export them first. The Design Tokens Figma plugin exports styles and variables into a Style-Dictionary-ready JSON file with one click. From there, structure them in three layers — primitive, semantic, component — so a single value change propagates everywhere instead of triggering a find-and-replace across the codebase:

```hs
{
  "primary": {
    "blue": "#0969DA",
    "blue-light": "#2B85FF",
    "blue-dark": "#0550AE"
  },
  "semantic": {
    "error": "#CF222E",
    "warning": "#F59E0B",
    "success": "#10B981"
  },
  "neutral": {
    "white": "#FFFFFF",
    "gray-10": "#F6F8FA",
    "gray-90": "#24292F"
  }
}
```

Keep colors, spacing, and typography in separate files (`colors.json`, `spacing.json`, `typography.json`) inside one `tokens/` folder. That separation matters later — it's what lets an MCP server or a build tool query just what it needs.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*C6zego8WXWy4VJzy.png)

## Step 2: Run them through a build pipeline

Style Dictionary ([Amazon’s open-source tool](https://aws.amazon.com/blogs/opensource/style-dictionary-trust-design-consistency/)) takes that JSON and outputs real, usable code — CSS variables, SCSS, JS, even iOS or Android formats — from one source of truth:

```hs
:root {
  --color-primary: #0969DA;
  --space-sm: 0.5rem;
  --space-md: 1rem;
}
```

Run `npm run build` against a `style-dictionary/config.json` and you get `variables.css`, `design-tokens.js`, and `design-tokens.json` in one pass. This is the layer that used to require a designer manually re-typing hex codes into a dev ticket. Now it's a build step.

## Step 3: Expose those tokens through an MCP server

This is the piece that actually changes the workflow, and you have two honest options.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZCsUYEKZkn6O9CpvGSo6Xg.png)

A live server being queried

**Option A — adopt an existing one.** Open-source MCP servers already do exactly this: `design-token-bridge-mcp` translates tokens between Tailwind, Figma, CSS variables, Material 3, and SwiftUI, and is built specifically for a v0 → Figma → Claude Code pipeline. Point it at your token files and it's usable the same day.

**Option B — build a small one yourself.** It’s a shorter project than it sounds. A minimal Node MCP server just needs to read your `tokens/` folder and expose it as a resource:

```hs
design-tokens-mcp/
├── index.js          # your MCP server
├── tokens/
│   ├── colors.json
│   ├── spacing.json
│   └── typography.json
```

Once it’s running, you can ask Claude things like: *“Which tokens are used in our Button component?”*, *“Find unused tokens in our system,”* or *“Generate a migration guide from gray-300 to neutral-300.”* One real-world implementation exposes this as three plain resources — `design-system://tokens`, `design-system://guidelines`, `design-system://documentation` — plus a `generate_component` tool that takes a component type and variant and returns code that already matches your system.

If your design source is Figma itself rather than a token file, run Figma’s own Dev Mode MCP server alongside your token server. It reads components, variables, and layout data directly from a Figma frame — no manual export step at all.

## Step 4: Write the playbook the tokens can’t cover

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9WpH2xoK3lf9Az6RVno6ZQ.png)

Essential Playbook

Tokens tell the model *what* your colors and spacing are. They don’t tell it how to use them. That’s what your `CLAUDE.md` (or `design.md`) file is for — and the research on how these files actually get used matters here: Claude Code's own system prompt already carries roughly 50 instructions before your file is even read, and instruction-following measurably degrades somewhere between 150 and 200 total instructions. That leaves you a real, finite budget — so the file has to earn every line, not document everything you know.

A lean structure that works:

```hs
# Product Name
React + Tailwind + our design system (tokens via MCP).
```
```hs
## UI and Design Rules
- Use components from components/ui/ — never invent new primitives
- Spacing scale: 4/8/16/24/32px only, no arbitrary values
- Type hierarchy: one H1 per screen, body text 16px minimum
- All interactive elements need visible focus states## Rules
- Do not modify tokens/ directly — request a token change instead
- New reusable components go in components/ui/, not features/
- Flag any new color usage that isn't in the token file
```

A well-known failure mode is the over-specified file — pile in every possible rule, and Claude starts ignoring half of it because the important lines get lost in the noise. The fix is the same one good documentation always needed: add a rule only after Claude actually gets something wrong that the rule would have prevented, not preemptively.

## Step 5: Wire it together and prompt for real

With both MCP servers registered — your token server and Figma’s — and your markdown playbook sitting at the project root, a prompt like this is doing far more work than it looks like:

> “Build the account settings screen using our design system tokens and follow the rules in design.md.”

Claude Code or Cursor now has three real sources instead of one guess: the token server for exact values, the Figma MCP for actual layout and component structure if you point it at a frame, and the markdown file for the judgment calls neither of those covers. v0 works the same way if you’ve applied your tokens to a shadcn theme first — it already speaks that token language natively, so anything generated inherits your brand instead of the default one.

## Step 6: Close the loop before you ship

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zzIyDf26iUnLl2-W_7Yprw.png)

Closing Loop

Generate, then ask the same MCP server to audit itself: *“find unused tokens,”* *“show token usage statistics,”* *“which components use the deprecated blue-300.”* This is the practical version of the generate-critique-fix loop — except now the critique step has real data behind it instead of just a visual scan.

## What this changes in practice

The prototype that used to take three review cycles to visually match the system now matches it by construction, because the values it’s built from are the same values the rest of the product runs on. What’s left for a human to actually decide is the part none of this automates: whether the flow is right, whether the hierarchy makes sense for this specific screen, and whether the thing is actually ready to ship — which is exactly where a designer’s time should be going once the token-matching stops being a manual task.

**Sources referenced:**

- [Build your own MCP server for design tokens — The Design System Guide](https://learn.thedesignsystem.guide/p/build-your-own-mcp-server-for-design)
- [design-token-bridge-mcp — GitHub](https://github.com/kenneives/design-token-bridge-mcp)
- [yajihum/design-system-mcp — GitHub](https://github.com/yajihum/design-system-mcp)
- [robdcon/mcp-design-system (Macmillan Design System MCP) — GitHub](https://github.com/robdcon/mcp-design-system)
- [JSON Design Tokens Explained — Medium](https://medium.com/@djmcodechain/json-design-tokens-explained-375b754975f8)
- [Design Tokens Figma Plugin — GitHub](https://github.com/six7/design-tokens)
- [Figma MCP and the most useful Figma resources for designers](https://learn.thedesignsystem.guide/p/figma-mcp-and-the-most-useful-figma)
- [Writing the Best CLAUDE.md: A Complete Guide — DataCamp](https://www.datacamp.com/tutorial/writing-the-best-claude-md)
- [Best practices for Claude Code — Claude Code Docs](https://code.claude.com/docs/en/best-practices)
- [CLAUDE.md Best Practices — UX Planet](https://uxplanet.org/claude-md-best-practices-1ef4f861ce7c)
- [AI-powered prototyping with design systems — Vercel](https://vercel.com/blog/ai-powered-prototyping-with-design-systems)

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/0*JRKrjw1PcOa3vHAt.png)