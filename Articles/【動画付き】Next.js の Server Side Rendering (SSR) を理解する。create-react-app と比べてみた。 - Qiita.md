---
URL: https://qiita.com/G-awa/items/639f4f83aa4d97bc1f0d
Created: 2021-01-03T15:08:00
Updated: 2021-01-03T15:10:00
Tags: [topic/技術/React/Nextjs]
---
![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F163591%2Fe9611919-79b4-0604-8054-2212be9a630f.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=10613ea67d1d3e21cc93287249d037d5)

[Next.jsのサイト](https://nextjs.org/)、かっこいいですよね 😊
クールで、パフォーマンスにも優れていてエンジニアを魅了します。
日本では Nuxt.js が人気のようですが、個人的には Next.js を推しています。

さて、先日 [Next.js のチュートリアル](https://nextjs.org/learn/basics/getting-started) を通してサーバサイドレンダリングについて考えさせられる機会がありました。本記事では、そもそもサーバサイドレンダリングのメリットとは？というところから初めて、`create-react-app` によって実装された SPA と、`next`によって実装された SSR ではどのような違いがあるのかを検証してみました。

以下の動画は本記事のサマリーです。
作成したアプリケーションへのリンクも貼っておきます。
右の方がちょっとだけ描画が遅いのがわかりますね。

![](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/163591/433a3813-cfbf-86e3-f12a-fd626fcd7c87.gif)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F163591%2F8c1cfb3f-1e73-1c8e-22b4-81f3fab7eb4a.gif?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=2927d153ccb2af91b0221eaca4a5026e)

👆（左）[next.js で SSR](https://batman-tv-shows.geeawa.now.sh/)、（右）[create-react-app で SPA](https://badman-tv-shows-create-react-app.now.sh/) 👆

# サーバサイドレンダリング（SSR）とは

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F163591%2Fee9f9581-f2bc-a6da-c0fa-7b09758a9f01.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=a136de2b0597d91d8a3ffc9ad41bfb98)

従来の React ベースのアプリケーションの構成を振り返ってみましょう（右図）。この構成の場合、ユーザからのリクエストは、まずはじめに React サーバ（S3 や Netlify）から JavaScript のソースと必要最小限のほとんど空っぽな HTML を返します。それからフロントエンドで HTML 要素をレンダリングする方法をとります。

このようにバックエンド API とフロントエンドの描画を完全に分離する事によって、開発体制を分離した生産性向上や、ユーザに優れた UX を提供できるようになりました。
その一方で、過度なネットワーク通信が発生したり、JavaScript によって生成された Web サイトを検索エンジンのクローラが検知できなくなりました。その結果として、Google の検索項目の上位に自サイトが表示されにくいなどのデメリットも招いてしました。※[こちら](https://medium.com/@sundaycrafts/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E4%BD%93%E9%A8%93%E3%82%92%E5%90%91%E4%B8%8A%E3%81%95%E3%81%9B%E3%82%8B%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0javascript-%E6%AD%B4%E5%8F%B2%E3%81%A8%E5%88%A9%E7%82%B9-df68cd7cd991)の記事で紹介されていますが、最近ではあまり問題にならなくなっているようです。

さて、このような問題を解消するためのテクニックがサーバサイドレンダリング(ServerSideRendering)です（左図）。サーバサイドレンダリングは従来フロントエンドで行なっていたレンダリングをバックエンドの Node.js サーバ**にも**移譲しようという考え方です。これにより、モバイル端末がどんなに脆弱でも、ハイパフォーマンスなサーバを使用してレンダリングできます。さらに無駄なネットワーク通信回数も最小限に減らせるでしょう。「バックエンドの Node.js サーバ**にも**」と強調しているのは、フロントエンドでももちろん描画ができる、ということです。初期ページの一部だけはサーバサイドでレンダリングして、残りの要素はフロントエンドからフェッチしてきてレンダリングするといったように用途に応じて使い分けができます。

### パフォーマンス

遅いデバイスを使用していると、最初のページのレンダリングに時間がかかり、ユーザ体験が低下します。計算をより強力なサーバーにオフロードすることで、ユーザーが待機する時間を最小限に抑えることができます。
また、サーバーで初期データをプリフェッチしてページを構築すると、サイトを表示するために必要なラウンドトリップの回数が大幅に削減されます。これにより、待ち時間の短縮と帯域幅消費の削減につながります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F163591%2Fc2322575-c35c-be8c-41ee-75063a1e6cd6.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=80ec23091ce77bab839fd2918ff8a923)

### SEO 対策

SSR を行なっているサイトは、ページが検索エンジンで簡単にインデックス化されます。クライアント側でルーティング制御を行なっていると、検索エンジンのウェブクロールを遅らせてしまいます。この結果、検索エンジンの上位にリンクを表示することが難しくなります。

# Next.js ことはじめ

SSR を理解するために必要最小限の構成で Next.js アプリケーションを組み立てていきます。

### 必要なライブラリとアプリケーションの実行

`$ mkdir next.ssr
$ cd next.ssr
$ yarn init -y`

Next.js を最小構成で始めるために必要なライブラリは `next` と `react`, `react-dom` だけです。早速 `yarn` でインストールしましょう（`npm` でもよいですよ）

`$ yarn add react react-dom next`

`package.json` には以下の `npm scripts` を記載しておいて開発を楽に進められるようにしておきましょう。

package.json

`"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}`

それぞれのコマンドは以下のように使用します。

- dev - ローカルでアプリケーションを起動します。
- build - プロダクション用にアプリケーションをビルドします。
- start - プロダクション環境でアプリケーションを実行します。

### ルーティング

Next.js は非常にシンプルな設計思想でフロント画面が作れるように構成されています。`/pages` ディレクトリ配下に配置されている js ファイルごとにパスルーティングが行われます。はじめの一歩として `/pages/index.js`にファイルを配置して、`/`という URL で表示できるようにしてみましょう。詳細なドキュメントは[こちら](https://nextjs.org/docs/routing/introduction)

`$ mkdir pages
$ touch pages/index.js`

pages/index.js

`const Index = () => {
  return <h1>Hello World</h1>;
};
export default Index;`

ファイルパスと URL パスには以下のような対応関係があります。

ファイルパス
URL パス




pages/index.js
/


pages/blog/index.js
/blog


pages/blog/first-post.js
/blog/first-post


pages/dashboard/settings/username.js
/dashboard/settings/username


pages/blog/[slug].js
/blog/:slug (/blog/hello-world)


pages/[username]/settings.js
/:username/settings (/foo/settings)


pages/post/[...all].js
/post/* (/post/2020/id/title)

さて、ここまでできれば準備完了です。アプリケーションを起動してみましょう。

`$ yarn dev`

ブラウザを起動し、`/` にアクセスすると画面が表示されるはずです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F163591%2F37981d90-68a8-7c39-2c3d-9990261633bd.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=e4a1d1e7eca1a0ebed43debe9a241204)

### サーバサイドレンダリングの実装

ここから SSR ができるような機能を作っていきましょう。

`<Link>` コンポートを使用して、他ページに遷移します。以下の例だと `/shows/[id]` へ遷移させようとしています。また、Next.js には、ページのデータを取得するための標準 API が付属しています。 `getInitialProps` という非同期関数を使用して実行します。`getInitialProps` を使用すると、特定のページのデータをフェッチしてページに渡すことができます。 `getInitialProps` はサーバーとクライアントの両方で動作します。
この `getInitialProps` の振る舞いを観測し、SSR を理解していきましょう。

index.js

`import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Index = props => (
  <div>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/shows/[id]" as={`/shows/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  return { shows: data.map(entry => entry.show) };
};

export default Index;`

`pages` 配下に `/shows/[id].js` を配置し、[Dynamic Routing](https://nextjs.org/docs/routing/introduction#dynamic-route-segments) ができるようにしておきます。

shows/[id].js

`import fetch from "isomorphic-unfetch";

const Post = props => (
  <div>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?[pb]>/g, "")}</p>
    {props.show.image ? <img src={props.show.image.medium} /> : null}
  </div>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();
  console.log(`Fetched show: ${show.name}`);
  return { show };
};

export default Post;`

`/` を表示してみましょう。サーバサイドにログ `Show data fetched: 10` が表示されるはずです。 `index.js` をサーバサイドでレンダリングしたという事になりますね。
次にリンクをクリックして `/shows/975` に遷移するとブラウザのコンソールにログが表示されてます。これはフロントエンドでデータフェッチとレンダリングが行われたということを意味しています。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F163591%2Ffd9b0a29-3be6-7c78-1552-0e1c02876e6d.gif?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=585a83f9530c1adfade264f334339a76)

### デプロイ

最後にビルドして、デプロイします。ZEIT の now にデプロイします。素晴らしい DX（DeveloperExperimence）です。本当に必要な要素以外全て削ぎ落とした、最高の PaaS だと思ってます。いつも愛用しています。[こちら](https://qiita.com/aggre/items/f0cb9f8b8e8c54768e50)の記事にて丁寧に解説されていました。

bash

`$ yarn build # ビルド
$ now        # デプロイ`

デプロイしたら動作を確認してパフォーマンスを検証しましょう。Chrome の開発者コンソールを開き、Audit を実行します。

[https://batman-tv-shows.geeawa.now.sh/](https://batman-tv-shows.geeawa.now.sh/)

First Meaningful Paint が 1.0s とでました。まずまずです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F163591%2F7209c7ce-f25a-a4b6-b18a-3fec3a2363ac.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=678985843526e8781ec2045c6e527924)

## create-react-app との比較

ここまでできたので Next.js で作成されたアプリケーションと `create-react-app` で作成されたアプリケーションを比較してみましょう。

以下のようにほぼ同様のソースを使用して、`create-react-app` アプリケーションを作成します。以下にデプロイしてあります。

[https://badman-tv-shows-create-react-app.now.sh/](https://badman-tv-shows-create-react-app.now.sh/)

index.js

`import React from "react";
import fetch from "isomorphic-unfetch";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shows: [] };
  }
  async componentDidMount() {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    this.setState({ shows: data.map(entry => entry.show) });
  }

  render() {
    return (
      <div>
        <h1>Batman TV Shows</h1>
        <ul>
          {this.state.shows.map(show => (
            <li key={show.id}>
              <a href="">{show.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;`

デプロイができたので Audit を実行します。
First Meaningful Paint は 1.4s となり、Next.js によって SSR できるようになったサイトと比較すると少しだけ遅い結果がでました。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F163591%2Fb7f1b52a-3211-4068-e09e-e9a3dee462cb.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7930011468107be74d19edaf17dbe068)

# さいごに

今回作成されたアプリケーションは非常にシンプルで、１つの API しか実行しませんし、レンダリングする DOM 要素も少なかったためパフォーマンスにそれほど大きな違いはみられませんでした。それでもアプリケーションが肥大したり、ネットワークの遅い環境、古くて脆弱なモバイルデバイスを使用するとパフォーマンスの違いは顕著になってくるでしょう。SSR の技術は適材適所を見極めて投下していきたいですね。