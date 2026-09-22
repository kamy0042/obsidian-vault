---
URL: https://glatchdesign.com/blog/gulp-webpack-babel/
Updated: 2021-01-15T17:59:00
Created: 2021-01-15T17:59:00
Tags: [topic/技術/ビルドツール]
---
![](https://glatchdesign.com/wp-content/uploads/2018/01/eyecatch_180123.png)

2018年1月時点ではモジュールバンドラーのデファクトスタンダードと言える存在のwebpack。JavaScriptはもちろんcssやsass、画像、webフォントなどあらゆるリソースが扱えます。

一方、webpackと同じような役割を担うことができるツールにgulpがあります。**確かにwebpackとgulpは、場合によっては同じようなこともできるのですが、私はこの2つを役割分担させて両方使っています。**

今回はgulpとwebpackを併用する方法と、Babelを使用して古いブラウザに対応しつつ最新の文法でJavaScriptを書ける環境の構築をします。

目次

## 対象の読者

もともとgulpを長く使っていて、これまでの資産を活用しながらwebpackの恩恵に預かれないかなと考えている人には今回の方法は期待に添えると思います。

## gulp・webpack・Babelの役割

環境構築の前にそれぞれの役割をいま一度おさらいしておきたいと思います。

webpack

- JavaScriptのバンドル

gulp

- JavaScriptのバンドル以外のタスクの実行（sassのコンパイル、eslintなど）

Babel

- ES2017の文法で書いたJavaScriptをES5に変換

webpackはcssやsassを扱えますが、jsファイルとしてバンドルされるので、個人的にはクライアントワークで中々使いにくい状況です。

ですのでsassはこれまで通りcssとしてコンパイルしたいので、そうなるとwebpackのみでは完結できないため、gulpとの共存が個人的には現時点でベストプラクティスです。

今回はECMAScript2017以上で開発するための環境を構築したいと思います。

webpackについてより詳しく知りたい方はICS MEDIAさんの記事がとても参考になります。

[最新版で学ぶwebpack 3入門(図解付き) – JS開発で必須のモジュールバンドラー – ICS MEDIA](https://ics.media/entry/12140)

## 今回のディレクトリ構成

最終的には下記のようなディレクトリ構成となります。

```plain text
root/
　├ dist/
　│　└ js/
　│　　　└ bundle.js
　├ src/
　│　└ js/
　│　　　└ main.js
　├ gulpfile.js
　└ webpack.config.js
```

## webpack+Babelの構成を構築

まずwebpackとBabelの設定から始めたいと思います。

Babelは新しいJavaScriptの規格（ECMAScript）で書いたコードを、新しい規格に対応していないブラウザでも動作するように古い文法に変換してくれるモジュールです。

以下の4つのモジュールをインストールする必要があります。

- webpack
- babel-core
- babel-loader
- babel-preset-env

コマンドは以下です。4つのモジュールが一気にインストールされます。

```plain text
npm i -D webpack babel-core babel-loader babel-preset-env

```

### webpackの設定

続いてwebpackの設定ファイルの作成です。設定にはwebpack.config.jsというjsファイルを作成し、設定を記述していきます。

内容は以下の通り。

```plain text
const webpack = require('webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  'modules': false
                }]
              ]
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
```

各ポイントについて触れておきます。

### entry

エントリーポイントとなるjsを指定します。

### output

`filename: 'bundle.js'`で出力するファイル名を指定します。

### presets

### env

babel-preset-envの設定です。`env`と指定するとES2017で書かれたコードをES5に変換してくれます。対応するブラウザを細かく指定することもできるので、下記で確認してみてください。

[babel-preset-env](https://www.npmjs.com/package/babel-preset-env)

### modules

`false`と設定しないとimport文がCommonJSへ変換されます。変換されても動作しますがwebpackのTree Shakingという機能が使えなくなります。

Tree Shakingとはバンドルする際に、エクスポートしているけどどこからもインポートされていない（使われていない）コードを削除する機能のことです。

### devtool

ソースマップを出力したいので`'source-map'`と指定します。

### plugins

コードを圧縮したいので、UglifyJsPluginというプラグインを使用します。オプションにソースマップを出力するために`sourceMap: true`を指定します。

UglifyJsPluginはソースマップの他にもオプションが豊富にありますので、興味がある方は以下で確認してみてください。

[webpack-contrib/uglifyjs-webpack-plugin: UglifyJS Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)

## gulp環境の構築

最後にgulpの設定です。

まずは必要なモジュールをインストールします。

```plain text
npm i -D gulp webpack-stream

```

※gulpでwebpackを使えるようにするモジュールにgulp-webpackというものがありますが、こちらは更新が止まっているのでwebpack-streamを使います。

つづいて設定にはgulpfile.jsというjsファイルを作成し、設定を記述していきます。

```plain text
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

gulp.task('bundle', function() {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('./dist/js'));
  });
gulp.task('watch', ['bundle'], function() {
  gulp.watch('src/js/**/*.js  ', ['bundle']);
});

gulp.task('default', ['watch']);
```

bundleというタスク名で設定し、watchタスクに入れることでファイルに変更がある度にバンドルするように設定しました。

以上で設定は完了です。あとは以下のコマンドでタスクが実行されます。

```plain text
gulp
```