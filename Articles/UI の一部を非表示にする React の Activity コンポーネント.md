---

Tags: [topic/技術/React]
---
[https://azukiazusa.dev/blog/react-activity-component](https://azukiazusa.dev/blog/react-activity-component)

![](https://images.ctfassets.net/in6v9lxmm5c8/5eh9OWKiFwfxP12zoL52ma/9403355edfe4f3bfeada2a7aada33690/bird_hayabusa_falcon_13697-768x689.png?q=50&fm=webp&w=1200)

React の新しい実験的なコンポーネントとして `<Activity>` が追加されました。これは UI の表示非表示を切り替えるために使用されます。従来の条件付きレンダリングとは異なり、アンマウントされた場合にも状態を保持する点が特徴です。

## 目次

1. [<Activity> コンポーネントの使用例](https://azukiazusa.dev/blog/react-activity-component/#activity-%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E4%BD%BF%E7%94%A8%E4%BE%8B)
    1. [UI を事前にレンダリングする](https://azukiazusa.dev/blog/react-activity-component/#ui-%E3%82%92%E4%BA%8B%E5%89%8D%E3%81%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%99%E3%82%8B)
2. [<Activity> と Effect](https://azukiazusa.dev/blog/react-activity-component/#activity-%E3%81%A8-effect)
3. [まとめ](https://azukiazusa.dev/blog/react-activity-component/#%E3%81%BE%E3%81%A8%E3%82%81)
4. [参考](https://azukiazusa.dev/blog/react-activity-component/#%E5%8F%82%E8%80%83)

React の新しい実験的なコンポーネントとして `<Activity>` が追加されました。これは UI の表示非表示を切り替えるために使用されます。

```plain text
import { unstable_Activity as Activity } from "react";

function App({ isVisible }: { isVisible: boolean }) {
  return (
    <Activity mode={isVisible ? "visible" : "hidden"}>
      <div>...</div>
    </Activity>
  );
}
```

Note

`<Activity>` コンポーネントは実験的な機能であり、React の安定バージョンのリリースでは使用できません。`react@experimental`, `react-dom@experimental` バージョンをインストールして使用してください。

## `<Activity>` コンポーネントの使用例

単に UI の表示非表示を切り替えるだけであるならば、`<Activity>` コンポーネントを使用する必要はありません。今までも条件付きレンダリングで十分に実現できていました。

```plain text
import { useState } from "react";
import { PageA } from "./PageA";
import { PageB } from "./PageB";

function App() {
  const [page, setPage] = useState("A");

  return (
    <div>
      <button onClick={() => setPage("A")}>Page A</button>
      <button onClick={() => setPage("B")}>Page B</button>

      {page === "A" && <PageA />}
      {page === "B" && <PageB />}
    </div>
  );
}

export default App;
```

しかし、このような条件付きレンダリングは UI の状態を保存できません。コンポーネントがアンマウントされたタイミングで状態が失われてしまいます。たとえば、`PageA` に入力フィールドがある場合 `PageB` に切り替えた後に戻ったときに、`<input>` に入力していたテキストはすべて失われてしまいます。

`<Activity>` コンポーネントを使用するとコンポーネントが非表示になってもその状態を保持できます。`<Activity>` コンポーネントの `mode` プロパティが `visible` から `hidden` に切り替わったときに `useEffect` のコールバックが実行されコンポーネントはアンマウントされますが、状態は破棄されることはありません。

```plain text
import { useState, unstable_Activity as Activity } from "react";
import { PageA } from "./PageA";
import { PageB } from "./PageB";

function App() {
  const [page, setPage] = useState("A");

  return (
    <div>
      <button onClick={() => setPage("A")}>Page A</button>
      <button onClick={() => setPage("B")}>Page B</button>

      <Activity mode={page === "A" ? "visible" : "hidden"}>
        <PageA />
      </Activity>
      <Activity mode={page === "B" ? "visible" : "hidden"}>
        <PageB />
      </Activity>
    </div>
  );
}
export default App;
```

### UI を事前にレンダリングする

`<Activity>` コンポーネントが `mode=hidden` でレンダリングされているとき、`<Activity>` コンポーネントの子要素はページ上には存在しないものの低い優先度でレンダリングされます。データの取得に時間がかかる要素を事前にレンダリングしておくことで、ユーザーがページを切り替えたときにすぐに表示されるようになります。

以下の例では `<PostList>` コンポーネントが `use` フックを使用して API からデータを取得するようになっています。

PostPage.tsx

```plain text
import React, { Suspense, use } from "react";

// ダミーの記事データ
interface Post {
  id: number;
  title: string;
}

const dummyPosts: Post[] = [
  { id: 1, title: "React 19 is here!" },
  { id: 2, title: "Understanding the use hook" },
  { id: 3, title: "Server Components vs Client Components" },
];

const cache = new Map();

export function fetchData(url: string) {
  if (!cache.has(url)) {
    cache.set(url, fetchPosts());
  }
  return cache.get(url);
}

// 3000ms 遅延するダミー API 関数
const fetchPosts = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyPosts);
    }, 3000);
  });
};

// use フックを使って記事一覧を取得するコンポーネント
const PostList: React.FC = () => {
  // use フックで Promise を解決
  const posts = use(fetchData("/api/posts")) as Post[];

  return (
    <div>
      <h2>Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export const PostPage: React.FC = () => {
  return (
    <div>
      <h1>Post Page</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
};
```

条件付きレンダリングを使用してコンポーネントを切り替える場合には、`<PostList>` を表示する条件が `true` になったときに初めてコンポーネントがマウントされ API からデータを取得します。ユーザーは表示を切り替えてからデータの取得が完了するまで待たなければなりません。

App.tsx

```plain text
import { useState } from "react";
import { PageA } from "./PageA";
import { PageB } from "./PageB";
import { PostPage } from "./PostPage";

function App() {
  const [page, setPage] = useState("A");

  return (
    <div>
      <button onClick={() => setPage("A")}>Page A</button>
      <button onClick={() => setPage("B")}>Page B</button>
      <button onClick={() => setPage("Post")}>Post</button>

      {page === "A" && <PageA />}
      {page === "B" && <PageB />}
      {page === "Post" && <PostPage />}
    </div>
  );
}
export default App;
```

`<Activity>` コンポーネントを使用すると、`mode=hidden` の状態でレンダリングされているときに API からデータを取得しておくことができます。ユーザーがページを切り替えたときにはすでにデータの取得が完了しているため、すぐに表示されます。

App.tsx

```plain text
import { useState, unstable_Activity as Activity } from "react";
import { PageA } from "./PageA";
import { PageB } from "./PageB";
import { PostPage } from "./PostPage";

function App() {
  const [page, setPage] = useState("A");

  return (
    <div>
      <button onClick={() => setPage("A")}>Page A</button>
      <button onClick={() => setPage("B")}>Page B</button>
      <button onClick={() => setPage("Post")}>Post</button>

      <Activity mode={page === "A" ? "visible" : "hidden"}>
        <PageA />
      </Activity>
      <Activity mode={page === "B" ? "visible" : "hidden"}>
        <PageB />
      </Activity>
      <Activity mode={page === "Post" ? "visible" : "hidden"}>
        <PostPage />
      </Activity>
    </div>
  );
}
export default App;
```

## `<Activity>` と Effect

UI を事前にレンダリングする例において `useEffect` を使用して API からデータを取得するのではなく、`use` フックを使用しているのには理由があります。`<Activity>` コンポーネントは `mode=hidden` の状態でレンダリングされている場合には `useEffect` が実行されないためです。`useEffect` は `mode=hidden` から `mode=visible` に切り替わったときに初めて実行されます。`useEffect` 内で API を呼び出した場合、ページを切り替えたタイミングで API からデータを取得することになるため、事前レンダリングが有効に働きません。

`console.log` をコンポーネントの中に追加して `useEffect` がどのように実行されるのか確認してみましょう。

PageB.tsx

```plain text
import React, { useEffect } from "react";

export const PageB: React.FC = () => {
  useEffect(() => {
    console.log("Page B mounted");
    return () => {
      console.log("Page B unmounted");
    };
  }, []);

  console.log("Page B rendered");

  return (
    <div>
      <h1>Page B</h1>
      <p>This is Page B.</p>
    </div>
  );
};
```

画面を表示 → `Page B` ボタンをクリックして表示 → `Page A` ボタンをクリックして非表示の順で実行すると以下のようなログが出力されます。

```plain text
Page A rendered
Page A mounted
Page B rendered

# ボタン「Page B」をクリック
Page B rendered
Page A unmounted
Page B mounted
Page A rendered

# ボタン「Page A」をクリック
Page A rendered
Page B unmounted
Page A mounted
Page B rendered
```

また `<Activity>` コンポーネントがアンマウントされる場合 `useEffect` のクリーンアップ関数が実行されるものの、React や DOM の状態は破棄されないという点にも注意が必要です。つまりマウント時に一度だけ実行されると想定している `useEffect` はコンポーネントが非表示から表示に切り替わったときに再度実行されます。誤った `useEffect` の使い方をしていると予期せぬ副作用が発生する恐れがあります。

[そのエフェクトは不要かも](https://ja.react.dev/learn/you-might-not-need-an-effect) のガイドに従って実装していれば問題はないでしょう。また [Strict モード](https://ja.react.dev/reference/react/StrictMode) を有効にして開発中に予期せぬ副作用が発生していないかどうか確認するのも重要です。Strict モードでは React コンポーネントが純粋な関数であることを保証するために 2 回レンダリングされます。

`<PageB>` コンポーネントが表示されるまで「Page B rendered」が表示されていることに注意してください。[コンポーネントを純粋に保つ](https://ja.react.dev/learn/keeping-components-pure) ルールに従っていないコンポーネントを使用している場合、予期せぬ表示が発生する可能性があります。

## まとめ

- `<Activity>` コンポーネントは UI の表示非表示を切り替えるためのコンポーネント
- `<Activity>` コンポーネントは条件付きレンダリングと異なり、UI の状態を保持することができる
- `<Activity>` コンポーネントは UI を事前にレンダリングする用途に使用できる
- `useEffect` の扱いが通常のコンポーネントと異なるので注意が必要。[そのエフェクトは不要かも](https://ja.react.dev/learn/you-might-not-need-an-effect) のガイドに従えば問題はない。Strict モードを有効にして開発中に予期せぬ副作用が発生していないかどうか確認するのも重要

## 参考

- [– React](https://react.dev/reference/react/Activity)
- [React Labs: View Transitions, Activity, and more – React](https://react.dev/blog/2025/04/23/react-labs-view-transitions-activity-and-more)
- [Experimental bfcache: Restore state w/ by acdlite · Pull Request #77992 · vercel/next.js](https://github.com/vercel/next.js/pull/77992)

## 記事の理解度チェック

以下の問題に答えて、記事の理解を深めましょう。

### `<Activity>` コンポーネントが従来の条件付きレンダリングと異なる重要な点は何ですか？

- 非表示になってもコンポーネントの状態を保持する  正解！ 従来の条件付きレンダリングではコンポーネントがアンマウントされると状態が失われますが、`<Activity>` コンポーネントは非表示になっても状態を保持します。
- パフォーマンスが優れている  もう一度考えてみましょう
- コードがシンプルになる  もう一度考えてみましょう
- サーバーサイドレンダリングでのみ利用できる  もう一度考えてみましょう

## Contributors

[GitHub で修正を提案する](https://github.com/azukiazusa1/sapper-blog-app/tree/main/contents/blogPost/react-activity-component.md)

この記事をシェアする

[Xで共有](https://x.com/share?url=https%3A%2F%2Fazukiazusa.dev%2Fblog%2Freact-activity-component&text=UI%20%E3%81%AE%E4%B8%80%E9%83%A8%E3%82%92%E9%9D%9E%E8%A1%A8%E7%A4%BA%E3%81%AB%E3%81%99%E3%82%8B%20React%20%E3%81%AE%20Activity%20%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88)

[Markdown バージョン](https://azukiazusa.dev/blog/react-activity-component.md)

## 関連記事

![](https://images.ctfassets.net/in6v9lxmm5c8/1vnOta8eY4gfwZyzBUZ5SW/98f05649778e17085b4727413f2dcb1c/flower_cosmos_illust_1012.png?q=50&fm=webp&w=1200)

[sobauchi illust 3930-768x768](https://azukiazusa.dev/blog/declarative-page-transition-animation-with-react-viewtransition-component)

![](https://images.ctfassets.net/in6v9lxmm5c8/4LXuBOcOcy8qk7llZURFa3/f31fcdaa3a5f0ea1bb84c9267e2e5eaa/sobauchi_illust_3930-768x768.png?q=50&fm=webp&w=1200)