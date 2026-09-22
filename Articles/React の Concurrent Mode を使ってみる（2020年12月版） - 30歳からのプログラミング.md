---
Created: 2021-03-27T16:42:00
URL: https://numb86-tech.hatenablog.com/entry/2020/12/16/214705
Tags: [topic/技術/React]
---
React で開発が進められている Concurrent Mode。
 まだリリース前の開発中の機能だが、「実験的機能」として提供されており、`Experimental`ビルドをインストールすることで利用できる。`Experimental`はリリース間の安定性を何も保証しておらず、破壊的変更が行われる可能性がある。Concurrent Mode の動作も、大きく変わる可能性がある。
 記事のタイトルに「2020年12月版」と入れたのは、そのため。

[公式ドキュメント](https://ja.reactjs.org/docs/concurrent-mode-intro.html)では「並列モード」と翻訳されているが、まさに、並列的にレンダリングを行えるようになる。
 ネットワークからデータを取得して要素をレンダリングする際に、ユーザーに見えないところで新しいレンダリングの準備をしつつ、データが取得できるまでは古いレンダリングを表示しておく、といったことが可能になる。
 この記事では、どういった仕組みでそのようなことが可能になっているのか、ひとつずつ見ていく。

使用したライブラリのバージョンは以下の通り。

- react@0.0.0-experimental-4ead6b530
- react-dom@0.0.0-experimental-4ead6b530
- typescript@4.1.3

## Concurrent Mode を有効にする

`createRoot`を使って React 要素をマウントすると、その要素全体で Concurrent Mode が有効になる。
 従来は`ReactDOM.render(element, container)`だったものが、`ReactDOM.createRoot(container).render(element)`になる。
 以下のコードでは、`<App />`全体で Concurrent Mode が有効になる。今回は TypeScript を使うため、トリプルスラッシュディレクティブで型定義も読み込んでいる。

```plain text
/// <reference types="react-dom/experimental" />

import {unstable_createRoot} from 'react-dom';

import {App} from './components/App';

unstable_createRoot(document.querySelector<HTMLDivElement>('#app')!).render(
  <App />
);

```

`createRoot`に`unstable_`という接頭語が付いているのは、この API がまだ実験的なものであり安定版ではないことを意味している。[バージョニングポリシー – React](https://ja.reactjs.org/docs/faq-versioning.html#what-counts-as-a-breaking-change)

## Suspense はスローされた Promise をキャッチする

Concurrent Mode においては、`Suspense`コンポーネントが重要な役割を果たす。

`Suspense`コンポーネント自体は以前から存在したが、コンポーネントの Dynamic Import を行うために使われていた。

Concurrent Mode では、コンポーネント以外のリソース（例えば、ネットワークから取得するデータ）の取得を待機することができるようになった。

それを可能にしているのが、「スローされた`Promise`をキャッチする」という`Suspense`の機能である。

React ツリーのなかで`Promise`がスローされると、ツリーを上に辿っていき、一番最初に到達した`Suspense`の`fallback`が表示される。
 もし最後まで`Suspense`が見つからなかった場合、ツリー全体がアンマウントされる。

例えば以下のコードでは、`ThrowPromise`コンポーネントが`Promise`をスローしている。
 そこからツリーを上に辿っていくと`<Suspense fallback={<div>Fallback</div>}>`が見つかるため、その`fallback`に設定されている`<div>Fallback</div>`が表示される。

```plain text
/// <reference types="react/experimental" />

import {Suspense} from 'react';

function ThrowPromise() {
  throw Promise.resolve(1);
  return <div>foo</div>;
}

export function App() {
  return (
    <Suspense fallback={<div>Fallback</div>}>
      <ThrowPromise />
    </Suspense>
  );
}

```

「一番最初に到達した`Suspense`の`fallback`が表示される」ため、以下のコードでは`2`が表示される。

```plain text
export function App() {
  return (
    <Suspense fallback={<div>1</div>}>
      <Suspense fallback={<div>2</div>}>
        <ThrowPromise />
      </Suspense>
    </Suspense>
  );
}

```

スローされたものをキャッチしてフォールバックを表示する、という点で Error Boundary に近い機能だと言える。

だが Error Boundary と違い、`Suspense`は`Promise`以外のものがスローされた場合はキャッチしない。
 そしてもうひとつ大きな違いが、`Promise`の状態が変化すると、`Suspense`でラップされた要素のレンダリングを再び試みる、という点である。

以下のコードを実行すると、`1`秒間`Fallback`を表示したあと、`foo`が表示される。

```plain text
/// <reference types="react/experimental" />

import {Suspense} from 'react';

let flag = false;

function ThrowPromise() {
  if (!flag) {
    throw new Promise((resolve) => {
      setTimeout(() => {
        flag = true;
        resolve(null);
      }, 1000);
    });
  }
  return <div>foo</div>;
}

export function App() {
  return (
    <Suspense fallback={<div>Fallback</div>}>
      <ThrowPromise />
    </Suspense>
  );
}

```

`ThrowPromise`をレンダリングしようとすると、`flag`が`false`のため、`Promise`がスローされる。そしてそれをキャッチした`Suspense`がフォールバックを表示する。
 ここまでは、先程の例と同じ。
 異なるのは、`1`秒後に`Promise`の状態が変化すること。
 そして`Promise`の状態が変化したことで、改めて`ThrowPromise`をレンダリングしようとする。その際には`flag`の値が`true`になっているため`Promise`はスローされず、`div`要素が返される。

レンダリングのトリガーになるのは`Promise`の状態変化であり、`fulfilled`になるか`rejected`になるかは、関係ない。
 そのため、`ThrowPromise`を以下のように書き換えても、同じように動作する。

```plain text
function ThrowPromise() {
  if (!flag) {
    throw new Promise((_, reject) => {
      setTimeout(() => {
        flag = true;
        reject(new Error());
      }, 1000);
    });
  }
  return <div>foo</div>;
}

```

## Suspense とデータ取得を組み合わせる

ここまで説明した`Suspense`の仕組みを使って、ネットワークからのデータ取得を実装してみる。

まず、API サーバを用意する。

```plain text
const http = require('http');

function resJson(res, data, ms) {
  setTimeout(() => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.write(JSON.stringify(data));
    res.end();
  }, ms);
}

http
  .createServer((req, res) => {
    switch (true) {
      case /^\/1$/.test(req.url):
        resJson(res, {id: 1, name: 'Alice'}, 1000);
        break;
      case /^\/2$/.test(req.url):
        resJson(res, {id: 2, name: 'Bob'}, 1000);
        break;
      case /^\/3$/.test(req.url):
        resJson(res, {id: 3, name: 'Carol'}, 1000);
        break;
      case /^\/4$/.test(req.url):
        resJson(res, {id: 4, name: 'Dave'}, 1000);
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  })
  .listen(3000);

```

挙動が分かりやすくなるように、`1`秒経過してからレスポンスを返すようにしてある。

そして、この API サーバを叩いてデータを取得する関数が、以下の`fetchUser`。

```plain text
type Profile = {
  id: number;
  name: string;
};

export function fetchUser(id: number) {
  let status = 'pending';
  let result: Profile;
  let error: Error;

  const suspender = fetch(`http://localhost:3000/${id}`)
    .then((r) => {
      r.json().then((res) => {
        status = 'success';
        result = res;
      });
    })
    .catch((e) => {
      status = 'error';
      error = e;
    });
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw error;
      }
      return result;
    },
  };
}

```

重要な点は、`fetchUser`の返り値は`Promise`ではないということ。`{read() {...}}`というオブジェクトを返す。
 そして`read`メソッドがどのように動くのかは、呼び出したタイミングによって異なる。`fetch`が返した`Promise`の状態が変化する前に呼び出すと`status`が`pending`なので、`suspender`（`Promise`）をスローする。`Promise`が解決されたあとに呼び出すと`status`は`success`になっているので、`result`、つまり API からの返り値を返す。

`fetchUser`を利用する側のコードは以下の通り。`1`秒間`Loading...`を表示したあと、`1: Alice`を表示する。

```plain text
/// <reference types="react/experimental" />

import {Suspense, useState} from 'react';

import {fetchUser} from '../api';

function Profile({resource}: {resource: ReturnType<typeof fetchUser>}) {
  const profile = resource.read();
  return (
    <div>
      {profile.id}: {profile.name}
    </div>
  );
}

const initialResource = fetchUser(1);

export function App() {
  const [resource] = useState(initialResource);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile resource={resource} />
    </Suspense>
  );
}

```

以下のような処理の流れになる。

1. `fetchUser(1)`を実行し、データの取得を開始する
2. `fetchUser(1)`の返り値を`resource`にセットし、`Profile`コンポーネントに渡す
3. `Profile`コンポーネントは`resource.read()`を実行してデータを取得しようとするが、まだデータ取得中なので`Promise`がスローされる
4. スローされた`Promise`を`Suspense`がキャッチして、フォールバックを表示する
5. 約`1`秒後、スローされた`Promise`の状態が`fulfilled`に変化し、再度`Profile`コンポーネントをレンダリングしようとする
6. `Profile`コンポーネントが`resource.read()`を実行すると、先程とは違って API からの返り値を取得でき、`profile`変数に代入される
7. `profile.id`と`profile.name`を使ってレンダリングが行われ、`Promise`もスローされていないので、フォールバックではなく`Profile`が表示される

データ取得中からデータ取得済みへと状態が変わり、それに伴って表示内容も変わっている。
 だが`state`へのセットは一度しか行われていない。従来は状態の変化に合わせて開発者が`state`を更新し、状態に応じた表示の出し分けも開発者が書く必要があった。`if (!profile) return <div>Loading ...</div>`のように。
 それが不要になったのは、状態の遷移に応じた処理を React が行うようになったため。データ読み込み中は`fallback`を表示し、データ読み込みが完了したら`fallback`の表示を止めてデータに基づいたレンダリングを行ってくれる。

コンポーネント側はシンプルに書けるようになった反面、データ取得側は`Suspense`に対応した処理が必要になる。
 「データを取得できるまでは`Promise`をスローし、取得後はデータを返す」という仕組みが重要なので、素朴に`Promise`を返すだけでは、`Suspense`と連携できない。
 公式ドキュメントによると、Facebook では [Relay](https://relay.dev/docs/en/experimental/api-reference) を使って`Suspense`と連携させているとのこと。

## 並列的なレンダリングによるユーザ体験の向上

`useTransition`は、 Concurrent Mode で追加された Hooks のひとつ。
 これを使うことで、より柔軟に UI を設計できるようになる。

題材として、先程のコードを拡張し、ボタンを押下する度に次の ID のユーザが表示されるようにする。

まずは、`useTransition`を使わずに書く。

```plain text
/// <reference types="react/experimental" />

import {Suspense, useState} from 'react';

import {fetchUser} from '../api';

function Profile({
  nextId,
  resource,
  handleClick,
}: {
  nextId: number;
  resource: ReturnType<typeof fetchUser>;
  handleClick: () => void;
}) {
  const profile = resource.read();
  const onClick = handleClick;
  return (
    <>
      <button type="button" onClick={onClick}>
        Next
      </button>{' '}
      <i>Next ID: {nextId}</i>
      <div>
        {profile.id}: {profile.name}
      </div>
    </>
  );
}

const INITIAL_ID = 1;

const initialResource = fetchUser(INITIAL_ID);

export function App() {
  const [resource, setResource] = useState(initialResource);
  const [nextId, setNextId] = useState(INITIAL_ID + 1);

  const handleClick = () => {
    setNextId((id) => (id === 4 ? 1 : id + 1));
    setResource(fetchUser(nextId));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile nextId={nextId} resource={resource} handleClick={handleClick} />
    </Suspense>
  );
}

```

基本的な仕組みは先程と変わらない。
 ボタンを押下すると`state`が更新されるため、再レンダリングが発生する。だが`resource.read()`で`Promise`がスローされるため、フォールバックが表示される。`Promise`の状態が変わったら、つまり API からレスポンスが返ってきたら、改めてレンダリングを試みる。そうすると今度は`resource.read()`で API からのレスポンスを取得できるので、無事にレンダリングされる。

![[20201216194759.gif]]

次に、`useTransition`を使った形に書き換える。`useTransition`の返り値の最初の要素である、`startTransition`を使う。この`startTransition`には関数を渡すのだが、そのなかで`resource`の更新を行うようにする。

```plain text
/// <reference types="react/experimental" />

import {Suspense, useState, unstable_useTransition} from 'react';

import {fetchUser} from '../api';

function Profile({
  nextId,
  isPending,
  resource,
  handleClick,
}: {
  nextId: number;
  isPending: boolean;
  resource: ReturnType<typeof fetchUser>;
  handleClick: () => void;
}) {
  const profile = resource.read();
  const onClick = handleClick;
  return (
    <>
      <button type="button" onClick={onClick} disabled={isPending}>
        {isPending ? 'Loading...' : 'Next'}
      </button>{' '}
      <i>Next ID: {nextId}</i>
      <div>
        {profile.id}: {profile.name}
      </div>
    </>
  );
}

const INITIAL_ID = 1;

const initialResource = fetchUser(INITIAL_ID);

export function App() {
  const [resource, setResource] = useState(initialResource);
  const [nextId, setNextId] = useState(INITIAL_ID + 1);
  const [startTransition, isPending] = unstable_useTransition();

  const handleClick = () => {
    setNextId((id) => (id === 4 ? 1 : id + 1));

    // resource の更新を startTransition でラップした
    startTransition(() => {
      setResource(fetchUser(nextId));
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile
        nextId={nextId}
        isPending={isPending}
        resource={resource}
        handleClick={handleClick}
      />
    </Suspense>
  );
}

```

そうすると、先程とは挙動が変わる。

![[20201216194902.gif]]

具体的には、ボタンを押下してもフォールバックが表示されなくなった。

なぜこのような結果になるのか、ひとつずつ見ていく。

### useTransition の仕組み

原則として、`startTransition`を実行するとレンダリングが`2`回発生する（例外もあるので後述する）。`startTransition`のなかで状態を更新しているかどうかは、無関係。

そのため以下のコードの場合、ボタンを押す度にダイアログが`2`回表示される。

```plain text
function Child({count, handleClick}: {count: number; handleClick: () => void}) {
  useEffect(() => {
    alert(count);
  });

  return (
    <button type="button" onClick={handleClick}>
      child
    </button>
  );
}

export function App() {
  const [startTransition] = unstable_useTransition();

  const handleClick = () => {
    startTransition(() => {});
  };

  return <Child count={0} handleClick={handleClick} />;
}

```

![[20201216195034.gif]]

次にこのコードに状態管理を組み合わせる。

```plain text
function Child({
  foo,
  bar,
  handleClick,
}: {
  foo: number;
  bar: number;
  handleClick: () => void;
}) {
  useEffect(() => {
    alert(`foo: ${foo}, bar: ${bar}`);
  });

  return (
    <button type="button" onClick={handleClick}>
      child
    </button>
  );
}

export function App() {
  const [foo, setFoo] = useState(0);
  const [bar, setBar] = useState(0);
  const [startTransition] = unstable_useTransition();

  const handleClick = () => {
    setFoo((s) => s + 1);
    startTransition(() => {
      setBar((s) => s + 1);
    });
  };

  return <Child foo={foo} bar={bar} handleClick={handleClick} />;
}

```

イベントハンドラのなかで`foo`と`bar`をインクリメントするのだが、`foo`の更新は`startTransition`でラップせず、`bar`の更新はラップした。
 この状態でボタンを押下すると、どうなるか。

![[20201216195102.gif]]

最初のダイアログでは`foo`のインクリメントのみが反映されており、`2`回目のダイアログでようやく、`bar`のインクリメントが反映されている。
 つまり、`startTransition`を実行すると、ラップされていない状態更新が反映されたレンダリングを行い、その後、ラップされた状態更新も反映されたレンダリングを行う。

さらにここに、`useTransition`の返り値の 2 番目の要素である`isPending`も組み合わせてみる。

```plain text
function Child({
  foo,
  bar,
  isPending,
  handleClick,
}: {
  foo: number;
  bar: number;
  isPending: boolean;
  handleClick: () => void;
}) {
  useEffect(() => {
    alert(`foo: ${foo}, bar: ${bar}, isPending: ${isPending}`);
  });

  return (
    <button type="button" onClick={handleClick}>
      child
    </button>
  );
}

export function App() {
  const [foo, setFoo] = useState(0);
  const [bar, setBar] = useState(0);
  const [startTransition, isPending] = unstable_useTransition();

  const handleClick = () => {
    setFoo((s) => s + 1);
    startTransition(() => {
      setBar((s) => s + 1);
    });
  };

  return (
    <Child
      foo={foo}
      bar={bar}
      isPending={isPending}
      handleClick={handleClick}
    />
  );
}

```

![[20201216195143.gif]]

最初のダイアログでは`isPending`は`true`、`2`回目のダイアログでは`false`になっている。

ここまでの内容をまとめると、次のようになる。

- `startTransition`を実行するとレンダリングが発生する 
    - その際、`startTransition`でラップされている状態更新以外の更新が、反映される
    - `isPending`は`true`として、レンダリングされる
- 上記のレンダリングが終わると、再びレンダリングが行われる 
    - 今度は、`startTransition`でラップされている状態更新も反映される
    - `isPending`は`false`として、レンダリングされる

そして最後に、`useTransition`の最大の特徴について説明する。
 それは、`2`回目のレンダリング時に`Promise`がスローされると、`Suspense`がそれをキャッチするのではなく、`1`回目のレンダリングが表示され続け、`Promise`の状態が変化した時点で改めてレンダリングを試みる、というものである。

以下のコードでそれを確認できる。

```plain text
function countUp(arg: number) {
  let status = 'pending';

  const suspender = new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  }).then(() => {
    status = 'success';
  });
  return {
    get() {
      if (status === 'pending') {
        throw suspender;
      }
      return arg + 1;
    },
  };
}

function Child({
  foo,
  bar,
  isPending,
  handleClick,
}: {
  foo: number;
  bar: {get(): number};
  isPending: boolean;
  handleClick: () => void;
}) {
  const barValue = bar.get();

  useEffect(() => {
    alert(`foo: ${foo}, bar: ${barValue}, isPending: ${isPending}`);
  });

  return (
    <button type="button" onClick={handleClick}>
      child
    </button>
  );
}

const initialBar = countUp(-1);

export function App() {
  const [foo, setFoo] = useState(0);
  const [bar, setBar] = useState(initialBar);
  const [startTransition, isPending] = unstable_useTransition();

  const handleClick = () => {
    setFoo((s) => s + 1);
    startTransition(() => {
      setBar(countUp(foo));
    });
  };

  return (
    <Suspense fallback={<div>Fallback</div>}>
      <Child
        foo={foo}
        bar={bar}
        isPending={isPending}
        handleClick={handleClick}
      />
    </Suspense>
  );
}

```

![[20201216195302.gif]]

ボタンを押下するとまず、`foo`が更新された状態でレンダリングされる。これは先程までと同じ。
 次に`bar`が更新された状態でレンダリングを試みるのだが、そうすると、`const barValue = bar.get();`の部分で`Promise`がスローされる。
 すると、`Suspense`がキャッチしてフォールバックを表示する、のではなく、`1`回目のレンダリングが表示され続ける。つまり、`foo`のみが更新された状態のレンダリングが、そのまま表示され続ける。
 そして`Promise`の状態が変化したとき（この例だと`3`秒後）に、`bar`が更新された状態でのレンダリングを改めて試みる。今度は`bar.get()`が`Promise`をスローしないので、問題なくレンダリングされる。

注意しなければならないのは、`2`回目のレンダリングではなく`1`回目のレンダリングで`Promise`がスローされた場合、また異なった挙動になるということである。

`1`回目のレンダリングで`Promise`がスローされると、それは`Suspense`にキャッチされ、フォールバックが表示される。
 そして`Promise`の状態が変化した際に改めてレンダリングが行われるのだが、その際には`startTransition`でラップされた状態更新も反映した形で、レンダリングされる。`isPending`も`false`になる。

`handleClick`を以下のように書き換えることで、確認できる。

```plain text
  const handleClick = () => {
    setBar(countUp(foo));
    startTransition(() => {
      setFoo((s) => s + 1);
    });
  };

```

![[20201216195347.gif]]

ここまで説明してきた内容を踏まえて、改めてデータ取得の例を見てみる。

ボタンを押下すると、以下のコードが実行される。

```plain text
  const handleClick = () => {
    setNextId((id) => (id === 4 ? 1 : id + 1));
    startTransition(() => {
      setResource(fetchUser(nextId));
    });
  };

```

`setNextId`は`startTransition`でラップされていない。そのため、`Next ID`の変更はすぐに画面に反映される。
 その後、`setResource`による更新を反映させてレンダリングを行おうとするが、`Profile`コンポーネントが`Promise`をスローする。そのため、先程のレンダリング結果（`Next ID`が更新された画面）をそのまま表示し続ける。そして`Promise`の状態が変化すると改めてレンダリングが行われ、新しいユーザの情報が画面に表示される。
 また、`Promise`の状態変化を待っている間は`isPending`は`true`であるため、その間だけボタンの文字列は`Loading....`になる。

`useTransition`によって実現されたこの挙動は、「レンダリングが並列的に行われている」と捉えることができる。`resource`が更新されたバージョンの`Profile`を準備しつつ、`nextId`は更新されたが`resource`が更新されていないバージョンの`Profile`を表示している。2 つの`Profile`が存在している。
 この仕組みを上手く使うことで、不完全な状態の画面が表示されてしまうのを回避したり、逆に少しでも速くユーザの操作に対するフィードバックを返したり、といったことが可能になる。

## useDeferredValue を使ったレスポンシブ性の向上

`useTransition`の他に`useDeferredValue`という Hooks が追加されており、こちらを使うことでも、状態の更新を遅延させることができる。
 優先度が低い上に処理に時間がかかる更新を後回しにして、優先度が高い更新をできるだけ早く行って表示に反映させる。そうすることで、アプリのレスポンス性を高めることが企図されている。

`state`を`useDeferredValue`に渡すと、`deferredValue`を得られる。
 そして`useDeferredValue`が存在する状態で`state`を更新すると、まず、`state`だけを更新した状態でレンダリングを行う。その後、`deferredValue`の値を更新後の`state`と同じにした上で、またレンダリングを行う。

例を示す。

```plain text
/// <reference types="react/experimental" />

import {Fragment, useState, unstable_useDeferredValue} from 'react';

export function App() {
  const [state, setState] = useState(1);
  const deferredValue = unstable_useDeferredValue(state);

  const countUp = () => {
    setState((s) => s + 1);
  };

  useEffect(() => {
    alert(`state: ${state}, deferredValue: ${deferredValue}`);
  });

  return (
    <>
      <button type="button" onClick={countUp}>
        count up
      </button>
      <div>state: {state}</div>
      <div>deferredValue: {deferredValue}</div>
    </>
  );
}

```

![[20201216195604.gif]]

まず`state:2, deferredValue:1`でレンダリングを行い、その直後に`state:2, deferredValue:2`でレンダリングを行っている。

上記の例では`useEffect`でダイアログを出していたので、レンダリングが`2`回行われたことを確認できた。
 だが`useEffect`を削除してしまうと、`state`と`deferredValue`がほぼ同時に更新されるため、違いを知覚できない。

![[20201216195639.gif]]

レンダリングのための処理が重く、`state`が頻繁に更新されると画面の更新が遅れてしまうような状況で、`useDeferredValue`は力を発揮する。
 そのような状況では、処理が落ち着くまで`useDeferredValue`の更新が遅延される。そのため、表示の更新が遅れても問題ないコンポーネントには`deferredValue`を渡してレンダリングを抑制し、優先的に表示を更新したいコンポーネントにのみ`state`を渡すことで、更新を遅れを減少させることができる。

優先的に表示すべき情報の典型例として、ユーザの操作に対するフィードバックがある。
 例えば、テキストボックスに文字列を入力したら、その内容が即座に表示されることが求められる。

以下のテキストボックスは、文字列を入力しても反映までに時間が掛かってしまう。

```plain text
/// <reference types="react/experimental" />

import {memo, useState} from 'react';

const ExpensiveComponent = memo(({text}: {text: string}) => {
  // わざと処理に時間がかかるようにしている
  const startTime = performance.now();
  while (performance.now() - startTime < 120);

  if (text === '') {
    return (
      <div>
        <i>Please input.</i>
      </div>
    );
  }

  return (
    <div>
      Text is <b>{text}</b>.
    </div>
  );
});

export function App() {
  const [text, setText] = useState('foo');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <>
      <input value={text} onChange={handleChange} />
      <ExpensiveComponent text={text} />
    </>
  );
}

```

![[20201216195802.gif]]

`ExpensiveComponent`の処理に時間がかかってしまっているのが原因。`ExpensiveComponent`の処理が終わる前に次々と`text`の更新が発生するため、表示の更新が追いつかない。ユーザによる入力が一段落して、ようやく表示が更新される。

このように、テキストボックスへの反映が遅れてしまうと、目に見えて操作性が悪くなる。
 このとき、`ExpensiveComponent`の更新だけを遅延させることが許容されるなら、`useDeferredValue`を使うことで操作性を改善できる。
 具体的には、以下のように`text`ではなく`deferredText`を`ExpensiveComponent`に渡すようにすればよい。

```plain text
import {memo, useState, unstable_useDeferredValue} from 'react';

// 中略

export function App() {
  const [text, setText] = useState('foo');
  const deferredText = unstable_useDeferredValue(text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <>
      <input value={text} onChange={handleChange} />
      <ExpensiveComponent text={deferredText} />
    </>
  );
}

```

そうすると、`ExpensiveComponent`の更新にある程度の遅れが発生する代わりに、テキストボックスの更新は迅速に行われるようになる。

![[20201216195835.gif]]

先程と同じように`text`は次々と更新されていくが、`deferredText`は更新されず、`text`だけが更新された状態でレンダリングが行われていく。
 そのため、ユーザのタイピングに合わせて`input.value`には最新の`text`が次々と渡されるが、`ExpensiveComponent.text`には常に同じ値（`'foo'`）が渡される。
 そして`ExpensiveComponent`は`memo`でラップされているため、`props`が変わらない限りは再レンダリングされない。
 そのため、`ExpensiveComponent`による重い処理の影響を受けることなくテキストボックスが更新されていき、`text`の更新が一段落した段階で`deferredText`が更新され、ようやく`ExpensiveComponent`の再レンダリングが行われる。

今回のようなケースの他に、`Promise`がスローされてレンダリングが中断された際にも、`deferredValue`の更新が遅延される。

復習を兼ねてまず、`useDeferredValue`を使わないパターンの挙動について見てみる。

```plain text
/// <reference types="react/experimental" />

import {Suspense, useState, useEffect} from 'react';

function countUp(arg: number) {
  let status = 'pending';

  const suspender = new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 2000);
  }).then(() => {
    status = 'success';
  });
  return {
    get() {
      if (status === 'pending') {
        throw suspender;
      }
      return arg + 1;
    },
  };
}

function Child({resource}: {resource: {get(): number}}) {
  const value = resource.get();

  useEffect(() => {
    alert(value);
  });

  return <span>{value}</span>;
}

const initialBar = countUp(-1);

export function App() {
  const [foo, setFoo] = useState(0);
  const [bar, setBar] = useState(initialBar);

  const handleClick = () => {
    setFoo((s) => s + 1);
    setBar(countUp(foo));
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        count up
      </button>
      <Suspense fallback={<div>Fallback</div>}>
        <div>
          bar: <Child resource={bar} />
        </div>
      </Suspense>
    </>
  );
}

```

上記のコードの場合、`count up`ボタンを押下すると`Promise`がスローされ、レンダリングが中断される。`Promise`の状態が変化すると改めてレンダリングが試みられ、今度は`resource.get()`が`Promise`をスローしないのでレンダリングに成功する。
 そして`useEffect`が実行され、ダイアログが表示される。

![[20201216195946.gif]]

これを書き換えて、`Child`コンポーネントに`bar`ではなく`deferredBar`を渡すようにする。

```plain text
import {Suspense, useState, useEffect, unstable_useDeferredValue} from 'react';

// 中略

export function App() {
  const [foo, setFoo] = useState(0);
  const [bar, setBar] = useState(initialBar);
  const deferredBar = unstable_useDeferredValue(bar);

  const handleClick = () => {
    setFoo((s) => s + 1);
    setBar(countUp(foo));
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        count up
      </button>
      <Suspense fallback={<div>Fallback</div>}>
        <div>
          bar: <Child resource={deferredBar} />
        </div>
      </Suspense>
    </>
  );
}

```

そうすると挙動が変わり、フォールバックが表示されなくなる。
 そして、ボタンを押下する度にダイアログが`2`回表示されるようになっている。

![[20201216200025.gif]]

`Promise`がスローされると`deferredBar`の更新が遅延されるため、このような挙動になる。
 ボタンを押下しても`deferredBar`を更新せず、前回のレンダリング時と同じ値で、レンダリングを行う。
 当然、`resource.get()`は前回と同じ値を返すため、レンダリングの結果は前回と変わらない。
 そして、`Promise`の状態が変化すると`deferredBar`が更新される。そうすると`Child`も再レンダリングされるが、今度は`resource.get()`が新しい値を返すため、それを使ったレンダリングが行われる。
 そのため、`1`回目のダイアログでは前回と同じ値が使われ、`2`回目のダイアログでは値が更新されているのである。