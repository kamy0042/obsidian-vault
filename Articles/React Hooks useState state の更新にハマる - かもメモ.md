---
URL: https://chaika.hatenablog.com/entry/2020/01/03/090000
Created: 2020-12-31T16:05:00
Updated: 2020-12-31T16:05:00
Tags: [topic/技術/React]
---
`useState` の setter で値を更新しても即時 state に反映されるわけではないので、更新された state を使って別の処理を行いたい時などで意図しない動作になってしまうことがあります。

### `function Counter({ initCount }) { const [count, setCount] = useState(initCount); const [square, setSquare] = useState(initCount * initCount); const updateSquare = () => { setSquare( count * count ); } const onCountup = () => { setCount( count + 1 ); // ここではまだ count は更新されているとは限らない updateSquare(); } return ( <> <p>Count: {count}</p> <p>Square: {square}</p> <button onClick={onCountup}>+1</button> </> );
}`

### `useState` の setter で更新されたことを期待する state を使うのではなく、更新する値を別途変数化してそれを使ってそれぞれを更新すればOK`function Counter({ initCount }) { const [count, setCount] = useState(initCount); const [square, setSquare] = useState(initCount * initCount); const updateSquare = ( val ) => { setSquare( val * val ); } const onCountup = () => { const newCount = count + 1; setCount( newCount ); updateSquare( newCount ); } return ( <> <p>Count: {count}</p> <p>Square: {square}</p> <button onClick={onCountup}>+1</button> </> );
}`

### Functional updates ([高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4))を使う

`useState` の setter に関数を渡す事ができ、この関数は前回の state を引数で受取り、返した値が新しい state になる
cf. [フック API リファレンス 関数型の更新 – React](https://ja.reactjs.org/docs/hooks-reference.html#functional-updates:title)

```plain text
function Counter({ initCount }) {
  const [count, setCount] = useState(initCount);
  const [square, setSquare] = useState(initCount * initCount);
  
  const updateSquare = ( val ) => {
    setSquare( val * val );
  }

  const onCountup = () => {
    setCount( prevCount => {
      const newCount = prevCount + 1; 
      updateSquare( newCount )
      return newCount;
    } );
  }
 
  return (
    <>
      <p>Count: {count}</p>
      <p>Square: {square}</p>
      <button onClick={onCountup}>+1</button>
    </>
  );
}

```

## Functional updates ([高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4))を使うメリット

`useCallback` で関数の再生産を行わないようにする際に、[高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4)を使う方法だと依存 (deps) を無くせるのでパフォーマンスを良くすることができる

### Functional updates ([高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4))でない方法の場合

Functional updates を使わない場合 state を deps に含める必要があるので、 state が変更される度に関数が再定義される

```plain text
function Counter({ initCount }) {
  const [count, setCount] = useState(initCount);
  const [square, setSquare] = useState(initCount * initCount);
  
  // ...
  
  //  `count` が変更される度に `onCountup` は再定義される
  const onCountup = useCallback(() => {
    const newCount = count + 1; 
    setCount( newCount );
    updateSquare( newCount );
  }, [count]);
 
  return ( ... );
}

```

### 依存を与えないと逆にバグを発生させる

deps を空配列 `[]` にすれば依存はなくなり、関数の生成は1度になるが、関数内で使っている state が関数生成時の値でメモ化されてしまうので意図した動作にならない

```plain text
function Counter({ initCount }) {
  const [count, setCount] = useState(initCount);
  const [square, setSquare] = useState(initCount * initCount);
  
  // …

  //  `count` は初期値 initCount で固定されしまう
  const onCountup = useCallback(() => {
    const newCount = count + 1; 
    setCount( newCount );
    updateSquare( newCount );
  }, []);

  return ( ... );
}

```

### Functional updates ([高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4))を使う方法の場合

Functional updates を利用すると関数外の変数を使わないので deps を無くせるので、関数の生成は1度で関数内の処理も意図したとおりに動作させることができる

```plain text
function Counter({ initCount }) {
  const [count, setCount] = useState(initCount);
  const [square, setSquare] = useState(initCount * initCount);
  
  // …

  // 関数外の変数を使わないので関数再定義の依存がない
  const onCountup = useCallback(() => {
    setCount( prevCount => {
      const newCount = prevCount + 1; 
      updateSquare( newCount )
      return newCount;
    } ), []);
  }
 
  return ( ... );
}

```

### sample

### 所感

Functional updates 知らなかった…`Array.map(function(val, key))` みないな感じなので、[高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4)って呼んで良いんだと思うけどﾁｮｯﾄ自信ない。

codepen でｻｸｯﾄ React Hooks も試せるから挙動確認みたいな時に便利ですね

---

[参考]

- [ReactのComponent.setStateによるstateの書き換えは非同期処理である - Qiita](https://qiita.com/xx2xyyy/items/76ab9f7d5ff515468a7d)
- [フック API リファレンス 関数型の更新 – React](https://ja.reactjs.org/docs/hooks-reference.html#functional-updates:title)
- [React Hooks、useStateの更新関数引数には関数を - Qiita](https://qiita.com/Takepepe/items/7e62cc7d7d8b81ca50db)
- [雰囲気で使わない React hooks の useCallback/useMemo - Qiita](https://qiita.com/seya/items/8291f53576097fc1c52a)
- [JavaScript 高階関数を説明するよ - Qiita](https://qiita.com/may88seiji/items/8f7e42353b6904af5e9a)

# [かもメモ](https://chaika.hatenablog.com/)

[id:kikiki-kiki](https://chaika.hatenablog.com/)

## [React Hooks コンポーネントのPropsにデフォルト値をつけたい](https://chaika.hatenablog.com/entry/2019/12/24/083000)

// Credit.js export function Credit({ character, singer }) { return ( <> <b>{character}</b> <small>song by: {singer}</small>  ); } こんな感じのコンポーネントがあり、props を渡さなければデフォルトで character, singer を表示させたい 1. オブジェクトの引数を分割代入で取る時のデフォルト値の与え方を使う の形を使う function({ …

[2019-12-24 08:30](https://chaika.hatenablog.com/entry/2019/12/24/083000)

# [かもメモ](https://chaika.hatenablog.com/)

[id:kikiki-kiki](https://chaika.hatenablog.com/)

## [React Hooks コンポーネント外のDOMに子コンポーネントを追加したい。](https://chaika.hatenablog.com/entry/2019/12/08/090000)

全面ReactなSPAではなく、部分的にReactを導入しているようなサービスにモーダルとそれを表示させるボタンをReact Component で作ろうとすると次のような構成になるかと思います。 function ShowDetailByModal() { return ( <> <button onClick={showModal}> SHOW </button> <Modal />  ); } しかし、このような構成の場合コンポーネント内にモーダルのDOMが出力されるの</modal>…

[2019-12-08 09:00](https://chaika.hatenablog.com/entry/2019/12/08/090000)

# [かもメモ](https://chaika.hatenablog.com/)

[id:kikiki-kiki](https://chaika.hatenablog.com/)

## [React JSX コメントを書きたい！](https://chaika.hatenablog.com/entry/2019/04/01/123000)

ReactのJSXでコメントを書く方法のメモ JSX Comment JSXの{ }の中はJavaScriptが動作するので{ }で囲ってコメントを書くことができる {/* 一行コメント */} {/* 複数行 コメント */} // も使えるが{ }の閉じタグの前に改行が必要。 {// 一行コメント } 改行がないと、最後の}もコメントアウトされてエラーになる {// 一行…

[2019-04-01 12:30](https://chaika.hatenablog.com/entry/2019/04/01/123000)

[**ReactでReduxを使ってみよう**](https://www.amazon.co.jp/exec/obidos/ASIN/B07P7DBLBL/kikiki83-22/)

- 作者:[kenpapa](http://d.hatena.ne.jp/keyword/kenpapa)
- 発売日: 2019/03/02
- メディア: [Kindle](http://d.hatena.ne.jp/keyword/Kindle)版

.

[**【Amazon.co.jp限定】TVアニメ/データカードダス『アイカツオンパレード！』挿入歌シングル「Sing a Song Sympathy!」（デカジャケット付）**](https://www.amazon.co.jp/exec/obidos/ASIN/B07YVDT947/kikiki83-22/)

- アーティスト:[V.A.](http://d.hatena.ne.jp/keyword/V.A.)
- 出版社/メーカー: [ランティス](http://d.hatena.ne.jp/keyword/%A5%E9%A5%F3%A5%C6%A5%A3%A5%B9)
- 発売日: 2019/12/25
- メディア: CD

.