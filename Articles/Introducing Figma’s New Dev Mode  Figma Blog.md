---
タグ: []
作成日時: 2023-06-26T15:35:00
URL: https://www.figma.com/ja/blog/introducing-dev-mode/
Tags: [topic/ツール/Figma]
---
![[a313056d03f6e2734d587ee87c5a38c23936f8e5-5569x3132.png]]

How can a design tool work better for developers? It’s a question we’ve been asking ourselves and our community. Today, we’re excited to introduce Dev Mode, a new workspace in Figma that’s designed to get developers what they need, when they need it, harnessing the tools they use every day.

Figma was born on the web—an unconventional start to a design tool, but one we felt product design desperately needed. With a single link, designers could collaborate on in-progress work, sharing early explorations, rather than safeguarding designs until they felt “polished.” As more and more designers embraced Figma and this multiplayer way of working, we began to see a natural broadening of use across teams and disciplines, especially with developers.

Today, we know that on our paid plans more developers visit Figma than designers. We also know that understanding developers’ needs and their challenges is critical to making Figma a place where product development can be more efficient, collaborative, and expressive.

Developers have unique workflows and preferences. From front-end developers working with mature design systems, to design systems engineers building components, to those building content layouts and exporting assets in their work with brand designers, every team wants to work with as little friction as possible.

With [Dev Mode](https://www.figma.com/ja/dev-mode/), we see a huge opportunity to get developers what they need quickly and efficiently—just as we did with designers when we first set out to build Figma. The easier it is for teams to design, document, find, and implement high-fidelity designs without losing sight of the work and each other along the way, the better the product outcomes. We’re excited to take this first step in bridging design and development in Figma, and we can't wait to see what teams do next.

## [Get to coding faster](https://www.figma.com/ja/blog/introducing-dev-mode/#get-to-coding-faster)

While the Figma canvas is great for freeform design exploration, it can be confusing if you’re dropped into a design file that’s missing information needed for implementation. Dev Mode is like a browser inspector for your design file, and it brings design concepts—shapes, layers, and groups—closer to developer concepts like code, icons, and tokens. By hovering and clicking around the Figma canvas, you can find and export all the information you need, like measurements, specs, and assets, and uncover additional context from your design system. Much like [Chrome Dev Tools](https://developer.chrome.com/docs/devtools/), Dev Mode takes inspiration from other development tools to create an environment that’s immediately familiar to you.

Code in Dev Mode is entirely redesigned and customizable for whichever language you’re working in. We know that code isn’t useful out of the box. Rather, it’s a jumping off point so you don’t have to go from 0 to 1 every time. You’ll now see a CSS box model, a modern syntax with a tree view, and you can toggle between dimension units to match your codebase.

## [Access everything you need, in one place](https://www.figma.com/ja/blog/introducing-dev-mode/#access-everything-you-need-in-one-place)

![[3d50ba4aee877e89ed863d515b87408ceb669098-1560x1248.png]]

With the GitHub plugin, you can link files, issues, and pull requests to Figma component and designs, so you always have the context you need in one place.

Building products requires a robust toolchain, but jumping between design libraries, the codebase, and other project management tools can create inefficiencies, especially when components and style names don’t match what’s in code, or the team doesn’t track and document tasks. Dev Mode aims to make you more productive by connecting the tools you use and your code components to the design file.

Plugins allow you to extend Figma’s functionality to flex however your team works. You can handle project management with [Jira](https://www.figma.com/community/plugin/1220802563996996107), [Linear](https://www.figma.com/community/plugin/1221187540287746170), and [GitHub](https://www.figma.com/community/plugin/1220512233196109878/GitHub), so that you and your designer know what’s going on in your respective processes. [Storybook](https://www.figma.com/community/plugin/1056265616080331589/Storybook-Connect) helps you reference what’s happening in your codebase, in the context of the design itself. And codegen plugins from [AWS Amplify Studio](https://www.figma.com/community/plugin/1040722185526429545/AWS-Amplify-Theme-Editor), [Google Relay](https://www.figma.com/community/plugin/1041056822461507786), and [Anima](https://www.figma.com/community/plugin/857346721138427857/Anima---Export-Figma-to-HTML%2C-React-%26-Vue-code) help you customize code output—you can even create your own based on your unique workflow.

Laurent Thiebault, Engineering Manager & Design Systems Lead, Decathlon (part of the Dev Mode beta)

Design systems are getting more powerful with the [introduction of design tokens through variables](https://www.figma.com/ja/blog/config-2023-recap/#make-your-design-system-more-adaptable-with)

. Tokens are like little bits of UI data that can be used across design and code. These now surface in Dev Mode, so it’s immediately clear what’s needed to start building. You can also add related links to objects on the canvas to reference documentation, or what’s in your plugins.

## [Track what needs to go to production](https://www.figma.com/ja/blog/introducing-dev-mode/#track-what-needs-to-go-to-production)

Even as the design and development phases of the product development process [blur together](https://www.figma.com/ja/blog/welcome-to-the-wip/)

, the artifacts from each—design files and code—remain distinct. To date, it hasn’t been easy to navigate design files, select specific components and their properties, or even know what’s changed since you last looked at a file. Now, designers can simply label a section as “ready for development” and send it to you directly, without creating a separate page or file. Diff support allows you to compare changes between different versions of a frame and stay up to date.

![[7ace83429446da553d16eddb3d6900eb142bb205-1080x864.png]]

![[66f7ce8f51d909d60d391d18242bce970bc38b2a-1080x864.png]]

## [Extend your workflow](https://www.figma.com/ja/blog/introducing-dev-mode/#extend-your-workflow)

With the [VS Code extension](https://help.figma.com/hc/ja/articles/15023121296151) you can bring the power of Dev Mode into your code editor to review designs, see notifications and comments, and stay on top of changes without ever having to leave your coding environment. The VS Code extension also autocompletes code based on the design you’re inspecting, helping you work that much faster.

![[d7030ef1a5de0aecccce8aa8b0fb5ddf057acaf2-1560x1248.png]]

The Figma for VS Code extension brings your Figma file into the code editor

[Dev Mode](https://www.figma.com/ja/dev-mode/) and [Figma for VS Code](https://help.figma.com/hc/ja/articles/15023121296151) are now in beta and free for all users for the rest of 2023. Starting in 2024, you’ll need a paid plan to access Dev Mode. If you’re an editor on a paid plan today, Dev Mode will be included. We know that there are some developers who may not need the full stack of Figma features, so we’re rolling out two new plan options for them. Starting in 2024, you’ll have an option to purchase Dev Mode access only for $25 per seat per month on Organization, and $35 per seat per month on Enterprise.

Jori Lallo, Co-founder, Linear

This is just the first step in making Figma better for developers. With your input from the beta of [Dev Mode](https://www.figma.com/ja/dev-mode/) and [VS Code](https://help.figma.com/hc/ja/articles/15023121296151), we’re excited to expand functionality, including more ways to improve designer-developer collaboration, extract specs, and drive more alignment between design and code.

![[1dd21919f26abd7ad0bf3cdc5ee36f58a4534b46-1280x720.png]]

[Take Dev Mode for a spin](https://www.figma.com/community/file/1234941143610339388) and let us know what you think!

Kris Rasmussen is the Chief Technology Officer at Figma, where he leads the engineering, security and data science teams. Prior to joining Figma in 2017, Kris served as engineering lead and a technical advisor at Asana, where he co-authored many aspects of the framework and infrastructure that powers the company's realtime collaborative features. Before Asana, Kris co-founded RivalSoft Inc., a web-based application that gives companies an internal hub for market information, and served as Chief Architect at Aptana.

[LinkedIn](https://www.linkedin.com/in/kristopherrasmussen/)

## Subscribe for a Shortcut to fresh news and fun surprises

I agree to opt-in to Figma's mailing list.

By clicking “Submit” you agree to our [TOS](https://www.figma.com/ja/tos/) and [Privacy Policy](https://www.figma.com/ja/privacy/).

## Create and collaborate with Figma