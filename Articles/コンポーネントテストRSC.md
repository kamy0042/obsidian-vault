---
タグ: []
作成日時: 2025-01-01T20:16:00
URL: https://storybook.js.org/blog/component-testing-rscs/
Tags: [topic/ツール/Storybook]
---
![](https://storybookblog.ghost.io/content/images/2024/12/React-Server-Components.jpg)

Fully test React Server Components in the browser, fast

Dec 02, 2024 — [@mshilman](https://twitter.com/@mshilman)

Last updated: Dec 04, 2024

After much anticipation, React Server Components (RSCs) are transforming the way we build React apps by blurring the lines between traditional frontend and backend code. RSCs help you build a faster, more responsive, and less complex app. But despite this huge push, there has been little work on how to test them. That makes it hard to build on them with confidence.

In this post, we introduce Storybook Component Testing for RSCs. We show:

1. That there is a testing gap for RSC today.
2. You can close this gap with RSC integration tests that run in the browser.
3. You can exercise full applications with these tests. In this case, Vercel’s Notes demo app.
4. You can mock complex app states, like auth and direct database access.
5. These tests are significantly faster than the equivalent end-to-end (E2E) tests.

It is important to state up front that we are NOT proposing to get rid of E2E tests. E2E is the only way to get confidence about your entire app’s stack working together. However, it’s common to have hundreds or even multiple thousands of component tests that exercise many key application states. And in our experience, this level of testing with E2E is infeasible due to slower test speed and higher flake.

![](https://storybookblog.ghost.io/content/images/2024/12/image.png)

A spectrum titled When to test RSCs, going from In dev to In CI. Component tests in Storybook span the spectrum. End-to-end tests in Playwright only spans the end near In CI.

## RSCs and the testing gap

React Server Components (RSCs) change the way React applications are written, bringing new constructs in exchange for improved performance and security. It’s still early days, but with ongoing work by the Next.js team and React 19 on its way for other frameworks, RSCs are destined to be a big deal.

Now it’s time to start figuring out best practices.

**One of the biggest questions around RSCs is how to test them.** RSCs run on the server and can directly reference Node code, but they also contain client components that render only in the browser. Due to this complexity, the React core team suggests end-to-end (E2E) testing as the primary way to test RSCs. E2E tests exercise the entire system and don’t care about implementation, so they are a great way to test what the user actually experiences. However, they can also be hard to set up, slow, and flaky.

As a consequence, serious testers use a combination of E2E tests to test happy paths through the application and unit/integration tests to cover more states. But until now there is no unit/integration approach for RSCs, leaving a major gap in the testing strategy.

That’s where Storybook comes in. In this post, we introduce Component Testing for RSCs: small, self-contained integration tests that exercise both server and client code, in the browser. You can simulate a wide variety of test cases, and execute them quickly and without flake.

![](https://storybookblog.ghost.io/content/images/2024/12/frontend-testing-trophy.png)

Where Component Testing fits into your testing strategy

## Component testing RSCs

Component tests are small, unit-like tests that run in the browser. Unlike end-to-end (E2E) tests that can involve multiple round trips to a server and even more data fetching beyond that, Storybook component tests are compact, isolated, and run entirely in the browser.

Consider a “hello world” example that operates on a single `Button` component in isolation:

```plain text
// Button.stories.jsx
export const TestEvents = {
  async play({ mount, args }) {
    // Arrange
    let count = 0;
    const canvas = await mount(
      <Button label="Submit" onClick={() => { count++ }} />
    );

    // Act
    await userEvent.click(canvas.getByRole('button'));

    // Assert
    await expect(canvas.getByText('Submit')).toBeDefined();
    await expect(count).toBe(1);
  }
}
```

This example will look familiar to anyone who has written a [`play`](https://storybook.js.org/docs/writing-stories/play-function?ref=storybookblog.ghost.io)[ function](https://storybook.js.org/docs/writing-stories/play-function?ref=storybookblog.ghost.io) for a story, which allows you to simulate and assert on component functionality and behavior. The only new construct here is the `mount` function, which is a recent addition to Storybook that allows you to “arrange, act, assert” all within the `play` function:

6. **Arrange:** (a) initialize `count` , (b) `mount(...)`, which renders the story.
7. **Act:** Click the button
8. **Assert:** After the button is clicked, verify (a) that the Submit button is rendered, and (b) that the count was updated.

Note that if you don’t destructure the `mount` function, `play` will execute after Storybook has automatically rendered the Story.

This is not the most interesting test, but as we’ll see next, it doesn’t take much more than this to build and test full RSC application pages.

## Server Components Notes demo app

Component tests are not just for hello world. In the past, [we used Storybook to build a Hacker News clone in RSC](https://storybook.js.org/blog/build-a-nextjs-app-with-rsc-msw-storybook/?ref=storybookblog.ghost.io). That example was implemented on top of a REST API, and we mocked out those API calls using [Mock Service Worker (MSW)](https://mswjs.io/?ref=storybookblog.ghost.io).

But not all RSC apps are that simple. An RSC can do just about anything on the server, and you might need other kinds of mocking to test that functionality in the browser. That’s why, for example, we invested in [Typesafe Module Mocking in Storybook](https://storybook.js.org/blog/type-safe-module-mocking/?ref=storybookblog.ghost.io).

This time around, we’ve modified Vercel’s [Server Components Notes demo app](https://github.com/vercel/server-components-notes-demo?ref=storybookblog.ghost.io) to build and test RSCs in isolation. The Notes app uses a Prisma database to store notes and Github OAuth for authentication.

When the user is logged out, they can view and search notes:

When logged in, they can also add/edit/delete them:

We’ve organized our Storybook into two sections: App and Components. App mirrors the route/folder structure of the application and Components is currently a flat list of the components inside the app. For a more complete app, these components would be organized into subfolders:

![](https://storybookblog.ghost.io/content/images/size/w2400/2024/12/subfolders.png)

Storybook with expanded subfolders in the sidebar

## Mocking using an in-memory database

Databases are the heart of many web applications, and the Notes demo is no different. We use a Prisma database to store notes. Mocking it with an in-memory database allows us to control what notes get rendered to the screen and intercept when notes are added, removed, and updated.

This is amazing for multiple reasons:

9. **Speed.** We can instantly teleport our app into any state and test from there, eliminating moving parts. Far fewer network requests and moving parts means that these tests are MUCH faster than their E2E equivalents and have a lot less flake.
10. **Coverage.** We are getting test coverage for both our frontend and backend code in a single set of integration tests, since we are mocking at the very back of the backend. This is much easier to deal with than having to jump through hoops to measure coverage on the front and back ends during an E2E run and then having to stitch those reports together after the fact.
11. **Isolation.** Since the database is in-memory, it means that each test effectively gets its own database and you don’t have to ever worry about different tests overwriting each others’ data. If you have E2E tests running against a fixed database, you always need to worry about resource contention if you’re running tests in parallel within a single run or have multiple runs. That’s never a problem here.

We’ll quantify these benefits later, but first let’s see how it all works. Here’s the server component that implements the Note page:

```plain text
// apps/notes/[id]/page.tsx
import NoteUI from '#components/note-ui';
import { db } from '#lib/db';

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
  const note = await db.note.findUnique({ where: { id: Number(params.id) } });
  if (note === null) { /* error */ }
  return <NoteUI note={note} isEditing={false} />;
}
```

All the magic is happening on this line:

```plain text
import { db } from '#lib/db';
```

We’re using a standard called subpath imports to enable [typesafe module mocking](https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules?ref=storybookblog.ghost.io). When run in the application environment (Next.js), this imports from [`/lib/db.ts`](https://github.com/storybookjs/storybook-rsc-demo/blob/main/lib/db.ts?ref=storybookblog.ghost.io) , which exports a Prisma client connected to a real database. When run in Storybook, it imports from [`/lib/db.mock.ts`](https://github.com/storybookjs/storybook-rsc-demo/blob/main/lib/db.mock.ts?ref=storybookblog.ghost.io), which exports a Prisma client that’s connected to an in-memory database.

Next, let’s look at one of the stories:

```plain text
// app/notes/[id]/page.stories.jsx
import type { Meta, StoryObj } from '@storybook/react';
import { db, initializeDB } from '#lib/db.mock';
import Page from './page';
import { PageDecorator } from '#.storybook/decorators';

export default {
  component: Page,
  async beforeEach() {
    await db.note.create({
      data: {
        title: 'Module mocking in Storybook?',
        body: "Yup, that's a thing now! 🎉",
        createdBy: 'storybookjs',
      },
    });
    await db.note.create({ /* another */ });
  },
  decorators: [PageDecorator],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: { pathname: '/note/1' },
    },
  },
  args: { params: { id: '1' } },
};

export const NotLoggedIn = {}

export const EmptyState = {
  async play({ mount }) {
    initializeDB({});
    await mount();
  },
}
```

With this small snippet of code, every story in the file will have two notes by default. Specific stories can modify the database contents to achieve their desired state, such as `EmptyState` which resets to an empty database.

Note that the unlike the Page component, the story file is importing from `'#lib/db.mock'` directly. That means that it gets full type safety for the mocks, e.g. wrapped functions expose their `.mock.calls` and other fields for both type checking and autocompletion.

## Mocking authentication

Now let’s take a look at authentication. Unlike E2E tests that need a complex song and dance to authenticate your user, mocking an authenticated state in Storybook is dead simple. Here’s another story that shows the same page as above, but in a logged in state:

```plain text
// app/notes/[id]/page.stories.jsx

// ...Continuing from above

import { cookies } from '@storybook/nextjs/headers.mock';
import { createUserCookie, userCookieKey } from '#lib/session';

// export default { ... } from above

export const LoggedIn = {
  async beforeEach() {
    cookies().set(userCookieKey, await createUserCookie('storybookjs'));
  }
}
```

Since our authentication is cookie-based, and Storybook’s Next.js framework automatically mocks out cookies, we can just set the auth cookie and we’re done. With this small modification, the RSC will look and behave as if the user storybookjs is logged in.

## Testing a user workflow

The two simple primitives of mocking the database and mocking authentication get us a lot. We can write E2E-style tests that are blazing fast and flake free, and also allow us to inspect any part of the system. For example, here’s a test to add a new note:

```plain text
// app/note/edit/page.stories.jsx

// ...Continuing from above

export const SaveNewNote = {
  play: async ({ mount }) => {
	  // Arrange
    cookies().set(userCookieKey, await createUserCookie('storybookjs'));
    const canvas = await mount();

    // Act
    const titleInput = await canvas.findByLabelText(
      'Enter a title for your note',
    )
    const bodyInput = await canvas.findByLabelText(
      'Enter the body for your note',
    )
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'New Note Title')
    await userEvent.type(bodyInput, 'New Note Body')
    await userEvent.click(
      await canvas.findByRole('menuitem', { name: /done/i }),
    )

    // Assert
    await waitFor(() =>
      expect(getRouter().push).toHaveBeenLastCalledWith('/note/1', expect.anything()),
    );
    await expect(await db.note.findUnique({ where: { id: 1 } })).toEqual(
      expect.objectContaining({
        title: 'New Note Title',
        body: 'New Note Body',
      }),
    )
  },
}
```

## Putting it all together

At the beginning of the post, we claimed that component tests can be a fast and flake-free way to test RSC apps. So how did we do?

Our Storybook demonstrates various types of mocking via stories like the ones above, and is available publicly in the [storybook-rsc-demo](https://github.com/storybookjs/storybook-rsc-demo?ref=storybookblog.ghost.io) repo. As of this writing it contains 34 stories.

Executing those stories as Vitest tests (via [Storybook Test](https://storybook.js.org/blog/storybook-test-sneak-peek/?ref=storybookblog.ghost.io)) takes ~7s on a 2021 Macbook M1 Pro with 16GB of RAM. It results in 87% line and 73% branch coverage across the entire project including both frontend and backend code.

Storybook Test can run your tests in the CLI or inside Storybook itself, which offers status filtering and an interactive debugger to step back and forward through your test’s steps. And because your tests are stories, you get visual feedback as you write them, too.

![](https://storybookblog.ghost.io/content/media/2024/12/sb-test-rsc-optimized.mp4)

👋

Get early access to Storybook Test. Our early access program includes hands-on help from the Storybook maintainers, exclusive events, and access to a user community to help build out a UI test suite for your project.

[👉 Register here!](https://storybook.js.org/sb-test-eap?ref=storybookblog.ghost.io)

## Try it today

Component testing for RSC is available (experimentally) in Storybook. Try it in a new Next.js project:

```plain text
npx storybook@latest init

```

Or upgrade an existing project:

```plain text
npx storybook@latest upgrade

```

Make sure you enable the feature flag for RSC support:

```plain text
// .storybook/main.js
export default {
  // ...
  features: {
    experimentalRSC: true,
  },
};

```

For the full example shown in this post, please see the [storybook-rsc-demo](https://github.com/storybookjs/storybook-rsc-demo?ref=storybookblog.ghost.io) repo. And to learn more, please see the [RSC](https://storybook.js.org/docs/get-started/frameworks/nextjs?renderer=react&ref=storybookblog.ghost.io#react-server-components-rsc) and [component testing](https://storybook.js.org/docs/writing-tests/component-testing?ref=storybookblog.ghost.io) docs.

## What’s next?

[Storybook Test](https://storybook.js.org/docs/writing-tests/test-addon?ref=storybookblog.ghost.io) as benchmarked in this post is available in Storybook 8.4. In addition, we’re also working on:

12. Zero-config code coverage to quantify your tests are you’re developing
13. Focused tests to quickly test a single story, component, or directory
14. Mocking features to formalize and visualize some of the patterns we’ve shown here

For an overview of projects we’re considering and actively working on, please check out [Storybook’s roadmap](https://github.com/orgs/storybookjs/projects/20/views/1?ref=storybookblog.ghost.io).

🙅 Firing up your whole E2E setup just to test React Server Components (RSCs)

🙌 Component testing RSCs in the browser, with mocked complex app states and reliable speed

🧵 [pic.twitter.com/1KQFsXVBg9](https://t.co/1KQFsXVBg9?ref=storybookblog.ghost.io)— Storybook (@storybookjs) [December 3, 2024](https://twitter.com/storybookjs/status/1864033468184715347?ref_src=twsrc%5Etfw&ref=storybookblog.ghost.io)

### Join the Storybook mailing list

Get the latest news, updates and releases

Your email

6,655 developers and counting

### We’re hiring!

Join the team behind Storybook and Chromatic. Build tools that are used in production by 100s of thousands of developers. Remote-first.

[View jobs](https://www.chromatic.com/company/jobs)