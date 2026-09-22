---
プロパティ: ""
Created: 2021-01-15T20:46:00
URL: https://tech.recruit-mp.co.jp/front-end/post-15867/
Tags: [topic/技術/関数型プログラミング]
---
## 前置き ( ※ 読み飛ばしていただいても OK )

JavaScript は関数型ライクなエッセンスを一部含んではいるものの、決して Haskell のような純粋関数型言語ではありません。JavaScript では変数やオブジェクトの状態を自由に書き換えるようなプログラミングスタイルを通常としているからです。したがって JavaScript で関数型プログラミングをまともに行うのは本来ナンセンスなのかもしれません。しかし関数型の持つ要素の一部だけを取り入れたプログラミングをすることは可能であり、これらを習得することは大規模かつ堅牢な web アプリケーションを設計するのに少なからず恩恵をもたらします。また、 JavaScript には [Underscore.js](http://underscorejs.org/) / [Lodash](https://lodash.com/) や [Immutable.js](https://facebook.github.io/immutable-js/)、 [Ramda.js](http://ramdajs.com/) といった便利なリスト操作ライブラリや [RxJS](http://reactivex.io/rxjs/) のような非同期処理ライブラリは、 JavaScript で関数型プログラミングをするうえで強力な手助けとなります。

当初は Ramda.js の入門エントリを書くつもりだったのですが、これを理解するには関数型プログラミングの基礎知識が求められます。そこでいきなり Ramda.js と戯れる前に関数型プログラミングの基礎の基礎について学んでみるとしましょう。

### シリーズ一覧

- 高階関数 👈 この記事
- [カリー化](https://tech.recruit-mp.co.jp/front-end/post-15885/)
- [部分適用](https://tech.recruit-mp.co.jp/front-end/post-15914/)
- [純粋関数](https://tech.recruit-mp.co.jp/front-end/post-15837/)

当シリーズは関数型プログラミングの全てを習得することを目的としたものではありません。あくまで JavaScript プログラミングに関数型のエッセンスをほんの少し取り入れるところまでを目的とした入門者向けの内容を目指しています。関数型プログラミングを本格的に学びたいという方は、 素直に Haskell や Lisp などを題材に学習されることを強くおすすめします。

## 高階関数の定義

高階関数を簡単に定義するとこんな感じになります。

- 関数を『引数』もしくは『戻り値』として扱う関数のこと

JavaScript では関数もデータ型の一種 ( `Function` という型が存在する ) として定義されています。ピンと来ない方は `Array.prototype.forEach()` を思い出してみてください。代表的な配列操作の関数ですが、これがまさに関数を引数に取っています。

```plain text
const stones = ['mick', 'keith', 'ronnie', 'charlie'];

stones.forEach((member) => {
    // do something ...
});

```

配列の各アイテム ( オプショナルでインデックスと forEach が適用される配列そのもの ) を引数に持つ関数が `forEach()` に引数として渡されてますね。まさしく高階関数そのものです。つまり JavaScript を使っている人であれば自然と高階関数には慣れ親しんでるということです。

他にも `map`、 `filter`、 `sort`1)`sort` 関数は元となる配列そのものを改変してしまうため、副作用のある関数とみなされます。 などの iteratative なメソッドは、全て高階関数となります。如何ですか？関数型プログラミングがぐっと身近なものに感じられるのではないでしょうか 😇

## 簡単な高階関数を自作してみよう

より深く理解するために簡単な高階関数を自作してみましょう。最初にある数値と値を引数に取り、その値を数値の数だけ要素として格納した配列を返す関数 `repeat` を作ってみます。

```plain text
import * as _ from 'lodash';

function repeat(times: number, value: any): any[] {
  return _.map(_.range(times), () => value)
}

repeat(3, 'foo');  
//=> [foo", "foo", "foo"]

```

実装をシンプルにするためにここでは `Lodash` ライブラリを使っています。ここでは `_.map` 関数を使って `times` の数だけ配列を走査し、上記の例のように実行すると `value` に渡された文字列 `foo` を3回配列に送り込みます。

これ自体は高階関数でもなんでもありません。この実装に大きな問題はありませんが、このような単に値を繰り返すだけの処理ではなく、『ある計算を繰り返す』関数とした方がより抽象度および再利用性が高いものとなります。次のように修正してみましょう。

```plain text
function repeatedly(times: number, f: (value: any) => any): any[] {
  return _.map(_.range(times), f);
}

repeatedly(3, () => Math.random() * 10 + 1);
//=> [6.440716057227879, 4.58105440499825, 4.298355912680706]

```

値そのものではなく関数そのものを引数に受取り、その結果を配列に送り込みます。こうすることで『繰り返し』という機能をより汎用的なもの出来ます。`repeat` のように関数を呼び出す際の固定値で配列を満たすのでなく、任意の処理結果で値を満たすことが出来ます。単に固定値で満たしたいときは次のようにすれば良いのです。

```plain text
repeatedly(3, () => 'bar');
//=> ['bar', 'bar', 'bar']

```

ちなみに Ramda.js には `repeat`　関数と全く同じ動作をする `R.repeat` や、 `repeatedly` 関数と同じ `R.times` という関数がはじめから備わっています。

```plain text
import {repeat, times} from 'ramda';

repeat(3, 'bar');
//=> ['bar', 'bar', 'bar']

times(() => Math.random() * 10 + 1, 3);
//=> [6.440716057227879, 4.58105440499825, 4.298355912680706]

```

- [repeat - Ramda Documentation](http://ramdajs.com/docs/#repeat)
- [times - Ramda Documentation](http://ramdajs.com/docs/#times)

## 戻り値として他の関数を返す関数

JavaScript に慣れ親しんだ人であれば『クロージャ』というのを聞いたことがあるでしょう。関数内で無名関数が生成され、それが戻り値として返される仕組みのことですが、『関数を戻り値として返す』という要件に該当しています。つまりクロージャは高階関数の一種です。

- [クロージャ - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Closures)

```plain text
function outer() {
    const inner = () => {        // 無名関数を定義して inner に代入
        console.log('hello!!');
    };
    return inner;                // inner 関数を戻り値として返す
}

const f = outer();              // outer 関数の戻り値 ( inner関数 ) が f に代入される
f();                            // inner 関数が実行され 'hello!!' と表示される。

```

クロージャは一つの値 ( もしくは参照 ) を確保し、常に同じ値を返すという特徴があります。つまり `f()` の 実行結果は必ず等しくなります。

```plain text
f() === f();
//=> true

```

`function` 演算子 ( もしくはアロー式 ) で生成される関数は、関数実行内部の内容に関係なく毎回異なるインスタンスを返す特徴があります。つまり実行結果は同じでもそのインスタンスは別に複製されたものとなります ( 片方に変更が入ってももう片方への影響はない ) 。

```plain text
const f = outer();
const g = outer();

f === g;
//=> false

```

### なぜ関数を返す関数というものが存在するのか

先ほどの例では単に `outer` 関数を実行するだけだったのでイメージが掴みにくかったですが、『関数の設定値を引数に渡す』というとどうでしょうか？次のような例で考えてみましょう。

```plain text
function makeGreet(timeZone) {
    const greet = (name) => {
        console.log(`Good ${timeZone}, ${name} !!`);
    };
    return greet;
}

const f = makeGreet('morning');
f('naoki');
//=> "Good morning, naoki !!"

const g = makeGreet('afternoon');
g('wakamsha');
//=> "Good afternoon, wakamsha !!"

```

高階関数である `makeGreet` 関数は返される関数の動作が引数によって設定され、常にその引数の値を加える関数を返します。我々は Cycle.js という JavaScript フレームワークを業務で使っていますが、この Cycle.js の Driver という仕組みがまさにこの高階関数 ( クロージャ ) で成り立っています。

今回はここまで。次回は『カリー化 ( と部分適用 )』について学んでみたいと思います。

脚注   [  ]

1.	↑	`sort` 関数は元となる配列そのものを改変してしまうため、副作用のある関数とみなされます。