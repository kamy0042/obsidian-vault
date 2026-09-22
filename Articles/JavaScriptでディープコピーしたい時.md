---
Created: 2021-01-15T18:13:00
Tags: [topic/技術/JavaScript]
---
# はじめに

モーダルを使うときなど、オブジェクトのディープコピーを作りたくなることがたまにあり、
調べても自分が期待する結果になるような方法がなかったので、備忘録的にまとめておこうと思います。間違いやもっと良い方法などありましたら、コメントいただけると嬉しいです！

# 実現したいこと

下記のように Array の中に複数オブジェクトがあるデータを良い感じにコピーしたい。。



`[{'key1': 'value1', 'key2':'value2'},{'key1': 'value3', 'key2': undefined}]`

## なぜディープコピーする必要があるか

上記をコピーしてコピー先のオブジェクトを変更してみると・・



`let lists = [{'key1': 'value1', 'key2':'value2'},{'key1': 'value3', 'key2': undefined}]
let copyLists = [...lists]
lists[0].key1 = "hoge"

console.log({lists})
console.log({copyLists})`

実行結果（一部抜粋）



`lists: Array(2)
0: {key1: "hoge", key2: "value2"}
1: {key1: "value3", key2: undefined}

copyLists: Array(2)
0: {key1: "hoge", key2: "value2"}
1: {key1: "value3", key2: undefined}`

このようにコピー先のオブジェクトを変更したところ、コピー元のオブジェクトまで更新されてしまいました。上記のようなコピーの仕方の場合、 lists と copyLists がメモリ上の同じデータを参照してしまっているためです。（細かいところは自分も理解し切れていないのですが、上記の場合はコピーして別のオブジェクトを作ったというより、同じオブジェクトに対して別名を付けているようなもの？と理解しています）

一方ディープコピーの場合は、オブジェクトとメモリ上のデータの両方をコピーするため、独立したオブジェクトを作ることができます。

## ディープコピーを試してみた

### 方法1

ネットで検索するとよく出てくるのが、 JSON.parse(JSON.stringify()) を使用する方法。
まずはこの方法を試してみました。



`let lists = [{'key1': 'value1', 'key2':'value2'},{'key1': 'value3', 'key2': undefined}]
let copyLists = JSON.parse(JSON.stringify(lists))
lists[0].key1 = "hoge"

console.log({lists})
console.log({copyLists})`

実行結果（一部抜粋）



`lists: Array(2)
0: {key1: "hoge", key2: "value2"}
1: {key1: "value3", key2: undefined}

copyLists: Array(2)
0: {key1: "value1", key2: "value2"}
1: {key1: "value3"}`

確かにコピー先のオブジェクトを変更しても、コピー元のオブジェクトは更新されなくなりましたがkey2 がなくなっていることから、値が undefined の場合はキーごと消えてしまうよう。。
調べてみたところ、[こちらの記事](https://qiita.com/seihmd/items/74fa9792d05278a2e898)で解説があり、どうやら特定のオブジェクトのプロパティだった場合、消されてしまうようです。

### 方法2

Array.prototype.map() で新しいオブジェクトを作るパターン



`let lists = [{'key1': 'value1', 'key2':'value2'},{'key1': 'value3', 'key2': undefined}]
let copyLists = lists.map( list => ({'key1': list.key1, 'key2': list.key2}))
lists[0].key1 = "hoge"

console.log({lists})
console.log({copyLists})`

実行結果（一部抜粋）



`lists: Array(2)
0: {key1: "hoge", key2: "value2"}
1: {key1: "value3", key2: undefined}

copyLists: Array(2)
0: {key1: "value1", key2: "value2"}
1: {key1: "value3", key2: undefined}`

コピー先のオブジェクトを変更しても、コピー元のオブジェクトは更新されず、値が undefined になっているオブジェクトもディープコピーできました！



`let lists = [{'key1': 'value1', 'key2':'value2'},{'key1': 'value3', 'key2': undefined}]
let copyLists = lists.map( list => ({...list}))
lists[0].key1 = "hoge"

console.log({lists})
console.log({copyLists})`

実行結果（一部抜粋）



`lists: Array(2)
0: {key1: "hoge", key2: "value2"}
1: {key1: "value3", key2: undefined}

copyLists: Array(2)
0: {key1: "value1", key2: "value2"}
1: {key1: "value3", key2: undefined}`

スプレット構文を使った方法であれば、仮に key が変わった場合でも、修正が不要になるので良さそうです！

### 方法3

lodashを使う方法
予めlodashをインストールしておきます！



`npm i --save lodash`

こちらでインポートします！



`import _ from 'lodash'`

lodash の cloneDeep を使ったディープコピー



`let lists = [{'key1': 'value1', 'key2':'value2'},{'key1': 'value3', 'key2': undefined}]
let copyLists = _.cloneDeep(lists)
lists[0].key1 = "hoge"

console.log({lists})
console.log({copyLists})`

実行結果（一部抜粋）



`lists: Array(2)
0: {key1: "hoge", key2: "value2"}
1: {key1: "value3", key2: undefined}

copyLists: Array(2)
0: {key1: "value1", key2: "value2"}
1: {key1: "value3", key2: undefined}`

lodash を別途インストールする必要はありますが、
・実装が容易になる
・他の方法と違い、深い階層までディープコピーできる
以上の点から今後はこちらの方法で実装していこうと思います！

# まとめ

この辺は地味にハマるところなので、徐々に理解を深めていきたいと思いました。。

# 参考にさせていただいた記事