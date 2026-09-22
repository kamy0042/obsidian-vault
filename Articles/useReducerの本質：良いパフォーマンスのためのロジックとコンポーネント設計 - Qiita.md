---
Updated: 2021-01-02T17:44:00
URL: https://qiita.com/uhyo/items/cea1bd157453a85feebf
Created: 2020-12-31T16:39:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
[@uhyo](https://qiita.com/uhyo)

2020年01月21日に更新



# **useReducerの本質：良いパフォーマンスのためのロジックとコンポーネント設計**

[JavaScript](https://qiita.com/tags/javascript)[React](https://qiita.com/tags/react)

React Hooksの正式リリース（2019年2月）からそろそろ一年が経とうとしています。Hooksの登場によってReactのコンポーネントは関数コンポーネントが一気に主流になり、クラスコンポーネントが新規に作られる機会は激減しました。

また、React 17.x系ではConcurrent Modeの導入とともに[さらに2種類の新フック](https://qiita.com/uhyo/items/6be96c278c71b0ddb39b)が追加される見込みであり、いよいよ関数コンポーネントの能力がクラスコンポーネントを真に上回る時代が来ることになります。

この記事では、フックの一種である**useReducer**に焦点を当てて、どのようなときに`useReducer`が適しているのかを説明します。究極的には、useReducerによって達成できるパフォーマンス改善があり、ときにはそれがコンポーネント設計にまで影響を与えることを指摘します。

useStateの影に隠れたり、なぜかReduxと比較されたりといまいちぱっとしないuseReducerですが、この記事でその真の魅力を知っていただければ幸いです。

## [**まとめ**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)

[• ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[は、ステートに依存するロジックをステートに非依存な関数オブジェクト（](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[）で表現することができる点が本質である。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[このことは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[によるパフォーマンス改善につながる。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[
• ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)[を活かすには、ステートを一つにまとめることで、ロジックをなるべくreducerに詰め込む。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81)

## [**背景: **](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`**useReducer**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[**とは**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)

[まずは、初心者の方向けに](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[の動作を説明します。すでに知っているという方は次の節まで飛ばしても構いません。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[はフックの一種であり、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[**関数コンポーネントのステートを宣言する**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[能力を持ちます。ステートの宣言は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[と](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[の2種類の方法がありますが、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[は複雑なロジックが絡んだステートを宣言するのに適しています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[は以下のように使います。こちらが用意するのは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`reducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[と](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`initialState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[の2つです。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`reducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[は「現在のステート」と「アクション」を受け取って「新しいステート」を返す関数であり、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`initialState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[はステートの初期値です。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)

[`const [currentState, dispatch] = useReducer(reducer, initialState);
`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[の返り値は2つで、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`currentState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[はステートの現在の値、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[はアクションを発火する関数です。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[にアクションを渡すと、内部で](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`reducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[が呼び出されて新しいステートが計算され、コンポーネントが再レンダリングされて新しいステートが反映されます。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[一応簡単な例を示しておきます。まずは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`reducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[の例です。分かりやすさのためにTypeScriptを用いています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)

[`type State = {
  count: number
};

type Action = {
  type: "increment" | "decrement";
};

const reducer = (state: State, action: Action): State => {
  if (action.type === "increment") {
    return {
      count: state.count + 1
    };
  } else {
    return {
      count: state.count - 1
    }
  }
};
`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[ここではアクションは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`{ type: "increment" }`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[または](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`{ type: "decrement" }`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[です。見て分かる通り、これはそれぞれ「カウンタを1増やす」操作と「カウンタを1減らす」操作に相当します。このreducerによって管理される](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`State`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`{ count: number }`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[です。つまり、カウンタの数値をひとつ持っているだけのオブジェクトです。この場合](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`type State = number`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[でも別に構いませんが、今後の拡張性を考えてこの定義にしています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[これは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`const [state, dispatch] = useReducer(reducer, { count: 0 })`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[のように使用します。この](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[を用いて、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`dispatch({ type: "increment" })`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[とすればステートが変化してカウンタの値が1増えるでしょう。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[これが](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[の使い方です。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[は、ステートの種類が増えたりロジックが増えたりしてもその操作の窓口が](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[という一点に集約されている点がポイントです。子コンポーネントが何かしらのロジックを発火したいときは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)[をpropsで渡すだけでいいし、コンポーネントツリーが大きい場合はコンテキストを用いて子に伝えるのも有効でしょう。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E8%83%8C%E6%99%AF-usereducer%E3%81%A8%E3%81%AF)

## [`**useReducer**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[**がパフォーマンス改善につながる例**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)

[Reactアプリのパフォーマンス改善において大きな効果が出やすいのは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[の活用です（クラスコンポーネント時代の](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[`shouldComponentUpdate`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[や](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[`PureComponent`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[に相当）。これを活用して](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[**コンポーネントの余計な再レンダリングを避ける**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[ことが、Reactアプリの基本的なパフォーマンス・チューニングです。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[この例では、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[が](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)[の利用の助けになる例を示し、丁寧に解説します。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%8C%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%94%B9%E5%96%84%E3%81%AB%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E4%BE%8B)

### [**初期状態のサンプル**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%88%9D%E6%9C%9F%E7%8A%B6%E6%85%8B%E3%81%AE%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB)

[まず、改善前の初期状態を見てみましょう。以下のCodeSandboxで実際に動作を確かめることができます。初期状態のコードは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%88%9D%E6%9C%9F%E7%8A%B6%E6%85%8B%E3%81%AE%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB)[`App1.tsx`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%88%9D%E6%9C%9F%E7%8A%B6%E6%85%8B%E3%81%AE%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB)[に入っています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%88%9D%E6%9C%9F%E7%8A%B6%E6%85%8B%E3%81%AE%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB)

- [https://codesandbox.io/s/qiita-usereducer-7s2k5](https://codesandbox.io/s/qiita-usereducer-7s2k5)

今回の題材はこの画像のようなものです。

4つの入力欄があり、それぞれに数値を入力することができます。下には4つの数値を合計した値が表示されます。また、入力欄の横にある「check」ボタンを押すと、そのときの数値が合計の何%かを一番下に表示します。画像は「123」の横のボタンを押したあとの状態です。

一見意味不明な例に見えますが、これは実は筆者が実際に業務で経験した例をかなり単純化したものになっています。

この記事にも初期状態のコードを一気に貼り付けます。記事を読みつつコードを見たいという方は適宜CodeSandboxをご活用ください。記事中でも部分ごとに解説していきますから、ここで全部読む必要はありません。

src/App1.tsx

`import React, { useState } from "react";
import { sum } from "./util";
import "./styles.css";

const NumberInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onCheck: () => void;
}> = ({ value, onChange, onCheck }) => {
  return (
    <p>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
      <button onClick={onCheck}>check</button>
    </p>
  );
};

export default function App1() {
  const [values, setValues] = useState(["0", "0", "0", "0"]);
  const [message, setMessage] = useState("");
  return (
    <div className="App">
      {values.map((value, i) => {
        return (
          <NumberInput
            key={i}
            value={value}
            onChange={v =>
              setValues(current => {
                const result = [...current];
                result[i] = v;
                return result;
              })
            }
            onCheck={() => {
              const total = sum(values);
              const ratio = Number(value) / total;
              setMessage(
                `${value}は${total}の${(ratio * 100).toFixed(1)}%です`
              );
            }}
          />
        );
      })}
      <p>合計は{sum(values)}</p>
      <p>{message}</p>
    </div>
  );
}`

### [**コードの解説**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)

[上記のサンプルのコードを少しずつ解説します。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[まず、ひとつの入力欄とボタンのセットが、以下に抜粋する](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[コンポーネントで表現されています。入力状態は親の](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`App1`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[コンポーネントが持つ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`values`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[ステートに保存されており、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[自体はステートを持っていません。現在の値は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`value`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[としてpropsを通じて渡されています。これは、「合計を表示する」といったロジックが親コンポーネントにあることから来る必然的な選択です。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)

[src/App1.tsx（抜粋）](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[

](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`const NumberInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onCheck: () => void;
}> = ({ value, onChange, onCheck }) => {
  return (
    <p>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
      <button onClick={onCheck}>check</button>
    </p>
  );
};
`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[親コンポーネントである](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`App`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[は2つの状態を持ちます。以下に示す](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`values`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[と](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`message`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[です。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)

[src/App1.tsx（抜粋）](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[

](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`  const [values, setValues] = useState(["0", "0", "0", "0"]);
  const [message, setMessage] = useState("");
`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`values`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[は4つの入力欄の内容が配列で入っています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`message`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[は「check」ボタンを押したときに表示されるメッセージを管理するステートです。数値の入力が想定されていますが、ステートを数値にしてしまうとちょっと扱いづらいフォームになるので生の入力状態は文字列で持っています。あるあるですね。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[ステートの更新部分は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[のpropsに渡す関数にベタ書きです。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`onChange`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[が呼び出されたら、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`setValues`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[を呼び出して](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`i`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[番目の値が](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`v`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[に書き換えた新しい配列を用意してステートを更新します。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[も同様に、メッセージを組み立てて](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`setMessage`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[を呼び出します。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)

[src/App1.tsx（抜粋）](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[

](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`onChange={v =>
  setValues(current => {
    const result = [...current];
    result[i] = v;
    return result;
  })
}
onCheck={() => {
  const total = sum(values);
  const ratio = Number(value) / total;
  setMessage(
    `${value}は${total}の${(ratio * 100).toFixed(1)}%です`
  );
}}
`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[以上のコードの問題点は、レンダリングのパフォーマンス最適化が何も考えられていないことです。ひとつの数値が変更されるたびに全ての](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[に再レンダリングが発生してしまいます。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[今回のゴールは、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`**NumberInput**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[**に**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`**React.memo**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[**を適用して無駄な再レンダリングを減らす**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[ことです。特に、ひとつの数値が変更されたらその](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[だけが再レンダリングされて、他の](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[は再レンダリングされないという状態が理想です。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[お察しの通り、最終的には](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)[を用いてこれを達成することになります。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%A7%A3%E8%AA%AC)

### [`**React.memo**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[**導入への努力**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)

[とりあえず、まずは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`useState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[のまま努力してみましょう。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[に](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[を適用して効果を得るためには、他の入力値が変わってもpropsの内容が変化しないようにしなければいけません。現状では](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`value`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[は問題ありませんが、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`onChange`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[と](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[が問題です。あの位置に関数をベタ書きということは、これらのpropsには毎回異なる関数オブジェクトが作られて渡されています。これでは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[は効きません。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)

[こういうときの定石は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`useCallback`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[です。とはいえ、今回はループで](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[を表示しているのでひと工夫必要です。筋のいい方法としては、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[に「自分が何番目か」を表すpropsを渡すという方法があります](https://qiita.com/uhyo/items/cea1bd157453a85feebf#reactmemo%E5%B0%8E%E5%85%A5%E3%81%B8%E3%81%AE%E5%8A%AA%E5%8A%9B)[1](https://qiita.com/uhyo/items/cea1bd157453a85feebf#fn1)。これをコールバックに渡してもらうことで、`onChange`と`onCheck`は全ての`NumberInput`からのコールバックをひとつの関数で対応できます。

以上の工夫を導入して得られたのが、上記のCodeSandboxでいう`App2.tsx`です。全体像を見たいからはCodeSandboxをご覧ください。

- [https://codesandbox.io/s/qiita-usereducer-7s2k5](https://codesandbox.io/s/qiita-usereducer-7s2k5)

ここでは部分ごとに変更点を見ていきます。まず`NumberInput`です。

src/App2.tsx（抜粋）

`const NumberInput: React.FC<{
  value: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onCheck: (index: number) => void;
}> = memo(({ value, index, onChange, onCheck }) => {
  return (
    <p>
      <input
        type="number"
        value={value}
        onChange={e => onChange(index, e.currentTarget.value)}
      />
      <button onClick={() => onCheck(index)}>check</button>
    </p>
  );
});`

`NumberInput`はpropsとして`index`を受け取るようになりました。これが、自身が何番目かを表す数値です。`onChange`と`onCheck`の型も変更され、これらの関数には`index`がオウム返しで渡されるようになっています。先ほども説明した通り、これにより`onChange`と`onCheck`を各`NumberInput`ごとに異なる関数を用意する必要が無くなります。

次に、`App`の変更点を見ます。まずレンダリング部分だけ抜粋すると、こうなりました。

src/App2.tsx（抜粋）

`  return (
    <div className="App">
      {values.map((value, i) => {
        return (
          <NumberInput
            key={i}
            index={i}
            value={value}
            onChange={onChange}
            onCheck={onCheck}
          />
        );
      })}
      <p>合計は{sum(values)}</p>
      <p>{message}</p>
    </div>
  );`

`NumberInput`に渡すpropsに`index`が追加されているのに加え、`onChange`と`onCheck`が事前に用意されるようになりました。次に、これらを用意する部分のコードです。

src/App2.tsx（抜粋）

`export default function App() {
  const [values, setValues] = useState(["0", "0", "0", "0"]);
  const [message, setMessage] = useState("");

  const onChange = useCallback((index: number, value: string) => {
    setValues(values => {
      const newValues = [...values];
      newValues[index] = value;
      return newValues;
    });
  }, []);
  const onCheck = useCallback(
    (index: number) => {
      const total = sum(values);
      const ratio = Number(values[index]) / total;
      setMessage(
        `${values[index]}は${total}の${(ratio * 100).toFixed(1)}%です`
      );
    },
    [values]
  );

  return /* 省略 */
}`

`onChange`と`onCheck`は`useCallback`に囲まれています。それぞれの関数の中身は、`index`を引数で受け取るようになった以外は変わりません。

できることは全部やったように見えますが、**残念ながらこのコードはまだ目的を達成できていません**。`onChange`は`useCallback`により常に同じ関数オブジェクトになっているのでOKですが、`onCheck`が問題です。

`onCheck`は`useCallback`の第二引数が`[values]`となっています。これは、`values`が変わるたびに、すなわち何か入力が変わるたびに、`onCheck`が作りなおされるということを意味します。これにより`NumberInput`に渡される`onCheck`関数が毎回別物になるため、`React.memo`が無意味になっています。

では、なぜ`useCallback`の第二引数が`values`を含んでいなければいけないのでしょうか。それはもちろん、`**onCheck**`**が**`**values**`**に依存している**からです。つまり、`onCheck`が中で「入力値の合計」を求めるために`values`を使用しているのです。`onCheck`のインターフェースが`(index: number) => void`である、すなわち`index`のみを受け取るという関数である以上、`values`というデータについては`onCheck`に内包されていなければいけません。これにより、必然的に`values`が変わるたびに`onCheck`という関数は別物になります。

一方で、`onChange`は`values`に依存していません。これは、`useState`が提供するステート更新関数が、関数によるステートの更新をサポートしているからです。上のコードでは`setValues`関数の引数として「現在の状態を受け取って次の状態を返す関数」を渡しています。この機能により、`onChange`から`values`への依存を消しているのです。

となると、`**onCheck**`**が**`**message**`**というステートを更新するにあたって、それとは別の**`**values**`**というステートに依存していることが問題**だと分かります。これを解消するためには、**2つのステートを合体させて1つのステートにする**必要があります。

このような状況に適しているのが`useReducer`です。ということで、`App`を`useReducer`を用いて書き換えることで問題を解決しましょう。（一応、`useState`を使っていても2つのステートをまとめて問題を解決することはできますが、その状況でわざわざ`useReducer`ではなく`useState`を使う意味は薄いのでここでは考えません。）

### [`**useReducer**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AB%E3%82%88%E3%82%8B%E8%A7%A3%E6%B1%BA)[**による解決**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AB%E3%82%88%E3%82%8B%E8%A7%A3%E6%B1%BA)

[ということで、最終版です。全体像は以下のCodeSandboxの](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AB%E3%82%88%E3%82%8B%E8%A7%A3%E6%B1%BA)[`App3.tsx`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AB%E3%82%88%E3%82%8B%E8%A7%A3%E6%B1%BA)[でご覧ください。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AB%E3%82%88%E3%82%8B%E8%A7%A3%E6%B1%BA)

- [https://codesandbox.io/s/qiita-usereducer-7s2k5](https://codesandbox.io/s/qiita-usereducer-7s2k5)

まず、`useReducer`を使うのでreducerを用意しましょう。今回何気なくTypeScriptを使っているので型定義もちゃんとあります。

src/App3.tsx（抜粋）

`type State = {
  values: string[];
  message: string;
};

type Action =
  | {
      type: "input";
      index: number;
      value: string;
    }
  | {
      type: "check";
      index: number;
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "input": {
      const newValues = [...state.values];
      newValues[action.index] = action.value;
      return {
        ...state,
        values: newValues
      };
    }
    case "check": {
      const total = sum(state.values);
      const ratio = Number(state.values[action.index]) / total;
      return {
        ...state,
        message: `${state.values[action.index]}は${total}の${(
          ratio * 100
        ).toFixed(1)}%です`
      };
    }
  }
};`

型定義を読むと、`State`は`values`と`message`をひとつにまとめたオブジェクトであることが分かります。アクションは`"input"`と`"check"`の2種類があり、それぞれ前回のコードの`onChange`と`onCheck`に相当するロジックが書かれています。

次に`NumberInput`のコードです。

src/App3.tsx（抜粋）

`const NumberInput: React.FC<{
  value: string;
  index: number;
  dispatch: Dispatch<Action>;
}> = memo(({ value, index, dispatch }) => {
  return (
    <p>
      <input
        type="number"
        value={value}
        onChange={e =>
          dispatch({
            type: "input",
            index,
            value: e.currentTarget.value
          })
        }
      />
      <button
        onClick={() =>
          dispatch({
            type: "check",
            index
          })
        }
      >
        check
      </button>
    </p>
  );
});`

propsとして受け取るのは`value`, `index`, `dispatch`になりました。従来の`onChange`と`onCheck`がひとつにまとまっていますね。それ以外は特に変わっていません。

最後に`App`コンポーネントのコードです。ロジックが`reducer`の中に移ったのでこちらはシンプルになりました。

src/App3.tsx（抜粋）

`export default function App() {
  const [{ values, message }, dispatch] = useReducer(reducer, {
    values: ["0", "0", "0", "0"],
    message: ""
  });

  return (
    <div className="App">
      {values.map((value, i) => {
        return (
          <NumberInput key={i} index={i} value={value} dispatch={dispatch} />
        );
      })}
      <p>合計は{sum(values)}</p>
      <p>{message}</p>
    </div>
  );
}`

ステートの宣言は`useReducer`により行われています。従来`onChange`と`onCheck`が担っていたロジックは`reducer`の中に押し込められましたので、ここでは何もせずにただ`NumberInput`に`dispatch`を渡すだけになっています。

前のコードと比べると、ここに本質的なポイントがあります。それは2つのステートがひとつの`useReducer`に押し込められたことにより、「`values`を見て`message`を決める」という計算が「今のステートから次のステートを計算する」という枠組み（reducer）の中に入ったことです。よって、それを呼び出す側である`dispatch`は**ステートに非依存の関数**となりました。`NumberInput`のpropsは`index`, `value`, `dispatch`だけとなり、自分以外の値が変わっても再レンダリングされることは無くなりました。これで目標達成です。

## [**ポイントの整理**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)

[改めてポイントを整理すると、今回の最も重要だったことは「](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[**ステートの更新関数をステートに非依存にする**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[」ということでした。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[の場合は、更新関数（](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[）が非依存であることが保証されています。従来のコード（2番目の例）では](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[という関数がステート（](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`values`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[）に依存している関数だったのでうまくいきませんでした。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[ステートの更新関数をステートに非依存にするには、「](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[**現在のステートを受け取って次のステートを計算する**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[」ということを徹底する必要がありました。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`useState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[の場合は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[**ステート更新関数に関数を渡す**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[のを徹底することになります。つまり](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`setValues(newValues)`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[ではなく](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`setValues(currentValues => {...; return newValues })`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[とするということです。従来のコードでは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`onChange`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[ではこれができていましたが、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[ではできていませんでした。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[これを改善するために今回行なったことは「](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[**2つのステート（**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`**values**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[**と**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`**message**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[**）を1つに合体させる**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[」ということです。これにより、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[でも関数によるステート更新ができるようになりました。実を言えば](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`useState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[でも頑張ればこれは達成できますが、このような複雑なステートを扱うには](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[が適しているのでここでは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[を選択することになります。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[を使う場合はステート更新関数（](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[）は自動的にステートに非依存になります（](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[`reducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)[はそもそも「現在のステートを受け取って次のステートを計算する」というものであるため）。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AE%E6%95%B4%E7%90%86)

## [`**useReducer**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**のすすめ**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)

[このように、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[を用いることで、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**ステート更新関数をステート非依存にする**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[ことを強制できます。実際のアプリ開発においては、アプリが複雑化するにつれて、あるステートと別のステートが関わりを持ち始めるかもしれません。もっと具体的に言えば、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**あるステートを更新するときに別のステートを見る必要が発生する**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[かもしれません。そのときが](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`**useReducer**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**導入のサイン**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[です。ぜひリファクタリングして](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[を導入しましょう。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[なぜ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[が必要なのか、この記事を読んだ皆さんはしっかりと説明できることでしょう。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**ステート更新関数がステートに非依存であることは、**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`**React.memo**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**の活用には必須**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[だからです。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[また、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[と](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[の恩恵を最大限受けるためには、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**できるだけ**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`**reducer**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**にロジックを詰め込む**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[ことが鍵となります。そのためには、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**アプリの状態は何でもステートで表現する**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[ことが重要です。言い換えれば、これは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**手続き的なロジックを書かず、状態は明示的・宣言的に扱う**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[ということです。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[また、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[を活かすためにはそのための](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**コンポーネント設計**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[も重要です。今回の例では多少天下り的でしたが、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`**NumberInput**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**が**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`**index**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[**をpropsで受け取るようにした**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[という点にこれが表れています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[を呼び出して自分の](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`value`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[を更新するためには自分が何番目かを](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[に教える必要があるからです（](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`"input"`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[アクションが](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[`index`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)[を含んでいたことを思い出しましょう）。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#usereducer%E3%81%AE%E3%81%99%E3%81%99%E3%82%81)

## [**副作用はどうするのか？　あとReduxの話**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)

[ところで、今回の例では「check」ボタンを押すと起こることが「別のステートが更新される」でした。なので、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[によってステートをひとつにまとめることで、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[コールバックをステートに非依存にすることができたのでした。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[では、もし「check」ボタンを押すと起こることが何らかの](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[**副作用**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[だったらどうするのでしょうか。例えば、押すとHTTPリクエストが発生するとかです。現時点では、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[**副作用はreducerの中に書くべきではない**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[という原則がありますから、この記事で使った手を使うことはできません。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[残念なことに、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[**現時点では対処法はありません**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[。副作用をどこかのコールバック関数に書いた時点で、その関数がステートに依存することとなり、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[によるパフォーマンス改善の妨げになります。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[実は、これに対する一つの解が](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[**Reduxの使用**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[です。Reduxを用いたステート管理の場合、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[**Reduxミドルウェア**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[の活用によって、ステートに依存する副作用ですら](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[の中に押し込めてステート非依存性を達成できてしまうのです。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[**Reduxの本質はReactのツリーの外でステートを管理してくれること**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[であり、それにより](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[**React本体のみでは困難なステート非依存性が実現**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)[しているのです。Reduxはただステート管理に関する統一的な方法論を与えるだけでなく、このようなパフォーマンス上のメリットもあるということは覚えておいて損はないでしょう。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E5%89%AF%E4%BD%9C%E7%94%A8%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B%E3%81%82%E3%81%A8redux%E3%81%AE%E8%A9%B1)

### [**React 17.x 系の展望**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#react-17x-%E7%B3%BB%E3%81%AE%E5%B1%95%E6%9C%9B)

[しかし、React 17.x系（いわゆる](https://qiita.com/uhyo/items/cea1bd157453a85feebf#react-17x-%E7%B3%BB%E3%81%AE%E5%B1%95%E6%9C%9B)[**Concurrent Mode**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#react-17x-%E7%B3%BB%E3%81%AE%E5%B1%95%E6%9C%9B)[が導入されると期待されています）ではまた情勢が変わると筆者は期待しています。端的に言えば、Concurrent Modeにおいては（主に非同期的な）](https://qiita.com/uhyo/items/cea1bd157453a85feebf#react-17x-%E7%B3%BB%E3%81%AE%E5%B1%95%E6%9C%9B)[**副作用ですらステート内で管理される**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#react-17x-%E7%B3%BB%E3%81%AE%E5%B1%95%E6%9C%9B)[ようになるでしょう。そのための道具がSuspenseです。詳細はそのうち別の記事でお届けしようと思いますが、Concurrent Modeでは副作用とステート管理の概念が大きく様変わりし、Reduxなどに頼らずともパフォーマンス的に最適な副作用の扱いが達成できる場面が増えると予期されます。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#react-17x-%E7%B3%BB%E3%81%AE%E5%B1%95%E6%9C%9B)

## [`**useRef**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[**に関する注意**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)

[ところで、「コールバック関数がステートに依存するのが問題」ということであれば、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`useRef`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[で解決できると思った方も多いでしょう。実際、以下のようにすれば](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[を](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`values`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[に非依存にすることができます。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)

[src/App4_useRef.tsx（抜粋）](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[

](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`  const [values, setValues] = useState(["0", "0", "0", "0"]);
  const [message, setMessage] = useState("");

  const valuesRef = useRef<string[]>([]);
  valuesRef.current = values;

  const onCheck = useCallback((index: number) => {
    const values = valuesRef.current;
    const total = sum(values);
    const ratio = Number(values[index]) / total;
    setMessage(`${values[index]}は${total}の${(ratio * 100).toFixed(1)}%です`);
  }, []);
`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[この例では](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`values`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[の値はつねに](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`valuesRef.current`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[に反映され、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`values`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[を参照するかわりに](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`valuesRef.current`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[を参照するようにしています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`useRef`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[が返す](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`valuesRef`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[は常に同じオブジェクトであることが保証されていますから、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`onCheck`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`valuesRef`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[に依存することはありません。この方法でも](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[を活用するという目的は達成できています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[しかし、筆者はこの方法はお勧めしません。なぜなら、このように](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[`useRef`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[を使うのは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[**React 17.x系でうまく動作しなくなる可能性がある**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[からです。Concurrent Modeにおいては、refへの書き込みはもはや副作用と見なされます。関数コンポーネントの処理中にこのようにrefへの書き込みを行うのは思わぬ動作を引き起こす可能性があるのです（特にレンダリングが中断される場合）。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)

[このことは実は](https://qiita.com/uhyo/items/cea1bd157453a85feebf#useref%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F)[Reactの公式ドキュメント](https://ja.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback)にも明記されています。「将来的にはより使いやすい代替手段を提供することを計画しています」とありますので、React 17.x系ではよりよい別の手段が提供されるかもしれません。

## [**まとめ**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)

[この記事では、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[**コールバック関数がステートに依存する場合に、**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`**React.memo**`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[**の恩恵を受けられない**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[という問題に対して](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[を用いて対処する方法を示しました。ポイントは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[**ステート更新関数をステート非依存にする**](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[ことであり、（](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[でもそれは可能なものの）](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[はそのような書き方に適しています。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[記事冒頭のまとめを再掲しておきます。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[
• ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[は、ステートに依存するロジックをステートに非依存な関数オブジェクト（](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`dispatch`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[）で表現することができる点が本質である。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[
• ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[このことは](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`React.memo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[によるパフォーマンス改善につながる。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[
• ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[を活かすには、ステートを一つにまとめることで、ロジックをなるべくreducerに詰め込む。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[はreducerを用いてステート更新を記述できるものでしたが、reducerの存在価値は単にReduxと同じ書き方ができるというだけではありません。useReducerはこの記事で説明したような本質的な問題を解決するための優れた道具なのです。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[
](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[に比べると使い方がややこしいので尻込みしてしまうかもしれませんが、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useState`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[を多く並べれば並べるほど、いざ必要になったときのリファクタリングが難しくなります。時期を見極めて](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useReducer`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[を導入しましょう。](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)

[1. ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)
2. 
[ややアクロバットな別解として、](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`useMemo`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[を用いて各](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[`NumberInput`](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[用のコールバックを用意するというものもあります。 ](https://qiita.com/uhyo/items/cea1bd157453a85feebf#%E3%81%BE%E3%81%A8%E3%82%81-1)[↩](https://qiita.com/uhyo/items/cea1bd157453a85feebf#fnref1)

[**編集リクエスト**](https://qiita.com/drafts/cea1bd157453a85feebf/edit)

[**364**](https://qiita.com/uhyo/items/cea1bd157453a85feebf/likers)





[**@uhyo**](https://qiita.com/uhyo)

Metcha yowai software engineer

[https://uhy.ooo/](https://uhy.ooo/)

**ユーザー登録して、Qiitaをもっと便利に使ってみませんか。****
1. ****あなたにマッチした記事をお届けします****ユーザーやタグをフォローすることで、あなたが興味を持つ技術分野の情報をまとめてキャッチアップできます****便利な情報をあとで効率的に読み返せます****気に入った記事を「ストック」することで、あとからすぐに検索できます**[****](https://help.qiita.com/ja/articles/qiita-login-user)[**より詳しく**](https://help.qiita.com/ja/articles/qiita-login-user)[登録する](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fuhyo%2Fitems%2Fcea1bd157453a85feebf&realm=qiita)[ログインする](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fuhyo%2Fitems%2Fcea1bd157453a85feebf&realm=qiita)

[**WiMAX 2+**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=2_lrIf4o-6J8_x2AzFoqT_Sik4uKxJUlUBiLPRJOKCWQO1Z8dBpRYTnYCqFqGp-45qrpj6Yx9H0UnIrNS590tj_8o1_QjzenYqbsP7Isp1-kZ7AoEpa_xDs4ecRWJdOA_fNC2CEUHcD3g3F_br1pEkNX6kLysL_aEGcFX2nfzSyXm_vegdnCQ5d0_tHSGpwcULtzg9M98IMNeZSbCUMQ9NzWOaATsGeEYMu-LnY2HtCcFMiVR4AymGDsBAELpUx3FSIPk5stMncAigPchVqPr5iuc1dLqmrse5-MxVYIdBlXSB3rd6guCIdWxDuGFcZdZ-T7sj0lseptKLbtGoslM1mQm_o_H2tj9Z6zSnrlzSdC1-fX2ZegxsP3zNjpsvwfbyEBOsVTRqr8fRHAQN7OZucrEFI2iVEZVVDrRNrlP3JQjdrgzbrT1-VZxbc68NctNCu4mc1OYq6NrqrZrpoyZmS4sPtcsEyzr3Qe-IcmutZ-LRRI&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[ギガ放題プランも月3,380円！1年間ずっと月額3,380円で人気端末W06が使える！…](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=2_lrIf4o-6J8_x2AzFoqT_Sik4uKxJUlUBiLPRJOKCWQO1Z8dBpRYTnYCqFqGp-45qrpj6Yx9H0UnIrNS590tj_8o1_QjzenYqbsP7Isp1-kZ7AoEpa_xDs4ecRWJdOA_fNC2CEUHcD3g3F_br1pEkNX6kLysL_aEGcFX2nfzSyXm_vegdnCQ5d0_tHSGpwcULtzg9M98IMNeZSbCUMQ9NzWOaATsGeEYMu-LnY2HtCcFMiVR4AymGDsBAELpUx3FSIPk5stMncAigPchVqPr5iuc1dLqmrse5-MxVYIdBlXSB3rd6guCIdWxDuGFcZdZ-T7sj0lseptKLbtGoslM1mQm_o_H2tj9Z6zSnrlzSdC1-fX2ZegxsP3zNjpsvwfbyEBOsVTRqr8fRHAQN7OZucrEFI2iVEZVVDrRNrlP3JQjdrgzbrT1-VZxbc68NctNCu4mc1OYq6NrqrZrpoyZmS4sPtcsEyzr3Qe-IcmutZ-LRRI&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[**3,380円(税抜価格)**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=2_lrIf4o-6J8_x2AzFoqT_Sik4uKxJUlUBiLPRJOKCWQO1Z8dBpRYTnYCqFqGp-45qrpj6Yx9H0UnIrNS590tj_8o1_QjzenYqbsP7Isp1-kZ7AoEpa_xDs4ecRWJdOA_fNC2CEUHcD3g3F_br1pEkNX6kLysL_aEGcFX2nfzSyXm_vegdnCQ5d0_tHSGpwcULtzg9M98IMNeZSbCUMQ9NzWOaATsGeEYMu-LnY2HtCcFMiVR4AymGDsBAELpUx3FSIPk5stMncAigPchVqPr5iuc1dLqmrse5-MxVYIdBlXSB3rd6guCIdWxDuGFcZdZ-T7sj0lseptKLbtGoslM1mQm_o_H2tj9Z6zSnrlzSdC1-fX2ZegxsP3zNjpsvwfbyEBOsVTRqr8fRHAQN7OZucrEFI2iVEZVVDrRNrlP3JQjdrgzbrT1-VZxbc68NctNCu4mc1OYq6NrqrZrpoyZmS4sPtcsEyzr3Qe-IcmutZ-LRRI&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)

[**コミュファ光**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=JkGttf4o-6J8_x2AzFoqT_Sik4vJpSg5IZr_Op8gIHvb7Mp-QRzRw_d3_GPfUsixV2dxIw2QCb0IR1sncTA2CMtIG8zz6ErWltKL_Tzsjo9l0ugYsOZUZBixU-n0A-r0rE2RpRZzcFjcxYLUneBnNrbi4Ra3cmcebiGIZ7QAOTwQSeaR7BUGul-6ua11RzBP8jGVrEm_zPE07j8uZJM8hO-WD-9rkaKPVFYN2sG7OnMG6SYmU6j_hMndj2-9LcZbuGeYg9FPf5gXY9XalH8MlGBH8N4jvbF6LiL1LrL_xuVqTodlKwgIFtTTQZJH2y7S8h7h-wKsZ_4WafT9hPgXX52-qQUxqzmWmxIP8EPGPY0XUt5EDXxumArlAqBiScA5akkhQFO0INwdU7Lt-8KmQt4jJHDr5LXXteSdBVWuIcopt4juOD3loWtOOALmuD8k6PiUsOQG75XJ6AMOSP2MWlCwTJ5zWPky7VwKlD3NQ3MI9tKt&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fhikari%2Fcommufa%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_ACCM%26argument%3DRQq2zPub%26dmai%3D08CMh_crto_rt_b)[東海地方にお住まいならコミュファ光がダンゼンおトク！3年…](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=JkGttf4o-6J8_x2AzFoqT_Sik4vJpSg5IZr_Op8gIHvb7Mp-QRzRw_d3_GPfUsixV2dxIw2QCb0IR1sncTA2CMtIG8zz6ErWltKL_Tzsjo9l0ugYsOZUZBixU-n0A-r0rE2RpRZzcFjcxYLUneBnNrbi4Ra3cmcebiGIZ7QAOTwQSeaR7BUGul-6ua11RzBP8jGVrEm_zPE07j8uZJM8hO-WD-9rkaKPVFYN2sG7OnMG6SYmU6j_hMndj2-9LcZbuGeYg9FPf5gXY9XalH8MlGBH8N4jvbF6LiL1LrL_xuVqTodlKwgIFtTTQZJH2y7S8h7h-wKsZ_4WafT9hPgXX52-qQUxqzmWmxIP8EPGPY0XUt5EDXxumArlAqBiScA5akkhQFO0INwdU7Lt-8KmQt4jJHDr5LXXteSdBVWuIcopt4juOD3loWtOOALmuD8k6PiUsOQG75XJ6AMOSP2MWlCwTJ5zWPky7VwKlD3NQ3MI9tKt&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fhikari%2Fcommufa%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_ACCM%26argument%3DRQq2zPub%26dmai%3D08CMh_crto_rt_b)[**3,880円(税抜価格)**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=JkGttf4o-6J8_x2AzFoqT_Sik4vJpSg5IZr_Op8gIHvb7Mp-QRzRw_d3_GPfUsixV2dxIw2QCb0IR1sncTA2CMtIG8zz6ErWltKL_Tzsjo9l0ugYsOZUZBixU-n0A-r0rE2RpRZzcFjcxYLUneBnNrbi4Ra3cmcebiGIZ7QAOTwQSeaR7BUGul-6ua11RzBP8jGVrEm_zPE07j8uZJM8hO-WD-9rkaKPVFYN2sG7OnMG6SYmU6j_hMndj2-9LcZbuGeYg9FPf5gXY9XalH8MlGBH8N4jvbF6LiL1LrL_xuVqTodlKwgIFtTTQZJH2y7S8h7h-wKsZ_4WafT9hPgXX52-qQUxqzmWmxIP8EPGPY0XUt5EDXxumArlAqBiScA5akkhQFO0INwdU7Lt-8KmQt4jJHDr5LXXteSdBVWuIcopt4juOD3loWtOOALmuD8k6PiUsOQG75XJ6AMOSP2MWlCwTJ5zWPky7VwKlD3NQ3MI9tKt&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fhikari%2Fcommufa%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_ACCM%26argument%3DRQq2zPub%26dmai%3D08CMh_crto_rt_b)