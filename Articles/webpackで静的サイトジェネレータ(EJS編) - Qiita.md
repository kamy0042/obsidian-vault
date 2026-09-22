---
URL: https://qiita.com/kn1cht/items/d3fcd3376ab3461bf05a
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
## 方針

webpackで静的なサイトを生成する需要は一定程度あるようで、既に[@toduq](https://qiita.com/toduq)さんの大変わかりやすい記事が上がっています。

- [Webpackを頑張って設定して、すごい静的サイトジェネレータとして使おう](https://qiita.com/toduq/items/2e0b08bb722736d7968c)

上記記事(以下、"[@toduq](https://qiita.com/toduq)さんの記事")では、テンプレートエンジンとしてPugを使っておられます。
ただ、HTMLをそのまま残せるEJSも捨てがたいため、**EJSから静的サイトを生成**できるようにしてみたいと思います。

## 環境

`$ node -v && npm -v
v9.2.1
5.8.0`

package.json(一部)

`"devDependencies": {
  "copy-webpack-plugin": "^4.5.1",
  "ejs-html-loader": "^3.1.0",
  "globule": "^1.2.0",
  "html-loader": "^0.5.5",
  "html-webpack-plugin": "^3.1.0",
  "webpack": "^4.4.1",
  "webpack-cli": "^2.0.13"
}`

## リポジトリ

[kn1cht/webpack-sitegen-ejs](https://github.com/kn1cht/webpack-sitegen-ejs)

結果だけ見たいよという方はリポジトリを覗いていただければと思います。

## EJSからHTMLへの変換

いきなりですがここで一番ハマりました。`EJS webpack`でググると、以下のような記事が出てくるわけです。

- [webpackでejsを使い、共通要素をインクルードして効率的にやりたいよね。](http://shigekitakeguchi.github.io/2017/02/10/1.html)
- [Webpackのハマりポイント](https://qiita.com/sigwyg/items/604f13688279abd4af91#%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E5%86%85%E3%81%AE%E7%94%BB%E5%83%8F%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AA%E3%81%A9%E3%82%92webpack%E3%81%AB%E7%B9%8B%E3%81%92%E3%82%8B)

両記事では、[`ejs-compiled-loader`](https://www.npmjs.com/package/ejs-compiled-loader)というものが使われています。
これだと、`plugins`の中で`HtmlWebpackPlugin`のtemplateとしてEJSのファイル名をいちいち書かなければなりません。

これではページの数が増えると大変です。
他のloaderがないか探した結果、[`ejs-html-loader`](https://www.npmjs.com/package/ejs-html-loader)というのがありました。

### ejs-html-loader！そういうのもあるのか

今のところ日本語情報もなく、DL数も10分の1程度です。
とはいえ、Usageを見る限り他のloaderと同様の書き方ができそうなので使ってみることにしました。

webpack.config.js(一部)

`module : {
  rules : [{
    test : /\.ejs$/,
    loader : 'ejs-html-loader'
  }]
}`

まずはシンプルなEJSで試してみます。

src/index.ejs

`<!DOCTYPE html>
<html lang="ja">

<body>
  <p><%= 'Generated with webpack!' %></p>
</body>
</html>`

`Entrypoint index.html = index.html
   [0] ./src/index.ejs 170 bytes {0} [built] [failed] [1 error]

ERROR in ./src/index.ejs
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
| <!DOCTYPE html>
| <html lang="ja">
|`

エラーで止まりました。

> You may need an appropriate loader to handle this file type.

……と言われても、ちゃんとEJSのloader使ってるやん！と思いつつ諸々試してみるも上手くいきません。

### 正しい使い方

最終的に、以下のissueで謎が解けました。

- [Get compiled asset path · Issue #11 · mcmath/ejs-html-loader](https://github.com/mcmath/ejs-html-loader/issues/11)

正しくはこうですね。

webpack.config.js(一部)

`module : {
  rules : [{
    test : /\.ejs$/,
    use  : [
      'html-loader',
      'ejs-html-loader'
    ]
  }]
},
plugins : [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.ejs'
  })
]`

issueへの投稿によると、内部ではこのような動作がなされているとのこと。

1. `ejs-html-loader`がEJSをHTMLに変換する
2. `html-loader`がHTMLを解釈し、HTMLを出力するJavaScriptを出力
3. `HtmlWebpackPlugin`が最終的なHTMLに変換する

これはwebpackの仕組み上そういうものだと諦めるしかなさそうです。

しかも、

```plain text
HtmlWebpackPlugin
```

をページの数だけ書くという部分もなくなりませんでした

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f62d.png)

(これは後で手書きしなくてもいいように手を加えます)

## EJSのinclude機能を利用する

EJSは、`include()`関数によって別のEJSを取り込むことができます。
これを使って、共通部分をテンプレ化して使いまわしてみましょう。

タイトルなど、ページ毎に違う情報は`include()`の引数に渡せばよいです。

src/index.ejs

`<% const title = 'Generated with webpack!'; %>
<!DOCTYPE html>
<html lang="ja">
<head>
  <%- include(`templates/_head`, { title }) -%>
</head>

<body>
  <p><%= title %></p>
</body>
</html>`

[@toduq](https://qiita.com/toduq)さんの記事の方法で、ファイル名の頭にアンダーバーを付けて、テンプレートが直接HTMLに変換されないようにしています。

src/templates/_head.ejs

`<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><%= title %></title>

<link rel="stylesheet" type="text/css" href="css/style.css" media="all">`

ついでに、`_head.ejs`内でCSSも呼び出してみます。
CSSは`CopyWebpackPlugin`で出力ディレクトリにコピーされます。

src/css/style.css

`BODY {
  background-color: lightgreen;
}`

ビルド結果です。引数で渡したタイトルが表示され、スタイルも反映されました。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F150557%2F3d028bf1-83d4-1de9-79e4-434998c62e82.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=69bd0ee9b3fa72d87197829e0c9a48a8)

## サブディレクトリに対応させる

### 失敗例

`about/`というディレクトリを作ってページを増やしてみます。

`src
├── about
│   └── index.ejs
├── css
│   └── style.css
├── index.ejs
└── templates
    └── _head.ejs`

src/about/index.ejs

`<% const title = 'About Page'; %>
<!DOCTYPE html>
<html lang="ja">
<head>
  <%- include(`../templates/_head`, { title }) -%>
</head>

<body>
  <p><%= title %></p>
</body>
</html>`

webpack.config.js(diff)

`@@ -40,6 +40,10 @@ const app = {
       filename: 'index.html',
       template: 'src/index.ejs'
     }),
+    new HtmlWebpackPlugin({
+      filename: 'about/index.html',
+      template: 'src/about/index.ejs'

+    }),
     new CopyWebpackPlugin(
       [{ from : `${__dirname}/src` }],
       { ignore : Object.keys(targetTypes).map((ext) => `*.${ext}`) }`

しかし、これでは上手くいきません。
ビルド結果を画像に示します。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F150557%2Fb8339d45-0eae-2383-fcaa-d7de5c332aa0.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=afbbf99c986829b22efc7a827db2542d)

スタイルが適用されませんでした。
これは、`_head.ejs`内の**CSSへの相対パスがsrc直下からになっている**(`href="css/style.css"`)ため、サブディレクトリからは見つけられないのが原因です。

### 対策

`_head.ejs`を工夫します。
どの階層から呼んでも正しいリンクが出力されればよいので、`include()`の引数としてルートへのパスを与えてやればOKです。

src/index.ejs(diff)

`@@ -1,8 +1,8 @@
-<% const title = 'Generated with webpack!'; %>
+<% const rootPath = './'; const title = 'Generated with webpack!'; %>
 <!DOCTYPE html>
 <html lang="ja">
 <head>
-  <%- include(`templates/_head`, { title }) -%>
+  <%- include(`templates/_head`, { title, rootPath }) -%>
 </head>

 <body>`

src/about/index.ejs(diff)

`@@ -1,8 +1,8 @@
-<% const title = 'About Page'; %>
+<% const rootPath = '../'; const title = 'About Page'; %>
 <!DOCTYPE html>
 <html lang="ja">
 <head>
-  <%- include(`../templates/_head`, { title }) -%>
+  <%- include(`../templates/_head`, { title, rootPath }) -%>
 </head>
 <body>`

テンプレートでは、`<%= %>`で囲むと文字列として展開されます。

src/templates/_head.ejs(diff)

`@@ -3,5 +3,4 @@
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <title><%= title %></title>

-<link rel="stylesheet" type="text/css" href="css/style.css" media="all">
-
+<link rel="stylesheet" type="text/css" href="<%= rootPath %>css/style.css" media="all">`

link・script・a・imgといった要素が登場するたびに`<%= rootPath %>`などと書き加えるのは実際面倒です。
ただ、呼び出す側のEJSファイルでは引数を一つ渡せばいいため、メンテナンスは楽になると思います。

## ページの数だけHtmlWebpackPluginを増やさなくていいようにする

前述の通り、`HtmlWebpackPlugin`はページの数だけ宣言しなければなりません。
手書きは嫌なので、勝手に宣言されるように`webpack.config.js`を改善します。

準備として、[@tuduq](https://qiita.com/tuduq)さんの方法を参考に、変換元・変換先の拡張子をセットで与えると`{ 変換後ファイル名 : 変換前ファイルパス,... }`の形式で一覧を出す`getEntriesList()`関数を作っておきます。

webpack.config.js(一部)

`const targetTypes = { ejs : 'html', js : 'js' };

const getEntriesList = (targetTypes) => {
  const entriesList = {};
  for(const [ srcType, targetType ] of Object.entries(targetTypes)) {
    const filesMatched = globule.find([`**/*.${srcType}`, `!**/_*.${srcType}`], { cwd : `${__dirname}/src` });

    for(const srcName of filesMatched) {
      const targetName = srcName.replace(new RegExp(`.${srcType}$`, 'i'), `.${targetType}`);
      entriesList[targetName] = `${__dirname}/src/${srcName}`;
    }
  }
  return entriesList;
}`

設定が入ったオブジェクトをexportsする前に、EJSファイルの一覧を取得して`HtmlWebpackPlugin`をそれぞれ宣言し、pluginsにpushします。

webpack.config.js(一部)

`const app = {
  entry  : getEntriesList(targetTypes),
  // (中略)
};

for(const [ targetName, srcName ] of Object.entries(getEntriesList({ ejs : 'html' }))) {
  app.plugins.push(new HtmlWebpackPlugin({
    filename : targetName,
    template : srcName
  }));
}

module.exports = app;`

これならページを増減させても`webpack.config.js`を修正する必要がありません。

## おわりに

webpackによる静的サイトジェネレータのメリットは、webpackの設定次第で好みの動作が実現できるということだと思います。
今回は例をなるべくシンプルにするためにSassもBabelも使っていませんが、loaderを入れれば簡単に拡張できるので色々と試してみてはいかがでしょうか。