---
Updated: 2021-01-02T17:44:00
URL: https://numb86-tech.hatenablog.com/entry/2019/12/20/222412
Created: 2021-01-02T16:28:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
パフォーマンス・チューニングには、「こうすれば必ず上手くいく」という方法論や銀の弾丸はなく、地道に試行と計測を繰り返すしかない。
しかしだからこそ、基本的な考え方や仕組みを理解することが大切であり、それがなければ、どのように対処していけばいいのか見当をつけることすら出来ず、的外れな対応をすることにもなりかねない。`React.memo`を使った処理の最適化は、React アプリのパフォーマンス改善のための、基本となるテクニックのひとつである。

この記事のコードは React の`v16.10.2`で動作確認している。

## メモ化という概念

React アプリのパフォーマンス最適化を理解するためにはまず、メモ化（`Memoization`）という概念を把握しておく必要がある。
大雑把に言ってしまうとメモ化とは、何らかの計算によって得られた値を記録しておき、その値が再度必要になったときに、再計算することなく値を得られるようにすることである。
メモ化によって都度計算する必要がなくなるため、パフォーマンスの向上が期待できる。`React.memo`とは言ってみれば、メモ化を利用して不要な処理をスキップするための機能であり、それを活用することが、React アプリのパフォーマンス最適化の基本的な戦略である。

JavaScript においてはメモ化にはもうひとつ重要な役割がある。それは、同じ参照のオブジェクトを得られるようになるということ。
記録しておいたオブジェクトを取り出すので、「値が一緒だが参照が異なる別のオブジェクト」になってしまうことを防げる。
JavaScript のオブジェクトの等価性は「参照が同じかどうか」で判断することが多く、React も例外ではないため、これは重要な意味を持つ。
後述するように、`React.memo`を上手く使うためにはこの効果も把握しておく必要がある。

## 再レンダーによるコスト

コンポーネントの`state`が更新されると、そのコンポーネントは再レンダーされる。
そして、親コンポーネントが再レンダーされると、その子コンポーネントも無条件で再レンダーされる。

下記の例では、ボタンを押す度に`App`と`Child`が再レンダーされるため、その度にログが流れる。

```plain text
import React, {useState} from 'react';

const App = () => {
  const [state, setState] = useState(0);

  const onClick = () => {
    setState(s => s + 1);
  };

  console.log('render App');

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
};

const Child = () => {
  console.log('render Child');

  return <div>Child</div>;
};

export default App;

```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220213937.gif)

再レンダーには当然、それを実行するためのコストがある。
上記のサンプルでは`console.log`を実行しているが、この部分で高コストな処理を行っていれば、その分だけパフォーマンスに悪影響を与える。

また、再レンダーの度に React が内部的に行う処理もある。
例えば、再レンダーによって返された React 要素を前回のレンダー時の React 要素と比較して、DOM を更新する必要があるかをチェックしている。
そして、更新する必要があった場合は、差分に応じて DOM を更新する。
これらの処理にも当然、少なからずコストが掛かっている。

だが上記の`Child`は、`state`が何であれレンダーする内容は変わらないため、`Child`の再レンダーが不要であることは一目瞭然。
そのため再レンダーをスキップできれば、その分だけ、パフォーマンスの向上が期待できる。

それを実現するために利用するのがメモ化であり、その具体的な方法が`React.memo`である。

## props の等価性をチェックする

`React.memo`では、コンポーネントが返した React 要素を記録する。
そして、再レンダーが行われそうになったときは本当に再レンダーが必要なのかチェックし、必要なときだけ再レンダーし、必要ないときは記録しておいた React 要素を再利用することで、再レンダーを最低限に抑える。

再レンダーが必要かどうかは、`props`の等価性によって判断される。
新しく渡された`props`を前回の`props`と比較し、同じであると見なせば再レンダーは不要であると判断し、異なると見なせば再レンダーを行う。

デフォルトでは、等価性の判断に`shallow compare`を使う。これは、オブジェクトの1階層のみを比較することである。
先程の例の`Child`では`props`は常に`{}`であるため、`shallow compare`によって等価であると判断される。
早速`React.memo`を使ってみる。

`React.memo`は、メモ化したいコンポーネントをラップして使う。そのため、`Child`を以下のように書き換える。

```plain text
const Child = React.memo(() => {
  console.log('render Child');

  return <div>Child</div>;
});

```

これで、`Child`の再レンダーは常にスキップされるようになった。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220214002.gif)

次は、`props`の`shallow compare`では再レンダーをスキップできないパターンを見てみる。

`state`をオブジェクトにして、そのなかに`app`と`child`というプロパティを持たせた。どちらもボタンを押して個別にカウントアップできる。`Child`コンポーネントは`state`を受け取り、`state.child`を画面に表示している。

```plain text
import React, {useState} from 'react';

const App = () => {
  const [state, setState] = useState({
    app: 0,
    child: 0,
  });

  const countUpApp = () => {
    setState(s => ({
      app: s.app + 1,
      child: s.child,
    }));
  };

  const countUpChild = () => {
    setState(s => ({
      app: s.app,
      child: s.child + 1,
    }));
  };

  console.log('render App');

  return (
    <div>
      <button type="button" onClick={countUpApp}>
        count up app
      </button>
      <br />
      <button type="button" onClick={countUpChild}>
        count up child
      </button>
      <br />
      App: {state.app}
      <Child state={state} />
    </div>
  );
};

const Child = React.memo(({state}) => {
  console.log('render Child');

  return <div>Child: {state.child}</div>;
});

export default App;

```

この場合、`state.child`の値が更新されたとき、つまり`count up child`ボタンが押したときだけ再レンダーすれば、十分なはず。
しかしこの実装だと、`count up app`ボタンを押したときも再レンダーされてしまう。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220214043.gif)

原因は、`Child`に`state`というオブジェクトを渡してしまったこと。
これを`shallow compare`すると、前回の`props.state`と今回の`props.state`は常に違うオブジェクトになるので、等価性がないと判断される。そのため、必ず再レンダーされてしまう。

この問題の正しい解決法は、`Child`に`state`を渡すのを止め、`state.child`だけを受け渡すようにすることである。`Child`は`state.app`を必要としていないのだから、`state`オブジェクトを丸ごと渡しているのが、そもそも間違っている。

だが今回は`React.memo`の説明のため、敢えて違う方法で解決する。

`React.memo`の第二引数には関数を渡すことができ、公式ドキュメントではこの関数のことを`areEqual`と呼んでいる。`areEqual`は、第一引数として前回の`props`（`prevProps`）を、第二引数として今回の`props`（`nextProps`）を受け取る。
そして`areEqual`は、真偽値を返すように書く必要がある。
そのため、このような構文になる。

```plain text
const メモ化されたコンポーネント = React.memo(元のコンポーネント, (prevProps, nextProps) => {/* 真偽値を返す */})

```

`areEqual`が`true`を返したときは再レンダーをスキップし、`false`を返したときは再レンダーを行う。`areEqual`を省略した場合は、上述の通り`props`の`shallow compare`で等価性を判断する。

そのため、`Child`を以下のように書き換えると、`state.child`の値が変化していないときは再レンダーを不要と判断し、スキップする。

```plain text
const Child = React.memo(
  ({state}) => {
    console.log('render Child');

    return <div>{state.child}</div>;
  },
  (prevProps, nextProps) => prevProps.state.child === nextProps.state.child
);

```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220214124.gif)

繰り返しになるが、今回のケースでは、`props`として`state.child`だけを渡す、というのが正しい解決方法である。パフォーマンスの問題以前にコンポーネントの設計として、不必要な`props`を渡すべきではない。今回は説明のしやすさのために、敢えてこのようなサンプルにした。

`areEqual`で再レンダーをコントロールできるので、これを使えば、表示を制御することが可能になる。データの変化を表示に反映させたい場合にのみ、`areEqual`が`false`を返すようにすればよい。
だが、そのような使い方をしてはいけない。公式ドキュメントにあるように、`React.memo`はパフォーマンス最適化のためにのみ、使う。

> これはパフォーマンス最適化のためだけの方法です。バグを引き起こす可能性があるため、レンダーを「抑止する」ために使用しないでください。

[React.memo – React](https://ja.reactjs.org/docs/react-api.html#reactmemo)

もうひとつ注意しなければならないのは、等価性のチェックにも、当然コストがかかるということ。
そして`areEqual`で複雑なことをすればするほど、コストは高くなっていく。
もし等価性のチェックにかかるコストが再レンダーにかかるコストより高くなれば、意味がないどころか逆効果ということになる。
そのため、常に`React.memo`を使えばよいというものではない。冒頭に書いたように試行と計測を繰り返して、最適化を行っていく。
パフォーマンス向上に僅かな効果しか得られない場合、他の要素（可読性やメンテナンス性など）とのトレードオフを考慮し、敢えて最適化しないという選択肢も十分にあり得る。

## useCallback と組み合わせる

メモ化が使われている機能は`React.memo`だけではない。`useCallback`もそのひとつ。`useCallback`はメモ化を利用して、関数の不要な再作成を防ぐ。

ある関数コンポーネントのなかに以下の記述があったとする。

```plain text
const showAandB = () => {
  console.log(props.a, props.b);
};

```

`showAandB`は、再レンダーされる度に新しく作られる。
だが、`props.a`と`props.b`が変わらない限り、`showAandB`を新しく作り直す必要はない。`useCallback`を使えば、以前作った`showAandB`を再利用できる。

```plain text
const showAndB = useCallback(() => {
  console.log(props.a, props.b);
}, [props.a, props.b]);

```

`useCallback`の第一引数に作成する関数を、第二引数にその関数が使用している値を列挙した配列を、渡す。
そうすると、配列に列挙した値を前回と比較し、それがひとつでも変われば、新しく`showAandB`を作り直す。
だが全て前回と同じであれば、前回の`showAandB`を再利用する。そうすると、前回と同じ参照の関数を得ることになる。
関数やオブジェクトの等価性は参照が同じかどうかで判定することが多いので、このことはメモ化を利用する上で大きな意味を持つ。

サンプルを少し書き換えて、`Child`に`value`と`onClick`を渡すようにした。`value`は数値だが、`onClick`は関数である。

```plain text
import React, {useState} from 'react';

const App = () => {
  const [state, setState] = useState({
    app: 0,
    child: 0,
  });

  const countUpApp = () => {
    setState(s => ({
      app: s.app + 1,
      child: s.child,
    }));
  };

  const countUpChild = () => {
    setState(s => ({
      app: s.app,
      child: s.child + 1,
    }));
  };

  const alertChildState = () => {
    alert(state.child);
  };

  console.log('render App');

  return (
    <div>
      <button type="button" onClick={countUpApp}>
        count up app
      </button>
      <br />
      <button type="button" onClick={countUpChild}>
        count up child
      </button>
      <br />
      App: {state.app}
      <Child value={state.child} onClick={alertChildState} />
    </div>
  );
};

const Child = React.memo(({value, onClick}) => {
  console.log('render Child');

  return (
    <div>
      Child: {value}
      <br />
      <button type="button" onClick={onClick}>
        click
      </button>
    </div>
  );
});

export default App;

```

`Child`は`React.memo`でラップしているが、`count up app`を押下したときも再レンダーされてしまう。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220214201.gif)

原因は`props.onClick`にある。
`count up app`押下時に`props`を`shallow compare`すると、`value`は等価であると判断される。しかし、`onClick`として渡されている`alertChildState`は、`App`が再レンダーされる度に新しく作られるため、参照が異なり、常に等価性がないと判断されてしまう。

このようなケースで、`useCallback`が役に立つ。前述のように同じ参照の関数を返すので、`React.memo`が等価性があると判断するようになる。
`alertChildState`の定義を以下のように書き換えると、`state.child`が変わったときにのみ関数を作り直すようになる。

```plain text
// import React, {useState, useCallback} from 'react'; として useCallback をインポートしておくことを忘れない

const alertChildState = useCallback(() => {
  alert(state.child);
}, [state.child]);

```

これで、`state.child`が変わった時、つまり`count up child`が押下された時にのみ、`Child`が再レンダーされるようになった。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220214314.gif)

## React.memo によるメモ化の影響範囲

`React.memo`で再レンダーをスキップすると、そのコンポーネントの子コンポーネントの再レンダーもスキップされる。

まずは、`React.memo`を使わない場合を見てみる。`App`が持っている`state`を、`Child`、そして`Grandchild`と受け渡している。

```plain text
import React, {useState} from 'react';

const App = () => {
  const [state, setState] = useState(0);

  const onClick = () => {
    setState(s => s + 1);
  };

  console.log('render App');

  return (
    <div>
      <button type="button" onClick={onClick}>
        count up
      </button>
      <br />
      App
      <Child value={state} />
    </div>
  );
};

const Child = ({value}) => {
  console.log('render Child');

  return (
    <div>
      Child
      <Grandchild value={value} />
    </div>
  );
};

const Grandchild = ({value}) => {
  console.log('render Grandchild');

  return <div>{value}</div>;
};

export default App;

```

当然、ボタンを押す度に全てのコンポーネントが再レンダーされる。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220214357.gif)

だが、`React.memo`を使って`Child`の再レンダーを常にスキップするようにすると、`Child`だけでなく`Grandchild`の再レンダーも行われなくなることを確認できる。

```plain text
const Child = React.memo(
  ({value}) => {
    console.log('render Child');

    return (
      <div>
        Child
        <Grandchild value={value} />
      </div>
    );
  },
  () => true // 検証用のコードであり、areEqual が常に true や false を返す書き方は通常はしない
);

```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220214444.gif)

さらに検証してみると、`Grandchild`を`React.memo`でラップしても、その`React.memo`は実行されていない。

```plain text
const Child = React.memo(
  ({value}) => {
    console.log('render Child');

    return (
      <div>
        Child
        <Grandchild value={value} />
      </div>
    );
  },
  () => {
    console.log("Child's areEqual");
    return true;
  }
);

const Grandchild = React.memo(
  ({value}) => {
    console.log('render Grandchild');

    return <div>{value}</div>;
  },
  () => {
    console.log("Grandchild's areEqual");
    return false;
  }
);

```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/n/numb_86/20191220/20191220214507.gif)

`Child`の場合は`areEqual`を実行した上で再レンダーするかどうかを決めているが、`Grandchild`の場合は`areEqual`の実行自体が行われていない。
このことから、`React.memo`で再レンダーをスキップすると、その時点でその下のコンポーネントツリーの処理が全てスキップされるのだと思われる。

## 参考資料

- [React.memo – React](https://ja.reactjs.org/docs/react-api.html#reactmemo)
- [パフォーマンス最適化 – React](https://ja.reactjs.org/docs/optimizing-performance.html)