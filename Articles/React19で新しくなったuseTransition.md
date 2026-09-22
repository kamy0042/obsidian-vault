---

Tags: [topic/技術/React]
---
[https://zenn.dev/h_yokoyama/articles/react19-usetransition](https://zenn.dev/h_yokoyama/articles/react19-usetransition)

![](https://storage.googleapis.com/zenn-user-upload/topics/64acd76870.png)

![](https://storage.googleapis.com/zenn-user-upload/topics/489b9436a3.png)

# はじめに

現在、React19 の RC 版がリリースされています。

React19 では様々な新機能が発表されていますが、その中でも新しくなった`useTransition`について紹介してきます。

本記事では、

1. `useTransition` を使わない場合
2. React18 までの `useTransition` を使った場合
3. React19 で新しくなった `useTransition` を使った場合

の 3 つを比較して説明していきます。

# useTransition とは

`useTransition` は、React18 で導入されました。

`useTransition` は公式ドキュメントには「UI をブロックせずに state を更新するための React フック」と表現されています。ざっくりと「state 更新の優先度を下げるためのフック」と言い換えられるのではないかと考えられます。

では`useTransition`を使わず state を更新するやり方と、`useTransition`を使って state を更新するやり方を比較してみます。

# useTransition を使わずに state を更新する

例として、タブでページ遷移するアプリケーションを考えていきます。

タブをクリックするとそのページに遷移して、選択中のタブが太字になるようなイメージです。

![](https://storage.googleapis.com/zenn-user-upload/2d8733f4c1f4-20240824.gif)

やり方としては現在のページ数を`currentPage`で保持して、タブがクリックされたときに`changePage`関数が発火して`setCurrentPage`で`currentPage`が更新されます。

以下がコードになります。また本記事ではコード上では CSS は省略しています。

```plain text
const [currentPage, setCurrentPage] = useState(1);
const changePage = (newPage: number) => {
  setCurrentPage(newPage);
};
return (
  <div>
    <div>
      <button onClick={() => changePage(1)}>ページ1</button>
      <button onClick={() => changePage(2)}>ページ2</button>
      <button onClick={() => changePage(3)}>ページ3</button>
    </div>
    <div>
      {currentPage === 1 && <p>現在のページは1</p>}
      {currentPage === 2 && <p>現在のページは2</p>}
      {currentPage === 3 && <p>現在のページは3</p>}
    </div>
  </div>
);

```

ここで問題になるのが、とあるページの読み込みに時間がかかり state 更新がとても重い処理だった場合、**state の更新中にユーザーは他の操作をすることができず、待機状態を UI 上で把握することができないこと**です。

以下のコードで、ページ 3 がクリックされたときに表示する`<SlowPage>`のように読み込みに時間がかかる場合があります。

```plain text
const [currentPage, setCurrentPage] = useState(1);
const changePage = (newPage: number) => {
  setCurrentPage(newPage);
};
return (
  <div>
    <div>
      <button onClick={() => changePage(1)}>ページ1</button>
      <button onClick={() => changePage(2)}>ページ2</button>
      <button onClick={() => changePage(3)}>ページ3（激重）</button>
    </div>
    <div>
      {currentPage === 1 && <p>現在のページは1</p>}
      {currentPage === 2 && <p>現在のページは2</p>}
      {/* ⏬ SlowPageは表示に時間がかかるコンポーネント */}
      {currentPage === 3 && <SlowPage />}
    </div>
  </div>
);

```

![](https://storage.googleapis.com/zenn-user-upload/2eab32dd7e4e-20240829.gif)

こちらの Gif 画像だと分かりにくいのですが、`ページ3（激重）`のタブをクリックしたときに表示するページのレンダリングに時間がかかっておりその間、UI は他のタブをクリックしても反応しなくなります。そのため`ページ3`を読み込んでいるときにユーザーが`ページ3`を見ることをやめ、他のページのタブをクリックできないようになってしまっています。

公式のデモで同じような挙動を体験することができます。（[デモ](https://ja.react.dev/reference/react/useTransition#updating-the-current-tab-without-a-transition)）

# useTransition を使って state を更新する

`useTransition`を使うことで、UI をブロックせずに state を更新することができます。

使い方としては`useTransition`を呼び出し、その返り値として`isPending`、`startTransition`を受け取ります。`startTransition`で state 更新の set 関数をくくることで、UI をブロックせずに優先度を下げて state を更新することができます。

このように優先度を下げて state 更新することを公式ドキュメントでは「トランジション」というように表現されているようです。

ちなみに`isPending`と`startTransition`の命名は慣例的なもので、他の命名でも可能です。

```plain text
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setFoo(foo);
});

```

ではタブでページ遷移するアプリケーションの例に戻ります。

先ほど UI をブロックしていた`setCurrentPage`に`startTransition`をくくります。

```plain text
const [currentPage, setCurrentPage] = useState(1);
+ const [isPending, startTransition] = useTransition();

const changePage = (newPage: number) => {
+  startTransition(() => {
   setCurrentPage(newPage);
+  });
};

return (
 <div>
<div>
<button onClick={() => changePage(1)}>ページ1</button>
<button onClick={() => changePage(2)}>ページ2</button>
<button onClick={() => changePage(3)}>ページ3（激重）</button>
</div>
<div>
{currentPage === 1 && <FastPage pageNumber={1} />}
{currentPage === 2 && <FastPage pageNumber={2} />}
{/* ⏬ SlowPageは表示に時間がかかるコンポーネント */}
{currentPage === 3 && <SlowPage />}
</div>
</div>
);

```

また、`startTransition`でくくった処理が完了したかどうかは`isPending`に格納されます。

そのため以下のように裏でページの読み込み、state 更新が実行されていることを`isPending`を使って表現することができます。

```plain text
// ページ3取得中のときに、ボタンを少し透明にする
<button
   onClick={() => changePage(3)}
+  className={isPending ? "opacity-50" : ""}
>
   ページ3（激重）
</button>

```

![](https://storage.googleapis.com/zenn-user-upload/4f756de45358-20240825.gif)

`ページ3`のタブをクリックして`ページ3`取得中でも、UI はブロックされず、`ページ1`や`ページ2`に切り替えることができています。このように`useTransition`を使うことで、UI をブロックせずに state を更新できるようになります。

ここまでが React18 までの`useTransition`です。

# React19 で新しくなった useTransition

React19 では従来の `useTransition` と比較して、非同期関数を扱えるようになりました。

つまり、以下のように `startTransition` で非同期関数をくくれるようになりました。

```plain text
startTransition(async () => {
  const foo = await getFoo(); // 非同期関数が扱える
  setFoo(foo);
});

```

では実際に例を見てみましょう。

今度は、input 要素にユーザー ID を入力し検索ボタンをクリックしたときに、ユーザー ID に紐づくユーザーの情報を表示するアプリケーションを例に考えていきます。先ほどの`isPending`のように検索中は、「読み込み中...」の文字を表示するようにします。

## 従来の実装

```plain text
const [userId, setUserId] = useState("");
const [user, setUser] = useState<User | null>(null);
const [isPending, setIsPending] = useState(false);

const handleClick = async () => {
  setUser(null);
  setIsPending(true); // isPendingを手動で切り替える
  const user = await getUser(userId);
  setUser(user);
  setIsPending(false);
};

return (
  <div>
    <div>
      <input type="number" onChange={(e) => setUserId(e.target.value)} />
      <button onClick={handleClick}>検索</button>
    </div>
    {isPending && <p>読み込み中...</p>}
    {user && (
      <div>
        <p>名前: {user.name}</p>
        <p>メール: {user.email}</p>
        <p>電話番号: {user.phone}</p>
        <p>ウェブサイト: {user.website}</p>
        <p>会社: {user.company.name}</p>
      </div>
    )}
  </div>
);

```

検索ボタンをクリックしたときに `handleClick`関数でユーザーの取得を行っています。

こちらでは`isPending` を手動で切り替えています。

## useTransition を使った実装

```plain text
const [userId, setUserId] = useState("");
const [user, setUser] = useState<User | null>(null);
+ const [isPending, startTransition] = useTransition();

const handleClick = () => {
 setUser(null);
+  startTransition(async () => {
   const user = await getUser(userId);
    setUser(user);
+  });
};

return (
 <div>
<div>
<input type="number" onChange={(e) => setUserId(e.target.value)} />
<button onClick={handleClick}>検索</button>
</div>
{isPending && <p>読み込み中...</p>}
{user && (
      <div>
<p>名前: {user.name}</p>
<p>メール: {user.email}</p>
<p>電話番号: {user.phone}</p>
<p>ウェブサイト: {user.website}</p>
<p>会社: {user.company.name}</p>
</div>
    )}
</div>
);

```

従来の実装と比較して、非同期関数の `getUser` と set 関数を `startTransition` でくくっています。

このように非同期関数を `startTransition` 内で実行すること UI をブロックせずに state を更新できるだけでなく、`isPending` の管理を `useTransition` 側に委ねることができるので、より簡潔に書くことができると感じます。

# 最後に

React19 では、`useTransition` が非同期関数を扱えるようになったことで、React18 以前よりもスムーズな UI が実現しやすくなっていると感じました。また、ローディング状態を手動でトグルする必要がなくなったことでコードがよりシンプルになったと感じます。

一方でこれまでクライアントフェッチは [SWR](https://swr.vercel.app/ja) や [TanStack Query](https://tanstack.com/query/latest) のようなライブラリを使ったフェッチがよく行われてきました。そこでこれらのフェッチライブラリと今回の例のような非同期処理を扱う `useTransition` をどう使い分けていくかが個人的にはまだ明確でないです。React19 で出る`useActionState`なども併せて、今後勉強していき理解を深めていきたいです。

26

[Hayato Yokoyama](https://zenn.dev/h_yokoyama)

### Discussion

![](https://static.zenn.studio/images/drawing/discussion.png)