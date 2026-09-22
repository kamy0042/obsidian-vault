---
URL: https://qiita.com/hystking/items/2a082ee86dc0b66793cb
Created: 2020-12-31T17:13:00
Updated: 2020-12-31T17:13:00
Tags: [topic/技術/React]
---
よく来たな。おれは毎日すごい量のコードを書いているが、誰にも読ませる気はない。しかし今回はReact hooks という真の男のためのAPIを発見したのでいてもたってもいられずQIITAに記事を書くことにした。

（この記事の文体は、逆噴射聡一郎先生のパロディです。）

## [**おまえはReact hooksを知っているか**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E3%81%8A%E3%81%BE%E3%81%88%E3%81%AFreact-hooks%E3%82%92%E7%9F%A5%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B)

[お前は毎日VUEだとかREACTだとかPWAだとかBBBFFだとかそういう流行に常に振り回されながらフロントエンドというメキシコを生きている。フロントエンドで生まれてくる技術のほとんどは、マッチの火より儚くすぐ消えてなくなるものだ。しかし、流行に乗り遅れるのを恐れているおまえはそういった技術にとびつき、チュートリアルをよみ、すべてを理解したと息巻いてプロダクトに導入し・・・やがてそれの流行がおわり・・・メンテをするのが辛くなり・・・しぬ。フロントエンド界隈ではへなちょこな技術がもてはやされ、しばらく経ってそれが全く使い物にならないとわかり、また別のライブラリとか変なビルドツールが流行るということが往々にしてあるが、中にはPURE GOLDOのような真の男のための技術がある。それがReact Hooksだ。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E3%81%8A%E3%81%BE%E3%81%88%E3%81%AFreact-hooks%E3%82%92%E7%9F%A5%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B)

## [**React Hooksとはなにか**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#react-hooks%E3%81%A8%E3%81%AF%E3%81%AA%E3%81%AB%E3%81%8B)

[React HooksはReactのFunctional ComponentでStateや副作用を使えるようにすることを目的としたAPIだ。従来Class ComponentやクソったれなHoCでしかできなかったことを可能にする。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#react-hooks%E3%81%A8%E3%81%AF%E3%81%AA%E3%81%AB%E3%81%8B)

[`const Counter = () => {
  const [ count, updateCount ] = useState(0);
  return <div>{count}</div>;
}
`](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#react-hooks%E3%81%A8%E3%81%AF%E3%81%AA%E3%81%AB%E3%81%8B)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#react-hooks%E3%81%A8%E3%81%AF%E3%81%AA%E3%81%AB%E3%81%8B)[これはhooksの一つであるuseStateだ。このコードにはupdateCountを呼び出す箇所がないが、呼び出すとcountが更新されCounterのエレメントが再描画される。しかし、真の男をめざすフロントエンドエンジニアのおまえは思うだろう「thisも引数もなしにどうやってこんな機能を実現していんだ？できるはずがない！！これはペテンです！！」しかしこのコードは実際に動く。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#react-hooks%E3%81%A8%E3%81%AF%E3%81%AA%E3%81%AB%E3%81%8B)

## [**仕組みをしれ**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)

[hooksに限らないがどんなライブラリでも基本的な仕組みを知ることは大事だ。async-awaitとGeneratorの関係とか、reducerの仕組みとか・・・。べつにゼロから実装できる必要はない。しかしその仕組みのESSENSUだけは抑えておく必要がある。そうするとお前は基本的な傾向・・・どういうことをすると遅くなるとか、なんでそういう制約があるかとかそういうのの理解がすごく早くなる。だから俺はhooksの仕組みを説明する。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[おれはもったいぶって説明したりするのが苦手だから、即座に答えを書く。Hooksは裏で配列をもち、それを順番に呼び出している。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)

[`const hooksArray = [];
let hooksIterator;

const render = (Counter) => {
  // これはreactのrenderとは別物だがイメージだ
  hooksIterator = 0;
  return <Counter></Counter>;
}

const Counter = () => {
  const [ count, updateCount ] = useState(0);
  return <div>{count}</div>;
}

const useState = (initialValue) {
  const hooksIndex = hooksIterator++;

  if(hooksArray[hooksIndex] == null) {
    // 初期値を設定する
    hooksArray[hooksIndex] = initialValue;
  }

  return [
    hooksArray[hooksIndex],
    (nextValue) => { hooksArray[hooksIndex] = nextValue },
  ];
};
`](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[先に断っておくがおれはこのコードは実行してない。これが完全に正しく動く保証はないし、reactのチームはこれの100倍ぐらい速くて堅牢なコードを書いている。しかし、概念だけ理解しろ。hooksは裏で用意した配列に頭から順に値をいれていく。次のレンダリングでも同じ順番で呼び出せば、さっき入れた値が返ってくる・・・ただそれだけだ。マインクラフトしかやらない小学生でも理解できる仕組みだ。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[配列に入れていくだけだから、当然呼び出す順番や回数がかわると問題が起きる。だからhooksではそうなるような行為](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[**「ifやforのブロックの中での呼び出し」**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[を禁止している。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[**「render以外のタイミングで呼び出す」**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)[のも当然禁止だ。しかしこれらの禁止事項は仕組みからくる当然の要求であり、べつにおまえにいじわるをしてるとかタルサドゥームの罠とかそういうのじゃない。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E3%81%97%E3%82%8C)

## [**一番大事な関数を知れ**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)

[さて、hooksの仕組みを知ったおまえはhooksを使う権利がある。react hooksの公式のウェッブサイトにいくとuseなんとかとかいう関数が10個ぐらいあって、はやくも勉強をしようとするお前の心を折りにくるが、実際にはおまえは大事なやつだけ覚えればいい。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[**useState**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[, ](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[**useEffect**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[ そして](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[**useMemo**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[だ。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[useStateは前項で説明したから省略する。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
useEffectは副作用をひきおこすときに使う、EffectというのはSIDE EFFECT、つまり副作用のことだ。エフェクトというのは別にボタンが光るとか文字が流れるとかそういうVFXだけではない。Componentの返り値に影響しない効果・・・ログをながす・・グローバル変数をかきかえる・・ウェッブAPIから値を取得する・・・canvasの中身を描画する・・・タイマーを設置して時間差でイベントをおこす・・・こういうのは全てエフェクトだ。だからこういうことを起こしたいときは、必ずuseEffectのなかに書く。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)

[`useEffect(() => {
  postCounterAPI(count);
}, [count]);
`](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[コード第2引数はdeps・・依存関係を記述する。配列の中身のどれか一つでも変更があったとき、この副作用は実行される。↑のコードの場合は、countの変更があったときだけ、APIにPOSTするといった具合だ。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[depsは副作用を引き起こす依存関係をを宣言的に記述することができる。宣言的というのは、変更や状態が少ないということだ。動くものが少ないデバイスはタフだ。HDDよりSSDのほうが壊れにくいように・・・おまえがPROのエンジニアなら、プログラムが安定して動くように可動部をすくなくすることにつねに気を配る必要がある。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[つぎにuseMemoだが、これはシンプルだ。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)

[`const countIsEven = useMemo(() => count % 2 == 0, [count]);
`](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[引数で与えた関数はdepsに変更があったときだけ実行され、返り値を返す。depsが同じ場合は、以前計算した結果を返す。おまえはこれをつかって教科書みたいなメモ化戦略をとることができる。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[ほかのhooksはほとんどが糖衣構文みたいなもので、ほかのフックで代用できる。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
たとえばuseCallbackはuseMemoで代用できる。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)

[`useCallback(() => {console.log(count)}, [count]);
// ↑は↓と同じ
useMemo(() => () => {console.log(count)}, [count]);
`](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)[useCallbackをはじめとする他のAPIは、基本的なAPIが手に馴染んできたら、自分で必要なときに調べてつかえばいい。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E4%B8%80%E7%95%AA%E5%A4%A7%E4%BA%8B%E3%81%AA%E9%96%A2%E6%95%B0%E3%82%92%E7%9F%A5%E3%82%8C)

## [**自分だけのHookをてにいれろ**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AEhook%E3%82%92%E3%81%A6%E3%81%AB%E3%81%84%E3%82%8C%E3%82%8D)

[ここからが重要な部分だ。hooksはシンプルでつかいやすいAPIだがべつに同じことはClass Componentで実現できる。おまえはコンストラクタでステートを初期化し…setStateとかで変数を更新すればいい…。むしろオブジェクト思考に毒されたおまえは主語のないhooksに違和感を覚え、使うことを避けすらするだろう。しかしHooksは実際にはClass Componentより柔軟な側面を持っている。これは実例を見るのがはやい。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AEhook%E3%82%92%E3%81%A6%E3%81%AB%E3%81%84%E3%82%8C%E3%82%8D)[
](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AEhook%E3%82%92%E3%81%A6%E3%81%AB%E3%81%84%E3%82%8C%E3%82%8D)[おまえはウェブアプリを実装しているが、ユーザーステータスを定期的にAPIからひろってきて、更新する必要がある。APIはSSEとかWebsocketとかそういうハイカラなつくりはしてないから、何秒かごとにポーリングするとしよう。Class Componentで実装するとこんな感じだろう。コードがややこしくなるからエラーハンドリングとかunmout後の処理とかは書いてない。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AEhook%E3%82%92%E3%81%A6%E3%81%AB%E3%81%84%E3%82%8C%E3%82%8D)

[`class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userStatus: 'loading' };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      fetchUserStatus().then(userStatus => {
        this.setState({ userStatus });
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>{this.state.userStatus}</div>
    );
  }
}`](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AEhook%E3%82%92%E3%81%A6%E3%81%AB%E3%81%84%E3%82%8C%E3%82%8D)

[これは実際うまく機能するが、問題はこの機能を使い回すときにある。Class Componentを使い回す方法としては、継承とかミックスインがあるが、いくつか問題を抱えている。また、もっと高尚なやりかたとしてHoCとかがあるが、これもややこしいし、おれやお前よりずっとこの問題について考えてきた](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AEhook%E3%82%92%E3%81%A6%E3%81%AB%E3%81%84%E3%82%8C%E3%82%8D)[recomposeの作者がもうhooksで十分といっている](https://github.com/acdlite/recompose#a-note-from-the-author-acdlite-oct-25-2018)。このへんの詳しい説明は[この記事](https://scrapbox.io/mizdra/React_%E5%89%AF%E4%BD%9C%E7%94%A8%E5%88%86%E5%89%B2%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3)がわかりやすい。

対するhooksはこうだ。

`const UserStatus = () => {
  const [ userStatus, updateUserStatus] = useState('loading');

  useEffect(() => {
    let timer = setInterval(() => {
      fetchUserStatus().then(userStatus => {
        updateUserState(userStatus);
      });
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>{userStatus}</div>
  );
};`

さて、この機能を使い回すときはどうするのか？答えは**「そのまま括りだす」**だ。

`const useUserStatus = () => {
  const [ userStatus, updateUserStatus] = useState('loading');

  useEffect(() => {
    let timer = setInterval(() => {
      fetchUserStatus().then(userStatus => {
        updateUserState(userStatus);
      });
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return [ userStatus ];
}

const UserStatus = () => {
  const [ userStatus ] = useUserStatus();

  return (
    <div>{userStatus}</div>
  );
};`

ちょっとまて？こんなやりかたで大丈夫なのか？おまえは訝しむかもしれないが、これでいい。なぜならhooksは、ただ配列に値を入れて順番に呼び出してるだけだからだ。順番さえ変わらなければ関数で括るとかしても全く問題ない。そして括った関数はuseなんとかという名前をつける（これは慣習だ）。クラスコンポーネントを使った場合と比べて、かなりすっきりしているだろう？しかも、これはただの関数だから、へんな高階コンポーネントとか生成したりしない。これは純粋なロジックの使いまわしだし、おまえはルールさえ守ればこれをどこで呼んでも何回呼んでもかまわない。

このカスタムフックは、ただ呼び出すだけで機能する。おまえはこの関数をギフハブで得意げに公開してもいいし、おまえだけのGUNとしてハードディスクにこっそりと忍ばせておいてもいい・・・。

## [**lintを忘れるな**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#lint%E3%82%92%E5%BF%98%E3%82%8C%E3%82%8B%E3%81%AA)

[ここまで読んだお前は今にでもhooksを使いたくなっているだろう。しかし少し待て。hooksのルールはシンプルだが実際機械でない人間がやるとミスがたくさん起きる。ついifのなかでuseEffectを呼んだり、useMemoの依存関係を書き忘れたりする・・・。そういった少しのミスでアプリは崩壊し、開発チームはメキシコの荒野へと放り出させれ、ベイブはおまえを見捨てて家を出ていき、おまえは倒れてきたサボテンの下敷きになって死ぬ・・・。そうなる前におまえはlintを入れるべきだ。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#lint%E3%82%92%E5%BF%98%E3%82%8C%E3%82%8B%E3%81%AA)

[reactは公式で](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#lint%E3%82%92%E5%BF%98%E3%82%8C%E3%82%8B%E3%81%AA)[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)というlintプラグインを出しており、これを使うことで、さっき書いたようなミスはすべて洗い出すことができる。これは実際強力で、lintなしでhooksを使うのはまったくおすすめしない。

## [**先人たちが残したHooksをつかえ**](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E5%85%88%E4%BA%BA%E3%81%9F%E3%81%A1%E3%81%8C%E6%AE%8B%E3%81%97%E3%81%9Fhooks%E3%82%92%E3%81%A4%E3%81%8B%E3%81%88)

[これだけ気軽にhooksを作れるのだから、当然既にたくさんのhooksが公開されている。](https://qiita.com/hystking/items/2a082ee86dc0b66793cb#%E5%85%88%E4%BA%BA%E3%81%9F%E3%81%A1%E3%81%8C%E6%AE%8B%E3%81%97%E3%81%9Fhooks%E3%82%92%E3%81%A4%E3%81%8B%E3%81%88)

[awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)

↑のリンクに乗っているようなhooksは、その中でも選りすぐりの真の男たちが作ったhooksだ。おまえはこれらのhooksを使って今までよりずっと早く、堅牢なウェブアプリを構築することができる。まだ足りてないhooksがあると思えば、誰よりもいち早く作って公開し、真の男を目指すこともできる。