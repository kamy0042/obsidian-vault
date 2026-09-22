---

Tags: [topic/技術/React]
---
![](https://zenn.dev/api/optimize-og-image/92b12054feb2dee70870/https%3A%2F%2Fnextjs.org%2Fapi%2Fog%3Ftitle%3DGetting%2520Started%3A%2520Project%2520Structure)

![[06a98e797d50-20230916.png]]

引用：[https://nextjs.org/docs/app/building-your-application/routing/route-groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

![[972cb5979e57-20230916.png]]

引用：[https://nextjs.org/docs/app/building-your-application/routing/colocation](https://nextjs.org/docs/app/building-your-application/routing/colocation)

![[bc192e0e05eb-20230916.png]]

引用：[https://nextjs.org/docs/app/building-your-application/routing/parallel-routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

![[13a3fa939ed8-20230916.png]]

引用：[https://nextjs.org/docs/app/building-your-application/routing/parallel-routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

![[92f17ab68fe0-20230917.png]]

引用：[https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

日本語で解説してくれている方もいます👇

### 4種類のキャッシュ

4種類のキャッシュの仕組みが存在します👇

![[59c138fd06bf-20230916.webp]]

引用：[https://nextjs.org/docs/app/building-your-application/caching](https://nextjs.org/docs/app/building-your-application/caching)

雑にまとめると、以下のような感じです👇

- 🟥Router Cache 
    - 「一度表示したページはクライアント側にキャッシュがあるんだから、それ使えばサーバーにリクエスト送らなくてよくなるじゃん」なやつ。
    - ただし、永続的にキャッシュが有効なわけではなくて以下のケースで無効化される。 
        - 任意の時間が経ったとき（たとえばStatic Routeなページだと5分）。
        - ページをリロードしたとき。
- 🟦Full Route Cache 
    - 「一度生成したページはサーバー側にキャッシュがあるんだから、リクエストされたらそれ返せばいいじゃん！」なやつ。
    - 基本的には永続化されるけど、以下のケースだと永続化されない。 
        - fetchでrevalidateなどを指定している場合 → 指定したタイミングでキャッシュが再生成されたり、そもそも生成されなかったりする
        - cookies関数のような「ユーザーによって返す値が違ってくるじゃん」な関数（[Dynamic Functions](https://nextjs.org/docs/app/building-your-application/caching#dynamic-functions)と呼ぶ）を使っている場合 → そもそもキャッシュが生成されない。
- 🟨Request Memoization 
    - 「複数のコンポーネントで同じ内容を何回もfetchしてるぞ～？よーし、1つにまとめちゃえ！」なやつ。
    - Next.jsの機能ではなく、Reactの機能。
    - GETメソッドにのみ適用される。
    - POSTメソッドやDBへの取得処理などもメモ化したい場合は、Reactの[cache](https://react.dev/reference/react/cache)を使う。
- 🟪Data Cache 
    - 「これさっきfetchしたやつと同じだから結果を使いまわしたろ！」なやつ。
    - 基本的には永続化されるけど、以下のケースだと永続化されない。 
        - fetchでrevalidateなどを指定している場合 → 指定したタイミングでキャッシュが再生成されたり、そもそも生成されなかったりする
    - [revalidatePath](https://nextjs.org/docs/app/building-your-application/caching#revalidatepath)などを使えば任意のタイミングでキャッシュを削除できる。

🟥と🟨は、すぐに消えるしユーザー単位なので、あまり意識しなくていいのかも。

🟦と🟪は、基本的にユーザー全体＆デプロイメントに渡って永続化されるので、意識しないとバグになるかも。

ちなみに🟦は1つのデプロイメントでだけ有効ですが、🟪は複数のデプロイメント間に渡って有効らしいです。なので🟪は再デプロイしても残ります。

### server only

server onlyというパッケージをnpm installして、たとえば`A.tsx`の先頭に`import 'server-only'`と書きます。

そうすると、`A.tsx`をクライアントコンポーネントから呼び出している場合にビルドエラーが出るようにできます。

### statically-typed-links

`Link`コンポーネントの`href`プロパティの型チェックを有効にできるやつです。

- 今の時点でまだexperimentalなので、`next.config.js`をゴニョゴニョする必要あり。

### Page Router → App Routerへの移行

ガイドがあります👇

おわり