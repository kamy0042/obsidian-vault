---
Updated: 2021-02-15T11:15:00
URL: https://www.to-r.net/media/react-tutorial-hooks-usememo-usecallback/
Created: 2021-01-16T03:44:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
![[react-tutrial.png]]

連載目次 : [React入門](https://www.to-r.net/media/react-tutorial/)
前回の記事 : [useEffect / React Hooks](https://www.to-r.net/media/react-tutorial-hooks-useeffect/)
次回の記事: [useRef](https://www.to-r.net/media/react-tutorial-hooks-useref/)

[Reat Hooks](https://www.to-r.net/media/react-tutorial-hooks/)のパフォーマンスチューニングで重要な`useMemo`と`useCallback`について解説を行います。

[functionコンポーネントの再描画](https://www.to-r.net/media/react-tutorial-hooks-useeffect/#function_rerender)でも解説したとおり、functionコンポーネントは高い頻度で再描画が行われます。

同じ結果を返す処理に関しては初回のみ処理を実行しておき、2回目以降は前回の処理結果を呼び出すことで毎回同じ処理を実行しなくてよくなります。

これはプログラミングではメモ化と呼ばれるテクニックで、それを`React Hooks`上で簡単に利用できるのが`useMemo`と`useCallback`です。

## useMemo

`useMemo`も他のHooks APIと同様にReactのimport時に読み込むことで利用できるようになります。

```plain text
import React, { useMemo } from 'react';
```

そして、functionコンポーネントのトップレベルの位置で以下の宣言を行いメモ化したい変数を定義します。第2引数にはuseEfectと同様に依存変数を配列で指定しておくことで依存変数に変更があった場合には再処理が実行されるようになります。

```plain text
const メモ化したい変数 = useMemo(() => {
  // 実行したい処理を記述
  return メモ化したい変数
},[依存変数を配列で記述])
```

例えば受け取ったタイムスタンプを日付に変換している次のコンポーネントを見てみましょう。

```plain text
const Foo = ({timestamp}) => {
  const dateObj = new Date(timestamp)
  const dateString = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日` // YYYY年MM月DD日
  return (
    <p>日付：{dateString}</p>
  )
}
```

上記のコードですと日付オブジェクトの作成や、日付オブジェクトから文字列を作成する処理がfunctionコンポーネントの再描画のたびに実行されてしまいます。

これを`useMemo`を利用して書き直してみましょう。

```plain text
const Foo = ({timestamp}) => {

  const dateString = useMemo(()=>{
    const dateObj = new Date(timestamp)
    return `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`
  },[timestamp])

  return (
    <p>日付：{dateString}</p>
  )
}
```

`useMemo`内で日付文字列を生成するように変更しましたので、日付文字列を生成する処理は初回もしくは`timestamp`が変更された際にしか実行されなくなります。

## useCallback

useCallbackはメモ化したコールバック関数を返すHooks APIです。

コールバック関数を利用したイベント設定は[Reactのイベント設定](https://www.to-r.net/media/react-tutorial08/)で解説しましたが、useCallbackを利用しない場合はコールバック関数はfunctionコンポーネントの再描画のたびに新しい関数インスタンスを生成してイベントとしてバインドされていきます。

```plain text
const MyComponent = () => {
  // コールバック関数
  const handleInput= (e) => {
    // イベント発生時に実行したい処理
    console.log(e.target.value)
  }
 
  return (
    <div>
      <input type="button" defaultValue=""　onClick={handleInput}/>
    </div>
  )
}
```

useCallbackを利用することで関数をメモ化して新しい関数インスタンスを生成せずに再描画後のイベントとして再利用を行います。

```plain text
onst MyComponent = () => {
  // コールバック関数
  const handleInput= useCallback((e) => {
    // イベント発生時に実行したい処理
    console.log(e.target.value)
  },[])
 
  return (
    <div>
      <input type="button" defaultValue=""　onClick={handleInput}/>
    </div>
  )
}
```

コールバック関数を作成する場合には極力`useCallback`を利用するのがよいでしょう。

次回は再描画を抑制するために重要なHooks API であるuseRefについて解説を行います。

連載目次 : [React入門](https://www.to-r.net/media/react-tutorial/)
前回の記事 : [useEffect / React Hooks](https://www.to-r.net/media/react-tutorial-hooks-useeffect/)
次回の記事: [useRef](https://www.to-r.net/media/react-tutorial-hooks-useref/)