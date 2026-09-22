---
Created: 2021-01-15T18:01:00
URL: https://ginpen.com/2019/08/06/eslint-for-react-in-typescript/
Updated: 2021-01-15T18:01:00
Tags: [topic/技術/ビルドツール]
---
何もしないでそのままでも十分かもしれない。

### 先にまとめ

- 最近の `react-scripts` は ESLint を含んでいるので別途インストール不要
- 設定は `.eslintrc.js` を作成して `extends: ['react-app']` する
- Airbnb のルール設定を使う場合はもうちょい頑張る
- 元々 `create-react-app` してない場合も同じ

### Airbnb ルール利用時の手順概要

1. ESLint 初期化
2. ESLint の設定を更新
3. コードを recommended な状態へ対応

### 想定環境

- Node.js v10.16
- react-scripts v3.1
- TypeScript v3.5
- ESLint v6.1
- @typescript-eslint/eslint-plugin v1.13

## React アプリの準備

`create-react-app` でテンプレートから作成します。既に存在するなら省略。

- [Getting Started · Create React App](https://facebook.github.io/create-react-app/docs/getting-started)

`$ create-react-app my-greate-project --typescript --use-npm`

- `-typescript` で JS ではなく TS でファイル生成してくれます。

また `create-react-app` は標準で `yarn` を使います。`--use-npm` を設定すると `npm` になります。これはお好みで。

## ESLint の運用について

### ESLint は別途インストール不要

`react-scripts` の依存パッケージとして ESLint 等がインストールされます。実際コンソールでエラーや警告を目にしたこともあるでしょう。

というわけで特に作業は不要です。

### `react-scripts` 内部の ESLint は不可侵

reject とかは別にして、ターミナルやブラウザーのコンソールに出てくるアレは `react-scripts` 内部から実行されていて、外部から操作できません。変更は加えさせないという方針みたいです。

- [customize eslint rules (.eslintrc) · Issue #808 · facebook/create-react-app](https://github.com/facebook/create-react-app/issues/808)
- [reactjs – Disable ESLint that create-react-app provides – Stack Overflow](https://stackoverflow.com/questions/55821078/disable-eslint-that-create-react-app-provides)

ただし内部のものは最低限の警告を出すだけであって、特に害はないはずだ、というのが彼らの主張です。実際は CI （環境変数 `CI` が `true` の場合）に落ちるんだけどな！

ともあれ、自分のルールを利用するには別途自分用の `.eslintrc` を用意し二本立てで運用することになります。その場合、この既存の設定を踏襲したうえで用意すると良いでしょう。（後述する `extends` がそれ。）

### 単体で実行する場合は TS の拡張子を指定

ESLint はターミナルから単体で実行することも可能です。CI に組み込んでおくと良いかもね。

ただし、ESLint はそのまま実行すると JS ファイルだけを見に行きます。`--ext` で TS のファイルの拡張子 (extension) を見るよう指定します。

`$ npx eslint src/ --ext .ts,.tsx`

### NPM スクリプトに登録

長いコマンドを今後何度も打たなくて良いよう `package.json` に書いておきます。

`   "scripts": {
+    "lint": "eslint src --ext .ts,.tsx",
     "start": "react-scripts start",`

そしたら今後はこう。

`$ npm run lint`

もし自動修正 `--fix` をやりたい場合はこうです。

`$ npm run lint -- --fix`

## ESLint のルールをカスタマイズする

先に述べたように、`react-scripts` 内部の ESLint は変更できないので、別途用意することになります。ESLint の設定は `.eslintrc.js` というファイルで行います。他の選択肢もあるけど、たぶんこれが一番。

`react-scripts` 標準のルールセットは `eslint-config-react-app` というパッケージになっています。この標準のルールセットを踏襲しましょう。

というわけで、最初に用意すべき最小構成はこういう内容になります。

- `.eslintrc.js`

`module.exports = {
  extends: [
    'react-app',
  ],
  rules: {
  },
};`

`rules` 内に好みのルールを追加してください。

### 元のルールを知る

`create-react-app` のリポジトリーの、 `packages/eslint-config-react-app/index.js` がそれです。

- [https://github.com/facebook/create-react-app/blob/v3.1.1/packages/eslint-config-react-app/index.js](https://github.com/facebook/create-react-app/blob/v3.1.1/packages/eslint-config-react-app/index.js)

冒頭のコメントを引用、翻訳しておきます。

> Inspired by https://github.com/airbnb/javascript but less opinionated.We use eslint-loader so even warnings are very visible. This is why we only use “WARNING” level for potential errors, and we don’t use “ERROR” level at all.In the future, we might create a separate list of rules for production. It would probably be more strict.The ESLint browser environment defines all browser globals as valid, even though most people don’t know some of them exist (e.g. name or status). This is dangerous as it hides accidentally undefined variables. We blacklist the globals that we deem potentially confusing. To use them, explicitly reference them, e.g. window.name or window.status.

https://github.com/airbnb/javascript にインスパイアされつつもうちょいマイルドです。

`eslint-loader` を使用しているため、警告であっても非常に可視的です。そのため潜在的なエラーにも “WARNING” レベルを利用しており、”ERROR” レベルは全く利用していません。

将来的には本番環境用にまた別のルールリストを作成するかもしれません。そちらはより厳格になるはずです。

ESLint の `browser` 環境（訳者註：設定の `env` のこと）は全てのブラウザーグローバルを valid と定めており、それにはほとんどの方がその存在に気づいていないもの（例えば `name` や `status`）も含まれています。これは非常に危険であり、未定義の値を気づかないうちに隠蔽してしまう可能性があります。我々が潜在的に不確かであると判断したグローバルはブラックリストに登録しました。それらを利用する場合は明示的に参照してください。（例：`window.name`、`window.status`）

『警告であっても非常に可視的』の件は、”ERROR” レベルを利用するとリントエラーの際に（コンパイルエラー等と同様に）画面いっぱいにエラーが出てくるようになるのがアレだって話です。

最後の紛らわしいやつらブラックリストはこちら。

- [https://github.com/facebook/create-react-app/blob/v3.1.1/packages/confusing-browser-globals/index.js](https://github.com/facebook/create-react-app/blob/v3.1.1/packages/confusing-browser-globals/index.js)

## ESLint 設定を初期化

Airbnb のやつがたぶん今一番人気のあるルールセットかなと思うんですが、こちらを利用する場合は、`react-scripts` は忘れて ESLint の初期化機能を使うのが良いかなと思います。

`yarn` の場合は 2 手間かかります。

### npm の場合

`eslint --init` で、対話形式で初期設定をします。

`$ npx eslint --init
? How would you like to use ESLint?
❯ To check syntax, find problems, and enforce code style

? What type of modules does your project use?
❯ JavaScript modules (import/export)

? Which framework does your project use?
❯ React

? Where does your code run?
❯ Browser

? How would you like to define a style for your project?
❯ Use a popular style guide

? Which style guide do you want to follow?
❯ Airbnb (https://github.com/airbnb/javascript)

? What format do you want your config file to be in?
❯ JavaScript

? Would you like to install them now with npm?
❯ Yes
...`

これで `package.json` やロックファイルが更新され、`.eslintrc.js` が生成される。

（もう一度言うけど、`yarn` の人は `yarn install` をお忘れなく。`npm` の人は大丈夫。）

このタイミングでいったん `git add` しちゃうのお勧めします。今後はこの自動生成されたファイルを手動で更新していくので。

### yarn の場合

`npm` ではなく `yarn` でやっている方は、事前に Airbnb ルールをインストールするのと、対話中の `npm` 利用を断るのとの 2 手間が変わります。

`eslint-config-airbnb` をインストールするのは、こう。

`$ yarn add eslint-config-airbnb`

この後に `npm` の方と同じく `eslint --init` で生成します。前項参照。ただし、最後の “Would you like to install them now with npm?” は “No” にしてください。

“Yes” にすると `npm install` が始まってしまいます。やっちゃった場合は `Ctrl-C` でキャンセルするか、間に合わなければ `package-lock.json` を削除しといてください。なおその後の `yarn install` は特に不要です。どうやら他に必要なものは揃っているようなので。

## ESLint の設定を更新

`eslint --init` で生成された `.eslintrc.js` に設定を足す。（途中の `@@ -20,6 +22,26 @@` は中略のことと思ってください。）

`diff --git a/.eslintrc.js b/.eslintrc.js
@@ -2,9 +2,11 @@ module.exports = {
   env: {
     browser: true,
     es6: true,
+    jest: true,
   },
   extends: [
     'airbnb',
+    'plugin:@typescript-eslint/recommended',
   ],
   globals: {
     Atomics: 'readonly',
@@ -20,6 +22,26 @@ module.exports = {
   plugins: [
     'react',
   ],
+  settings: {
+    'import/resolver': {
+      node: {
+        extensions: ['.js', '.jsx', '.ts', '.tsx'],
+      },
+    },
+  },
   rules: {
+    '@typescript-eslint/indent': [
+      'error',
+      2,
+    ],
+    '@typescript-eslint/prefer-interface': 'off',
+    'react/jsx-filename-extension': [
+      'error',
+      { extensions: ['.jsx', '.tsx'] },
+    ],
+    'react/prop-types': 'off',
+    'spaced-comment': [
+      'error',
+      'always',
+      { markers: ['/ <reference'] },
+    ],
   },
};`

TS と JS とを混在させているプロジェクトの場合、`'react/prop-types': 'off',` は `overrides` の方に書くと良いでしょう。詳細は ESLint のサイトで。

## 初期状態から recommended な状態へ対応

頑張ってぽちぽち直していきましょう。特に `serviceWorker.ts` は大量に出てきてビビるんだけど、実はエラーの種類は多くないので、落ち着いてやれば大丈夫です。

### `src/App.tsx`

例としてこいつだけ修正内容を載せておきます。元の状態は `create-react-app` で生成した直後のやつです。

`diff --git a/src/App.tsx b/src/App.tsx
@@ -1,14 +1,19 @@
-import React from 'react';
+import React, { ReactElement } from 'react';
 import logo from './logo.svg';
 import './App.css';
 
-const App: React.FC = () => {
+// eslint-disable-next-line arrow-body-style
+const App: React.FC = (): ReactElement => {
   return (
     <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
-          Edit <code>src/App.tsx</code> and save to reload.
+          Edit
+          {' '}
+          <code>src/App.tsx</code>
+          {' '}
+          and save to reload.
         </p>
         <a
           className="App-link"
@@ -21,6 +26,6 @@
       </header>
     </div>
   );
-}
+};
 
 export default App;`

`arrow-body-style` は、今後開発を進めたらきっと `{}` が必要になるので、一時的に無効化しています。必要ないならいいです。

## ESLint のエラーと対処

今回の作業で出会うかもしれないエラーです。

### No files matching ‘src’ were found.

検証対象のファイルがひとつもない。（対象外のファイルはあるかもしれない。）

ESLint はそのままでは JS ファイルだけを探すので、「NPM スクリプト準備」の項でやったように `--ext` で TS の拡張子を設定してやる。

### Unable to resolve path to module ‘./App’. (import/no-unresolved)

`import` しているファイルが見つからない。

ESLint はそのままでは JS ファイルだけを探すので、「ESLint の設定を更新」の項でやったように `settings['import/resolver'].node.extensions` で TS の拡張子を設定してやる。

ちなみに `./App.tsx` のようにした場合は TS のコンパイラーに怒られる。

> An import path cannot end with a ‘.tsx’ extension. Consider importing ‘./App’ instead.
ts(2691)

### JSX not allowed in files with extension ‘.tsx’ (react/jsx-filename-extension)

JSX の記法が、許可されていない拡張子のファイルで利用されている。

`.jsx` じゃないと使えないようになっているので、`.tsx` も許可する。「ESLint の設定を更新」を参照。

よくわかんないけどこれ recommended に入らないかな。

### Missing return type on function. (@typescript-eslint/explicit-function-return-type)

関数の戻り値が明示されていない。

なくても TS として正しいけれど、’plugin:@typescript-eslint/recommended’ は明示を推奨している。

`React.FC` 戻り値は `ReactElement` 。「初期状態から recommended な状態へ対応」を参照。

他はだいたい `() => …` を `(): void => …` にすれば解決する。そうでないものはちゃんと実装されている戻り値を確認しよう。

### Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`. (arrow-body-style)

アロー関数で `return` を省略可能なのにされていない。

`() => { return 123; }` を `() => 123` にする。

`App` のやつは、開発を進めたらきっと `{}` が必要になるので一時的に無効化しておけば良いかなと思う。「初期状態から recommended な状態へ対応」を参照。

### Expected exception block, space or tab after ‘//’ in comment. (spaced-comment)

行コメント開始の記号 `//` の直後に空白が置かれていない。

ただ TS では Triple-Slash Directives ↓というのがあって、`///` を使ってコンパイラーへ指示 (*directive*) を与えることができる

- [Triple-Slash Directives · TypeScript](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html)

具体的には `src/react-app-env.d.ts` がそれです。

`/// <reference types="react-scripts" />`

この `///` がこのルールと衝突するので、例外として設定してやる必要がある。「ESLint の設定を更新」を参照。

### ‘checkValidServiceWorker’ was used before it was defined. (@typescript-eslint/no-use-before-define)

関数等が定義より先に利用されている。

順序を変えるか、オフにしちゃっても良いかも。

### Assignment to property of function parameter ‘registration’. (no-param-reassign)

受け取った引数（あるいはそのプロパティ）を上書きしている。

`serviceWorker.ts` の場合は特に問題ないので、その行は無視する。

`+      // eslint-disable-next-line no-param-reassign
       registration.onupdatefound = (): void => {`

### Use an interface instead of a type literal. (@typescript-eslint/prefer-interface)

`type` より `interface` を使おうってやつ。

設定でオフにしちゃおう。「ESLint の設定を更新」を参照。

というのも、「別に `type` でよくね？　むしろ `type` の方がよくね？」というのがどうやら最近の流れなので。実際 `@typescript-eslint/eslint-plugin` の次のメジャーバージョン v2 では recommended から外れるようです。

> typeよりinterface使おうぜルールはv2でrecommendedから抜けるっぽい。https://t.co/Oxa45JU0Kp— 高梨ギンペイ (@ginpei_jp) July 31, 2019

### Unexpected console statement. (no-console)

デバッグ用コードである `console.log()` 等が残っている。

故意に残す場合、その行を無視する。

`+// eslint-disable-next-line no-console
 console.log('Here');`

`serviceWorker.ts` の場合は全体的に出していきたい感じ？っぽいので、ファイル全体を無効化することにする。

`+/* eslint-disable no-console */`

### ‘xxx’ is missing in props validation (react/prop-types)

- [eslint-plugin-react/prop-types.md at master · yannickcr/eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)

React の `props` の検証が行われていない。

TS プロジェクトの場合はコンパイラーが静的に検証してくれるので、オフにする。「ESLint の設定を更新」を参照。

### An error occurred while generating your JavaScript config file.

ESLingの設定ファイル生成に失敗した。

`npm` ではなく `yarn` を使う場合、`eslint --init` より先にAirbnbの設定をインストールしておく必要があるようです。「ESLint の設定を更新」を参照。

エラー詳細はこちら。

```plain text
An error occurred while generating your JavaScript config file. A config file was still generated, but the config file itself may not follow your linting rules.
Error: Failed to load config "airbnb" to extend from.
Referenced from: BaseConfig
Error: An error occurred while generating your JavaScript config file. A config file was still generated, but the config file itself may not follow your linting rules.
Error: Failed to load config "airbnb" to extend from.
Referenced from: BaseConfig
    at configMissingError (/path/to/project/node_modules/eslint/lib/cli-engine/config-array-factory.js:233:9)
…

```

## おまけ：VS Code のプラグイン設定

ESLint を CLI から毎回実行するより、エディター上で確認して対応していく方が楽です。

VS Code の場合はプラグイン導入で実現できます。

- [ESLint – Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

TypeScript に対応させるには設定が必要です。VS Code の設定 JSON ファイルを開いて（`Ctrl + ,` → 右上 “{}” ボタン）、こんな設定。

`{
…
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {"language": "typescript", "autoFix": true },
        {"language": "typescriptreact", "autoFix": true }
    ],
…`

“autoFix” はファイル保存時に自動で修正（できる場合に）してくれる機能です。好みだけども ON にしとくと良いと思います。TS の場合はこう↑書いておかないと利かない。

## [解決済み] TypeScript が新しすぎる警告

（2019/08/11 追記）最新版で解決済み。

こんなん~~言われる~~言われていた。

> WARNING: You are currently running a version of TypeScript which is not officially supported by typescript-estree.You may find that it works just fine, or you may not.SUPPORTED TYPESCRIPT VERSIONS: >=3.2.1 <3.5.0YOUR TYPESCRIPT VERSION: 3.5.3Please only submit bug reports when using the officially supported version.

よくわからない。既に解決済みのようだけど。

- [Officially support Typescript 3.5.x · Issue #577 · typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/issues/577)

> The update was merged on 6 Jun as you can see above, and it was released to the latest tag on npm on the 9th of June: https://github.com/typescript-eslint/typescript-eslint/releases/tag/v1.10.1

使ってるのは v1.13 なんだけどなあ。

## おわり

linter は早めに入れるのがお得です。

### 更新履歴

- 2019/10/25
- `CI=true` について言及
- 2019/10/17
- `react-scripts` 内部の ESLint について言及
- 2019/08/31
- yarn 用の ESLint 導入手順が不足だったのを修正
- 2019/08/18
- `eslint-config-react-app` を利用する方法を追加
- 上記に合わせ記事タイトルを変更
- 同じく全体の構成を変更
- 2019/08/11
- ESLint 及び @typescript-eslint/eslint-plugin のインストール作業を削除し、代わりに不要である旨記述
- `plugin:react/recommended` を削除
- 不要な TypeScript 系の設定を `.eslintrc.js` から削除
- `react-scripts` を v6.0 から v6.1 へ更新
- 不要になった `@typescript-eslint/prefer-interface` を削除
- 「TypeScript が新しすぎる警告」が最新版で解決済みである旨記述
- react/prop-types の対処を追加
- 2019/08/06

### 参考

- [@typescript-eslint ことはじめ – teppeis blog](https://teppeis.hatenablog.com/entry/2019/02/typescript-eslint)
- [vscode上でtypescriptのeslintを有効にする – Qiita](https://qiita.com/Naturalclar/items/21ca036339f8ef48e777)
- [[no-unused-vars] does not count JSX as usage · Issue #111 · typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/issues/111)
- [Using eslint with typescript – Unable to resolve path to module – Stack Overflow](https://stackoverflow.com/questions/55198502/using-eslint-with-typescript-unable-to-resolve-path-to-module)
- [Officially support Typescript 3.5.x · Issue #577 · typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/issues/577)
- [Support or ignore prop-types in mixed JS/TypeScript projects · Issue #1461 · yannickcr/eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react/issues/1461)
- [customize eslint rules (.eslintrc) · Issue #808 · facebook/create-react-app](https://github.com/facebook/create-react-app/issues/808)
- [reactjs – Disable ESLint that create-react-app provides – Stack Overflow](https://stackoverflow.com/questions/55821078/disable-eslint-that-create-react-app-provides)