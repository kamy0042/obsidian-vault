---
Created: 2021-09-05T19:08:00
URL: https://zenn.dev/catnose99/articles/0b601c1f62019b#%E6%B3%A8%E6%84%8F%E7%82%B9
Tags: [topic/技術/パフォーマンス]
---
![[98pqyi50z13g7qle1fw589p4qdye.bin]]

![[5apfi8zc4k4p7fa9upqgb1ngcy25.bin]]

イメージ通りに動きました👏

自分では試していませんが、実際にFastlyで動かしているという方がいました。

この方法を取る場合の注意点を挙げておきます。

こちら2021/04/19に追記したものです。運用中のアプリで実際に動かしてみて分かったのですが、Next.jsで`stale-while-revalidate`ヘッダによるCDNキャッシュを利用すると

1. 直接ページにアクセスしたときに生成されるHTMLのキャッシュ
2. 他ページから遷移したときに生成されるJSONのキャッシュ

の2種類が生成されてしまうことが分かりました。Next.jsではパフォーマンス面の理由から、他ページへの遷移時にページ全体のHTMLを書き換わるのではなく、一部分だけが書き換えられます。

Next.js on VercelでISRを使用すると、このようにキャッシュが分散することがありません。おそらくVercelにおいて、この問題が発生しないように色々と工夫がされているのだと思います。
 （おそらく[serverless-next.jsでISRに対応しようとしている](https://github.com/serverless-nextjs/serverless-next.js/issues/804#issuecomment-782565190)ようにHTMLやJSONをS3にアップロードしているんじゃないかな）

Next.jsではプリフェッチの挙動が`getStaticProps`と`getServerSideProps`を使ったときで異なります。

> If the page uses getStaticProps the data is prefetched. When you use getServerSideProps it is not as it would increase server load. https://github.com/vercel/next.js/discussions/11578#discussioncomment-2997

`getStaticProps`を使ったときはページのデータまでプリフェッチが行われます。一方で`getServerSideProps`を使ったときはJSファイルのみがプリフェッチされ、データまではプリフェッチされません。

今回のCDNを使った方法では`getServerSideProps`を使うので、**ページにアクセスされるまでデータのフェッチは行われない**ことになります。

個人的にはこれはデメリットではなく嬉しいポイントです。ISRを使用しているページのプリフェッチが大量に行われるとサーバへの負荷が大きくなるためです。

ページ間で不整合を起こさないために、デプロイ時にはCDNのキャッシュを削除した方が安心だと思います。Vercelではデプロイ時にCDNのキャッシュを削除してくれます。Cloud CDNやFastlyを使う場合にも、API経由でキャッシュ削除を自動化するのが良さそうです。

もしかするとこの他にもISRと挙動が異なる点があるかもしれません。知っている方はコメントなどで教えていただけると嬉しいです。