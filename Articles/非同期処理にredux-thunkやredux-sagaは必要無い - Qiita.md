---
Created: 2021-01-01T00:07:00
URL: https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73
Tags: [topic/技術/React]
---
状態管理に redux を使っている人は以下の様なことをやりたいことがあるでしょう。

- ログイン処理でフォームを Submit した時に API を叩いて、返ってきた Auth 情報を store に保持する。
- ページを開いた時に API を叩いて、返ってきた Response を store に保持する。

このような非同期処理の結果を redux に保持することが必要な時にはよく `redux-thunk`, または `redux-saga`が採用されていた。
今回は非同期処理に thunk も saga も使う必要なくなったのでは？と言う話です。

なお、筆者は redux-saga についてはそこまで使ったことが無いので、この記事では主に`redux-thunk`のリプレイスについて書きます。

## [**tl;dr;**](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#tldr)

[• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#tldr)[react-redux の hooks api を用いて custom hooks に非同期処理を入れる。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#tldr)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#tldr)[redux で保持するべきはユーザが必要な情報（Loading は要らない）](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#tldr)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#tldr)[ロジックはすべて custom hooks に閉じ込めよう。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#tldr)

## [**redux-thunk の流れ**](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)

[redux-thunk で非同期処理の流れを簡単に書くと：](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[非同期処理を始める前に、画面に「読み込み中‥」などを表示させるために、Loading 状態にする](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[非同期処理を始める。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[非同期処理が無事終わったら、結果を store に反映させ、Loading 状態を外す](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[非同期処理に何らかの問題が発生したら、その旨を表示させ、Loading 状態を外す](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[となります。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[コードで書くとこういう感じです：](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[`fooReducer.ts`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)

[`type FooState = {
  loadng: boolean,
  list: Item[],
  error: stirng
}

const initialState:FooState  = {
  loading: false,
  list: [],
  error: string
}

export const fooReducer = (state:FooState = initialState, action:FooAction) => {
  switch(action.type) {
    case: 'FOO_START':
      return { ...state, loading: true}
    case: 'FOO_SUCCESS':
      return { ...state, loading: false, list: action.result}
    case: 'FOO_FAILED':
      return { ...state, loading: false, error: action.error}
    default:
      return state;
  }
}
`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)[`fooAction.ts`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)

[`export const fooAction = (): ThunkAction => async (dispatch: Dispatch) => {
  // 非同期処理を開始するため、状態をLoadingにする
  dispatch({ type: 'FOO_START' })
  // 非同期処理を行う
  try {
    const result = await fetch('/getFoo')
    // 成功したら結果をreduxに反映し、Loading状態を外す
    dispatch({ type: 'FOO_SUCCESS', result })
  } catch (e) {
    // エラーが発生したらエラーメッセージを表示させ、Loading状態を外す
    console.error(e)
    dispatch({ type: 'FOO_FAILED', error: e.message })
  }
}`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E6%B5%81%E3%82%8C)

## [**redux-thunk のつらみ**](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)

[上記の通り、redux-thunk がやっていること自体は単純なのですが、](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
それを書くのに結構な量のコードを書く必要があります。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
上記に加えて、store の状態をもとに処理を分岐させる必要がある場合、thunk 内で getState を呼んだりと、処理が複雑化してきます。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[筆者が感じる Issue としては以下のようなことがあります：](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[`STARTED`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[, ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[`SUCCESS`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[, ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[`FAILED`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[ の 3 つの Action を書く必要があった。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[`Loading`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[の状態を reducer で持つ必要があった。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[非同期処理が行われる度に別々の Loading を書く必要があった。
1 画面で複数の非同期処理が走る際、](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[つまりやりたいことは：](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[Action の発火は必要な状態が変わる一回に済ませたい。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[Loading は redux 外で管理したい。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)[非同期処理の共通部分を使いまわしたい。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#redux-thunk-%E3%81%AE%E3%81%A4%E3%82%89%E3%81%BF)

## [**解決案**](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)

[react の custom hooks を使えば解決します。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
react-redux の v7.1 から、hooks に対応した API が出たのでそれらを使っていきます。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[上で書いた redux-thunk の例を custom hooks を使って簡略化することができます。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[以下のことをやっていきます。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[loading は useState で保持して、hooks 内で完結させる。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
• ](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[dispatch を使うのは、非同期処理が終わってからの一回のみで済ませる。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[`useFoo.ts`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)

[`import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const useFoo = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const items = useSelector(state=> state.foo.items)
  const dispatch = useDispatch<Dispatch<FooAction>>()

  const getFoo = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fetch('/getFoo')
      setLoading(false)
      dispatch({type: 'FOO_SUCCESS', result})
    } catch (e) {
      setLoading(false)
      setError(e.message)
    }
  }, [loading, error, items])
  return [items, getFoo, loading, error]
}

`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[loading と error を持つ必要がなくなったので、reducer も簡略化することができます。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[`fooReducer.ts`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)

[`type FooState = {
  list: Item[],
}

const initialState:FooState  = {
  list: [],
}

export const fooReducer = (state:FooState = initialState, action:FooAction) => {
  switch(action.type) {
    case: 'FOO_SUCCESS':
      return { ...state, list: action.result}
    default:
      return state;
  }
}
`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[component での使用例はこんな感じです](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[`FooList.tsx`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)

[`import React, { useEffect } from 'react'
import { useFoo } from './useFoo'

export const FooList = () => {
  const [items, getFoo, loading, error] = useFoo()
  useEffect(() => {
    getFoo()
  }, [])

  if (loading) {
    return <p>読込中…</p>
  }

  return (
    <div>
      {error ? <p>{error}</p> : null}
      <ul>
        {items.map(item => {
          return <li>{item.contents}</li>
        })}
      </ul>
    </div>
  )
}
`](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[このような形で、ページ遷移時に非同期で何かを取得してくる処理を thunk 無しでも実現することができます。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[また、このように非同期処理のロジックを custom hooks に閉じ込めておくことで、別のページで同じ処理が必要になった時に hooks を使い回すことができます](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)[
上の Compnent の例では、useEffect も useFoo の中に入れることで、完全にロジックと Component を分割させることができます。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E8%A7%A3%E6%B1%BA%E6%A1%88)**
**[**あとがき**](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E3%81%82%E3%81%A8%E3%81%8C%E3%81%8D)[これはあくまで自分の redux-thunk の使い方なら redux-thunk 使わなくても出来るかなと言う話なので、](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E3%81%82%E3%81%A8%E3%81%8C%E3%81%8D)[
redux-thunk や redux-saga じゃないとこれができないよ！みたいなことがあれば教えてほしいです。](https://qiita.com/Naturalclar/items/6157d0b031bbb00b3c73#%E3%81%82%E3%81%A8%E3%81%8C%E3%81%8D)