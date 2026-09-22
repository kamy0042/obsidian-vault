---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
**TypeScript**は型がついたJavaScriptです。プログラミングにおいて型があることの恩恵は大きく、近頃AltJSの代表格として人気を集めています。TypeScriptはもともと型のないJavaScriptで書かれるコードに型を付けることを使命としていることもあり、たまに変な型が追加されます。例えばTypeScript2.8で追加された[conditional types](https://qiita.com/Quramy/items/b45711789605ef9f96de)はずいぶん注目を集めました。これによってTypeScriptの型システムの表現力が広がりましたが、一方でTypeScriptを書いている人の中には、よく分からない型が増えてついて行けない、一部の人たちが長くてよく分からない型定義を書いて喜んでいるだけと思っている方もいるのではないでしょうか。実際、健全にJavaScriptを書いていれば、自分でそのような変な型を書くことはあまり多くありません。

そこで、この記事ではTypeScriptの型について初歩から解説します。対象読者は**TypeScriptを使っているけど型のことはよく分からない人**や**TypeScriptを使っていないけどTypeScriptの型システムに興味がある人**などです。なお、型入門なのでTypeScriptの文法などは解説しません。具体的な文法などを知らなくても理解できるようにしていますが、文法を知りたいという方は先に他の入門記事を読むことをおすすめします。

※ 最終更新: 2019-11-05 (TypeScript 3.7対応)

# プリミティブ型

TypeScriptにおいて一番基本となる型は**プリミティブ型**です。これはJavaScriptのプリミティブの型と対応しており、`string`, `number`, `boolean`, `symbol`, `bigint`, `null`, `undefined`があります。これらは互いに異なる型であり、相互に代入不可能です。

`const a: number = 3;

const b: string = a; // エラー: Type 'number' is not assignable to type 'string'.`

ただし、コンパイラオプションで`--strictNullChecks`をオンにしていない場合は、`null`と`undefined`は他の型の値として扱うことができます。

`const a: null = null;

const b: string = a; // strictNullChecksがオンならエラー`

逆に言うと、`--strictNullChecks`をオンにしないとundefinedやnullが紛れ込む可能性があり危険です。このオプションはTypeScript2.0で追加されたもので、それまで適当だったundefinedやnullの扱いを改善する素晴らしいオプションです。このオプションは常にオンにするのがよいでしょう。

# リテラル型

プリミティブ型を細分化したものとして**リテラル型**があります。リテラル型には文字列のリテラル型と数値のリテラル型と真偽値のリテラル型があります。それぞれ、`'foo'`や`3`や`true`というような名前の型です。

お分かりのように、`'foo'`というのは`'foo'`という文字列しか許されない型です。同様に、`0`というのは`0`という数値しか許されない型になります。

`const a: 'foo' = 'foo';
const b: 'bar' = 'foo'; // エラー: Type '"foo"' is not assignable to type '"bar"'.`

文字列のリテラル型は`string`の部分型であり、文字列のリテラル型を持つ値はstring型として扱うことができます。他の型も同様です。

`const a: 'foo' = 'foo';
const b: string = a;`

## リテラル型と型推論

上の例では変数に全て型注釈を付けていましたが、これを省略してもちゃんと推論されます。

`const a = 'foo'; // aは'foo'型を持つ
const b: 'bar' = a; // エラー: Type '"foo"' is not assignable to type '"bar"'.`

これは、`'foo'`というリテラルの型が`'foo'`型であると推論されることによります。変数aは`'foo'`が代入されているので、aの型も`'foo'`型となります。

ただし、これはconstを使って変数を宣言した場合です。JavaScriptにおけるconstは変数に再代入されないことを保証するものですから、aにはずっと`'foo'`が入っていることが保証され、aの型を`'foo'`とできます。一方、constではなくletやvarを使って変数を宣言した場合は変数をのちのち書き換えることを意図していると考えられますから、最初に`'foo'`が入っていたからといって変数の型を`'foo'`型としてしまっては、他の文字列を代入することができなくて不便になってしまいます。そこで、letやvarで変数が宣言される場合、推論される型はリテラル型ではなく対応するプリミティブ型全体に広げられます。

`let a = 'foo'; // aはstring型に推論される
const b: string = a;
const c: 'foo' = a; // エラー: Type 'string' is not assignable to type '"foo"'.`

上の例では、aはletで宣言されているので`string`型と推論されます。そのため、`'foo'`型を持つcに代入することはできなくなります。

なお、letで宣言する場合も型注釈をつければリテラル型を持たせることができます。

`let a: 'foo' = 'foo';
a = 'bar'; // エラー: Type '"bar"' is not assignable to type '"foo"'.`

# オブジェクト型

JavaScriptの基本的な概念として**オブジェクト**があります。オブジェクトは任意の数のプロパティがそれぞれ値を保持している構造です。もちろん、TypeScriptにはオブジェクトを表現するための型があります。これは、`{ }`の中にプロパティ名とその型を列挙するものです。

例えば`{foo: string; bar: number}`という型は、fooというプロパティが`string`型の値を持ちbarというプロパティが`number`型の値を持つようなオブジェクトの型です。

`interface MyObj {
  foo: string;
  bar: number;
}

const a: MyObj = {
  foo: 'foo',
  bar: 3,
};`

なお、この例でinterfaceという構文が出てきましたが、これはTypeScript独自の（JavaScriptには存在しない）構文であり、オブジェクト型に名前を付けることができます。この例では、`{foo: string; bar: number}`という型に`MyObj`という名前を付けています。また、分かりやすくするためにconstに型注釈を付けていますが、型注釈をしなくてもオブジェクト型を推論してくれます。

もちろん、型が合わないオブジェクトを変数に代入したりしようとすると型エラーとなります。下記の例では、aに代入しようとしているオブジェクトはbarプロパティの型が違うためエラーになり、bに代入しようとしているオブジェクトはbarプロパティが無いためエラーとなります。

`interface MyObj {
  foo: string;
  bar: number;
}

// エラー:
// Type '{ foo: string; bar: string; }' is not assignable to type 'MyObj'.
//  Types of property 'bar' are incompatible.
//    Type 'string' is not assignable to type 'number'.
const a: MyObj = {
  foo: 'foo',
  bar: 'BARBARBAR',
};

// エラー:
// Type '{ foo: string; }' is not assignable to type 'MyObj'.
//  Property 'bar' is missing in type '{ foo: string; }'.
const b: MyObj = {
  foo: 'foo',
};`

JavaScriptではオブジェクトは自由に書き換えることができます。プロパティの書き換えはもちろん、プロパティを作ったり消したりすることもできます。しかし、TypeScriptではそのような操作は型によって制限されます。そうでないと型を導入した意味がありませんね。

一方、TypeScriptでは構造的部分型を採用しているため、次のようなことが可能です。

`interface MyObj {
  foo: string;
  bar: number;
}

interface MyObj2 {
  foo: string;
}

const a: MyObj = {foo: 'foo', bar: 3};
const b: MyObj2 = a;`

`MyObj2`というのはfooプロパティだけを持つオブジェクトの型ですが、`MyObj2`型変数に`MyObj`型の値`a`を代入することができています。`MyObj`型の値は`string`型のプロパティfooを持っているため`MyObj2`型の値の要件を満たしていると考えられるからです。ちなみに、一般にこのような場合`MyObj`は`MyObj2`の部分型であると言います。

ただし、オブジェクトリテラルに対しては特殊な処理があります。次のような場合には注意してください。

`interface MyObj {
  foo: string;
  bar: number;
}

interface MyObj2 {
  foo: string;
}

// エラー:
// Type '{ foo: string; bar: number; }' is not assignable to type 'MyObj2'.
//  Object literal may only specify known properties, and 'bar' does not exist in type 'MyObj2'.
const b: MyObj2 = {foo: 'foo', bar: 3};`

変数bに代入しようとしている`{foo: 'foo', bar: 3}`はfooプロパティが`string`型を持つため、先ほどの説明からすれば、barプロパティが余計であるものの`MyObj2`型の変数に代入できるはずです。しかし、オブジェクトリテラルの場合は余計なプロパティを持つオブジェクトは弾かれてしまうのです。

これは、多くの場合余計なプロパティを持つオブジェクトリテラルを意図的に用いることが少なく、ミスである可能性が高いからでしょう。実際、TypeScriptの型システムを順守している限り、このような余計なプロパティは存在しないものと扱われるためアクセスする手段が無く、無駄です。どうしてもこのような操作をしたい場合はひとつ前の例のように別の変数に入れることになります。一度値を変数に入れるだけで挙動が変わるというのは直感的ではありませんが、TypeScriptでは入口だけ見ていてやるからあとは自己責任でということなのでしょう。

なお、上の例では変数bが`MyObj2`型であることを明示していましたが、関数引数の場合でも同じ挙動となります。

`interface MyObj2 {
  foo: string;
}

// エラー:
// Argument of type '{ foo: string; bar: number; }' is not assignable to parameter of type 'MyObj2'.
//  Object literal may only specify known properties, and 'bar' does not exist in type 'MyObj2'.
func({foo: 'foo', bar: 3});

function func(obj: MyObj2): void {
}`

オブジェクト型についてはまだ紹介すべきことが色々とありますが、都合上いったん後回しにします。

# 配列型

JavaScriptでは配列はオブジェクトの一種ですが、配列の型を表すために特別な文法が用意されています。配列の型を表すためには`[]`を用います。例えば、`number[]`というのは数値の配列を表します。

`const foo: number[] = [0, 1, 2, 3];
foo.push(4);`

また、TypeScriptにジェネリクスが導入されて以降は`Array<number>`と書くことも可能です。ジェネリクスについてはあとで述べます。

# 関数型

JavaScriptの、というより大抵のプログラミング言語において重要な概念として関数があります。TypeScriptにも当然ながら関数の型、すなわち**関数型**があります。関数型は例えば`(foo: string, bar: number)=> boolean`のように表現されます。これは、第1引数として`string`型の、第2引数として`number`型の引数をとり、返り値として`boolean`型の値を返す関数の型です。型に引数の名前が書いてありますが、これは型の一致等の判定には関係ありません。よって、`(foo: number)=> string`型の値を`(arg1: number)=> string`型の変数に代入するようなことは問題なく行えます。

function宣言などによって作られた関数にもこのような関数型が付きます。

`const f: (foo: string)=> number = func;

function func(arg: string): number {
  return Number(arg);
}`

## 関数の部分型関係

関数型に対しては、普通の部分型関係があります。

`interface MyObj {
  foo: string;
  bar: number;
}

interface MyObj2 {
  foo: string;
}

const a: (obj: MyObj2)=>void = ()=>{};
const b: (obj: MyObj)=>void = a;`

この例に見えるように、`(obj: MyObj2)=>void`型の値を`(obj: MyObj)=>void`型の値として扱うことができます。これは、`MyObj`は`MyObj2`の部分型なので、`MyObj2`を受け取って処理できる関数は`MyObj`を受け取っても当然処理できるだろうということです。aとbの型を逆にすると当然エラーになります。

また、関数の場合、引数の数に関しても部分型関係が発生します。

`const f1: (foo: string)=>void = ()=>{};
const f2: (foo: string, bar: number)=>void = f1;`

このように、`(foo: string)=>void`型の値を`(foo: string, bar: number)=>void`型の値として使うことができます。すなわち、引数を1つだけ受け取る関数は、引数を2つ受け取る関数として使うことが可能であるということです。これは、関数の側で余計な引数を無視すればいいので自然ですね。

ただし、関数を呼び出す側で余計な引数を付けて呼び出すことはできないので注意してください。これは先のオブジェクトリテラルの例と同じくミスを防止するためでしょう。

`const f1: (foo: string)=>void = ()=>{};

// エラー: Expected 1 arguments, but got 2.
f1('foo', 3);`

## 可変長引数

JavaScriptには、可変長引数という機能があります。それは、`(foo, ...bar)=> bar` のように、最後の引数を`...bar`のようにすると、それ以降（この関数の場合は2番目以降）の引数が全部入った配列が`bar`に渡されるというものです。

`const func = (foo, ...bar)=> bar;

console.log(func(1, 2, 3)); // [2, 3]`

TypeScriptでも可変長引数の関数を宣言できます。その場合、可変長引数の部分の型は配列にします。次の例では`...bar`に`number[]`型が付いているため、2番目以降の引数は全て数値でなければいけません。

`const func = (foo: string, ...bar: number[]) => bar;

func('foo');
func('bar', 1, 2, 3);
// エラー: Argument of type '"hey"' is not assignable to parameter of type 'number'. 
func('baz', 'hey', 2, 3);`

# void型

先ほどから何気なく`void`という型が出てきていますので、これについて解説します。この型は主に関数の返り値の型として使われ、「何も返さない」ことを表します。

JavaScriptでは何も返さない関数（return文が無い、もしくは返り値の無いreturn文で返る）はundefinedを返すことになっていますので、void型というのはundefinedのみを値にとる型となります。実際、void型の変数にundefinedを入れることができます。ただし、その逆はできません。すなわち、void型の値をundefined型の変数に代入することはできません。

`const a: void = undefined;
// エラー: Type 'void' is not assignable to type 'undefined'.
const b: undefined = a;`

この挙動は、void型を返す関数というのはあくまで何も返さない関数なのだから、その値を利用することはできないという意図があると思われます。

void型の使いどころは、やはり関数の返り値としてです。何も返さない関数の返り値の型としてvoid型を使います。void型はある意味特殊な型であり、返り値がvoid型である関数は、値を返さなくてもよくなります。逆に、それ以外の型の場合（any型を除く）は必ず返り値を返さなければいけません。

`function foo(): void {
  console.log('hello');
}

// エラー: A function whose declared type is neither 'void' nor 'any' must return a value.
function bar(): undefined {
  console.log('world');
}`

なお、大して意味はありませんが、undefinedをvoid型の値として扱うことができるので、void型を返す関数に`return undefined;`と書くことができます。

# any型

ここで、**any型**という言葉が出てきましたので、これについても解説します。any型は何でもありな型であり、プログラマの敗北です。

any型の値はどんな型とも相互変換可能であり、実質TypeScriptの型システムを無視することに相当します。

`const a: any = 3;
const b: string = a;`

この例では、変数aはany型の変数ですので、どんな値でも代入可能です。また、any型の値はどんな型の値としても利用可能ですので、any型の値をもつaをstring型の変数bに代入することができます。

上のプログラムを見ると最終的に数値がstring型の値に入ってしまっています。このように、any型を使うと型システムを欺くことが可能であり、TypeScriptを使っている意味が薄れてしまいます。ですので、any型はやむを得ない場面でのみ使用するのがよいでしょう。

# クラスの型

最近のJavaScriptにはクラスを定義する構文があります。TypeScriptでは、クラスを定義すると同時に同名の型も定義されます。

`class Foo {
  method(): void {
    console.log('Hello, world!');
  }
}

const obj: Foo = new Foo();`

この例では、クラスFooを定義したことで、`Foo`という型も同時に定義されました。`Foo`というのは、クラスFooのインスタンスの型です。上の例の最後の文はFooが2種類あって分かりにくいですが、`obj: Foo`のFooは型名のFooであり、`new Foo()`のFooはクラス（コンストラクタ）の実体としてのFooです。

注意すべきは、TypeScriptはあくまで構造的型付けを採用しているということです。JavaScriptの実行時にはあるオブジェクトがあるクラスのインスタンスか否かということはプロトタイプチェーンによって特徴づけられますが、TypeScriptの型の世界においてはそうではありません。具体的には、ここで定義された型`Foo`というのは次のようなオブジェクト型で代替可能です。

`interface MyFoo {
  method: ()=> void;
}

class Foo {
  method(): void {
    console.log('Hello, world!');
  }
}

const obj: MyFoo = new Foo();
const obj2: Foo = obj;`

ここで`MyFoo`という型を定義しました。これはmethodという関数型のプロパティ（すなわちメソッド）を持つオブジェクトの型です。実は`Foo`型というのはこの`MyFoo`型と同じです。クラスFooの定義から分かるように、Fooのインスタンス、すなわちFoo型の値の特徴はmethodというプロパティを持つことです。よって、その特徴をオブジェクト型として表現した`MyFoo`型と同じと見なすことができるのです。

# ジェネリクス

型がある言語にはいわゆる**ジェネリクス**というものがよく存在します。いわゆる多相型に関連するものです。TypeScriptにもジェネリクスがあります。

型名を`Foo<S, T>`のようにする、すなわち名前のあとに`< >`で囲った名前の列を与えることで、型の定義の中でそれらの名前を型変数として使うことができます。

`interface Foo<S, T> {
  foo: S;
  bar: T;
}

const obj: Foo<number, string> = {
  foo: 3,
  bar: 'hi',
};`

この例ではFooは2つの型変数S, Tを持ちます。Fooを使う側では`Foo<number, string>`のように、SとTに当てはまる型を指定します。

他に、クラス定義や関数定義でも型変数を導入できます。

`class Foo<T> {
  constructor(obj: T) {
  }
}

const obj1 = new Foo<string>('foo');

function func<T>(obj: T): void {
}

func<number>(3);`

ところで、上の例でfuncの型はどうなるでしょうか。実は、`<T>(obj: T)=> void`という型になります。

`function func<T>(obj: T): void {
}

const f: <T>(obj: T)=> void = func;`

このように、関数の場合は呼び出すまでどのような型引数で呼ばれるか分からないため、型にも型変数が残った状態になります。

余談ですが、型引数（`func<number>(3)`の`<number>`部分）は省略できます。

`function identity<T>(value: T): T {
  return value;
}

const value = identity(3);
// エラー: Type '3' is not assignable to type 'string'.
const str: string = value;`

この例ではidentityは型変数Tを持ちますが、identityを呼び出す側ではTの指定を省略しています。この場合引数の情報から`T`が推論されます。実際、今回引数に与えられている3は`3`型の値なので、`T`が`3`に推論されます。identityの返り値の型は`T`すなわち`3`なので、変数valueの型は`3`となります。`3`型の値は`string`型の変数に入れることができないので最終行ではエラーになっています。この例から`T`が正しく推論されていることが分かります。

ただし、複雑なことをする場合は型変数が推論できないこともあります。

# タプル型

TypeScriptは**タプル型**という型も用意しています。ただし、JavaScriptにはタプルという概念はありません。そこで、TypeScriptでは配列をタプルの代わりとして用いることにしています。これは、関数から複数の値を返したい場合に配列に入れてまとめて返すみたいなユースケースを想定していると思われます。

タプル型は`[string, number]`のように書きます。これは実際のところ、長さが2の配列で、0番目に文字列が、1番目に数値が入ったようなものを表しています。

`const foo: [string, number] = ['foo', 5];

const str: string = foo[0];

function makePair(x: string, y: number): [string, number] {
  return [x, y];
}`

ただし、タプル型の利用は注意する必要があります。TypeScriptがタプルと呼んでいるものはあくまで配列ですから、配列のメソッドで操作できます。

`const tuple: [string, number] = ['foo', 3];

tuple.pop();
tuple.push('Hey!');

const num: number = tuple[1];`

このコードはTypeScriptでエラー無くコンパイルできますが、実際に実行すると変数numに入るのは数値ではなく文字列です。このあたりはTypeScriptの型システムの限界なので、タプル型を使用するときは注意するか、あるいはそもそもこのようにタプル型を使うのは避けたほうがよいかもしれません。

ちなみに、0要素のタプル型なども作ることができます。

`const unit: [] = [];`

また、TypeScriptのタプル型は、可変長のタプル型の宣言が可能です。それはもはやタプルなのかという疑問が残りますが、これは実質的には最初のいくつかの要素の型が特別扱いされたような配列の型となります。

`type NumAndStrings = [number, ...string[]];

const a1: NumAndStrings = [3, 'foo', 'bar'];
const a2: NumAndStrings = [5];
// エラー: Type 'string' is not assignable to type 'number'.
const a3: NumAndStrings = ['foo', 'bar'];`

このように、可変長タプル型は最後に`...(配列型)`という要素を書いたタプル型として表されます。ここで定義した`NumAndStrings`型は、最初の要素が数値で、残りは文字列であるような配列の型となります。変数`a3`は、最初の要素が数値でないのでエラーとなります。もちろん、`[number, string, ...any[]]`のように型を指定された要素が複数あっても構いません。

ただし、`...`を使えるのはタプル型の最後に1回だけです。例えば「まず数値が並んで次に文字列が並ぶ配列の型」として`[...number[], ...string[]]`のような型を考えたくなるかもしれませんが、これは`...`を2回使っているのでだめです。他に、`[...string[], number]`のような型も、`...`を最後ではない場所で使っているのでだめです。

さらに、オプショナルな要素を持つタプル型もあります。これは、`[string, number?]`のように型に`?`が付いた要素を持つタプル型です。この場合、2番目の要素はあってもいいし無くてもいいという意味になります。ある場合は`number`型でなければなりません。

`type T = [string, number?];

const t1: T = ['foo'];
const t2: T = ['foo', 3];`

オプショナルな要素は複数あっても構いませんが、そうでない要素より後に来なければいけません。例えば`[string?, number]`のような型はだめです。

## タプル型と可変長引数

実は、最近（TypeScript 3.0）になってタプル型の面白い使い道が追加されました。それは、タプル型を関数の可変長引数の型を表すのに使えるというものです。

`type Args = [string, number, boolean];

const func = (...args: Args) => args[1];

const v = func('foo', 3, true);
// vの型はnumber`

ちょっと前に、可変長引数の型として配列を用いるということを紹介しましたが、実は配列の代わりにタプル型を用いることができます。上の例では、可変長引数`args`の型は`Args`、すなわち`[string, number, boolean]`です。これに合わせるために、すなわち引数の列`args`が型`Args`を持つようにするためには、関数funcの最初の引数の型は`string`、次は`number`、その次は`boolean`でなければいけません。もはや可変長という名前が嘘っぱちになっていますが、このようにタプル型を型の列として用いることによって、複数の引数の型をまとめて指定することができるのです。

ここで可変長タプルを用いた場合、引数の可変長性が保たれることになります。

`type Args = [string, ...number[]];

const func = (f: string, ...args: Args) => args[0];

const v1 = func('foo', 'bar');
const v2 = func('foo', 'bar', 1, 2, 3);`

また、同様に、オプショナルな要素を持つタプルの型を用いた場合はオプショナルな引数を持つ関数の型ができることになります。

## 関数呼び出しのspreadとタプル型

ところで、JavaScriptでは`...`という記法は関数呼び出しのときにも使うことができます。

`const func = (...args: string[]) => args[0];

const strings: string[] = ['foo', 'bar', 'baz'];

func(...strings);`

`func(...strings)`の意味は、配列`strings`の中身を`func`の引数に展開して呼び出すということです。つまり、`func`の最初の引数は`strings`の最初の要素になり、2番目の引数は2番目の要素に……となります。

タプル型はここでも使うことができます。適切なタプル型の配列を`...`で展開することで、型の合った関数を呼び出すことができるのです。

`const func = (str: string, num: number, b: boolean) => args[0] + args[1];

const args: [string, number, boolean] = ['foo', 3, false];

func(...args);`

## タプル型と可変長引数とジェネリクス

さて、以上の知識とジェネリクスを組み合わせることによって、面白いことができるようになります。タプル型をとるような型変数を用いることで、関数の引数列をジェネリクスで扱うことができるのです。

例として、関数の最初の引数があらかじめ決まっているような新しい関数を作る関数`bind`を書いてみます。

`function bind<T, U extends any[], R>(
  func: (arg1: T, ...rest: U) => R,
  value: T,
): ((...args: U) => R) {
  return (...args: U) => func(value, ...args);
}

const add = (x: number, y: number) => x + y;

const add1 = bind(add, 1);

console.log(add1(5)); // 6

// Argument of type '"foo"' is not assignable to parameter of type 'number'.
add1('foo');`

関数`bind`は2つの引数`func`と`value`を取り、新しい関数`(...args: U) => func(value, ...args)`を返します。この関数は、受け取った引数列`args`に加えて最初の引数として`value`を`func`に渡して呼び出した返り値をそのまま返す関数です。

ポイントは、まず`U extends any[]`の部分ですね。これは新しい記法ですが、型引数`U`は`any[]`の部分型でなければならないという意味です。`string[]`などの配列型に加えてタプル型も全部`any[]`の部分型です。この制限を加えることにより、`...rest: U`のように可変長引数の型として`U`を使うことができます。

加えて、`bind(add, 1)`の呼び出しでは型変数はそれぞれ`T = number, U = [number], R = number`と推論されます。返り値の型は`(...args: U) => R`すなわち`(arg: number) => number`となります。特に、`U`がタプル型に推論されるのが偉いですね。これにより、`add`の引数の情報が失われずに`add1`に引き継がれています。

# union型（合併型）

さて、ジェネリクスなど、ここまで説明してきた要素の多くは型のある言語なら普通にあるものだと思います。しかし、ここで紹介する**union型**を持っている言語はそこまで多くないのではないかと思います。TypeScriptはこのunion型のサポートに力を入れています。

union型は値が複数の型のどれかに当てはまるような型を表しています。記法としては、複数の型を`|`でつなぎます。例えば、`string | number`という型は「`string`または`number`である値の型」、すなわち「文字列または数値の型」となります。

`let value: string | number = 'foo';
value = 100;
value = 'bar';
// エラー: Type 'true' is not assignable to type 'string | number'.
value = true;`

この例では変数valueが`string | number`型の変数となっていますので、文字列や数値を代入することができますが、真偽値は代入することができません。

もちろん、プリミティブ型だけでなくオブジェクトの型でもunion型を作ることができます。

`interface Hoge {
  foo: string;
  bar: number;
}
interface Piyo {
  foo: number;
  baz: boolean;
}

type HogePiyo = Hoge | Piyo;

const obj: HogePiyo = {
  foo: 'hello',
  bar: 0,
};`

ここでtype文というのが登場していますが、これはTypeScript独自の文であり、新しい型を定義して名前を付けることができる文です。この例では`HogePiyo`という型を`Hoge | Piyo`として定義しています。

## union型の絞り込み

union型の値というのはそのままでは使いにくいものです。例えば、上で定義した`HogePiyo`型のオブジェクトは、`bar`プロパティを参照することができません。なぜなら、`HogePiyo`型の値は`Hoge`かもしれないし`Piyo`かもしれないところ、barプロパティは`Hoge`にはありますが`Piyo`には無いからです。無い可能性があるプロパティを参照することはできません。同様に、`baz`プロパティも参照できません。`foo`プロパティは両方にあるので参照可能です（後述）。

普通は、`Hoge | Piyo`のような型の値が与えられる場合、まずその値が実際にはどちらかのかを実行時に判定する必要があります。そこで、TypeScriptではそのような判定を検出して適切に型を絞り込んでくれる機能があります。

`interface Hoge {
  foo: string;
  bar: number;
}
interface Piyo {
  foo: number;
  baz: boolean;
}

function useHogePiyo(obj: Hoge | Piyo): void {
  // ここではobjはHoge | Piyo型
  if ('bar' in obj) {
    // barプロパティがあるのはHoge型なのでここではobjはHoge型
    console.log('Hoge', obj.bar);
  } else {
    // barプロパティがないのでここではobjはPiyo型
    console.log('Piyo', obj.baz);
  }
}`

この例ではin演算子を使った例です。`'bar' in obj`というのはbarというプロパティがobjに存在するならtrueを返し、そうでないならfalseを返す式です。

in演算子を使ったif文を書くことで、if文のthen部分とelse部分でobjの型がそれぞれ`Hoge`や`Piyo`として扱われます。このようにして変数の型を絞り込むことができます。

ただし、この例は注意が必要です。なぜなら、次のようなコードを書くことができるからです。

`const obj: Hoge | Piyo = {
    foo: 123,
    bar: 'bar',
    baz: true,
};

useHogePiyo(obj);`

objに代入されているのは`Piyo`型のオブジェクトに余計なbarプロパティが付いたものです。ということはこれは`Piyo`型のオブジェクトとみなせるので、`Hoge | Piyo`型の変数にも代入可能です。これをuseHogePiyoに渡すと良くないことが起こりますね。objは実際`Piyo`型なのに、これを実行すると`'bar' in obj`が成立するのでobjが`Hoge`型と見なされているところに入ってしまいます。`obj.bar`を参照していますが、これは`Hoge`型のプロパティなので`number`型が期待されているところ、実際は文字列が入っています。

このようにin演算子を用いた型の絞り込みは比較的最近 (TypeScript 2.7)入った機能ですが、ちょっと怖いので自分はあまり使いたくありません。

## typeofを用いた絞り込み

もっと単純な例として、`string | number`型を考えましょう。これに対する絞り込みはtypeof演算子でできます。typeof演算子は与えられた値の型を文字列で返す演算子です。

`function func(value: string | number): number {
  if ('string' === typeof value) {
    // valueはstring型なのでlengthプロパティを見ることができる
    return value.length;
  } else {
    // valueはnumber型
    return value;
  }
}`

オブジェクトが絡まないこともあり、これなら安全ですね。

## nullチェック

もうひとつunion型がよく使われる場面があります。それはnullableな値を扱いたい場合です。（JavaScriptなのでundefinedもありますが。）

例えば、文字列の値があるかもしれないしnullかもしれないという状況は`string | null`という型で表すことができます。`string | null`型の値はnullかもしれないので、文字列として扱ったりプロパティを参照したりすることができません。これに対し、nullでなければ処理したいという場面はよくあります。JavaScriptにおける典型的な方法は`value != null`のようにif文でnullチェックを行う方法ですが、TypeScriptはこれを適切に解釈して型を絞り込んでくれます。

`function func(value: string | null): number {
  if (value != null) {
    // valueはnullではないのでstring型に絞り込まれる
    return value.length;
  } else {
    return 0;
  }
}`

また、`&&`や`||`が短絡実行するという挙動を用いたテクニックもJavaScriptではよく使われますが、これもTypeScriptは適切に型検査してくれます。上の関数funcは次のようにも書くことができます。

`function func(value: string | null): number {
  return value != null && value.length || 0;
}`

## 代数的データ型っぽいパターン

これまで見たように、プリミティブ型ならunion型の絞り込みはけっこういい感じに動いてくれます。しかし、やはりオブジェクトに対してもいい感じにunion型を使いたいという需要はあります。そのような場合に推奨されているパターンとして、リテラル型とunion型を組み合わせることでいわゆる代数的データ型（タグ付きunion）を再現する方法があります。

`interface Some<T> {
  type: 'Some';
  value: T;
}
interface None {
  type: 'None';
}
type Option<T> = Some<T> | None;

function map<T, U>(obj: Option<T>, f: (obj: T)=> U): Option<U> {
  if (obj.type === 'Some') {
    // ここではobjはSome<T>型
    return {
      type: 'Some',
      value: f(obj.value),
    };
  } else {
    return {
      type: 'None',
    };
  }
}`

これは値があるかもしれないし無いかもしれないことを表すいわゆるoption型をTypeScriptで表現した例です。`Option<T>`型は、ある場合のオブジェクトの型である`Some<T>`型と無い場合の型である`None`型のunionとして表現されています。ポイントは、これらに共通のプロパティであるtypeです。typeプロパティには、このオブジェクトの種類（SomeかNoneか）を表す文字列が入っています。ここでtypeプロパティの型としてリテラル型を使うことによって、`Option<T>`型の値`obj`に対して、`obj.type`が`'Some'`ならば`obj`の型は`Some<T>`で`'None'`ならば`obj`の型は`None`であるという状況を作っています。関数mapの中では`obj.type`の値によって分岐することにより型の絞り込みを行っています。この方法はTypeScriptで推奨されている方法らしく、コンパイラのサポートも厚いです。

次のようにswitch文でも同じことができます。大抵はどちらでも良いですが、こちらのほうが良い挙動を示す場合があります。

`function map<T, U>(obj: Option<T>, f: (obj: T)=> U): Option<U> {
  switch (obj.type) {
    case 'Some':
      return {
        type: 'Some',
        value: f(obj.value),
      };
    case 'None':
      return {
        type: 'None',
      };
  }
}`

このmap関数の場合はこちらのほうが拡張に対して強くて安全です。例えば`Option<T>`に第3の種類の値を追加した場合、if文のバージョンではその値に対しても`None`が返るのに対し、switch文のバージョンではそのままではコンパイルエラーが出ます（第3の値に対する処理が定義されておらずmap関数が値を返さない可能性が生じてしまうため）。そのため、関数の変更の必要性にすぐ気づくことができます。

このパターンはTypeScriptプログラミングにおいて頻出です。オブジェクトで真似をしているため本物の代数的データ型に比べると記法が重いのが難点ですが仕方ありません。

## union型オブジェクトのプロパティ

オブジェクト同士のunion型を作った場合、そのプロパティアクセスの挙動は概ね期待通りの結果となります。少し前の例に出てきた`HogePiyo`型を思い出しましょう。

`interface Hoge {
  foo: string;
  bar: number;
}
interface Piyo {
  foo: number;
  baz: boolean;
}

type HogePiyo = Hoge | Piyo;

function getFoo(obj: HogePiyo): string | number {
    // obj.foo は string | number型
    return obj.foo;
}`

`Hoge | Piyo`型の変数`obj`の`foo`プロパティはアクセス可能であると述べましたが、実はその型は`string | number`型となります。これは、`obj`が`Hoge`型の場合に`obj.foo`は`string`型であり、`obj`が`Piyo`型の場合は`obj.foo`は`number`型となることから、`obj.foo`は`string`型である場合と`number`型である場合があるという説明ができます。一方、`bar`や`baz`は`Hoge | Piyo`型には存在しない可能性があるためアクセスできません。この挙動は実情に合っているし直感的ですね。

配列の要素もオブジェクトのプロパティの一種なので、同じ挙動となります。

`const arr: string[] | number[] = [];

// string[] | number[] 型の配列の要素は string | number 型
const elm = arr[0];`

# never型

union型を触り始めるとたまに出てくるのが**never型**です。never型は「属する値が存在しない型」であり、部分型関係の一番下にある（任意の型の部分型となっている）型です。どんな値もnever型の変数に入れることはできません。

`// エラー: Type '0' is not assignable to type 'never'.
const n: never = 0;`

一方、never型の値はどんな型にも入れることができます。

`// never型の値を作る方法が無いのでdeclareで宣言だけする
declare const n: never;

const foo: string = n;`

こう聞くとany型のように危険な型であるように思えるかもしれませんが、そんなことはありません。never型に当てはまる値は存在しないため、never型の値を実際に作ることはできません。よって、（TypeScriptの型システムを欺かない限りは）never型の値を持っているという状況があり得ないので、never型の値を他の型の変数に入れるということがソースコード上であったとしても、実際には起こりえないのです。

何を言っているのか分からない人もいるかもしれませんが、型システムを考える上ではこのような型はけっこう自然に出てきます。とりあえず具体例を見てみましょう。これは先ほどの`Option<T>`の例を少し変更したものです。

`interface Some<T> {
  type: 'Some';
  value: T;
}
interface None {
  type: 'None';
}
type Option<T> = Some<T> | None;

function map<T, U>(obj: Option<T>, f: (obj: T)=> U): Option<U> {
  switch (obj.type) {
    case 'Some':
      return {
        type: 'Some',
        value: f(obj.value),
      };
    case 'None':
      return {
        type: 'None',
      };
    default:
      // ここでobjはnever型になっている
      return obj;
  }
}`

switch文にdefaultケースが追加されました。実はこの中でobjの型は`never`になっています。なぜなら、それまでのcase文によってobjの可能性が全て調べ尽くされてしまったからです。これが意味することは、実際にはdefault節が実行される可能性は無く、この中ではobjの値の候補が全く無いということです。そのような状況を、objに`never`型を与えることで表現しています。

また、もうひとつnever型が出てくる可能性があるのは、関数の返り値です。

`function func(): never {
  throw new Error('Hi');
}

const result: never = func();`

関数の返り値の型が`never`型となるのは、関数が値を返す可能性が無いときです。これは返り値が無いことを表す`void`型とは異なり、そもそも関数が正常に終了して値が返ってくるということがあり得ない場合を表します。上の例では、関数funcは必ずthrowします。ということは、関数の実行は中断され、値を返すことなく関数を脱出します。特に、上の例でfuncの返り値を変数resultに代入していますが、実際にはresultに何かが代入されることはあり得ません。ゆえに、resultにはnever型を付けることができるのです。

なお、上の例ではfuncの返り値に型注釈で`never`と書いていますが、省略すると返り値の型は`void`に推論されます。これは値を返さないぞということを明示したい場合は`never`と型註釈で明示する必要があります。もし返り値を`never`型とすることが不可能（何か値が返る可能性を否定できない）な場合はちゃんと型エラーになるので安心です。

# intersection型（交差型）

union型とある意味で対になるものとして**intersection型**があります。2つの型T, Uに対して`T & U`と書くと、`T`でもあり`U`でもあるような型を表します。

`interface Hoge {
  foo: string;
  bar: number;
}
interface Piyo {
  foo: string;
  baz: boolean;
}

const obj: Hoge & Piyo = {
  foo: 'foooooooo',
  bar: 3,
  baz: true,
};`

たとえばこの例では、`Hoge & Piyo`というのは`Hoge`でもあり`Piyo`でもある型を表します。ですから、この型の値は`string`型のプロパティfooと`number`型のプロパティbarを持ち、さらに`boolean`型のプロパティbazを持つ必要があります。

ちなみに、union型とintersection型を組みあわせると楽しいです。次の例を見てください。

`interface Hoge {
    type: 'hoge';
    foo: string;
}
interface Piyo {
    type: 'piyo';
    bar: number;
}
interface Fuga {
    baz: boolean;
}

type Obj = (Hoge | Piyo) & Fuga;

function func(obj: Obj) {
    // objはFugaなのでbazを参照可能
    console.log(obj.baz);
    if (obj.type === 'hoge') {
        // ここではobjは Hoge & Fuga
        console.log(obj.foo);
    } else {
        // ここではobjはPiyo & Fuga
        console.log(obj.bar);
    }
}`

`Obj`型は`(Hoge | Piyo) & Fuga`ですが、実はこれは`(Hoge & Fuga) | (Piyo & Fuga)`と同一視されます。よって、union型のときと同様にif文で型を絞り込むことができるのです。

## union型を持つ関数との関係

一瞬だけ話をintersection型からunion型に戻します。先ほどは省略しましたが、関数型を含むunion型というものも考えることができます。当然ながら、関数とそれ以外のunion型を作った場合はそれを関数として呼ぶことはできません。下の例では、`Func | MyObj`型の値`obj`は`MyObj`型の可能性がある、つまり関数ではない可能性がありますので、`obj(123)`のように関数として使うことはできません。

`type Func = (arg: number) => number;
interface MyObj {
    prop: string;
}

const obj : Func | MyObj = { prop: '' };

// エラー: Cannot invoke an expression whose type lacks a call signature.
//        Type 'MyObj' has no compatible call signatures.
obj(123);`

では、union型の構成要素が全部関数だったら呼べそうな気がします。次の例はどうでしょうか。

`type StrFunc = (arg: string) => string;
type NumFunc = (arg: number) => string;

declare const obj : StrFunc | NumFunc;
// エラー: Argument of type '123' is not assignable to parameter of type 'string & number'.
//        Type '123' is not assignable to type 'string'.
obj(123);`

この例では、`StrFunc | NumFunc`型の変数`obj`を作っています。`StrFunc`型は文字列を受け取って文字列を返す関数の型で、`NumFunc`型は数値を受け取って文字列を返す関数の型です。

しかし、`obj`を呼ぶところでまだエラーが発生しています。エラーメッセージから察しがついている方もいらっしゃると思いますが、この`StrFunc | NumFunc`型の関数を呼ぶことは実質できません。なぜなら、`obj`は`StrFunc`型かもしれないので引数は文字列でないといけません。一方、`NumFunc`型かもしれないので引数は数値でないといけません。つまり、引数が文字列であることと数値であることが同時に要求されています。エラーメッセージに出てくる`string & number`という型はこのことを表しています。文字列であると同時に数値であるような値（つまり`string & number`型の値）は存在しないため、この関数を呼ぶことは実質的にできないのです。

このように、関数同士のunionを考えるとき、結果の関数の引数はもともとの引数同士のintersection型を持つ必要があります。難しい言葉でいうと、これは関数の引数の型が反変 (contravariant) の位置にあることが影響しています。

引数の型がintersection型で表現されるということで、intersection型をとっても意味がある例を見てみます。

`interface Hoge {
    foo: string;
    bar: number;
}
interface Piyo {
    foo: string;
    baz: boolean;
}

type HogeFunc = (arg: Hoge) => number;
type PiyoFunc = (arg: Piyo) => boolean;

declare const func: HogeFunc | PiyoFunc;

// resは number | boolean 型
const res = func({
    foo: 'foo',
    bar: 123,
    baz: false,
});`

この例では`func`は`HogeFunc | PiyoFunc`型です。`HogeFunc`の引数は`Hoge`で`PiyoFunc`の引数は`Piyo`なので、`func`の引数の型は`Hoge & Piyo`型である必要があります。よって、`Hoge & Piyo`型を持つオブジェクトを作ることで`func`を呼ぶことができます。

この例では`res`の型は`number | boolean`型となります。これは、`func`の型が`HogeFunc`の場合は返り値が`number`であり、`PiyoFunc`の場合は返り値が`boolean`であることから説明できます。

このように、関数同士のunion型を持つ関数を呼びたい場合にintersection型の知識が役に立ちます。特に、先ほど見たようにエラーメッセージにintersection型が現れますから、intersection型のことも覚えておいたほうがよいでしょう。（そんな機会がどれだけあるのかは聞いてはいけません。）

なお、この辺りの処理は扱いが難しいためか、現在のところ制限があります。具体的には関数のオーバーロードがある場合やジェネリクスが関わる場合に関数が呼べなかったり、引数の型が推論できなかったりする場合があります。一応例だけ示しておきますが、困る機会はそんなに無いのではないかと思います。

`const arr: string[] | number[] = [];
// エラー: Parameter 'x' implicitly has an 'any' type.
arr.forEach(x => console.log(x));
// エラー: Cannot invoke an expression whose type lacks a call signature.
const arr2 = arr.map(x => x);`

# オブジェクト型再訪

さて、union型を紹介したので、オブジェクト型にもうちょっと深入りして説明することができます。オブジェクト型は`プロパティ名: 型;`という定義の集まりでしたが、実はプロパティに対して修飾子を付けることができます。修飾子は`?`と`readonly`の2種類あります。

## `?`: 省略可能なプロパティ

`?`を付けて宣言したプロパティは省略可能になります。

`interface MyObj {
  foo: string;
  bar?: number;
}

let obj: MyObj = {
  foo: 'string',
};

obj = {
  foo: 'foo',
  bar: 100,
};`

この例ではbarが省略可能なプロパティです。barは省略可能なので、fooだけを持つオブジェクトと、fooとbarを両方持つオブジェクトはどちらも`MyObj`型の値として認められます。

ところで、実際のJavaScriptでは存在しないプロパティにアクセスするとundefinedが返ります。ということは、`MyObj`型の値に対してbarプロパティを取得しようとすると、undefinedの可能性があるということです。したがって、`MyObj`のbarプロパティの型は`number | undefined`となります。このように、`?`修飾子を付けられたプロパティは自動的に`undefined`型とのunion型になります。よって、それを使う側はこのようにundefinedチェックを行う必要があります。

`function func(obj: MyObj): number {
  return obj.bar != null ? obj.bar*100 : 0;
}`

なお、`?`を使わずに自分でbarの型を`number | undefined`としても同じ意味にはなりません。

`interface MyObj {
  foo: string;
  bar: number | undefined;
}

// エラー:
// Type '{ foo: string; }' is not assignable to type 'MyObj'.
//  Property 'bar' is missing in type '{ foo: string; }'.
let obj: MyObj = {
  foo: 'string',
};`

`?`修飾子を使わない場合は、たとえundefinedが許されているプロパティでもきちんと宣言しないといけないのです。

## `readonly`

もうひとつ可能な修飾子は`readonly`です。これを付けて宣言されたプロパティは再代入できなくなります。

`interface MyObj {
  readonly foo: string;
}

const obj: MyObj = {
  foo: 'Hey!',
};

// エラー: Cannot assign to 'foo' because it is a constant or a read-only property.
obj.foo = 'Hi';`

つまるところ、constのプロパティ版であると思えばよいでしょう。素のJavaScriptではプロパティのwritable属性が相当しますが、プロパティの属性を型システムに組み込むのは筋が悪くて厳しいためTypeScriptではこのような独自の方法をとっているのでしょう。

ただし、readonlyは過信してはいけません。次の例に示すように、readonlyでない型を経由して書き換えできるからです。

`interface MyObj {
  readonly foo: string;
}
interface MyObj2 {
  foo: string;
}

const obj: MyObj = { foo: 'Hey!', }

const obj2: MyObj2 = obj;

obj2.foo = 'Hi';

console.log(obj.foo); // 'Hi'`

## インデックスシグネチャ

オブジェクト型には実は今まで紹介した他にも記法があります。その一つがインデックスシグネチャです。

`interface MyObj {
  [key: string] : number;
}

const obj: MyObj = {};

const num: number = obj.foo;
const num2: number = obj.bar;`

`[key: string]: number;`という部分が新しいですね。このように書くと、`string`型であるような任意のプロパティ名に対して`number`型を持つという意味になります。objにそのような型を与えたので、`obj.foo`や`obj.bar`などはみんな`number`型を持っています。

これは便利ですが明らかに危ないですね。objは実際には`{}`なので`obj.foo`などはundefinedになるはずなのに、その可能性が無視されています。

そんな危ない型が平然と許されている理由は、オブジェクトを辞書として使うような場合に必要だとか、配列型の定義にも必要とかそんなところでしょう。実際、配列型の定義は概ね下のような感じです。

`interface Array<T> {
  [idx: number]: T;
  length: number;
  // メソッドの定義が続く
  // ...
}`

なお、この例のようにインデックスシグネチャの他にプロパティがあった場合、そちらが優先されます。

一応最近のJavaScriptならば、インデックスシグネチャの利用をできるだけ避けることはできます。オブジェクトを辞書として使う場合は、代わりにMapを使いましょう。配列の場合は、インデックスによるアクセスを避けてfor-of文を使うなどの方法で避けられます。

## 関数シグネチャ

実は、オブジェクト型の記法で関数型を表現する方法があります。

`interface Func {
  (arg: number): void;
}

const f: Func = (arg: number)=> { console.log(arg); };`

`(arg: number): void;`の部分で、このオブジェクトは`number`型の引数をひとつ取る関数であることを表しています。

この記法は通常のプロパティの宣言と同時に使うことができるので、関数だけど同時に特定のプロパティを持っているようなオブジェクトを表すことができます。さらに、複数の関数シグネチャを書くことができ、それによってオーバーローディングを表現できます。

`interface Func {
  foo: string;
  (arg: number): void;
  (arg: string): string;
}`

この型が表す値は、`string`型のfooプロパティを持つオブジェクトであり、かつ`number`型を引数に関数として呼び出すことができその場合は何も返さず、`string`型を引数として呼び出すこともできてその場合は`string`型の値を返すような関数、ということになります。

## newシグネチャ

類似のものとして、コンストラクタであることを表すシグネチャもあります。

`interface Ctor<T> {
  new(): T;
}

class Foo {
  public bar: number | undefined;
}

const f: Ctor<Foo> = Foo;`

ここで作った`Ctor<T>`型は、0引数でnewすると`T`型の値が返るような関数を表しています。ここで定義したクラスFooはnewするとFooのインスタンス（すなわち`Foo`型の値）が返されるので、`Ctor<Foo>`に代入可能です。

ちなみに、関数の型を`(foo: string) => number`のように書けたのと同様に、newシグネチャしかない場合はコンストラクタの型を`new() => Foo`のように書くこともできます。

# `as`によるダウンキャスト

ここで型に関連する話題として、`as`によるダウンキャストを紹介します。これはTypeScript独自の構文で、`式 as 型`と書きます。ダウンキャストなので当然型安全ではありませんが、TypeScriptを書いているとたまに必要になる場面があります。なお、ダウンキャストというのは、派生型の値を部分型として扱うためのものです。

`const value = rand();

const str = value as number;
console.log(str * 10);

function rand(): string | number {
    if (Math.random() < 0.5) {
        return 'hello';
    } else {
        return 123;
    }
}`

この例でvalueは`string | number`型の値ですが、`value as number`の構文により`number`型として扱っています。よって変数strは`number`型となります。

これは安全ではありません。なぜなら、valueは実際には`string`型、すなわち文字列かもしれないので、変数strに文字列が入ってしまう可能性があるからです。

なお、`as`を使っても全く関係ない2つの値を変換することはできません。

`const value = 'foo';
// エラー: Type 'string' cannot be converted to type 'number'.
const str = value as number;`

その場合、`any`型か後述の`unknown`型を経由すれば変換できます。

`const value = 'foo';
const str = value as unknown as number;`

ちなみに、この例に見えるように、`as`はアップキャストもできます。最初の`as unknown`で行われているのはダウンキャストではなくアップキャストであり、その後`as number`でダウンキャストしています。他のアップキャストの例としては、`const foo: string = 'foo';` とする代わりに`const foo = 'foo' as string;`とするような場合が挙げられます（`'foo'`型を`string`型にアップキャストしている）。アップキャスト自体は`as`を使わなくてもできる安全な操作です。アップキャストに`as`を使うのは、危険なダウンキャストと見分けがつかないのでやめたほうがよいでしょう。

# readonlyな配列とタプル

ちょっと前に、オブジェクト型の`readonly`修飾子を紹介しました。これによって、オブジェクトの特定のプロパティを型システム上readonly（書き換え不可）にすることができるのでした。実は、配列型やタプル型においても`readonly`の概念が存在します。ただし、オブジェクトの場合はプロパティごとに`reaodnly`か否かを制御できましたが、配列やタプルは要素ごとの制御はできません。配列やタプル全体が`readonly`か否かという区別をすることになります。

`readonly`な配列型は`readonly T[]`のように書きます（`T`は要素の型）。次の例は`readonly number[]`型の配列の例です。

`// arrは readonly number[] 型
const arr: readonly number[] = [1, 2, 3];

// arrの要素を書き換えるのは型エラー
// エラー: Index signature in type 'readonly number[]' only permits reading.
arr[0] = 100;

// readonly配列型にはpushなどの書き換えメソッドは存在しない
// エラー: Property 'push' does not exist on type 'readonly number[]'
arr.push(4);`

`reaodnly`なプロパティと同じく、`readonly`な配列のプロパティを書き換えようとするとエラーとなります。また、`readonly`な配列は、`push`などの配列を破壊的に書き換えるメソッドは除去されており使うことができません。この2つの機能により、`readonly`配列の書き換え不可能性を型システム上で担保しています。

なお、`T[]`型を`Array<T>`と書くことができるのと同様に、`readonly T[]`型は`ReadonlyArray<T>`と書けます。

`readonly`なタプルについても同様に、タプル型の前に`readonly`を付けて表現します。

`const tuple: readonly [string, number] = ['foo', 123];
// エラー: Cannot assign to '0' because it is a read-only property.
tuple[0] = 'bar';`

この例では、`tuple`は`readonly [string, number]`型の変数となり、タプルの各要素を書き換えることはできなくなります。

# `as const`

`readonly`に関連する話題として、`as const`を紹介します。これはTypeScriptに型推論の方法を指示するための構文です。ちょっと前に紹介した`as`によるダウンキャストと似ていますが、型の代わりに`const`と書くのが特徴です。

`as const`は、各種リテラル（文字列・数値・真偽値のリテラル、オブジェクトリテラル・配列リテラル）に付加することができ、その値が**書き換えを意図していない**値であることを表します。

この記事の最初のほうでリテラル型の型推論について説明したのを覚えているでしょうか。リテラル型の値を`var`や`let`で宣言した変数に入れると、その値があとから書き換えられるかもしれないためリテラル型ではなく対応するプリミティブ型が推論されるのでした。

`// foo は string 型
var foo = '123';`

では、この`'123'`に`as const`を付けるとどうなるでしょうか。それが次の例です。

`// foo2 は "123" 型
var foo2 = '123' as const;`

このように`as const`を付けると`'123'`は書き換えられることを意図していない値として扱われるため、変数`foo2`は`string`型ではなく`"123"`型となります。

ここまでの話は`const`を使えば済むような話でしたが、`as const`の本領はここからです。次に、オブジェクトリテラルの例を見ましょう。

`// obj は { foo: string; bar: number[] } 型
const obj = {
    foo: "123",
    bar: [1, 2, 3]
};

/*
 obj2 は
 {
     readonly foo: "123";
     readonly bar: readonly [1, 2, 3];
 }
 型
*/
const obj2 = {
    foo: "123",
    bar: [1, 2, 3]
} as const;`

まず、`as const`無しの`obj`の型は`{ foo: string; bar: number[] }`型となっています。注目すべき点は、例えば`foo`プロパティの型が`"123"`型ではなく`string`型となっている点です。これは`"123"`を`var`や`let`の変数に入れたときと同じ挙動ですね。オブジェクトのプロパティは（`readonly`でない限り）`obj.foo = "456";`のように書き換えることができるので、普通はリテラル型がつかないのです。

一方、`as const`をオブジェクトリテラルに付けた`obj2`の場合は、`foo`プロパティには`"123"`型がついています。また、`foo`プロパティ自体も`readonly`になっています。後者は、`obj2`は書き換えることを意図していないオブジェクトであるため`obj2.foo = "456";`のような変更を禁止するために`readonly`となっているわけですね。また、`as const`は再帰的にその中身にも適用されるため、中の`"123"`も`"123" as const`相当になり、型が`string`ではなく`"123"`型になっています。

`bar`についても同様です。配列リテラルに`as const`を使用した場合は対応する`readonly`タプル型が推論されます。この場合、`[1, 2, 3] as const`の型が`readonly [1, 2, 3]`と推論されることから、`obj2.bar`の型も`readonly [1, 2, 3]`型となっています。`readonly [number, number, number]`ではなく`readonyly [1, 2, 3]`になっているのは、やはり配列リテラルの中身についても`as const`が適用されているからです。

このように、`as const`はリテラルの型推論で型を広げてほしくないときに使用することができます。`as const`をリテラルにつけたときに推論される型の挙動をまとめるとこのようになります。

- 文字列・数値・真偽値リテラルはそれ自体のリテラル型を持つものとして推論されます。（例： `"foo" as const`は`"foo"`型）
- オブジェクトリテラルは各プロパティが`readonly`を持つようになります。
- 配列リテラルの型は`readonly`タプル型になります。

# `object`型と`{}`型

あまり目にすることがない型のひとつに`object`型があります。これは「プリミティブ以外の値の型」です。JavaScriptにはオブジェクトのみを引数に受け取る関数があり、そのような関数を表現するための型です。例えば、`Object.create`は引数としてオブジェクトまたはnullのみを受け取る関数です。

`// エラー: Argument of type '3' is not assignable to parameter of type 'object | null'.
Object.create(3);`

ところで、`{}`という型について考えてみてください。これは、何もプロパティがないオブジェクト型です。プロパティが無いといっても、構造的部分型により、`{foo: string}`のような型を持つオブジェクトも`{}`型として扱うことができます。

`const obj = { foo: 'foo' };
const obj2: {} = obj;`

となると、任意のオブジェクトを表す型として`{}`ではだめなのでしょうか。

もちろん、答えはだめです。じつは、`{}`という型はオブジェクト以外も受け付けてしまうのです。ただし、undefinedとnullはだめです。

`const o: {} = 3;`

これは、JavaScriptの仕様上、プリミティブに対してもプロパティアクセスができることと関係しています。例えばプリミティブのひとつである文字列に対してlengthというプロパティを見るとその長さを取得できます。ということで、次のようなコードが可能になります。

`interface Length {
  length: number;
}

const o: Length = 'foobar';`

このことから、`{}`というのはundefinedとnull以外は何でも受け入れてしまうようなとても弱い型であるということが分かります。

## weak type

ところで、オプショナルなプロパティ（`?`修飾子つきで宣言されたプロパティ）しかない型にも同様の問題があることがお分かりでしょうか。そのような型は、関数に渡すためのオプションオブジェクトの型としてよく登場します。

そこで、そのような型は**weak type**と呼ばれ、特殊な処理が行われます。

`interface Options {
    foo?: string;
    bar?: number;
}

const obj1 = { hoge: 3 };
// エラー: Type '{ hoge: number; }' has no properties in common with type 'Options'
const obj2: Options = obj1;
// エラー: Type '5' has no properties in common with type 'Options'.
const obj3: Options = 5;`

最後の2行に対するエラーはweak typeに特有のものです。obj2の行は、`{ hoge: number; }`型の値を`Options`型の値として扱おうとしていますがエラーとなっています。構造的部分型の考えに従えば、`{ hoge: number; }`型のオブジェクトはfooとbarが省略されており、余計なプロパティhogeを持った`Options`型のオブジェクトと見なせそうですが、weak type特有のルールによりこれは認められません。具体的には、weak typeの値として認められるためにはエラーメッセージにある通りweak typeが持つプロパティを1つ以上持った型である必要があります。実際、そうでない値を`Options`型のオブジェクトとして扱いたい場面はほとんど無いためこういうのはエラーとして弾きたいところ、weak typeは値に対する制限が弱すぎるためこのような追加のルールが導入されているのです。ただし例外として、`{}`は`Options`型の値として扱えるようです。

また、weak typeはオブジェクトではないものも同様に弾いてくれます。

# unknown

先ほど、`{}`はとても弱い型であると述べました。実は最近（TypeScript 3.0から）、本当に最も弱い型である**unknown型**が利用可能になりました。どんな型の値もunknown型として扱うことができます。難しい言葉で言うと、これはいわゆるtop型です。すなわち、never型のちょうど逆にあたる、すべての型を部分型として持つような、部分型関係の頂点にある型です。

`const u1: unknown = 3;
const u2: unknown = null;
const u3: unknown = (foo: string)=> true;`

任意の値を取ることができるというのは上で紹介したany型と同じ特徴ですが、unknown型はany型とは異なり安全に扱うことができる型です。というのも、unknown型の値はどんな値なのか分からないため、できることが制限されているのです。例えば、数値の足し算をすることもできませんし、プロパティアクセスもできません。

`const u: unknown = 3;
// エラー: Object is of type 'unknown'.
const sum = u + 5;
// エラー: Object is of type 'unknown'.
const p = u.prop;`

このように、どんな値でもいい、最悪nullやundefinedかもしれないということは、その値に対してほとんど何も出来ないことを意味しているのです。従来、関数の引数などが「どんな値でもいい」ことを表したい場合にはanyなどが主に使われてきましたが、any型の値は型システムを無視して好きなように扱うことができて危ない型だったので、代わりにunknown型を使うことが有効です。

unknown型の値を使いたいときは、union型と同様に型の絞り込みが可能です。これにより、unknown型の値として受け取った値が特定の型のときにのみ処理をするということが可能になります。

`const u: unknown = 3;

if (typeof u === 'number') {
    // この中ではuはnumber型
    const foo = u + 5;
}`

また、クラスの型とinstanceofを組み合わせることによる絞り込みも可能です。

`const u: unknown = 3;

class MyClass {
    public prop: number = 10;
}

if (u instanceof MyClass) { 
    // ここではuはMyClass型
    u.prop;
}`

## unknown型のvoid型の意外な関係

実は、`unknown`型と`void`型は結構似ているところがあります。

それは関数の返り値の型として`void`型が登場する場合に現れます。次の例は正しいTypeScriptコードです（コンパイルエラーが起きません）。

`const func1: () => number = () => 123;

const f: (() => void) = func1;`

ここで`func1`は`() => number`型、つまり数値を返す関数です。上の例は、これを`() => void`型として扱っても良いということを表しています。

ここが`void`型の特殊なところで、部分型関係において`**void**`**型は**`**unknown**`**型と同様の振る舞いをします**。ただし、この記事の序盤で説明したように、`void`型を（関数の返り値などではなく）直に扱う場合は追加の制限が入ります（これにより、`const v: void = 123`のようなものはエラーとなります）。

これは特にアロー関数と組み合わせた場合に役に立つ挙動です。`func1`を呼びたいけど返り値には興味がない場合、`() => func1()`のようなアロー関数を作るとこれは`() => number`型となります。しかし返り値はどうでもいいので気持ち的にはこれは`() => void`型とも言えますね。この気持ちをうまく表現するために、このような関数を`() => void`型として扱えるようになっているのです。

ということは、裏を返せば**返り値が**`**void**`**型の関数の返り値は何が入っているのか全くわからない**ということになります。上の例に続けて以下を実行したとすると、`void`型の変数`voidValue`の中身は実は`123`になります。

`const voidValue: void = f();
console.log(voidValue); // 123 が表示される`

なので、`void`型の値を得てもそれが`undefined`である保証すら無いことになります。`void`型を持つ値の挙動はやはり`unknown`型と似ており、基本的に使うことができません（`unknown`型として使うことはできます）。

ということで、実は`void`型というのは`unknown`にさらに追加の制限が加わった型という見方ができるのでした。登場したのは`unknown`型の方が後なのですが。

# typeof

TypeScriptのちょっと便利な機能として、typeof型というのがあります。これは、`typeof 変数`と書くと、その変数の型が得られるものです。

`let foo = 'str';

type FooType = typeof foo; // FooTypeはstringになる

const str: FooType = 'abcdef';`

# keyof

ここからがいよいよTypeScriptのよく分からないところです。ここから先はそれぞれが単独でQiitaの記事になるほどのポテンシャルを秘めているので、探せば記事があると思います。

ある`T`を型とすると、`keyof T`という型の構文があります。`keyof T`は、「`T`のプロパティ名全ての型」です。

`interface MyObj {
  foo: string;
  bar: number;
}

let key: keyof MyObj;
key = 'foo';
key = 'bar';
// エラー: Type '"baz"' is not assignable to type '"foo" | "bar"'.
key = 'baz';`

この例では、`MyObj`型のオブジェクトはプロパティfooとbarを持ちます。なので、プロパティ名として可能な文字列は`'foo'`と`'bar'`のみであり、`keyof MyObj`はそれらの文字列のみを受け付ける型、すなわち`'foo' | 'bar'`になります。よって、`keyof MyObj`型の変数であるkeyに`'baz'`を代入しようとするとエラーとなります。

なお、JavaScriptではプロパティ名は文字列のほかにシンボルである可能性もあります。よって、keyof型はシンボルの型を含む可能性もあります。

`// 新しいシンボルを作成
const symb = Symbol();

const obj = {
    foo: 'str',
    [symb]: 'symb',
};

//ObjType = 'foo' | typeof symb
type ObjType = keyof (typeof obj);`

この例では、`obj`のプロパティ名の型をkeyofで得ました。`ObjType`は`'foo' | typeof symb`となっています。これは`'foo' | symbol`とはならない点に注意してください。TypeScriptではシンボルは`symbol`型ですが、プロパティ名としてはシンボルはひとつずつ異なるため`symb`に入っている特定のシンボルでないといけないのです。

さらに、keyof型には`number`の部分型が含まれる場合もあります。それは、数値リテラルを使ってプロパティを宣言した場合です。

`const obj = {
    foo: 'str',
    0: 'num',
};

// ObjType = 0 | 'foo'
type ObjType = keyof (typeof obj);`

JavaScriptではプロパティ名に数値は使えません（使おうとした場合文字列に変換されます）が、TypeScriptでは数値をプロパティ名に使用した場合は型の上ではそれを保とうとするということです。

なお、先ほど出てきたインデックスシグネチャを持つオブジェクトの場合は少し特殊な挙動をします。

`interface MyObj {
    [foo: string]: number;
}

// MyObjKey = string | number
type MyObjKey = keyof MyObj;`

この例で定義した`MyObj`型は任意の`string`型の名前に対してその名前のプロパティは`number`型を持つという意味になっています。ということは、`MyObj`型のオブジェクトのキーとしては`string`型の値すべてが使用できます。よって、`keyof MyObj`は`string`になることが期待できますね。
しかし、実際にはこれは`string | number`となります。これは、数値の場合もどうせ文字列に変換されるのだからOKという意図が込められています。

一方、インデックスシグネチャのキーの型は`number`の場合は`keyof MyObj`は`number`のみとなります。

# Lookup Types `T[K]`

keyofとセットで使われることが多いのがLookup Typesです。これは型`T`と`K`に対して`T[K]`という構文で書きます。`K`がプロパティ名の型であるとき、`T[K]`は`T`のそのプロパティの型となります。

言葉で書くと分かりにくいので例を見ましょう。

`interface MyObj {
  foo: string;
  bar: number;
}

// strの型はstringとなる
const str: MyObj['foo'] = '123';`

この例では`MyObj['foo']`という型が登場しています。上で見た`T[K]`という構文と比べると、`T`が`MyObj`型で`K`が`'foo'`型となります。

よって、`MyObj['foo']`は`MyObj`型のオブジェクトのfooというプロパティの型である`string`となります。

同様に、`MyObj['bar']`は`number`となります。`MyObj['baz']`のようにプロパティ名ではない型を与えるとエラーとなります。厳密かつ大雑把に言えば、`K`は`keyof T`の部分型である必要があります。

逆に言えば、`MyObj[keyof MyObj]`という型は可能です。これは`MyObj['foo' | 'bar']`という意味になりますが、プロパティ名がfooまたはbarということは、その値は`string`または`number`になるということなので、`MyObj['foo' | 'bar']`は`string | number`になります。

keyofとLookup Typesを使うと例えばこんな関数を書けます。

`function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const obj = {
  foo: 'string',
  bar: 123,
};

const str: string = pick(obj, 'foo');
const num: number = pick(obj, 'bar');
// エラー: Argument of type '"baz"' is not assignable to parameter of type '"foo" | "bar"'.
pick(obj, 'baz');`

この関数pickは、`pick(obj, 'foo')`とすると`obj.foo`を返してくれるような関数です。注目すべき点は、この関数にちゃんと型を付けることができているという点です。`pick(obj, 'foo')`の返り値の型は`obj.foo`の型である`string`型になっています。同様に`pick(obj, 'bar')`の型は`number`型になっています。

pickは型変数を2つ持ち、2つ目は`K extends keyof T`と書かれています。これは初出の文法ですが、ここで宣言する型変数`K`は`keyof T`の部分型でなければならないという意味です。この条件が無いと、返り値の型`T[K]`が妥当でない可能性が生じるためエラーとなります。

`pick(obj, 'foo')`という呼び出しでは、`T`が`{ foo: string; bar: number; }`型、`K`が`'foo'`型となるため、返り値の型は`({ foo: string; bar: number; })['foo']`型、すなわち`string`型となります。

# Mapped Types

さて、以上の2つと同時に導入されたのが**mapped type**と呼ばれる型です。日本語でどう呼べばいいのかはよく分かりません。mapped typeは`{[P in K]: T}`という構文を持つ型です。ここで`P`は型変数、`K`と`T`は何らかの型です。ただし、`K`は`string`の部分型である必要があります。例えば、`{[P in 'foo' | 'bar']: number}`という型が可能です。

`{[P in K]: T}`という型の意味は、「`K`型の値として可能な各文字列`P`に対して、型`T`を持つプロパティ`P`が存在するようなオブジェクトの型」です。上の例では`K`は`'foo' | 'bar'`なので、`P`としては`'foo'`と`'bar'`が可能です。よってこの型が表わしているのは`number`型を持つプロパティfooとbarが存在するようなオブジェクトです。

すなわち、`{[P in 'foo' | 'bar']: number}` というのは`{ foo: number; bar: number; }`と同じ意味です。

`type Obj1 = {[P in 'foo' | 'bar']: number};
interface Obj2 {
  foo: number;
  bar: number;
}

const obj1: Obj1 = {foo: 3, bar: 5};
const obj2: Obj2 = obj1;
const obj3: Obj1 = obj2;`

これだけでは何が面白いのか分かりませんね。実は、`{[P in K]: T}`という構文において、型`T`の中で`P`を使うことができるのです。例えば次の型を見てください。

`type PropNullable<T> = {[P in keyof T]: T[P] | null};

interface Foo {
  foo: string;
  bar: number;
}

const obj: PropNullable<Foo> = {
  foo: 'foobar',
  bar: null,
};`

ここでは型変数`T`を持つ型`PropNullable<T>`を定義しました。この型は、`T`型のオブジェクトの各プロパティ`P`の型が、`T[P] | null`、すなわち元の型であるか`null`であるかのいずれかであるようなオブジェクトの型です。具体的には、`PropNullable<Foo>`というのは`{foo: string | null; bar: number | null; }`という型になります。

また、mapped typeでは`[P in K]`の部分に以前紹介した修飾子（`?`と`readonly`）を付けることができます。例えば、次の型`Partial<T>`は`T`のプロパティを全てオプショナルにした型です。この型は便利なのでTypeScriptの標準ライブラリに定義されており、自分で定義しなくても使うことができます。全てのプロパティをreadonlyにする`Readonly<T>`もあります。

`type Partial<T> = {[P in keyof T]?: T[P]};`

逆に、修飾子を取り除くこともTypeScript2.8から可能になりました。そのためには、`?`や`readonly`の前に`-`を付けます。例えば、すべてのプロパティから`?`を取り除く、いわば`Partial<T>`の逆のはたらきをする`Required<T>`は次のように書けます。

`type Required<T> = {[P in keyof T]-?: T[P]};`

これの使用例はこんな感じです。`ReqFoo`では、`bar`の`?`が無くなっていることが分かります。

`interface Foo {
    foo: string;
    bar?: number;
}

/// ReqFoo = { foo: string; bar: number; }
type ReqFoo = Required<Foo>;`

この`Required<T>`も標準ライブラリに入っています。

もう少し実用的な例として、実際にmapped typeを使う関数を定義する例も見せておきます。

`function propStringify<T>(obj: T): {[P in keyof T]: string} {
  const result = {} as {[P in keyof T]: string};
  for (const key in obj) {
    result[key] = String(obj[key]);
  }
  return result;
}`

この例ではasを使ってresultの型を`{[P in keyof T]: string}`にしてから実際にひとつずつプロパティを追加していっています。asやanyなどを使わずにこの関数を書くのは難しい気がします。そのため、mapped typeはどちらかというと関数が使われる側の利便性のために使われるのが主でしょう。ライブラリの型定義ファイルを書く場合などは使うかもしれません。

ちなみに、mapped typeを引数の位置に書くこともできます。

`function pickFirst<T>(obj: {[P in keyof T]: Array<T[P]>}): {[P in keyof T]: T[P] | undefined} {
  const result: any = {};
  for (const key in obj) {
    result[key] = obj[key][0];
  }
  return result;
}

const obj = {
  foo: [0, 1, 2],
  bar: ['foo', 'bar'],
  baz: [],
};

const picked = pickFirst(obj);
picked.foo; // number | undefined型
picked.bar; // string | undefined型
picked.baz; // undefined型`

この例のすごいところは、pickFirstの型引数`T`が推論できているところです。objは`{ foo: number[]; bar: string[]; baz: never[]; }`という型を持っており、それが`{[P in keyof T]: Array<T[P]>}`の部分型であることを用いて、`T`を`{ foo: number; bar: string; baz: never; }`とできることを推論できています。これをさらにmapped typeで移して、返り値の型は`{ foo: number | undefined; bar: string | undefined; baz: undefined; }`となります。なお、bazの型は`never | undefined`ですが、neverはunion型の中では消えるのでこれは`undefined`となります。

mapped typeは他にも色々な応用が出来るようです。実践的な例としては、[Diff型をmapped typeなどを用いて実現する](https://qiita.com/cotttpan/items/999fe07d079298c35e0c)ことができます。ここまでの内容を理解していればこの記事も理解できると思います。

# Conditional Types

上記のmapped typesが導入されたのがTypeScript 2.1のことで、そこから先しばらくは細々とした改良はあっても訳の分からないやばい型が導入されるようなことはありませんでした。その状況を打ち破り、TypeScript 2.8で久々に登場予定のやばい型、それが**conditional type**です。これは**型レベルの条件分岐が可能な型**です。[Qiitaに既にいい記事があります](https://qiita.com/Quramy/items/b45711789605ef9f96de)のでそちらを参照してもらうのも良いですが、今回の一連の記事は一通り読めばTypeScriptの型が分かることを目指していますので、ここにも解説を書いておきます。

Conditional type（日本語でなんと言えばいいのかはやっぱり分かりません）は4つの型を用いて`T extends U ? X : Y`という構文で表現される型です。いわゆる条件演算子を彷彿とさせる記法で、意味もその直感に従います。すなわち、この型は`T`が`U`の部分型ならば`X`に、そうでなければ`Y`になります。そんなもの何に使うんだと言いたくなるかもしれませんが、実はこの型の表現力は凄まじく、[当該のPull Request](https://github.com/Microsoft/TypeScript/pull/21316)で指摘されているようにさまざまな問題を解決できます。まずそれについて少し述べます。

## mapped typesの限界

mapped typeが導入された当初から指摘されていた問題として、deepなマッピングができないという問題がありました。先ほど組み込みの`Readonly<T>`を紹介しましたが、これはプロパティをshallowにreadonly化します。例えば、

`interface Obj{
  foo: string;
  bar: {
    hoge: number;
  };
}`

という型に対して`Readonly<Obj>`は`{ readonly foo: string; readonly bar: { hoge: number; }; }`となります。つまり、barの中のhogeはreadonlyになりません。これはこれで役に立つかもしれませんが、ネストしているオブジェクトも含めて全部readonlyにしてくれるようなもの、すなわち`DeepReadonly<T>`のほうが需要がありました。少し考えると、これは再帰的な定義にしなければならないことが分かります。しかし、次のような素朴な定義はうまくいきません。

`type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}`

次に示すように、これは一見うまくいくように見えます。

`type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

interface Obj{
  foo: string;
  bar: {
    hoge: number;
  };
}

type ReadonlyObj = DeepReadonly<Obj>;

const obj: ReadonlyObj = {
    foo: 'foo',
    bar: {
        hoge: 3,
    },
};

// エラー: Cannot assign to 'hoge' because it is a constant or a read-only property.
obj.bar.hoge = 3;`

しかし、これは`DeepReadonly<T>`の`T`の型が何か判明しているからであり、次のような状況ではうまくいかなくなります。

`type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

function readonlyify<T>(obj: T): DeepReadonly<T> {
    // エラー: Excessive stack depth comparing types 'T' and 'DeepReadonly<T>'.
    return obj as DeepReadonly<T>;
}`

つまり、あのような単純な再帰では一般の`T`に対してどこまでもmapped typeを展開してしまうことになり、それを防ぐためにconditional typeが必要となるわけです。

## conditional typeによる`DeepReadonly<T>`

では、conditional typeを用いた`DeepReadonly<T>`を[https://github.com/Microsoft/TypeScript/pull/21316](https://github.com/Microsoft/TypeScript/pull/21316) から引用します。

`type DeepReadonly<T> =
    T extends any[] ? DeepReadonlyArray<T[number]> :
    T extends object ? DeepReadonlyObject<T> :
    T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
    readonly [P in NonFunctionPropertyNames<T>]: DeepReadonly<T[P]>;
};

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];`

`DeepReadonly<T>`がconditional typeになっており、`T`が配列の場合、配列以外のオブジェクトの場合、それ以外の場合（すなわちプリミティブの場合）に分岐しています。配列の場合は`DeepReadonlyArray<T>`で処理し、それ以外のオブジェクトは`DeepReadonlyObject<T>`で処理しています。プリミティブの場合はそのプロパティを考える必要はないため単に`T`を返しています。

`DeepReadonlyArray<T>`は、要素の型である`T`を`DeepReadonly<T>`で再帰的に処理し、配列自体の型は`ReadonlyArray<T>`により表現しています。`ReadonlyArray<T>`というのは標準ライブラリにある型で、各要素がreadonlyになっている配列です。`T[number]`というのは配列である`T`に対して`number`型のプロパティ名でアクセスできるプロパティの型ですから、すなわち配列`T`の要素の型ですね。

`DeepReadonlyObject<T>`は上の素朴な場合と同様にmapped typeを用いて各プロパティを処理しています。ただし、`NonFunctionPropertyNames<T>`というのは`T`のプロパティ名のうち関数でないものです。よく見るとこれもconditional typeで実装されています。さっき記事を紹介したDiffとアイデアは同じですが、conditional typeにより簡単に書けています。

つまり、この`DeepReadonlyObject<T>`は実は`T`からメソッド（関数であるようなプロパティ）を除去します。これにより、メソッドが自己を書き換える可能性を排除しているのでしょう。

実のところ、`DeepReadonly<T>`の本質は、conditional typeが遅延評価されるところにあります。`DeepReadonly<T>`の分岐条件は`T`が何なのかわからないと判定できないので必然的にそうなりますが。これにより、評価時に無限に再帰することを防いでいます。

試してみたところ、

`type List<T> = {
  value: T;
  next: List<T>;
} | undefined;`

のような再帰的な型にも`DeepReadonly<T>`を適用することができました。

## conditional typeにおける型マッチング

実はconditional typeにはさらに強力な機能があります。それは、**conditional typeの条件部で新たな型変数を導入できる**という機能です。 [https://github.com/Microsoft/TypeScript/pull/21496](https://github.com/Microsoft/TypeScript/pull/21496) から例を引用します。

`type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;`

`ReturnType<T>`は、`T`が関数の型のとき、その返り値の型となります。ポイントは、関数の型の返り値部分にある`infer R`です。このように`infer`キーワードを用いることでconditional typeの条件部分で型変数を導入することができます。導入された型変数は分岐のthen側で利用可能になります。

つまり、この`ReturnType<T>`は、`T`が`(...args: any[]) => R`（の部分型）であるとき`R`に評価されるということです。then側でしか型変数が使えないのは、else側では`T`が`(... args: any[]) => R`の形をしていないかもしれないことを考えると当然ですね。このことから分かるように、この機能は型に対するパターンマッチと見ることができます。

実は同じ型変数に対する`infer`が複数箇所に現れることも可能です。その場合、推論される型変数にunion型やintersection型が入ることもあります。人為的な例ですが、次の例で確かめられます。

`type Foo<T> = 
    T extends { 
        foo: infer U;
        bar: infer U;
        hoge: (arg: infer V)=> void;
        piyo: (arg: infer V)=> void;
    } ? [U, V] : never;

interface Obj { 
    foo: string;
    bar: number;
    hoge: (arg: string)=> void;
    piyo: (arg: number)=> void;
}

declare let t: Foo<Obj>; // tの型は[string | number, string & number]`

部分型関係を考えれば、`U`がunion型で表現されて`V`がintersection型で表現される理由が分かります。`U`はcovariantな位置に、`V`はcontravariantな位置に出現しているからです。ちなみに、試しに両方の位置に出現させてみたところ、`Foo<Obj>`が解決されなくなりました。

ちなみに、`ReturnType<T>`など、conditional typesを使った型が[いくつか標準ライブラリに組み込まれるようです](https://github.com/Microsoft/TypeScript/pull/21847)。自分でconditional typesと戦わなくても恩恵を得られる場面が多いと思います。

# まとめ

TypeScriptの型をひととおり紹介しました。今回は入門記事ということで、はしょったものもあります（this型とか。普段使わないので忘れているとも言いますが）。とはいえ、面白そうな部分はおおよそ紹介したつもりなので、TypeScriptの型で面白いことをやっているコードがあってもけっこう読めるのではないかと思います。

TypeScriptを使っている方は、mapped typeやconditional typeなどを機会があれば使ってみましょう（後者はTypeScript 2.8の正式版が出ないとなかなか使えないと思いますが）。mapped typeくらいなら意外と使える場面があります。

TypeScriptを使っていない方にとっては、特に後半は他の言語ではなかなか見ないような型が登場しており面白かったのではないでしょうか。型システムが強い言語は多々ありますが、TypeScriptの型システムはJavaScriptに型を付けるという難題に対する答えであり、それらとは一線を画したところがあります。

# あわせて読みたい

- [TypeScriptの型初級](https://qiita.com/uhyo/items/da21e2b3c10c8a03952f) 続編ができました。
- [TypeScriptの型演習](https://qiita.com/uhyo/items/e4f54ef3b87afdd65546) 演習問題ができました。
- [TypeScriptで型安全なBuilderパターン](https://qiita.com/uhyo/items/69341387ed6a493b5df5) この記事で紹介したconditional typesやmapped typesなどをふんだんに活用して超型安全なBuilderパターンを書いてみた記事です。
- [TypeScriptの型推論詳説](https://qiita.com/uhyo/items/6acb7f4ee73287d5dac0) TypeScriptの型を理解したら、次は型推論を理解しましょう。
1. `bigint`型はTypeScript 3.2で導入されたので、それ以降のTypeScriptでのみ利用可能です。また、BigIntのトランスパイルはできないため、ターゲットを`esnext`（またはES2019が登場したら`es2019`またはそれ以降）にしないと利用できません。 [↩](about:blank#ipfootnote8)
2. ただし、この挙動が実装されたのはTypeScript 2.6からで比較的最近です。また、`-strictFunctionTypes`オプションをオンにしている必要があります。 [↩](about:blank#ipfootnote9)
3. `instanceof`の挙動においてはちょっとそうとも言い切れない部分がありますが。 [↩](about:blank#ipfootnote10)
4. JavaScriptでは一つの配列に異なる型の値を入れられる点に注意してください。 [↩](about:blank#ipfootnote11)
5. この挙動はTypeScript 3.3からの新しい挙動です。それ以前は、ことなる型の関数同士のunionは関数として呼ぶことができませんでした。 [↩](about:blank#ipfootnote12)
6. 正確にはオプショナルなプロパティを1つ以上持っていなければweak typeとは呼びません。すなわち、`{}`はweak typeではありません。 [↩](about:blank#ipfootnote13)
7. 正確には構造的部分型付けにより他のプロパティを持っているかもしれませんが、プロパティの存在が型システムによって保証されているのはfooとbarだけです。 [↩](about:blank#ipfootnote14)
8. 実際のところ、型システム上では`symb`には`unique symbol`型という型がついています。これはリテラル型のシンボル版みたいなもので、シンボルがひとつひとつ異なることを反映しています。`unique symbol`はリテラル型のようにリテラルで表せないので、代わりにそれが入っている変数名を使って`typeof symb`のように表しているのです。 [↩](about:blank#ipfootnote15)
9. [1](about:blank#ipfootnote0)
10. [2](about:blank#ipfootnote1)
11. [3](about:blank#ipfootnote2)
12. [4](about:blank#ipfootnote3)
13. [5](about:blank#ipfootnote4)
14. [6](about:blank#ipfootnote5)
15. [7](about:blank#ipfootnote6)
16. [8](about:blank#ipfootnote7)