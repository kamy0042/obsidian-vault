---
Created: 2025-10-22T23:13:00
URL: https://github.com/storybookjs/ds-mcp-experiment-reshaped/discussions/1
Tags: [topic/デザインシステム/AI活用]
---
# 🤖 Problem

A challenge today when using agents to build UI, is that they will often *not* use the appropriate design system correctly, but generate its own component or styling solution, not matching existing components. Your team has invested person years designing and building a beautiful and solid design system, but the LLM is constantly throwing all that away to use shadcn and Tailwind instead, because that’s all it knows.

Storybook is the preferred tool to build and document design systems in many teams, but it lacks a proper integration that exposes all the information to LLMs. Teams are also not able to build this themselves, because Storybook doesn’t expose this information in a raw format either.

We’ve identified two separate uses of Storybook in relation to LLMs.

This experiment and RFC focuses on *consumers of* Storybook. That is not necessarily users that are building *with* Storybook (although they could be), but they are building UI and using a Storybook as documentation.

The other use case focuses on improving the development experience when *using* Storybook in a project - it is focused on the users that are building components with Storybook. We think that is a separate workflow to investigate, and we’re discussing it in the [Agentic Workflow RFC](https://github.com/storybookjs/addon-mcp/discussions/15)

# 🧩 Proposed Solution

We propose a solution where Storybook exposes structured metadata about components that can serve as the basis for documentation in other tools. This metadata includes (but is not limited to):

- List of components and utilities
- Component names
- Short and long descriptions
- Props, including keys, values, types, defaults, descriptions
- Example code snippets (derived from stories) with descriptions
- Documentation pages
- Related components

We call this metadata Component Manifests, and it would be exposed as JSON endpoints on a Storybook dev server, and built as static JSON-files when building a Storybook.

Along with this metadata we propose a Design System MCP Server than consumes these Component Manifests and exposes them to the LLM in an LLM-friendly way. This could be a reference MCP server that advanced design system teams could use and distribute as it, or get inspiration from and fork as necessary.

The MCP server is intended for *consumers* of the Storybook, not the builders (although they could use it too if they want to). **Therefore it doesn’t directly depend on Storybook, eg. an Applications Team that uses a design system but doesn’t use Storybook, can use the MCP server just fine, as long as the design system is built with Storybook.**

![](https://private-user-images.githubusercontent.com/5678122/487353598-d86ca438-050c-4780-9299-2cd9e2a410d3.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTg4ODU2MjEsIm5iZiI6MTc1ODg4NTMyMSwicGF0aCI6Ii81Njc4MTIyLzQ4NzM1MzU5OC1kODZjYTQzOC0wNTBjLTQ3ODAtOTI5OS0yY2Q5ZTJhNDEwZDMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI1MDkyNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA5MjZUMTExNTIxWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YjAxNmIxNGNlN2RhNWZlOTgyZGViYjAxYzAyYmJjMDZiZmMwNDAxODQxM2RmOGZmNWQzNDBkNDUwOTg5ODA0NyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.em55Q2NPdgIN5L04HUa4BK7lPOo_HQkjZsvCSqrFD-Q)

## 📐 Proposed Architecture

An architecture for this workflow could be implemented like this:

Storybook generates a manifest file for all components. It is a JSON file containing all the available metadata about components (name, props, examples, etc.) as well as any documentation (MDX) pages. As this could get big very fast, each component is separated into its own JSON file, referenced by the main

![](https://private-user-images.githubusercontent.com/5678122/487354395-96913d6b-05c8-409d-b1a9-2a3800bf8799.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTg4ODU2MjEsIm5iZiI6MTc1ODg4NTMyMSwicGF0aCI6Ii81Njc4MTIyLzQ4NzM1NDM5NS05NjkxM2Q2Yi0wNWM4LTQwOWQtYjFhOS0yYTM4MDBiZjg3OTkucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI1MDkyNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA5MjZUMTExNTIxWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9Y2FmMDBmYjkwZGQ2Njg5MjBjNzMxODljYjJiYmY3ZmVjY2Q0OTI2MTgzZWJlMGU1NDQyZmRiZjkyODM3OTZlMSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.43uVujXpx2xhB_zgdVyD6k5p9KMHFJ5IQ4y_JtMSplA)

1. `components-manifest.json`. 
    1. Storybook’s Dev server will dynamically serve these manifests at eg. `localhost:6006/manifest/components.json`
    2. Storybook Build will generate the manifest files statically.
2. A separate “Design System MCP Server” maintained by Storybook, will be able to fetch and analyze these manifests and serve them to the agent when necessary, in a format suited for the agents that is token-efficient. Most like “human readable”, plain text, markdown formatted.
3. The MCP server exposes a set of tools: 
    3. List all components - for the agent to understand what is available
    4. Get details for components - for the agent to dive into components it has selected as being appropriate for the task
    5. Search components by keywords - similar to the list tool, but with a more token-efficient output should the design system have too many components to always list in the list tool.
4. When setting up the MCP server, users will configure it with a path to where it can find the manifests files. Thus we don’t care *how* they are distributed, that is up the the DS authors to decide. Examples: 
    6. `./node_modules/my-design-system/manifest/components.json` - For when the the DS distributes the manifest alongside the dist in the npm package.
    7. `./storybook-static/manifest/components.json` - For when the user has the Storybook built locally
    8. `http://localhost:6006/manifest/components.json` - For when running the Storybook dev server locally
    9. `https://my-storybook.chromatic.com/manifest/components.json` - For when a DS’s Storybook is published to Chromatic or elsewhere.
5. DS authors can choose the host the MCP server remotely, or instruct users how to set it up locally. For now we don’t see a specific need for having it running locally, but it might arise in the future.
6. The user will prompt the agent for UI work, and the agent will use the tools to get the correct context about the design system. This might also require a small system prompt, instructing the agent to use the tools when applicable.

Our research shows that LLMs usages of design systems improve greatly when they have structured knowledge about what’s available. Just providing a list of components with short descriptions makes the final output better. As you add more details like listed above, the LLM (unsurprisingly perhaps) produces better and better results, and gets a better understanding of how to compose components and use the props correctly.

However we also saw improved output by just providing the LLM with *flattened* TypeScript types, that it referenced to use props correctly.

# 🔮 How Do We Get There?

The proposed solution requires *a lot* of effort to implement. We would need to make big architectural changes to Storybook’s core for this to work. That’s because 95 % of the metadata we want to expose is only available on the client today, and we need it on the server for this to work.

The following is a plan for how we can incrementally get to the solution, while still getting early validation that the solution is actually valuable in the end.

### v0.0.1 - “Manifests” are just LLM-generated markdown

The first version of this doesn’t have to require Storybook at all. We can just get an LLM to generate these “manifests”, as plain markdown files, and consume them with the MCP server. The MCP server and architecture doesn’t do much more than just forward the markdown files.

**And this is exactly what this repository is!**

We’ve built this v0.0.1 as an experiment in this repository: We’ve prompted an LLM (Claude 4 Sonnet) to generate detailed documentation for all exports of [the Reshaped design system package](https://reshaped.so/). We’ve then built a tiny MCP server that makes a list of all exports available, as well details for any component/utility that the LLM requests.

[The generated documentation](https://github.com/storybookjs/ds-mcp-experiment-reshaped/tree/main/llm-docs) is not accurate, it’s not consistent, and it’s not exhaustive. It was both slow and costly to generate - 26 min wall time (using parallel sub-agents) and costing about $15. But our initial experiments indicates that it worked! An LLM that used the MCP server produced significantly better components than one that didn’t.

We’d love for you to try this out as well, and report what you find. You can find detailed instructions in the [readme](https://github.com/storybookjs/ds-mcp-experiment-reshaped/tree/main).

### v0.0.2 - Manifests are LLM-generated structured JSON

We can take this a step further, and instead of generating plain-text markdown files as documentation, we can define a structured JSON output that the LLM must adhere to, as LLMs are generally good at following instructions on structure for the output. This won’t solve the problems of inaccuracy and inconsistency, but it will allow us to experiment with and iterate on the Component Manifest structure without having to go through the complexity of extracting real data.

The MCP server would then be close to the proposed solution, as it isn’t concerned with the *quality* of the metadata, just the structure.

### v0.1.0 - Manifests are component list only, generated by Storybook

The minimal first version of Component Manifest as generated by Storybook could be just about the top-level component list itself. For all meta definitions in stories-files, we would:

7. Get component names

This allows us to work on the fundamental Component Manifest generation, starting with the metadata that is the most easy to extract.

### v0.2.0 - Add prop types and descriptions to components

The next iteration could be about getting component’s prop types, as a combination of users’ manual `argTypes` and inferred via docgen. Today docgen - the process of automatically extracting prop types from components - runs in the *builders* (Vite, Webpack) and outputs the result to the rendered stories in the preview. We need to migrate the docgen to be server-side so the client isn’t necessary, and (statically) extract `argTypes` from stories-files.

### v1.0.0 - Add examples based on stories

The next iteration would be about providing examples of component usage, as described in stories. Story data like args, decorators would need to be extracted and converted to snippets (eg. for React it would be JSX), similar to what we generate for the “Show Code” panel in docs canvases today. Again, all this data and the code snippets are all generated in the browser, and we need to do that on the server instead.

### v1.1.0 - Add MDX docs

We’d also want to collect users’ manually written MDX docs. Including them as-is might not be beneficial, as they could include complex components and imports that would make them invalid when read without the necessary context. We might need to render them to HTML or markdown first.

[Attached MDX docs](https://storybook.js.org/docs/api/doc-blocks/doc-block-meta#attached-vs-unattached) would have a natural place in the Component Manifest structure, but it’s unclear how unattached MDX docs would fit in here.

# 💬 Request For Comments

We’re asking for input and feedback here. We hope you’ll try the current experiment out even though it’s not useful in a real scenario yet. Please share thoughts and ideas on what could be improved, or other strategies that you’d like to see explored, etc. 🙏

---