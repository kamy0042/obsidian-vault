---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
こういうコンパイルエラーにぶち当たった。
Interfaceだとコンパイルエラーになったのが、Typeなら問題なく通る。

`declare function numMapToVoid(obj: {[key: string]: number}): void;

// interfaceだとコンパイルエラー
interface IObj {
  a: number
}
const iObj: IObj = {a: 1};
numMapToVoid(iObj); // エラー

// typeだと問題なし
type TObj = {
  a: number
};
const tObj: TObj = {a: 1};
numMapToVoid(tObj); // OK`

これは不思議...というのがきっかけで、TypeScriptのInterfaceとTypeの機能上の違いを調べてみた。

# 比較まとめ

TypeScript2.3.3で確認。([追記] 3.4.1でも確認)

Interface
Type




用途
クラスやオブジェクトの規格を定義
型や型の組み合わせに別名を付ける


継承
可能
交差型で同じことができる


同名要素の宣言
マージされる
エラー


Classへのimplement
可能
可能


交差型、共用体型、タプル型
不可能
可能


Mapped Types
不可能
可能


規定しないプロパティの扱い
他にもプロパティが存在しうるものとして扱う
存在しないものとして扱う

一応念のため、今回は単に機能や性質の差を調べただけで、使い分けの話はしない。両方で使えるからといって、どっちを使ってもいいというわけじゃない点に注意。

# 継承

両方可能。Interfaceで継承できるのはもちろん、交差型を使うとTypeでも継承めいたことができる。

`// interfaceの継承
interface IPoint2D {
  x: number;
  y: number;
}
interface IPoint3D extends IPoint2D {
  z: number;
}

// typeの継承もどき
type TPoint2D = {
  x: number;
  y: number;
}
type TPoint3D = TPoint2D & {
  z: number;
}`

ちなみにInterfaceがTypeを継承してもエラーにならない。

`// OK: TypeがInterfaceを継承
type TIPoint3D = IPoint2D & {
  z: number;
}

// OK: InterfaceがTypeを継承
interface ITPoint3D extends TPoint2D {
  z: number;
}`

# 同名要素の宣言

同名のInterfaceは全てマージされる。これを利用してInterfaceを拡張できる。

`interface IPoint2D {
  x: number;
  y: number;
}
interface IPoint2D {
  name: string;
}
const ok: IPoint2D = {x: 1, y: 1, name: 'p1'}; // OK
const ng: IPoint2D = {x: 1, y: 1}; // コンパイルエラー`

一方で、Typeは複数宣言すると単純にエラーになる。

`type TPoint2D = {
  x: number;
  y: number;
}
type TPoint2D = { // コンパイルエラー
  name: string;
}`

これは結構な違いで、Interfaceを使っていないライブラリにちょっと追加したいときに苦労するかもしれない。基本的になるべくInterfaceを使えというのはこれが理由だと思う。

# Classへのimplement

両方可能。ClassのimplementsにTypeを入れてもエラーにならない。

`// OK: interfaceのimplements宣言
class PointClass1 implements IPoint2D {
  x: number;
  y: number;
}

// OK: typeのimplements宣言
class PointClass2 implements TPoint2D {
  x: number;
  y: number;
}`

[追記]
TypeやInterfaceは値ではないため、extendsはできない。

`class PointClass1 extends IPoint2D { // エラー: インタフェースを拡張できません
}

class PointClass2 extends TPoint2D { // エラー: 型を値として使っています
}`

ただ、逆にClassをimplementsすることはできる。
これは、Class宣言は同名Interfaceも同時に定義するため。

`class Foo {
  a: number;
}

class Bar implements Foo { // エラー: aを実装していません
}`

Interfaceなので拡張できる。なぜかエラーは出ない。

`interface Foo {
  a: number;
}

class Foo { // OK
}

new Foo().a // number`

正直、この辺の挙動はよくわからない。

`interface Foo {
  a: number;
}

class Foo implements Foo { // OK
}

class Bar implements Foo { // エラー: aを実装していません
}`

# 交差型、共用体型、タプル型

Typeは複数の型全てを満たす型(交差型)、複数の型いずれかを満たす型(共用体型)を作ることができる。タプル型も作れる。Interfaceではできない。

`// 交差型
// 引数としてaとbの両方のプロパティを持つオブジェクトを受け取る
type AB = {a: string} & {b: string};
function logAB(arg: AB) {
  console.log(arg.a + arg.b);
}

// 共用体型
// 引数としてnumberかstringを受け取る
type NumOrStr = number | string;
function logLowerCase(arg: NumOrStr) {
  if (typeof arg === 'number') {
    console.log(arg);
  } else {
    // この時点でargはstring確定
    console.log(arg.toLowerCase());
  }
}

// タプル型
type Tuple = [number, string];
const tuple: Tuple = [1, 'a']; // OK`

# Mapped Types

TypeScript2.1で追加されたMapped TypesはTypeでしか使えない。

`// interfaceでMapped Types
interface IPoint2D {
  [key in 'x' | 'y'] : number; // コンパイルエラー
}

// typeでMapped Types
type TPoint2D = {
  [key in 'x' | 'y'] : number; // OK
}`

ちなみにインデックスシグネチャ型では両方とも使える。

`// interfaceでインデックスシグネチャ
interface INumMap {
  [key: string]: number; // OK
}

// typeでインデックスシグネチャ
type TNumMap = {
  [key: string]: number; // OK
}`

だったらMapped Typesも両方で使えて良さそうだけどなあ。

# 規定しないプロパティの扱い

ここから冒頭で述べた個人的本題。※推測混じりなので注意。
Interfaceを満たすオブジェクトは「少なくともその仕様の必要条件を満たしている」だけで、他にプロパティが存在する可能性があると想定しているのに対し、Typeに属するオブジェクトは「文字通りその型のオブジェクト」であり、他のプロパティの存在を考慮しなくなるようだ。

これだけではよくわからないと思うので、例として、valueが数値型のオブジェクト型を用意する。インデックスシグネチャ型として以下のように書ける。

`// 値がnumberのオブジェクト
// (ここをtypeにしても同じになる)
interface NumMap {
  [key: string] : number;
}`

ここで、IPoint2Dのインタフェース型変数はNumMap型に代入できるだろうか？

`interface IPoint2D {
  x: number;
  y: number;
}

// 代入してチェックしてみる
const iPoint: IPoint2D = {x: 1, y: 2};
const numMap: NumMap = iPoint; // コンパイルエラー`

というわけで、これはコンパイルエラーになる。Typeでもやってみよう。

`type TPoint2D = {
  x: number;
  y: number;
}

// 代入してチェックしてみる
const tPoint: TPoint2D = {x: 1, y: 2};
const numMap: NumMap = tPoint; // OK`

こちらはコンパイルが通る。どういうこと？
試しに明らかにNumMapを満たさない変数を入れてみる。

`// NumMapを満たさない値
const point = {x: 1, y: 2, foo: 'bar'};

const iPoint: IPoint2D = point; // これはOK (構造的部分型)
const numMap1: NumMap = iPoint; // コンパイルエラー

const tPoint: TPoint2D = point; // OK
const numMap2: NumMap = tPoint; // OK (でも実行時エラー吐きそう)`

これでもTypeではコンパイルが通ることから、TPoint2D型変数となった時点で`{foo: 'bar'}`などが存在する余地が考慮されなくなったのだと推測される。Interfaceはその点厳密で、宣言していないあらゆるプロパティの存在を想定しているのでエラーを吐いてくれる、ということだろう。ただ正直、問題ないことが明らかなオブジェクトでもエラーになるのは不便ではある。

ちなみにMapped Typesでもプロパティを限定しなければ同様の挙動になる。

`type NumMap2 = {
  [P in string] : number;
}

const point = {x: 1, y: 2, foo: 'bar'};

const iPoint: IPoint2D = point;
const numMap1: NumMap2 = iPoint; // コンパイルエラー

const tPoint: TPoint2D = point;
const numMap2: NumMap2 = tPoint; // OK (でも実行時エラー吐きそう)`

プロパティ名の範囲を限定すればコンパイルが通るようになる。実行時エラーも防げていい感じ。

`type NumMap3<T> = {
  [P in keyof T] : number;
}

const point = {x: 1, y: 2, foo: 'bar'};

const iPoint: IPoint2D = point;
const numMap1: NumMap3<IPoint2D> = iPoint; // OK

const tPoint: TPoint2D = point;
const numMap2: NumMap3<TPoint2D> = tPoint; // OK`

[追記][Nfm4yxnW8](http://b.hatena.ne.jp/Nfm4yxnW8/)さんからはてブ上でコメントを頂きました。

> Nfm4yxnW8
interfaceとtypeの使い分けは、tslintのinterface-over-type-literal を有効にしとけばいいと思う // interfaceじゃだめでtypeが通るの理由はここに書いてある https://github.com/Microsoft/TypeScript/issues/14736

リンク先を読むと、

- Typeはオブジェクトリテラルの型表現でもある
- Typeを厳密にすると、（明らかに追加のプロパティを持たない）オブジェクトリテラルをインデックスシグネチャ型に適用できなくなって不便

つまり、以下の場合にエラーを起こさないためらしい。

`declare function numMapToVoid(obj: {[key: string]: number}): void;

numMapToVoid({a: 123}); // {a: number}型のオブジェクトリテラルを入れてもOK`

# 感想

TypeScriptむずいっすね。
まとめとしてもう一回同じ表を貼っておく。

Interface
Type




用途
クラスやオブジェクトの規格を定義
型や型の組み合わせに別名を付ける


継承
可能
交差型で同じことができる


同名要素の宣言
マージされる
エラー


Classへのimplement
可能
可能


交差型、共用体型、タプル型
不可能
可能


Mapped Types
不可能
可能


規定しないプロパティの扱い
他にもプロパティが存在しうるものとして扱う
存在しないものとして扱う

機能的にはTypeの凄さが目につくなあ。
間違っていたら指摘お願いします。

# 参考

- [TypeScript の型定義ファイルと仲良くなろう - Hatena Developer Blog](http://developer.hatenastaff.com/entry/2016/06/27/140931)
- [高等な型 | TypeScript 日本語ハンドブック | js STUDIO](http://js.studio-kingdom.com/typescript/handbook/advanced_types)
- [javascript - Typescript: Interfaces vs Types - Stack Overflow](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types)
- [TypeScript 2.1のkeyofとかMapped typesがアツい - Qiita](http://qiita.com/Quramy/items/e27a7756170d06bef22a)