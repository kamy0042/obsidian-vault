---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
Today we’re excited to announce something special for Babel users.Over a year ago, we set out to find what the biggest difficulties users were running into with TypeScript, and we found that a common theme among Babel users was that trying to get TypeScript set up was just too hard. The reasons often varied, but for a lot of developers, rewiring a build that’s already working can be a daunting task.

Babel is a fantastic tool with a vibrant ecosystem that serves millions of developers by transforming the latest JavaScript features to older runtimes and browsers; but it doesn’t do type-checking, which our team believes can bring that experience to another level. While TypeScript itself can do both, we wanted to make it easier to get that experience without forcing users to switch from Babel.

That’s why over the past year we’ve collaborated with the Babel team, and today we’re happy to jointly announce that Babel 7 now ships with TypeScript support!

## How do I use it?

If you’re already using Babel and you’ve never tried TypeScript, now’s your chance because it’s easier than ever. At a minimum, you’ll need to install the TypeScript plugin.

`npm install --save-dev @babel/preset-typescript`

Though you’ll also probably want to get the other ECMAScript features that TypeScript supports:

`npm install --save-dev @babel/preset-typescript @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread`

Make sure your `.babelrc` has the right presets and plugins:

`{
    "presets": [
        "@babel/env",
        "@babel/preset-typescript"
    ],
    "plugins": [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ]
}`

For a simple build with `@babel/cli`, all you need to do is run

`babel ./src --out-dir lib --extensions ".ts,.tsx"`

Your files should now be built and generated in the `lib` directory.

To add type-checking with TypeScript, create a `tsconfig.json` file

`{
  "compilerOptions": {
    // Target latest version of ECMAScript.
    "target": "esnext",
    // Search under node_modules for non-relative imports.
    "moduleResolution": "node",
    // Process & infer types from .js files.
    "allowJs": true,
    // Don't emit; allow Babel to transform files.
    "noEmit": true,
    // Enable strictest settings like strictNullChecks & noImplicitAny.
    "strict": true,
    // Disallow features that require cross-file information for emit.
    "isolatedModules": true,
    // Import non-ES modules as default imports.
    "esModuleInterop": true
  },
  "include": [
    "src"
  ]
}`

and just run

`tsc`

and that’s it! `tsc` will type-check your `.ts` and `.tsx` files.

Feel free to add the `--watch` flag to either tool to get immediate feedback when anything changes. You can see how to [set up a more complex build on this sample repository](https://github.com/Microsoft/TypeScript-Babel-Starter) which integrates with tools like Webpack. You can also just [play around with the TypeScript preset on Babel’s online REPL](https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=EQVwzgpgBGAuBOBLAxrYBuAUJxA7WE8AZgIbLQDCi8yANtAN6ZRTwkAmi4AXFLiAFsARoSwBfbERC5UiAPa4oJeBBIAKZLyo16ASihMWK2CHiKAsiVgALAHQAFAJJQAVFGS22ncK7cAmcSA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=true&timeTravel=false&sourceType=module&lineWrap=true&presets=typescript%2Cenv&prettier=false&targets=&version=7.0.0-beta.42&envVersion=7.0.0-beta.42).

## What does this mean for me?

Using the TypeScript compiler is still the preferred way to build TypeScript. While Babel can take over compiling/transpiling – doing things like erasing your types and rewriting the newest ECMAScript features to work in older runtimes – it doesn’t have type-checking built in, and still requires using TypeScript to accomplish that. So even if Babel builds successfully, you might need to check in with TypeScript to catch type errors. For that reason, we feel `tsc` and the tools around the compiler pipeline will still give the most integrated and consistent experience for most projects.

So if you’re already using TypeScript, maybe this doesn’t change much for you. But if you’re already using Babel, or interested in the Babel ecosystem, and you want to get the benefits of TypeScript like catching typos, error checking, and the editing experiences you might’ve seen in the likes of Visual Studio and Visual Studio Code, this is for you!

## Caveats

As we mentioned above, the first thing users should be aware of is that Babel won’t perform type-checking on TypeScript code; it will *only* be transforming your code, and it will compile regardless of whether type errors are present. While that means Babel is free from doing things like reading `.d.ts` files and ensuring your types are compatible, presumably you’ll want *some* tool to do that, and so you’ll still need TypeScript. This can be done as a separate `tsc --watch` task in the background, or it can be part of a lint/CI step in your build. Luckily, [with the right editor support](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support), you’ll be able to spot most errors before you even save.

Second, there are certain constructs that don’t currently compile in Babel 7. Specifically,

- namespaces
- bracket style type-assertion/cast syntax regardless of when JSX is enabled (i.e. writing `<Foo>x` won’t work even in `.ts` files if JSX support is turned on, but you can instead write `x as Foo`).
- enums that span multiple declarations (i.e. enum merging)
- legacy-style import/export syntax (i.e. `import foo = require(...)` and `export = foo`)

These omissions are largely based technical constraints in Babel’s single-file emit architecture. We believe that most users will find this experience to be totally acceptable. To make sure that TypeScript can call out some of these omissions, you should ensure that TypeScript uses the `--isolatedModules` flag.

## What next?

You can [read up on the details from the Babel side on their release blog post](https://babeljs.io/blog/2018/08/27/7.0.0). We’re happy that we’ve had the chance to collaborate with folks on the Babel team like Henry Zhu, Andrew Levine, Logan Smyth, Daniel Tschinder, James Henry, Diogo Franco, Ivan Babak, Nicolò Ribaudo, Brian Ng, and Vladimir Kurchatkin. We even had the opportunity to [speed up Babylon, Babel’s parser](https://github.com/babel/babylon/pull/459#issuecomment-296170332), and helped align with James Henry’s work on [typescript-eslint-parser](https://github.com/eslint/typescript-eslint-parser) which now powers Prettier’s TypeScript support. If we missed you, we’re sorry but we’re grateful and we appreciate all the help people collectively put in!

Our team will be contributing to future updates in the TypeScript plugin, and we look forward to bringing a great experience to all TypeScript users. Going forward, we’d love to hear your feedback about this new TypeScript support in Babel, and how we can make it even easier to use. Give us a shout on Twitter at [@typescriptlang](https://twitter.com/typescriptlang) or in the comments below.

Happy hacking!