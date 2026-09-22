---
Created: 2022-06-09T21:57:00
URL: https://zenn.dev/aki202/articles/5d725c080640f9
Tags: [topic/技術/TypeScript]
---
# 0. はじめに

現代のWebアプリケーションの開発言語として、TypeScriptはファーストチョイスの一つです。特殊なケースを除き、フロントエンドの開発言語にはTypeScriptが選ばれるため、言語を統一するメリットを優先し、バックエンドにもTypeScriptが採用されるケースはよく見られます。

またReactがClass Componentを捨てFunction Componentを採用した事件が象徴するように、現代のプログラミングパラダイムのトレンドとして関数型プログラミングがあります。そもそもJavaScriptの出自は、関数型言語をブラウザに搭載できると聞いてNetscape社にやってきたブレンダンアイク氏が、上司にオブジェクト指向言語の権化であるJavaのような言語にしろと言われ生み出したというものです[[1]](https://zenn.dev/aki202/articles/5d725c080640f9#fn-2f3c-1)。そのためか、JavaScriptは未だ関数型言語としては未成熟で、**関数型プログラミングの中でも特に重要なパターンマッチングを持っていません**[[2]](https://zenn.dev/aki202/articles/5d725c080640f9#fn-2f3c-2)。

しかし最近のTypeScriptの型推論の進化には目覚ましいものがあり、ユーザーランドでパターンマッチングを実装した[ts-pattern](https://github.com/gvergnaud/ts-pattern)というライブラリが存在します。この記事では[ts-pattern](https://github.com/gvergnaud/ts-pattern)の基本から応用的な使い方までを概説し、**パターンマッチングによりコードベースをより型安全に保つ技法について紹介します**。

※サンプルコードは全て `ts-pattern@4.0.2`, `typescript@4.4.2` で実行しています。

# 1. パターンマッチングがないと何故困るか

パターンマッチングは関数型プログラミングの技法の一つで、文ではなく式を用いることで、より宣言的かつ型安全な分岐処理を記述できます。

ts-pattern の最も簡単なサンプルを見てみましょう。

ts-patternを使った分岐処理 (1)

```plain text
import { match } from "ts-pattern";

type Animal = "Cat" | "Dog";

const say = (animal: Animal): string => {
  return match(animal)
    .with("Cat", () => "Meow")
    .with("Dog", () => "Bow")
    .exhaustive(); // 全てのパターンが網羅されているかチェックする
};

say("Cat"); // "Meow"
say("Penguin"); // Type Error: '"Penguin"' is not assignable to parameter of type 'Animal'.

```

これを switch文 を使って書き直すと下記のようになります。

```plain text
type Animal = "Cat" | "Dog";

const say = (animal: Animal): string => {
  switch(animal) {
    case "Cat":
      return "Meow";
    case "Dog":
      return "Bow";
    default:
      throw new Error(`Invalid animal: ${animal}.`);
  }
};

say("Cat"); // "Meow"
say("Penguin"); // Type Error: '"Penguin"' is not assignable to parameter of type 'Animal'.

```

上の２つのサンプルは、いずれも `say("Penguin")` が型エラーになります。`say()` 関数の引数 である `Animal` 型が `Penguin` を持っていないからです。ここまでは問題ありません。

問題になるのは、`Animal` 型に `Penguin` など新たな型を加えたにも関わらず、分岐処理を書いていない場合です。switch文のサンプルを見てみましょう。

```plain text
type Animal = "Cat" | "Dog" | "Penguin"; // "Penguin" を加えた

const say = (animal: Animal): string => {
  switch(animal) {
    case "Cat":
      return "Meow";
    case "Dog":
      return "Bow";
    // case "Penguin": が抜けている
    default:
      throw new Error(`Invalid animal: ${animal}.`);
  }
};

say("Cat"); // "Meow"
say("Penguin"); // !!! 型エラーは出ず、実行すると "Invalid animal: Penguin" エラーになる

```

**switch文のサンプルでは、"Penguin"に対応する分岐処理がないことを型エラーとして検知できません。** ランタイムで初めてエラーが発覚するため、開発者が事前に気付ける仕組みがないのです。

このように既存のUnion型に何らかの型を加えるケースは頻出であるにも関わらず、通常のswitch文の書き方では、分岐処理の漏れを防ぐ方法がありません[[3]](https://zenn.dev/aki202/articles/5d725c080640f9#fn-2f3c-3)。if-else文も同様です。

一方、ts-patternでは次のようになります。

ts-patternを使った分岐処理 (2)

```plain text
import { match } from "ts-pattern";

type Animal = "Cat" | "Dog" | "Penguin"; // "Penguin" を加えた

const say = (animal: Animal): string => {
  return match(animal)
    .with("Cat", () => "Meow")
    .with("Dog", () => "Bow")
    // .with("Penguin", () => ...) が抜けている
    .exhaustive(); // Type Error: NonExhaustiveError<"Penguin"> 🎉
};

say("Cat"); // "Meow"
say("Penguin");

```

`.exhaustive()` というメソッドをコールしておくことで、`Penguin` に対応するパターンがないという型エラーが出ました。一見地味なようですが、コードベースが大きくなるほど、安全にUnion型を変更できるというメリットは経験則として大きいです。型エラーが出ない場合は、コードベース全体にgrepを掛けて手作業で探す羽目になるからです。**静的解析で防げることは何でも防ぐべきです。**

なおサンプルコードの通り、`.with()`メソッドの第一引数にはパターンを渡し、第二引数にはそのパターンがマッチしたときに実行する関数を渡します。以後、第一引数を条件式、第二引数をハンドラ関数と呼びます。

# 2. 応用

基本的な使い方は前章で述べたので、ここではより実践的な応用例について紹介します。

## 2-1. 組み合わせを網羅する

```plain text
import { match } from "ts-pattern";

type User = "student" | "general";
type Sale = "summer" | "winter";
type Input = [User, Sale];

const price = (input: Input): number => {
  return match(input)
    .with(["student", "summer"], () => 1000)
    .with(["student", "winter"], () => 900)
    .with(["general", "summer"], () => 1500)
    .exhaustive(); // Type Error: "general" + "winter" の組がないので型エラー
}

```

条件式に配列を渡すことで、組み合わせを網羅することができます。配列ではなくObjectでも、似た書き方で組み合わせを網羅する分岐処理が可能です。

## 2-2. プリミティブ型で分岐する

```plain text
import { match, P } from "ts-pattern";

interface User {
  age: number | string;
}

const test = (user: User): string => {
  return match(user)
    .with({ age: P.number }, (narrowedUser) => {
      // typeof narrowedUser.age === "number"
      return `age is number: ${narrowedUser.age}`;
    })
    .with({ age: P.string }, (narrowedUser) => {
      // typeof narrowedUser.age === "string"
      return `age is string: "${narrowedUser.age}"`;
    })
    .exhaustive();
};

test({ age: 32 }); // age is number: 32
test({ age: "32" }); // age is number: "32"

```

条件式に含まれる `P.number`, `P.string` は、プリミティブ型を表現しています。if文などを使う場合、`typeof` 構文で分岐処理を書いていましたが、より洗練された方法で記述できます。ほか `P.boolean`, `P.symbol`, `P.nullish` のようなプリミティブ型が用意されています。

またハンドラ関数には、型が絞り込まれた状態で引数(サンプルでは`narrowedUser`)が渡される点も便利です。

## 2-3. クラスで分岐する

プリミティブ型ではなくクラスでも分岐可能です。

```plain text
import { match, P } from "ts-pattern";

class Admin {}
class User {}

type Post = { author: Admin | User };

const test = (post: Post): string => {
  return match(post)
    .with({ author: P.instanceOf(Admin) }, () => 'author is "Admin"')
    .with({ author: P.instanceOf(User) }, () => 'author is "User"')
    .exhaustive();
};

test({ author: new Admin() }); // author is "Admin"
test({ author: new User() }); // author is "User"

```

## 2-4. データ構造から値をキャプチャする

```plain text
import { match, P } from "ts-pattern";

interface Input {
  type: "A";
  user: {
    name: string;
  };
}

const pickName = (input: Input): string => {
  return match(input)
    .with({ type: "A", user: { name: P.select() } }, (name) => name)
    .exhaustive();
};

pickName({ type: "A", user: { name: "Yuki" } }); // Yuki

```

条件に用いるデータから値を取得したいケースがあります。その場合、`P.select()` を使うことで、ハンドラ関数の引数に値が渡されます。サンプルコードのようにネストされた構造をもつObjectでは特に便利です。

複数の値を取得したい場合、`P.select("name")` のように名前を付けることで、ハンドラ関数にはObjectとして値が渡されます。

```plain text
import { match, P } from "ts-pattern";

interface Input {
  type: "A";
  user: {
    name: string;
    age: number;
  };
}

const pickName = (input: Input): string => {
  return match(input)
    .with({
      type: "A",
      user: { name: P.select("name"), age: P.select("age") }
    }, ({ name, age }) => `I'm ${name} (${age})`)
    .exhaustive();
};

pickName({ type: "A", user: { name: "Yuki", age: 32 } }); // I'm Yuki (32)

```

# 3. おわりに

[ts-pattern](https://github.com/gvergnaud/ts-pattern) のAPIのうち、利用頻度が多いものだけを紹介しましたが、他にも便利なAPIが多数用意されています。

[静的型付けと動的型付けの趨勢は潮の満ち引きのように繰り返すという意見](https://gihyo.jp/news/report/01/rubykaigi2016/0001)もありますが、ソフトウェア開発が複雑化し続けている現代では、静的型付けのトレンドはまだまだ維持されるように思います。

TypeScriptは型パズルとも言われる通り、初学者殺しの型定義も散見されますが、ライブラリのような形でコードベースから型パズルを排除した上でメリットだけを教授できる方法は、積極的に採用していきたいところです。

[@aki202](https://twitter.com/aki202)：良ければフォローしてください。

![[e19867bfc4.jpeg]]

### Discussion

![[discussion 5.png]]