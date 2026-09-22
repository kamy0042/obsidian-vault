---
Created: 2021-02-06T01:06:00
URL: https://developer.kaizenplatform.com/entry/2019/03/26/120000
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
Kaizen Platform でフロントエンドエンジニアをしている山本です。この記事では、我々が運営するサービス「Kaizen Ad」のフロントエンド部分をご紹介します。

## Kaizen Ad とは

Kaizen Ad は、動画広告をサポートするマーケットプレイスです。
 カスタマーがクリエイティブを依頼すると、広告クリエイティブを作成するグロースハッカーから動画広告クリエイティブが納品される仕組みです。

カスタマーにとってはクリエイティブ改善の運用を省力化できると同時に、グロースハッカーにとっても新しい働き方が創造できるソリューションとして提供しています。

## 技術選定

技術選定は、モダンシステム化を念頭に置きつつ、運用しやすい設計を目指して行われました。その中でも3つピックアップします。

### 1. React + TypeScript

Reactは、TypeScriptの親和性や、技術的に明るいエンジニアが在籍していたため選択されました。業界的なメインストリームの一つでもあり、導入に抵抗はありませんでした。 TypeScriptは以下に挙げる項目などメリットが大変多いため導入されました。

- ランタイムエラーの削減
- エディターとの相性（visual studio code / WebStorm などで修正箇所がわかりやすい）
- コンポーネントに渡すpropsのデータがわかりやすくなる

数々のライブラリがTypeScriptへの移行が見受けられ、少なくとも静的型付け言語は今後も利用されていくことが予想されています。Airbnbの発表でも、38%のバグがTypeScriptによって防止された可能性があると報告されています。

### 2. Clean Architecture

Clean Architecture は後述でも説明します。
 DDDを意識してドメインに設計の観点を寄せ、プロダクトの拡張性や保守性を高く保つために使っています。マイクロサービスを使ってアプリケーションを構築する昨今のフロントエンド開発において、各機能の凝集度をハンドリングしやすくできることなどがメリットになります。

### 3. GraphQL

当初、GraphQLをProduction環境で実装する会社は少なかったですが、早い段階で導入することが決定されました。RESTful APIの場合、APIから受け取ったデータを整形してviewにわたすなど、オーバーヘッドが生まれており、GraphQLの場合は、フロントエンドとして必要なデータの形をそのままリクエストすることが可能になるため、ユースケースによりマッチするGraphQLを利用することとなりました。

## システム構成

Kaizen Ad のフロントエンドにおけるシステム構成は以下のようになっています。

![[20190325140005.png]]

## React with Clean Architecture

Kaizen Ad の View は 上にも書いたとおりで React + TypeScript を軸にした SPA です。そして、より堅牢なアプリケーションを作るために、設計面では Clean Architecture を採用しました。

Clean Architecture は、ドメイン駆動開発（DDD）などを考慮しつつ、ビジネスロジックの責務を View やフレームワークから分離させる設計です。 有名なのは以下の図で、データモデル（Entity）を中心に4つの円が重なっています。これは円の中心に存在する要素ほど重要なデータとして捉え、依存関係のヒエラルキーを可視化しています。

![[20190325140022.jpg]]

出典: [https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

実際に Kaizen Ad で使用している、 Clean Architecture をベースにした設計をご紹介します。View で Event が Dispatch され、 API からデータを取得し、 それらを View にレンダリングするフローは、従来の Flux などと変わりません。それぞれの役割をレイヤーとして設けていて、ワークフローを図にすると以下のようなっています。

![[20190325140111.png]]

これをコードベースで説明します。例えば User情報を取得して、Viewに表示するユースケースを実装するとします。

### Entity / User.ts

はじめに、Entity層に User というデータモデルを定義します。Userクラス は id と name だけを持った簡単なモデルとします。 Userクラスは fromJSON() という関数を持ち、値のチェックをしつつインスタンスを生成できるようにしています。 Entity は基本的になにかに依存することはありません。

```plain text
// entity/User.ts

class User {
  public readonly id: string;
  public readonly name: string;

  constructor({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) {
    this.id = id;
    this.name = name;
  }

  public static fromJSON = (json: any) => {
    const { id, name } = Object.assign({}, json);

    if (typeof id !== 'string') throw new Error('id must be a string');
    if (typeof name !== 'string') throw new Error('name must be a string');

    return new User({
      id,
      name,
    });
  };
}

export default User;

```

### Adapter / GraphQLClient.ts

Adapter層 として GraphQL のクライアントを立てます。 apollo-link を使って Adapter層 として独立させることで、GraphQLではない別のクエリ言語を使うことになったとしても、影響範囲を小さくすることができます。

```plain text
// Adapter / GraphQLClient.ts

import { ApolloLink, execute, makePromise } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';

class GraphQLClient {
  private readonly httpLink: ApolloLink;

  constructor({ endpointUrl }: { endpointUrl: string; }) {
    this.httpLink = new BatchHttpLink({ uri: endpointUrl });
    this.store = store;
  }

  query = async (query: any, variables: Record<string, any> = {}): Promise<Record<string, any>> => {
    try {
      const result = await makePromise(
        execute(this.httpLink, {
          query,
          variables
        }),
      );

      if (result.errors) {
        console.error(result.errors);
      }

      return result.data as Record<string, any>;
    } catch (err) {
      throw err;
    }
  };
}

export default GraphQLClient;

```

### Service / UserWebApi.ts

Service層は名前と通り、外部サービスとの連携を責務とします。よって、 UserWebApi.ts ではUser情報をAPIから取得することを責務とします。User情報はGraphQLを使って取得するため、上で作成した GraphQLClient.ts はここで使用します。

クエリの返り値は User.fromJson() に渡されることで、値のチェックを行いつつインスタンスが生成されます。

```plain text
// Service / UserWebApi.ts
import gql from 'graphql-tag';

class UserWebApi {
  private graphqlClient: GraphQLClient;

  constructor({ graphqlClient }: { graphqlClient: GraphQLClient }) {
    // graphqlClient = GraphQLClient.ts
    this.graphqlClient = graphqlClient;
  }

  public getMe = async (): Promise<DirectorUser> => {
    let result: any;

    try {
      result = await this.graphqlClient.query(
        gql`
          query User {
            me {
                id
                name
            }
          }
        `,
      );
    } catch (err) {
      throw err;
    }

    return User.fromJSON(result.me);
  };
}

export default UserWebApi;

```

### Usecase / UserUsecase.ts

上で書いた UserWebApi を実行する Usecase層 を作成します。Usecaseはドメイン機能を責務とします。ここでは UserUsecase.ts として、Userを取得する機能を定義します。

よって API を叩く Service層 は Usecase を通して実行されます。

```plain text
// Usecase / UserUsecase.ts

class UserUsecase {
  private store: Store<State>;
  private userWebApi: UserWebApi;

  constructor({
    store,
    userWebApi,
  }: {
    store: Store<State>;
    userWebApi: UserWebApi;
  }) {
    this.store = store;
    this.userWebApi = userWebApi;
  }

  public getMe = async (): Promise<User | void> => {
    let user: User;

    try {
      // Service.UserWebAPI を使って User を取得
      user = await this.userWebApi.getMe();
    } catch (err) {
      throw err;
    }
    // Reducer に取得した User を投げる
    this.store.dispatch(setUser(user));
  };
}

export default UserUsecase;

```

### Reducer / User.ts

View における Reducer は以下のようになります。 Kaizen Ad では、 Redux ではなく [repatch](https://github.com/jaystack/repatch) という軽量Reduxを使っています。repatchは action type ではなく、dispatch に直接コールバック関数を渡せるのがシンプルで良いですね。

```plain text
// Reducer / User.ts

export const setUser = (user: User) => (state: State): State => ({
  ...state,
  User: user,
});

```

### View / User.tsx

View は以下のようになります。 ここでは Hooks を使って、 componentDidMount() に相当するライフサイクルを実行します。

```plain text
// view / User.tsx

const User = () => {
  const state = useContext(stateContext);

  useEffect(() => {
    userUsecase.getUser();
  }, []);

  return (
    <p>
      <span>{state.user.id}:</span>
      {state.user.name}
    </p>
  );
}

```

User.tsx はUser情報を表示するだけのコンポーネントです。UserUsecase を Context API 経由で取得して React のライフサイクルである componentDidMount で実行しています。

上に書いたプログラムの流れを書くと、View からイベントが Dispatch され、 Usecase から Service を実行します。Service は Adapter を使って API にリクエストを投げ、返り値は Entity でチェックされ、問題なければ Props として View に戻りレンダリングが実行、となります。各層ごとに責務と関心が整理され、依存関係の秩序が明確になるため、とても実用的な設計になっています。

## React Hooks の導入とその他メンテナンス

細かいところでは、Reactのバージョンアップを行い、recompose の使用箇所を少しづつ React Hooks に移行しています。また、React.lazy と React.Suspend を使用した Code Splitting を実装し、読み込むファイルサイズの削減を実施しました。ツールの選択や細かいメンテナンスも開発者の判断が反映されやすく、とても動きやすい環境になっています。

## GraphQL

Kaizen Ad では GraphQL をかなり早い段階から Production で運用しています。 詳しいことはこの開発者ブログの過去の記事にまとめられています。

## 多言語対応（i18n）

Kaizen Ad は 米国やその他地域 でもサービスを展開しているため、SPA上で多言語化対応を行っています。こちらも詳しいことは開発者ブログの過去の記事にまとめられています。

## Kaizen Platform のフロントエンド開発

Kaizen Platformのフロントエンド開発は主に以下を担当します。

- 仕様書
- WF制作
- UIデザイン
- フロントエンド実装（これは上に書いたので割愛します）

ほかにも、本人の意向次第でバックエンドの領域にも挑戦できる土壌が存在します。

### 仕様書

仕様書は主にQiita:teamを利用してPRD（Product Requirements Document）やDesign docとして作成します。基本的にはPMがPRDを書いて、それをもとにフロントエンドエンジニア・バックエンドエンジニアが Design doc を書くのがフローとなっています。要件は事前にコンテキストから共有されるため、各担当者が腹落ちせずに物事が進行することは少なくなっています。

### WF（ワイヤーフレーム）制作

WFの制作には主に [whimsical](https://whimsical.co/) というサービスを使って作成します。whimsical は使用できるオブジェクトがシンプルで、sketch などに比べると少ないですが、その制限が選択の意思決定を少なくさせてくれて、使用感がとても高いため、最近はメインで使用しています。

![[20190325141210.png]]

### UIデザイン

Kaizen Ad の UIデザインは [material-ui](https://material-ui.com/) のテーマをカスタマイズして使用しています。上述の whimsical と material-ui を利用することにより、ある程度簡単なUIであれば、WFからすぐに実装のフェーズに移行することが可能です。作業がエンジニアだけで完遂できるため、よりスピード感やオーバーヘッドの少ない開発に取り組めています。

![[20190325141236.png]]

もちろん大きなページ作成や回収には WF → UIデザイン → 実装 のようにすることもあり、その際はsketchやfigmaなどが利用してフィードバックをもらいながら進行することが多いです。

## Kaizen Platform では フロントエンドエンジニア を募集しています

いかがでしたでしょうか。Kaizen Platform では一緒にプロダクトを作ってくれるフロントエンドエンジニアを募集しています。カジュアル面談からフランクにお話しておりますので、興味を持っていただけたら、以下のページよりエントリーをぜひお願いいたします。