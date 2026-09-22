---
URL: https://sbfl.net/blog/2019/11/12/react-hooks-introduction/
Created: 2020-12-31T17:01:00
Updated: 2020-12-31T17:01:00
Tags: [topic/技術/React]
---
# 最近Reactを始めた人向けのReact Hooks入門

IT

JavaScript

React

プログラミング

2019/11/12

Author

古都ことふよんとえんよぷよぐやま！！！

[Twitter](https://twitter.com/kfurumiya)

[GitHub](https://github.com/kotofurumiya)

[Email](https://sbfl.net/blog/2019/11/12/react-hooks-introduction/mailto:kotofurumiya@gmail.com)

ReactにHooksの仕組みが導入されてからずいぶん経ちました。Hooks導入当時のコミュニティの熱狂は、それはもう凄いものでした。「Reactにとんでもない機能が実装されたぞ！」と大騒ぎで、Hooksについての新しい記事を見ない日はありませんでした。

そんな盛り上がりも冷めつつあり、Hooksも実務に密着した「当たり前」の機能になったのかな、と思いました。しかしその一方でまだHooksについてはよくわからないという人も多く、知識の二極化を生んでいるように感じます。

世の中にはReactにすでに全く馴染んでいる人向けのHooksの解説記事は多く見当たりますが、最近のReact初心者に向けてのHooks解説記事はあまり多くありません。この記事では、Hooksについて実例を示しつつReactの基礎的な面からの解説を行います。

## React初心者向けのHooks

世の中にはもう多くの高品質なHooksの解説があります。しかし「最近Reactを始めた」という人向けへの記事は、なかなか見つかりません。どれもReactのライフサイクルを既に熟知した人向けの記事になっています。

そこで今回は最近Reactを始めて、コンポーネントのライフサイクルとかよくわからないという人向けに、Hooksを基礎から解説します。

## React再入門

React初心者向け、と言いつつも、Reactの基礎については把握している必要があります。もう知っている人も、まだ知らない人も、ここで復習しておきましょう。

さて、まずはReactのおさらいから始めましょう。ReactはFacebook社が提供する「UIのためのライブラリ」であり、コンポーネントの定義・管理やそのレンダリング（描画）戦略の提供を行います。

一般的に「React」と言うと「react」と「react-dom」を組み合わせたウェブ向けライブラリ群を指します。react-domはreactが算出した最適なレンダリング戦略に基づきDOMに対して結果を適用するライブラリです。

Reactでは通常はHTMLタグを模した「JSX」と呼ばれる記法を用いてコンポーネントを定義します。

```plain text
const App = () => {
  return <div>Hello React!</div>};123
```

単なるdivタグのように見えますが、これはbabelなどを通してReact.createElementメソッドに変換されます。

Reactでのコンポーネント定義は大きく分けて2種類あります。クラスコンポーネントと関数コンポーネントです。

クラスコンポーネントは従来のコンポーネント定義方法で、classキーワードを用いてコンポーネントを定義します。クラスコンポーネントは状態（state）を持つことができ、描画内容を柔軟に変化させることができます。また、Reactに関するメソッドをクラスに実装することで、きめ細やかな描画制御が可能になります。

```plain text
class Panel extends React.Component {
  render() { return <div>Hi</div> }

  // コンポーネントを再レンダリングすべきか否かを制御できる
  shouldComponentUpdate(nextProp, nextState) {
    return false;
  }
}12345678
```

もうひとつは関数コンポーネントです。関数コンポーネントはシンプルで、状態（state）を持たず、一切の制御ができません。渡された値に従って特定の固定要素を描画するだけの、単なるプレースホルダでしかありません。要はただの「関数」です。

```plain text
const Message = (props) => {
  return <div>{props.content}</div>}123
```

これらの事実に我々の「庶民感覚」を適用すると、関数コンポーネントを使う意味は存在しないでしょう。だってクラスコンポーネントのほうが全てにおいて高機能なのだから。

## 関数と状態

普通に考えると、関数は状態を持つことができません。関数の実行が終われば、関数内の変数はスコープから外れ、アクセスできなくなるのですから。

ただし、いくつかのハックは存在します。JavaScriptでは関数はクロージャですから、関数外の状態を観測することができます。また、関数はオブジェクトですので、関数自体に値を保存することも頑張れば不可能ではありません。しかしどの方法も不格好で、実用的ではありません。

つまり一般的には関数は状態を持てず、我々庶民にとっては関数コンポーネントは常にクラスコンポーネントの「劣化版」でしかないのです。もちろん非常に高度なプログラマにとっては関数コンポーネントも有意義ではあるのですが……。

## Reactと関数コンポーネントを接続（Hooks into）する

Reactの様々な機能にアクセスできるクラスコンポーネントと違い、関数コンポーネントはReactの機能に一切のアクセスが許されていませんでした。

そこで考案されたのがHooksです。Hooksは、関数コンポーネントの中からReactの機能へ接続（Hooks into）することを実現します。Hooksを用いることで、関数コンポーネントにおいてもクラスコンポーネントとほぼ同等の機能を実現することができます。

例えばuseStateというフック（※HooksはすべてuseXXXという命名規則）は関数コンポーネントに状態を持たせることができます。（以下のコードの意味は、まだわからなくて大丈夫です）

```plain text
const Counter = () => {
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(count+1)}>{count}</div>};1234
```

原理的には関数は状態を持てません。ですが、React本体側にコンポーネント専用の変数領域を用意してもらって、その領域にデータを保存しておけば、見かけ上はまるで関数が状態を持っているように見せかけることができると思いませんか？useStateはまさにそれを行っているHooksであり、関数ではなくReact本体側にデータを保存します。

Hooksは他にも多数あります。それらHooksを使うことで、関数コンポーネントをReact本体を接続し、多種多様な機能を実現できます。

## なぜ関数コンポーネントなのか

クラスコンポーネントが全ての機能を実現できているのであれば、関数コンポーネントがそれに近づく意味は何なのでしょう？結局クラスコンポーネントで良いのでは？

実は、クラスコンポーネントはいくつかの問題を抱えていました。最も大きな問題は処理が散らばりやすいことです。クラスコンポーネントでは様々なメソッドを実装することでReactのシステム上に乗ることができました。それはつまりひとつのコンポーネントのひとつの機能が、様々なメソッドの中に散り散りになることを意味しています。そうするとどこに何があるのかわからなくなり、コードをいじるのが難しくなっていきます。バグの元にもなります。

注意深くコードを書けばそうはならないのでしょうが、残念ながら人間という生き物は注意深くありません。

Hooksは違います。ひとつの機能は、ひとつのHooksの中で完結します。「値の読み取りと値の更新」や「ストリームの購読と購読解除」など、関心事を単一のHookの中にまとめてしまっているのが特徴です。

「書けるところに書く」で無秩序に複雑化するクラスコンポーネントに比べ、「ひとつの機能は、ひとつの場所に」を実現する関数コンポーネントとHooksは、まさにReactを救うヒーローとも言えます。

ただし全ての問題がHooksで解決できるわけではありません。時にはクラスコンポーネントでしか解決できない問題もあります。現実においては、使い分けが重要になるでしょう。と言っても通常の使用範囲内ですとHooksで事足りることが多いので、Hooksを学んでみると良いでしょう。

## ここまでのまとめ

- Reactはコンポーネントをうまく管理する
- クラスコンポーネントと関数コンポーネントが存在する
- クラスコンポーネントは高機能で関数コンポーネントは低機能
- 関数コンポーネントを高機能化するのがHooks
- クラスコンポーネントは潜在的問題を抱えている
- 関数コンポーネント+Hooksだと綺麗に書ける

## Hooks紹介

前置きが長くなりました。ここからはReactにおいて標準で使えるHooksをいくつか紹介していきたいと思います。

### useState

useStateフックは、React本体に関数コンポーネント専用の保存領域を作成してもらい、そこにあるデータを読み書きできるフックです。

```plain text
const Counter = () => {
  // 現在のカウントと、カウントを設定する関数をReact本体から貰う
  // 初期値は0
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(count+1)}>{count}</div>};123456
```

useStateの使い方は簡単で、const [value, setValue] = useState(initialValue)と書くだけです。

valueはReact本体から取得した値が入ります。ただし初回だけはReact本体に何も入っていないのでinitialValueが初期値として返ってきます。setValueにはReact本体に値を保存するための関数が入ります。

基本的な使い方は、現在のvalueを参照するのと、setValue(newValue)で新しい値を保存するだけです。

基本的に保存領域は各コンポーネントごとに独立で、例えば上記のCounterを3つ並べても、3つとも独立した値を持ちます。

詳しい動作原理を知りたい方は、「[React HooksのuseStateがどういう原理で実現されてるのかさっぱりわからなかったので調べてみた](https://sbfl.net/blog/2019/02/09/react-hooks-usestate/)」もあわせてご覧ください。

複数の値を扱うときは、複数のuseStateを使います。

```plain text
const Counter = () => {
  const [count, setCount] = useState(0);
  const [isRed, setIsRed] = useState(false);

  return (
    <div
      style={isRed? {color: 'red'} : null}onClick={() => {
        setCount(count+1);
        setIsRed((count+1)%3 === 0);
      }}>
      {count}
    </div>);
};12345678910111213141516
```

より数が多い場合についても同様です。

また、後述しますが、Hooksをif文やfor文の中で使用してはなりません。Hooksは必ず関数の中のトップレベルに位置する必要があります。

useStateは更新関数に値ではなく関数を渡すこともできます。この関数は現在のvalueを受け取り、新しい値を返す関数です。例えばsetCount(count+1)をsetCount((prevCount) => prevCount+1)と書くことができます。この2つに大した違いはありませんが、他のフックと組み合わせる時に効果を発揮します。

### useMemo

useMemoフックは単純に値を保存するためのフックです。useStateと違い、更新関数はありません。例えば「重い計算だけど、何回やっても結果は同じ」値などを保存する使い道が便利です。要はキャッシュですね。

```plain text
const Calculator = () => {
  const calcResult = useMemo(() => expensiveFunc(), []);

  return <div>{calcResult}</div>};12345
```

使い方は簡単で、const myVar = useMemo(func, []);のように使います。funcは関数で、何かしらの値を返します。funcが返した値がmyVarに入ります。例えば const result = useMemo(() => 42, []); ですと、resultには42が入ります。

たったこれだけでReact本体側に値がキャッシュされ、2度目以降のレンダリングではfuncを実行せずにキャッシュから値を取得するようになります。

気になるのが第二引数の配列です。今回は空配列を渡しています。これは「依存関係」を表しており、ここに変数を並べると、いずれかの変数の値が変わった時にfuncを再実行してくれます。空配列を渡すと「何にも依存しないので、未来永劫1回しか実行しません」の意味になります。

例えばprops.idが変わるたびにexpensiveFuncを再実行する場合は以下のように書きます。

```plain text
const Calculator = (props) => {
  const calcResult = useMemo(() => expensiveFunc(props.id), [props.id]);

  return <div>{calcResult}</div>};12345
```

これにより「依存関係が変わらない場合はキャッシュから取ってくる」「依存関係が変わった場合は再実行する」を実現できます。

### useCallback

useCallbackはuseMemoの亜種です。useMemoは何でもキャッシュすることができるので、例えば関数をキャッシュすることができます。ただそれには「関数を返す関数」をuseMemoに渡さねばならず、少々見栄えがよろしくありません。

useCallbackは関数特化のuseMemoで、useMemo(() => func, [])と書かなければいけないところをuseCallback(func, [])まで省略できます。あとはuseMemoと同じです。

使い所としては名前の通りコールバック関数のキャッシュです。関数コンポーネントが実行されるたびにコールバック関数を新しく作っていると、「コンポーネントに新しいコールバック関数が設定された」とReactは認識し、再レンダリングが実行されます。そこでuseCallbackを使ってキャッシュしておけば、「ああ、前と同じ関数ね」ということで再レンダリングを抑制できます。

```plain text
const Button = React.memo((props) => {
  return <button onClick={props.onClick}>Click Me</button>});

const App = () => {
  const onClick = useCallback(() => alert('Hi!'), []);
  return <Button onClick={onClick}/>};12345678
```

注意点としては、コールバック関数が他の状態に依存する場合は依存関係配列に状態変数を追加し、状態が変わったら再生成するようにしましょう。そうしないとコールバック関数の中の変数値が更新されません。

```plain text
const Button = React.memo((props) => {
  return <button onClick={props.onClick}>Click Me</button>});

const App = () => {
  const [count, setCount] = useState(1);
  const onClick = useCallback(() => {
    alert(count);
    setCount(count+1);
  }, [count]);
  
  return <Button onClick={onClick}/>};12345678910111213
```

基本的にコールバック関数はほぼすべてuseCallbackでラップしても問題ないでしょう。あとは依存関係の記述だけ気をつけてください。

また、繰り返しになりますが、Hooksをif文やfor文の中で使わないように注意しましょう。

### useEffect

useEffectはHooksの中でも複雑なフックのひとつです。公式の説明では「副作用を実行するフック」となっています。どういうことでしょう？

useEffectの使い方はuseEffect(func)です。このときfuncはすぐさま実行されず、**コンポーネントのレンダリング後に実行**されます。つまり簡単にいうとuseEffectは「関数の実行タイミングをReactのレンダリング後まで遅らせるフック」ということになります。

```plain text
const Message = () => {
  // ここだとレンダリング前なのでタイミングによっては
  // DOMで要素を取得できない可能性がある
  const elem = document.querySelector('#message');
  console.log(elem); // null

  // useEffectを使うとレンダリング後に実行されるので
  // 確実に取得できる
  useEffect(() => {
    const elem = document.querySelector('#message');
    console.log(elem); // HTMLDivElement
    elem.innerText = 'Hello!'
  });

  return <div id="message"></div>};12345678910111213141516
```

この遅延実行の仕組みが必要になる場面がいくつかあります。一般的に「DOMの操作」「ウェブAPIとの通信」などはuseEffect内で行います。Reactではこれらの操作のことを「作用」あるいは「副作用」と呼んでいます。

DOMの操作はわかりやすいと思います。そもそもレンダリング後でないとDOM上に要素が存在しない（取得しようとするとnullになる）のですから。useEffectを使うことで、確実にDOMレンダリング後に操作を行うことができます。

ウェブAPIとの通信もuseEffectで遅延実行します。基本的に関数コンポーネントの中にはレンダリングに関する処理しか書きません。そうすると非同期通信というのはレンダリングとは関係ない処理になるので、書く場所が存在しません。困った。そこでuseEffectです。useEffectは遅延実行という事実の他に「関数コンポーネントの外に処理を追い出す」という隠れた意味を持ちます。

```plain text
const Message = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/api/v1/messages/864458')
        .then((response) => response.json())
        .then((json) => setMessage(json.content));
  });

  return <div id="message">{content}</div>};1234567891011
```

useEffectにはもうひとつの機能が存在します。useEffectでは「クリーンアップ関数」を登録できます。そもそもuseEffectはレンダリングのたびに呼ばれます。なので副作用の中でイベントリスナの登録やタイマーのセットをしていると、何重にも副作用が走ることになります。そこで「クリーンアップ関数」をreturnすることで、2度目以降のレンダリング時に前回の副作用を消してしまうことができます。

```plain text
const Timer = () => {
  const [time, setTime] = useState(0);

  // クリーンアップ関数を登録（return）する
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date().getTime()), 1000);
    return () => clearInterval(timerId);
  });

  return <div>{time}</div>};1234567891011
```

上の例ですと、クリーンアップ関数でclearIntervalしています。なぜならレンダリングのたびにsetIntervalが登録されるから、クリーンアップしないと多重にタイマーが実行される羽目になるからです。タイマーはひとつでよいので、2度目以降のレンダリング時には、前のタイマーをクリアしています。

このようにuseEffectにreturnで関数を登録してやることで、自動でクリーンアップしてくれるようになります。

また、useEffectも依存関係配列をサポートしています。レンダリングごとではなく、依存関係が更新された時のみ副作用を実行することができるようになります。例えば空配列を渡せば初回レンダリング時だけ実行することができます。

```plain text
const Timer = () => {
  const [time, setTime] = useState(0);

  // 依存関係を[]にして、一度しか実行されないようにする
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date().getTime()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return <div>{time}</div>};1234567891011
```

このときクリーンアップ関数が不要なように思えますが、見落としがちなのですが「コンポーネントが消えたとき」にもクリーンアップが必要です。1度しか実行しない場合でもクリーンアップしてないと、コンポーネントが消えた後でも副作用が残り続けてしまいます。気をつけましょう。

### useLayoutEffect

useLayoutEffectはuseEffectの亜種です。機能としては同じで、遅延実行、クリーンアップ、依存関係配列を持ちます。

違いは実行タイミングです。useEffectが「レンダリングが完全に完了した後」に実行されるのに対して、useLayoutEffectは「DOMに要素が追加され、ブラウザが表示する直前」に実行されます。

また、useLayoutEffectはレンダリングをブロックします。あまり重い処理を書くとレンダリングが遅れますので、注意しましょう。

使用する場面はほとんど存在せず、useEffectで十分です。使用場面をあえて挙げるなら、私も例をひねり出すのに苦労したのですが、例えば以下のような場合です：

```plain text
const Randomizer = () => {
  const [value, setValue] = useState(123);

  // 描画前に同期的に実行される
  useLayoutEffect(() => {
    setValue(Math.random());
  }, [])

  return <div>{value}</div>};12345678910
```

例としては少々苦しいですが、この場合、初期値は123ですが、何かしらの副作用があって更新されます。ここでuseEffectを使うと、「123をレンダリング→useEffect→新しい値をレンダリング」となりますが、useLayoutEffectを使うと「useLayoutEffect→新しい値をレンダリング」という順番となり、一瞬だけ初期値123が表示されるのを防ぐことができます。

### useRef

useRefはuseStateの参照版です。useRefを使うことでReact本体側に値を保存できますが、オブジェクトでラップされます。

useRefの主な用途はDOMへの参照です。JSXのrefプロパティにuseRefで作成した参照を渡してやることで、DOMへ簡単にアクセスできるようになります。

```plain text
const Message = () => {
  const divRef = useRef(null);

  useEffect(() => {
    // ref.currentで現在の参照の値を取得できる
    // ここではdiv要素のDOM
    divRef.current.innerText = 'Hello!';
  }, []);

  // refに渡しておく
  return <div ref={divRef}></div>};123456789101112
```

上記のように、const ref = useRef(initialValue)で参照を作り、ref.currentで現在値を取得できます。

useRefは汎用的なので一応DOM取得以外にも使えるのですが、基本的にはこの用途のみになるでしょう。

## Hooksを使う上で絶対に守ること

Hooksにはひとつのルールがあります。

**コンポーネントの中で呼び出されるHooksはいつなんどきでも必ず同じ順番で同じ回数呼び出されること！**

簡単にいうとつまりifやforの中にHooksを入れて「場合によってHooksの順番や実行回数が変わる」ことを禁止しています。また、早期returnによる実行回数のズレにも注意です。

基本的には関数コンポーネントのトップレベルかつ最上部にHooksを書き並べておけば大丈夫でしょう。