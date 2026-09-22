---
Updated: 2021-01-02T17:44:00
URL: https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2
Created: 2020-12-31T16:57:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
[@soarflat](https://qiita.com/soarflat)

2020年12月28日に更新



# **React.memo / useCallback / useMemo の使い方、使い所を理解してパフォーマンス最適化をする**

[JavaScript](https://qiita.com/tags/javascript)[React](https://qiita.com/tags/react)[react-hooks](https://qiita.com/tags/react-hooks)

## [**はじめに**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)

[React（v16.12.0）の](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[の基本的な使い方、使い所に関しての備忘録です。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[「React でのパフォーマンス最適化の手段を知りたい」](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[「なぜ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[を利用するのかわからない」](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[といった人達向けに書いた記事です。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)[デモは CodeSandbox 上に置いてあります。編集して動作を確認してみると理解が深まると思います。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)

### [**本記事で用いている用語**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E6%9C%AC%E8%A8%98%E4%BA%8B%E3%81%A7%E7%94%A8%E3%81%84%E3%81%A6%E3%81%84%E3%82%8B%E7%94%A8%E8%AA%9E)

[• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E6%9C%AC%E8%A8%98%E4%BA%8B%E3%81%A7%E7%94%A8%E3%81%84%E3%81%A6%E3%81%84%E3%82%8B%E7%94%A8%E8%AA%9E)[メモ化](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E6%9C%AC%E8%A8%98%E4%BA%8B%E3%81%A7%E7%94%A8%E3%81%84%E3%81%A6%E3%81%84%E3%82%8B%E7%94%A8%E8%AA%9E)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E6%9C%AC%E8%A8%98%E4%BA%8B%E3%81%A7%E7%94%A8%E3%81%84%E3%81%A6%E3%81%84%E3%82%8B%E7%94%A8%E8%AA%9E)[計算結果](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E6%9C%AC%E8%A8%98%E4%BA%8B%E3%81%A7%E7%94%A8%E3%81%84%E3%81%A6%E3%81%84%E3%82%8B%E7%94%A8%E8%AA%9E)

### [**メモ化**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)

[計算結果を保持し、それを再利用する手法のこと。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[キャッシュのようなものだとイメージすれば良いと思う。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[そのため、以下の言葉の意味は大体同じ。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[「メモ化された値」=「計算結果が保持された値」](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[「メモ化する」=「計算結果を再利用できるように保持する」](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)[メモ化によって都度計算する必要がなくなるため、パフォーマンスの向上が期待できる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%A1%E3%83%A2%E5%8C%96)

### [**計算結果**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E8%A8%88%E7%AE%97%E7%B5%90%E6%9E%9C)

[以下のような計算の結果のこと。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E8%A8%88%E7%AE%97%E7%B5%90%E6%9E%9C)

[`// result は 1 + 2 の計算結果を格納している変数
const result = 1 + 2;

// result2 は [1, 2, 3, 4, 5].map(number => number * 2) の計算結果を格納している変数
const result2 = [1, 2, 3, 4, 5].map(number => number * 2);

// result3 は React.createElement("div", null, `Hello ${this.props.name}`) の計算結果を格納している変数
const result3 = React.createElement("div", null, `Hello ${this.props.name}`);`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E8%A8%88%E7%AE%97%E7%B5%90%E6%9E%9C)

## [**React におけるパフォーマンス最適化**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)

[React では、不要な再計算やコンポーネントの再レンダリングを抑えることが、パフォーマンス最適化の基本的な戦略となる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[それらを実現する手段として](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[を利用する。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[React 以外のパフォーマンスチューニングにも言えることだが、計測は必須。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)[無闇に利用してもパフォーマンスが向上するわけではなく、意味がない場合もあるため注意。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#react-%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E6%9C%80%E9%81%A9%E5%8C%96)

## [**React.memo**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo)

[コンポーネント（コンポーネントのレンダリング結果）をメモ化する React の API（メソッド）。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo)[コンポーネントをメモ化することで、コンポーネントの再レンダリングをスキップできる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo)

### [**なぜ React.memo を利用するのか**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)

[以下のようなコンポーネントの再レンダリングをスキップすることで、パフォーマンスの向上が期待できるから。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[レンダリングコストが高いコンポーネント](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[頻繁に再レンダリングされるコンポーネント内の子コンポーネント](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[通常のコンポーネントに対しては、わざわざ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[を利用する必要はない。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)

### [**React.memo の構文**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)

[`React.memo(コンポーネント);
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[例えば、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[`Hello`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[というコンポーネントをメモ化する場合は以下のようになる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)

[`const Hello = React.memo(props => {
  return <h1>Hello {props.name}</h1>;
});
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[は Props の等価性（値が等価であること）をチェックして再レンダリングの判断をする。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[新しく渡された Props と前回の Props を比較し、等価であれば再レンダリングをせずにメモ化したコンポーネントを再利用する。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[そのため、上記の](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[`Hello`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[コンポーネントの場合、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[`props.name`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)[が更新されない限りコンポーネントは再レンダリングされない。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E6%A7%8B%E6%96%87)

### [**React.memo の利用例**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E5%88%A9%E7%94%A8%E4%BE%8B)

[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E5%88%A9%E7%94%A8%E4%BE%8B)[を利用する場合と、しない場合では何が違うのか比較してみる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%AE%E5%88%A9%E7%94%A8%E4%BE%8B)

### [**React.memo を利用しない場合**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)

[通常、コンポーネントの state が更新されると、そのコンポーネントは再レンダリングされる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)

[以下のデモのように親コンポーネントが再レンダリングされると、その子コンポーネントも常に再レンダリングされる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)[デモを見る](https://codesandbox.io/s/unused-reactmemo-sh5n4)

App.js

`import React, { useState } from "react";

const Child = props => {
  console.log("render Child");
  return <p>Child: {props.count}</p>;
};

export default function App() {
  console.log("render App");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <>
      <button onClick={() => setCount1(count1 + 1)}>countup App count</button>
      <button onClick={() => setCount2(count2 + 1)}>countup Child count</button>
      <p>App: {count1}</p>
      <Child count={count2} />
    </>
  );
}`

これが通常の挙動なので、この書き方が悪いわけではなく、問題もない。

コンポーネントの不要な再レンダリングでパフォーマンスの問題が発生した場合、`React.memo`の利用を検討する。

今回は`Child`コンポーネントが常に再レンダリングされても何も問題はないため、`React.memo`を利用する必要はない。

### [**React.memo を利用する場合**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)

[以下は](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)[を利用し、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)[`Child`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)[コンポーネントの再レンダリングをスキップしているデモ。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)[デモを見る](https://codesandbox.io/s/using-reactmemo-8y38w)

App.js

`import React, { useState } from "react";

const Child = React.memo(props => {
  console.log("render Child");
  return <p>Child: {props.count}</p>;
});

export default function App() {
  console.log("render App");

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <>
      <button onClick={() => setCount1(count1 + 1)}>countup App count</button>
      <button onClick={() => setCount2(count2 + 1)}>countup Child count</button>
      <p>App: {count1}</p>
      <Child count={count2} />
    </>
  );
}`

`count1`を更新して`App`コンポーネントを再レンダリングした時は、`Child`コンポーネントに渡される Props(`count2`)は更新されないため、再レンダリングはスキップされる。

`Child`コンポーネントに渡される`count2`が更新された時だけ、再レンダリングされるようになった。

### [**レンダリングコストが高いコンポーネントをメモ化する**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%B3%E3%82%B9%E3%83%88%E3%81%8C%E9%AB%98%E3%81%84%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%99%E3%82%8B)

[極端な例になるが、以下のデモのようにレンダリングコストが高いコンポーネントをメモ化することで、パフォーマンスの向上が期待できる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%B3%E3%82%B9%E3%83%88%E3%81%8C%E9%AB%98%E3%81%84%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%99%E3%82%8B)[デモを見る](https://codesandbox.io/s/using-reactmemo-01-dm50y)

App.js

`import React, { useState } from "react";

const Child = React.memo(props => {
  let i = 0;
  while (i < 1000000000) i++;
  console.log("render Child");
  return <p>Child: {props.count}</p>;
});

export default function App() {
  console.log("render App");

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <>
      <button onClick={() => setCount1(count1 + 1)}>countup App count</button>
      <button onClick={() => setCount2(count2 + 1)}>countup Child count</button>
      <p>App: {count1}</p>
      <Child count={count2} />
    </>
  );
}`

### [**頻繁に再レンダリングされるコンポーネント内の子コンポーネントをメモ化する**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E9%A0%BB%E7%B9%81%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E5%86%85%E3%81%AE%E5%AD%90%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%99%E3%82%8B)

[以下のデモのように、頻繁に再レンダリングされるコンポーネント内の子コンポーネントをメモ化することで、パフォーマンスの向上が期待できる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E9%A0%BB%E7%B9%81%E3%81%AB%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E5%86%85%E3%81%AE%E5%AD%90%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%99%E3%82%8B)[デモを見る](https://codesandbox.io/s/using-reactmemo-02-qtq5h)

App.js

`import React, { useState, useEffect, useRef } from "react";

const Child = React.memo(() => {
  console.log("render Child");
  return <p>Child</p>;
});

export default function App() {
  console.log("render App");

  const [timeLeft, setTimeLeft] = useState(100);
  const timerRef = useRef(null);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const tick = () => {
    if (timeLeftRef.current === 0) {
      clearInterval(timerRef.current);
      return;
    }
    setTimeLeft(prevTime => prevTime - 1);
  };

  const start = () => {
    timerRef.current = setInterval(tick, 10);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTimeLeft(100);
  };

  return (
    <>
      <button onClick={start}>start</button>
      <button onClick={reset}>reset</button>
      <p>App: {timeLeft}</p>
      <Child />
    </>
  );
}`

### [**コールバック関数を Props として受け取ったコンポーネントは必ず再レンダリングされる**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92-props-%E3%81%A8%E3%81%97%E3%81%A6%E5%8F%97%E3%81%91%E5%8F%96%E3%81%A3%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AF%E5%BF%85%E3%81%9A%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)

[以下のデモのようにコールバック関数を受け取ったコンポーネントは](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92-props-%E3%81%A8%E3%81%97%E3%81%A6%E5%8F%97%E3%81%91%E5%8F%96%E3%81%A3%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AF%E5%BF%85%E3%81%9A%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92-props-%E3%81%A8%E3%81%97%E3%81%A6%E5%8F%97%E3%81%91%E5%8F%96%E3%81%A3%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AF%E5%BF%85%E3%81%9A%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[を利用しても必ず再レンダリングされる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92-props-%E3%81%A8%E3%81%97%E3%81%A6%E5%8F%97%E3%81%91%E5%8F%96%E3%81%A3%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AF%E5%BF%85%E3%81%9A%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B)[デモを見る](https://codesandbox.io/s/using-reactmemo-03-g20p1?file=%2Fsrc%2FApp.js%3A0-520)

App.js

`import React, { useState } from "react";

const Child = React.memo(props => {
  console.log("render Child");
  return <button onClick={props.handleClick}>Child</button>;
});

export default function App() {
  console.log("render App");

  const [count, setCount] = useState(0);
  // 関数はコンポーネントが再レンダリングされる度に再生成されるため、
  // 関数の内容が同じでも、新しい handleClick と前回の handleClick は
  // 異なるオブジェクトなので、等価ではない。
  // そのため、コンポーネントが再レンダリングされる。
  const handleClick = () => {
    console.log("click");
  };

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <Child handleClick={handleClick} />
    </>
  );
}`

以下のように参照が異なる関数は別のオブジェクトとなる。

`function doSomething() {
  console.log("doSomething");
}
const func1 = doSomething;
const func2 = doSomething;
console.log(doSomething === doSomething); // true
console.log(func1 === func2); // true

const func3 = () => {
  console.log("doSomething");
};
const func4 = () => {
  console.log("doSomething");
};
console.log(func3 === func4); // false`

前述の`handleClick`が参照する関数も、`App`コンポーネントが再レンダリングされる度に再生成されるため、等価ではない。

そのため、関数の内容が同じでも`Child`コンポーネントが再レンダリングされる。

この問題を解消するためには、`useCallback`を利用して関数をメモ化する必要がある。

## [**useCallback**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback)

[メモ化されたコールバック関数を返すフック。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback)

### [**なぜ useCallback を利用するのか**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)

[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[と併用することで、コンポーネントの不要な再レンダリングをスキップできるから。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[より具体的に言えば、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[でメモ化したコンポーネントに](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)[でメモ化したコールバック関数を Props として渡すことで、コンポーネントの不要な再レンダリングをスキップできるから。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usecallback-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)

### [**useCallback の構文**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)

[`useCallback(コールバック関数, 依存配列);
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[依存配列とは、コールバック関数が依存している要素が格納された配列のこと。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[例えば、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[`count`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[という変数を](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[`console.log`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[で出力する関数をメモ化したい場合は以下のようになる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)

[`const callback = useCallback(() => console.log(count), [count]);
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[依存している要素が更新されれば、関数が再生成される。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)[依存している要素がなければ、依存配列は空で OK。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)

[`const callback = useCallback(() => console.log("doSomething"), []);`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%A7%8B%E6%96%87)

### [**useCallback の利用例**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%88%A9%E7%94%A8%E4%BE%8B)

[以下はメモ化したコールバック関数を渡し、コンポーネントは再レンダリングをスキップしているデモ。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%88%A9%E7%94%A8%E4%BE%8B)[デモを見る](https://codesandbox.io/s/using-usecallback-o5yji)

App.js

`import React, { useState, useCallback } from "react";

const Child = React.memo(props => {
  console.log("render Child");
  return <button onClick={props.handleClick}>Child</button>;
});

export default function App() {
  console.log("render App");

  const [count, setCount] = useState(0);
  // 関数をメモ化すれば、新しい handleClick と前回の handleClick は
  // 等価になる。そのため、Child コンポーネントは再レンダリングされない。
  const handleClick = useCallback(() => {
    console.log("click");
  }, []);

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <Child handleClick={handleClick} />
    </>
  );
}`

### [**useCallback の注意点**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)

[前述の通り、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[は](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[と併用するものなので、以下のような使い方をしても意味がない（コンポーネントの不要な再レンダリングをスキップできない）ので注意。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[でメモ化をしていないコンポーネントに](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[でメモ化をしたコールバック関数を渡す](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[
• ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)[でメモ化したコールバック関数を、それを生成したコンポーネント自身で利用する](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)

### [**React.memo でメモ化をしていないコンポーネントに useCallback でメモ化をしたコールバック関数を渡す**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%82%92%E3%81%97%E3%81%A6%E3%81%84%E3%81%AA%E3%81%84%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AB-usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%82%92%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E6%B8%A1%E3%81%99)

[以下のように、メモ化をしていないコンポーネントにメモ化をしたコールバック関数を渡しても、コンポーネントは常に再レンダリングされてしまう。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%82%92%E3%81%97%E3%81%A6%E3%81%84%E3%81%AA%E3%81%84%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AB-usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%82%92%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E6%B8%A1%E3%81%99)

[`import React, { useState, useCallback } from "react";

// React.memo でメモ化をしていないコンポーネントのため、メモ化されたコールバック関数を渡されても意味がない。
// App コンポーネントがレンダリングされる度に再レンダリングされる。
const Child = props => {
  console.log("render Child");
  return <button onClick={props.handleClick}>Child</button>;
};

export default function App() {
  console.log("render App");

  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log("click");
  }, []);

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <Child handleClick={handleClick} />
    </>
  );
}`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#reactmemo-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%82%92%E3%81%97%E3%81%A6%E3%81%84%E3%81%AA%E3%81%84%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AB-usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%82%92%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E6%B8%A1%E3%81%99)

### [**useCallback でメモ化したコールバック関数を、それを生成したコンポーネント自身で利用する**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E3%81%9D%E3%82%8C%E3%82%92%E7%94%9F%E6%88%90%E3%81%97%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E8%87%AA%E8%BA%AB%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[以下の例では、メモ化したコールバック関数を](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E3%81%9D%E3%82%8C%E3%82%92%E7%94%9F%E6%88%90%E3%81%97%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E8%87%AA%E8%BA%AB%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[`App`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E3%81%9D%E3%82%8C%E3%82%92%E7%94%9F%E6%88%90%E3%81%97%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E8%87%AA%E8%BA%AB%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[コンポーネント自身で利用している。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E3%81%9D%E3%82%8C%E3%82%92%E7%94%9F%E6%88%90%E3%81%97%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E8%87%AA%E8%BA%AB%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E3%81%9D%E3%82%8C%E3%82%92%E7%94%9F%E6%88%90%E3%81%97%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E8%87%AA%E8%BA%AB%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)[動作はするが、「コンポーネントの再レンダリングをスキップする」という目的を達成できてない。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E3%81%9D%E3%82%8C%E3%82%92%E7%94%9F%E6%88%90%E3%81%97%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E8%87%AA%E8%BA%AB%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

[`import React, { useState, useCallback } from "react";

export default function App() {
  console.log("render App");

  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log("memonized callback");
  }, []);

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <button onClick={handleClick}>logging</button>
    </>
  );
}`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%A7%E3%83%A1%E3%83%A2%E5%8C%96%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%82%92%E3%81%9D%E3%82%8C%E3%82%92%E7%94%9F%E6%88%90%E3%81%97%E3%81%9F%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E8%87%AA%E8%BA%AB%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B)

## [**useMemo**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo)

[メモ化された値を返すフック。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo)[コンポーネントの再レンダリング時に値を再利用できる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo)

### [**なぜ useMemo を利用するのか**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)

[値の不要な再計算をスキップすることで、パフォーマンスの向上が期待できるから。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%AA%E3%81%9C-usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%8B)

### [**useMemo の構文**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)

[`useMemo(() => 値を計算するロジック, 依存配列);
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)[依存配列とは、値を計算するロジックが依存している要素（値の計算に必要な要素）が格納された配列のこと。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)[例えば、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)[`count`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)[という変数の値を２倍にした値をメモ化したい場合は以下のようになる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)

[`const result = useMemo(() => count * 2, [count]);
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)[依存している要素が更新されれば、値が再計算される。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E6%A7%8B%E6%96%87)

### [**useMemo の利用例**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%88%A9%E7%94%A8%E4%BE%8B)

[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%88%A9%E7%94%A8%E4%BE%8B)[を利用する場合と、しない場合では何が違うのか比較してみる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%88%A9%E7%94%A8%E4%BE%8B)

### [**useMemo を利用しない場合**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)

[以下は](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)[を利用せず、不要な再計算が発生しているデモ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)[デモを見る](https://codesandbox.io/s/unused-usememo-hzylx)

App.js

`import React, { useState } from "react";

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 引数の数値を２倍にして返す。
  // 不要なループを実行しているため計算にかなりの時間がかかる。
  const double = count => {
    let i = 0;
    while (i < 1000000000) i++;
    return count * 2;
  };

  // count2 を２倍にした値
  // double(count2) はコンポーネントが再レンダリングされる度に実行されるため、
  // count1 を更新してコンポーネントが再レンダリングされた時にも実行されてしまう。
  // そのため、count1 を更新してコンポーネントを再レンダリングする時も時間がかかる。
  // count1 を更新しても doubledCount の値は変わらないため、count1 を更新した時に
  // double(count2) を実行する意味がない。したがって、不要な再計算が発生している状態である。
  // count1 が更新されてコンポーネントが再レンダリングされた時は double(count2) が実行されないようにしたい。
  const doubledCount = double(count2);

  return (
    <>
      <h2>Increment count1</h2>
      <p>Counter: {count1}</p>
      <button onClick={() => setCount1(count1 + 1)}>Increment count1</button>

      <h2>Increment count2</h2>
      <p>
        Counter: {count2}, {doubledCount}
      </p>
      <button onClick={() => setCount2(count2 + 1)}>Increment count2</button>
    </>
  );
}`

`count1`を更新した時も`double(count2)`が実行されてしまうため、`count1`を更新してコンポーネントを再レンダリングする時も時間がかかる。

### [**useMemo を利用する場合**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)

[以下は](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)[を利用し、不要な再計算をスキップするデモ。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)[デモを見る](https://codesandbox.io/s/using-usememo-nszeq)

App.js

`import React, { useState, useMemo } from "react";

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 引数の数値を２倍にして返す。
  // 不要なループを実行しているため計算にかなりの時間がかかる。
  const double = count => {
    let i = 0;
    while (i < 1000000000) i++;
    return count * 2;
  };

  // count2 を２倍にした値をメモ化する。
  // 第２引数に count2 を渡しているため、count2 が更新された時だけ値が再計算される。
  // count1 が更新され、コンポーネントが再レンダリングされた時はメモ化した値を利用するため再計算されない。
  const doubledCount = useMemo(() => double(count2), [count2]);

  return (
    <>
      <h2>Increment(fast)</h2>
      <p>Counter: {count1}</p>
      <button onClick={() => setCount1(count1 + 1)}>Increment(fast)</button>

      <h2>Increment(slow)</h2>
      <p>
        Counter: {count2}, {doubledCount}
      </p>
      <button onClick={() => setCount2(count2 + 1)}>Increment(slow)</button>
    </>
  );
}`

`useMemo`を利用して値をメモ化したため、`count1`を更新した時は`double(count2)`が実行されないようになった。

そのため、`count1`を更新した時のコンポーネントの再レンダリングが高速になった。

### [**コンポーネントの再レンダリングをスキップする**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E3%82%B9%E3%82%AD%E3%83%83%E3%83%97%E3%81%99%E3%82%8B)

[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E3%82%B9%E3%82%AD%E3%83%83%E3%83%97%E3%81%99%E3%82%8B)[はレンダリング結果もメモ化できるため、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E3%82%B9%E3%82%AD%E3%83%83%E3%83%97%E3%81%99%E3%82%8B)[`React.memo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E3%82%B9%E3%82%AD%E3%83%83%E3%83%97%E3%81%99%E3%82%8B)[のようにコンポーネントの再レンダリングをスキップできる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E3%82%B9%E3%82%AD%E3%83%83%E3%83%97%E3%81%99%E3%82%8B)

[以下はコンポーネントをメモ化して、不要な再レンダリングをスキップしているデモ。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E3%82%B9%E3%82%AD%E3%83%83%E3%83%97%E3%81%99%E3%82%8B)[デモを見る](https://codesandbox.io/s/using-usememo-02-e23dy)

App.js

`import React, { useState, useMemo } from "react";

export default function App() {
  console.log("render App");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 引数の数値を２倍にして返す。
  // 無駄なループを実行しているため計算にかなりの時間がかかる。
  const double = count => {
    let i = 0;
    while (i < 1000000000) i++;
    return count * 2;
  };

  // レンダリング結果（計算結果）をメモ化する
  // 第２引数に count2 を渡しているため、count2 が更新された時だけ再レンダリングされる。
  // count1 が更新され、コンポーネントが再レンダリングされた時はメモ化したレンダリング結果を
  // 利用するため再レンダリングされない。
  const Counter = useMemo(() => {
    console.log("render Counter");
    const doubledCount = double(count2);

    return (
      <p>
        Counter: {count2}, {doubledCount}
      </p>
    );
  }, [count2]);

  return (
    <>
      <h2>Increment count1</h2>
      <p>Counter: {count1}</p>
      <button onClick={() => setCount1(count1 + 1)}>Increment count1</button>

      <h2>Increment count2</h2>
      {Counter}
      <button onClick={() => setCount2(count2 + 1)}>Increment count2</button>
    </>
  );
}`

関数コンポーネント内でコンポーネントをメモ化したい場合は`useMemo`を利用する。

以下のデモのように関数コンポーネント内で`React.memo`を利用しても意味がないので注意。[デモを見る](https://codesandbox.io/s/meaningless-reactmemo-5gqup)

App.js

`import React, { useState } from "react";

export default function App() {
  console.log("render App");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 引数の数値を２倍にして返す。
  // 無駄なループを実行しているため計算にかなりの時間がかかる。
  const double = count => {
    let i = 0;
    while (i < 1000000000) i++;
    return count * 2;
  };

  // App コンポーネントが再レンダリングされたら
  // このコンポーネントも必ず再レンダリングされる
  const Counter = React.memo(props => {
    console.log("render Counter");
    const doubledCount = double(props.count2);

    return (
      <p>
        Counter: {props.count2}, {doubledCount}
      </p>
    );
  });

  return (
    <>
      <h2>Increment count1</h2>
      <p>Counter: {count1}</p>
      <button onClick={() => setCount1(count1 + 1)}>Increment count1</button>

      <h2>Increment count2</h2>
      <Counter count2={count2} />
      <button onClick={() => setCount2(count2 + 1)}>Increment count2</button>
    </>
  );
}`

## [**useCallback を関数の再生成を防ぐ目的で利用してはいけないのか？**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)

[「](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[が再計算を防ぐために利用するのであれば、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[も関数の再生成を防ぐために利用するのは意味があるのでは？」と思った方もいると思います。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[しかし、私はそれを目的として利用することは理にかなっていないと思っています。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[なぜなら、「関数の再生成するコスト > ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[の実行コスト」になることはないと認識しているからです。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[と](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)[のどちらも、メモ化をする処理自体にコストがあります。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%82%92%E9%96%A2%E6%95%B0%E3%81%AE%E5%86%8D%E7%94%9F%E6%88%90%E3%82%92%E9%98%B2%E3%81%90%E7%9B%AE%E7%9A%84%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%AE%E3%81%8B)

### [**useMemo の場合**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)

[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[の場合、「再計算のコスト < ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[の実行コスト」の時もあれば、「再計算のコスト > ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[の実行コスト」の時もあると認識しています。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[極端な例になりますが、以下は「再計算のコスト < ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[の実行コスト」の例です。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)

[`const result = useMemo(() => value * 2, [value]);
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`value * 2`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[は単純な計算なので、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[を利用しても効果はありません。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[寧ろ、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[の実行コストの方が高いかもしれないため、上記のようなシーンで](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[を利用するのは理にかなっていないと思っています。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[そして、以下は「再計算のコスト > ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[の実行コスト」の例です。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)

[`const result = useMemo(() => {
  let i = 0;
  while (i < 1000000000) i++;
  count * 2;
}, [value]);
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[この場合、明らかに再計算のコストの方が高いため、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)[を利用すると大きな効果が得られます。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usememo-%E3%81%AE%E5%A0%B4%E5%90%88)

### [**useCallback の場合**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)

[以下は「関数の再生成するコスト < ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[の実行コスト」の例です。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)

[`const handleClick = useCallback(() => {
  console.log(value);
}, [value]);
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[前述の](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[と同様で、わざわざ利用する必要がないと思っています。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[そして、「関数の再生成するコスト > ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[の実行コスト」ですが、この状況が思いつかないです。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)

[`// ?
`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[なので、関数の再生成を防ぐために](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[を利用するの理にかなってないし、わざわざ利用する必要はないと思っています。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[厳密な測定をしたわけではないので、この認識は間違っているかもしれないです。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[もし、私の認識が間違っている（「関数の再生成するコスト > ](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)[の実行コスト」になる状況がある、もしくは他に使い道がある）場合、お手数ですが具体例（コード）を添えて、ご意見ご指摘いただけると大変助かります。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#usecallback-%E3%81%AE%E5%A0%B4%E5%90%88)

## [**依存配列は正しく指定する必要がある**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)

[`useCallback`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)[と](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)[`useMemo`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)[の依存配列は正しく指定しないとバグの原因になる。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)[そのため、以下のコードは NG。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)

[`// 依存要素である count2 が依存配列にないため NG
const result = useMemo(() => count * count2, [count]);

// これが正しい
// const result = useMemo(() => count * count2, [count, count2]);`](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)

[そのため、](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BE%9D%E5%AD%98%E9%85%8D%E5%88%97%E3%81%AF%E6%AD%A3%E3%81%97%E3%81%8F%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B)[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)などを利用して、必ず Lint する。

## [**使い所**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BD%BF%E3%81%84%E6%89%80)

[パフォーマンスを計測し、ボトルネックになっている箇所に適用していくのが一番効果的。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BD%BF%E3%81%84%E6%89%80)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BD%BF%E3%81%84%E6%89%80)[とは言え、GitHub 上にあるコードや技術書を見てみると、ガンガン利用していた。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BD%BF%E3%81%84%E6%89%80)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BD%BF%E3%81%84%E6%89%80)[厳密な利用基準を設けるのも大変なので、それぞれの機能や役割をちゃんと理解しているのであれば、積極的に利用しても大きな問題はないと思った。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E4%BD%BF%E3%81%84%E6%89%80)

## [**終わり**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E7%B5%82%E3%82%8F%E3%82%8A)

[今回準備したデモは極端な例ですが、利用シーンによっては非常に有用な機能です。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E7%B5%82%E3%82%8F%E3%82%8A)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E7%B5%82%E3%82%8F%E3%82%8A)[状況に応じて利用していきましょう。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E7%B5%82%E3%82%8F%E3%82%8A)[
](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E7%B5%82%E3%82%8F%E3%82%8A)[本記事以外にも React に関連する記事を書いておりますので、興味があればそちらもどうぞ。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E7%B5%82%E3%82%8F%E3%82%8A)

- [React の Context の更新による不要な再レンダリングを防ぐ 〜useContext を利用時に発生する不要な再レンダリングを防ぐ方法に関して〜](https://qiita.com/soarflat/items/b154adc768bb2d71af21)

## [**お知らせ**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B)

[Udemy で webpack の講座を公開したり、Zenn や Kindle で技術書を出版しています。](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B)

[Udemy:](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2#%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B)[webpack 最速入門](https://www.udemy.com/course/practical-webpack/?couponCode=ADC884F22BC2EA8DEE8D)（~~**10,800 円**~~** -> 2,400 円**）

Zenn:[React Hooks 入門](https://zenn.dev/soarflat/books/de65ce62f4c2a76f8a8d)（500 円）

Kindle（Kindle Unlimited だったら無料）:[React 実践入門](https://www.amazon.co.jp/dp/B088ZMFPFV/)（800 円）

興味を持ってくださった方はご購入いただけると大変嬉しいです。よろしくお願いいたします。

[**編集リクエスト**](https://qiita.com/drafts/b9d3d17b8ab1f5dbfed2/edit)

[**301**](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2/likers)





[**@soarflat**](https://qiita.com/soarflat)

フロントエンドエンジニア。Udemy で webpack の講座を公開しています。https://www.udemy.com/course/practical-webpack/?couponCode=ADC884F22BC2EA8DEE8D

**ユーザー登録して、Qiitaをもっと便利に使ってみませんか。****
1. ****あなたにマッチした記事をお届けします****ユーザーやタグをフォローすることで、あなたが興味を持つ技術分野の情報をまとめてキャッチアップできます****便利な情報をあとで効率的に読み返せます****気に入った記事を「ストック」することで、あとからすぐに検索できます**[****](https://help.qiita.com/ja/articles/qiita-login-user)[**より詳しく**](https://help.qiita.com/ja/articles/qiita-login-user)[登録する](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fsoarflat%2Fitems%2Fb9d3d17b8ab1f5dbfed2&realm=qiita)[ログインする](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fsoarflat%2Fitems%2Fb9d3d17b8ab1f5dbfed2&realm=qiita)