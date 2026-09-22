---
URL: https://matamatanot.hatenablog.com/entry/2020/05/05/204119
Created: 2021-01-03T15:09:00
Updated: 2021-01-03T15:10:00
Tags: [topic/技術/React/Nextjs]
---
# はじめに

タイトルにある通り

Next.js + Vercel + swr + TypeScript という構成で短期間チーム開発をした。
以下のように特殊な状況なので色々試してみた。

# 開発状況

- 約3週間の短期間開発。
- 世間にリリースしない。プロトタイプを作って終了。メンテナンスもしない。
- フロントエンドを触るのは自分を含めて3人。
- 自分・フロントの経験もあるバックエンドエンジニア・フロントエンドの経験が浅いエンジニアの3人。
- ログイン機能有りの[SNS](http://d.hatena.ne.jp/keyword/SNS)的なもの。既に世の中に存在するプロダクトと似てる。

それぞれ選定理由と使用感を雑に書いていく。

## Next.js

[github.com](https://github.com/zeit/next.js/)

### 環境構築が楽

Node.js環境さえ整えてもらえればすぐ動く。

### ライブラリが最小限で済む

Create React Appも環境構築が楽だが使われているライブラリのドキュメントを探すのが初学者には少しハードルが高い気がする。Next.jsを採用するとReactとNext.jsの公式ドキュメント見ておいてと指示を出せる。

追加で使用した外部ライブラリはswrとio-ts（どちらも後述）の2つ程度で済んだ。

### ルーティング

/pages 以下がそのままルーティングになるので雑に検証しやすくわかりやすい。

/pages/fooTest など適当にファイルを作って好きなように触ってもらった。

### NoSSR

バックエンドエンジニアに最初Next.jsを提案したとき「[SSR](http://d.hatena.ne.jp/keyword/SSR)するの」的な返答があった。かつてはVercel(ZEIT)が[SSR](http://d.hatena.ne.jp/keyword/SSR)を推していたが最近はSSGを推している様子。

今回は試しにNoSSRの戦略をとった。つまりJAMStackな構成。

Vercel CEOのGuillermo Rauch氏のJAMStack推しがすごいので今後もNext.jsを使うなら慣れておくと良さそう。

> Static Hoistinghttps://t.co/eXQaFKUZpY— Guillermo Rauch (@rauchg) 2020年5月2日

最近はNext.jsを使うときはなるべくNo [SSR](http://d.hatena.ne.jp/keyword/SSR)かつCustom Server無しにしている。

[nextjs.org](https://nextjs.org/docs/advanced-features/custom-server)

## Vercel（旧now）

[vercel.com](https://vercel.com/home)

無料枠内で開発を完了させた。開発中に料金プランの変更やVercelへの名称変更が発表されて驚いた。

### プレビューURLが発行されレビューが楽

今回は（[API](http://d.hatena.ne.jp/keyword/API) RoutesもgetServerSidePropsも使ってない）静的サイトなのでプレビューURL機能だけなら他のサービスでも問題なかった。実際、開発初期は[GitHub](http://d.hatena.ne.jp/keyword/GitHub)との連携がうまくいかずに一時的にNetlifyを使っており、開発後半にVercelを導入した。結果、NetlifyもVercelもプレビュー用URLを発行する体制になっていた。

### ビルドが速い

Netlifyに比べて優れていた点はビルド時間。計測してないので完全に体感だがVercelの方が3倍くらい早かった気がする。

### 不満点など

安定性はNetlifyに軍配が上がる。NetlifyはうまくいくのにVercelだけコケることが何回かあった。Build Queueが溜まってしまったので手動で[GUI](http://d.hatena.ne.jp/keyword/GUI)からポチポチとキャンセル連打した。

あと、プラン改定前後で色々とわかりにくかった印象。サポートに問い合わせメールも投げた。返信は迅速かつ丁寧だった。

### おまけ

NetlifyとVercelの比較ツイートを見つけたので引用。我々も計測しとけばよかった。

> I use @vercel to deploy my personal site and I have a dumb obsession with speed. I was intrigued by @Netlify's Testmysite tool, so I decided to deploy on Netlify and compare.Vercel beats Netlify on Netlify's own tool.\#webdevelopment \#JamStack pic.twitter.com/4InVaGxEc3— Jared Gorski (@bearponderings) 2020年5月4日

## TypeScript

[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)に慣れてないメンバーには学習コスト高いが導入した。今後もしフロントエンドを触ることになったらきっとTypeScriptになるので許してください。

Next.jsのTypeScript対応はかなり楽。

### io-ts

io-tsというライブラリで[REST API](http://d.hatena.ne.jp/keyword/REST%20API)のレスポンス結果を型安全にした。

[github.com](https://github.com/gcanti/io-ts)

[API](http://d.hatena.ne.jp/keyword/API)仕様書はOpenAPI (Swagger)で作成していたのでそこから型定義を出力しようかと当初は考えていた。しかし型に強いバックエンドエンジニアからのオススメもあり今回はio-tsを使った。

```plain text
import * as t from 'io-ts'

export const userType = t.type({
  email: t.string,
  id: t.string,
})

```

チームメンバーからの解説もあってio-tsの利点は感じられたが自分の言葉で解説できるほどではないので省略。単純に使う分にはそこまで難しくはないが学習コストはちょっと高めな気がする。

## swr

[github.com](https://github.com/zeit/swr)

Vercel社が管理するReact Hooksライブラリ。

stale-while-revalidateな設計でデータのfetchとcacheをしてくれる。

日本語だとMercari Engineering Blogの記事がオススメだ。

[tech.mercari.com](https://tech.mercari.com/entry/2019/12/17/130000)

### [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)から直接useSWRを使わない

必ずカスタムフックを作成した。各[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)で直接useSWRを使用すると第1引数と第2引数の組み合わせの管理が難しくなる。

useSWRのcacheは第1引数のキーで管理している。そのため第2引数のfetcherが異なっていてもuseSWRは気にしない。別ページで同じエンドポイントに対して異なるfetcherを渡していると(fetcherの中身によるが)cacheの意味が殆どなくなってしまう。

```plain text
import useSWR from 'swr'

const { data: one } = useSWR('/api/user', fetcher1)

```

```plain text
import useSWR from 'swr'

const { data: two } = useSWR('/api/user', fetcher2)

```

そのため以下のようにカスタムフック1ファイルにまとめ、[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)がimportして使っていた。

```plain text
import useSWR from 'swr'

export const useMe = () => {
  return useSWR('/api/me', ioTsFetcher(userType))
}

export const useName = (id) => {
  return useSWR(`/api/user_name/${id}`, ioTsFetcher(userNameType))
}

```

```plain text
import { useMe,  useName } from '../api'

const { data: me } = useMe()
const { data: name } = useName(id)

```

## No Redux

今回はReduxを使用していない。理由としては以下の通り。

- 初学者にとってFluxフローは敷居が高い
- Next.jsでReduxは結構めんどくさい
- swrで事足りるかも

### 初学者にとってFluxは敷居が高い

初学者に0から短期間で理解してもらうのは大変だと思った。

### Next.jsでReduxは結構めんどくさい

Next.js で Redux を使おうとするとnext-redux-wrapperを使ったり同様の処理を自前で行う必要がある。
[github.com](https://github.com/kirill-konshin/next-redux-wrapper)

今回はNoSSRなので全ルーティングでStoreの初期化をサーバーサイドで行うことはできない。

自分の中で良い方法を確立できてなかったのでやめておいた。

### swrで事足りるかも

突然だが海外のエンジニアTanner Linsley氏のツイートを引用する。彼はReact Queryというswrと似たようなライブラリの開発者だ。

> 1. Stop trying to cache your \#react server state in {globalStateLibrary}.2. Move it all to React Query3. Realize your "global state" is now TINY.4. Stop using {overPrescribedGlobalStateLibrary} for that TINY state and just use useState/Reducer/Machine + Context.6. pic.twitter.com/PYLWdkFwzi— Tanner Linsley (@tannerlinsley) 2020年2月13日

[github.com](https://github.com/tannerlinsley/react-query)

次はreact-testing-libraryの開発などをしているKent C. Dodds氏のツイートだ。

> Lots of what we call "Application State" is actually just a client-side cache of server state. And just with any cache, invalidation is a hard problem.Interestingly, I don't think many apps really consider this, but it's pretty important.1/— Kent C. Dodds 🧑‍🚀 (@kentcdodds) 2020年2月15日

ざっくり要約すると

一般的にApplication Stateと呼ばれるものは単にServer Stateのcacheにすぎないことが多く、実際のGlobal Stateはごく僅かではないか。

という考えだ。

以前からこの考えが気になっていて今回はReduxはもちろんContextもReducerも使わなかった。

使っていて気になった点は

### 何がCacheされているのかわかりにくい

この点はReact Queryは専用のDevToolsを公開しており、かなり使いやすい。

[github.com](https://github.com/tannerlinsley/react-query-devtools)

swrもissueが立っているが動きがない

[github.com](https://github.com/zeit/swr/issues/291)

### swrを通すとvalidateのための通信で通信量が増える

今回は通信量を気にする必要がなかったので多くの非同期通信はswrを通していた。defaultの設定だとvalidateのための通信が結構走るので注意が必要。

Cache [API](http://d.hatena.ne.jp/keyword/API) が強化されればある程度改善できそう。
[github.com](https://github.com/zeit/swr/issues/4#issuecomment-547235862)

### おまけ

通信を伴わないComponent間のState共有は下のテクニック使おうかと思っていたが結局使うことがなかった。

Vercel社のShu Ding氏のツイートです。

> import useSWR, { mutate } from 'swr'// use state among componentsconst { data } = useSWR('count')// update state and trigger re-rendermutate('count', 1)— Shu Ding (@shuding_) 2020年3月14日

他にもいくらでも方法はあるがswrに全部詰めることで管理がしやすくなるかも？

> React Hooks library for remote data fetching

と謳っているのにdata fetchingに全く関係ない使い方なのが面白い。

# まとめ

結果的に動くものは作れたので悪くない選択だったと思う。Next.jsは既に使い慣れていたのでVercelやswrで色々と試せたのが良かった。

swrは雑に使っても動くので楽だった。これをプロダクションでメンテナンスするなら更に色々と考える必要がありそう。このまま開発続けたらとっ散らかりそう。何回かReduxが恋しくなった。コード量は少なくてすんだ。

何はともあれ楽しかったです。チームメンバーのみなさんありがとうございました。