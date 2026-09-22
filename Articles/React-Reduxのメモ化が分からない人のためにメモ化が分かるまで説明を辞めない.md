---
Updated: 2021-11-06T22:56:00
URL: https://qiita.com/tkow/items/47e81ec031774fcc06f5
Created: 2021-01-16T03:53:00
Tags: [topic/技術/React, topic/技術/パフォーマンス]
---
![[Attachments/無題のフォルダ/https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-1150d8b18a7c15795b701a55ae908f94 3.png]]

# 背景:React-Reduxを使うときに、メモ化が重要だと理解したので情報発信することにした

開発現場にReact-Reduxを導入しておきながら、チームメンバーから「 **俺の実装したコンポーネントの描画遅いんだけどどうにかしてくれ** 」と言われたので、「どうにかするのはお前の仕事だぞ♡」、と思いつつ、そうも言ってはいられない状況になったので、本腰入れてドキュメント読みました。React-Reduxのパフォーマンス改善にはどうやらメモ化が重要であると思ったので説明します。色々なサイトやドキュメントは明らかに冗長な説明が多いので、極限までエッセンシャルを絞って説明することで、ゼロ知識からでもある程度、理解できるレベルの説明に落とし込むことに挑戦しました。うちの開発チームで知見として残すために作成したものですが、需要がありそうかなと思ったので、公開します。需要がなければすみませんでした。おかしな点があれば、まさかりお待ちしております。

# TL;DR

[Reduxの公式ドキュメント](https://redux.js.org/recipes/computing-derived-data)に書いてあることの補足説明です。

# Memoization(メモ化)

メモ化とは、関数実行時に前回実行された関数と入力された引数が同じであれば、前回の実行によって得られた値をそのまま返すことで、関数の実行を効率化する手法です。狭義のキャッシュと言えば、イメージが付きやすいと思います。

これは、コンパイラ以外の実装での最適化になるので、入力データと計算結果はオンメモリになります。よって、速度とリソースのトレードオフが発生しますが、Reduceのたびに、再計算コストが毎回掛かるのは好ましいことではありません。特にReactのstateのセットが毎回走るたびにComponentの再レンダリングが走るような場合には、これらの処理がボトルネックになることもありえるので、リソースとのトレードオフもありますが、出来る限りきちんと対応しましょう。

そこでドキュメントにも利用されているreselectというライブラリを使用して、メモ化を導入することをおすすめします。

# reselectによるメモ化

メモ化の効力については、実際に確認したら分かりやすいと思いますので、重たい関数処理を定義して実際に計測時間を比較してみます。以下に単純に、reselectを使って実行時間を計測するコードを示します。

```plain text
import { createSelector } from 'reselect'

const person = {
  name: 'tkow',
  age: 1
}

//Randomで5文字の文字列を生成する
const getRandomName = (name) => {
  const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const getChar = () => alphabets.charAt(
    Math.floor( Math.random()*alphabets.length )
  )
  return [...Array(5)].map(getChar).join('')
}

function veryHeavyTask(name) {
  for(var i=0; i< 1000;i++){
    var newName = name + 'a'
  }
  return name + name
}

const nameModifyNotificator = (name) => name

const memoizedHeavyTask = createSelector(
  [nameModifyNotificator],
  veryHeavyTask
)

function randomMemoizedTask (name) {
  memoizedHeavyTask(getRandomName())
}

function timeWatch(cb,name) {
  let [label,func] = Object.entries(cb)[0];
  console.time(label);
  for (var i = 0; i< 100000; i++){
    func(name)
  }
  console.timeEnd(label)
}

timeWatch({veryHeavyTask},person.name)
timeWatch({memoizedHeavyTask},person.name)
timeWatch({randomMemoizedTask},person.name)
timeWatch({getRandomName},person.name)

```

ここで、計測時間は、1回あたりだと、コンパイラの最適化処理などで、実行時間に差が出ないことが多いので、イテレーション回数を多めにして合計実行時間、または、平均実行時間などで比較すると差がわかりやすいと思います。上の例ではrandomMemoizedTaskには、getRandomName実行のオーバーヘッドがあるため、その実行時間を差分として引くために、getRandomNameの実行時間も計測しています。以上のコードを実行すると、私の環境では以下のようになりました。

以上を見ると、メモ化が行われている関数とそうでない関数の実行時間の違いがよくわかると思います。randomMemoizedTaskは毎回引数の文字列を変更してるので、`randomMemoizedTaskの計測時間 - getRandomNameの計測時間`がメモ化しない場合と同じくらいであることがわかると思います。以上の例では、`memoizedHeavyTask(name)`を実行した時、

の戻り値がveryHeavyTaskの入力値として、実行され、もしこの戻り値の値に変更がなければ、veryHeeavyTaskの前回の戻り値を、そのまま実行結果として返すという処理を行っています。次に、この動作を詳しく説明します。

# reselectの動作解説

以下にcreateSelector関数とその引数を示しています。

createSelector関数には、第一引数に、inputSelectorsという関数の配列、第二引数にその関数の戻り値を引数に取る関数をセットします。この時、第一引数のinputSelectorsの配列順序と同じ順序で、第二引数の関数の引数が決まります。
 例えば、先程のpersonオブジェクトを例に取り、

```plain text
const name = (person) => person.name
const age = (person) => person.age

const memoizedCombinedTask = createSelector(
  [name,age],
  function combinedHeavyTask(name,age) {
    veryHeavyTask(name)
  }
)


```

として設定してみます。この時、 memoizedCombinedTaskの引数に渡しているpersonオブジェクトの、person.name、person.ageのどちらかが変更されていれば、combinedHeavyTaskの中のveryHeavyTaskが再実行されますが、どちらの値も同じ、または、nameと、ageに変更があっても、personオブジェクトの参照に変更がなければ再実行されません。後者の動作は、ライブラリの内部動作によるものと思いますが、一般的にメモ化の前提として、副作用を許さないというものがあるので、参照代入は許さないという制約が課されているのだと思います。この動作を確かめるために以下のようなコードで動作検証します。

```plain text
import { createSelector } from 'reselect'

const name = (person) => person.name
const age = (person) => person.age
let count = 1
const memoizedCombinedTask = createSelector(
  [name,age],
  function combinedHeavyTask(name,age) {
    console.log(`heavy task executed!:${count}:${name}`)
  }
)

person = {
  name: 'tkow',
  age: 2
}

memoizedCombinedTask(person) //count:1

count++
memoizedCombinedTask(person) //count:2

count++
person.name = 'Tkow'
memoizedCombinedTask(person) //count:3

count++
memoizedCombinedTask(Object.assign({},person)) //count:4

count++
person.name = 'Hogeo'
memoizedCombinedTask(Object.assign({},person)) //count:5

count++
person.age = 3
memoizedCombinedTask(Object.assign({},person)) //count:6

count++
memoizedCombinedTask(Object.assign({},person)) //count:7

/** 実行結果
* heavy task executed!:1:tkow
* heavy task executed!:4:Tkow
* heavy task executed!:5:Hogeo
* heavy task executed!:6:Hogeo
*/


```

以上から、count:3の時の参照渡しの時と、count:7の時にメンバの値が同じ時に、関数の再実行が行われていないことが確認できました。
 また、createSelectorの第一引数を空配列で指定すると、パラメータがどんな条件でも必ず前の計算結果を返すようになり、一度計算した関数の値を永続的に返す関数になります。

# インスタンスごとにメモ化を挟む方法

[公式のドキュメント](https://redux.js.org/recipes/computing-derived-data#sharing-selectors-across-multiple-components)ではmapStateToProps関数にこのメモ化関数を設定しています。

```plain text
//selectors/todoSelectors.js

import { createSelector } from 'reselect'

const getVisibilityFilter = (state, props) =>
  state.todoLists[props.listId].visibilityFilter

const getTodos = (state, props) => state.todoLists[props.listId].todos

const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_COMPLETED':
        return todos.filter(todo => todo.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }
)

export default getVisibleTodos

//containers/VisibleTodoList.js

import { getVisibleTodos } from '../selectors'
//略

const mapStateToProps = (state, props) => {
  return {
    todos: getVisibleTodos(state, props)
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export VisibleTodoList

//components/ToDoList.js

import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, toggleTodo, listId }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => toggleTodo(todo.id, listId)}
      />
    )}
  </ul>
)

//components/App.js

import React from 'react'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <VisibleTodoList listId="1" />
    <VisibleTodoList listId="2" />
    <VisibleTodoList listId="3" />
  </div>
)


```

以上の例では、getVisibleTodosがメモ化された関数で、VisibleTodoList内のToDoオブジェクトの数が変動する、既存のToDoオブジェクトが更新される、あるいは、getVisibilityFilterが変更されるとgetVisibleTodosが再実行されます。この時、公式のドキュメントでも言及されていますが、listId=1、listId=２，listId=３,のどのVisibleTodoListのtodosを更新した時にtodosに更新のないVisibleTodoListにおいてもデータを再取得する処理が走ってしまいます。

これは、mapStateToPropsが設定されている全てのコンポーネントで、イベントのSubscribe処理が走り、そのSubscribeのイベントで使われているメモ化関数getVisibleTodosがComponent毎に共通の関数で呼び出されているため、mapStateToProps経由でgetVisibleTodosを呼び出した時に入力された最も更新の新しいVisibleToDoListのpropsのキャッシュが残っており、次のコンポーネントのプロパティ計算の時にキャッシュのlistIdから参照されるtodosと、現在SubscribeされているVisibleToDoListのlistIdから参照されるtodosの値が異なっているため、キャッシュと異なる値を持っていると判断され、メモ化の恩恵を得られずに再計算されるためです。

これを防ぐためにドキュメントの例を取って、以下のように、componentごとに個別のselectorを生成してbindするように処理内容を変更することで解決することが出来ます。

```plain text
const makeGetVisibleTodos = () => {
  return createSelector(
    [ getVisibilityFilter, getTodos ],
    (visibilityFilter, todos) => {
      switch (visibilityFilter) {
        case 'SHOW_COMPLETED':
          return todos.filter(todo => todo.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(todo => !todo.completed)
        default:
          return todos
      }
    }
  )
}

```

```plain text
const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos()
  const mapStateToProps = (state, props) => {
    return {
      todos: getVisibleTodos(state, props)
    }
  }
  return mapStateToProps
}

const VisibleTodoList = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TodoList)

```

[前回の記事](https://qiita.com/tkow/items/bca43546a98e42121873)で説明したように、mapToStatePropsは、クロージャにして、戻り値を関数にすると、subscribeのタイミングで戻り値の関数によってstateからpropsへのマッピングが可能になり、クロージャ内で変数のバインドができます。

以上の実装によって、makeMapStateToPropsが、個別のComponent毎に別々のクロージャを生成されるため、getVisibleTodosの実体はmapStateToPropsを実行する個別のComponentにバインドされることになります。これによって、getVisibleTodosは、Component毎に前回の入力と、その計算結果のキャッシュを別々に保持できるようになり、それぞれのコンポーネントがキャッシュしてるpropsの値が異なって保持されるようになるため、自分以外のコンポーネントの更新があっても、自分のコンポーネントはメモ化した関数から前回の計算結果を受け取れるようになります。

見て分かる通り、この実装は、コンポーネントの数だけ、キャッシュされるデータとクロージャの実体が増えるので、速度とメモリのトレートドオフになっているということが見て分かるかと思います。このメモリの使用量に対して、実際は処理のパフォーマンスの低下の方が大きく問題になることが多いため、基本的にはメモ化を行うようにした方がいいと思います。

メモリの使用量と、処理速度はトレードオフですが、メモ化は出来る限りしましょう。