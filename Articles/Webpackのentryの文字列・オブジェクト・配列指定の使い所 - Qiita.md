---
URL: https://qiita.com/masarufuruya/items/6d89f0d91ad192cb4b73
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
## entry(文字列)の場合

`module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname + "/dist",
    filename: "app.js"
  },
  ...`

入門記事ではこんな書き方をしている場合が多い。

### 使い所

学習目的で手軽にコンパイルしたい時。
現実のアプリケーションではコンパイル対象が1ファイルなんてありえない。

## entry(オブジェクト)の場合

`module.exports = {
  entry: {
    'user': './src/javascripts/user.js',
    'admin': './src/javascripts/admin.js'
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js'
  },
  ...`

### 使い所

複数ページで起点となるJSを出力できるが、1ページに1ファイルしかコンパイル対象が存在しない小規模なサイトやアプリ開発向き。

[name].jsのnameの箇所にはentryのオブジェクトのキーであるuser,adminが出力される(user.js,admin.jsとなる)

## entry(配列)の場合

`module.exports = {
  entry: ['/vendor/jquery.js','./src/javascripts/user.js']
  output: {
    path: __dirname + "/dist",
    filename: 'app.js'
  },
  ...`

### 使い所

配列で指定したJSを結合して1つのJSとして出力される。
文字列の時と同様に1ファイルしかコンパイル後のファイルが作成できないので、学習向き。

## entry(オブジェクト+配列)の場合

`module.exports = {
  entry: {
    'user': [
       './src/javascripts/user_header.js',
       './src/javascripts/user_sidebar.js',
       './src/javascripts/user_content.js',
    ],
    'admin': [
       './src/javascripts/admin_header.js',
       './src/javascripts/admin_sidebar.js',
       './src/javascripts/admin_content.js',
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js'
  },
  ...`

### 使い所

実際のWebアプリケーションの開発向き。

複数ページに起点となるJSを出力でき、
各ページでコンポーネント単位に分割したJSを配列指定で結合することが出来る。

## まとめ

Webpackを実務のWebアプリケーションに導入する時はオブジェクト+配列の形式にしましょう。
どんな単位でオブジェクトと配列を分割するかはチーム毎に特色があると思うので、うちはこうしてるよ！とかありましたらぜひコメントください！