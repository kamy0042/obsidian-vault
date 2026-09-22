---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F4153%2F213b9513-e9ca-3449-b261-93343ae0c16f.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=fa3765ee98c974a5210f8c9ee3b76d7a)

すっかりTypeScript厨（同僚談）になっているyprestoです。
AndroidでKotlinがどんどん採用されていくのを横で指を加えて見てるわけには行かないので、JSにもTypeScriptをぶち込みました。SwiftかKotlinを書いたことがある人ならばすっと馴染むと思います。

新しく書くJSはもう基本的にTSで書いてます（botすらTypeScriptに書き換えて引かれましたｗ）。ちょうど1年前からガッツリ使っていたので知見を垂れ流すフェーズに入ります。

完全な初級というよりは、ちゃんと使いたい中級な人向けに、基本的な使い方＋最初に引っかかるところという感じで書いたつもりです。どちらでも大丈夫なように書くつもりなので、疑問点をコメント頂けるとうれしいです・・！

## なんでそんなにTypeScript使いたいの

React使うなら常にTypeScriptという気持ちが高まりました。Reactが公式でサポートしているFlowでも良いと思います。とりあえず、型付きのJavaScriptを使っておくととても便利です。

### よくある間違いがすぐ見つかる

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F4153%2Fe4acb5f2-dc51-a4c2-a1b4-d6295deb4313.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ee4b1853a161c4e613de75a05c361d1a)

図の例では、HTMLのclassはReactではclassNameであること（初心者あるある）、wrongPropertyは存在しないこと、未定義の変数を使っていること。また、渡すべき型が間違っていてももちろん気づけます。

もともと、Reactでは型チェックを[PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)という公式のバリデータでやることになっていて最初ゴリゴリ書いてたんですが、**それ書くぐらいならTypeScriptでええやん**ってなったのが正直な動機でしたｗ

### 補完が使えるとComponentで使えるプロパティがすぐわかる

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F4153%2F21ef80a3-18c4-c43c-456b-90bfadb6f3de.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=f0f74d2342e0e78ead6a1eebc8487a5c)

TypeScriptの補完は強力で、通常のJS補完と違い候補に出てくるのは実際に存在するプロパティになります。なのでtypoやらクラスの間違いやらをなくすこともできます。もちろん、場所にもよりますが補完だけではなくエラーでも表示されることが多いです。

HTMLElementのプロパティが全部使えるとめっちゃ多くなるので効果が薄れるかもしれませんが、例えばalign系何か使えるかなって思ったら図のような感じで補完してくれます。

（そういえばかつてEclipseすげーってなったことがあって、それはJavaのメソッドについて一切知らなくてもだいたい補完で雰囲気わかって勉強できるからでした。）

### ちなみにエディタは？

TypeScriptを作ってるMS公式ではVSCodeですが、Language Server Protocolに準拠したプラグインを入れればAtomやVimなどで公式の補完が使えるようになります。

- VSCode: ビルトイン
- Atom: Atom IDE （公式） [https://ide.atom.io/](https://ide.atom.io/)

### [Flow](https://flow.org/)じゃなくてTypeScriptなの？

類似の型付きJavaScriptにはFlowがあります。自分はあれこれ調べてTypeScriptの方を選びました。

- Flowのいいところ
- ~~型の扱いが厳しい目（後述の「双変性」の話）~~ → TypeScript 2.6から厳しくできるようになっていた
- parserが吐き出すASTが標準化されているもの（ESTree）なので、ESLintとかで対応しやすい
- oO（でも結局シンタックスに合わせた拡張は必要だからなーという思いが
- Flowはコンパイラじゃなくてタイプチェッカーなので、Babelなどと親和性高そう（知見なし）
- Microsoftじゃないこと（ｗ
- TypeScriptのいいところ
- MSはVSCodeだけでなく、TypeScriptのIDE機能を他のエディタでも使えるようにする仕組み（Language Server）を作ってる
- よく見るとFlowもその流れに乗っかって公式で[flow-language-server](https://github.com/flowtype/flow-language-server)を作ってました
- コンパイラ等もTypeScriptで書かれている点に安心感がある（FlowはOCamlという関数型言語）
- Babelの役割をTypeScriptコンパイラがこなしてくれるので、複数ツールを組み合わせなくてもよい。
- 型定義、情報、ユーザー数が多い印象（違ってたらごめんなさい）
- [Google社内言語として選定されている](http://www.publickey1.jp/blog/17/googletypescriptng-conf_2017.html)しAngularもTSで書かれている

### 罠やロックインはないの？

a.k.a. CoffeeScriptの二の舞いにならないの？

TypeScriptはECMAScript（JavaScript標準）に合わせてシンタックスを拡張していく（勝手に新しいの追加してぶつけない）方針を貫いているし、Flowもタイプチェッカーであると謳っているので、これからも「JSの知識＋型定義の知識」で問題なく使えると思います。

またTypeScript固有のシンタックスは事実上は型アノテーションだけ（なはず）なので、やっぱやめってなったときも型情報を消していけばOKです。または、吐き出すJSも比較的きれいなようなので、コンパイラの設定でES2015をそのまま吐き出すようにすれば、素のJSを得ることができるかも？（未実験）

本当に罠があるとしたら、それは「（使いたいライブラリの）型定義（`***.d.ts`ファイル）があるとは限らず、必要に応じて自分で書く必要があるということ」です。誰か1人が最初に書いていい感じに修正し合えば、他の人も使えるので楽になるのですが、あなたが最初だったときはそこを頑張る必要があります。または必要なメソッドの分だけ定義して逃げることもできます。

（意図的だと思いますが、型定義なしだとモジュールのimportはできないので、定義を書くか `const foo: any = require("foo")` のようにごまかすしかないです）。

（型定義の書き方については別途記事を書いてるところです・・！）

# じゃあTypeScript使おう

## webpackを設定する

TypeScript公式のwebpack設定ドキュメントがあるので、こちらを参照して設定するもよし、環境にあった他のボイラープレートを使うもよし、という形になるかと思います。[https://www.typescriptlang.org/docs/handbook/react-&-webpack.html](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
追記：ちなみにVueのプロジェクトを始めたい場合はvue-cli（もしかしたらnuxtでも？）でTypeScriptを使うように指示を出すと、簡単に始めることができます。

**公式のボイラープレートはこちら**です→ [https://github.com/Microsoft/TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)
こっちはおそらくgit cloneしてくるだけで使える状態になっているのではないかと思います。

oO（自分がセットアップしたときには

[react_on_rails](https://github.com/shakacode/react_on_rails)

を使用したりMeteorのプラグインに頼ってしまったりしたので、webpackの知見は乏しいです

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f647.png)

が、webpackがセットアップ済みであれば

```plain text
.ts
```

（とReactなら

```plain text
.tsx
```

）の設定とloaderを追加すればOKです。

（なお、webpackのTS対応はts-loaderとawesome-typescript-loaderの2つあるようですが、上記の公式では[awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)が推奨されています。）

また、webpackを使っていない方は、tsconfig.jsonで出力先ディレクトリなどを設定して、`tsc`コマンドで手動コンパイルすることもできます（がちゃんと使ったことはない）。追記：tsconfig.jsonで `noEmit: true` を指定してtscコマンドを叩くと、コンパイル可能かすぐにチェックすることができて便利です。

※ここ手薄なので、もっと書いてくれという方がいらっしゃったら `webpack書いてくれコメントがある ? コメントいいねする : コメントを書く` をお願いします。

## [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)を設置する

TypeScriptのLanguage Server（エディタの補完機能などを提供）とコンパイラに渡す設定です。
基本的には `"compilerOptions": {...}` の部分だけ抑えればOKなはずです（files、includes、excludesの周りはデフォルトが上手に設定されているようです）。

tsconfig.jsonに各compilerOptionsは、下記のコンパイラに渡すオプションと1対1で対応しています。[https://www.typescriptlang.org/docs/handbook/compiler-options.html](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
ターゲット環境に合わせて読み込むJS標準の型定義を切り替えたり、途中からTypeScriptに変えていく場合向けに型チェックの厳しさなどを調整できるようになっていたりします。

TypeScript 2.6.2現在の（TypeScriptらしく厳しくいく）オススメ設定は下記です：

`{
  "compilerOptions": {
    // strictをtrueにすると以下が全部指定されます
    //   "noImplicitAny": true       // 型推論などで型が決められないときに暗黙的にany扱いにするのを許さない。
    //   "noImplicitThis": true      // 上記のthis版です。
    //   "alwaysStrict": true        // "use strict"が書かれてなくても、書いてあったことにしてコンパイルします。
    //   "strictNullChecks": true    // nullやundefinedが型定義で指定されてないと、それらの代入を禁止する。必須。
    //   "strictFunctionTypes": true // 後述の、型チェックが「双変性」で緩くなってるのを厳しくします。
    "strict": true, 
    "noImplicitReturns": true,       // JSでreturnを書かないとundefinedが返りますが、返り値がvoidでなければそういうパターンを許さず明示的に書くことを強制します。
    "noUnusedLocals": true,          // 未使用の変数を警告します。
    "noUnusedParameters": true,      // 未使用の引数を警告します。2番目以降の引数だけ使いたいようなときは、使わない引数名を `_` から始めると警告が消えます。
                                     // （未使用系は以前はコンパイルエラーでしたが、少なくとも2.6では警告だけになっています。書きかけのコードも実行できて便利。）

    "target": "es5",                 // もうIE10〜で大丈夫でしょ・・？
    "jsx": "react",                  // React使う場合は指定します。
    "lib": [                         // ECMAScript標準やdomの型定義を入れます。
      "dom",                         // ブラウザ向けのコードなのでdomを入れます。
      "es5",                         // "target": "es5" に合わせて入れます。
      "es2015.promise"               // Polyfillを自分で入れたとき、型定義を1機能ずつ増やすこともできます。
    ],                               // 使えるlibの一覧はcompiler-optionsのページに書かれています。
  },
}`

## 型定義を落とす

TypeScriptやFlowは型定義がないと使うのが難しいのですが、JavaScriptで書かれたライブラリのための型定義を集めたリポジトリがあります。TypeScriptは[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)で公開されています。

npmの `@types/` 以下で公開されているので、foobarモジュールの型定義がほしいときは

`npm install --save @types/foobar`

などとすれば落としてくることができます。

なお、[axios](https://github.com/axios/axios/blob/master/index.d.ts)のように最初から型定義が同梱されているライブラリもあるので、その場合はnpmしなくてもそのまま使えます・・！

型定義がDefinitelyTypedにない場合は自分で書くことになり、それをPR送ると次の人から書かなくて済むようになります。有名なもので型定義がなかったものは今のところないですが、一部の型定義の品質が微妙・・（Reactも最近しっかり修正された）ということはたまにあります。

## ファイルの置き方

普通のJSは`***.ts`、JSXは`***.tsx`、型定義は`***.d.ts`をJSのように設置していけばOKです（型定義は自分は`types/`以下にまとめています）。あとは（`tsconfing.json`の設定にもよりますが）全部読み込んでwebpackがコンパイルしてくれます。

## 文法

基本的にはECMAScriptというかJavaScriptと同じで、class等についてはES2015の文法を知っておくと書きやすいです。というかほぼ必須です。[https://qiita.com/romiogaku/items/0f337c489754417f9fa8](https://qiita.com/romiogaku/items/0f337c489754417f9fa8)

### Basic Types

型アノテーションの基本文法については、下記のページにさっと目を通すだけでも雰囲気を感じることができるのではないかと思います。[https://www.typescriptlang.org/docs/handbook/basic-types.html](https://www.typescriptlang.org/docs/handbook/basic-types.html)

基本的に、変数や引数、関数やメソッドの後ろに`:`をつけて型を書く（`let foo: number`）と型情報を与えることができます。リテラルや関数呼び出しから返ってきた値は、概ね型推論でいい感じに型がつきます。なので引数の型を書いていくことがメインとなります。

また、よく使うObjectに雑にオプションやデータ、コールバックなどを生やしたようなやつは`interface`で型を定義できます。
（書く場所を見失ったのでここにちらっと書きますが、interfaceはclassのようにextendsすることもできます）

`interface Foo {
  foo: number
  bar(a: number, b: number): number
}

const foo: Foo = { foo: 1, bar: () => 2 }`

### Array / （ハッシュ的な）Object

最初に躓いたのはここの書き方でした。

`const array: number[] = []
const notArray: [number] = [1] // 最初Arrayをこんな書き方してました・・
const tuple: [number, string] = [123, "123 is one-two-three"]

// "key"のところは、引数の名前みたいなもので、自由に命名できます。
const hashLikeObject = { [key: string]: number } = { a: 1 }

// keyにnumberを書くやり方は一見通るのですが、Objectのキーはstringって決まっているので勝手に変換されちゃいます。
const dame = { [key: number]: number } = {}
dame[0] = 1
=> dame["0"] === 1`

Arrayとタプルの使い分けに注意です（最初間違えてタプルを書いてた）。

Objectのほうも、一見気持ち悪い書き方にも見えますが、実はES2015以降で使える「Objectのkeyに変数を使う」書き方と一緒なので覚えておくと便利です。[https://qiita.com/kmagai/items/95481a3b9fd97e4616c9](https://qiita.com/kmagai/items/95481a3b9fd97e4616c9)

### Any

返り値の型を固定できない関数（`JSON.parse()`など）もあると思いますが、このときは返り値型にオブジェクトの中身を自由に参照可能な`any`型が指定されます。ちょうど型のないJSみたいな振る舞いをします。好きにアクセスができるということはつまり、型安全性が失われるので注意が必要です。

`const response = JSON.parse('{count:"1"}')
const count = response.count // countもany型
reponse.comments.map(...)    // コンパイルは通るけど、commentsはJSONに入ってなかったのでランタイムエラー！`

### Functions

[https://www.typescriptlang.org/docs/handbook/functions.html](https://www.typescriptlang.org/docs/handbook/functions.html)
こちらは最初にちょっと迷った覚えがあるので例を用意しました。

`// 関数型の定義の書き方（type宣言でType Aliasesを定義できます）
type FuncA = (a: number, b?: string) => number

// 実装での書き方（返り値指定`: number`は文法の例示のために書いてますが、省略できます）
const funcA1 = (a: number, b?: string): number => a + parseInt(b || "0")

// 関数を引き渡す先の型が決まっている場合は、引数の型を書かなくても推論できます。
const funcA2: FuncA = (a, b) => a + parseInt(b || "0")

// アロー関数でなくfunctionでの書き方。返り値型は引数のカッコの後ろに書きます（省略可能）。
const funcA3 = function(a: number, b?: string): number { return a + parseInt(b || "0") }`

`// メソッドの場合の書き方
class Foo {
  // 何もreturnしない場合は、undefinedではなくvoid型になります。
  // ※メソッドに限らず、return文がなければvoidだと推論可能なので返り値型が省略可能です
  bar(hoge: number, fuga?: string): void {
    console.log(hoge, fuga)
  }

  // これもaとparseInt()の返り値型から推論可能です。
  bazz(a: number, b?: string): number {
    return a + parseInt(b || "0")
  }
}`

### Advanced Types

より詳しい話については公式のAdvanced Typesに書かれています。[https://www.typescriptlang.org/docs/handbook/advanced-types.html](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

このページは長いですが、`keyof`を始めとする重要機能についていろいろ書かれているので、ライブラリの型定義を書いている途中で困ったときなどに参照すると良いでしょう。その中からよく見るいくつかのトピックを抜粋します。

### Type Aliases

`type`宣言で型に別名をつけることができます。関数型やジェネリクスを使う際に活躍します。

`interface Foo<T> {
 value: T
}
type Bar = Foo<T>

type FuncA = (a: number, b?: string) => number`

なお、下記のTypeObjectの例のように`interface`の代わりに`type`を使うこともできますが、別の場所に同名の`interface`を書いて拡張（Declaration Merging）できなくなるため、おすすめできません。

`type TypeObject = { foo: string }
interface TypeObject { bar: string } // Error: Duplicate identifier 'TypeObject'.

interface InterfaceObject { foo: string }
interface InterfaceObject { bar: string } // OK!

class ClassObject { foo(): string }
interface ClassObject { bar(): string } // OK!`

### Union Types

`number | null` のように、`|`で結合すると「この中のうちの1つ」の型を表すことができます。

なお下記のReactの例のように、TypeScriptでは型の名前の代わりに「具体的な値（string、number）」も型として指定することができます（String/Numeric Literal Types）。

`// In interface CSSProperties of React.
/**
 * The overflow property controls how extra content exceeding the bounding box of an element is rendered. It can be used in conjunction with an element that has a fixed width and height, to eliminate text-induced page distortion.
 */
overflow?: CSSWideKeyword | "auto" | "hidden" | "scroll" | "visible";`

### Optional Properties

[https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties)

JSは型がゆるいので、存在しないことがある（オプショナルな）プロパティにエラーなくアクセスすることができます。

`const obj = {
  foo: "bar",
  nullableProp: null,
  undefableProp: undefined
}

obj.foo === "bar"
obj.nullableProp === null
obj.undefableProp === undefined
obj.optionalProp === undefined`

これを表現するためにTypeScriptでは`foo?: ...`のような書き方をします。

`const obj: {
  foo: string
  nullableProp: string | null
  undefableProp: string | undefined
  optionalProp?: string // 実際は string | undefined になります
}`

### Optional and Default Parameters

[https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters](https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters)

JSでは引数についても省略した場合は `undefined` になります。

`function foo(hoge, fuga) { console.log(hoge, fuga || "(none)") }

foo("abc") // 引数fugaを省略
           // => abc (none)`

これをTypeScriptで表すと下記のようになります。なお[ES2015と同様](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions_and_function_scope/Default_parameters)に、デフォルト値を持たせることもできます（その場合は`?`は不要）。

`function foo(hoge: string, fuga?: string) { ... }
function foo(hoge: string, fuga = "(none)") { ... }`

なおデフォルトについて、ES2015同様にfugaに明示的なundefinedを渡しても`"hoge"`が採用され、明示的にnilを渡すとデフォルトが使用されないRubyとは異なるので要注意です。

### nullとの付き合い方

TypeScriptではJSよりも厳密にnullとundefinedを区別することになります。「nullもundefinedもありうる文字列」は`let str: string | null | undefined`と書かねばなりません。

Optional PropertiesとOptional Parametersでundefinedが使われることを加味すると、nullは特別な意味にだけ使うことが求められます。

なおMS公式のTypeScriptガイドラインではnullは使用しないことになっています。[https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined)
しかしながらAPI（から返すJSON）の場合は「nullのとき」と「プロパティがない」ときでは意味が違うと言うことがあるように、undefinedに寄せつつ実情に応じて使い分けるのが良いと自分は思っています。

[https://basarat.gitbooks.io/typescript/docs/tips/null.html](https://basarat.gitbooks.io/typescript/docs/tips/null.html)

### その変数、絶対nullやundefinedなんか入っていない

[https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions)

TypeScriptはif等の条件分岐に応じて、型を自動でキャストした状態にしてくれます（Type Guards）。

`function func1(a?: string): string {
  // a は (string | undefined)型
  if (a) {
    return a // OK! ここでの a は string型
  }
  return "(none)"
}

function func2(a: string | number): number {
  // parseInt()は declare function parseInt(s: string, radix?: number): number; と定義されているので
  // stringしか受け付けないけど、問題なく通る
  return typeof a === "string" ? parseInt(a) : a
}

// その他instanceofで使用することもできます。`

しかしこれだけでは完全とは限りません。例えば「props.buttonTitleがundefinedではないときしか絶対呼ばれないメソッド」の中で、当該props.buttonTitleを参照するといった、if文で表せない仮定がある場合は、`props.buttonTitle!`と`!`をつけることで、強制的にundefined/nullが入っていないとみなすことができます（Type Assertions）。

`class Foo extends React.Component<{ buttonTitle?: string }> {
  onClickButton() {
    // this.props.buttonTitle は string | undefined
    window.alert(`${this.props.buttonTitle!.trim()} is clicked!`)
  }

  render() {
    return (
      this.props.buttonTitle
        ? <Button onClick={() => this.onClickButton()}>{this.props.buttonTitle}</Button>
        : null
    )
  }
}`

## importのやり方

importも概ね[ES2015のimport](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import)と同じです。
同じですが、スクリプトのJSから移ってきた人間（自分）にはだいぶ詰まる箇所になります。

下記のルールで書き分けます。

- ES2015モジュールではない場合（または型定義で `export = ...` されている場合。Reactもこれ。"has no default export"などと怒られたらこれチェック。）
- `import * as foo from "foo"` のようにインポートします。
- `import { bar } from "foo"` と書くと、上記でいうと `foo.bar` がとれます。
- ES2015モジュールの場合（または型定義で `export ...` や `export default ...` されている場合。）
- exportされているものは `import { foo, bar } from "foo"` のようにインポートできます。
- export defaultされているものは `import foo from "foo"` のようにインポートできます。
- `import foo, { bar } from "foo"` のように合わせて書くこともできます。

さらに、TypeScriptではたまーーーーに必要になる書き方もあります。デフォルト値のようなオプションを設定する変数が、モジュールに直接生えている場合です。このような場合、importって書きながらrequire()って書くおもしろい書き方をします。

`import * as I18n from "i18n-js"
// ES2015モジュールで参照できる変数はTypeScriptでなくても改変不能なのでエラーになります。
I18n.locale = "ja"


import I18n = require("i18n-js")
// OK
I18n.locale = "ja"`

追記：この件の公式ドキュメントは以下にあります。[https://www.typescriptlang.org/docs/handbook/modules.html](https://www.typescriptlang.org/docs/handbook/modules.html)

## 型安全性が壊れるとき

ここまでstrictNullChecksが有効な前提で書いてますが、利便性のために一部チェックがすり抜けている場所があります。

- ArrayやObjectの存在しないindexを参照
- [https://github.com/Microsoft/TypeScript/issues/13778](https://github.com/Microsoft/TypeScript/issues/13778)
- Optionalじゃないプロパティの（コンストラクタでの）定義漏れ
- `class Foo { num: number }`のとき、`new Foo()`してもプロパティnumは`undefined`のままです
- [https://github.com/Microsoft/TypeScript/issues/8476](https://github.com/Microsoft/TypeScript/issues/8476)
- 次のリリースで解消する見込み  [https://github.com/Microsoft/TypeScript/pull/20075](https://github.com/Microsoft/TypeScript/pull/20075)
![](https://cdn.qiita.com/emoji/twemoji/unicode/1f389.png)
- クロージャーから参照しているletの定義漏れ
- `let a: number; const getA = () => a` のとき、aに代入するコードがなくても警告は出ません
- （これは知りませんでした・・参考： [https://qiita.com/shimohi/items/21cce33890708ce8e1a2](https://qiita.com/shimohi/items/21cce33890708ce8e1a2) ）
- any型の変数に想定外のデータ構造が入っていて伝搬されてしまった
- これはanyがそういう仕様なので仕方ありません。anyの使用を避けると回避できます。（Swiftでもよく聞く問題ですね）
- APIレスポンスなど外界との境界ではanyを使わざるを得ないですが、渡ってきたオブジェクトの構造をチェックするなどで回避できそうです。

このうち最も問題になりそうなArrayやObjectのケースは下記のようなときに発生します。

`const array: number[] = [1, 2]
const value = array[100] // bの型はnumber
value.toFixed() // bの値はundefinedなのでランタイムエラー！`

`const obj: { [key: string]: string } = { foo: "foo" }
const bar = obj.bar // fooの型はstring
bar.trim() // fooの値はundefinedなのでランタイムエラー！`

なので、存在しないindexを参照する可能性がある場合は、自前で参照元のArray/Objectの型、または代入先の変数の型にundefinedをつけてあげると安全です。

`const a: (string | undefined)[] = []
// or
const b: number | undefined = a[100]`

`const obj: { [key: string]: string | undefined } = {}
// or 
const foo: string | undefined = obj.bar`

なおFlowでもこの問題はあります。[https://flow.org/en/docs/types/arrays/#toc-array-access-is-unsafe](https://flow.org/en/docs/types/arrays/#toc-array-access-is-unsafe)

## 変数に型アノテーションが書かれているかでの違い

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F4153%2Ff40941cd-4330-602e-a3ae-9b4ad4ab4466.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ef340f785a49e67b57ea7dfb93a15c9f)

このように、型が明示されている変数にObjectをリテラルを書くと、 `Object literal may only specify known properties, and 'c' does not exist in type 'Foo'.` とエラーが出る一方、一度変数に置くとエラーになりません。
（プロパティが足りない場合はもちろんどちらのケースでもエラーになります。）

VSCodeだとマウスホバーで型を確認できますが、変数の型はa, b, cのプロパティがある状態になっています。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F4153%2F50836dca-e2d4-713f-716a-1b807c9b7d7c.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=1d9229529b4bf54a8d0cc0518b77dd4e)

この例ではfunc()に渡すObjectにaとbどちらかのプロパティがないとエラーになりますが、`a?: number, b?: number`のようにすべてオプショナルなプロパティになっていると、全く無関係なObjectを渡してもエラーが出ないことになります。これを防ぐために、すべてのプロパティがオプショナルの場合は、1つもプロパティがかぶってない場合はエラーになります（Weak Types）。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F4153%2Fdf6c7ce0-185d-bf59-7703-49cd5bdc7382.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=d4ca21caf169995c653df723f0318e54)

## **かつての**型チェックの緩さ：双変性

**書いてる途中で気がついたのですが、この件はTypeScript 2.6で修正されていました！**[https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#strict-function-types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#strict-function-types)`--strict`または`--strictFunctionTypes`（または同等のtsconfig.jsonオプション）を指定すると有効（安全）になります。

〜〜↓以下はstrictFunctionTypesが無効の場合の仕様です。〜〜

[Flow](https://flow.org/)に比べると、「[共変性・反変性](https://ja.wikipedia.org/wiki/%E5%85%B1%E5%A4%89%E6%80%A7%E3%81%A8%E5%8F%8D%E5%A4%89%E6%80%A7_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%A6))」（Javaで言えば、ジェネリクスでsuperやextendsをつけるあれです）の扱いが、一部で緩い設定「双変 (bivariant)」と（追記：デフォルトでは）なっています。

[https://qiita.com/na-o-ys/items/aa56d678cdf0de2bdd79](https://qiita.com/na-o-ys/items/aa56d678cdf0de2bdd79)
↑の記事の内容を雑にまとめると、 `class Dog extends Animal {}` があったとして、TypeScriptでは `Animal[]` 型の変数に `Dog[]` を代入することができるが、 `(animal: Animal) => void` 型の変数 に `(dog: Dog) => void` 型を代入できてしまい、その結果dogに　`Animal` の別のサブクラスの `Cat` が警告なく渡ってきて問題になる可能性があります。

# Any Questions?

時間ができたらDefinitelyTypedに型定義をPRする話（型定義 `***.d.ts`ファイルの書き方含む）を書きます。良いお年を！
追記：↑やるやる詐欺してます・・
追記2：去年kansai.tsで話したのに貼るの忘れていました→ [TypeScriptの型定義をPRする技術](https://speakerdeck.com/ypresto/typescriptfalsexing-ding-yi-woprsuruji-shu)[型定義のpull requestをあれこれ出している](https://github.com/pulls?q=is%3Apr%20author%3Aypresto%20type%20is%3Apublic)のでそれを参考にしていただくのもありかもしれないです。

oO（ちなみに現職（[コードタクト社](http://codetakt.com/)）でSPAに移行している部分の全JSファイルをTSファイルにリネームしてanyつけるところまでやりましたよ！）
追記2：→その後退職しましたが、座標計算ロジックみたいな部分以外のすべてをちゃんと型のついたTypeScriptにみんなで置き換えていきましたよ・・！！