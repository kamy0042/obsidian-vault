---
Created: 2021-08-31T14:16:00
URL: https://slides.hiroppy.me/cache-strategy-on-mercari-shops/#slide-1
Tags: [topic/技術/パフォーマンス]
---
## メルカリ Shops の開発

vcl, python, golang, containers, typescript, etc. が入っている monorepo で開発が行われている。
 なので、あまり専門性はあってもどの領域でも開発を行う。

メルカリアプリ上で動いているため、
 webview がベースとなりパフォーマンスは普段以上に求められている。

## ユーザーへの UX を下げないために。。

- First Meaningful Paint を速くする
- Skeleton などでフィードバックを適切に行う

=> **とりあえず速く結果を返却すればよい**

## 結果を速く返すために考えること

- 共通な結果はすべてキャッシュし、CDN などを使い近くに置く
- 極力、ユーザーからのアクセスを origin まで到達させない
- 常に新鮮な結果を近くに保持することにより、上記を満たせるようにする
- **新鮮な結果を近くに置く必要がある**
- **max-age(s-maxage)を長くすればよい？**
- 👍 長くすればその分、origin までの到達を防げる
- 👎 情報が変わるページは結果が古くなる可能性が高い

指定した時間分、stale したキャッシュを返し、
 裏で非同期で origin に問い合わせを行いキャッシュを更新する http header

```plain text
Cache-Control: max-age=5000, stale-while-revalidate=500

```

これを使うことにより、origin へのアクセスを軽減させ、新鮮な状態を維持することができる

=> ただ max-age を長くしないと、ページによっては stale し origin へ到達する可能性がある

## 1. max-age を長期的に維持する仕組みを作る

HTML を CDN に置くために以下のルールを定義

- SSR は SEO 対象のページ、且つユーザーに依存しない情報のみ
- CSR は SEO 対象外のページ、またはユーザーに依存する情報

=> **Next.js はユーザーを知る必要がなく安全な結果のみを CDN へ配置**

## 2. max-age を長期的に維持する仕組みを作る

**自分たち側からキャッシュをパージする戦略にすれば s-maxage はいくらでも伸ばせる**

- 主要な micro services が発生したイベントを発行し、cloud pub/sub に流す仕組みにした
- pub/sub を subscribe する ms を作成し、パージが必要な場合に CDN へパージ依頼を投げる

![[37698554-kapture-2021-08-21-at-15.26.39.gif]]

## 3. max-age を長期的に維持する仕組みを作る

キャッシュをパージするために、SSR しているページで特定のキーを配置する。`Surrogate-key`は、コンテンツをグループ化する識別子を割り当てることができ、これをパージに利用する。

例えば、アイテムの情報が変わったときにアイテムのリストを持っているショップも変更する例。

- アイテムページ: `Surrogate-Key: product-1111 shop-2222 products`
- ショップページ: `Surrogate-Key: shop-2222 shops`

```plain text
export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  ctx.res.setHeader('Surrogate-Key', 'foo bar');
  ctx.res.setHeader('Surrogate-Control', 'max-age=5000 stale-while-revalidate=500');

  return {
    props: {},
  };
};

```

このようなアーキテクチャにすることにより、ユーザーからのアクセスの多くは CDN で止まることが多い。
 そうすることにより、以下のパフォーマンスを維持することが容易となった。

もちろん、CDN レイヤーでも速いのだがネットワークの依存がある。
 そこで、Service Worker を利用することにより更に安定化を図る。

[Workbox](https://developers.google.com/web/tools/workbox)には、キャッシュ戦略が備わっていてそれを用いる。
 Workbox を使うことにより、`Cache-Control`を無視し、
 独自の`max-age`を定義し、ブラウザ上で動く CDN のような扱いにすることができる。

ここでも、stale-while-revalidate を用いる。ただし必ず裏で fetch しにいくのが http header との違い。
 これを使うことにより、常にローカルを最新の状態で維持しておくことが可能となる。

最終的には、以下のような構造となった。(apollo の inMemoryCache は省略)
 monorepo だとインフラからフロントエンドまで見ることができた。

今週水曜日(09/01)に、[Souzoh Tech Talk #03: Frontend](https://mercari.connpass.com/event/221978/) が行われるのでぜひ！