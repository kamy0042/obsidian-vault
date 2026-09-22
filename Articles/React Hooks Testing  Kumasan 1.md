---
URL: https://kumaaaaa.com/react-testing/
Created: 2021-02-27T22:48:00
Tags: [topic/技術/テスト]
---
![[react-hooks-testing.png]]

[DEV](https://kumaaaaa.com/categories/dev)

この記事は[「DMMグループ Advent Calendar 2019」](https://qiita.com/advent-calendar/2019/dmm)21日目の記事です。

フロントエンドエンジニアは数年前に比べ、技術の幅が広がったことにより担当するべき作業も増えてきています。

テストもその中の一つです。フロントエンドのテストは実装に対するユニットテストだけでなく、コンポーネントのユニットテスト、e2eテスト、Visual Regression Testと考えることが多くあります。

その中で以前書いた[「Hooks時代のユニットテスト」](https://qiita.com/isy/items/0b40b50fad21a8e6c863)というReact Hooksのテストに関する記事が結構反響があり、数ヶ月テストを運用してみて、個人的なReact Hooksにおけるユニットテストをどうすべきかを考えたので、Testing Library・Jestを使う方法で紹介します。

TypeScriptがデファクトになりつつあるので、今回はTypeScriptで書いてるよ！

## React DOM

まずはHooksでのDOMのテストです。

Reactでのテストでは[enzyme](https://github.com/airbnb/enzyme)が有名ですが、今回は使いません。 enzymeはHooksと相性が悪く、Shallow Render時に`useEffect`を呼び出すことができません。

そのことについてはenzymeのissueでも話し合われています。 「[useEffect not called when the component is shallow renderered #2086](https://github.com/airbnb/enzyme/issues/2086)」

今回は`@testing-library/react`を使用します。

### React Testing Library

React Testing Libraryはユーザがコンポーネントを使用するようにテストが設計され`react-dom/test-utils`をラップしたライブラリです。

enzymeのように実装をテストするライブラリに比べるとシンプルに書くことができ、コンポーネントのテストという観点でいうと個人的にはenzymeよりReact Testing Libraryの方が合っているように感じます。

### ユニットテスト

テストを行うために下記のFuga.tsxというコンポーネントを用意しました。

```plain text
import React, { CSSProperties } from 'react';

type Props = {
  text: string;
  onClick: () => void;
  style?: CSSProperties;
}

const Fuga: React.FC<Props> = ({ text, style, onClick }) => {

  return (
    <div style={style} onClick={onClick} data-testid="fuga-wrapper"> 
      <p data-testid="fuga-text">Fuga text: { text }</p>
    </div>
  )
}

export default Fuga;
```

`data-testid`はテストをする際に使用するデータ属性です。 React Testing Libraryのドキュメントでは`data-testid`は実際のユーザの使用方法とは異なるため、なるべく使用するのは避けるように書かれています。

### ライブラリ追加

次に実際にテストを書くためにライブラリを追加します。

```plain text
yarn add -D @testing-library/react @testing-library/jest-dom
```

`@testing-library/jest-dom`はjestのカスタムマッチャーでDOMテストをより読みやすく簡単に行うことができます。

### テストコード

次に実際にテストを書いていきます。

```plain text
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Fuga from './Fuga'

describe('<Fuga>', () => {
    const props = {
        text: 'ふがふが',
        onClick: jest.fn(),
    }
    it('テキストが表示されているか', () => {
        const { getByTestId } = render(<Fuga { ...props } />)

        expect(getByTestId('fuga-text')).toHaveTextContent('Fuga text: ふがふが')
     })

     it('スタイルが適用されているか', () => {
         const attrs = { ...props, style: { fontSize: '24px' } }
         const { getByTestId } = render(<Fuga { ...attrs } />)

         expect(getByTestId('fuga-wrapper')).toHaveStyle('font-size: 24px')
     })

     it('イベントハンドラが呼ばれるか', () => {
        const { getByTestId } = render(<Fuga { ...props } />)

        fireEvent.click(getByTestId('fuga-wrapper'))

        expect(props.onClick).toHaveBeenCalled()
     })
})
```

`getByTestId`で指定しているのが、componentに書いた`data-testid`属性です。

また`@testing-library/jest-dom`を使用しているので`toHaveTextContent`・`toHaveStyle`などのカスタムマッチャーで容易にテストすることができます。

## React Custom Hooks

[Custom Hook](https://reactjs.org/docs/hooks-custom.html)とはHooks APIを組み合わせることで、独自のHooksを定義することができるものです。

前回の記事ではテストをするためにテスト用のコンポーネントでラップする方法をとりましたが、今回はTesting Libraryが出している`@testing-library/react-hooks`を使います。

### React Hooks Testing Library

Custom Hookは普通のJavaScript関数に見えますが、HooksはReactコンポーネントの内部でしか動作することできないので、テストをするためにコンポーネントを書く必要がありますが、そんな煩わしさを解消するテストユーティリティです。

### ユニットテスト

前回同様`useInput`というinput系の処理を良しなにしてくれるHooksを用意しました

```plain text
import React, { useState } from 'react'

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue)

    return {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    }
}

export default useInput
```

### ライブラリ追加

`@testing-library/react-hooks`は`react-test-renderer`がPeer Dependenciesとなっているので追加する必要があります。この際使用しているReactのバージョンに合わせる必要があリます。

```plain text
yarn add -D @testing-library/react-hooks react-test-renderer@^16.12.0
```

### テストコード

`useInput`のユニットテストを書いていきます。

```plain text
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import useInput from './useInput'

describe('useInput', () => {
    it('initial value', () => {
        const { result } = renderHook(() => useInput('hello'))

        expect(result.current.value).toBe('hello')
    })

    it('onChange', () => {
        const { result } = renderHook(() => useInput('hello'))

        const { container } = render(<input type="text" { ...result.current } data-testid="input"  />)

        const input = container.querySelector('input')

        act(() => {
            fireEvent.change(input!, {target: { value: 'kuma'}})
        })

        expect(result.current.value).toBe('kuma')
    })
})
```

`renderHook`関数がCustomHookをモックコンポーネントでラップしてくれます。

また今回はinput関連のhooksだったため`@testing-library/react`と併用し、`fireEvent`でイベントを発火させることでテストをしています。

## React Router Hooks

React Router HooksはReactRouter v5.1から対応したフックです。

このフックによって`withRouter`を使用せずlocationやhistoryを使うといったこれまでできなかったことができるようになりました。

しかし、こういった値がHOCを使ったPropsで渡って来なくなったため、下記のようなコンポーネントの場合ユニットテストをすると`Router`コンポーネントでラップされていないため、エラーが出るようになってしまいました。

```plain text
import React from 'react'
import { useHistory } from 'react-router-dom'

const Pero: React.FC = () => {
    const history = useHistory()

    return (
        <>
            <p>テキストダヨ</p>
            <button onClick={() => history.push('/')} />
        </>
    )
}

export default Pero
```

### 解決策

こういったエラーを解決するために、`renderWithRouter`という`Router`コンポーネントでラップするユーティリティを用意します。

```plain text
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render } from '@testing-library/react'

type Option = {
  history?: MemoryHistory;
}

export const renderWithRouter = (ui: React.ReactElement, option?: Option) => {
  const Wrapper: React.FC = ({ children }) => (
    <Router history={option?.history ?? createMemoryHistory()}>{ children }</Router>
  )
  return { ...render(ui, { wrapper: Wrapper }) }
}
```

実際にReact Router Hooksを使ったコンポーネントのテストコードを書いていきます。

```plain text
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { renderWithRouter } from './render'

import Pero from './Pero'

describe('<Pero>', () => {
    it('テキストが表示されているか', () => {
        const { container } = renderWithRouter(<Pero  />)

        const p = container.querySelector('p')

        expect(p).toHaveTextContent('テキストダヨ')
     })
})
```

先程用意した`renderWithRouter`を使うことでテストができるようになりました。

## Redux Hooks

[Redux Hooks](https://react-redux.js.org/next/api/hooks)はv7.1.0から追加された`connect()`を使わずにコンポーネントでdispatch、stateを使うことができるフックです。

前回同様、簡単なカウンターアプリを用意しました。

```plain text
import { Action } from 'redux'

const enum Type {
    INCREMENT = 'INCREMENT'
}

type CounterActions = IncrementAction

type IncrementAction = Action<Type.INCREMENT>

export const actions = {
    increment: (): IncrementAction => ({ type: Type.INCREMENT })
}

export type CounterState = {
    count: number
}

const initialState: CounterState = {
    count: 0
}

export function reducer(state = initialState, action: CounterActions) {
    switch (action.type) {
        case Type.INCREMENT: {
            return { count: state.count + 1 }
        }
        default:
            return state
    }
}
```

```plain text
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import  { State } from './store';
import  { actions } from './store/counter';

const counterSelector = (state: State) => ({
    count: state.count,
 });

const Count: React.FC = () => {
  const dispatch = useDispatch();
  const { count } = useSelector(counterSelector);

  return (
    <div>
      <p>{ count }</p>
      <button onClick={() => dispatch(actions.increment())}>+</button>
    </div>
  )
}

export default Count;
```

Redux Hooksを使用したコンポーネントは必然的にStoreと密結合になってしまいユニットテストではStoreのモックを用意しないとエラーが発生してしまいます。

前回の記事でも書きましたが、Storeを用意するとユニットテストではなく、インテグレーションテストになってしまいます。

なので今回は`jest.mock`を使い`useSelector`と`useDispatch`のモックを作り対処します。

これは前回の記事で使用した[sinon](https://sinonjs.org/)でスタブを作ることでも実現できます。

```plain text
import React from 'react';
import { render, fireEvent } from '@testing-library/react'

import Count from './Count';

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => mockDispatch,
}))

describe('<Count>', () => {

    afterEach(() => {
        jest.restoreAllMocks()
    })
    
    it('Redux Hooks', () => {
        const { container } = render(<Count />)

        const button = container.querySelector('button')

        fireEvent.click(button!)

        expect(mockDispatch).toBeCalled();
    })
});
```

これでRedux Hookを使っているコンポーネントでもユニットテストをすることができるようになりました。

### おわりに

React Router・ReduxのHooksが登場し、よりHooksが使いやすくなりました。 これを機にrecomposeやClassコンポーネントから脱却して、どんどんテスト書いていきましょう！！

個人的にはコンポーネントのユニットテストは頑張らなくて良いと思っているので、ほどほどに...

くま