---
Created: 2022-07-05T15:41:00
URL: https://susisu.hatenablog.com/entry/2022/01/16/003954
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[1514192977160361.bin]]

React アプリケーションにおいて single source of truth と言った場合, 複数の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)で同じ値が必要なときは, それぞれの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)で独立に状態を管理して互いに同期をとるのではなく, ただ一つの場所で状態を管理し, 全ての[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)はそれを参照すべき, という設計のプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスとして説明されます.

> There should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the top-down data flow.
> [https://reactjs.org/docs/lifting-state-up.html#lessons-learned](https://reactjs.org/docs/lifting-state-up.html#lessons-learned)

このプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスは状態をどう管理すべきかという視点に立ったもので, 実際これを守らないと各[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の状態の同期のために余計なコストがかかり, とても簡単にコードを機能不全に陥らせることができます.

このようにして単一の場所で状態を管理するところまでは良いのですが, そういった状態がしばしば[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ツリーの外側に配置されるためか, 一つの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)が一つの状態を複数の経路で参照してしまうという現象が見られます. このような設計をしてしまった場合, single source of truth が守られなかった場合ほど深刻な問題にはなりにくいものの, 不必要な複雑さを招いてしまう可能性があります.

## 例

### 1. Props が単一の経路となっている場合

まずは素朴に, [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ツリーに従った props のバケツリレーのみを使っている場合を考えます.

```plain text
function Counter(props: {
  count: number;
  increment: () => void;
}): React.ReactElement {
  const { count, increment } = props;
  return (
    <p>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => {
          increment();
        }}
      >
        +
      </button>
    </p>
  );
}

```

`Counter` [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)は, props という単一の経路から, 状態への参照 (読み書き) である `count` と `increment` を受け取っています.

この[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)は, 親[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)が整合性を持った `count` と `increment` のペアを渡すことを要求します. とはいえ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のインターフェース (props) からこの要求を読み取ることはさほど難しいことではないでしょう.

この場合については (追加の文脈がなければ) 特に挙げられるような設計上の問題はなさそうです.

### 2. Hook が単一の経路となっている場合

続いて, 例えば `useContext` や Recoil などを用いて, [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ツリーによらずに (props のバケツリレーから解放されて) 状態を参照できるような場合を考えます.

```plain text
declare function useGlobalCount(): {
  count: number;
  increment: () => void;
};

function Counter(): React.ReactElement {
  const { count, increment } = useGlobalCount();
  return (
    <p>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => {
          increment();
        }}
      >
        +
      </button>
    </p>
  );
}

```

この例でも, `Counter` [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)は, `useGlobalCount` という単一の経路から, 状態への参照である `count` と `increment` を受け取っています. そしてやはり設計上に特に問題は見られません.

### 3. Props と Hook の両方の経路が使われている場合

同じく[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ツリーによらない状態の参照を行う場合ですが, props と組み合わせるとどうでしょうか?

```plain text
declare function useGlobalCount(): {
  count: number;
  increment: () => void;
};

function Counter(props: { count: number }): React.ReactElement {
  const { count } = props;
  const { increment } = useGlobalCount();
  return (
    <p>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => {
          increment();
        }}
      >
        +
      </button>
    </p>
  );
}

```

`Counter` [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)は props と hook の二つの経路から, それぞれ状態への参照である `count` と `increment` を取得しています. こういった実装は, 最初は `count` の表示だけを行なっていた[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に対し, 後から `increment` を行う機能が追加された場合などに, 不注意によって生まれてしまうことがあります. 何度も見たことがあります. 何度も...

この[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)が正しく動作するためには, 親[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)が `useGlobalCount` を使って取得した `count` を, そのままこの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に渡すことが要求されます.

ところがこの要求は[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のインターフェースを見ただけではわからず, 具体的な実装やコメントなどの周辺的な情報まで立ち入って初めて読み取れることです. そのため, [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の利用者 (親[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の実装者) はそのことを理解するために余計な手間を強いられることになります.

さらに場合によっては親[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)やそのまた親[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)も `count` を props の一つとして受け取っており, この見えない要求はそういった先祖まで伝播してしまうことがあります. こうなると[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の利用者は疑心暗鬼になり, 任意の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に対してどういった props を渡すべきかを知るために全ての子孫[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の実装を読み解くことになるか, あるいは面倒になって開発をやめてしまうでしょう.

このような[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の要求に伴う複雑さは, 同等の機能を持つ先の 2 つの例では全く存在しなかったことで, 本来不要なもののはずです. 状態への参照は props のみ, または hooks のみのように, 必ず経路を単一にすることで問題を回避しましょう.

最初に書いたような, [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に後から実装を追加するような場合には, 要求が満たされた状態から開始するため, 要求が増えたこと自体意識されないこともあるのかもしれません. しかし上記の通り, このようにして増えた要求はコードの理解の妨げになったり, あるいは理解しないまま変更することで将来的な不具合につながってしまう可能性が高いため, 十分に注意を払う必要があります.

## まとめ

状態は単一の経路を使って参照しよう.

ところでたまたま React のコードで見かけたので React を使って説明しましたがこれはあくまで例で, こういった話は (single source of truth も含めて) Web フロントエンド, [GUI](http://d.hatena.ne.jp/keyword/GUI) アプリケーションといったものにも限らない, ごく一般的なプログラミングのプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスのはずです. 一般化大好き.