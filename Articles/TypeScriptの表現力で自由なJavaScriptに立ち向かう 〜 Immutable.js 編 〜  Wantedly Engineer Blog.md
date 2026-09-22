---
Created: 2021-02-02T00:47:00
URL: https://www.wantedly.com/companies/wantedly/post_articles/306005
Tags: [topic/技術/TypeScript]
---
WantedlyのDX (Developer Experience) Squadでエンジニアをしている原 将己 (qnighy) です。

Immutable.jsというライブラリを使っているJavaScriptコードをTypeScript化するにあたって、既存の型定義では不十分だった箇所を独自に修正しました。このときしたことがTypeScriptの知見として面白いと思ったので紹介します。

## Immutable.js とは

[**Immutable.js**](https://immutable-js.github.io/immutable-js/) はFacebookが開発している永続データ構造 (純粋関数型データ構造、不変データ構造) のJavaScript実装です。配列 (List), Map, Set などが実装されていますが、データ構造に対する変更操作は全て「新しい状態を返す関数」の形で提供されています。

```plain text
import { List } from "immutable";

const userIds = List([1, 3, 5]);
console.log(userIds.push(10).toJS()); // => [1, 3, 5, 10]

// 更新前の状態が残されている
console.log(userIds.toJS()); // => [1, 3, 5]
```

なお、このような**プログラミングパターン**を実現することが目的なら、必ずしもImmutable.jsを使う必要はありません。Immutable.jsがなくても、配列やオブジェクトを非破壊的に操作することは可能です。

```plain text
const userIds = [1, 3, 5];
console.log(userIds.concat([10])); // => [1, 3, 5, 10]

// 更新前の状態が残されている
console.log(userIds); // => [1, 3, 5]
```

しかし、JavaScriptが元々もっている機能だけでは簡潔に書けない場合があったり、間違えてオブジェクトを破壊してしまうリスクもあります。そのために、本稿で扱うImmutable.jsのほか、 **immer** などの不変性ヘルパーが使われることがあります。immerはImmutable.jsとは異なり、JavaScriptが提供する通常のデータ構造をfreezeしたり、proxyでラップしたりして提供しています。そのため理屈の上では「大きなコレクションを繰り返し変更するような場面」で不利になる可能性がありますが、おそらく実用上は問題ないでしょう。

WantedlyでImmutable.jsが導入されたのも、不変性ヘルパーとしての役割を期待してのことだったと考えられます。

## Immutable.jsの現在

不変性ヘルパーとしては[immer](https://immerjs.github.io/immer/)のほうが活発にメンテナンスされています。

2021年1月現在、immutable.jsの最新安定板 (3.8.2) は2017年10月、最新RC版 (4.0.0-rc.12) は2018年10月、masterの最新コミットは2020年1月となっていて、雲行きが怪しい状態です。同じくFacebookが開発するdraftjsというライブラリはimmutable.jsに依存していて、これ自体は活発に開発されているので、immutable.jsがすぐに放棄されることはなさそうですが、何はともあれ少々動きづらい状態になっています。

Wantedlyでは2018年に社内で「第三世代」にあたるフロントエンド環境を整備したときにimmerが導入されました。以来第二世代ではimmutable.js, 第三世代ではimmerが使われています。第二世代/第三世代についてはこちらの記事でより詳しく説明しています。

[https://www.wantedly.com/companies/wantedly/post_articles/299554](https://www.wantedly.com/companies/wantedly/post_articles/299554)

## TypeScript化の課題

その「第二世代フロントエンド」はJavaScriptで書かれていたため、他のTypeScriptで書かれた部分に比べてメンテナンスがしにくい状態でした。そこで現在DXチームで、「第二世代フロントエンド」のTypeScript化を進めています。

残念ながらこの「第二世代フロントエンド」にはテストもほとんどないため、まずはリファクタリングをできるだけ最小限に留め、プロダクションで動くコードはそのままにテストの追加やTypeScript化をするような形で進めています。

その中で問題になってきたのが「**immutable.jsの型定義があまり有用ではない**」というものです。

## 問題1: オプショナル引数にまつわる間違い

immutable.jsには、[TypeScript Handbookにも書かれている典型的な間違い](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#optional-parameters-in-callbacks)がありました。

TypeScriptにはオプショナル引数のための記法があります。

```plain text
declare function parse(s: string, options?: Options = {});
```

これは、2番目の引数を渡すかどうかの**選択権が呼び出し元にある**ことを意味します。

このオプショナル引数がコールバック関数中に出現するとどうなるでしょうか。

```plain text
declare function registerCallback(
  callback: (event: string, payload?: Payload) => void),
);
```

この場合、「コールバック関数の呼び出し元」に選択権がありますが、それは言い換えると **registerCallback**** 側に選択権がある**ことになります。これは多くの場合、 registerCallbackの実態と乖離しています。実際には、 **registerCallback の呼び出し元 = コールバック関数の定義側に選択権がある**場合がほとんどでしょう。そのような場合は単に必須の引数として定義するのが正しいです。

```plain text
declare function registerCallback(
  callback: (event: string, payload: Payload) => void),
);
```

TypeScriptでは引数が増えるほうへの変換は安全なものとして暗黙的に許されているので、上のように定義しておけば1引数のコールバックを渡すことも簡単にできます。

Immutable.js 3系に同梱されている型定義は至るところにこの間違いがあり、たとえば

```plain text
const newList = oldList.map((value) => ...);
```

のように書いたたけで勝手に value が T | undefined 型になってしまうという問題がありました。

これはImmutable.js 4系で直っているようなのですが、今回はランタイムの振舞いにはできるだけ触れないように作業したいので、とりあえず関連する全ての定義を直した d.ts を作ってmodule augmentation + declaration merging でモンキーパッチを当てて対応しました。

## 問題2: 抽象的すぎる戻り値型

Immutable.jsのコレクションに対する map などの処理は、極力オリジナルのコレクションと同じ種類のコレクションが使われます。

```plain text
import { List } from "immutable";

const list1 = List([1, 2, 3]);
const list2 = list1.map((x) => x.toString()); // List(['1', '2', '3'])
```

一方、 Immutable.js の型定義はコレクションの共通の性質に名前をつけて抽象化する試みがなされています。要点を取り出すと以下のような定義になっています。

```plain text
interface List<T> extends Iterable<number, T> {
  // ...
}

interface Iterable<K, V> {
  map<M>(
    mapper: (value: V, key: K, iter: Iterable<K, V>) => M,
    context?: any
  ): Iterable<K, M>;

  // ...
}
```

ListはIterableの一種なので、「Iterableを返す」という表明をしても間違いではありません。しかし、ListのmapがListを返すことに依存する処理は普通に考えられるのに、Iterableであることしか表明されないのは実態に即していないといえます。

これについても、同様の問題を抱えたメソッドを全て洗い出し、 List 側にシグネチャのオーバーライドを入れることで対応しました。

## 問題3: レコード型に単一の型しか入らない

Immutable.jsにはMapを拡張したRecordというコレクションがあります。ざっくり言うと、あらかじめ特定のキーに対してデフォルト値とゲッターが定義されたMapです。

```plain text
import { Record } from "immutable";

const User = Record({ id: null, name: "No Name" });
const user1 = new User({ id: 1 });
console.log(user1.id); // => 1
console.log(user1.name); // => "No Name"

console.log(user1.set("name", "John Doe").name); // => "John Doe"
```

MapやSetなどの汎用コレクションと異なり、まずクラスを生成して、そのクラスのインスタンスとしてコレクションを生成するという手順を踏みます。

ところが、Immutable.jsに同梱の型定義では Record のインスタンスは Map のサブタイプということになっていて、上のようにキーごとに異なる型がつくケースが考慮されていません。これでは本来の意図通りに型をつけることができず、型の恩恵をほとんど得られなくなってしまいます。

これは Record の型をdeclaration mergingで補正するというような小さい変更では対応不可能だと考えたため、Immutable.js の Record と同じ値に全く別の型をつけ直してエクスポートするという方法をとることにしました。

```plain text
// SmartRecord.ts
import { Record as ImmRecord } from "immutable";

type NewRecordType = /* ... */;

export const Record = ImmRecord as NewRecordType;
```

そして、実際のWantedly内での利用実態にあわせて、必要な機能を足していきました。このとき行った工夫を1つずつ紹介していきます。

## Recordの基本構成

既に例示したように、Immutable.jsのレコードは2段構えで構成します。つまり、レコードクラスの生成とレコードインスタンスの生成です。

実はどちらの呼び出しも new はあってもなくてもいいのですが、Wantedlyではレコードクラスを通常の関数呼び出しで生成し、レコードインスタンスをnewで生成しているので、それにあわせて定義を書きました。

```plain text
// レコードインスタンスの機能
interface Record { /* ... */ }
// レコードクラスの機能 (基本的にnewだけ)
interface RecordClass {
  new (/* ... */): Record
}
// レコードクラスを生成する関数
export const Record = ImmRecord as (/* ... */) => RecordClass;
```

## Record<R>

レコードの型を表現するには、任意個のフィールド名に対して型を対応づける必要があります。型引数は決まった個数しか取れないので、うまく情報を詰め込む必要があるわけですが、その一番素直な方法としてオブジェクトリテラル型を使うことにしました。たとえば番号と名前をもつレコードは Record<{ id: number, name: string }> と表記する規約にします。

たとえば get という処理 (所定のキーに対応する値を取り出す) は以下のように書けます。

```plain text
interface Record<R> {
  get<K extends keyof R>(key: K, notSetValue?: R[K]): R[K];
  // ...
}
```

## Setのための型

同様に、 set という処理 (指定したキーに指定した値をセットした新しいレコードを返す) は以下のように書けるように思えます。

```plain text
interface Record<R> {
  set<K extends keyof R>(key: K, value: R[K]): Record<R>;
}
```

ところがこれには落とし穴があります。以下のようにキーが定数ではなく、複数の選択肢がある場合を考えます。

```plain text
declare const user1: Record<{ id: number, name: string }>;
const user2 = user1.set(Math.random() < 0.5 ? "id" : "name", "John Doe");
```

このとき、 R[K] は全ての候補型の合併、つまりこの例では string | number になってしまいます。ここではidに代入してもnameに代入しても問題ない型、つまり string & number として計算されるべきです。

この問題はそれほど頻繁には起きないと思うので放置してもよさそうですが、比較的簡単に対応できそうだったので対応しました。

以下のようなヘルパー型を導入します。

```plain text
type Assignable<R, K extends keyof R> =
  { [K0 in K]-?: (value: R[K0]) => void }[K]
  extends (value: infer T) => void
  ? T
  : never;
```

Assignable<R, K> の第一段階では、「setterを集めてきたオブジェクトリテラル型」を作ります。たとえば { id: number, name: string } は

```plain text
{ id: (value: number) => void, name: (value: string) => void }
```

に変換されます。

なお、Mapped Typeは[特定の条件を満たしたときに ? を継承します](https://zenn.dev/qnighy/articles/dde3d980b5e386)が、ここではこの挙動が起きてほしくないので、 -? で明示的に ? を除去しています。

第二段階で、これのIndex Access Type ( R[K] のような型) を計算します。これにより上の型は

```plain text
(value: number) => void | (value: string) => void
```

になり、「setter typeとして採択されうるものの集合」が計算されます。

最後にこれをConditional Typesにかけて、単一のsetterとして推論し直します。これにより number & string が計算され、今回の例では never になります。推論された部分を取り出して返せば完了です。

### 型を変えるset

setは新しいオブジェクトを返すので、そのタイミングで型を新しくすることもできるはずです。つまり大まかに、以下のようなsetメソッドを考えることもできそうです。

```plain text
interface Record<R> {
  set<K extends keyof any, V>(key: K, value: V):
    Record<Omit<R, K> & globalThis.Record<K, V>>;
}
```

しかし、これにはいくつかの課題があります。

まず、前節でも書いたように型引数 K は単一の文字列リテラル型とは限りません。その場合 key は候補となるキーのうちのいずれかであることしかわからないので、 Omit で一律にキーを除去してしまうのは間違いです。 K がシングルトンかどうかによって条件分岐をし、シングルトンでなかったらより保守的な型に切り替える必要があります。

また次の節で扱うように、 Record に継承やアクセサの能力を付与しようとすると、戻り値を this から派生させる必要が出てきて型がより複雑化してしまいます。

型推論の観点からも、必要以上に緩い型をつけると (仮にそれが意味的に正しくても) かえって不便になる可能性があります。今回はこのように「型を変えるset」はあまり必要ではなさそうなので、実装を見送りました。

## 継承とアクセサ

Record() で生成した関数はクラスのように振る舞うので、継承してメソッドを足すことができます。また、Recordは最初に指定したデフォルト値に基づいてアクセサを足すので、それに対応させる必要があります。

interfaceを含め、オブジェクトリテラル型にはproperty signature, method signature, index signature, call/construct signatureの4種類のシグネチャしか書けません。つまり、オブジェクトリテラル型自体に動的にフィールドを注入することはできないので、あらかじめ作っておいた interface に & でアクセサを追加するような形で定義します。

```plain text
interface RecordBase<R> {
  get<K extends keyof R>(key: K, notSetValue?: R[K]): R[K];
  set<K extends keyof R>(key: K, value: Assignable<R, K>): Record<R>;
}

type Record<R> = RecordBase<R> & Readonly<R>;
```

さらに継承時の振舞いを正しくするための修正をします。Immutable.jsのRecordが継承されていた場合、 set が返すレコードは元のレコードのプロトタイプチェーンを保ちます。

```plain text
import { Record } from "immutable";
class User extends Record({ id: null, name: "No Name" }) {
  greet() {
    console.log(`Hello, I'm ${this.name}!`);
  }
}
const user1 = new User();
user1.greet(); // => Hello, I'm No Name!

const user2 = new User().set({ name: "John Doe" });
user2.greet(); // => Hello, I'm John Doe!
```

ここまでの型定義では set の戻り値が Record<R> で固定されていたので、サブクラスの set を呼んでも Record<R> が返されてしまい、情報が失われてしまいます。

この振舞いを正すため、 this を返すようにします。

```plain text
interface RecordBase<R> {
  get<K extends keyof R>(key: K, notSetValue?: R[K]): R[K];
  set<K extends keyof R>(key: K, value: Assignable<R, K>): this;
}

type Record<R> = RecordBase<R> & Readonly<R>;
```

## getIn / setIn

ネストしたレコードやマップのsetを行うとコードが煩雑化するため、 setIn というヘルパーメソッドが用意されています。対応する getIn も存在します。

段々面倒になってきたので少し省力化して実装しました。まず、RecordやMapなど異なるコンテナ型のネストに対応する必要があるのですが、これらの条件を列挙するのではなく単に get メソッドの振舞いによって型を決定するようにしました。また可変長タプルや配列型など長さが不明なものが来たときは諦めて any にフォールバックしています。

```plain text
type DeepAttribute<Path extends readonly any[], R> = Path extends readonly []
  ? R
  : Path extends readonly [infer Head, ...infer Tail]
  ? R extends { get(key: Head): infer Next }
    ? DeepAttribute<Tail, Next>
    : any
  : any;
```

本来であれば setIn は getIn とは異なりキーに対して反変な振舞いを持たせる必要がありますが、とりあえず応急的に getIn 用のヘルパー型を流用して setIn も定義しています。

```plain text
interface RecordBase<R> {
  setIn<P extends readonly any[]>(keyPath: P, value: DeepAttribute<P, this>): this;
}
```

## mergeと自動変換

merge は set を繰り返し行うメソッドです。

```plain text
import { Record } from "immutable";
const User = Record({ id: null, name: "No Name" });

const user1 = new User({ id: 1, name: "John Doe" });
const user2 = user1.merge({ id: 2, name: "John Smith" });
console.log(user2.toJS()); // => { id: 2, name: "John Smith" }
```

ただし、 merge は setと違い、JavaScriptの配列やオブジェクトをImmutable.jsのListやMapに自動変換する機能があります。これに型をつけるために、Mapped TypesとConditional Typesを使って以下のようなヘルパー型を用意しました。

```plain text
interface RecrodBase<R> {
  merge(values: MergeParam<R>): this;
}

type MergeParam<R> = {
  [K in keyof R]?: ConvertibleTo<R[K]>;
};

type ConvertibleTo<T> = T extends List<infer U>
  ? T | readonly U[]
  : T extends Map<infer K, infer V>
  ? T | globalThis.Record<K & string, V>
  : T extends RecordMap<infer R>
  ? T | R
  : T;
```

## デフォルト値を使う場合と使わない場合

Immutable.jsのRecordは最初にデフォルト値を渡します。Wantedlyでは、このデフォルト値としてダミーの値を渡している場合がありました。

```plain text
const User = Record({
  // 使われない。実際に作られるレコードは全てid: numberで初期化される
  id: null,
  // このデフォルト値が使われることがある。
  name: "No Name",
  // このデフォルト値が使われることがある。
  notifications: List(),
});
```

デフォルト値がダミーの場合は id: number のようにデフォルト値を除外した型を割り当てたいところですが、型安全性を担保するためには初期化時に値の指定を強制する必要があります。このトレードオフを選択できるようにするため、 MK (mandatory keys) という型引数を追加で導入しました。 MK にキーを指定すると、初期化時にそのキーが必須になるかわりに、デフォルト値がレコードの型制約を満たさなくてもよくなります。

Recordの remove や clear を呼ぶと値がデフォルト値に戻るため、これらの型も MK に基づいて決定します。

```plain text
interface RecordBase<R, MK extends keyof R> {
  // 必須キーではないキーのみ、削除できる。
  remove(key: Exclude<keyof R, MK>): this;

  // 必須キーが存在しないときのみ、「全てのキーの削除操作」ができる。
  // 条件を満たさなくてもこの操作自体は成功するが、それ以上の保証ができないのでunknown型にする。
  // union distributionを抑制するために[]をつけている
  clear(): MK[] extends never[] ? this : unknown;
}
```

Recordの作成時の引数を MK に基づいて決定します。

```plain text
interface RecordClass<R, MK extends keyof R> {
  new (values: RecordInit<R, MK>): Record<R, MK>;
}

type RecordInit<R, MK extends keyof R> = Partial<R> & Pick<R, MK>;
```

特に MK が空のときは values がoptionalになりますが、この条件分岐を単一のinterfaceで行うのは困難です。そこで空初期化可能なinterfaceを別で用意して、より手前で分岐します。

```plain text
interface ClearableRecordClass<R, MK extends keyof R> extends RecordClass<R, MK> {
  new (): Record<R, MK>;
}
```

Record関数側で上の ClearableRecordClass への分岐に加えて、デフォルト値のコントロールを行います。

```plain text
export const Record = ImmRecord as <R, MK extends keyof R = never>(
  defaultValues: RecordDefault<R, MK>,
  name?: string
// MKがneverだったら空引数での初期化が可能なのでClearableRecordClassを返す
// union distributionを抑制するために[]をつけている
) => MK[] extends never[] ? ClearableRecordClass<R, MK> : RecordClass<R, MK>;

// MKに含まれるキーをunknownに置き換える
export type RecordDefault<R, MK extends keyof R> = {
  [K in keyof R]: K extends MK ? unknown : R[K];
};
```

## new this().merge() への対応

Wantedly内ではRecord型のコンストラクタを以下のように使う例がよく見られます。

```plain text
class User extends Record({ ... }) {
  public static fromJS(js: ...): User {
    new this().merge(js);
  }
}
```

Recordの merge には自動変換の機能があるため、残念ながら単純に new this(js) に置き換えることはできません。将来的にはリファクタリングを施したいところですが、まずはランタイムの振舞いを変えずに型をつけるため、なんとか型アノテーションの範囲で対応することにしました。

問題はデフォルト値との兼ね合いにあります。もし当該レコード型がダミーのデフォルト値を持つ場合、 new this() は完全なレコードではないため、型チェックを通すわけにはいきません。 (本来必要なフィールドを見落すリスクがある)

しかし、 new this().merge(js) という処理によって結果として完全なレコードができているのであれば、それは一応問題ないということになります。そのため、 new this() が当該レコード型ではなく、かわりに中間状態であることがわかる特別な型になれば問題は解消できそうです。

しかし、 User を class 構文で定義している以上、 new this() の型は User 以外になりえません。

そこで仕方なく「コンストラクタをその場でキャストして使う」という方針で実装しました。専用の TweakConstructor という型を用意して、以下のように使います。

```plain text
class User extends Record({ ... }) {
  public static fromJS(js: ...): User {
    new (this as unknown as TweakConstructor<User>)().merge(js);
  }
}
```

TweakConstructor は上の形の構文に対してのみ型がつくように調整しておきます。 new this() や new this().get(...) は禁止しつつ、 new this().merge(...) の形だけは許すようにしました。

これは as を使っているので型定義側で完全解決できたとは言えません。ただ、Recordの型安全性において最も重要なのは入口から出口までのプロパティー型の対応が取れていることなので、上のように定型文的な書き方であれば許容範囲だと判断しました。

## ソースコード

ここまで説明した「Record型の対応」の完全なソースコードです。

```plain text
import { Collection, List, Map, Record as ImmRecord } from "immutable";

// TS標準のRecordと同じ
type TSRecord<K extends keyof any, T> = {
  [P in K]: T;
};

///////////////////////////////////////////////////////////////////////////////
// RecordMap
///////////////////////////////////////////////////////////////////////////////

/**
 * `R[K]` と似ているが、代入側を想定した計算をする。
 *
 * @param R インデックスアクセス対象のレコード
 * @param K インデックスを絞り込む型
 * @returns R型の値にK型の値でインデックスしたときに代入可能な最大の型
 *
 * @example
 *   ```typescript
 *   inteface I {
 *     foo: number | string;
 *     bar: boolean | string;
 *   }
 *   type Test1 = Assignable<I, "foo" | "bar">; // => string
 *   type Test2 = Assignable<I, "foo">; // => number | string
 *   type Test3 = Assignable<I, never>; // => unknown
 *   ```
 */
type Assignable<R, K extends keyof R> = { [K0 in K]-?: (value: R[K0]) => void }[K] extends (value: infer T) => void
  ? T
  : never;

/**
 * キーごとに異なる種類の値を入れるための `Map` の型。
 * @param R キーと型の対応付けの入ったオブジェクトリテラル型。
 *
 * @example
 *   `RecordMap<{ id: number, name: string }>`
 */
export interface RecordMap<R> extends Map<keyof R, R[keyof R]> {
  get<K extends keyof R>(key: K): R[K];
  set<K extends keyof R>(key: K, value: Assignable<R, K> & R[K]): RecordMap<R>;
}

///////////////////////////////////////////////////////////////////////////////
// Record
///////////////////////////////////////////////////////////////////////////////

/**
 * `Record<R, MK>` の機能部分 (アクセサ以外の部分) を表した型。
 *
 * @param R キーと型の対応付けの入ったオブジェクトリテラル型。
 * @param MK 必須キー。デフォルト値にリセットすると型を満たさなくなってしまうものの一覧。デフォルトはnever。
 */
export interface RecordBase<R, MK extends keyof R> extends Collection.Keyed<keyof R, R[keyof R]> {
  // has(key: string): key is keyof R & string;
  get<K extends keyof R>(key: K, notSetValue?: R[K]): R[K];
  set<K extends keyof R>(key: K, value: Assignable<R, K> & R[K]): this;
  merge(values: MergeParam<R>): this;
  delete(key: Exclude<keyof R, MK>): this;
  remove(key: Exclude<keyof R, MK>): this;
  clear(): MK[] extends never[] ? this : unknown;

  setIn<P extends readonly any[]>(keyPath: P, value: DeepAttribute<P, this>): this;
}
/**
 * Immutable.jsの `Record` により適切な型をつけたもの。
 *
 * @param R キーと型の対応付けの入ったオブジェクトリテラル型。
 * @param MK 必須キー。デフォルト値にリセットすると型を満たさなくなってしまうものの一覧。デフォルトはnever。
 */
export type Record<R, MK extends keyof R> = RecordBase<R, MK> & Readonly<R>;

/**
 * Immutable.jsの `Record()` が生成するクラス。
 * 特定の条件下ではサブクラスである `ClearableRecordClass` が生成される。
 *
 * @param R キーと型の対応付けの入ったオブジェクトリテラル型。
 * @param MK 必須キー。デフォルト値にリセットすると型を満たさなくなってしまうものの一覧。デフォルトはnever。
 */
export interface RecordClass<R, MK extends keyof R> {
  new (values: RecordInit<R, MK>): Record<R, MK>;
}

/**
 * Immutable.jsの `Record()` が生成するクラス。
 * 必須キーがないときは無引数でも安全に生成できるため、 ClearableRecordClassになる。
 *
 * @param R キーと型の対応付けの入ったオブジェクトリテラル型。
 * @param MK 必須キー。デフォルト値にリセットすると型を満たさなくなってしまうものの一覧。デフォルトはnever。
 */
export interface ClearableRecordClass<R, MK extends keyof R> extends RecordClass<R, MK> {
  new (): Record<R, MK>;
}

/**
 * `RecordClass` のコンストラクタ引数。必須キー以外はoptionalになったもの。
 *
 * @param R キーと型の対応付けの入ったオブジェクトリテラル型。
 * @param MK 必須キー。デフォルト値にリセットすると型を満たさなくなってしまうものの一覧。デフォルトはnever。
 */
export type RecordInit<R, MK extends keyof R> = Partial<R> & Pick<R, MK>;
/**
 * `RecordClass` 生成時に作られるデフォルト値。
 * デフォルト値を(nullなどに)指定しておきながら、それを一切使わないという使い方を許すため、MK (必須キー) という概念を導入している。
 * 通常はデフォルト値はレコードの型に従わないといけないが、必須キーに対応するデフォルト値はあとで必ず上書きされるという保証があるので、任意の値を入れることができる。
 *
 * @param R キーと型の対応付けの入ったオブジェクトリテラル型。
 * @param MK 必須キー。デフォルト値にリセットすると型を満たさなくなってしまうものの一覧。デフォルトはnever。
 */
export type RecordDefault<R, MK extends keyof R> = {
  [K in keyof R]: K extends MK ? unknown : R[K];
};

// eslint-disable-next-line no-redeclare
export const Record = (ImmRecord as unknown) as <R, MK extends keyof R = never>(
  defaultValues: RecordDefault<R, MK>,
  name?: string
) => MK[] extends never[] ? ClearableRecordClass<R, MK> : RecordClass<R, MK>;

///////////////////////////////////////////////////////////////////////////////
// Merge
///////////////////////////////////////////////////////////////////////////////

type MergeParam<R> = {
  [K in keyof R]?: ConvertibleTo<R[K]>;
};

type ConvertibleTo<T> = T extends List<infer U>
  ? T | readonly U[]
  : T extends Map<infer K, infer V>
  ? T | TSRecord<K & string, V>
  : T extends RecordMap<infer R>
  ? T | R
  : T;

///////////////////////////////////////////////////////////////////////////////
// SetIn / GetIn
///////////////////////////////////////////////////////////////////////////////

type DeepAttribute<Path extends readonly any[], R> = Path extends readonly []
  ? R
  : Path extends readonly [infer Head, ...infer Tail]
  ? R extends { get(key: Head): infer Next }
    ? DeepAttribute<Tail, Next>
    : any
  : any;

///////////////////////////////////////////////////////////////////////////////
// Construct-then-merge
///////////////////////////////////////////////////////////////////////////////

// new this(...).merge(...) というパターンに綺麗に型をつけるのができなかったので、
// コンストラクタをキャストする形でできるだけ型安全性を保証するヘルパーを作った。
// 複雑なので、これがなくても動くように実装を置き換えるのが理想だけど、一旦全体を型安全にすることを優先してこれを導入する。

/**
 * new this().merge(...) パターンのための型。
 */
export interface ImmediatelyMergedRecordClass<R, MK extends keyof R, C extends Record<R, MK>>
  extends RecordClass<R, MK> {
  new (values?: Partial<R>): ImmediatelyMergedRecord<R, MK, never, C>;
  new <FMK extends MK>(values: RecordInit<R, FMK>): ImmediatelyMergedRecord<R, MK, FMK, C>;
}
// FMK: Filled Mandatory Keys
export interface ImmediatelyMergedRecord<R, MK extends keyof R, FMK extends MK, C extends Record<R, MK>>
  extends RecordClass<R, MK> {
  merge(values: InitMergeParam<RecordInit<R, Exclude<MK, FMK>>>): C;
}
type InitMergeParam<R> = {
  [K in keyof R]: ConvertibleTo<R[K]>;
};

// new (this as unknown as TweakConstructor<Klass>)().merge(...) のように使うことで引数の型安全性を保証できる。
export type TweakConstructor<C> = C extends Record<infer R, infer MK>
  ? ImmediatelyMergedRecordClass<R, MK, C>
  : unknown;

```

なお、WantedlyでのImmutable.jsの使い方に特化して実装されている部分も多々あるため、現時点では本型定義の上流への還元は検討していません。

## まとめ

TypeScriptとの相性のよくないライブラリや、相性のよくない書き方をしているコードになんとか型をつけて保護するために、型レベルでがんばる方法を色々紹介しました。TypeScript化されていないコードベースと戦う人の参考になればと思います。