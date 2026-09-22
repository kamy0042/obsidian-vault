---
URL: https://reffect.co.jp/html/webpack-basic-bundle-for-beginner
Updated: 2021-01-15T17:59:00
Created: 2021-01-15T17:59:00
Tags: [topic/技術/ビルドツール]
---
![](https://reffect.co.jp/wp-content/uploads/2019/05/webpack_bundle.png)

webpackの公式ホームページにアクセスすると最初に目に留まる単語にbundle（バンドル）というものがあります。もしbundle（バンドル）とはどういう意味かと疑問を持っている人であれば本書が最適です。

bundleは束ねるという意味があるので、webpackは複数のファイルをまとめる処理(bundle your asset/image/scripts/styles)を行う機能を持っているということが認識できればwebpackを理解するスピードも格段に上がります。本文書では”ファイルをまとめる”を念頭において読み進めてください。

ファイルをまとめる処理はwebpackの1つの機能にすぎませんがまずは基本となるまとめる機能を理解しその後その他の機能について理解を深めていきます

![](https://reffect.co.jp/wp-content/uploads/2018/12/fukidashi.png)

webpackはnpmを使ってインストールを行うのでnpmがわからない人は以下の記事を参考にしてください。

[あわせて読みたい](https://reffect.co.jp/html/npm-package-manager-basic-for-beginner)[入門者/初心者必見 npmでパッケージ管理するための基礎](https://reffect.co.jp/html/npm-package-manager-basic-for-beginner)

![](https://reffect.co.jp/wp-content/uploads/2019/05/npm.png)

目次

## webpackのインストール

npmを使用してインストールを行うためにディレクトリを作成します。ここでは動作確認用なのでtestというディレクトリを作成しています。

```plain text

mac $ mkdir test
mac $ cd test

```

npm initコマンドでpackage.jsonファイルを作成します。

```plain text

mac $ npm init -yes

```

パッケージを開発用としてインストールする場合は、–save-devをつけてnpm installコマンドを実行します。webpackとwebpackのコマンドラインインターフェイスであるwebpack-cliの2つパッケージをインストールします。webpack-cliをインストールしなければ、webpackを実行することはできません。

```plain text

mac $ npm install --save-dev webpack webpack-cli

```

package.jsonが未作成の状態でinstallを行うとインストール済みパッケージを確認するnpm lsやnpm listを実行するとnpm ERR! extraneous:が多数表示されます。package.jsonの作成を忘れないように進めてください。

![](https://reffect.co.jp/wp-content/uploads/2018/12/fukidashi.png)

インストール後、package.jsonを確認するとdeevDependenciesには、webpackとwebpack-cliの情報が追加されます。

```plain text

  "devDependencies": {
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2"
  }

```

以上でwebpackのインストールは完了です。

## webpackコマンドの実行方法の確認

webpackがどういった処理を行うか説明する前にwebpackコマンドの実行方法について説明を行います。

webpackコマンドをインストールディレクトリで実行した場合、PATH(パス)の設定が行われていなければcommand not foundエラーが表示されます。

```plain text

mac $ webpack -v
-bash: webpack: command not found

```

※-vはwebpackのバージョンを表示させるオプションです。動作確認を行うために-vオプションをつけて実行しています。

PATH(パス)がわからない人はこちらの文書を参考にしてください。

[参考](https://reffect.co.jp/windows/full_understanding_mac)[読めばわかるMACでのPATH設定を完全理解](https://reffect.co.jp/windows/full_understanding_mac)

![](https://reffect.co.jp/wp-content/uploads/2019/01/mac_path.png)

エラーが表示される理由は、インストールするパッケージの実行ファイルがnode_modules/.bin/の下に保存されるためです。webpackコマンドを実行するためには、下記のように実行ファイルの場所を指定する必要があります。

```plain text

mac $./node_modules/.bin/webpack -v
4.31.0

```

その他にもwebpackを実行する方法には下記の方法があります。

- npxコマンドを利用する方法
- package.jsonのscriptsにコマンドを記述する方法

### npxコマンドを利用した実行

npxコマンドを利用する場合は、npxの後にwebpackを指定すれば実行することができます。

```plain text

mac $ npx webpack -v
4.31.0

```

npxを使うとPATHの設定が行われていなくてもnode_modules/.bin/ディレクトリの中から指定したコマンドを自動的に探し出して実行します。そのためPATHの設定を行う必要がありません。

![](https://reffect.co.jp/wp-content/uploads/2018/12/fukidashi.png)

### package.jsonのscriptsに記述する方法

一般的には下記のようにpackage.jsファイルのscriptsにコマンドを追加することでPATHを意識することなく実行することができます。

```plain text

 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack -v"
  },

```

package.jsonに追加後、rpm run bulidを実行するとwebpack -vを実行することができます。webpackというコマンドを直接叩くことはなくなります。

```plain text

test $ npm run build

> test@1.0.0 build /Users/mac/Document/test
> webpack -v

4.31.0

```

webpackを実行する際に-vオプションは必要ないので、webpackコマンドの実行方法が確認できた後は、package.jsonは下記のように書き換えておきます。

```plain text

 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },

```

## webpackの実行

webpackコマンドの実行方法が確認できたので、実際にwebpackコマンドを実行して理解を深めていきます。

```plain text

mac $ npm run build

```

実行するとWARNINGとERRORが下記のように出力されます。

※他にも実行ログが出力されますが、WANINGとERRORのみ抜粋しています。

```plain text

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/mac/Document/test'

```

### エントリーモジュールのERROR対応

ERRORについては./srcの中にエントリーモジュールを見つけることができないというエラーなので、srcディレクトリを作成し、その中にindex.jsファイルを作成します。index.jsの中身は空でかまいません。

```plain text

mac $ mkdir src
mac $ cd src
mac $ touch index.js

```

再度npm run buildを実行します。Errorの表示が消え、WARNINGだけが残った状態になります。WARNINGについてはのちほど対応します。

```plain text

test $ npm run build

> test@1.0.0 build /Users/mac/Document/test
> webpack

Hash: f938a17692d3bf136b01
Version: webpack 4.31.0
Time: 119ms
Built at: 2019-05-16 15:59:37
  Asset       Size  Chunks             Chunk Names
main.js  930 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 0 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

```

実行後、新たにdistディレクトリ(distribution:配布)が作成され、その中にmain.jsが生成されることが確認できます。

```plain text

mac $ ls
dist			package-lock.json	src
node_modules		package.json
mac $ ls dist
main.js

```

![](https://reffect.co.jp/wp-content/uploads/2019/05/webpack_directory.png)

webpack初期のディレクトリ構成

index.jsファイルがwebpackの処理の中で解析、処理された結果main.jsファイルがdistディレクトリの下に自動生成されます。このmain.jsの元になるindex.jsファイルはエンドポイントと呼ばれwebpackの一連の処理の中でメインとなるJavaScriptファイルです。

初期設定ではwebpackはsrcディレクトリにindex.jsがないかチェックを行い、あれば処理を継続しdistディレクトリを作成しmain.jsファイルを生成します。

ここまでの処理では1つのファイル(index.js)から1つのファイル(main.js)が出来ただけです。後ほど複数のファイルから1つのファイルへとまとめる処理を行います。

生成されたファイルmain.jsを下記のようにHTMLで指定して使います。

```plain text

<script src="./dist/main.js"></script>

```

webpackではsrcディレクトリにindex.jsファイルさえあれば設定ファイルなしで処理を行うことができます

![](https://reffect.co.jp/wp-content/uploads/2018/12/fukidashi.png)

### modeオプションのWARNINGへの対応

次にwebpack実行時に出力されていたWARNINGに対応するためにmode(モード)の設定を行います。modeにはproduction, development, noneを設定することが可能です。productionモードではファイルを圧縮するなどdevelopmentと大きな違いがあります。以下のようにpackage.jsonのscriptsで分けることで開発と本番用を分けることも可能です。

```plain text

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },

```

この設定により、npm runでdevを指定した場合はmodeはdevelopment, buildを指定した場合のmodeはproductionで実行されます。

ここまでの設定を行うことでwebpack実行時のエラーと警告はなくなります。

```plain text

mac $ npm run build

> test@1.0.0 build /Users/mac/Document/test
> webpack --mode production

Hash: a7ab55fd5d9673cb0317
Version: webpack 4.31.0
Time: 122ms
Built at: 2019-05-16 21:39:15
  Asset       Size  Chunks             Chunk Names
main.js  930 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 0 bytes {0} [built]

```

### watchオプションで変更を監視

JavaScriptファイルを変更する度にnpm runコマンドを実行するは手間がかかり効率的ではありません。効率よく開発を行うためにwatchオプションが準備されています。watchオプションは、jsファイルの変更を監視することができるのでjsファイルに変更があると自動でnpm runコマンドを実行してくれます。

```plain text

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "watch": "webpack --mode development --watch"
  },

```

scriptsにwatchを追加したら、npm run watchコマンドを実行し、別のコンソールを起動もしくはエディターでindex.jsファイルを変更を行ってください。自動でnpm run watchコマンドが実行されることを確認することができます。

## webpackで複数のファイルをまとめる

ERROR, WARNINGも出力されなくなり、最もシンプルな方法でのwebpackコマンドの使用方法がわかりました。ここから実際に複数のファイルをまとめる処理を行います。

### ファイルをまとめる準備

testディレクトリの中にindex.htmlファイルを作成します。作成したindex.htmlファイルのscriptタグには、srcのindex.jsを指定します。

```plain text

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>webpack</title>
	<script src="src/index.js"></script>
</head>
<body>
	
</body>
</html>

```

index.jsにもconsole.logを記述します。

```plain text

console.log('Hello World')

```

index.htmlをブラウザで開き、ConsoleにHello Worldが表示されることを確認します。

![](https://reffect.co.jp/wp-content/uploads/2019/05/webpack_hello_world.png)

コンソールにHello World

webpackの処理を行うため、npm run devを実行します。正常に終了できたら、先ほどのindex.htmlのscriptタグの指定をindex.jsからdst/main.jsに変更し、ConsoleにHello Worldが表示されることを確認します。

```plain text

mac $ npm run build

> test@1.0.0 dev /Users/reffect/Desktop/test
> webpack --mode development

Hash: 2de7563477518cf0bba0
Version: webpack 4.31.0
Time: 120ms
Built at: 2019-05-18 10:26:23
  Asset      Size  Chunks             Chunk Names
main.js  3.79 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 26 bytes {main} [built]

```

```plain text

<script src="dist/main.js"></script>

```

### 複数のファイルをまとめる処理

2つの数字を合計する関数を含むsum.jsと2つの数字を掛け合わせるmultiply.jsの2つのファイルを用意して、index.jsファイルから読み込めるようにします。

JavaScriptではsum.js, multiply.jsこの1つ1つのファイルのことをモジュールと呼びます。

![](https://reffect.co.jp/wp-content/uploads/2018/12/fukidashi.png)

```plain text

export default function sum(a,b) {

return a + b;

}

```

```plain text

export default function multiply(a,b) {

return a * b;

}

```

index.js内で2つのファイルを読み込み、その結果をconsoleに出力させます。

```plain text

import sum from './sum.js';

import multiply from './multiply.js';

var num1 = 10;

var num2 = 5;

var result = '合計は' + sum(num1,num2) + ',掛け算は' + multiply(num1,num2);

console.log(result);

```

これまではindex.jsのファイルからwebpackを通して1つのファイルを作成してきました。しかし今回は、index.js, sum.js, multply.jsの3つのファイルが関連しているためwebpackの処理もそれら3つのファイルが関連する処理になります。

npm run devを実行すると実行のログにも3つのファイルの情報が出力されていることがわかります。

```plain text

mac $ npm run dev

> test@1.0.0 dev /Users/mac/Document/test
> webpack --mode development

Hash: d13dfa8042f4879b4a42
Version: webpack 4.31.0
Time: 129ms
Built at: 2019-05-18 10:47:15
  Asset     Size  Chunks             Chunk Names
main.js  5.3 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 183 bytes {main} [built]
[./src/multiply.js] 57 bytes {main} [built]
[./src/sum.js] 52 bytes {main} [built]

```

ブラウザでindex.htmlファイルを確認します。scriptタグで指定するはindex.jsファイルではなくmain.jsだというのを忘れないようにしてください。

```plain text

<script src="dist/main.js"></script>

```

ブラウザのconsoleには、合計は15, 掛け算は50が表示されます。

![](https://reffect.co.jp/wp-content/uploads/2019/05/webpack_sum_multiply.png)

sumとmultiplyの結果表示

webpackを利用すれば別々だったJavaScriptファイルが1つに束ねられて作成することができます。

### module.exportとexport, requireとimportの違い

JavaSCriptの勉強を始めた入門者にとって混乱する箇所の一つがexport、imortやrequireの使用方法です。あるところではexportと記述されており、あるところではmodule.exportと記述されどれが正しいのかという疑問です。webpackではどちらの構文を利用して問題なく動作します。

multiply.jsのみ記述方法をmodule.exportsに変更してみましょう。

```plain text

module.exports = function(a,b) {

return a * b;

};

```

index.jsはimportからrequireに変更を行います。

```plain text

import sum from './sum.js';

var multiply = require('./multiply');

var num1 = 10;

var num2 = 5;

var result = '合計は' + sum(num1,num2) + ',掛け算は' + multiply(num1,num2);

console.log(result);

```

2つの構文を混ぜても正常に動作することが確認できます。

### modeの設定によるmain.jsファイルの違い

webpackを実行する際にmodeの設定ができることは説明済みですが、作成されるmain.jsの中身を確認します。

mode=developmentで実行した場合のmain.jsファイルは下記のようになります。（一部の抜粋）

```plain text

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {


```

mode=productionで実行した場合のmain.jsファイルは下記のようになります。（一部の抜粋）

```plain text

!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].

```

ファイルを見ただけで圧縮されていることが確認できます。

webpack 4ではmodeをproductionにするとoptimization(最適化)の設定が行われます。圧縮にはTeserPluginを利用して圧縮が行われるようです。

### Chart.jsライブラリを使う

ここまでは、単純な自作のjavascriptファイルのみを扱ってきましたが、今度はChart.jsライブラリをwebpackで読み込んで使えるのか確認しておきます。

npmでchart.jsライブラリをインストールします。

```plain text

test $ npm install chart.js
npm WARN test@1.0.0 No description
npm WARN test@1.0.0 No repository field.

+ chart.js@2.8.0
added 5 packages from 7 contributors and audited 5237 packages in 5.148s
found 0 vulnerabilities

```

index.htmlでチャートを表示するためのcanvasタグを入れます。

```plain text

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Chart.jsを使ってみる</title>
	<script src="dist/main.js"></script>
</head>
<body>

	<canvas id="myChart" width="400" height="400"></canvas>
	
</body>
</html>

```

index.jsではインストールしたchart.jsをインポートしてバーチャートを表示させるコードを追加しています。コードは[chart.jsのサイト](https://www.chartjs.org/)のサンプルを利用しています。

```plain text

import Chart from 'chart.js';

window.onload=function(){
var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	        datasets: [{
	            label: '# of Votes',
	            data: [12, 19, 3, 5, 2, 3],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}

```

ブラウザで確認するとバーチャートが表示されます。

![](https://reffect.co.jp/wp-content/uploads/2019/05/chart_webpack.png)

chartjsでバーチャートを表示

他のライブラリを使いたい場合も同様の方法で行うことができます。

webpackのまとめるという機能は理解できたと思います。他の機能については下記の文書を参考にしてください。

[webpack設定続き](https://reffect.co.jp/html/webpack-loader-setting-for-beginner)[入門者/初心者にもわかるwebpack 4の基礎(CSS Loader編)](https://reffect.co.jp/html/webpack-loader-setting-for-beginner)

![](https://reffect.co.jp/wp-content/uploads/2019/05/webpack_bundle_2.png)

[webpack設定続き](https://reffect.co.jp/html/webpack-babel-loader-setting-for-beginner)[入門者/初心者にもわかるwebpack 4の基礎(Babel編)](https://reffect.co.jp/html/webpack-babel-loader-setting-for-beginner)

![](https://reffect.co.jp/wp-content/uploads/2019/05/webpack_babel.png)

[webpack設定続き](https://reffect.co.jp/html/webpack-4-mini-css-extract-plugin)[webpack 4でmini-css-extract-pluginを使う](https://reffect.co.jp/html/webpack-4-mini-css-extract-plugin)

![](https://reffect.co.jp/wp-content/uploads/2019/05/webpack_bundle_3.png)