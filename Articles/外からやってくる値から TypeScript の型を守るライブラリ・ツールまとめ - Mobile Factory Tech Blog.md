---
Created: 2021-12-12T22:25:00
URL: https://tech.mobilefactory.jp/entry/2021/12/10/000000
Tags: [topic/技術/TypeScript]
---
![[1542076919658841.bin]]

こんにちは、新卒エンジニアの [id:d-kimuson](http://blog.hatena.ne.jp/d-kimuson/) です

先日 [type-predicates-generator](https://github.com/d-kimuson/type-predicates-generator) という型定義からユーザー定義型ガード・アサーション関数を自動生成するツールをリリースして[紹介記事](https://zenn.dev/kimuson/articles/type_predicates_generator)を書いたのですが、感想とかを眺めていたら同じく外部から来た値に安全な型付けをするためのライブラリやツールの情報をいくつも観測しました

この辺りのランタイムチェックライブラリの情報ってあまりまとまっていない印象で自分が知らないものもいくつかあったので、調べつつ簡単にまとめられたらなと思ってこのエントリを書きました

外部からやってきた値を型安全にするにはざっくりと

- 型生成によるアプローチ
- ランタイムチェック用の独自型を書かせるアプローチ
- 型情報からランタイムチェック関数を自動生成するアプローチ

の 3 つのアプローチがあると思うので、それぞれのアプローチごとに紹介します

## ① 型定義の生成によるアプローチ

外部から値がやってくる主たるケースは API 通信で、GraphQL や OpenAPI のスキーマから型定義を自動生成することで型安全性を守るアプローチです

スキーマと生成ツールの実装が正しいという前提の元ですが、外部からやってくる値に正しさを一定担保した上で型をつけることができます

### GraphQL Code Generator

[GitHub - dotansimha/graphql-code-generator: A tool for generating code based on a GraphQL schema and GraphQL operations (query/mutation/subscription), with flexible support for custom plugins.](https://github.com/dotansimha/graphql-code-generator)

GraphQL のスキーマから型定義を自動生成するツールです

自分は Gatsby で個人の技術ブログを書いていて、そこで使用してます

[公式サイト](https://www.graphql-code-generator.com/) に例が載っているので、見てみるとイメージしやすいと思います

### openapi-generator

[GitHub - OpenAPITools/openapi-generator: OpenAPI Generator allows generation of API client libraries (SDK generation), server stubs, documentation and configuration automatically given an OpenAPI Spec (v2, v3)](https://github.com/OpenAPITools/openapi-generator)

OpenAPI スキーマから型安全に API を呼べる API クライアントを自動生成してくれるツールです

```plain text
// openapi-generator + axios のサンプルコード
import axios from "axios"
import { PetApiFactory, Configuration, PetStatusEnum } from "./typescript-axios"  // 自動生成されたコード

const api = axios.create({ /* config here */ })
const config = new Configuration({ /* config here */ })

export const endpoints = PetApiFactory(config, `baseURL`, api)
// APIコール
endpoints
  .getPetById(0 /* 引数に型が付く */)
  .then((response) => {
    response.data /* Pet に型が付く */
  })

```

### aspida + openapi2aspida

[GitHub - aspida/aspida: TypeScript friendly HTTP client wrapper for the browser and node.js.](https://github.com/aspida/aspida)

[aspida](https://github.com/aspida/aspida) という型安全に API コールを行うためのライブラリがあり、[openapi2aspida](https://github.com/aspida/openapi2aspida) を使うことでスキーマから aspida のクライアントを自動生成してくれます

```plain text
// aspida のサンプルコード
import axios from "axios"
import aspida from "@aspida/axios"
import api from "./api/$api"  // 自動生成されたコード

const client = api(aspida(axios))
// API コール
client.pet
  ._petId(0 /* 引数に型が付く */)
  .get()
  .then((response) => {
    response.body /* Pet に型が付く */
  })

```

openapi-generator は TS に限らず様々な言語のクライアントを生成しますが、openapi2aspida は TypeScript 専用でより使いやすい印象です

自分は API を叩くときは aspida を使うことが多いです

この辺りのツールは型安全性の担保ももちろんですが、すでに存在するスキーマと同じ型を手動で書かなくて良い点も嬉しいポイントですね

## ② TS の型ではなくランタイムチェックを行える独自の型宣言を行うアプローチ

TypeScript では型定義からランタイムのコードを生成することはできません

なので型定義とは別にランタイムチェック用の型を書いてそれでチェックしようというアプローチです

ランタイムチェック用の型はライブラリが指定する独自の書き方で宣言する必要があるので、重複管理になりそうに思うかもしれませんが、値から TS の型を取り出すのは難しくないので、ランタイムチェック用の型から TypeScript の型を拾えるようになっています

### io-ts

[GitHub - gcanti/io-ts: Runtime type system for IO decoding/encoding](https://github.com/gcanti/io-ts)

言わずとしれたランタイム型チェックのライブラリの王道です

io-ts の指定する形で型定義を書いてランタイムチェックを行えます

```plain text
// io-ts のサンプルコード
import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/Either'

const UserRuntimeType = t.type({
  id: t.number,
  name: t.string,
  union: t.union([t.string, t.number]),
  optional: t.union([t.string, t.undefined]),
  nullable: t.union([t.string, t.null]),
})
type User /* : {
  id: number;
  name: string;
  union: string | number;
  nullable: string | null;
  optional?: string | undefined;
} */ = t.TypeOf<typeof UserRuntimeType>
const maybeUser: unknown = 'invalid'

const user = UserRuntimeType.decode(maybeUser)
if (isRight(user)) {
  // ランタイムバリデーションが成功したときだけこのブロックを通る
  user.right /* : User に型が付く */
}

```

isRight とかに関数型っぽさが見え隠れしますね

### runtypes

[GitHub - pelotom/runtypes: Runtime validation for static types](https://github.com/pelotom/runtypes)

io-ts と同様に独自の構文でランタイムチェックの型を宣言してチェックします

io-ts は fp-ts に依存していて書き方も関数型チックになるので、関数型に寄るのを好まないケースで使われる印象です

```plain text
// runtypes のサンプルコード
import {
  Number,
  String,
  Undefined,
  Null,
  Record,
  Union,
  Static,
} from 'runtypes'

const UserRuntimeType = Record({
  id: Number,
  name: String,
  union: Union(String, Number),
  optional: Union(String, Undefined),
  nullable: Union(Null, Undefined),
})
type User = Static<typeof UserRuntimeType>

const maybeUser: unknown = 'invalid'
const user = UserRuntimeType.check(maybeUser) // おかしかったら error を投げる
user /* User に型が付く  */

```

io-ts は decode 時に型ガードを行いますが、runtypes ではバリデーションして値がおかしかったら例外を投げるという形のようです

### superstruct

[GitHub - ianstormtaylor/superstruct: A simple and composable way to validate data in JavaScript (and TypeScript).](https://github.com/ianstormtaylor/superstruct)

これは自分が知らなかったライブラリなのですが、結構人気のあるライブラリらしくスターも 5600 ついていました

ドキュメントもかなり充実していました

```plain text
// superstruct のサンプルコード
import {
  object,
  number,
  string,
  Infer,
  assert,
  union,
  optional,
  nullable,
  is,
} from 'superstruct'

const UserRuntimeType = object({
  id: number(),
  name: string(),
  union: union([string(), number()]),
  optional: optional(string()),
  nullable: nullable(string()),
})

type User = Infer<typeof UserType>
const maybeUser: unknown = 'invalid'

if (is(maybeUser, UserRuntimeType)) {
  maybeUser /* User に型が付く */
}

assert(maybeUser, UserRuntimeType) // バリデーションに失敗したら例外が発生
maybeUser /* User に型が付く */

```

型の絞り込みはアサーションと型ガード両方に対応しているようです

Utility types に対応する omit, partial, pick も使えるらしく表現力がかなり豊かそうで好感触でした

ランタイムチェックはしたいけど io-ts は合わないって方にはファーストチョイスになりそうです

### zod

[GitHub - colinhacks/zod: TypeScript-first schema validation with static type inference](https://github.com/colinhacks/zod)

上の2つと同様の Zod が提供するデータ型でスキーマを宣言して、ランタイムチェックを行います

```plain text
// zod のサンプルコード
import { z } from "zod"

const UserRuntimeType = z.object({
  id: z.number(),
  name: z.string(),
  union: z.union([z.string(), z.number()]),
  optional: z.union([z.string(), z.undefined()]),
  nullable: z.union([z.null(), z.string()]),
})
type User = z.infer<typeof UserRuntimeType>

const maybeUser: unknown = "invalid"
const user = UserRuntimeType.parse(maybeUser)  // 失敗したら例外を投げる
user /* User に型が付く  */

const result = UserRuntimeType.safeParse("invalid")
if (result.success) {
  maybeUser as User  // 型ガードは非対応 (unknown のまま) だがバリデーションはできるので、型キャストは安全
}

```

型ガードには対応してないようですがバリデーション自体はできるので型キャストは一応安全です

また今回の値の型が TypeScript の型通りかをランタイムチェックするという趣旨とは若干ズレるので詳しくは触れませんが、[ajv](https://github.com/ajv-validator/ajv), [yup](https://github.com/jquense/yup), [joi](https://www.google.co.jp/search?q=github%20joi) 等のバリデーションライブラリを使う手段もあります

## ③ 型定義からランタイムチェックの関数を自動生成するアプローチ

② のアプローチでは TS の型を一時の型にしたい状況にはあまり適しません

使うことができないわけではありませんが、型情報が二重管理になってしまいます

具体的には

- ① のアプローチで TypeScript の型を自動生成しているケース
- 学習コスト等の問題で TypeScript の型で定義したいケース

等です

実行時に TS の型から値を作ることはできませんが、事前に型情報からコード生成をすることなら可能なのでコード生成によって対応しようというアプローチです

### ts-auto-guard

[GitHub - rhys-vdw/ts-auto-guard: Generate type guard functions from TypeScript interfaces](https://github.com/rhys-vdw/ts-auto-guard)

cli が提供されていて

```plain text
$ ts-auto-guard ./path/to/type.ts
```

すると、`type.guard.ts` に型ガード関数が生成されてインポートして使うことができるようです

```plain text
// ts-auto-guard のサンプルコード
import { isUser } from './type.guard'

const maybeUser: unknown = 'invalid'
if (isUser) {
  maybeUser /* : User */
}

```

### type-predicates-generator

[GitHub - d-kimuson/type-predicates-generator: generating predicates and assertion function by type definitions.](https://github.com/d-kimuson/type-predicates-generator)

今回僕が作ったツールです、詳細は[紹介記事](https://zenn.dev/kimuson/articles/type_predicates_generator)を書いたばかりなのでそちらに譲りますが watch を立てておき、型定義の変更にリアルタイムに追従してランタイムチェック関数を自動生成することができます

```plain text
$ type-predicates-generator -f 'types/**/*/ts' -o predicates.ts -a -w
```

```plain text
// type-predicates-generator のサンプルコード
import { isUser, assertIsUser } from '/path/to/predicates'

const maybeUser: unknown = 'invalid'
if (isUser) {
  maybeUser /* : User */
}
assertIsUser(maybeUser)
maybeUser /* : User */

```

### typescript-is

[GitHub - woutervh-/typescript-is](https://github.com/woutervh-/typescript-is)

typescript-is は少し特殊で [ttypescript](https://github.com/cevek/ttypescript) という TypeScript にデフォルト以外の transform 処理を挟むツールとセットで使うことで、ビルド時にランタイムチェック関数を生成することができます

```plain text
// typescript-is のサンプルコード
import { is } from 'typescript-is'

type User = {
  id: number
  name: string
}

const maybeUser: unknown = 'invalid'
if (is<User>(maybeUser)) {
  maybeUser
}

```

本来は `is<User>()` のような形で User 型に合わせたようなチェック関数を作ることはできませんが、カスタムトランスフォーマーで前の 2 つと同じようなコード生成をビルド時に行うことでトランスパイル後のファイルにランタイムチェックを書き出すことができます

上の if 文は以下のようにトランスパイルされます

```plain text
if (
  (0, typescript_is_1.is)(maybeUser, object => {
    function _number(object) {
      if (typeof object !== 'number') return {}
      else return null
    }
    function _string(object) {
      if (typeof object !== 'string') return {}
      else return null
    }
    function _0(object) {
      if (
        typeof object !== 'object' ||
        object === null ||
        Array.isArray(object)
      )
        return {}
      {
        if ('id' in object) {
          var error = _number(object['id'])
          if (error) return error
        } else return {}
      }
      {
        if ('name' in object) {
          var error = _string(object['name'])
          if (error) return error
        } else return {}
      }
      return null
    }
    return _0(object)
  })
) {
  maybeUser
}

```

- 標準ではない ttsc でビルドする必要があること
- 同じ型に対するチェックも毎回長々と書き出すのでバンドルサイズが増えがち
- ランタイムチェックの実装がアップデート等で変わったときにソースコードじゃないので気づけない

といった成約はあると思いますが、直感的かつ手軽に値の型を守ることができます

## おまけ: as-safely

プリミティブ等の型を気軽にチェックするには、[as-safely](https://github.com/YuitoSato/as-safely) というライブラリが手軽です。isString 等のランタイムチェック関数が提供されています

```plain text
import { asSafely, isString } from 'as-safely'

const maybeStr: unknown = 'valid'
asSafely(maybeStr, isString) // チェックに失敗したら例外を投げる
maybeStr /* string に型がつく */

```

カスタムのランタイムチェック関数も使用できるので、② や ③ のライブラリ/ツールと組み合わせてアサーションを手軽に行うこともできます

例えば ts-auto-guard はアサーション関数の自動生成を提供しないようですが、asSafely とセットで使うと手軽にアサーションも行うことができます

```plain text
import { asSafely } from 'as-safely'
import { isUser } from './type.guard'

const maybeUser: unknown = 'invalid'
asSafely(maybeUser, isUser)
maybeUser /* : User に型が付く */

```

## まとめ

外部からやってきた値に安全に型をつける方法について3つのアプローチに分けて紹介しました！

io-ts が一番有名だと思いますが、これに限らず複数の選択肢があるのでプロジェクトにあった形で型を守れると良いのではないでしょうか

個人的には

- ちゃんとしたスキーマがある箇所 → ① + ③ のあわせ技
- それ以外 → ② 
    - 関数型っぽさが入っても問題ない → io-ts
    - もっと普通のが良い → superstruct

辺りになりそうかなという印象でした

それでは良い型安全ライフを！