---
Created: 2021-01-27T00:48:00
URL: https://zenn.dev/qnighy/articles/dde3d980b5e386
Tags: [topic/技術/TypeScript]
---
## Mapped Typesの基本形

Mapped Typesの基本形は `{ [P in K]: T }` です。 `P` は `T` の中で使える型変数です。このとき、

- `P` はこのMapped Typeの**引数型 (parameter type)**
- `K` はこのMapped Typeの**制約型 (constraint type)**
- `T` はこのMapped Typeの**テンプレート型 (template type)**

と呼びます。 `T` の中で `P` がどのように振る舞うかに注目すると `type Element<P extends K> = T;` という形の定義と相似であることから、`P` が引数型、 `K` が制約型と呼ばれる理由がうかがえるかと思います。

Mapped Typesの基本形で、 `T` が `P` に依存しないケースには `Record<K, T>` という名前がついています。

```plain text
type Record<K extends string | number | symbol, T> = { [P in K]: T; };

```

逆に、 `T` が `P` に依存する例を念のため挙げておきます。

```plain text
// { foo: "foo"[]; bar: "bar"[] }
type Test = { [P in "foo" | "bar"]: P[] };

```

`Pick` や `Partial` を始め、多くの有用なMapped Typesはこの**基本形**ではなく、あとに述べる**修飾子型を含む形**に該当します。

Mapped Typesの制約型 `K` は `string | number | symbol` の部分型である必要があります。 `K` を合併型とみなし、合併の要素型ごとにシグネチャが生成されます。

- 文字列リテラル型 (`"foo"`), 数値リテラル型 (`42`), シンボルリテラル型 (`typeof S`) に対してはProperty Signatureが生成されます。
- `string` と `number` に対してはIndex Signatureが生成されますが、 `symbol` に対しては何も生成されません。
- 何らかの合併を含む場合 (`string & { foo: any }`) やテンプレート文字列リテラル型 (`"get${string}"`) に対しては何も生成されません。

```plain text
const S = Symbol("S");

// { foo: number, 42: number, [S]: number }
type Test1 = Record<"foo" | 42 | typeof S, number>;

// { [x: string]: number, [x: number]: number }
type Test2 = Record<string | number | symbol, number>;

// { [x: string]: number }
type Test3 = Record<string | "foo", number>;

// {}
type Test4 = Record<never, number>;

// {}
type Test5 = Record<string & { foo: any }, number>;

// {}
type Test6 = Record<`${string}`, number>;

```

### `readonly`

`readonly` または `+readonly` をつけると、生成される型にも `readonly` が付与されます。

- `readonly` をつけると、生成される型から `readonly` が取り除かれます。これはMapped Typesの基本形では効果がありませんが、修飾子型を含む形のときに効果を発揮します。

```plain text
// { foo: number }
type Test1 = { [P in "foo"]: number }

// { readonly foo: number }
type Test2 = { readonly [P in "foo"]: number }
type Test3 = { +readonly [P in "foo"]: number }

// { foo: number }
type Test4 = { -readonly [P in "foo"]: number }

```

`?` または `+?` をつけると、生成される型にも `?` が付与されます。 `?` は `| undefined` も含意するため、この処理も同時に行われます。

- `?` をつけると、生成される型から `?` が取り除かれます。これはMapped Typesの基本形では効果がありませんが、修飾子型を含む形のときに効果を発揮します。

```plain text
// { foo: number }
type Test1 = { [P in "foo"]: number }

// { foo?: number | undefined }
type Test2 = { [P in "foo"]?: number }
type Test3 = { [P in "foo"]+?: number }

// { foo: number }
type Test4 = { [P in "foo"]-?: number }

```

Index Signatureは `?` を持たないので、Mapped Types側で `?` や `+?` を指定していても無視されます。 (`| undefined` は付与されるようです)

```plain text
// { foo?: number | undefined, [x: number]: number | undefined }
type Test1 = { [P in "foo" | number]?: number }

```

## 修飾子型を含む形

Mapped Typesは次の2つの条件のうちいずれかを満たすとき、**修飾子型 (Modifiers Type)** という概念が定義されます。

1つ目の条件は、**制約型が **`**keyof ...**`** の形である**ことです。つまり、 `{ [P in keyof M]: T }` です。このとき `M` が修飾子型になります。 (`M` が型変数である必要はありません)

```plain text
type R = { readonly foo: number; bar?: string };

// 修飾子型を含む
// { readonly foo: boolean; bar?: boolean | undefined };
type Test1 = { [P in keyof R]: boolean };

// 修飾子型を含まない
// { foo: boolean; bar: boolean };
type Test2 = { [P in (keyof R)]: boolean };
type Test3 = { [P in (keyof R)[][0]]: boolean };

```

`Readonly`, `Partial`, `Required` などはこの形です。

```plain text
type Readonly<T> = { readonly [P in keyof T]: T[P]; };
type Partial<T> = { [P in keyof T]?: T[P]; };
type Required<T> = { [P in keyof T]-?: T[P]; };

```

この判定は構文的に行われているため、TypeScript 4.1時点では `keyof M` を括弧で囲むと条件1の該当から外れます。しかし、この挙動に強く依存したコードは書かないほうがよいでしょう。

2つ目の条件は、**制約型が型変数で、その型変数のベース制約が **`**keyof ...**`** の形である**ことです。このときも `keyof` の対象となっている型が修飾子型になります。 (`M` が型変数である必要はありません)

`Pick` はこの形です。

```plain text
type Pick<T, K extends keyof T> = { [P in K]: T[P]; }

```

### `readonly` の継承

修飾子型があるとき、デフォルトでは修飾子型にあった `readonly` が継承されます。すでに説明した `-readonly` でこの挙動を打ち消すことができます。

### `?` の継承

修飾子型があるとき、デフォルトでは修飾子型にあった `?` が継承されます。すでに説明した `-?` でこの挙動を打ち消すことができます。

また、 `-?` によって修飾子型にあった `?` が除去されたときは、 `| undefined` の除去も同時に試みられます。 (`--strictNullChecks` が有効の場合)

```plain text
// { foo: number | undefined, bar: number }
type Test1 = Required<{ foo: number | undefined, bar?: number | undefined }>;

```

### Property SignatureとIndex Signatureの共存

前述の「条件1」に該当する場合、キーの抽出方法が変わります。 `keyof M` を実際には計算せずに、 `M` のProperty SignatureとIndex Signatureを直接列挙します。これはProperty SignatureとIndex Signatureが共存している場合に有益です。

```plain text
type R = { foo: number, [key: string]: number | string };

// 修飾子型を含む
// { foo: boolean; [key: string]: boolean }
type Test1 = { [P in keyof R]: boolean };

// 修飾子型を含まない
// { [key: string]: boolean; [key: number]: boolean }
type Test2 = { [P in (keyof R)]: boolean };

```

また、「条件1」に該当する場合で、修飾子型が `any` に評価された場合は、 `Record<string, any>` と同様に解釈されます。

```plain text
// { [x: string]: any }
type Test = Required<any>;

```

制約型が `keyof M` の形で、かつ **修飾子型 **`**M**`** が型変数**のときは**Homomorphic Mapped Types**と呼ばれ、さらに特別な動作をします。

`Readonly`, `Partial`, `Required` などはこの形です。

```plain text
type Readonly<T> = { readonly [P in keyof T]: T[P]; };
type Partial<T> = { [P in keyof T]?: T[P]; };
type Required<T> = { [P in keyof T]-?: T[P]; };

```

Homomorphic Mapped Typesでは、合併型は分配されます。

```plain text
// Readonly<{ type: "Passwod", email: string }> | Readonly<{ type: "OAuth", provider: string }>
type Test1 = Readonly<{ type: "Passwod", email: string } | { type: "OAuth", provider: string }>;
// never
type Test2 = Readonly<never>;

```

Homomorphic Mapped Typesにプリミティブ型が入力されると、入力した型がそのまま返されます。

```plain text
// そのまま
type Test1 = Readonly<string | number | bigint | boolean | symbol | void | null | undefined>;
// そのまま
type Test2 = Readonly<true | 42 | 42n | "foo" | `bar${string}`>;

```

Homomorphic Mapped Typesに配列型を入れると配列型としてマップされ、タプル型を入れるとタプル型としてマップされます。

```plain text
// (number | undefined)[]
type Test1 = Partial<number[]>;

// [(number | undefined)?, (string | undefined)?]
type Test2 = Partial<[number, string]>;

// [(number | undefined)?, (string | undefined)?, ...(number | undefined)[]]
type Test3 = Partial<[number, string, ...number[]]>;

```

オブジェクトリテラル型では個別のプロパティに `readonly` がつくのに対し、配列型とタプル型では型全体に `readonly` がつきます。Mapped Typesに `readonly`/`+readonly` がある場合は配列/タプルに `readonly` が付与され、 `-readonly` がある場合は除去されます。

```plain text
// readonly number[]
type Test1 = Readonly<number[]>;

```

`?` のマッピングは、オブジェクトリテラル型の場合と相似に振る舞うような形で実装されています。配列型の要素はindex signature, タプル型の要素はproperty signatureと似たような扱いです。

```plain text
// [number | undefined, number]
type Test1 = Required<[number | undefined, (number | undefined)?]>;

```