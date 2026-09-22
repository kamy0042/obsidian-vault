---
URL: https://qiita.com/ryokkkke/items/1bd858a5d6f261a9342a
Created: 2021-01-03T15:09:00
Updated: 2021-01-03T15:11:00
Tags: [topic/技術/React/Nextjs]
---
# 概要

Next.js 9.3から `getServerSideProps` という仕組みが導入されました。

[https://nextjs.org/docs/basic-features/data-fetching](https://nextjs.org/docs/basic-features/data-fetching)

上記がそのドキュメントですが、これを読んで感動した私はつい語りたくなってしまいました、私情が多分に含まれております、ああそういう視点もあるんだくらいに見ていただければと思います。

僕自身は、SEOをあまり気にしないいわゆるSPAっぽいWebページのNext.jsでの開発を1年ちょいくらい業務でやっていて、今もNext.jsユーザーです。

- 「`getServerSideProps`って何が良いの？なんで生まれたの？」
- 「なんで`getInitialProps`は非推奨なの？」
- 「Vercel製のSWRってライブラリあるけど、あれ何？」
- 「てか`getServerSideProps`とSWRって関係あるの？」

この辺の疑問をお持ちのNext.jsユーザーの方は是非ご一読ください。

※過剰な煽りタイトルであることを自覚していますので、先に謝っておきます、すみません。

# **2020/11/14追記**

当時から状況が変わっていたり考えが変わっていたりする部分もあるので、一部修正しています。
それなりに引用頂いていたりするので、念のためCHANGELOGとして記事最下部に修正の記録と理由を残しておきます。

主に、Nextの主流の方向性がSSRからSSGに変わってきていることが背景です。
（これのソースとしては[Basic Features: Pages | Next.js](https://nextjs.org/docs/basic-features/pages)このページをご覧ください。SSRの話はSSGの話の後に登場し、SSGについては

> Static Generation (Recommended)

という表記になり、公式に`pages/`配下のレンダリング方法として「推奨」とされています。）**つまり、「Nextは『SSRするためのフレームワーク』だよね？」という質問に対しては現時点で明確にノーと言えます。**

とはいえSSRが消えたわけではありません。
個人的なSSRに対する気持ちとしては大筋この記事に書いた内容と変わっていません。

# TL;DR

僕の主張は

- `**getInitialProps**`**をやめて**`**getServerSideProps**`**を使おう。**
- 認証が必要なページ（もっと言えばSEOを気にしないページ）では**SSR時に（=サーバサイドで）認証が必要なAPIコールをするのをやめよう。**
- そうするとクライアントサイドでのAPIコールが重要になるから、Vercelが公式に支援してくれるよ、それがSWRだよ。

**これによって、Next.jsはよりシンプルでより強力なフレームワークになります。**

# `getServerSideProps`とは？

`**getServerSideProps**`**とは、「**`**getInitialProps**`**をサーバサイドだけで実行するようにしたもの」です。**

サーバサイドでだけ？じゃあブラウザ上でページ遷移したときどうなるの？

って思うと思うんですが、これはNext.jsの頑張りで解決されます。
なんとブラウザ上でページ遷移するとサーバにリクエストが飛び、サーバサイドで`getServerSideProps`が実行され、ブラウザはその結果のpropsの中身をjsonで受け取り、通常通りレンダリングを続けます。
これに関してはユーザーは一切設定の必要がなく、関数を書くだけで実現出来ます。**Next頑張りすぎ案件**なんですが、なぜここまでするんでしょうか。それも合わせて続きを読んでみてください。

今までページのトップのコンポーネントに渡すPropsは`getInitialProps`を使っていましたね。`getInitialProps`はSSRでもCSRでもページの表示時に同じように実行されます。めっちゃUniversal JS感ありますよね。`getInitialProps`の中でAPIリクエストとかを書いておくと、SSRしてもCSRしてもレンダリングの最初からデータを取得できるわけです。クール。

ところが、[こちらがgetInitialPropsのドキュメント](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)なんですが、`getServerSideProps`の登場により、公式に「`getInitialProps`よりも`getServerSideProps`の方がオススメだよ！」という状態になりました。

> Recommended: getStaticProps or getServerSidePropsIf you're using Next.js 9.3 or newer, we recommend that you use getStaticProps or getServerSideProps instead of getInitialProps.These new data fetching methods allow you to have a granular choice between static generation and server-side rendering. Learn more on the documentation for Pages and Data fetching:

# なぜ公式に`getServerSideProps`を推すのか？

一見`getInitialProps`を機能制約しただけのように見えますよね。
なのになんで推奨？

（あまり具体的にこの理由が書かれていないのはなぜだろう、もし公式の文章とかあったら教えてください。）

上記の公式ドキュメントで何気に最も重要だと思うのは[このfetching-data-on-the-client-sideの項目](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side)の次の文です。

この項目は、[getServerSidePropsをどんな場面で使うべきか？](https://nextjs.org/docs/basic-features/data-fetching#when-should-i-use-getserversideprops)という項目からもリンクされています。

> This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

「認証が必要なページはSEO関係ないし、そういう頻繁に更新されるデータってレンダリング時というよりは随時更新した方が良いし、全部ブラウザ上でAPIコールすれば良いよね」というようなことを言っていて、上記の`getInitialProps`非推奨と合わせると、**それはつまり「Next.jsは認証が必要なページに関してはSSRでデータ取得を行うのはやめた方が良いと思ってるよ」ということなんですよね（と、僕は解釈しました）。**

つまり、SSRでページのメインコンテンツのレンダリングが必要なのはSEOを意識するページだけ。いや、うん、当然すぎるんだけどね...

以下で詳しく説明します。

# SSRのつらみがどこから来るか

**SSRとCSRが混合されたSPAを作るのって非常に難しい**んですよね。

基本的にNextが色々と環境（サーバ or ブラウザ）の差分吸収をしてくれるとは言え全てを隠蔽してくれるわけではないので、**依然としてUniversal JSを意識して書かないと死ぬ**し、「ここからSSRしてここにCSR（クライアントサイドレンダリング）するとReduxStoreのこのプロパティがこうなって...」みたいなやけに細かいことを考える必要が出てきたりする。

その中でも、特に色々なものをややこしくするのが、**SSRからの認証ありなAPIコール**です。

## SSRから認証情報付きのAPIコールをするためには

**ブラウザはリクエスト時に自動でCookieを付与してくれますが、サーバにはそんな機能はありません。**
ので、ブラウザから来たリクエストの中に含まれる認証情報を取り出して、サーバからのリクエストにもそれを付与する必要があります。

これだけだと大してツラくないように見えますが、**自分らでCookieをいじったりあとはサービス特有のヘッダをforwardingしたりとか色々実運用のための実装を載せていくと結構カオスになります。**

## サーバでもブラウザでもメインの処理が走る

それだけでなく、APIコールを行うということはそれはつまりほとんどの場合ページのメインコンテンツをレンダリングするということであり、**ページそのもののレンダリングがサーバでもブラウザでも行われるということを意味します。**

純粋に、実行環境が一つから二つになるだけで複雑度は非常に高くなります。
CSRでは起きないけどSSRだと起きる問題、またその逆、みたいなのが出てきます。

## `getInitialprops`の功罪

`getInitialProps`はサーバとブラウザの差分を吸収してくれる画期的なAPIだったわけですが、**これがカオスを呼び込みました。**
つまり、サーバでもブラウザでも実行されるので、`**getInitialProps**`**の中に必然的に認証が必要なAPIコールが登場してしまうわけです。**
そうなると、**SSRでも認証が必要なAPIコールを行うのが自然になり、上記のように複雑度が高まっていきます。**

クライアントサイドで認証が必要なAPIコールをするのは自然ですし、ページのトップコンポーネントにPropsを渡す方法は`getInitialProps`しか無かったので、これは当然の流れでしょう。
（ていうか、公式のドキュメントでも`getInitialProps`の中でAPIコールをしていました）

でも、上記で書いたように、SEOが関係ないページではメインコンテンツのレンダリングをサーバサイドで行う必要は無いんです。
無駄に複雑度を高めるだけ。

`**getInitialProps**`**の非推奨、そして**`**getServerSideProps**`**の使用は、この自然にサーバサイドで認証ありなAPIコールをしてしまうことを防ぐ効果があります。**

ちなみに、もちろん`getServerSideProps`の中でも認証ありのAPIコールは実行可能です。
引数で`context`というオブジェクトが渡ってくるので、`context.req.~~`とかやるとブラウザからの情報を取得できるはずです。
それでも、何も考えなくても入り込んでしまう`getInitialProps`よりはそのわざわざ感ゆえに防ぐ効果は十分あると思いますし、ライブラリとしてそういう思想なんだぞ、というのを実装で主張するというのは大事なことだと思います。

# そもそもそういう認証が必要なAPIコールで取得するようなデータってSSRで提供する必要なくない？

そしてもう一つ同時にVercelがサーバサイドでの認証ありAPIコールをやめた方が良いと思っている理由は、**「頻繁に変わるデータ、わざわざ初回のレンダリング時に頑張ってサーバで取得する必要なくない？だって更新するたびに何度もブラウザで取得したりするじゃん」**っていう意見です（これはちゃんとドキュメントに書いてあります）。
（もちろんこれはSEOが関係ない、つまり本質的にSSRをする必要が無いページにおける話です）

上記で引用したような、privateでかつuser-specificなデータというのは、つまり一般的なログイン機能が存在するSPAを想像してもらえればわかりやすいですが、ブラウザ上で編集されたり他のユーザーが投稿したりと頻繁に更新され、頻繁に取得されます。
（「頻繁」という言葉の理解を進めるために、対比としてブログの文章データなんかを想像して頂ければと思います）

**それをわざわざ初回レンダリング時に1回取得するために、頑張ってサーバサイドでAPIコールする仕組みを整える必要って、本当にある？**

## ブラウザで全部やろうよ

だからさ、そういうデータの取得は全部ブラウザでやろうよ。
そのために便利なライブラリ置いとくからさ。名前？SWRって言うんだけど。

[https://nextjs.org/docs/basic-features/data-fetching#swr](https://nextjs.org/docs/basic-features/data-fetching#swr)

ということでVercel公式のデータフェッチ支援ライブラリがオススメですよ。
SWRの良さについてはまた別記事で書こうと思うのでそこまで詳しく書きませんが、SWRは上記のようなデータの「取得」に関してとりあえず使っとけとなるレベルには楽に高機能を実装できるライブラリです。
ReduxとかStorybookと一緒に使う場合はどうするの的な問題は別でありますが。

### データの「取得」

SSRから認証ありのAPIコールをなくす場合、影響を受けるのってデータの「取得」だけですよね。
SSRではデータの「更新」が行われることは通常ないからです（もしあったとしたらそれはブラウザからのGETリクエストに副作用があるということになるので、やめた方が良いです）。

SWRが支援しているのはデータの「取得」のみであることも、この文脈で納得出来ます。

# まとめ

こうしたVercelの方針を加味したうえで、Next.jsを使ううえでの僕の主張はこうです。

- 基本的にSSRをするとコードが複雑になるので、避けられるなら避けるべき。
- SSRが必要なのはSEOを意識するWebページだけ。
- SEOが不要なページであれば、認証ありなAPIコールは全てブラウザ上で行えば良い。
- 不用意な混入を防ぐために、`getInitialProps`をやめて`getServerSideProps`を使おう。

## 感想

なんでこれに感動したかと言うと、自分自身が当然のように`getInitialProps`の中で認証ありなAPIコールをしていたからなんですよね。
「SSRは人類には早すぎたのだ！」と僕はなんど思ったかわからないという感じなんですが、SSRという技術の使い所がどこなのかを、Next.jsは実装で示していると思うのです。
SSRがどういう場面で必要かということは理解していましたが、改めてハッとさせられました。

Next.jsの登場でSSRが手の届きやすい存在になってなんとなく導入する、みたいなのがこれからもあるんじゃないかなと思うので、それには警鐘を鳴らしていきたいという気持ちでした。
あなたのそのSSR、本当に必要ですか？

# 蛇足

ちなみに、`getServerSideProps`の紹介のブログにはこんな文章もあります。

> This increases performance in many cases as the server will generally have a faster connection to the data source. It also increases security by exposing less of the data fetching logic.

（和訳）サーバーは通常、データソースへの接続が高速になるため、多くの場合、これによりパフォーマンスが向上します。また、公開するデータフェッチロジックが少なくなるため、セキュリティが向上します。

前者に関してはNext.jsが動いているサーバとデータストアのサーバが近いことが前提ですが、このメリットももちろんありますね。
もしもこのメリットをprivateでuser-specificなデータを扱うSPAでも享受したいと思ったら、挑戦しても良いのかもしれません。
少なくとも現時点での僕は絶対にやりたくないですが...

# CHANGELOG

CHANGELOG

## 削除（2020/11/14）

- `# 厳密にはSSRをなくすわけではない
- SSRをするとかしないとか書いてますが、厳密にはNext.jsで書く以上SSRは必ずされます。
- ただし、APIコールがなくメインのコンテンツがサーバサイドでレンダリングされない場合、基本的にはSSRで返ってくるHTMLはApp Shell（Webアプリケーションのガワ）だけ、みたいな感じになるでしょう。
- それはそれで良くて、つまり僕が言いたいのは**SSRそのものをなくしたいというわけではなく、SSR起因の不要な複雑さをなくしたいという意味なのです。**`

**Next.js最新版において、「SSRは必ずされます」はもはや間違いです。**
この記事を書いた当初はSSGについて`next export`でしょ？ヘッドレスCMS使いたい人向けでしょ？みたいに思っていたので特に触れていなかったのですが、直後に知人からSSGの話を受けて確かに！と思い、そしたらすぐに9.4でISGの話が公式から出てきてこれはいよいよSSRっていうかSSG（というかstatic至上主義的方向性）やんけみたいな考えの変遷が自分の中にもありました。
もうだいぶこの辺の話はNextユーザーの中では広まりつつあると思いますが、個人的にも別記事でまとめたいなと思っています。
少なくともこの「必ずSSGされます」は記述としてもはや間違いなので消しておきます。