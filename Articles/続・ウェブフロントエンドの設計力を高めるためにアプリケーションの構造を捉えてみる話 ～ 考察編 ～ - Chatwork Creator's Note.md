---
Created: 2022-06-09T01:19:00
URL: https://creators-note.chatwork.com/entry/2020/12/25/125112
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
みなさま、お疲れ様です！エンジニア採用広報の高瀬 ([@Guvalif](https://twitter.com/guvalif)) です。

この記事は、[Chatwork Advent Calendar 2020](https://qiita.com/advent-calendar/2020/chatwork) における、24 日目の記事です。

先日、フロントエンド開発部に所属するアーキテクトの火村 ([@eielh](https://twitter.com/eielh)) が、 [ウェブフロントエンドの設計力を高めるためにアプリケーションの構造を捉えてみる話](https://creators-note.chatwork.com/entry/2020/11/06/101118) という記事を執筆しました。 それを受けて、同じくフロントエンド開発部に所属する私が、さらに掘り下げてみる社内公式マサカリ記事 🪓 を執筆してみた次第です 😋

ただし、例にもよって文量が多くなりそうなので、"考察編"，"実装編"，"理論編" の3部作[*1](https://creators-note.chatwork.com/entry/2020/12/25/125112#f-381273d4)に分けようかなと思っています。 というわけでさっそく **考察編** にゴー 🚀

## I. 参考文献のご紹介 & まえがき

まず本題に入る前に、この記事の元となった実装をご紹介します：

こちらは、SwiftUI による宣言的 UI の実装を、関数型プログラミングと圏論の技法をフル活用して、抽象化を施したものです。 しかしながら、初学者にとってもなるべくわかりやすいように、順を追って概念が紹介されています。

この記事は、該当の実装 (およびその周辺) を TypeScript で実現するとどうなるか、考察したものになります 👨‍🏫

ちなみに「長いし難しいし読めるかい！」って方は、V 章と VI 章だけでも参考になるかなーと思ったりしています (ｼﾗﾝｹﾄﾞ)

## II. 状態遷移の抽象化 (StateM Monad)

さて、フロントエンド・エンジニアであれば Redux は顔なじみかと思いますが、 Redux の本質は **状態遷移の純粋関数化 (Reducer)** と、それに伴う **合成容易性** にあると考えています。

というわけで、まずは Reducer と似た StateM と呼ばれる型を定義してみます。 なお、**一般的にはこの構造を State と呼びますが、状態自体の State と表記が紛らわしいのであえて StateM と改名している** ことを注記します：

```plain text
// type で関数の型に別名をつける方法もあるが、interface だと定義が展開されず見やすい

interface Reducer<S, A> {
  (s: S, a: A): S;
}

interface StateM<S, A> {
  (s: S): [ S, A ];
}

```

見比べると、似てはいるものの関数の持つニュアンスは少し異なるように思えますね：

- **Reducer** : 事前状態 `S` とアクション `A` を受け取り、事後状態 `S` を返す
- **StateM** : 事前状態 `S` を受け取り、事後状態 `S` と状態変化に伴う出力 `A` を返す

解釈としては、このようになるでしょうか。

しかしながら、以下のような関数群を考えると、結局これらは等価であると見なせるでしょう：

```plain text
function pure<S, A>(a: A): StateM<S, A> {
  return (s: S) => [ s, a ];
}

function flatMap<S, A, B>(f: (a: A) => StateM<S, B>): (ma: StateM<S, A>) => StateM<S, B> {
  return ma => (s: S) => {
    const [ nextS, a ] = ma(s);

    return f(a)(nextS);
  };
}

type State = number;
type Action = 'increment' | 'decrement';

const reducer = flatMap<State, Action, void>(
  // (a: A) => StateM<S, void> なる型の関数は、ほぼほぼ Reducer であることもわかる
  action => state => {
    switch (action) {
      case 'increment': {
        return [ state + 1, undefined ];
      }

      case 'decrement': {
        return [ state - 1, undefined ];
      }

      default: {
        return [ state, undefined ];
      }
    }
  }
);

console.log(reducer(pure('increment'))(0));

```

- `action <=> pure(action)` が一対一に対応すること
- `State <=> [ State, void ]` が一対一に対応すること

それぞれを考えれば、引数の順番が反転しカリー化[*2](https://creators-note.chatwork.com/entry/2020/12/25/125112#f-766416c3)されてはいるものの：

- `reducer<State, Action> <=> flatMap<State, Action, void>(f)`

に関しても一対一の対応を見ることができますね。

なお、この `pure` と `flatMap` を (ある性質を満たして) 備える構造を **Monad** と呼びます。 (詳細に関しては、"理論編" で明らかにできればと思います 📋)

## III. 状態の保持 & 加工処理の抽象化 (Store Comonad)

[火村の記事](https://creators-note.chatwork.com/entry/2020/11/06/101118#Selector---%E7%8A%B6%E6%85%8B%E3%81%8B%E3%82%89%E5%BF%85%E8%A6%81%E3%81%AA%E5%80%A4%E3%82%92%E6%B1%82%E3%82%81%E3%82%8B) では、ある時点の状態を元に加工を与える **Selector** という抽象化が登場しました。

Selector は状態と一心同体とも見なせるので、Store と呼ばれる型にまとめてみます：

```plain text
interface Store<S, A> {
  state: S;
  selector: (state: S) => A;
}

```

ここで、Store 自体を受け取って、状態の加工を行う関数も定義できます：

```plain text
function extract<S, A>(wa: Store<S, A>): A {
  return wa.selector(wa.state);
}

```

さて、Store には `coflatMap` と呼ばれる関数を考えることができます：

```plain text
function coflatMap<S, A, B>(f: (wa: Store<S, A>) => B): (wa: Store<S, A>) => Store<S, B> {
  return wa => ({
    state: wa.state,
    selector: (state: S) => f({
      state,
      selector: wa.selector,
    }),
  });
}

```

型に現れる引数が冗長[*3](https://creators-note.chatwork.com/entry/2020/12/25/125112#f-8fb1dcae)なので、これを捨象すると：

- **引数** : `Store<S, A> => B` なる、ある種の Selector
- **戻り値** : `Store<S, A> => Store<S, B>` なる、Store 同士の変換関数

となることがわかります。`coflatMap` の興味深いところは、`Store<S, A> => B` を用いて、 **関数合成の枠組みでメソッドチェーンに近いことが実現できる** 点です：

```plain text
// ESNext の Pipeline Operator を早くわが手に … なにとぞ … 😇
function flow<A, B>(fns: Array<(arg: any) => any>): (arg: A) => B {
  return arg => fns.reduce((acc, fn) => fn(acc), arg as any);
}

interface TV {
  volume: number;
  channel: number;
}

const tv: Store<TV, number> = {
  state: {
    volume: 0,
    channel: 0,
  },
  // なお、この selector の構成だと channel は一切変更できません 📺
  selector: state => state.volume,
};

const volumeUp = coflatMap(flow<Store<TV, number>, number>([
  extract,
  x => x + 1,
]));

const volumeDown = coflatMap(flow<Store<TV, number>, number>([
  extract,
  x => x - 1,
]));

const methodChain = flow<Store<TV, number>, Store<TV, number>>([
  volumeUp,
  volumeUp,
  volumeUp,
  volumeDown,
]);

console.log(extract(methodChain(tv)));

```

ちなみに、`console.log` を行う際に `extract` を無くすと、結果は次のとおりです：

```plain text
> console.log(methodChain(tv));

{
  "state": {
    "volume": 0,
    "channel": 0
  }
}

```

つまるところ、`coflatMap` には Store の時間発展 (≒ メソッドチェーン) を行う効果がありながら、 Selector による状態の加工を行わない限り、ある時点の状態が保持されるという性質があるわけですね。

このような背景から、**Store は未来の状態を計算できる** と表現したりもします。

なお、この `extract` と `coflatMap` を (ある性質を満たして) 備える構造を **Comonad** と呼びます。 (詳細に関しては、"理論編" で明らかにできればと思います，Part 2 📋)

## IV. Monad と Comonad の双対性

ここまでで、**StateM (Monad)** および **Store (Comonad)** という2つの抽象化を紹介しましたが、 少しだけこれらの関連性を探ってみましょう。

まず、型に現れる引数は冗長なので捨象した上で、関数の型を比較してみます：

```plain text
pure      : A => StateM<S, A>
extract   : Store<S, A> => A

flatMap   : (A => StateM<S, B>) ~> (StateM<S, A> => StateM<S, B>)
coflatMap : (Store<S, A> => B) ~> (Store<S, A> => Store<S, B>)

```

型引数 `A` と `B` は任意に入れ替えても問題ないので、`=>` を **反転** すれば、相互に同じ見た目の型になることがわかりますね。 ( `~>` は誤植ではなく、意図的に別の記号にしてあります)

このような性質を、圏論では **双対性** と呼びます。

なおかつ、Monad と Comonad の組が **随伴函手** と呼ばれるもので結びつきを持つとき、 `pairing` 演算と呼ばれる、自然な構造の取り出しと変換を行う関数を考えることができます：

```plain text
// StateM と Store の場合の実装例
function pairing<S, A, B, C>(
  ma: StateM<S, A>,
  wb: Store<S, B>,
  f: (a: A, b: B) => C,
): C {
  const [ nextS, a ] = ma(wb.state);
  const b = wb.selector(nextS);

  return f(a, b);
}

```

例にもよって、この詳細に関しては "理論編" で明らかにできればと思います，Part 3 📋

そんな V 章ですが、まずは [火村の記事](https://creators-note.chatwork.com/entry/2020/11/06/101118#State%E3%82%84Effect%E3%82%92%E6%8C%81%E3%81%A4%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88) から **EffectComponent** と呼ばれる抽象化を俯瞰してみましょう：

```plain text
const effectComponent = (): JSX.Element => {
  const [ state, setState ] = useState<State>(initialState);

  const update = (action: Action) => {
    // Action に基づく、State の更新と副作用のハンドリング
  };

  return (
    <>
      <SomeElement onXXX={() => update(someAction)} />
      {state}
    </>
  );
};

```

バッサリとノイズとなる部分を削りきると、このようになるでしょうか 🪓

こうしてみると、副作用を持つコンポーネントは次の要素に分解できると考えられます：

1. コンポーネントに紐づく **State**
2. Action をハンドリングする **Update** 関数，型は `(action: Action) => void`

というわけで、これらは別に外部から注入しても良いと考えれば、EffectComponent は次の関数の型で表現できるでしょう：

```plain text
type EffectComponent<S, A, V> = (state: S, update: (action: A) => void) => V;

```

もはや EffectComponent といいつつ、ただの純粋関数になりましたね 👏

## VI. Update 関数の分解

そんな VI 章ですが (2回目の言及)、ここでは Update 関数の適切な分解を考えてみます。 `(action: Action) => void` という型だけでは、完全にブラックボックスですからね 🪓

```plain text
type Effect          = () => Promise<void>;
type Updater<S, A>   = (action: A) => [ StateM<S, void>, Effect ];
type StateHandler<S> = (_: [ state: StateM<S, void>, effect: Effect ]) => Effect;
type EffectHandler   = (effect: Effect) => void;

```

まず Effect ですが、非同期の概念も取り入れてしれっと戻り値の型を `Promise<void>` に変えてみました。[*4](https://creators-note.chatwork.com/entry/2020/12/25/125112#f-edf6aef5) (ちなみに、社内の人間からの「なんで Effect が必要なん？？ 🤔」という質問に対して、 火村は「雑に言うと型に当てはまらないものを入れるためのゴミ箱です 🗑️」という回答をしたとか、なんとか)

次に Updater ですが、`(action: A) => StateM<S, void>` は Reducer と一対一に対応することを考えれば[*5](https://creators-note.chatwork.com/entry/2020/12/25/125112#f-57a86c22)、 火村の流儀による Updater とも機能は同じであることが言えます。

というわけで、こちらで追加した新しい構造は次の2つです：

- **StateHandler** : StateM を元に、状態の変換を副作用として行う (VII 章に後述)
- **EffectHandler** : Effect を処理することのみに関心を持つ

StateHandler と EffectHandler は一緒にしても良さそうですが、 Effect の処理戦略は差し替え可能な方が、なにかと使い勝手が良いであろうという判断です。

Updater，StateHandler，EffectHandler の3つを合成すれば、 きちんと `(action: Action) => void` という型になることも確認できますね 🎉

```plain text
// Action, State の型はお好きなものをお使いください

// 何もしない Reducer に、即時で console.log する Effect を埋め込んだ Updater に相当
const updater: Updater<State, Action> = action => [
  pure(undefined),
  () => Promise.resolve(console.log("I'm 副作用")),
];

// 何もしない StateHandler
const stateHandler: StateHandler<State> = ([ state, effect ]) => {
  return effect;
};

// Effect を受け取った順番に並列処理する EffectHandler
const effectHandler: EffectHandler = effect => {
  effect().catch(e => console.log(e));
};

// Update を値レベルで構成してみた例，型推論の結果は (action: Action) => void となる
const update = (action: Action) => effectHandler(stateHandler(updater(action)));

```

## VII. Component 全体の Store 化，およびその時間発展

長かった本記事もこちらで終着点です。まずは再度 EffectComponent の型を観察してみましょう：

```plain text
type EffectComponent<S, A, V> = (state: S, update: (action: A) => void) => V;

```

ここで、例にもよって状態 `S` とのバンドルを考えることで、これは Store の構造に落とし込むことができます：

```plain text
type Component<S, A, V> = Store<S, (update: (action: A) => void) => V>;

// きちんと展開して記述すると …
type Component<S, A, V> = {
  state: S;
  // この部分が、カリー化された EffectComponent の型に一致する
  selector: (state: S) => (update: (action: A) => void) => V;
}

```

さて、`coflatMap` に恒等関数 `x => x` を与えることで、`duplicate` と呼ばれる関数を定義できます：

```plain text
function duplicate<S, A>(wa: Store<S, A>): Store<S, Store<S, A>> {
  return coflatMap((x: Store<S, A>) => x)(wa);
}

```

こちら、Store の場合は大しておもしろい効果が無いのですが (ただ単に Store を入れ子にするだけなので)、 Comonad の構成によっては非常におもしろい性質を見ることができます。(後述)

そして、**今回の抽象化で一番大事なパート** はある意味ここなのですが、 上手く型をあわせることで、`pairing` 演算によって Store の時間発展を記述することができます：

```plain text
function select<S, B>(
  ma: StateM<S, void>,
  wb: Store<S, B>,
): Store<S, B> {
  return pairing(ma, duplicate(wb), (_, store) => store);
}

```

ざっくりと挙動を説明すると：

3. `duplicate` により、時間発展において実現可能な Store を列挙する
4. StateM との `pairing` 演算により、Store の時間発展を選択する
5. `(_, store) => store` により、Store のみを抽出し返却する

といった感じです。(ぜひ型推論の結果を追ってみてくださいね 💪)

「ん？`duplicate` にはおもしろい効果は無いって言わんかった？？ 🤔」と思った方は、 [@lotz84_](https://twitter.com/lotz84_) さんによるこちらの記事で、雰囲気を掴んでもらえれば良いと思います：

というわけで、最終的にできあがった抽象化がこちらです：

```plain text
class Renderer<S, A, V> {
  // WIP:
  // this.component の参照変化をトリガーに、React の再レンダリングを呼べれば良い
  constructor(private component: Component<S, A, V>) {}

  // WIP:
  // レンダリング用の JSX 生成には、この関数の戻り値を用いれば良い
  explore(): V {
    const view = extract(this.component);

    return view(flow([
      // WIP:
      // この部分は、火村の考えた純粋関数としての Updater を流用できる
      updater,

      // IMPORTANAT!:
      // StateM を用いて、Store の時間発展を duplicate と pairing 演算によって決定する
      // この部分は、Monad と Comonad が随伴函手による結びつきを持つのであれば、任意に差し替え可能！ 🎉🎉🎉
      ([ state, effect ]) => {
        this.component = select(state, this.component);

        return effect;
      },

      // WIP:
      // この部分は、Effect を処理することのみに関心を持つ
      // ReactiveX などを使うと、さまざまな副作用の処理戦略を柔軟に実装できる
      effectHandler,
    ]));
  }
}

```

この抽象化がいい感じに動作するかは、"実装編" で火村と一緒に ｺﾞﾆｮｺﾞﾆｮ してみたいと思います 💪

## VIII. まとめ

この記事では、[ウェブフロントエンドの設計力を高めるためにアプリケーションの構造を捉えてみる話](https://creators-note.chatwork.com/entry/2020/11/06/101118) をさらに掘り下げるべく、 [Bow Arch](https://arch.bow-swift.io/) をインスパイアして、TypeScript による抽象化を考察しました。

- Reducer は StateM で代用できること
- Selector は Store で代用できること
- EffectComponent とて、純粋関数に変換できること
- Update は、Updater，StateHandler，EffectHandler の関数合成で表せること
- Component 自体も Store の構造を持つこと
- StateM と Store 同士の `pairing` 演算により、Component の時間発展を記述できること

上記それぞれを確認することができました。Monad や Comonad といった高度な抽象化が、 現実の UI に落とし込まれるのを見ると、頭のいい人はいるもんだなーと関心することしきりですね 👏

さて、Web フロントエンドに限らず、Chatwork では「クライアントのアーキテクチャを徹底的に研究したい！」という方を大募集しております：

レビュー依頼をきっかけに、朝から活発にアーキテクチャの議論ができるなど、刺激的な環境かとも思います：

![[20201225105919.png]]

興味をもっていただけたようであれば、ぜひ弊社へ 💪

あ、あとラジオ企画なんぞもやってますので、あわせてよろしくお願いしますー：

**つづく**