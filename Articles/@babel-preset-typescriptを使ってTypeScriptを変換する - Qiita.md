---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
# はじめに

`@babel/preset-typescript`というBabelのプリセットが出て以来、tscコマンドではなくBabelによって、TypeScriptで書いたコードをJavaScriptに変換できるようになりました。既にtscコマンドを日常的に使いながらTypeScriptを書いている人には影響はないですが、これからTypeScriptで書いてみようという人（かつ、既にBabelに慣れている人）にとっては、TypeScriptとの付き合い方の選択肢が増えたことになります。

この記事では、Babelでできるようになった事の範疇や、今まで通りにtscコマンドに担ってもらう事について、設定例を交えながら整理していきます。

前提として、Babelのバージョンは7が対象です。

# @babel/preset-typescriptが出る前は

大まかに示すと、TypeScriptでコードを書く際は、その都度にtscコマンドによって以下の処理を行います。

- 型チェック（静的解析）をして、コードに型のエラーが無いか確認する。
- TypeScriptのコードをJavaScriptに変換する。
- 必要に応じて、コード変換と同時に型定義ファイル（.d.tsファイル）の生成もする。ライブラリをTypeScriptで書く際などに行われる処理。

@babel/preset-typescriptが出る前は、上記を全てtscコマンドが担当していました。
（フロントエンドのプロジェクトなら、Webpackのts-loaderなどを介して）

# コードの変換だけはBabelでもできるようになった

2018/8に@babel/preset-typescriptが登場したことで、TypeScriptからJavaScriptへの変換の部分だけは、Babelが担当できるようにもなりました。

Babelの設定方針（.babelrcあるいはbabel.config.jsの書き方）については、基本は[Microsoftの公式ブログの例](https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/)に沿いつつ、必要に応じて自分好みの設定を追加すればOKです。

引用すると下記が基本の設定となります。もちろん、これらのプリセットやプラグインを予めdevDependenciesにインストールしておく必要があります。

.babelrcの例

Copied!

`{
    "presets": [
        // ES2015以降の文法を使えるようにする定番プリセット
        "@babel/preset-env",
        // 今回の主役。TypeScriptのコードから、型アノテーションの部分などを取り除く変換を行う。
        "@babel/preset-typescript"

        // ざっくり言うと、preset-typescriptは、TypeScriptからES2015以降への変換を担当し、
        // preset-envは、ES2015以降からES5への変換を担当する。
    ],
    "plugins": [
        // TypeScriptの文法には既に含まれているけど、
        // 今はまだpreset-envには含まれていない文法も使えるようにしておく。
        // preset-envに含まれる日が来たら、これらのプラグインは不要になるはず。
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ]
}`

上記のように設定した上で、例えば以下の様にBabelコマンドを実行し、コードを変換します。

srcディレクトリに含まれていて、拡張子がtsまたはtsxのファイルにBabelを適用し、distディレクトリにjsファイルを出力する

Copied!

`babel src --extensions '.ts,.tsx' --out-dir dist`

Webpackを利用しているフロントエンドのプロジェクトなら、Babelコマンドの代わりにbabel-loaderを介してBabelを利用していることでしょう。その場合は、Webpackの設定に例えば以下の様に書いて、拡張子がtsやtsxのファイルにbabel-loaderが適用されるようにします。

webpack.config.jsの抜粋

Copied!

`  module: {
    rules: [
      {
        test: /\.tsx?$/, // ここ！
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            // 必要に応じてその他の設定...
          },
        ],
      },
    ],
  },`

以上のように準備することで、TypeScriptからJavaScriptへの変換に限っては、Babelが担当できるようにもなりました。
逆に言うと、型チェックや型定義ファイルの生成に関しては、今まで通りtscを使う必要があります。

# 型チェックなどは引き続きtscで行う

コードの変換以外は引き続きtscを使いますので、そのための設定が必要です。大前提として、`typescript`をdevDependenciesにインストールしておく必要があります。

TypeScriptに関する設定は、tsconfig.jsonというファイルに書きます。基本的にはpackage.jsonと同じ階層に置きます。この設定ファイルに、「普通の使い方と違ってコードの変換はしなくてよいよ（そっちはBabelの担当だから）」という設定をしていきます。この設定も、基本はMicrosoftの公式ブログの例をベースにすると良いでしょう。

tsconfig.jsonの例

Copied!

`{
  "compilerOptions": {
    // TypeScriptのコードを何に変換するかを指定する。
    // 今回はBabelが変換を担当するのでそれほど重要でないはずだが（多分）、公式ブログの例を踏襲しておく。
    // targetの値に応じて、他のオプションのデフォルト値が変わるので、こうしておいた方が色々便利なのかも。
    "target": "esnext",
    // 詳細は割愛するが、とりあえずこう設定するのがおすすめなオプション。
    "moduleResolution": "node",
    // TypeScriptと一緒にJavaScriptもtscの処理対象に含められるようにする。必要に応じて。
    "allowJs": true,
    // （変換はBabelが担当するから）tscはファイルを出力しないように指示する。
    "noEmit": true,
    // 色々な型チェックのルールを厳しくする。おすすめ。
    "strict": true,
    // コードの変換に関するオプションのようなので、これもそれほど重要でないはずだが（多分）、公式ブログの例を踏襲しておく。
    "isolatedModules": true,
    // 詳細は割愛するが、とりあえずこう設定するのがおすすめなオプション。
    "esModuleInterop": true
  },
  "include": [
    "src"
  ]
}`

ライブラリのプロジェクトなど、型チェックだけでなく型定義ファイルの生成も行いたい場合は、設定を少しアレンジして以下の様にします。

型定義ファイルの生成も行いたい場合の例

Copied!

`{
  "compilerOptions": {
    // 前略

    // ファイルの出力が全くないわけではないので、noEmitはデフォルト値のfalseに戻しておく。
    // "noEmit": true,

    // 型定義ファイルの生成を指示する。
    "declaration": true,
    // 「生成するファイルは型定義ファイルだけ」と指示する。コードの変換はBabel担当だから。
    "emitDeclarationOnly": true,
    // ファイルの出力先ディレクトリ
    "outDir": "dist",
  },
  "include": [
    "src"
  ]
}`

Reactによるフロントエンドプロジェクトなど、JSXを使いたい場合は以下の設定を追加します。

JSXを使いたい場合の例

Copied!

`{
  "compilerOptions": {
    // 前略

    // .tsxファイルに書かれたJSXの変換について指定するオプション。何か指定しないとエラーとなる。
    // コードの変換はBabel担当なので、値はそれほど重要でないはず。例えば"preserve"を指定する。
    "jsx": "preserve",
  },
}`

以上のように設定した上でtscコマンドを実行すれば、型チェックや（必要に応じて）型定義ファイルの生成をしてくれます。

# まとめ

@babel/preset-typescriptの登場によって、これまではtscが担当していた(1) 型チェック、(2) JavaScriptへのコード変換、(3) 型定義ファイルの生成のうち、(2) コード変換の部分だけはBabelが担当することもできるようになりました。

既にBabelに慣れている人にとっては、TypeScriptを書き始める敷居が低くなったと言えるでしょう。他にも、preset-env以外にも使いたいBabelプラグインがある人などは（例：まだ提案中の新しい文法をいち早く使いたい人）、引き続きBabelのエコシステムに乗っかりながらTypeScriptを書けるメリットがあります。

一方、以前からTypeScriptを書いており、tscを使ってコード変換をしている人には、それほど決定的なメリットはなさそうです。必ずしも、わざわざ乗り換えなくてもよいでしょう。