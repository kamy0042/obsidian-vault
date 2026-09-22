---
Created: 2023-05-15T21:13:00
URL: https://zenn.dev/okunokentaro/articles/01gmpkp9gzfyr1za5wvrxt0vy6#branded-types
Tags: [topic/技術/TypeScript]
---
![[Attachments/無題のフォルダ/og-base.png]]

# Nominal TypingとStructural Typing

# Type Alias

# Nominal Typing Likeなclass

TypeScriptではclass constructorの処理時に値がなにも代入されないプロパティについてエラーを返しますので、をつけることで抑制しています。この用途ではTypeScript公式側はを採用しており解釈の分かれるところではありますが、筆者の場合はの抑制を書き足す必要があったため不採用としました。

! "`!`"は[Non-null Assertion Operator](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-)といい、筆者は、ほぼこの用途でしか使いません。

# Branded Types

つづいて、本稿のタイトルにもなっているBranded Typesを紹介します。先に結論からいうと、Nominal Typing Likeなclassの欠点を克服しており、筆者は近年の案件では常にBranded Typesを採用しています。この手法はいつ誰が言い出したのか定かではなく、筆者はそのひらめきを根源まで辿れていないため、あくまでも筆者が参考にした情報源しか掲載できないのですが、Michal Zalecki氏の掲載するアイデアを拝借しています。

# [Nominal typing techniques in TypeScript - Michal Zalecki](https://michalzalecki.com/nominal-typing-in-typescript/#approach-4-intersection-types-and-brands)

[Choosing structural over nominal type system allows for a greater flexibility but leaves a room for michalzalecki.com](https://michalzalecki.com/nominal-typing-in-typescript/#approach-4-intersection-types-and-brands)

Michal Zalecki氏のブログ中のサンプルコードを引用します。

```plain text
type Brand<K, T> = K & { __brand: T }

type USD = Brand<number, "USD">
type EUR = Brand<number, "EUR">

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD): USD {
  return (net + tax) as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Type '"EUR"' is not assignable to type '"USD"'.

```

このように、`Brand<K, T>`型を宣言しておくことで、`number`型でありながら異なる構造をとるように`__brand`というダミープロパティを定義し、`T`によって型が一致しないようにして、それを`as`でその型であるとみなすようにしています。`as`のことを[Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)といいます。

注意点として、これは`usd.__brand`というプロパティが実際に増えたわけではなく、あくまでもType Assertionsによって「コンパイラ側にそうみなしてもらっている」に過ぎないことが挙げられます。

## Branded Types が解決したこと

Nominal Typing Likeなclassとの比較をして、どういった点がNominal Typing Likeなclassにおける欠点を克服しているかを紹介します。

Nominal Typing Likeなclassでは、クラスのインスタンスとして作られてしまうため、[プリミティブではなくオブジェクトである](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures)という点が最大の懸念になっていました。つまり次のように`id`インスタンスを引数にとる`getPath()`から文字列を得るような状況で問題が起こってしまうという懸念です。

```plain text
class UserId {
  _userIdBrand!: never;
  constructor(readonly v: string) {}
}

function getPath(id: UserId): string {
  return `/users/${id}/profile`;
}

console.log(getPath(new UserId("abcde12345")));
// "/users/abcde12345/profile" を期待している
// 実際は "/users/[object Object]/profile" である

```

- [プレビュー](https://www.typescriptlang.org/play#code/MYGwhgzhAECqEFMBOBJAJtA3gKGtA+gK6KpoBCSYAdmgIQBc0VCAbsgNy7TAD2VEAFySFgAnkgAUSBGDR8QAT2gtGgpAEsqAcwCUWAL7ZD2AGaEqo9X2haEAgApgBACwnq0jeMnQ7VQzVpYXNIChEhU0AAGAPTEyBDRACSY7vrRAA5IPCbqIAiRnMa8-Dx5AHQgPFoStg5OrswA7nAk6BIARGAARsBoCACMAEwAzAAsAKztOtOcQA)

この関数は無慈悲にも`"/users/[object Object]/profile"`を返却します。こうならないためには、`id`がオブジェクトであるために`id.v`としてプロパティの値を参照するか、あるいは`class UserId`自体に[`toString()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#%E6%97%A2%E5%AE%9A%E3%81%AE_tostring_%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%81%AE%E4%B8%8A%E6%9B%B8%E3%81%8D)メソッドを実装するしかありません。

これは「型同士の区別をしたい」という欲求自体からは離れてしまい、実装上の冗長さを生み出してしまいます。ゼロコストでもありません。

Branded Typesが優れているのは、ここでプリミティブをそのまま異なる型とみなせるようにしたことです。コンパイラには異なる型とみなさせているだけで、ECMAScriptとしての実行時には余計なプロパティやメソッドへのアクセスがありません。

また、オブジェクトではないということは、[JSONのシリアライズ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)にも強いです。`class User`の場合は`JSON.stringify()`の結果は`{"v":"abcde12345"}`となってしまい、`v`プロパティの中に値の実体が存在することが露出してしまいます。Branded Typesの場合はプリミティブであるためシリアライズしても`"abcde12345"`のみが得られます。

昨今では[Next.js](https://nextjs.org/)のようにフロントエンドとバックエンドをまとめてTypeScriptで実装するというケースが増えてきました。この状況ではフロントエンドとバックエンドの橋渡しにJSONを採用することが多く、classインスタンスはJSONシリアライズ・デシリアライズに弱いという理由ですっかり採用しづらくなってしまいました。その事情からも、筆者の周辺においてはNominal Typing LikeなclassよりBranded Typesが業務上の欲求を満たすものとして採用できています。

# 明日は『実例 `FilledString`, `UserId`』

本日はTypeScriptの型の互換性を意識した扱いという、型安全を遂行する上で重要な観点を紹介しました。明日は本日紹介した`Brand<K, T>`にまだ少し残る課題を克服し、さらに安全性を高めた[筆者流のBranded Types](https://zenn.dev/okunokentaro/articles/01gmpkp9gzgf47wdr7g70nmn77)を解説し、その実例を紹介していきます。それではまた。