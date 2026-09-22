---
URL: https://qiita.com/thesugar/items/95bc20aa98e31501bbfc
Created: 2021-01-03T15:09:00
Updated: 2021-01-03T15:10:00
Tags: [topic/技術/React/Nextjs]
---
本日（5/12）、Next.js 9.4 がリリースされました！
本記事は [Next.js 9.4 リリースノート（Next.js 公式ブログ）](https://nextjs.org/blog/next-9-4) の和訳です。

私はふだん Next.js で個人開発を行ったりしている者です。

Twitter もやっているのでよかったらフォローおねがいします！

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f609.png)

[@_thesugar_](https://twitter.com/_thesugar_)

よかったら Next.js チュートリアル（[公式](https://nextjs.org/learn/basics/create-nextjs-app)）の[翻訳記事](https://qiita.com/thesugar/items/01896c1faa8241e6b1bc) もどうぞ。

> 注意
この翻訳は非公式です。
訳が不正確な部分やその他不備があればお知らせください。
本文中の画像もすべて公式ブログが出典です。

![](https://cdn.qiita.com/emoji/twemoji/unicode/2757-fe0f.png)

# Next.js 9.4

本日は Next.js 9.4 を紹介します。その特徴は次のとおりです。

- : [Facebook の規模](https://twitter.com/dan_abramov/status/1152689338553131008) でも実証された高速で信頼性の高い HMR（Hot Module Replacement）
- : デプロイ後に静的ページをミリ秒単位で再ビルドする
- **：我々の新しい **[**次世代の静的サイト生成**](https://nextjs.org/blog/next-9-3) を使った [Contentful](https://github.com/zeit/next.js/tree/canary/examples/cms-contentful)、[DatoCMS](https://github.com/zeit/next.js/tree/canary/examples/cms-datocms)、[Prismic](https://qiita.com/thesugar/items/Prismic)、[Sanity](https://github.com/zeit/next.js/tree/canary/examples/cms-sanity)、[TakeShape](https://github.com/zeit/next.js/tree/canary/examples/cms-takeshape) の例
- : （create-react-appのような）`.env` と、`NEXT_PUBLIC_` プレフィックスのビルトインサポート
- ：`node-fetch` や `isomorphic-fetch` の使用をやめ、ビルトインの `fetch` ポリフィルを Node.js でもブラウザでも（ビルド時にも実行時にも）使うことができるように
- : Lighthouse スコアを駆動する[指標](https://web.dev/vitals/) を実際のトラフィックからキャプチャする
- ：より明瞭でより短いインポート。`../../../` というスパゲッティ状態の回避
- ：[`includePaths`](https://sass-lang.com/documentation/js-api#includepaths)[ の設定](https://sass-lang.com/documentation/js-api#includepaths) と[組み込みの Sass サポート](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support) のその他のオプション
- ：コンソールの出力が読みやすく、一貫性のあるフォーマットで、重複の少ないものに。

## Fast Refresh

Fast Refresh とは、React コンポーネントに編集を加えたときにすぐにフィードバックを得られる、新しいホットリロード機能です。Next.js 9.4 以降では、あらゆるプロジェクトにおいて **デフォルトで利用可能** です。

ホットリローディングは [昔からありました](https://github.com/gaearon/react-hot-loader) が、デフォルトで有効にしてワークフローに組み込むには、[今までの経緯などを見るにあまりにも脆弱](https://github.com/gaearon/react-hot-loader/issues?q=is%3Aissue) でありました。このため、今までNext.jsでは、アプリケーション全体の状態をリセットするホットリロードの粗い形式を実装していました。

この古いホットリロードの実装はコンパイルエラーやランタイムエラーに耐性がなく、CSS や JavaScript の編集中に一文字でも typo してしまうとアプリケーションの完全なリロードを行ってしまいます。これは最適なものではなく、思考の流れを妨げるものでした。

Fast Refresh は React 自体と深く結びついたもの（[React Refresh を介して](https://github.com/facebook/react/tree/master/packages/react-refresh)）であり、そのため Next.js は 予測可能な精度で React のコンポーネントツリーを更新できるのです。

つまり Next.js は編集が行われたファイルのコードのみを更新し、**コンポーネントの状態を失うことなく** そのコンポーネントだけを再レンダリングするということです。このことはスタイル（インライン、CSS-in-JS、CSS/Sass モジュール）、マークアップ、イベントハンドラ、ならびに副作用（`useEffect` によるもの）にも当てはまります。

[コンパイラーやランタイムエラー（クイックリカバリー付き）および状態を保持する編集機能が特徴の編集セッション（公式ブログ内の動画）](https://nextjs.org/static/blog/next-9-4/react-refresh.mp4)

この機能の一部として、エラーのオーバーレイを、より有用かつアプリが typo やランタイムエラーにより耐性のあるものとなるように抜本的に設計しなおしました。これにはたとえば以下のことが含まれますが、これだけに限りません：

- コンパイル前に、自分が書いたコードの **元々の行と列** を解決した **正確なエラー箇所を表示** します
- 文脈に関連のある **ソースコードスニペット**、**クリックしてエディタで開く** ことができます
- シンタックスエラーが修正されたら、**アプリケーションの状態を失うことなく** 開発の **セッションを再開** します
- エラーを修正したとき、処理されていないランタイムエラーを **自動的に破棄** します

## Incremental Static Regeneration (beta)

Next.js は 9.3 で Static Site Generation（静的サイト生成）の手法を導入しましたが、そのとき明確に定めていたゴールがあります。それは、[静的であることの利益](https://rauchg.com/2020/2019-in-review#static-is-the-new-dynamic)（つねに速く、いつもオンラインで、[グローバルに分散されている](https://rauchg.com/2020/static-hoisting#hoist-to-the-edge)）を享受しながらも、動的なデータについてもしっかりとサポートするということで、それは Next.js が得意とすることでもあります。

両方のいいとこ取りをするために、Next.js は **Incremental Static Generation** をサポートします。Incremental Static Generation では、サイトを構築した後に静的コンテンツを更新します。たとえば、 9.3 では `getStaticPaths` において `fallback: false` オプションを導入し、それによって、実行時に **新しいページ** を追加することができるようになりました。

つい最近、Next.js がどのようにして限りない数のページを静的にプリレンダリングするかを紹介する例をまとめました：

> As of Next.js 9.3+, static generation is possible at build time. But also at runtime!This demo shows off Jamstack at scale on @vercel – to the tune of 500M new pages a day 😁https://t.co/ppNoRKNiZV— Guillermo Rauch (@rauchg) April 24, 2020

> Next.js 9.3 以降では、ビルド時に静的生成できる。でも実行時にも静的生成できるんだ。
このデモを見れば @vercel 上で Jamstack がスケールしているのがわかると思う。一日に 5 億もの新しいページを生成しているんだ！ static-tweet.now.sh

今日、**Incremental Static Regeneration (beta)** というものも紹介します。これは、**既存のページを更新する** メカニズムであり、既存のページへトラフィックが入ってきたときにバックグラウンドでそのページを再レンダーするというものです。[stale-while-revalidate](https://tools.ietf.org/html/rfc5861) にインスパイアを受けていますが、この stale-while-revalidate とは、トラフィックが途切れなく、かつ、いつも静的に提供（サーブ）され、新しくビルドされたページはその生成が完了した後にのみプッシュされるというものです。

`export async function getStaticProps() {
  return {
    props: await getDataFromCMS(),
    // ページの再生成を以下のように試みます
    // - リクエストが来たとき
    // - 最大で 1 秒に一度
    unstable_revalidate: 1
  }
}`

SSR とは違い、Incremental Static Regeneration を使えば、静的（Static）であることの利点を確実に保持できます。

- レイテンシの発生がありません。一貫して高速にページが提供されます。
- ページがオフラインにはなりません。バックグラウンドでのページの再生成が失敗しても、古いページが変更されずに残っています。
- データベースやバックエンドの負荷が低いです。ページが再計算されるのは最大でも同時に一度です。

インクリメンタル機能（ページの追加と遅延（lazy）更新）と [プレビューモード](https://nextjs.org/docs/advanced-features/preview-mode) はどちらもすでに `next start` と [Vercel edge platform](https://vercel.com/) の両方で完全にサポートされていて、追加の設定無くすぐに使い始められます。

次は、Incremental static generation にさらに 2 つ機能を追加するために補足的な RFC を作成しようとしています。

- 一度に複数ページを再生成して無効にすること（ブログのインデックスとブログの個別の記事のように）
- ユーザーからのアクセスより前に、イベントを待ち受けて再生成すること（CMS のウェブフックのように）

## CMS の例

[次世代の静的サイト生成](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support) について発表したすぐ後から、ヘッドレス CMS の API からコンテンツを取得したりそれを Next.js の HTML としてレンダリングするといった、実際の（リアルワールドの）シナリオを共有したいと思っていました。

我々は、世界で最も優れた CMS システムの製作者たちと提携しました。[Contentful](https://github.com/zeit/next.js/tree/canary/examples/cms-contentful)、[DatoCMS](https://github.com/zeit/next.js/tree/canary/examples/cms-datocms)、[Prismic](https://qiita.com/thesugar/items/Prismic)、[Sanity](https://github.com/zeit/next.js/tree/canary/examples/cms-sanity)、[TakeShape](https://github.com/zeit/next.js/tree/canary/examples/cms-takeshape)  などです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F480820%2F665b05af-9a2f-6fe5-3bac-a0da708db7d9.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=89e7af3c04ac4235b3a727a5da84c5e6)

上記で例として挙げたものたちは、すぐに使用できて 100 % オープンソースであり MIT ライセンスであるというだけでなく、利用可能なベストプラクティスを取り入れています。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F480820%2F1330e0cf-a4ad-6658-e2a2-6f48100d1097.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=f1483bd1f644d5e3c77119726377f2bd)

DatoCMS は、画像の最適化をビルトインでサポートしているため、申し分のない結果を達成しています。

また、TinaCMS とは CMS のわくわくするような新しい方向性である、**コンテンツのページ内編集** についてコラボレーションしています。自分のプロジェクトでページ内編集を実装する方法について知るには[TinaCMS のガイド](https://tinacms.org/guides/nextjs/github-open-authoring/initial-setup) をチェックしてください。

## 新しい環境変数のサポート

Next.js を使用している企業から得たフィードバックに共通していたものは、環境変数がいつブラウザバンドルにインライン化されるのか、Node.js 環境でしか利用できないのはいつなのか、がわかりづらいというものでした。

今日は、このプロセスを合理的にする、完全に後方互換性のある 2 つの機能を発表します。

そのうちの一つ目ですが、環境変数をブラウザでも参照できるようにするには、環境変数名を `NEXT_PUBLIC_` で始めてください。その環境変数が使われると、ブラウザの JavaScript バンドルにインライン化されます。

もはや、`next.config.js` を追加してそこに `env` キーを追加することでこれらの変数をブラウザに公開する…という手順は不要になります。

`// pages/index.js

// 以下の環境変数はブラウザに公開される
console.log('My Application Version', process.env.NEXT_PUBLIC_VERSION)

export default function HomePage() {
  return <h1>Hello World</h1>
}`

二つ目の変更は、Next.js がデフォルトで `.env` の読み込みをサポートするようになったということです。これにより、開発用および本番用の環境変数を簡単に定義することができるようになります。

`.env` の読み込みについては [環境変数のドキュメンテーション](https://nextjs.org/docs/basic-features/environment-variables) をご一読ください。

以上の新しい機能は、以下の規約に従うことで環境変数の使用を簡素化します。

- 環境変数は、デフォルトでは Node.js 環境でのみ利用可能である
- `NEXT_PUBLIC_` で始まる環境変数はブラウザに公開される

## ビルトインfetchのサポートの改善

[Next.js 9.1.7](https://nextjs.org/blog/next-9-1-7#new-built-in-polyfills-fetch-url-and-objectassign) で、ブラウザでの `fetch()` API のポリフィルを発表しました。今日、そのポリフィルは Node.js 環境にも拡張されました。

実用上は、Next.js がどんな環境においても自動で `fetch()` を提供してくれるので、もはやサーバサイドフェッチ用のポリフィル（たとえば `isomorphic-unfetch` や `node-fetch`）はまったく使う必要がないのです。

たとえば、`getStaticProps` を使って、ビルド時に Next.js を使って実行される例は以下のようになります。

`export async function getStaticProps() {
  // fetch 関数はもはや isomorphic-unfetch からインポートする必要はありません
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts
    }
  }
}

function Blog({ posts }) {
  // posts のレンダー処理・・・
}

export default Blog`

## 統合された Web Vitals レポーティング

先週、Google Chrome チームが [Core Web Vitals](https://web.dev/vitals/) を導入しました。Core Web Vitals とはウェブにおいて優れた UX を届けるための鍵となるクオリティのシグナルであり、[よく知られている Lighthouse レポート](https://twitter.com/rauchg/status/1259701306387656704) もそれに基づいて構築されています。

ウェブサイトやウェブアプリを可能な限り高速化したいのであればこれらの指標を追求することはきわめて有用ですし、それは Next.js の核となる目標の一つです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F480820%2Fe2e89055-5e84-d164-2b47-3c0f02e4fb5b.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=1d8ddacf841de2fe410cdd1e1e77883c)

Chrome のチームは [Core Web Vitals Chrome 拡張](https://twitter.com/addyosmani/status/1258416376433131520) をリリースしました。それを使えば、自分のページのパフォーマンスがどうであるか、開発者用の視覚的なフィードバックを得ることができます。

本番用のウェブアプリを構築するとき、自分のサイトが訪問者や（潜在）顧客に対してどのようなパフォーマンスを発揮しているか知りたいということもあると思います。自分が施した変更が、顧客に対して意図した影響を与えているか確認するために、上記の指標の改善や悪化を、変更前後の時間の変化と合わせて追跡したいと思うかもしれません。

分析サービスへの Core Web Vitals のレポートを支援すべく、[Google とのコラボレーション](https://www.techrepublic.com/article/insiders-look-at-googles-web-framework-contributions-to-next-js-and-more/) により、`reportWebVitals` という新しい手法を導入しました。これは `pages/_app.js` から export できます。

`// レポートされる各指標につき一度呼び出されます
export function reportWebVitals(metric) {
  // この指標はどんな分析サービスに送信することもできます
  console.log(metric)
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp`

この手法をあなたが使っている分析サービスと組み合わせて使うにはドキュメントの [Sending result to Analytics（分析サービスに結果を送る）](https://nextjs.org/docs/advanced-features/measuring-performance#sending-results-to-analytics) というセクションを参照してください。Core WEb Vitals についてもっと知りたい場合は [web.dev/vitals](https://web.dev/vitals/) を参照してください。

## Absolute Imports とエイリアス

大きなプロジェクトで作業をしているとき、`import` 文が `../../../` というようなスパゲッティ状態になって苦しんだ経験をお持ちの方もいらっしゃるのではないでしょうか。

`import Button from '../../../../components/button'`

そのようなケースでは、相対パスでインポートを行う代わりに、**絶対パスでのインポート** が使いたいということもあるでしょう。`components` ディレクトリがプロジェクトのルートにあると想定して、`import` 文を次のように書きたいと思うかもしれません。

`import Button from 'components/button'`

Next.js 9.4 では、JavaScript のプロジェクトにおいても TypeScript のプロジェクトにおいても、絶対パスのインポートはきわめてシンプルに設定することができます。必要なことは [`jsconfig.json`](https://code.visualstudio.com/docs/languages/jsconfig#_jsconfig-options)[（JavaScript のプロジェクトの場合）](https://code.visualstudio.com/docs/languages/jsconfig#_jsconfig-options) あるいは [`tsconfig.json`](https://www.typescriptlang.org/tsconfig#baseUrl)[（TypeScript のプロジェクトの場合）](https://www.typescriptlang.org/tsconfig#baseUrl) に `baseUrl` の設定を追加することだけです。

`// jsconfig.json あるいは tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}`

こうすることで `.`（ディレクトリのルート）から絶対パスでインポートすることができます。また、これは VSCode や他のエディタとも統合されており、コードナビゲーションやその他エディタ機能もサポートしています。

**補足：** 今まで、絶対パスでのインポートを可能にするために [Webpack のモジュールエイリアス](https://webpack.js.org/configuration/resolve/#resolvealias) の設定を修正していたという方は、その設定はもはや削除してしまって構いません。

さらに、Next.js 9.4 では `paths` オプションもサポートしており、それにより独自のモジュールエイリアスを作ることができます。例えば、以下のように設定することで `components/design-system` の代わりに `@/design-system` と書くことができます。

`// tsconfig.json あるいは jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/design-system/*": ["components/design-system/*"]
    }
  }
}`

上記のように設定したら、以下のようにエイリアスを利用できます。

`// 'components/design-system/button' をインポートする
import Button from '@/design-system/button'`

`paths` を指定するには `baseUrl` を必ず指定しなくてはなりません。`paths` オプションについては [TypeScript のドキュメンテーションから](https://www.typescriptlang.org/tsconfig#paths) 詳細を知ることができます。

## 設定可能な Sass のサポート

[Next.js 9.3](https://nextjs.org/blog/next-9-3#built-in-sass-support-for-global-stylesheets) で Sass サポートが組み込まれたとき、一部のユーザーから Sass コンパイラの設定をしたいというフィードバックをいただきました。たとえば `includePaths` を設定したいというようなものです。

`next.config.js` で `sassOptions` キーを使用することで可能になりました。

`const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}`

## ログ出力の改善

コマンドラインの出力をより一貫性のあるものとし、また、デプロイ URL や開発用サーバーが待ち状態にあることなどを重複して出力することを減らすように再設計しました。また、メッセージタイプの間隔を変更し、メッセージ間で一貫性を持たせるようにしました。つまり、行から行にジャンプするということはなくなったということです。

9.4 以前のバージョンで `next dev` を実行したとき

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F480820%2F6c2c2b6d-0a3e-4b3b-1589-329308e9cef1.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=43a5515a83a749fdede5dc7c6da5dcf3)

9.4 以後のバージョンで `next dev` を実行したとき

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F480820%2Fc7de4c3d-57cd-aa5b-6bd7-fb0d6e5691c9.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=e1276716f843177cffc8ac035ddf544a)

## コミュニティ

Next.js を採用する人や企業が増え続けていることにワクワクしています。

- これまでに実人数で **1066 人** 以上のコントリビューターがいました。
- GitHub では、このプロジェクトは **48,000 回** 以上スターを付けられています。

[GitHub Discussions](https://github.com/zeit/next.js/discussions) で Next.js のコミュニティに参加しましょう。Discussions は、他の Next.js ユーザーとつながり、質問をすることができるコミュニティ空間です。

Next.js を使っているのなら、気兼ねなくコミュニティで[あなたのプロジェクトの URL](https://github.com/zeit/next.js/discussions/10640) を共有してください。

このリリースを形成するのに手伝ってくれたコミュニティならびにすべての外部からのフィードバック、貢献に感謝します。