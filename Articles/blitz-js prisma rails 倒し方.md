---

Tags: [topic/技術/NodeJS]
---
![[Attachments/無題のフォルダ/new_txlqub.png]]

この記事の内容

- blitz-js が生まれた背景
- prisma の紹介
- blitz で簡単なブログを作ってみる
- blitz を vercel にデプロイしてみる
- blitz-js は next.js + prisma で rails を再現しようとしているフレームワーク
- Prisma ORM それ自体が良い。blitz の理解のためにも、まず Prisma を学べ
- blitz-js 自体はまだ α 品質だけど、今から注目しておく価値はある。デファクトになるかは不明。思想は継承されそう。

## はじめに

next.js はとても良いフレームワークだが、永続層を持たない。なのでフロントエンドとフロントサーバーに閉じている。

永続層、つまり DB を持たないので、初学者や流行りのプログラミングスクールの教材に選ばれない。また、JavaScript の学習資料が散らばっている。 要は Rails Guide がない。なので、 node が彼らに選ばれるためには、 使いやすい ORM を備えた、 統合的な Rails ライクなフレームワークを持ち、その良質なドキュメント郡が必要、と自分は感じていた。

小さいパーツを沢山つくる文化の node.js では、 各人の作る構成を共通化できず、規約らしい規約が作れなかった。 モノリシックな rails の反動で、大きなフレームワークを作る文化がないとも言える。なので、 express は小さいミドルウェアをかき集める開発体験になる。

しかし、node.js のエコシステムやベストプラクティスが成熟してきた今なら、 規約ベースの next.js + なにかの ORM + TypeScript で node.js のためのモダンな rails を作りなおせるはずだ、そんな機運があった。

rails はフロントエンドの面倒を見ないどころか、 rails を使っている限りモダンフロントエンドからどんどん遠ざかってしまう。 next.js ベースに、永続層を提供できれば、そして Isomorphic に API 抽象ができれば、より強力な 2020 年代の rails が生まれるだろう。

そんな中で blitz-js が生まれてきた。

本記事は、 v0.23.2 時点の話。

## next.js + prisma = blitz

next.js が提供してくれるもの

- ファイルシステムベースのルーティング
- SSR

blitz が提供してくれるもの

- prisma による ORM
- prisma による宣言的マイグレーション
- prisma を隠蔽した、クラサバで Isomorphic に同じ API を呼べる仕組み
- blitz generate ... によるコード生成
- セッション管理機構

全体的に TypeScript First に作られていて、中で使われるライブラリの選定もすべて TypeScript フレンドリーなものが選ばれている。

Rails インスパイア なのを隠しておらず、 blitz + prisma で Rails を再現しよう、という感じ。

(正確に言えば、 blitz は prisma を必須コンポーネントとしていない。しかし、blitz の目指す世界観を考えれば現状それを実現するのに prisma が必須という感じ)

## プロジェクト生成: Hello, Blitz

```plain text
$ npm install -g blitz
$ blitz new hello-blitzapp

```

こんな感じのプロジェクトが生成される

```plain text
.
├── README.md
├── app
│   ├── auth
│   │   ├── auth-utils.ts
│   │   ├── components
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── mutations
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   └── signup.ts
│   │   ├── pages
│   │   │   ├── login.tsx
│   │   │   └── signup.tsx
│   │   └── validations.ts
│   ├── components
│   │   ├── Form.tsx
│   │   └── LabeledTextField.tsx
│   ├── hooks
│   │   └── useCurrentUser.ts
│   ├── layouts
│   │   └── Layout.tsx
│   ├── pages
│   │   ├── 404.tsx
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.test.tsx
│   │   └── index.tsx
│   └── users
│       └── queries
│           └── getCurrentUser.ts
├── babel.config.js
├── blitz.config.js
├── db
│   ├── db.sqlite
│   ├── index.ts
│   ├── migrations
│   │   ├── 20200928084940-initial-migration
│   │   │   ├── README.md
│   │   │   ├── schema.prisma
│   │   │   └── steps.json
│   │   └── migrate.lock
│   └── schema.prisma
├── integrations
├── jest.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── logo.png
├── test
│   ├── __mocks__
│   │   └── fileMock.js
│   ├── setup.ts
│   └── utils.tsx
├── tsconfig.json
├── utils
└── yarn.lock

19 directories, 38 files


```

form ライブラリを選ばせられるが、今回は推奨の react-final-form を選んだ。

これだけだとまだ動かない。 マイグレーションを実行してやる必要がある。デフォルトだと sqlite を使っている。

```plain text
$ cd hello-blitzapp
$ blitz db migrate

```

マイグレーション名をきかれたが、 init みたいな適当な名前を付けた。

```plain text
$ blitz start

```

localhost:3000 に立つ。

動いたのは確認できたので、ここで生成されたコードを読んで…いこうとしたが、 結論から言うと、先に prisma を理解しておく必要がある。

db/ 以下が prisma の実装に相当する。自分はデータモデル層から読んでいこうとしたので、まず prisma を理解する必要があった。

### Prisma: Modern Database Toolkit

Node.js によい ORM がない、というのは言わずとしれた事実だが、 Prisma はその状況を覆せそうなポテンシャルがある。

[prisma/prisma: Modern database access (ORM alternative) for Node.js & TypeScript | PostgreSQL, MySQL & SQLite](https://github.com/prisma/prisma)

prisma の紹介については、以下の記事の言葉を借りる。

> 開発者の大部分は、データベースの抽象化を望んでいません。彼らは賢くて便利な DSL や GUI を望んでいません。彼らはプレーンな SQL を書きたいと思っていて、すべての DB インタラクションコードを自分の手で書きたいと思っています。その程度のコントロールを維持したいという気持ちは完全に理解できますが、それでも 20 ～ 30 分の時間を取って Prisma を試してみることをお勧めします。Prisma は、あまりにも手間のかかるツールと生 SQL の間の中間くらいで、とてもいい仕事をしてくれるツールだと思います。

> Prisma Migrate を使用すると、（SQL のように強制的にではなく）宣言的に DB の移行を設定することができます。DB がどのようにして状態 A から状態 B に移行するかという面倒な詳細は見えなくなります。

Prisma 自身がどう考えているかは、 [Why Prisma? (Comparison with SQL query builders & ORMs) | Prisma Documentation](https://www.prisma.io/docs/understand-prisma/why-prisma) を参照。

自分の手触り感は、あんまりお節介ではないクエリビルダという感じ。

## Prisma を使ってみよう

最初に、どんなコードが書けるか紹介する。

```plain text
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query"],
});

await prisma.user.create({
  data: {
    name: "mizchi",
    posts: {
      create: [
        {
          title: "test article" + Date.now(),
          content: "yyy",
        },
      ],
    },
  },
});
const n = await prisma.user.count();
console.log("count", n);

```

`post.create` が面白くて、リレーション構造に従って、リレーション先も一緒に生成するクエリが書けたりする。これが型をついた状態になる。 `post.connect` もある。

どんなクエリを書けるかは、トップページの [https://www.prisma.io/](https://www.prisma.io/) の Exprole the Prisma API Client が参考になった。

prisma の理解にあたって、自分はこのチュートリアルをやるのが一番理解が進んだ。

[Quickstart (TypeScript & SQLite) | Prisma Documentation](https://www.prisma.io/docs/getting-started/quickstart-typescript)

この記事では prisma のすべてを紹介できないが、自分が ↑ の記事をなぞって学ぶ過程で印象的だった部分を紹介する。

## Prisma Migrate: 宣言的マイグレーション

先のコードは prisma client のインスタンスはモデル定義に従って、 TypeScript の型がつく。これがどう実現されるか。

まず、 `prisma/schema.prisma` にモデル定義を書く。

```plain text
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url = "***"
}

model Post {
  content   String?
  id        Int     @default(autoincrement()) @id
  published Boolean @default(false)
  title     String
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}

model User {
  email String @unique
  id    Int    @default(autoincrement()) @id
  name  String
  posts Post[]
}

```

GraphQL と似たような IDL。どのような表現ができるかは [Prisma schema (Reference) | Prisma Documentation](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema) を参照。

provider の定義をみるに、 現在は TypeScript を第一言語としてしているようだが、仕組み的には将来的には他の言語でも使えるようになりそうな気がする。ただ、 TypeScript のパワフルな表現能力を全力で使ってるので、他の言語でこれが再現できるかは怪しく思っている。

このモデルに向けてマイグレーションを実行する。

```plain text
yarn prisma migrate save --experimental

```

(experimental なのは、 prisma migrate 自体がまだ実験的な機能扱いなため)

これで `prisma/migrations/20200926065227-init` みたいなディレクトリが作られる。

prisma/migrations/20200926065227-init/README.md に、これを適用するとどういうクエリが実行されるかが書かれている。

# Migration `20200926065227-init`

This migration has been generated by mizchi at 9/26/2020, 3:52:27 PM.
 You can check out the [state of the schema](https://zenn.dev/mizchi/articles/schema.prisma) after the migration.

```plain text
CREATE TABLE "public"."Post" (
"content" text   ,
"id" SERIAL,
"published" boolean   NOT NULL DEFAULT false,
"title" text   NOT NULL ,
"authorId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"email" text   NOT NULL ,
"id" SERIAL,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

```

```plain text
diff --git schema.prisma schema.prisma
migration ..20200926065227-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,24 @@
+generator client {
+  provider = "prisma-client-js"
+}
++datasource db {
+  provider = "postgresql"
+  url = "***"
+}
++model Post {
+  content   String?
+  id        Int     @default(autoincrement()) @id
+  published Boolean @default(false)
+  title     String
+  authorId  Int
+  author    User    @relation(fields: [authorId], references: [id])
+}
++model User {
+  email String @unique
+  id    Int    @default(autoincrement()) @id
+  name  String
+  posts Post[]
+}

```

authorId が面白くて、SQL 上では外部キーが設定されるだけだが、 prisma client 上の型としては透けて見えている。ORM 上の取得では join される。 また、 明示的に join しないことも可能。

```plain text
const allPosts: Post[] = await prisma.post.findMany({
  include: { categories: true },
})

```

また、 select で取得するパラーメータを絞ることができる。これで `select * from ...` を避けることができる。

```plain text
const allPosts = await prisma.post.findMany({
  select: {
    title: true,
    published: true,
  },
})

```

もちろん select include しても正しく型が付く。内部的には TypeScript の `Pick<...>` を使ってそう。

問題なければ migrate up を発行する。

```plain text
$ yarn prisma migrate up --experimental
$ yarn prisma generate

```

`prisma generate` を実行すると、 `node_modules/@prisma/client/.prisma` 以下に、現在のモデル定義に依った型定義が生成されているのが確認できる。これによって prisma client に型がついているという仕組み。（複数プロジェクトで使う場合は運用に気をつける必要がありそう）

というのが prisma の概要。

## blitz で簡単なブログを作ってみる

ここまできてやっと blitz を見てみよう。

まず、 package.json で基本構成を確認。

```plain text
  "dependencies": {
    "@prisma/cli": "2.7.1",
    "@prisma/client": "2.7.1",
    "blitz": "0.23.0",
    "react": "0.0.0-experimental-7f28234f8",
    "react-dom": "0.0.0-experimental-7f28234f8",
    "react-error-boundary": "2.3.2",
    "secure-password": "4.0.0",
    "zod": "1.11.9",
    "final-form": "4.20.1",
    "react-final-form": "6.5.1"
  },

```

- next.js は blitz パッケージで隠蔽
- react はなんか無駄に攻めたバージョン(たぶん HEAD の 17 相当)

再び、 app 以下を見てみよう。

```plain text
$ tree app/
app/
├── auth
│   ├── auth-utils.ts
│   ├── components
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── mutations
│   │   ├── login.ts
│   │   ├── logout.ts
│   │   └── signup.ts
│   ├── pages
│   │   ├── login.tsx
│   │   └── signup.tsx
│   └── validations.ts
├── components
│   ├── Form.tsx
│   └── LabeledTextField.tsx
├── hooks
│   └── useCurrentUser.ts
├── layouts
│   └── Layout.tsx
├── pages
│   ├── 404.tsx
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.test.tsx
│   └── index.tsx
├── styles
│   ├── button.css
│   └── index.css
└── users
    └── queries
        └── getCurrentUser.ts

```

セッションと認証周りのコードが自動生成されている。

全体の基本構成

```plain text
- components/
  - Form.tsx # ベースとなる form 要素
- pages/ # next.js の root となる pages。 _app や _document はここに置く
- layouts/
  - Layout.tsx # ベースとなるレイアウト
- hooks/ # react hooks 置き場

```

リソースごとの基本構成

```plain text
[リソース]
  - queries/ # 参照系
  - mutations/ # 更新系
  - components/ # リソースごとの component
  - pages/ # リソースごとの pages

```

個人的にはリソースごとに query と mutations を分散するのではなく、Rails の app/models と同じように全リソース串刺しで一つのディレクトリにまとめてしまいたい気持ちがあるのだが、一旦郷に入っては郷に従うこととする。

追記: ちょっとやって思ったのが、 blitz というか Rails 風のリソース定義だと Form とそのバリデーションが密結合する。なので、 `app/[リソース]/components/~Form.tsx` なんだという理解をした。

さらに追記: 実際は現時点ではまともな Form のコードを生成しないので、どうせコピペになる。だったら queries/mutations の自動生成だけでいいという気持ちに戻ってきた。将来的にどういうコードを吐くか次第。

## どうやってクライアントでサーバーサイドの prisma を呼んでいるか

まず、どのように CRUD を実装するか見てみよう。最初に生成されている getCurrentUser をみる。

```plain text
// app/users/queries/getCurrentUser.ts
import db from "db"
import { SessionContext } from "blitz"

export default async function getCurrentUser(_ = null, ctx: { session?: SessionContext } = {}) {
  if (!ctx.session?.userId) return null

  const user = await db.user.findOne({
    where: { id: ctx.session!.userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}

```

この db はクライアントでもサーバーでも呼べるようにみえる。ここが blitz のキモで、サーバーではそのまま prisma として実行されるが、内部実装を読んでいないので想像だが、 この db はクライアントでは同じ API の RPC に変換されている？

(ここにセキュリティ上の不安はある。すべてをクライアントから呼べてしまう恐れはないのか？ あとで blitz のコードを呼んで、どうやって実現しているか確認する)

prisma としてみると、 セッションから userId 情報を参照して、そのユーザー情報を返す prisma の実装。とくに難しいところはない。

ちょっと面白いのは、 これをクライアントから呼ぶ部分。

```plain text
// app/user/queries/useCurrentUser.ts
import { useQuery, useSession } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const session = useSession()
  const [user] = useQuery(getCurrentUser, null, { enabled: !!session.userId })
  return session.userId ? user : null
}

```

API の関数を引数にとって、 hooks 化している。内部的には react-query な気がする。

[tannerlinsley/react-query: ⚛️ Hooks for fetching, caching and updating asynchronous data in React](https://github.com/tannerlinsley/react-query)

これを踏まえて、理解のために生の API で直接 index ページを書き直すと、こうなった。(CSS も剥がしている)

```plain text
// app/pages/index.tsx
import { Link, BlitzPage, useQuery, useSession } from "blitz"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import getCurrentUser from "app/users/queries/getCurrentUser"

function HomeView() {
  const session = useSession()
  const [currentUser] = useQuery(getCurrentUser, null, { enabled: !!session.userId })

  if (currentUser) {
    return (
      <>
        <button
          onClick={async () => {
            await logout()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a>
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a>
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <>
      <Suspense fallback="loading">
        <HomeView />
      </Suspense>
    </>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

```

useQuery は 例外で継続を表現するので、 Suspense で囲ってやる必要がある。

手触り感は react-firebase-hooks や react-apollo-hooks などに近い。

## blitz generate でコード生成する

rails と同じくコード生成の scaffolding 提供されている。

```plain text
$ blitz generate all articles title:String content:String belongsTo:User -d

```

- `d` (or `-dry-run`) をつけることで、 実行した際の副作用がプレビューされる。

```plain text
$ tree app/articles
app/articles/
├── components
│   └── ArticleForm.tsx
├── mutations
│   ├── createArticle.ts
│   ├── deleteArticle.ts
│   └── updateArticle.ts
├── pages
│   └── articles
│       ├── [articleId]
│       │   └── edit.tsx
│       ├── [articleId].tsx
│       ├── index.tsx
│       └── new.tsx
└── queries
    ├── getArticle.ts
    └── getArticles.ts

```

db/schema.prisma のモデル変更差分

```plain text
model Article {
  id Int @default(autoincrement()) @id
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title String
  content String
  user User @relation(fields: [userId], references: [id])
  userId Int
}

```

- d を外して実行する

```plain text
$ blitz generate all articles title:String content:String belongsTo:User
$ blitz db migrate

```

(ここで VSCode の TS Server サーバーを再起動しないと、migrate 結果が反映された TypeScript のコードが適用されなかった。)

生成されたコードを見ると、`name` という属性を仮定したコードが生成され、最初は型違反している。ここは未完成なのかな？

```plain text
// app/articles/pages/new.tsx
import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createArticle from "app/articles/mutations/createArticle"
import ArticleForm from "app/articles/components/ArticleForm"

const NewArticlePage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Article</title>
      </Head>

      <main>
        <h1>Create New Article</h1>

        <ArticleForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              // ここが型違反
              const article = await createArticle({ data: { name: "MyName" } })
              alert("Success!" + JSON.stringify(article))
              router.push("/articles/[articleId]", `/articles/${article.id}`)
            } catch (error) {
              alert("Error creating article " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/articles">
            <a>Articles</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewArticlePage.getLayout = (page) => <Layout title={"Create New Article"}>{page}</Layout>

export default NewArticlePage

```

生成された ArticleForm では、指定した ReactFinalForm を使っていない。

```plain text
// app/articles/components/ArticleForm.tsx
import React from "react"

type ArticleFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ArticleForm = ({ initialValues, onSubmit }: ArticleFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>{JSON.stringify(initialValues)}</div>
      <button>Submit</button>
    </form>
  )
}

export default ArticleForm

```

これを `SignupForm` を参考に、 `ArticleForm` を書き換える。

```plain text
// app/articles/components/ArticleForm.tsx
import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form } from "app/components/Form"
import * as z from "zod"

const ArticleInput = z.object({
  title: z.string(),
  content: z.string(),
})

type ArticleInputType = z.infer<typeof ArticleInput>

export const ArticleForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: ArticleInputType
  onSubmit: (values: ArticleInputType) => void
}) => {
  return (
    <Form<ArticleInputType>
      submitText="Create Article"
      schema={ArticleInput}
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values)
      }}
    >
      <LabeledTextField name="title" label="title" placeholder="title" />
      <LabeledTextField name="content" label="content" placeholder="content" />
    </Form>
  )
}

```

zod は TypeScript ファーストなバリデーターらしく、 バリデータから型を取り出せる。

これを使って new.tsx を書き直す。

```plain text
// app/articles/pages/articles/new.tsx
import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage, useSession } from "blitz"
import createArticle from "app/articles/mutations/createArticle"
import { ArticleForm } from "app/articles/components/ArticleForm"

const NewArticlePage: BlitzPage = () => {
  const router = useRouter()
  const session = useSession()

  return (
    <div>
      <Head>
        <title>New Article</title>
      </Head>
      <main>
        <h1>Create New Article</h1>
        <ArticleForm
          initialValues={{ title: "", content: "" }}
          onSubmit={async (values) => {
            try {
              const article = await createArticle({
                data: {
                  ...values,
                  user: {
                    connect: {
                      id: session.userId,
                    },
                  },
                },
              })
              router.push("/articles/[articleId]", `/articles/${article.id}`)
            } catch (error) {
              alert("Error creating article " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/articles">
            <a>Articles</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewArticlePage.getLayout = (page) => <Layout title={"Create New Article"}>{page}</Layout>

export default NewArticlePage

```

これで記事が作れるようになった。

ついでに記事更新の edit.tsx も次のように書き換える。

```plain text
// app/articles/pages/articles/[articleId]/edit.tsx
import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useSession } from "blitz"
import Layout from "app/layouts/Layout"
import getArticle from "app/articles/queries/getArticle"
import updateArticle from "app/articles/mutations/updateArticle"
import { ArticleForm } from "app/articles/components/ArticleForm"

export const EditArticle = () => {
  const router = useRouter()
  const articleId = useParam("articleId", "number")
  const [article] = useQuery(getArticle, { where: { id: articleId } })

  return (
    <div>
      <h1>Edit Article {article.id}</h1>
      <pre>{JSON.stringify(article)}</pre>

      <ArticleForm
        initialValues={{ title: article.title, content: article.content }}
        onSubmit={async (values) => {
          try {
            const updated = await updateArticle({
              where: { id: article.id },
              data: {
                ...values,
              },
            })
            router.push("/articles/[articleId]", `/articles/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating article " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditArticlePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Article</title>
      </Head>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditArticle />
        </Suspense>

        <p>
          <Link href="/articles">
            <a>Articles</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

EditArticlePage.getLayout = (page) => <Layout title={"Edit Article"}>{page}</Layout>

export default EditArticlePage

```

これで記事作成が動くようになった。結構自分で書かないといけないコードが多い。一度やっておくと何がボイラープレートなのかわかりやすい。

今回は vercel にデプロイするとする。

```plain text
$ npm install -g vercel

```

しかし vercel は DB を持たない。こういう実験でお金を払いたくないので、 Heroku の postgres でサクッと作ってみた。

Heroku でなにか適当なプロジェクトを作って、そこに ↑ のプラグインをアタッチする。 postgres の 設定画面から URI だけ引っこ抜いてくる。

`db/schema.prisma` の datasource を次のように変更。

```plain text
datasource db {
  provider = "postgresql"
  url      = "postgres://..."
}

```

この状態で `blitz db migrate` してマイグレーションして(本当はサーバーのデプロイでやった方がいいのだが)、 `blitz start` して起動してみる。DB に接続できたら成功。

しかし、このままデプロイしたところ、まだ動かない。見た感じ、prisma generate が存在しないパスに向いていた。

なので npm scripts の build を次のようにした。

```plain text
"build": "prisma generate --schema db/schema.prisma && blitz build"

```

ついでに next.js の実行モードを serverless にする(エンドポイントごとに lambda で動くようになる)

blitz.config.js をこのように変更

```plain text
module.exports = {
  //...
  target: "serverless"
}

```

vercel は blitz プロジェクトなのを検知して(もう対応してる？)、 `prisma generate || true` みたいなコマンドを発行してくるが、これだとスキーマ定義が見つからないみたいなエラーが出ていた。なので build コマンドにフックした。

このままデプロイして、ログインしようとすると、今度はセッションの試行に失敗する。vercel のランタイムエラーを見ると、 SESSION_SECRET_KEY が未指定みたいなエラーが出ている。というわけで、 `.env` に `SESSION_SECRET_KEY` を追加。

```plain text
SESSION_SECRET_KEY=なにか適当な32文字以上の文字列

```

これでやっと起動。だるかったが、一度やっとけば今後はハマることはなさそう。

「全然安定してなくて rails 倒せない！」

現時点では blitz 自体はまだこなれている印象を受けない。現時点でこれを使って開発するには、 ralis の思想を知っている上でさらに next.js と prisma を両方使いこなせる必要がある。

方針自体はいいが、scaffold されるツールや、その連携にまだ難がある。API も安定してなさそう。

それはともかく、 db のクラサバ抽象が一番のポイントだろうか。

prisma は良い。これが一番の収穫。 zod も便利そうだった。

個人的に、 next.js に慣れているからか、 pages リソースごとに分散するのではなく、一つに集約したい。そこは blitz generate model で query + mutations だけの生成にすればよさそう。 Rails も慣れてる人を見てると、結局そうしていたし…

今後も継続的にウォッチしつつ、安定版が出たぐらいの頃に、 zenn でチュートリアル本を書こうかなー、という気持ち。