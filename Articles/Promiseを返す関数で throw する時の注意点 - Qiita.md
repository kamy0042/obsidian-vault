---
Created: 2021-09-10T23:08:00
Tags: [topic/技術/JavaScript]
---
気付いたら自分の仕事のディレクトリ情報がダダ漏れだったので、一度削除して再投稿... :facepalm:

## TL;DR

Promise を返す関数で例外を投げる場合には次のどちらかをすること。

- 関数に `async` キーワードをつける
- `throw` の代わりに `return Promise.reject` を使う

## 突然ですが問題です

次のコードにある `update` メソッドの型定義はなんでしょう？

```plain text
export const doUpdate = (id: number, data: { since: Date, until: Date }): Promise<boolean> => {
  // Do actual updating process and return if it's succeeded or not
}


export const update = (id: number, since: Date, until: Date) => {
  if (since.getTime() > until.getTime()) {
    throw new Error('Since cannot be before until')
  }

  return doUpdate(id, {
    since,
    until,
  })
}

```

はい、そうですね。`Promise<boolean>` を返す、次のような型になりますね。

```plain text
update: (id: number, since: Date, until: Date) => Promise<boolean>

```

## テストを書いてみる

関数の型も分かったところでちゃんと期待した通りに動作するか、テストを書いてみましょう。
 本来はちゃんと成功ケースも書くべきですが、今日の目玉ポイントに絞ってテストを書いていきます。

ちなみに Jest を使ったテストになってます。

```plain text
describe('update 関数', () => {
  it('until が since よりも小さい場合に例外を投げる', async () => {
    await expect(update(1, new Date(), new Date(0)).rejects.toThrow()
  })
})

```

はい、一見問題が無いように見えます。

が。

落ちるんです。
 例外を投げて。

「例外が発生したら OK！」っていうテストで例外を投げて死ぬのです。

テストではないですが、以下が例外を catch しようとした時のコードです。

```plain text
> update(1, new Date(), new Date(0)).catch((err) => console.log(err))
[eval].ts:28
        throw new Error('Since cannot be before until');
        ^

Error: Since cannot be before until
    at Object.exports.update ([eval].ts:28:15)
    at [eval].ts:1:9
    at Script.runInThisContext (vm.js:119:20)
    at exec (/Users/takayuki.oda/.../node_modules/ts-node/src/bin.ts:239:17)
    at changes.reduce (/Users/takayuki.oda/.../node_modules/ts-node/src/bin.ts:229:27)
    at Array.reduce (<anonymous>)
    at _eval (/Users/takayuki.oda/.../node_modules/ts-node/src/bin.ts:228:18)
    at REPLServer.replEval (/Users/takayuki.oda/.../node_modules/ts-node/src/bin.ts:301:14)
    at bound (domain.js:395:14)
    at REPLServer.runBound [as eval] (domain.js:408:12)

```

見ての通り、例外を catch できずに例外が投げられて死んでいます。

## 何が起きてるのか

例外を投げることを期待したテストを書いてるのに、例外を投げられて死ぬとか意味がわからないですよね。
 僕も意味がわかりませんでした。

分かるのは `throw new Error('Since cannot be before until')` がで例外を投げて死んでいる事だけです。

なので一旦、例外を投げる代わりに `undefined` を返してみようと思います。

```plain text
export const update = (id: number, since: Date, until: Date) => {
  if (since.getTime() > until.getTime()) {
    // throw new Error('Since cannot be before until')
    return undefined
  }

  return doUpdate(id, {
    since,
    until,
  })
}

```

## ここでもう一発問題です

この時の update 関数の型はなんでしょう？

はい、答えは、ドドン

## `Promise<boolean> | undefined`

そうなんです。
 この関数は Promise 以外も返しうるのです。

`since` が `until` の前後チェックを通らなかった時、Promise にくるまれる事なく値を返すのが今回のミソ。
 これは例外に関しても同じ事が言えます。

## 期待したのは reject, 返ってきたのは Error

さっきの jest のコードをもう一度見てみましょう。`await expect(update(1, new Date(), new Date(0)).rejects.toThrow()`

これは端的に言えば「例外を投げていればOK」なのですが、きちんと読もうとすると「Reject関数が呼ばれて、その中に Error があるか」なんですね。

Reject 関数に Error があればいいということなので、 `throw new Error('Since cannot be before until')` の部分を reject 関数を使う形に書き直せば治ります。

もう一つの方法として、関数に `async` キーワードをつけることです。
 async キーワードをつけることで内部的に強制的に Promise を返す処理に変換されるので、何も考えずに throw しても問題なく reject として扱われるようになります。

Promise を返す関数が Error を投げる場合には以下のうち、どちらかの書き方をすること。

- `throw` の代わりに `return Promise.reject` を使う
- 関数に `async` キーワードをつける

例外処理は型のガードがから外れる箇所なので、扱いには気をつけましょう。（小並）

個人的には `async` キーワードをつける方が余計なノイズが減るので好きです。

![[qiitan-for-prompt-login-modal-014e085d3e40a240e3fe8d61b70b29a9 3.png]]

Why not register and get more from Qiita?

1. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
2. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Ftakayukioda%2Fitems%2Fdf0e0320d803bf28ba22&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Ftakayukioda%2Fitems%2Fdf0e0320d803bf28ba22&realm=qiita)

Comments

![[original 1.jpg]]