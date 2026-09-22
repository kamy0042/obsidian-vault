---
Created: 2024-08-15T17:41:00
URL: https://susisu.hatenablog.com/entry/2024/08/14/233156
Updated: 2024-08-15T17:41:00
Tags: [topic/技術/ビルドツール]
---
![[1723645916.bin]]

ESLint v9 から [Flat](https://d.hatena.ne.jp/keyword/Flat) Config がデフォルトの設定ファイルの形式となり, 徐々に対応している[プラグイン](https://d.hatena.ne.jp/keyword/%A5%D7%A5%E9%A5%B0%A5%A4%A5%F3)も増えて移行が進みつつありますが, 実際に移行したプロジェクトを見ているとしばしば勘違いなどから誤った設定をしている事例を目にします. ということで, [Flat](https://d.hatena.ne.jp/keyword/Flat) Config を書くにあたっていくつか知っておいて欲しいことや, よく見かけるミスをまとめてみました.

この記事では網羅的な説明はしませんので, ESLint や typescript-eslint の公式ドキュメントを前提として, 副読本的に参照してください.

- [Getting Started with ESLint - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/getting-started)
- [Getting Started | typescript-eslint](https://typescript-eslint.io/getting-started/)

## [Flat](https://d.hatena.ne.jp/keyword/Flat) Config のしくみ

[Flat](https://d.hatena.ne.jp/keyword/Flat) Config は config object と呼ばれるオブジェクトの配列で記述されます.

```plain text
/* eslint.config.js */

export default [
  // ↓ これが config object
  {
    files: ["**/*.js"],
    rules: {
      "no-console": "error",
      "no-empty-function": "warn",
    },
  },
  // ↓ こっちも
  {
    files: ["**/*.test.js"],
    rules: {
      "no-empty-function": "off",
    },
  },
  // ...
];

```

各 config object は二つの部分からできています.

- 設定の対象を記述する部分 (`files`, `ignores`) 
    - 記述がなければ任意のファイルが対象となります
- 設定の内容を記述する部分 (`plugins`, `languageOptions`, `rules` など)

あるファイルを lint する際にどのような設定が適用されるかは, 以下のようにして決定されます.

1. そのファイルを対象に含めている config object を全て取り出す
2. それらの config object の内容を先頭から順番にマージする 
    - 同じ設定項目については後勝ちです. オブジェクトは良い感じにマージされます

## typescript-eslint の提供するユーティリティを使うのがおすすめ

ESLint や typescript-eslint, 各種[プラグイン](https://d.hatena.ne.jp/keyword/%A5%D7%A5%E9%A5%B0%A5%A4%A5%F3)などが提供する recommended のような共有設定を利用する場合, これまでの設定ファイルの形式では `extends` による設定の継承が行われてきました.

```plain text
module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        // 継承元 (1)
        "eslint:recommended",
        // 継承元 (2)
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "no-console": "error",
      },
    },
    // ...
  ],
};

```

ところが [Flat](https://d.hatena.ne.jp/keyword/Flat) Config では以前と異なり, config object が `extends` を使った継承をサポートしていません[*1](https://susisu.hatenablog.com/entry/2024/08/14/233156#f-f0ba9b94). かわりに以下のように対象 (`files` や `ignores`) を同じくする config object を順番に書き, 最終的にそれらがマージされた設定が使われることで, 継承と同等の効果を実現できます.

```plain text
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // 継承元 (1)
  {
    files: ["**/*.ts"],
    ...eslint.configs.recommended,
  },
  // 継承元 (2)
  ...tseslint.configs.recommended.map(config => ({
    files: ["**/*.ts"],
    ...config,
  })),
  {
    files: ["**/*.ts"],
    rules: {
      "no-console": "error",
    },
  },
  // ...
];

```

まあこれはあまりに煩わしいので, typescript-eslint が `tseslint.config()` というユーティリティを提供してくれています. このユーティリティには config object の列を渡すことができますが, これらの config object には追加で `extends` を渡すことができます. 結局は上記と同じ形に展開されますが, 冗長な記述が減るため非常に便利です.

```plain text
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      // 継承元 (1)
      eslint.configs.recommended,
      // 継承元 (2)
      ...tseslint.configs.recommended,
    ],
    rules: {
      "no-console": "off",
    },
  },
  // ...
);

```

詳しいことは[公式のドキュメント](https://typescript-eslint.io/packages/typescript-eslint#config)や[実装](https://github.com/typescript-eslint/typescript-eslint/blob/3d78392bc46f1f7186b43a247477183a120c016f/packages/typescript-eslint/src/config-helper.ts#L85-L107)を参照してください.

## ファイルの種類ごとに設定を記述するのがおすすめ

[typescript-eslint のドキュメント](https://typescript-eslint.io/getting-started/)を読むと, 最初に以下のような記述が案内されています.

```plain text
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);

```

これは TypeScript のファイルのみを lint するのであれば良いのですが, 同時に [JavaScript](https://d.hatena.ne.jp/keyword/JavaScript) で書かれた設定ファイルも lint するなど, 複数の種類のファイルを lint の対象にしたい場合は, この記述はあまりおすすめしません.

というのも, 実は上記の設定では全てのファイルが TypeScript として[構文解析](https://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%B2%F2%C0%CF)され, lint されることになります[*2](https://susisu.hatenablog.com/entry/2024/08/14/233156#f-f598517c). これには一長一短あり, [JavaScript](https://d.hatena.ne.jp/keyword/JavaScript) ファイルに対しても型を使ったルールが使えるようになる一方で, [JavaScript](https://d.hatena.ne.jp/keyword/JavaScript) としては不正な構文 (型注釈など) が含まれていても lint を通過してしまいます.

個人的には, まずは以下のようにファイルの種類ごとに設定を行うところから始めるのが, やや設定は複雑になるものの無難であろうと考えています.

```plain text
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // .js に対する設定
  {
    files: ["**/*.js"],
    extends: [eslint.configs.recommended],
  },
  // .ts に対する設定
  {
    files: ["**/*.ts"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  },
);

```

[JavaScript](https://d.hatena.ne.jp/keyword/JavaScript) ファイルに対しても型を使ったルールを使いたいといった場合は, 上記の事情を理解した上で設定をしましょう.

## 自分で config object をマージする際の注意

`tseslint.config()` を使わずに共有設定を使用する際のよくあるミスとして, 以下のような記述がされることがあります.

```plain text
import eslint from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    ...eslint.configs.recommended,
    rules: {
      "no-console": "error",
    },
  },
];

```

ところがこれでは `eslint.configs.recommended` に含まれる `rules` を, 直後に記述された `rules` で全て上書きしてしまう (この場合, `no-console` のみが有効となり, `eslint.configs.recommended` に含まれていたルールは全て無効になる) ため, 正しい記述ではありません.

正しくは以下のように別々の config object を記述して, ESLint に `rules` をマージしてもらうようにします.

```plain text
import eslint from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    ...eslint.configs.recommended,
  },
  {
    files: ["**/*.js"],
    rules: {
      "no-console": "error",
    },
  },
];

```

あるいは素直に `tseslint.config()` と `extends` を使いましょう.

```plain text
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.js"],
    extends: [eslint.configs.recommended],
    rules: {
      "no-console": "error",
    },
  },
);

```

## eslint-config-prettier は最後に書いておくのがおすすめ

ESLint と Prettier を併用する場合 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) を使うことがありますが, これはファイルの種類ごとの `extends` の中ではなく, [Flat](https://d.hatena.ne.jp/keyword/Flat) Config の配列の末尾に置いておくのが最もシンプルです.

```plain text
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    files: ["**/*.js"],
    extends: [eslint.configs.recommended],
  },
  {
    files: ["**/*.ts"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  },
  prettier,
);

```

とはいえ現在では Prettier と衝突するようなフォーマットに関するルールは ESLint や typescript-eslint からは除かれていっているため, eslint-config-prettier の必要性は少なくなってきているとは思います.

## その他のよくあるミス

- 拡張子が `.js` である全てのファイルを対象にする場合は `files: ["**/*.js"]` のように記述します 
    - 旧設定ファイルで同様の記述をする際 (`overrides` 内) は `files: ["*.js"]` と書きましたが, [Flat](https://d.hatena.ne.jp/keyword/Flat) Config ではこれはルート[ディレクト](https://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8)リにある拡張子が `.js` のファイルという意味になり, 対象となるファイルが限られてしまいます
- CommonJS ファイルに対して指定すべき `languageOptions.sourceType` は `"commonjs"` です 
    - 旧設定ファイルでは `"script"` でしたが, [Flat](https://d.hatena.ne.jp/keyword/Flat) Config ではこれは特にモジュールを規定しない[スクリプト](https://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)という意味になり, [`strict`](https://eslint.org/docs/latest/rules/strict) のようなルールが意図しない動作をすることがあります
- `@eslint/js` や `globals` といったパッケージを使用する場合は, 明示的にインストールして `devDependencies` に含めるようにしましょう 
    - これをしないと, 偶然そこにあっただけの意図しないバージョンのものを使用してしまう可能性があります
- [1](https://susisu.hatenablog.com/entry/2024/08/14/233156#fn-f0ba9b94):継承のような[入れ子](https://d.hatena.ne.jp/keyword/%C6%FE%A4%EC%BB%D2)構造を持たず, 一次元的な配列で記述されることから [Flat](https://d.hatena.ne.jp/keyword/Flat) Config と呼ばれています
- [2](https://susisu.hatenablog.com/entry/2024/08/14/233156#fn-f598517c):そんなの知るかよって感じですよね. 私もそう思います. こういった共有設定を使うのは簡単ではありますが, 何をしてくれるか (あるいは何をしてくれないか) についての説明が書かれることは typescript-eslint に限らず少なくて, 正しく理解するためには[ソースコード](https://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9)を読みに行く必要が生じることがほとんどです. このわかりづらさは課題です.

susisu [16時間前](https://susisu.hatenablog.com/entry/2024/08/14/233156)  [ 読者になる ](https://blog.hatena.ne.jp/susisu/susisu.hatenablog.com/subscribe?utm_campaign=subscribe_blog&utm_source=blogs_entry_footer&utm_medium=button)

関連記事

- [ 2024-05-12 ](https://susisu.hatenablog.com/archive/2024/05/12) [TypeScript 版 Mackerel API クライアントライブラリを作った](https://susisu.hatenablog.com/entry/2024/05/12/182739) 作りました. jsr.io リポジトリはこっち. github.com (2024-05-…
- [ 2024-02-13 ](https://susisu.hatenablog.com/archive/2024/02/13) [ESLint の設定をエディタ補完や型検査つきで書く](https://susisu.hatenablog.com/entry/2024/02/13/014740) ESLint の設定に関する TypeScript の型情報を提供してくれる e…
- [ 2023-12-03 ](https://susisu.hatenablog.com/archive/2023/12/03) [ビルド用の tsconfig を用意するよりもバンドラに任せた方が楽かもしれない](https://susisu.hatenablog.com/entry/2023/12/03/221719) TypeScript でライブラリ (npm パッケージ) を作るときに, ビル…
- [ 2023-09-17 ](https://susisu.hatenablog.com/archive/2023/09/17) [ESLint の共有設定を Flat Config に対応させる](https://susisu.hatenablog.com/entry/2023/09/17/000000) まえがき こんにちは, 人間 ESLint です. そんな人間 ESLint の…
- [ 2023-06-18 ](https://susisu.hatenablog.com/archive/2023/06/18) [TypeScript で Cake Pattern](https://susisu.hatenablog.com/entry/2023/06/18/191027) TypeScript で Cake Pattern っぽい DI (依存性注入) をするた…

## おさらい: prototype

[JavaScript](https://d.hatena.ne.jp/keyword/JavaScript) のオブジェクトはみんな prototype というのを持っていて, この prototype からプロパティを継承, より正確には, プロパティアクセス時にそのプロパティがオブジェクトに存在しなければ prototype を辿って見つけにいくことになっている.

あるオブジェクトを prototype とした別のオブジェクトを作るには [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) を使う (あるいは [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)[ 演算子](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)や [`__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#prototype_setter) を使っても良い).

```plain text
const x = {};
x.foo = "foo";

const y = Object.create(x);
y.bar = "bar";

const z = Object.create(y);
z.baz = "baz";

console.log(z.foo); // => "foo"
console.log(z.bar); // => "bar"
console.log(z.baz); // => "baz"

```

逆に, あるオブジェクトの prototype を取得するには [`Object.getPrototypeOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) を使う.

```plain text
console.log(Object.getPrototypeOf(z) === y); // => true

```

ところで `{}` のような「空」のオブジェクトにも prototype が存在して, これは `Object.prototype` と呼ばれる. この `Object.prototype` には `toString` のようなプロパティが定義されているので, 空のオブジェクトは真に空というわけではない.

```plain text
const x = {};
console.log(Object.getPrototypeOf(x) === Object.prototype); // => true
console.log(x.toString); // => [Function: toString]

```

では真に空のオブジェクトは作れないのかというとそんなことはなくて, prototype が `null` のオブジェクトを作れば良い. 例えば `Object.create(null)` などとする (ブログタイトル回収).

```plain text
const w = Object.create(null);
console.log(Object.getPrototypeOf(w)); // => null
console.log(w.toString); // => undefined

```

## Object.groupBy

[`Object.groupBy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy) は ES2024 で追加されたメソッドで, 配列などの iterable をグループ化して, それらのグループをプロパティに持ったオブジェクトを作成できる.

```plain text
const arr = [3, 1, 4, 1, 5, 9, 2]
const obj = Object.groupBy(arr, (e) => e % 2 === 0 ? "even" : "odd");
console.log(obj); // => { odd: [3, 1, 1, 5, 9], even: [4, 2] }

```

そして記事のタイトルの通り, `Object.groupBy` で作られるオブジェクトの prototype は `null` になっている.

```plain text
console.log(Object.getPrototypeOf(obj)); // => null

```

このメソッドを追加する proposal の README を読むと, これには prototype から継承したプロパティと `Object.groupBy` によって作られたプロパティが混ざって困ったことが起こらないように, という意図があるようだ.

> returns a null-prototype object, which allows ergonomic destructuring and prevents accidental collisions with global Object properties
> [https://github.com/tc39/proposal-array-grouping?tab=readme-ov-file#motivation](https://github.com/tc39/proposal-array-grouping?tab=readme-ov-file#motivation)

## TypeScript と null-prototype オブジェクト

ところで TypeScript には prototype が `null` のオブジェクトを表す型はない. 空のオブジェクト型 `{}` がそれに該当すると思われるかもしれないが, 実は全てのオブジェクト型で `toString` などの `Object.prototype` の持つプロパティは暗黙的に継承されていることになっていて, プロパティアクセスが行えてしまう.

つまり以下のようなコードは型検査を通過するが, 実行してみるとエラーが発生する.

```plain text
const obj = Object.groupBy([], () => "*");
obj.toString(); // => TypeError: w.toString is not a function

```

これまで prototype が `null` のオブジェクトが登場するような状況は (私の知る限り) かなり限られていたのであまり気にならなかったのだが, 今後は `Object.groupBy` の普及に伴ってしばしば登場するかもしれないので注意が必要そうである.

そもそもオブジェクトを辞書のように用いる ([index signature](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures) を使う) のは[いくらか型安全性に問題がある](https://susisu.hatenablog.com/entry/2021/11/13/222730)ため, 多くの場合で `Object.groupBy` よりも [`Map.groupBy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy) を使う方が適しているだろうということは覚えておきたい. また誤ったメソッドの呼び出しがもしあれば気がつけるように, ESLint の [no-prototype-builtins](https://eslint.org/docs/latest/rules/no-prototype-builtins) や [no-base-to-string](https://typescript-eslint.io/rules/no-base-to-string/) といったルールも有効化しておくと良い.