---
Updated: 2021-11-06T23:08:00
URL: https://numb86-tech.hatenablog.com/entry/2021/03/23/124258
Created: 2021-03-25T23:46:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
![[1552392850810796.bin]]

この記事の内容は、React の`v17.0.2`で動作確認している。

React コンポーネントが入れ子になっているとき、親のコンポーネントが再レンダリングされると、子のコンポーネントも再レンダリングされる。`state`の受け渡し等があるかどうかは関係ない。
 そのため以下のコードの場合、ボタンを押下すると`Parent`だけでなく`Child`も再レンダリングされ、両方のログが流れる。

```plain text
import {useState} from 'react';
import {render} from 'react-dom';

function Child() {
  console.log('render Child');

  return <div>Child</div>;
}

function Parent() {
  const [state, setState] = useState(0);
  const onClick = () => {
    setState((s) => s + 1);
  };

  console.log('render Parent');

  return (
    <div>
      <button type="button" onClick={onClick}>
        count up
      </button>
      <br />
      {state}
      <Child />
    </div>
  );
}

function Container() {
  return <Parent />;
}

render(<Container />, document.querySelector('#container'));

```

だが`Child`は`Parent`の`state`の値がなんであれ表示する内容は変わらないため、`Child`の再レンダリングは不要である。
 この不要な再レンダリングを回避する方法のひとつに、`React.memo`を使ったメモ化がある。

```plain text
const Child = memo(() => {
  console.log('render Child');

  return <div>Child</div>;
});

```

メモ化については、以下の記事に詳しく書いた。

これ以外の方法として、「`Child`コンポーネントが返す React 要素を`Parent`の`props`として渡す」というものがある。

```plain text
function Parent({children}) {
  const [state, setState] = useState(0);
  const onClick = () => {
    setState((s) => s + 1);
  };

  console.log('render Parent');

  return (
    <div>
      <button type="button" onClick={onClick}>
        count up
      </button>
      <br />
      {state}
      {children}
    </div>
  );
}

function Container() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}

```

こうすると、`Parent`が再レンダリングされても`Child`は再レンダリングされない。

`props.children`ではなく任意の`props`に React 要素を渡してもよい。

```plain text
function Parent({originalProps}) {
  const [state, setState] = useState(0);
  const onClick = () => {
    setState((s) => s + 1);
  };

  console.log('render Parent');

  return (
    <div>
      <button type="button" onClick={onClick}>
        count up
      </button>
      <br />
      {state}
      {originalProps}
    </div>
  );
}

function Container() {
  return <Parent originalProps={<Child />} />;
}

```

これでも、同様の結果になる。

考えてみれば当然で、コンポーネント（関数）ではなくて要素（関数の返り値）を外から渡しているのだから、`Parent`が再レンダリングされたところで、渡されている要素はそのまま同じものが使われる。
 以下のコードでは`Parent`のレンダリング毎の`originalProps`を`list`に入れているが、`list`内の全ての要素は常に同じものを参照している。

```plain text
import {useState} from 'react';
import {render} from 'react-dom';

function Child() {
  console.log('render Child');

  return <div>Child</div>;
}

const list = [];

function Parent({originalProps}) {
  const [state, setState] = useState(0);
  const onClick = () => {
    setState((s) => s + 1);
  };

  console.log('render Parent');

  list.push(originalProps);
  if (list.length >= 2) {
    console.log(list.every((elem) => elem === originalProps)); // true
  }

  return (
    <div>
      <button type="button" onClick={onClick}>
        count up
      </button>
      <br />
      {state}
      {originalProps}
    </div>
  );
}

function Container() {
  return <Parent originalProps={<Child />} />;
}

render(<Container />, document.querySelector('#container'));

```

そのため、要素ではなくコンポーネントを`props`で渡してしまうと、再レンダリングは回避できない。

以下のコードでは、要素ではなく`Child`コンポーネントを`props`で渡し、`Parent`のなかで要素を作成している。
 この場合、`Parent`が再レンダリングされる度に`Child`が呼び出され、新しく要素を作ることになる。
 つまり、`Parent`が再レンダリングされると`Child`も再レンダリングされるということである。

```plain text
import {useState} from 'react';
import {render} from 'react-dom';

function Child() {
  console.log('render Child');

  return <div>Child</div>;
}

const componentList = [];
const elementList = [];

function Parent({OriginalProps}) {
  const [state, setState] = useState(0);
  const onClick = () => {
    setState((s) => s + 1);
  };

  console.log('render Parent');

  const element = <OriginalProps />; // 渡されたコンポーネントから要素を作成している

  componentList.push(OriginalProps);
  if (componentList.length >= 2) {
    console.log(componentList.every((elem) => elem === OriginalProps)); // true
  }

  // どの要素も`<div>Child</div>`ではあるが、別々の`<div>Child</div>`が都度作られている
  elementList.push(element);
  if (elementList.length >= 2) {
    console.log(elementList.every((elem) => elem === element)); // false
  }

  return (
    <div>
      <button type="button" onClick={onClick}>
        count up
      </button>
      <br />
      {state}
      {element}
    </div>
  );
}

function Container() {
  return <Parent OriginalProps={Child} />; // 要素ではなくてコンポーネントを渡している
}

render(<Container />, document.querySelector('#container'));

```

## 参考資料

- [Before You memo() — Overreacted](https://overreacted.io/before-you-memo/)