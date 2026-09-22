---
Created: 2021-01-15T18:11:00
Updated: 2021-11-06T22:22:00
Tags: [topic/技術/React/Nextjs]
---
Next.jsでは公式が提供する[チュートリアル](https://nextjs.org/learn/)があります。
GitHubアカウントがあれば始められて、ところどころクイズ形式になっていて、正解するとpointが貯まるちょっと楽しい仕様になっています。
ただ、英語が苦手な方や、ざっと全容を把握したい、という方もいらっしゃると思うので、チュートリアルを自分なりにまとめてみます。
Vue.jsやNuxt.jsが日本で普及しているのは翻訳を提供しているのが大きいと思う（コミュニティとして巻き込んでいくのももちろん大きいと思う）ので、微力ながらNext.jsの普及に貢献したいと思って記事を書きます。
意訳や情報の歯抜けがあるかとは思いますが、ご指摘もしくはご容赦下さい。

この記事はNext.jsチュートリアル [https://nextjs.org/learn/](https://nextjs.org/learn/) の翻訳です。

# はじめてみる

## 環境構築

Windows, MacやLinuxでも、Node.jsがインストールされていればNext.jsを始められます。
まずはじめに、ターミナルを使って下記コマンドを実行してみましょう。

shell

Copied!

`mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages`

次にhello-nextディレクトリにある`package.json`を開き、下記NPMスクリプトを追記します。

package.json

Copied!

`{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}`

次に下記をターミナルで実行すれば[http://localhost:3000](http://localhost:3000/)でアプリケーションが起動します。

shell

Copied!

`npm run dev`

では試しに[http://localhost:3000](http://localhost:3000/)にアクセスしてみましょう。ここで何が起こるかと言うと、Next.jsがデフォルトで用意しているエラーページがレンダリングされます。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcloud.githubusercontent.com%2Fassets%2F50838%2F24114002%2Fac4786f2-0dc4-11e7-8d84-b6f33c8f9aae.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=84bb75f9aa5e57d9bc362ed0e421f54b)

今回は404の例でしたが、500系のエラーでも同様にデフォルトのエラーページページが出てきます。
カスタマイズしたエラーページを作成したい場合はpages/_error.jsというファイル名で作成できます。[詳しくはこちら](https://github.com/zeit/next.js/#custom-error-handling)。

## はじめてのページを作る

Next.jsは`pages`ディレクトリ配下のファイルがそのままルーティングとなってくれます。`pages/index.js`に最初のページを作ってみましょう。

pages/index.js

Copied!

`const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
)

export default Index`

[http://localhost:3000](http://localhost:3000/)に再度アクセスしてみると`Hello Next.js`とレンダリングされているはずです。
pagesディレクトリ配下のファイルで、Reactコンポーネントをdefault exportさせることで、ページのコンポーネントとして認識されます。

では `<p>Hello Next.js`というように閉じタグ忘れをした場合どうなるか。
Next.jsがエラートラッキングをブラウザに表示してくれます。
正しく修正がなされるとHMRによって自動でページが再レンダリングされます。

# ページ間移動をする

先程作った"Index"ページの他に"About"ページを作ってみましょう。
pagesディレクトリ配下に下記内容で`pages/about.js`を作ります。

pages/about.js

Copied!

`export default () => (
  <div>
    <p>This is the about page</p>
  </div>
)`

すると、ファイル名に紐付いたURLの[http://localhost:3000/about](http://localhost:3000/about)にアクセスできるようになりました。
次に考えるのは"a"タグでページ間を移動できるようにすることです。
しかし、Next.jsでは"a"タグのみでリンクを作ると、毎回サーバに問い合わせが行ってしまいます。
SPAの挙動である、クライアントサイドのみでページ遷移を行うためにはどうしたらよいでしょうか。
答えはNext.jsが提供するリンクAPIの`next/link`を使うことです。

`pages/index.js`にリンクAPIを追加して"About"ページと繋いでみましょう。

pages/index.js

Copied!

`// これがリンクAPIです
import Link from 'next/link'

const Index = () => (
  <div>
    {/* aタグを<Link>コンポーネントで囲い、hrefなどのリンクの情報は<Link>に渡します。 */}
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
)

export default Index`

[http://localhost:3000](http://localhost:3000/)にアクセスし、"About Page"リンクを押すとページ遷移できるようになりました。
この遷移はクライアントサイドつまりブラウザでのみ起こり、サーバーサイドにはリクエストを発しません。
確かめるにはブラウザの開発者ツールでネットワークを見てみましょう。

また、ブラウザの戻るボタンを押すと、クライアントサイドのみで戻ります。
これはつまり、`next/link`が`location.history`をすべてハンドリングしてくれているわけです。

## リンクをスタイリングする

リンクをスタイリングするには"a"タグにpropsを渡します。

Copied!

`<Link href="/about">
  <a style={{ fontSize: 20 }}>About Page</a>
</Link>`

これは`next/link`が[HOC](https://reactjs.org/docs/higher-order-components.html)となっていて、"href"など必要なpropsのみを受取るようになっているからです。

## buttonタグでリンクを作る

aタグの代わりにbuttonタグでリンクも作れます。

Copied!

`<Link href="/about">
  <button>Go to About Page</button>
</Link>`

Reactコンポーネントなら"div"タグでも何でもOKです。
ただし、直下は単一のコンポーネントを返さないといけないのと、`onClick`propを受け取れるコンポーネントでなくてはいけません。`next/link`はprefetch機能などもあり、とてもパワフルです。[詳しくはこちら。](https://github.com/zeit/next.js#routing)

# 共通のコンポーネントを使う

ここまでで、`pages`ディレクトリ配下にReactコンポーネントをexportして置くと、ファイル名に紐付いたURLによる固定ページが出来ることを学びました。
exportされたページはJavaScriptのモジュールなので、他のコンポーネントをimportできます。ここのセクションは普通のReactの挙動の話です。

## Headerコンポーネントを作る

共通のコンポーネントとなるHeaderコンポーネントを作っていきましょう。`components`ディレクトリをルート直下に掘り、下記内容でファイルを作ります。

components/Header.js

Copied!

`import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
    </div>
)

export default Header`

2つのリンクは見やすくするためにスタイリングしています。

## Headerコンポーネントを使用する

ここまでで作ったページにHeaderコンポーネントをimportして既存のリンクを上書きしてみましょう。

pages/index.js

Copied!

`import Header from '../components/Header'

export default () => (
  <div>
    <Header />
    <p>Hello Next.js</p>
  </div>
)`

そして`pages/about.js`でも同様にHeaderコンポーネントimportして下さい。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcloud.githubusercontent.com%2Fassets%2F50838%2F24333679%2Ffa856f00-1279-11e7-931d-a5707e51a801.gif?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=fa01c118cee33cbaeeeb1e3e44828d68)

ところで、`components`というディレクトリ名を`comps`に変更し、ファイル内も置換し、サーバを再起動すると問題なく動きます。
コンポーネントを置くディレクトリ名は何でもよく、Next.jsにおける特別なディレクトリは`pages`だけになります。

## レイアウトコンポーネントを作る

現実世界ではHeaderの他にFooterなども作るはずで、逐一pagesのコンポーネントに追加するのは面倒です。
そこで共通となるLayoutコンポーネントを、下記内容で`components/MyLayout.js`に作りましょう。（前のセクションでcompsディレクトリを作った人はもとのcomponentsに戻してください。）

components/MyLayout.js

Copied!

`import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid \#DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout`

MyLayoutが出来たら、各ページで使えるようになります。

pages/index.js

Copied!

`import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
       <p>Hello Next.js</p>
    </Layout>
)`

pages/about.js

Copied!

`import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
       <p>This is the about page</p>
    </Layout>
)`

ところで、MyLayout.jsから`{props.children}`を取り除くとどうなるでしょうか。
各ページのコンテンツが表示されなくなります。
これはラップされたコンポーネントは親コンポーネントのprops.childrenに割り当てられるため、それをレンダリングしなくなるからです。

また、Layoutコンポーネントの表現方法はこれだけではなく、他の方法でも作れます。

Layout例1

Copied!

`import withLayout from '../lib/layout'

const Page = () => (
  <p>This is the about page</p>
)

export default withLayout(Page)`

Layout例2

Copied!

`const Page = () => (
  <p>This is the about page</p>
)

export default () => (<Layout page={Page}/>)`

Layout例3

Copied!

`const content = (<p>This is the about page</p>)

export default () => (<Layout content={content}/>)`

ここまでで以下2点のユースケースに触れました。

1. 共通のHeaderコンポーネント
2. レイアウトコンポーネント

コンポーネントはスタイリングやページレイアウトなど、好きなタスクに使うことができます。
加えて、NPMモジュールからもコンポーネントをimportして使うこともできます。

# 動的ページを作成する

ここまでで複数ページのNext.jsアプリケーションをどのように作成するかを学びました。ページを作成するためには、実際にファイルを作成するのです。

しかし、現実世界では動的コンテンツを生成するために動的なページを作らなくてはいけません。Next.jsではそれに対して様々なアプローチを用意しています。

まずは**クエリ文字列(query strings)**による動的ページから始めましょう。
ホームページ(index)にすべての投稿リストがあるような、シンプルなブログを作っていきます。

## 環境構築

今まで使ってきたhello-nextは置いておいて、また別にExampleをダウンロードしましょう。

shell

Copied!

`git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout using-shared-components`

こちらのコマンドで実行できます：

shell

Copied!

`npm install
npm run dev`

## 投稿リストを追加する

まず最初に、ホームページに投稿のタイトルリストを作成しましょう。
以下の内容を`pages/index.js`に加えます。

pages/index.js

Copied!

`import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink title="Hello Next.js"/>
      <PostLink title="Learn Next.js is awesome"/>
      <PostLink title="Deploy apps with Zeit"/>
    </ul>
  </Layout>
)`

完了すると、このようなページが出来上がります：

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcloud.githubusercontent.com%2Fassets%2F50838%2F24542722%2F600b9ce8-161a-11e7-9f1d-7ed08ff394fd.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=079c1dedeab8985585c3cfd526ea5fc3)

この状態で一番上のリンクを踏むと404ページに行きます。
するとURLは`/post?title=Hello%20Next.js`という形になっているはずです。

## クエリ文字列を経由してデータを受け渡す

ここではクエリ文字列(クエリパラメータ)を経由してデータを受け渡しています。
以下のPostLinkコンポーネントにおいて、"title"をクエリパラメータとして使用しています。

Copied!

`const PostLink = (props) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)`

(Linkコンポーネントのhrefをチェックしてみて下さい。)
このようにして、どんなデータでもクエリ文字列として渡す事ができます。

## 投稿の詳細ページを作成する

次に、ブログの投稿を表示するための投稿詳細ページを作る必要が出てきました。そのためにはクエリ文字列からタイトルを取得しなくてはいけません。どのように操作するか見ていきましょう。

下記の内容で`pages/post.js`ファイルを作成します：

pages/post.js

Copied!

`import {withRouter} from 'next/router'
import Layout from '../components/MyLayout.js'

const Page = withRouter((props) => (
    <Layout>
       <h1>{props.router.query.title}</h1>
       <p>This is the blog post content.</p>
    </Layout>
))

export default Page`

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcloud.githubusercontent.com%2Fassets%2F50838%2F24542721%2F5fdd9c26-161a-11e7-9b10-296d4cb6912d.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=984532fa07580ab7a2e2a8122a8d0338)

といった形で表示されます。

上記コードの中で何が起こっているというと、

- "withRouter"関数を"next/router"からimportし使用しました。この関数はNext.jsのルーターをプロパティとして注入するものです。
- この場合、クエリ文字列である、ルーターの"query"オブジェクトを使用しています。
- それによって、投稿タイトルが`props.router.query.title`として取得することができました。

アプリケーションの簡単なブラッシュアップをしていきましょう。以下の内容で`pages/posts.js`を書き換えます。

pages/posts.js

Copied!

`import {withRouter} from 'next/router'
import Layout from '../components/MyLayout.js'

const Content = (props) => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
)

const Page = withRouter((props) => (
    <Layout>
       <Content />
    </Layout>
))

export default Page`

ここで[http://localhost:3000/post?title=Hello%20Next.js](http://localhost:3000/post?title=Hello%20Next.js)にアクセスすると何が起こるでしょうか。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcloud.githubusercontent.com%2Fassets%2F50838%2F24542720%2F5fd985a0-161a-11e7-8971-bc677906b1bf.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=67308c8cd3b158f7fbdeeb4064e9a04a)

ご覧のとおりエラーが発生します。
これはなぜかというと、`withRouter`を呼び出して得られる`router`プロパティを`Page`コンポーネントに対して注入してしてしまっているからです。`withRouter`はNext.jsアプリケーションのどのコンポーネントでも使用することができます。なので、この場合は`withRouter`の呼び出しを`Content`コンポーネントに移動させましょう：

pages/posts.js

Copied!

`import {withRouter} from 'next/router'
import Layout from '../components/MyLayout.js'

const Content = withRouter((props) => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
))

const Page = (props) => (
    <Layout>
       <Content />
    </Layout>
)

export default Page`

ここまでで、動的ページをクエリ文字列を使用して作成する方法を学びました。これはまだまだ始まりに過ぎません。

動的なページはレンダリングするのにもっと情報が必要なはずです。また、クエリ文字列を経由してすべてのデータを渡すことは出来ないかもしれません。そして[http://localhost:3000/blog/hello-nextjs](http://localhost:3000/blog/hello-nextjs)のような明確なURLを持ちたくなるかもしれません。
次のレッスンではそれらについて学んでいきます。

# ルートマスキングをしたクリーンURL

直前のレッスンでは、クエリ文字列を用いてどのように動的ページを作成するかを学びました。
このときのURLはこのような形でした：[http://localhost:3000/post?title=Hello%20Next.js](http://localhost:3000/post?title=Hello%20Next.js)

しかし、あまり綺麗ではありませんね。
ではこのようなURLだったらどうでしょうか：[http://localhost:3000/p/hello-nextjs](http://localhost:3000/p/hello-nextjs)

こっちのほうが良いですよね。このレッスンではこのようなURLで動的ページを生成していきます。

## 環境構築

create-dynamic-pagesブランチをチェックアウトしましょう。サーバの再起動まで行います。

shell

Copied!

`git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout create-dynamic-pages
npm install
npm run dev`

## ルートマスキング

ルートマスキングというNext.jsのユニークな機能を使っていきましょう。要するに、あなたのアプリケーションが実際に参照するURLとは違ったURLがブラウザに表示されるようになります。

ブログ投稿詳細URLにルートマスキングを施しましょう。

以下のコードをpages/index.jsで使用します。

pages/index.js

Copied!

`import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink id="hello-nextjs" title="Hello Next.js"/>
      <PostLink id="learn-nextjs" title="Learn Next.js is awesome"/>
      <PostLink id="deploy-nextjs" title="Deploy apps with Zeit"/>
    </ul>
  </Layout>
)`

以下のコードのかたまりを見てみましょう：

Copied!

`const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)`

`<Link>`要素では、"as"というpropを使用しました。これがブラウザで表示する必要があるURLになります。アプリケーションが参照するのは"href"というpropの中身になります。

さて、最初の投稿のリンクをクリックすると、投稿の詳細が表示されるはずです。
では、ブラウザの戻るボタンを押し、さらに進むボタンを押してみるとどうなるでしょう。
答えはindexページに戻って、また投稿の詳細ページに遷移します。
あなたが目撃したとおり、ルートマスキングはブラウザ履歴とともにいい感じに動いてくれます。リンクに"as"propを足せばよいだけなのです。

## 再読込

[http://localhost:3000](http://localhost:3000/)に戻りましょう。最初の投稿のタイトルをクリックすると、投稿詳細ページに遷移します。
そこでブラウザの再読込を走らせて下さい。何が起こるでしょうか？
Next.jsは404エラーを出力します。
なぜかというと、サーバで読み込む用の、そのようなページは存在していないからです。
サーバは`p/hello-nextjs`を読み込もうとします。しかし今の所2つのページしか用意されていません：`index.js`と`post.js`です。
これではプロダクションで実行できないので、直さなくてはいけませんね。**Next.jsの**[**カスタムサーバAPI**](https://github.com/zeit/next.js#custom-server-and-routing)**がこの問題を解決してくれます。**
次のレッスンではこれを学んでいきましょう。

# クリーンURLのためのサーバーサイドでのサポート

直前のレッスンではクリーンURLの作り方を学びました。要するにこんな感じのURLを持てるようになります。[http://localhost:3000/p/my-blog-post](http://localhost:3000/p/my-blog-post)

しかし、これはクライアントでの遷移のみで有効でした。ページをリロードすると、404ページが現れます。
なぜかというと、`p/my-blog-post`というページはpagesディレクトリ配下に実際には存在しないからです。
そこで、Next.jsの[カスタムサーバAPI](https://github.com/zeit/next.js#custom-server-and-routing)を使えばとても簡単に解決できます。

## 環境構築

変更をリセットして、別ブランチでサーバの再起動までしましょう。

shell

Copied!

`git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout using-shared-components
npm install
npm run dev`

## カスタムサーバを作る

[Express](https://expressjs.com/)を使ってカスタムサーバを作っていきます。とてもシンプルです。

まず最初にExpressをアプリケーションにインストールします。

shell

Copied!

`npm install --save express`

次に`server.js`というファイルをルート直下に作成し、以下の内容に書き換えてください：

server.js

Copied!

`const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})`

そしてpackage.jsonの"scripts"の内容を下記に書き換えます：

package.json

Copied!

`{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}`

書き換えたらもう一度`npm run dev`でサーバを再起動してみましょう。すると何が起こりましたか？

アプリケーションは動いたが、サーバーサイドでのクリーンURLは動かない、という状態だと思います。

## カスタムルートを作成する

先程のレッスンで分かったと思いますが、以前のようにアプリケーションは動きます。なぜかというと、さきほど書いたカスタムサーバはNext.jsがデフォルトで用意しているバイナリコマンドに似ていたからです。

それでは、投稿の詳細ページのURLにマッチするように、カスタムルートを追加していきましょう。

新しいルートを加えると、`server.js`はこのようになります：

server.js

Copied!

`const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})`

以下のコードに注目して下さい：

Copied!

`server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id } 
    app.render(req, res, actualPage, queryParams)
})`

ここでは、カスタムルートを"/post"という既存ページにマップさせています。そしてクエリ文字列も同様にマップさせています。
そう、それだけです。
ではアプリケーションを再起動して、以下のページにアクセスしてみましょう。そして再読込をしましょう。[http://localhost:3000/p/hello-nextjs](http://localhost:3000/p/hello-nextjs)

もう404ページは現れませんね。
しかし少しだけ問題が発生しました。何か分かるでしょうか？

答えは、クライアントサイドのタイトルと、サーバーサイドレンダリングされたタイトルが異なっていることです。

## URLの情報

`/post`ページはクエリ文字列パラメータの`title`を受け取ります。クライアントサイドでのルーティングでは、URLマスキングされた正確な値を、簡単に受け渡すことができます。（つまりLinkコンポーネントの"as"propによってです。）

Copied!

`<Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
  <a>{props.title}</a>
</Link>`

しかし、サーバーサイドのルートではタイトルを持っていません。なぜならURL中の投稿ID(:id)のみしか情報が得られないからです。投稿IDをサーバーサイドのクエリ文字列パラメータとして設定していました。

以下のルート定義を見てみると：

Copied!

`server.get('/p/:id', (req, res) => {
  const actualPage = '/post'
  const queryParams = { title: req.params.id } 
  app.render(req, res, actualPage, queryParams)
})`

これでは問題があります。しかし、クライアントサイドとサーバーサイド両方でデータ取得をするのにはIDを使うはずなので現実世界ではそこまで問題になりません。
なので、IDのみが必要な情報です。

このレッスンではNext.jsカスタムサーバAPIを使用して簡単にルートを作ることが出来ました。それに加え、サーバーサイドでのクリーンURLも追加しました。このように、ほしいルートを好きなだけ作ることが出来ます。

また、Expressだけでなく、Node.jsサーバフレームワークならどれでも使用可能です。詳しくは[カスタムサーバAPI](https://github.com/zeit/next.js#custom-server-and-routing)のドキュメントを見て下さい。

# ページのためのデータfetchをする

ここまででまずまずのNext.jsアプリケーションを作ることができましたし、Next.jsルーティングAPIの利点を最大限に得ることができました。

実践ではたいてい、リモートのデータソースからデータをfetchしなくてはいけません。Next.jsでは、ページ用にデータfetchをする標準APIを搭載しています。それは非同期関数の`getInitialProps`と呼ばれるものです。

これによって、リモートのデータソースからのデータfetchをページのために行えるだけでなく、propsとしてページにデータを渡すことも出来ます。サーバーサイドとクライアントサイド両方で動く`getInitialProps`をNext.jsは用意しているのです。

このレッスンでは`getInitialProps`と[TVmaze API](http://www.tvmaze.com/api)を使って、バットマンTVショーの情報を表示するアプリを作っていきます。

## 環境構築

変更をリセットして、別ブランチでサーバの再起動までしましょう。

shell

Copied!

`git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout clean-urls-ssr
npm install
npm run dev`

## バットマンのデータをfetchする

今まで作ってきたデモアプリケーションはブログの投稿をホームページにリストで表示させるものでした。それではバットマンの番組のリストを表示させましょう。
ハードコーディングするのではなく、リモートのサーバからデータをfetchしてきましょう。
ここではテレビ番組の情報を検索できる[TVmaze API](http://www.tvmaze.com/api)を使っていきます。

まず最初に[isomorphic-unfetch](https://github.com/developit/unfetch)をインストールする必要があります。これはデータfetchをするためのライブラリで、ブラウザのfetch APIをでシンプルに実行できるだけでなく、クライアントとサーバーサイドの両方で動いてくれます。

shell

Copied!

`npm install --save isomorphic-unfetch`

では、`pages/index.js`を以下の内容に書き換えましょう：

pages/index.js

Copied!

`import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index`

ここまで触れてきた`Index.getInitialProps`という関数がちゃんと入っていますね：

Copied!

`Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}`

`getInitialProps`はstatic async関数で、アプリケーションのどのページにも追加できます。これを使うことでfetchしたデータをページにpropsとして渡すことができます。

[http://localhost:3000](http://localhost:3000/)にアクセスすると、見ての通り、バットマンの番組情報をfetchして、ページに"shows" propとして受け渡すことが出来ました。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcloud.githubusercontent.com%2Fassets%2F50838%2F26300128%2Fde007dd6-3efa-11e7-9084-6ba7ff10774b.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=d7478560bcce7afd4a85703e0bf5ffac)

`getInitialProps`関数を見ると、fetchしたデータの数をコンソール出力するコードが書いてあります。
ブラウザのコンソールと、サーバのコンソール両方を見てみましょう。
ではページを再読込みします。
ページがロードされたあと、どこに出力が見えたでしょうか？

正解はサーバのコンソールでした。

ページのリロードの場合だと、サーバのみに表示されます。
なぜかと言うと、ページはサーバでレンダリングされるからです。
データはサーバ側で既に得ていたので、クライアントで再びfetchする理由は無いわけです。

## 投稿詳細ページでの実行

では、テレビ番組の詳細な情報が表示される"/post"ページで実行していきましょう。

最初に、`server.js`を開いて、`/p/:id`のルートを以下の内容に変更します：

server.js

Copied!

`server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
})`

それが終わったら変更を適用させるためにサーバを再起動して下さい。
先程は`title`のクエリパラメータをページにマップさせていました。今度はそれを`id`にリネームさせる必要があります。

そして、`pages/post.js`を以下の内容で書き換えてください：

pages/post.js

Copied!

`import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post =  (props) => (
    <Layout>
       <h1>{props.show.name}</h1>
       <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={props.show.image.medium}/>
    </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post`

ではこのページの`getInitialProps`に注目しましょう：

Copied!

`Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}`

この関数の第一引数は**context**オブジェクトです。このオブジェクトはfetchに使えるクエリ情報を持っています。
この例では、まず番組のIDをクエリパラメータから引き出して、番組データをTVMaze APIからfetchしました。

この`getInitialProps`関数では番組タイトルを`console.log`で表示させるコードを入れています。
クライアントとサーバの両方のコンソールを開いて下さい。[http://localhost:3000](http://localhost:3000/)でホームページにアクセスします。そして一番上のバットマンの番組タイトルをクリックして下さい。

では、コンソールのメッセージ、つまり番組タイトルはどこに表示されたでしょう？

答えはブラウザのコンソールのみに表示されたはずです。
なぜなら、投稿詳細ページへはクライアントサイドのみでの遷移だったからです。つまり、データをfetchするにはクライアントサイドでの実行がベストです。

もし投稿詳細ページにダイレクトでアクセスした場合（例: [http://localhost:3000/p/975](http://localhost:3000/p/975)）は、クライアントではなくサーバのみでメッセージが出力されているのが確認できるでしょう。

これでNext.jsの必要不可欠な機能はほとんど学べました。その機能とは、クライアントとサーバ両方で動く理想的なデータfetchと、サーバーサイドレンダリングです。

ほとんどのユースケースにおいて十分機能する`getInitialProps`の基礎を学びました。より詳細は[Next.jsのドキュメントのdata fetchのコーナー](https://github.com/zeit/next.js#fetching-data-and-component-lifecycle)で確認してみて下さい。

# コンポーネントをスタイリングする

今まではコンポーネントをスタイリングさせることは後回しになっていました。しかし、このレッスンではスタイルを付けていく方法を学んでいきます。

Reactアプリケーションではスタイルを適用させる技術がたくさんあります。そしてそれらはおおまかには2つのカテゴリーに分けられるでしょう。

1.伝統的なCSSファイルベースのスタイリング（SASS, PostCSSを含む）
2.[CSS in JS](https://github.com/MicheleBertoli/css-in-js)のスタイリング

伝統的なファイルベースのスタイリングは多くの問題点（特にSSRの場合）があります。なので、Next.jsでスタイリングする際にはこれは避けるように推奨しています。
そのかわり、CSSファイルをインポートするのではなく個々のコンポーネントにスタイルを付けられるCSS in JSの方法をおすすめしています。

Next.jsは[styled-jsx](https://github.com/zeit/styled-jsx)という、簡単に導入、スタイリングが出来ることを目的とした、CSS in JSフレームワークをプリロードしています。
おなじみのCSSの書き方でコンポーネントにスタイリングできます：書かれたCSSは別のコンポーネントには影響を与えないようになっています。（子コンポーネントに対してもです。）

つまりはスコープが限定されたCSSが書けるということです。

## 環境構築

変更をリセットして、サーバの再起動までしましょう。

shell

Copied!

`git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout clean-urls-ssr
npm install
npm run dev`

## ホームページをスタイリングする

ホームページをスタイリングしていきましょう。`pages/index.js`を下記内容に書き換えて下さい：

pages/index.js

Copied!

`import Layout from '../components/MyLayout.js'
import Link from 'next/link'

function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ]
}

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {getPosts().map((post) => (
        <li key={post.id}>
          <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)`

`<style jsx>`要素を見て下さい。ここにCSSを書いています。
このコードに差し替えたあとはこのような画面になっているはずです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcloud.githubusercontent.com%2Fassets%2F50838%2F25552915%2Ff18f2f12-2c5a-11e7-97aa-4b9d4b9f95a7.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ef8c455a81b41ca8e14af1502057aa34)

styleタグの中には直接はスタイルを書いているわけではありません。むしろテンプレート文字列として書かれています。

テンプレート文字列をなくして、下記のようにCSSを直接書いてみましょう。

Copied!

`<style jsx>
  h1, a {
    font-family: "Arial";
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
    margin: 5px 0;
  }

  a {
    text-decoration: none;
    color: blue;
  }

  a:hover {
    opacity: 0.6;
  }
</style>`

するとどうなるでしょう？

答えは"SyntaxError: Unexpected token"というエラーが発生します。

Styled jsxはbabelプラグインとして動きます。すべてのCSSをパースして、ビルドプロセスに組み込みます。（それによって、オーバーヘッドの時間が全くありません。）
また、styled-jsxの中に束縛を持ち込みます。この機能により、styled-jsxの中に動的に変数を入れることが出来るようになります。なのでCSSはテンプレート文字列である必要があるのです。

## スタイルとネストされたコンポーネント

ではホームページに簡単な変更を加えてみましょう。このように、リンクを独立したコンポーネントにします：

pages/index.js

Copied!

`import Layout from '../components/MyLayout.js'
import Link from 'next/link'

function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ]
}

const PostLink = ({ post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a>{post.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {getPosts().map((post) => (
        <PostLink key={post.id} post={post}/>
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)`

上記に書き換えると、スタイルにどんな変化が起こるでしょうか。

答えは、h1のスタイルは残りますが、リンクにスタイルが効かなくなります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fcloud.githubusercontent.com%2Fassets%2F50838%2F25552972%2F6becac5c-2c5c-11e7-9fce-61cdc207a10d.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=1c8e34f2cde822adf0f6938dfc9d18e8)

ご覧の通り、子コンポーネントにはCSSが影響しなくなりました。

styled-jsxのこの機能は、大きいアプリケーションを作る際に、スタイルを管理する助けになってくれるでしょう。

このような場合、子コンポーネントに対して直接スタイルを当てなくてっはいけません。今回はPostLinkコンポーネントに当てる必要があります：

Copied!

`const PostLink = ({ post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)`

一方で、グローバルにCSSを当てたい場合は[こちらの方法](https://github.com/zeit/styled-jsx#global-selectors)で可能です。

## グローバルのスタイル

ときには子コンポーネントの中のスタイルを変更する必要が出てきます。これはReactでマークダウンを使っていると特にあると思います。投稿詳細ページを見て下さい。`pages/post.js`

これがグローバルなスタイルを簡単に適用させる例です。styled-jsxでグローバルなCSSを追加する前に、以下の内容を`pages/post.js`に適用させてください。
また、こちらに書き換える前に、[react-markdown](https://github.com/rexxars/react-markdown)コンポーネントをインストールしましょう。`npm install --save react-markdown`

pages/post.js

Copied!

`import Layout from '../components/MyLayout.js'
import {withRouter} from 'next/router'
import Markdown from 'react-markdown'

export default withRouter((props) => (
  <Layout>
   <h1>{props.router.query.title}</h1>
   <div className="markdown">
     <Markdown source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
     `}/>
   </div>
   <style jsx global>{`
     .markdown {
       font-family: 'Arial';
     }

     .markdown a {
       text-decoration: none;
       color: blue;
     }

     .markdown a:hover {
       opacity: 0.6;
     }

     .markdown h3 {
       margin: 0;
       padding: 0;
       text-transform: uppercase;
     }
  `}</style>
  </Layout>
))`

では、この変更で何が起こるか。
スタイルがマークダウンの内容にも適用されたはずです。

この機能が簡単に使える一方で、常にスコープが限定されたスタイルで書くことに努めるようにおすすめしています。

styled-jsxは通常のstyleタグの問題を解決する素晴らしい方法です。styled-jsxによって、babelプラグインの中でCSSバリデーションが行われ、クラス名に接頭辞が全てに付いた状態で出力されるため、無駄な時間はとられないはずです。

ここまではstyled-jsxの一面をなぞっただけで、他にも出来ることがたくさん用意されています。[こちらに詳細があります](https://github.com/zeit/styled-jsx)のでリファレンスとして使って下さい。
また、[他にも素晴らしいスタイリング方法](https://github.com/zeit/next.js#css-in-js)をNext.jsではたくさん用意しています。こちらもチェックしてみて下さい。

# Next.jsアプリケーションをデプロイする

ではどうやってNext.jsアプリケーションをデプロイすればいいだろう、と思いませんでしたか？
まだ触れていませんでしたが、それは非常にシンプルで簡単です。

Next.jsアプリケーションはNode.jsが走る環境ならどこでもデプロイできます。なので、どのプラットフォームにもロックインが発生しないのですが、[▲ZEIT Now](https://zeit.co/now)でデプロイする方法がsuper simpleでおすすめです。

## 環境構築

変更をリセットして、サーバの再起動までしましょう。

shell

Copied!

`git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout using-shared-components
npm install
npm run dev`

## ビルドと起動

まず最初にNext.jsアプリケーションをプロダクションのためにビルドしなくてはいけません。プロダクションに最適化されたソースコードに変換されます。

では、npm scriptに簡単に以下を追加します：

package.json

Copied!

`"scripts": {
  "build": "next build"
}`

次に、ポートを使ってNext.jsアプリケーションをスタートする必要があります。つまり、サーバーサイドレンダリングをし、上記コマンドでビルドされたページを配信します。`"start": "next start"`をscriptsに追加します。

package.json

Copied!

`"scripts": {
  "build": "next build"
  "start": "next start"
}`

3000番のポートでアプリケーションが立ち上がります。

以下コマンドを実行するとプロダクションの状態でアプリケーションを走らせることができるようになりました：

shell

Copied!

`npm run build
npm run start`

## 2つのインスタンスでアプリケーションを走らせる

次に、アプリケーションを2つ走らせましょう。アプリケーションは水平スケールさせるのが普通です。
最初に、npm scriptに以下の変更をしましょう。

package.json

Copied!

`"scripts": {
  "start": "next start -p $PORT"
}`

もしWindowsをお使いの方は`next start -p %PORT%`という風に修正してください。

ではビルドします。

shell

Copied!

`npm run build`

次に以下のコマンドをターミナルで実行してみましょう：

shell

Copied!

`PORT=8000 npm start
PORT=9000 npm start`

Windowsでは、違うコマンドを実行する必要があります。ひとつはnpmモジュール`cross-env`をインストールする方法です。インストールしたら`cross-env PORT=9000 npm start`で走らせましょう。

では、両方のポートでアプリケーションは走ったでしょうか？
答えはYesです。
おわかりの通り、必要なビルドは一回だけです。あとはお望みのポートでたくさんのアプリケーションを走らせることができます。

## ▲ZEIT Nowにデプロイする

Next.jsアプリケーションをビルドしてスタートする方法を学びました。すべてnpm scriptsで完結しています。なので、お好きなデプロイサービスでカスタマイズが可能です。

[▲ZEIT Now](https://zeit.co/now)を使用し、以下のスクリプトを`package.json`ファイルに記載します。

package.json

Copied!

`"scripts": {
  "build": "next build",
  "start": "next start -p 8000"
}`

次に、`now.json`というファイルをプロジェクトのルートディレクトリに以下の内容で作成します。

now.json

Copied!

`{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@now/next" }
  ]
}`

最後に、[Nowをインストール](https://zeit.co/now)し、以下のコマンドを実行します：

shell

Copied!

`now`

要するに、ターミナルを使って、アプリケーションのルートディレクトリで`now`と打つということです。

ここでは8000番のポートでアプリケーションをスタートしました。しかし、ZEIT Nowにデプロイする際には何も変えていません。
では、ZEIT Nowにデプロイされたアプリケーションには、どのポートでアクセスできるでしょうか。

答えは443、もしくは何もポートを指定しない、です。

8000番のポートでアプリをスタートしても、nowにデプロイされれば443番のポートでアクセスできるようになります。（httpsのデフォルトのポート番号です。）

これが▲ZEIT Nowの特徴です。
どんなポート番号でも、アプリケーションをスタートするだけで、▲ZEIT Nowは常に443番にポートをマップしてくれます。

Nextのビルダー"@now/next"をさらに学習するには[ZEITのドキュメント](https://zeit.co/docs/v2/deployments/official-builders/next-js-now-next)を御覧ください。

## ローカルでアプリケーションをビルドする

▲ZEIT Nowは自身のインフラでアプリケーションをビルドします。
しかし、すべてのホスティングサービスがそうなっているわけではありません。その場合に、アプリケーションをローカルでビルドできるようになっています：

shell

Copied!

`npm run build`

これで`.next`ディレクトリにアプリケーションがデプロイされます。

これでNext.jsアプリケーションを▲ZEIT Nowにデプロイする方法が分かりました。
また、より詳しい情報は[deploying Next.js](https://nextjs.org/docs#production-deployment)のドキュメントで学べます。

もしデプロイに関して疑問がありましたら、[Spectrum](https://zeit.chat/)で気軽に質問して下さい。

# おわりに

以上がNext.jsでは公式が提供する[チュートリアル](https://nextjs.org/learn/)の"BASICS"でした。
続きに"EXCEL"があり、そこではHTMLの静的書き出し、モジュールのLazy Loading、コンポーネントのLazy Loadingが学べます。