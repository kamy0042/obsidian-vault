---
Created: 2024-09-06T01:28:00
URL: https://zenn.dev/moneyforward/articles/e1ed48c3974811
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![](https://storage.googleapis.com/zenn-user-upload/topics/742793a2fb.png)

![](https://zenn.dev/images/topic.png)

![](https://static.zenn.studio/images/drawing/tech-icon.svg)

Feature-Sliced Designというフロントエンドアーキテクチャ設計方法論をプロジェクトに導入してみたところ、

個人的には良いと感じているので、どのような設計方法論なのか、具体的にどのような部分が良いと感じたかを紹介していきたいと思います。

## Feature-Sliced Designとは？

Feature-Sliced Designは、フロントエンドアプリケーションを対象としたアーキテクチャ設計方法論です。公式サイトでは、「コードを整理するためのルールと規約の集大成」と記載されています。

## Feature-Sliced Designの設計方法論

Feature-Sliced Designでは、プロジェクトは**Layer**で構成され、各Layerは**Slice**で構成され、各Sliceは**Segment**で構成されます。

![](https://storage.googleapis.com/zenn-user-upload/0a279ae0743f-20240507.png)

### Layer

Feature-Sliced Designの第一階層をLayerと呼びます。

App、Processes(非推奨)、Pages、Widgets、Features、Entities、Sharedの7つのレイヤーがあり、コードの責任と依存関係に基づいて分類されています。

### 各レイヤーの役割

Appレイヤーでは、アプリケーション全体に影響を与える機能を管理します。

RoutingやProvider、Storeのセットアップなど、アプリケーション全体で共有される機能が含まれます。

**このレイヤーは基本的にスライスを持たず、直接セグメントで構成されています。**

```plain text
└── app/
    ├── providers/
    ├── model/
    |   └── store.ts
    └── ui/
        └── App.tsx

```

### Pages

Pagesレイヤーでは、アプリケーションの個々のページを管理します。

このレイヤーには、特定のページでのみ使用されるロジックとUIコンポーネントが含まれます。

```plain text
└── pages/
    ├── posts/
    |   ├── api/
    |   |    └── GetPosts.graphql
    |   ├── model/
    |   └── ui/
    |        └── Post.tsx
    └── post

```

### Widgets

Widgetsレイヤーでは、EntitiesやFeaturesを意味のあるブロックに結合したUIを管理します。

基本的には、ビジネスロジックを持たず、ジェスチャーやキーボード操作などの非ビジネスロジックが含まれます。

```plain text
└── widgets/
    ├──  comment-list/
    |   ├── model/
    |   |    └── scroll.ts // ビジネスロジックを含まないロジック
    |   └── ui/
    |        └── CommentList.tsx
    └──  header/

```

### Features

Featuresレイヤーでは、**機能**を実現するためのモジュールを管理します。

このレイヤーでは、データフェッチや状態管理などを、再利用可能な1つの機能として集約さえることで、アプリケーションの主要な機能を独立した単位として整理し、他の部分との結合を最小限に抑えることにあります。

これにより、保守性と拡張性が向上します。

```plain text
└── feature/
    ├──  submit-post/
    |   ├── api/
    |   |    └── SubmitPost.graphql
    |   ├── model/
    |   |    └── submit-post.ts
    |   └── ui/
    |        └── submit-post-button/
    └──  create-post/

```

### Entities

Entitiesレイヤーでは、アプリケーションのビジネスロジックやデータモデルを定義し、再利用可能なビジネスロジックやcomponentを管理します。

このレイヤーの各スライスには、Entitiesに基づく静的なUIやデータストア、CRUD操作が含まれます。

```plain text
└── entities/
    ├──  user/
    |   ├── api/
    |   |    └── User.fragment.graphql
    |   ├── model/
    |   |    └── store.ts
    |   └── ui/
    |        ├── user-card/
    |        └── user-profiel/
    └──  article/

```

Sharedレイヤーでは、プロジェクトやビジネスの特殊性から切り離された、独立したモジュールやUIを管理します。

**このレイヤーはスライスを持たず、直接セグメントで構成されている** 点が他のレイヤーと異なります。

```plain text
└── shared/
    ├──  ui/
    |   ├──  button/
    |   └──  selector/
    └──  lib/
        └── date

```

### レイヤー間の依存関係

レイヤー間の依存関係には制限があり、**上位レイヤーから下位レイヤーへの依存関係のみが許可されます。**

例えば、features層からshared、entity層のモジュールをimportすることは可能ですが、

widget層のようなfeaturesよりも上位のレイヤーからモジュールをimportすることは禁止されています。

src/features/add-to-cart/ui/AddToCartButton.tsx

```plain text
- // NG
- import { OrderHistoryList } from "@/widget/order-history";

+ // OK
+ import { Button } from "@/shared";
+ import { cartModel } from "@/entities/cart";

```

### Slice

Feature-Sliced Designの第二階層をSliceと呼びます。

Sliceは意味のあるまとまりで分離するための階層で、命名はビジネスドメインによって直接決定されます。

ex) ブログサイトにおけるentitiesレイヤーのsliceの例

```plain text
└── entities/
    ├──  user/
    ├──  article/
    └──  comment/

```

関連性の高いSlice同士は、より使いやすくするために同じディレクトリにグループ化することもできます。

例えば、「認証」と「ユーザー情報管理」などの機能が関係している場合、それらを「User」というディレクトリにまとめる、といったことが可能です。

! 各Sliceはお互いに直接的に依存しないよう分離する必要があります。
 もし、スライス間で共有したいロジックがあったとしても、Sliceの階層にロジックを置くことは禁止されています。 
そのようなロジックが発生した場合、sliceの分類の仕方を見直したり、sharedレイヤーにロジックを移行するなど、他の方法を検討してみてください。 

![](https://storage.googleapis.com/zenn-user-upload/246f441b1c74-20240508.png)

### Segment

Feature-Sliced Designの第三階層をSegmentと呼びます。

Segmentは技術的な性質によってコードを分類するための階層で、基本的には`ui` / `model` / `api` のようなSegmentを持ちます。

### 標準的なSegment

- `ui` — コンポーネント
- `model` — ビジネスロジック / データストレージ / データを操作する機能
- `api` — APIとの通信部 (GraphQLクエリなど)

独自でSegmentを作成することは禁止されていませんが、慎重に検討し作成することがおすすめされています。

### Public API

Feature-Sliced Designには、「Public API」というSliceを外部レイヤーに公開するインターフェース設計手法があります。

外部レイヤーからアクセス可能なエントリーポイントを提供し、Slice配下のモジュールをカプセル化することにより、内部構造を隠しつつ必要な機能だけを公開することができます。

これにより、内部の変更が他の部分に影響を与えにくくなり、保守性と可読性が向上します。

方法としては、Slice配下に`index.ts`を作成し、下記のように外部に公開してよいロジックをexportします。

entities/auth/index.ts

```plain text
export { AuthForm } from "./ui"
export * as authFormModel from "./model"

```

modelセグメントにも、下記のように`index.ts`を作成して、外部公開可能なロジックをexportします。

entities/auth/model/index.ts

```plain text
export { useAuth } from "./use-auth"

```

また、利用する時は直接Slice内部にあるロジックに直接アクセスすることは禁止されているため、

Sliceから外部公開されているロジックをimportするように書きます。

```plain text
- // NG
- import { AuthForm } from "entities/auth/ui/auth-form"
- import { useAuth } from "entities/auth-form/model/use-auth"
-
- useAuth()

+ // OK
+ import { AuthForm, authFormModel } from "features/auth-form"
+
+ authFormModel.useAuth()

```

## Feature-Sliced Designを導入するメリット

この設計を導入することでどのようなメリットがあるか、公式に記載されている内容を踏まえながら説明していきます。

### ディレクトリの役割が明確であり、統一感がある

コードは、影響範囲（Layer）、ドメイン（Slice）、技術的目的（Segment）ごとに整理されます。

よって、だれでも理解しやすい標準化されたアーキテクチャが構築されます。

個人的には、`layered architecture`と`package by feature`の双方の思想が組み込まれており、イメージしやすく統一感があると感じてます。

### 低結合であり高凝集

公式が記載している通り、低結合であり高凝集されている点が非常に大きなメリットだと感じています。

![](https://storage.googleapis.com/zenn-user-upload/5c5fe7fece9b-20240507.png)

レイヤー間の依存関係やPublic APIの考えにより、安心して変更を加えることのできる設計だと感じております。

### 開発を支援するためのツールがあること

LintやIDEのプラグイン・拡張機能などの開発速度を上げるための支援ツールが充実しています。

[https://github.com/feature-sliced/eslint-config](https://github.com/feature-sliced/eslint-config) では、レイヤー間の依存関係やPublic APIのルールをLintで自動チェックできるので、プロジェクトを導入する前にいれてみましょう。

## Feature-Sliced Designの少し残念な点

### ドキュメントが未成熟で情報量が少ない

ドキュメントにブランクページも多く、ドキュメントの構造も少し分かりづらいです。

辿り着きたい情報になかなかたどりつけないことがあります。

また国内の採用事例も少ないため、少し手探りで導入することになりました。

exampleは充実しているので、こちらを参考にして導入していきました。

## 終わりに

フロントのアーキテクチャに正解はないと思いますが、選択肢の一つとしてFeature-Sliced Designを考えてもらえると嬉しいです☺️