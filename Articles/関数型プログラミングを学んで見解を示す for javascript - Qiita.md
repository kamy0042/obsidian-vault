---
プロパティ: ""
Created: 2021-01-15T20:46:00
URL: https://qiita.com/ayumu_terahara/items/45ec11493ae1812db004
Tags: [topic/技術/関数型プログラミング]
---
関数型プログラミングを silver の bullet としてなりふり構わず振り回していましたが、
ちょっと真面目に学ぶ機会を設けてみました。

関数型プログラミング（Functional Programming）を学んだ参考書の紹介と
私の浅い見解についてまとめていきます。

## 参考書のご紹介

1. [Functional-Light-JS](https://github.com/getify/Functional-Light-JS)
筆者曰く、筆者の数学的知識は一般レベル、Scheme/Clojure/Haskell は未経験。
そのため関数型本来の意味や各用語の学術的な意味合い等は記載しておらず、
実用的なアプローチと共にお送りする文書とのこと。
いわゆるボトムアップ。
2. [functional-programming-jargon](https://github.com/hemanth/functional-programming-jargon#functional-programming-jargon)
こちらは打って変わって関数型に関する jargon についてまとめています。
1 番ありきでこちらを付加資料として読むと見識が深まるかと思います。
いわゆるトップダウン。

## Functional-Light-JS

### Chapter 1: Why Functional Programming?

同じ処理に対して 2 つの異なるアプローチを取っています。
これらを元に Functional Programming (FP) とはなんたるか、について説明しています。
サンプルコードそのままを読んだ方が早いのでそのまま引用します。

### 一般的なアプローチ

`var numbers = [4, 10, 0, 27, 42, 17, 15, -6, 58];
var faves = [];
var magicNumber = 0;

pickFavoriteNumbers();
calculateMagicNumber();
outputMsg(); // The magic number is: 42

// ***************

function calculateMagicNumber() {
  for (let fave of faves) {
    magicNumber = magicNumber + fave;
  }
}

function pickFavoriteNumbers() {
  for (let num of numbers) {
    if (num >= 10 && num <= 20) {
      faves.push(num);
    }
  }
}

function outputMsg() {
  var msg = `The magic number is: ${magicNumber}`;
  console.log(msg);
}`

### FP を使ったアプローチ

`var sumOnlyFavorites = FP.compose([
  FP.filterReducer(FP.gte(10)),
  FP.filterReducer(FP.lte(20))
])(sum);

var printMagicNumber = FP.pipe([
  FP.reduce(sumOnlyFavorites, 0),
  constructMsg,
  console.log
]);

var numbers = [4, 10, 0, 27, 42, 17, 15, -6, 58];

printMagicNumber(numbers); // The magic number is: 42

// ***************

function sum(x, y) {
  return x + y;
}
function constructMsg(v) {
  return `The magic number is: ${v}`;
}`

### 各アプローチに対する解釈

処理の概要は大きく分けて２つ

3. お気に入りの数値をフィルターする
4. フィルター結果を合算する

これらを FP を使ったアプローチを例にして細かく解釈します。
※なお、FP ライブラリについては隠蔽化されている前提で私も中身は推測で話しています。

5. お気に入りの数値をフィルターする`FP.filterReducer( FP.gte( 10 ) )`で 10 以上の値をフィルタし配列化します。`FP.filterReducer( FP.lte( 20 ) )`は 20 以下同上。`sum`で合算します。
それらをまとめる`FP.compose`はカリー化されており、
１つ目の関数では、 フィルタした配列を Flat にする例えば`[[10以上の値たち], [20以下の値たち]]` → `[10以上の値たち, 20以下の値たち]`とする。
2 つ目の関数では、`sum`を引き渡して計算方法を指定しています。
6. フィルター結果を合算する`FP.reduce( sumOnlyFavorites, 0 )`で先ほどの flat 化された配列を展開して`sum`っています。
つまり処理的には`[10以上, 20以下].reduce((x, y) => sum(x, y))`のようなことになっているのでしょう。`FP.pipe`は合計値、合計値を引数に取る関数、
それらを処理する最終的な関数で構成されています。
つまり、 `console.log(constructMsg(合計値))` と処理されているのでしょう。

このアプローチについて**一般的なアプローチと比較したら可読性/保守性に優れていると断言出来ない**です。
（と筆者も述べています）
しかし、文書全体を理解して、**FP を使ったアプローチを読み返した時関数型に必要な要素が散りばめられている**
と気付くことが出来ると思います。

### ちょっとしたまとめ

じゃあ FP って他の人から見たら読みづらいだけでデメリットしかないのでは？
と疑問が湧きますが、そうではないと思います。

1 つ目のコードは綺麗な命令型アプローチですね。
最初に宣言された `faves, magicNumber`が`if, for`を経てどう変遷していくのか
処理を追う必要があります。

ネガティブに捉えると `faves`は第三の関数`clearTheFaves`が登場することで
空配列に変わる未来もあります。
破壊的変更を容認していると言えます。

2 つ目のコード（FP を使ったアプローチ）では宣言された変数は Input となる`numbers`のみです。
破壊的変更を促す変数は宣言されていないです。
更に開発者がソースリーディングする順番は前者とは逆のアプローチを取っています。

7. `printMagicNumber`で`numbers`を加工する
8. `sumOnlyFavorites`で`numbers`が順番に処理される
9. 処理する内容は 10 以上/20 以下である。

これは可読性で言えば、処理の流れが明確であり処理の全貌を知る必要が無く
ソースリーディングする範囲を狭めていると言えます。

保守性で言えば、仕様を変更するためには処理の全貌を知った上で
更に既存の機能を再構成することを強いられるため暗黙的なバグ/破壊を排除出来ると言えます。

このように FP を知っている人から見れば可読性/保守性は高い！と言えるのです！

### ----以降は FP の中身に入っていくので端折ります。----

### Chapter 2: The Nature Of Functions

関数型プログラミングの基礎

- FP でいう関数とは`y = f(x)`のように１つ以上の入力と出力と定義します
- this を使用することで関数の暗黙的な入力にな流ので、this は使わないようにしましょう

### Chapter 3: Managing Function Inputs

関数型の入力機能について

- `curry`, `部分適用`：引数を減らす・戻す技術。
- `point-free`：引数に直接関数を入れちゃう技術。

これらはコードを簡潔に書く際には非常に有用ですが、
やりすぎると可読性を損ないますのでご注意を。

### Chapter 4: Composing Functions

複数の関数出力を組み合わせてデータをルーティングする関数合成について。
js の関数は単一の値しか返すことができないので基本的に単項な関数のみで扱われます。

### Chapter 5: Reducing Side Effects

副作用を減らしていこうというお話（直訳）
冪等性を担保し、副作用や影響のない純粋関数を目指しましょう。
ただし副作用のないプログラムを作ることは不可能であるので、
それを担保するための意味合いを理解しよう。

### Chapter 6: Value Immutability

値の不変性について。
状態が変化する場合は、既存の値を変更せずに新しい値を作成しましょう。
ES6+の`const`は値の不変性を担保する目的には不十分です。

繊細なパフォーマンスを維持するために不変性を強制したい場合は`Object.freeze()`や`immutable.js`を使うことが最善策です。

### Chapter 7: Closure vs Object

クロージャとオブジェクトの優位性については冷戦状態で答えを見つけられていません。
クロージャとオブジェクトは同型で互換的に使用でき、それぞれに利点があります。
FP との関連性やこれらについてもっと詳しく知りたい場合は当該章を読む必要があります。~~私はよくわかっていません~~

### Chapter 8: Recursion

関数といえば再帰処理ですね。
再帰処理はコードの読みやすさに対して利用することは有用です。
誤用すると可読性が大きく損なわれるので注意して使いましょう。
また、js には再帰のメモリ的制約が多いので `最適化` のテクニックを使いましょう。

### Chapter 9: List Operations

みんな大好き`map`、`reduce`、`filter`などのリスト操作についての話です。
ES6+にはお馴染みです。

### Chapter 10: Functional Async

非同期についてです。
FP として特別な知識は必要なく`promise`、`observable`をありのままに使いましょう。

### Chapter 11: Putting It All Together

全体を理解した上でいくつかの実業務にあてはめた FP の実装例が載っています！
全体を理解した上で興味あれば！

## functional-programming-jargon

FP の用語について解説です。
結構細かいので読んでおきましょう。

## 総括

1 章に全てを出しきりました・・・

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f614.png)

今までは何となくで副作用や参照透過性を意識しつつ書いてはみましたが、
FP をチーム開発で使うとなると FP の特性、何故 FP かを十分に理解しなければ
共通言語として使うことは出来ません。

FP 書からは「モナド！」と呪文を唱えられて、
結局実装中にこの呪文を意識して使うことが出来なかった経験が多いです。
JavaScript は非純粋関数型言語であり、その域を超えられることは出来ませんが、
JavaScript プログラマーを名乗るために様々なパラダイムを取り入れていきたいと思います。