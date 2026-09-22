---
Created: 2022-08-16T13:39:00
URL: https://numb86-tech.hatenablog.com/entry/2020/07/02/103544
Tags: [topic/技術/TypeScript]
---
TypeScript には条件型（Conditional Type）という機能があり、これを使うと型定義に条件分岐を持ち込むことができる。

この記事の内容は TypeScript の`v3.9.5`で動作確認している。

## 条件型の基本

`T extends U ? A : B`が、条件型の構文。`T`が`U`に割り当て可能なときは`A`、そうでないときは`B`を意味する。

そして`type Example<T> = T extends U ? A : B;`のように、ジェネリック型と組み合わせて使う。

ジェネリック型については、以前記事を書いた。

条件型とジェネリック型の組み合わせ例を示す。
 以下の`IsString`は、渡された型引数`T`が`string`に割り当て可能なときは`true`を、不可能なときは`false`を返す。

```plain text
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // type A = true
type B = IsString<"a">; // type B = true
type C = IsString<number>; // type C = false

```

## 分配法則

条件型は、分配法則に従う。
 そのため、`T extends U ? A : B`の`T`が共用体型のとき、`T`のそれぞれの要素に対して条件型が展開される。

```plain text
T1 | T2 extends U ? A : B
// ↓
(T1 extends U ? A : B) | (T2 extends U ? A : B)

```

この性質を使うことで、共用体型の中から特定の条件を満たした要素のみを取り出す、ということが可能になる。

例えば以下の`ExtractString`は、渡された値の中から、`string`及びそのサブタイプを取り出す。

```plain text
type ExtractString<T> = T extends string ? T : never;

type A = ExtractString<1 | "a" | "b">; // type A = "a" | "b"
type B = ExtractString<1 | 2>; // type B = never

```

`ExtractString`に`1 | "a" | "b"`が渡された場合、以下のように計算が進む。

```plain text
ExtractString<1 | "a" | "b">
// ↓
1 | "a" | "b" extends string ? T : never
// ↓
(1  extends string ? T : never) | ("a" extends string ? T : never) | ("b" extends string ? T : never)
// ↓
never | "a" | "b"

```

`never`の性質上、`T | never`は`T`になるので、最終結果は`"a" | "b"`になる。

`never`の性質やそれを使ったテクニックについては、下記を参照。

TypeScript の組み込みの条件型でも、このテクニックがよく使われている。

```plain text
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;

```

## infer キーワードによるキャプチャ

`infer`キーワードを使うと、条件にマッチした際にその一部分をキャプチャして利用することが可能になる。

`T extends U ? A : B`の、`U`の部分で`infer`を使う。
 そうすると、条件にマッチしたときにその型をキャプチャし、それを`A`の部分で使えるようになる。

```plain text
type ResolvedType<T> = T extends Promise<infer X> ? X : never;

type A = ResolvedType<Promise<1>>; // type A = 1
type B = ResolvedType<Promise<string>>; // type B = string
type C = ResolvedType<1>; // type C = never

```

`infer`は、ジェネリック型のようなものだと考えることができる。上記の`ResolvedType`の定義で使っている`X`は、定義した時点では型が決まっていない。

`ResolvedType`に型引数が渡されると TypeScript は、その型を`T`にバインドする。そしてその型に応じて、`X`が何であるかを推論するのである。
 どのような型も`X`にバインドできない場合は、条件にマッチしなかったと判定され、`never`が返される。`X`に具体的な型をバインドできた場合は条件にマッチしたと判定され、`X`が返される。

`infer`も、組み込みの条件型で使われている。
 以下は、関数の返り値の型を返す`ReturnType`の例。

```plain text
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

```