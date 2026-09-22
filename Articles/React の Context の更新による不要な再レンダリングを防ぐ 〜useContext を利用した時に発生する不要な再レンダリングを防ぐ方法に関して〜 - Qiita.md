---
Updated: 2021-01-02T17:44:00
URL: https://qiita.com/soarflat/items/b154adc768bb2d71af21
Created: 2020-12-31T16:43:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
[@soarflat](https://qiita.com/soarflat)

2020年12月28日に更新



# **React の Context の更新による不要な再レンダリングを防ぐ 〜useContext を利用した時に発生する不要な再レンダリングを防ぐ方法に関して〜**

[React](https://qiita.com/tags/react)[react-hooks](https://qiita.com/tags/react-hooks)

## [**はじめに**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)

[React（v16.12.0） の Context の更新による不要な再レンダリングを防ぐ方法についての備忘録です。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[`useContext`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[フックなどで利用する Context のデメリットとして](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[**「Context を更新したら、その Context を利用しているコンポーネントがすべて再レンダリングされてしまう」**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[ということが記載されている時がありますが、](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[**関数コンポーネントであれば再レンダリングを防げます**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[（クラスコンポーネントでもできるかも）。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[ということで、この記事は関数コンポーネントを対象としています。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[また、デモは CodeSandbox 上に置いてあります。編集して動作を確認してみると理解が深まると思います。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)

## [**useContext を利用する上で、理解しておく必要がある概念（用語）**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)

[• ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)[Context（コンテキスト）](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)[
• ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)[Context オブジェクト](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)[
• ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)[Provider（プロバイダ）](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)[
• ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)[Consumer（コンシューマ）](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usecontext-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E4%B8%8A%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E6%A6%82%E5%BF%B5%E7%94%A8%E8%AA%9E)

### [**Context（コンテキスト）**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)

[文脈によって意味合いが異なるが、React に関しては以下のいずれかを指していることが多い。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)[
1. ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)[Props を利用せずに様々な階層のコンポーネントに値を共有する React の仕組みや API のこと](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)[
2. ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)[Context オブジェクトのこと](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)[
3. ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)[Context オブジェクトの値のこと](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)[「1.」の意味の場合、「React Context」、「React Context API」や「Context API」などと記載されていることもある。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)

### [**「Context を利用する」とは**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)

[前述の「1.」の意味の「Context を利用する」という表現を、より具体的な表現にすると以下の通り。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)[
• ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)[「Context という React の仕組み（API）を利用して、Props を利用せずに様々な階層のコンポーネントに値を渡せるようにする」](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)[
• ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)[「](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)[`React.createContext`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)[で Context オブジェクトと Provider を定義し、](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)[`useContext`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)[で Consumer を定義して、Props を利用せずに様々な階層のコンポーネントに値を渡せるようにする」](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%81%AF)

### [**Context オブジェクト**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)

[`React.createContext`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)[という React の API（メソッド）の戻り値。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)[Context オブジェクトと](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)[`useContext`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)[を利用することで、Props を利用せずに様々な階層のコンポーネントに値を渡せる（関数コンポーネントの場合）。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#context-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)

### [**Provider（プロバイダ）**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)

[Consumer に値を共有するコンポーネントのこと。Context オブジェクトが保持している。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[「Provider コンポーネント」と記載されていることもある。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[以下の場合、](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[`MyContext.Provider`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[コンポーネントが Provider に当たる。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)

[`import React, { createContext } from "react";

const MyContext = createContext();

export default function App() {
  const name = "soarflat";

  return <MyContext.Provider value={name}></MyContext.Provider>;
}
`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[`value`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[プロパティの値が Context オブジェクトが保持している値であり、](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[`useContext`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)[を利用することで、この値を取得できる。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80)

### [**Consumer（コンシューマ）**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)

[`useContext`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[などを利用して Context オブジェクトから値を取得するコンポーネントのこと。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[「Consumer コンポーネント」と記載されていることもある。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[以下の場合、](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[`Child1`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[コンポーネントが Consumer に当たる。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)

[`import React, { createContext, useContext } from "react";

const MyContext = createContext();

// Consumer
function Child1() {
  const name = useContext(MyContext);

  return <h1>{name}</h1>;
}

// Consumer ではない
function Child2() {
  return <h2>Not Consumer</h2>;
}

export default function App() {
  const name = "Consumer";

  return (
    <MyContext.Provider value={name}>
      <Child1 />
      <Child2 />
    </MyContext.Provider>
  );
}
`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[`Child2`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)[コンポーネントは Context オブジェクトから値を取得していないので、Consumer ではない。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#consumer%E3%82%B3%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%9E)

## [**Provider 内のすべての Consumer は、Provider の**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider-%E5%86%85%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE-consumer-%E3%81%AFprovider-%E3%81%AEvalue%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E5%BA%A6%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[`**value**`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider-%E5%86%85%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE-consumer-%E3%81%AFprovider-%E3%81%AEvalue%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E5%BA%A6%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[**プロパティが更新される度に再レンダリングされる**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider-%E5%86%85%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE-consumer-%E3%81%AFprovider-%E3%81%AEvalue%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E5%BA%A6%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)

[以下は Context（Context オブジェクトの値）の更新が原因で、不要な再レンダリングが発生しているデモ。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider-%E5%86%85%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE-consumer-%E3%81%AFprovider-%E3%81%AEvalue%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E5%BA%A6%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider-%E5%86%85%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE-consumer-%E3%81%AFprovider-%E3%81%AEvalue%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E5%BA%A6%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[Provider 内のすべての Consumer は、Provider の](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider-%E5%86%85%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE-consumer-%E3%81%AFprovider-%E3%81%AEvalue%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E5%BA%A6%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[`value`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider-%E5%86%85%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE-consumer-%E3%81%AFprovider-%E3%81%AEvalue%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E5%BA%A6%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[プロパティ(Context オブジェクトの値)が更新される度に再レンダリングされる。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#provider-%E5%86%85%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE-consumer-%E3%81%AFprovider-%E3%81%AEvalue%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E5%BA%A6%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)

[デモを見る](https://codesandbox.io/s/extra-rerenders-with-react-context-uq55o)

`import React, { createContext, useContext, useReducer } from "react";

const CountContext = createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const value = {
    state,
    dispatch
  };

  return (
    // value（state か dispatch のどちらか）が更新したら、
    // CountContext.Provider 内のすべての Consumer が再レンダリングされる。
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function Count() {
  console.log("render Count");
  // CountContext からは state のみを取得しているが、
  // dispatch が更新されても再レンダリングされる
  const { state } = useContext(CountContext);

  return <h1>{state.count}</h1>;
}

function Counter() {
  console.log("render Counter");
  // CountContext からは dispatch のみを取得しているが、
  // state が更新されても再レンダリングされる
  const { dispatch } = useContext(CountContext);

  return (
    <>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

export default function App() {
  return (
    <CountProvider>
      <Count />
      <Counter />
    </CountProvider>
  );
}`

`Counter`コンポーネントが取得している`dispatch`は更新されることはないが、`state`が更新される度に`Counter`コンポーネントも再レンダリングされてしまう。

上記のデモは特に問題ないが、以下の場合、パフォーマンスの問題を引き起こす可能性がある。

- 不要に再レンダリングされる Consumer の数が多い
- 不要に再レンダリングされる Consumer や、その Consumer の子コンポーネントのレンダリングコストが高い

## [**Context（Context オブジェクトの値）の更新による不要な再レンダリングを防ぐ方法**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)

[Context の更新による不要な再レンダリングを防ぐ方法は以下の３つ。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)[
1. ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)[Context（Context オブジェクト）を分割する](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)[
2. ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)[`React.memo`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)[を利用する](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)[
3. ](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)[`useMemo`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)[を利用する](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E5%80%A4%E3%81%AE%E6%9B%B4%E6%96%B0%E3%81%AB%E3%82%88%E3%82%8B%E4%B8%8D%E8%A6%81%E3%81%AA%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E9%98%B2%E3%81%90%E6%96%B9%E6%B3%95)

### [**Context（Context オブジェクト）を分割する**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E5%88%86%E5%89%B2%E3%81%99%E3%82%8B)

[以下は Context を分割して不要な再レンダリングを防いでいるデモ。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#contextcontext-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E5%88%86%E5%89%B2%E3%81%99%E3%82%8B)

[デモを見る](https://codesandbox.io/s/split-contexts-snjbs)

`import React, { createContext, useContext, useReducer } from "react";

const CountStateContext = createContext();
const CountDispatchContext = createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  // CountStateContext.Provider の value が更新したら、
  // CountStateContext の値を取得している全ての Consumer が再レンダリングされる。
  // CountDispatchContext.Provider の value が更新したら、
  // CountDispatchContext の値を取得している全ての Consumer が再レンダリングされる。
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function Count() {
  console.log("render Count");
  // state と dispatch を保持する Context オブジェクトが異なるので、
  // dispatch が更新されてもこのコンポーネントは再レンダリングされない。
  const state = useContext(CountStateContext);

  return <h1>{state.count}</h1>;
}

function Counter() {
  console.log("render Counter");
  // state と dispatch を保持する Context オブジェクトが異なるので、
  // state が更新されてもこのコンポーネントは再レンダリングされない。
  const dispatch = useContext(CountDispatchContext);

  return (
    <>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

export default function App() {
  return (
    <CountProvider>
      <Count />
      <Counter />
    </CountProvider>
  );
}`

`state`と`dispatch`を保持する Context を分割したので、`state`を更新しても`Counter`コンポーネントは再レンダリングされない。

何らかの理由で Context を分割できない場合、後述の`React.memo`か`useMemo`を利用した方法で再レンダリングを防ぐ。

### [**React.memo を利用する**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[以下のデモは](https://qiita.com/soarflat/items/b154adc768bb2d71af21#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`React.memo`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[を利用して不要な再レンダリングを防いでいるデモ。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[デモを見る](https://codesandbox.io/s/using-reactmemo-mm36x?file=%2Fsrc%2FApp.js)

`import React, { createContext, useContext, useReducer } from "react";

const CountContext = createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const value = {
    state,
    dispatch
  };

  return (
    // value（state か dispatch のどちらか）が更新したら、
    // CountContext.Provider 内のすべての Consumer が再レンダリングされる。
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function Count() {
  console.log("render Count");
  // CountContext からは state のみを取得しているが、
  // dispatch が更新されても再レンダリングされる
  const { state } = useContext(CountContext);

  return <h1>{state.count}</h1>;
}

function Counter() {
  console.log("render Counter");
  // CountContext からは dispatch のみを取得しているが、
  // state が更新されても再レンダリングされる
  const { dispatch } = useContext(CountContext);

  // CountContext.Provider の value の更新による Counter コンポーネントの
  // 再レンダリングは避けられない。そのため、このコンポーネントは CountContext から値を
  // 取得するだけにして、メモ化したコンポーネントに取得した dispatch を渡すようにする。
  return <DispatchButton dispatch={dispatch} />;
}

// dispatch を Props として受け取るコンポーネントをメモ化し、不要な再レンダリングを防ぐ
const DispatchButton = React.memo(({ dispatch }) => {
  console.log("render DispatchButton");

  return (
    <>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
});

export default function App() {
  return (
    <CountProvider>
      <Count />
      <Counter />
    </CountProvider>
  );
}`

Context を分割していないため、`state`を更新しても`Counter`コンポーネントは再レンダリングされる。

そのため、`Counter`コンポーネントは`CountContext`の値を取得するだけにする。

そして、`CountContext`の値を利用するコンポーネント（`DispatchButton`）を切り出し、`React.memo`でメモ化する。

このようにすれば、`state`を更新しても`DispatchButton`コンポーネントは再レンダリングされない。

### [**useMemo を利用する**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[以下のデモは](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`useMemo`](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[を利用して不要な再レンダリングを防いでいるデモ。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[デモを見る](https://codesandbox.io/s/using-use-memo-mb1jp?file=%2Fsrc%2FApp.js)

`import React, { createContext, useContext, useReducer, useMemo } from "react";

const CountContext = createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const value = {
    state,
    dispatch
  };

  return (
    // value（state か dispatch のどちらか）が更新したら、
    // CountContext.Provider 内のすべての Consumer が再レンダリングされる。
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function Count() {
  console.log("render Count");
  // CountContext からは state のみを取得しているが、
  // dispatch が更新されても再レンダリングされる
  const { state } = useContext(CountContext);

  return <h1>{state.count}</h1>;
}

function Counter() {
  console.log("render Counter");
  // CountContext からは dispatch のみを取得しているが、
  // state が更新されても再レンダリングされる
  const { dispatch } = useContext(CountContext);

  // CountContext.Provider の value の更新による Counter コンポーネントの
  // 再レンダリングは避けられない。そのため dispatch を利用するレンダリング結果（計算結果）を
  // メモ化し、不要な再レンダリングを防ぐ。
  return useMemo(() => {
    console.log("rerender Counter");
    return (
      <>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </>
    );
  }, [dispatch]);
}

export default function App() {
  return (
    <CountProvider>
      <Count />
      <Counter />
    </CountProvider>
  );
}`

Context を分割していないため、`state`を更新しても`Counter`コンポーネントは再レンダリングされる。

そのため、`useMemo`で`CountContext`の値を利用するレンダリング結果をメモ化する。

このようにすれば、`state`を更新して`Counter`コンポーネントが再レンダリングされた時は、メモ化されたレンダリング結果を返す。

結果として、`state`を更新しても不要な再レンダリングは発生しない。

## [**終わり**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E7%B5%82%E3%82%8F%E3%82%8A)

[Context は便利な API ですが、使い方によってはパフォーマンスの問題を引き起こす可能性があります。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E7%B5%82%E3%82%8F%E3%82%8A)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E7%B5%82%E3%82%8F%E3%82%8A)[そのため、再レンダリングが発生する条件と、再レンダリングを防ぐ方法を理解した上で利用しましょう。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E7%B5%82%E3%82%8F%E3%82%8A)[
](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E7%B5%82%E3%82%8F%E3%82%8A)[本記事以外にも React に関連する記事を書いておりますので、興味があればそちらもどうぞ。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E7%B5%82%E3%82%8F%E3%82%8A)

- [React.memo / useCallback / useMemo の使い方、使い所を理解してパフォーマンス最適化をする](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2)

## [**参考**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E5%8F%82%E8%80%83)

- [Preventing rerenders with React.memo and useContext hook. #15156](https://github.com/facebook/react/issues/15156#issuecomment-474590693)

## [**お知らせ**](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B)

[Udemy で webpack の講座を公開したり、Zenn や Kindle で技術書を出版しています。](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B)

[Udemy:](https://qiita.com/soarflat/items/b154adc768bb2d71af21#%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B)[webpack 最速入門](https://www.udemy.com/course/practical-webpack/?couponCode=ADC884F22BC2EA8DEE8D)（~~**10,800 円**~~** -> 2,400 円**）

Zenn:[React Hooks 入門](https://zenn.dev/soarflat/books/de65ce62f4c2a76f8a8d)（500 円）

Kindle（Kindle Unlimited だったら無料）:[React 実践入門](https://www.amazon.co.jp/dp/B088ZMFPFV/)（800 円）

興味を持ってくださった方はご購入いただけると大変嬉しいです。よろしくお願いいたします。

[**編集リクエスト**](https://qiita.com/drafts/b154adc768bb2d71af21/edit)

[**84**](https://qiita.com/soarflat/items/b154adc768bb2d71af21/likers)





[**@soarflat**](https://qiita.com/soarflat)

フロントエンドエンジニア。Udemy で webpack の講座を公開しています。https://www.udemy.com/course/practical-webpack/?couponCode=ADC884F22BC2EA8DEE8D

**ユーザー登録して、Qiitaをもっと便利に使ってみませんか。****
1. ****あなたにマッチした記事をお届けします****ユーザーやタグをフォローすることで、あなたが興味を持つ技術分野の情報をまとめてキャッチアップできます****便利な情報をあとで効率的に読み返せます****気に入った記事を「ストック」することで、あとからすぐに検索できます**[****](https://help.qiita.com/ja/articles/qiita-login-user)[**より詳しく**](https://help.qiita.com/ja/articles/qiita-login-user)[登録する](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fsoarflat%2Fitems%2Fb154adc768bb2d71af21&realm=qiita)[ログインする](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fsoarflat%2Fitems%2Fb154adc768bb2d71af21&realm=qiita)

[**WiMAX 2+**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=Vegrf_4o-6J8_x2AzFoqT_Sik4vupOgGHsp3bimP5YTTqXeo-tCD7_9oR2YwWLf5MCW3Dq-I6Xioe4lZPKr0Nl8bCDgaj7o8aOHS8etBCTddD8GJ3pKyZoUgTArzCVA6JT4ffnJyHtJf5TReWNWzappkOGYAf0hnsXnZCi5BzhTaPNKNQa5ZyY7iiQHTT6sIFfc0mH7XjoLH4HlT7uzTHH8psdhXg4-wFv7QSJN_naJOllmp5kVXzVUQZH0zzxpFxva8z_2-ZmfExOVoYJD2q9aeJ8-UKtdR4dqO7AMRiySV5D6eHPMJSKBf0zasq98ABlBK6aAvduV-Zm1Q-MhbucFRQ8Ubk_-mMilChmj49fR5eCRb2FrgUXztl54CnzUM9zqZIXPQa5zZcyyEImb_vPr4-qIf2f4D2TlVRVEpLph6KcKzxTLv2kycLGjvcIWQOJeHosg49ux5nEVtlp9yJWvZQe7NlQj0iKjI1da3xfSRe5ah&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[ギガ放題プランも月3,380円！1年間ずっと月額3,380円で人気端末W06が使える！おト…](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=Vegrf_4o-6J8_x2AzFoqT_Sik4vupOgGHsp3bimP5YTTqXeo-tCD7_9oR2YwWLf5MCW3Dq-I6Xioe4lZPKr0Nl8bCDgaj7o8aOHS8etBCTddD8GJ3pKyZoUgTArzCVA6JT4ffnJyHtJf5TReWNWzappkOGYAf0hnsXnZCi5BzhTaPNKNQa5ZyY7iiQHTT6sIFfc0mH7XjoLH4HlT7uzTHH8psdhXg4-wFv7QSJN_naJOllmp5kVXzVUQZH0zzxpFxva8z_2-ZmfExOVoYJD2q9aeJ8-UKtdR4dqO7AMRiySV5D6eHPMJSKBf0zasq98ABlBK6aAvduV-Zm1Q-MhbucFRQ8Ubk_-mMilChmj49fR5eCRb2FrgUXztl54CnzUM9zqZIXPQa5zZcyyEImb_vPr4-qIf2f4D2TlVRVEpLph6KcKzxTLv2kycLGjvcIWQOJeHosg49ux5nEVtlp9yJWvZQe7NlQj0iKjI1da3xfSRe5ah&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[**3,380円(税抜価格)**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=Vegrf_4o-6J8_x2AzFoqT_Sik4vupOgGHsp3bimP5YTTqXeo-tCD7_9oR2YwWLf5MCW3Dq-I6Xioe4lZPKr0Nl8bCDgaj7o8aOHS8etBCTddD8GJ3pKyZoUgTArzCVA6JT4ffnJyHtJf5TReWNWzappkOGYAf0hnsXnZCi5BzhTaPNKNQa5ZyY7iiQHTT6sIFfc0mH7XjoLH4HlT7uzTHH8psdhXg4-wFv7QSJN_naJOllmp5kVXzVUQZH0zzxpFxva8z_2-ZmfExOVoYJD2q9aeJ8-UKtdR4dqO7AMRiySV5D6eHPMJSKBf0zasq98ABlBK6aAvduV-Zm1Q-MhbucFRQ8Ubk_-mMilChmj49fR5eCRb2FrgUXztl54CnzUM9zqZIXPQa5zZcyyEImb_vPr4-qIf2f4D2TlVRVEpLph6KcKzxTLv2kycLGjvcIWQOJeHosg49ux5nEVtlp9yJWvZQe7NlQj0iKjI1da3xfSRe5ah&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[**詳しく見る**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=Vegrf_4o-6J8_x2AzFoqT_Sik4vupOgGHsp3bimP5YTTqXeo-tCD7_9oR2YwWLf5MCW3Dq-I6Xioe4lZPKr0Nl8bCDgaj7o8aOHS8etBCTddD8GJ3pKyZoUgTArzCVA6JT4ffnJyHtJf5TReWNWzappkOGYAf0hnsXnZCi5BzhTaPNKNQa5ZyY7iiQHTT6sIFfc0mH7XjoLH4HlT7uzTHH8psdhXg4-wFv7QSJN_naJOllmp5kVXzVUQZH0zzxpFxva8z_2-ZmfExOVoYJD2q9aeJ8-UKtdR4dqO7AMRiySV5D6eHPMJSKBf0zasq98ABlBK6aAvduV-Zm1Q-MhbucFRQ8Ubk_-mMilChmj49fR5eCRb2FrgUXztl54CnzUM9zqZIXPQa5zZcyyEImb_vPr4-qIf2f4D2TlVRVEpLph6KcKzxTLv2kycLGjvcIWQOJeHosg49ux5nEVtlp9yJWvZQe7NlQj0iKjI1da3xfSRe5ah&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)