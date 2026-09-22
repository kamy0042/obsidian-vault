---
Updated: 2021-11-06T23:14:00
URL: https://numb86-tech.hatenablog.com/entry/2020/03/24/114624
Created: 2021-06-07T22:33:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
コンポーネントの再レンダリングを適切に抑制していくことが、React アプリのパフォーマンス改善の基本。

コンポーネントの再レンダリングが発生する要因はいくつかあるが、「親の再レンダリングによって発生する子の再レンダリング」については、以下の記事にまとめてある。

![[https3A2F2Fcdn-ak.f.st-hatena.com2Fimages2Ffotolife2Fn2Fnumb_862F201912202F20191220213937.gif]]

この記事では「状態の更新」によって発生する再レンダリングについて見ていく。
 また、この記事で「コンポーネント」という言葉を使う場合、特に断りがない限り関数コンポーネントを指す。

動作確認に使用したライブラリのバージョンは以下の通り。

- react@16.13.1
- redux@4.0.5
- react-redux@7.2.0

## 基本的な考え方

再レンダリングが行われるということは、そのコンポーネントを再び実行するということ。そのため、再レンダリングが行われれば行われるほど、処理は重くなっていく。
 コンポーネントのなかで明示的に記述している処理の他、差分検出処理など React が内部的に行っている処理も行われる。

そのため、不要な再レンダリングをスキップすることで、パフォーマンスの改善が見込める。

しかし、闇雲に再レンダリングの数を減らせばよい、という話でもない。
 その再レンダリングが「不要」であるかどうかを判定するための処理にも、当然コストはかかる。
 そのコストが再レンダリングによって発生するコストを上回っていた場合、パフォーマンスはむしろ悪化する。

この記事は「こうすれば確実にパフォーマンスが向上する」「このコードをコピペして流用すればよい」といった「チートシート」ではない。
 どのようなときに再レンダリングが発生するのか、そしてどのようなときに発生しないのかを理解し、パフォーマンスを意識したコードを書けるようになることを目的としている。

## useState と useReducer

「状態」を扱う組み込みのフックとして`useState`と`useReducer`がある。
 これらを使うことで「状態」を扱えるが、その「状態」を更新すると、再レンダリングが行われる。その「状態」を実際に表示に使っているかどうかは関係ない。

以下のコンポーネントではボタンを押下する度に`state`が更新され、その度にログに`ReRender`と表示される。

```plain text
import React, {useState, useEffect} from 'react';

let isReRender = false;

export const App = () => {
  const [state, setState] = useState(0); // このコンポーネントでは`state`は使用していない

  const onClick = () => {
    setState(s => s + 1);
  };

  useEffect(() => {
    if (isReRender) {
      console.log('ReRender');
    }
    if (!isReRender) {
      isReRender = true;
    }
  });

  return (
    <>
      <button type="button" onClick={onClick}>
        count up
      </button>
    </>
  );
};

```

### バッチ処理

一回のイベントのなかで`state`の更新を複数回行った場合、それらはまとめて「バッチ処理」される。
 そのため、更新を何度行っても、再レンダリングは一度しか行われない。

先程のコードの`onClick`を以下のように書き換えると、一回のクリック毎に`state`は`3`増えるが、再レンダリングはクリック毎に一回しか行われない。`state`を`1`増やす度に再レンダリングするのではなく、`3`増やしてから一度だけ再レンダリングを行う。

```plain text
  const onClick = () => {
    setState(s => s + 1);
    setState(s => s + 1);
    setState(s => s + 1);
  };

```

以下のように、異なる種類の`state`を更新した場合も、再レンダリングは一回だけ行われる。

```plain text
  const [stateA, setStateA] = useState(0);
  const [stateB, setStateB] = useState(0);

  const onClick = () => {
    setStateA(s => s + 1);
    setStateB(s => s + 1);
  };

```

`useState`による更新と`useReducer`による更新を行った場合も同様。全ての更新を行ったうえで一度だけ、再レンダリングされる。

```plain text
  const onClick = () => {
    setState(s => s + 1);
    dispatch({type: 'INCREMENT'});
  };

```

### 非同期処理

`state`を更新する同期処理と非同期処理を混在させた場合、まず同期処理を「バッチ処理」して再レンダリングしたあと、非同期処理による`state`更新の際にも改めて再レンダリングが行われる。

以下のケースだと、`state`を`2`増やしてから再レンダリングを行い、その後非同期処理が`state`をさらに`1`増やした状態で、もう一度再レンダリングを行う。

```plain text
  const onClick = () => {
    Promise.resolve().then(() => {
      setState(s => s + 1);
    });
    setState(s => s + 1);
    setState(s => s + 1);
  };

```

非同期処理のなかで`state`の更新を複数回行うと、その度に再レンダリングされる。
 以下のケースだと、`state`を`3`増やしてから再レンダリング、ではなく、`state`が`1`増える毎に再レンダリングされる。つまり、再レンダリングは`3`回行われる。

```plain text
  const onClick = () => {
    Promise.resolve().then(() => {
      setState(s => s + 1);
      setState(s => s + 1);
      setState(s => s + 1);
    });
  };

```

### state が更新されないケース

`state`が「更新」されなければ、再レンダリングは行われない。

以下のケースでは、`state`の初期値は`0`であり、ボタンを押下すると`state`に`1`がセットされる。
 そのため、最初にボタンを押下したときは再レンダリングが発生するが、それ以降は何度押下しても`state`は`1`のままなので、再レンダリングは発生しない。

```plain text
  const [state, setState] = useState(0);

  const onClick = () => {
    setState(1);
  };

```

「更新」が行われたかどうかの判定には、`SameValue`アルゴリズムを使っている。`===`による比較とほぼ同じだが、若干の差異もある。`SameValue`アルゴリズムについては、以下の記事に書いた。

今回は再現できなかったが[公式ドキュメント](https://ja.reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update)によると、更新が発生していなくても再レンダリングが行われる可能性もあるとのこと。
 しかしその場合も、子コンポーネントの再レンダリングや`useEffect`の実行は回避される。

### まとめ

ここまでの内容をまとめる。サンプルコードでは`useState`を使ってきたが、`useReducer`でも同じ挙動になる。

- 状態が更新されたときにのみ、再レンダリングが発生する
- 更新が発生したかどうかの判定には`SameValue`アルゴリズムを使う
- 同期処理のなかで複数の更新を行った場合は「バッチ処理」され、それが終わってから再レンダリングが行われる
- 非同期処理のなかでの更新については「バッチ処理」されず、更新が行われる度に再レンダリングされる

## React Redux

ある程度以上に規模が大きい React アプリでは、状態管理に Redux を使うことが多い。
 そして React と Redux を結びつけるために使われるライブラリが、React Redux である。

「状態を扱う」のは`useState`や`useReducer`と同じだが、React Redux では基本的な仕組みや考え方が異なる。

状態の「取得」と「更新」が分離されている、というのが最大の違い。`useState`や`useReducer`とは異なり、状態はコンポーネントの外側にある。状態の管理は Redux の管轄であり、React は関知しない。
 そのため、コンポーネントのクリックイベントなどをトリガーにして状態の更新を行っても、それだけではコンポーネント自体は影響を受けない。「状態の更新」は、コンポーネントの外側での出来事だからだ。
 コンポーネントのなかで状態を使うためには、状態の更新とは別に、Redux から状態を取得するための手続きが必要になる。

状態の取得と更新を、分けて考える必要がある。
 メソッドも、取得と更新、それぞれに専用のものが用意されている。`useSelector`と`useDispatch`である。

まずは、状態の更新を行う`useDispatch`について見ていく。

以下では、まず Store を用意している。`state`の構造は`{a: number, b: number}`。
 そしてそれを`App`コンポーネントで利用できるようにしており、`state.a`と`state.b`を個別に増やすためのボタンを用意した。

```plain text
import React, {useEffect} from 'react';
import {createStore} from 'redux';
import {Provider, useDispatch} from 'react-redux';

const INCREMENT_A = 'INCREMENT_A';
const INCREMENT_B = 'INCREMENT_B';

const initialState = {
  a: 0,
  b: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_A:
      return {
        a: state.a + 1,
        b: state.b,
      };
    case INCREMENT_B:
      return {
        a: state.a,
        b: state.b + 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export const Container = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

let isReRender = false;

const App = () => {
  const dispatch = useDispatch();

  const countUpA = () => {
    dispatch({type: INCREMENT_A});
  };

  const countUpB = () => {
    dispatch({type: INCREMENT_B});
  };

  useEffect(() => {
    if (isReRender) {
      console.log('ReRender');
    }
    if (!isReRender) {
      isReRender = true;
    }
  });

  return (
    <>
      <button type="button" onClick={countUpA}>
        count up a
      </button>{' '}
      <button type="button" onClick={countUpB}>
        count up b
      </button>
    </>
  );
};

```

どちらのボタンを押しても、再レンダリングは行われない。
 もちろん`state`は正しく更新されているが、それは`App`コンポーネントの外側の出来事に過ぎない。だから、いくら`state`が更新されようとも、再レンダリングは行われない。再レンダリングが必要ない、とも言える。

再レンダリングが行われるのは、`state`が更新され、そしてその`state`をコンポーネントが取得しているとき。コンポーネントの内部に`state`があるのだから、`state`が更新されたら当然、再レンダリングを行う必要がある。

`state`の取得には、`useSelector`を使う。

先程の例を以下のように書き換える。

```plain text
@@ -1,6 +1,6 @@
 import React, {useEffect} from 'react';
 import {createStore} from 'redux';
-import {Provider, useDispatch} from 'react-redux';
+import {Provider, useSelector, useDispatch} from 'react-redux';

 const INCREMENT_A = 'INCREMENT_A';
 const INCREMENT_B = 'INCREMENT_B';
@@ -50,9 +50,11 @@
     dispatch({type: INCREMENT_B});
   };

+  const state = useSelector(s => s);
+
   useEffect(() => {
     if (isReRender) {
-      console.log('ReRender');
+      console.log('ReRender', state);
     }
     if (!isReRender) {

```

こうすると、ボタンを押下する度に`state`が更新され、かつ、再レンダリングも行われているのが分かる。

### バッチ処理と非同期処理

「バッチ処理」や非同期処理における挙動は、`useState`や`useReducer`と同じ。

`count up both`というボタンを用意し、そのクリックイベントのなかで複数回の状態の更新を行っているが、再レンダリングが行われるのは一度のみ。`state.a`と`state.b`をそれぞれ`2`ずつ増やしたうえで、再レンダリングが行われる。

```plain text
@@ -50,6 +50,13 @@
     dispatch({type: INCREMENT_B});
   };

+  const countUpBoth = () => {
+    dispatch({type: INCREMENT_A});
+    dispatch({type: INCREMENT_A});
+    dispatch({type: INCREMENT_B});
+    dispatch({type: INCREMENT_B});
+  };
+
   const state = useSelector(s => s);

   useEffect(() => {
@@ -68,6 +75,9 @@
       </button>{' '}
       <button type="button" onClick={countUpB}>
         count up b
+      </button>{' '}
+      <button type="button" onClick={countUpBoth}>
+        count up both
       </button>
     </>
   );

```

そして以下のようにコードを書き換えると、ボタンを押下する度に再レンダリングが三回行われる。

1. `state.b`を`2`増やして再レンダリング
2. `state.a`を`1`増やして再レンダリング
3. `state.a`を`1`増やして再レンダリング

```plain text
  const countUpBoth = () => {
    Promise.resolve().then(() => {
      dispatch({type: INCREMENT_A});
      dispatch({type: INCREMENT_A});
    });
    dispatch({type: INCREMENT_B});
    dispatch({type: INCREMENT_B});
  };

```

### useState や useReducer と組み合わせる

`useState`や`useReducer`による更新と`dispatch`による更新を、一度のイベントのなかで同期的に行った場合、再レンダリングは一度だけ行われる。

```plain text
  const countUpBoth = () => {
    // 以下の全ての更新を終えた上で、再レンダリングが行われる
    dispatch({type: INCREMENT_A});
    dispatch({type: INCREMENT_B});
    setState(s => s + 1);
  };

```

### useSelector の比較ロジック

`useState`や`useReducer`と同じように、状態の「更新」が発生した場合にのみ、再レンダリングが発生する。

だが`useState`や`useReducer`とは異なる点も多いので、注意が必要。

まず、更新が発生したかどうかの判定には、`SameValue`ではなく`===`を使う。

そして、更新が発生したかどうかチェックする対象は「セレクタの返り値」であり、それは必ずしも`state`とは限らない。
 ここでいうセレクタとは、`useSelector`の第一引数として渡す関数のこと。
 以下の場合は`s => s`がセレクタ。

```plain text
const state = useSelector(s => s);

```

このケースだとセレクタが`state`を返しているので、`state`がチェックの対象になる。
 だがこれを以下のように書き換えると、`state.b`が対象になる。

```plain text
const b = useSelector(s => s.b);

```

この場合、`state.b`が更新されたときにのみ、再レンダリングが行われる。
 そのため、`count up a`ボタンを押下して`state.a`をインクリメントしても、`state.b`に変化はないため、再レンダリングは行われない。

### equalityFn

`useSelector`は比較のためのアルゴリズムとして`===`を使うが、自分でカスタマイズして独自のアルゴリズムを使うこともできる。
 比較を行う関数を`useSelector`の第二引数に渡すことで、それが可能になる。この関数は`equalityFn`と呼ばれる。
 つまり、以下の形になる。

```plain text
useSelector(selector, equalityFn);

```

`equalityFn`については公式ドキュメントでもほとんど触れられておらず、「ドキュメントを書こう」という Issue も立っているのだが、今日現在ではまだドキュメントは作成されていない。

ここまで紹介してきた機能に比べると`equalityFn`の挙動はかなり複雑なので、大まかな処理の流れについて順を追って説明する。

例として、以下のような`useSelector`を用意した。`state.b`の初期値は`0`で、ボタンを押下する度に`state.b`が`1`ずつインクリメントされるとする。

```plain text
const selector = s => s.b;
const equalityFn = (value, memoizedValue) => value === memoizedValue;
const b = useSelector(selector, equalityFn);

```

### 1. コンポーネントがマウントされ、useSelector が実行される

`useSelector`が実行されるとまず、`selector`が実行される。`state.b`の初期値は`0`なので、`selector`は`0`を返す。

### 2. equalityFn が実行される

`selector`が実行されたあと、`equalityFn`が実行される。`equalityFn`は、`selector`の返り値が更新されたかどうかを判定するための関数。更新がない、つまり前回のレンダリング時と同じ値であると見做した場合は`truthy`を、更新があった、つまり前回のレンダリング時とは異なる値であると見做した場合は`falsy`を、返すことになっている。

`equalityFn`は、引数として 2 つの値を受け取る。
 第一引数（今回の例では`value`と命名した）には、`selector`の返り値が入る。つまり今回のケースだと、`0`。
 第二引数（今回の例では`memoizedValue`と命名した）には、`useSelector`の初回実行時のみ、`selector`の返り値が入る。
 つまり、`useSelector`の初回実行時においては、`value`も`memoizedValue`も同じ値（今回のケースでは`0`）になる。

`equalityFn`が`truthy`を返すか`falsy`を返すかで、以降の処理が変わる。

`truthy`を返す場合。
 前回のレンダリング時から`s.b`の値は更新されていないと判断され、再レンダリングは行われない。
 そして、今回の`memoizedValue`の値がそのまま、次回の`equalityFn`実行時の`memoizedValue`に使われる。

`falsy`を返す場合。
 前回のレンダリング時から`s.b`の値が更新されていると判断され、再レンダリングが行われる。
 そして、次回の`equalityFn`実行時には、今回の`value`の値（つまり`selector`の返り値）が、`memoizedValue`に使われる。

今回は例では`equalityFn`の返り値を`value === memoizedValue`と定義しており、どちらも`0`なので、`true`を返す。
 そのため、再レンダリングは行われない。そして次に`equalityFn`が実行される際は、`memoizedValue`には`0`が入る。

再レンダリングが行われないため、ここで処理は終わる。

### 3. ボタンの押下をトリガーにして dispatch が実行され、state.b がインクリメントされる

このあと詳述するが、`dispatch`が行われると、`useSelector`が実行される。

先程と同じように、まず`selector`が実行される。`state.b`はインクリメントされて`1`になっているため、`selector`の返り値も`1`になる。

次に、`equalityFn`が実行される。`value`には、`selector`の返り値である`1`が入る。`memoizedValue`には、先程説明したように`0`が入る。
 そうすると`value === memoizedValue`は`false`になるため、`equalityFn`は`false`を返す。

`equalityFn`が`falsy`を返したため、再レンダリングが発生する。そして次回の`equalityFn`の実行時には、今回の`value`の値である`1`が、`memoizedValue`に入る。

この処理はボタンが押下される度に繰り返し行われる。

### state.b が偶数に更新された時にのみ再レンダリングを行うサンプル

先程の例では`state.b`が更新される度に再レンダリングが行われるため、デフォルトの挙動と変わらない。
 理解を深めるため、`state.b`が偶数に更新された時にのみ再レンダリングが行われるようにしてみる。

`App`コンポーネントを以下のように書き換える。

```plain text
const App = () => {
  const dispatch = useDispatch();

  const countUpB = () => {
    dispatch({type: INCREMENT_B});
  };

  const selector = s => s.b;
  const equalityFn = (value, memoizedValue) => {
    if (value !== memoizedValue && value % 2 === 0) {
      return false;
    }
    return true;
  };
  const b = useSelector(selector, equalityFn);

  return (
    <>
      <div>{b}</div>
      <button type="button" onClick={countUpB}>
        count up b
      </button>
    </>
  );
};

```

これで、「`state.b`が偶数に更新された場合」にのみ再レンダリングが行われるようになる。

`equalityFn`はまず、第一引数である`value`がメモ化された値と同じかどうかチェックする。
 同じだった場合は再レンダリングが行われないため、変数`b`の値は更新されず、ボタンを押下する前の値がそのまま表示され続ける。`value`が奇数だった場合も同様に、再レンダリングは行われない。`value`が更新されており、かつ偶数だった場合にのみ、`equalityFn`が`false`を返す。そうすると再レンダリングが行われるため、表示内容も更新される。

### shallowEqual

React Redux は`shallowEqual`という関数を用意しており、それを`equalityFn`として使うこともできる。

```plain text
import {Provider, useSelector, useDispatch, shallowEqual} from 'react-redux';
// 中略
const state = useSelector(s => s, shallowEqual);

```

この関数は、渡されたオブジェクトの1階層目をチェックしていく。プリミティブな値を渡された場合は、その値そのものをチェックする。

例えば`state`が以下の構造のとき、`equalityFn`を何も渡さなかった場合は、`state`そのものを`===`でチェックする。そのため、参照が変わってしまえば、`a`も`b`もそれぞれ更新がなかったとしても、再レンダリングされてしまう。
 だが`shallowEqual`を渡せば、`a`と`b`をそれぞれ`===`でチェックする。そのため、`state`そのものの参照が変わったとしても、その中身の値が変わっていなければ、再レンダリングは行われない。

```plain text
state = {a: number, b: number}

```

### selector や equalityFn はいつ実行されるのか

`dispatch`による状態の更新は「バッチ処理」されると書いたが、`selector`や`equalityFn`は、`dispatch`の度に都度実行される。
 一回にまとめられるは再レンダリングであって、`selector`や`equalityFn`はそうではない。

以下のコードを使って、いつ`selector`や`equalityFn`が実行されるのか検証してみる。

```plain text
  const selector = s => console.log(s) || s;
  const equalityFn = (a, b) => console.log('equalityFn') || a === b;
  const state = useSelector(selector, equalityFn);

  useEffect(() => {
    if (isReRender) {
      console.log('ReRender', state);
    }
    if (!isReRender) {
      isReRender = true;
    }
  });

```

まずは、マウント時。つまり初回のレンダリング時。
 以下のログが流れる。

```plain text
{a: 0, b: 0}
{a: 0, b: 0}
equalityFn
```

つまり、`selector`は 2 回、`equalityFn`は 1 回、実行されている。

次に、クリックイベントで`dispatch({type: INCREMENT_A})`を発生させ、`state.a`をインクリメントする。
 すると、以下のログが流れる。

```plain text
{a: 1, b: 0}
equalityFn
{a: 1, b: 0}
ReRender {a: 1, b: 0}

```

`selector-> equalityFn -> selector -> 再レンダリング`という順番で実行されていることになる。

今度は、一度リロードして`state`を初期化したうえで、以下の処理を実行する。

```plain text
dispatch({type: INCREMENT_A});
dispatch({type: INCREMENT_A});
dispatch({type: INCREMENT_B});
dispatch({type: INCREMENT_B});

```

その際のログは以下の通り。

```plain text
{a: 1, b: 0}
equalityFn
{a: 2, b: 0}
equalityFn
{a: 2, b: 1}
equalityFn
{a: 2, b: 2}
equalityFn
{a: 2, b: 2}
ReRender {a: 2, b: 2}

```

最後に、`equalityFn`を以下のように書き換えてみる。

```plain text
const equalityFn = (a, b) => console.log('equalityFn') || true;

```

`equalityFn`が常に`true`を返すため、再レンダリングは行われない。
 この状態でまた、`INCREMENT_A`と`INCREMENT_B`を 2 回ずつ`dispatch`してみる。
 そうすると、ログの内容が変化する。

```plain text
{a: 1, b: 0}
equalityFn
{a: 2, b: 0}
equalityFn
{a: 2, b: 1}
equalityFn
{a: 2, b: 2}
equalityFn

```

ここから、初回レンダリング時は別として、それ以降に`dispatch`が行われた際は以下のように処理されることが分かる。

- `dispatch`が行われる毎に、`selector`と`equalityFn`が実行される
- そして「再レンダリングする必要あり」と判断された場合は、最後にもう一度`selector`を実行した上で、再レンダリングが行われる

気を付けなければならないのは、一連の`equalityFn`の実行のなかで、どれかひとつでも`falsy`を返せば再レンダリングが実行されるということ。
 そして、再レンダリングされる際には改めて`selector`が実行されるため、最新の値がコンポーネントに反映されるということ。

これらを理解していないと、意図せぬ挙動によってバグを作り出してしまう恐れがある。

以下は、先程作った「`state.b`が偶数に更新されたときにのみ再レンダリングされるコンポーネント」である。
 ボタンを押すと`dispatch`が 3 回行われることだけが、先程とは異なる。
 初期状態では`0`が画面に表示されているが、ボタンを押下すると何が表示されるだろうか。

```plain text
const App = () => {
  const dispatch = useDispatch();

  // dispatch を 3 回行っている
  const countUpB = () => {
    dispatch({type: INCREMENT_B});
    dispatch({type: INCREMENT_B});
    dispatch({type: INCREMENT_B});
  };

  const selector = s => s.b;
  const equalityFn = (value, memoizedValue) => {
    if (value !== memoizedValue && value % 2 === 0) {
      return false;
    }
    return true;
  };
  const b = useSelector(selector, equalityFn);

  return (
    <>
      <div>{b}</div>
      <button type="button" onClick={countUpB}>
        count up b
      </button>
    </>
  );
};

```

正解は、`2`ではなく`3`である。`3`は偶数ではないので再レンダリングが行われないように思えるが、そうはならない。

既に説明したように、`equalityFn`は`dispatch`が実行される度に実行されていく。
 そして、そのなかでひとつでも`falsy`を返せば、再レンダリングが行われる。
 このケースだと、3 回実行される`equalityFn`のうち、2 回目が`false`を返すので、再レンダリングが行われる。

再レンダリングが行われる場合、状態の更新が全て終わったあとに改めて`selector`が実行されるため、`state.b`の最新の値を返す。`dispatch({type: INCREMENT_B})`が 3 回行われているため、`state.b`の最新の値は`3`。
 そのため、変数`b`に`3`が渡された状態で、再レンダリングされるのである。

### 複数の useSelector を使うケース

ここまでの例では、ひとつのコンポーネントのなかで`useSelector`をひとつだけ使っていた。
 最後に、複数の`useSelector`を使うケースについて見ていく。

まず、`useSelector`を複数使うことによって再レンダリングが増えてしまう、ということはない。`useSelector`をいくつ使っていても、再レンダリングは全く行われないか、一度だけ行われるか、どちらかである。

そして、各`useSelector`の`equalityFn`がひとつでも`falsy`を返せば、全ての`selector`を再実行したうえで、再レンダリングが行われる。

以下のコンポーネントは、`equalityFn`が常に`true`を返すため、何度ボタンを押下しても再レンダリングされず、表示は`A is 0.`のまま変化しない。

```plain text
const App = () => {
  const dispatch = useDispatch();

  const countUpBoth = () => {
    dispatch({type: INCREMENT_A});
    dispatch({type: INCREMENT_B});
  };

  const a = useSelector(s => s.a, () => true);

  return (
    <>
      <div>A is {a}.</div>
      <button type="button" onClick={countUpBoth}>
        count up both
      </button>
    </>
  );
};

```

このコンポーネントに、以下の変更を加える。

```plain text
   };

   const a = useSelector(s => s.a, () => true);
+  const b = useSelector(s => s.b, () => false);

   return (
     <>
-      <div>A is {a}.</div>
+      <div>
+        A is {a}. B is {b}.
+      </div>
       <button type="button" onClick={countUpBoth}>
         count up both
       </button>

```

そうすると、ボタンを押下する度に`a`の値も`b`の値も更新されるようになる。
 これは、新しく追加した`useSelector`の`equalityFn`が常に`false`を返すためである。そのため、必ず再レンダリングが行われ、それに先立って 2 つの`useSelector`の両方の`selector`が実行される。

そのため、最初の`useSelector`の`equalityFn`は常に`true`を返すにも関わらず、常に`state.a`の最新の値が画面に反映されてしまうのである。