---
Created: 2021-01-15T18:01:00
URL: https://qiita.com/mysticatea/items/f523dab04a25f617c87d
Updated: 2021-01-15T18:01:00
Tags: [topic/技術/ビルドツール]
---
> We're excited to announce that ESLint v6.0.0 has been released: https://t.co/EO4ZrZIMYM— ESLint (@geteslint) 2019年6月22日

[ESLint](http://eslint.org/) は JavaScript のための静的検証ツールです。コードを実行する前に明らかなバグを見つけたり、括弧やスペースの使い方などのスタイルを統一したりするのに役立ちます。同様のツールとしては [JSLint](http://www.jslint.com/), [JSHint](http://jshint.com/) 等があります。

[ESLint](http://eslint.org/) の特色は、

- すべての検証ルールを自由に on/off できる
- 自分のプロジェクトに合わせたカスタムルールを簡単に作れる
- [豊富なビルトイン ルール](http://eslint.org/docs/rules/) (5.0.0 時点で 260 個) に加えて、[たくさんのプラグイン](https://www.npmjs.com/search?q=eslintplugin)が公開されている
- ECMAScript 2015 (ES6), 2016, 2017, 2018, 2019 を標準サポートしている
- [JSX 記法](https://facebook.github.io/jsx/) をサポートしている
- [Babel](http://babeljs.io/) と連携することで、[仕様策定中の新しい構文](https://github.com/tc39/proposals#active-proposals)や [Flow 型注釈](http://flowtype.org/)にも対応できる

あたりでしょうか。

この記事ではインストールからコマンドラインでの使い方、設定ファイルの書き方、エディタ上に問題を表示する方法、ES2015 (ES6) や React を使う方法まで解説していきます。

# 💿 インストール

[ESLint](http://eslint.org/) は、[Node.js](http://nodejs.org/) **8.10.0** 以降を利用して実行することができます。
Node.js のパッケージ管理ツール [npm](https://www.npmjs.com/) を利用してインストールします。

shell

`$ npm install -g eslint`

少し時間がかかります。
終わったら無事インストールできたか確認してみましょう。

shell

`$ eslint -v
v6.0.0`

> 注1: ESLint は2週間毎にアップデートしているため 6.0.0 より大きなバージョンが表示されるはずです。注2: 本当はグローバル インストール (-g) しないのが推奨ですが、ここでは簡単のためにグローバル インストールを利用します。詳しくは『ESLint をグローバルにインストールせずに使う』をご覧ください。

# 📖 使い方

この記事では次のコードと設定ファイルを例にして解説します。
読み進めるにあたって、次の2つのファイルを作成しておくと実際に動かして確認できます。

test.js

`function hello(name) {
    document.body.textContent = "Hello, " + nama + "!"
}

hello("World");`

.eslintrc.json

`{
    "extends": ["eslint:recommended"],
    "plugins": [],
    "parserOptions": {},
    "env": {"browser": true},
    "globals": {},
    "rules": {}
}`

`.eslintrc.json` は [ESLint](http://eslint.org/) の設定ファイルです。
内容については後ほど解説します。

## 🔍 eslint コマンドを使う

冒頭のサンプルコードに対して `eslint` コマンドを実行すると、次のような結果が得られます。

shell

`$ eslint test.js`

shell

`$ eslint test.js

/path/to/test.js
  1:16  error  'name' is defined but never used  no-unused-vars
  2:45  error  'nama' is not defined             no-undef

✖ 2 problems (2 errors, 0 warnings)`

### コマンドの詳細

shell

`$ eslint <対象ファイル>`

- `<対象ファイル>` としてフォルダを指定することもできます。その場合はフォルダ内にあるすべての`.js`ファイルを検証します。
- `<対象ファイル>` として [glob](https://www.npmjs.com/package/glob#glob-primer) パターンを指定することもできます。その場合は一致するファイル群を検証します。
- `node_modules` 内はデフォルトで無視されます。

### 表示メッセージの詳細

`  行番号:列番号  種類    メッセージ                        ルール名
  1:16          error  'name' is defined but never used  no-unused-vars
  2:45          error  'nama' is not defined             no-undef`

- メッセージを良く読み、該当するコードを修正していくことになります。
- エラーの内容がよくわからない場合は [ルール一覧](http://eslint.org/docs/rules/) から**ルール名**を検索してみましょう。英語ですが、豊富なコード例がルールの理解を助けてくれるはずです。
- または、[サポート チャット](https://gitter.im/eslint/eslint-jp) で質問することもできます。こちらは日本語 OK です (常に人がいるとは限りませんが...)。

コードを修正してからもう一度実行してみましょう。

test.js

`function hello(name) {
    document.body.textContent = "Hello, " + name + "!"
}

hello("World");`

shell

`$ eslint test.js`

- 検証した結果、問題がなければ何も表示されません。

## 💡 ルールを追加する

ところで、先ほどのサンプル コードでは、1 箇所セミコロンを書き忘れています。
これを警告するために、設定ファイルにルールを追加してみましょう。

.eslintrc.json

`  {
      "extends": ["eslint:recommended"],
      "plugins": [],
      "parserOptions": {},
      "env": {"browser": true},
      "globals": {},
-     "rules": {}
+     "rules": {
+         "semi": "error"
+     }
  }`

そして、`eslint` コマンドを実行してみると...

shell

`$ eslint test.js

/path/to/test.js
  2:55  error  Missing semicolon  semi

✖ 1 problem (1 error, 0 warnings)`

セミコロン忘れが警告されました。

このように [ESLint](http://eslint.org/) は単純な検証ルールをたくさん持っていて、それらを自由に ON/OFF することができます。

- プロパティ名 (`"semi"` の部分) はルールの名前で、その値 (`"error"` の部分) がそのルールの設定です。
- `"error"` ... ルール違反を見つけるとエラーにします (なります)。
**赤く**
- `"warn"` ..... ルール違反を見つけると警告します (なります)。
**黄色く**
- `"off"` ....... ルール違反を見つけても何もしません。

## 🔧 ルールのオプションを使う

[ESLint](http://eslint.org/) の各ルールは独自のオプションを持っている場合があります。
例えば、先ほどの `semi` ルールはセミコロンの利用を禁止するオプションを持っています。

.eslintrc

`{
    "extends": "eslint:recommended",
    "env": {"browser": true},
    "rules": {
        "semi": ["error", "never"]
    }
}`

- オプションを利用するときは、各ルールの値が**配列**になります。
- 先頭がオン・オフを表す文字列 (`"error"`, `"warn"`, `"off"`) です。
- 2番目以降がオプションの値になります。
- `semi` ルールの場合は、常にセミコロンを使う `"always"` とセミコロンを禁止する `"never"` オプションがあります。ルール毎に持っているオプションは異なります。

これを実行すると...

test.js

`function hello(name) {
    document.body.textContent = "Hello, " + name + "!"
}

hello("World");`

shell

`$ eslint test.js

/path/to/test.js
  5:15  error  Extra semicolon  semi

✖ 1 problem (1 error, 0 warnings)`

5行目のセミコロンが警告されました。

## 👻 グローバル変数を定義する

`<script>` タグを使って HTML 側でスクリプトを読み込む場合など、グローバル変数を使って他のファイルで定義された関数やオブジェクトを参照することがあります。しかし [ESLint](http://eslint.org/) はファイル毎に静的検証を行うため、他のファイルで定義された関数やオブジェクトのことを知りません。そこで、コメントや設定ファイルを使って、[ESLint](http://eslint.org/) にグローバル変数・関数があることを教えてあげる必要があります。

### コメントで定義する

test.js

`/*globals $ */

function hello(name) {
    $(document.body).text("Hello, " + name + "!")
}

hello("World");`

ファイルの中で `/*globals 名前*/` というコメントを書くと、指定した名前のグローバル変数・関数があることを [ESLint](http://eslint.org/) に教えることができます。名前はカンマ区切りで複数指定できます。

例

`/*globals a, b, c */`

`globals` コメントのメリットは、あるファイルがどんなグローバル変数・関数に依存しているのかが分かりやすい点です。このコメントで定義したグローバル変数・関数が未使用だった場合はコメントが警告されるので、本当に依存しているものだけを記述できます。デメリットは、個々のファイルに同じようなコメントを書く必要がある点です。

### 設定ファイルで定義する

.eslintrc.json

` {
     "extends": ["eslint:recommended"],
     "plugins": [],
     "parserOptions": {},
     "env": {"browser": true},
-    "globals": {},
+    "globals": {
+        "$": false
+    },
     "rules": {}
 }`

設定ファイルの `"globals"` プロパティを利用して、グローバル変数を追加定義することができます。
キー (`"$"`の部分) は変数名で、値 (`false`) の部分は "書き換え可能かどうか" を表すフラグです。`false` は書き換えられないグローバル変数となります。

設定ファイルのメリットは、1回書くとその設定ファイルを使ったすべての静的検証に反映されることです。デメリットは、各々の JavaScript ファイルが本当に依存しているグローバル変数がどれなのか分かり難くなることです。

## 🌟 環境設定をする

`"env"` プロパティを使うことで、静的検証の前提条件を設定することができます。
例えば、この JavaScript はブラウザで動くコードだとか、ES6 を使っているのだとか。`"env"` プロパティはたくさんありますが、ここでは代表的なものを紹介します。

### Browser

.eslintrc

`{
    "env": {
        "browser": true
    }
}`

ブラウザで実行されるコードを静的検証する、と設定します。
これを設定すると、DOM API (`document`や`onload`等) が定義されます。

### Node.js

.eslintrc

`{
    "env": {
        "node": true
    }
}`

Node.js で実行されるコードを静的検証する、と設定します。
これを設定すると、Node.js 固有の変数や構文 (`require`や特殊なトップレベル スコープ等) が定義されます。

### ECMAScript 2015 (ES6)

.eslintrc

`{
    "env": {
        "es6": true
    }
}`

ECMAScript 2015 (ES6) で書かれたコードを静的検証する、と設定します。
これを設定すると、ECMAScript 2015 で追加された構文や組込みオブジェクトが利用できるようになります。
ただし、`"es6": true` は ES Modules 機能を有効に**しません**。

### ES Modules

.eslintrc

`{
    "env": {
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module"
    }
}`

ES Modules 機能を有効にするには、`"parserOptions"` プロパティも設定する必要があります。
ES Modules だけ別扱いなのは、次のような理由があります。

- 実際にも、読み込む側がコードを Modules として扱うかどうかを決定する。
- ブラウザでは、`<script type="module" src="foo.js"></script>`のように読み込む。
- Node.js では、たぶん拡張子を `.mjs` にすると Modules として読み込まれる (議論中)。
- コードをモジュールとして扱った場合、予約語が増えたり強制的にStrictモードになったりするため、既存のコードをモジュールとして扱うと壊れる可能性がある。

### ECMAScript 2015 (ES6) を活用するためのルールたち

[ESLint](http://eslint.org/) には ECMAScript 2015 で追加された言語機能に関するルールがたくさんあります。
ECMAScript 2015 を使う場合は、ぜひ有効にしましょう。

.eslintrc

`{
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "es6": true
    },
    "rules": {
        "arrow-body-style": "error",
        "arrow-parens": "error",
        "arrow-spacing": "error",
        "generator-star-spacing": "error",
        "no-duplicate-imports": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "rest-spread-spacing": "error",
        "template-curly-spacing": "error",
        "yield-star-spacing": "error"
    }
}`

> TODO これらのルールを解説する記事を書いてリンクする

### ECMAScript 2016 以降

.eslintrc

`{
    "env": {
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2016
    }
}`

ES2016 以降の構文を有効にするには、`"parserOptions"` プロパティも設定する必要があります。`parserOptions.ecmaVersion` オプションの値は、`5`, `2015`, `2016`, `2017`, `2018`, `2019` のいずれかを指定できます。デフォルトは `5` です。

## 🔦 エディタ上に表示する

多くのエディタは、[ESLint](http://eslint.org/) と連携させることでコードの問題をリアルタイム表示することができます。
以下では、幾つかのエディタ上で [ESLint](http://eslint.org/) を使う方法を紹介します。

### Visual Studio Code

Microsoft が公開している拡張機能を利用します。

- [eslint](https://marketplace.visualstudio.com/items/dbaeumer.vscode-eslint)

### Atom

コミュニティ パッケージを利用します。
設定画面からインストールしましょう。

- [linter](https://atom.io/packages/linter)
- [linter-eslint](https://atom.io/packages/linter-eslint)

グローバル インストールされた [ESLint](http://eslint.org/) を使うためには設定画面から次の項目を有効にする必要があります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F72555%2F3b54f2e0-0064-7dd1-249b-62f72dcd64fd.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=0d33d268757d9161c6e1945caa391fd7)

## 🎁 プラグインを使う

[ESLint](http://eslint.org/) の組込みルールは汎用的なものです。特定のライブラリやフレームワーク、または実行環境に特化した検証は行いません。そのような検証はプラグインとして提供されます。

プラグインとは [ESLint](http://eslint.org/) の追加ルールをまとめた npm パッケージです。
利用するには、`npm install` コマンドでインストールして、設定ファイルの `"plugins"` プロパティを指定します。

ここでは、いくつかの有用なプラグインを紹介します。

### Node

[eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node#readme) は Node.js に特化した追加ルールを提供します。

shell

`$ npm install -g eslint-plugin-node`

.eslintrc

`{
    "extends": ["eslint:recommended", "plugin:node/recommended"],
    "plugins": ["node"],
    "rules": {
        "node/no-unsupported-features": ["error", {"version": 8}]
    }
}`

- 使用するプラグインは `plugins` で指定します。
- 指定する文字列は `eslint-plugin-` の後ろ側です (例: `eslint-plugin-node` なら `node`)。
- `extends` にて、プラグインが提供する推奨設定を指定できます。
- `"plugin:node/recommended"` は、`node` プラグインの `recommended` 設定という意味です。
- `rules` にて、プラグインのルール設定を行います。
- 各ルールは `プラグイン名/ルール名` で指定します。
- `"node/no-unsupported-features"` は、`node` プラグインの `no-unsupported-features` ルールという意味です。

このプラグインは次のようなことをチェックしてくれます。

- `require()` したファイルが存在するかどうか
- `require()` したモジュールがきちんと `package.json` の `dependencies` に存在するかどうか
- 非推奨になった API を使っていないかどうか
- 指定したバージョンの Node.js でサポートされていない ECMAScript 構文を使っていないかどうか
- Shebang (`#!/usr/bin/env node`) の使い方が誤っていないかどうか

### React

[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react#readme) は React ライブラリに特化した追加ルールを提供します。

shell

`$ npm install -g eslint-plugin-react`

.eslintrc

`{
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "plugins": ["react"],
    "env": {
        "browser": true,
        "es6": true
    },
    "rules": {
    }
}`

> TODO eslint-plugin-react が追加するルールの解説を書く
(詳しくないので  編集リクエスト歓迎です)

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f4dd.png)

### Vue.js

[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue#readme) は Vue.js ライブラリに特化した追加ルールを提供します。

shell

`$ npm install -g eslint-plugin-vue`

.eslintrc

`{
    "extends": ["eslint:recommended", "plugin:vue/recommended"],
    "plugins": ["vue"],
    "env": {
        "browser": true,
        "es6": true
    },
    "rules": {
    }
}`

このプラグインは次のようなことをチェックしてくれます。

- `.vue` ファイルの `<script>` タグの検証
- `.vue` ファイルの `<template>` タグの検証

## ♻️ Shareable Config (共有設定) を使う

[ESLint](http://eslint.org/) のルールの数は本当に多いです。組込みルールだけでも 200 以上。その上でプラグインが 200 以上公開されています。とてもではないけれど把握しきれません。それに、自分のプロジェクト毎に `.eslintrc.json` を用意してコピーするのは面倒です。

そこで、Shareable Config (共有設定) を使うと楽ができます。

Shareable Config (共有設定) とは [ESLint](http://eslint.org/) の設定をまとめた npm パッケージです。
利用するには、npm install コマンドでインストールして、設定ファイルの "extends" プロパティを指定します。

先人の Shareable Config (共有設定) を拝借して、好みに合わない部分をちょこちょこ修正するのが楽でしょう。

例えば [eslint-config-eslint](https://www.npmjs.com/package/eslint-config-eslint) は、[ESLint](http://eslint.org/) チームが使っている設定です。 [ESLint](http://eslint.org/) 自身のソースコードはこの設定によって Linting されています。

shell

`> npm install -g eslint-config-eslint`

.eslintrc

`{
    "extends": ["eslint"],
    "rules": {
    }
}`

- Shareable Config は `extends` を用いて継承して使います。
- 指定する文字列は、`eslint-config-` の後ろ側です。

See Also: [共有設定でらくらく ESLint](http://qiita.com/mysticatea/items/dc35ced6bd5e782f50cd)

# 🏆 次の一歩

- 組込みルールを調べてみる
- [ルール一覧](http://eslint.org/docs/rules/) (英語)(和訳したいなぁ)
- 自分のプロジェクトのためのカスタムルールを作ってみる
- [ESLint のカスタムルールを作ろう! (その1)](http://qiita.com/mysticatea/items/cc3f648e11368799e66c)
- こんなルールがあると嬉しい! と提案したり、見つけたバグを報告したりする
- [英語](https://github.com/eslint/eslint/issues) (本家)
- [日本語](https://github.com/eslint/eslint-jp/issues) (公式の日本語版)
- ESLint のバグを直してみる
- [バグ一覧](https://github.com/eslint/eslint/issues?q=is%3Aopen%20label%3Abug%20label%3Aaccepted) (英語)