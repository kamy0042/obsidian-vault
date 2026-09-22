---
Created: 2022-07-24T16:36:00
URL: https://engineering.mercari.com/blog/entry/20210823-a57631d32e/
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[e3eee645-hiroppy_1200x630.png]]

こんにちは。ソウゾウの Software Engineer の [hiroppy](https://twitter.com/about_hiroppy) です。[「連載：「メルカリ Shops」プレオープンまでの開発の裏側」](https://engineering.mercari.com/blog/entry/20210803-225b0b4612/) の最後は、Web フロントエンドの紹介をしたいと思います。メルカリ Shops は既存のメルカリアプリの中に独立した Web アプリケーションとして動いています。本記事では、どのようなライブラリを選定し、どのようにアーキテクチャを設計してきたかを解説します。

## なぜ Web なのか？

アプリの上で動いているのであれば、WebView ではなくても良いと感じる人はいると思います。今回採用した 1 つの理由としては、リリースが柔軟な点が挙げられます。iOS/Android の両方に対して開発サイクルを早めることが可能であり、また機能追加やバグ修正が容易です。どのように WebView で動いているかについては、6 日目の[メルカリ Shops のための WebView の技術](https://engineering.mercari.com/blog/entry/20210814-6694cc7502/)を参照してください。 難しかった点はアプリの挙動を Web で表現する点です。例えば、Web の `history` とアプリでは挙動が大きく異なり、back/replace で再現する必要がありました。

## UI Framework

Tailwind CSS などと比較し、以下の理由で [chakra-ui](https://chakra-ui.com/) を採用をしました。

- 標準でモーダルや テーブル、スケルトンなどの UI が整っている
- フォント、スペースの値などのデザインルールが定義されている
- アクセシビリティが考慮されている
- CSS を素で書く必要がなく、拡張が容易
- Figma が提供されている

[一日目の記事](https://engineering.mercari.com/blog/entry/20210810-mercari-shops-tech-stack/)の通り、メルカリ Shops のプロジェクトは monorepo であり様々なエンジニアがコードを書くことを考慮しました。UI が整っていて、サイズやスペースなどのルールが存在し、React の props で CSS を記述していくことができる chakra-ui はチーム全体の開発速度を向上させることができました。また、Figma が提供されている点も重要であり、これによりデザイナとの UI の認識を合わせやすくなりました。デメリットとしては、 bundle size が大きい点が挙げられますが、次期メジャーバージョンで入る予定の最適化などまだまだ改善の余地があり、自分たちで改善できる点から不採用の理由とは至りませんでした。

## React Framework

以下の理由により Next.js を採用しました。

- SSR/SSG が可能
- webpack などの設定ファイルが隠蔽されている

後述しますが、CDN との相性の良さはメルカリ Shops では必須であり、SSR/SSG ができるフレームワークでないといけませんでした。また、UI フレームワーク同様に誰でもフロントエンドの実装ができる状態にする必要があったので、webpack などのインフラを隠蔽する必要があり、何も書かなくてもある程度最適化された状態でビルドできるのは理想です。そして、OSS でのコミュニティやメンテナンスの安定性を考えて Next.js が採用されました。

## GraphQL

以下の理由により Apollo Client を採用しました。

- React との親和性
- BFF で使われている Nest.js の中身が apollo-server である

メルカリ Shops では、BFF との会話ではすべて GraphQL を用いており、GraphQL Client は必要でした。Apollo はキャッシュ機構がとても優秀であり、 React との親和性が高いです。また、状態管理も apollo-link-state が非推奨となり v3 で入った Reactive Variables と React Hooks の相性は良いため React Context 等ではなく、Apollo に統合することとなりました。

Apollo には Link という機能が備わっており、メルカリ Shops ではネットワークレイヤーにも共通化を行っています。キューイングを持った Link の実装を行い通信の順序担保を保証し、認証処理等を隠蔽し共通化されています。以下の例のように、最初のアクセスが行われると共通処理が実行され、それが終わるまでは、`query/mutation`で発生したネットワークアクセスは Link で enqueue され、その間は view へ `waiting`の状態を返しスケルトンの UI となります。そして、共通処理が終わり次第、dequeue され BFF へのアクセスが許可される仕組みです。

graphql-codegen が Apollo の hooks を生成できる点も大きいです。先述の通り monorepo を採用しているため、 各マイクロサービスの proto から TypeScript へ変換し BFF でその型を使い GraphQL スキーマを作成し、フロントエンドは `.gql` を書き graphql-codegen で BFF で生成されたスキーマから hooks を含んだ生成ファイルを React Components が利用する**型が一気通貫している仕組み**を容易に作ることができました。

最後に、Apollo はページネーションのユーティリティもサポートしています。Relay の仕様である[Cursor Connections](https://relay.dev/graphql/connections.htm)が提供され、サーバー側が仕様に従ったスキーマを返せば、クライアント側は以下のように[typePolicy](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields)に定義するだけで簡単にページネーションが実現できます。

```plain text
import { relayStylePagination } from "@apollo/client/utilities";

export const typePolicies = {
  Query: {
    fields: {
      products: relayStylePagination(["status"]),
    },
  },
};
```

## その他主要ライブラリ

## キャッシュ戦略

メルカリ Shops はアプリ上で動いていることから通常の Web サービスよりもパフォーマンスが求められます。モバイルの回線速度は安定しないため、常にキャッシュを意識した構成にしました。最初に以下のルールを定義し、 SSR するべきかどうかを誰でも判断できるようにしました。

- SSR: SEO 対象 => お客さまの情報に依存しない部分で且つ Public なページ
- CSR: SEO 対象外 => お客さまの情報に依存する部分 または Private なページ

これにより、Next.js ではお客さまの情報を一切知る必要がない構成となります。このように設計することにより、効率的かつ安全に CDN に依存することが可能となりました。例えば、商品の値段の部分は HTML に既に埋め込まれている状態で表示され、お客さまの情報に依存する部分はスケルトンでお客さまにフィードバックを行います。自身の商品の場合、ここは`編集する`というボタンになります。このようなルールにすることにより、CDN に HTML/next data json のキャッシュがある場合はファーストビューが自然と速くなります。

また、[stale-while-revalidate](https://datatracker.ietf.org/doc/html/rfc5861)を多段構成にすることにより、お客さまに近い場所からキャッシュを返し、且つ新鮮な情報を保持する設計をとっています。 stale-while-revalidate とは、キャッシュが stale した状態でも指定した時間内であれば、その stale したキャッシュを返し、裏側で非同期で origin に問い合わせキャッシュを更新する仕組みです。workbox(service-worker) にも http header と少し異なりますが stale-while-revalidate が存在するため多段構成となります。以下の図は、社内ドキュメント用に書いた資料です。

workbox の stale-while-revalidate では http header とは異なり、必ず裏で問い合わせが走ります。以下は、CDN 上のキャッシュの max-age が切れたが stale-while-revalidate で指定した時間内であったため、 stale したキャッシュを返しているフローであり、Service Worker と CDN
 のキャッシュが新鮮になっていることがわかります。

このようにお客さまに近いところから結果を返し、その場所でのキャッシュを可能な限り stale していない状態を保ちます。ただし、Service Worker では HTML は常にネットワーク優先としています。

残念ながら、iOS の WKWebView では現在 Service Worker をサポートしてないためこの全体構成は Android のみとなります。しかし、Fastly 自体が高速なため Service Worker がない分、ネットワーク速度の依存は増える可能性がありますが、あまり大きな問題にはなりませんでした。以下は Service Worker がない場合の lighthouse の performance の結果です。

最後にメルカリ Shops では、max-age を長く取れる構成にしているため、お客さまからのアクセスで origin への到達がそこまで多くないのことが特徴です。メルカリ Shops の主要なマイクロサービスは、発生したイベントを Pub/Sub に流す仕組みとなっています。それを監視し変更があった情報のみを CDN からキャッシュパージする機構を実装し、これにより最小限のパージで長い max-age を持つことを可能としました。

例えば、商品の値段が変わったとき、その商品とその商品を販売しているショップのキャッシュの 2 つをパージします。これを実現するために、[`Surrogate-Key`](https://docs.fastly.com/en/guides/getting-started-with-surrogate-keys)を使いすべてのキャッシュをコントロールします。

プロダクトページ

```plain text
Surrogate-Key: product-1111 shop-2222 products
```

ショップページ

```plain text
Surrogate-Key: shop-2222 shops
```

このように全体パージ用のキーと個別用のキーを入れることにより、キャッシュを管理します。商品が変更されると、その商品の情報に `shop-2222` を含んでいるため、ショップページのキャッシュが特定でき、ショップページもパージすることが可能です。

このようなインフラ構成にすることにより、メルカリ Shops では効率的に CDN のキャッシュを管理し、Web 全体のパフォーマンスの最適化を行っています。monorepo を採用することによって、関心事がフロントエンドからインフラまで広げやすくなり、結果としてこのような構成を実現することができました。

## おわりに

この記事では、メルカリ Shops のフロントエンドでのいくつかのライブラリ選定と設計の一部を紹介しました。もしこの記事が新しくスタートする方々へ少しでも有益な情報になれば幸いです。まだまだ面白い話があるので、もしなにか気になることがあれば、[Souzoh Tech Talk #03: Frontend](https://mercari.connpass.com/event/221978/)での QA セッションでお気軽にお尋ねください。ここまで [【8/10 スタート】連載：「メルカリ Shops」プレオープンまでの開発の裏側](https://engineering.mercari.com/blog/entry/20210803-225b0b4612/) を見てくださりありがとうございました！

メルカリ Shops ではメンバーを募集中です。メルカリ Shops の開発に興味を持ったり、チャレンジしてみたいという方がいれば、ぜひ[こちら](https://careers.mercari.com/jp/search-jobs/?cat=souzoh-inc)も覗いてみてください。またカジュアルに話だけ聞いてみたい、といった方も大歓迎です。[こちらの申し込みフォーム](https://docs.google.com/forms/d/e/1FAIpQLSe_YPZc0uj0gCGymBGPWQv9zNEjNUMYeQwQyaQAPuvIhaQ7dQ/viewform)よりぜひご連絡ください！

また、2021/08/18 から 2021/09/28 にかけて[「ソウゾウ TECH TALK」](https://souzoh.com/events)というイベントが開催されます。テーマを分け、技術的な知見を共有しあうことを目的とした勉強会です。興味のある方はぜひご参加ください！