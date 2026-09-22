---
URL: https://mottox2.com/posts/468
Created: 2021-01-03T15:09:00
Updated: 2021-01-03T15:11:00
Tags: [topic/技術/React/Nextjs]
---
2020.05.11

# Next.jsのStatic Generationを追う際に参考にしたページ

[dev](https://mottox2.com/categories/dev)

Next.jsのStatic Generationを追っておく際に見たページをまとめた。簡単に要点をまとめてはいるが、詳しくはリンク先のオリジナルを見てほしい。

## [2019 in Review](https://rauchg.com/2020/2019-in-review)

- Guillermo Rauch（@rauchg） ... Vercel社（元ZEIT）のCEO　のブログ記事
- 2019年はJamstackが伸びた年であること
- Staticは高速で安定性が高い
- SSGやClient JS/APIでdynamicを実現できること
- Next.jsはJamstackの機能を網羅している
- Static GenerationとかAPI RoutesとかDynamic Routing
- Vercelを使えば便利だよと等々

## [Static Generation / SSG Improvements](https://github.com/zeit/next.js/issues/9524)

- ページ単位でSSG（静的生成）とSSRを出し分けられるようにする。
- Next.js 9になってデータを必要としないページはhtmlとして出力されていた。（いわゆるAutomatic Static Optimization）
- データを必要とする場合は既存のexportを使うことでStaticにできたが、すべてのページが静的になってSSRが使えない。
- また、getInitialPropsではクライアントでの遷移時にデータを取得する必要がありDBやCMSへのアクセスが発生していた。
- これらを解決するためにgetStaticProps、getStaticPropsを導入し、静的なデータを扱えるようにした。
- （サーバーサイドで実行されるgetServerSidePropsも追加された）

## [RFC: Incremental Static Regeneration](https://github.com/zeit/next.js/discussions/11552)

- 上記のStatic Generationが実装され、高速に低コストでウェブサイトを配信できるようになった。
- 欠点として、静的に生成されたページのデータ更新された場合、完全な再ビルドが必要だった。
- このリビルドを避けて、オンデマンドで新しいページを生成するのがIncremental Static Regeneration
- 各ページにtimeoutを設定し、有効期限が切れると再レンダリングが走る。
- Staticにツイートを表示するデモ [https://static-tweet.now.sh/](https://static-tweet.now.sh/)

## [Static Hoisting](https://rauchg.com/2020/static-hoisting)

- Vercel社（元ZEIT） Guillermo Rauch氏のブログ記事
- Hoisting（変数の巻き上げ）の説明し、Jamstackは計算結果を訪問者に巻き上げるものだと言っている。
- CDNとJamstackの比較。JamstackはすべてのEdge Serverで共有される。
- Next.jsはページ単位にアセットを生成するので静的な部分を巻き上げやすい構成になっている。
- Dashboardのような一見動的な画面もClient JSでやるからデータの問い合わせをする静的ページ。

B!

[events](https://mottox2.com/posts/501)[**
**](https://mottox2.com/posts/501)[**技術書典10でReactとGatsbyJSの入門本を頒布します**](https://mottox2.com/posts/501)[
](https://mottox2.com/posts/501)[技術書典10で『つのぶえ出版』としてReactとGatsbyJSの入門本を頒布予定です。   > どんな本かどんな本か 

一言でいうと、React/Gatsbyでウェブサイトを書けるようになる本です](https://mottox2.com/posts/501)[2020/12/24](https://mottox2.com/posts/501)

[poem](https://mottox2.com/posts/494)[**
**](https://mottox2.com/posts/494)[**欲しいものリスト（2020年版）**](https://mottox2.com/posts/494)[
](https://mottox2.com/posts/494)[欲しいものはAmazonに売ってないので、独自にリストを作ることにしました。 

- いい感じの動画を作るセンス 今年に入ってAfter Effectsを使ったアニメーションを作ったりしています。Tw](https://mottox2.com/posts/494)[2020/09/20](https://mottox2.com/posts/494)

[dev](https://mottox2.com/posts/474)[**
**](https://mottox2.com/posts/474)[**jsx-presentationを使ってJSXでpptxファイルを生成する**](https://mottox2.com/posts/474)[
](https://mottox2.com/posts/474)[週末にpptxファイルが生成できるスライド作成ツールのプロトタイプを作りました。  

スライドエディタで作成したスライドをPowerPoint形式で出力できるようにした。
まだまだサイズやアスペクト](https://mottox2.com/posts/474)[2020/06/07](https://mottox2.com/posts/474)