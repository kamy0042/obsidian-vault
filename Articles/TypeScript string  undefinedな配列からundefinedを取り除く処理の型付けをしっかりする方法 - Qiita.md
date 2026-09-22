---
Created: 2021-01-15T18:10:00
Tags: [topic/技術/TypeScript]
---
この投稿はTypeScriptで`(string | undefined)[]`のような`string`と`undefined`が入る配列から`undefined`を取り除く処理を`filter`メソッドで書くとき、`filter`メソッドが返す型を`string[]`にする方法を紹介します。

## 問題点

次のような`string`と`undefined`が入り混じった配列があり、

`const items: (string | undefined)[] = ['a', undefined, 'b', undefined, 'c']`

ここから`undefined`だけを取り除き`string`だけの配列を作りたいとします。

`Array.prototype.filter`を使うと、1行でその処理が実装できるのはご存知かと思います:

`const stringItems = items.filter(item => item !== undefined)
// or
const stringItems = items.filter(item => typeof item === 'string')`

処理自体はこれでいいのですが、問題点が1つあります。それは、`stringItems`の型が`string[]`にならず、元配列の`(string | undefined)[]`のままになるという点です。このせいで、`stringItems`を`string[]`だと思って処理しようとするコードはコンパイルエラーになってしまいます:

[Playground Link](https://www.staging-typescript.org/play#code/MYewdgzgLgBAllApgWwgLhgCmgJzmAcxgB8YBXMAE0QDN9FKBKAbQF0YBeGZgcgEMeAGnJVa9SsJ4AjISOp0wDScB6sAUGtCRYufAQCSSVJ3hGIAOjoAbJDkyYEKRpwB8MKAE8ADohA1TKJxcPLqEPIwaWtDkXj44wHwQiADKUHiEECahBmbmyHxeDkauAcjmUCAAqrGIOADCiYiYjBEaGkA)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F21086%2F7fd36f59-2620-02af-2def-3fba90b085c2.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=e8ef95630f22bc1ffb45b7894e0e150c)

## 解決策: ユーザ定義タイプガードを使う

`filter`の戻り値を`string[]`に型付けするにはどうしたらいいのでしょうか？

解決策のひとつは、`filter`に渡す関数をユーザ定義タイプガード関数にすることです。普通の関数との書き方の違いは、戻り値の型を`boolean`ではなく、`引数名 is 型`にする点です。

今回の例では型は `string[]` に揃えるので `typeof item == 'string'` の方法を採用します。

`// 普通の関数
const f1 = (item): boolean => typeof item == 'string'

// ユーザ定義タイプガード関数
const f2 = (item): item is string => typeof item == 'string'`

ユーザ定義タイプガード関数の詳細は他ドキュメントをご参照ください。

- [Advanced Types · TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
- [型ガード - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/type-system/typeguard#yznotype-guard)

このユーザ定義タイプガード関数を`filter`に渡してあげると、`filter`は`string[]`型を返すものとコンパイラに解釈させることができます:

`const stringItems = items.filter((item): item is string => typeof item == 'string')`

これにより、先程コンパイルエラーになっていたコードの問題も解決されます:[Playground Link](https://www.staging-typescript.org/play#code/MYewdgzgLgBAllApgWwgLhgCmgJzmAcxgB8YBXMAE0QDN9FKBKAbQF0YBeGZgcgEMeAGnJVa9SsJ4AjISOp0wDScB6sAUGtCRYufAQCSSVJ3hGIAOjoAbJDkyYEKRmkfJ4EGLsKcAfDCgAngAOiCA0piicXDxeBDyMGlrQ5EEhOMB8EIgAylB4hB5csYYoFsh8QQ5GvhHI5lAgAKqpiDgAwpmImIwJGhpAA)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F21086%2Fc5241612-7893-7d67-8ef3-95dd59c44229.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=12eddd1c005c81e67e0082c387671dab)

## おまけ: 「取り除く」という意味合いにする

上記の解決策で問題自体は解消しましたが、`filter(item => typeof item == 'string')`の部分が「`undefined`を取り除く」というより「`string`に絞り込む」という意味合いのコードになっているので、おまけとして「取り除く」という意味になるコードも考えてみたいと思います。

`undefined`を取り除くということは、`string | undefined`なら`string`に、`string | number | undefined`なら`string | number`になるべきです。そういう型のマッピングをするのに便利なのが`Exclude<T,U>`型です。

- [Utility Types · TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetu)

これを使って「取り除く」路線で実装したコードが次になります:

`const stringItems = items.filter(
  (item): item is Exclude<typeof item, undefined> => item !== undefined
)`

ちなみにこの実装であれば、`items`が`(string | undefined)[]`から、`(string | number | undefined)[]`になったとき、`filter`が返す型もそれに追従して、`(string | number)[]`になるといった仕掛けになります:

`const items: (string | number | undefined)[] = ['a', undefined, 'b', undefined, 'c']

const stringOrNumbers: (string | number)[] = items.filter(
    (item): item is Exclude<typeof item, undefined> => item !== undefined
)`

最後までお読みくださりありがとうございました。Twitterでは、Qiitaに書かない技術ネタなどもツイートしているので、よかったらフォローしてもらえると嬉しいです

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f60c.png)

→

[Twitter@suin](https://twitter.com/suin)