---
Created: 2021-12-04T19:05:00
URL: https://oita.oika.me/2021/12/01/timeleap-typescript
Tags: [topic/技術/TypeScript]
---
![[Attachments/無題のフォルダ/og-image-1500 4.png]]

[タイムリープTypeScript 〜TypeScript始めたてのあの頃に知っておきたかったこと〜](https://qiita.com/advent-calendar/2021/timeleap-typescript) アドベントカレンダー1日目の記事になります。
 よろしくお願いします。

## 3行で

TypeScript で安全に型を扱う勘所は以下2点だと思いました。

- **最初から最後まで型が壊れていないことを保証する**
- **型が壊れる可能性があるものは壊れている前提で扱う**

## 個人的背景と前提

もともと C# での開発をメインとしていました。

Web開発は、JavaScript歴 ≒ TypeScript歴くらいの型付依存者です。

そのため、型付けのゆるい言語に対する耐性がなく、本内容もそういうポジションからの見解になります。

本記事内のサンプルコードは TypeScript V4.4 で挙動を確認しています。
 最近のバージョンで変更のあった点は脚注を入れています。

## 最初から最後まで型を壊さない

C# という静的型付け言語のあとに TypeScript を触って、最初に戸惑ったのは、TypeScript の型は簡単に嘘を付けるということです。
 number と書いてあっても、実体が本当に number である保証がない。
 しかし、いちいち型を疑いながらコーディングしなければならないなら、型付けの意味がありません。

型を信頼してコーディングするためには、型が壊れる可能性のあるコードを書かないことがポイントになります。

### コンパイルオプションは厳格に

js プロジェクトに ts を導入するにあたっては、暗黙の any を許容するか（ `noImplicitAny` ）みたいなことがしばしば議論になります。

個人的には議論の余地なく、型チェックは厳格であればあるほど良いと思います。

「最初は緩くしておいて、慣れてきたら厳しくしていけばよい」といった意見も一理あるかと以前は思っていましたが、今は、慣れてないときこそ型チェックが厳格に効くようにしておかないと、うやむやに書いたコードで後々自分の首を絞めることになると考えています。

具体的には、コンパイルオプションに `"strict": true` を指定します。
 これにより、以下すべてのオプションが有効になります[*1](https://oita.oika.me/2021/12/01/timeleap-typescript)。

- alwaysStrict : すべてのソースファイルの先頭に `"use strict"` を付与する
- noImplicitAny : 暗黙的な any の禁止
- noImplicitThis : 暗黙的に any となる `this` の禁止
- strictBindCallApply : `bind` , `call` , `apply` の呼び出しの型チェックを厳格にする
- strictFunctionTypes : 関数代入時の型チェックを厳格にする
- strictNullChecks : `null` や `undefined` になる可能性がある変数のメンバへのアクセスを禁止
- strictPropertyInitialization : クラス変数がコンストラクタまでに初期化されることを強制する
- useUnknownInCatchVariables : `try - catch` で catch されるエラーを any でなく unknown として扱う

上記を有効にしていても、型チェックが邪魔になるケースでは、個別に `as` や `!` （非nullアサーション演算子）、または `@ts-ignore` によって型チェックを通すことができます。
 ただしそれも、次項のとおり、極力使用しないことをお勧めします。

### 思い込みで as を使わない

たとえば、ある変数の型が `string | undefined` だが、コードの文脈上、ここでは undefined にならないはず、といったケースがあります。
 このとき、ここで undefined にならないことはわかっているんだから、と、 `as` や `!` でコンパイルエラーを避けることをしてしまうと、型が壊れる可能性を埋め込むことになります。

```plain text
// let str: string | undefined;

// コンパイルエラー
console.log(str.length);

// コンパイルエラーにならないが安全でない
console.log((str as string).length);
console.log(str!.length);

```

「ここでは undefined にならないはず」は、アサーションとして表現できます。

以下のような汎用的なアサーションメソッドを定義しておくと、値が null や undefined でないことを確認した上で、タイプガードによってコンパイルエラーを避けることができます。

```plain text
const hasValue = <T>(val: T | null | undefined, nameOfVal?: string): val is T  => {
    if (val == null) {
        // ログ出力など
        console.error(`${nameOfVal ?? "value"} is null or undefined`);
        return false;
    }
    return true;
}

// let str: string | undefined;

if (hasValue(str)) {
    // エラーにならない
    console.log(str.length);
}

```

### tsc が十分に賢くないときも、できるだけ as や any を避ける

undefined でないことはわかってんだよ！と叫びたくなるケースも確かにあります。

たとえば、配列から undefined でないものだけを抽出した配列は、undefined が含まれていないことが明らかですが、コンパイラにはそれがわからんのです。
 その場合も、できるだけ型変換ではなくタイプガードでコンパイラに教える工夫をします。

```plain text
interface Person {
    name: string;
    age: number;
}

// let undefOrPersons: Array<Person | undefined>;

// 型が Array<Person | undefined> のまま
const persons = undefOrPersons.filter(p => p != null);

// 型は Array<Person> になるが安全でない
const persons1 = undefOrPersons.filter(p => p != null) as Person[];
const persons2 = undefOrPersons.filter((p): p is Person => p != null);

```

この場合も汎用的なメソッドを作っておくと、個々に型を強制変換することによる型破壊を防ぐことができます。

```plain text
const notNull = <T>(array: Array<T|null|undefined>): T[] => {
    return array.filter((t): t is T => t != null);
}

```

### 型安全の観点からも let より const

イミュータブルにするという観点で、現代の ECMAScript では、基本的に `let` より `const` を使うことが推奨されていますが、これは型安全とも無関係ではありません。

`const` の変数に対してタイプガードされた型は、その後もずっと型が変わらないことが保証されるからです。

```plain text
//   let maybeString1: string | undefined;
// const maybeString2: string | undefined;

if (maybeString1 != null) {
    setTimeout(() => {
        // string のままであることが保証されないのでコンパイルエラー
        console.log(maybeString1.length);
    }, 1000);
}

if (maybeString2 != null) {
    setTimeout(() => {
        // エラーにならない
        console.log(maybeString2.length);
    }, 1000);
}

```

このことは、DOMのイベントハンドラーから変数を参照する際にも重要になります。

### プロパティをnullableにする目的でオプショナルにしない

`?` 修飾子により、オブジェクトのプロパティを省略可能とすることができます。
 この場合、プロパティの型は自動的に `undefined` との共用型となります[*2](https://oita.oika.me/2021/12/01/timeleap-typescript)。

プロパティを省略した場合と、明示的に `undefined` を指定した場合のオブジェクトは基本的に同値ですが、 `for - in` ループや `Object.keys()` で列挙した場合の挙動は異なります。

```plain text
interface Person {
    name: string;
    age: number;
    address?: string;
}

const person1:Person = { name:"yamada", age:20 };
const person2:Person = { name:"yamada", age:20, address: undefined };

console.log(person1.address);   // undefined
console.log(person2.address);   // undefined

console.log(Object.keys(person1));  // [ 'name', 'age' ]
console.log(Object.keys(person2));  // [ 'name', 'age', 'address' ]

```

`address: string | undefined` と定義するよりも書くのが楽という程度の理由で `address?: string` とオプショナルにしている例を見かけますが、両者はイコールではありません。
 通常、記述量の削減メリット以上に、プロパティの指定が漏れるデメリットのほうが大きいため、undefined を受け入れるのが目的なら、オプショナルにするのではなく `| undefined` と定義することをおすすめします。

特に React Component の props などでは、undefinedの指定を省略したほうがDOMの見た目がスッキリするので好む人もいるかと思いますが、利用時に指定が漏れるデメリットと天秤にかけた上で判断すべきと思います。

逆に、多数のプロパティから一部のみを指定することが妥当なケース（関数の細かい挙動を引数の option オブジェクトとして指定するなど）では、 `?` 修飾子を有効に利用することができます。

### インデックス・シグネチャを使わない

TypeScript では、以下のように型で Index Signature を定義することができます。

```plain text
type Foo = {
    // 任意の string を添え字として number を格納
    [ key: string ]: number
};

const foo: Foo = {};
foo["bar"] = 123;
foo["baz"] = "abc";  // コンパイルエラー

```

object を連想配列的に使うことに慣れている js コーダにとっては必要な機能なのかもしれませんが、型安全の観点からすると、このようなインデックスシグネチャは避けたほうがいいです。

特に string を添え字にとるインデックスシグネチャの場合、js では以下のような `.` アクセスが可能となり、実質、オブジェクトのメンバに対するコンパイルチェックが効かなくなります。

```plain text
type Foo = {
    year: number,
    [ key: string ]: number
};

const foo: Foo = { year: 2021 };

// どんなメンバ名でもエラーにならない
console.log(foo.yearrr);

```

また、上記のように存在しない添え字でアクセスされる可能性を考えると、上記の `foo["bar"]` で取得される値の戻り値は `number | undefined` であってほしい（ `Array.prototype.find()` ではそうなる）ですが、実際には number 型となり、null 安全でなくなります[*3](https://oita.oika.me/2021/12/01/timeleap-typescript)。

任意の key に対する値を保持したい場合、object ではなく、Map を使うことができます。

```plain text
const foo = new Map<string, number>();

foo.set("hoge", 123);
console.log(foo.get("hoge"));

```

key とする値が決まっている場合、Mapped Types として、添え字にとる値をリテラル型で定義できます。

```plain text
const DAY_OF_WEEKS = ["SUN","MON","TUE","WED","THU","FRI","SAT"] as const;
type DayOfWeek = typeof DAY_OF_WEEKS[number];
type Schedule = {
    title: string,
    at: string
}

type WeekSchedule = { [key in DayOfWeek]?: Schedule };

const s: WeekSchedule = {};

// OK
s["SUN"] = { title:"休み", at:"終日" };

// エラー
s["ABC"] = { title:"", at:"" }

```

### enumを使わない

TypeScript には、素の js にはない enum型が用意されていますが、積極的に使う理由はあまりありません。

特に数値のenumについては、以下のとおり型安全でありません。

```plain text
enum NumEnum {
    One = 1,
    Two = 2,
    Three = 3
}

const n: NumEnum = 4;   // エラーにならない

console.log(n === 4);   // しかしこれはエラーになる

```

文字列であれ数値であれ、通常 enum を使いたくなるケースのほとんどはリテラルの共用型に置き換えできます。

```plain text
const NUMS = [ 1, 2, 3 ] as const;
type NumEnum = typeof NUMS[number];

const n: NumEnum = 4;   // コンパイルエラー

```

## 型が保証できないときは壊れている前提で扱う

ここまでの話は、扱う値を最初から最後まで自分で管理することを前提としていますが、コードで扱う値は必ずしもそういうものばかりではありません。
 つまり、APIやJSONファイル、ローカルストレージなど、外部リソースから取得する値は、その値のフォーマットを自コード内で保証することができません。

そういう値を型付けされた状態で扱うには、型付けをするタイミングで、その型に嘘がないことを確認することが重要となります。

### JSONをparseした値はPartial型で受け取る

簡単な習慣として、JSONファイルなどから js の object に parse する際、いきなり期待する型にキャストする前に、Partial型にしておくという方法があります。

そうすれば、最低限、期待するメンバがオブジェクトに含まれていることの確認を強制することができます。

```plain text
interface Person {
    name: string;
    age: number;
}

// const personJson: string;

const user = JSON.parse(personJson) as Partial<Person>;

// エラー
console.log(user.age > 20);

// OK
if (user.age != null) {
    console.log(user.age > 20);
}

```

ただしこの方法では、 `user.age` が number ではなくstring だった、というようなケースをチェックすることはできません。

### 型チェックライブラリを利用する

[io-ts](https://github.com/gcanti/io-ts) を使うと、定義された型に代入可能であることを確認した上で、安全に型変換することが可能です。
 外部APIのレスポンスなど、管理外の値を parse する際には重宝します。

```plain text
import { isRight } from "fp-ts/lib/Either";
import * as t from "io-ts";

const PersonType = t.type({
    name: t.string,
    age: t.number
});

const mayBePerson1 = { name:"sato", age:20, address:"xxx" };
const mayBePerson2 = { name:"yamada" };

const isValid1 = isRight(PersonType.decode(mayBePerson1));  // true
const isValid2 = isRight(PersonType.decode(mayBePerson2));  // false

// Personへの型変換
const validation = PersonType.decode(mayBePerson1);
if (isRight(validation)) {
    const person = validation.right;

    console.log(person.age > 20);
}

// Person の型定義 ({ name:string, age:number }) も生成できる
type Person = t.TypeOf<typeof PersonType>;

```

### 型の自動生成ライブラリを利用する

連携先の API も自身の管理下にある場合、[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) などを利用して、API の実装コードから動的に型定義を生成してしまうという方法もあります。

この場合、APIのバージョン不一致のようなケースを除けば、型定義のとおりに値が入ってくることが実質保証されているとみなすことはできるでしょう。

### null と undefined を区別しない

「型を壊さない」という話と矛盾するように思えるかもしれませんが、 `null` と `undefined` とは、ソース全体で「区別しない！」と割り切ってしまうほうが幸せになれると、個人的には思います。

本来の意味でいうと、 `null` は該当する値がないことを示すものであるのに対し、 `undefined` は名前のとおり未定義であることを意味します。
 が、両者を区別して扱うことは人類には早すぎたように思います。

特に OpenAPI Generator などの型定義を生成してくれるツールの中にも null と undefined を厳密に定義していないものがあり、コード内で両者を区別して扱うことは通常メリットよりデメリットのほうが大きいでしょう。

null チェックは常に `hoge == null` という形で行い、null と undefined をまとめて検出できるようにするのが実用的かと思います。

## 以上

ひとむかし前の TypeScript は、もっともっと危険な罠を含んだツールだったように思いますが、着実に、より安全になる方向へと進化を続けているように見えます。
 「あの頃に知っておきたかった」といいつつ、「あの頃」にはできなかったことも多くできるようになりました。
 先人たちや開発者に敬意を表しつつ、快適な TypeScript ライフを送りましょう。

やりたいこと：[DbUnit](https://www.dbunit.org/) のテストデータで、DATETIMEなどのカラムに、「1時間前」「1日前の12:00」みたいな、現在日時からの相対時刻を入れたい。

たとえば直近3日間の履歴を取得して返すAPIのテストであれば、3日前あたりの境界値レコードがテストデータとして入っていてほしい。

## 前提

- DbUnit : v2.7.0
- DB は MySQL で検証
- テストデータは XML

## 方法1：RelativeDateTimeParser を使う

RelativeDateTimeParser [https://javadoc.io/doc/org.dbunit/dbunit/latest/index.html](https://javadoc.io/doc/org.dbunit/dbunit/latest/index.html) の記法を使って定義する。バージョン 2.7 以降。
 基本的にはこれで十分。

```plain text
<history id="1" record_time="[now]" />       <!--現在日時-->
<history id="2" record_time="[now-2h]" />    <!--2時間前-->
<history id="3" record_time="[now-1d 23:59:00]" />  <!--昨日の23時59分-->

```

## 方法2：ReplacementDataSet で置換する

もうちょっと自分で好きなようにやりたいときは、DataSetLoaderの挙動を上書きする。
 AbstractDataSetLoader を継承したクラスで、createDataSet 内で以下のように。

明示的にNULLを入れたい場合なども同じ方法でできる。

```plain text
public class MyDataSetLoader extends AbstractDataSetLoader {
    @Override
    protected IDataSet createDataSet(Resource resource) throws Exception {
        FlatXmlDataSetBuilder builder = new FlatXmlDataSetBuilder();

        try (InputStream inputStream = resource.getInputStream()) {
            return createReplacementDataSet(builder.build(inputStream));
        }
    }

    private ReplacementDataSet createReplacementDataSet(FlatXmlDataSet dataSet) {
        ReplacementDataSet replacementDataSet = new ReplacementDataSet(dataSet);

        DateTimeFormatter dtFmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        replacementDataSet.addReplacementObject("[NOW]", now.format(dtFmt));
        replacementDataSet.addReplacementObject("[2_HOUR_BEFORE]", now.minusHours(2).format(dtFmt));

        return replacementDataSet;
    }
}

```

もうちょっと真面目にやるなら正規表現など使って頑張る感じでしょう。
 これをテストクラスに対して `@DbUnitConfiguration(dataSetLoader = MyDataSetLoader.class)` で指定する。

テストデータはこんな感じで。

```plain text
<history id="1" record_time="[NOW]" />
<history id="2" record_time="[2_HOUR_BEFORE]" />

```

ただこの方法だと、 `record_time="[1_DAY_BEFORE] 23:59:00"` みたいに値の一部分だけを文字列で置換するようなことはできないっぽかった（軽く試した感じ）。
 そういうことがしたければ、 `[1_DAY_BEFORE 23:59:00]` のように値全体を置換対象にして、自前で parser 書いてやる必要があるでしょう。やりたくないですね。

## 別解

そもそもあちこちからシステムの現在時刻に依存しているようなコードはテスタブルでないので、一般的には、どこかのレイヤで外部から現在時刻を注入する口を作るような設計を考えたほうが良い。

APIであればリクエストで基準日を指定できるようにするとか。

以上。

引き続き [React Query](https://react-query.tanstack.com/) のターン。

useQuery か、なるほどいいねこれということで導入しようと思っても、手元のコードは全然 class component ですよっていう場合に、どうやって導入していく方法があるかという整理。

おおよそそのまま、クラスコンポーネントでhooks使うにはどうするかっていう話になります。

## 検証コード

例として、以下のようなシンプルなコードを考える。

- 外部リソースとしてユーザ一覧を管理している
- 画面からユーザの追加を行う
- 画面でユーザ一覧を表示する

![[20211003190352.png]]

検証用コードとして、今は以下のようなダミーのストアを作っておきます。
 本来はこの `addUser` , `fetchUserList` から APIへのリクエストを投げているイメージ。
 （以下、サンプルコードは TypeScript です）

```plain text
export type User = { name: string };

// 本来はAPIからもらってくるデータ
let userList: User[] = [
  { name: "Yamada" },
  { name: "Sato" },
  { name: "Suzuki" }
];

/**
 * ユーザ追加APIへリクエストを送信する
 */
export const addUser = async (name: string) => {
  userList = [...userList, { name }];
  return Promise.resolve();
};

/**
 * ユーザ一覧取得APIからユーザリストを取得する
 */
export const fetchUserList = async () => {
  // 2秒くらいかかるとする
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 便宜的にメモリから取得
  return Promise.resolve(userList);
};

```

参考までに、ユーザ追加用の入力コンポーネントの実装イメージ。
 こっちはまあ関数コンポーネントってことにしておく。

```plain text
export const UserInput = () => {
  const client = useQueryClient();
  const [name, setName] = useState("");

  const onAdd = async () => {
    await addUser(name);
    setName("");

    // 今回は React Query の mutation は使わず、clientインスタンスからinvalidateQueries
    client.invalidateQueries("user-list");
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onAdd}>add</button>
    </div>
  );
};

```

ここからが本題で、このユーザ一覧を表示する画面がクラスコンポーネントになってたとして、useQueryするにはどうするかという話ですね。

## 方法1：関数コンポーネントへの移行

関数コンポーネントで書きなおすハードルが高くないなら、書きなおしてしまうのが正攻法。

全体を書き直すのが厳しい場合は、queryを利用する部分だけをうまく子コンポーネントとして切り出すことを考える。

```plain text
export　const UserListFC = () => {
  const { data, isError, isLoading } = useQuery("user-list", fetchUserList);

  if (isLoading) return <div>Loading...</div>;
  if (isError || data == null) return <div>ERR!</div>;
  return (
    <ul>
      {data.map((user, i) => (
        //※ほんとは index を key にしないほうがいい
        <li key={i}>{user.name}</li>
      ))}
    </ul>
  );
};

```

## 方法2：高階コンポーネント

HOC（Higher-Order Components）というやつ。
 既存のクラスコンポーネントを丸ごとラップして、propsで取得データを受け渡す関数コンポーネントを設ける。

```plain text
class UserList extends React.Component<{ userList: User[] }, {}> {
  render() {
    return (
      <ul>
        {this.props.userList.map((user, i) => (
          <li key={i}>{user.name}</li>
        ))}
      </ul>
    );
  }
}

/**
 * 高階コンポーネント
 */
export const UserListHoc = () => {
  const { data, isLoading, isError } = useQuery("user-list", fetchUserList);

  if (isLoading) return <div>Loading...</div>;
  if (isError || data == null) return <div>ERR!</div>;

  return <UserList userList={data} />;
};

```

## Render Props

HOCと似た方法で、Render Props というのがある。
 こちらはpropsとしてレンダリング関数を受け取るコンポーネントを作るという実装パターンで、クラスコンポーネントのrenderの中に useQuery を使う関数コンポーネントを挟み込むような形にすることができる。

```plain text
interface Props {
  children: (result: UseQueryResult<User[]>) => ReactElement;
}

/**
 * render props 関数コンポーネント
 */
const WithUserList = (props: Props) => {
  return props.children(useQuery("user-list", fetchUserList));
};

export class UserListRenderProps extends React.Component<{},{}> {
  render() {
    return (
      <WithUserList>
        {({ data, isError, isLoading }) => {
          if (isLoading) return <div>Loading...</div>;
          if (isError || data == null) return <div>ERR!</div>;

          return (
            <ul>
              {data.map((user, i) => (
                <li key={i}>{user.name}</li>
              ))}
            </ul>
          );
        }}
      </WithUserList>
    );
  }
}

```

## 方法3：queryClientを直接操作する

queryClient のインスタンスに対して、 `fetchQuery` を直接呼ぶこともできる。

何回も同じAPIでデータ取得しているような箇所をいい感じにキャッシュさせるだけの目的であれば、これが一番既存コードへの影響が少ない導入方法かもしれない。

難点は、invalidate によって refetch されるデータを画面に即時反映にするには、自分で再度 `fetchQuery` しなければならないこと。

```plain text
// useClientなしで参照できるようにexportしておく
export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <UserInput />
        <UserListDirectClient />
      </div>
    </QueryClientProvider>
  );
}

```

```plain text
interface State {
  fetchStatus: "loading" | "error" | "done";
  userList: User[];
}
interface Props {}

export class UserListDirectClient extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fetchStatus: "loading",
      userList: []
    };
  }

  async componentDidMount() {
    try {
      //※componentDidMountでしか取得していないので、ユーザの追加は即時反映されない
      const list = await queryClient.fetchQuery("user-list", fetchUserList);
      this.setState({
        userList: list,
        fetchStatus: "done"
      });
    } catch {
      this.setState({ fetchStatus: "error" });
    }
  }

  render() {
    if (this.state.fetchStatus === "loading") {
      return <div>Loading...</div>;
    }
    if (this.state.fetchStatus === "error") {
      return <div>ERR!</div>;
    }

    return (
      <ul>
        {this.state.userList.map((user, i) => (
          <li key={i}>{user.name}</li>
        ))}
      </ul>
    );
  }
}

```

## 以上

ソース全体はこちら。