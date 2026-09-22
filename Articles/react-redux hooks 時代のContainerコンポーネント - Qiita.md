---
Created: 2021-01-03T00:39:00
URL: https://qiita.com/seya/items/700184c0d4a52bc0d32b
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
先日 react-redux の v7.1 の stable release で hooks に対応したAPIが入り界隈で話題になりましたね。(追加されたAPIの詳しい解説はこちら [https://react-redux.js.org/api/hooks](https://react-redux.js.org/api/hooks))

結構コンポーネント内からお手軽に参照できる感動を伝えている情報が多いのですが(実際私も感動の嵐です)、ここで改めて「なんで Container コンポーネントって必要なんだっけ？」と「hooks APIではどうやって Container コンポーネントを書くのか」を考えていきます。

## なぜ hooks API になった今でも Container コンポーネントが必要なのか

始めにここで言う "Container コンポーネント" は 「Redux の Store から値を注入するためのもの(あとdispatch 関数)」という狭義の意味で語らせてください。

理由としては本来的な Container コンポーネントは上記の役割以外にも Stateful なロジックを Presentational コンポーネントと分離する意味合いも含んでおり、この目的は hooks の登場により Container コンポーネントを用意せずとも解決できる部分が多くなっているため、別のトピックとして扱うべきだなと感じたからです。
(この辺りの話は元祖である Dan 先生の記事をご一読することをオススメします。[https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0))

Viewを持ったコンポーネントから直接 Redux を参照することによってはいくつかデメリットがあり、その原因を一言で言うと「コンポーネントが Redux に依存してしまうから」です。

これにより次のようなデメリットがあります。

### テストやStoryBookなどの単体でコンポーネントの検証がしづらくなる

例えばこんな感じのコンポーネントを作ったとして

`function Hoge(props: Props) {
  const name = useSelector<RootState, string>((state) => state.me.name);

  return <div>{name}</div>
}`

次のように story を作ります。

`stories.add('Hoge', () => <Hoge />)`

もちろんのことこのままだとエラーを出します。参照する Provider がないからです。
単純に表示したいだけなら Provider で挟んであげるだけでOKなんですが

`stories.add('MessageCard', () => (
  <Provider store={store}>
    <Hoge />
  </Provider>
));`

もし、コンポーネント内で参照している `name` を knobs のようなもので弄りたくなるなど、そのコンポーネントの表示を変えたいケースが出た時に面倒なことになります。これは story に限らず単体テストなどを書く時にも同じ煩雑さが発生するでしょう。

### Redux以外のデータソースから渡したい時に辛くなる

例えば先ほどの name を直接コンポーネントの props として渡したくなった場合に、 useSelector で直接参照していると props の受け口がないのでできません。汚らしくやるなら、props に同名の型を定義しておいて、それが存在する場合はそっちを使いそうでない場合は useSelector から、みたいなコードは書けなくもないですが、そんなことやるくらいなら大人しく Container コンポーネント書いてしまった方がいいと思います。

逆に言えばこれらのデメリットがないもしくは許容できる場合は直接参照してしまってもいいかもしれません。全て Container コンポーネント必須にするか、適度に直接参照を許す中庸の道を行くかはチームのさじ加減だと思うので相談して方針を決めましょう。

## hooks APIではどうやって Container コンポーネントを書くのか

hooks API を使う場合には、今まで使っていた connect が使えません。

なので useSelector と useDispatch を使う場合ではどう書くのか、一例ですが書いてみました(※TypeScript前提です)。

`export default function ContainerComponent(props: OwnProps) {
  const dispatch = useDispatch<Action>();

  const name = useSelector<RootState, string>((state) => state.me.name);

  const handleSomeAction = React.useCallback(
    () => {
      dispatch(someAction)
    },
    [dispatch]
  );

  // JSXに一つ一つ書いていくのがめんどくさいので、一つにまとめるのが筋がいい気がしている(完全に個人の趣味です)
  const _props = { name, handleSomeAction, ...ownProps };

  return <SomeComponent {..._props} />;
}`

特に難しいことはないですね、すごい直感的です。見通しは良くなったような…？一つのコンポーネント内に全部書けるのと、 connect のGenericsに渡していた型定義を書く必要がなくなったことが要因な気がします。

個人的には Container コンポーネント書くのであれば connect 使っていた時と比べて劇的な変化というわけではないと言うのが正直な感想ですが。他の hooks を使うケースとか出てきたら嬉しさを感じるかも。

また、やっぱり State と Dispatch は分けて書きたい派の方はこんな感じに分割して書いてみてもいいかもしれません。

`function useStateProps() {
  const hoge = useSelector<RootState, string>((state) => state.me.name);

  return { hoge };
}

function useDispatchProps() {
  const dispatch = useDispatch<Action>();

  const handleSomeAction = React.useCallback(
    () => {
      dispatch(someAction)
    },
    [dispatch]
  );

  return { handleSomeAction };
}

export default function ContainerComponent(props: OwnProps) {
  const _props = { ...useStateProps(), ...useDispatchProps(), ...ownProps };

  return <SomeComponent {..._props} />;
}`