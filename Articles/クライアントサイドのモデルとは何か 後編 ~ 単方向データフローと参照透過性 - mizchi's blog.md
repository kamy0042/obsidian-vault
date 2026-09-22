---
Created: 2021-01-15T20:35:00
URL: https://mizchi.hatenablog.com/entry/2018/05/17/220431
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
前提として、今回の出す例で、「Web フロントエンドで、そこまで複雑な状態を考慮するなんてそもそも間違ってる」という意見があると思う。これに関して、そもそも「SPA というものが、いかに実現可能になったか」という視点の話であり、また、自分の経験上「フロントエンドなんて雑でシンプルでいいでしょ」というものが、複雑な構成を取っていくのを、何度も目にしてきた、という2つの前提がある。

適切な粒度に応じた適切な構成をとるべし、というのは別の話で、今回、対象が複雑なアプリケーションなのは前提とする。

## Flux 以前

先の記事で [ActiveRecord](http://d.hatena.ne.jp/keyword/ActiveRecord) を前提にしたサーバーサイド ORM をクライアントで輸入しようとすると、クライアントでは Storage 層が存在しないので概念的に[インピーダンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%D4%A1%BC%A5%C0%A5%F3%A5%B9)ミスマッチがあり破綻することを述べた。今回は View の構造から逆算して、あるべき「クライアントのモデル」の姿を振り返ることにする。

まず最初に、複雑な Backbone.View でどうなっていたかを説明する。

このブログのような画面を構造を想定する。(Backboneでこういう構造に見覚えがある人がいるのではないだろうか)

```plain text
- Router
  - ItemsController(/items/:id)
    - HeaderView
    - ContentView
      - ItemView
      - CommentListView
        - CommentView
    - FooterView

```

- Router が URL を受け、対応する Controller を発火
- Controller が View を複数生成する
- 各 View は親子構造を持ち、それぞれの View のイベントを受けて通信させる

例えば [iOS](http://d.hatena.ne.jp/keyword/iOS) だとこの 「View を束ねた実体を持たない View」 は ViewController と呼称されるかもしれない。

## 問題

ここで問題になるのが、[ルーター](http://d.hatena.ne.jp/keyword/%A5%EB%A1%BC%A5%BF%A1%BC)から伝搬された初期値を元に、View の親子関係の間に「状態」が発生する。それらはイベントドリブンに個別に更新される。

ツリー構造の状態の様々な関係の「隙間」に「状態」が生まれていく。しかも、この状態の発生パターンは一意に決まらない。発生しがちでいて複雑なパターンの一つが、何かの配列を元にしたリストビューで、動的に伸びたり縮んだり入れ替える必要がある。

結果として、[トップダウン](http://d.hatena.ne.jp/keyword/%A5%C8%A5%C3%A5%D7%A5%C0%A5%A6%A5%F3)に読み下した時に、どこに状態が埋もれているかが、どの状態とどの状態がイベントを通して通信しているかが、非常に不明瞭になる。また、ツリー構造に応じて、[再帰](http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2)的に[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)を捨てるコードを書く必要があったり、メモリ管理がシビアになる。([フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)によっては[再帰](http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2)的に dispose してくれるが…)

後期 Backbone (と勝手に自分が呼称している) Marionette.js や Chaplin.js は、これらの構造を比較的わかりやすく助けてくれるヘルパが用意されていて、自分はそれらを使っていたが、やはり大規模なパターンでは破綻しがちだった。

ここで何が問題だったか。思うに、サーバーサイド [MVC](http://d.hatena.ne.jp/keyword/MVC) は View についての[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)用語が貧弱なので、単に View とした際にそれが親子構造をとって、相互に通信する状態まで考慮していない。複雑なケースでそれが破綻を招いた。

これは Flux 以前の様々な [GUI](http://d.hatena.ne.jp/keyword/GUI) [フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)で発生している問題で、ちょっと前だと [Flash](http://d.hatena.ne.jp/keyword/Flash) の Stage のツリーがそうだったし、Vue 1.x 系 がそうだったし、 [Android](http://d.hatena.ne.jp/keyword/Android) や [iOS](http://d.hatena.ne.jp/keyword/iOS) もそうだった。(今は多分 Clean Architecture などである程度解決されているだろう。詳しくないので識者に譲る)

## Flux 以降

問題は、状態が散逸してしまって見通しが悪いことにある。そして通信経路は必ず親を経由する必要があり、複雑な Pub/Sub を構成する。それによってコード上の見通しの悪さや、メモリ管理の難しさが発生する。

じゃあ結局どうなってると良かったか。

よく考えると、いや考えなくてもわかることだが、クライアントのモデル、というのは本質的に今画面を見ている人間に対して必ずシングルトンである。マルチタッチを前提にユーザーが複数いることもあるが、そういうのは例外として考えなくともよい。

理想的にはこうなる、と Flux の発明者は考えたに違いない。

- 状態はViewを抽象するシングルトンである
- 状態を一箇所に集約する
- 状態から常に一意な View を生成する

つまりはツリー構造中にどこで埋もれるかに関わらず、こういう [JSON](http://d.hatena.ne.jp/keyword/JSON) を集約して管理したい。

```plain text
{
  "loginUser": {
    "id": 3,
    "name": "mizchi"
  },
  "item": {
    "title": "About Models",
    "body": "...",
    "comments": [{"name": "foo", "body": "..."}]
  }
}
```

このプレーンな [JSON](http://d.hatena.ne.jp/keyword/JSON) のような構造体が、本記事における「クライアントのモデル」とは何か、に対する答えになる。クライアントの[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)を抽象する構造体。

で、これを入力値にすると状態を生成する update 関数があれば良い。

```plain text
function update(state) {
  render(RootView, state);
}
```

View におけるイベントは、「その発生箇所に関わらず」この [JSON](http://d.hatena.ne.jp/keyword/JSON) を直接操作するアクションを発行すればいい。

[擬似コード](http://d.hatena.ne.jp/keyword/%B5%BC%BB%F7%A5%B3%A1%BC%A5%C9)だとこう。

```plain text
// アクション発行元
view.onClick(_ => dispatch({ type: "logout" }));

// 受け手
function logout(state) {
  delete state.loginUser;
  return state;
}

// 更新
root.on("logout", () => {
  update(logout(state));
});
```

これがいわゆる Flux の Store - View - Dispatcher 構成となる。

注意してほしいのは、 Dispatcher の責務がややこしく混乱を招きがちだが、実際は `Store -> View -> (...) -> Store -> View -> (...)` というループがあって、View <- Store に逆走できない点だ。これを単方向データフローと呼ぶ。

## なぜ今になって Flux が出てきたのか

たぶん、素直な直感として最初に思い浮かぶのは、「常にルートから生成するとなると、常にすべての[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)を生成するので実行効率が悪いのでは？」という懸念だろう。これはその通りで、これがまさに React 以前に Flux が存在しなかった理由であると思う。

React はルート要素からすべて生成しているように見えて、その実、状態の差分だけを更新する[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)で、仮想 DOM [アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)によってこのフローを実現する下地を用意した。また、Angular は仮想 DOM ではないが、効率のいいデータ[バインディング](http://d.hatena.ne.jp/keyword/%A5%D0%A5%A4%A5%F3%A5%C7%A5%A3%A5%F3%A5%B0)とは、仮想 DOM と実態にそんなに差はないと思っていて、結果として差分適用の手法にすぎない。Vue や mithril, riot は React 以前からある[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)だったが、基本コンセプトとして仮想 DOM を実装していった。[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)にとって差分適用の手法は本質ではない。(ライフサイクルの違いとして表出することはある)

実際、実行効率を無視すれば単方向データフローを実践するのは簡単で、更新があるたびに毎度 document.body.innerHTML を書き換えて[イベントハンドラ](http://d.hatena.ne.jp/keyword/%A5%A4%A5%D9%A5%F3%A5%C8%A5%CF%A5%F3%A5%C9%A5%E9)を更新し直せばよい。

## Store != Model

自分は Store has a Model の関係だと思っている。Store は一方向に流れてくるアクションを捌きつつ、Model(=State) を更新する。

サーバサイドにおける Storage や他の[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデルは、Store がその更新時に参照しうるリソースの一つにすぎない、というのが自分の見解で、Store はその仲立ちをするだけである。

正確を期すと サーバーサイドへのアクセスは、 Store の中の処理ではない。Dispatcher が アクションを生成する処理(ActionCreator) の[トランザクション](http://d.hatena.ne.jp/keyword/%A5%C8%A5%E9%A5%F3%A5%B6%A5%AF%A5%B7%A5%E7%A5%F3)の中で参照しうる IO が、いわゆるサーバーサイドの[ビジネスロジック](http://d.hatena.ne.jp/keyword/%A5%D3%A5%B8%A5%CD%A5%B9%A5%ED%A5%B8%A5%C3%A5%AF)の参照、という解釈になる。

## 関数型との奇妙な一致

正確には、親子間で埋もれる「状態」はある。ただし親が子の状態を参照する手段はない。これによって state の用途は著しく制限される。基本的に、Dispatcher を通じてアクションの副作用を一周させるしか親に変更を伝える手段がない。

```plain text
// 閉じた状態の例
class Counter extends React.component {
  state = { counter: 0 };
  render() {
    return <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>+1</button>;
  }
}
```

「状態は埋もれているが、ルートから参照できない」ことによって、そのスコープに閉じたマイクロマネジメントは個々の Component に任せつつ、シングルトンな本質的な Store にロジックが集中することになるのが、Flux の本質であると思う。

ここまで、あえて Redux の話をしなかったが、Redux は単なる「状態管理を関数で表現する」の方法論であって、Flux の本質ではない。とはいえ理解を薦める助けにはなる。

Redux の Reducer というのは、とても単純な思想で、 `(State, Action) => State` という型で表現される関数でこの状態遷移を表現しよう、というアプローチである。

```plain text
const initialState = {
  counter: 0
};
const counter = (state = initialState, action) => {
  switch (action.type) {
    case "increment": {
      return { counter: state.counter + 1 };
    }
    default: {
      return state;
    }
  }
};
```

この返り値が、クライアントの現在の状態を示すモデルとなる。

正確に言うとこの関数合成のヘルパなどがあるが、State の型さえ守っていれば関数の実装はどうでもよい。型の扱いがセンシティブなので TypeScript や Flow の需要が増えた、という側面はある。ちなみに作者の Dan Abramov 曰く redux のインスパイア元は elm。

状態が関数を通して変化する、というのが、関数型的な参照透過性の考え方と相性が良く、[関数プログラミング](http://d.hatena.ne.jp/keyword/%B4%D8%BF%F4%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0)的アプローチが React/Redux で主流になった、と自分は理解をしている。(ここを掘り下げようとしたが力尽きた)

(自分が個人的に嫌いなのは Redux Middleware で、それはこの外の話で、今回はしない)

## まとめ

状態が各 View の隙間に散逸するのが [GUI](http://d.hatena.ne.jp/keyword/GUI) の[アンチパターン](http://d.hatena.ne.jp/keyword/%A5%A2%A5%F3%A5%C1%A5%D1%A5%BF%A1%BC%A5%F3)の一つで、それを仮想 DOM の関数型的なアトミック性と、「メッセージの伝達が親方向へ逆走しない」という単方向データフローによって解決した。

クライアントのモデル、とは画面抽象であって、サーバーサイドのモデルを [API](http://d.hatena.ne.jp/keyword/API) 等の IO を通して参照するが、サーバーサイドの [MVC](http://d.hatena.ne.jp/keyword/MVC) におけるモデルと同一ではないし、同じに考えてはいけない。

React は Web の為に発明された手法だったが、[Facebook](http://d.hatena.ne.jp/keyword/Facebook) はこれをあらゆるプラットフォームに適用する可能性を見出し、その結果 ReactNative や ReactVR などが生まれることになった。自前のブラウザエンジンを持たない [Facebook](http://d.hatena.ne.jp/keyword/Facebook) らしいポジション取りだと思う。