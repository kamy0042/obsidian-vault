---
URL: https://qiita.com/bakira/items/3c4e2d10aae085767817
Updated: 2021-01-15T17:59:00
Created: 2021-01-15T17:59:00
Tags: [topic/技術/ビルドツール]
---
# フロント３銃士

- gulp
- webpack
- babel

※今回は概要紹介なので、導入方法や使い方で一部端折っている部分があります。その辺は別の記事でまとめようかなと思います。(気が向いたら)

# gulp

[`gulp`](http://gulpjs.com/)は`Javascript`製のタスクランナーです。

例えば、

`css`ファイルが増えて大変だから一つにまとめたい！

とか、

`less`を`css`にコンパイルしたい！

とかを`Javascript`の記述でタスク化することができます。

gulpfile.babel.js

`...
gulp.task('less2css', (callback) => {//lessをcssにコンパイルするタスク
    return gulp.src([//対象を指定
            "./src/main/resources/static/less/**/*.less"
        ])
        .pipe( plumber() )//エラーが起きた際によきに計らってくれるおまじない★
        .pipe( less() )// lessをcssにコンパイル
        .pipe( gulp.dest("./src/main/resources/static/css/") );//コンパイルしたファイルを吐き出す
});

gulp.task('bundle', (callback) => {//複数のcssを一つのファイルにまとめるタスク
    return gulp.src([//対象を指定
            "./src/main/resources/static/css/**/*.css",
            "./node_modules/font-awesome/css/font-awesome.css",
        ])
        .pipe( plumber() )
        .pipe( concatCss("bundle.css", {//bundle.cssという名称でまとめる
            rebaseUrls : false//cssファイル内のパスを相対的にリファクタリング品おようにする
         }))
        .pipe(gulp.dest("./src/main/resources/static/bundle/"));
});
...`

`java`でいう`ant`や`gradle`に当たると思われます。

`gulp`で出来ることは多く、様々なプラグインがあるので柔軟性が高いです。
また、同じ`Javascript`製のタスクランナーとしては[grunt](https://gruntjs.com/)が有名です。

出来ることはほぼ一緒ですが、記述が`スクリプト`(`gulp`)か`json`(`grunt`)の違いがあるので、好みによって変えるといいでしょう。

# babel

[`babel`](https://babeljs.io/)はJavascriptの[`ES6`](http://es6-features.org/#Constants)→`ES5`へのトランスパイラーです。

es6.js

`let name = "太郎";
let age = 22;

let Person = {
  name,
  age
}
...`

es5.js

`var name = "太郎";
var age = 22;

var Person = {
  name: name,
  age: age
}
...`

※`ES6`の記述は他にもたくさんあり、便利なものばかりなので興味のある方は調べてみてください。

## ES6

`ES6`(`ECMAScript 2015`)は2015年6月にリリースされた`ECMASciript`の最新バージョンです。`ECMAScript`とは、乱雑した`Javascript`系言語を共通化するために考えられた`Javascript`の指針みたいなものです。

## ブラウザの対応状況

各Webブラウザも随時`ES6`に対応するようになってきていますが、もちろん古いバージョンを利用しているユーザーもいます。
もし、古いバージョンのブラウザもサポートするのであれば`ES6`で記述しているコードを古いバージョンでも実行できるように変換する必要があります。

**そこで**

前置きが長くなりましたが、ここで`babel`の登場です。

`babel`単体でも使えますが、`webpack`と連携させる方法が楽だしオススメです。

# webpack

[`webpack`](https://webpack.github.io/)はモジュールバンドラーです。

先ほど`css`ファイルのbundle化は`gulp`で行いましたが、`webpack`ではjsファイルのbundle化が簡単に出来ます。
※もちろん`gulp`単体でも出来ます。

`webpack`には、他にも便利な設定があったり、ローカルに開発サーバーを立てたり、コンパイルしたりと色々出来ますが、今回は割愛します。
興味のある方は調べてみてください。

## node_modules

`npm`コマンドで様々なモジュールをインストールすると

node_modules/
├　/AAA/
├　/BBB/
└　...
のようにインストールされますが、HTML側で

index.html

`<head>
  <script type="text/javascript" src="./node_modules/AAA/..."></script>
  <script type="text/javascript" src="./node_modules/BBB/..."></script>  
  ...
</head>`

このようにモジュールをインストールするたびにリンクを追加するのはアホらしいですよね。
タスクを組んで利用するモジュールを一つのbundle.jsというファイルにまとめるようにしておけば、

index.html

`<head>
  <script type="text/javascript" src="./js/bundle.js"></script>
</head>`

モジュールを新しくインストールしてもbundle.jsに組み込まれるようになるので、`script`タグを増やしたり修正する必要は無くなります。

# フロント３銃士の役割及び流れ

gulpfile.babel.js

`...
gulp.task("bundleJS", function() {
    return gulp.src([
             "./src/**/*.js"
          ])
         .pipe(plumber())//おまじない
         .pipe(webpack(
             {
               entry: "./src/js/entry.js",//対象のエントリーファイル(このファイルを中心にimport/requireでモジュールを読み込んでいく)
               output: {
                 filename: "bundle.js"//出力ファイル名
               },
               module: {
                 loaders: [
                 {
                   test: /\.js$/,
                   loader: 'babel-loader' //babelを使うための宣言
                   }
                 ]
               }
               ...
             }
         ))//
         .pipe(gulp.dest("./src/main/resources/static/bundle/"));
});
...`

gulp「よし、作業するぞー。webpack君、必要なモジュールを一つにまとめて〜。出来たら頂戴ね。」
webpack「了解っす。あ、このJSファイルはES6で書かれてるからES5に直さないといけないな〜。babel君に頼もう〜。」
babel「webpack先輩了解です。・・・・変換終わりましたのでお渡しします。」
webpack「サンキュー。じゃあこれを一つにまとめてって、、と。gulpさん出来ましたよ〜。」
gulp「お疲れ〜。じゃあこれを私が指定された場所に置けば作業終了。はい、ご苦労様。webpack君、babel君次も宜しくね〜。」
webpack,babel「うっす。」

つまり、ヒエラルキー的には
gulp > webpack > babel
こんな感じだと思います。

ただ、先ほども言ったようにgulpを使わずに`webpack`+`babel`も可能なのでやり方はいろいろあります。

`gulp`と`babel`は設定も簡単ですが、`webpack`は少し癖があるので皆さん頑張って覚えてください。

じゃあの。