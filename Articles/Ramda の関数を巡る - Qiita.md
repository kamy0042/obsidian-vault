---
プロパティ: ""
Created: 2021-02-26T21:03:00
URL: https://qiita.com/41semicolon/items/8aeeed3e114cdc54ec92
Tags: [topic/技術/関数型プログラミング]
---
![[Attachments/無題のフォルダ/https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-1150d8b18a7c15795b701a55ae908f94.png]]

Ramda の関数はたくさんあるので整理

# 1. 関数合成

関数合成は、`pipe`, `compose` を使うのが基本。最初に渡す関数の引数が 1 の場合に使う `o` というのもある。Promise の then チェーンは `composeP`, `pipeP`。 モナドなど chain を満たすものの 直列化には、 `composeK`, `pipeK`。

さて、関数合成は関数適用の直列化とみなせるが、時にはデータを一つの関数に渡すのではなく、複数の関数に渡したい場合がある（例: 平均を求めるプログラム）。その際は、次の選択肢がある:

- `juxt`: Arrayの各要素に結果を詰める
- `applySpec`: オブジェクトの各プロパティに結果を詰める
- `converge`: 結果を別の関数に渡す 
    - `useWith` も似た機能を持つが、関数合成の観点では不要
- `either`, `both`, `allPass`, `anyPass`: predicateを生成

面白いのが、`converge` と `call` を組み合わせた使い方だ。データをもとに、適用する関数とそれに渡すデータをまとめて作り、実行するというパターン（詳細は `call` の例をみよ)

分岐には、`cond`（フル機能）、`ifElse`（シンプル機能）が利用できる。

# 2. 反復操作

`map`, `filter`, `reduce` あたりが基本だが、これらは汎用的なので、次に示すように、用途にあった関数を優先して使う。`sum` は和、 `product` は積、`any`, `all`, `none`, `contains` は各種判定、`find`, `findIndex`, `findLast`, `findLastIndex` は抽出、`groupBy`, `countBy` は集計、`sort`, `sortBy` は並び変え。

また、反復の打ち切りができる。`reduceWhile`、`take`、`takeWhile`、`head` などがあげられる。あと、reducer が `reduced` を使った値を返すと、`reduce` も反復を打ち切ってくれる。マイナーだが覚えておくとよいのは、`unfold`, `mapAccum`, `while`, `until`

避けて通れないのが transformer/transducer だ。`into`, `transduce` は `reduce` の一形態であるとみなせるが、反復操作を入出力を意識しない transducer として実装できるのが強み。`map`, `filter`, `take`, `takeWhile`, `groupBy`, などなど多くの反復操作が transducer となるので、これはtransducer になりそう、と思ったらマニュアルを確認するべき。

# 3. Array/Object 操作

Array関連。要素取り出し系は `head`, `last`, `nth`, 複数の要素取り出しには、`split*`, `slice`, `init`, `tail`。配列の非破壊な変更には、`insert`, `append`, `prepend`, `adjust`, `update`, `remove`。 Array が複数ある場合は、`xprod` で直積、`zip`, `zipWith`, `zipObj` で突き合わせ。ネストされたArrayに対しては、`transpose` で転置、`flatten`, `unnest` はネストの深さを下げる。

Object関連。要素取り出し系は、`prop`, `has`, `path`, `pick`, `omit` は頻出。非破壊な変更は、`assoc`, `dissoc`, `merge*`。プロパティをまとめて作る時は、`evolve`, `applySpec` を検討。`lens`, `view`, `set`, `over`がセットでレンズ機能。

ArrayとObjectの相互変換には、`toPairs`, `fromPairs`, `values`, を使う。

ArrayをSetのように扱う関数もあり、`uniq`, `difference`, `intersection`, `union`などが存在する。

# 4. 代数的データ型

基本的に Functor, Monad, Traversable, ... といった代数構造を適切に扱える。Fantasy-land spec に準拠したオブジェクトであれば、それらを適切に扱える。

具体的には、`map`, `chain`, `lift`, `ap`, `traverse`, `sequence` などが使える。monet.js や folktaleなどなどと併用できる。

# 5. 引数・呼び出し

`partial` で部分適用。引数の場所が合わない場合など、`curry` して、 `_` を代入した部分適用も使われる。

`flip`で引数順序を変更した関数を作れる。

可変引数が扱いにくい場合、`apply` で可変長引数の関数を引数1の配列をとる関数に変更できる。その逆は `unapply` 。また、可変引数の関数は、`unary`, `binary`, `nAry` で強制的に引数の数を変更できる。

関数とデータを変更したい場合がある（例：関数合成でパイプライン的にデータを処理する際）。`applyTo` を使って先に引数を決めておいて、呼び出し関数を後から指定出来る。

# 6. 便利関数

その他便利関数。`range`, `repeat`, `times` は反復に必要な Array 等を生成するのに使える。`memoizeWith` はメモ化、`once` は引数無視のメモ化とみなせる。`tap` はデバッグ。`clone` はディープコピー。`when`, `ifElse` は関数実装の中で if 文をするのを減らせる。`tryCatch`は字のごとく。