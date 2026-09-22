---
Created: 2021-01-15T18:01:00
URL: https://qiita.com/ishiyama0530/items/c013475c563322965e2a
Updated: 2021-01-15T18:01:00
Tags: [topic/技術/ビルドツール]
---
### 2019/12/30 Update

VSCode の ESLint 拡張機能がメジャーバージョンアップし、検証と autofix が正常に動作していなかったので対応しました。

### 2019/11/4 Update

- サンプルコードの追加
- TypeScript のインストールを追加

# TL;DR

以下の手順で作られるコードを以下に置いておきます。お忙しい方はこちらからどうぞ

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f385.png)

[https://github.com/ishiyama0530/worksample-ts-eslint-prettier-husky-lintstaged-jsstandard-autumn2019](https://github.com/ishiyama0530/worksample-ts-eslint-prettier-husky-lintstaged-jsstandard-autumn2019)

# モチベーション

最近の JS (TS) は、言語を取り巻くモダンな環境のアップデートが目まぐるしく、「コードを書き始めるまでの環境構築が辛い」というのはフロントエンドあるあるだと思います。

久々に TypeScript で新しく開発を始めようとしたところ以下のような気付きがありました。

- TSLint は今後非推奨になり ESLint に組み込まれる
- VSCode に TSLint のエクステンションが２つあるけどどっち使えばよいの？

ということで、私が最後に TSLint を使用し環境を構築したのは１年前になりますが、そのときから大分変わってしまったようです。「今どき」の TypeScript の Lint 事情に追いつけるよう、本日（2019/10/27）調べた内容を、忘れても良いようにメモしておきます。

# ゴール

- TSLint をやめて ESLint に移行する。
- VSCode の保存時にフォーマットが自動で実行されるようにする。
- Git hooks でコミットする直前にステージングされているファイルが検証されるようにする。（ Husky + lint-staged ）
- [JavaScript Standard Style](https://github.com/standard/standard) を適用させる。

# 参考

- [Using ESLint and Prettier in a TypeScript Project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)

# TSLint をやめて ESLint に移行する。

### TypeScript のインストール

`npm i -D typescript`

ワークスペースの配下にインストールすることをおすすめします。tsconfig はとりあえず以下のように設定しておきます。

tsconfig.json

`{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "outDir": "out",
        "lib": [
            "es6"
        ],
        "sourceMap": true,
        "rootDir": "src",
        "strict": true
    },
}`

### ESLint を TypeScript に対応させるためのパッケージ

`npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

- eslint
- ESLint 本体
- @typescript-eslint/parser
- ESLintがTypeScriptを解析できるようにするパーサー
- @typescript-eslint/eslint-plugin
- TypeScript固有のルールを追加するプラグイン

### ESLint と Prettier を連携させるためのパッケージ

`npm i -D prettier eslint-config-prettier eslint-plugin-prettier`

- prettier
- Prettier 本体
- eslint-config-prettier
- Prettier と競合している ESLint のルールを無効にする
- eslint-plugin-prettier
- ESLint のルールとして定義したルールを実行し警告を表示する

### .eslintrc.js

eslintrc.js

`module.exports = {
  // ESLint で使用するパーサーを指定する
  parser: "@typescript-eslint/parser",
  extends: [
    // @typescript-eslint/eslint-plugin のおすすめルールを適用する
    "plugin:@typescript-eslint/recommended",
    // Prettier と競合している ESLint のルールを無効にする
    "prettier/@typescript-eslint",
    // `eslint-config-prettier` と `eslint-plugin-prettier` を有効化する
    // ※ extends 配列の一番最後に配置すること
    "plugin:prettier/recommended" 
  ],
  parserOptions: {
    // 最新の ECMAScript を許可する
    ecmaVersion: 2018,
    // ecmaVersion を指定してもこの記述を入れておかないと import/export 解析されない
    sourceType: "module"
  },
  rules: {
    // Prettier の設定を記述していきます
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        endOfLine: "lf",
        semi: false,
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2
      }
    ]
  },
};`

### .eslintignore

こちらに記述されたファイル/ディレクトリは ESLint の検証対象外になります。（.gitignore のようなもの）

`.vscode
node_modules
out`

※ 各々の環境に合わせて書き換えるべきでしょう

### package.json の設定

Lint のコマンドを scripts フィールドに定義します。

package.json

`"scripts": {
  "lint": "eslint '*/**/*.{js,ts}' --quiet --fix"
}`

こちらを実行（ `npm run lint` ）すると package.json を配置してあるディレクトリを root とし、それ以下にある.eslintignore に定義されていない全ての js と ts ファイルに対して ESLint の検証がおこなわれます。また `--fix` により内容によって自動でコードの修正がおこなわれます。

# VSCode の保存時にフォーマットが自動で実行されるようにする。

### エクステンション

VSCode のエクステンションではDL数が多いのが以下の３つ

- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
- [TSLint (deprecated)](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

ですが、今回は ESLint を使用しているので一番最後の [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) をインストールします。

### 設定

ユーザー設定に記述してもよいのですが、プロジェクト以下に記述したほうが環境依存が少ないのでワークスペースの設定ファイル（.vscode/settings.json）に保存時の動作を記述します。

vscode/settings.json

`{
    "editor.formatOnSave": true,
    "[javascript]": {
        "editor.formatOnSave": false
    },
    "[typescript]": {
        "editor.formatOnSave": false
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
}`

VSCodeの機能である自動フォーマットを有効にし、javascript と typescript のみ ESLint に定義されているルールを使い、保存時にフォーマットがおこなわれるように設定しています。

**2019/12/30 追記**
VSCode ESLint の拡張機能がメジャーバージョンアップして、`eslint.autoFixOnSave` `eslint.validate`の設定は不要になりました。
V2以降は`.eslintrc`ファイルで`@typescript-eslint/parser`を設定している場合はデフォルトで TypeScript に対する検証が有効になるようです。autoFix もデフォルトで true の状態になっているようです。

詳細を知りたい方はこちらを読まれると良いともいます。[vscode-eslint v2](https://qiita.com/mysticatea/items/3f306470e8262e50bb70)[VSCodeのESLintのautofixがうまく動いてなかったので設定を変えた](https://qiita.com/hbsnow/items/54b787e914270cf293b0)

# ディレクトリ構成

以下のような感じになっていると思います。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F62209%2Fd201d3b0-8dbe-2918-3f0b-af9ee3c97a99.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=fb0864102209e650508d29a85bf940bf)

# Git hooks でコミットする直前にステージングされているファイルが検証されるようにする。（ Husky + lint-staged ）

### 必要なパッケージをインストール

`npm i -D husky lint-staged`

- husky
- git hooks の設定を package.json に記述できるようにしてくれるパッケージ
- lint-staged
- ステージングしたファイルに対して特定のコマンドを実行できるパッケージ

### package.json の設定

package.json に husky と lint-staged の設定を記述します。

package.json

`...,
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.{js,ts}": [
    "eslint --fix",
    "git add"
  ]
}`

husky フィールドに git hooks の pre-commit 時に実行するコマンド（ `lint-staged` ）を記述します。
pre-commit でステージングファイルにのみ `eslint --fix` が実行され、エラーがある場合は以下のようにコミットが抑制されます。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F62209%2F2dbce579-4f13-d1b0-4188-93d241bbe916.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=55663b1af9bab1f1aca60e74702b2eaf)

また、より強固にするため typescript のコンパイルが正常に行えるかのチェックを入れる場合は、以下のように hooks を編集すると良いです。

package.json

`"husky": {
  "hooks": {
    "pre-commit": "tsc --noEmit && lint-staged"
  }
}`

ここまでで一通り ESLint で typescript のコード解析を行い、コードを防衛するための設定は終了です 👶
これから先は [JavaScript Standard Style](https://github.com/standard/standard)  を適応していきます。

# JavaScript Standard Style を適用させる。

個人的にはプログラミングコードに自分の色は出したくなく、世の中の「良い」とされている記述になるべくよせたいと思っています。
プログラミング言語が標準のフォーマットを用意してくれるのが一番だと思うのですが、javascript は残念ながらコーディングルールにいくつかの派閥が存在します。
その派閥の中でも今後期待できそう（？）な JavaScript Standard Style のルールを適用したいと思います。

### 必要なパッケージをインストール

`npm i -D eslint-plugin-standard@4 eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@9 eslint-config-standard-with-typescript`

[eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript) を使用します。
インストールするパッケージが多いことはすでに議題に上がっているようなので、将来的には必要なパッケージは変更される可能性が高いと思います。

README にあるように .eslintrc.json の `parserOptions.project` に tsconfig のパスを指定します。
.eslintrc.json は以下のようになると思います。

eslintrc.js

`module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "standard-with-typescript",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        endOfLine: "lf",
        semi: false,
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2
      }
    ]
  }
}`

extends と parserOptions の部分を修正しました。

`parserOptions.project` で tsconfig を指定しただけでは以下のエラーが発生し検証が正常に行われません。

`Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: src/xxx.ts.
The file must be included in at least one of the projects provided.eslint`

`parserOptions.project` を指定した場合は tsconfigの `include` で指定したファイルのみ ESLint が適用されるようになるらしく、tsconfig を以下のように編集しました。

tsconfig.json

`{
  "compilerOptions": { ... },
  "include": [
    "src/**/*.ts",
    "src/**/*.js"
  ]
}`

設定の変更がエディターに反映されないときはこの段階で VSCode を再起動してください。
その後、JavaScript Standard Style の検証ルールが VSCode の保存時にも適用されていると設定完了です。

### const / let

JavaScript Standard Style ではなぜか var の変数宣言が許可されているようです。
個人的には現代の javascript に var は必要なく、全て const / let で置き換えるべきだと考えています。
var の使用を制限するために .eslintrc.json に [no-var](https://eslint.org/docs/rules/no-var) のルールを追加しました。
（なるべく JavaScript Standard Style のルールから変更は加えたくなかったのですが…）

eslintrc.js

`{
  ...
  rules: {
    "no-var": "error",
    "prettier/prettier": [
    ...
  ]
}`

# 最後に

保存するたびに var ↔ const / let の変換だったり、ヨーダ記法を自動で修正してくれたりと、開発環境が快適になりました。コミット時も ESLint のチェックが働くのでコードの防衛という意味でも活躍してくれそうです。これでコードレビューも安心して「コードレビューの本質」部分に注力できるようになるでしょう。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F62209%2Fda18d505-5264-ba0b-4d35-1c8eecb7926f.gif?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=a0632932c3048ec9e39da12ea2c5345a)

間違いや不要な箇所、もっと良い方法などありましたら、コメントなどで教えていただければ幸いです 👶👶