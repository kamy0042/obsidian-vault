---
Updated: 2021-11-06T22:56:00
URL: https://blog.ykokw.xyz/posts/react-redux-selector/
Created: 2021-01-16T03:50:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
## useSelector が返す値がオブジェクトだと差分検出処理が毎回行われる

> With useSelector(), returning a new object every time will always force a re-render by default.

([Equality Comparisons and Updates](https://react-redux.js.org/api/hooks#equality-comparisons-and-updates)より引用

## 検証してみる

- `npx create-react-app react-redux-example --template redux`
-  
count 取得と表示を別コンポーネントに分ける
    - count の変更でアプリ全体が再レンダリングされるのを防ぐため

```plain text
const CountDisplay = () => {
  const count = useSelector(selectCount);
  return <span className={styles.value}>{count}</span>;
};

// 呼び出し側
```

- state に、lastAction（最後に dispatch されたアクション）を保持するように修正

```plain text
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
+    lastAction: 'no action',
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
+      state.lastAction = 'increment';
    },
    decrement: state => {
      state.value -= 1;
+      state.lastAction = 'decrement';
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
+      state.lastAction = 'incrementByAmount';
    },
  },
});
```

-  
lastAction を表示するコンポーネントを 2 つ用意
    - PrimitiveSelector は、lastAction を直接文字列で取得
    - ObjectSelector は、counter slice の state ごと取得して、分割代入で lastAction を取得
    - (style もちょっと追加してるけど割愛)

```plain text
export const PrimitiveSelector = () => {
  const lastAction = useSelector(state => state.counter.lastAction);
  return <div className={styles.primitiveSelector}>{lastAction}</div>;
};

export const ObjectSelector = () => {
  const { lastAction } = useSelector(state => state.counter);
  return <div className={styles.objectSelector}>{lastAction}</div>;
};
```

- Counter の下にアクションを表示

```plain text
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";
import styles from "./Counter.module.css";
+import { PrimitiveSelector, ObjectSelector } from "./LastAction";

const CountDisplay = () => {
  const count = useSelector(selectCount);
  return <span className={styles.value}>{count}</span>;
};

export function Counter() {
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <CountDisplay />
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
+      <div className={styles.row}>
+        <PrimitiveSelector />
+        <ObjectSelector />
+      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
```

- `yarn start`
-  
DevTool で `Highlight updates when components render.` にチェックをいれる
    - レンダリングされた箇所がハイライトされる
- ボタンをクリックしてどうレンダリングされるか見てみる

![[f56a8547fcd484f2cfe914017027ac20.gif]]

- アクションはずっと increment のままだし、どちらも lastAction しか state から受け取ってない
- 右側（Object で state を受け取ったほう）は毎回 re render されているのがわかる

## 対策

さっきのドキュメントの続きに書いてある

> Call useSelector() multiple times, with each call returning a single field value Use Reselect or a similar library to create a memoized selector that returns multiple values in one object, but only returns a new object when one of the values has changed. Use the shallowEqual function from React-Redux as the equalityFn argument to useSelector(), like:

([Equality Comparisons and Updates](https://react-redux.js.org/api/hooks#equality-comparisons-and-updates)より引用

## その他メモ

-  
上の React のパフォーマンス最適化ドキュメントにもあるが、サブコンポーネントにも影響してしまうので野放しにしていいわけでもなさそう
    - どこでパフォーマンスの問題が顕在化するかわからないし、ちゃんと対策がされてるとコード読んでわかるほうがレビューもしやすそう
    - どう対策するかは取得する内容によって変えればよさそう