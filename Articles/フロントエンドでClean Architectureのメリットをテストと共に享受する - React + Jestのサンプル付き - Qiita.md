---
Created: 2021-01-15T20:34:00
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
ここ数年でClean Architectureはおなじみのアーキテクトとして親しまれるようになりました。

とりわけ単体テストを書く習慣が根付いているバックエンドで重点的に取り入れられているように見受けられますが、フロントエンドにおいても同様にClean Architectureを導入し、メリットを享受できます。

今回はフロントエンドにClean Architectureを導入する手順を、実際にコードを追いながら紹介していきます。

# 実際のコード

実際に書いたコードはこちらのGithubに公開しています。データを外部から取得するフローを表現するために、node.jsで実装されたモックサーバーも用意しました。
　[https://github.com/t-tiger/React-CleanArchitecture-Example](https://github.com/t-tiger/React-CleanArchitecture-Example)

# 前提知識

Clean Architectureでおなじみの図と共に前提知識を簡単に紹介します。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F17370%2Fed562c4f-b976-8495-daed-21c967bced9d.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=242729138d12ba1b7ccad17805b0ed7e)

詳しい説明はここでは割愛しますが、基本的に外側のレイヤーから内側のレイヤーへ依存するよう設計していきます。一方で内側から外側へと依存する場合は、依存性逆転の原則に則り、インターフェースを通じて抽象に依存する必要があります。

今回はフレームワークにReact.jsを用いていますが、それぞれ次のように実装しました。

- Infrastructure -> Driver
- Interface Adapter (外部と内部をつなぐレイヤー) -> Repository、Presenter
- UseCase (ドメインモデルを使ってビジネスルールを記載する) -> Usecase
- Entity (ビジネスルールとビジネスデータが結びついたデータ) -> Domain, Entity

`project/
　├ domain/
　├ driver
　├ interface/
     └ driver
     └ repository
     └ useCase
　├ presenter/
　├ repository/
　├ useCase/
　├ index.tsx
　└ index.html`

## Clean Architectureのメリットとは？

Clean Architectureを導入するメリットは、各レイヤーが疎結合になり、特定のフレームワークやライブラリへの依存関係が減らせることなどが挙げられますが、**とりわけ個人的に強く感じるのはテスタビリティが高まることです。**

あるレイヤーが別のレイヤーのクラスを参照する場合、それが実装ではなくinterfaceであればテストの際にモックを差し込むことで、単体テストを容易に書けるようになります。例えばAPIリクエストのように実際には通信が発生してしまう場合でも、規定の値を返すモックを挿入すれば、Repository層のテストにも対応できます。

具体的にどのようにテストを書けば良いのかは後述しているので、そちらを参照してみて下さい。

## 余談: DDDとClean ArchitectureのEntityは同義ではない

Clean ArchitectureにおけるEntityはビジネスルールを持ったデータ構造ですが、これはDDDの文脈でいえばValue Objectに近く、DDDに慣れ親しんだ人からすればEntityという言葉に違和感を覚えるかもしれません。

これはClean Architectureが指すEntityと、DDDが指すEntityは定義が異なることが要因で、Entity層にDDDにおけるValue Domainを利用してはいけないわけではありません。

# Entity (ドメインモデル)

それでは実際にTypeScript+React.jsを使った実装内容を見ていきましょう。今回はサーバーから記事情報を取得し、それを描画する処理を行います。

ドメインモデルとしてArticle、それに付随してAuthorを定義しています。Value Objectパターンのようにプリミティブ型ではなく、ユーザー定義クラスを活用し、それぞれに振る舞いを持たせます。また不変オブジェクトとなるよう、readonly属性を付与しています。

domain/article.ts

`import { Author } from "./author";

export class Article {
  readonly id: number;
  readonly name: string;
  readonly author: Author;
  readonly createdAt: Date;

  constructor(id: number, name: string, author: Author, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.createdAt = createdAt;
  }

  get authorName(): string {
    return this.author.name;
  }

  get formattedDate(): string {
    return `${this.createdAt.getFullYear()}-${String(this.createdAt.getMonth() + 1).padStart(2, "0")}-${String(this.createdAt.getDate()).padStart(2, "0")}`;
  }
}`

domain/author.ts

`export class Author {
  readonly id: number;
  readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}`

# UseCase

ドメインモデルを使ってビジネス手順を記載していきます。
UseCase自体にビジネスロジックは記載せず、ロジックが発生する場合はEntity層に寄せ、ここではあくまで手順のみを記述します。

interface/usecase/articleUseCase.ts

`import { Article } from "../../domain/article";

export interface ArticleUseCase {
  fetchArticles(): Promise<Article[]>;
}`

usecase/articleUseCase.ts

`import { Article } from "../domain/article";
import { ArticleUseCase } from "../interface/useCase/articleUseCase";
import ArticleRepository from "../interface/repository/articleRepository";

export default class ArticleUseCaseImpl implements ArticleUseCase {
  readonly articleRepository: ArticleRepository;

  constructor(repository: ArticleRepository) {
    this.articleRepository = repository;
  }

  async fetchArticles(): Promise<Article[]> {
    return await this.articleRepository.findAll();
  }
}`

UseCaseが呼ぶRepositoryは、レイヤーでいう内から外へと依存性が逆転しています。そのため依存性逆転の原則から、UseCaseはRepositoryの実装ではなく、インターフェースを参照する必要があります。

初期化時にRepositoryのインターフェースを実装したインスタンスを注入することになりますが、それが実際に何であるかをUseCaseは関知しません。

# Repository

外部と内部をつなぐレイヤーとしてRepository層を定義します。外部から取得したデータは、内部で扱うためにデータをアプリケーション固有のドメインモデルに変換しますが、それをRepositoryが担っています。

interface/repository/articleRepository.ts

`import { Article } from "../../domain/article";

export default interface ArticleRepository {
  findAll(): Promise<Article[]>;
}`

repository/articleRepository.ts

`import ArticleRepository from "../interface/repository/articleRepository";
import ArticleDriver from "../interface/driver/articleDriver";
import { Article } from "../domain/article";
import { Author } from "../domain/author";

export default class ArticleRepositoryImpl implements ArticleRepository {
  private readonly articleDriver: ArticleDriver;

  constructor(articleDriver: ArticleDriver) {
    this.articleDriver = articleDriver;
  }

  async findAll(): Promise<Article[]> {
    const res = await this.articleDriver.findAll();
    return res.articles.map(
      articleEntity =>
        new Article(
          articleEntity.id,
          articleEntity.name,
          new Author(articleEntity.author.id, articleEntity.author.name),
          new Date(articleEntity.createdAt)
        )
    );
  }
}`

先ほどのUseCaseと同様にここでもRepositoryからDriverと、内から外へと依存性の逆転が生じているので、インターフェースを参照しています。

# Driver

Driver層では実際に外部からデータを取得します。外部から来るデータはJSON形式ですが、ここではドメインモデルへの変換は行わず、結果をそのまま返しています。

interface/driver/articleDriver.ts

`export default interface ArticleDriver {
  findAll(): Promise<ArticlesJson>;
}

export type ArticlesJson = {
  articles: ArticleJson[];
};

export type ArticleJson = {
  id: number;
  name: string;
  author: {
    id: number;
    name: string;
  };
  createdAt: string;
};`

driver/articleDriver.ts

`import ArticleDriver, { ArticlesJson } from "../interface/driver/articleDriver";

export default class ArticleDriverImpl implements ArticleDriver {
  async findAll(): Promise<ArticlesJson> {
    const res = await fetch("http://localhost:3000/articles");
    return await res.json();
  }
}`

ここまでデータのやり取りにフォーカスしてきましたが、実際にUIに反映させるようPresenter層を記述していきましょう。

# Presenter (React.js)

Presenter層は内側から受け取ったデータを、外側であるUIへ反映させます。PresenterはUseCaseに依存し、ここでは必要な記事情報(Articles)の取得を試みます。

App.tsx

`import React, { useEffect, useState } from "react";
import Articles from "./components/Articles";
import { ArticleUseCase } from "../interface/useCase/articleUseCase";

type Props = {
  useCase: ArticleUseCase;
};

const App = ({ useCase }: Props) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setArticles(await useCase.fetchArticles());
  };

  return <Articles articles={articles} />;
};

export default App;`

PresenterからUseCaseへの依存は逆転が生じていませんが、インターフェースを通じてやり取りすることでPresenter層の単体テストも書きやすくなる利点があります。

# エントリーポイント

エントリーポイントでは必要な依存性を注入し、ブート処理を担います。今回はPresenterに値を渡すことで、描画を開始しました。
あくまでアプリケーションの開始が目的で、最小限の手順のみであることが望まれます。

index.tsx

`import React from "react";
import ReactDOM from "react-dom";
import App from "./presenter/App";
import ArticleDriverImpl from "./driver/articleDriver";
import ArticleRepositoryImpl from "./repository/articleRepository";
import ArticleUseCaseImpl from "./useCase/articleUseCase";

const repository = new ArticleRepositoryImpl(new ArticleDriverImpl());
const useCase = new ArticleUseCaseImpl(repository);
ReactDOM.render(<App useCase={useCase} />, document.getElementById("app"));`

各レイヤーはinterfaceを参照しているので、実際に注入された値が何であるかを知りません。インターフェースが同一であれば、実際に注入された値が変更されたとしても、アプリケーションへの破壊的な変更を避けることができます。

# テストを実際に書いてみる

先ほどClean Architectureのメリットとしてテスタビリティの向上を挙げましたが、実際にテストコードを書きながら、その恩恵を見ていきましょう。

なおテストフレームワークには[jest](https://github.com/facebook/jest)を使用しています。

## UseCaseのテスト

Clean Architectureに限らずですが、単体テストの際は各レイヤーの責務にフォーカスし、レイヤーを越えた先の動作はモックすることで、テスト対象の動作のみにフォーカスすることができます。

今回UseCaseではRepositoryから受け取った記事情報をそのまま返していますが、テストの際はRepositoryの動作をモックし、UseCase自体が適切な処理を行っているかを検証します。

useCase/__test__/articleUseCase.test.ts

`import { Article } from "../../domain/article";
import ArticleRepository from "../../interface/repository/articleRepository";
import ArticleUseCaseImpl from "../articleUseCase";

const articleRepository: ArticleRepository = {
  findAll: (): Promise<Article[]> => {
    throw "not implemented";
  }
};

describe("\#fetchArticles", () => {
  test("domain articles are returned", async () => {
    const article1 = { id: 1 } as Article;
    const article2 = { id: 2 } as Article;
    const findAllSpy = jest
      .spyOn(articleRepository, "findAll")
      .mockReturnValue(new Promise(resolve => resolve([article1, article2])));
    const articleUseCase = new ArticleUseCaseImpl(articleRepository);

    expect(await articleUseCase.fetchArticles()).toEqual([article1, article2]);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
    findAllSpy.mockClear();
    findAllSpy.mockReset();
  });
});`

UseCaseが依存するRepositoryは、テスト時にインターフェースを実装した仮のオブジェクトを実装します。その上で`spyOn`を使うことで返り値を規定すると共に、それが実際に呼び出されたかどうかを検証しています。

少々冗長な内容に感じられるかもしれませんが、以上から`UseCaseがRepositoryのfindAllを呼び出したこと`、`Repositoryからの結果をそのまま返していること`を確認しています。

このように外部サーバーとの通信が発生する部分でも、モックを活用すれば容易にテストを書くことができます。

## Repositoryのテスト

Driverから受け取ったプリミティブな値を、アプリケーション固有のモデルに変換するRepositoryの動きを検証します。

本来Driverでは外部との通信が発生しますが、それをモックすることでクライアントのみで完結してテストすることができます。

repository/__test__/articleRepository.ts

`import { Article } from "../../domain/article";
import { Author } from "../../domain/author";
import ArticleDriver, { ArticlesJson } from "../../interface/driver/articleDriver";
import ArticleRepositoryImpl from "../articleRepository";

const articleDriver: ArticleDriver = {
  findAll: (): Promise<ArticlesJson> => {
    throw "not implemented";
  }
};

describe("\#findAll", () => {
  test("domain articles are returned", async () => {
    const articles: ArticlesJson = {
      articles: [
        {
          id: 1,
          name: "articleName",
          author: {
            id: 2,
            name: "authorName"
          },
          createdAt: "2019-01-01T00:00:00.000Z"
        }
      ]
    };
    const findAllSpy = jest
      .spyOn(articleDriver, "findAll")
      .mockReturnValue(new Promise(resolve => resolve(articles)));
    const articleRepository = new ArticleRepositoryImpl(articleDriver);

    expect(await articleRepository.findAll()).toEqual([
      new Article(
        1,
        "articleName",
        new Author(2, "authorName"),
        new Date("2019-01-01")
      )
    ]);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
    findAllSpy.mockClear();
    findAllSpy.mockReset();
  });
});`

以上でDriverから渡ってきた値をもとに、適切にドメインモデルに変換できることが検証できました。

今回は単に値を詰めただけですが、null時に規定の初期値を与える場合、不正な文字列が渡ってきた場合の対応、特定の値同士を掛け合わせるといった要件も発生しうるので、それらに応じてテストを追加していくことになります。

# Clean Architectureを適用するかどうか

ここまでClean Architectureをフロントエンドに適用する例を紹介してきました。

今回紹介した例だと、記事情報をそのまま描画するという機能要件に対して、Clean Architectureを厳密に適用することは費用対効果に見合わないと思われるかもしれません。

確かに一度実装した後に、継続してアップデートを重ねるようなケースでなかったり、個人開発で仕様を一人が完全に把握している場合、サービス自体が仮説検証中で激しく要件が変わる場合などは、Clean Architectureを導入するコストの方が大きく出ることがあるでしょう。

一方で要件がある程度明確な中、チーム開発で継続的にアップデートを続ける場合にはコストを上回るメリットを享受できるはずです。

本記事がフロントエンドにもClean Architectureを導入したいと思っている方の参考になれば幸いです。

実際のコードはGithubに公開しています。[https://github.com/t-tiger/React-CleanArchitecture-Example](https://github.com/t-tiger/React-CleanArchitecture-Example)