---
Created: 2022-06-11T20:58:00
URL: https://ics.media/entry/220610/
Tags: [topic/技術/JavaScript]
---
![[eyecatch.png]]

JavaScriptの仕様であるECMAScriptはEcma Internationalによって定められています。ECMAScript 2015（ES6）の登場以降は、ECMAScript 2016、ECMAScript 2017･･･と、年次で仕様が更新されています。最新のECMAScript 2022（ES2022）は今月6月22日のEcma Internationalの[GA 123rd meeting](https://www.ecma-international.org/about-ecma/meeting-calendar/)にて承認される見込みです。

ES2022はすでに多くのブラウザやNode.js環境で利用可能です。本記事では新仕様と使いどころを紹介します。

### Array, String, TypedArray の .at()

配列や文字列の番号でアクセスができるメソッドとして、`at()`が用意されました。

配列記号`[]`とインデックスを使うことで配列の要素にアクセスできますが、ES2022では`at()`メソッドを使うことでもアクセスできるようになります。

```plain text
const array = ["a", "b", "c"];

console.log(array[1]); // "b"

// ES2022
console.log(array.at(1)); // "b"

```

これだけだと利点は少なそうですが、`at()`メソッドには負の整数も指定できます。負の整数を指定すると配列の末尾から参照できます。従来だと配列の`length`を使って末尾を参照する必要がありましたが、`at()`メソッドだと直感的に記述できます。`-1`が配列の末尾を示します。

```plain text
const array = ["a", "b", "c", "d"];

// 従来の配列末尾からの参照
console.log(array[array.length - 1]); // "d"

// ES2022で可能になる書き方
console.log(array.at(-1)); // "d"

```

※`at()`メソッドに非数や小数を利用すると複雑な結果が得られます（記事『[【追記あり】ES2022 Array#at がちょっとおかしい \#fix_ecmascript_at - Qiita](https://qiita.com/printf_moriken/items/da03f55cb626617c1958)』）。整数以外は引数に渡さないように注意しましょう。

配列だけでなく、文字列でも`at()`メソッドを利用できます。

```plain text
const myString = "あいうえお";

// 先頭から参照
console.log(myString.at(1)); // "い"
console.log(myString[1]); // "い"

// 末尾から参照
console.log(myString[myString.length - 2]); // "え"
console.log(myString.at(-2)); // "え"

```

### Top-Level Await

`await`・`async`キーワードはES2017で登場しました。`await`・`async`キーワードは`Promise`での非同期処理が扱いやすくなったことで、現在の多くのフロントエンドエンジニアは利用していることでしょう。

従来の`await`は、`async`とした関数宣言・関数式でしか利用できませんでしたが、ES2022で`async`なしでもトップレベルで`await`が利用できるようになりました。

たとえば、従来のコードとしては次のように記述しました。ラッパーとしての関数（`start`）を用意しています。

```plain text
<script>
  // 従来のコード
  const start = async () => {
    // JSONデータを読み込む
    const data = await fetch("./example/data.json");
    const object = await data.json();
  }
  start();
</script>

```

ES2022ではラッパーとしての`async`関数を宣言せずに`await`を利用できています。

```plain text
<script type="module">
  // ES2022で可能になった書き方
  const data = await fetch("./example/data.json");
  const object = await data.json();
  console.log(object)
</script>

```

`async`の関数宣言・関数式を用意する手間がなくなるので、書き捨てのコードをサクッと試すのに役立つでしょう。

- ブラウザの開発者ツールのConsoleパネルでコードをサクッと試したいとき
- Node.jsでサクッとコードを試したいとき

注意点として、`async`なしで記述できるのはトップレベルであり、`async`無しの関数宣言・関数式のなかでは`await`は利用できません。機能名のとおり「Top-Level Await」であること認識しましょう。

NG例：

```plain text
// 🆖 失敗するコード
const start = () => { // async 宣言がないアロー関数式
  // JSONデータを読み込む
  const data = await fetch("./example/data.json"); // ❎️ シンタックスエラー
  const object = await data.json();
}
start();

```

また、Top-Level AwaitはES Moduleとしてしか利用できません。scriptタグで利用する場合は、`<script type="module">`とES Module方式で利用しなければなりません。CDNから`<script>`タグを貼り付ける･･･といった場面では利用できません。ES Moduleの使い方は記事『[ブラウザで覚えるES Modules入門](https://ics.media/entry/16511/)』を参照ください。Node.jsの場合は、拡張子を`.mjs`としてES Moduleであることを指定します。

このTop-Level Awaitは、本領として動的モジュール読み込みの`import()`と組み合わせると効果を発揮します。

```plain text
// 外部ファイルに宣言したモジュール
const {someModule} = await import("./someModule.mjs");

console.log(someModule);

```

次のように動的`import`には文字列を利用できるので、実行環境に応じて文言リストを読み込むといった使い方もできます。モジュール方式のJavaScriptでの利用がしやすくなります。

```plain text
// ブラウザの実行言語に応じて文言リストを取得するコード
const {wordingList} = await import(`./i18l/${navigaor.language}.js`);

console.log(wordingList);

```

TypeScript 3.8（2020年2月リリース）から利用できたので、すでに馴染みのある方が多いかもしれません。

### プライベートのインスタンスフィールド、メソッド

ECMAScript 2015でクラス構文が登場しました。しかし、他の言語から比べるとES2015の`class`は十分な機能を有しているとはいえない状況でした。ES2022では以下の機能を中心に仕様が追加されています。

- クラスインスタンスのプライベートのフィールド
- クラスインスタンスのプライベートのメソッド
- プライベートを示すアクセサー

プライベートフィールド（プライベート変数）には接頭辞に`#`（ハッシュ）を利用します。プライベートフィールドは外部からアクセスできず、もしアクセスしようとすると実行時エラーが発生します。オブジェクト指向プログラミングの観点としては、クラス内に外部からアクセスできない変数を設けることで、カプセル化を実現するのに役立ちます。

```plain text
class MyCounter {
  #count;

  constructor(count) {
    this.#count = count;
  }

  #calc() {
    return this.#count * 10;
  }

  say() {
    // プライベート変数にアクセスできるのはクラスの内部だけ
    console.log(this.#calc());
  }
}

const object = new MyCounter(3);
object.say(); // 30

console.log(object.#count); // ❎️ シンタックスエラー
console.log(object.#calc()); // ❎️ シンタックスエラー

```

従来では、プライベートフィールドを設けることができなかったので、接頭語に「`_`」（アンダースコア）を使い、命名規則でプライベートフィールドであることを示していたエンジニアも多いと思います。接頭語に「`_`」を使ったとしても言語的にはプライベートであることを強制できないので、アクセスしようと思えば自由にアクセスできました。ES2022の新しい接頭辞`#`を使うことで、自由にアクセスできないようになり、プライベートフィールドの安全性が高まります。

関連して、`in`を使って外部からアクセスしようとしても成功しません。これもES2022の仕様として定義されています。

```plain text
class MyCounter {
  #count;

  constructor(count) {
    this.#count = 0;
  }
  hasCount () {
    return #count in this;
  }
}

const object = new MyCounter();
console.log(object.hasCount()); // true
console.log("#count" in object); // false

```

参考文献

### TypeScriptのprivateと#の違い

TypeScriptではプライベートのアクセス修飾子として`private`が存在しました（ソフトプライベート）。TypeScript 3.8以降はES2022と同様の`#`を利用できます（ハードプライベート）。TypeScriptの設定ファイル`tsconfig.json`のターゲットによってコンパイル結果が異なりますが、おおよそ以下の出力となります。

- TypeScriptでは、`private`は`#`へ変換されません。
- `private`アクセス修飾子はターゲットにかかわらず互換コードへコンパイルされます（取り除かれた形になります）。
- `#`はES2015〜SES2021ターゲットだと、互換コードへコンパイルされます（ES5以下にはコンパイルできません）。
- `#`はES2022ターゲットだと、そのまま出力されます。

`private`と`#`のどちらを利用するかは開発チームで足並みを揃えたほうがいいでしょう。

### 静的クラスフィールド

クラスの`static`フィールドが使えるようになりました。クラス内部で`static`を宣言すると、インスタンス化せずともクラスに固有のフィールドとしてアクセスできます。

従来でも、クラスの外部で動的にフィールドを追加すると、静的フィールドのように扱う事ができました。ES2022ではクラス内部に`static`フィールドを宣言できるので、よりクラスらしい書き方ができるようになりました。

```plain text
// 従来の書き方
class MyOldClass {
  // ...
}

MyOldClass.message = "あ"; // 動的に追加することで静的変数を表現できた

// 新しい書き方
class MyClass {
  static message = "い";
  // ...
}

console.log(MyOldClass.message); // "あ"
console.log(MyClass.message); // "い"


```

クラスの静的メソッドも定義できます。次の例では`sayHello()`というメソッドを`static`フィールドに定義しています。

```plain text
// 新しい書き方
class MyClass {
  static message = "あ";
  static sayHello() {
    console.log(MyClass.message); // "あ"
  }
}

MyClass.sayHello();

```

`static`フィールドには`#`接頭辞が利用でき、静的なプライベートフィールドとして定義できます。

次のコードでは、クラスの部的なIDを生成する機能を静的なプライベートフィールドで用意しています。クラスの内部であるコンストラクターからは呼び出せますが、外部から呼び出せないため、意図しない呼び出しを防げます。

```plain text
class MyCounter {
  static #counter = 1;

  // 静的なプライベート関数
  static #getNextId() {
    return MyCounter.#counter++;
  }

  #id; // プライベート変数としてのID

  constructor() {
    // 内部的に管理したいIDには、静的変数を利用する
    this.#id = MyCounter.#getNextId();
  }

  getId () {
    return this.#id;
  }
}

// 利用例
const list = [new MyCounter(), new MyCounter()]
console.log(list[1].getId()); // 2

```

### クラスの静的イニシャライザーブロック

静的イニシャライザーブロックを使うと、クラスの評価中にコードを実行できます。`static`キーワードで宣言したブロックステートメント内にコードを記述します。このブロックステートメント内のコードは、クラスが評価されるときに1度だけ実行されます。「静的変数に値を格納したいが、クラス宣言のタイミングでないと初期値を入れられない」といった場面で利用できます。

```plain text
class MyClass {
  static #myProperty;

  // 静的イニシャライザーブロック
  static {
    // 外部からデータととってくるとか、環境変数から加工するとか、複雑な処理等
    // 以下はダミーの処理
    const json = JSON.parse(`{"someField": "hoge"}`);
    this.#myProperty = json.someField;
  }
  constructor() {
    console.log(MyClass.#myProperty);
  }
}

new MyClass(); // "hoge"

```

TypeScriptでは同等機能が[TypeScript 4.4](https://devblogs.microsoft.com/typescript/announcing-typescript-4-4-rc/#static-blocks)（2021年8月リリース）以降で利用できました。

### Object.hasOwn()メソッド

オブジェクトにプロパティーが存在するか確認するのが簡単になります。

従来では以下のメソッドを呼び出すことで、オブジェクト内にプロパティーが存在するか確認していました。

```plain text
const example = {
  property: "あいう",
};

console.log(Object.prototype.hasOwnProperty.call(example, "property"));
console.log(example.hasOwnProperty("property")); // この書き方は動作するが注意が必要

```

JavaScriptは`hasOwnProperty`プロパティ名が保護されていないので（書き換えることができるので）、安全のためには`Object.prototype.hasOwnProperty.call()`を使う必要がありました。しかし、`Object.prototype.hasOwnProperty.call()`と記載するのも長くて手間です。

ES2022では`Object.hasOwn()`メソッドで同じ事ができるようになりました。

```plain text
const example = {
  property: "あいう",
};

console.log(Object.hasOwn(example, "property")); // true

```

参考文献

### Error.cause

`Error`オブジェクトに`cause`というフィールドが追加されました。これは、エラーの発生源を格納できるようになります。`Error`のコンストラクターの第2引数に`cause`フィールドを含むオブジェクトを指定することで利用できます。

```plain text
throw new Error("失敗", { cause: error }); // error は元となるエラーオブジェクト

```

### 従来の課題

従来だと`cause`プロパティーがなかったため、`try catch`でラッパーを囲っていくと、元になるエラー起因を追跡するのが困難でした。

### 例

以下にネットワークエラーによる例を示します。`fetch`メソッドを使ってウェブサーバーからJSONファイルを受信するコードをサンプルとして用意しました。`fetch`でJSONファイルを読み込むときは以下の3点のエラーのケアが必要でしょう。

1. オフライン時のネットワークエラー
2. サーバーレスポンス404のエラー
3. JSONのパースエラー

ラッパーの関数で`try catch`構文にて囲った場合、原因の元となるエラーを深掘りするに`cause` フィールドが役立ちます。

```plain text
async function start() {
  try {
    await load();
  } catch (error) {
    console.log(error);
    // console.log(error.cause); // さらに奥の情報を追跡できる
  }
}

async function load() {
  try {
    const result = await loadJson();
    console.log(result);
  } catch (error) {
    throw new Error("読み込みに失敗！", { cause: error });
  }
}

async function loadJson() {
  let data;
  try {
    data = await fetch("example.json");
  } catch (error) {
    // ネットワークがオフラインの場合
    throw new Error("fetchに失敗しました。", { cause: error });
  }

  if (data.ok === false) {
    // 404 の場合等（この場合は、明示的なエラーなのでcause未指定）
    throw new Error("ファイルの読み込みに失敗しました。");
  }

  let json;
  try {
    json = await data.json();
    return json;
  } catch (error) {
    // JSONのパースに失敗
    throw new Error("JSONデータの展開に失敗しました。", { cause: error });
  }
}

```

▼ネットワークがオフライン状態であり、fetch()メソッドでエラーが起きる場合

▼該当ファイルがウェブサーバーに存在せず、ステータス404で読み込めない場合

▼ファイルを受信したが、JSONのパースに失敗する場合

2022年6月現在は、Firefoxだとコンソールパネルでエラーの`cause`を自動的に展開してくれます。ChromeやSafariでは一階層目しかエラーがでてこないで、自前で`cause`プロパティーを追跡する必要があります。

参考文献

### RegExp Match Indices (`/d`フラグ)

正規表現にマッチインデックス機能（`/d`フラグ）が追加されます。このオプションを指定すると、ひっかかった部分文字列の先頭と末尾のインデックスについての追加情報が得られます。

```plain text
const text = "今日の夕食代：500円";
const regexp = /今日の夕食代：(?<digit>\d{3})円/dg;

for (const match of text.matchAll(regexp)) {
  console.log(match);
}

```

結果は次の通りです。

```plain text
[
  '今日の夕食代：500円',
  '500',
  index: 0,
  input: "今日の夕食代：500円",
  groups: { digit: '500' },
  indices: {
    [ 0, 11 ],
    [ 7, 10 ],
    groups: {
      digit: [7, 10]
    }
  }
]

```

注意点として、トランスパイルできず、`/d`フラグは古いブラウザでは動作しません。ポリフィル『[regexp-match-indices](https://github.com/rbuckton/regexp-match-indices)』が存在しますが、ES2022の書き方とは異なります。

参考文献

### 対応環境の状況

### ウェブブラウザの対応状況

本記事で紹介したES2022の仕様は、次のブラウザや実行環境で対応しています。2022年6月時点の現行ブラウザで対応しているものには「◯」を、対応開始バージョンを記載しています。

![[Archive/import/JavaScriptの次の仕様ES2022の新機能まとめ - ICS MEDIA/New database/New database.base]]

ES2022の各機能に対応していない古いブラウザバージョンに対応するには、トランスパイルをする必要があります。ただ、新しい記法が下位のECMAScriptにトランスパイルできなくなってきているのも事実です。たとえばクラスの`#`は、TypeScriptのコンパイルではES2015が最下位バージョンとなります。

IE11が今月2022年6月15日にサポート切れとなりますが、新しいECMAScriptの恩恵を受けつつ、対象ブラウザの下限をどこに設定するか、JavaScriptの出力ターゲットの再検討が必要な時期に来ていると思います。

TypeScript・Babelの環境構築については、次の記事で詳しく紹介しています。

### まとめ

今回紹介したES2022の新機能のうち、クラスの進化が興味深く感じました。Angularは別として、ReactやVueではクラスとは異なる方向性（関数コンポーネントや、Composition API）で利用されています。クラスが求められていた時代から遅れてES2022にクラス仕様が固まったのは、興味深い進化と言えそうです。プライベートフィールドが他の言語で見られない`#`であることに、多くの議論がありましたが、ES2022として着地できたことを嬉しく思います。

新仕様はこれまで面倒だった処理を簡潔にしてくれる一面もあります。実行環境が揃うまで待ってから採用するか、トランスパイルやポリフィルを利用して早めに導入するか、この機会に検討してみてはいかがでしょうか。