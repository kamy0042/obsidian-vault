---
Created: 2021-01-15T18:01:00
URL: https://qiita.com/howdy39/items/6e2c75861bc5a14b2acf
Updated: 2021-01-15T18:01:00
Tags: [topic/技術/ビルドツール]
---
[ESLint](http://eslint.org/)はJavaScriptを静的に検証するツールです。
わかりやすく言えば、チームメンバー間で統一された美しいコードを生成するためのツールです。
設定ファイルを書いておけば自動で変換することも可能です。

# ESLintを始めよう！

JavaScriptのLintツールには[jslint](http://www.jslint.com/), [jshint](http://jshint.com/), [JSCS](http://jscs.info/)などがあります。
2016/11 時点で npm trendsで比較した結果が以下の画像です。[http://www.npmtrends.com/jslint-vs-jshint-vs-jscs-vs-eslint](http://www.npmtrends.com/jslint-vs-jshint-vs-jscs-vs-eslint)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35595%2Fdc6f9da0-5806-301f-5c6c-c3f3efc928d9.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=e0fa6be6394e2c399b3f39b4bff95c7d)

半年前は`jshint`と並んでいましたが、わずか半年の間にダブルスコアをつけています。`jshint`は開発が鈍化しています。
また`JSCS`の開発チームは`ESlint`に移行することを決めました。
以下に記載した有名ライブラリは開発時にESLintを使っています。

- [jQuery](https://github.com/jquery/jquery)
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reactjs/redux)
- [Vue.js](https://github.com/vuejs/vue)
- [backbone](https://github.com/jashkenas/backbone)
- [Webpack](https://github.com/webpack/webpack)
- [Grunt](https://github.com/gruntjs/grunt)
- [gulp](https://github.com/gulpjs/gulp)

ESLintはJavaScript界のLintのデファクトスタンダードになりつつあります。

ESLintは`Node.js`と`npm`だけあれば実行できます。`**Grunt**`**も**`**gulp**`**も**`**webpack**`**も難解な設定も必要ありません。**

本記事はESLintの入門者向けに、Step by Stepのチュートリアル形式で書きました。
ESLint導入のお役に立てれば幸いです。

2020/01/22 追記
結構参照されてるので追記します
現在はESLint1強です。3年で10倍ぐらいのスコアになりましたね…すごい。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35595%2Fbf693e1c-0a29-3fc2-033d-314e829c9426.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=210489b71607b8f6f471992c1d4066de)

# 前提

Node.js,npmが導入済みであること

## 環境

以下のバージョンで確認

ライブラリ
バージョン




Node.js
6.5.0


npm
3.10.3


ESlint
3.10.2

# 流れ

Step
内容




Step 1
準備


Step 2
ESLintの実行


Step 3
ルールの記述方法


Step 4
オプションのないルールを追加


Step 5
文字列オプションがあるルールを追加


Step 6
オブジェクトオプションがあるルールを追加


Step 7
fixオプション


Step 8
globalsプロパティ


Step 9
envプロパティ


Step 10
extendsプロパティ


Step 11
設定の上書き


Step 12
lint対象を複数指定


Step 13
parserOptionsプロパティ

※[Step 13 終了時のコード](https://github.com/howdy39/step-by-step-eslint)をおいておきます。

Tips




エディターとESLintをリンクさせよう


ルールの探し方


Formatters


rootプロパティ

# Step 1 準備

プロジェクトフォルダと検証用のjsファイルを作りましょう。
以下のような構成です。

構成

`  myproject
  └── src
      ├── index.html
      ├── lib
      │   └── jquery-3.1.1.min.js
      └── script.js`

プロジェクトフォルダは自分で好きなとこに作ってください。
srcの中身は以下のzipをダウンロードしてください。[https://github.com/howdy39/step-by-step-eslint/archive/init.zip](https://github.com/howdy39/step-by-step-eslint/archive/init.zip)

index.html

`<!DOCTYPE HTML>
<html>
<body>
  <button id="alert">alertボタン</button>

  <script src="lib/jquery-3.1.1.min.js"></script>
  <script src="script.js"></script>
</body>
</html>`

script.js

`document.getElementById('alert').addEventListener('click', function (){
  alert("document.getElementByIdのalert");
});;

$('\#alert').on('click', function () {
  console.log('jQueryのalert');
  alert('jQueryのalert');
});`

## package.jsonの作成

`npm init`でpackage.jsonを作成します。

package.jsonの作成

`npm init -y`

- `y`をつけることで質問にyesで答えたことにしています。

## ESLintのインストール

プロジェクトフォルダ上で以下のコマンドを叩きます。

ESlintのインストール

`npm install --save-dev eslint`

- `-save-dev`は開発時に必要なモジュールということです。

## ここまでで以下のような構成になります

構成

`  myproject
+ ├── node_modules
+ │   ...長いので省略
+ │
+ ├── package.json
  └── src
      ├── index.html
      ├── lib
      │   └── jquery-3.1.1.min.js
      └── script.js`

# Step 2 ESLintの実行

設定ファイルを作ってからESLintを実行します。

## 設定ファイルの種類について

以下の4種類の記述方法があります。

記述方法
ファイル
メリット




JavaScript
.eslintrc.js
プログラマブルに記述可能


YAML
.eslintrc.yaml or .eslintrc.yml
記述量が少ない


JSON
.eslintrc.json
一般的


JSON
package.json
設定ファイルを増やさずに済む

※メリットは筆者の感想です。
※eslintrc.jsonはJSON形式ですがコメントが書けます。

他の記事やOSSなどで`.eslintrc`というファイルを見たことがあるかもしれません。
JSONやYAMLで記述可能なファイルですが **現在は非推奨** です。

## 設定ファイルを手動で作る

本記事では`.eslintrc.json`を採用します。

プロジェクトフォルダ直下に`.eslintrc.json`を作りましょう。
中身は`{}`だけでOKです。

.eslintrc.json

`{}`

## ESLintの実行

ESLintを実行してみましょう。
対象はsrcディレクトリ配下のscript.jsです。

ESLintの実行

`./node_modules/.bin/eslint src/script.js`

実行してもエラーどころか何も表示されずに終了します。**ESLintは初期状態ではチェックをしてくれません。****チェックルールを追加していく必要があります。**

## package.jsonにESLintの実行コマンドを書く

毎回`./node_modules/.bin/eslint`と書くのは面倒です。
package.jsonを開いて`"scripts"`に`lint`を新しく定義します。

package.json

`  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "test": "echo \"Error: no test specified\" && exit 1",
+   "lint": "eslint src/script.js"
  },`

※package.jsonに書く場合、`./node_modules/.bin/`は省略可能です。

以下のコマンドを実行して先ほどと同じように何もおきないことを確認して下さい。

ESLintの実行

`npm run lint

> eslint src/script.js`

## ここまでで以下のような構成になります

構成

`  myproject
+ ├── .eslintrc.json
  ├── node_modules
  │   ...長いので省略
  │
  ├── package.json
  └── src
      ├── index.html
      ├── lib
      │   └── jquery-3.1.1.min.js
      └── script.js`

# Step 3 ルールの記述方法

ルールは設定ファイルの`"rules"`プロパティに登録します。

.eslintrc.json

`{
  "rules": {
    "ルール名": "ルール設定"
  }
}`

## ルール設定の記述方法

`"ルール設定"`は以下のように指定します。

設定
省略形
意味




"off"
0
チェックをしません


"warn"
1
ルールに違反すると

**警告**

を出します


"error"
2
ルールに違反すると

**エラー**

にします

「初期状態では何もしないのに`"off"`って必要？」と思ったかもしれません。
これは後で出て来るので一旦無視してください。

## オプション付きルール設定の記述方法

オプションがある場合、配列でルール設定の後に記述します。
オプションには文字列が入る場合もあれば、オブジェクトが入る場合もあります。

.eslintrc.json

`{
  "rules": {
    "文字列オプションありのルール": ["ルール設定", "オプション"],
    "オブジェクトオプションありのルール": ["ルール設定", {"オプションキー": "オプションバリュー"}]
  }
}`

# Step 4 オプションのないルールを追加

## [no-extra-semi](http://eslint.org/docs/rules/no-extra-semi)ルールを追加

`no-extra-semi`は不要なセミコロンを探すためのルールです。

設定ファイルを以下のように修正しESLintを実行します。

.eslintrc.json

`{
  "rules": {
    "no-extra-semi": "warn"
  }
}`

ESLintの実行

`npm run lint

/プロジェクトフォルダ/src/script.js
  4:4  warning  Unnecessary semicolon  no-extra-semi

✖ 1 problem (0 errors, 1 warning)`

4行目の4文字目に不要なセミコロンがある、と警告を出しています。

修正後に再実行して警告が消えることを確認してください。

script.js

`document.getElementById('alert').addEventListener('click', function (){
  alert("document.getElementByIdのalert");
- });;
+ });

$('\#alert').on('click', function () {
  console.log('jQueryのalert');
  alert('jQueryのalert');
});`

# Step 5 文字列オプションがあるルールを追加

## [quotes](http://eslint.org/docs/rules/quotes)ルールを追加

`quotes`は文字列の指定をダブルクォート`"`にするか、シングルクォート`'`にするかを決めるルールです。

シングルクォートにする`"single"`を指定してESLintを実行します。

.eslint.json

`{
  "rules": {
-   "no-extra-semi": "warn"
+   "no-extra-semi": "warn",
+   "quotes": ["warn", "single"]        
  }
}`

ESLintの実行

`npm run lint

/プロジェクトフォルダ/src/script.js
  3:9  warning  Strings must use singlequote  quotes

✖ 1 problem (0 errors, 1 warning)`

3行目の9文字目がシングルクウォートになっていない、と警告を出しています。

修正後に再実行して警告が消えることを確認してください。

script.js

`document.getElementById('alert').addEventListener('click', function (){
- alert("document.getElementByIdのalert");
+ alert('document.getElementByIdのalert');
});

$('\#alert').on('click', function () {
  console.log('jQueryのalert');
  alert('jQueryのalert');
});`

# Step 6 オブジェクトオプションがあるルールを追加

## [space-before-blocks](http://eslint.org/docs/rules/space-before-blocks)ルールを追加

`space-before-blocks`はブロックの開始、つまり`{`の前にスペースを入れるかどうかを決めるルールです。

オプションがオブジェクトのため少し複雑です。`space-before-blocks`には3つのオプションのキーがあります。

- functions
- keywords
- classes

コードとの対応は以下のようになります。

`if (a) { // keywords
  b();
}

var a = function() {} // functions

class Foo { // classes
  constructor() {} // functions
}`

またそれぞれのオプションの値に以下のいずれかを設定します。

- always：スペースがあること
- never：スペースがないこと

では「functionの前にスペースがあること」を追加してESLintを実行します。

.eslint.json

`{
  "rules": {
    "no-extra-semi": "warn",
-   "quotes": ["warn", "single"]
+   "quotes": ["warn", "single"],
+   "space-before-blocks": ["warn", { "functions": "always" }] 
  }
}`

ESLintの実行

`npm run lint

/プロジェクトフォルダ/src/script.js
  2:71  warning  Missing space before opening brace  space-before-blocks

✖ 1 problem (0 errors, 1 warning)`

2行目の71文字目にスペースが入っていない、と警告を出しています。

修正後に再実行して警告が消えることを確認してください。

script.js

- `document.getElementById('alert').addEventListener('click', function (){
+ document.getElementById('alert').addEventListener('click', function () { alert('document.getElementByIdのalert');
});
$('\#alert').on('click', function () { console.log('jQueryのalert'); alert('jQueryのalert');
});`

# Step 7 fixオプション

今までは警告が出たら手動でなおすという作業をしていましたが、ESLintが自動でやってくれる便利な機能があります。
それが`--fix`オプションです。

package.jsonのeslint実行コマンドに`--fix`を追加します。

package.json

`  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
-   "lint": "eslint src/script.js"
+   "lint": "eslint src/script.js --fix"
  },`

ここで今までにscripts.jsを最初の状態に戻して再度実行します。

script.jsを戻す

`document.getElementById('alert').addEventListener('click', function (){
  alert("document.getElementByIdのalert");
});;

$('\#alert').on('click', function () {
  console.log('jQueryのalert');
  alert('jQueryのalert');
});`

警告がでずに正常終了しファイルが書き換えられていることが確認してください。

自動で変換したscripts.js

- `document.getElementById('alert').addEventListener('click', function (){
+ document.getElementById('alert').addEventListener('click', function () {
- alert("document.getElementByIdのalert");
+ alert('document.getElementByIdのalert');
- });;
+ });
$('\#alert').on('click', function () { console.log('jQueryのalert'); alert('jQueryのalert');
});`

## 自動変換されるルール

注意点としてfixオプションで全てのルールが自動変換されるわけではありません。

[ESLintのルールの一覧ページ](http://eslint.org/docs/rules/)を見てみましょう。
ルールの一覧が並んでいます、そこにレンチのアイコンがついてるルールがあります。
これがfixオプション指定時に自動で直してくれるルールです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35595%2Ffb635855-8a38-b7e7-11ff-f4dc2a727959.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=410024a1a1a3a8bf33b141ac3e510fbd)

# Step 8 globalsプロパティ

globalsプロパティについて解説する前に一つルールを追加します。

## [no-undef](http://eslint.org/docs/rules/no-undef)ルールを追加

`no-undef`は未定義の変数を探すためのルールです。

設定ファイルを以下のように修正しESLintを実行します。

eslint.json

`{
  "rules": {
-   "no-extra-semi": "warn"
+   "no-extra-semi": "warn",
+   "no-undef": "warn",
    "quotes": ["warn", "single"],
    "space-before-blocks": ["warn", { "functions": "always" }]
  }
}`

ESLintの実行

`npm run lint

/プロジェクトフォルダ/src/script.js
  2:1  warning  'document' is not defined  no-undef
  3:3  warning  'alert' is not defined     no-undef
  6:1  warning  '$' is not defined         no-undef
  7:3  warning  'console' is not defined   no-undef
  8:3  warning  'alert' is not defined     no-undef

✖ 5 problems (0 errors, 5 warnings)`

`document`, `alert`, `$`, `console`が未定義です、と警告を出しています。

このJavaScriptはブラウザで実行するのが前提ですし、htmlではjQueryを読み込んでいるため問題がないコードです。
しかしESlintはLint対象のscript.jsしか見ていません。
ESLintに **これはグローバルに存在する変数（関数）ですよ** と教えてあげる必要があります。
それがglobalsプロパティです。

## globalsプロパティの記述方法

設定ファイルの`"globals"`キーに登録します。

.eslintrc.json

`{
  "globals": {
    "変数名": true or false(書き換え可能かどうか)
  }
}`

## globalsプロパティを追加

globalプロパティに`alert`, `document`, `$`, `console`を追加します。
これらは書き換えるものではないので`false`を指定します。

.eslintrc.json

`{
+ "globals": {
+   "alert": false,
+   "document": false,
+   "$": false,
+   "console": false
+ },
  "rules": {
    "no-extra-semi": "warn",
    "no-undef": "warn",
    "quotes": ["warn", "single"],
    "space-before-blocks": ["warn", { "functions": "always" }]
  }
}`

修正後に再実行して警告が消えることを確認してください。

## ポイント

`globals`プロパティへの設定は以下の２点です。

- グローバルにその名前の変数（関数）が存在していること
- 書き換え不可（または可）ということ

先程の例で書き換え不可だから`false`を設定、と書きました。
しかし **書き換えをNGにするルールを設定していない** ので`false`を設定してもチェックはしてくれません。

書き換えNGをチェックするには[no-global-assign](http://eslint.org/docs/rules/no-global-assign)ルールを使用します。

つまり`globals`プロパティは`no-undef`, `no-global-assign`とセットで使うものということです。

# Step 9 envプロパティ

browserにはたくさんのグローバル変数（関数）がセットされています。これをひとつずつ設定するのは大変です。`env`プロパティは`globals`プロパティを一括で定義するのに利用できます。

## envプロパティの記述方法

.eslintrc.json

`{
  "env": {
    "環境名": true or false(有効にするかどうか)
  }
}`

使用できるenvプロパティの種類は[Specifying Environments](http://eslint.org/docs/user-guide/configuring#specifying-environments)を参照してください。

### 注意点

globalsプロパティは上書き可能かどうかのtrue/falseでしたが、 **envプロパティはenvの設定を有効にするかどうかのtrue/false** です。

では上書き可能かどうかのtrue/falseはどうなるのかというと、`globals`という別のnpmモジュールから取得しています。[https://github.com/sindresorhus/globals/blob/master/globals.json](https://github.com/sindresorhus/globals/blob/master/globals.json)

## envにbrowserを追加

ブラウザ環境にあるグローバル変数を定義してあるのが`browser`です。
以下のページで`browser`内に`alert`,`document`,`console`の定義されていることが確認できます。

[globals.alert](https://github.com/sindresorhus/globals/blob/master/globals.json#L164)[globals.document](https://github.com/sindresorhus/globals/blob/master/globals.json#L255)[globals.console](https://github.com/sindresorhus/globals/blob/master/globals.json#L218)

設定ファイルに`env`プロパティとその中に`browser`で`true（env設定を有効）`を追加します。
また`globals`プロパティから`alert`,`document`,`console`を消します。

eslintrc.json

`{
+ "env": {
+   "browser": true
+ },
  "globals": {
-   "alert": false,
-   "document": false,
-   "$": false,
+   "$": false
-   "console": false
  },
  "rules": {
    "no-extra-semi": "warn",
    "no-undef": "warn",
    "quotes": ["warn", "single"],
    "space-before-blocks": ["warn", { "functions": "always" }]
  }
}`

修正後に再実行して警告がでないことを確認してください。

## envにjQueryを追加

envプロパティはbrowserのような実行環境だけなく`jQuery`のようなメジャーなライブラリ環境もサポートしています。

設定ファイルの`env`プロパティに`jquery`を`true（有効）`を追加します。
また`globals`プロパティから`$`を消します。

eslintrc.json

`{
  "env": {
-   "browser": true
+   "browser": true,
+   "jquery": true
  },
  "globals": {
-   "$": false
  },
  "rules": {
    "no-extra-semi": "warn",
    "no-undef": "warn",
    "quotes": ["warn", "single"],
    "space-before-blocks": ["warn", { "functions": "always" }]
  }
}`

修正後に再実行して警告がでないことを確認してください。

## envとglobalsの使い分け

envを基本にして、envになかったらglobalsに自分で定義するでよいと思います。

# Step 10 extendsプロパティ

ESLintにはルールが200以上あるためひとつずつ設定するのは大変です。

extendsプロパティを使うことでESLintおすすめのルールを読み込むことができます。

[ESLintのルールの一覧ページ](http://eslint.org/docs/rules/)を見てみましょう。
ルールの一覧が並んでいますがチェックマークのアイコンがついてるルールがあります。
これがESLintおすすめのルールです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35595%2F61cc9860-9d1b-8e88-fe67-20c1446351a9.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=831059cc81cdd154fda6ce8afd07adeb)

## eslint:recommendedを追加

ではおすすめ設定を追加してみましょう。

設定ファイルに`extends`プロパティを追加し、値に`"eslint:recommended"`を追加します。

eslintrc.json

`{
  "env": {
    "browser": true,
    "jquery": true
  },
+ "extends": "eslint:recommended",
  "globals": {
  },
  "rules": {
    "no-extra-semi": "warn",
    "no-undef": "warn",
    "quotes": ["warn", "single"],
    "space-before-blocks": ["warn", { "functions": "always" }]
  }
}`

ではESLintを実行してみましょう。

ESLintの実行

`npm run lint

/プロジェクトフォルダ/src/script.js
  7:3  error  Unexpected console statement  no-console

✖ 1 problem (1 error, 0 warnings)`

`console`が入ってます、とエラーを出しています。

これは[no-console](http://eslint.org/docs/rules/no-console)ルールがおすすめ設定に入っているためです。また`"warn"`ではなく`"error"`で設定されていることがわかります。

今回はconsoleがあっても良いこととして扱います。
そのため`no-console`を"off"で上書きします。

eslintrc.json

`{
  "env": {
    "browser": true,
    "jquery": true
  },
  "extends": "eslint:recommended",
  "globals": {
  },
  "rules": {
+   "no-console": "off",
    "no-extra-semi": "warn",
    "no-undef": "warn",
    "quotes": ["warn", "single"],
    "space-before-blocks": ["warn", { "functions": "always" }]
  }
}`

修正後に再実行してエラーが消えることを確認してください。

# Step 11 設定の上書き

前Stepではextendsプロパティの設定をrulesプロパティで上書きしました。
その他にも上書きする方法があります。

## 設定ファイルを追加する

今まで設定ファイルはプロジェクト直下の`.eslintrc.json`を使っていました。
これはディレクトリ単位で設定が可能です。

`src`ディレクトリに`.eslintrc.json`を作ってください。
設定内容は`no-console`を`"warn"`です。

src/.eslintrc.json

`{
  "rules": {
    "no-console": "warn"
  }
}`

再実行して **警告** になることを確認してください。

ESLintの実行

`npm run lint

/プロジェクトフォルダ/src/script.js
  7:3  warning  Unexpected console statement  no-console

✖ 1 problem (0 errors, 1 warning)`

`no-console`は以下のように`"error"`->`"off"`->`"warn"`と上書きされたことがわかります。

1. `"error"` / プロジェクト直下の`.eslintrc.json`の`"extends": "eslint:recommended"`
2. `"off"` / プロジェクト直下の`.eslintrc.json`の`"rules"`
3. `"warn"` / script.jsと同じ階層にある`.eslintrc.json`の`"rules"`

### 使用事例

この設定ファイルを使った上書き設定はテストディレクトリがあるときによく使われます。

以下はESLintプロジェクトのテストディレクトリの設定事例です。

.eslintrc.yml

`env:
  mocha: true`

単体テストライブラリである`mocha`を`env`プロパティに突っ込んでいるのがわかります。
このように設定ファイル分けることで **テストコードではないJavaScriptファイルに**`**mocha**`**特有のグローバル変数が入ってしまった場合、エラーにすることができます。**

## ルールをファイルに直接書く

設定ファイル追加する以外にもLint対象のファイルに直接書く方法があります。

先程追加したファイルで`no-console`を`warn`にしてしまいました。
今度は対象ファイルに直接書いて`off`にしてみましょう。

以下のようにコメント文で書くことができます。`/*eslint no-console: "off"*/`

script.js

`+ /*eslint no-console: "off"*/
document.getElementById('alert').addEventListener('click', function () {
  alert('document.getElementByIdのalert');
});

$('\#alert').on('click',function () {
  console.log('jQueryのalert');
  alert('jQueryのalert');
});`

修正後に再実行して警告が消えることを確認してください。

## ルールの上書きのまとめ

優先順位的には以下のようになります。

4. Lint対象ファイル
5. Lint対象ファイルと同階層にある設定ファイルの`rules`
6. Lint対象ファイルの同階層にある設定ファイルの`extends`
7. Lint対象ファイルの親階層にある設定ファイルの`rules`
8. Lint対象ファイルの親階層にある設定ファイルの`extends`

# Step 12 lint対象を複数指定

今までは一つのファイルに対してESLintを実行していました。
ですが実際のプロジェクトでは複数ファイルが必要です。
本StepではLint対象ファイルの指定方法を解説します。

## フォルダやglob形式で指定

ESLintではファイルだけでなくフォルダや[glob形式](https://www.npmjs.com/package/glob#glob-primer)で指定することが可能です。

`src`フォルダを指定してみましょう。`package.json`を開いて実行コマンドを変更します。

package.json

`{
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
-   "lint": "eslint src/script.js --fix"
+   "lint": "eslint src --fix" 
  },
...`

修正後に再実行してみましょう。

ESLintの実行

`npm run lint


/プロジェクトフォルダ/src/lib/jquery-3.1.1.min.js
  2:72     warning  'module' is not defined                                                                                              no-undef
  2:87     warning  'module' is not defined      
... 省略
✖ 47 problems (41 errors, 6 warnings)
... 省略`

srcディレクトリにはjQueryのライブラリが入っていたため、jQueryのコードで大量に警告やエラーがでてしまいました。
このような場合は除外設定をするのが簡単です。

## .eslintignore

`.eslintignore`ファイルはESLintの対象外を指定することが可能です。
gitの除外対象を設定する`.gitignore`のESLint版ですね。

プロジェクトディレクトリに`.eslintignore`ファイルを作ります。`/src/lib/**`を指定してjQueryのJavaScriptを除外します。

.eslintignore

`/src/lib/**`

修正後に再実行して警告やエラーが消えることを確認してください。

# Step 13 parserOptionsプロパティ

ESLintはデフォルトでES5形式のJavaScriptしか読み込むことができません。
ES2015など、ES5以降のJavaScriptを読み込むための設定が`paserOptions`プロパティです。

## ES2015の構文を使ったコードに修正

設定を行う前にES2015の構文である[テンプレートリテラル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/template_strings)（バックティック）に変更します。（変数を埋め込んでいないので良い例ではないですが）

script.js

`/*eslint no-console: "off"*/
document.getElementById('alert').addEventListener('click', function () {
- alert('document.getElementByIdのalert');
+ alert(`document.getElementByIdのalert`);
});

$('\#alert').on('click', function () {
  console.log('jQueryのalert');
  alert('jQueryのalert');
});`

修正後に実行してみましょう。

ESLintの実行

`npm run lint

/プロジェクトフォルダ/src/script.js
  3:9  error  Parsing error: Unexpected character '`'

✖ 1 problem (1 error, 0 warnings)`

`Parsing error`というのが出ました。
つまりES5の構文ではないためJavaScriptの解析自体に失敗しています。

## parserOptionsにES2015を設定

ES2015を読み込めるようにparserOptionsを設定しましょう。

設定ファイルに以下のように`"ecmaVersion": 2015`を入れるだけです。

eslintr.json

`{
  "env": {
    "browser": true,
    "jquery": true
  },
  "extends": "eslint:recommended",
  "globals": {
  },
+ "parserOptions": {
+   "ecmaVersion": 2015
+ },
  "rules": {
    "no-console": "off",
    "no-extra-semi": "warn",
    "no-undef": "warn",
    "quotes": ["warn", "single"],
    "space-before-blocks": ["warn", { "functions": "always" }]
  }
}`

修正後に再実行してエラーが消えることを確認してください。

## その他のPaserOptionsについて

`PaserOptions`はES2015の読み込むに使うと書きましたが、正確にはファイルの解析方法を拡張するプロパティです。
import文やexport文を認識させたり、[JSX](http://facebook.github.io/jsx/)を読み込むのにも使用します。
以下のページを参照してください。[http://eslint.org/docs/user-guide/configuring#specifying-parser-options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options)

# Tips

ここではStep by Stepの流れからは割愛しましたが、知っておくと良い知識を記載しておきます。

## エディターとESLintをリンクさせよう

本手順ではESLintを`npm run lint`で実行してきました。
しかしコーディングしてファイルを保存して上記コマンドを叩くのは面倒です。

各種エディタでESLintのプラグインが提供されています。
これを使うことでいちいちコマンドを叩かずに済みます。[http://eslint.org/docs/user-guide/integrations#editors](http://eslint.org/docs/user-guide/integrations#editors)

筆者はVisual Studio Codeのプラグインを使っています。
VSCodeの設定で`"eslint.autoFixOnSave": true`を設定しておくと、保存した瞬間に`--fix`つきのESLintが実行されファイルが保存されます。
これはとても快適なので試してみてください。

## ルールの探し方

ESLintにはルールが200以上あるため探すのが大変です。
筆者は[ESLint demo](http://eslint.org/demo/)を使って探しました。

エラーにしたいコードとエラーにしたくないコードを打つとどちらかで引っかかる事が多いです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F35595%2F232911cd-6968-46c4-55b7-d27b8837c7f2.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ed4156de5e4a982a1d06c93f48f7aae9)

## Formatters

本手順で警告やエラーを表示していたのは[styish](http://eslint.org/docs/user-guide/formatters/#stylish)というデフォルトのフォーマッターです。
これを好きな形式に変更することが可能です。

stylishは短くてスッキリしますがどこがエラーなのかが分かりづらいです。[codeframe](http://eslint.org/docs/user-guide/formatters/#codeframe)を使うとはっきりわかります。

package.jsonのESLintコマンドを書き換えてもいいのですが、一時的に変えたいだけなら実行時にオプションを指定するのがおすすめです。
※`npm run`実行時に`--`をつけるとpackage.json内のコマンドにオプションを追加できます。

codeframeフォーマットで実行

`npm run lint -- -f codeframe


> eslint src --fix "-f" "codeframe"

/プロジェクトフォルダ/src/script.js
error: Parsing error: Unexpected character '`' at src/script.js:3:9:
  1 | /*eslint no-console: "off"*/
  2 | document.getElementById('alert').addEventListener('click', function () {
> 3 |   alert(`document.getElementByIdのalert`);
    |         ^
  4 | });
  5 | 
  6 | $('\#alert').on('click',function () {`

これはES2015に対応させなかった場合のエラーです。
エラーがでた場所がはっきりわかると思います。
どこでエラーが出ているのかよくわからん、というときに便利です。

## rootプロパティ

設定ファイルを追加して設定を上書きするときに親階層をみていくと書きました。
ですが場合によっては親階層から探してほしくない、そこで止めて欲しい、というケースもあるとおもいます。
その場合、rootプロパティを設定すると親階層をみにいかなくなります。

使用事例

`{
  "root": true,
  "rules": {
    "no-console": "warn"
  }
}`

# 参考

[ESLint 最初の一歩](http://qiita.com/mysticatea/items/f523dab04a25f617c87d)[時代はESLint。JSLintでもJSHintでもなくESLint。](http://qiita.com/inuscript/items/dcf48f56d8f484c0a1a8)