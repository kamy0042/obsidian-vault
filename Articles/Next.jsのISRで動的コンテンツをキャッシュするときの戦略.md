---
Created: 2021-09-05T19:03:00
URL: https://zenn.dev/catnose99/articles/8bed46fb271e44
Tags: [topic/技術/パフォーマンス]
---
最近Next.jsの**ISR**（Incremental Static Regeneration）を耳にする機会が増えてきました。Zennでも2021/3/17時点で記事や本などの一部のページでISRを採用しています。

ISRを使うことで、動的なコンテンツを含むページも静的ページとしてCDNにキャッシュすることが可能になります。Next.jsのISRは[ドキュメント](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration)に書かれているように`stale-while-revalidate`という考え方でキャッシュが行われます。

具体的には、リクエスト時にページのキャッシュを作成し、次のアクセスではキャッシュされた古いデータを返します。その裏で次のアクセスに向けてキャッシュが再生成されるというイメージです。

![[l9gttpcsxfbri26vr77vf0fo9don.bin]]

これによりユーザー投稿コンテンツであってもCDNにキャッシュしやすくなるというわけです。

デプロイ先がVercelなどのISRに対応したサーバーであれば、ISRの導入はとても簡単です。ISRをしたいページのコンポーネントで`getStaticProps`の返り値に`revalidate`を含めるだけです。

```plain text
import { NextPage, GetStaticProps } from 'next';

type Props = {
  posts: Post[]; // 詳細は省略
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
    revalidate: 10 // 👈 ポイント
  };
};

const Page: NextPage<Props> = (props) => {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
};

export default Page;

```

`getStaticProps`単体だと長期間キャッシュされる静的なページが出力されます（いわゆるSSGというやつ）。ここに`revalidate`を追加するとISRになります。例えば`revalidate: 10`とすると以下のような挙動になります。

- キャッシュが作られた後、10秒間はそのキャッシュを返し続ける（10秒以内に100回アクセスされてもキャッシュの再生成はされない）
- 10秒経ったあとはキャッシュが古くなったとみなされる。ただし**次のリクエストでも一旦はそのキャッシュを返す**（1時間後にアクセスがあった場合も一旦古いキャッシュを返す） 
    - その裏でキャッシュを再生成する 
        - その次のリクエストでは再生成されたキャッシュを返す

`revalidate: ○`にはキャッシュの再検証を必要とするまでの秒数を指定します。

Vercelにデプロイした場合、ISRでキャッシュされたページのレスポンスヘッダには`x-vercel-cache: HIT`が含まれます。

![[6x1xjn6tj94l65w0oki637q4rsrs.bin]]

なお、`posts/[id]`のようにURLに含まれるパラメーターごとにページの内容が変わるような場合には`getStaticPaths`も合わせて指定する必要があります。

pages/posts/[id].tsx

```plain text
export const getStaticProps: GetStaticProps<Props> = async () => {
   const posts = await getPosts();
   return {
     props: {
       posts,
     },
     revalidate: 10
   };
 };

+ export const getStaticPaths: GetStaticPaths = async () => {
+   return {
+     paths: [], // アプリのビルド時にはパスに何が入るかが分からないので空でOK
+     fallback: 'blocking', // 👈 ポイント
+   };
+ };

export default (props: Props) => {
   return (
     <ul>
{posts.map((post) => (
         <li>{post.title}</li>
       ))}
</ul>
   );
 };

```

`fallback: 'blocking'`は、ざっくりというと「キャッシュがまだ作られていないときはSSRを行う」という指定になります。指定しなかった場合、初回リクエスト（キャッシュ未生成時）にはSPAのような動きになります。TwitterBotなどのクローラーが動的に生成されたコンテンツの中身を読めるようにするために`fallback: 'blocking'`を指定しておいた方が良いと思います。

ユーザー投稿機能のあるサービスでISRを採用した場合、ユーザーが内容を更新した直後にページにアクセスするとキャッシュされた古い内容が表示されてしまうと問題が発生します。ユーザーが何回かリロードしてようやく最新の内容が表示される…みたいなことが起きてしまいます。

「内容が更新されたときにキャッシュを削除できるようなAPIとかはないの？」と思うかもしれませんが、少なくとも今はありません。

そもそもそれが可能ならISRをするメリットはありません。普通に長時間のキャッシュを作り、内容が更新された瞬間にキャッシュを削除した方が効率的です（ちなみにCDNに[Fastly](https://www.fastly.com/)を使えば、インスタント・パージによりこれが実現可能です）。

常に最新のデータが表示されなければならないページではISRをするべきではありません。`getStaticProps`や`getInitialProps`を使ってSSR（サーバーサイドレンダリング）をするか、SPAでやるような形でクライアントにマウントされてからリクエストを送るのが良いでしょう。

変更の反映が多少遅れても構わないようなページがISRを採用すべき対象になります。

### 唯一の対処法： クライアントでマウント後に最新のデータをフェッチ

以前Vercelの中の人もツイートしていましたが、ISRをしながら最新のデータを表示する唯一の方法は、ブラウザにマウントされてから最新のデータを読み込み直すことです。

つまり、**一瞬古いキャッシュが表示されるが、その後最新のデータに書き換える**というわけです。内容が書き換わることによるちらつきが発生しますが、初回の表示までは高速です。

よく聞かれるのですが、Zennでは投稿ページにおいてISRを採用しています。単純にISRだけをやるとユーザーが内容を編集した直後に投稿ページにアクセスすると古い内容が表示されてしまいます。一方で、ブラウザに読み込まれてから毎回APIサーバに最新のデータをリクエストすると負荷が大きくなります。

そこでZennでは**著者本人の場合のみ最新のデータをリクエストする**ようにしています。具体的には以下のような実装をしています（わかりやすさのために一部を抜粋）。

↑ ログインユーザーと著者が一致している場合はクライアントから最新のデータを取得して表示するようにしています。APIリクエストについてはNext.jsと同じくVercelチームによりメンテナンスされている[SWR](https://github.com/vercel/swr)を使うとよりスッキリと書けると思います。

↓ SWRと`getStaticProps`との併用についてはドキュメントでも説明されています。

ここではかなり簡略化して載せましたが実際はもう少し複雑になります。特に記事の削除・非公開時の見せ方は難しいポイントだったりします（getStaticPropsでエラーを出してもキャッシュが上書きされないので、仕方なく404ページもキャッシュ対象にしている等）。

動的なコンテンツをキャッシュするわけなので辛い部分が出てくるのはまあ当然ですね。他にも「このへんが辛いよISR」や「こうやるといいよ」などの知見があればコメントで教えていただけると嬉しいです。