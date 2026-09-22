---
URL: https://note.com/gota_disney/n/n356468dcbbd6#UpV9O
Created: 2021-09-26T19:49:00
Tags: [topic/技術/テスト]
---
![[rectangle_large_type_2_98ff9d95cda74e4dbcf92c3ba3505305.png]]

```plain text


 React, { useState, useCallback }

  useCounter =  {

   [count, setCount] = useState<>(initCount)


   increment = useCallback(
     setCount( x + )
  , [count])


   onClickAsyncIncrement = useCallback(
     setTimeout(increment, )
  , [count])


   onClickReset = useCallback(
     setCount(initCount)
  , [initCount])


   (count >= ) {
      ()
  }

   states = { count }
   actions = {
    onClickIncrement: increment,
    onClickAsyncIncrement,
    onClickReset
  }

  return [ states, actions ] as const
}
```

### テストの書き方について

まずはインクリメントに関するテストを記載していきます。
テストを書く上でいくつかお作法があります。

**renderHook**

カスタムフックを呼び出す場合は、@testing-library/react-hooksのrenderHookを使って呼び出します。
こちらを使わず直接利用しようとすると

> Invariant Violation: Hooks can only be called inside the body of a function component.

といったエラーが出るので注意してください。

また、renderHookの戻り値のresultを基本的には利用します。

```plain text
const { result } = renderHook(() => useHoge())
```

result.currentでカスタムフックの戻り値を利用できます。
ただし、一度変数に格納すると値は更新されないので注意してください。
必ずresult.currentから取得するようにしましょう。

```plain text
const { result } = renderHook(() => useHoge())
// 変数に格納
const hoge = result.current.hoge
expect(hoge).toBe('hoge')

// アクションを実行 - hogeの値をfugaに変える
result.current.changeFugaAction()
// hogeの値が変わらずテストが落ちる
expect(hoge).toBe('fuga') // test fail

// こちらの場合はテストが通る
expect(result.current.hoge).toBe('fuga')
```

**act**

カスタムフックのアクション関数を呼び出す場合は、@testing-library/react-hooksのactを使って呼び出しましょう。
Promiseを返すような処理の場合

```plain text
test('test', async () => {
  const { result } = renderHook(() => useHoge())
  await act(async () => {
    await result.current.changeFugaAction()
  })
})
```

といった形で呼び出します。
ひとまずこれだけ理解していれば簡単なカスタムフックについてはテストを書くことが可能になります。
早速テストを書いていきましょう。

### テストを書いてみよう

**+1ボタンを押した際のテスト**

まずは基本的なところを抑えていきたいと思います。
まずはインクリメントを実施した場合のテストを書いてきます。
以下の仕様をきちんと満たしているかを確認します。

> 1. countが引数の値となること（引数がない場合0が設定される）2. インクリメントを実行した場合、最初に確認した値から+1されていること

```plain text
// useCounter.test.ts

import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from './counter'

describe('useCounterのテスト', () => {
  test('+1ボタンを押したら値が+1されること', () => {
    // 初期値が未設定のためデフォルトの0が設定される
    const { result } = renderHook(() => useCounter())
    // 初期値の確認
    expect(result.current[0].count).toBe(0)
    // インクリメント関数を実行
    act(() => result.current[1].onClickIncrement())
    // 初期値が0のため、 1になっていることを確認
    expect(result.current[0].count).toBe(1)
  })
})
```

インクリメントのテストだけなのでかなり簡単にかけました。
説明通りの書き方をしている為、特に問題なくテストを書けるかと思います。
次からはテストを書く際に少し工夫が必要になります。

**1秒後に+1ボタンを押した際のテスト**

それでは次はこちらのテストを書いていきます。
まずは先ほどのように書いてみましょう。

```plain text
test('1秒後に+1ボタンを押したら値が+1されていること', () => {
  // 初期値が未設定のためデフォルトの0が設定される
  const { result } = renderHook(() => useCounter())
  // 初期値の確認
  expect(result.current[0].count).toBe(0)
  // 非同期のインクリメント関数を実行
  act(() => result.current[1].onClickAsyncIncrement())
  // 初期値が0のため、 1になっていることを確認
  expect(result.current[0].count).toBe(1)
})
```

さあテストケースを実行してみましょう。
テストが落ちたと思います。
というのも、さっきのケースと違ってonClickAsyncIncrementは1秒後にインクリメントが実施されます。
そのため、最後のexpectの際のcountの値は0のままです。
しかし、setTimeoutをテストケースに書くわけにはいきません。

ここでwaitForNextUpdateという関数を使います。
まずは説明の前にテストを修正します。

```plain text

test('1秒後に+1ボタンを押したら値が+1されていること', async () => { // asyncを追加
  // waitForNextUpdateを受け取るように修正
  const { result, waitForNextUpdate } = renderHook(() => useCounter())
  expect(result.current[0].count).toBe(0)

  // ラップしているactを外す
  result.current[1].onClickAsyncIncrement()

  // waitForNextUpdateを使う（Promiseを返すためawaitする）
  await waitForNextUpdate()

  expect(result.current[0].count).toBe(1)
})
```

これでテストが成功しました。
今回追加したwaitForNextUpdateはフック内のstateが更新されるまで待機します。
今回は関数の利用で実施しましたがよくある実装だとuseEffect内でAPIからデータを取得している場合などでも利用できます。
また、関数としてPromiseを返す場合はactをawaitすれば良いのですが「.then」内で値の更新を行っている場合などに今回の対応は有効です。

ただし注意すべき点としては、stateが更新されなければ待機し続けるためテストケースがタイムアウトします。
こちらの挙動に注意してください。

これで非同期に値を更新する処理でもテストが書けるようになりました。

**リセットボタンのテスト**

それでは次はリセットボタンのテストをしていきましょう。
まずはインクリメントをした後に、リセットしたら元の値に戻るかを確認してみます。

```plain text
describe('リセットボタンのテスト', () => {
  test('インクリメントされた値がリセットされること', () => {
    const { result } = renderHook(() => useCounter())
    // 初期値の確認
    expect(result.current[0].count).toBe(0)
    // インクリメントを実施する
    act(() => {
      result.current[1].onClickIncrement()
    })
    expect(result.current[0].count).toBe(1)
    // リセットを実行
    act(() => {
      result.current[1].onClickReset()
    })
    expect(result.current[0].count).toBe(0)
  })
})
```

こちらについては最初のインクリメントの処理と同じような記述です。
それでは次にpropsの値が変わった場合のテストをしてみます。

レンダリング時のinitCountの値から変わった場合、変更されたあとのinitCountの値でリセットされる必要があります。
それには再レンダリングを実行させる必要があります。
また、再レンダリング時に新たにinitCountを渡す必要があります。
そこでrerender関数とrenderHookのオプションからinitialPropsを使用します。

```plain text
test('Propsの値が更新されたら更新された値でリセットされること', () => {
  // rerender関数を受け取る
  const { result, rerender } = renderHook(
    // renderHookの引数にinitialPropsを受け取っている
    ({ initCount }) => useCounter(initCount)
    // OptionにinitalPropsを設定
  , { initialProps: { initCount: 0 } })

  // 初期値を確認
  expect(result.current[0].count).toBe(0)

  // Propsを変更して再レンダリング
  rerender({ initCount: 10 })

  // 最初のレンダリング時の値を引き継いでいることを確認
  expect(result.current[0].count).toBe(0)

  // リセットを実行
  act(() => {
    result.current[1].onClickReset()
  })

  // 再レンダリング時の値に変更されていることを確認する
  expect(result.current[0].count).toBe(10)
})
```

このようになります。
rerenderは実行されますが、Propsが変更されたからといってstateの値がいきなり変わることはありません。
親コンポーネントの再レンダリングに応じて毎回子コンポーネントのstateが変わらないのと同じ原理です。
他にもrenderHookの第二引数にはwrapperなども渡せるので公式ドキュメントを調べてみてください。

**カンストした時のテスト**

それでは最後にカンストした際のテストを記載してきます。
エラーがスローされた場合、result.errorにエラーが返却されます。
例外処理が入っているフックの場合はこちらを利用してテストを記載しましょう。

```plain text
test('カンストした場合は例外がスローされること', () => {
  // 境界値で設定
  const { result } = renderHook(() => useCounter(99))
  expect(result.current[0].count).toBe(99)
  // この時点ではエラーは存在しない
  expect(result.error).toBeUndefined()

  // インクリメントさせる
  act(() => {
    result.current[1].onClickIncrement()
  })

  // エラーメッセージを確認する
  expect(result.error.message).toBe('数値は99までしか加算できません')
})
```

これで例外処理も確認できました。

完成したテストは以下のようになります。

```plain text
// useCounter.test.ts

import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { useCounter } from './counter'

afterAll(cleanup)

describe('useCounterのテスト', () => {
  test('+1ボタンを押したら値が+1されること', () => {
   const { result } = renderHook(() => useCounter())
   expect(result.current[0].count).toBe(0)
   act(() => result.current[1].onClickIncrement())
   expect(result.current[0].count).toBe(1)
 })
 test('1秒後に+1ボタンを押したら値が+1されていること', async () => {
   const { result, waitForNextUpdate } = renderHook(() => useCounter())
   expect(result.current[0].count).toBe(0)
   result.current[1].onClickAsyncIncrement()
   await waitForNextUpdate()

   expect(result.current[0].count).toBe(1)
 })
 describe('リセットボタンのテスト', () => {
   test('インクリメントされた値がリセットされること', () => {
     const { result } = renderHook(() => useCounter())
     expect(result.current[0].count).toBe(0)
     act(() => {
       result.current[1].onClickIncrement()
     })
     expect(result.current[0].count).toBe(1)
     act(() => {
       result.current[1].onClickReset()
     })
     expect(result.current[0].count).toBe(0)
   })
   test('Propsの値が更新されたら更新された値でリセットされること', () => {
     const { result, rerender } = renderHook(({ initCount }) => useCounter(initCount), {
       initialProps: { initCount: 0 },
     })
     expect(result.current[0].count).toBe(0)
     rerender({ initCount: 10 })
     expect(result.current[0].count).toBe(0)
     act(() => {
       result.current[1].onClickReset()
     })
     expect(result.current[0].count).toBe(10)
   })
 })
 test('カンストした場合は例外がスローされること', () => {
   const { result } = renderHook(() => useCounter(99))
   expect(result.current[0].count).toBe(99)
   expect(result.error).toBeUndefined()
   act(() => {
     result.current[1].onClickIncrement()
   })
   expect(result.error.message).toBe('数値は99までしか加算できません')
 })
})
```

これでカスタムフックのテストも書けるようになりました。

### 今後のフロントエンドのテストについて

今回フックのテストについて書いてみました。
現在は通信を利用したテストを書けるようにMock Service Worker（msw）の導入に向けて奮闘中です。

mswを導入できれば通信をフックできるので、今までライブラリを無理やりモック化していたところをする必要がなくなり、かなり自然な形でのテストが書けるようになります。
また、テストが書けなかったような難しいコンポーネントもこちらでテストが書けるようになりそうです。
さらにStorybookでも利用できるので開発の品質・速度も向上すること間違いなしで良いことづくめなので頑張っているところです。

### 最後に

現在弊社では一緒に成長できるバックエンドエンジニアを募集しております！
最近は、NestJSの勉強会をやったりとNestJSのムーブメントもあるようです。個人的にはSpring Bootに近い感じで書けるのに親近感が湧いており、とても好きなフレームワークです。
是非弊社に興味のある方、話を聞いてみたいという方はお声かけいただけると！

また、先日弊社CTOが投稿された記事に熱い想いが詰まっています。
是非一度目を通していただけると嬉しいです！

弊社も絶賛リモートワーク中です。
とは言え、毎日自宅で仕事するのもちょっと飽きたな・・・たまには気分を変えたいなと思うこともたびたびあるので、弊社掲載スペースから

「こんなところでたまには仕事したい！」

みたいなリストを作ってみました！皆さんの何かの参考になれば幸いです。

**このクリエイターの人気記事 **