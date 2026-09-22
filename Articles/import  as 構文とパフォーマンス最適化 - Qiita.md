---
Created: 2022-05-29T14:01:00
URL: https://qiita.com/uhyo/items/842e51e0d8cc46856d04
Tags: [topic/技術/フロントエンド]
---
JavaScriptには、`import * as` という構文があります。これは、インポート先のモジュールの中身全部をオブジェクト（モジュール名前空間オブジェクト）として取得できる構文です。

```plain text
import * as mod from "./some-module";

console.log(mod.foo, mod.bar);

```

たまに、「この構文を使うとTree Shakingが効かなくなる」といった説明が見られることがありますが、必ずしもそうではありません。そこで、この記事では`import * as`構文とパフォーマンス最適化に関連する正しい知識と、その背景をご紹介します。

## webpackで検証してみよう

Tree shakingを行うのはモジュールバンドラであることが知られています。そこで、webpackを使って色々と構文を検証してみましょう。今回は次のような設定を用います。これは最適化を切って出力ファイルを見やすくしつつ、import/export周りの最適化だけは有効にするという設定です。なお、この記事では執筆時点での最新バージョンである5.72.1を使用しています。

webpack.config.js

```plain text
module.exports = {
  mode: "none",
  optimization: {
    providedExports: true,
    usedExports: true,
    mangleExports: "deterministic",
  },
};

```

## 最小構成で検証してみる

では、`import * as`構文に対してwebpackがどう振る舞うのか最小構成で検証してみましょう。

src/mod.js

```plain text
export const foo = "foo";
export const bar = "bar";

```

src/index.js

```plain text
import * as mod from "./mod";

console.log(mod.foo);

```

出力結果全体は長いので畳んでおきます。

### webpackの出力結果

`src/mod.js`に相当する出力は次のようになっています。

```plain text
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ foo)
/* harmony export */ });
/* unused harmony export bar */
const foo = "foo";
const bar = "bar";

```

ポイントとして、`foo`が外向きには`R`という名前でエクスポートされています。また、`bar`が使われていないことも検知されています。

`src/index.js`に相当する出力は次のようになっています。

```plain text
/* harmony import */ var _mod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


console.log(_mod__WEBPACK_IMPORTED_MODULE_0__/* .foo */ .R);

```

このように、`mod.foo`が `_mod__WEBPACK_IMPORTED_MODULE_0__/* .foo */ .R`と変換されています。`src/mod.js`側で`foo`が`R`にリネームされたことに対応して、それを使う側も`R`になっています。

このことから分かることは、`**import * as**`**構文を使ってもtree shakingが効くし、export名のmanglingも行われる**ということです。manglingというのは、（JavaScriptの文脈では）変数名などを短く書き直してコードサイズを減らすことを意味します。今回の場合`foo`が`R`になっています。

ちなみに、`import { foo } from "./mod"`のようにnamed importを行なった場合も`foo`を`R`にしてもらえます。`import * as`構文もnamed importと同等のサポートを受けられるということですね。

なお、`const foo`というように変数名がmanglingされていなかったり`const bar`が残っているのが気になるかもしれませんが、これは問題ありません。なぜなら、このあたりのmanglingや消去を担当するのはwebpackではなくminifier （terserなど）の役目だからです。

## 最適化が効かない場合

実のところ、`import * as`構文を使うと最適化が効かない場合というのも存在します。次の場合がそうです。

src/mod.js

```plain text
export const foo = "foo";
export const bar = "bar";

```

src/index.js

```plain text
import * as mod from "./mod";

console.log(mod);

```

### webpackの出力結果

上の入力に対しては、webpackは次のような結果を出力します。

src/mod.jsに相当する部分

```plain text
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bar": () => (/* binding */ bar),
/* harmony export */   "foo": () => (/* binding */ foo)
/* harmony export */ });
const foo = "foo";
const bar = "bar";

```

src/index.jsに相当する部分

```plain text
/* harmony import */ var _mod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


console.log(_mod__WEBPACK_IMPORTED_MODULE_0__);

```

見て分かるように、`foo`が`R`に変わるというようなmanglingが行われていません。また、`foo`も`bar`も消されていません。

### webpackはコードの意味を変えない

以上のような結果は、**webpackはコードの意味を変えない**という原則があると考えれば理解できます。今回の例では`console.log(mod)`では`{ "foo": "foo", "bar": "bar" }`という結果になることが期待されます。この結果を維持するために、エクスポートされる名前を変えたり減らしたりすることはできませんでした。

一方で、`console.log(mod.foo)`の場合には、中身さえ同じならば`console.log(mod.R)`でも変わりません。webpackはこれを理解して最適化を行うのです。

つまり、export名を変えられたり消されたりしてもコードの意味が変わらないようにすれば、`import * as`構文を用いても最適化をしてもらうことができるのです。具体的に言えば、`import * as mod`のように得たモジュール名前空間オブジェクトは常に`mod.foo`のようにプロパティアクセスの形で使えば大丈夫です。

## エクスポート名は静的解析可能である

以上のような挙動の背景として、**エクスポート名は静的解析可能である**という事実があります。JavaScriptのモジュールシステム（ES Modules）は、エクスポート名が静的可能であるように定義されています。つまり、あるモジュールが何という名前の変数（バインディング）をエクスポートするのかということは、モジュールを実際に実行しなくても、モジュールを構文解析するだけで決定可能なのです[1](https://qiita.com/uhyo/items/842e51e0d8cc46856d04#fn-note_export_star)。

これにより、`import * as mod`のようにして得た`mod`がどんなプロパティを持っているかということも、静的解析により決定可能になります。それゆえに、`mod.foo`というプロパティアクセスの構文を使っている限り、`mod.foo`がインポートされたモジュールのどの変数に対応するかも追跡可能です。エクスポート名のmanglingもこのことを理論的裏付けとして行われています。

## なぜwebpackが最適化を行うのか

上記のような挙動は、webpackがこのような静的解析を実施したからこそ実現されています。では、なぜterserなどではなくwebpackがこのような最適化を行うのでしょうか。それは、**webpackがES Modulesホストだから**です。このことについては、以下の記事でも少し触れました。

つまり、import/exportをECMAScript仕様にしたがって解決するのはwebpackの役割なのです。だからこそ、webpackを通すとimport/exportはコードから消えてwebpackのランタイムに置き換えられます。これは、import/exportの解決という部分について、webpackは部分的にECMAScriptの実行環境として振舞っているということです。それゆえに、この部分に対してwebpackには好きなように最適化する権限が与えられます。

これにより、上述のような静的解析を根拠として、webpackはエクスポート名を改名（mangling）したり、余計なexportを消したり（tree shaking）することができます。

以上のように、`import * as`構文を使っても、場合によってはwebpackによる最適化の恩恵を受けることができます。筆者はよく[io-ts](https://github.com/gcanti/io-ts)を`import * as`構文と一緒に使います。

```plain text
import * as t from 'io-ts'

const objType = t.type({
  foo: t.string,
  bar: t.string,
});

```

さすがに`type`や`string`といった変数名をインポートするとコードがややこしくなるのでこれは重宝します。

ちょうど上のコードのように、`import * as`構文を使った際は必ずモジュール名前空間オブジェクトに対してプロパティアクセス構文を使うように気をつければ大丈夫です。

`import * as`構文を使う際はうっかり最適化が無効になってしまわないように気をつけましょう。

以上です。この記事が良かったと思ったらぜひLGTMをお願いします。

……。

嘘です。

エンジニアリングにおいて「気をつける」というのはまともな解決策ではありません。ちゃんと仕組みで解決しましょう。

## eslint-plugin-tree-shakable

今回、筆者は`import * as`構文を安全に使うためのESLint Pluginを製作しました。それが`eslint-plugin-tree-shakable`
 です。

このルールを使うことで、tree shakingに悪影響を及ぼしてしまうような使い方をESLintで防ぎつつ、`import * as`構文を活用することができます。

ぜひこちらのルールを使用してみてください。バグ報告や改善提案なども歓迎しています。

ESLintを活用して楽しく`import *`ライフを送りましょう！

1. 
厳密に言えば、`export * from`構文の存在により、構文解析だけではなくモジュールグラフの解決も必要となります。 [↩](https://qiita.com/uhyo/items/842e51e0d8cc46856d04#fnref-note_export_star)

![[Attachments/無題のフォルダ/qiitan-for-login-modal-014e085d3e40a240e3fe8d61b70b29a9.png]]

Why not register and get more from Qiita?

2. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
3. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fuhyo%2Fitems%2F842e51e0d8cc46856d04&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fuhyo%2Fitems%2F842e51e0d8cc46856d04&realm=qiita)

Comments