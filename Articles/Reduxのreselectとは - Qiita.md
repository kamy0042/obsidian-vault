---
Updated: 2021-11-06T22:58:00
URL: https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9
Created: 2021-01-01T00:06:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
[@zaki-yama](https://qiita.com/zaki-yama)

2017年06月17日に更新



# **Reduxのreselectとは**

[React](https://qiita.com/tags/react)[redux](https://qiita.com/tags/redux)

この記事は最終更新日から3年以上が経過しています。

[Reduxにおけるreducer分割とcombineReducersについて - Qiita](http://qiita.com/kuy/items/59c6d7029a10972cba78)

こちらの記事を読んで、私も（Redux は勉強し始めたばかりだけど）似たような感想を持っていて
最後のコメントに書かれていた [reselect](https://github.com/reactjs/reselect) というライブラリが気になったので、調べてみました。

取り急ぎ、こちらの公式ドキュメントおよび YouTube にあった動画を見ておおざっぱに理解したつもりでいるので、自分なりに整理してみます。

- (公式ドキュメント) [Computing Derived Data | Redux](http://redux.js.org/docs/recipes/ComputingDerivedData.html)
- (動画) [[React/Redux] Logicless Components with Reselect - YouTube](https://www.youtube.com/watch?v=XCQ0ZSr-a2o)

## [**解決したい課題**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E8%A7%A3%E6%B1%BA%E3%81%97%E3%81%9F%E3%81%84%E8%AA%B2%E9%A1%8C)

[ドキュメントに書いてあったのと同じく、](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E8%A7%A3%E6%B1%BA%E3%81%97%E3%81%9F%E3%81%84%E8%AA%B2%E9%A1%8C)[Redux の basics チュートリアル](http://redux.js.org/docs/basics/index.html) を例に考えてみる。
このチュートリアルを通して作成したのは、以下のようなフィルタ機能つきの Todo アプリだった。

このアプリにおいて、中央の Todo のリストは
現在登録されているすべての `todos` を、現在選択されている `visibilityFilter` でフィルタリングしたものだけを表示している。

該当のコードはこんな感じだった。

containers/VisibleTodoList.js(抜粋)

`const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

...

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList`

この時の問題として、`getVisibleTodos()` は **関係する **`**state.todos**`** もしくは **`**state.visibilityFilter**`** に更新があったかどうかに関わらず** `state` が更新されるたびに実行されるので、フィルタリング処理の計算コストが高かった場合パフォーマンスに影響が出てしまう。
Redux には「`state` はアプリケーション全体で1つのツリーオブジェクトである（[Single source of truth](http://redux.js.org/docs/introduction/ThreePrinciples.html#single-source-of-truth)）」という原則があるが、`state` のツリーが巨大になったとき、たいてい各コンポーネントで関心のある `state` はツリーの中のほんの一部にしかすぎないはずなのに
無関係なツリーの更新によって計算処理が何度も実行されてしまうのは無駄である。

また、動画の方では別の問題点も挙げていた。

（キャプチャは [動画](https://youtu.be/XCQ0ZSr-a2o?t=4m42s) より引用）

問題の1つは、内部で保持しているデータ（`state`）の構造をコンポーネント側が知っていなきゃいけないということと、
もう1つは、フィルタリング処理などのロジック部分をコンポーネント側に持たせてしまうとそのロジックを別のところで再利用することが難しくなるということだった。

今回の Todo アプリの例では Container Component と Presentational Component に切り分けられているのでそこまであてはまらないかもしれないが
言ってることはわかる気がする。

## [**Selector の導入**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#selector-%E3%81%AE%E5%B0%8E%E5%85%A5)

[この問題を解決するのが ](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#selector-%E3%81%AE%E5%B0%8E%E5%85%A5)[reselect](https://github.com/reactjs/reselect) というライブラリである。
reselect は Selector という機能を提供する。

ざっくり言うと、Selector は state の中から自分が関心のあるツリー部分だけを抜き出してきて
抜き出してきたパラメータから必要な計算を行う。

先に、上の VisibleTodoList の例を Selector を用いて書き直すと、こうなる。

selectors/index.js

`import { createSelector } from 'reselect';

const visibilityFilterSelector = (state) => state.visibilityFilter;
const todosSelector = (state) => state.todos;

export const visibleTodosSelector = createSelector(
  [ visibilityFilterSelector, todosSelector ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
    }
  }
)`

containers/VisibleTodoList.js

`import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';
import { visibleTodosSelector } from '../selectors';

const mapStateToProps = (state) => {
  return {
    todos: visibleTodosSelector(state)
  }
};`

container component 側で計算していた処理が、 `createSelector()` なる関数にまるっと移行された。

ここで登場人物としては大きく2つある。

### [**input selectors**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)

[これは上の例で言う ](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[`visibilityFilterSelector`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[ や ](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[`todosSelector`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[ が相当する。](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[
input selector は「](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[`state`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[ を引数に受け取り、関心のある部分を返すだけの関数」で、後述する ](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[`createSelector()`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[ の input になるためこう呼ばれる。](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[`state`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)[ から関心のある部分だけを抽出するのが役割なので、計算などは行わない。](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#input-selectors)

### [`**createSelector(...inputSelectors | [inputSelectors], resultFunc)**`](https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc)

こちらが reselect のメイン。

この関数は先ほどの input selectors を引数に受け取り、input selectors が返す結果を使った計算処理を関数として最後の引数に定義する。
上の例だと

`(visibilityFilter, todos) => {
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
}`

部分が `resultFunc`。

`resultFunc` の引数には、`createSelector()` に渡した input selectors の戻り値が順番に渡されてくる。

### [**その他の API**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE-api)

[https://github.com/reactjs/reselect#api](https://github.com/reactjs/reselect#api) を参照。
今回の例で登場しなかったので調べられてない。

## [`**createSelector()**`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[** を使うと何がうれしいか**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)

[`createSelector()`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[ の挙動は](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[`createSelector`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[ determines if the value returned by an input-selector has changed between calls using reference equality (===).](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[
...](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[
Selectors created with ](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[`createSelector`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[ have a cache size of 1. This means they always recalculate when the value of an input-selector changes, as a selector only stores the preceding value of each input-selector.](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)

[（](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#createselector-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E4%BD%95%E3%81%8C%E3%81%86%E3%82%8C%E3%81%97%E3%81%84%E3%81%8B)[https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc）](https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc%EF%BC%89)

なので、呼ばれるたびに input selectors の戻り値（つまり `state` のうち関係する部分）に更新があったかどうかを `===` で比較し、更新がなかった場合は `resultFunc` は再実行せず、キャッシュしておいた直前の結果を利用する。
そのため、コンポーネント側からロジックが分離できただけでなく、`state` のツリーのうち、関係のある部分が更新されない限りは `getVisibleTodos()` による再計算は発生しない。

ということで、上述した問題が解決できた。ということなのだと理解した。

## [**おまけ：**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91createselector-%E3%81%A7-props-%E3%82%82%E5%8F%82%E7%85%A7%E3%81%97%E3%81%9F%E3%81%84)[`**createSelector()**`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91createselector-%E3%81%A7-props-%E3%82%82%E5%8F%82%E7%85%A7%E3%81%97%E3%81%9F%E3%81%84)[** で **](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91createselector-%E3%81%A7-props-%E3%82%82%E5%8F%82%E7%85%A7%E3%81%97%E3%81%9F%E3%81%84)[`**props**`](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91createselector-%E3%81%A7-props-%E3%82%82%E5%8F%82%E7%85%A7%E3%81%97%E3%81%9F%E3%81%84)[** も参照したい**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91createselector-%E3%81%A7-props-%E3%82%82%E5%8F%82%E7%85%A7%E3%81%97%E3%81%9F%E3%81%84)

[参考：](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91createselector-%E3%81%A7-props-%E3%82%82%E5%8F%82%E7%85%A7%E3%81%97%E3%81%9F%E3%81%84)[Accessing React Props in Selectors](https://github.com/reactjs/reselect#accessing-react-props-in-selectors)

`mapStateToProps()` 内で `props` も引数に渡してあげれば良い。

containers/VisibleTodoList.js

`const mapStateToProps = (state, props) => {
  return {
    todos: visibleTodosSelector(state, props)
  }
};`

こうすると各 input selectors 内で `props` が使えるようになる。

selectors/index.js

`const visibilityFilterSelector = (state, props) =>
  state.todoLists[props.listId].visibilityFilter;
const todosSelector = (state, props) =>
  state.todoLists[props.listId].todos;`

## [**おまけ：計算結果のメモ化（memoization）という考え方**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91%E8%A8%88%E7%AE%97%E7%B5%90%E6%9E%9C%E3%81%AE%E3%83%A1%E3%83%A2%E5%8C%96memoization%E3%81%A8%E3%81%84%E3%81%86%E8%80%83%E3%81%88%E6%96%B9)

[公式ドキュメントを読んでいると memoized selector という単語が頻繁に登場する。](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91%E8%A8%88%E7%AE%97%E7%B5%90%E6%9E%9C%E3%81%AE%E3%83%A1%E3%83%A2%E5%8C%96memoization%E3%81%A8%E3%81%84%E3%81%86%E8%80%83%E3%81%88%E6%96%B9)[
memoize(d) あるいは memoization は、日本語だと「メモ化」と呼び、](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%81%BE%E3%81%91%E8%A8%88%E7%AE%97%E7%B5%90%E6%9E%9C%E3%81%AE%E3%83%A1%E3%83%A2%E5%8C%96memoization%E3%81%A8%E3%81%84%E3%81%86%E8%80%83%E3%81%88%E6%96%B9)[Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%A1%E3%83%A2%E5%8C%96) では

> メモ化（英: Memoization）とは、プログラムの高速化のための最適化技法の一種であり、サブルーチン呼び出しの結果を後で再利用するために保持し、そのサブルーチン（関数）の呼び出し毎の再計算を防ぐ手法である。

と書かれている。

今回 `createSelector()` がやっていることがまさにそれで、一度行った計算結果をメモ化して保存してくれるので、memoized selector という用語を使っているみたい。
input selectors は毎回実行されるので memoized ではなく、計算は行わないと言ったのはそういう理由から。

## [**おわりに**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)

[元々感じていたのは「reducer を分割してるのに、ある action に対してすべての reducer が実行されるのはなんでなんだろう？ action に対応する reducer だけ反応してくれればいいのに」という疑問だった。](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)[
今回の Selector によって、コンポーネント毎に自分が関心のある state だけを監視することができるようになったわけだけども](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)[
reducer は相変わらずすべて実行されているので、そこは今後も注意したい。](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)[
](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)[Redux はまだまだ理解できていないことだらけなので、間違ってるところがあればご指摘いただければ幸いです。](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB)

[**編集リクエスト**](https://qiita.com/drafts/5258e6f1ae37f63034b9/edit)

[**233**](https://qiita.com/zaki-yama/items/5258e6f1ae37f63034b9/likers)





[**Yamazaki Shingo**](https://qiita.com/zaki-yama)[**@zaki-yama**](https://qiita.com/zaki-yama)

[http://dackdive.hateblo.jp/](http://dackdive.hateblo.jp/)

**ユーザー登録して、Qiitaをもっと便利に使ってみませんか。****
1. ****あなたにマッチした記事をお届けします****ユーザーやタグをフォローすることで、あなたが興味を持つ技術分野の情報をまとめてキャッチアップできます****便利な情報をあとで効率的に読み返せます****気に入った記事を「ストック」することで、あとからすぐに検索できます**[****](https://help.qiita.com/ja/articles/qiita-login-user)[**より詳しく**](https://help.qiita.com/ja/articles/qiita-login-user)[登録する](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fzaki-yama%2Fitems%2F5258e6f1ae37f63034b9&realm=qiita)[ログインする](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fzaki-yama%2Fitems%2F5258e6f1ae37f63034b9&realm=qiita)